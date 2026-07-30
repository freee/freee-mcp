import { createHash } from 'node:crypto';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import type { Request, RequestHandler, Response } from 'express';
import { ipKeyGenerator } from 'express-rate-limit';
import {
  getConfig,
  initRemoteConfig,
  loadRemoteServerConfig,
  summarizeRemoteServerConfig,
} from '../config.js';
import { FREEE_CALLBACK_PATH } from '../constants.js';
import { createMcpServer } from '../mcp/handlers.js';
import type { Redis } from '../storage/redis-client.js';
import { closeRedisClient, getRedisClient } from '../storage/redis-client.js';
import { RedisTokenStore } from '../storage/redis-token-store.js';
import { createTracingMiddleware } from '../telemetry/middleware.js';
import { computeClientFingerprint, RedisClientStore } from './client-store.js';
import { makeErrorChain, serializeErrorChain } from './error-serializer.js';
import { RedisUnavailableError } from './errors.js';
import { createFreeeCallbackHandler } from './freee-callback.js';
import { createLivenessHandler, createReadinessHandler } from './health-endpoints.js';
import { initLogger } from './logger.js';
import { FreeeOAuthProvider } from './oauth-provider.js';
import { OAuthStateStore } from './oauth-store.js';
import { getCurrentRecorder } from './request-context.js';
import { initUserAgentTransportMode } from './user-agent.js';

const BODY_SIZE_LIMIT = 1_048_576; // 1 MB
const MINUTE_MS = 60 * 1000;

// Rate limit settings per endpoint. `windowMs` + `max` configure the fine
// limiter (keyed per credential / state / user); `ipMax`, when present, adds a
// coarse per-IP guard mounted alongside it to absorb many distinct users who
// share one vendor egress IP or corporate NAT. See setupRateLimiting for how
// each tier is keyed and mounted.
const RATE_LIMITS = {
  // Deduped upstream by client fingerprint, so a single flat IP limit suffices.
  register: { windowMs: 60 * MINUTE_MS, max: 3 },
  // Fine limiter keyed by per-attempt `state`; coarse IP guard for abuse.
  authorize: { windowMs: 5 * MINUTE_MS, max: 10, ipMax: 1000 },
  // Fine limiter keyed by the per-user credential (refresh_token / code): a
  // single session exchanges/refreshes well under `max`. Coarse IP guard sized
  // to absorb many users sharing one vendor egress IP while still stopping a
  // single-IP token flood.
  token: { windowMs: MINUTE_MS, max: 10, ipMax: 600 },
  // Fine limiter keyed by per-attempt `state`; coarse IP guard for many users
  // behind one corporate NAT.
  freeeCallback: { windowMs: 5 * MINUTE_MS, max: 10, ipMax: 200 },
  // Coarse per-IP guard before bearer auth. Kept high because vendor egress IPs
  // aggregate many authenticated users; the real per-user cap is `mcpVerified`
  // (keyed by user_id), applied after auth.
  mcpPreAuth: { windowMs: MINUTE_MS, max: 6000 },
  // Per-user cap for authenticated MCP traffic (keyed by user_id). Sized for
  // agentic clients (e.g. claude-code) that burst many tool calls in a loop.
  mcpVerified: { windowMs: MINUTE_MS, max: 300 },
} as const;

// Extend Express Request with request ID
declare module 'express' {
  interface Request {
    requestId?: string;
  }
}

const SHUTDOWN_TIMEOUT_MS = 30_000; // 30 seconds

