# sales_schedules

売上予定

## GET /sales_schedules — 売上予定一覧

概要 売上予定の一覧を取得します。 登録されている売上予定情報を一覧形式で取得できます。 各種フィルタ条件を指定することで、特定の条件に合致する売上予定のみを取得することが可能です。

定義
periodic_sales_id : 定期売上IDで絞込 start_scheduled_date : 売上予定日(絞り込み開始) end_scheduled_date : 売上予定日(絞り込み終了) customer_ids : 顧客の取引先ID(複数指定可) start_bills_on : 請求予定日(絞り込み開始) end_bills_on : 請求予定日(絞り込み終了) start_collects_on : 入金予定日(絞り込み開始) end_collects_on : 入金予定日(絞り込み終了) charge_employee_ids : 社内担当者の従業員ID(複数指定可) charge_member_ids : 社内担当者のメンバーID(複数指定可) reporting_section_ids : 担当部門ID(複数指定可) business_ids : 案件ID(複数指定可) ...

### パラメータ

- company_id*: integer(int64) - 事業所ID
- periodic_sales_id: string - 定期売上IDで絞込
- start_scheduled_date: string(date) - 売上予定日で絞込：開始日(yyyy-mm-dd)
- end_scheduled_date: string(date) - 売上予定日で絞込：終了日(yyyy-mm-dd)
- customer_ids[]: array[integer] - 顧客の取引先ID
- start_bills_on: string(date) - 請求予定日で絞込：開始日(yyyy-mm-dd)
- end_bills_on: string(date) - 請求予定日で絞込：終了日(yyyy-mm-dd)
- start_collects_on: string(date) - 入金予定日で絞込：開始日(yyyy-mm-dd)
- end_collects_on: string(date) - 入金予定日で絞込：終了日(yyyy-mm-dd)
- charge_employee_ids[]: array[integer] - 社内担当者の従業員ID

  charge_member_ids[] と同時に指定した場合は AND 条件となり、意図した検索結果になりません。
- charge_member_ids[]: array[string] - 社内担当者のメンバーID

  charge_employee_ids[] と同時に指定した場合は AND 条件となり、意図した検索結果になりません。
- reporting_section_ids[]: array[integer] - 担当部門ID
- business_ids[]: array[string] - 案件ID
- start_last_updated_date: string(date) - 変更日時で絞込：開始日(yyyy-mm-dd)
- end_last_updated_date: string(date) - 変更日時で絞込：終了日(yyyy-mm-dd)
- limit: integer(int32) - 取得レコードの件数（デフォルト：20, 最小：1, 最大：100）
- offset: integer(int32) - 取得レコードのオフセット（デフォルト：0）

### レスポンス

売上予定一覧のレスポンス
- sales_schedules*: array[object] - 売上予定一覧
- meta*: object

## GET /sales_schedules/{id} — 売上予定詳細取得

概要 指定されたIDの売上予定の詳細情報を取得します。 指定された売上予定が既に売上として計上済みの場合、303 See Otherを返却し、Locationヘッダーに計上済み売上の詳細取得APIのURLを設定します。

### パラメータ

- company_id*: integer(int64) - 事業所ID
- id* (path): string - 売上予定ID

### レスポンス

売上予定詳細取得のレスポンス
- id*: string - 売上予定ID
- periodic_sales_id*: string - 定期売上ID
- advance_receipt_id: string - 前受金ID
- subject: string - 件名
- customer_order_no: string - 顧客注文No.
- scheduled_date*: string(date) - 売上予定日
- registration_status*: string - 売上予定の登録ステータス (未登録: none, 処理中: in_progress, エラー: error)
- customer*: object - 顧客
- billing_creating_method_type*: string - 請求作成方法区分
  * `automatically` - 自動作成
  * `manually` - 手動作成
  * `none` - なし
