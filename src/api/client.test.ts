import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { getUserAgent } from '../server/user-agent.js';
import {
  type BinaryFileResponse,
  formatRetryAfterMessage,
  isBinaryFileResponse,
  MAX_XML_RESPONSE_BYTES,
  makeApiRequest,
} from './client.js';

// Test constants (defined after mocks due to hoisting)
const TEST_API_URL = 'https://api.freee.co.jp';
const TEST_COMPANY_ID = '12345';
const TEST_ACCESS_TOKEN = 'test-access-token';
const TEST_DOWNLOAD_DIR = '/tmp';

vi.mock('../config.js', () => ({
  getConfig: (): { freee: { apiUrl: string; companyId: string } } => ({
    freee: {
      apiUrl: 'https://api.freee.co.jp',
      companyId: '12345',
    },
  }),
}));

vi.mock('../config/companies.js', () => ({
  getCurrentCompanyId: vi.fn(),
  getDownloadDir: vi.fn(),
}));

const { getCurrentCompanyId, getDownloadDir } = await import('../config/companies.js');

vi.mock('../auth/tokens.js', () => ({
  getValidAccessToken: vi.fn(),
}));

const mockFetch = vi.fn();
global.fetch = mockFetch;

interface MockHeaders {
  get: (name: string) => string | null;
}

interface MockJsonResponse {
  ok: true;
  headers: MockHeaders;
  json: () => Promise<unknown>;
  text: () => Promise<string>;
}

interface MockErrorResponse {
  ok: false;
  status: number;
  json: () => Promise<unknown>;
}

interface MockBinaryResponse {
  ok: true;
  status: number;
  headers: MockHeaders;
  arrayBuffer: () => Promise<ArrayBufferLike>;
}

/**
 * Create mock headers with content-type
 */
function createMockHeaders(contentType: string, contentLength?: string): MockHeaders {
  return {
    get: (name: string) => {
      const normalizedName = name.toLowerCase();
      if (normalizedName === 'content-type') return contentType;
      if (normalizedName === 'content-length') return contentLength ?? null;
      return null;
    },
  };
}

/**
 * Create a successful JSON response mock
 */
function createJsonResponse(data: unknown): MockJsonResponse {
  return {
    ok: true,
    headers: createMockHeaders('application/json'),
    json: () => Promise.resolve(data),
    text: () => Promise.resolve(JSON.stringify(data)),
  };
}

/**
 * Create an error response mock
 */
function createErrorResponse(status: number, errorData: unknown): MockErrorResponse {
  return {
    ok: false,
    status,
    json: () => Promise.resolve(errorData),
  };
}

/**
 * Create a binary response mock
 */
function createBinaryResponse(contentType: string, data: Uint8Array): MockBinaryResponse {
  return {
    ok: true,
    status: 200,
    headers: createMockHeaders(contentType),
    arrayBuffer: () => Promise.resolve(data.buffer),
  };
}

/**
 * Setup access token mock
 */
async function setupAccessToken(token: string | null): Promise<void> {
  const mockGetValidAccessToken = await import('../auth/tokens.js');
  vi.mocked(mockGetValidAccessToken.getValidAccessToken).mockResolvedValue(token);
}

describe('formatRetryAfterMessage', () => {
  it('returns fallback message when header is null', () => {
    expect(formatRetryAfterMessage(null)).toBe('数分待ってから再試行してください。');
  });

  it('formats integer delta-seconds', () => {
    expect(formatRetryAfterMessage('60')).toBe('60秒後に再試行してください。');
  });

  it('trims whitespace before parsing delta-seconds', () => {
    expect(formatRetryAfterMessage('  120  ')).toBe('120秒後に再試行してください。');
  });

  it('converts HTTP-date form to remaining seconds (RFC 7231)', () => {
    const future = new Date(Date.now() + 90_000).toUTCString();
    const result = formatRetryAfterMessage(future);
    expect(result).toMatch(/^\d+秒後に再試行してください。$/);
    const seconds = Number(result.match(/^(\d+)秒/)?.[1]);
    expect(seconds).toBeGreaterThan(85);
    expect(seconds).toBeLessThanOrEqual(90);
  });

  it('clamps past HTTP-date to zero seconds (no negative)', () => {
    const past = new Date(Date.now() - 60_000).toUTCString();
    expect(formatRetryAfterMessage(past)).toBe('0秒後に再試行してください。');
  });

  it('falls back when header is unparseable', () => {
    expect(formatRetryAfterMessage('not-a-date-or-number')).toBe(
      '数分待ってから再試行してください。',
    );
  });
});

