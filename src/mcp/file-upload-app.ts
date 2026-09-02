import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';
import {
  MAX_FILE_SIZE_BYTES,
  receiptFieldsSchema,
  type UploadReceiptOptions,
} from '../api/file-upload.js';
import { UPLOAD_TICKET_TTL_SECONDS } from '../constants.js';
import { serializeErrorChain } from '../server/error-serializer.js';
import { getCurrentRecorder } from '../server/request-context.js';
import { signUploadTicket, uploadEndpointUrl } from '../server/upload-ticket.js';
import type { AuthExtra } from '../storage/context.js';
import { extractTokenContext, resolveCompanyId } from '../storage/context.js';
import { registerTracedTool } from '../telemetry/tool-tracer.js';
import { createTextResponse, formatErrorMessage } from '../utils/error.js';
import { formatCompanyName } from '../utils/format-company.js';
import { FILE_UPLOAD_APP_HTML } from './file-upload-app-html.js';

/**
 * MCP Apps (SEP-1865) file upload UI for remote mode.
 *
 * Why: in remote mode a file cannot travel through MCP. The LLM cannot emit
 * tens of megabytes of base64 as tool arguments and the HTTP transport caps
 * JSON-RPC bodies at 1 MB. So instead of moving bytes through the model, the
 * server hands the host an HTML view; the user picks a file in that view and
 * the browser POSTs it straight to the server's upload endpoint, which
 * forwards it to `POST /api/1/receipts`. Only a tiny result (receipt id)
 * flows back into the conversation.
 *
 * Pieces:
 * - `ui://freee-mcp/file-upload`: the HTML view. Its `_meta.ui.csp.connectDomains`
 *   whitelists the issuer so the sandboxed iframe may fetch the upload endpoint.
 * - `freee_file_upload_ui` (model-visible): opens the view. Its text content
 *   is the fallback for hosts without MCP Apps support.
 * - `freee_file_upload_ticket` (app-only): called by the view over the
 *   host bridge to obtain a short-lived upload ticket bound to the user's
 *   current company. The ticket rides in `structuredContent`, which hosts
 *   treat as UI data rather than model context.
 */

export const FILE_UPLOAD_UI_RESOURCE_URI = 'ui://freee-mcp/file-upload';
export const FILE_UPLOAD_UI_MIME_TYPE = 'text/html;profile=mcp-app';
export const FILE_UPLOAD_UI_TOOL = 'freee_file_upload_ui';
export const FILE_UPLOAD_TICKET_TOOL = 'freee_file_upload_ticket';

export interface FileUploadAppOptions {
  issuerUrl: string;
  jwtSecret: string;
}

function resourceUiMeta(issuerUrl: string): Record<string, unknown> {
  return {
    ui: {
      csp: {
        // fetch()/XHR target: only the freee MCP server itself.
        connectDomains: [new URL(issuerUrl).origin],
      },
      prefersBorder: true,
    },
  };
}

