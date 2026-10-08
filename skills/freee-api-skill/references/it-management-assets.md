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

### リクエストボディ*

- company_id*: integer(int64) - 事業所ID 例: `1`
- name*: string - 備品名 例: `MacBook Pro 14inch`
- asset_number: string - 資産管理番号（チーム内一意） 例: `A-001`
- serial_number: string - シリアル番号（チーム内一意） 例: `C02X1234ABCD`
- external_id: string - 外部システムID（チーム内一意） 例: `EXT-001`
- asset_status_id*: string(uuid) - ステータスID 例: `550e8400-e29b-41d4-a716-446655440001`
- asset_category_id*: string(uuid) - 種別ID 例: `550e8400-e29b-41d4-a716-446655440002`
- asset_location_id: string(uuid) - 保管場所ID 例: `550e8400-e29b-41d4-a716-446655440004`
- asset_attribute_values: array[object] - 備品属性の値のリスト。asset_attribute_id には、指定した種別に紐づく備品属性を指定します
  配列の要素:
    - asset_attribute_id*: string(uuid) - 備品属性ID 例: `550e8400-e29b-41d4-a716-446655440005`
    - string_value: string - 文字列の値。入力種別が string / text / select の備品属性で使用する 例: `Apple M3`
    - integer_value: integer(int32) - 整数の値。入力種別が integer の備品属性で使用する 例: `512`
    - date_value: string(date) - 日付の値(yyyy-mm-dd)。入力種別が date の備品属性で使用する 例: `2024-04-01`

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
- asset_location*: object - 現在の保管場所。未設定の場合は null
- current_member*: object - 現在の利用者
- asset_attribute_values*: array[object] - 備品属性の値のリスト
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
- asset_location*: object - 現在の保管場所。未設定の場合は null
- current_member*: object - 現在の利用者
- asset_attribute_values*: array[object] - 備品属性の値のリスト
- created_at*: string(date-time) - 作成日時(ISO8601)
- updated_at*: string(date-time) - 更新日時(ISO8601)

## PATCH /hub/it_management/assets/{id} — 備品部分更新（β版）

備品を部分的に更新します。 ##

注意点
- 指定されたパラメータのみが更新されます。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- id* (path): string(uuid) - 備品ID

### リクエストボディ*

- company_id: integer(int64) - 事業所ID 例: `1`
- name: string - 備品名 例: `MacBook Pro 14inch`
- asset_number: string - 資産管理番号（チーム内一意） 例: `A-001`
- serial_number: string - シリアル番号（チーム内一意） 例: `C02X1234ABCD`
- external_id: string - 外部システムID（チーム内一意） 例: `EXT-001`
- asset_status_id: string(uuid) - ステータスID 例: `550e8400-e29b-41d4-a716-446655440001`
- asset_category_id: string(uuid) - 種別ID 例: `550e8400-e29b-41d4-a716-446655440002`
- asset_location_id: string(uuid) - 保管場所ID。null を指定すると保管場所の紐付けを解除します。省略した場合は現在の紐付けを維持します 例: `550e8400-e29b-41d4-a716-446655440004`
- asset_attribute_values: array[object] - 備品属性の値のリスト。指定した備品属性の値だけを更新し、指定しなかった備品属性の値は維持します。省略した場合は値を変更しません。asset_attribute_id には、備品の種別に紐づく備品属性を指定します
  配列の要素:
    - asset_attribute_id*: string(uuid) - 備品属性ID 例: `550e8400-e29b-41d4-a716-446655440005`
    - string_value: string - 文字列の値。入力種別が string / text / select の備品属性で使用する 例: `Apple M3`
    - integer_value: integer(int32) - 整数の値。入力種別が integer の備品属性で使用する 例: `512`
    - date_value: string(date) - 日付の値(yyyy-mm-dd)。入力種別が date の備品属性で使用する 例: `2024-04-01`

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
- asset_location*: object - 現在の保管場所。未設定の場合は null
- current_member*: object - 現在の利用者
- asset_attribute_values*: array[object] - 備品属性の値のリスト
- created_at*: string(date-time) - 作成日時(ISO8601)
- updated_at*: string(date-time) - 更新日時(ISO8601)

## DELETE /hub/it_management/assets/{id} — 備品削除（β版）

備品を削除します。

### パラメータ

GET /hub/it_management/assets/{id} と同じ

### レスポンス

備品削除レスポンス
