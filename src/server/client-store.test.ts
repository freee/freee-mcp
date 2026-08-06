import type {
  OAuthClientInformationFull,
  OAuthClientMetadata,
} from '@modelcontextprotocol/sdk/shared/auth.js';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { CIMDFetcher } from './cimd-fetcher.js';
import {
  computeClientFingerprint,
  isClientSecretExpired,
  RedisClientStore,
} from './client-store.js';
import { RedisUnavailableError } from './errors.js';

function createMockRedis() {
  const store = new Map<string, string>();
  return {
    get: vi.fn(async (key: string) => store.get(key) || null),
    set: vi.fn(async (key: string, value: string, _ex?: string, _ttl?: number) => {
      store.set(key, value);
      return 'OK';
    }),
    del: vi.fn(async (key: string) => {
      store.delete(key);
      return 1;
    }),
    _store: store,
  };
}

function createMockFetcher(metadata?: OAuthClientMetadata): CIMDFetcher {
  return {
    fetch: vi.fn(async () => {
      if (!metadata) throw new Error('CIMD fetch failed');
      return metadata;
    }),
  };
}

const cimdMetadata: OAuthClientMetadata = {
  redirect_uris: ['https://claude.ai/api/mcp/auth_callback'],
  client_name: 'Claude',
  token_endpoint_auth_method: 'none',
};

const dcrClient: OAuthClientInformationFull = {
  client_id: 'chatgpt-client-123',
  redirect_uris: ['https://chatgpt.com/connector/oauth/abc'],
  client_name: 'ChatGPT',
  token_endpoint_auth_method: 'none',
  client_id_issued_at: 1700000000,
};

