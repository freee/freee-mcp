---
"freee-mcp": patch
---

CSVレスポンスがJSONとして処理される不整合を修正。isBinaryContentType に text/csv を追加し、CSVレスポンスが正しくファイルとして保存されるようにしました。
