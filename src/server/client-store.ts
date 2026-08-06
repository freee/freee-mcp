import { createHash } from 'node:crypto';
import type { OAuthRegisteredClientsStore } from '@modelcontextprotocol/sdk/server/auth/clients.js';
import type { OAuthClientInformationFull } from '@modelcontextprotocol/sdk/shared/auth.js';
import { OAuthClientInformationFullSchema } from '@modelcontextprotocol/sdk/shared/auth.js';
import { OAUTH_KEY_PREFIX } from '../constants.js';
import type { Redis } from '../storage/redis-client.js';
import { type CIMDFetcher, HttpCIMDFetcher, hashCimdUrl, isLocalhostUrl } from './cimd-fetcher.js';
import { RedisUnavailableError, withRedis } from './errors.js';
import { getLogger } from './logger.js';

const CIMD_CACHE_TTL_SECONDS = 60 * 60; // 1 hour
// The registration record's lifetime is the only clock: /register issues
// non-expiring secrets (clientSecretExpirySeconds: 0 in http-server.ts), so a
// credential stays usable for exactly as long as the record it belongs to.
const CLIENT_TTL_SECONDS = 365 * 24 * 60 * 60; // 1 year

// RFC 7591 §3.2.1: client_secret_expires_at = 0 means the secret never expires,
// and it is absent for public clients (token_endpoint_auth_method=none). Both
// cases are "not expired".
//
// This is exactly the SDK's authenticateClient check, so the Basic-auth adapter
// and the SDK's body-credential path agree to the second. It still matters after
// secrets became non-expiring: registrations issued earlier carry a finite
// 30-day expiry, and this is what lets those recover.
export function isClientSecretExpired(
  client: Pick<OAuthClientInformationFull, 'client_secret_expires_at'>,
  nowSeconds: number,
): boolean {
  if (!client.client_secret_expires_at) return false;
  return client.client_secret_expires_at < nowSeconds;
}

// Stable fingerprint over RFC 7591 client metadata fields. Vendor-fronted
// clients (e.g. claude.ai) repeat the same metadata for every user, so a
// content fingerprint lets us reuse a single registration instead of
// minting a new client_id per request and exhausting the /register limit.
export function computeClientFingerprint(metadata: Partial<OAuthClientInformationFull>): string {
  const normalized = {
    software_id: metadata.software_id ?? '',
    redirect_uris: [...(metadata.redirect_uris ?? [])].sort(),
    client_name: metadata.client_name ?? '',
    client_uri: metadata.client_uri ?? '',
    scope: metadata.scope ?? '',
    token_endpoint_auth_method: metadata.token_endpoint_auth_method ?? '',
    grant_types: [...(metadata.grant_types ?? [])].sort(),
    response_types: [...(metadata.response_types ?? [])].sort(),
  };
  return createHash('sha256').update(JSON.stringify(normalized)).digest('hex');
}

interface ClientStoreOptions {
  redis: Redis;
  cimdFetcher?: CIMDFetcher;
  prefix?: string;
  // Paired with HttpCIMDFetcher's allowInsecureLocalhost; widens isCimdUrl
  // so http://localhost client_ids take the CIMD branch instead of falling
  // through to DCR lookup. Local-development only.
  allowInsecureLocalhost?: boolean;
}

function isCimdUrl(clientId: string, allowInsecureLocalhost: boolean): boolean {
  if (clientId.startsWith('https://')) return true;
  if (allowInsecureLocalhost && clientId.startsWith('http://') && isLocalhostUrl(clientId)) {
    return true;
  }
  return false;
}

export class RedisClientStore implements OAuthRegisteredClientsStore {
  private readonly redis: Redis;
  private readonly cimdFetcher: CIMDFetcher;
  private readonly prefix: string;
  private readonly allowInsecureLocalhost: boolean;

  constructor(options: ClientStoreOptions) {
    this.redis = options.redis;
    this.allowInsecureLocalhost = options.allowInsecureLocalhost ?? false;
    this.cimdFetcher =
      options.cimdFetcher ??
      new HttpCIMDFetcher({ allowInsecureLocalhost: this.allowInsecureLocalhost });
    this.prefix = options.prefix ?? OAUTH_KEY_PREFIX;
  }

