---
"freee-mcp": patch
---

API ツールの path パラメータのうち、integer と宣言されたものを数字のみ許可するように検証した。あわせて、path に含まれる事業所 ID（`/api/1/companies/{id}` など）が現在の事業所と異なる場合は、query / body の `company_id` と同様にリクエストを送る前に拒否する
