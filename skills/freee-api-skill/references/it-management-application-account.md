# it_management_application_accounts

## 概要

application_accounts

## エンドポイント一覧

### GET /hub/it_management/application_accounts

操作: アカウント一覧取得（β版）

説明: アカウントの一覧をカーソルページネーションで取得します。

### パラメータ

| 名前 | 位置 | 必須 | 型 | 説明 |
|------|------|------|-----|------|
| freee-using-beta | header | はい | string | オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true) |
| company_id | query | はい | integer(int64) | 事業所ID |
| page_token | query | いいえ | string | ページネーションのトークン |
| page_size | query | いいえ | integer(int32) | 1ページあたりの取得件数（デフォルト25、最大100） |
| application_id | query | いいえ | string(uuid) | アプリケーションIDでフィルタ |
| keyword | query | いいえ | string | キーワード検索（account に部分一致） |
| status_id | query | いいえ | string(uuid) | ステータスIDでフィルタ |
| member_id | query | いいえ | string(uuid) | アカウントホルダーのメンバーIDでフィルタ |

### レスポンス (200)

アカウント一覧取得レスポンス

- data (必須): array[object] - アカウントのリスト
  配列の要素:
    - id (必須): string(uuid) - アカウントID 例: `550e8400-e29b-41d4-a716-446655440000`
    - account (必須): string - アカウント名 例: `yamada.taro@example.com`
    - account_kind (必須): string - アカウント種別 (選択肢: email, id_string)
    - external_id (必須): string - 外部システムID 例: `user-12345`
    - external_url (必須): string - アプリケーションのアカウントページURL 例: `https://app.example.com/users/12345`
    - discovered_at (必須): string(date-time) - 検出日時(ISO8601) 例: `2024-01-01T00:00:00Z`
    - last_login_at (必須): string(date-time) - 最終ログイン日時(ISO8601) 例: `2024-01-15T10:30:00Z`
    - last_synced_at (必須): string(date-time) - 最終同期日時(ISO8601) 例: `2024-01-15T10:30:00Z`
    - application (必須): object - アプリケーション
    - status (必須): object - ステータス
    - role (必須): object - ロール
    - member (必須): object - 紐づくメンバー
    - data (必須): object - アプリケーション固有のアカウント属性（コネクタにより構造が異なる）
    - created_at (必須): string(date-time) - 作成日時(ISO8601) 例: `2024-01-01T00:00:00Z`
    - updated_at (必須): string(date-time) - 更新日時(ISO8601) 例: `2024-01-15T10:30:00Z`
- next_page_token (必須): string - 次のページを取得するためのカーソルトークン。次ページがない場合はnull 例: `eyJvcmRlciI6W10sImlkIjoiYWJjIn0`

### POST /hub/it_management/application_accounts

操作: アカウント作成（β版）

説明: アカウントを作成します。

### パラメータ

| 名前 | 位置 | 必須 | 型 | 説明 |
|------|------|------|-----|------|
| freee-using-beta | header | はい | string | オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true) |

### リクエストボディ

(必須)

- company_id (必須): integer(int64) - 事業所ID 例: `1`
- account (必須): string - アカウント名 例: `yamada.taro@example.com`
- account_kind (必須): string - アカウント種別 (選択肢: email, id_string)
- external_id (必須): string - 外部システムID 例: `user-12345`
- external_url (任意): string - アプリケーションのアカウントページURL 例: `https://app.example.com/users/12345`
- application_id (必須): string(uuid) - アプリケーションID 例: `550e8400-e29b-41d4-a716-446655440001`

### レスポンス (201)

アカウント作成レスポンス

- id (必須): string(uuid) - アカウントID 例: `550e8400-e29b-41d4-a716-446655440000`
- account (必須): string - アカウント名 例: `yamada.taro@example.com`
- account_kind (必須): string - アカウント種別 (選択肢: email, id_string)
- external_id (必須): string - 外部システムID 例: `user-12345`
- external_url (必須): string - アプリケーションのアカウントページURL 例: `https://app.example.com/users/12345`
- discovered_at (必須): string(date-time) - 検出日時(ISO8601) 例: `2024-01-01T00:00:00Z`
- last_login_at (必須): string(date-time) - 最終ログイン日時(ISO8601) 例: `2024-01-15T10:30:00Z`
- last_synced_at (必須): string(date-time) - 最終同期日時(ISO8601) 例: `2024-01-15T10:30:00Z`
- application (必須): object - アプリケーション
  - id (必須): string(uuid) - アプリケーションID 例: `550e8400-e29b-41d4-a716-446655440001`
  - name (必須): string - アプリケーション名 例: `Slack`
  - attributes (必須): array[object] - アプリケーションが持つカスタム属性の一覧（order 昇順）。標準アプリの場合は空配列。
