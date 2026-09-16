/**
 * Development helper: a tiny stand-in for freee's OAuth endpoints and the few
 * accounting API routes the remote server touches during login and file upload.
 *
 * Use it to exercise the remote server (and the MCP Apps upload UI) locally
 * without real freee credentials. See docs/local-upload-ui-testing.md.
 *
 *   bun run scripts/dev-mock-freee.ts            # listens on :4100
 *   MOCK_FREEE_PORT=4200 bun run scripts/dev-mock-freee.ts
 */

const port = Number.parseInt(process.env.MOCK_FREEE_PORT ?? '4100', 10);
const receivedReceipts: unknown[] = [];

Bun.serve({
  port,
  async fetch(req) {
    const url = new URL(req.url);
    const path = url.pathname;
    console.log(`[mock-freee] ${req.method} ${path}`);

    if (path === '/public_api/authorize') {
      const redirectUri = url.searchParams.get('redirect_uri');
      const state = url.searchParams.get('state') ?? '';
      if (!redirectUri) return new Response('redirect_uri is required', { status: 400 });
      const target = new URL(redirectUri);
      target.searchParams.set('code', 'mock-authorization-code');
      target.searchParams.set('state', state);
      return Response.redirect(target.toString(), 302);
    }
    if (path === '/public_api/token') {
      return Response.json({
        access_token: 'mock-freee-access-token',
        refresh_token: 'mock-freee-refresh-token',
        expires_in: 86400,
        token_type: 'bearer',
        scope: 'read write',
      });
    }
    if (path === '/api/1/users/me') {
      return Response.json({
        user: { id: 1001, email: 'dev@example.com', display_name: 'Dev User' },
      });
    }
    if (path === '/api/1/companies') {
      return Response.json({
        companies: [{ id: 12345, name: 'テスト株式会社', display_name: 'テスト' }],
      });
    }
    if (path === '/api/1/receipts' && req.method === 'POST') {
      const form = await req.formData();
      const file = form.get('receipt');
      if (!(file instanceof File)) {
        return Response.json({ errors: [{ messages: ['receipt is required'] }] }, { status: 400 });
      }
      const fields: Record<string, string> = {};
      for (const [key, value] of form.entries()) {
        if (typeof value === 'string') fields[key] = value;
      }
      const id = 424242 + receivedReceipts.length;
      const record = {
        id,
        authorization: req.headers.get('authorization'),
        companyHeader: req.headers.get('x-freee-company-id'),
        fileName: file.name,
        mimeType: file.type,
        size: file.size,
        fields,
      };
      receivedReceipts.push(record);
      console.log('[mock-freee] receipt stored', JSON.stringify(record));
      return Response.json(
        { receipt: { id, status: 'unconfirmed', mime_type: file.type, file_size: file.size } },
        { status: 201 },
      );
    }
    if (path === '/__received') {
      return Response.json(receivedReceipts);
    }
    return Response.json(
      { errors: [{ messages: [`mock: no route for ${path}`] }] },
      { status: 404 },
    );
  },
});

console.log(`mock freee listening on http://127.0.0.1:${port} (GET /__received lists uploads)`);
