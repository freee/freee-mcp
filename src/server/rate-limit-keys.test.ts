import { createHash } from 'node:crypto';
import type { Request } from 'express';
import { ipKeyGenerator } from 'express-rate-limit';
import { describe, expect, it } from 'vitest';
import {
  rateLimitIpKey,
  stateRateLimitKey,
  tokenRateLimitKey,
  verifiedMcpRateLimitKey,
} from './http-server.js';

const sha256 = (v: string): string => createHash('sha256').update(v).digest('hex');

function requestWith(fields: Partial<Request> & { auth?: unknown }): Request {
  return fields as Request;
}

describe('rate limit key helpers', () => {
  it('normalizes IP fallback keys with express-rate-limit ipKeyGenerator', () => {
    const req = requestWith({ ip: '2001:db8:abcd:1234::1' });

    expect(rateLimitIpKey(req)).toBe(`ip:${ipKeyGenerator('2001:db8:abcd:1234::1')}`);
  });

  it('uses verified MCP user ID when bearer auth has populated auth context', () => {
    const req = requestWith({
      ip: '203.0.113.10',
      auth: {
        clientId: 'client-1',
        extra: { userId: 'user-1' },
      },
    });

    expect(verifiedMcpRateLimitKey(req)).toBe('user:user-1');
  });

  it('does not use an unverified bearer token payload as the MCP key', () => {
    const fakeToken =
      `${Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url')}.` +
      `${Buffer.from(JSON.stringify({ sub: 'attacker-controlled-sub' })).toString('base64url')}.` +
      'invalid-signature';
    const req = requestWith({
      ip: '203.0.113.10',
      headers: { authorization: `Bearer ${fakeToken}` },
    });

    expect(verifiedMcpRateLimitKey(req)).toBe(`ip:${ipKeyGenerator('203.0.113.10')}`);
  });

  it('falls back to verified client ID when user ID is absent', () => {
    const req = requestWith({
      ip: '203.0.113.10',
      auth: {
        clientId: 'client-1',
        extra: {},
      },
    });

    expect(verifiedMcpRateLimitKey(req)).toBe('client:client-1');
  });
});

describe('tokenRateLimitKey', () => {
  it('keys by hashed refresh_token, isolating users behind a shared egress IP', () => {
    const req = requestWith({
      ip: '203.0.113.10',
      body: { grant_type: 'refresh_token', refresh_token: 'rt-secret', client_id: 'shared' },
    });

    expect(tokenRateLimitKey(req)).toBe(`rt:${sha256('rt-secret')}`);
  });

  it('keys by hashed authorization code when no refresh_token is present', () => {
    const req = requestWith({
      ip: '203.0.113.10',
      body: { grant_type: 'authorization_code', code: 'auth-code', client_id: 'shared' },
    });

    expect(tokenRateLimitKey(req)).toBe(`code:${sha256('auth-code')}`);
  });

  it('does not leak the raw credential into the key', () => {
    const req = requestWith({ ip: '203.0.113.10', body: { refresh_token: 'rt-secret' } });

    expect(tokenRateLimitKey(req)).not.toContain('rt-secret');
  });

  it('falls back to client_id when no per-session secret is present', () => {
    const req = requestWith({ ip: '203.0.113.10', body: { client_id: 'client-1' } });

    expect(tokenRateLimitKey(req)).toBe('client:client-1');
  });

  it('falls back to IP when the body has no usable identifier', () => {
    const req = requestWith({ ip: '203.0.113.10', body: {} });

    expect(tokenRateLimitKey(req)).toBe(`ip:${ipKeyGenerator('203.0.113.10')}`);
  });

  it('does not throw when the body has not been parsed', () => {
    const req = requestWith({ ip: '203.0.113.10' });

    expect(tokenRateLimitKey(req)).toBe(`ip:${ipKeyGenerator('203.0.113.10')}`);
  });
});

describe('stateRateLimitKey', () => {
  it('keys by hashed per-attempt state, isolating concurrent sessions on one IP', () => {
    const req = requestWith({ ip: '203.0.113.10', query: { state: 'pkce-state-123' } });

    expect(stateRateLimitKey(req)).toBe(`state:${sha256('pkce-state-123')}`);
  });

  it('does not leak the raw state into the key', () => {
    const req = requestWith({ ip: '203.0.113.10', query: { state: 'pkce-state-123' } });

    expect(stateRateLimitKey(req)).not.toContain('pkce-state-123');
  });

  it('falls back to IP when no state is present', () => {
    const req = requestWith({ ip: '203.0.113.10', query: {} });

    expect(stateRateLimitKey(req)).toBe(`ip:${ipKeyGenerator('203.0.113.10')}`);
  });
});
