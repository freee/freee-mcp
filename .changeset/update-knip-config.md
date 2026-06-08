---
'freee-mcp': patch
---

knip 設定を整理し、未使用のコードと依存を削除

- `knip.json` を最小構成に整理（sign エントリを追加、stale な ignore を削除）
- 未使用の `@opentelemetry/semantic-conventions` 依存を削除
- 未使用ファイル `src/storage/index.ts` を削除
- 内部参照のみの export を非公開化して公開 API 表面を縮小
