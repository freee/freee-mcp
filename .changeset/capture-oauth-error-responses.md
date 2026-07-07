---
"freee-mcp": patch
---

Remote モードの OAuth エンドポイント (/token /authorize /register /revoke) で、MCP SDK が直接返すエラー応答の `error` / `error_description` を canonical log に記録するようにしました。

- これまでは SDK が `recordError` を経由せずに 4xx を返すため、ログには `unrecorded` フォールバックしか残らず実際の失敗理由が分かりませんでした。
- これにより `invalid_grant` / `invalid_client` / `invalid_request` などの区別がログから可能になります。
- 記録するのはサーバー生成の OAuth エラー項目のみ (スクラブ適用)。リクエストボディ (認可コード・client_secret・PKCE verifier) は読み取りません。
