# partner_management_orderer_task_line_items

partner_management_orderer_task_line_items

## GET /hub/partner_management/orderer/tasks/{task_id}/task_line_items — タスク品目一覧取得（β版）

指定したタスクに紐づくタスク品目を一覧取得する

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- company_id*: integer(int64) - freee事業所ID
- task_id* (path): integer(int32) - 取得対象のタスクID
- page_size: integer(int32) - 1ページあたりの取得件数（デフォルト20、最大100）
- page_token: string - カーソルトークン。前回レスポンスの next_page_token を指定する

### レスポンス

タスク品目一覧レスポンス
- data*: array[object] - タスク品目の一覧。タスク内の表示順で返す
- next_page_token*: string - 次ページのカーソルトークン。最終ページは null
