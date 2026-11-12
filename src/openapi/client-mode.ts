import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';
import {
  ensureValidAccessToken,
  ForbiddenError,
  isBinaryFileResponse,
  makeApiRequest,
  RateLimitError,
} from '../api/client.js';
import { makeErrorChain, serializeErrorChain } from '../server/error-serializer.js';
import { sanitizePath } from '../server/logger.js';
import { getCurrentRecorder } from '../server/request-context.js';
import { getTransportMode } from '../server/user-agent.js';
import type { AuthExtra } from '../storage/context.js';
import { extractTokenContext } from '../storage/context.js';
import { registerTracedTool, setToolAttributes } from '../telemetry/tool-tracer.js';
import { createTextResponse, formatErrorMessage } from '../utils/error.js';
import { getHttpMethodToolAnnotations } from '../utils/http-method-annotations.js';
import {
  type ApiType,
  isMcpOnlyPath,
  listAllAvailablePaths,
  validatePathForService,
} from './schema-loader.js';

const SUPPORTED_IMAGE_MIME_TYPES = new Set(['image/jpeg', 'image/png', 'image/gif', 'image/webp']);

// service の値一覧は inputSchema の enum と serviceSchema の describe に任せ、
// description では列挙しない。
const SKILL_HINT = '詳細ガイドはfreee-api-skill skillを参照';

// mcp-only（freee-mcp リモート版限定）エンドポイントを stdio（ローカル）モードで
// 呼んだときに返すメッセージ。文言は skill のバナー・reference と揃える。
const MCP_ONLY_LOCAL_MESSAGE =
  'このエンドポイントは freee-mcp（リモート版）でのみ利用できます。' +
  '現在の接続はローカルモード（transport: stdio）のため呼び出せません。' +
  'ユーザーに freee-mcp（リモート版）への切り替え' +
  '（https://support.freee.co.jp/hc/ja/articles/56390747520537）を案内してください。';

const serviceSchema = z
  .enum([
    'accounting',
    'hr',
    'invoice',
    'pm',
    'sm',
    'it_management',
    'fixed_asset_management',
    'receivable_management',
    'partner_management',
    'survey',
    'launch',
    'employee_evaluation',
    'tax_return',
  ])
  // 値名から製品名が自明でないものだけ対応を書く（トークン節約）
  .describe(
    'pm=工数管理, sm=販売, launch=開業。survey/launch/employee_evaluation はリモート版限定',
  );

const UTF8_BOM = String.fromCharCode(0xfeff);
const XML_UTF8_ERROR_MESSAGE = 'XMLレスポンスをUTF-8として読み取れませんでした。';

function isUtf8Encoding(value: string): boolean {
  return value.trim().toLowerCase().replace(/[-_]/g, '') === 'utf8';
}

function decodeUtf8Xml(data: Buffer, mimeType: string): string {
  const charsetMatch = mimeType.match(/;\s*charset\s*=\s*(?:"([^"]+)"|'([^']+)'|([^;\s]+))/i);
  const charset = charsetMatch?.[1] ?? charsetMatch?.[2] ?? charsetMatch?.[3];
  if (charset && !isUtf8Encoding(charset)) {
    throw new Error(XML_UTF8_ERROR_MESSAGE);
  }

  const hasUtf16OrUtf32Bom =
    (data[0] === 0xff && data[1] === 0xfe) ||
    (data[0] === 0xfe && data[1] === 0xff) ||
    (data[0] === 0x00 && data[1] === 0x00 && data[2] === 0xfe && data[3] === 0xff);
  if (hasUtf16OrUtf32Bom) {
    throw new Error(XML_UTF8_ERROR_MESSAGE);
  }

  let xml: string;
  try {
    xml = new TextDecoder('utf-8', { fatal: true }).decode(data);
  } catch {
    throw new Error(XML_UTF8_ERROR_MESSAGE);
  }
  // biome-ignore lint/suspicious/noControlCharactersInRegex: XMLで禁止されている制御文字を検出するために必要
  if (/[\u0000-\u0008\u000b\u000c\u000e-\u001f\ufffe\uffff]/.test(xml)) {
    throw new Error(XML_UTF8_ERROR_MESSAGE);
  }

  const declarationEncoding = xml.match(/^\s*<\?xml[^>]*\bencoding\s*=\s*["']([^"']+)["']/i)?.[1];
  if (declarationEncoding && !isUtf8Encoding(declarationEncoding)) {
    throw new Error(XML_UTF8_ERROR_MESSAGE);
  }

  return xml;
}

