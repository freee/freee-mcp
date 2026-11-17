---
"freee-mcp": patch
---

API ツールの path パラメータを OpenAPI スキーマの型どおりに検証するようにした（integer は数字のみ。string は `/`・`\`・`.`・`..` をエンコードされていても拒否）。あわせて、path に含まれる事業所 ID（`/api/1/companies/{id}` など）が現在の事業所と異なる場合は、query / body の `company_id` と同様にリクエストを送る前に拒否する
