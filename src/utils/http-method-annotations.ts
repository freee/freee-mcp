import type { ToolAnnotations } from '@modelcontextprotocol/sdk/types.js';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export function getHttpMethodToolAnnotations(method: HttpMethod): ToolAnnotations {
  switch (method) {
    case 'GET':
      return { readOnlyHint: true };
    case 'PUT':
    case 'DELETE':
      return { destructiveHint: true, idempotentHint: true };
    case 'POST':
    case 'PATCH':
      return { destructiveHint: true };
  }
}
