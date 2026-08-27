import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { ZodIssue } from 'zod';

function collectIssueMessages(issues: ZodIssue[]): string[] {
  return issues.flatMap((issue) =>
    issue.code === 'invalid_union'
      ? issue.unionErrors.flatMap((err) => collectIssueMessages(err.issues))
      : [issue.message],
  );
}

function encodeUtf32(value: string, littleEndian: boolean): Buffer {
  const bytes: number[] = [];
  for (const character of value) {
    const codePoint = character.codePointAt(0) as number;
    const encoded = littleEndian
      ? [codePoint & 0xff, (codePoint >>> 8) & 0xff, (codePoint >>> 16) & 0xff, 0]
      : [0, (codePoint >>> 16) & 0xff, (codePoint >>> 8) & 0xff, codePoint & 0xff];
    bytes.push(...encoded);
  }
  return Buffer.from(bytes);
}

// Privacy regression tests: query values and request bodies must never appear
// in the canonical log payload emitted by RequestRecorder.

type CapturedHandler = (
  args: Record<string, unknown>,
  extra?: Record<string, unknown>,
) => Promise<unknown>;

const capturedHandlers = new Map<string, CapturedHandler>();

vi.mock('../telemetry/tool-tracer.js', () => ({
  registerTracedTool: (
    _server: McpServer,
    name: string,
    _config: unknown,
    handler: CapturedHandler,
  ): void => {
    capturedHandlers.set(name, handler);
  },
  setToolAttributes: vi.fn(),
}));

vi.mock('./schema-loader.js', () => ({
  validatePathForService: vi.fn(() => ({
    isValid: true,
    actualPath: undefined,
    baseUrl: undefined,
  })),
  listAllAvailablePaths: vi.fn(() => ''),
  isMcpOnlyPath: vi.fn(() => false),
}));

vi.mock('../api/client.js', () => ({
  makeApiRequest: vi.fn(() => Promise.resolve({ ok: true })),
  isBinaryFileResponse: vi.fn(() => false),
}));

vi.mock('../storage/context.js', () => ({
  extractTokenContext: vi.fn(() => ({ userId: 'test-user', tokenStore: {} })),
}));

const stubServer = {} as McpServer;

