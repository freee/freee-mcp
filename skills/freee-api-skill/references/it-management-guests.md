# it_management_guests

guests

## GET /hub/it_management/guests — ゲスト一覧取得（β版）

ゲスト (freee 従業員ではない外部ユーザー) の一覧をカーソルページネーションで取得します。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- company_id*: integer(int64) - 事業所ID
- keyword: string - 名前 / メールアドレスの部分一致検索キーワード
- page_token: string - ページネーションのトークン
- page_size: integer(int32) - 1ページあたりの取得件数（デフォルト25、最大100）

### レスポンス

ゲスト一覧取得レスポンス
- data*: array[object] - ゲストのリスト
- next_page_token*: string - 次のページを取得するためのカーソルトークン。次ページがない場合はnull

## POST /hub/it_management/guests — ゲスト作成（β版）

ゲストを作成します。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)

### リクエストボディ*

- company_id*: integer(int64) - 事業所ID 例: `1`
- family_name*: string - 姓 例: `山田`
- given_name*: string - 名 例: `太郎`
- emails*: array[string] - メールアドレス (1 個以上) 例: `["yamada@example.com"]`

### レスポンス

ゲスト作成レスポンス
- id*: string(uuid) - ゲストID
- display_name*: string - 表示名
- family_name*: string - 姓
- given_name*: string - 名
- emails*: array[string] - メールアドレス (複数可)
- created_at*: string(date-time) - 作成日時(ISO8601)
- updated_at*: string(date-time) - 更新日時(ISO8601)

## GET /hub/it_management/guests/{id} — ゲスト詳細取得（β版）

ゲストの詳細を取得します。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- company_id*: integer(int64) - 事業所ID
- id* (path): string(uuid) - ゲストID

### レスポンス

ゲスト詳細取得レスポンス
- id*: string(uuid) - ゲストID
- display_name*: string - 表示名
- family_name*: string - 姓
- given_name*: string - 名
- emails*: array[string] - メールアドレス (複数可)
- created_at*: string(date-time) - 作成日時(ISO8601)
- updated_at*: string(date-time) - 更新日時(ISO8601)

## PATCH /hub/it_management/guests/{id} — ゲスト部分更新（β版）

ゲストを部分的に更新します。 ##

注意点
- 指定されたパラメーターのみが更新されます。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- id* (path): string(uuid) - ゲストID

### リクエストボディ*

- company_id: integer(int64) - 事業所ID 例: `1`
- family_name: string - 姓 例: `山田`
- given_name: string - 名 例: `太郎`
- emails: array[string] - メールアドレス (1 個以上) 例: `["yamada@example.com"]`

### レスポンス

ゲスト部分更新レスポンス
- id*: string(uuid) - ゲストID
- display_name*: string - 表示名
- family_name*: string - 姓
- given_name*: string - 名
- emails*: array[string] - メールアドレス (複数可)
- created_at*: string(date-time) - 作成日時(ISO8601)
- updated_at*: string(date-time) - 更新日時(ISO8601)

## DELETE /hub/it_management/guests/{id} — ゲスト削除（β版）

ゲストを削除します。

### パラメータ

GET /hub/it_management/guests/{id} と同じ

### レスポンス

ゲスト削除レスポンス
