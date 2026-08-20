# sales

売上

## GET /sales — 売上一覧

概要 売上の一覧を取得します。 登録されている売上情報を一覧形式で取得できます。 各種フィルタ条件を指定することで、特定の条件に合致する売上のみを取得することが可能です。

定義
start_registered_date : 売上登録日(絞り込み開始) end_registered_date : 売上登録日(絞り込み終了) start_last_updated_date : 売上更新日(絞り込み開始) end_last_updated_date : 売上更新日(絞り込み終了) start_revenue_recognition_date : 売上日(絞り込み開始) end_revenue_recognition_date : 売上日(絞り込み終了) charge_employee_ids : 社内担当者の従業員ID(複数指定可) customer_ids : 顧客の取引先ID(複数指定可) business_ids : 案件ID(複数指定可) sales_no : 売上No. billing_status : 請求書送付ステータス collection_status : 決済ステータス...

### パラメータ

- company_id*: integer(int64) - 事業所ID
- start_registered_date: string(date) - 売上登録日で絞込：開始日(yyyy-mm-dd)
- end_registered_date: string(date) - 売上登録日で絞込：終了日(yyyy-mm-dd)
- start_revenue_recognition_date: string(date) - 売上日で絞込：開始日(yyyy-mm-dd)
- end_revenue_recognition_date: string(date) - 売上日で絞込：終了日(yyyy-mm-dd)
- charge_employee_ids[]: array[integer] - 社内担当者の従業員ID
- customer_ids[]: array[integer] - 顧客の取引先ID
- billing_status: string - 請求書送付ステータス (未送付: not_billed, 送付済: billed, 対象外: none) (選択肢: not_billed, billed, none)
- collection_status: string - 決済ステータス (未決済: not_settled, 一部決済済: partially_settled, 決済済: settled, 対象外: none) (選択肢: not_settled, partially_settled, settled, none)
- canceled: boolean - 取消状態
- limit: integer(int32) - 取得レコードの件数（デフォルト：20, 最小：1, 最大：100）
- offset: integer(int32) - 取得レコードのオフセット（デフォルト：0）

## POST /sales — 売上登録

概要 新しい売上を登録します。 受注や納品に紐づく売上、または独立した売上を登録できます。

定義
必須項目 revenue_recognition_date : 売上日 customer_id : 顧客の取引先ID billing_partner_id : 請求先の取引先ID collecting_partner_id : 入金元の取引先ID collection_method_type : 入金方法 billing_creating_method_type : 請求の管理 lines : 明細リスト 任意項目 sales_order_id : 受注ID（受注に紐づける場合） delivery_id : 納品ID（納品に紐づける場合） business_id : 案件ID subject : 売上タイトル customer_order_no : 顧客注文No. bills_on : 請求日 ※billing_creating_method_typeがautomaticallyの場合は必須 invoice_template_id : 請求書テンプレートID ※指定しない場合はデフォルトの...

### リクエストボディ

- company_id*: integer(int64) - 事業所ID 例: `1` (最小: 1, 最大: 9223372036854776000)
- sales_order_id: string - 受注ID 例: `01JPP4FD1CVQWCDSWA90VE1ZTM`
- delivery_id: string - 納品ID 例: `01JPP4FD1CVQWCDSWA90VE1ZTM`
- billing_creating_method_type*: string - 請求作成方法区分 (自動作成: automatically, 手動作成: manually) (選択肢: automatically, manually) 例: `automatically`
- business_id: string - 案件ID 例: `01JPP4FD1CVQWCDSWA90VE1ZTM`
- subject: string - 売上タイトル 例: `サンプル案件売上の件`
- customer_order_no: string - 顧客注文No. 例: `C-PO-20211212-001`
- revenue_recognition_date*: string(date) - 売上日 例: `2021-12-12`
- customer_id*: integer(int64) - 顧客の取引先ID 例: `1001` (最小: 1, 最大: 9223372036854776000)
- bills_on: string(date) - 請求日 例: `2021-12-12`
- invoice_template_id: integer(int64) - 請求書テンプレートID 例: `10002` (最小: 1, 最大: 9223372036854776000)
- billing_partner_id*: integer(int64) - 請求先の取引先ID 例: `1002` (最小: 1, 最大: 9223372036854776000)
- invoice_subject: string - 請求書件名 例: `サンプル案件売上の件`
- invoice_note: string - 請求書の備考欄に掲載する内容 例: `お振込期限は月末までとなります`
- collects_on: string(date) - 入金期日 例: `2021-12-12`
- collection_method_type*: string - 入金方法 (振込: transfer, 現金: cash, 手形: bill_payable, 振替: direct_debit) (選択肢: transfer, cash, bill_payable, direct_debit) 例: `transfer`
- collecting_partner_id*: integer(int64) - 入金元の取引先ID 例: `1003` (最小: 1, 最大: 9223372036854776000)
- charge_employee_id: integer(int64) - 社内担当者の従業員ID 例: `101` (最小: 0, 最大: 9223372036854776000)
- reporting_section_id: integer(int64) - 担当部門ID

  ※ 親部門のIDは指定できません 例: `67890` (最小: 1, 最大: 9223372036854776000)
- internal_memo: string - 社内メモ 例: `重要案件のため優先対応`
- lines*: array[object] - 明細リスト

## GET /sales/{id} — 売上詳細取得

概要 指定されたIDの売上の詳細情報を取得します。 売上の基本情報に加えて、請求・入金情報などの詳細な進捗情報も取得できます。

### パラメータ

- company_id*: integer(int64) - 事業所ID
- id* (path): string - 売上ID

### レスポンス

