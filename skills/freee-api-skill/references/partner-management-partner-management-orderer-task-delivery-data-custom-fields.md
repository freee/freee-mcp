# partner_management_orderer_task_delivery_data_custom_fields

partner_management_orderer_task_delivery_data_custom_fields

## GET /hub/partner_management/orderer/tasks/{task_id}/delivery_data/custom_fields — タスク納品データのカスタム項目一覧取得（β版）

タスクの納品データに設定されたカスタム項目の一覧を取得する

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- company_id*: integer(int64) - freee事業所ID
- task_id* (path): integer(int32) - 取得対象のタスク（発注書）ID
- page_size: integer(int32) - 1ページあたりの取得件数（デフォルト20、最大100）
- page_token: string - カーソルトークン。前回レスポンスの next_page_token を指定する

### レスポンス

タスク納品データのカスタム項目一覧レスポンス
- data*: array[object] - 納品データのカスタム項目一覧
- next_page_token*: string - 次ページのカーソルトークン。最終ページは null
