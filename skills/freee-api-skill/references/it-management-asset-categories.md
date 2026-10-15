# it_management_asset_categories

asset_categories

## GET /hub/it_management/asset_categories — 備品種別一覧取得（β版）

備品種別の一覧をカーソルページネーションで取得します。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- company_id*: integer(int64) - 事業所ID
- page_token: string - ページネーションのトークン
- page_size: integer(int32) - 1ページあたりの取得件数（デフォルト25、最大100）

### レスポンス

備品種別一覧取得レスポンス
- data*: array[object] - 備品種別のリスト
- next_page_token*: string - 次のページを取得するためのカーソルトークン。次ページがない場合はnull

## POST /hub/it_management/asset_categories — 備品種別作成（β版）

備品種別を作成します。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)

### リクエストボディ*

- company_id*: integer(int64) - 事業所ID 例: `1`
- name*: string - 備品種別名 例: `ノートPC`

### レスポンス

備品種別作成レスポンス
- id*: string(uuid) - 備品種別ID
- name*: string - 備品種別名
- asset_attributes*: array[object] - この備品種別に紐づく備品属性のリスト (表示順)。備品の作成・更新で asset_attribute_values に指定できるのはこれらの備品属性です

## GET /hub/it_management/asset_categories/{id} — 備品種別詳細取得（β版）

備品種別の詳細を取得します。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- company_id*: integer(int64) - 事業所ID
- id* (path): string(uuid) - 備品種別ID

### レスポンス

備品種別詳細取得レスポンス
- id*: string(uuid) - 備品種別ID
- name*: string - 備品種別名
- asset_attributes*: array[object] - この備品種別に紐づく備品属性のリスト (表示順)。備品の作成・更新で asset_attribute_values に指定できるのはこれらの備品属性です

## PATCH /hub/it_management/asset_categories/{id} — 備品種別部分更新（β版）

備品種別を部分的に更新します。 ##

注意点
- 指定されたパラメーターのみが更新されます。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- id* (path): string(uuid) - 備品種別ID

### リクエストボディ*

- company_id: integer(int64) - 事業所ID 例: `1`
- name: string - 備品種別名 例: `ノートPC`

### レスポンス

備品種別部分更新レスポンス
- id*: string(uuid) - 備品種別ID
- name*: string - 備品種別名
- asset_attributes*: array[object] - この備品種別に紐づく備品属性のリスト (表示順)。備品の作成・更新で asset_attribute_values に指定できるのはこれらの備品属性です

## DELETE /hub/it_management/asset_categories/{id} — 備品種別削除（β版）

備品種別を削除します。備品が紐付いている、または system-managed な種別は削除できません。

### パラメータ

GET /hub/it_management/asset_categories/{id} と同じ

### レスポンス

備品種別削除レスポンス