売上詳細取得のレスポンス
- id*: string - 売上ID
- deal_id: integer(int64) - 会計の取引ID
- canceled*: boolean - 取消状態
- registered_at*: string(date-time) - 登録日時
- registered_by*: object - 登録者
- last_updated_at*: string(date-time) - 変更日時
- last_updated_by*: object - 変更者
- amount_set*: object - 金額セット
- amount_of_withholding_tax: integer(int64) - 源泉徴収税額
- total_amount*: integer(int64) - 源泉徴収税額を除いた合計金額
- business: object - 案件
- sales_no*: string - 売上No.
- subject: string - 売上タイトル
- customer_order_no: string - 顧客注文No.
- revenue_recognition_date*: string(date) - 売上日
- customer*: object - 顧客
- billing_creating_status*: string - 請求登録ステータス (未作成: not_created, 作成済: created, 取消済: canceled, 赤伝作成済: aka_created, 対象外: none)
  ※aka_created（赤伝作成済）は過去データにのみ存在します。今後、新規に発生することはありません。
- billing_status*: string - 請求書送付ステータス (未送付: not_billed, 一部送付済: partially_billed, 送付済: billed, 対象外: none)
  ※partially_billed（一部送付済）は納品でのみ発生します。none（対象外）は売上でのみ発生します。
- collection_status*: string - 決済ステータス (未決済: not_settled, 一部決済済: partially_settled, 決済済: settled, 無効: invalidated, 対象外: none)
  ※invalidated（無効）は請求でのみ発生します。売上・納品では発生しません。
- sales_order_id: string - 受注ID
- delivery_id: string - 納品ID
- advance_receipt_id: string - 前受金ID
- periodic_sales_id: string - 作成元の定期売上ID
- bills_on: string(date) - 請求日
- invoice_template_name*: string - 請求書テンプレート名称
- billing_partner: object - 請求先
- invoice_subject: string - 請求書件名
- invoice_note: string - 請求書の備考欄に掲載する内容
- billing_amount_excluding_tax: integer(int64) - 請求金額(税抜)
- invoice_no: string - 請求書番号
- bill_id: string - 請求ID
- collects_on: string(date) - 入金期日
- collection_method_type*: string - 入金方法
  * `transfer` - 振込
  * `cash` - 現金
  * `bill_payable` - 手形
  * `direct_debit` - 振替
  * `none` - なし
- collecting_partner: object - 入金元
- charge_employee: object - 社内担当者
- reporting_section: object - 担当部門
- internal_memo: string - 社内メモ
- amount_set_rates*: array[object]
- lines*: array[object] - 明細リスト

## PATCH /sales/{id} — 売上更新

概要 指定されたIDの売上を更新します。 売上の基本情報、請求・入金情報などを部分的に更新できます。 送信したフィールドのみが更新され、送信しなかったフィールドは変更されません。

定義
更新可能項目 subject : 売上タイトル revenue_recognition_date : 売上日 customer_order_no : 顧客注文No. customer_id : 顧客の取引先ID billing_partner_id : 請求先の取引先ID bills_on : 請求日 invoice_template_id : 請求書テンプレートID invoice_subject : 請求書件名 invoice_note : 請求書の備考欄に掲載する内容 collecting_partner_id : 入金元の取引先ID collection_method_type : 入金方法 collects_on : 入金期日 charge_employee_id : 社内担当者の従業員ID reporting_section_id : 担当部門ID internal_memo : 社内メモ ...

### パラメータ

- id* (path): string - 売上ID

### リクエストボディ

- company_id*: integer(int64) - 事業所ID 例: `1` (最小: 1, 最大: 9223372036854776000)
- business_id: string - 案件ID 例: `01JPP4FD1CVQWCDSWA90VE1ZTM`
- subject: string - 売上タイトル 例: `サンプル案件売上の件`
- customer_order_no: string - 顧客注文No. 例: `C-PO-20211212-001`
- revenue_recognition_date: string(date) - 売上日 例: `2021-12-12`
- customer_id: integer(int64) - 顧客の取引先ID 例: `1001` (最小: 1, 最大: 9223372036854776000)
- bills_on: string(date) - 請求日 例: `2021-12-12`
- invoice_template_id: integer(int64) - 請求書テンプレートID 例: `10002` (最小: 1, 最大: 9223372036854776000)
- billing_partner_id: integer(int64) - 請求先の取引先ID 例: `1002` (最小: 1, 最大: 9223372036854776000)
- invoice_subject: string - 請求書件名 例: `サンプル案件売上の件`
- invoice_note: string - 請求書の備考欄に掲載する内容 例: `お振込期限は月末までとなります`
- collects_on: string(date) - 入金期日 例: `2021-12-12`
- collection_method_type: string - 入金方法 (振込: transfer, 現金: cash, 手形: bill_payable, 振替: direct_debit) (選択肢: transfer, cash, bill_payable, direct_debit) 例: `transfer`
- collecting_partner_id: integer(int64) - 入金元の取引先ID 例: `1003` (最小: 1, 最大: 9223372036854776000)
- charge_employee_id: integer(int64) - 社内担当者の従業員ID 例: `101` (最小: 0, 最大: 9223372036854776000)
- reporting_section_id: integer(int64) - 担当部門ID

  ※ 親部門のIDは指定できません 例: `67890` (最小: 1, 最大: 9223372036854776000)
- internal_memo: string - 社内メモ 例: `重要案件のため優先対応`
- lines: array[object] - 明細リスト

## POST /sales/{id}/cancellation — 売上取消

概要 指定されたIDの売上を取り消します。

### パラメータ

PATCH /sales/{id} と同じ

### リクエストボディ

- company_id*: integer(int64) - 事業所ID 例: `1` (最小: 1, 最大: 9223372036854776000)
