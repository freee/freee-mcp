import http from 'node:http';
import type { AddressInfo } from 'node:net';
import request from 'supertest';
import { onTestFinished } from 'vitest';

/**
 * テスト用 HTTP サーバーを 127.0.0.1 で起動する。
 *
 * `listen(0)` はホスト未指定だと `::`（全インターフェース）で待ち受ける。macOS などでは、
 * 別プロセスが 127.0.0.1 で使用中のポート番号でも OS がそのまま割り当てるため、テストが
 * 127.0.0.1 に接続すると、より具体的な 127.0.0.1 側（並列実行中の別テストファイルや、
 * エディタ・開発ツールなどマシン上の別プロセス）に接続が届き、ステータス違いや
 * `Parse Error` でテストが不安定になる。127.0.0.1 で bind すれば OS が同じポートの重複を
 * 許さない（EADDRINUSE）ため、接続は必ずこのサーバーに届く。
 */
export async function listenOnLoopback(
  handler: http.RequestListener,
): Promise<{ server: http.Server; port: number; baseUrl: string; close: () => Promise<void> }> {
  const server = http.createServer(handler);
  await new Promise<void>((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', () => {
      server.off('error', reject);
      resolve();
    });
  });
  const { port } = server.address() as AddressInfo;
  return {
    server,
    port,
    baseUrl: `http://127.0.0.1:${port}`,
    close: () =>
      new Promise<void>((resolve) => {
        server.closeAllConnections();
        server.close(() => resolve());
      }),
  };
}

/**
 * `supertest(app)` の代わりに使う。127.0.0.1 で起動したサーバーに向けた supertest を返し、
 * サーバーはテスト終了時に閉じる。理由は {@link listenOnLoopback} を参照。
 */
export async function requestOnLoopback(
  handler: http.RequestListener,
): Promise<ReturnType<typeof request>> {
  const { server, close } = await listenOnLoopback(handler);
  onTestFinished(close);
  return request(server);
}
