import fs from 'node:fs/promises';
import path from 'node:path';
import { z } from 'zod';
import { getValidAccessToken } from '../auth/tokens.js';
import { getCurrentCompanyId } from '../config/companies.js';
import { getConfig } from '../config.js';
import { FETCH_TIMEOUT_FILE_UPLOAD_MS } from '../constants.js';
import { serializeErrorChain } from '../server/error-serializer.js';
import type { ApiCallErrorType } from '../server/request-context.js';
import { getCurrentRecorder } from '../server/request-context.js';
import { getUserAgent } from '../server/user-agent.js';
import { resolveCompanyId, type TokenContext } from '../storage/context.js';
import { formatApiErrorMessage, formatResponseErrorInfo } from '../utils/error.js';

export const MAX_FILE_SIZE_BYTES = 64 * 1024 * 1024; // 64MB

export type FileUploadErrorKind =
  | 'file_too_large'
  | 'auth_required'
  | 'company_mismatch'
  | 'api_error'
  | 'network_error'
  | 'invalid_response';

/**
 * Typed failure raised by the upload path so that non-MCP callers (the
 * browser-facing upload endpoint) can map it to an HTTP status without
 * string-matching the Japanese message. `statusCode` is the upstream freee
 * API status when the failure came from the API response.
 */
export class FileUploadError extends Error {
  readonly kind: FileUploadErrorKind;
  readonly statusCode?: number;

  constructor(kind: FileUploadErrorKind, message: string, statusCode?: number) {
    super(message);
    this.name = 'FileUploadError';
    this.kind = kind;
    this.statusCode = statusCode;
  }
}

/**
 * Metadata that rides along with the file itself. Shared by the browser upload
 * endpoint (as multipart fields) and by the MCP Apps view (as prefill), so the
 * field names and validation stay in one place.
 */
export const receiptFieldsSchema = z.object({
  description: z.string().max(255).optional().describe('メモ'),
  receipt_metadatum_partner_name: z.string().max(255).optional().describe('取引先名'),
  receipt_metadatum_issue_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional()
    .describe('発行日（yyyy-mm-dd）'),
  receipt_metadatum_amount: z.coerce.number().int().optional().describe('金額（税込）'),
  qualified_invoice: z
    .enum(['qualified', 'not_qualified', 'unselected'])
    .optional()
    .describe('適格請求書区分'),
  document_type: z.enum(['receipt', 'invoice', 'other']).optional().describe('書類の種類'),
});

export type UploadReceiptOptions = z.infer<typeof receiptFieldsSchema>;

const MIME_TYPES: Record<string, string> = {
  '.pdf': 'application/pdf',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.csv': 'text/csv',
  '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
};

export function getMimeType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  return MIME_TYPES[ext] || 'application/octet-stream';
}

/**
 * In-memory file handed to `uploadReceiptBuffer`. `fileName` is only used as
 * the multipart filename; it is never written to disk.
 */
export interface UploadFile {
  buffer: Buffer;
  fileName: string;
  mimeType: string;
}

/**
 * Reads a local file and uploads it to ファイルボックス (stdio mode).
 */
export async function uploadReceipt(
  filePath: string,
  requestedCompanyId: string | number,
  options?: UploadReceiptOptions,
  tokenContext?: TokenContext,
): Promise<unknown> {
  const resolvedPath = path.resolve(filePath);

  // Read file
  let buffer: Buffer;
  try {
    buffer = await fs.readFile(resolvedPath);
  } catch (error) {
    const nodeError = error as NodeJS.ErrnoException;
    if (nodeError.code === 'ENOENT') {
      throw new Error(`ファイルが見つかりません: ${resolvedPath}`);
    }
    if (nodeError.code === 'EACCES') {
      throw new Error(`ファイルの読み取り権限がありません: ${resolvedPath}`);
    }
    throw error;
  }

  return uploadReceiptBuffer(
    { buffer, fileName: path.basename(resolvedPath), mimeType: getMimeType(resolvedPath) },
    requestedCompanyId,
    options,
    tokenContext,
  );
}

/**
 * Uploads an in-memory file to ファイルボックス (POST /api/1/receipts).
 *
 * Shared by the stdio `freee_file_upload` tool (after reading the file from
 * disk) and by the remote-mode browser upload endpoint, which receives the
 * bytes directly from the MCP Apps upload UI so the file never has to travel
 * through the LLM context or the MCP JSON-RPC body.
 */
