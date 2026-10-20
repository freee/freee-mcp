import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { HttpCIMDFetcher, isLocalhostUrl } from './cimd-fetcher.js';

describe('isLocalhostUrl', () => {
  it('returns true for localhost / 127.0.0.1 / [::1]', () => {
    expect(isLocalhostUrl('http://localhost:3000/metadata')).toBe(true);
    expect(isLocalhostUrl('https://localhost/metadata')).toBe(true);
    expect(isLocalhostUrl('http://127.0.0.1:3000/metadata')).toBe(true);
    expect(isLocalhostUrl('http://[::1]:3000/metadata')).toBe(true);
  });

  it('returns false for non-loopback hosts', () => {
    expect(isLocalhostUrl('http://example.com/metadata')).toBe(false);
    expect(isLocalhostUrl('http://10.0.0.1/metadata')).toBe(false);
    expect(isLocalhostUrl('http://dev.local/metadata')).toBe(false);
    expect(isLocalhostUrl('not-a-url')).toBe(false);
  });
});

describe('HttpCIMDFetcher safety gate', () => {
  const originalFetch = globalThis.fetch;

  // The production gate rejects before we hit the network, so we only need to
  // stub fetch for the opt-in cases where the URL is accepted.
  const stubFetchReturning = (body: unknown) => {
    globalThis.fetch = vi.fn(async () => {
      return new Response(JSON.stringify(body), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }) as unknown as typeof fetch;
  };

  beforeEach(() => {
    globalThis.fetch = vi.fn(async () => {
      throw new Error('fetch should not be called when URL is rejected');
    }) as unknown as typeof fetch;
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  const validMetadata = {
    redirect_uris: ['http://localhost:3000/oauth/callback'],
    client_name: 'test',
    token_endpoint_auth_method: 'none',
  };

  describe('default (allowInsecureLocalhost = false)', () => {
    it('rejects http:// URLs', async () => {
      const fetcher = new HttpCIMDFetcher();
      await expect(fetcher.fetch('http://example.com/metadata')).rejects.toThrow('Unsafe CIMD URL');
    });

    it('rejects https://localhost', async () => {
      const fetcher = new HttpCIMDFetcher();
      await expect(fetcher.fetch('https://localhost/metadata')).rejects.toThrow('Unsafe CIMD URL');
    });

    it('rejects http://localhost', async () => {
      const fetcher = new HttpCIMDFetcher();
      await expect(fetcher.fetch('http://localhost:3000/metadata')).rejects.toThrow(
        'Unsafe CIMD URL',
      );
    });
  });

  describe('allowInsecureLocalhost = true', () => {
    it('accepts http://localhost', async () => {
      stubFetchReturning(validMetadata);
      const fetcher = new HttpCIMDFetcher({ allowInsecureLocalhost: true });

      const result = await fetcher.fetch('http://localhost:3000/metadata');
      expect(result.client_name).toBe('test');
    });

    it('accepts http://127.0.0.1', async () => {
      stubFetchReturning(validMetadata);
      const fetcher = new HttpCIMDFetcher({ allowInsecureLocalhost: true });

      await fetcher.fetch('http://127.0.0.1:3000/metadata');
      expect(globalThis.fetch).toHaveBeenCalled();
    });

    it('still rejects http:// to non-loopback hosts (e.g. 10.x.x.x)', async () => {
      const fetcher = new HttpCIMDFetcher({ allowInsecureLocalhost: true });
      await expect(fetcher.fetch('http://10.0.0.1/metadata')).rejects.toThrow('Unsafe CIMD URL');
    });

    it('still rejects http:// to public hosts', async () => {
      const fetcher = new HttpCIMDFetcher({ allowInsecureLocalhost: true });
      await expect(fetcher.fetch('http://example.com/metadata')).rejects.toThrow('Unsafe CIMD URL');
    });
  });

  describe('address checks (production)', () => {
    const publicLookup = async () => ['93.184.215.14'];

    it.each([
      'https://169.254.169.254/latest/meta-data/',
      'https://100.64.0.1/metadata',
      'https://198.18.0.1/metadata',
      'https://224.0.0.1/metadata',
      'https://2130706433/metadata', // 127.0.0.1 in decimal
      'https://0x7f.1/metadata',
      'https://[::ffff:7f00:1]/metadata',
      'https://[::ffff:169.254.169.254]/metadata',
      'https://[fd00:ec2::254]/metadata',
      'https://[fe80::1]/metadata',
      'https://[64:ff9b::a00:1]/metadata',
      'https://metadata.google.internal/computeMetadata/v1/',
      'https://foo.localhost/metadata',
    ])('rejects %s', async (url) => {
      const fetcher = new HttpCIMDFetcher({ lookup: publicLookup });
      await expect(fetcher.fetch(url)).rejects.toThrow('Unsafe CIMD URL');
    });

    it.each([
      ['127.0.0.1'],
      ['169.254.169.254'],
      ['10.0.0.5'],
      ['::1'],
      ['fd00:ec2::254'],
    ])('rejects a public hostname that resolves to %s', async (address) => {
      const fetcher = new HttpCIMDFetcher({ lookup: async () => ['93.184.215.14', address] });
      await expect(fetcher.fetch('https://client.example.com/metadata')).rejects.toThrow(
        'resolves to a non-public address',
      );
    });

    it('rejects when DNS resolution fails', async () => {
      const fetcher = new HttpCIMDFetcher({
        lookup: async () => {
          throw new Error('ENOTFOUND');
        },
      });
      await expect(fetcher.fetch('https://client.example.com/metadata')).rejects.toThrow(
        'DNS resolution failed',
      );
    });

    it('accepts a hostname that resolves only to public addresses', async () => {
      stubFetchReturning(validMetadata);
      const fetcher = new HttpCIMDFetcher({ lookup: publicLookup });
      const result = await fetcher.fetch('https://client.example.com/metadata');
      expect(result.client_name).toBe('test');
    });

    it('rejects a response larger than 1MB', async () => {
      globalThis.fetch = vi.fn(async () => {
        return new Response('x'.repeat(1_048_577), { status: 200 });
      }) as unknown as typeof fetch;
      const fetcher = new HttpCIMDFetcher({ lookup: publicLookup });
      await expect(fetcher.fetch('https://client.example.com/metadata')).rejects.toThrow(
        'too large',
      );
    });
  });
});
