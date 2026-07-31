# Purchase requests

## 概要

購買申請

## エンドポイント一覧

### GET /api/1/purchase_requests

操作: 購買申請一覧の取得

説明: 概要 指定した事業所の購買申請一覧を取得する 注意点

### パラメータ

| 名前 | 位置 | 必須 | 型 | 説明 |
|------|------|------|-----|------|
| company_id | query | はい | integer(int64) | 事業所ID |
| limit | query | いいえ | integer(int64) | 1ページあたりの取得件数（20, 50, 100, 200, 500） |
| offset | query | いいえ | integer(int64) | 取得開始位置（0から始まる） |

### レスポンス (200)

- purchase_requests (必須): array[object]
  配列の要素:
    - id (必須): integer(int64) - 購買申請ID 例: `1` (最小: 1)
    - company_id (必須): integer(int64) - 事業所ID 例: `1` (最小: 1)
    - application_date (必須): string - 申請日 (yyyy-mm-dd) 例: `2019-12-17`
    - title (必須): string - 申請タイトル 例: `大阪出張`
    - applicant_id (必須): integer(int64) - 申請者のユーザーID 例: `1` (最小: 1)
    - application_number (必須): string - 申請No. 例: `2`
    - status (必須): string - 申請ステータス(draft:下書き, in_progress:申請中, approved:承認済, rejected:却下, feedback:差戻し) (選択肢: draft, in_progress, approved, rejected, feedback) 例: `draft`
    - form_id (必須): integer(int64) - 申請フォームID 例: `1` (最小: 1)
    - amount (必須): integer(int64) - 金額（非推奨。budget_amount を使用してください） 例: `1000` (最小: 0, 最大: 2147483647)
    - budget_amount (必須): integer(int64) - 金額 例: `1000` (最小: 0, 最大: 2147483647)
    - applicant (任意): object
- total_count (任意): integer(int64) - 検索結果の総件数 例: `1` (最小: 0)

### POST /api/1/purchase_requests

操作: 購買申請の作成

説明: 概要 指定した事業所の購買申請を作成する

### リクエストボディ

(必須)

- company_id (必須): integer(int64) - 事業所ID 例: `1` (最小: 1)
- purchase_request_form_id (必須): integer(int64) - 購買申請の申請フォームID 例: `1` (最小: 1)
- status (必須): string - 申請ステータス<br>
draft を指定した時は下書きで購買申請を作成します。<br>
in_progress を指定した時は申請中で購買申請を作成します。
 (選択肢: draft, in_progress) 例: `draft`
- applicant_group_id (任意): integer(int64) - 申請者グループID 例: `1` (最小: 1)
- title (任意): string - 申請タイトル 例: `大阪出張`
- description (任意): string - 申請の説明 例: `出張に伴う備品購入`
- occurrence_start_date (任意): string - 発生開始日 (yyyy-mm-dd) 例: `2019-12-17`
- occurrence_end_date (任意): string - 発生終了日 (yyyy-mm-dd) 例: `2019-12-20`
- approval_flow_route_id (任意): integer(int64) - 申請経路ID 例: `1` (最小: 1)
- approval_flow_approver_id (任意): integer(int64) - 申請経路の承認者ユーザーID 例: `1` (最小: 1)
- approval_flow_group_id (任意): integer(int64) - 申請経路の承認グループID 例: `1` (最小: 1)
- observer_user_ids (任意): array[integer] - 閲覧者のユーザーID
- parent_id (任意): integer(int64) - 親申請ID 例: `1` (最小: 1)
- parent_type (任意): string - 親申請の種別 例: `PurchaseRequest`
- resubmission_from_purchase_request_id (任意): integer(int64) - 再決裁元の購買申請ID 例: `1` (最小: 1)
- purchase_request_lines (任意): array[object] - 購買申請の項目行一覧（配列）
  配列の要素:
    - line_order (任意): integer(int64) - 行番号 例: `0` (最小: 0)
    - amount (必須): integer(int64) - 金額 例: `1000`
    - content (任意): string - 内容 例: `備品購入`
    - selected_payment_methods (任意): array[string] - 選択された支払方法
    - receipt_ids (任意): array[integer] - ファイルボックス（証憑ファイル）ID（配列）
    - receipt_field_values (任意): array[object] - ファイル添付項目の値一覧（配列）
    - section_id (任意): integer(int64) - 部門ID 例: `1` (最小: 1)
    - partner_id (任意): integer(int64) - 取引先ID 例: `1` (最小: 1)
    - item_id (任意): integer(int64) - 品目ID 例: `1` (最小: 1)
    - tag_ids (任意): array[integer] - メモタグID（配列）
    - segment_1_tag_id (任意): integer(int64) - セグメント1タグID 例: `1` (最小: 1)
    - segment_2_tag_id (任意): integer(int64) - セグメント2タグID 例: `1` (最小: 1)
    - segment_3_tag_id (任意): integer(int64) - セグメント3タグID 例: `1` (最小: 1)
    - scheduled_purchase_date (任意): string - 購入予定日 (yyyy-mm-dd) 例: `2019-12-17`
    - scheduled_purchase_end_date (任意): string - 購入予定終了日 (yyyy-mm-dd) 例: `2019-12-20`
