# it_management_assets

assets

## GET /hub/it_management/assets — 備品一覧取得（β版）

備品の一覧をカーソルページネーションで取得します。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- company_id*: integer(int64) - 事業所ID
- page_token: string - ページネーションのトークン
- page_size: integer(int32) - 1ページあたりの取得件数（デフォルト25、最大100）
- keyword: string - キーワード検索（name, asset_number, serial_number に部分一致）
- asset_status_id: string(uuid) - ステータスIDでフィルタ
- asset_category_id: string(uuid) - 種別IDでフィルタ
- member_id: string(uuid) - 利用者のメンバーIDでフィルタ

### レスポンス

備品一覧取得レスポンス
- data*: array[object] - 備品のリスト
- next_page_token*: string - 次のページを取得するためのカーソルトークン。次ページがない場合はnull

## POST /hub/it_management/assets — 備品作成（β版）

備品を作成します。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)

### リクエストボディ

- company_id*: integer(int64) - 事業所ID 例: `1`
- name*: string - 備品名 例: `MacBook Pro 14inch`
- asset_number: string - 資産管理番号（チーム内一意） 例: `A-001`
- serial_number: string - シリアル番号（チーム内一意） 例: `C02X1234ABCD`
- external_id: string - 外部システムID（チーム内一意） 例: `EXT-001`
- asset_status_id*: string(uuid) - ステータスID 例: `550e8400-e29b-41d4-a716-446655440001`
- asset_category_id*: string(uuid) - 種別ID 例: `550e8400-e29b-41d4-a716-446655440002`

### レスポンス

備品作成レスポンス
- id*: string(uuid) - 備品ID
- asset_number*: string - 資産管理番号
- name*: string - 備品名
- serial_number*: string - シリアル番号
- external_id*: string - 外部システムID
- last_scanned_at*: string(date-time) - 最終スキャン日時(ISO8601)
- asset_status*: object - ステータス
- asset_category*: object - 種別
- current_member*: object - 現在の利用者
- created_at*: string(date-time) - 作成日時(ISO8601)
- updated_at*: string(date-time) - 更新日時(ISO8601)

## GET /hub/it_management/assets/{id} — 備品詳細取得（β版）

備品の詳細を取得します。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- company_id*: integer(int64) - 事業所ID
- id* (path): string(uuid) - 備品ID

### レスポンス

備品詳細取得レスポンス
- id*: string(uuid) - 備品ID
- asset_number*: string - 資産管理番号
- name*: string - 備品名
- serial_number*: string - シリアル番号
- external_id*: string - 外部システムID
- last_scanned_at*: string(date-time) - 最終スキャン日時(ISO8601)
- asset_status*: object - ステータス
- asset_category*: object - 種別
- current_member*: object - 現在の利用者
- created_at*: string(date-time) - 作成日時(ISO8601)
- updated_at*: string(date-time) - 更新日時(ISO8601)

## PATCH /hub/it_management/assets/{id} — 備品部分更新（β版）

備品を部分的に更新します。 ##

注意点
- 指定されたパラメータのみが更新されます。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- id* (path): string(uuid) - 備品ID

### リクエストボディ

- company_id: integer(int64) - 事業所ID 例: `1`
- name: string - 備品名 例: `MacBook Pro 14inch`
- asset_number: string - 資産管理番号（チーム内一意） 例: `A-001`
- serial_number: string - シリアル番号（チーム内一意） 例: `C02X1234ABCD`
- external_id: string - 外部システムID（チーム内一意） 例: `EXT-001`
- asset_status_id: string(uuid) - ステータスID 例: `550e8400-e29b-41d4-a716-446655440001`
- asset_category_id: string(uuid) - 種別ID 例: `550e8400-e29b-41d4-a716-446655440002`

### レスポンス

備品部分更新レスポンス
- id*: string(uuid) - 備品ID
- asset_number*: string - 資産管理番号
- name*: string - 備品名
- serial_number*: string - シリアル番号
- external_id*: string - 外部システムID
- last_scanned_at*: string(date-time) - 最終スキャン日時(ISO8601)
- asset_status*: object - ステータス
- asset_category*: object - 種別
- current_member*: object - 現在の利用者
- created_at*: string(date-time) - 作成日時(ISO8601)
- updated_at*: string(date-time) - 更新日時(ISO8601)

## DELETE /hub/it_management/assets/{id} — 備品削除（β版）

備品を削除します。

### パラメータ

GET /hub/it_management/assets/{id} と同じ

### レスポンス

備品削除レスポンス
