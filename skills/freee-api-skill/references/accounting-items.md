# Items

品目

## GET /api/1/items — 品目一覧の取得

概要 指定した事業所の品目一覧を取得する 事業所の設定で品目コードを使用する設定にしている場合、レスポンスで品目コード(code)を返します

### パラメータ

- company_id*: integer(int64) - 事業所ID
- start_update_date: string - 更新日で絞り込み：開始日(yyyy-mm-dd)
- end_update_date: string - 更新日で絞り込み：終了日(yyyy-mm-dd)
- offset: integer(int64) - 取得レコードのオフセット (デフォルト: 0)
- limit: integer(int64) - 取得レコードの件数 (デフォルト: 50, 最小: 1, 最大: 3000)

### レスポンス

- items*: array[object]

## POST /api/1/items — 品目の作成

概要 指定した事業所の品目を作成する codeを利用するには、事業所の設定で品目コードを使用する設定にする必要があります。

### リクエストボディ

- company_id*: integer(int64) - 事業所ID 例: `1` (最小: 1)
- name*: string - 品目名 (30文字以内) 例: `新しい品目`
- shortcut1: string - ショートカット１ (20文字以内) 例: `NEWITEM`
- shortcut2: string - ショートカット２ (20文字以内) 例: `202`
- code: string - 品目コード 例: `code001` (パターン: ^[0-9a-zA-Z_-]+$)

### レスポンス

- item*: object

## GET /api/1/items/{id} — 品目の取得

概要 指定した事業所の品目を取得する 事業所の設定で品目コードを使用する設定にしている場合、レスポンスで品目コード(code)を返します

### パラメータ

- company_id*: integer(int64) - 事業所ID
- id* (path): integer(int64) - 品目ID

### レスポンス

POST /api/1/items と同じ

## PUT /api/1/items/{id} — 品目の更新（存在しない場合は作成）

概要 指定した事業所の品目を更新する codeを利用するには、事業所の設定で品目コードを使用する設定にする必要があります。

### パラメータ

- id* (path): integer(int64) - 品目ID

### リクエストボディ

POST /api/1/items と同じ

### レスポンス

POST /api/1/items と同じ

## DELETE /api/1/items/{id} — 品目の削除

概要 指定した事業所の品目を削除する

### パラメータ

- id* (path): integer(int64) - 品目ID
- company_id*: integer(int64) - 事業所ID

## PUT /api/1/items/code/upsert — 品目の更新（作成）

概要 品目コードをキーに、指定した品目の情報を更新（存在しない場合は作成）する codeを利用するには、事業所の設定で品目コードを使用する設定にする必要があります。

### リクエストボディ

- code*: string - 品目コード 例: `code001` (パターン: ^[0-9a-zA-Z_-]+$)
- company_id*: integer(int64) - 事業所ID 例: `1` (最小: 1)
- item*: object
  - name*: string - 品目名 (30文字以内) 例: `新しい品目`
  - shortcut1: string - ショートカット１ (20文字以内) 例: `NEWITEM`
  - shortcut2: string - ショートカット２ (20文字以内) 例: `202`

### レスポンス

POST /api/1/items と同じ
