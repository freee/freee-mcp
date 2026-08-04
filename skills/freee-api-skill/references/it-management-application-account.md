# it_management_application_accounts

application_accounts

## GET /hub/it_management/application_accounts — アカウント一覧取得（β版）

アカウントの一覧をカーソルページネーションで取得します。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- company_id*: integer(int64) - 事業所ID
- page_token: string - ページネーションのトークン
- page_size: integer(int32) - 1ページあたりの取得件数（デフォルト25、最大100）
- application_id: string(uuid) - アプリケーションIDでフィルタ
- keyword: string - キーワード検索（account に部分一致）
- status_id: string(uuid) - ステータスIDでフィルタ
- member_id: string(uuid) - アカウントホルダーのメンバーIDでフィルタ

### レスポンス

アカウント一覧取得レスポンス
- data*: array[object] - アカウントのリスト
- next_page_token*: string - 次のページを取得するためのカーソルトークン。次ページがない場合はnull

## POST /hub/it_management/application_accounts — アカウント作成（β版）

アカウントを作成します。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)

### リクエストボディ

- company_id*: integer(int64) - 事業所ID 例: `1`
- account*: string - アカウント名 例: `yamada.taro@example.com`
- account_kind*: string - アカウント種別 (選択肢: email, id_string)
- external_id*: string - 外部システムID 例: `user-12345`
- external_url: string - アプリケーションのアカウントページURL 例: `https://app.example.com/users/12345`
- application_id*: string(uuid) - アプリケーションID 例: `550e8400-e29b-41d4-a716-446655440001`

### レスポンス

アカウント作成レスポンス
- id*: string(uuid) - アカウントID
- account*: string - アカウント名
- account_kind*: string - アカウント種別
- external_id*: string - 外部システムID
- external_url*: string - アプリケーションのアカウントページURL
- discovered_at*: string(date-time) - 検出日時(ISO8601)
- last_login_at*: string(date-time) - 最終ログイン日時(ISO8601)
- last_synced_at*: string(date-time) - 最終同期日時(ISO8601)
- application*: object - アプリケーション
- status*: object - ステータス
- role*: object - ロール
- member*: object - 紐づくメンバー
- data*: object - アプリケーション固有のアカウント属性（コネクタにより構造が異なる）
- created_at*: string(date-time) - 作成日時(ISO8601)
- updated_at*: string(date-time) - 更新日時(ISO8601)

## GET /hub/it_management/application_accounts/{id} — アカウント詳細取得（β版）

アカウントの詳細を取得します。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- company_id*: integer(int64) - 事業所ID
- id* (path): string(uuid) - アカウントID

### レスポンス

アカウント詳細取得レスポンス
- id*: string(uuid) - アカウントID
- account*: string - アカウント名
- account_kind*: string - アカウント種別
- external_id*: string - 外部システムID
- external_url*: string - アプリケーションのアカウントページURL
- discovered_at*: string(date-time) - 検出日時(ISO8601)
- last_login_at*: string(date-time) - 最終ログイン日時(ISO8601)
- last_synced_at*: string(date-time) - 最終同期日時(ISO8601)
- application*: object - アプリケーション
- status*: object - ステータス
- role*: object - ロール
- member*: object - 紐づくメンバー
- data*: object - アプリケーション固有のアカウント属性（コネクタにより構造が異なる）
- created_at*: string(date-time) - 作成日時(ISO8601)
- updated_at*: string(date-time) - 更新日時(ISO8601)

## PATCH /hub/it_management/application_accounts/{id} — アカウント部分更新（β版）

アカウントを部分的に更新します。 ##

注意点
- 指定されたパラメータのみが更新されます。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- id* (path): string(uuid) - アカウントID

### リクエストボディ

- company_id: integer(int64) - 事業所ID 例: `1`
- account: string - アカウント名 例: `yamada.taro@example.com`
- account_kind: string - アカウント種別 (選択肢: email, id_string)
- external_id: string - 外部システムID 例: `user-12345`
- external_url: string - アプリケーションのアカウントページURL 例: `https://app.example.com/users/12345`
- application_account_status_id: string(uuid) - ステータスID（同一アプリケーション内のものを指定） 例: `550e8400-e29b-41d4-a716-446655440002`
- application_account_role_id: string(uuid) - ロールID（同一アプリケーション内のものを指定。null を指定するとロールを解除） 例: `550e8400-e29b-41d4-a716-446655440004`
- attributes: object - アプリケーション固有のアカウント属性。キーは attribute の UUID または title（同一アプリ内で一意）のどちらでも指定可能。

### レスポンス

アカウント部分更新レスポンス
- id*: string(uuid) - アカウントID
- account*: string - アカウント名
- account_kind*: string - アカウント種別
- external_id*: string - 外部システムID
- external_url*: string - アプリケーションのアカウントページURL
- discovered_at*: string(date-time) - 検出日時(ISO8601)
- last_login_at*: string(date-time) - 最終ログイン日時(ISO8601)
- last_synced_at*: string(date-time) - 最終同期日時(ISO8601)
- application*: object - アプリケーション
- status*: object - ステータス
- role*: object - ロール
- member*: object - 紐づくメンバー
- data*: object - アプリケーション固有のアカウント属性（コネクタにより構造が異なる）
- created_at*: string(date-time) - 作成日時(ISO8601)
- updated_at*: string(date-time) - 更新日時(ISO8601)

## DELETE /hub/it_management/application_accounts/{id} — アカウント削除（β版）

アカウントを削除します（ソフトデリート）。

### パラメータ

GET /hub/it_management/application_accounts/{id} と同じ

### レスポンス

アカウント削除レスポンス
