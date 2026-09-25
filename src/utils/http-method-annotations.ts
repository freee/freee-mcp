import type { ToolAnnotations } from '@modelcontextprotocol/sdk/types.js';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

// Every hint is explicit: MCP defaults destructiveHint/openWorldHint to true, so an omitted
// key tells clients the tool is destructive and open-world. These tools only reach their own
// fixed API, hence openWorldHint: false.
export function getHttpMethodToolAnnotations(method: HttpMethod): ToolAnnotations {
  switch (method) {
    case 'GET':
      return { readOnlyHint: true, destructiveHint: false, openWorldHint: false };
    case 'PUT':
    case 'DELETE':
      return {
        readOnlyHint: false,
        destructiveHint: true,
        idempotentHint: true,
        openWorldHint: false,
      };
    case 'POST':
    case 'PATCH':
      return { readOnlyHint: false, destructiveHint: true, openWorldHint: false };
  }
}
