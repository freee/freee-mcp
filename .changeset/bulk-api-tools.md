---
"freee-mcp": minor
---

複数の API リクエストをまとめて実行する `freee_api_bulk_get` / `freee_api_bulk_write` ツールを追加

- `freee_api_bulk_get`: GET を最大50件まで並列実行（読み取り専用）。一部が失敗しても残りの結果を返す
- `freee_api_bulk_write`: POST/PUT/PATCH/DELETE を最大20件まで実行。既定では直列実行し、失敗した時点で残りを中止する
- レートリミット (429) を受けた場合は、未実行のリクエストを中止する
