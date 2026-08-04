# Purchase requests

購買申請

## GET /api/1/purchase_requests — 購買申請一覧の取得

概要 指定した事業所の購買申請一覧を取得する 注意点

### パラメータ

- company_id*: integer(int64) - 事業所ID
- limit: integer(int64) - 1ページあたりの取得件数（20, 50, 100, 200, 500）
- offset: integer(int64) - 取得開始位置（0から始まる）

### レスポンス

- purchase_requests*: array[object]
- total_count: integer(int64) - 検索結果の総件数

## POST /api/1/purchase_requests — 購買申請の作成

概要 指定した事業所の購買申請を作成する

### リクエストボディ

- company_id*: integer(int64) - 事業所ID 例: `1` (最小: 1)
- purchase_request_form_id*: integer(int64) - 購買申請の申請フォームID 例: `1` (最小: 1)
- status*: string - 申請ステータス

  draft を指定した時は下書きで購買申請を作成します。

  in_progress を指定した時は申請中で購買申請を作成します。 (選択肢: draft, in_progress) 例: `draft`
- applicant_group_id: integer(int64) - 申請者グループID 例: `1` (最小: 1)
- title: string - 申請タイトル 例: `大阪出張`
- description: string - 申請の説明 例: `出張に伴う備品購入`
- occurrence_start_date: string - 発生開始日 (yyyy-mm-dd) 例: `2019-12-17`
- occurrence_end_date: string - 発生終了日 (yyyy-mm-dd) 例: `2019-12-20`
- approval_flow_route_id: integer(int64) - 申請経路ID 例: `1` (最小: 1)
- approval_flow_approver_id: integer(int64) - 申請経路の承認者ユーザーID 例: `1` (最小: 1)
- approval_flow_group_id: integer(int64) - 申請経路の承認グループID 例: `1` (最小: 1)
- observer_user_ids: array[integer] - 閲覧者のユーザーID
- parent_id: integer(int64) - 親申請ID 例: `1` (最小: 1)
- parent_type: string - 親申請の種別 例: `PurchaseRequest`
- resubmission_from_purchase_request_id: integer(int64) - 再決裁元の購買申請ID 例: `1` (最小: 1)
- purchase_request_lines: array[object] - 購買申請の項目行一覧（配列）
  配列の要素:
    - line_order: integer(int64) - 行番号 例: `0` (最小: 0)
    - amount*: integer(int64) - 金額 例: `1000`
    - content: string - 内容 例: `備品購入`
    - selected_payment_methods: array[string] - 選択された支払方法
    - receipt_ids: array[integer] - ファイルボックス（証憑ファイル）ID（配列）
    - receipt_field_values: array[object] - ファイル添付項目の値一覧（配列）
    - section_id: integer(int64) - 部門ID 例: `1` (最小: 1)
    - partner_id: integer(int64) - 取引先ID 例: `1` (最小: 1)
    - item_id: integer(int64) - 品目ID 例: `1` (最小: 1)
    - tag_ids: array[integer] - メモタグID（配列）
    - segment_1_tag_id: integer(int64) - セグメント1タグID 例: `1` (最小: 1)
    - segment_2_tag_id: integer(int64) - セグメント2タグID 例: `1` (最小: 1)
    - segment_3_tag_id: integer(int64) - セグメント3タグID 例: `1` (最小: 1)
    - scheduled_purchase_date: string - 購入予定日 (yyyy-mm-dd) 例: `2019-12-17`
    - scheduled_purchase_end_date: string - 購入予定終了日 (yyyy-mm-dd) 例: `2019-12-20`
- purchase_request_custom_values: array[object] - カスタム項目の値一覧（配列）
  配列の要素:
    - id: integer(int64) - カスタム項目値ID 例: `1` (最小: 1)
    - custom_form_part_id*: integer(int64) - カスタムフォーム項目ID 例: `1` (最小: 1)
    - json_value: object - カスタム項目の値(項目種別により形式が異なる)

### レスポンス

- purchase_request*: object

## GET /api/1/purchase_requests/{id} — 購買申請の取得

概要 指定した事業所の購買申請を取得する

### パラメータ

- id* (path): integer(int64) - 購買申請ID
- company_id*: integer(int64) - 事業所ID

### レスポンス

POST /api/1/purchase_requests と同じ

## PUT /api/1/purchase_requests/{id} — 購買申請の更新

概要 指定した事業所の購買申請を更新する

### パラメータ

- id* (path): integer(int64) - 購買申請ID

### リクエストボディ

- company_id*: integer(int64) - 事業所ID 例: `1` (最小: 1)
- purchase_request_form_id*: integer(int64) - 購買申請の申請フォームID 例: `1` (最小: 1)
- status*: string - 申請ステータス

  draft を指定した時は下書きで購買申請を更新します。

  in_progress を指定した時は申請中で購買申請を更新します。 (選択肢: draft, in_progress) 例: `draft`
