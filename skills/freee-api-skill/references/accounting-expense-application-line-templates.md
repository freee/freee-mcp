# Expense application line templates

経費科目

## GET /api/1/expense_application_line_templates — 経費科目一覧の取得

概要 指定した事業所の経費科目一覧を取得する

### パラメータ

- company_id*: integer(int64) - 事業所ID
- offset: integer(int64) - 取得レコードのオフセット (デフォルト: 0)
- limit: integer(int64) - 取得レコードの件数 (デフォルト: 20, 最小: 1, 最大: 100)

### レスポンス

- expense_application_line_templates*: array[object]

## POST /api/1/expense_application_line_templates — 経費科目の作成

### リクエストボディ

- company_id*: integer(int64) - 事業所ID 例: `1` (最小: 1)
- name*: string - 経費科目名 (100文字以内) 例: `交通費`
- account_item_id*: integer(int64) - 勘定科目ID 例: `1` (最小: 1)
- item_id: integer(int64) - 品目ID 例: `1` (最小: 1)
- tax_code*: integer(int64) - 税区分コード（税区分のdisplay_categoryがtax_5: 5%表示の税区分, tax_r8: 軽減税率8%表示の税区分に該当するtax_codeのみ利用可能です。税区分のdisplay_categoryは /taxes/companies/{:company_id}のAPIから取得可能です。） 例: `1` (最小: 0, 最大: 2147483647)
- description: string - 経費科目の説明 (1000文字以内) 例: `電車、バス、飛行機などの交通費`
- line_description: string - 内容の補足 (1000文字以内) 例: `移動区間`
- required_receipt: boolean - 添付ファイルの必須/任意

  falseを指定した時は申請時の領収書の添付を任意とします。

  trueを指定した時は申請時の領収書の添付を必須とします。

  未指定の時は申請時の領収書の添付を任意とします。 例: `true`

### レスポンス

- expense_application_line_template*: object

## GET /api/1/expense_application_line_templates/{id} — 経費科目の取得

### パラメータ

- id* (path): integer(int64) - 経費科目ID
- company_id*: integer(int64) - 事業所ID

### レスポンス

POST /api/1/expense_application_line_templates と同じ

## PUT /api/1/expense_application_line_templates/{id} — 経費科目の更新

### パラメータ

- id* (path): integer(int64) - 経費科目ID

### リクエストボディ

POST /api/1/expense_application_line_templates と同じ

### レスポンス

POST /api/1/expense_application_line_templates と同じ

## DELETE /api/1/expense_application_line_templates/{id} — 経費科目の削除

### パラメータ

GET /api/1/expense_application_line_templates/{id} と同じ