export function addFileUploadApp(server: McpServer, options: FileUploadAppOptions): void {
  const uploadUrl = uploadEndpointUrl(options.issuerUrl);

  server.registerResource(
    'freee-file-upload-ui',
    FILE_UPLOAD_UI_RESOURCE_URI,
    {
      title: 'ファイルボックス アップロード画面',
      description: 'ファイルボックスへファイルをアップロードするための MCP Apps ビュー',
      mimeType: FILE_UPLOAD_UI_MIME_TYPE,
      _meta: resourceUiMeta(options.issuerUrl),
    },
    async () => ({
      contents: [
        {
          uri: FILE_UPLOAD_UI_RESOURCE_URI,
          mimeType: FILE_UPLOAD_UI_MIME_TYPE,
          text: FILE_UPLOAD_APP_HTML,
          _meta: resourceUiMeta(options.issuerUrl),
        },
      ],
    }),
  );

  registerTracedTool(
    server,
    FILE_UPLOAD_UI_TOOL,
    {
      title: 'ファイルアップロード画面を開く',
      description:
        'ファイルボックスにファイルをアップロードするための画面を会話内に表示します。' +
        'ユーザーが画面上でファイルを選択すると、ブラウザから直接 freee にアップロードされます' +
        '（ファイルの内容を LLM やツール引数に渡す必要はありません）。' +
        'ファイルボックス (POST /api/1/receipts) へのアップロードを依頼されたら、' +
        'ファイルパスを尋ねる代わりにこのツールを呼び出してください。' +
        '会話に領収書や請求書が添付されていて発行日・金額・取引先などが読み取れる場合は、' +
        'それらを引数で渡すと画面に入力済みの状態で開きます。詳細ガイドはfreee-api-skill skillを参照',
      inputSchema: {
        company_id: z
          .union([z.string(), z.number()])
          .optional()
          .describe('事業所ID（省略時は現在の事業所）。現在の事業所と異なる場合はエラー'),
        // Prefill: when the file is already visible in the conversation (an
        // attached receipt, say), the model can read the values off it and the
        // user only has to pick the file. Nothing here is required.
        ...receiptFieldsSchema.shape,
      },
      annotations: { readOnlyHint: true, openWorldHint: false },
      _meta: { ui: { resourceUri: FILE_UPLOAD_UI_RESOURCE_URI } },
    },
    async (
      args: { company_id?: string | number } & UploadReceiptOptions,
      extra?: AuthExtra,
    ): Promise<CallToolResult> => {
      const recorder = getCurrentRecorder();
      const toolStart = Date.now();
      try {
        const tokenContext = extractTokenContext(extra);
        const companyId = await resolveCompanyId(tokenContext);
        if (args.company_id !== undefined && String(args.company_id) !== String(companyId)) {
          recorder?.recordToolCall({
            tool: FILE_UPLOAD_UI_TOOL,
            status: 'error',
            duration_ms: Date.now() - toolStart,
          });
          return createTextResponse(
            `company_id の不整合: リクエストの company_id (${args.company_id}) と現在の事業所 (${companyId}) が異なります。\n` +
              `freee_set_current_company で事業所を切り替えるか、リクエストの company_id を修正してください。`,
            { isError: true },
          );
        }
        const companyInfo = await tokenContext.tokenStore
          .getCompanyInfo(tokenContext.userId, companyId)
          .catch(() => null);
        const companyName = formatCompanyName(companyInfo?.display_name ?? companyInfo?.name);

        const { company_id: _ignored, ...fields } = args;
        const prefill: UploadReceiptOptions = receiptFieldsSchema.parse(fields);

        recorder?.recordToolCall({
          tool: FILE_UPLOAD_UI_TOOL,
          status: 'success',
          duration_ms: Date.now() - toolStart,
        });
        return {
          content: [
            {
              type: 'text',
              text:
                `ファイルボックスのアップロード画面を表示しました（事業所: ${companyName} / ID: ${companyId}）。\n` +
                (Object.keys(prefill).length > 0
                  ? '会話から読み取れた発行日・金額・取引先などは画面に入力済みです。\n'
                  : '') +
                'ユーザーに画面上でファイルを選択してアップロードするよう案内してください。' +
                'アップロード完了はユーザーからの報告、またはこの画面からの通知で確認できます。\n' +
                'この画面が表示されない環境（MCP Apps 非対応クライアント）では、' +
                'freee Web (https://secure.freee.co.jp/receipts) からアップロードするよう案内してください。',
            },
          ],
          structuredContent: {
            company_id: companyId,
            company_name: companyName,
            upload_url: uploadUrl,
            max_file_size_bytes: MAX_FILE_SIZE_BYTES,
            ticket_tool: FILE_UPLOAD_TICKET_TOOL,
            prefill,
          },
        };
      } catch (error) {
        recorder?.recordToolCall({
          tool: FILE_UPLOAD_UI_TOOL,
          status: 'error',
          duration_ms: Date.now() - toolStart,
        });
        recorder?.recordError({ source: 'tool_handler', chain: serializeErrorChain(error) });
        return createTextResponse(`アップロード画面の表示に失敗: ${formatErrorMessage(error)}`, {
          isError: true,
        });
      }
    },
  );

  registerTracedTool(
    server,
    FILE_UPLOAD_TICKET_TOOL,
    {
      title: 'アップロードチケット発行',
      description:
        'ファイルアップロード画面が内部的に使用するツール。' +
        `現在の事業所に紐づく短期間有効（${UPLOAD_TICKET_TTL_SECONDS / 60} 分）のアップロードチケットを発行します。`,
      inputSchema: {},
      annotations: { readOnlyHint: true, openWorldHint: false },
      // Only the view may call this; it is never offered to the model.
      _meta: { ui: { visibility: ['app'] } },
    },
    async (_args: Record<string, never>, extra?: AuthExtra): Promise<CallToolResult> => {
      const recorder = getCurrentRecorder();
      const toolStart = Date.now();
      try {
        const tokenContext = extractTokenContext(extra);
        const companyId = await resolveCompanyId(tokenContext);
        const { ticket, expiresAt } = await signUploadTicket(
          { userId: tokenContext.userId, companyId },
          options.jwtSecret,
          options.issuerUrl,
        );
        recorder?.recordToolCall({
          tool: FILE_UPLOAD_TICKET_TOOL,
          status: 'success',
          duration_ms: Date.now() - toolStart,
        });
        return {
          content: [{ type: 'text', text: 'アップロードチケットを発行しました。' }],
          structuredContent: {
            ticket,
            expires_at: expiresAt,
            upload_url: uploadUrl,
            company_id: companyId,
            max_file_size_bytes: MAX_FILE_SIZE_BYTES,
          },
        };
      } catch (error) {
        recorder?.recordToolCall({
          tool: FILE_UPLOAD_TICKET_TOOL,
          status: 'error',
          duration_ms: Date.now() - toolStart,
        });
        recorder?.recordError({ source: 'tool_handler', chain: serializeErrorChain(error) });
        return createTextResponse(
          `アップロードチケットの発行に失敗: ${formatErrorMessage(error)}`,
          { isError: true },
        );
      }
    },
  );
}