export async function startHttpServer(options?: {
  otelShutdown?: () => Promise<void>;
}): Promise<void> {
  const remoteConfig = loadRemoteServerConfig();
  initRemoteConfig(remoteConfig);

  const logger = initLogger({ level: remoteConfig.logLevel, transportMode: 'remote' });
  initUserAgentTransportMode('remote');

  // Log the resolved configuration with secrets masked, so operators can verify
  // what was loaded at startup without exposing credentials.
  logger.info({ config: summarizeRemoteServerConfig(remoteConfig) }, 'Loaded remote server config');

  const redis = getRedisClient(remoteConfig.redisUrl);

  // Verify Redis connection before starting the server
  try {
    await redis.ping();
    logger.info('Redis connected');
  } catch (err) {
    logger.error(
      { err },
      'Failed to connect to Redis. Make sure Redis is running. For development: docker compose up -d',
    );
    process.exit(1);
  }

  const tokenStore = new RedisTokenStore(redis, {
    clientId: remoteConfig.freeeClientId,
    clientSecret: remoteConfig.freeeClientSecret,
    tokenEndpoint: remoteConfig.freeeTokenEndpoint,
    scope: remoteConfig.freeeScope,
  });

  // OAuth 2.1 AS dependencies
  const oauthStore = new OAuthStateStore(redis);
  const clientStore = new RedisClientStore({
    redis,
    allowInsecureLocalhost: remoteConfig.allowInsecureLocalhostCimd,
  });
  const provider = new FreeeOAuthProvider({
    clientStore,
    oauthStore,
    tokenStore,
    jwtSecret: remoteConfig.jwtSecret,
    issuerUrl: remoteConfig.issuerUrl,
    freeeClientId: remoteConfig.freeeClientId,
    freeeAuthorizationEndpoint: remoteConfig.freeeAuthorizationEndpoint,
    freeeScope: remoteConfig.freeeScope,
    callbackBaseUrl: remoteConfig.issuerUrl,
  });

  const freeeCallbackHandler = createFreeeCallbackHandler({
    oauthStore,
    tokenStore,
    clientStore,
    freeeClientId: remoteConfig.freeeClientId,
    freeeClientSecret: remoteConfig.freeeClientSecret,
    freeeTokenEndpoint: remoteConfig.freeeTokenEndpoint,
    freeeScope: remoteConfig.freeeScope,
    freeeApiUrl: remoteConfig.freeeApiUrl,
    callbackBaseUrl: remoteConfig.issuerUrl,
  });

  const config = getConfig();

  // Dynamic import of express (only loaded in serve mode)
  const express = (await import('express')).default;
  const app = express();
  // Trust first proxy (required for express-rate-limit behind reverse proxy / tunnel)
  app.set('trust proxy', 1);
  // No global express.json() -- mcpAuthRouter installs per-route body parsers
  // (urlencoded for /token, /authorize, /revoke; json for /register),
  // and StreamableHTTPServerTransport reads the raw request stream directly.

  // --- Tracing middleware (must be first to wrap entire request lifecycle) ---
  app.use(createTracingMiddleware());

  // --- Security middleware ---

  // Security headers (helmet)
  const helmet = (await import('helmet')).default;
  app.use(
    helmet({
      hsts: { maxAge: 31536000, preload: true },
      contentSecurityPolicy: { directives: { defaultSrc: ["'none'"] } },
      frameguard: { action: 'deny' },
    }),
  );

  // CORS
  const cors = (await import('cors')).default;
  const allowedOrigins = remoteConfig.corsAllowedOrigins
    ? remoteConfig.corsAllowedOrigins.split(',').map((s) => s.trim())
    : [remoteConfig.issuerUrl];
  app.use(
    cors({
      origin: allowedOrigins,
      methods: ['GET', 'POST', 'DELETE'],
      // Headers missing from this list are blocked by the browser at preflight, so the
      // request never reaches the server. Mcp-Protocol-Version is required by spec
      // 2025-06-18; Mcp-Method / Mcp-Name by spec 2026-07-28 (SEP-2243).
      allowedHeaders: [
        'Content-Type',
        'Authorization',
        'Accept',
        'Mcp-Session-Id',
        'Mcp-Protocol-Version',
        'Mcp-Method',
        'Mcp-Name',
      ],
    }),
  );

  // Body size limit (Content-Length check, does not consume the stream)
  app.use((req: Request, res: Response, next: () => void) => {
    const contentLength = req.headers['content-length'];
    if (contentLength && Number.parseInt(contentLength, 10) > BODY_SIZE_LIMIT) {
      getCurrentRecorder()?.recordError({
        source: 'middleware',
        status_code: 413,
        error_type: 'payload_too_large',
        chain: makeErrorChain(
          'PayloadTooLargeError',
          'Content-Length exceeds configured body size limit',
        ),
      });
      res.status(413).json({ error: 'Payload too large' });
      return;
    }
    next();
  });

  // --- Rate limiting (opt-in) ---
  const rateLimiters = remoteConfig.rateLimitEnabled
    ? await setupRateLimiting(app, redis, clientStore, logger)
    : {};

  // Liveness probe (no auth required, no external dependencies).
  app.get('/livez', createLivenessHandler());

  // Readiness probe (no auth required).
  // Returns 503 when Redis is unreachable so the orchestrator stops sending
  // traffic to this instance.
  const readinessHandler = createReadinessHandler(redis);
  app.get('/readyz', readinessHandler);

  // freee OAuth callback (browser redirect, no MCP auth required)
  app.get(FREEE_CALLBACK_PATH, freeeCallbackHandler);

  // MCP Auth Router: /.well-known/*, /authorize, /token, /register, /revoke
  const { mcpAuthRouter } = await import('@modelcontextprotocol/sdk/server/auth/router.js');
  const issuerUrl = new URL(remoteConfig.issuerUrl);
  const mcpResourceUrl = new URL('/mcp', issuerUrl);
  // Override the SDK's authorization-server metadata to advertise
  // client_secret_basic (RFC 6749 §2.3.1). Mounted before mcpAuthRouter so
  // Express first-match-wins routes /.well-known here instead of into the SDK.
  const { createOverrideMetadataHandler } = await import('./oauth-metadata-override.js');
  app.get(
    '/.well-known/oauth-authorization-server',
    createOverrideMetadataHandler({
      provider,
      issuerUrl,
      scopesSupported: ['mcp:read', 'mcp:write'],
    }),
  );
  // Adapter middleware that extends the SDK's body-only client auth to also
  // accept Authorization: Basic. RFC 6749 §2.3.1 requires Basic to be
  // supported when client passwords are issued.
  const { decodeBasicAuth } = await import('./client-auth-basic.js');
  app.use('/token', decodeBasicAuth({ clientStore, realm: 'freee MCP' }));
  app.use('/revoke', decodeBasicAuth({ clientStore, realm: 'freee MCP' }));
  // Diagnostic: record the SDK auth router's OAuth error responses
  // (invalid_grant / invalid_client / invalid_request / ...) so the canonical
  // log surfaces the real failure reason instead of the `unrecorded` fallback.
  // Mounted after decodeBasicAuth (whose own rejections are already recorded)
  // and before mcpAuthRouter so the res.json wrapper is installed first.
  const { captureOAuthErrorResponse } = await import('./oauth-error-capture.js');
  for (const oauthPath of ['/token', '/authorize', '/register', '/revoke']) {
    app.use(oauthPath, captureOAuthErrorResponse());
  }
  app.use(
    mcpAuthRouter({
      provider,
      issuerUrl,
      resourceServerUrl: mcpResourceUrl,
      scopesSupported: ['mcp:read', 'mcp:write'],
      resourceName: 'freee MCP Server',
      // Disable the SDK's built-in /register limiter (1h/20, in-memory). The
      // freee-mcp Redis-backed limiter mounted in setupRateLimiting() is the
      // single source of truth for /register throttling.
      clientRegistrationOptions: { rateLimit: false },
    }),
  );

  // MCP endpoints (Bearer JWT auth required)
  const { requireBearerAuth } = await import(
    '@modelcontextprotocol/sdk/server/auth/middleware/bearerAuth.js'
  );
  const { getOAuthProtectedResourceMetadataUrl } = await import(
    '@modelcontextprotocol/sdk/server/auth/router.js'
  );
  const bearerAuth = requireBearerAuth({
    verifier: provider,
    resourceMetadataUrl: getOAuthProtectedResourceMetadataUrl(mcpResourceUrl),
  });

  // MCP endpoint handler (stateless: each request creates a fresh transport)
  async function handleMcpRequest(req: Request, res: Response): Promise<void> {
    const sessionId = req.headers['mcp-session-id'] as string | undefined;

    // Patch the request recorder with identity fields now that bearer auth
    // has run. company_id lookup is fail-soft: it is a diagnostic facet, not
    // load-bearing for the request, so a Redis hiccup must not break /mcp.
    const authExtra = (req as unknown as Record<string, unknown>).auth as
      | { extra?: Record<string, unknown> }
      | undefined;
    const userId =
      typeof authExtra?.extra?.userId === 'string' ? authExtra.extra.userId : undefined;
    const companyId = userId
      ? await tokenStore.getCurrentCompanyId(userId).catch(() => undefined)
      : undefined;
    getCurrentRecorder()?.updateContext({
      user_id: userId,
      company_id: companyId,
      session_id: sessionId,
    });

    // Unknown session ID: return 404 per MCP spec (stateless mode never issues session IDs)
    if (sessionId) {
      getCurrentRecorder()?.recordError({
        source: 'mcp_handler',
        status_code: 404,
        error_type: 'unknown_session',
        chain: makeErrorChain('SessionNotFound', 'Unknown session id supplied'),
      });
      res.status(404).json({ error: 'Session not found' });
      return;
    }

    // Create a fresh transport for each request (stateless)
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
    });

    const mcpServer = createMcpServer(config, { remote: true });
    await mcpServer.connect(transport);

    // Clean up transport when the HTTP response finishes (normal completion or client disconnect).
    // Cannot use a finally block here because handleRequest resolves before SSE streaming completes.
    res.on('close', () => {
      transport.close().catch(() => {});
    });

    await transport.handleRequest(req, res);
  }

  function mcpHandler(req: Request, res: Response): void {
    handleMcpRequest(req, res).catch((err: unknown) => {
      getCurrentRecorder()?.recordError({
        source: 'mcp_handler',
        status_code: 500,
        error_type: 'unhandled_exception',
        chain: serializeErrorChain(err),
      });
      if (!res.headersSent) {
        res.status(500).json({ error: 'Internal server error' });
      }
    });
  }

  const mcpMiddlewares = rateLimiters.mcpVerified
    ? [bearerAuth, rateLimiters.mcpVerified, mcpHandler]
    : [bearerAuth, mcpHandler];
  app.post('/mcp', ...mcpMiddlewares);
  app.get('/mcp', ...mcpMiddlewares);

  app.delete('/mcp', ...mcpMiddlewares);

  // Express error handler (must be after all routes)
  app.use((err: unknown, _req: Request, res: Response, next: (err?: unknown) => void) => {
    if (err instanceof RedisUnavailableError) {
      if (!res.headersSent) {
        res.status(503).json({
          error: 'service_unavailable',
          message: 'Storage backend temporarily unavailable',
        });
      }
      getCurrentRecorder()?.recordError({
        source: 'redis_unavailable',
        status_code: 503,
        error_type: 'redis_unavailable',
        chain: serializeErrorChain(err),
      });
      return;
    }
    if (res.headersSent) {
      next(err);
      return;
    }
    res.status(500).json({ error: 'Internal server error' });
    getCurrentRecorder()?.recordError({
      source: 'middleware',
      status_code: 500,
      error_type: 'unhandled_middleware_error',
      chain: serializeErrorChain(err),
    });
  });

  const server = app.listen(remoteConfig.port, () => {
    logger.info({ port: remoteConfig.port }, 'freee MCP HTTP server listening');
  });

  // Pin Node-side HTTP server timeouts for long-lived MCP Streamable-HTTP / SSE connections.
  // Node defaults: requestTimeout=300_000, headersTimeout=60_000, keepAliveTimeout=5_000.
  // Node requires headersTimeout > keepAliveTimeout; values are configurable via env.
  server.requestTimeout = remoteConfig.httpRequestTimeoutMs;
  server.headersTimeout = remoteConfig.httpHeadersTimeoutMs;
  server.keepAliveTimeout = remoteConfig.httpKeepAliveTimeoutMs;

  // Graceful shutdown
  let shuttingDown = false;
  async function shutdown(signal: string): Promise<void> {
    if (shuttingDown) return;
    shuttingDown = true;

    logger.info({ signal }, 'Shutting down gracefully...');

    // Force exit after timeout if graceful shutdown hangs
    const forceExitTimer = setTimeout(() => {
      logger.warn('Shutdown timeout, forcing exit');
      process.exit(1);
    }, SHUTDOWN_TIMEOUT_MS);
    forceExitTimer.unref();

    // Stop accepting new requests first
    await new Promise<void>((resolve) => {
      server.close(() => {
        logger.info('HTTP server closed');
        resolve();
      });
    });

    // Flush pending OTel spans before closing connections
    await options?.otelShutdown?.();

    // Close Redis after all in-flight requests have drained
    await closeRedisClient();

    process.exit(0);
  }

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
}

