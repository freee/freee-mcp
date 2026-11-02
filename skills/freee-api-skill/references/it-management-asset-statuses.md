# it_management_asset_statuses

asset_statuses

## GET /hub/it_management/asset_statuses — 備品ステータス一覧取得（β版）

備品ステータスの一覧をカーソルページネーションで取得します。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- company_id*: integer(int64) - 事業所ID
- page_token: string - ページネーションのトークン
- page_size: integer(int32) - 1ページあたりの取得件数（デフォルト25、最大100）

### レスポンス

備品ステータス一覧取得レスポンス
- data*: array[object] - 備品ステータスのリスト
- next_page_token*: string - 次のページを取得するためのカーソルトークン。次ページがない場合はnull

## POST /hub/it_management/asset_statuses — 備品ステータス作成（β版）

備品ステータスを作成します。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)

### リクエストボディ*

- company_id*: integer(int64) - 事業所ID 例: `1`
- name*: string - 備品ステータス名 例: `使用中`
- color: string - 表示色 (HEXカラーコード) 例: `#4CAF50` (パターン: ^#[0-9A-Fa-f]{6}$)

### レスポンス

備品ステータス作成レスポンス
- id*: string(uuid) - 備品ステータスID
- name*: string - 備品ステータス名

## GET /hub/it_management/asset_statuses/{id} — 備品ステータス詳細取得（β版）

備品ステータスの詳細を取得します。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- company_id*: integer(int64) - 事業所ID
- id* (path): string(uuid) - 備品ステータスID

### レスポンス

備品ステータス詳細取得レスポンス
- id*: string(uuid) - 備品ステータスID
- name*: string - 備品ステータス名

## PATCH /hub/it_management/asset_statuses/{id} — 備品ステータス部分更新（β版）

備品ステータスを部分的に更新します。 ##

注意点
- 指定されたパラメーターのみが更新されます。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- id* (path): string(uuid) - 備品ステータスID

### リクエストボディ*

- company_id*: integer(int64) - 事業所ID 例: `1`
- name: string - 備品ステータス名 例: `使用中`
- color: string - 表示色 (HEXカラーコード) 例: `#4CAF50` (パターン: ^#[0-9A-Fa-f]{6}$)

### レスポンス

備品ステータス部分更新レスポンス
- id*: string(uuid) - 備品ステータスID
- name*: string - 備品ステータス名

## DELETE /hub/it_management/asset_statuses/{id} — 備品ステータス削除（β版）

備品ステータスを削除します。備品が紐付いているステータスは削除できません。

### パラメータ

GET /hub/it_management/asset_statuses/{id} と同じ

### レスポンス

備品ステータス削除レスポンス