- purchase_request_custom_values (任意): array[object] - カスタム項目の値一覧（配列）
  配列の要素:
    - id (任意): integer(int64) - カスタム項目値ID 例: `1` (最小: 1)
    - custom_form_part_id (必須): integer(int64) - カスタムフォーム項目ID 例: `1` (最小: 1)
    - json_value (任意): object - カスタム項目の値(項目種別により形式が異なる)

### レスポンス (200)

- purchase_request (必須): object
  - id (必須): integer(int64) - 購買申請ID 例: `1` (最小: 1)
  - user_id (必須): integer(int64) - 申請者のユーザーID 例: `1` (最小: 1)
  - title (必須): string - 申請タイトル 例: `大阪出張`
  - application_date (必須): string - 申請日 (yyyy-mm-dd) 例: `2019-12-17`
  - occurrence_start_date (任意): string - 発生開始日 (yyyy-mm-dd) 例: `2019-12-17`
  - occurrence_end_date (任意): string - 発生終了日 (yyyy-mm-dd) 例: `2019-12-20`
  - purchase_request_code (必須): string - 申請No. 例: `2`
  - description (任意): string - 申請の説明 例: `出張に伴う備品購入`
  - budget_amount (任意): integer(int64) - 金額 例: `1000`
  - current_step_id (任意): integer(int64) - 現在の承認ステップID 例: `1`
  - status (必須): string - 申請ステータス(draft:下書き, in_progress:申請中, approved:承認済, rejected:却下, feedback:差戻し) (選択肢: draft, in_progress, approved, rejected, feedback) 例: `draft`
  - approvable (必須): boolean - 現在のユーザーが承認操作可能か 例: `false`
  - default_route_src_id (任意): integer(int64) - デフォルト申請経路のsrc ID 例: `1`
  - from_resubmission_purchase_request_id (任意): integer(int64) - 再決裁元の購買申請ID 例: `1`
  - to_resubmission_purchase_request_id (任意): integer(int64) - 再決裁先の購買申請ID 例: `1`
  - purchase_request_lines (必須): array[object] - 購買申請明細行
  - purchase_request_custom_values (必須): array[object] - カスタム項目の値
  - approval_flow_approvers (必須): array[object] - 承認フローの承認者

### GET /api/1/purchase_requests/{id}

操作: 購買申請の取得

説明: 概要 指定した事業所の購買申請を取得する

### パラメータ

| 名前 | 位置 | 必須 | 型 | 説明 |
|------|------|------|-----|------|
| id | path | はい | integer(int64) | 購買申請ID |
| company_id | query | はい | integer(int64) | 事業所ID |

### レスポンス (200)