describe('RedisClientStore', () => {
  let redis: ReturnType<typeof createMockRedis>;

  beforeEach(() => {
    redis = createMockRedis();
  });

  describe('DCR clients', () => {
    it('registers and retrieves a DCR client', async () => {
      const store = new RedisClientStore({ redis: redis as never });

      await store.registerClient(dcrClient);
      expect(redis.set).toHaveBeenCalledWith(
        'freee-mcp:oauth:client:chatgpt-client-123',
        expect.any(String),
        'EX',
        31536000,
      );

      const result = await store.getClient('chatgpt-client-123');
      expect(result?.client_id).toBe('chatgpt-client-123');
      expect(result?.client_name).toBe('ChatGPT');
    });

    it('returns undefined for unknown DCR client', async () => {
      const store = new RedisClientStore({ redis: redis as never });
      const result = await store.getClient('unknown-id');
      expect(result).toBeUndefined();
    });

    it('cleans up corrupt DCR data', async () => {
      redis._store.set('freee-mcp:oauth:client:bad-data', '{invalid json broken');
      const store = new RedisClientStore({ redis: redis as never });

      const result = await store.getClient('bad-data');
      expect(result).toBeUndefined();
    });
  });

  describe('CIMD clients', () => {
    it('fetches and caches CIMD metadata', async () => {
      const fetcher = createMockFetcher(cimdMetadata);
      const store = new RedisClientStore({ redis: redis as never, cimdFetcher: fetcher });

      const result = await store.getClient('https://claude.ai/oauth/mcp-oauth-client-metadata');
      expect(fetcher.fetch).toHaveBeenCalledWith(
        'https://claude.ai/oauth/mcp-oauth-client-metadata',
      );
      expect(result?.client_id).toBe('https://claude.ai/oauth/mcp-oauth-client-metadata');
      expect(result?.redirect_uris).toEqual(['https://claude.ai/api/mcp/auth_callback']);
      expect(result?.client_name).toBe('Claude');
    });

    it('returns cached CIMD on second call without re-fetching', async () => {
      const fetcher = createMockFetcher(cimdMetadata);
      const store = new RedisClientStore({ redis: redis as never, cimdFetcher: fetcher });

      await store.getClient('https://claude.ai/oauth/mcp-oauth-client-metadata');
      await store.getClient('https://claude.ai/oauth/mcp-oauth-client-metadata');

      expect(fetcher.fetch).toHaveBeenCalledTimes(1);
    });

    it('returns undefined when CIMD fetch fails and no cache', async () => {
      const fetcher = createMockFetcher(); // will throw
      const store = new RedisClientStore({ redis: redis as never, cimdFetcher: fetcher });

      const result = await store.getClient('https://example.com/bad-cimd');
      expect(result).toBeUndefined();
    });

    it('treats non-HTTPS client_id as DCR (not CIMD)', async () => {
      const fetcher = createMockFetcher(cimdMetadata);
      const store = new RedisClientStore({ redis: redis as never, cimdFetcher: fetcher });

      // HTTP URL should NOT be treated as CIMD
      const result = await store.getClient('http://example.com/metadata');
      expect(fetcher.fetch).not.toHaveBeenCalled();
      expect(result).toBeUndefined();
    });

    describe('allowInsecureLocalhost opt-in', () => {
      it('treats http://localhost client_id as CIMD when flag is on', async () => {
        const fetcher = createMockFetcher(cimdMetadata);
        const store = new RedisClientStore({
          redis: redis as never,
          cimdFetcher: fetcher,
          allowInsecureLocalhost: true,
        });

        const result = await store.getClient(
          'http://localhost:3000/.well-known/oauth-client-metadata',
        );
        expect(fetcher.fetch).toHaveBeenCalledWith(
          'http://localhost:3000/.well-known/oauth-client-metadata',
        );
        expect(result?.client_id).toBe('http://localhost:3000/.well-known/oauth-client-metadata');
      });

      it('treats http://127.0.0.1 client_id as CIMD when flag is on', async () => {
        const fetcher = createMockFetcher(cimdMetadata);
        const store = new RedisClientStore({
          redis: redis as never,
          cimdFetcher: fetcher,
          allowInsecureLocalhost: true,
        });

        await store.getClient('http://127.0.0.1:3000/.well-known/oauth-client-metadata');
        expect(fetcher.fetch).toHaveBeenCalledTimes(1);
      });

      it('does NOT treat http://example.com client_id as CIMD even when flag is on', async () => {
        const fetcher = createMockFetcher(cimdMetadata);
        const store = new RedisClientStore({
          redis: redis as never,
          cimdFetcher: fetcher,
          allowInsecureLocalhost: true,
        });

        const result = await store.getClient('http://example.com/metadata');
        expect(fetcher.fetch).not.toHaveBeenCalled();
        expect(result).toBeUndefined();
      });
    });
  });

  describe('Redis error handling', () => {
    const redisError = new Error('Connection lost');

    it('should throw RedisUnavailableError on registerClient failure', async () => {
      redis.set.mockRejectedValueOnce(redisError);
      const store = new RedisClientStore({ redis: redis as never });

      await expect(
        store.registerClient({
          client_id: 'test-id',
          client_id_issued_at: Math.floor(Date.now() / 1000),
        } as OAuthClientInformationFull),
      ).rejects.toThrow(RedisUnavailableError);
    });

    it('should throw RedisUnavailableError on getDcrClient read failure', async () => {
      redis.get.mockRejectedValueOnce(redisError);
      const store = new RedisClientStore({ redis: redis as never });

      await expect(store.getClient('dcr-client-id')).rejects.toThrow(RedisUnavailableError);
    });

    it('should throw RedisUnavailableError on getCimdClient cache read failure', async () => {
      redis.get.mockRejectedValueOnce(redisError);
      const fetcher = createMockFetcher(cimdMetadata);
      const store = new RedisClientStore({ redis: redis as never, cimdFetcher: fetcher });

      await expect(store.getClient('https://example.com/metadata')).rejects.toThrow(
        RedisUnavailableError,
      );
    });
  });

  describe('Fingerprint dedup', () => {
    it('writes a client-fp index alongside the primary client key on register', async () => {
      const store = new RedisClientStore({ redis: redis as never });

      await store.registerClient({
        client_id: 'cid-1',
        client_id_issued_at: 1700000000,
        redirect_uris: ['https://app.example.com/cb'],
        client_name: 'Example',
      } as OAuthClientInformationFull);

      const fp = computeClientFingerprint({
        redirect_uris: ['https://app.example.com/cb'],
        client_name: 'Example',
      });
      expect(redis._store.get(`freee-mcp:oauth:client-fp:${fp}`)).toBe('cid-1');
    });

    it('findClientByFingerprint returns the registered client', async () => {
      const store = new RedisClientStore({ redis: redis as never });

      const client = {
        client_id: 'cid-1',
        client_id_issued_at: 1700000000,
        redirect_uris: ['https://app.example.com/cb'],
        client_name: 'Example',
      } as OAuthClientInformationFull;
      await store.registerClient(client);

      const fp = computeClientFingerprint(client);
      const found = await store.findClientByFingerprint(fp);
      expect(found?.client_id).toBe('cid-1');
      expect(found?.client_name).toBe('Example');
    });

    it('findClientByFingerprint returns undefined for unknown fingerprint', async () => {
      const store = new RedisClientStore({ redis: redis as never });
      const found = await store.findClientByFingerprint('deadbeef'.repeat(8));
      expect(found).toBeUndefined();
    });

    describe('expired client_secret', () => {
      const nowSec = () => Math.floor(Date.now() / 1000);

      // Registration metadata is identical on re-registration, so the
      // fingerprint is identical too. Without an expiry check the dedup hands
      // the same dead secret back forever and the client cannot recover.
      const confidentialClient = (expiresAt: number | undefined): OAuthClientInformationFull =>
        ({
          client_id: 'cid-1',
          client_id_issued_at: 1700000000,
          client_secret: 'sec',
          client_secret_expires_at: expiresAt,
          redirect_uris: ['https://app.example.com/cb'],
          client_name: 'Example',
          token_endpoint_auth_method: 'client_secret_basic',
        }) as OAuthClientInformationFull;

      it('reports a miss and drops the fingerprint index when the secret expired', async () => {
        const store = new RedisClientStore({ redis: redis as never });
        const client = confidentialClient(nowSec() - 60);
        await store.registerClient(client);
        const fp = computeClientFingerprint(client);

        expect(await store.findClientByFingerprint(fp)).toBeUndefined();
        expect(redis._store.has(`freee-mcp:oauth:client-fp:${fp}`)).toBe(false);
        // The registration itself survives so a client still holding the dead
        // secret gets `Client secret has expired` rather than `Invalid client_id`.
        expect(redis._store.has('freee-mcp:oauth:client:cid-1')).toBe(true);
      });

      // Legacy registrations issued before secrets became non-expiring still
      // carry a finite expiry; those must keep working until it actually passes.
      it('returns the client while a finite secret is still valid', async () => {
        const store = new RedisClientStore({ redis: redis as never });
        const client = confidentialClient(nowSec() + 60 * 60);
        await store.registerClient(client);

        const found = await store.findClientByFingerprint(computeClientFingerprint(client));
        expect(found?.client_id).toBe('cid-1');
      });

      it('returns the client when client_secret_expires_at is 0 (never expires)', async () => {
        const store = new RedisClientStore({ redis: redis as never });
        const client = confidentialClient(0);
        await store.registerClient(client);

        const found = await store.findClientByFingerprint(computeClientFingerprint(client));
        expect(found?.client_id).toBe('cid-1');
      });

      it('returns public clients, which carry no secret to expire', async () => {
        const store = new RedisClientStore({ redis: redis as never });
        const client = {
          client_id: 'cid-public',
          client_id_issued_at: 1700000000,
          redirect_uris: ['https://app.example.com/cb'],
          client_name: 'Example',
          token_endpoint_auth_method: 'none',
        } as OAuthClientInformationFull;
        await store.registerClient(client);

        const found = await store.findClientByFingerprint(computeClientFingerprint(client));
        expect(found?.client_id).toBe('cid-public');
      });
    });
  });
});