describe('client', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(getCurrentCompanyId).mockResolvedValue(TEST_COMPANY_ID);
    vi.mocked(getDownloadDir).mockResolvedValue(TEST_DOWNLOAD_DIR);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('makeApiRequest', () => {
    it('should make successful API request', async () => {
      await setupAccessToken(TEST_ACCESS_TOKEN);

      const mockResponse = { data: 'test-data' };
      mockFetch.mockResolvedValue(createJsonResponse(mockResponse));

      const result = await makeApiRequest('GET', '/api/1/users/me');

      expect(mockFetch).toHaveBeenCalledWith(
        `${TEST_API_URL}/api/1/users/me`,
        expect.objectContaining({
          method: 'GET',
          headers: {
            Authorization: `Bearer ${TEST_ACCESS_TOKEN}`,
            'Content-Type': 'application/json',
            'User-Agent': getUserAgent(),
            'freee-using-beta': 'true',
            'x-freee-company-id': TEST_COMPANY_ID,
          },
          body: undefined,
          signal: expect.any(AbortSignal),
        }),
      );
      expect(result).toEqual(mockResponse);
    });

    it('should send the requested XML response media type in the Accept header', async () => {
      await setupAccessToken(TEST_ACCESS_TOKEN);
      const xmlData = new TextEncoder().encode('<?xml version="1.0"?><sheet />');
      mockFetch.mockResolvedValue(createBinaryResponse('application/xml', xmlData));

      await makeApiRequest(
        'GET',
        '/hub/tax_return/corporate/sheet/national/10/10100100',
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        'application/xml',
      );

      expect(mockFetch).toHaveBeenCalledWith(
        `${TEST_API_URL}/hub/tax_return/corporate/sheet/national/10/10100100`,
        expect.objectContaining({
          headers: expect.objectContaining({ Accept: 'application/xml' }),
        }),
      );
    });

    it('should include query parameters', async () => {
      await setupAccessToken(TEST_ACCESS_TOKEN);
      mockFetch.mockResolvedValue(createJsonResponse({}));

      const queryParams = { limit: 10, offset: 0 };
      await makeApiRequest('GET', '/api/1/deals', queryParams);

      expect(mockFetch).toHaveBeenCalledWith(
        `${TEST_API_URL}/api/1/deals?limit=10&offset=0`,
        expect.any(Object),
      );
    });

    it('should repeat form array parameters when explode defaults to true', async () => {
      await setupAccessToken(TEST_ACCESS_TOKEN);
      mockFetch.mockResolvedValue(createJsonResponse({}));

      await makeApiRequest(
        'GET',
        '/hub/survey/base_surveys/1/company_survey_results',
        { 'survey_ids[]': [1, 2, 3] },
        undefined,
        undefined,
        undefined,
        [{ name: 'survey_ids[]', in: 'query', type: 'array', style: 'form' }],
      );

      expect(mockFetch).toHaveBeenCalledWith(
        `${TEST_API_URL}/hub/survey/base_surveys/1/company_survey_results?` +
          'survey_ids%5B%5D=1&survey_ids%5B%5D=2&survey_ids%5B%5D=3',
        expect.any(Object),
      );
    });

    it('should join form array parameters when explode is false', async () => {
      await setupAccessToken(TEST_ACCESS_TOKEN);
      mockFetch.mockResolvedValue(createJsonResponse({}));

      await makeApiRequest('GET', '/test', { ids: [1, 2, 3] }, undefined, undefined, undefined, [
        { name: 'ids', in: 'query', type: 'array', style: 'form', explode: false },
      ]);

      expect(mockFetch).toHaveBeenCalledWith(
        `${TEST_API_URL}/test?ids=1%2C2%2C3`,
        expect.any(Object),
      );
    });

    it('should reject array values for schema query parameters', async () => {
      await setupAccessToken(TEST_ACCESS_TOKEN);

      await expect(
        makeApiRequest(
          'GET',
          '/api/1/deals',
          { company_id: [TEST_COMPANY_ID] },
          undefined,
          undefined,
          undefined,
          [{ name: 'company_id', in: 'query', type: 'integer' }],
        ),
      ).rejects.toThrow('クエリパラメータ company_id は単一の値で指定してください。');
      expect(mockFetch).not.toHaveBeenCalled();
    });

    it('should reject scalar values for array query parameters', async () => {
      await setupAccessToken(TEST_ACCESS_TOKEN);

      await expect(
        makeApiRequest('GET', '/test', { ids: '1,2,3' }, undefined, undefined, undefined, [
          { name: 'ids', in: 'query', type: 'array' },
        ]),
      ).rejects.toThrow('クエリパラメータ ids は配列で指定してください。');
      expect(mockFetch).not.toHaveBeenCalled();
    });

    it('should skip undefined parameters', async () => {
      await setupAccessToken(TEST_ACCESS_TOKEN);
      mockFetch.mockResolvedValue(createJsonResponse({}));

      await makeApiRequest('GET', '/api/1/deals', { limit: 10, offset: undefined });

      expect(mockFetch).toHaveBeenCalledWith(
        `${TEST_API_URL}/api/1/deals?limit=10`,
        expect.any(Object),
      );
    });

    it('should include request body for POST requests', async () => {
      await setupAccessToken(TEST_ACCESS_TOKEN);
      mockFetch.mockResolvedValue(createJsonResponse({}));

      const requestBody = { name: 'Test Deal' };
      await makeApiRequest('POST', '/api/1/deals', undefined, requestBody);

      expect(mockFetch).toHaveBeenCalledWith(
        `${TEST_API_URL}/api/1/deals`,
        expect.objectContaining({
          method: 'POST',
          headers: {
            Authorization: `Bearer ${TEST_ACCESS_TOKEN}`,
            'Content-Type': 'application/json',
            'User-Agent': getUserAgent(),
            'freee-using-beta': 'true',
            'x-freee-company-id': TEST_COMPANY_ID,
          },
          body: JSON.stringify(requestBody),
          signal: expect.any(AbortSignal),
        }),
      );
    });

    it('should pass through matching company_id in params', async () => {
      await setupAccessToken(TEST_ACCESS_TOKEN);
      mockFetch.mockResolvedValue(createJsonResponse({}));

      await makeApiRequest('GET', '/api/1/deals', { company_id: TEST_COMPANY_ID });

      expect(mockFetch).toHaveBeenCalledWith(
        `${TEST_API_URL}/api/1/deals?company_id=${TEST_COMPANY_ID}`,
        expect.any(Object),
      );
    });

    it('should throw error for mismatched company_id in params', async () => {
      await setupAccessToken(TEST_ACCESS_TOKEN);

      await expect(makeApiRequest('GET', '/api/1/deals', { company_id: '99999' })).rejects.toThrow(
        'company_id の不整合',
      );
    });

    it('should pass through matching company_id in body', async () => {
      await setupAccessToken(TEST_ACCESS_TOKEN);
      mockFetch.mockResolvedValue(createJsonResponse({}));

      const requestBody = { company_id: TEST_COMPANY_ID, name: 'Test' };
      await makeApiRequest('POST', '/api/1/deals', undefined, requestBody);

      expect(mockFetch).toHaveBeenCalledWith(
        `${TEST_API_URL}/api/1/deals`,
        expect.objectContaining({
          body: JSON.stringify(requestBody),
        }),
      );
    });

    it('should throw error for mismatched company_id in body', async () => {
      await setupAccessToken(TEST_ACCESS_TOKEN);

      await expect(
        makeApiRequest('POST', '/api/1/deals', undefined, { company_id: '99999' }),
      ).rejects.toThrow('company_id の不整合');
    });

    it('should reject path containing query string (tenant smuggling defense)', async () => {
      await setupAccessToken(TEST_ACCESS_TOKEN);

      await expect(
        makeApiRequest('POST', `/api/1/deals?company_id=99999`, undefined, { name: 'Test' }),
      ).rejects.toThrow('"?" または "#"');
      expect(mockFetch).not.toHaveBeenCalled();
    });

    it('should reject path containing fragment', async () => {
      await setupAccessToken(TEST_ACCESS_TOKEN);

      await expect(makeApiRequest('GET', '/api/1/deals#frag')).rejects.toThrow('"?" または "#"');
      expect(mockFetch).not.toHaveBeenCalled();
    });

    it('should not produce duplicate company_id query parameters', async () => {
      await setupAccessToken(TEST_ACCESS_TOKEN);
      mockFetch.mockResolvedValue(createJsonResponse({}));

      await makeApiRequest('GET', '/api/1/deals', { company_id: TEST_COMPANY_ID });

      const calledUrl = mockFetch.mock.calls[0][0] as string;
      const matches = calledUrl.match(/company_id=/g) ?? [];
      expect(matches.length).toBe(1);
    });

    it('should throw error when no access token available', async () => {
      await setupAccessToken(null);

      await expect(makeApiRequest('GET', '/api/1/users/me')).rejects.toThrow(
        '認証が必要です。freee_authenticate ツールを使用して認証を行ってください。',
      );
    });

    it('should throw authentication error for 401 response', async () => {
      await setupAccessToken('invalid-token');
      mockFetch.mockResolvedValue(createErrorResponse(401, { error: 'invalid_token' }));

      await expect(makeApiRequest('GET', '/api/1/users/me')).rejects.toThrow(
        '認証エラーが発生しました。freee_authenticate ツールを使用して再認証を行ってください。',
      );
    });

    it('should throw rate limit / permission error for 403 response', async () => {
      await setupAccessToken(TEST_ACCESS_TOKEN);
      mockFetch.mockResolvedValue(createErrorResponse(403, { error: 'insufficient_scope' }));

      await expect(makeApiRequest('GET', '/api/1/users/me')).rejects.toThrow('アクセス拒否 (403)');
    });

    it('should include rate limit hint in 403 error message', async () => {
      await setupAccessToken(TEST_ACCESS_TOKEN);
      mockFetch.mockResolvedValue(createErrorResponse(403, { error: 'rate_limit_exceeded' }));

      await expect(makeApiRequest('GET', '/api/1/users/me')).rejects.toThrow(
        'レートリミットの可能性があります',
      );
    });

    it('should throw rate limit error for 429 response', async () => {
      await setupAccessToken(TEST_ACCESS_TOKEN);
      mockFetch.mockResolvedValue({
        ok: false,
        status: 429,
        headers: { get: (_name: string) => null },
        json: () => Promise.resolve({ error: 'rate_limit_exceeded' }),
      });

      await expect(makeApiRequest('GET', '/api/1/users/me')).rejects.toThrow(
        'レートリミットに達しました (429)',
      );
    });

    it('should include Retry-After value in 429 error message when present', async () => {
      await setupAccessToken(TEST_ACCESS_TOKEN);
      mockFetch.mockResolvedValue({
        ok: false,
        status: 429,
        headers: {
          get: (name: string) => (name === 'Retry-After' ? '30' : null),
        },
        json: () => Promise.resolve({ error: 'rate_limit_exceeded' }),
      });

      await expect(makeApiRequest('GET', '/api/1/users/me')).rejects.toThrow(
        '30秒後に再試行してください。',
      );
    });

    it('should fall back to generic retry message when Retry-After is missing on 429', async () => {
      await setupAccessToken(TEST_ACCESS_TOKEN);
      mockFetch.mockResolvedValue({
        ok: false,
        status: 429,
        headers: { get: (_name: string) => null },
        json: () => Promise.resolve({ error: 'rate_limit_exceeded' }),
      });

      await expect(makeApiRequest('GET', '/api/1/users/me')).rejects.toThrow(
        '数分待ってから再試行してください。',
      );
    });

    it('should throw generic error for other HTTP errors', async () => {
      await setupAccessToken(TEST_ACCESS_TOKEN);
      mockFetch.mockResolvedValue(createErrorResponse(500, { error: 'internal_server_error' }));

      await expect(makeApiRequest('GET', '/api/1/users/me')).rejects.toThrow(
        'API request failed: 500',
      );
    });

    it('should handle JSON parsing errors in error responses', async () => {
      await setupAccessToken(TEST_ACCESS_TOKEN);
      const sensitiveParserMessage =
        'Unexpected token, "corporate_number=1234567890123&bank_account=998877" is not valid JSON';
      mockFetch.mockResolvedValue({
        ok: false,
        status: 500,
        json: () => Promise.reject(new SyntaxError(sensitiveParserMessage)),
      });

      const error = await makeApiRequest('GET', '/api/1/users/me').catch((caught) => caught);
      const message = error instanceof Error ? error.message : String(error);

      expect(message).toContain(
        'API request failed: 500\n\n詳細: (JSON parse failed: Response body was not valid JSON)',
      );
      expect(message).not.toContain('corporate_number');
      expect(message).not.toContain('bank_account');
      expect(message).not.toContain('998877');
    });

    it('should return null for 204 No Content response', async () => {
      await setupAccessToken(TEST_ACCESS_TOKEN);
      mockFetch.mockResolvedValue({
        ok: true,
        status: 204,
        headers: createMockHeaders(''),
      });

      const result = await makeApiRequest('DELETE', '/api/1/deals/123');

      expect(result).toBeNull();
    });

    it('should return null for empty response body', async () => {
      await setupAccessToken(TEST_ACCESS_TOKEN);
      mockFetch.mockResolvedValue({
        ok: true,
        status: 200,
        headers: createMockHeaders('application/json'),
        text: () => Promise.resolve(''),
      });

      const result = await makeApiRequest('DELETE', '/api/1/deals/123');

      expect(result).toBeNull();
    });

    it('should return binary response with buffer data for PDF', async () => {
      await setupAccessToken(TEST_ACCESS_TOKEN);

      const pdfMagicBytes = new Uint8Array([0x25, 0x50, 0x44, 0x46]);
      mockFetch.mockResolvedValue(createBinaryResponse('application/pdf', pdfMagicBytes));

      const result = await makeApiRequest('GET', '/api/1/receipts/123/download');

      expect(isBinaryFileResponse(result)).toBe(true);
      const binaryResult = result as BinaryFileResponse;
      expect(binaryResult.type).toBe('binary');
      expect(binaryResult.mimeType).toBe('application/pdf');
      expect(binaryResult.size).toBe(4);
      expect(Buffer.isBuffer(binaryResult.data)).toBe(true);
      expect(binaryResult.data).toEqual(Buffer.from(pdfMagicBytes));
    });

    it('should return binary response with buffer data for CSV', async () => {
      await setupAccessToken(TEST_ACCESS_TOKEN);

      const csvData = new TextEncoder().encode('id,name\n1,Test');
      mockFetch.mockResolvedValue(createBinaryResponse('text/csv', csvData));

      const result = await makeApiRequest('GET', '/api/1/reports/csv');

      expect(isBinaryFileResponse(result)).toBe(true);
      const binaryResult = result as BinaryFileResponse;
      expect(binaryResult.type).toBe('binary');
      expect(binaryResult.mimeType).toBe('text/csv');
      expect(binaryResult.size).toBe(csvData.byteLength);
      expect(binaryResult.data.toString('utf-8')).toBe('id,name\n1,Test');
    });

    it('should return binary response with buffer data for PNG', async () => {
      await setupAccessToken(TEST_ACCESS_TOKEN);

      const pngMagicBytes = new Uint8Array([0x89, 0x50, 0x4e, 0x47]);
      mockFetch.mockResolvedValue(createBinaryResponse('image/png', pngMagicBytes));

      const result = await makeApiRequest('GET', '/api/1/receipts/456/download');

      expect(isBinaryFileResponse(result)).toBe(true);
      const binaryResult = result as BinaryFileResponse;
      expect(binaryResult.type).toBe('binary');
      expect(binaryResult.mimeType).toBe('image/png');
      expect(binaryResult.data).toEqual(Buffer.from(pngMagicBytes));
    });

    it.each([
      'application/xml',
      'text/xml',
      'application/xml; charset=utf-8',
      'Application/XML; Charset=UTF-8',
    ])('should return XML as a binary response for %s', async (contentType) => {
      await setupAccessToken(TEST_ACCESS_TOKEN);

      const xml = '<?xml version="1.0" encoding="UTF-8"?><sheet><amount>100</amount></sheet>';
      const xmlData = new TextEncoder().encode(xml);
      mockFetch.mockResolvedValue(createBinaryResponse(contentType, xmlData));

      const result = await makeApiRequest('GET', '/hub/tax_return/corporate/sheet/national/10/a');

      expect(isBinaryFileResponse(result)).toBe(true);
      const binaryResult = result as BinaryFileResponse;
      expect(binaryResult.mimeType).toBe(contentType);
      expect(binaryResult.size).toBe(xmlData.byteLength);
      expect(binaryResult.data.toString('utf-8')).toBe(xml);
    });

    it('rejects XML from Content-Length before reading when it exceeds the safety limit', async () => {
      await setupAccessToken(TEST_ACCESS_TOKEN);
      const arrayBuffer = vi.fn(() => Promise.resolve(new ArrayBuffer(0)));
      mockFetch.mockResolvedValue({
        ok: true,
        status: 200,
        headers: createMockHeaders('application/xml', String(MAX_XML_RESPONSE_BYTES + 1)),
        arrayBuffer,
      });

      await expect(
        makeApiRequest('GET', '/hub/tax_return/corporate/sheet/national/10/10100100'),
      ).rejects.toThrow('XMLレスポンスが安全上限（1,048,576 bytes）を超えています。');
      expect(arrayBuffer).not.toHaveBeenCalled();
    });

    it('cancels an unread XML stream rejected by Content-Length', async () => {
      await setupAccessToken(TEST_ACCESS_TOKEN);
      const cancel = vi.fn();
      const stream = new ReadableStream<Uint8Array>({ cancel });
      const response = new Response(stream, {
        status: 200,
        headers: {
          'Content-Type': 'application/xml',
          'Content-Length': String(MAX_XML_RESPONSE_BYTES + 1),
        },
      });
      mockFetch.mockResolvedValue(response);

      await expect(
        makeApiRequest('GET', '/hub/tax_return/corporate/sheet/national/10/10100100'),
      ).rejects.toThrow('XMLレスポンスが安全上限（1,048,576 bytes）を超えています。');
      expect(cancel).toHaveBeenCalledTimes(1);
      expect(response.body?.locked).toBe(false);
    });

    it('rejects XML by actual size when Content-Length is missing', async () => {
      await setupAccessToken(TEST_ACCESS_TOKEN);
      const oversizedXml = new Uint8Array(MAX_XML_RESPONSE_BYTES + 1);
      mockFetch.mockResolvedValue(createBinaryResponse('application/xml', oversizedXml));

      await expect(
        makeApiRequest('GET', '/hub/tax_return/corporate/sheet/national/10/10100100'),
      ).rejects.toThrow('XMLレスポンスが安全上限（1,048,576 bytes）を超えています。');
    });

    it('stops reading a streamed XML response when it crosses the safety limit', async () => {
      await setupAccessToken(TEST_ACCESS_TOKEN);
      const cancel = vi.fn();
      const stream = new ReadableStream<Uint8Array>({
        start(controller) {
          controller.enqueue(new Uint8Array(MAX_XML_RESPONSE_BYTES));
          controller.enqueue(new Uint8Array([0x3c]));
        },
        cancel,
      });
      const response = new Response(stream, {
        status: 200,
        headers: { 'Content-Type': 'application/xml' },
      });
      mockFetch.mockResolvedValue(response);

      await expect(
        makeApiRequest('GET', '/hub/tax_return/corporate/sheet/national/10/10100100'),
      ).rejects.toThrow('XMLレスポンスが安全上限（1,048,576 bytes）を超えています。');
      expect(cancel).toHaveBeenCalledTimes(1);
      expect(response.body?.locked).toBe(false);
    });

    it('reads a normal XML response through the production stream path', async () => {
      await setupAccessToken(TEST_ACCESS_TOKEN);
      const xml = '<?xml version="1.0"?><sheet><label>法人税額</label></sheet>';
      mockFetch.mockResolvedValue(
        new Response(xml, {
          status: 200,
          headers: { 'Content-Type': 'application/xml; charset=utf-8' },
        }),
      );

      const result = await makeApiRequest(
        'GET',
        '/hub/tax_return/corporate/sheet/national/10/10100100',
      );

      expect(isBinaryFileResponse(result)).toBe(true);
      expect((result as BinaryFileResponse).data.toString('utf-8')).toBe(xml);
    });

    it.each([
      '',
      'application/octet-stream',
      'text/plain',
    ])('rejects an unexpected Content-Type for an XML operation (%s)', async (contentType) => {
      await setupAccessToken(TEST_ACCESS_TOKEN);
      const cancel = vi.fn();
      const stream = new ReadableStream<Uint8Array>({ cancel });
      const response = new Response(stream, {
        status: 200,
        headers: contentType ? { 'Content-Type': contentType } : undefined,
      });
      mockFetch.mockResolvedValue(response);

      await expect(
        makeApiRequest(
          'GET',
          '/hub/tax_return/corporate/sheet/national/10/10100100',
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          'application/xml',
        ),
      ).rejects.toThrow('XMLレスポンスのContent-Typeが不正です。');
      expect(cancel).toHaveBeenCalledTimes(1);
      expect(response.body?.locked).toBe(false);
    });

    it('applies the XML operation size limit to a compatibility JSON response', async () => {
      await setupAccessToken(TEST_ACCESS_TOKEN);
      const oversizedJson = new Uint8Array(MAX_XML_RESPONSE_BYTES + 1);
      mockFetch.mockResolvedValue({
        ok: true,
        status: 200,
        headers: createMockHeaders('application/json'),
        arrayBuffer: () => Promise.resolve(oversizedJson.buffer),
      });

      await expect(
        makeApiRequest(
          'GET',
          '/hub/tax_return/corporate/sheet/national/10/schedule_1_blue',
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          'application/xml',
        ),
      ).rejects.toThrow('XMLレスポンスが安全上限（1,048,576 bytes）を超えています。');
    });

    it('keeps a small compatibility JSON response for an XML operation', async () => {
      await setupAccessToken(TEST_ACCESS_TOKEN);
      const json = JSON.stringify({ data: { tax_data: { sheet_key: 'schedule_1_blue' } } });
      const data = new TextEncoder().encode(json);
      mockFetch.mockResolvedValue({
        ok: true,
        status: 200,
        headers: createMockHeaders('application/json'),
        arrayBuffer: () => Promise.resolve(data.buffer),
      });

      const result = await makeApiRequest(
        'GET',
        '/hub/tax_return/corporate/sheet/national/10/schedule_1_blue',
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        'application/xml',
      );

      expect(result).toEqual({ data: { tax_data: { sheet_key: 'schedule_1_blue' } } });
    });

    it('does not trust a smaller declared Content-Length for XML', async () => {
      await setupAccessToken(TEST_ACCESS_TOKEN);
      const oversizedXml = new Uint8Array(MAX_XML_RESPONSE_BYTES + 1);
      mockFetch.mockResolvedValue({
        ok: true,
        status: 200,
        headers: createMockHeaders('text/xml', '100'),
        arrayBuffer: () => Promise.resolve(oversizedXml.buffer),
      });

      await expect(
        makeApiRequest('GET', '/hub/tax_return/corporate/sheet/local/10/10100100/13000/13109'),
      ).rejects.toThrow('XMLレスポンスが安全上限（1,048,576 bytes）を超えています。');
    });

    it('accepts XML exactly at the safety limit', async () => {
      await setupAccessToken(TEST_ACCESS_TOKEN);
      const xmlAtLimit = new Uint8Array(MAX_XML_RESPONSE_BYTES);
      mockFetch.mockResolvedValue({
        ok: true,
        status: 200,
        headers: createMockHeaders('application/xml', String(MAX_XML_RESPONSE_BYTES)),
        arrayBuffer: () => Promise.resolve(xmlAtLimit.buffer),
      });

      const result = await makeApiRequest(
        'GET',
        '/hub/tax_return/corporate/sheet/financial_statements/10/balance_sheet',
      );

      expect(isBinaryFileResponse(result)).toBe(true);
      expect((result as BinaryFileResponse).size).toBe(MAX_XML_RESPONSE_BYTES);
    });

    it('should not include an unparsable response body in the error message', async () => {
      await setupAccessToken(TEST_ACCESS_TOKEN);
      const sensitiveBody = 'corporate_number=1234567890123&bank_account=998877';
      mockFetch.mockResolvedValue({
        ok: true,
        status: 200,
        headers: createMockHeaders('application/json'),
        text: () => Promise.resolve(sensitiveBody),
      });

      const error = await makeApiRequest('GET', '/api/1/users/me').catch((caught) => caught);
      const message = error instanceof Error ? error.message : String(error);

      expect(message).toContain('Body size:');
      expect(message).not.toContain('corporate_number');
      expect(message).not.toContain('bank_account');
      expect(message).not.toContain('998877');
    });
  });

  describe('makeApiRequest - recorder integration', () => {
    it('records an api_call with the success path pattern', async () => {
      await setupAccessToken(TEST_ACCESS_TOKEN);
      // The shared createJsonResponse helper omits `status`, but the recorder
      // captures it verbatim — set it explicitly so the assertion is meaningful.
      mockFetch.mockResolvedValue({
        ok: true,
        status: 200,
        headers: createMockHeaders('application/json'),
        json: (): Promise<unknown> => Promise.resolve({ ok: true }),
        text: (): Promise<string> => Promise.resolve(JSON.stringify({ ok: true })),
      });

      const { RequestRecorder, withRequestRecorder } = await import('../server/request-context.js');
      const recorder = new RequestRecorder({
        request_id: 'req-api-success',
        source_ip: '127.0.0.1',
        method: 'POST',
        path: '/mcp',
      });

      await withRequestRecorder(recorder, () =>
        makeApiRequest('GET', '/api/1/deals/98765', { limit: 10 }),
      );

      const payload = recorder.buildPayload({ status: 200, duration_ms: 1 });
      const apiCalls = payload.api.calls as Array<Record<string, unknown>>;
      expect(apiCalls).toHaveLength(1);
      expect(apiCalls[0]).toMatchObject({
        method: 'GET',
        path_pattern: '/api/:id/deals/:id',
        status_code: 200,
        error_type: null,
        query_keys: ['limit'],
      });
      // Query values must not be in the path_pattern.
      expect(JSON.stringify(apiCalls[0])).not.toContain('limit=10');
    });

    it('omits query_keys (rather than logging an empty array) when params is {}', async () => {
      // Regression guard: an empty params object is semantically "no query
      // string" and Datadog must not index an empty-array facet for it.
      await setupAccessToken(TEST_ACCESS_TOKEN);
      mockFetch.mockResolvedValue({
        ok: true,
        status: 200,
        headers: createMockHeaders('application/json'),
        json: (): Promise<unknown> => Promise.resolve({ ok: true }),
        text: (): Promise<string> => Promise.resolve(JSON.stringify({ ok: true })),
      });

      const { RequestRecorder, withRequestRecorder } = await import('../server/request-context.js');
      const recorder = new RequestRecorder({
        request_id: 'req-api-empty-params',
        source_ip: '127.0.0.1',
        method: 'POST',
        path: '/mcp',
      });

      await withRequestRecorder(recorder, () => makeApiRequest('GET', '/api/1/users/me', {}));

      const payload = recorder.buildPayload({ status: 200, duration_ms: 1 });
      const apiCalls = payload.api.calls as Array<Record<string, unknown>>;
      expect(apiCalls).toHaveLength(1);
      expect(apiCalls[0]?.query_keys).toBeUndefined();
    });

    it('records an api_call with error_type=http_error on 500 response', async () => {
      await setupAccessToken(TEST_ACCESS_TOKEN);
      mockFetch.mockResolvedValue(createErrorResponse(500, { error: 'oops' }));

      const { RequestRecorder, withRequestRecorder } = await import('../server/request-context.js');
      const recorder = new RequestRecorder({
        request_id: 'req-api-500',
        source_ip: '127.0.0.1',
        method: 'POST',
        path: '/mcp',
      });

      await expect(
        withRequestRecorder(recorder, () => makeApiRequest('GET', '/api/1/users/me')),
      ).rejects.toThrow(/API request failed: 500/);

      const payload = recorder.buildPayload({ status: 200, duration_ms: 1 });
      const apiCalls = payload.api.calls as Array<Record<string, unknown>>;
      expect(apiCalls).toHaveLength(1);
      expect(apiCalls[0]).toMatchObject({
        method: 'GET',
        status_code: 500,
        error_type: 'http_error',
      });

      const errors = payload.errors as Array<{ source: string; chain: Array<{ message: string }> }>;
      expect(errors).toHaveLength(1);
      expect(errors[0].source).toBe('api_client');
      expect(errors[0].chain[0].message).toMatch(/API request failed: 500/);
    });

    it('does not record response body fragments from a JSON parser error', async () => {
      await setupAccessToken(TEST_ACCESS_TOKEN);
      const sensitiveParserMessage =
        'Unexpected token, "corporate_number=1234567890123&bank_account=998877" is not valid JSON';
      mockFetch.mockResolvedValue({
        ok: false,
        status: 500,
        json: () => Promise.reject(new SyntaxError(sensitiveParserMessage)),
      });

      const { RequestRecorder, withRequestRecorder } = await import('../server/request-context.js');
      const recorder = new RequestRecorder({
        request_id: 'req-api-safe-json-parse-error',
        source_ip: '127.0.0.1',
        method: 'POST',
        path: '/mcp',
      });

      await expect(
        withRequestRecorder(recorder, () => makeApiRequest('GET', '/api/1/users/me')),
      ).rejects.toThrow(/Response body was not valid JSON/);

      const payload = JSON.stringify(recorder.buildPayload({ status: 200, duration_ms: 1 }));
      expect(payload).not.toContain('corporate_number');
      expect(payload).not.toContain('bank_account');
      expect(payload).not.toContain('998877');
    });

    it('records an oversized XML error without recording XML body fragments', async () => {
      await setupAccessToken(TEST_ACCESS_TOKEN);
      const sensitiveXml = '<bank_account>MCP_STG_TAX_SENTINEL_20260803</bank_account>';
      const oversizedXml = new Uint8Array(MAX_XML_RESPONSE_BYTES + 1);
      oversizedXml.set(new TextEncoder().encode(sensitiveXml));
      mockFetch.mockResolvedValue(createBinaryResponse('application/xml', oversizedXml));

      const { RequestRecorder, withRequestRecorder } = await import('../server/request-context.js');
      const recorder = new RequestRecorder({
        request_id: 'req-api-oversized-xml',
        source_ip: '127.0.0.1',
        method: 'POST',
        path: '/mcp',
      });

      await expect(
        withRequestRecorder(recorder, () =>
          makeApiRequest('GET', '/hub/tax_return/corporate/sheet/national/10/10100100'),
        ),
      ).rejects.toThrow('XMLレスポンスが安全上限（1,048,576 bytes）を超えています。');

      const payload = recorder.buildPayload({ status: 200, duration_ms: 1 });
      expect(payload.api.calls[0]).toMatchObject({ error_type: 'response_too_large' });
      const serialized = JSON.stringify(payload);
      expect(serialized).not.toContain('MCP_STG_TAX_SENTINEL_20260803');
      expect(serialized).not.toContain('bank_account');
    });

    it('rejects an unexpected XML Content-Type without reading or recording its body', async () => {
      await setupAccessToken(TEST_ACCESS_TOKEN);
      const sensitiveBody = '<bank_account>MCP_STG_TAX_SENTINEL_20260803</bank_account>';
      const response = new Response(sensitiveBody, {
        status: 200,
        headers: { 'Content-Type': 'text/plain' },
      });
      mockFetch.mockResolvedValue(response);

      const { RequestRecorder, withRequestRecorder } = await import('../server/request-context.js');
      const recorder = new RequestRecorder({
        request_id: 'req-api-invalid-xml-content-type',
        source_ip: '127.0.0.1',
        method: 'POST',
        path: '/mcp',
      });

      await expect(
        withRequestRecorder(recorder, () =>
          makeApiRequest(
            'GET',
            '/hub/tax_return/corporate/sheet/national/10/10100100',
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            'application/xml',
          ),
        ),
      ).rejects.toThrow('レスポンスのContent-Typeが不正です。');

      expect(response.bodyUsed).toBe(true);
      const payload = recorder.buildPayload({ status: 200, duration_ms: 1 });
      expect(payload.api.calls[0]).toMatchObject({
        error_type: 'invalid_response_content_type',
      });
      const serialized = JSON.stringify(payload);
      expect(serialized).not.toContain('MCP_STG_TAX_SENTINEL_20260803');
      expect(serialized).not.toContain('bank_account');
    });

    it('records an api_call with error_type=auth_error on 401 response', async () => {
      await setupAccessToken(TEST_ACCESS_TOKEN);
      mockFetch.mockResolvedValue(createErrorResponse(401, { error: 'invalid_token' }));

      const { RequestRecorder, withRequestRecorder } = await import('../server/request-context.js');
      const recorder = new RequestRecorder({
        request_id: 'req-api-401',
        source_ip: '127.0.0.1',
        method: 'POST',
        path: '/mcp',
      });

      await expect(
        withRequestRecorder(recorder, () => makeApiRequest('GET', '/api/1/users/me')),
      ).rejects.toThrow();

      const apiCalls = recorder.buildPayload({ status: 200, duration_ms: 1 }).api.calls as Array<
        Record<string, unknown>
      >;
      expect(apiCalls[0]).toMatchObject({ status_code: 401, error_type: 'auth_error' });
    });

    it('records an api_call and error with error_type=rate_limit on 429 response', async () => {
      await setupAccessToken(TEST_ACCESS_TOKEN);
      mockFetch.mockResolvedValue({
        ok: false,
        status: 429,
        headers: {
          get: (name: string) => (name === 'Retry-After' ? '30' : null),
        },
        json: () => Promise.resolve({ error: 'rate_limit_exceeded' }),
      });

      const { RequestRecorder, withRequestRecorder } = await import('../server/request-context.js');
      const recorder = new RequestRecorder({
        request_id: 'req-api-429',
        source_ip: '127.0.0.1',
        method: 'POST',
        path: '/mcp',
      });

      await expect(
        withRequestRecorder(recorder, () => makeApiRequest('GET', '/api/1/users/me')),
      ).rejects.toThrow(/レートリミットに達しました \(429\)/);

      const payload = recorder.buildPayload({ status: 200, duration_ms: 1 });
      const apiCalls = payload.api.calls as Array<Record<string, unknown>>;
      expect(apiCalls).toHaveLength(1);
      expect(apiCalls[0]).toMatchObject({
        method: 'GET',
        status_code: 429,
        error_type: 'rate_limit',
      });

      const errors = payload.errors as Array<{
        source: string;
        status_code?: number;
        error_type?: string;
      }>;
      expect(errors).toHaveLength(1);
      expect(errors[0]).toMatchObject({
        source: 'api_client',
        status_code: 429,
        error_type: 'rate_limit',
      });
    });

    it('does nothing (null-safe) when no recorder is installed', async () => {
      await setupAccessToken(TEST_ACCESS_TOKEN);
      mockFetch.mockResolvedValue(createJsonResponse({ ok: true }));

      // Called OUTSIDE of withRequestRecorder — getCurrentRecorder() returns undefined
      // (this is the CLI mode path). Must still succeed without throwing.
      const result = await makeApiRequest('GET', '/api/1/users/me');
      expect(result).toEqual({ ok: true });
    });
  });
});
