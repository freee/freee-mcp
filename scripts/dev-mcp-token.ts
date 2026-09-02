/**
 * Development helper: obtain an MCP access token from a locally running remote
 * server by walking its OAuth flow (dynamic client registration -> /authorize
 * -> freee callback -> /token). Prints the access token to stdout.
 *
 * Only works when the server points at scripts/dev-mock-freee.ts (or another
 * authorization endpoint that redirects without a login page), because the
 * redirects are followed non-interactively. Against real freee, use the MCP
 * Inspector's OAuth flow instead. See docs/local-upload-ui-testing.md.
 *
 *   ISSUER_URL=http://127.0.0.1:3000 bun run scripts/dev-mcp-token.ts
 */
import { createHash, randomBytes } from 'node:crypto';

const issuerUrl = (process.env.ISSUER_URL ?? 'http://127.0.0.1:3000').replace(/\/+$/, '');
const redirectUri = 'http://localhost:9999/callback';

function base64url(buffer: Buffer): string {
  return buffer.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

const codeVerifier = base64url(randomBytes(32));
const codeChallenge = base64url(createHash('sha256').update(codeVerifier).digest());

const registerResponse = await fetch(`${issuerUrl}/register`, {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({
    client_name: 'freee-mcp dev token helper',
    redirect_uris: [redirectUri],
    grant_types: ['authorization_code', 'refresh_token'],
    response_types: ['code'],
    token_endpoint_auth_method: 'client_secret_post',
  }),
});
if (!registerResponse.ok) {
  throw new Error(`/register failed: ${registerResponse.status} ${await registerResponse.text()}`);
}
const client = (await registerResponse.json()) as { client_id: string; client_secret?: string };

let current = `${issuerUrl}/authorize?${new URLSearchParams({
  response_type: 'code',
  client_id: client.client_id,
  redirect_uri: redirectUri,
  code_challenge: codeChallenge,
  code_challenge_method: 'S256',
  state: 'dev',
  scope: 'mcp:read mcp:write',
})}`;
let code: string | null = null;
for (let hop = 0; hop < 8 && !code; hop++) {
  const response = await fetch(current, { redirect: 'manual' });
  const location = response.headers.get('location');
  if (!location) {
    throw new Error(
      `expected a redirect from ${current}: ${response.status} ${await response.text()}`,
    );
  }
  const next = new URL(location, current);
  console.error(`  ${response.status} -> ${next.origin}${next.pathname}`);
  if (`${next.origin}${next.pathname}` === redirectUri) {
    code = next.searchParams.get('code');
    break;
  }
  current = next.toString();
}
if (!code) {
  throw new Error('authorization flow did not return to the client redirect_uri');
}

const tokenResponse = await fetch(`${issuerUrl}/token`, {
  method: 'POST',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    code_verifier: codeVerifier,
    client_id: client.client_id,
    client_secret: client.client_secret ?? '',
    redirect_uri: redirectUri,
  }),
});
if (!tokenResponse.ok) {
  throw new Error(`/token failed: ${tokenResponse.status} ${await tokenResponse.text()}`);
}
const tokens = (await tokenResponse.json()) as { access_token: string; expires_in?: number };
console.error(`  access token issued (expires_in=${tokens.expires_in ?? '?'}s)`);
console.log(tokens.access_token);
