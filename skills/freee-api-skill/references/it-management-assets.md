# it_management_assets

## 概要

assets

## エンドポイント一覧

### GET /hub/it_management/assets

操作: 備品一覧取得（β版）

説明: 備品の一覧をカーソルページネーションで取得します。

### パラメータ

| 名前 | 位置 | 必須 | 型 | 説明 |
|------|------|------|-----|------|
| freee-using-beta | header | はい | string | オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true) |
| company_id | query | はい | integer(int64) | 事業所ID |
| page_token | query | いいえ | string | ページネーションのトークン |
| page_size | query | いいえ | integer(int32) | 1ページあたりの取得件数（デフォルト25、最大100） |
| keyword | query | いいえ | string | キーワード検索（name, asset_number, serial_number に部分一致） |
| asset_status_id | query | いいえ | string(uuid) | ステータスIDでフィルタ |
| asset_category_id | query | いいえ | string(uuid) | 種別IDでフィルタ |
| member_id | query | いいえ | string(uuid) | 利用者のメンバーIDでフィルタ |

### レスポンス (200)

備品一覧取得レスポンス

- data (必須): array[object] - 備品のリスト
  配列の要素:
    - id (必須): string(uuid) - 備品ID 例: `550e8400-e29b-41d4-a716-446655440000`
    - asset_number (必須): string - 資産管理番号 例: `A-001`
    - name (必須): string - 備品名 例: `MacBook Pro 14inch`
    - serial_number (必須): string - シリアル番号 例: `C02X1234ABCD`
    - external_id (必須): string - 外部システムID 例: `EXT-001`
    - last_scanned_at (必須): string(date-time) - 最終スキャン日時(ISO8601) 例: `2024-01-15T10:30:00Z`
    - asset_status (必須): object - ステータス
    - asset_category (必須): object - 種別
    - current_member (必須): object - 現在の利用者
    - created_at (必須): string(date-time) - 作成日時(ISO8601) 例: `2024-01-01T00:00:00Z`
    - updated_at (必須): string(date-time) - 更新日時(ISO8601) 例: `2024-01-15T10:30:00Z`
- next_page_token (必須): string - 次のページを取得するためのカーソルトークン。次ページがない場合はnull 例: `eyJvcmRlciI6W10sImlkIjoiYWJjIn0`

### POST /hub/it_management/assets

操作: 備品作成（β版）

説明: 備品を作成します。

### パラメータ

| 名前 | 位置 | 必須 | 型 | 説明 |
|------|------|------|-----|------|
| freee-using-beta | header | はい | string | オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true) |

### リクエストボディ

(必須)

- company_id (必須): integer(int64) - 事業所ID 例: `1`
- name (必須): string - 備品名 例: `MacBook Pro 14inch`
- asset_number (任意): string - 資産管理番号（チーム内一意） 例: `A-001`
- serial_number (任意): string - シリアル番号（チーム内一意） 例: `C02X1234ABCD`
- external_id (任意): string - 外部システムID（チーム内一意） 例: `EXT-001`
- asset_status_id (必須): string(uuid) - ステータスID 例: `550e8400-e29b-41d4-a716-446655440001`
- asset_category_id (必須): string(uuid) - 種別ID 例: `550e8400-e29b-41d4-a716-446655440002`

### レスポンス (201)

備品作成レスポンス

- id (必須): string(uuid) - 備品ID 例: `550e8400-e29b-41d4-a716-446655440000`
- asset_number (必須): string - 資産管理番号 例: `A-001`
- name (必須): string - 備品名 例: `MacBook Pro 14inch`
- serial_number (必須): string - シリアル番号 例: `C02X1234ABCD`
- external_id (必須): string - 外部システムID 例: `EXT-001`
- last_scanned_at (必須): string(date-time) - 最終スキャン日時(ISO8601) 例: `2024-01-15T10:30:00Z`
- asset_status (必須): object - ステータス
  - id (必須): string(uuid) - ステータスID 例: `550e8400-e29b-41d4-a716-446655440001`
  - name (必須): string - ステータス名 例: `使用中`
- asset_category (必須): object - 種別
  - id (必須): string(uuid) - 種別ID 例: `550e8400-e29b-41d4-a716-446655440002`
  - name (必須): string - 種別名 例: `ノートPC`
- current_member (必須): object - 現在の利用者
  - id (必須): string(uuid) - メンバーID 例: `550e8400-e29b-41d4-a716-446655440003`
  - display_name (必須): string - 表示名 例: `山田 太郎`
- created_at (必須): string(date-time) - 作成日時(ISO8601) 例: `2024-01-01T00:00:00Z`
- updated_at (必須): string(date-time) - 更新日時(ISO8601) 例: `2024-01-15T10:30:00Z`

### GET /hub/it_management/assets/{id}

操作: 備品詳細取得（β版）

説明: 備品の詳細を取得します。

### パラメータ