- purchase_request (必須): object
  - id (必須): integer(int64) - 購買申請ID 例: `1` (最小: 1)
  - user_id (必須): integer(int64) - 申請者のユーザーID 例: `1` (最小: 1)
  - title (必須): string - 申請タイトル 例: `大阪出張`
  - application_date (必須): string - 申請日 (yyyy-mm-dd) 例: `2019-12-17`
  - occurrence_start_date (任意): string - 発生開始日 (yyyy-mm-dd) 例: `2019-12-17`
  - occurrence_end_date (任意): string - 発生終了日 (yyyy-mm-dd) 例: `2019-12-20`
  - purchase_request_code (必須): string - 申請No. 例: `2`
  - description (任意): string - 申請の説明 例: `出張に伴う備品購入`
  - budget_amount (任意): integer(int64) - 金額 例: `1000`
  - current_step_id (任意): integer(int64) - 現在の承認ステップID 例: `1`
  - status (必須): string - 申請ステータス(draft:下書き, in_progress:申請中, approved:承認済, rejected:却下, feedback:差戻し) (選択肢: draft, in_progress, approved, rejected, feedback) 例: `draft`
  - approvable (必須): boolean - 現在のユーザーが承認操作可能か 例: `false`
  - default_route_src_id (任意): integer(int64) - デフォルト申請経路のsrc ID 例: `1`
  - from_resubmission_purchase_request_id (任意): integer(int64) - 再決裁元の購買申請ID 例: `1`
  - to_resubmission_purchase_request_id (任意): integer(int64) - 再決裁先の購買申請ID 例: `1`
  - purchase_request_lines (必須): array[object] - 購買申請明細行
  - purchase_request_custom_values (必須): array[object] - カスタム項目の値
  - approval_flow_approvers (必須): array[object] - 承認フローの承認者

### PUT /api/1/purchase_requests/{id}

操作: 購買申請の更新

説明: 概要 指定した事業所の購買申請を更新する

### パラメータ

| 名前 | 位置 | 必須 | 型 | 説明 |
|------|------|------|-----|------|
| id | path | はい | integer(int64) | 購買申請ID |

### リクエストボディ

(必須)

- company_id (必須): integer(int64) - 事業所ID 例: `1` (最小: 1)
- purchase_request_form_id (必須): integer(int64) - 購買申請の申請フォームID 例: `1` (最小: 1)
- status (必須): string - 申請ステータス<br>
draft を指定した時は下書きで購買申請を更新します。<br>
in_progress を指定した時は申請中で購買申請を更新します。
 (選択肢: draft, in_progress) 例: `draft`
- applicant_group_id (任意): integer(int64) - 申請者グループID 例: `1` (最小: 1)
- title (任意): string - 申請タイトル 例: `大阪出張`
- description (任意): string - 申請の説明 例: `出張に伴う備品購入`
- occurrence_start_date (任意): string - 発生開始日 (yyyy-mm-dd) 例: `2019-12-17`
- occurrence_end_date (任意): string - 発生終了日 (yyyy-mm-dd) 例: `2019-12-20`
- approval_flow_route_id (任意): integer(int64) - 申請経路ID 例: `1` (最小: 1)
- approval_flow_approver_id (任意): integer(int64) - 申請経路の承認者ユーザーID 例: `1` (最小: 1)
- approval_flow_group_id (任意): integer(int64) - 申請経路の承認グループID 例: `1` (最小: 1)
- purchase_request_lines (任意): array[object] - 購買申請の項目行一覧（配列）
  配列の要素:
    - id (任意): integer(int64) - 購買申請の項目行ID（新規行の場合は指定しない） 例: `1` (最小: 1)
    - line_order (任意): integer(int64) - 行番号 例: `0` (最小: 0)
    - amount (必須): integer(int64) - 金額 例: `1000`
    - content (任意): string - 内容 例: `備品購入`
    - selected_payment_methods (任意): array[string] - 選択された支払方法
    - receipt_ids (任意): array[integer] - ファイルボックス（証憑ファイル）ID（配列）
    - receipt_field_values (任意): array[object] - ファイル添付項目の値一覧（配列）
    - section_id (任意): integer(int64) - 部門ID 例: `1` (最小: 1)
    - partner_id (任意): integer(int64) - 取引先ID 例: `1` (最小: 1)
    - item_id (任意): integer(int64) - 品目ID 例: `1` (最小: 1)
    - tag_ids (任意): array[integer] - メモタグID（配列）
    - segment_1_tag_id (任意): integer(int64) - セグメント1タグID 例: `1` (最小: 1)
    - segment_2_tag_id (任意): integer(int64) - セグメント2タグID 例: `1` (最小: 1)
    - segment_3_tag_id (任意): integer(int64) - セグメント3タグID 例: `1` (最小: 1)
    - scheduled_purchase_date (任意): string - 購入予定日 (yyyy-mm-dd) 例: `2019-12-17`
    - scheduled_purchase_end_date (任意): string - 購入予定終了日 (yyyy-mm-dd) 例: `2019-12-20`