interface RateLimiters {
  mcpVerified?: RequestHandler;
}

export function rateLimitIpKey(req: Request): string {
  return req.ip ? `ip:${ipKeyGenerator(req.ip)}` : 'ip:unknown';
}

export function verifiedMcpRateLimitKey(req: Request): string {
  const auth = (req as unknown as Record<string, unknown>).auth as
    | { clientId?: unknown; extra?: Record<string, unknown> }
    | undefined;
  const userId = auth?.extra?.userId;
  if (typeof userId === 'string' && userId.length > 0) return `user:${userId}`;
  if (typeof auth?.clientId === 'string' && auth.clientId.length > 0) {
    return `client:${auth.clientId}`;
  }
  return rateLimitIpKey(req);
}

// Rate-limit key for OAuth endpoints that carry a per-attempt `state` query
// parameter (/authorize, /oauth/freee-callback). Keying by `state` isolates
// concurrent sessions that share a single egress IP (vendor proxy, corporate
// NAT); the raw IP is used only when no state is present. `state` is a
// CSRF token, so it is hashed like the /token credentials -- the key reaches
// Redis and, on 429, the canonical log.
export function stateRateLimitKey(req: Request): string {
  const state = req.query.state;
  if (typeof state === 'string' && state.length > 0) {
    return `state:${createHash('sha256').update(state).digest('hex')}`;
  }
  return rateLimitIpKey(req);
}