| 名前 | 位置 | 必須 | 型 | 説明 |
|------|------|------|-----|------|
| freee-using-beta | header | はい | string | オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true) |
| company_id | query | はい | integer(int64) | 事業所ID |
| id | path | はい | string(uuid) | 備品ID |

### レスポンス (200)

備品詳細取得レスポンス

- id (必須): string(uuid) - 備品ID 例: `550e8400-e29b-41d4-a716-446655440000`
- asset_number (必須): string - 資産管理番号 例: `A-001`
- name (必須): string - 備品名 例: `MacBook Pro 14inch`
- serial_number (必須): string - シリアル番号 例: `C02X1234ABCD`
- external_id (必須): string - 外部システムID 例: `EXT-001`
- last_scanned_at (必須): string(date-time) - 最終スキャン日時(ISO8601) 例: `2024-01-15T10:30:00Z`
- asset_status (必須): object - ステータス
  - id (必須): string(uuid) - ステータスID 例: `550e8400-e29b-41d4-a716-446655440001`
  - name (必須): string - ステータス名 例: `使用中`
- asset_category (必須): object - 種別
  - id (必須): string(uuid) - 種別ID 例: `550e8400-e29b-41d4-a716-446655440002`
  - name (必須): string - 種別名 例: `ノートPC`
- current_member (必須): object - 現在の利用者
  - id (必須): string(uuid) - メンバーID 例: `550e8400-e29b-41d4-a716-446655440003`
  - display_name (必須): string - 表示名 例: `山田 太郎`
- created_at (必須): string(date-time) - 作成日時(ISO8601) 例: `2024-01-01T00:00:00Z`
- updated_at (必須): string(date-time) - 更新日時(ISO8601) 例: `2024-01-15T10:30:00Z`

### PATCH /hub/it_management/assets/{id}

操作: 備品部分更新（β版）

説明: 備品を部分的に更新します。 ##

注意点
- 指定されたパラメータのみが更新されます。

### パラメータ

| 名前 | 位置 | 必須 | 型 | 説明 |
|------|------|------|-----|------|
| freee-using-beta | header | はい | string | オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true) |
| id | path | はい | string(uuid) | 備品ID |

### リクエストボディ

(必須)

- company_id (任意): integer(int64) - 事業所ID 例: `1`
- name (任意): string - 備品名 例: `MacBook Pro 14inch`
- asset_number (任意): string - 資産管理番号（チーム内一意） 例: `A-001`
- serial_number (任意): string - シリアル番号（チーム内一意） 例: `C02X1234ABCD`
- external_id (任意): string - 外部システムID（チーム内一意） 例: `EXT-001`
- asset_status_id (任意): string(uuid) - ステータスID 例: `550e8400-e29b-41d4-a716-446655440001`
- asset_category_id (任意): string(uuid) - 種別ID 例: `550e8400-e29b-41d4-a716-446655440002`

### レスポンス (200)

備品部分更新レスポンス

- id (必須): string(uuid) - 備品ID 例: `550e8400-e29b-41d4-a716-446655440000`
- asset_number (必須): string - 資産管理番号 例: `A-001`
- name (必須): string - 備品名 例: `MacBook Pro 14inch`
- serial_number (必須): string - シリアル番号 例: `C02X1234ABCD`
- external_id (必須): string - 外部システムID 例: `EXT-001`
- last_scanned_at (必須): string(date-time) - 最終スキャン日時(ISO8601) 例: `2024-01-15T10:30:00Z`
- asset_status (必須): object - ステータス
  - id (必須): string(uuid) - ステータスID 例: `550e8400-e29b-41d4-a716-446655440001`
  - name (必須): string - ステータス名 例: `使用中`
- asset_category (必須): object - 種別
  - id (必須): string(uuid) - 種別ID 例: `550e8400-e29b-41d4-a716-446655440002`
  - name (必須): string - 種別名 例: `ノートPC`
- current_member (必須): object - 現在の利用者
  - id (必須): string(uuid) - メンバーID 例: `550e8400-e29b-41d4-a716-446655440003`
  - display_name (必須): string - 表示名 例: `山田 太郎`
- created_at (必須): string(date-time) - 作成日時(ISO8601) 例: `2024-01-01T00:00:00Z`
- updated_at (必須): string(date-time) - 更新日時(ISO8601) 例: `2024-01-15T10:30:00Z`

### DELETE /hub/it_management/assets/{id}

操作: 備品削除（β版）

説明: 備品を削除します。

### パラメータ

| 名前 | 位置 | 必須 | 型 | 説明 |
|------|------|------|-----|------|
| freee-using-beta | header | はい | string | オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true) |
| company_id | query | はい | integer(int64) | 事業所ID |
| id | path | はい | string(uuid) | 備品ID |

### レスポンス (204)

備品削除レスポンス



## 参考情報

- freee API公式ドキュメント: https://developer.freee.co.jp/docs