- purchase_request_custom_values (任意): array[object] - カスタム項目の値一覧（配列）
  配列の要素:
    - id (任意): integer(int64) - カスタム項目値ID 例: `1` (最小: 1)
    - custom_form_part_id (必須): integer(int64) - カスタムフォーム項目ID 例: `1` (最小: 1)
    - json_value (任意): object - カスタム項目の値(項目種別により形式が異なる)

### レスポンス (200)

- purchase_request (必須): object
  - id (必須): integer(int64) - 購買申請ID 例: `1` (最小: 1)
  - user_id (必須): integer(int64) - 申請者のユーザーID 例: `1` (最小: 1)
  - title (必須): string - 申請タイトル 例: `大阪出張`
  - application_date (必須): string - 申請日 (yyyy-mm-dd) 例: `2019-12-17`
  - occurrence_start_date (任意): string - 発生開始日 (yyyy-mm-dd) 例: `2019-12-17`
  - occurrence_end_date (任意): string - 発生終了日 (yyyy-mm-dd) 例: `2019-12-20`
  - purchase_request_code (必須): string - 申請No. 例: `2`
  - description (任意): string - 申請の説明 例: `出張に伴う備品購入`
  - budget_amount (任意): integer(int64) - 金額 例: `1000`
  - current_step_id (任意): integer(int64) - 現在の承認ステップID 例: `1`
  - status (必須): string - 申請ステータス(draft:下書き, in_progress:申請中, approved:承認済, rejected:却下, feedback:差戻し) (選択肢: draft, in_progress, approved, rejected, feedback) 例: `draft`
  - approvable (必須): boolean - 現在のユーザーが承認操作可能か 例: `false`
  - default_route_src_id (任意): integer(int64) - デフォルト申請経路のsrc ID 例: `1`
  - from_resubmission_purchase_request_id (任意): integer(int64) - 再決裁元の購買申請ID 例: `1`
  - to_resubmission_purchase_request_id (任意): integer(int64) - 再決裁先の購買申請ID 例: `1`
  - purchase_request_lines (必須): array[object] - 購買申請明細行
  - purchase_request_custom_values (必須): array[object] - カスタム項目の値
  - approval_flow_approvers (必須): array[object] - 承認フローの承認者

### DELETE /api/1/purchase_requests/{id}

操作: 購買申請の削除

説明: 概要 指定した事業所の購買申請を削除する

### パラメータ

| 名前 | 位置 | 必須 | 型 | 説明 |
|------|------|------|-----|------|
| id | path | はい | integer(int64) | 購買申請ID |
| company_id | query | はい | integer(int64) | 事業所ID |

### レスポンス (204)

### GET /api/1/purchase_requests/forms

操作: 購買申請の申請フォーム一覧の取得

説明: 概要 指定した事業所の購買申請の申請フォーム一覧を取得する 注意点

### パラメータ

| 名前 | 位置 | 必須 | 型 | 説明 |
|------|------|------|-----|------|
| company_id | query | はい | integer(int64) | 事業所ID |
| status | query | いいえ | string | ステータス(draft: 申請で使用しない、active: 申請で使用する、deleted: 削除済み)。未指定の場合はすべてのステータスの申請フォームを返します。 (選択肢: draft, active, deleted) |
| limit | query | いいえ | integer(int64) | 1ページあたりの取得件数（1〜500） |
| offset | query | いいえ | integer(int64) | 取得開始位置（0から始まる） |

### レスポンス (200)

