import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { verifyUploadTicket } from '../server/upload-ticket.js';
import type { TokenStore } from '../storage/token-store.js';
import {
  addFileUploadApp,
  FILE_UPLOAD_TICKET_TOOL,
  FILE_UPLOAD_UI_MIME_TYPE,
  FILE_UPLOAD_UI_RESOURCE_URI,
  FILE_UPLOAD_UI_TOOL,
} from './file-upload-app.js';

const SECRET = 'a-test-secret-that-is-at-least-32-characters-long';
const ISSUER = 'https://mcp.example.com';

function setup() {
  const registerTool = vi.fn();
  const registerResource = vi.fn();
  const server = { registerTool, registerResource } as unknown as McpServer;
  addFileUploadApp(server, { issuerUrl: ISSUER, jwtSecret: SECRET });
  type ToolHandler = (
    args: Record<string, unknown>,
    extra?: unknown,
  ) => Promise<
    CallToolResult & { structuredContent?: Record<string, never> | Record<string, string | number> }
  >;
  const tools = new Map<string, { config: Record<string, unknown>; handler: ToolHandler }>();
  for (const call of registerTool.mock.calls) {
    tools.set(call[0], { config: call[1], handler: call[2] });
  }
  return { registerTool, registerResource, tools };
}

function authExtra(companyId = '12345') {
  const tokenStore = {
    getCurrentCompanyId: vi.fn().mockResolvedValue(companyId),
    getCompanyInfo: vi
      .fn()
      .mockResolvedValue({ id: companyId, name: 'テスト株式会社', addedAt: 0 }),
  } as unknown as TokenStore;
  return { authInfo: { extra: { tokenStore, userId: 'user-1' } } };
}

describe('file-upload-app', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('registers the ui:// resource with the MCP Apps mime type and connect CSP', async () => {
    const { registerResource } = setup();
    expect(registerResource).toHaveBeenCalledTimes(1);
    const [name, uri, config, read] = registerResource.mock.calls[0];
    expect(name).toBe('freee-file-upload-ui');
    expect(uri).toBe(FILE_UPLOAD_UI_RESOURCE_URI);
    expect(config.mimeType).toBe(FILE_UPLOAD_UI_MIME_TYPE);
    expect(config._meta.ui.csp.connectDomains).toEqual(['https://mcp.example.com']);

    const result = await read(new URL(FILE_UPLOAD_UI_RESOURCE_URI));
    expect(result.contents).toHaveLength(1);
    expect(result.contents[0].mimeType).toBe(FILE_UPLOAD_UI_MIME_TYPE);
    expect(result.contents[0].text).toContain('<!DOCTYPE html>');
    expect(result.contents[0].text).toContain(FILE_UPLOAD_TICKET_TOOL);
    expect(result.contents[0]._meta.ui.csp.connectDomains).toEqual(['https://mcp.example.com']);
  });

  it('links the UI tool to the resource and hides the ticket tool from the model', () => {
    const { tools } = setup();
    expect([...tools.keys()]).toEqual([FILE_UPLOAD_UI_TOOL, FILE_UPLOAD_TICKET_TOOL]);
    expect(tools.get(FILE_UPLOAD_UI_TOOL)?.config._meta).toEqual({
      ui: { resourceUri: FILE_UPLOAD_UI_RESOURCE_URI },
    });
    expect(tools.get(FILE_UPLOAD_TICKET_TOOL)?.config._meta).toEqual({
      ui: { visibility: ['app'] },
    });
  });

  it('UI tool returns the upload target for the current company', async () => {
    const { tools } = setup();
    const result = await tools.get(FILE_UPLOAD_UI_TOOL)?.handler({}, authExtra('12345'));
    expect(result.isError).toBeUndefined();
    expect(result.content[0].text).toContain('12345');
    expect(result.content[0].text).toContain('テスト株式会社');
    expect(result.structuredContent).toMatchObject({
      company_id: '12345',
      company_name: 'テスト株式会社',
      upload_url: 'https://mcp.example.com/upload/receipts',
      max_file_size_bytes: 64 * 1024 * 1024,
      ticket_tool: FILE_UPLOAD_TICKET_TOOL,
    });
    // No credential in the model-visible result.
    expect(JSON.stringify(result)).not.toContain('ticket":"ey');
  });

  it('UI tool rejects a company_id that differs from the current company', async () => {
    const { tools } = setup();
    const result = await tools
      .get(FILE_UPLOAD_UI_TOOL)
      ?.handler({ company_id: 999 }, authExtra('12345'));
    expect(result.isError).toBe(true);
    expect(result.content[0].text).toContain('company_id の不整合');
  });

  it('ticket tool issues a ticket bound to the user and current company', async () => {
    const { tools } = setup();
    const result = await tools.get(FILE_UPLOAD_TICKET_TOOL)?.handler({}, authExtra('12345'));
    expect(result.isError).toBeUndefined();
    expect(result.structuredContent.upload_url).toBe('https://mcp.example.com/upload/receipts');
    expect(result.structuredContent.company_id).toBe('12345');
    expect(result.structuredContent.expires_at).toBeGreaterThan(Math.floor(Date.now() / 1000));
    await expect(
      verifyUploadTicket(result.structuredContent.ticket, SECRET, ISSUER),
    ).resolves.toEqual({ userId: 'user-1', companyId: '12345' });
    // The ticket must not be echoed in the text content.
    expect(result.content[0].text).not.toContain(result.structuredContent.ticket);
  });
});