// Rate-limit key for /token. Keyed by the per-user credential so that distinct
// users sharing one vendor egress IP do not consume each other's budget:
// refresh_token / code are hashed (never store raw secrets in Redis keys),
// falling back to client_id, then IP. Requires the urlencoded body to be
// parsed before the limiter runs.
export function tokenRateLimitKey(req: Request): string {
  const body = (req.body ?? {}) as Record<string, unknown>;
  const refreshToken = body.refresh_token;
  if (typeof refreshToken === 'string' && refreshToken.length > 0) {
    return `rt:${createHash('sha256').update(refreshToken).digest('hex')}`;
  }
  const code = body.code;
  if (typeof code === 'string' && code.length > 0) {
    return `code:${createHash('sha256').update(code).digest('hex')}`;
  }
  const clientId = body.client_id;
  if (typeof clientId === 'string' && clientId.length > 0) {
    return `client:${clientId}`;
  }
  return rateLimitIpKey(req);
}

export interface SetupRateLimitingOptions {
  // Injectable store factory. Production leaves this unset and uses a
  // Redis-backed store; tests pass an in-memory store to exercise the real
  // middleware chain without Redis. Must return an independent store per call
  // so that distinct prefixes do not share a counter.
  createStore?: (prefix: string) => import('express-rate-limit').Store;
}