- applicant_group_id: integer(int64) - 申請者グループID 例: `1` (最小: 1)
- title: string - 申請タイトル 例: `大阪出張`
- description: string - 申請の説明 例: `出張に伴う備品購入`
- occurrence_start_date: string - 発生開始日 (yyyy-mm-dd) 例: `2019-12-17`
- occurrence_end_date: string - 発生終了日 (yyyy-mm-dd) 例: `2019-12-20`
- approval_flow_route_id: integer(int64) - 申請経路ID 例: `1` (最小: 1)
- approval_flow_approver_id: integer(int64) - 申請経路の承認者ユーザーID 例: `1` (最小: 1)
- approval_flow_group_id: integer(int64) - 申請経路の承認グループID 例: `1` (最小: 1)
- purchase_request_lines: array[object] - 購買申請の項目行一覧（配列）
  配列の要素:
    - id: integer(int64) - 購買申請の項目行ID（新規行の場合は指定しない） 例: `1` (最小: 1)
    - line_order: integer(int64) - 行番号 例: `0` (最小: 0)
    - amount*: integer(int64) - 金額 例: `1000`
    - content: string - 内容 例: `備品購入`
    - selected_payment_methods: array[string] - 選択された支払方法
    - receipt_ids: array[integer] - ファイルボックス（証憑ファイル）ID（配列）
    - receipt_field_values: array[object] - ファイル添付項目の値一覧（配列）
    - section_id: integer(int64) - 部門ID 例: `1` (最小: 1)
    - partner_id: integer(int64) - 取引先ID 例: `1` (最小: 1)
    - item_id: integer(int64) - 品目ID 例: `1` (最小: 1)
    - tag_ids: array[integer] - メモタグID（配列）
    - segment_1_tag_id: integer(int64) - セグメント1タグID 例: `1` (最小: 1)
    - segment_2_tag_id: integer(int64) - セグメント2タグID 例: `1` (最小: 1)
    - segment_3_tag_id: integer(int64) - セグメント3タグID 例: `1` (最小: 1)
    - scheduled_purchase_date: string - 購入予定日 (yyyy-mm-dd) 例: `2019-12-17`
    - scheduled_purchase_end_date: string - 購入予定終了日 (yyyy-mm-dd) 例: `2019-12-20`
- purchase_request_custom_values: array[object] - カスタム項目の値一覧（配列）
  配列の要素:
    - id: integer(int64) - カスタム項目値ID 例: `1` (最小: 1)
    - custom_form_part_id*: integer(int64) - カスタムフォーム項目ID 例: `1` (最小: 1)
    - json_value: object - カスタム項目の値(項目種別により形式が異なる)

### レスポンス

POST /api/1/purchase_requests と同じ

## DELETE /api/1/purchase_requests/{id} — 購買申請の削除

概要 指定した事業所の購買申請を削除する

### パラメータ

GET /api/1/purchase_requests/{id} と同じ

## GET /api/1/purchase_requests/forms — 購買申請の申請フォーム一覧の取得

概要 指定した事業所の購買申請の申請フォーム一覧を取得する 注意点

### パラメータ

- company_id*: integer(int64) - 事業所ID
- status: string - ステータス(draft: 申請で使用しない、active: 申請で使用する、deleted: 削除済み)。未指定の場合はすべてのステータスの申請フォームを返します。 (選択肢: draft, active, deleted)
- limit: integer(int64) - 1ページあたりの取得件数（1〜500）
- offset: integer(int64) - 取得開始位置（0から始まる）

### レスポンス

- total_count*: integer(int64) - 検索条件に合致する申請フォームの総数（limit / offset による絞り込みの影響を受けません）
- purchase_request_forms*: array[object]

## GET /api/1/purchase_requests/forms/{id} — 購買申請の申請フォーム詳細の取得

概要 指定した事業所の購買申請の申請フォーム詳細を取得する 注意点

### パラメータ

- id* (path): integer(int64) - 申請フォームID
- company_id*: integer(int64) - 事業所ID

### レスポンス

- type*: string - フォーム種別
- purchase_request_setting*: object - 申請フォームの設定
- custom_form*: object - カスタムフォーム（フォーム項目の定義）
- flow_routes*: array[object] - 利用可能な承認経路（詳細は `/api/1/approval_flow_routes` を参照。同 API のレスポンス id は本レスポンスの src_id に対応）

## POST /api/1/purchase_requests/{id}/actions — 購買申請の承認操作

概要 指定した事業所の購買申請の承認操作を行う

### パラメータ

PUT /api/1/purchase_requests/{id} と同じ

### リクエストボディ

- company_id*: integer(int64) - 事業所ID 例: `1` (最小: 1)
- do_action*: string - 操作(apply: 申請する、approve: 承認する、reject: 却下する、feedback: 申請者へ差し戻す) (選択肢: apply, approve, reject, feedback) 例: `approve`
- next_approver_id: integer(int64) - 次の承認ステップの承認者のユーザーID 例: `1` (最小: 1)
- next_group_id: integer(int64) - 次の承認ステップの承認グループID 例: `1` (最小: 1)

### レスポンス

POST /api/1/purchase_requests と同じ
