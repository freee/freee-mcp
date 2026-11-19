---
"freee-mcp": patch
---

freee API へのリクエストの path の検証を強化しました。

- `.` / `..` の segment (`%2e` などのエンコードされたものを含む)、`\`、エンコードされた `/` / `\` を含む path を、URL を組み立てる前に拒否するようにしました
- URL を組み立てた後の path が、API の base URL の origin と path の下に留まっていることを確かめるようにしました
- リクエストログの `path_pattern` を、URL を組み立てた後の実際に送る path から作るようにしました
