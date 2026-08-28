---
"freee-mcp": patch
---

README の対応操作数をスキーマから自動更新するようにした

- `bun run generate:references` が OpenAPI スキーマの操作数（パス × HTTP メソッド）を数え、README の該当箇所を書き換える
- スキーマ更新時に件数を手で数え直す必要がなくなった