export async function uploadReceiptBuffer(
  file: UploadFile,
  requestedCompanyId: string | number,
  options?: UploadReceiptOptions,
  tokenContext?: TokenContext,
): Promise<unknown> {
  const recorder = getCurrentRecorder();
  const startTime = Date.now();
  const safePath = '/api/:id/receipts';
  const userId = tokenContext?.userId ?? 'local';
  const { buffer, fileName, mimeType } = file;

  // Check file size
  if (buffer.byteLength > MAX_FILE_SIZE_BYTES) {
    const sizeMB = (buffer.byteLength / (1024 * 1024)).toFixed(1);
    throw new FileUploadError(
      'file_too_large',
      `ファイルサイズが上限(64MB)を超えています: ${sizeMB}MB`,
    );
  }

  const [companyId, accessToken] = tokenContext
    ? await Promise.all([
        resolveCompanyId(tokenContext),
        tokenContext.tokenStore.getValidAccessToken(tokenContext.userId),
      ])
    : await Promise.all([getCurrentCompanyId(), getValidAccessToken()]);

  if (!accessToken) {
    throw new FileUploadError(
      'auth_required',
      `認証が必要です。freee_authenticate ツールを使用して認証を行ってください。\n` +
        `現在の事業所ID: ${companyId}`,
    );
  }

  if (String(requestedCompanyId) !== String(companyId)) {
    throw new FileUploadError(
      'company_mismatch',
      `company_id の不整合: リクエストの company_id (${requestedCompanyId}) と現在の事業所 (${companyId}) が異なります。\n` +
        `freee_set_current_company で事業所を切り替えるか、リクエストの company_id を修正してください。`,
    );
  }

  // Build FormData
  const blob = new Blob([new Uint8Array(buffer)], { type: mimeType });

  const formData = new FormData();
  formData.append('receipt', blob, fileName);
  formData.append('company_id', String(companyId));

  if (options?.description !== undefined) {
    formData.append('description', options.description);
  }
  if (options?.receipt_metadatum_partner_name !== undefined) {
    formData.append('receipt_metadatum_partner_name', options.receipt_metadatum_partner_name);
  }
  if (options?.receipt_metadatum_issue_date !== undefined) {
    formData.append('receipt_metadatum_issue_date', options.receipt_metadatum_issue_date);
  }
  if (options?.receipt_metadatum_amount !== undefined) {
    formData.append('receipt_metadatum_amount', String(options.receipt_metadatum_amount));
  }
  if (options?.qualified_invoice !== undefined) {
    formData.append('qualified_invoice', options.qualified_invoice);
  }
  if (options?.document_type !== undefined) {
    formData.append('document_type', options.document_type);
  }

  const apiUrl = getConfig().freee.apiUrl;
  const url = `${apiUrl}/api/1/receipts`;

  const recordFailure = (
    statusCode: number | null,
    errorType: ApiCallErrorType,
    err: FileUploadError,
  ): never => {
    recorder?.recordApiCall({
      method: 'POST',
      path_pattern: safePath,
      status_code: statusCode,
      duration_ms: Date.now() - startTime,
      company_id: String(companyId ?? ''),
      user_id: userId,
      error_type: errorType,
      file_size_bytes: buffer.byteLength,
    });
    recorder?.recordError({
      source: 'file_upload',
      status_code: statusCode ?? undefined,
      error_type: errorType,
      chain: serializeErrorChain(err),
    });
    throw err;
  };

  const headers: Record<string, string> = {
    Authorization: `Bearer ${accessToken}`,
    'User-Agent': getUserAgent(),
  };
  if (companyId) {
    headers['x-freee-company-id'] = String(companyId);
  }

  let response: Response;
  try {
    response = await fetch(url, {
      method: 'POST',
      headers,
      body: formData,
      signal: AbortSignal.timeout(FETCH_TIMEOUT_FILE_UPLOAD_MS),
    });
  } catch (fetchError) {
    const errorType: ApiCallErrorType =
      fetchError instanceof Error && fetchError.name === 'TimeoutError'
        ? 'timeout'
        : 'network_error';
    recorder?.recordApiCall({
      method: 'POST',
      path_pattern: safePath,
      status_code: null,
      duration_ms: Date.now() - startTime,
      company_id: String(companyId ?? ''),
      user_id: userId,
      error_type: errorType,
      file_size_bytes: buffer.byteLength,
    });
    recorder?.recordError({
      source: 'file_upload',
      error_type: errorType,
      chain: serializeErrorChain(fetchError),
    });
    throw new FileUploadError(
      'network_error',
      fetchError instanceof Error ? fetchError.message : String(fetchError),
    );
  }

  if (response.status === 401) {
    const errorInfo = await formatResponseErrorInfo(response);
    recordFailure(
      401,
      'auth_error',
      new FileUploadError(
        'api_error',
        `認証エラーが発生しました。freee_authenticate ツールを使用して再認証を行ってください。\n` +
          `現在の事業所ID: ${companyId}\n` +
          `エラー詳細: ${response.status} ${errorInfo}`,
        401,
      ),
    );
  }

  if (response.status === 403) {
    const errorInfo = await formatResponseErrorInfo(response);
    recordFailure(
      403,
      'forbidden',
      new FileUploadError(
        'api_error',
        `アクセス拒否 (403): ${errorInfo}\n` +
          `事業所ID: ${companyId}\n\n` +
          `レートリミットの可能性があります。数分待ってから再試行してください。`,
        403,
      ),
    );
  }

  if (!response.ok) {
    const errorMessage = await formatApiErrorMessage(response, response.status);
    recordFailure(
      response.status,
      'http_error',
      new FileUploadError('api_error', errorMessage, response.status),
    );
  }

  const text = await response.text();
  try {
    const parsed = JSON.parse(text);
    // Record success only after JSON.parse succeeds to avoid a misleading
    // "successful" api_call entry alongside a json_parse_error in the log.
    recorder?.recordApiCall({
      method: 'POST',
      path_pattern: safePath,
      status_code: response.status,
      duration_ms: Date.now() - startTime,
      company_id: String(companyId ?? ''),
      user_id: userId,
      error_type: null,
      file_size_bytes: buffer.byteLength,
    });
    return parsed;
  } catch {
    const parseError = new FileUploadError(
      'invalid_response',
      `Failed to parse API response as JSON. Status: ${response.status}, Body preview: ${text.slice(0, 200)}`,
      response.status,
    );
    recorder?.recordApiCall({
      method: 'POST',
      path_pattern: safePath,
      status_code: response.status,
      duration_ms: Date.now() - startTime,
      company_id: String(companyId ?? ''),
      user_id: userId,
      error_type: 'json_parse_error',
      file_size_bytes: buffer.byteLength,
    });
    recorder?.recordError({
      source: 'file_upload',
      status_code: response.status,
      error_type: 'json_parse_error',
      chain: serializeErrorChain(parseError),
    });
    throw parseError;
  }
}
