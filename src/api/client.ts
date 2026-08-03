import { getValidAccessToken } from '../auth/tokens.js';
import { getCurrentCompanyId } from '../config/companies.js';
import { getConfig } from '../config.js';
import { FETCH_TIMEOUT_API_MS } from '../constants.js';
import { serializeErrorChain } from '../server/error-serializer.js';
import { sanitizePath } from '../server/logger.js';
import { deriveQueryKeys, getCurrentRecorder } from '../server/request-context.js';
import { getUserAgent } from '../server/user-agent.js';
import { resolveCompanyId, type TokenContext } from '../storage/context.js';
import { formatApiErrorMessage, formatResponseErrorInfo } from '../utils/error.js';

/**
 * Response type for binary file downloads
 */
export interface BinaryFileResponse {
  type: 'binary';
  data: Buffer;
  mimeType: string;
  size: number;
}

export type ApiResponseMediaType = 'application/xml' | 'text/xml';

export const MAX_XML_RESPONSE_BYTES = 1_048_576;

const XML_RESPONSE_TOO_LARGE_MESSAGE = 'XMLレスポンスが安全上限（1,048,576 bytes）を超えています。';
const XML_RESPONSE_CONTENT_TYPE_ERROR_MESSAGE = 'XMLレスポンスのContent-Typeが不正です。';

class XmlResponseTooLargeError extends Error {
  constructor() {
    super(XML_RESPONSE_TOO_LARGE_MESSAGE);
    this.name = 'XmlResponseTooLargeError';
  }
}

class XmlResponseContentTypeError extends Error {
  constructor() {
    super(XML_RESPONSE_CONTENT_TYPE_ERROR_MESSAGE);
    this.name = 'XmlResponseContentTypeError';
  }
}

/**
 * Type guard for BinaryFileResponse
 */
export function isBinaryFileResponse(result: unknown): result is BinaryFileResponse {
  return (
    typeof result === 'object' &&
    result !== null &&
    'type' in result &&
    (result as BinaryFileResponse).type === 'binary'
  );
}

/**
 * Check if Content-Type indicates binary response
 */
function isBinaryContentType(contentType: string): boolean {
  const baseMimeType = contentType.split(';')[0].trim().toLowerCase();
  return (
    baseMimeType === 'application/pdf' ||
    baseMimeType === 'application/octet-stream' ||
    baseMimeType === 'text/csv' ||
    baseMimeType === 'application/xml' ||
    baseMimeType === 'text/xml' ||
    baseMimeType.startsWith('image/')
  );
}

function isXmlContentType(contentType: string): boolean {
  const baseMimeType = contentType.split(';')[0].trim().toLowerCase();
  return baseMimeType === 'application/xml' || baseMimeType === 'text/xml';
}

function isJsonContentType(contentType: string): boolean {
  const baseMimeType = contentType.split(';')[0].trim().toLowerCase();
  return baseMimeType === 'application/json' || baseMimeType.endsWith('+json');
}

async function readBinaryResponse(response: Response, maxBytes?: number): Promise<Buffer> {
  if (maxBytes !== undefined) {
    const contentLength = response.headers.get('content-length');
    if (contentLength && /^\d+$/.test(contentLength.trim())) {
      const declaredBytes = Number(contentLength);
      if (Number.isSafeInteger(declaredBytes) && declaredBytes > maxBytes) {
        await response.body?.cancel().catch(() => undefined);
        throw new XmlResponseTooLargeError();
      }
    }
  }

  if (maxBytes !== undefined && response.body) {
    const reader = response.body.getReader();
    const chunks: Uint8Array[] = [];
    let totalBytes = 0;

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        if (!value) continue;

        totalBytes += value.byteLength;
        if (totalBytes > maxBytes) {
          await reader.cancel().catch(() => undefined);
          throw new XmlResponseTooLargeError();
        }
        chunks.push(value);
      }
    } finally {
      reader.releaseLock();
    }

    return Buffer.concat(
      chunks.map((chunk) => Buffer.from(chunk)),
      totalBytes,
    );
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  if (maxBytes !== undefined && buffer.byteLength > maxBytes) {
    throw new XmlResponseTooLargeError();
  }
  return buffer;
}

