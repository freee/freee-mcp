import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import type { ToolAnnotations } from '@modelcontextprotocol/sdk/types.js';
import { describe, expect, it, vi } from 'vitest';
import { generateClientModeTool } from '../openapi/client-mode.js';
import { addFileUploadTool } from './file-upload-tool.js';
import { addAuthenticationTools } from './tools.js';

function collectAnnotations(remote: boolean): Map<string, ToolAnnotations | undefined> {
  const registerTool = vi.fn();
  const server = { registerTool } as unknown as McpServer;
  addAuthenticationTools(server, { remote });
  if (!remote) {
    addFileUploadTool(server);
  }
  generateClientModeTool(server);
  return new Map(
    registerTool.mock.calls.map((call: unknown[]) => [
      call[0] as string,
      (call[1] as { annotations?: ToolAnnotations }).annotations,
    ]),
  );
}

// OpenAI's plugin directory rejects tools that leave any of these unset, because the MCP
// defaults (destructive, open world) would otherwise apply.
const EXPECTED: Record<
  string,
  Pick<ToolAnnotations, 'readOnlyHint' | 'destructiveHint' | 'openWorldHint'>
> = {
  freee_current_user: { readOnlyHint: true, destructiveHint: false, openWorldHint: false },
  freee_authenticate: { readOnlyHint: false, destructiveHint: false, openWorldHint: false },
  freee_auth_status: { readOnlyHint: true, destructiveHint: false, openWorldHint: false },
  freee_clear_auth: { readOnlyHint: false, destructiveHint: true, openWorldHint: false },
  freee_set_current_company: { readOnlyHint: false, destructiveHint: false, openWorldHint: false },
  freee_get_current_company: { readOnlyHint: true, destructiveHint: false, openWorldHint: false },
  freee_list_companies: { readOnlyHint: true, destructiveHint: false, openWorldHint: false },
  freee_server_info: { readOnlyHint: true, destructiveHint: false, openWorldHint: false },
  freee_file_upload: { readOnlyHint: false, destructiveHint: false, openWorldHint: false },
  freee_api_get: { readOnlyHint: true, destructiveHint: false, openWorldHint: false },
  freee_api_post: { readOnlyHint: false, destructiveHint: true, openWorldHint: false },
  freee_api_put: { readOnlyHint: false, destructiveHint: true, openWorldHint: false },
  freee_api_delete: { readOnlyHint: false, destructiveHint: true, openWorldHint: false },
  freee_api_patch: { readOnlyHint: false, destructiveHint: true, openWorldHint: false },
  freee_api_list_paths: { readOnlyHint: true, destructiveHint: false, openWorldHint: false },
};

describe('tool annotations', () => {
  it.each([
    ['stdio', false, 15],
    ['remote', true, 13],
  ])('%s: every tool sets readOnlyHint / destructiveHint / openWorldHint explicitly', (_, remote, count) => {
    const annotations = collectAnnotations(remote);

    expect(annotations.size).toBe(count);
    for (const [name, value] of annotations) {
      expect(value, name).toMatchObject(EXPECTED[name]);
      expect(typeof value?.readOnlyHint, name).toBe('boolean');
      expect(typeof value?.destructiveHint, name).toBe('boolean');
      expect(typeof value?.openWorldHint, name).toBe('boolean');
    }
  });
});
