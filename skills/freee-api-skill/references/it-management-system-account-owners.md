# it_management_system_account_owners

system_account_owners

## GET /hub/it_management/system_account_owners — システムアカウント一覧取得（β版）

システムアカウント (人ではないサービス / bot / 共有アカウント等の所有者情報) の一覧をカーソルページネーションで取得します。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- company_id*: integer(int64) - 事業所ID
- keyword: string - 名前 / メールアドレスの部分一致検索キーワード。空白で区切って複数指定した場合は、すべてに一致するものを返します
- page_token: string - ページネーションのトークン
- page_size: integer(int32) - 1ページあたりの取得件数（デフォルト25、最大100）

### レスポンス

システムアカウント一覧取得レスポンス
- data*: array[object] - システムアカウントのリスト
- next_page_token*: string - 次のページを取得するためのカーソルトークン。次ページがない場合はnull

## POST /hub/it_management/system_account_owners — システムアカウント作成（β版）

システムアカウントを作成します。 ##

注意点
- 同じ事業所の他のメンバー・ゲスト・システムアカウントで使用中のメールアドレスは登録できません。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)

### リクエストボディ*

- company_id*: integer(int64) - 事業所ID 例: `1`
- name*: string - システムアカウント名 例: `prod-monitoring-bot`
- emails*: array[object] - メールアドレス (1 個以上) 例: `["prod-monitoring-bot@example.com"]`

### レスポンス

システムアカウント作成レスポンス
- id*: string(uuid) - システムアカウントID
- name*: string - システムアカウント名
- emails*: array[string] - メールアドレス (複数可)
- created_at*: string(date-time) - 作成日時(ISO8601)
- updated_at*: string(date-time) - 更新日時(ISO8601)

## GET /hub/it_management/system_account_owners/{id} — システムアカウント詳細取得（β版）

システムアカウントの詳細を取得します。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- company_id*: integer(int64) - 事業所ID
- id* (path): string(uuid) - システムアカウントID

### レスポンス

システムアカウント詳細取得レスポンス
- id*: string(uuid) - システムアカウントID
- name*: string - システムアカウント名
- emails*: array[string] - メールアドレス (複数可)
- created_at*: string(date-time) - 作成日時(ISO8601)
- updated_at*: string(date-time) - 更新日時(ISO8601)

## PATCH /hub/it_management/system_account_owners/{id} — システムアカウント部分更新（β版）

システムアカウントを部分的に更新します。 ##

注意点
- 指定されたパラメーターのみが更新されます。 - emails を指定した場合は指定した内容で置き換えられ、含まれない既存のメールアドレスは削除されます。 - 同じ事業所の他のメンバー・ゲスト・システムアカウントで使用中のメールアドレスは登録できません。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- id* (path): string(uuid) - システムアカウントID

### リクエストボディ*

- company_id: integer(int64) - 事業所ID 例: `1`
- name: string - システムアカウント名 例: `prod-monitoring-bot`
- emails: array[object] - メールアドレス (1 個以上) 例: `["prod-monitoring-bot@example.com"]`

### レスポンス

システムアカウント部分更新レスポンス
- id*: string(uuid) - システムアカウントID
- name*: string - システムアカウント名
- emails*: array[string] - メールアドレス (複数可)
- created_at*: string(date-time) - 作成日時(ISO8601)
- updated_at*: string(date-time) - 更新日時(ISO8601)

## DELETE /hub/it_management/system_account_owners/{id} — システムアカウント削除（β版）

システムアカウントを削除します。

### パラメータ

GET /hub/it_management/system_account_owners/{id} と同じ

### レスポンス

システムアカウント削除レスポンス