  async getClient(clientId: string): Promise<OAuthClientInformationFull | undefined> {
    if (isCimdUrl(clientId, this.allowInsecureLocalhost)) {
      return this.getCimdClient(clientId);
    }
    return this.getDcrClient(clientId);
  }

  async registerClient(client: OAuthClientInformationFull): Promise<OAuthClientInformationFull> {
    const fp = computeClientFingerprint(client);
    await withRedis('registerClient', () =>
      this.redis.set(
        `${this.prefix}:client:${client.client_id}`,
        JSON.stringify(client),
        'EX',
        CLIENT_TTL_SECONDS,
      ),
    );
    await withRedis('registerClient:fp-write', () =>
      this.redis.set(`${this.prefix}:client-fp:${fp}`, client.client_id, 'EX', CLIENT_TTL_SECONDS),
    );
    return client;
  }

  // Look up an existing DCR client by metadata fingerprint. Used by the
  // /register dedup middleware to skip rate-limit accounting when an
  // identical metadata payload arrives again from the same vendor.
  //
  // A registration whose client_secret has expired counts as a miss: handing it
  // back would fail client authentication on every later /token call, and since
  // re-registration replays the same metadata (hence the same fingerprint), the
  // client would loop on the dead credential with no way to recover. Reporting
  // a miss lets /register mint a fresh registration instead.
  async findClientByFingerprint(
    fingerprint: string,
  ): Promise<OAuthClientInformationFull | undefined> {
    const fpKey = `${this.prefix}:client-fp:${fingerprint}`;
    const clientId = await withRedis('findClientByFingerprint:lookup', () => this.redis.get(fpKey));
    if (!clientId) return undefined;

    const client = await this.getDcrClient(clientId);
    if (!client) return undefined;

    if (isClientSecretExpired(client, Math.floor(Date.now() / 1000))) {
      // Drop the stale pointer now rather than waiting for registerClient to
      // overwrite it: the caller may still be rejected by the rate limiter, and
      // a fingerprint index aimed at a dead secret is never useful again.
      getLogger().info(
        { clientId },
        'Fingerprint hit had an expired client_secret, re-registering',
      );
      await withRedis('findClientByFingerprint:expired-cleanup', () => this.redis.del(fpKey));
      return undefined;
    }
    return client;
  }

  private async getCimdClient(
    clientIdUrl: string,
  ): Promise<OAuthClientInformationFull | undefined> {
    const hash = hashCimdUrl(clientIdUrl);
    const cacheKey = `${this.prefix}:cimd:${hash}`;

    const cached = await withRedis('getCimdClient:cache-read', () => this.redis.get(cacheKey));

    if (cached) {
      const parsed = this.parseClientData(cached);
      if (parsed) return parsed;
    }

    try {
      const metadata = await this.cimdFetcher.fetch(clientIdUrl);
      const clientInfo: OAuthClientInformationFull = {
        ...metadata,
        client_id: clientIdUrl,
        client_id_issued_at: Math.floor(Date.now() / 1000),
      };

      await withRedis('getCimdClient:cache-write', () =>
        this.redis.set(cacheKey, JSON.stringify(clientInfo), 'EX', CIMD_CACHE_TTL_SECONDS),
      );
      return clientInfo;
    } catch (err) {
      if (err instanceof RedisUnavailableError) throw err;
      getLogger().error({ clientIdUrl, err }, 'CIMD fetch failed');
      return undefined;
    }
  }

  private async getDcrClient(clientId: string): Promise<OAuthClientInformationFull | undefined> {
    const key = `${this.prefix}:client:${clientId}`;
    const raw = await withRedis('getDcrClient:read', () => this.redis.get(key));
    if (!raw) return undefined;

    const parsed = this.parseClientData(raw);
    if (parsed) return parsed;

    getLogger().error({ clientId }, 'Corrupt DCR client data, removing key');
    await withRedis('getDcrClient:cleanup', () => this.redis.del(key));
    return undefined;
  }

  private parseClientData(raw: string): OAuthClientInformationFull | null {
    try {
      const result = OAuthClientInformationFullSchema.safeParse(JSON.parse(raw));
      return result.success ? result.data : null;
    } catch {
      return null;
    }
  }
}
