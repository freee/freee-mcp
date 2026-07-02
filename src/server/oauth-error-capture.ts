import type { NextFunction, Request, RequestHandler, Response } from 'express';
import { makeErrorChain, scrubErrorMessage } from './error-serializer.js';
import { getCurrentRecorder } from './request-context.js';

/**
 * Shape of an RFC 6749 §5.2 OAuth error response body. The MCP SDK auth
 * router answers protocol failures with
 * `res.status(4xx).json({ error, error_description })`.
 */
interface OAuthErrorBody {
  error?: unknown;
  error_description?: unknown;
}

function isOAuthErrorBody(body: unknown): body is OAuthErrorBody & { error: string } {
  return (
    typeof body === 'object' && body !== null && typeof (body as OAuthErrorBody).error === 'string'
  );
}

/**
 * Diagnostic middleware for the OAuth endpoints (`/token`, `/authorize`,
 * `/register`, `/revoke`).
 *
 * The MCP SDK auth router reports protocol failures by calling
 * `res.status(4xx).json({ error, error_description })` directly — it does not
 * go through our Express error handler or `recordError`. The canonical log
 * therefore only shows the `synthesizeFallbackErrorIfMissing` safety net
 * (`@errors.error_type:unrecorded`, message `"HTTP 4xx ... emitted without
 * explicit recordError"`) and the real OAuth failure reason
 * (`invalid_grant` / `invalid_client` / `invalid_request` / ...) is lost.
 *
 * This middleware wraps `res.json` so that, immediately before such a body is
 * sent, the OAuth `error` / `error_description` are recorded on the request
 * recorder. Because `errors[]` is then non-empty, the fallback no-ops and the
 * canonical log surfaces the actual reason. That is what lets operators tell a
 * client-side `invalid_grant` / PKCE failure apart from a malformed request
 * body (e.g. an upstream gateway mangling the urlencoded POST) without having
 * to reproduce the OAuth flow by hand.
 *
 * PRIVACY: only the server-generated OAuth `error` code and `error_description`
 * are recorded (both scrubbed via {@link scrubErrorMessage}). The request body
 * — which carries the authorization code, `client_secret` and PKCE verifier —
 * is never read here.
 */
export function captureOAuthErrorResponse(): RequestHandler {
  return (_req: Request, res: Response, next: NextFunction): void => {
    const originalJson = res.json.bind(res);
    let recorded = false;

    res.json = ((body: unknown): Response => {
      if (!recorded && res.statusCode >= 400 && isOAuthErrorBody(body)) {
        // Guard so a single response is recorded at most once even if the
        // handler calls res.json more than once.
        recorded = true;
        const recorder = getCurrentRecorder();
        if (recorder) {
          const description =
            typeof body.error_description === 'string'
              ? scrubErrorMessage(body.error_description)
              : 'no error_description provided';
          recorder.recordError({
            source: 'auth',
            status_code: res.statusCode,
            error_type: body.error,
            chain: makeErrorChain(`OAuthError:${body.error}`, description),
          });
        }
      }
      return originalJson(body);
    }) as Response['json'];

    next();
  };
}
