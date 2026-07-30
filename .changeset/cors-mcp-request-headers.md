---
'freee-mcp': patch
---

Remote モードの CORS 設定に MCP のリクエストメタデータヘッダーを追加

- `Mcp-Protocol-Version`（spec 2025-06-18 以降必須）が preflight で拒否され、ブラウザ経由のクライアントが接続できない問題を修正
- spec 2026-07-28 で Streamable HTTP の POST に必須となる `Mcp-Method` / `Mcp-Name` も先行して許可
- 対象は freee MCP サーバーと freee サイン MCP サーバーの両方