/**
 * Build a Japanese retry guidance message from a Retry-After header value.
 * RFC 7231 §7.1.3 allows delta-seconds (integer) or HTTP-date forms; both are
 * normalized to a "N秒後に再試行してください。" message. Falls back to a
 * generic "wait a few minutes" message when the header is absent or
 * unparseable, so a malformed value never bleeds into the user-facing string.
 */
export function formatRetryAfterMessage(retryAfter: string | null): string {
  const fallback = '数分待ってから再試行してください。';
  if (!retryAfter) return fallback;
  const trimmed = retryAfter.trim();
  if (/^\d+$/.test(trimmed)) {
    return `${trimmed}秒後に再試行してください。`;
  }
  const parsed = Date.parse(trimmed);
  if (Number.isFinite(parsed)) {
    const seconds = Math.max(0, Math.ceil((parsed - Date.now()) / 1000));
    return `${seconds}秒後に再試行してください。`;
  }
  return fallback;
}

export async function makeApiRequest(
  method: string,
  apiPath: string,
  params?: Record<string, unknown>,
  body?: Record<string, unknown>,
  baseUrl?: string,
  tokenContext?: TokenContext,
  accept?: ApiResponseMediaType,
): Promise<unknown | BinaryFileResponse> {
  const recorder = getCurrentRecorder();
  const startTime = Date.now();
  const safePath = sanitizePath(apiPath);
  const queryKeys = deriveQueryKeys(recorder, params);
  const userId = tokenContext?.userId ?? 'local';
  const apiUrl = baseUrl || getConfig().freee.apiUrl;
  const [companyId, accessToken] = tokenContext
    ? await Promise.all([
        resolveCompanyId(tokenContext),
        tokenContext.tokenStore.getValidAccessToken(tokenContext.userId),
      ])
    : await Promise.all([getCurrentCompanyId(), getValidAccessToken()]);

  if (!accessToken) {
    throw new Error(
      `認証が必要です。freee_authenticate ツールを使用して認証を行ってください。\n` +
        `現在の事業所ID: ${companyId}`,
    );
  }

  // path に ? / # を許すと tenant smuggling (?company_id=B 埋め込みで consistency check と
  // OpenAPI route validator の両方をすり抜ける) の経路になるため、ここで弾く。
  if (apiPath.includes('?') || apiPath.includes('#')) {
    throw new Error(
      'API path に "?" または "#" を含めることはできません。クエリパラメータは params 引数で指定してください。',
    );
  }

  // Properly join baseUrl and path, preserving baseUrl's path component
  const normalizedBase = apiUrl.endsWith('/') ? apiUrl : `${apiUrl}/`;
  const normalizedPath = apiPath.startsWith('/') ? apiPath.slice(1) : apiPath;
  const url = new URL(normalizedPath, normalizedBase);

  // Validate company_id consistency if present in params
  const paramsCompanyId = params?.company_id;
  if (paramsCompanyId !== undefined && String(paramsCompanyId) !== String(companyId)) {
    throw new Error(
      `company_id の不整合: リクエストの company_id (${paramsCompanyId}) と現在の事業所 (${companyId}) が異なります。\n` +
        `freee_set_current_company で事業所を切り替えるか、リクエストの company_id を修正してください。`,
    );
  }

  // Validate company_id consistency if present in body
  const bodyCompanyId = body?.company_id;
  if (bodyCompanyId !== undefined && String(bodyCompanyId) !== String(companyId)) {
    throw new Error(
      `company_id の不整合: リクエストボディの company_id (${bodyCompanyId}) と現在の事業所 (${companyId}) が異なります。\n` +
        `freee_set_current_company で事業所を切り替えるか、リクエストの company_id を修正してください。`,
    );
  }

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value === undefined) continue;
      // company_id は重複クエリ ("last value wins" で別テナントへ流れる経路) を避けるため set
      if (key === 'company_id') {
        url.searchParams.set(key, String(value));
      } else {
        url.searchParams.append(key, String(value));
      }
    }
  }

  // Defense-in-depth: baseUrl 側等に紛れ込んだ company_id を最終 URL ベースで再検査する
  const allCompanyIds = url.searchParams.getAll('company_id');
  for (const value of allCompanyIds) {
    if (value !== String(companyId)) {
      throw new Error(
        `company_id の不整合: リクエスト URL に現在の事業所 (${companyId}) と異なる company_id (${value}) が含まれています。\n` +
          `freee_set_current_company で事業所を切り替えるか、リクエストを修正してください。`,
      );
    }
  }

  const headers: Record<string, string> = {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
    'User-Agent': getUserAgent(),
    'freee-using-beta': 'true',
  };
  if (companyId) {
    headers['x-freee-company-id'] = String(companyId);
  }
  if (accept) {
    headers.Accept = accept;
  }

  let response: Response;
  try {
    response = await fetch(url.toString(), {
      method,
      headers,
      body: body ? JSON.stringify(typeof body === 'string' ? JSON.parse(body) : body) : undefined,
      signal: AbortSignal.timeout(FETCH_TIMEOUT_API_MS),
    });
  } catch (fetchError) {
    const durationMs = Date.now() - startTime;
    const errorType: 'timeout' | 'network_error' =
      fetchError instanceof Error && fetchError.name === 'TimeoutError'
        ? 'timeout'
        : 'network_error';
    recorder?.recordApiCall({
      method,
      path_pattern: safePath,
      status_code: null,
      duration_ms: durationMs,
      company_id: String(companyId ?? ''),
      user_id: userId,
      error_type: errorType,
      query_keys: queryKeys,
    });
    recorder?.recordError({
      source: 'api_client',
      error_type: errorType,
      chain: serializeErrorChain(fetchError),
    });
    throw fetchError;
  }

  if (response.status === 401) {
    const errorInfo = await formatResponseErrorInfo(response);
    const authError = new Error(
      `認証エラーが発生しました。freee_authenticate ツールを使用して再認証を行ってください。\n` +
        `現在の事業所ID: ${companyId}\n` +
        `エラー詳細: ${response.status} ${errorInfo}\n\n` +
        `確認事項:\n` +
        `1. freee側でアプリケーション設定が正しいか（リダイレクトURI等）\n` +
        `2. トークンの有効期限が切れていないか\n` +
        `3. 事業所IDが正しいか（freee_get_current_company で確認）`,
    );
    recorder?.recordApiCall({
      method,
      path_pattern: safePath,
      status_code: 401,
      duration_ms: Date.now() - startTime,
      company_id: String(companyId ?? ''),
      user_id: userId,
      error_type: 'auth_error',
      query_keys: queryKeys,
    });
    recorder?.recordError({
      source: 'api_client',
      status_code: 401,
      error_type: 'auth_error',
      chain: serializeErrorChain(authError),
    });
    throw authError;
  }

  if (response.status === 403) {
    const errorInfo = await formatResponseErrorInfo(response);
    const forbiddenError = new Error(
      `アクセス拒否 (403): ${errorInfo}\n` +
        `事業所ID: ${companyId}\n\n` +
        `レートリミットの可能性があります。数分待ってから再試行してください。\n` +
        `それでも解決しない場合は、アプリの権限設定を確認するか、freee_authenticate で再認証してください。`,
    );
    recorder?.recordApiCall({
      method,
      path_pattern: safePath,
      status_code: 403,
      duration_ms: Date.now() - startTime,
      company_id: String(companyId ?? ''),
      user_id: userId,
      error_type: 'forbidden',
      query_keys: queryKeys,
    });
    recorder?.recordError({
      source: 'api_client',
      status_code: 403,
      error_type: 'forbidden',
      chain: serializeErrorChain(forbiddenError),
    });
    throw forbiddenError;
  }

  if (response.status === 429) {
    const retryAfter = response.headers.get('Retry-After');
    const errorInfo = await formatResponseErrorInfo(response);
    const retryMsg = formatRetryAfterMessage(retryAfter);
    const rateLimitError = new Error(
      `レートリミットに達しました (429): ${errorInfo}\n事業所ID: ${companyId}\n${retryMsg}`,
    );
    recorder?.recordApiCall({
      method,
      path_pattern: safePath,
      status_code: 429,
      duration_ms: Date.now() - startTime,
      company_id: String(companyId ?? ''),
      user_id: userId,
      error_type: 'rate_limit',
      query_keys: queryKeys,
    });
    recorder?.recordError({
      source: 'api_client',
      status_code: 429,
      error_type: 'rate_limit',
      chain: serializeErrorChain(rateLimitError),
    });
    throw rateLimitError;
  }

  if (!response.ok) {
    const errorMessage = await formatApiErrorMessage(response, response.status);
    const httpError = new Error(errorMessage);
    recorder?.recordApiCall({
      method,
      path_pattern: safePath,
      status_code: response.status,
      duration_ms: Date.now() - startTime,
      company_id: String(companyId ?? ''),
      user_id: userId,
      error_type: 'http_error',
      query_keys: queryKeys,
    });
    recorder?.recordError({
      source: 'api_client',
      status_code: response.status,
      error_type: 'http_error',
      chain: serializeErrorChain(httpError),
    });
    throw httpError;
  }

  // Check Content-Type for binary response
  const contentType = response.headers.get('content-type') || '';

  const successApiCall = {
    method,
    path_pattern: safePath,
    status_code: response.status,
    company_id: String(companyId ?? ''),
    user_id: userId,
    error_type: null as null,
    query_keys: queryKeys,
  };

  const expectsXml = accept !== undefined;
  const responseIsXml = isXmlContentType(contentType);
  const responseIsJson = isJsonContentType(contentType);

  if (expectsXml && !responseIsXml && !responseIsJson) {
    await response.body?.cancel().catch(() => undefined);
    const contentTypeError = new XmlResponseContentTypeError();
    recorder?.recordApiCall({
      ...successApiCall,
      duration_ms: Date.now() - startTime,
      error_type: 'invalid_response_content_type',
    });
    recorder?.recordError({
      source: 'api_client',
      status_code: response.status,
      error_type: 'invalid_response_content_type',
      chain: serializeErrorChain(contentTypeError),
    });
    throw contentTypeError;
  }

  let xmlSafetyBuffer: Buffer | undefined;
  if (expectsXml || responseIsXml) {
    try {
      xmlSafetyBuffer = await readBinaryResponse(response, MAX_XML_RESPONSE_BYTES);
    } catch (error) {
      if (error instanceof XmlResponseTooLargeError) {
        recorder?.recordApiCall({
          ...successApiCall,
          duration_ms: Date.now() - startTime,
          error_type: 'response_too_large',
        });
        recorder?.recordError({
          source: 'api_client',
          status_code: response.status,
          error_type: 'response_too_large',
          chain: serializeErrorChain(error),
        });
      }
      throw error;
    }
  }

  if (isBinaryContentType(contentType)) {
    const buffer = xmlSafetyBuffer ?? (await readBinaryResponse(response));
    recorder?.recordApiCall({ ...successApiCall, duration_ms: Date.now() - startTime });
    return {
      type: 'binary',
      data: buffer,
      mimeType: contentType,
      size: buffer.byteLength,
    };
  }

  // Handle empty responses (e.g., 204 No Content from DELETE)
  if (response.status === 204) {
    recorder?.recordApiCall({ ...successApiCall, duration_ms: Date.now() - startTime });
    return null;
  }

  const text = xmlSafetyBuffer?.toString('utf-8') ?? (await response.text());
  if (!text) {
    recorder?.recordApiCall({ ...successApiCall, duration_ms: Date.now() - startTime });
    return null;
  }

  try {
    const parsed = JSON.parse(text);
    recorder?.recordApiCall({ ...successApiCall, duration_ms: Date.now() - startTime });
    return parsed;
  } catch {
    const parseError = new Error(
      `Failed to parse API response as JSON. Status: ${response.status}, Content-Type: ${contentType}, Body size: ${Buffer.byteLength(text, 'utf-8')} bytes`,
    );
    recorder?.recordApiCall({
      method,
      path_pattern: safePath,
      status_code: response.status,
      duration_ms: Date.now() - startTime,
      company_id: String(companyId ?? ''),
      user_id: userId,
      error_type: 'json_parse_error',
      query_keys: queryKeys,
    });
    recorder?.recordError({
      source: 'api_client',
      status_code: response.status,
      error_type: 'json_parse_error',
      chain: serializeErrorChain(parseError),
    });
    throw parseError;
  }
}
