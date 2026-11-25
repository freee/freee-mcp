---
"freee-mcp": patch
---

freee API へのリクエストの path の検証を強化しました。

- `.` / `..` の segment (`%2e` などのエンコードされたものや、`..%2f`・`foo%2f..` のようにエンコードされた `/` / `\` で区切られたものを含む) と `\` を含む path を、URL を組み立てる前に拒否するようにしました。`/api/1/partners/code/A%2FB` のように、dot-segment にならないエンコードされた `/` / `\` は通します
- URL を組み立てた後の path が、API の base URL の origin と path の下に留まっていることを確かめるようにしました
- リクエストログの `path_pattern` を、URL を組み立てた後の実際に送る path から作るようにしました
