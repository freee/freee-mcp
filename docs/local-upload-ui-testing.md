# Remote モードのファイルアップロード UI をローカルで確認する

`freee_file_upload_ui`（MCP Apps のアップロード画面）と `POST /upload/receipts` を、Claude.ai などの実ホストなしで手元で動かす手順。

前提: `bun install` 済み、Redis が使えること（`docker compose up -d redis` または `redis-server`）。

## 1. mock freee を起動する（実 freee を使わない場合）

```bash
bun run scripts/dev-mock-freee.ts
```

OAuth（authorize / token）と `/api/1/users/me`、`/api/1/companies`、`POST /api/1/receipts` を模倣する。受け取ったアップロードは `GET http://127.0.0.1:4100/__received` で確認できる。

実 freee で試す場合はこの手順を飛ばし、次の環境変数で `FREEE_*` に自分のアプリの値を入れる（コールバック URL は `http://127.0.0.1:3000/oauth/freee-callback` をアプリに登録する）。

## 2. remote サーバーを開発モードで起動する

```bash
export NODE_ENV=development
export PORT=3000
export ISSUER_URL=http://127.0.0.1:3000
export JWT_SECRET=$(openssl rand -hex 32)
export REDIS_URL=redis://127.0.0.1:6379
# mock freee を使う場合
export FREEE_CLIENT_ID=dev-client-id
export FREEE_CLIENT_SECRET=dev-client-secret
export FREEE_AUTHORIZATION_ENDPOINT=http://127.0.0.1:4100/public_api/authorize
export FREEE_TOKEN_ENDPOINT=http://127.0.0.1:4100/public_api/token
export FREEE_API_BASE_URL=http://127.0.0.1:4100

bun run dev:remote
```

起動ログに `Dev upload harness enabled` が出ていれば、開発専用のホスト模擬ページ `http://127.0.0.1:3000/dev/upload-harness` が有効になっている（`NODE_ENV=development` のときだけマウントされる）。

## 3. MCP のアクセストークンを取る

mock freee の場合はスクリプトで自動取得できる。

```bash
ISSUER_URL=http://127.0.0.1:3000 bun run scripts/dev-mcp-token.ts
```

実 freee の場合はログイン画面を通る必要があるため、MCP Inspector（`bunx @modelcontextprotocol/inspector`）で `http://127.0.0.1:3000/mcp` に OAuth 接続し、Auth 設定に表示される access token を使う。

## 4. ハーネスで画面を動かす

1. ブラウザで `http://127.0.0.1:3000/dev/upload-harness` を開く
2. トークンを貼り付けて「Load UI」を押す。ページが `freee_file_upload_ui` を呼び、返ってきた `ui://freee-mcp/file-upload` を iframe に描画する
3. 画面でファイルを選び「アップロード」を押す。画面が `freee_file_upload_ticket` を呼んでチケットを取り、`POST /upload/receipts` へ送る
4. 右側の「Model context」に `ui/update-model-context` で会話へ通知される内容が表示される。mock freee なら `GET /__received` に届いたファイルが出る

ハーネスは iframe が同一オリジンなので、実ホストの sandbox origin / CSP / CORS の挙動までは再現しない。それらは Claude.ai などでの確認が必要。

## 5. 実ホスト（Claude.ai / Claude Desktop）で確認する

Claude のカスタムコネクタは HTTPS の URL が必要なので、ローカルサーバーをトンネル（cloudflared や ngrok）で公開する。

- `ISSUER_URL` をトンネルの URL にして起動し直す（チケットの `aud` と `connectDomains` に使われる）
- freee アプリのコールバック URL に `<トンネル URL>/oauth/freee-callback` を追加する
- Claude で「カスタムコネクタを追加」→ `<トンネル URL>/mcp`
- 会話で「この領収書をファイルボックスにアップロードして」のように依頼すると、`freee_file_upload_ui` が呼ばれて画面が出る

## ハーネスを使わずに API だけ確認する

トークンとチケットを curl で回すこともできる。

```bash
TOKEN=...   # 手順 3 のアクセストークン
# チケット発行（stateless なので initialize なしで tools/call できる）
curl -s http://127.0.0.1:3000/mcp \
  -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' \
  -H 'Accept: application/json, text/event-stream' \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"freee_file_upload_ticket","arguments":{}}}'
# 上の structuredContent.ticket を使ってアップロード
curl -s http://127.0.0.1:3000/upload/receipts \
  -H "Authorization: Bearer <ticket>" \
  -F receipt=@./receipt.pdf -F description=テスト -F document_type=receipt
```
