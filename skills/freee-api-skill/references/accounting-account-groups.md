# Account groups

決算書表示名

## POST /api/1/account_groups — 決算書表示名の作成

概要 指定した事業所の決算書表示名を作成する

### リクエストボディ

- company_id*: integer(int64) - 事業所ID 例: `1`
- name*: string - 決算書表示名 (20文字以内) 例: `新しい決算書表示名`
- account_category_id*: integer(int64) - 勘定科目カテゴリーID Selectablesフォーム用選択項目情報エンドポイント(account_groups.account_category_id)で取得可能です 例: `1`
- index: integer(int64) - 表示順 例: `1`

### レスポンス

- account_group*: object
