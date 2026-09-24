---
"freee-mcp": patch
---

全ツールで MCP ツールアノテーション（`readOnlyHint` / `destructiveHint` / `openWorldHint`）を明示するようにしました。未指定時は MCP 仕様の既定値（破壊的・open world）として扱われるため、読み取り専用ツールも含めて実際の性質どおりに宣言します。freee-sign-mcp の `sign_api_*` ツールも同様です。