describe('isClientSecretExpired', () => {
  it('treats an absent client_secret_expires_at as never expiring', () => {
    expect(isClientSecretExpired({}, 1_000_000)).toBe(false);
  });

  it('treats client_secret_expires_at = 0 as never expiring (RFC 7591)', () => {
    expect(isClientSecretExpired({ client_secret_expires_at: 0 }, 1_000_000)).toBe(false);
  });

  it('matches the SDK authenticateClient boundary exactly', () => {
    // SDK: expires_at < now. Equal means still valid.
    expect(isClientSecretExpired({ client_secret_expires_at: 1_000_000 }, 1_000_000)).toBe(false);
    expect(isClientSecretExpired({ client_secret_expires_at: 999_999 }, 1_000_000)).toBe(true);
  });

  it('reports a future expiry as still valid', () => {
    expect(isClientSecretExpired({ client_secret_expires_at: 1_000_001 }, 1_000_000)).toBe(false);
  });
});

describe('computeClientFingerprint', () => {
  it('produces the same hash for identical metadata', () => {
    const a = computeClientFingerprint({
      software_id: 'sw-1',
      redirect_uris: ['https://app.example.com/cb'],
      client_name: 'Example',
      scope: 'mcp:read mcp:write',
      grant_types: ['authorization_code'],
      response_types: ['code'],
    });
    const b = computeClientFingerprint({
      software_id: 'sw-1',
      redirect_uris: ['https://app.example.com/cb'],
      client_name: 'Example',
      scope: 'mcp:read mcp:write',
      grant_types: ['authorization_code'],
      response_types: ['code'],
    });
    expect(a).toBe(b);
  });

  it('is order-insensitive for redirect_uris, grant_types, response_types', () => {
    const a = computeClientFingerprint({
      redirect_uris: ['https://a.example.com/cb', 'https://b.example.com/cb'],
      grant_types: ['authorization_code', 'refresh_token'],
      response_types: ['code', 'token'],
    });
    const b = computeClientFingerprint({
      redirect_uris: ['https://b.example.com/cb', 'https://a.example.com/cb'],
      grant_types: ['refresh_token', 'authorization_code'],
      response_types: ['token', 'code'],
    });
    expect(a).toBe(b);
  });

  it('normalizes missing optional fields to defaults', () => {
    const a = computeClientFingerprint({
      redirect_uris: ['https://app.example.com/cb'],
    });
    const b = computeClientFingerprint({
      software_id: '',
      redirect_uris: ['https://app.example.com/cb'],
      client_name: '',
      client_uri: '',
      scope: '',
      token_endpoint_auth_method: '',
      grant_types: [],
      response_types: [],
    });
    expect(a).toBe(b);
  });

  it('produces different hashes for different metadata', () => {
    const a = computeClientFingerprint({
      redirect_uris: ['https://a.example.com/cb'],
      client_name: 'A',
    });
    const b = computeClientFingerprint({
      redirect_uris: ['https://a.example.com/cb'],
      client_name: 'B',
    });
    expect(a).not.toBe(b);
  });
});
