# 役職

役職の操作

## GET /api/v1/positions — 役職一覧の取得

概要 指定した事業所の指定日付時点における役職情報をリストで返します。

注意点
管理者権限を持ったユーザーのみ実行可能です。

### パラメータ

- company_id*: integer - 事業所ID

### レスポンス

- positions*: array[object]
- total_count*: integer(int32) - 合計件数

## POST /api/v1/positions — 役職の作成

概要 指定した事業所の役職を新規作成します。

注意点
管理者権限を持ったユーザーのみ実行可能です。

### リクエストボディ

- company_id*: integer(int32) - 作成対象事業所ID（必須） 例: `1` (最小: 1, 最大: 2147483647)
- position*: object
  - code: string - 役職コード（入力しない場合、空文字が入力されます。） 例: `position1`
  - name*: string - 役職名称（必須） 例: `部長`

### レスポンス

- position*: object

## PUT /api/v1/positions/{id} — 役職の更新

概要 指定した事業所の役職の情報を更新します。

注意点
管理者権限を持ったユーザーのみ実行可能です。

### パラメータ

- id* (path): integer - 役職ID

### リクエストボディ

POST /api/v1/positions と同じ

### レスポンス

POST /api/v1/positions と同じ

## DELETE /api/v1/positions/{id} — 役職の削除

概要 指定した事業所の役職の情報を削除します。

注意点
管理者権限を持ったユーザーのみ実行可能です。 従業員に役職が適用されている場合、従業員の役職情報も削除されます。

### パラメータ

- id* (path): integer - 役職ID
- company_id*: integer - 事業所ID
