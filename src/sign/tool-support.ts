import type { SignTokenContext } from './client.js';
import type { SignTokenStore } from './server/sign-redis-token-store.js';

// MCP ツール名を定数化する理由: `tools.ts` の sign_api_post 説明文で誘導文言に含める必要があり、
// 生文字列を 2 箇所に散らすと改名時に片方だけ取り残される
export const SIGN_FILE_UPLOAD_TOOL_NAME = 'sign_file_upload';

export type SignAuthExtra = { authInfo?: { extra?: Record<string, unknown> } };

function extractSignTokenContext(extra?: SignAuthExtra): SignTokenContext | undefined {
  const authExtra = extra?.authInfo?.extra;
  if (authExtra?.tokenStore && typeof authExtra.userId === 'string') {
    return {
      tokenStore: authExtra.tokenStore as SignTokenStore,
      userId: authExtra.userId,
    };
  }
  return undefined;
}

// Remote 時に tokenContext が取れない場合、local filesystem トークンへ fallback させると
// 他ユーザーの資格情報を共有する impersonation になるため、明示的に失敗させる
export function resolveTokenContext(
  extra: SignAuthExtra | undefined,
  isRemote: boolean,
): SignTokenContext | undefined {
  const ctx = extractSignTokenContext(extra);
  if (isRemote && !ctx) {
    throw new Error(
      'Remote モードで認証コンテキストが取得できませんでした。MCP クライアントを再接続してください。',
    );
  }
  return ctx;
}