// Top-level union (record | string-decoding-to-record) rather than
// `z.preprocess(..., z.record(...))` so the JSON Schema published via
// tools/list becomes `anyOf: [{type: "object"}, {type: "string"}]`. Some MCP
// clients validate arguments against the published JSON Schema before
// forwarding the call, and `{type: "object"}` alone causes them to reject
// string-shaped bodies before the server-side coercion can run (issue #410).
const recordSchema = z.record(z.string(), z.unknown());

/**
 * JSON 文字列をデコードしてから `schema` で検証する zod スキーマを作る。
 * エラーメッセージには文字列の長さだけを載せ、ペイロードの中身は出さない。
 */
function jsonStringTo<T extends z.ZodTypeAny>(schema: T, expected: 'object' | 'array') {
  return z
    .string()
    .transform((val, ctx) => {
      if (val.startsWith(UTF8_BOM)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            `string starts with a UTF-8 BOM (U+FEFF), which is not valid JSON. ` +
            `The MCP client likely transcoded the payload through a transport ` +
            `that prepended a BOM (commonly seen on Windows). ` +
            `Send the JSON without a BOM.`,
        });
        return z.NEVER;
      }
      try {
        return JSON.parse(val) as unknown;
      } catch {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            `expected ${expected} or JSON-encoded ${expected} string; received string ` +
            `of length ${val.length} that could not be parsed as JSON`,
        });
        return z.NEVER;
      }
    })
    .pipe(schema);
}

const coercibleRecordSchema = z.union([recordSchema, jsonStringTo(recordSchema, 'object')]);

/**
 * 配列、または JSON 文字列にエンコードされた配列を受け付ける。
 * coercibleRecord と同じ理由（一部の MCP クライアントは配列引数も文字列で送る）で
 * 公開 JSON Schema を `anyOf: [{type: "array"}, {type: "string"}]` にする。
 */
function coercibleArray<T extends z.ZodTypeAny>(arraySchema: z.ZodArray<T>, description: string) {
  return z.union([arraySchema, jsonStringTo(arraySchema, 'array')]).describe(description);
}

