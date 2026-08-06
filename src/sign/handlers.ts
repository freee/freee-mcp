import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { PACKAGE_VERSION } from '../constants.js';
import { SIGN_SERVER_INSTRUCTIONS } from './config.js';
import { addSignFileUploadTool } from './file-upload-tool.js';
import { addSignApiTools, addSignAuthenticationTools } from './tools.js';

export function createSignMcpServer(options?: { remote?: boolean }): McpServer {
  const server = new McpServer(
    {
      name: 'freee-sign',
      version: PACKAGE_VERSION,
    },
    {
      instructions: SIGN_SERVER_INSTRUCTIONS,
    },
  );

  addSignAuthenticationTools(server, options);
  // Remote モードではサーバー上にクライアントのローカルファイルが存在しないため stdio 限定。
  // options を渡してツール側でも remote 時は認証コンテキスト欠落で明示 throw する二段構え
  if (!options?.remote) {
    addSignFileUploadTool(server, options);
  }
  addSignApiTools(server, options);

  return server;
}

export async function createAndStartSignServer(): Promise<void> {
  const server = createSignMcpServer();

  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Freee Sign MCP Server running on stdio');
}