カスタムアプリでは attributes ハッシュのキーとして title (および id) が利用可能。
- status (必須): object - ステータス
  - id (必須): string(uuid) - ステータスID 例: `550e8400-e29b-41d4-a716-446655440002`
  - name (必須): string - ステータス名 例: `有効`
- role (必須): object - ロール
  - id (必須): string(uuid) - ロールID 例: `550e8400-e29b-41d4-a716-446655440004`
  - name (必須): string - ロール名 例: `Admin`
- member (必須): object - 紐づくメンバー
  - id (必須): string(uuid) - メンバーID 例: `550e8400-e29b-41d4-a716-446655440003`
  - display_name (必須): string - 表示名 例: `山田 太郎`
- data (必須): object - アプリケーション固有のアカウント属性（コネクタにより構造が異なる）
- created_at (必須): string(date-time) - 作成日時(ISO8601) 例: `2024-01-01T00:00:00Z`
- updated_at (必須): string(date-time) - 更新日時(ISO8601) 例: `2024-01-15T10:30:00Z`

### GET /hub/it_management/application_accounts/{id}

操作: アカウント詳細取得（β版）

説明: アカウントの詳細を取得します。

### パラメータ

| 名前 | 位置 | 必須 | 型 | 説明 |
|------|------|------|-----|------|
| freee-using-beta | header | はい | string | オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true) |
| company_id | query | はい | integer(int64) | 事業所ID |
| id | path | はい | string(uuid) | アカウントID |

### レスポンス (200)

アカウント詳細取得レスポンス

- id (必須): string(uuid) - アカウントID 例: `550e8400-e29b-41d4-a716-446655440000`
- account (必須): string - アカウント名 例: `yamada.taro@example.com`
- account_kind (必須): string - アカウント種別 (選択肢: email, id_string)
- external_id (必須): string - 外部システムID 例: `user-12345`
- external_url (必須): string - アプリケーションのアカウントページURL 例: `https://app.example.com/users/12345`
- discovered_at (必須): string(date-time) - 検出日時(ISO8601) 例: `2024-01-01T00:00:00Z`
- last_login_at (必須): string(date-time) - 最終ログイン日時(ISO8601) 例: `2024-01-15T10:30:00Z`
- last_synced_at (必須): string(date-time) - 最終同期日時(ISO8601) 例: `2024-01-15T10:30:00Z`
- application (必須): object - アプリケーション
  - id (必須): string(uuid) - アプリケーションID 例: `550e8400-e29b-41d4-a716-446655440001`
  - name (必須): string - アプリケーション名 例: `Slack`
  - attributes (必須): array[object] - アプリケーションが持つカスタム属性の一覧（order 昇順）。標準アプリの場合は空配列。
カスタムアプリでは attributes ハッシュのキーとして title (および id) が利用可能。
- status (必須): object - ステータス
  - id (必須): string(uuid) - ステータスID 例: `550e8400-e29b-41d4-a716-446655440002`
  - name (必須): string - ステータス名 例: `有効`
- role (必須): object - ロール
  - id (必須): string(uuid) - ロールID 例: `550e8400-e29b-41d4-a716-446655440004`
  - name (必須): string - ロール名 例: `Admin`
- member (必須): object - 紐づくメンバー
  - id (必須): string(uuid) - メンバーID 例: `550e8400-e29b-41d4-a716-446655440003`
  - display_name (必須): string - 表示名 例: `山田 太郎`
- data (必須): object - アプリケーション固有のアカウント属性（コネクタにより構造が異なる）
- created_at (必須): string(date-time) - 作成日時(ISO8601) 例: `2024-01-01T00:00:00Z`
- updated_at (必須): string(date-time) - 更新日時(ISO8601) 例: `2024-01-15T10:30:00Z`