export function coercibleRecord(description: string) {
  return coercibleRecordSchema.describe(description);
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface ApiRequestArgs {
  service: ApiType;
  path: string;
  query?: Record<string, unknown>;
  body?: Record<string, unknown>;
}

type RequestOutcome =
  | {
      kind: 'response';
      result: Awaited<ReturnType<typeof makeApiRequest>>;
      actualPath: string;
    }
  | { kind: 'rejected'; message: string; isError: boolean };

/**
 * パス検証 → mcp-only ゲート → freee API 呼び出しまでを行う共通処理。
 * 検証で弾いた場合は error を recorder に記録して `rejected` を返す。
 * freee API 呼び出しの失敗（4xx/5xx/network 等）は throw するので呼び出し側で扱う。
 * tool_call の記録は呼び出し側（単発ツール / bulk ツール）の責務。
 */
async function executeRequest(
  method: HttpMethod,
  args: ApiRequestArgs,
  tokenContext: ReturnType<typeof extractTokenContext>,
): Promise<RequestOutcome> {
  const recorder = getCurrentRecorder();
  const { service, path, query, body } = args;

  const validation = validatePathForService(method, path, service);
  if (!validation.isValid) {
    recorder?.recordError({
      source: 'validation',
      error_type: 'path_validation_failed',
      chain: makeErrorChain('ValidationError', validation.message ?? 'unknown validation error'),
    });
    return {
      kind: 'rejected',
      message:
        `パス検証エラー: ${validation.message}\n\n` +
        `利用可能なパスを確認するには freee_api_list_paths ツールを使用してください。`,
      isError: false,
    };
  }

  const actualPath = validation.actualPath ?? path;

  // mcp-only エンドポイントはローカル（stdio）モードでは freee API 側で拒否される。
  // 往復を避け、ユーザーへの案内を確実にするため、ここで API を叩かずに弾く。
  if (getTransportMode() === 'stdio' && isMcpOnlyPath(actualPath)) {
    recorder?.recordError({
      source: 'validation',
      error_type: 'mcp_only_endpoint_local_mode',
      chain: makeErrorChain('McpOnlyEndpointError', MCP_ONLY_LOCAL_MESSAGE),
    });
    return { kind: 'rejected', message: MCP_ONLY_LOCAL_MESSAGE, isError: true };
  }

  const result = await makeApiRequest(
    method,
    actualPath,
    query,
    body,
    validation.baseUrl,
    tokenContext,
    validation.operation?.parameters,
    validation.operation?.accept,
  );
  return { kind: 'response', result, actualPath };
}

/**
 * Creates a tool handler for a specific HTTP method
 */
function createMethodTool(method: HttpMethod) {
  const toolName = `freee_api_${method.toLowerCase()}`;

  return async (args: ApiRequestArgs, extra?: AuthExtra) => {
    const recorder = getCurrentRecorder();
    const startTime = Date.now();
    const safePath = sanitizePath(args.path);
    const tokenContext = extractTokenContext(extra);

    try {
      const { service } = args;
      setToolAttributes({
        'mcp.tool.service': service,
        'mcp.tool.path': safePath,
        'mcp.tool.method': method,
      });

      const outcome = await executeRequest(method, args, tokenContext);
      if (outcome.kind === 'rejected') {
        recorder?.recordToolCall({
          tool: toolName,
          service,
          status: 'error',
          duration_ms: Date.now() - startTime,
        });
        return createTextResponse(outcome.message, outcome.isError ? { isError: true } : undefined);
      }

      const { result, actualPath } = outcome;

      let baseMimeType: string | undefined;
      let xmlText: string | undefined;
      const isBinaryResponse = isBinaryFileResponse(result);
      if (isBinaryResponse) {
        baseMimeType = result.mimeType.split(';')[0].trim().toLowerCase();
        if (baseMimeType === 'application/xml' || baseMimeType === 'text/xml') {
          xmlText = decodeUtf8Xml(result.data, result.mimeType);
        }
      }

      recorder?.recordToolCall({
        tool: toolName,
        service,
        status: 'success',
        duration_ms: Date.now() - startTime,
      });

      if (isBinaryResponse) {
        const resolvedBaseMimeType = baseMimeType as string;

        if (SUPPORTED_IMAGE_MIME_TYPES.has(resolvedBaseMimeType)) {
          return {
            content: [
              {
                type: 'image',
                data: result.data.toString('base64'),
                mimeType: resolvedBaseMimeType,
              },
            ],
          };
        }

        if (resolvedBaseMimeType === 'application/pdf') {
          return {
            content: [
              {
                type: 'resource',
                resource: {
                  uri: `freee://api${actualPath}`,
                  mimeType: resolvedBaseMimeType,
                  blob: result.data.toString('base64'),
                },
              },
            ],
          };
        }

        if (resolvedBaseMimeType === 'text/csv') {
          return createTextResponse(result.data.toString('utf-8'));
        }

        if (resolvedBaseMimeType === 'application/xml' || resolvedBaseMimeType === 'text/xml') {
          return createTextResponse(xmlText as string);
        }

        return createTextResponse(
          `バイナリファイルを受信しました。このファイル形式（${resolvedBaseMimeType}）は表示できません。\n\n` +
            `Content-Type: ${result.mimeType}\n` +
            `ファイルサイズ: ${result.size} bytes\n\n` +
            `このファイルを取得するには、freee Webアプリから直接ダウンロードしてください。`,
        );
      }

      if (result === null) {
        return createTextResponse('リクエストが正常に完了しました。');
      }

      return createTextResponse(JSON.stringify(result));
    } catch (error) {
      recorder?.recordToolCall({
        tool: toolName,
        service: args.service,
        status: 'error',
        duration_ms: Date.now() - startTime,
      });
      recorder?.recordError({ source: 'tool_handler', chain: serializeErrorChain(error) });
      // MCP 仕様 (Tools - Error Handling): 上流 API への呼び出しが 2xx 以外で返ってきた
      // ケース（4xx/5xx/network/timeout 等）はツール実行失敗として `isError: true` で
      // 返し、LLM/クライアントに成功と区別させる。
      return createTextResponse(`APIリクエストエラー: ${formatErrorMessage(error)}`, {
        isError: true,
      });
    }
  };
}

// bulk ツールの上限。freee API のレートリミットとレスポンスサイズを考慮して小さめに置く。
export const BULK_GET_MAX_REQUESTS = 20;
export const BULK_WRITE_MAX_REQUESTS = 10;
const BULK_GET_DEFAULT_CONCURRENCY = 3;
const BULK_GET_MAX_CONCURRENCY = 5;
// 書き込みは既定で直列実行。順序依存の更新や途中失敗時の影響範囲を読みやすくするため。
const BULK_WRITE_DEFAULT_CONCURRENCY = 1;
const BULK_WRITE_MAX_CONCURRENCY = 3;

interface BulkRequestItem extends ApiRequestArgs {
  method: HttpMethod;
}

type BulkItemResult =
  | { index: number; status: 'success'; data: unknown }
  | { index: number; status: 'error'; error: string }
  | { index: number; status: 'skipped'; reason: string };

/**
 * executeRequest の結果を bulk の結果要素に変換する。
 * バイナリレスポンス（PDF/画像/CSV/XML 等）は bulk では返さず、単発ツールを案内する。
 */
function toBulkResult(
  index: number,
  item: BulkRequestItem,
  outcome: RequestOutcome,
): BulkItemResult {
  if (outcome.kind === 'rejected') {
    return { index, status: 'error', error: outcome.message };
  }
  if (isBinaryFileResponse(outcome.result)) {
    return {
      index,
      status: 'error',
      error:
        `バイナリレスポンス（${outcome.result.mimeType}）は bulk ツールでは取得できません。` +
        `freee_api_${item.method.toLowerCase()} を個別に使用してください。`,
    };
  }
  return { index, status: 'success', data: outcome.result };
}

/**
 * 複数リクエストを並列数を制限して実行する。
 * - 429（レートリミット）を受けたら未着手のリクエストは実行せず skipped にする
 * - stopOnError が true の場合、いずれかが失敗した時点で未着手分を skipped にする
 * 結果は入力順で返す。
 */
async function runBulk(
  items: BulkRequestItem[],
  options: { concurrency: number; stopOnError: boolean },
  tokenContext: ReturnType<typeof extractTokenContext>,
): Promise<BulkItemResult[]> {
  const results: BulkItemResult[] = new Array(items.length);
  let next = 0;
  let stopReason: string | undefined;

  const worker = async (): Promise<void> => {
    while (next < items.length) {
      const index = next++;
      if (stopReason) {
        results[index] = { index, status: 'skipped', reason: stopReason };
        continue;
      }
      const item = items[index];
      try {
        // 単発の freee_api_delete と同じく DELETE ではボディを送らない
        const request = item.method === 'DELETE' ? { ...item, body: undefined } : item;
        const outcome = await executeRequest(item.method, request, tokenContext);
        results[index] = toBulkResult(index, item, outcome);
      } catch (error) {
        getCurrentRecorder()?.recordError({
          source: 'tool_handler',
          chain: serializeErrorChain(error),
        });
        results[index] = {
          index,
          status: 'error',
          error: `APIリクエストエラー: ${formatErrorMessage(error)}`,
        };
        if (error instanceof RateLimitError) {
          stopReason ??=
            'レートリミット (429) に達したため実行しませんでした。時間をおいて再実行してください。';
        } else if (error instanceof ForbiddenError) {
          // freee は過度のアクセスを 403 で制限する（約 10 分で解除）。権限不足との区別が
          // つかないため、制限中の API に投げ続けないよう 429 と同様に打ち切る。
          stopReason ??=
            `リクエスト #${index} が 403 を返したため実行しませんでした。` +
            'アクセス過多による制限（10 分程度で解除）か、権限不足の可能性があります。';
        }
      }
      if (options.stopOnError && results[index].status === 'error') {
        stopReason ??= `リクエスト #${index} が失敗したため実行しませんでした (stop_on_error)。`;
      }
    }
  };

  const workerCount = Math.min(options.concurrency, items.length);
  await Promise.all(Array.from({ length: workerCount }, () => worker()));
  return results;
}

function formatBulkResponse(results: BulkItemResult[]): CallToolResult {
  const summary = {
    total: results.length,
    succeeded: results.filter((r) => r.status === 'success').length,
    failed: results.filter((r) => r.status === 'error').length,
    skipped: results.filter((r) => r.status === 'skipped').length,
  };
  // 1件でも成功していれば部分成功として isError は付けない（各要素の status を見る）。
  return createTextResponse(JSON.stringify({ summary, results }), {
    isError: summary.succeeded === 0,
  });
}

function createBulkTool(toolName: string, defaults: { concurrency: number; stopOnError: boolean }) {
  return async (
    args: { requests: BulkRequestItem[]; concurrency?: number; stop_on_error?: boolean },
    extra?: AuthExtra,
  ): Promise<CallToolResult> => {
    const recorder = getCurrentRecorder();
    const startTime = Date.now();
    const tokenContext = extractTokenContext(extra);
    const services = new Set(args.requests.map((r) => r.service));
    const service = services.size === 1 ? args.requests[0].service : undefined;

    setToolAttributes({
      'mcp.tool.bulk.count': args.requests.length,
      'mcp.tool.bulk.methods': [...new Set(args.requests.map((r) => r.method))].join(','),
      ...(service ? { 'mcp.tool.service': service } : {}),
    });

    // 並列ワーカーがそれぞれトークンをリフレッシュすると、同じ refresh token を
    // 複数回使って競合する。先に 1 回だけ確定させてからリクエストを流す。
    let accessToken: string | null = null;
    let tokenError: unknown;
    try {
      accessToken = await ensureValidAccessToken(tokenContext);
    } catch (error) {
      recorder?.recordError({ source: 'tool_handler', chain: serializeErrorChain(error) });
      tokenError = error;
    }
    if (!accessToken) {
      recorder?.recordToolCall({
        tool: toolName,
        service,
        status: 'error',
        duration_ms: Date.now() - startTime,
      });
      const detail = tokenError ? `\nエラー詳細: ${formatErrorMessage(tokenError)}` : '';
      return createTextResponse(
        '認証が必要です。freee_authenticate ツールを使用して認証を行ってください。' +
          `（bulk のリクエストは実行していません）${detail}`,
        { isError: true },
      );
    }

    const results = await runBulk(
      args.requests,
      {
        concurrency: args.concurrency ?? defaults.concurrency,
        stopOnError: args.stop_on_error ?? defaults.stopOnError,
      },
      tokenContext,
    );
    const response = formatBulkResponse(results);

    recorder?.recordToolCall({
      tool: toolName,
      service,
      status: response.isError ? 'error' : 'success',
      duration_ms: Date.now() - startTime,
    });
    return response;
  };
}

const bulkPathSchema = z.string().describe('APIパス (例: /api/1/deals/123)');
const bulkQuerySchema = coercibleRecord('クエリパラメータ (オプション)').optional();

/**
 * Generates API client tools as sub-commands per HTTP method
 */
export function generateClientModeTool(server: McpServer): void {
  const bulkGetHandler = createBulkTool('freee_api_bulk_get', {
    concurrency: BULK_GET_DEFAULT_CONCURRENCY,
    stopOnError: false,
  });

  // GET tool
  registerTracedTool(
    server,
    'freee_api_get',
    {
      title: 'freee API GET リクエスト',
      description: `freee API GET: データを取得 (${SKILL_HINT})`,
      inputSchema: {
        service: serviceSchema,
        path: z.string().describe('APIパス (例: /api/1/deals)'),
        query: coercibleRecord('クエリパラメータ (オプション)').optional(),
      },
      annotations: getHttpMethodToolAnnotations('GET'),
    },
    createMethodTool('GET'),
  );

  // POST tool
  registerTracedTool(
    server,
    'freee_api_post',
    {
      title: 'freee API POST リクエスト',
      description: `freee API POST: データを新規作成 (${SKILL_HINT})`,
      inputSchema: {
        service: serviceSchema,
        path: z.string().describe('APIパス (例: /api/1/deals)'),
        body: coercibleRecord('リクエストボディ'),
        query: coercibleRecord('クエリパラメータ (オプション)').optional(),
      },
      annotations: getHttpMethodToolAnnotations('POST'),
    },
    createMethodTool('POST'),
  );

  // PUT tool
  registerTracedTool(
    server,
    'freee_api_put',
    {
      title: 'freee API PUT リクエスト',
      description: `freee API PUT: データを更新 (${SKILL_HINT})`,
      inputSchema: {
        service: serviceSchema,
        path: z.string().describe('APIパス (例: /api/1/deals/123)'),
        body: coercibleRecord('リクエストボディ'),
        query: coercibleRecord('クエリパラメータ (オプション)').optional(),
      },
      annotations: getHttpMethodToolAnnotations('PUT'),
    },
    createMethodTool('PUT'),
  );

  // DELETE tool
  registerTracedTool(
    server,
    'freee_api_delete',
    {
      title: 'freee API DELETE リクエスト',
      description: `freee API DELETE: データを削除 (${SKILL_HINT})`,
      inputSchema: {
        service: serviceSchema,
        path: z.string().describe('APIパス (例: /api/1/deals/123)'),
        query: coercibleRecord('クエリパラメータ (オプション)').optional(),
      },
      annotations: getHttpMethodToolAnnotations('DELETE'),
    },
    createMethodTool('DELETE'),
  );

  // PATCH tool
  registerTracedTool(
    server,
    'freee_api_patch',
    {
      title: 'freee API PATCH リクエスト',
      description: `freee API PATCH: データを部分更新 (${SKILL_HINT})`,
      inputSchema: {
        service: serviceSchema,
        path: z.string().describe('APIパス (例: /api/1/deals/123)'),
        body: coercibleRecord('リクエストボディ'),
        query: coercibleRecord('クエリパラメータ (オプション)').optional(),
      },
      annotations: getHttpMethodToolAnnotations('PATCH'),
    },
    createMethodTool('PATCH'),
  );

  registerTracedTool(
    server,
    'freee_api_bulk_get',
    {
      title: 'freee API GET 一括リクエスト',
      description:
        `freee API GET 一括: データをまとめて取得 (最大${BULK_GET_MAX_REQUESTS}件、部分成功あり)。` +
        `ID一覧から詳細をまとめて取得する場合などに使う。バイナリ(PDF等)は対象外 (${SKILL_HINT})`,
      inputSchema: {
        requests: coercibleArray(
          z
            .array(
              z.object({
                service: serviceSchema,
                path: bulkPathSchema,
                query: bulkQuerySchema,
              }),
            )
            .min(1)
            .max(BULK_GET_MAX_REQUESTS),
          '実行するリクエストの配列',
        ),
        concurrency: z
          .number()
          .int()
          .min(1)
          .max(BULK_GET_MAX_CONCURRENCY)
          .optional()
          .describe(`同時実行数 (既定: ${BULK_GET_DEFAULT_CONCURRENCY})`),
        stop_on_error: z
          .boolean()
          .optional()
          .describe('失敗時に未実行分を中止するか (既定: false)'),
      },
      annotations: getHttpMethodToolAnnotations('GET'),
    },
    (
      args: {
        requests: ApiRequestArgs[];
        concurrency?: number;
        stop_on_error?: boolean;
      },
      extra?: AuthExtra,
    ) =>
      bulkGetHandler(
        { ...args, requests: args.requests.map((r) => ({ ...r, method: 'GET' as const })) },
        extra,
      ),
  );

  registerTracedTool(
    server,
    'freee_api_bulk_write',
    {
      title: 'freee API 書き込み一括リクエスト',
      description:
        `freee API POST/PUT/PATCH/DELETE 一括: データをまとめて作成・更新・削除 (最大${BULK_WRITE_MAX_REQUESTS}件)。` +
        `既定は直列実行・失敗時に残りを中止 (${SKILL_HINT})`,
      inputSchema: {
        requests: coercibleArray(
          z
            .array(
              z.object({
                method: z.enum(['POST', 'PUT', 'PATCH', 'DELETE']).describe('HTTPメソッド'),
                service: serviceSchema,
                path: bulkPathSchema,
                body: coercibleRecord('リクエストボディ (DELETE では不要)').optional(),
                query: bulkQuerySchema,
              }),
            )
            .min(1)
            .max(BULK_WRITE_MAX_REQUESTS),
          '実行するリクエストの配列 (配列順に実行)',
        ),
        concurrency: z
          .number()
          .int()
          .min(1)
          .max(BULK_WRITE_MAX_CONCURRENCY)
          .optional()
          .describe(`同時実行数 (既定: ${BULK_WRITE_DEFAULT_CONCURRENCY} = 直列)`),
        stop_on_error: z.boolean().optional().describe('失敗時に未実行分を中止するか (既定: true)'),
      },
      annotations: getHttpMethodToolAnnotations('POST'),
    },
    createBulkTool('freee_api_bulk_write', {
      concurrency: BULK_WRITE_DEFAULT_CONCURRENCY,
      stopOnError: true,
    }),
  );

  // Add helper tool to list available paths
  registerTracedTool(
    server,
    'freee_api_list_paths',
    {
      title: 'API エンドポイント一覧',
      description: 'freee API エンドポイント一覧 (詳細ガイドはfreee-api-skill skillを参照)',
      annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false },
    },
    async () => {
      const recorder = getCurrentRecorder();
      const toolStart = Date.now();
      // stdio（ローカル）モードでは mcp-only エンドポイントは呼び出せないため一覧から外す
      const isStdio = getTransportMode() === 'stdio';
      const pathsList = listAllAvailablePaths({ excludeMcpOnly: isStdio });
      recorder?.recordToolCall({
        tool: 'freee_api_list_paths',
        status: 'success',
        duration_ms: Date.now() - toolStart,
      });
      const stdioNote = isStdio
        ? '\n\n※ freee-mcp（リモート版）限定のエンドポイントは、ローカルモード（transport: stdio）では利用できないため省略しています。'
        : '';
      return createTextResponse(
        `# freee API 利用可能なエンドポイント一覧${pathsList}${stdioNote}\n\n` +
          `使用例:\n` +
          `freee_api_get { "service": "accounting", "path": "/api/1/deals", "query": { "limit": 10 } }\n` +
          `freee_api_get { "service": "accounting", "path": "/api/1/deals", "query": { "type": "income", "limit": 5 } }\n` +
          `freee_api_post { "service": "accounting", "path": "/api/1/deals", "body": { "issue_date": "2024-01-01", ... } }`,
      );
    },
  );
}
