---
"freee-mcp": patch
---

freee-api-skill の法人税申告レシピを、帳票取得APIの実レスポンス形式に合わせて修正しました。

- 帳票3種は`application/xml`を要求するが、freee API側の状況により非推奨のJSON形式で返ることがある旨を明記
- JSONで返った場合のフィールドコードとxpathマッピング表との対応関係（中間グループ要素の扱い）を追記
