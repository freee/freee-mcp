import express, { type Express } from 'express';
import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { captureOAuthErrorResponse } from './oauth-error-capture.js';
import { RequestRecorder, withRequestRecorder } from './request-context.js';

interface HandlerResponse {
  status: number;
  body: Record<string, unknown>;
}

function buildApp(
  handler: HandlerResponse,
  recorderHolder: { recorder?: RequestRecorder } = {},
): Express {
  const app = express();
  app.use((req, _res, next) => {
    const recorder = new RequestRecorder({
      request_id: 'test-req',
      source_ip: '127.0.0.1',
      method: req.method,
      path: req.path,
    });
    recorderHolder.recorder = recorder;
    withRequestRecorder(recorder, () => next());
  });
  app.use('/token', captureOAuthErrorResponse());
  // Stand-in for the MCP SDK auth router: answers with the configured
  // status + body via res.status().json(), bypassing recordError.
  app.post('/token', (_req, res) => {
    res.status(handler.status).json(handler.body);
  });
  return app;
}

function recordedErrors(recorder: RequestRecorder | undefined, status: number) {
  if (!recorder) throw new Error('recorder not captured');
  return recorder.buildPayload({
    status,
    duration_ms: 1,
    transport: 'jsonrpc',
    close_reason: 'completed',
  }).errors;
}

describe('captureOAuthErrorResponse', () => {
  it('records the OAuth error/error_description on a 4xx token response', async () => {
    const holder: { recorder?: RequestRecorder } = {};
    const app = buildApp(
      { status: 400, body: { error: 'invalid_grant', error_description: 'code expired' } },
      holder,
    );

    const res = await request(app).post('/token').send();

    expect(res.status).toBe(400);
    const errors = recordedErrors(holder.recorder, 400);
    expect(errors).toHaveLength(1);
    expect(errors[0]).toMatchObject({
      source: 'auth',
      status_code: 400,
      error_type: 'invalid_grant',
    });
    expect(errors[0].chain[0]).toMatchObject({
      name: 'OAuthError:invalid_grant',
      message: 'code expired',
    });
  });

  it('records invalid_client on a 401 response', async () => {
    const holder: { recorder?: RequestRecorder } = {};
    const app = buildApp({ status: 401, body: { error: 'invalid_client' } }, holder);

    await request(app).post('/token').send();

    const errors = recordedErrors(holder.recorder, 401);
    expect(errors).toHaveLength(1);
    expect(errors[0].error_type).toBe('invalid_client');
    expect(errors[0].chain[0].message).toBe('no error_description provided');
  });

  it('does not record on a successful (2xx) response', async () => {
    const holder: { recorder?: RequestRecorder } = {};
    const app = buildApp(
      { status: 200, body: { access_token: 'x', token_type: 'bearer' } },
      holder,
    );

    await request(app).post('/token').send();

    expect(recordedErrors(holder.recorder, 200)).toHaveLength(0);
  });

  it('ignores 4xx bodies that are not OAuth-error shaped', async () => {
    const holder: { recorder?: RequestRecorder } = {};
    const app = buildApp({ status: 400, body: { message: 'something else' } }, holder);

    await request(app).post('/token').send();

    // No `error` string field → leave the canonical-log fallback to handle it.
    expect(recordedErrors(holder.recorder, 400)).toHaveLength(0);
  });

  it('scrubs sensitive ids out of error_description', async () => {
    const holder: { recorder?: RequestRecorder } = {};
    const app = buildApp(
      { status: 400, body: { error: 'invalid_request', error_description: 'user 1234567 denied' } },
      holder,
    );

    await request(app).post('/token').send();

    const errors = recordedErrors(holder.recorder, 400);
    expect(errors[0].chain[0].message).not.toContain('1234567');
  });
});
