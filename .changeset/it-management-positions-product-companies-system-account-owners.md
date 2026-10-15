---
"freee-mcp": minor
---

freeeIT管理 API に会社・役職・システムアカウントの 3 リソース（それぞれ CRUD）のサポートを追加

- BREAKING: IT管理 API の部署・アプリの所属会社のフィールド名が `company` から `product_company` に、アプリの部分更新で会社を指定するフィールドが `it_management_company_id` から `product_company_id` に変わりました
