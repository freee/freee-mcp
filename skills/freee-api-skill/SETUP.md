# freee-mcp セットアップ

freee-mcp（MCP サーバー）が未接続・未認証の場合の接続手順です。
すでに `freee_*` ツールが使えている場合、このファイルを読む必要はありません。

接続方法は Remote MCP（推奨）とローカルの2つがあります。
現在の接続モードは `freee_server_info` の transport フィールド（`remote` または `stdio`）で確認できます。

## 方法 1: Remote MCP で接続する（推奨）

freee が提供する Remote MCP サーバーに接続する方法です。ローカルでのセットアップが不要で、すぐに利用を開始できます。

Claude 及び Claude Desktop では「カスタマイズ」より「カスタムコネクタを追加」を開き、以下を設定してください。

- 名前: `freee`
- URL: `https://mcp.freee.co.jp/mcp`

初回接続時にブラウザで freee への認証が自動的に行われます。`npx freee-mcp configure` の実行は不要です。

その他の AI ツールでは、それぞれの案内に従って Remote MCP サーバーを追加してください。

## 方法 2: ローカルで MCP サーバーを起動する

freee アプリケーションを自分で登録し、ローカルで MCP サーバーを起動する方法です。

```bash
npx freee-mcp configure
```

ブラウザで freee にログインし、事業所を選択します。設定は `~/.config/freee-mcp/config.json` に保存されます。

Claude を再起動後、`freee_auth_status` ツールで認証状態を確認。

なお、ローカルモードでは一部のエンドポイント（freee-mcp（リモート版） 限定）が利用できません。

## サイン（電子契約）のセットアップ

freee サインは別の MCP サーバー（`freee-sign-mcp`）です。手順は `SIGN-GUIDE.md` を参照してください。

## 関連リンク

- [freee-mcp](https://www.npmjs.com/package/freee-mcp)
- [freee API ドキュメント](https://developer.freee.co.jp/docs)
- Remote MCP サーバー: `https://mcp.freee.co.jp/mcp`
