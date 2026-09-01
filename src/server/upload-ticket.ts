import { jwtVerify, SignJWT } from 'jose';
import { UPLOAD_RECEIPTS_PATH, UPLOAD_TICKET_TTL_SECONDS } from '../constants.js';

/**
 * Upload ticket: a short-lived, single-purpose bearer credential handed to
 * the MCP Apps upload UI so the browser can POST a file to the remote
 * server's upload endpoint directly, without going through MCP JSON-RPC.
 *
 * Deliberately distinct from the MCP access token (src/server/jwt.ts):
 * - `aud` is the upload endpoint URL, so the MCP bearer verifier (which
 *   binds `aud` to the issuer / MCP resource) rejects it, and vice versa.
 * - it carries no `scope` / `client_id`, which the MCP verifier requires
 *   even in RFC 8707 grace-period mode.
 * - `purpose` pins the ticket to receipt uploads.
 * - it embeds the `company_id` resolved server-side at issue time, so the
 *   browser cannot pick a different company than the MCP session's.
 */
const UPLOAD_TICKET_PURPOSE = 'receipt_upload';
const MIN_SECRET_LENGTH = 32;

export interface UploadTicketClaims {
  userId: string;
  companyId: string;
}

function deriveKey(secret: string): Uint8Array {
  if (secret.length < MIN_SECRET_LENGTH) {
    throw new Error(`JWT secret must be at least ${MIN_SECRET_LENGTH} characters`);
  }
  return new TextEncoder().encode(secret);
}

export function uploadEndpointUrl(issuerUrl: string): string {
  return new URL(UPLOAD_RECEIPTS_PATH, issuerUrl).toString();
}

export async function signUploadTicket(
  claims: UploadTicketClaims,
  secret: string,
  issuerUrl: string,
): Promise<{ ticket: string; expiresAt: number }> {
  const key = deriveKey(secret);
  const nowSeconds = Math.floor(Date.now() / 1000);
  const expiresAt = nowSeconds + UPLOAD_TICKET_TTL_SECONDS;
  const ticket = await new SignJWT({ purpose: UPLOAD_TICKET_PURPOSE, company_id: claims.companyId })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(claims.userId)
    .setIssuer(issuerUrl)
    .setAudience(uploadEndpointUrl(issuerUrl))
    .setIssuedAt(nowSeconds)
    .setExpirationTime(expiresAt)
    .sign(key);
  return { ticket, expiresAt };
}

export class InvalidUploadTicketError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidUploadTicketError';
  }
}

export async function verifyUploadTicket(
  ticket: string,
  secret: string,
  issuerUrl: string,
): Promise<UploadTicketClaims> {
  const key = deriveKey(secret);
  let payload: Awaited<ReturnType<typeof jwtVerify>>['payload'];
  try {
    ({ payload } = await jwtVerify(ticket, key, {
      issuer: issuerUrl,
      audience: uploadEndpointUrl(issuerUrl),
    }));
  } catch (err) {
    throw new InvalidUploadTicketError(
      err instanceof Error ? `${err.name}: ${err.message}` : 'ticket verification failed',
    );
  }

  const companyId = payload.company_id;
  if (
    payload.purpose !== UPLOAD_TICKET_PURPOSE ||
    typeof payload.sub !== 'string' ||
    payload.sub.length === 0 ||
    typeof companyId !== 'string' ||
    companyId.length === 0
  ) {
    throw new InvalidUploadTicketError('ticket is missing required claims');
  }

  return { userId: payload.sub, companyId };
}