export async function setupRateLimiting(
  app: import('express').Express,
  redis: Redis,
  clientStore: RedisClientStore,
  logger: ReturnType<typeof initLogger>,
  options?: SetupRateLimitingOptions,
): Promise<RateLimiters> {
  const rateLimitModule = await import('express-rate-limit');
  const rateLimit = rateLimitModule.rateLimit ?? rateLimitModule.default;
  const redisStoreModule = await import('rate-limit-redis');
  const RedisStore = redisStoreModule.RedisStore ?? redisStoreModule.default;
  const express = (await import('express')).default;

  const createStore =
    options?.createStore ??
    ((prefix: string) =>
      new RedisStore({
        sendCommand: (...args: string[]) => redis.call(args[0], ...args.slice(1)) as never,
        prefix: `rl:${prefix}:`,
      }));

  const createLimiter = (
    windowMs: number,
    max: number,
    prefix: string,
    keyGenerator?: (req: Request) => string,
  ) =>
    rateLimit({
      windowMs,
      max,
      standardHeaders: true,
      legacyHeaders: false,
      keyGenerator,
      store: createStore(prefix),
      // Stacked limiters (e.g. /token's coarse 'token-ip' + fine 'token')
      // return identical 429s, so record which limiter tripped -- and on which
      // key -- into the canonical log line. `req.rateLimit.key` is the exact
      // key the limiter counted; keys never contain raw secrets (credentials
      // and `state` are hashed by the key generators above). The response
      // replicates the library default and assumes `message` stays the
      // default plain string (the default handler also supports functions).
      handler: (req, res, _next, opts) => {
        const { key } = (req as import('express-rate-limit').AugmentedRequest).rateLimit;
        getCurrentRecorder()?.recordError({
          source: 'middleware',
          status_code: opts.statusCode,
          error_type: 'rate_limited',
          chain: makeErrorChain('RateLimitExceededError', `limiter=${prefix} key=${key}`),
        });
        res.status(opts.statusCode).send(opts.message);
      },
    });

  // /register: dedup middleware mounted BEFORE the rate limiter so duplicate
  // vendor traffic with identical client metadata reuses an existing
  // registration without consuming the IP counter. Express matches mount
  // order, so the limiter only sees requests the dedup step did not
  // short-circuit. Per RFC 7591 §3.2.1 a server may return an existing
  // registration for an equivalent metadata payload.
  app.use(
    '/register',
    express.json(),
    async (req: Request, res: Response, next: (err?: unknown) => void) => {
      try {
        const fp = computeClientFingerprint(
          (req.body ?? {}) as Parameters<typeof computeClientFingerprint>[0],
        );
        const existing = await clientStore.findClientByFingerprint(fp);
        if (existing) {
          res.status(201).json(existing);
          return;
        }
      } catch (err) {
        logger.warn({ err }, 'register dedup lookup failed; falling through');
      }
      next();
    },
    createLimiter(RATE_LIMITS.register.windowMs, RATE_LIMITS.register.max, 'register'),
  );

  // /authorize: PKCE state is unique per attempt, so it isolates concurrent
  // sessions sharing a single vendor egress IP. A coarse IP guard remains to
  // stop abuse that rotates state values indefinitely.
  app.use(
    '/authorize',
    createLimiter(
      RATE_LIMITS.authorize.windowMs,
      RATE_LIMITS.authorize.ipMax,
      'authorize-ip',
      rateLimitIpKey,
    ),
  );
  app.use(
    '/authorize',
    createLimiter(
      RATE_LIMITS.authorize.windowMs,
      RATE_LIMITS.authorize.max,
      'authorize',
      stateRateLimitKey,
    ),
  );

  // /token: coarse per-IP guard (abuse ceiling) runs first, before the body is
  // parsed. Vendor-fronted clients (claude.ai, ChatGPT, ...) route many distinct
  // users through a handful of shared egress IPs, so an IP-only limit collapses
  // unrelated users into one counter and 429s their token refreshes. The fine
  // limiter is keyed by the per-user credential (refresh_token / code) to keep
  // each session isolated, mirroring the state-keyed /authorize limiter.
  app.use(
    '/token',
    createLimiter(RATE_LIMITS.token.windowMs, RATE_LIMITS.token.ipMax, 'token-ip', rateLimitIpKey),
  );
  // Parse the urlencoded body so tokenRateLimitKey can read it. The SDK's
  // mcpAuthRouter parses /token again later; express body parsers set req._body
  // and no-op on the second pass (same pattern as /register + express.json()).
  app.use('/token', express.urlencoded({ extended: false }));
  app.use(
    '/token',
    createLimiter(RATE_LIMITS.token.windowMs, RATE_LIMITS.token.max, 'token', tokenRateLimitKey),
  );

  // /oauth/freee-callback: the browser redirect back from freee. Multiple users
  // behind one corporate NAT share a public IP, so key the fine limiter by the
  // per-attempt `state` and keep only a coarse IP guard for abuse.
  app.use(
    FREEE_CALLBACK_PATH,
    createLimiter(
      RATE_LIMITS.freeeCallback.windowMs,
      RATE_LIMITS.freeeCallback.ipMax,
      'freee-cb-ip',
      rateLimitIpKey,
    ),
  );
  app.use(
    FREEE_CALLBACK_PATH,
    createLimiter(
      RATE_LIMITS.freeeCallback.windowMs,
      RATE_LIMITS.freeeCallback.max,
      'freee-cb',
      stateRateLimitKey,
    ),
  );

  // /mcp pre-auth: keep a coarse IP guard before bearer auth. Per-user limits
  // are applied after requireBearerAuth has verified the token.
  app.use(
    '/mcp',
    createLimiter(
      RATE_LIMITS.mcpPreAuth.windowMs,
      RATE_LIMITS.mcpPreAuth.max,
      'mcp-ip',
      rateLimitIpKey,
    ),
  );

  logger.info('Rate limiting enabled');
  return {
    mcpVerified: createLimiter(
      RATE_LIMITS.mcpVerified.windowMs,
      RATE_LIMITS.mcpVerified.max,
      'mcp-user',
      verifiedMcpRateLimitKey,
    ),
  };
}
