import { Readable } from 'node:stream';
// Aliased so the WHATWG global `Request` used by parseMultipart is unambiguous.
import type { Request as ExpressRequest, RequestHandler, Response } from 'express';
import {
  FileUploadError,
  getMimeType,
  MAX_FILE_SIZE_BYTES,
  receiptFieldsSchema,
  type UploadReceiptOptions,
  uploadReceiptBuffer,
} from '../api/file-upload.js';
import type { TokenStore } from '../storage/token-store.js';
import { makeErrorChain, serializeErrorChain } from './error-serializer.js';
import { getCurrentRecorder } from './request-context.js';
import { InvalidUploadTicketError, verifyUploadTicket } from './upload-ticket.js';

/**
 * Browser-facing upload endpoint for remote mode.
 *
 * The MCP Apps upload UI (src/mcp/file-upload-app.ts) runs in a sandboxed
 * iframe inside the MCP host and POSTs the file here as multipart/form-data,
 * authenticated with a short-lived upload ticket. The bytes therefore never
 * pass through the LLM context or the 1 MB MCP JSON-RPC body limit; this
 * route has its own limit sized for the freee API's 64 MB file cap.
 *
 * CORS is `*` on purpose: the iframe origin is chosen by the MCP host
 * (e.g. a per-app sandbox domain) and is not knowable in advance. Access
 * control is the ticket, not the origin — the response carries no cookies
 * and `Access-Control-Allow-Credentials` is never set.
 */

// Multipart framing overhead on top of the file itself (boundaries, metadata fields).
const MULTIPART_OVERHEAD_BYTES = 1_048_576; // 1 MB
const UPLOAD_BODY_SIZE_LIMIT = MAX_FILE_SIZE_BYTES + MULTIPART_OVERHEAD_BYTES;

const UPLOAD_CORS_MAX_AGE_SECONDS = 600;

class PayloadTooLargeError extends Error {
  constructor() {
    super('Upload body exceeds the configured size limit');
    this.name = 'PayloadTooLargeError';
  }
}

interface UploadEndpointDeps {
  tokenStore: TokenStore;
  jwtSecret: string;
  issuerUrl: string;
}

export function createUploadCorsMiddleware(): RequestHandler {
  return (_req: ExpressRequest, res: Response, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
    res.setHeader('Access-Control-Max-Age', String(UPLOAD_CORS_MAX_AGE_SECONDS));
    res.setHeader('Cache-Control', 'no-store');
    if (_req.method === 'OPTIONS') {
      res.status(204).end();
      return;
    }
    next();
  };
}

function sendError(
  res: Response,
  status: number,
  error: string,
  message: string,
  chainName: string,
): void {
  getCurrentRecorder()?.recordError({
    source: 'file_upload',
    status_code: status,
    error_type: error,
    chain: makeErrorChain(chainName, message),
  });
  res.status(status).json({ error, message });
}

function extractBearer(req: ExpressRequest): string | null {
  const header = req.headers.authorization;
  if (typeof header !== 'string') return null;
  const match = /^Bearer\s+(\S+)$/i.exec(header.trim());
  return match ? match[1] : null;
}

/**
 * Wraps the inbound Node request stream in a byte-counting web stream so
 * chunked uploads without a Content-Length header are still capped.
 */
function limitedBodyStream(req: ExpressRequest, limit: number): ReadableStream<Uint8Array> {
  let total = 0;
  const counter = new TransformStream<Uint8Array, Uint8Array>({
    transform(chunk, controller) {
      total += chunk.byteLength;
      if (total > limit) {
        controller.error(new PayloadTooLargeError());
        return;
      }
      controller.enqueue(chunk);
    },
  });
  const source = Readable.toWeb(req) as unknown as ReadableStream<Uint8Array>;
  return source.pipeThrough(counter);
}

async function parseMultipart(req: ExpressRequest, contentType: string): Promise<FormData> {
  // Reuse the WHATWG multipart parser instead of adding a dependency: build a
  // synthetic Request around the inbound stream and let the runtime parse it.
  const init = {
    method: 'POST',
    headers: { 'content-type': contentType },
    body: limitedBodyStream(req, UPLOAD_BODY_SIZE_LIMIT),
    duplex: 'half',
  } as RequestInit & { duplex: 'half' };
  return new Request('http://upload.invalid/', init).formData();
}

function isFileLike(value: unknown): value is File {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof (value as File).arrayBuffer === 'function' &&
    typeof (value as File).name === 'string'
  );
}

