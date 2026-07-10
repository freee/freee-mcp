---
"freee-mcp": patch
---

Remote モードの rate limit を共有 egress IP 環境向けに修正

- OAuth トークン発行・更新とコールバックをユーザー / セッション単位でカウントするよう変更し、多数のユーザーが同一 egress IP を共有する環境での 429 を解消
- 認証済み MCP リクエストのユーザー単位の上限を引き上げ
- rate limit 発動時にどの limiter・キーで制限されたかを canonical log に記録