- total_count (必須): integer(int64) - 検索条件に合致する申請フォームの総数（limit / offset による絞り込みの影響を受けません） 例: `1` (最小: 0)
- purchase_request_forms (必須): array[object]
  配列の要素:
    - id (必須): integer(int64) - 申請フォームID 例: `1` (最小: 1)
    - name (必須): string - 申請フォームの名前 例: `申請フォームの名前`
    - description (必須): string - 申請フォームの説明 例: `申請フォームの説明`
    - status (必須): string - ステータス(draft: 申請で使用しない、active: 申請で使用する、deleted: 削除済み) (選択肢: draft, active, deleted) 例: `active`
    - form_order (必須): integer(int64) - 表示順（申請者が選択する申請フォームの表示順を設定できます。小さい数ほど上位に表示されます。（0を除く整数のみ。マイナス不可）未入力の場合、表示順が後ろになります。同じ数字が入力された場合、登録順で表示されます。） 例: `1` (最小: 1, 最大: 1000)

### GET /api/1/purchase_requests/forms/{id}

操作: 購買申請の申請フォーム詳細の取得

説明: 概要 指定した事業所の購買申請の申請フォーム詳細を取得する 注意点

### パラメータ

| 名前 | 位置 | 必須 | 型 | 説明 |
|------|------|------|-----|------|
| id | path | はい | integer(int64) | 申請フォームID |
| company_id | query | はい | integer(int64) | 事業所ID |

### レスポンス (200)

- type (必須): string - フォーム種別 例: `PurchaseRequest`
- purchase_request_setting (必須): object - 申請フォームの設定
  - id (任意): integer(int64) - 申請フォームID (最小: 1)
  - status (任意): string - ステータス(draft: 申請で使用しない、active: 申請で使用する) 例: `active`
  - form_order (任意): integer(int64) - 表示順
  - default_flow_route_src_id (任意): integer(int64) - デフォルトの承認経路ID
  - default_title (任意): string - デフォルトのタイトル
  - default_content (任意): string - デフォルトの内容
  - name (任意): string - 申請フォームの名前
  - title_annotation (任意): string - タイトルの注釈
  - description (任意): string - 申請フォームの説明
  - description_setting (任意): string - 説明の入力設定
  - content_setting (任意): string - 内容の入力設定
  - payment_method_setting (任意): string - 支払方法の入力設定
  - receipt_setting (任意): string - 証憑の入力設定
  - section_setting (任意): string - 部門の入力設定
  - section_annotation (任意): string - 部門の注釈
  - partner_setting (任意): string - 取引先の入力設定
  - partner_annotation (任意): string - 取引先の注釈
  - item_setting (任意): string - 品目の入力設定
  - item_annotation (任意): string - 品目の注釈
  - tag_setting (任意): string - メモタグの入力設定
  - tag_annotation (任意): string - メモタグの注釈
  - segment_1_tag_setting (任意): string - セグメント1の入力設定
  - segment_1_tag_annotation (任意): string - セグメント1の注釈
  - segment_2_tag_setting (任意): string - セグメント2の入力設定
  - segment_2_tag_annotation (任意): string - セグメント2の注釈
  - segment_3_tag_setting (任意): string - セグメント3の入力設定
  - segment_3_tag_annotation (任意): string - セグメント3の注釈
  - scheduled_purchase_date_setting (任意): string - 購入予定日の入力設定
  - observer_addition (任意): string - 観察者の追加設定
  - content_display_name (任意): string - 内容の表示名
  - content_annotation (任意): string - 内容の注釈
  - scheduled_purchase_date_display_name (任意): string - 購入予定日の表示名
  - scheduled_purchase_date_annotation (任意): string - 購入予定日の注釈
  - enable_scheduled_purchase_date_range (任意): boolean - 購入予定日を期間で入力できるか
  - specified_payment_methods (任意): array[string] - 指定された支払方法
  - payment_method_display_name (任意): string - 支払方法の表示名
  - payment_method_annotation (任意): string - 支払方法の注釈
  - receipt_display_name (任意): string - 証憑の表示名
  - receipt_annotation (任意): string - 証憑の注釈
  - description_annotation (任意): string - 説明の注釈
  - amount_display_name (任意): string - 金額の表示名
  - amount_annotation (任意): string - 金額の注釈
  - occurrence_date_setting (任意): string - 発生日の入力設定
  - occurrence_date_display_name (任意): string - 発生日の表示名
  - occurrence_date_annotation (任意): string - 発生日の注釈
  - enable_occurrence_date_range (任意): boolean - 発生日を期間で入力できるか
  - receipt_fields (任意): array[object] - 証憑フィールドの設定
  - tax_exclusive_setting (任意): string - 税抜経理の設定
  - freee_card_issue_setting (任意): string - freeeカード発行の設定
  - default_observers (任意): array[object] - デフォルトの観察者
  - virtual_card_issuance_setting (任意): object - バーチャルカード発行設定
