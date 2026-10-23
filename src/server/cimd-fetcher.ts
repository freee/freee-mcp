import { createHash } from 'node:crypto';
import { lookup } from 'node:dns/promises';
import { request } from 'node:https';
import { BlockList, isIP, type LookupFunction } from 'node:net';
import type { OAuthClientMetadata } from '@modelcontextprotocol/sdk/shared/auth.js';
import { OAuthClientMetadataSchema } from '@modelcontextprotocol/sdk/shared/auth.js';
import { getUserAgent } from './user-agent.js';

const CIMD_FETCH_TIMEOUT_MS = 5000;
const MAX_RESPONSE_BYTES = 1_048_576; // 1MB

export interface CIMDFetcher {
  fetch(url: string): Promise<OAuthClientMetadata>;
}

interface HttpCIMDFetcherOptions {
  // When true, http:// URLs whose host is localhost / 127.0.0.1 / [::1] bypass
  // the HTTPS requirement and the SSRF hostname filter. Intended for local
  // development only; callers must gate this on a non-production environment.
  allowInsecureLocalhost?: boolean;
  // Resolves a hostname to every address it maps to. Injectable for tests.
  lookup?: AddressLookup;
  // Sends the GET to an already-validated address. Injectable for tests.
  request?: PinnedRequest;
}

export function hashCimdUrl(url: string): string {
  return createHash('sha256').update(url).digest('hex');
}

// Exported so RedisClientStore can apply the same "localhost" definition when
// deciding whether an http:// client_id should be treated as CIMD.
export function isLocalhostUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return (
      parsed.hostname === 'localhost' ||
      parsed.hostname === '127.0.0.1' ||
      parsed.hostname === '[::1]'
    );
  } catch {
    return false;
  }
}

// Address ranges a CIMD fetch must never reach: loopback, private, link-local
// (incl. cloud metadata such as 169.254.169.254 / fd00:ec2::254), CGNAT,
// benchmarking, documentation, multicast and reserved space. IPv4-mapped IPv6
// (::ffff:a.b.c.d) is matched against the IPv4 entries by BlockList itself.
const BLOCKED_ADDRESSES = (() => {
  const list = new BlockList();
  const v4: Array<[string, number]> = [
    ['0.0.0.0', 8],
    ['10.0.0.0', 8],
    ['100.64.0.0', 10],
    ['127.0.0.0', 8],
    ['169.254.0.0', 16],
    ['172.16.0.0', 12],
    ['192.0.0.0', 24],
    ['192.0.2.0', 24],
    ['192.168.0.0', 16],
    ['198.18.0.0', 15],
    ['198.51.100.0', 24],
    ['203.0.113.0', 24],
    ['224.0.0.0', 4],
    ['240.0.0.0', 4],
  ];
  const v6: Array<[string, number]> = [
    ['::', 128],
    ['::1', 128],
    ['::', 96], // IPv4-compatible (deprecated)
    ['64:ff9b::', 96], // NAT64 can translate to any IPv4, including private
    ['64:ff9b:1::', 48],
    ['100::', 64],
    ['2001:db8::', 32],
    ['2002::', 16], // 6to4 embeds an arbitrary IPv4
    ['fc00::', 7],
    ['fe80::', 10],
    ['fec0::', 10],
    ['ff00::', 8],
  ];
  for (const [net, prefix] of v4) list.addSubnet(net, prefix, 'ipv4');
  for (const [net, prefix] of v6) list.addSubnet(net, prefix, 'ipv6');
  return list;
})();

function isBlockedAddress(address: string): boolean {
  const family = isIP(address);
  if (family === 0) return true;
  return BLOCKED_ADDRESSES.check(address, family === 6 ? 'ipv6' : 'ipv4');
}

function isPrivateHostname(hostname: string): boolean {
  // WHATWG URL already normalizes IPv4 shorthand (e.g. 2130706433, 0x7f.1)
  // to dotted form and keeps IPv6 literals in brackets.
  const bare = hostname.replace(/^\[|\]$/g, '');
  if (isIP(bare) !== 0) return isBlockedAddress(bare);

  const name = bare.toLowerCase().replace(/\.$/, '');
  return (
    name === 'localhost' ||
    name.endsWith('.localhost') ||
    name.endsWith('.local') ||
    name.endsWith('.internal')
  );
}

type AddressLookup = (hostname: string) => Promise<string[]>;

async function defaultLookup(hostname: string): Promise<string[]> {
  const results = await lookup(hostname, { all: true, verbatim: true });
  return results.map((r) => r.address);
}

function isSafeUrl(url: string, allowInsecureLocalhost: boolean): boolean {
  try {
    const parsed = new URL(url);
    // Dev-only escape hatch: accept http://localhost (and loopback variants)
    // without the production SSRF filter. The loopback host is only reachable
    // from the process itself, so widening here does not expose new targets.
    if (
      allowInsecureLocalhost &&
      (parsed.protocol === 'http:' || parsed.protocol === 'https:') &&
      isLocalhostUrl(url)
    ) {
      return true;
    }
    if (parsed.protocol !== 'https:') return false;
    if (isPrivateHostname(parsed.hostname)) return false;
    return true;
  } catch {
    return false;
  }
}