- bills_on: string(date) - 請求予定日
- invoice_template_name: string - 請求書テンプレート名称
- billing_partner: object - 請求先
- invoice_subject: string - 請求書件名
- invoice_note: string - 請求書の備考欄に掲載する内容
- collects_on: string(date) - 入金予定日
- collecting_partner: object - 入金元
- collection_method_type*: string - 入金方法
  * `transfer` - 振込
  * `cash` - 現金
  * `bill_payable` - 手形
  * `direct_debit` - 振替
  * `none` - なし
- charge_employee: object - 社内担当者
- charge_member: object - 社内担当者
- reporting_section: object - 担当部門
- internal_memo: string - 社内メモ
- amount_set*: object - 売上金額
- amount_set_rates*: array[object] - 税率を含む金額セット
- total_amount*: integer(int64) - 源泉徴収税額を除いた合計金額
- amount_of_withholding_tax: integer(int64) - 源泉徴収税額
- business: object - 案件
- registered_by*: object - 登録者
- registered_by_member: object - 登録者
- last_updated_by*: object - 変更者
- last_updated_by_member: object - 変更者
- registered_at*: string(date-time) - 登録日時
- last_updated_at*: string(date-time) - 変更日時
- lines*: array[object] - 売上予定明細リスト （要素は line_type により形が異なる: basic / text）

## PATCH /sales_schedules/{id} — 売上予定更新

概要 指定されたIDの売上予定を更新します。 送信したフィールドのみが更新され、送信しなかったフィールドは変更されません。

定義
更新可能項目 customer_id : 顧客の取引先ID subject : 件名 customer_order_no : 顧客注文No. scheduled_date : 売上予定日 billing_creating_method_type : 請求の管理 bills_on : 請求予定日 billing_partner_id : 請求先の取引先ID invoice_template_id : 請求書テンプレートID invoice_subject : 請求書件名 invoice_note : 請求書の備考欄に掲載する内容 collects_on : 入金予定日 collecting_partner_id : 入金元の取引先ID collection_method_type : 入金方法 charge_employee_id : 社内担当者の従業員ID charge_member_id : 社内担当者のメンバーID reporting_section_i...

### パラメータ

- id* (path): string - 売上予定ID

### リクエストボディ*

- company_id*: integer(int64) - 事業所ID 例: `1` (最小: 1, 最大: 9223372036854776000)
- customer_id: integer(int64) - 顧客の取引先ID 例: `1001` (最小: 1, 最大: 9223372036854776000)
- subject: string - 件名 例: `サンプル案件売上の件`
- customer_order_no: string - 顧客注文No. 例: `C-PO-20211212-001`
- scheduled_date: string(date) - 売上予定日 例: `2025-04-30`
- billing_creating_method_type: string - 請求作成方法区分 (自動作成: automatically, 手動作成: manually) (選択肢: automatically, manually) 例: `automatically`
- bills_on: string(date) - 請求予定日 例: `2025-05-31`
- billing_partner_id: integer(int64) - 請求先の取引先ID 例: `1002` (最小: 1, 最大: 9223372036854776000)
- invoice_template_id: integer(int64) - 請求書テンプレートID 例: `10002` (最小: 1, 最大: 9223372036854776000)
- invoice_subject: string - 請求書件名 例: `サンプル案件売上の件`
- invoice_note: string - 請求書の備考欄に掲載する内容 例: `お振込期限は月末までとなります`
- collects_on: string(date) - 入金予定日 例: `2025-06-30`
- collecting_partner_id: integer(int64) - 入金元の取引先ID 例: `1003` (最小: 1, 最大: 9223372036854776000)
- collection_method_type: string - 入金方法 (振込: transfer, 現金: cash, 手形: bill_payable, 振替: direct_debit) (選択肢: transfer, cash, bill_payable, direct_debit) 例: `transfer`
- charge_employee_id: integer(int64) - 社内担当者の従業員ID

  charge_member_id と同時に指定した場合は charge_member_id が優先されます。 例: `101` (最小: 0, 最大: 9223372036854776000)