- custom_form (必須): object - カスタムフォーム（フォーム項目の定義）
  - id (任意): integer(int64)
  - parts (任意): array[object] - カスタムフォームの項目
- flow_routes (必須): array[object] - 利用可能な承認経路（詳細は `/api/1/approval_flow_routes` を参照。同 API のレスポンス id は本レスポンスの src_id に対応）
  配列の要素:
    - id (任意): integer(int64) - 承認経路ID（購買申請作成時の approval_flow_route_id に指定する値）
    - src_id (任意): integer(int64) - 承認経路の元ID（`/api/1/approval_flow_routes` のレスポンス id と同じ値）
    - name (任意): string - 承認経路名

### POST /api/1/purchase_requests/{id}/actions

操作: 購買申請の承認操作

説明: 概要 指定した事業所の購買申請の承認操作を行う

### パラメータ

| 名前 | 位置 | 必須 | 型 | 説明 |
|------|------|------|-----|------|
| id | path | はい | integer(int64) | 購買申請ID |

### リクエストボディ

(必須)

- company_id (必須): integer(int64) - 事業所ID 例: `1` (最小: 1)
- do_action (必須): string - 操作(apply: 申請する、approve: 承認する、reject: 却下する、feedback: 申請者へ差し戻す) (選択肢: apply, approve, reject, feedback) 例: `approve`
- next_approver_id (任意): integer(int64) - 次の承認ステップの承認者のユーザーID 例: `1` (最小: 1)
- next_group_id (任意): integer(int64) - 次の承認ステップの承認グループID 例: `1` (最小: 1)

### レスポンス (200)

- purchase_request (必須): object
  - id (必須): integer(int64) - 購買申請ID 例: `1` (最小: 1)
  - user_id (必須): integer(int64) - 申請者のユーザーID 例: `1` (最小: 1)
  - title (必須): string - 申請タイトル 例: `大阪出張`
  - application_date (必須): string - 申請日 (yyyy-mm-dd) 例: `2019-12-17`
  - occurrence_start_date (任意): string - 発生開始日 (yyyy-mm-dd) 例: `2019-12-17`
  - occurrence_end_date (任意): string - 発生終了日 (yyyy-mm-dd) 例: `2019-12-20`
  - purchase_request_code (必須): string - 申請No. 例: `2`
  - description (任意): string - 申請の説明 例: `出張に伴う備品購入`
  - budget_amount (任意): integer(int64) - 金額 例: `1000`
  - current_step_id (任意): integer(int64) - 現在の承認ステップID 例: `1`
  - status (必須): string - 申請ステータス(draft:下書き, in_progress:申請中, approved:承認済, rejected:却下, feedback:差戻し) (選択肢: draft, in_progress, approved, rejected, feedback) 例: `draft`
  - approvable (必須): boolean - 現在のユーザーが承認操作可能か 例: `false`
  - default_route_src_id (任意): integer(int64) - デフォルト申請経路のsrc ID 例: `1`
  - from_resubmission_purchase_request_id (任意): integer(int64) - 再決裁元の購買申請ID 例: `1`
  - to_resubmission_purchase_request_id (任意): integer(int64) - 再決裁先の購買申請ID 例: `1`
  - purchase_request_lines (必須): array[object] - 購買申請明細行
  - purchase_request_custom_values (必須): array[object] - カスタム項目の値
  - approval_flow_approvers (必須): array[object] - 承認フローの承認者



## 参考情報

- freee API公式ドキュメント: https://developer.freee.co.jp/docs
