import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { createTextResponse, formatErrorMessage } from '../utils/error.js';
import { uploadSignDocument } from './file-upload.js';
import {
  resolveTokenContext,
  SIGN_FILE_UPLOAD_TOOL_NAME,
  type SignAuthExtra,
} from './tool-support.js';

export function addSignFileUploadTool(server: McpServer, options?: { remote?: boolean }): void {
  server.registerTool(
    SIGN_FILE_UPLOAD_TOOL_NAME,
    {
      title: 'Sign ファイルアップロード',
      description:
        'ローカルファイルから freee サインの文書を作成 (POST /v1/documents/uploads または /v1/pdf_documents)。' +
        'Base64 を sign_api_post の body に渡す方法はファイルが大きいと失敗するため、ファイルからの文書作成にはこのツールを使う',
      inputSchema: {
        file_path: z.string().describe('アップロードするファイルのローカルパス'),
        folder_id: z.number().describe('保存先フォルダのID (GET /v1/folders で取得)'),
        uploader_id: z
          .number()
          .optional()
          .describe('アップロードするユーザーのID。省略時は GET /v1/users/me の id で自動解決'),
        title: z
          .string()
          .max(255)
          .optional()
          .describe('文書のタイトル (省略時はファイル名。最大255文字。draft のみ有効)'),
        document_status: z
          .enum(['draft', 'concluded'])
          .optional()
          .describe(
            '作成する文書のステータス。draft (既定): 署名依頼に使う「作成中」の文書を作成 (PDF/Word/Excel/PowerPoint)。' +
              'concluded: 締結済み PDF を「完了」文書として保管 (PDF のみ)',
          ),
        signers_count: z
          .number()
          .min(1)
          .max(20)
          .optional()
          .describe('相手方の人数 (draft のみ有効。省略時は 1)'),
        skip_approval: z
          .boolean()
          .optional()
          .describe('true: 配付文書、false: 署名・合意文書 (draft のみ有効。省略時は false)'),
      },
      annotations: { destructiveHint: false },
    },
    async (
      args: {
        file_path: string;
        folder_id: number;
        uploader_id?: number;
        title?: string;
        document_status?: 'draft' | 'concluded';
        signers_count?: number;
        skip_approval?: boolean;
      },
      extra?: SignAuthExtra,
    ) => {
      try {
        // Remote モードで tokenContext が取れなければ resolveTokenContext が明示 throw する
        // (handlers.ts の登録側 guard に加えた 2 段目の防御)
        const tokenContext = resolveTokenContext(extra, options?.remote ?? false);
        const { file_path, ...uploadOptions } = args;
        const apiResponse = await uploadSignDocument(file_path, uploadOptions, tokenContext);

        const document = (apiResponse as { document?: { id?: number; status?: string } } | null)
          ?.document;
        const lines = ['文書を作成しました'];
        if (document?.id) {
          lines.push(`文書ID: ${document.id}`);
        }
        if (document?.status) {
          lines.push(`ステータス: ${document.status}`);
        }
        lines.push('', JSON.stringify(apiResponse, null, 2));
        return createTextResponse(lines.join('\n'));
      } catch (error) {
        return createTextResponse(`ファイルアップロードに失敗: ${formatErrorMessage(error)}`);
      }
    },
  );
}
