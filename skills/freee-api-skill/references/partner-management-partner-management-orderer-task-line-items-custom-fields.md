# partner_management_orderer_task_line_items_custom_fields

partner_management_orderer_task_line_items_custom_fields

## GET /hub/partner_management/orderer/task_line_items/{task_line_item_id}/custom_fields — タスク品目のカスタム項目一覧取得（β版）

指定タスク品目のカスタム項目の一覧を取得する

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- company_id*: integer(int64) - freee事業所ID
- task_line_item_id* (path): integer(int64) - 取得対象のタスク品目 ID
- page_size: integer(int32) - 1ページあたりの取得件数（デフォルト20、最大100）
- page_token: string - カーソルトークン。前回レスポンスの next_page_token を指定する

### レスポンス

タスク品目のカスタム項目一覧レスポンス
- data*: array[object] - タスク品目カスタム項目一覧
- next_page_token*: string - 次ページのカーソルトークン。最終ページは null