### PATCH /hub/it_management/application_accounts/{id}

操作: アカウント部分更新（β版）

説明: アカウントを部分的に更新します。 ##

注意点
- 指定されたパラメータのみが更新されます。

### パラメータ

| 名前 | 位置 | 必須 | 型 | 説明 |
|------|------|------|-----|------|
| freee-using-beta | header | はい | string | オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true) |
| id | path | はい | string(uuid) | アカウントID |

### リクエストボディ

(必須)

- company_id (任意): integer(int64) - 事業所ID 例: `1`
- account (任意): string - アカウント名 例: `yamada.taro@example.com`
- account_kind (任意): string - アカウント種別 (選択肢: email, id_string)
- external_id (任意): string - 外部システムID 例: `user-12345`
- external_url (任意): string - アプリケーションのアカウントページURL 例: `https://app.example.com/users/12345`
- application_account_status_id (任意): string(uuid) - ステータスID（同一アプリケーション内のものを指定） 例: `550e8400-e29b-41d4-a716-446655440002`
- application_account_role_id (任意): string(uuid) - ロールID（同一アプリケーション内のものを指定。null を指定するとロールを解除） 例: `550e8400-e29b-41d4-a716-446655440004`
- attributes (任意): object - アプリケーション固有のアカウント属性。キーは attribute の UUID または title（同一アプリ内で一意）のどちらでも指定可能。

### レスポンス (200)

アカウント部分更新レスポンス

- id (必須): string(uuid) - アカウントID 例: `550e8400-e29b-41d4-a716-446655440000`
- account (必須): string - アカウント名 例: `yamada.taro@example.com`
- account_kind (必須): string - アカウント種別 (選択肢: email, id_string)
- external_id (必須): string - 外部システムID 例: `user-12345`
- external_url (必須): string - アプリケーションのアカウントページURL 例: `https://app.example.com/users/12345`
- discovered_at (必須): string(date-time) - 検出日時(ISO8601) 例: `2024-01-01T00:00:00Z`
- last_login_at (必須): string(date-time) - 最終ログイン日時(ISO8601) 例: `2024-01-15T10:30:00Z`
- last_synced_at (必須): string(date-time) - 最終同期日時(ISO8601) 例: `2024-01-15T10:30:00Z`
- application (必須): object - アプリケーション
  - id (必須): string(uuid) - アプリケーションID 例: `550e8400-e29b-41d4-a716-446655440001`
  - name (必須): string - アプリケーション名 例: `Slack`
  - attributes (必須): array[object] - アプリケーションが持つカスタム属性の一覧（order 昇順）。標準アプリの場合は空配列。
カスタムアプリでは attributes ハッシュのキーとして title (および id) が利用可能。
- status (必須): object - ステータス
  - id (必須): string(uuid) - ステータスID 例: `550e8400-e29b-41d4-a716-446655440002`
  - name (必須): string - ステータス名 例: `有効`
- role (必須): object - ロール
  - id (必須): string(uuid) - ロールID 例: `550e8400-e29b-41d4-a716-446655440004`
  - name (必須): string - ロール名 例: `Admin`
- member (必須): object - 紐づくメンバー
  - id (必須): string(uuid) - メンバーID 例: `550e8400-e29b-41d4-a716-446655440003`
  - display_name (必須): string - 表示名 例: `山田 太郎`
- data (必須): object - アプリケーション固有のアカウント属性（コネクタにより構造が異なる）
- created_at (必須): string(date-time) - 作成日時(ISO8601) 例: `2024-01-01T00:00:00Z`
- updated_at (必須): string(date-time) - 更新日時(ISO8601) 例: `2024-01-15T10:30:00Z`

### DELETE /hub/it_management/application_accounts/{id}

操作: アカウント削除（β版）

説明: アカウントを削除します（ソフトデリート）。

### パラメータ

| 名前 | 位置 | 必須 | 型 | 説明 |
|------|------|------|-----|------|
| freee-using-beta | header | はい | string | オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true) |
| company_id | query | はい | integer(int64) | 事業所ID |
| id | path | はい | string(uuid) | アカウントID |

### レスポンス (204)

アカウント削除レスポンス



## 参考情報

- freee API公式ドキュメント: https://developer.freee.co.jp/docs