function statusForUploadError(err: FileUploadError): number {
  switch (err.kind) {
    case 'file_too_large':
      return 413;
    case 'auth_required':
      return 401;
    case 'company_mismatch':
      return 409;
    case 'api_error':
      // Surface freee's own 4xx (validation, plan limits, 429) unchanged so the
      // UI can show it; anything else from upstream is a gateway failure.
      return err.statusCode !== undefined && err.statusCode >= 400 && err.statusCode < 500
        ? err.statusCode
        : 502;
    case 'network_error':
    case 'invalid_response':
      return 502;
  }
}

export function createReceiptUploadHandler(deps: UploadEndpointDeps): RequestHandler {
  return async (req: ExpressRequest, res: Response): Promise<void> => {
    const ticket = extractBearer(req);
    if (!ticket) {
      sendError(
        res,
        401,
        'missing_ticket',
        'Authorization: Bearer <upload ticket> is required',
        'MissingUploadTicket',
      );
      return;
    }

    let claims: { userId: string; companyId: string };
    try {
      claims = await verifyUploadTicket(ticket, deps.jwtSecret, deps.issuerUrl);
    } catch (err) {
      const message = err instanceof InvalidUploadTicketError ? err.message : 'invalid ticket';
      sendError(res, 401, 'invalid_ticket', message, 'InvalidUploadTicket');
      return;
    }
    getCurrentRecorder()?.updateContext({ user_id: claims.userId, company_id: claims.companyId });

    const contentType = req.headers['content-type'];
    if (typeof contentType !== 'string' || !/^multipart\/form-data\b/i.test(contentType)) {
      sendError(
        res,
        415,
        'unsupported_media_type',
        'Content-Type must be multipart/form-data',
        'UnsupportedMediaType',
      );
      return;
    }

    const contentLength = req.headers['content-length'];
    if (contentLength && Number.parseInt(contentLength, 10) > UPLOAD_BODY_SIZE_LIMIT) {
      sendError(
        res,
        413,
        'payload_too_large',
        `Upload body exceeds ${UPLOAD_BODY_SIZE_LIMIT} bytes`,
        'PayloadTooLargeError',
      );
      return;
    }

    let form: FormData;
    try {
      form = await parseMultipart(req, contentType);
    } catch (err) {
      if (err instanceof PayloadTooLargeError) {
        sendError(
          res,
          413,
          'payload_too_large',
          `Upload body exceeds ${UPLOAD_BODY_SIZE_LIMIT} bytes`,
          'PayloadTooLargeError',
        );
        return;
      }
      sendError(
        res,
        400,
        'invalid_multipart',
        'Could not parse multipart/form-data body',
        'InvalidMultipart',
      );
      return;
    }

    const receipt = form.get('receipt');
    if (!isFileLike(receipt)) {
      sendError(
        res,
        400,
        'missing_file',
        'multipart field "receipt" (file) is required',
        'MissingFile',
      );
      return;
    }

    const rawFields: Record<string, string> = {};
    for (const key of Object.keys(receiptFieldsSchema.shape)) {
      const value = form.get(key);
      if (typeof value === 'string' && value.length > 0) {
        rawFields[key] = value;
      }
    }
    const parsedFields = receiptFieldsSchema.safeParse(rawFields);
    if (!parsedFields.success) {
      sendError(
        res,
        400,
        'invalid_fields',
        parsedFields.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; '),
        'InvalidFields',
      );
      return;
    }
    const options: UploadReceiptOptions = parsedFields.data;

    const buffer = Buffer.from(await receipt.arrayBuffer());
    const fileName = receipt.name || 'upload';
    const mimeType = receipt.type || getMimeType(fileName);

    try {
      const result = await uploadReceiptBuffer(
        { buffer, fileName, mimeType },
        claims.companyId,
        options,
        {
          tokenStore: deps.tokenStore,
          userId: claims.userId,
          companyId: claims.companyId,
        },
      );
      res.status(200).json(result);
    } catch (err) {
      if (err instanceof FileUploadError) {
        // uploadReceiptBuffer already recorded the api_call / error entries for
        // upstream failures; only the HTTP mapping is added here.
        res.status(statusForUploadError(err)).json({ error: err.kind, message: err.message });
        return;
      }
      getCurrentRecorder()?.recordError({
        source: 'file_upload',
        status_code: 500,
        error_type: 'unhandled_exception',
        chain: serializeErrorChain(err),
      });
      res.status(500).json({ error: 'internal_error', message: 'Upload failed' });
    }
  };
}
