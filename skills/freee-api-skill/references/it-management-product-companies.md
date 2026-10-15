# it_management_product_companies

product_companies

## GET /hub/it_management/product_companies — 会社一覧取得（β版）

IT管理 内で管理している会社の一覧をカーソルページネーションで取得します。 アプリの所属先や、テナント内の複数の会社を分けて管理するために利用します。 ##

注意点
- この API の「会社」は、IT管理で管理している会社を指します。freee の事業所 (`company_id`) とは別のものです。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- company_id*: integer(int64) - 事業所ID
- page_token: string - ページネーションのトークン
- page_size: integer(int32) - 1ページあたりの取得件数（デフォルト25、最大100）

### レスポンス

会社一覧取得レスポンス
- data*: array[object] - 会社のリスト
- next_page_token*: string - 次のページを取得するためのカーソルトークン。次ページがない場合はnull

## POST /hub/it_management/product_companies — 会社作成（β版）

会社を作成します。 ##

注意点
- この API の「会社」は、IT管理で管理している会社を指します。freee の事業所 (`company_id`) とは別のものです。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)

### リクエストボディ*

- company_id*: integer(int64) - 事業所ID 例: `1`
- name*: string - 会社名 例: `株式会社サンプル`

### レスポンス

会社作成レスポンス
- id*: string(uuid) - IT管理の会社の ID (freee の事業所 ID とは別)
- name*: string - 会社名
- default*: boolean - 既定会社かどうか (テナント内で 1 社のみ true)

## GET /hub/it_management/product_companies/{id} — 会社詳細取得（β版）

会社の詳細を取得します。 ##

注意点
- この API の「会社」は、IT管理で管理している会社を指します。freee の事業所 (`company_id`) とは別のものです。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- company_id*: integer(int64) - 事業所ID
- id* (path): string(uuid) - IT管理の会社の ID (freee の事業所 ID とは別)

### レスポンス

会社詳細取得レスポンス
- id*: string(uuid) - IT管理の会社の ID (freee の事業所 ID とは別)
- name*: string - 会社名
- default*: boolean - 既定会社かどうか (テナント内で 1 社のみ true)

## PATCH /hub/it_management/product_companies/{id} — 会社部分更新（β版）

会社を部分的に更新します。 ##

注意点
- この API の「会社」は、IT管理で管理している会社を指します。freee の事業所 (`company_id`) とは別のものです。 - 指定されたパラメーターのみが更新されます。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- id* (path): string(uuid) - IT管理の会社の ID (freee の事業所 ID とは別)

### リクエストボディ*

- company_id: integer(int64) - 事業所ID 例: `1`
- name: string - 会社名 例: `株式会社サンプル`

### レスポンス

会社部分更新レスポンス
- id*: string(uuid) - IT管理の会社の ID (freee の事業所 ID とは別)
- name*: string - 会社名
- default*: boolean - 既定会社かどうか (テナント内で 1 社のみ true)

## DELETE /hub/it_management/product_companies/{id} — 会社削除（β版）

会社を削除します。既定会社 (default = true) は削除できません。会社に紐づくアプリ・部署が残っている場合や、メンバーフィルターの条件で使われている場合も削除できません。 ##

注意点
- この API の「会社」は、IT管理で管理している会社を指します。freee の事業所 (`company_id`) とは別のものです。

### パラメータ

GET /hub/it_management/product_companies/{id} と同じ

### レスポンス

会社削除レスポンス
