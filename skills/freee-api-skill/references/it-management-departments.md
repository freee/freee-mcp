# it_management_departments

departments

## GET /hub/it_management/departments — 部署一覧取得（β版）

部署の一覧をカーソルページネーションで取得します。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- company_id*: integer(int64) - 事業所ID
- page_token: string - ページネーションのトークン
- page_size: integer(int32) - 1ページあたりの取得件数（デフォルト25、最大100）
- keyword: string - キーワード検索（部署名に部分一致）
- code: string - 部署コードでフィルター（完全一致）

### レスポンス

部署一覧取得レスポンス
- data*: array[object] - 部署のリスト
- next_page_token*: string - 次のページを取得するためのカーソルトークン。次ページがない場合はnull

## POST /hub/it_management/departments — 部署作成（β版）

部署を作成します。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)

### リクエストボディ*

- company_id*: integer(int64) - 事業所ID 例: `1`
- name*: string - 部署名 例: `開発部`
- code: string - 部署コード 例: `DEV`
- product_company_id: string(uuid) - 所属会社 (IT管理の会社) の ID。会社一覧取得 (GET /hub/it_management/product_companies) で取得できます。省略すると既定の会社 (default = true) に作成します。親部署を指定する場合は、親部署と同じ会社を指定してください。存在しない ID を指定すると 422 になります (エラーの invalid_fields では company_id と表示されます) 例: `550e8400-e29b-41d4-a716-446655440002`
- parent_id: string(uuid) - 親部署ID 例: `550e8400-e29b-41d4-a716-446655440001`
- manager_ids: array[string] - マネージャーのメンバーID (最大 1 名) 例: `["550e8400-e29b-41d4-a716-446655440003"]`

### レスポンス

部署作成レスポンス
- id*: string(uuid) - 部署ID
- name*: string - 部署名
- code*: string - 部署コード
- parent*: object - 親部署
- product_company*: object - 所属会社 (IT管理の会社)
- managers*: array[object] - マネージャー一覧
- created_at*: string(date-time) - 作成日時(ISO8601)
- updated_at*: string(date-time) - 更新日時(ISO8601)

## GET /hub/it_management/departments/{id} — 部署詳細取得（β版）

部署の詳細を取得します。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- company_id*: integer(int64) - 事業所ID
- id* (path): string(uuid) - 部署ID

### レスポンス

部署詳細取得レスポンス
- id*: string(uuid) - 部署ID
- name*: string - 部署名
- code*: string - 部署コード
- parent*: object - 親部署
- product_company*: object - 所属会社 (IT管理の会社)
- managers*: array[object] - マネージャー一覧
- created_at*: string(date-time) - 作成日時(ISO8601)
- updated_at*: string(date-time) - 更新日時(ISO8601)

## PATCH /hub/it_management/departments/{id} — 部署部分更新（β版）

部署を部分的に更新します。 ##

注意点
- 指定されたパラメーターのみが更新されます。 - 所属会社 (product_company) は変更できません。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- id* (path): string(uuid) - 部署ID

### リクエストボディ*

- company_id: integer(int64) - 事業所ID 例: `1`
- name: string - 部署名 例: `開発部`
- code: string - 部署コード 例: `DEV`
- parent_id: string(uuid) - 親部署ID 例: `550e8400-e29b-41d4-a716-446655440001`
- manager_ids: array[string] - マネージャーのメンバーID (最大 1 名) 例: `["550e8400-e29b-41d4-a716-446655440003"]`

### レスポンス

部署部分更新レスポンス
- id*: string(uuid) - 部署ID
- name*: string - 部署名
- code*: string - 部署コード
- parent*: object - 親部署
- product_company*: object - 所属会社 (IT管理の会社)
- managers*: array[object] - マネージャー一覧
- created_at*: string(date-time) - 作成日時(ISO8601)
- updated_at*: string(date-time) - 更新日時(ISO8601)

## DELETE /hub/it_management/departments/{id} — 部署削除（β版）

部署を削除します。子部署が存在する、または利用中の場合は削除できません。

### パラメータ

GET /hub/it_management/departments/{id} と同じ

### レスポンス

部署削除レスポンス
