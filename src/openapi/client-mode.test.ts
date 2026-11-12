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
const capturedConfigs = new Map<string, { inputSchema?: Record<string, unknown> }>();

vi.mock('../telemetry/tool-tracer.js', () => ({
  registerTracedTool: (
    _server: McpServer,
    name: string,
    config: { inputSchema?: Record<string, unknown> },
    handler: CapturedHandler,
  ): void => {
    capturedHandlers.set(name, handler);
    capturedConfigs.set(name, config);
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
  RateLimitError: class RateLimitError extends Error {},
  ForbiddenError: class ForbiddenError extends Error {},
  ensureValidAccessToken: vi.fn(() => Promise.resolve('test-access-token')),
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

  // mcp-only（freee-mcp リモート版限定）ゲート:
  // stdio（ローカル）モードでは mcp-only エンドポイントを API に到達させず、
  // リモート版への切り替え案内を isError で返す。remote モードでは通常どおり通す。
  it('blocks mcp-only endpoints in stdio mode without calling the API', async () => {
    const schemaLoader = await import('./schema-loader.js');
    const clientModule = await import('../api/client.js');
    vi.mocked(schemaLoader.isMcpOnlyPath).mockReturnValueOnce(true);

    const { generateClientModeTool } = await import('./client-mode.js');
    generateClientModeTool(stubServer);
    const getHandler = capturedHandlers.get('freee_api_get');
    expect(getHandler).toBeDefined();

    // transport は既定で stdio（src/server/user-agent.ts）
    const result = (await getHandler?.(
      { service: 'launch', path: '/hub/launch/kaigyo_application' },
      undefined,
    )) as { isError?: boolean; content: Array<{ type: string; text: string }> };

    expect(result.isError).toBe(true);
    expect(result.content[0].text).toMatch(/freee-mcp（リモート版）でのみ利用できます/);
    expect(clientModule.makeApiRequest).not.toHaveBeenCalled();
  });

  it('allows mcp-only endpoints in remote mode', async () => {
    // remote モードではゲート条件が transport 判定で短絡するため、
    // isMcpOnlyPath はそもそも呼ばれない（モック不要）
    const clientModule = await import('../api/client.js');
    const { initUserAgentTransportMode } = await import('../server/user-agent.js');

    const { generateClientModeTool } = await import('./client-mode.js');
    generateClientModeTool(stubServer);
    const getHandler = capturedHandlers.get('freee_api_get');
    expect(getHandler).toBeDefined();

    initUserAgentTransportMode('remote');
    try {
      const result = (await getHandler?.(
        { service: 'launch', path: '/hub/launch/kaigyo_application' },
        undefined,
      )) as { isError?: boolean };

      expect(result.isError).not.toBe(true);
      expect(clientModule.makeApiRequest).toHaveBeenCalledTimes(1);
    } finally {
      initUserAgentTransportMode('stdio');
    }
  });

  it('excludes mcp-only paths from freee_api_list_paths in stdio mode', async () => {
    const schemaLoader = await import('./schema-loader.js');

    const { generateClientModeTool } = await import('./client-mode.js');
    generateClientModeTool(stubServer);
    const listHandler = capturedHandlers.get('freee_api_list_paths');
    expect(listHandler).toBeDefined();

    // transport は既定で stdio（src/server/user-agent.ts）
    const result = (await listHandler?.({}, undefined)) as {
      content: Array<{ type: string; text: string }>;
    };

    expect(schemaLoader.listAllAvailablePaths).toHaveBeenCalledWith({ excludeMcpOnly: true });
    expect(result.content[0].text).toMatch(/リモート版）限定のエンドポイントは/);
  });

  it('includes mcp-only paths in freee_api_list_paths in remote mode', async () => {
    const schemaLoader = await import('./schema-loader.js');
    const { initUserAgentTransportMode } = await import('../server/user-agent.js');

    const { generateClientModeTool } = await import('./client-mode.js');
    generateClientModeTool(stubServer);
    const listHandler = capturedHandlers.get('freee_api_list_paths');
    expect(listHandler).toBeDefined();

    initUserAgentTransportMode('remote');
    try {
      const result = (await listHandler?.({}, undefined)) as {
        content: Array<{ type: string; text: string }>;
      };

      expect(schemaLoader.listAllAvailablePaths).toHaveBeenCalledWith({ excludeMcpOnly: false });
      expect(result.content[0].text).not.toMatch(/リモート版）限定のエンドポイントは/);
    } finally {
      initUserAgentTransportMode('stdio');
    }
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

describe('bulk tools', () => {
  type BulkResponse = {
    isError?: boolean;
    content: Array<{ type: string; text: string }>;
  };
  type BulkBody = {
    summary: { total: number; succeeded: number; failed: number; skipped: number };
    results: Array<{ index: number; status: string; data?: unknown; error?: string }>;
  };
  const parse = (res: BulkResponse): BulkBody => JSON.parse(res.content[0].text) as BulkBody;

  async function getHandler(name: string): Promise<CapturedHandler> {
    const { generateClientModeTool } = await import('./client-mode.js');
    generateClientModeTool(stubServer);
    const handler = capturedHandlers.get(name);
    if (!handler) throw new Error(`${name} not registered`);
    return handler;
  }

  it('freee_api_bulk_get runs every request as GET and returns results in input order', async () => {
    const clientModule = await import('../api/client.js');
    const echoPath = async (_m: string, path: string) => ({ path });
    vi.mocked(clientModule.makeApiRequest)
      .mockImplementationOnce(echoPath)
      .mockImplementationOnce(echoPath)
      .mockImplementationOnce(echoPath);

    const handler = await getHandler('freee_api_bulk_get');
    const res = (await handler({
      requests: [
        { service: 'accounting', path: '/api/1/deals/1' },
        { service: 'accounting', path: '/api/1/deals/2', query: { foo: 'bar' } },
        { service: 'accounting', path: '/api/1/deals/3' },
      ],
    })) as BulkResponse;

    expect(res.isError).toBeUndefined();
    const body = parse(res);
    expect(body.summary).toEqual({ total: 3, succeeded: 3, failed: 0, skipped: 0 });
    expect(body.results.map((r) => r.data)).toEqual([
      { path: '/api/1/deals/1' },
      { path: '/api/1/deals/2' },
      { path: '/api/1/deals/3' },
    ]);
    for (const call of vi.mocked(clientModule.makeApiRequest).mock.calls) {
      expect(call[0]).toBe('GET');
    }
  });

  it('freee_api_bulk_get keeps going after a failure (partial success, no isError)', async () => {
    const clientModule = await import('../api/client.js');
    vi.mocked(clientModule.makeApiRequest)
      .mockResolvedValueOnce({ ok: 1 })
      .mockRejectedValueOnce(new Error('API request failed: 404'))
      .mockResolvedValueOnce({ ok: 3 });

    const handler = await getHandler('freee_api_bulk_get');
    const res = (await handler({
      requests: [
        { service: 'accounting', path: '/api/1/deals/1' },
        { service: 'accounting', path: '/api/1/deals/2' },
        { service: 'accounting', path: '/api/1/deals/3' },
      ],
      concurrency: 1,
    })) as BulkResponse;

    expect(res.isError).toBeUndefined();
    const body = parse(res);
    expect(body.summary).toEqual({ total: 3, succeeded: 2, failed: 1, skipped: 0 });
    expect(body.results[1]).toMatchObject({ status: 'error' });
    expect(body.results[1].error).toMatch(/APIリクエストエラー/);
  });

  it('stops dispatching remaining requests after a 429', async () => {
    const clientModule = await import('../api/client.js');
    vi.mocked(clientModule.makeApiRequest)
      .mockResolvedValueOnce({ ok: 1 })
      .mockRejectedValueOnce(new clientModule.RateLimitError('レートリミットに達しました (429)'));

    const handler = await getHandler('freee_api_bulk_get');
    const res = (await handler({
      requests: [
        { service: 'accounting', path: '/api/1/deals/1' },
        { service: 'accounting', path: '/api/1/deals/2' },
        { service: 'accounting', path: '/api/1/deals/3' },
        { service: 'accounting', path: '/api/1/deals/4' },
      ],
      concurrency: 1,
    })) as BulkResponse;

    const body = parse(res);
    expect(body.summary).toEqual({ total: 4, succeeded: 1, failed: 1, skipped: 2 });
    expect(clientModule.makeApiRequest).toHaveBeenCalledTimes(2);
  });

  it('freee_api_bulk_write stops on the first error by default and runs serially', async () => {
    const clientModule = await import('../api/client.js');
    vi.mocked(clientModule.makeApiRequest)
      .mockResolvedValueOnce({ ok: 1 })
      .mockRejectedValueOnce(new Error('API request failed: 400'));

    const handler = await getHandler('freee_api_bulk_write');
    const res = (await handler({
      requests: [
        { method: 'POST', service: 'accounting', path: '/api/1/deals', body: { a: 1 } },
        { method: 'PUT', service: 'accounting', path: '/api/1/deals/2', body: { a: 2 } },
        { method: 'DELETE', service: 'accounting', path: '/api/1/deals/3', body: { a: 3 } },
      ],
    })) as BulkResponse;

    const body = parse(res);
    expect(body.summary).toEqual({ total: 3, succeeded: 1, failed: 1, skipped: 1 });
    expect(body.results[2]).toMatchObject({ status: 'skipped' });
    const calls = vi.mocked(clientModule.makeApiRequest).mock.calls;
    expect(calls.map((c) => c[0])).toEqual(['POST', 'PUT']);
  });

  it('freee_api_bulk_write never sends a body with DELETE', async () => {
    const clientModule = await import('../api/client.js');
    const handler = await getHandler('freee_api_bulk_write');
    await handler({
      requests: [
        { method: 'DELETE', service: 'accounting', path: '/api/1/deals/3', body: { a: 3 } },
      ],
    });
    expect(vi.mocked(clientModule.makeApiRequest).mock.calls[0][3]).toBeUndefined();
  });

  it('returns isError: true when every request fails', async () => {
    const clientModule = await import('../api/client.js');
    vi.mocked(clientModule.makeApiRequest)
      .mockRejectedValueOnce(new Error('API request failed: 500'))
      .mockRejectedValueOnce(new Error('API request failed: 500'));

    const handler = await getHandler('freee_api_bulk_get');
    const res = (await handler({
      requests: [
        { service: 'accounting', path: '/api/1/deals/1' },
        { service: 'accounting', path: '/api/1/deals/2' },
      ],
    })) as BulkResponse;

    expect(res.isError).toBe(true);
    expect(parse(res).summary.failed).toBe(2);
  });

  it('rejects binary responses with guidance to use the single-request tool', async () => {
    const clientModule = await import('../api/client.js');
    vi.mocked(clientModule.isBinaryFileResponse).mockReturnValueOnce(true);
    vi.mocked(clientModule.makeApiRequest).mockResolvedValueOnce({
      data: Buffer.from('%PDF'),
      mimeType: 'application/pdf',
      size: 4,
    } as never);

    const handler = await getHandler('freee_api_bulk_get');
    const res = (await handler({
      requests: [{ service: 'accounting', path: '/api/1/receipts/1/download' }],
    })) as BulkResponse;

    expect(parse(res).results[0].error).toMatch(/freee_api_get を個別に使用/);
  });

  it('stops dispatching remaining requests after a 403 (freee throttles excess access with 403)', async () => {
    const clientModule = await import('../api/client.js');
    vi.mocked(clientModule.makeApiRequest)
      .mockResolvedValueOnce({ ok: 1 })
      .mockRejectedValueOnce(new clientModule.ForbiddenError('アクセス拒否 (403)'));

    const handler = await getHandler('freee_api_bulk_get');
    const res = (await handler({
      requests: [
        { service: 'accounting', path: '/api/1/deals/1' },
        { service: 'accounting', path: '/api/1/deals/2' },
        { service: 'accounting', path: '/api/1/deals/3' },
      ],
      concurrency: 1,
    })) as BulkResponse;

    const body = parse(res);
    expect(body.summary).toEqual({ total: 3, succeeded: 1, failed: 1, skipped: 1 });
    expect(JSON.stringify(body.results[2])).toMatch(/403/);
    expect(clientModule.makeApiRequest).toHaveBeenCalledTimes(2);
  });

  it('resolves the access token once before fanning out requests', async () => {
    const clientModule = await import('../api/client.js');
    const order: string[] = [];
    vi.mocked(clientModule.ensureValidAccessToken).mockImplementationOnce(async () => {
      order.push('token');
      return 'fresh-token';
    });
    const record = async () => {
      order.push('request');
      return { ok: true };
    };
    vi.mocked(clientModule.makeApiRequest)
      .mockImplementationOnce(record)
      .mockImplementationOnce(record)
      .mockImplementationOnce(record);

    const handler = await getHandler('freee_api_bulk_get');
    await handler({
      requests: [
        { service: 'accounting', path: '/api/1/deals/1' },
        { service: 'accounting', path: '/api/1/deals/2' },
        { service: 'accounting', path: '/api/1/deals/3' },
      ],
    });

    expect(clientModule.ensureValidAccessToken).toHaveBeenCalledTimes(1);
    expect(order).toEqual(['token', 'request', 'request', 'request']);
  });

  it('runs no request and returns isError when the token cannot be obtained', async () => {
    const clientModule = await import('../api/client.js');
    vi.mocked(clientModule.ensureValidAccessToken).mockRejectedValueOnce(
      new Error('Token refresh failed: 400'),
    );

    const handler = await getHandler('freee_api_bulk_write');
    const res = (await handler({
      requests: [{ method: 'POST', service: 'accounting', path: '/api/1/deals', body: {} }],
    })) as BulkResponse;

    expect(res.isError).toBe(true);
    expect(res.content[0].text).toMatch(/freee_authenticate/);
    expect(res.content[0].text).toMatch(/Token refresh failed: 400/);
    expect(clientModule.makeApiRequest).not.toHaveBeenCalled();
  });

  it('runs no request when there is no stored token', async () => {
    const clientModule = await import('../api/client.js');
    vi.mocked(clientModule.ensureValidAccessToken).mockResolvedValueOnce(null);

    const handler = await getHandler('freee_api_bulk_get');
    const res = (await handler({
      requests: [{ service: 'accounting', path: '/api/1/deals/1' }],
    })) as BulkResponse;

    expect(res.isError).toBe(true);
    expect(clientModule.makeApiRequest).not.toHaveBeenCalled();
  });

  it.each([
    'freee_api_bulk_get',
    'freee_api_bulk_write',
  ])('%s accepts `requests` as a JSON-encoded array string', async (name) => {
    const { z } = await import('zod');
    await getHandler(name);
    const inputSchema = z.object(
      capturedConfigs.get(name)?.inputSchema as Record<string, z.ZodTypeAny>,
    );
    const item =
      name === 'freee_api_bulk_get'
        ? { service: 'accounting', path: '/api/1/deals/1' }
        : { method: 'DELETE', service: 'accounting', path: '/api/1/deals/1' };

    const parsed = inputSchema.safeParse({ requests: JSON.stringify([item]) });
    expect(parsed.success).toBe(true);
    if (parsed.success) expect(parsed.data.requests).toEqual([item]);

    const bom = inputSchema.safeParse({ requests: `\uFEFF${JSON.stringify([item])}` });
    expect(bom.success).toBe(false);

    const broken = inputSchema.safeParse({ requests: '[{"service":' });
    expect(broken.success).toBe(false);
    if (!broken.success) {
      expect(JSON.stringify(broken.error.issues)).not.toContain('"service"');
    }
  });

  it('publishes anyOf [array, string] for `requests`', async () => {
    const { McpServer } = await import('@modelcontextprotocol/sdk/server/mcp.js');
    const { Client } = await import('@modelcontextprotocol/sdk/client/index.js');
    const { InMemoryTransport } = await import('@modelcontextprotocol/sdk/inMemory.js');
    await getHandler('freee_api_bulk_get');

    const server = new McpServer({ name: 'test', version: '1.0.0' });
    server.registerTool(
      'bulk',
      { inputSchema: capturedConfigs.get('freee_api_bulk_get')?.inputSchema as never },
      async () => ({ content: [{ type: 'text' as const, text: 'ok' }] }),
    );
    const [serverT, clientT] = InMemoryTransport.createLinkedPair();
    const client = new Client({ name: 'tester', version: '1.0.0' });
    await Promise.all([server.connect(serverT), client.connect(clientT)]);

    const tool = (await client.listTools()).tools.find((t) => t.name === 'bulk');
    const requests = (
      tool?.inputSchema as { properties: { requests: { anyOf?: Array<{ type?: string }> } } }
    ).properties.requests;
    expect(requests.anyOf?.map((s) => s.type)).toEqual(['array', 'string']);
  });
});
