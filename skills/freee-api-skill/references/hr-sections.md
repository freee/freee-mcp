# 部門

部門の操作

## GET /api/v1/groups — 部門一覧の取得

概要 指定した事業所の指定日付時点における部門情報をリストで返します。 部門APIの使い方については、 部門APIを利用した組織図の取得について をご参照ください。

注意点
管理者権限を持ったユーザーのみ実行可能です。

### パラメータ

- company_id*: integer - 事業所ID

### レスポンス

- groups*: array[object]
- total_count*: integer(int32) - 合計件数

## POST /api/v1/groups — 部門の作成

概要 指定した事業所の部門を新規作成します。 部門APIの使い方については、 部門APIを利用した組織図の取得について をご参照ください。

注意点
管理者権限を持ったユーザーのみ実行可能です。

### リクエストボディ

- company_id*: integer(int32) - 作成対象事業所ID（必須） 例: `1` (最小: 1, 最大: 2147483647)
- group*: object
  - code: string - 部門コード（入力しない場合、空文字が入力されます。） 例: `group2`
  - name*: string - 部門名称（必須） 例: `営業部門`
  - parent_group_id: integer(int32) - 親部門ID（部門階層レベルが10以内になるように親部門IDを指定してください。） 例: `2` (最小: 1, 最大: 2147483647)

### レスポンス

- group*: object

## PUT /api/v1/groups/{id} — 部門の更新

概要 指定した事業所の部門の情報を更新します。 部門APIの使い方については、 部門APIを利用した組織図の取得について をご参照ください。

注意点
管理者権限を持ったユーザーのみ実行可能です。

### パラメータ

- id* (path): integer - 部門ID

### リクエストボディ

- company_id*: integer(int32) - 作成対象事業所ID（必須） 例: `1` (最小: 1, 最大: 2147483647)
- group*: object
  - code: string - 部門コード（入力しない場合、空文字が入力されます。） 例: `group2`
  - name*: string - 部門名称 例: `営業部門`

### レスポンス

POST /api/v1/groups と同じ

## DELETE /api/v1/groups/{id} — 部門の削除

概要 指定した事業所の部門の情報を削除します。 部門APIの使い方については、 部門APIを利用した組織図の取得について をご参照ください。

注意点
管理者権限を持ったユーザーのみ実行可能です。

### パラメータ

- id* (path): integer - 部門ID
- company_id*: integer - 事業所ID