// Performs a GET whose TCP connection goes to `address` while TLS SNI and
// certificate verification still use the URL's hostname.
type PinnedRequest = (
  url: URL,
  address: string,
  headers: Record<string, string>,
  signal: AbortSignal,
) => Promise<PinnedResponse>;

interface PinnedResponse {
  status: number;
  statusText: string;
  body: AsyncIterable<Uint8Array>;
}

function pinnedHttpsGet(
  url: URL,
  address: string,
  headers: Record<string, string>,
  signal: AbortSignal,
): Promise<PinnedResponse> {
  const hostname = url.hostname.replace(/^\[|\]$/g, '');
  const family = isIP(address);
  // Answer the socket's lookup with the address that was already validated,
  // so a second DNS answer (rebinding) cannot redirect the connection.
  const pinnedLookup: LookupFunction = (_host, options, callback) => {
    if (options.all) {
      callback(null, [{ address, family }]);
    } else {
      callback(null, address, family);
    }
  };
  return new Promise((resolve, reject) => {
    const req = request(
      {
        host: hostname,
        port: url.port || 443,
        path: `${url.pathname}${url.search}`,
        method: 'GET',
        // SNI must be a hostname; for IP literals leave it unset
        servername: isIP(hostname) === 0 ? hostname : undefined,
        // Bun derives SNI and certificate checks from Host, not servername,
        // and would otherwise send the pinned IP
        headers: { ...headers, Host: url.host },
        signal,
        lookup: pinnedLookup,
        // A pooled keep-alive socket would skip the lookup above
        agent: false,
      },
      (res) => {
        // https.request never follows redirects, so a 3xx surfaces as non-2xx
        resolve({ status: res.statusCode ?? 0, statusText: res.statusMessage ?? '', body: res });
      },
    );
    // `on`, not `once`: Bun can emit a second error for the same failure, and
    // an unhandled one would crash the process
    req.on('error', reject);
    req.end();
  });
}

async function readBodyWithLimit(
  body: AsyncIterable<Uint8Array>,
  maxBytes: number,
): Promise<string> {
  const chunks: Uint8Array[] = [];
  let total = 0;
  // Leaving the loop early (throw) closes the underlying stream
  for await (const chunk of body) {
    total += chunk.byteLength;
    if (total > maxBytes) {
      throw new Error('CIMD response too large (> 1MB)');
    }
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString('utf8');
}

export class HttpCIMDFetcher implements CIMDFetcher {
  private readonly allowInsecureLocalhost: boolean;
  private readonly lookup: AddressLookup;
  private readonly request: PinnedRequest;

  constructor(options: HttpCIMDFetcherOptions = {}) {
    this.allowInsecureLocalhost = options.allowInsecureLocalhost ?? false;
    this.lookup = options.lookup ?? defaultLookup;
    this.request = options.request ?? pinnedHttpsGet;
  }

  // A public-looking hostname can still resolve to a private or metadata
  // address, so check every resolved address, not just the URL's host string.
  // Returns the address to connect to; the caller must use it instead of
  // resolving the hostname again.
  private async resolvePublicAddress(url: URL): Promise<string> {
    const hostname = url.hostname.replace(/^\[|\]$/g, '');
    if (isIP(hostname) !== 0) return hostname; // already checked by isSafeUrl
    let addresses: string[];
    try {
      addresses = await this.lookup(hostname);
    } catch {
      throw new Error(`Unsafe CIMD URL: ${url.href} (DNS resolution failed)`);
    }
    if (addresses.length === 0 || addresses.some(isBlockedAddress)) {
      throw new Error(`Unsafe CIMD URL: ${url.href} (resolves to a non-public address)`);
    }
    return addresses[0];
  }

  async fetch(url: string): Promise<OAuthClientMetadata> {
    if (!isSafeUrl(url, this.allowInsecureLocalhost)) {
      throw new Error(`Unsafe CIMD URL: ${url}`);
    }

    const headers = {
      Accept: 'application/json',
      'User-Agent': getUserAgent(),
    };
    const signal = AbortSignal.timeout(CIMD_FETCH_TIMEOUT_MS);

    let status: number;
    let statusText: string;
    let body: AsyncIterable<Uint8Array>;
    if (this.allowInsecureLocalhost && isLocalhostUrl(url)) {
      // Dev-only: loopback over http:// needs neither the SSRF filter nor pinning
      const response = await globalThis.fetch(url, {
        method: 'GET',
        headers,
        redirect: 'error',
        signal,
      });
      status = response.status;
      statusText = response.statusText;
      body = (response.body ?? []) as AsyncIterable<Uint8Array>;
    } else {
      const parsed = new URL(url);
      const address = await this.resolvePublicAddress(parsed);
      ({ status, statusText, body } = await this.request(parsed, address, headers, signal));
    }

    if (status < 200 || status >= 300) {
      throw new Error(`CIMD fetch failed: ${status} ${statusText}`);
    }

    // Stop reading once the limit is exceeded instead of buffering the whole
    // body (Content-Length can be omitted with chunked encoding)
    const text = await readBodyWithLimit(body, MAX_RESPONSE_BYTES);

    const json: unknown = JSON.parse(text);
    const result = OAuthClientMetadataSchema.safeParse(json);
    if (!result.success) {
      throw new Error(`Invalid CIMD metadata: ${result.error.message}`);
    }

    return result.data;
  }
}