- charge_member_id: string - 社内担当者のメンバーID

  charge_employee_id と同時に指定した場合は charge_member_id が優先されます。 例: `01JPP4FD1CVQWCDSWA90VE1ZTM`
- reporting_section_id: integer(int64) - 担当部門ID

  ※ 親部門のIDは指定できません 例: `67890` (最小: 1, 最大: 9223372036854776000)
- internal_memo: string - 社内メモ 例: `重要案件のため優先対応`
- lines: array[object] - 売上予定明細リスト（指定した場合、既存の明細は全て削除され、新しい明細に置き換えられます） （要素は line_type により形が異なる: basic / text）
  配列の要素:
    - line_type*: string - 明細種別 (選択肢: basic, text)
    - master_item_id: string - 商品ID （basic のみ） 例: `01JPP4FD1CVQWCDSWA90VE1ZTM`
    - deal_line_type_id*: string - 明細取引タイプID （basic のみ） 例: `01JPP4FD1CVQWCDSWA90VE1ZTM`
    - description: string - 摘要 （basic のみ） 例: `パンフレットデザイン料`
    - quantity*: number(double) - 数量 （basic のみ） 例: `100`
    - uom_name: string - 単位 （basic のみ） 例: `個`
    - unit_price*: number(double) - 単価 （basic のみ） 例: `1000` (最小: -999999999999, 最大: 999999999999)
    - accounting_reporting_section_id: integer(int64) - 会計計上部門ID

      ※ 親部門のIDは指定できません （basic のみ） 例: `67890` (最小: 1, 最大: 9223372036854776000)
    - item_tag_id: integer(int64) - 会計品目タグID （basic のみ） 例: `2001` (最小: 1, 最大: 9223372036854776000)
    - memo_tags: array[integer] - メモタグID （basic のみ）
    - withholding_enabled*: boolean - 源泉徴収税対象明細かどうか （basic のみ） 例: `false`
    - is_manual_tax_entry*: boolean - 税の手動入力を行うかどうか （basic のみ） 例: `false`
    - tax: integer(int64) - 手動入力した税額

      ※is_manual_tax_entryがtrueの場合のみ参照されます。falseの場合は値を設定しても無視されます。 （basic のみ） 例: `10000` (最小: -999999999999, 最大: 999999999999)
    - segment_tag_1_id: integer(int64) - セグメントタグ1のID （basic のみ） 例: `12345` (最小: 1, 最大: 9223372036854776000)
    - segment_tag_2_id: integer(int64) - セグメントタグ2のID （basic のみ） 例: `12345` (最小: 1, 最大: 9223372036854776000)
    - segment_tag_3_id: integer(int64) - セグメントタグ3のID （basic のみ） 例: `12345` (最小: 1, 最大: 9223372036854776000)
    - text*: string - テキスト行 （text のみ） 例: `備考：特急料金が含まれます`

### レスポンス

売上予定更新のレスポンス
- id*: string - 売上予定ID
- registered_at*: string(date-time) - 登録日時
- last_updated_at*: string(date-time) - 変更日時

## DELETE /sales_schedules/{id} — 売上予定削除

指定されたIDの売上予定を削除します。

### パラメータ

GET /sales_schedules/{id} と同じ

### レスポンス

売上予定削除のレスポンス
- id*: string - 売上予定ID
- registered_at*: string(date-time) - 登録日時
- last_updated_at*: string(date-time) - 変更日時

## POST /sales_schedules/{id}/actualization — 売上予定の売上計上

指定されたIDの売上予定を売上として計上します。

### パラメータ

PATCH /sales_schedules/{id} と同じ

### リクエストボディ

- company_id*: integer(int64) - 事業所ID 例: `1` (最小: 1, 最大: 9223372036854776000)

### レスポンス

売上予定計上のレスポンス
- id*: string - 売上予定ID
- sales_id*: string - 計上された売上のID
- registered_at*: string(date-time) - 登録日時
- last_updated_at*: string(date-time) - 変更日時
