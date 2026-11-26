import express, { type Express } from 'express';
import { describe, expect, it } from 'vitest';
import { requestOnLoopback } from '../test-utils/loopback.js';
import { createOpenAIAppsChallengeHandler } from './openai-apps-challenge.js';

function buildApp(token: string | undefined): Express {
  const app = express();
  app.get('/.well-known/openai-apps-challenge', createOpenAIAppsChallengeHandler(token));
  return app;
}

describe('createOpenAIAppsChallengeHandler', () => {
  it('serves the token verbatim as text/plain', async () => {
    const app = buildApp('challenge-token-for-test');

    const api = await requestOnLoopback(app);
    const res = await api.get('/.well-known/openai-apps-challenge');

    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/^text\/plain/);
    // The directory compares the body byte-for-byte, so no wrapper and no
    // trailing newline may creep in.
    expect(res.text).toBe('challenge-token-for-test');
  });

  it('responds 404 with an empty body when the token is unset', async () => {
    const app = buildApp(undefined);

    const api = await requestOnLoopback(app);
    const res = await api.get('/.well-known/openai-apps-challenge');

    expect(res.status).toBe(404);
    expect(res.text).toBe('');
  });

  it('treats an empty token as unset rather than serving a blank challenge', async () => {
    const app = buildApp('');

    const api = await requestOnLoopback(app);
    const res = await api.get('/.well-known/openai-apps-challenge');

    expect(res.status).toBe(404);
  });
});