beforeEach(() => {
  capturedHandlers.clear();
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('generateClientModeTool - privacy', () => {
  it('never leaks query values into the recorder payload', async () => {
    // ToolCallInfo no longer carries query_keys (those live on ApiCallInfo,
    // populated inside `makeApiRequest`). Here `makeApiRequest` is mocked so
    // no api_call is recorded — the assertion is therefore strictly about the
    // tool layer not capturing user-supplied query values. The matching
    // key-name + value-keep-out coverage for the api layer lives in
    // `src/api/client.test.ts`.
    const { generateClientModeTool } = await import('./client-mode.js');
    const { RequestRecorder, withRequestRecorder } = await import('../server/request-context.js');

    generateClientModeTool(stubServer);
    const getHandler = capturedHandlers.get('freee_api_get');
    expect(getHandler).toBeDefined();

    const recorder = new RequestRecorder({
      request_id: 'req-priv-1',
      source_ip: '127.0.0.1',
      method: 'POST',
      path: '/mcp',
    });

    await withRequestRecorder(recorder, () =>
      getHandler?.(
        {
          service: 'accounting',
          path: '/api/1/deals',
          query: {
            start_issue_date: '2024-01-01',
            partner_name: 'Acme Corp (SECRET)',
            internal_memo: 'leak-this-sensitive-value',
          },
        },
        undefined,
      ),
    );

    const payload = recorder.buildPayload({ status: 200, duration_ms: 10 });
    const payloadJson = JSON.stringify(payload);

    expect(payloadJson).not.toContain('2024-01-01');
    expect(payloadJson).not.toContain('Acme Corp');
    expect(payloadJson).not.toContain('SECRET');
    expect(payloadJson).not.toContain('leak-this-sensitive-value');
  });

  it('does not capture request body values in the recorder payload', async () => {
    const { generateClientModeTool } = await import('./client-mode.js');
    const { RequestRecorder, withRequestRecorder } = await import('../server/request-context.js');

    generateClientModeTool(stubServer);
    const postHandler = capturedHandlers.get('freee_api_post');
    expect(postHandler).toBeDefined();

    const recorder = new RequestRecorder({
      request_id: 'req-priv-2',
      source_ip: '127.0.0.1',
      method: 'POST',
      path: '/mcp',
    });

    await withRequestRecorder(recorder, () =>
      postHandler?.(
        {
          service: 'accounting',
          path: '/api/1/deals',
          body: {
            amount: 99999999,
            memo: 'confidential deal notes',
            partner_email: 'ceo@example.com',
          },
        },
        undefined,
      ),
    );

    const payloadJson = JSON.stringify(recorder.buildPayload({ status: 200, duration_ms: 10 }));

    expect(payloadJson).not.toContain('99999999');
    expect(payloadJson).not.toContain('confidential');
    expect(payloadJson).not.toContain('ceo@example.com');
  });

  // Path sanitization coverage moved to `src/api/client.test.ts` —
  // `path_pattern` now lives on `ApiCallInfo` (which is recorded inside
  // `makeApiRequest`), and that path is mocked in this test file.

  it('returns isError: true when upstream API responds with 4xx', async () => {
    // MCP spec (Tools - Error Handling) recommends signalling tool execution
    // errors via `CallToolResult.isError: true` so LLMs and clients can
    // distinguish them from successful responses without parsing the body.
    const clientModule = await import('../api/client.js');
    vi.mocked(clientModule.makeApiRequest).mockRejectedValueOnce(
      new Error('API request failed: 400\n\nエラー詳細:\nissue_date は必須です'),
    );

    const { generateClientModeTool } = await import('./client-mode.js');

    generateClientModeTool(stubServer);
    const postHandler = capturedHandlers.get('freee_api_post');
    expect(postHandler).toBeDefined();

    const result = (await postHandler?.(
      { service: 'accounting', path: '/api/1/deals', body: { foo: 'bar' } },
      undefined,
    )) as { isError?: boolean; content: Array<{ type: string; text: string }> };

    expect(result.isError).toBe(true);
    expect(result.content[0].text).toMatch(/APIリクエストエラー/);
    expect(result.content[0].text).toMatch(/issue_date は必須です/);
  });

  it('returns isError: true when upstream API responds with 5xx', async () => {
    const clientModule = await import('../api/client.js');
    vi.mocked(clientModule.makeApiRequest).mockRejectedValueOnce(
      new Error('API request failed: 500'),
    );

    const { generateClientModeTool } = await import('./client-mode.js');

    generateClientModeTool(stubServer);
    const getHandler = capturedHandlers.get('freee_api_get');

    const result = (await getHandler?.(
      { service: 'accounting', path: '/api/1/users/me' },
      undefined,
    )) as { isError?: boolean; content: Array<{ type: string; text: string }> };

    expect(result.isError).toBe(true);
    expect(result.content[0].text).toMatch(/APIリクエストエラー/);
  });

  it('returns isError: true for auth/network/etc. errors thrown from makeApiRequest', async () => {
    // 401/403/429 と network/timeout エラーも catch ブロックに入るので同様に isError 扱い
    const clientModule = await import('../api/client.js');
    vi.mocked(clientModule.makeApiRequest).mockRejectedValueOnce(
      new Error('認証エラーが発生しました。'),
    );

    const { generateClientModeTool } = await import('./client-mode.js');

    generateClientModeTool(stubServer);
    const getHandler = capturedHandlers.get('freee_api_get');

    const result = (await getHandler?.(
      { service: 'accounting', path: '/api/1/users/me' },
      undefined,
    )) as { isError?: boolean; content: Array<{ type: string; text: string }> };

    expect(result.isError).toBe(true);
  });

  it('records tool_call with error status when validation fails', async () => {
    const schemaLoader = await import('./schema-loader.js');
    vi.mocked(schemaLoader.validatePathForService).mockReturnValueOnce({
      isValid: false,
      message: 'path not found',
    });

    const { generateClientModeTool } = await import('./client-mode.js');
    const { RequestRecorder, withRequestRecorder } = await import('../server/request-context.js');

    generateClientModeTool(stubServer);
    const getHandler = capturedHandlers.get('freee_api_get');

    const recorder = new RequestRecorder({
      request_id: 'req-val-1',
      source_ip: '127.0.0.1',
      method: 'POST',
      path: '/mcp',
    });

    await withRequestRecorder(recorder, () =>
      getHandler?.({ service: 'accounting', path: '/api/1/nonexistent' }, undefined),
    );

    const payload = recorder.buildPayload({ status: 200, duration_ms: 1 });
    const toolCalls = (payload.mcp as { tool_calls: Array<{ status: string }> }).tool_calls;
    expect(toolCalls).toHaveLength(1);
    expect(toolCalls[0].status).toBe('error');

    const errors = payload.errors as Array<{ source: string; error_type?: string }>;
    expect(errors[0].source).toBe('validation');
    expect(errors[0].error_type).toBe('path_validation_failed');
  });

  it('requests XML from the schema metadata and returns the original XML text', async () => {
    const path = '/hub/tax_return/corporate/sheet/national/10/10100100';
    const xml = '<?xml version="1.0" encoding="UTF-8"?><sheet><label>法人税額</label></sheet>';
    const schemaLoader = await import('./schema-loader.js');
    const clientModule = await import('../api/client.js');

    vi.mocked(schemaLoader.validatePathForService).mockReturnValueOnce({
      isValid: true,
      message: 'Valid path and method',
      actualPath: path,
      baseUrl: 'https://api.freee.co.jp',
      operation: { accept: 'application/xml' },
    });
    vi.mocked(clientModule.makeApiRequest).mockResolvedValueOnce({
      type: 'binary',
      data: Buffer.from(xml, 'utf-8'),
      mimeType: 'application/xml; charset=utf-8',
      size: Buffer.byteLength(xml, 'utf-8'),
    });
    vi.mocked(clientModule.isBinaryFileResponse).mockReturnValueOnce(true);

    const { generateClientModeTool } = await import('./client-mode.js');
    generateClientModeTool(stubServer);
    const getHandler = capturedHandlers.get('freee_api_get');

    const result = (await getHandler?.({ service: 'tax_return', path }, undefined)) as {
      content: Array<{ type: string; text: string }>;
    };

    expect(clientModule.makeApiRequest).toHaveBeenCalledWith(
      'GET',
      path,
      undefined,
      undefined,
      'https://api.freee.co.jp',
      expect.objectContaining({ userId: 'test-user' }),
      undefined,
      'application/xml',
    );
    expect(result.content).toEqual([{ type: 'text', text: xml }]);
  });

  it('accepts a UTF-8 BOM and returns XML text without the BOM', async () => {
    const path = '/hub/tax_return/corporate/sheet/national/10/10100100';
    const xml = '<?xml version="1.0" encoding="UTF-8"?><sheet><label>法人税額</label></sheet>';
    const data = Buffer.concat([Buffer.from([0xef, 0xbb, 0xbf]), Buffer.from(xml, 'utf-8')]);
    const schemaLoader = await import('./schema-loader.js');
    const clientModule = await import('../api/client.js');

    vi.mocked(schemaLoader.validatePathForService).mockReturnValueOnce({
      isValid: true,
      actualPath: path,
      baseUrl: 'https://api.freee.co.jp',
      operation: { accept: 'application/xml' },
    });
    vi.mocked(clientModule.makeApiRequest).mockResolvedValueOnce({
      type: 'binary',
      data,
      mimeType: 'application/xml; charset=utf-8',
      size: data.byteLength,
    });
    vi.mocked(clientModule.isBinaryFileResponse).mockReturnValueOnce(true);

    const { generateClientModeTool } = await import('./client-mode.js');
    generateClientModeTool(stubServer);
    const getHandler = capturedHandlers.get('freee_api_get');

    const result = (await getHandler?.({ service: 'tax_return', path }, undefined)) as {
      content: Array<{ type: string; text: string }>;
    };

    expect(result.content).toEqual([{ type: 'text', text: xml }]);
    expect(result.content[0].text.charCodeAt(0)).not.toBe(0xfeff);
  });

  it('rejects invalid UTF-8 XML without exposing decoded body fragments', async () => {
    const path = '/hub/tax_return/corporate/sheet/national/10/10100100';
    const sensitivePrefix = '<sheet><bank_account>MCP_STG_TAX_SENTINEL_20260803</bank_account>';
    const invalidXml = Buffer.concat([
      Buffer.from(sensitivePrefix, 'utf-8'),
      Buffer.from([0xff]),
      Buffer.from('</sheet>', 'utf-8'),
    ]);
    const schemaLoader = await import('./schema-loader.js');
    const clientModule = await import('../api/client.js');
    const { RequestRecorder, withRequestRecorder } = await import('../server/request-context.js');

    vi.mocked(schemaLoader.validatePathForService).mockReturnValueOnce({
      isValid: true,
      actualPath: path,
      baseUrl: 'https://api.freee.co.jp',
      operation: { accept: 'application/xml' },
    });
    vi.mocked(clientModule.makeApiRequest).mockResolvedValueOnce({
      type: 'binary',
      data: invalidXml,
      mimeType: 'application/xml; charset=utf-8',
      size: invalidXml.byteLength,
    });
    vi.mocked(clientModule.isBinaryFileResponse).mockReturnValueOnce(true);

    const { generateClientModeTool } = await import('./client-mode.js');
    generateClientModeTool(stubServer);
    const getHandler = capturedHandlers.get('freee_api_get');
    const recorder = new RequestRecorder({
      request_id: 'req-invalid-utf8-xml',
      source_ip: '127.0.0.1',
      method: 'POST',
      path: '/mcp',
    });

    const result = (await withRequestRecorder(recorder, () =>
      getHandler?.({ service: 'tax_return', path }, undefined),
    )) as { isError?: boolean; content: Array<{ type: string; text: string }> };

    expect(result.isError).toBe(true);
    expect(result.content[0].text).toContain('XMLレスポンスをUTF-8として読み取れませんでした。');
    expect(result.content[0].text).not.toContain('MCP_STG_TAX_SENTINEL_20260803');
    expect(result.content[0].text).not.toContain('bank_account');
    expect(result.content[0].text).not.toContain('�');

    const payload = recorder.buildPayload({ status: 200, duration_ms: 1 });
    expect(payload.mcp.tool_calls).toEqual([
      expect.objectContaining({ tool: 'freee_api_get', status: 'error' }),
    ]);
    const serialized = JSON.stringify(payload);
    expect(serialized).not.toContain('MCP_STG_TAX_SENTINEL_20260803');
    expect(serialized).not.toContain('bank_account');
  });

  it.each([
    ['application/xml; charset=shift_jis', '<?xml version="1.0"?><sheet />'],
    ['application/xml', '<?xml version="1.0" encoding="UTF-16"?><sheet />'],
  ])('rejects XML that declares a non-UTF-8 encoding (%s)', async (mimeType, xml) => {
    const path = '/hub/tax_return/corporate/sheet/national/10/10100100';
    const schemaLoader = await import('./schema-loader.js');
    const clientModule = await import('../api/client.js');

    vi.mocked(schemaLoader.validatePathForService).mockReturnValueOnce({
      isValid: true,
      actualPath: path,
      baseUrl: 'https://api.freee.co.jp',
      operation: { accept: 'application/xml' },
    });
    vi.mocked(clientModule.makeApiRequest).mockResolvedValueOnce({
      type: 'binary',
      data: Buffer.from(xml, 'utf-8'),
      mimeType,
      size: Buffer.byteLength(xml, 'utf-8'),
    });
    vi.mocked(clientModule.isBinaryFileResponse).mockReturnValueOnce(true);

    const { generateClientModeTool } = await import('./client-mode.js');
    generateClientModeTool(stubServer);
    const getHandler = capturedHandlers.get('freee_api_get');

    const result = (await getHandler?.({ service: 'tax_return', path }, undefined)) as {
      isError?: boolean;
      content: Array<{ type: string; text: string }>;
    };

    expect(result.isError).toBe(true);
    expect(result.content[0].text).toContain('XMLレスポンスをUTF-8として読み取れませんでした。');
  });

  const sensitiveEncodedXml =
    '<?xml version="1.0"?><sheet><bank_account>MCP_STG_TAX_SENTINEL_20260803</bank_account></sheet>';

  it.each([
    ['BOM-less UTF-16LE', Buffer.from(sensitiveEncodedXml, 'utf16le')],
    ['BOM-less UTF-16BE', Buffer.from(sensitiveEncodedXml, 'utf16le').swap16()],
    [
      'UTF-16LE BOM',
      Buffer.concat([Buffer.from([0xff, 0xfe]), Buffer.from(sensitiveEncodedXml, 'utf16le')]),
    ],
    [
      'UTF-16BE BOM',
      Buffer.concat([
        Buffer.from([0xfe, 0xff]),
        Buffer.from(sensitiveEncodedXml, 'utf16le').swap16(),
      ]),
    ],
    [
      'UTF-32LE BOM',
      Buffer.concat([
        Buffer.from([0xff, 0xfe, 0x00, 0x00]),
        encodeUtf32(sensitiveEncodedXml, true),
      ]),
    ],
    [
      'UTF-32BE BOM',
      Buffer.concat([
        Buffer.from([0x00, 0x00, 0xfe, 0xff]),
        encodeUtf32(sensitiveEncodedXml, false),
      ]),
    ],
    [
      'NUL control byte',
      Buffer.from(
        '<sheet><bank_account>MCP_STG_TAX_SENTINEL_20260803</bank_account>\u0000</sheet>',
        'utf-8',
      ),
    ],
  ] satisfies Array<
    [string, Buffer]
  >)('rejects XML bytes that are not valid UTF-8 XML (%s)', async (_caseName, data) => {
    const path = '/hub/tax_return/corporate/sheet/national/10/10100100';
    const schemaLoader = await import('./schema-loader.js');
    const clientModule = await import('../api/client.js');
    const { RequestRecorder, withRequestRecorder } = await import('../server/request-context.js');

    vi.mocked(schemaLoader.validatePathForService).mockReturnValueOnce({
      isValid: true,
      actualPath: path,
      baseUrl: 'https://api.freee.co.jp',
      operation: { accept: 'application/xml' },
    });
    vi.mocked(clientModule.makeApiRequest).mockResolvedValueOnce({
      type: 'binary',
      data,
      mimeType: 'application/xml',
      size: data.byteLength,
    });
    vi.mocked(clientModule.isBinaryFileResponse).mockReturnValueOnce(true);

    const { generateClientModeTool } = await import('./client-mode.js');
    generateClientModeTool(stubServer);
    const getHandler = capturedHandlers.get('freee_api_get');
    const recorder = new RequestRecorder({
      request_id: 'req-invalid-encoded-xml',
      source_ip: '127.0.0.1',
      method: 'POST',
      path: '/mcp',
    });

    const result = (await withRequestRecorder(recorder, () =>
      getHandler?.({ service: 'tax_return', path }, undefined),
    )) as { isError?: boolean; content: Array<{ type: string; text: string }> };

    expect(result.isError).toBe(true);
    expect(result.content[0].text).toContain('XMLレスポンスをUTF-8として読み取れませんでした。');
    expect(result.content[0].text).not.toContain('MCP_STG_TAX_SENTINEL_20260803');
    expect(result.content[0].text).not.toContain('bank_account');

    const payload = JSON.stringify(recorder.buildPayload({ status: 200, duration_ms: 1 }));
    expect(payload).not.toContain('MCP_STG_TAX_SENTINEL_20260803');
    expect(payload).not.toContain('bank_account');
  });
});

describe('coercibleRecord', () => {
  it('passes plain objects through unchanged', async () => {
    const { coercibleRecord } = await import('./client-mode.js');
    const schema = coercibleRecord('body');
    const result = schema.safeParse({ a: 1, b: 'two' });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data).toEqual({ a: 1, b: 'two' });
  });

  it('parses JSON-encoded object strings (some MCP clients send object params as strings)', async () => {
    const { coercibleRecord } = await import('./client-mode.js');
    const schema = coercibleRecord('body');
    const result = schema.safeParse('{"company_id":1,"issue_date":"2026-04-26"}');
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual({ company_id: 1, issue_date: '2026-04-26' });
    }
  });

  it('rejects a leading UTF-8 BOM with a dedicated error (deterministic across OSes)', async () => {
    const { coercibleRecord } = await import('./client-mode.js');
    const schema = coercibleRecord('body');
    const bom = String.fromCharCode(0xfeff);
    const result = schema.safeParse(`${bom}{"a":1}`);
    expect(result.success).toBe(false);
    if (!result.success) {
      const messages = collectIssueMessages(result.error.issues);
      expect(messages.some((m) => m.includes('UTF-8 BOM'))).toBe(true);
    }
  });

  it('passes JSON strings with surrounding whitespace through (JSON.parse handles it)', async () => {
    const { coercibleRecord } = await import('./client-mode.js');
    const schema = coercibleRecord('body');
    const result = schema.safeParse('  \r\n{"a":1}\r\n  ');
    expect(result.success).toBe(true);
    if (result.success) expect(result.data).toEqual({ a: 1 });
  });

  it('emits a length-only error message on unparseable strings (no payload bytes leak)', async () => {
    const { coercibleRecord } = await import('./client-mode.js');
    const schema = coercibleRecord('body');
    const SECRET = 'partner_name=Acme(SECRET)';
    const result = schema.safeParse(SECRET);
    expect(result.success).toBe(false);
    if (!result.success) {
      const messages = collectIssueMessages(result.error.issues);
      expect(messages.some((m) => /length \d+/.test(m))).toBe(true);
      for (const message of messages) {
        expect(message).not.toContain('Acme');
        expect(message).not.toContain('SECRET');
        expect(message).not.toContain('partner_name');
      }
    }
  });

  it('publishes anyOf JSON Schema so MCP clients accept both object and string bodies', async () => {
    const { McpServer } = await import('@modelcontextprotocol/sdk/server/mcp.js');
    const { Client } = await import('@modelcontextprotocol/sdk/client/index.js');
    const { InMemoryTransport } = await import('@modelcontextprotocol/sdk/inMemory.js');
    const { coercibleRecord } = await import('./client-mode.js');

    const server = new McpServer({ name: 'test', version: '1.0.0' });
    server.registerTool(
      'with_body',
      { inputSchema: { body: coercibleRecord('body') } },
      async () => ({ content: [{ type: 'text' as const, text: 'ok' }] }),
    );

    const [serverT, clientT] = InMemoryTransport.createLinkedPair();
    const client = new Client({ name: 'tester', version: '1.0.0' });
    await Promise.all([server.connect(serverT), client.connect(clientT)]);

    const tools = await client.listTools();
    const tool = tools.tools.find((t) => t.name === 'with_body');
    if (!tool) throw new Error('tool not registered');

    type ToolInputSchema = {
      properties: { body: { anyOf?: Array<{ type?: string }> } };
      required?: string[];
    };
    const inputSchema = tool.inputSchema as ToolInputSchema;
    expect(inputSchema.properties.body.anyOf).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ type: 'object' }),
        expect.objectContaining({ type: 'string' }),
      ]),
    );
    expect(inputSchema.required).toContain('body');

    await client.close();
  });
});
