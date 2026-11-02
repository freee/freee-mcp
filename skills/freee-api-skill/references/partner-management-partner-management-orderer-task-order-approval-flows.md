# partner_management_orderer_task_order_approval_flows

partner_management_orderer_task_order_approval_flows

## GET /hub/partner_management/orderer/task_order/approval_flows/{id} — 承認フロー詳細取得（β版）

タスクの発注承認フローを 1 件取得する。取得できるのはタスクを閲覧できる企業ユーザー。検収承認と請求書の承認フローは対象外

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- company_id*: integer(int64) - freee事業所ID
- id* (path): integer(int64) - 取得対象の承認フロー ID。タスク詳細取得 API の task_order_approval_flow_id

### レスポンス

承認フロー詳細レスポンス
- id*: integer(int64) - 承認フロー ID
- task_id*: integer(int32) - タスク ID
- name*: string - フロー名。申請前は `未定`。初回の申請時にプロジェクトに設定された承認フローの名前が入る
- status*: string - 発注承認のステータス (unrequested: 未申請, requested: 申請中, accepted: 承認, rejected: 差し戻し)
- steps*: array[object] - 承認フローのステップ。申請前は空配列

## POST /hub/partner_management/orderer/task_order/approval_flows/{approval_flow_id}/request — 発注承認の申請（β版）

タスクの発注承認を申請する。承認フローを申請中にし、最初のステップの承認者に通知する。申請できるのはタスクの担当者で、タスクが下書きかつ発注承認が未申請または差し戻しのとき。検収承認と請求書の承認フローは対象外

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- approval_flow_id* (path): integer(int64) - 申請する承認フローの ID。タスク詳細取得 API の task_order_approval_flow_id

### リクエストボディ*

- company_id*: integer(int64) - freee事業所ID 例: `1`
- comment: string - コメント。最初のステップの承認者に社内コメントとして通知される。社内コメントの投稿制限が有効な企業では、空でない値を送ると 422 になる 例: `ご確認をお願いします`

### レスポンス

発注承認の申請レスポンス
- id*: integer(int64) - 承認フロー ID
- task_id*: integer(int32) - タスク ID
- name*: string - フロー名。申請前は `未定`。初回の申請時にプロジェクトに設定された承認フローの名前が入る
- status*: string - 発注承認のステータス (unrequested: 未申請, requested: 申請中, accepted: 承認, rejected: 差し戻し)
- steps*: array[object] - 承認フローのステップ。申請前は空配列
