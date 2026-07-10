import express from 'express';
import { MemoryStore } from 'express-rate-limit';
import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { setupRateLimiting } from './http-server.js';
import { RequestRecorder, withRequestRecorder } from './request-context.js';

// Exercises the real /token middleware chain wired by setupRateLimiting
// (coarse IP guard -> urlencoded body parse -> per-credential fine limiter)
// with an in-memory store instead of Redis. This is the integration coverage
// that the key-generator unit tests cannot provide: it proves the body is
// parsed before the fine limiter runs, and that keying by credential actually
// isolates users who share one egress IP.
async function buildTokenApp(preMiddleware?: express.RequestHandler): Promise<express.Express> {
  const app = express();

  // Mounted before the limiters so ALS request context (canonical log
  // recorder) wraps them, mirroring the tracing middleware in production.
  if (preMiddleware) app.use(preMiddleware);

  const logger = {
    info: () => {},
    warn: () => {},
    error: () => {},
    debug: () => {},
  } as unknown as Parameters<typeof setupRateLimiting>[3];
  const clientStore = {
    findClientByFingerprint: async () => undefined,
  } as unknown as Parameters<typeof setupRateLimiting>[2];
  const redis = {} as unknown as Parameters<typeof setupRateLimiting>[1];

  await setupRateLimiting(app, redis, clientStore, logger, {
    // Fresh store per prefix mirrors how distinct Redis prefixes isolate
    // counters in production.
    createStore: () => new MemoryStore(),
  });

  // Terminal handler: any request that survives the limiters gets 200.
  app.post('/token', (_req, res) => {
    res.status(200).json({ ok: true });
  });

  return app;
}

describe('/token rate limiting (integration)', () => {
  it('does not throttle distinct credentials sharing one egress IP', async () => {
    const app = await buildTokenApp();

    // 20 refresh tokens (distinct users) from the same loopback IP. If /token
    // were still keyed by IP, the fine limiter would 429 the 11th request.
    // Keying by credential must let all of them through.
    for (let i = 0; i < 20; i++) {
      const res = await request(app)
        .post('/token')
        .type('form')
        .send({ grant_type: 'refresh_token', refresh_token: `user-${i}-token` });
      expect(res.status).toBe(200);
    }
  });

  it('throttles repeated use of the same credential', async () => {
    const app = await buildTokenApp();

    const statuses: number[] = [];
    for (let i = 0; i < 12; i++) {
      const res = await request(app)
        .post('/token')
        .type('form')
        .send({ grant_type: 'refresh_token', refresh_token: 'same-token' });
      statuses.push(res.status);
    }

    // RATE_LIMITS.token.max (10) allowed within the window, then 429.
    expect(statuses.slice(0, 10)).toEqual(Array(10).fill(200));
    expect(statuses[10]).toBe(429);
    expect(statuses[11]).toBe(429);
  });

  it('isolates the authorization_code grant by code', async () => {
    const app = await buildTokenApp();

    // Different codes from one IP are independent; reusing one code is capped.
    for (let i = 0; i < 15; i++) {
      const res = await request(app)
        .post('/token')
        .type('form')
        .send({ grant_type: 'authorization_code', code: `code-${i}` });
      expect(res.status).toBe(200);
    }
  });

  it('records which limiter tripped (and on which key) in the canonical log', async () => {
    const recorders: RequestRecorder[] = [];
    const app = await buildTokenApp((req, _res, next) => {
      const recorder = new RequestRecorder({
        request_id: `req-${recorders.length}`,
        source_ip: req.ip ?? '',
        method: req.method,
        path: req.path,
      });
      recorders.push(recorder);
      withRequestRecorder(recorder, () => next());
    });

    for (let i = 0; i < 11; i++) {
      await request(app)
        .post('/token')
        .type('form')
        .send({ grant_type: 'refresh_token', refresh_token: 'same-rt' });
    }

    const payload = (recorder: RequestRecorder, status: number) =>
      recorder.buildPayload({
        status,
        duration_ms: 0,
        transport: 'jsonrpc',
        close_reason: 'completed',
      });

    // Requests within the limit record no error.
    expect(payload(recorders[9] as RequestRecorder, 200).errors).toHaveLength(0);

    // The 11th request tripped the fine 'token' limiter; the log names the
    // limiter and the hashed key, never the raw credential.
    const errors = payload(recorders[10] as RequestRecorder, 429).errors;
    expect(errors).toHaveLength(1);
    expect(errors[0]?.error_type).toBe('rate_limited');
    expect(errors[0]?.chain[0]?.message).toContain('limiter=token key=rt:');
    expect(errors[0]?.chain[0]?.message).not.toContain('same-rt');
  });
});
