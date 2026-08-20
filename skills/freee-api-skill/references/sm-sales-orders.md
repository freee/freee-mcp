# sales_orders

受注

## GET /sales_orders — 受注一覧

概要 受注の一覧を取得します。 登録されている受注情報を一覧形式で取得できます。 各種フィルタ条件を指定することで、特定の条件に合致する受注のみを取得することが可能です。

定義
start_last_updated_date : 更新日(絞り込み開始) end_last_updated_date : 更新日(絞り込み終了) start_sales_order_date : 受注日(絞り込み開始) end_sales_order_date : 受注日(絞り込み終了) charge_employee_ids : 社内担当者の従業員ID(複数指定可) customer_ids : 顧客の取引先ID(複数指定可) sales_order_no : 受注No. canceled : 取消状態(デフォルト:false) `limit`と`offset`パラメータを使用してページネーションが可能です。 デフォルトでは20件ずつ取得され、最大100件まで一度に取得できます。

### パラメータ

- company_id*: integer(int64) - 事業所ID
- start_last_updated_date: string(date) - 更新日で絞込：開始日(yyyy-mm-dd)
- end_last_updated_date: string(date) - 更新日で絞込：終了日(yyyy-mm-dd)
- start_sales_order_date: string(date) - 受注日で絞込：開始日(yyyy-mm-dd)
- end_sales_order_date: string(date) - 受注日で絞込：終了日(yyyy-mm-dd)
- charge_employee_ids[]: array[integer] - 社内担当者の従業員ID
- customer_ids[]: array[integer] - 顧客の取引先ID
- sales_order_no: string - 受注No.で絞込
- canceled: boolean - 取消状態
- limit: integer(int32) - 取得レコードの件数（デフォルト：20, 最小：1, 最大：100）
- offset: integer(int32) - 取得レコードのオフセット（デフォルト：0）

## POST /sales_orders — 受注登録

概要 新しい受注を登録します。 顧客からの注文情報を登録し、納品・請求・入金の予定情報を管理できます。

定義
必須項目 sales_order_date : 受注日 customer_id : 顧客の取引先ID billing_partner_id : 請求先の取引先ID collecting_partner_id : 入金元の取引先ID lines : 明細リスト 任意項目 quotation_id : 見積ID（見積に紐づける場合） sales_order_subject : 受注タイトル customer_order_no : 顧客注文No. deliveries_on : 納品予定日 accepts_on : 検収予定日 bills_on : 請求予定日 collects_on : 入金予定日 business_id : 案件ID delivery_template_id : 納品書テンプレートID ※指定しない場合はデフォルトのテンプレートが適用されます。 invoice_template_id : 請求書テンプレートID ※指定しない場合はデフォルトのテンプレートが適用され...

### リクエストボディ

- company_id*: integer(int64) - 事業所ID 例: `1` (最小: 1, 最大: 9223372036854776000)
- sales_order_subject: string - 受注タイトル 例: `サンプル案件パンフレット作成`
- sales_order_date*: string(date) - 受注日 例: `2021-12-12`
- customer_order_no: string - 顧客注文No. 例: `C-PO-20211212-001`
- customer_id*: integer(int64) - 顧客の取引先ID 例: `1001` (最小: 1, 最大: 9223372036854776000)
- sales_on: string(date) - 売上予定日 例: `2021-12-12`
- deliveries_on: string(date) - 納品予定日 例: `2021-12-12`
- accepts_on: string(date) - 検収予定日 例: `2021-12-12`
- delivery_template_id: integer(int64) - 納品書テンプレートID 例: `10001` (最小: 1, 最大: 9223372036854776000)
- delivery_subject: string - 納品書件名 例: `サンプル案件パンフレット作成`
- delivery_note: string - 納品書の備考欄に掲載する内容 例: `納品時の注意事項`
- billing_creating_method_type*: string - 請求作成方法区分 (自動作成: automatically, 手動作成: manually) (選択肢: automatically, manually) 例: `automatically`
- bills_on: string(date) - 請求予定日 例: `2021-12-12`
- billing_partner_id*: integer(int64) - 請求先の取引先ID 例: `1002` (最小: 1, 最大: 9223372036854776000)
- invoice_template_id: integer(int64) - 請求書テンプレートID 例: `10002` (最小: 1, 最大: 9223372036854776000)
- invoice_subject: string - 請求書件名 例: `サンプル案件パンフレット作成`
- invoice_note: string - 請求書の備考欄に掲載する内容 例: `お振込期限は月末までとなります`
- collects_on: string(date) - 入金予定日 例: `2021-12-12`
- collecting_partner_id*: integer(int64) - 入金元の取引先ID 例: `1003` (最小: 1, 最大: 9223372036854776000)
- collection_method_type*: string - 入金方法 (振込: transfer, 現金: cash, 手形: bill_payable, 振替: direct_debit) (選択肢: transfer, cash, bill_payable, direct_debit) 例: `transfer`
- charge_employee_id: integer(int64) - 社内担当者の従業員ID 例: `101` (最小: 0, 最大: 9223372036854776000)
- reporting_section_id: integer(int64) - 担当部門ID

  ※ 親部門のIDは指定できません 例: `67890` (最小: 1, 最大: 9223372036854776000)
- internal_memo: string - 社内メモ 例: `重要案件のため優先対応`
- business_id: string - 案件ID 例: `01JPP4FD1CVQWCDSWA90VE1ZTM`
- quotation_id: string - 見積ID 例: `01JPP4FD1CVQWCDSWA90VE1ZTM`
- lines*: array[object] - 明細リスト

## GET /sales_orders/{id} — 受注詳細取得

概要 指定されたIDの受注の詳細情報を取得します。 受注の基本情報に加えて、納品・請求・入金情報などの詳細な進捗情報も取得できます。

### パラメータ

- company_id*: integer(int64) - 事業所ID
- id* (path): string - 受注ID

### レスポンス

受注詳細取得のレスポンス
- id*: string - 受注ID
- sales_order_no*: string - 受注No.
- sales_order_subject: string - 受注タイトル
- sales_order_date*: string(date) - 受注日
- customer_order_no: string - 顧客注文No.
- amount_set*: object - 金額セット
- amount_of_withholding_tax: integer(int64) - 源泉徴収税額
- registered_at*: string(date-time) - 登録日時
- registered_by*: object - 登録者
- last_updated_at*: string(date-time) - 変更日時
- last_updated_by*: object - 変更者
- customer*: object - 顧客
- sales_on: string(date) - 売上予定日
- delivery_progress*: string - 納品進捗 (未納品: not_delivered, 一部納品済: partially_delivered, 納品済: delivered)
- sales_status*: string - 売上ステータス (未計上: not_sold, 一部計上済: partially_sold, 計上済: sold)
- billing_status*: string - 請求書送付ステータス (未送付: not_billed, 一部送付済: partially_billed, 送付済: billed, 対象外: none)
  ※partially_billed（一部送付済）は納品でのみ発生します。none（対象外）は売上でのみ発生します。
- collection_status*: string - 決済ステータス (未決済: not_settled, 一部決済済: partially_settled, 決済済: settled, 無効: invalidated, 対象外: none)
  ※invalidated（無効）は請求でのみ発生します。売上・納品では発生しません。
- business: object - 案件
- quotation_id: string - 見積ID
- total_amount*: integer(int64) - 源泉徴収税額を除いた合計金額
- canceled*: boolean - 取消状態
- amount_set_rates*: array[object]
- deliveries_on: string(date) - 納品予定日
- accepts_on: string(date) - 検収予定日
- delivery_template_name*: string - 納品書テンプレート名称
- delivery_subject: string - 納品書件名
- delivery_note: string - 納品書の備考欄に掲載する内容
- delivered_excluding_tax: integer(int64) - 納品済金額(税抜)
- remaining_delivered_tax: integer(int64) - 納品残金額(税抜)
- sales_excluding_tax: integer(int64) - 売上金額(税抜)
- remaining_sales_order_excluding_tax: integer(int64) - 受注残金額(税抜)
- billing_creating_method_type*: string - 請求作成方法区分 (自動作成: automatically, 手動作成: manually)
- bills_on: string(date) - 請求予定日
- billing_partner*: object - 請求先
- invoice_template_name*: string - 請求書テンプレート名称
- invoice_subject: string - 請求書件名
- invoice_note: string - 請求書の備考欄に掲載する内容
- collects_on: string(date) - 入金予定日
- collecting_partner*: object - 入金元
- collection_method_type*: string - 入金方法 (振込: transfer, 現金: cash, 手形: bill_payable, 振替: direct_debit)
- charge_employee: object - 社内担当者
- reporting_section: object - 担当部門
- internal_memo: string - 社内メモ
- lines*: array[object] - 明細リスト

## PATCH /sales_orders/{id} — 受注更新

概要 指定されたIDの受注を更新します。 受注の基本情報、納品・請求・入金情報などを部分的に更新できます。 送信したフィールドのみが更新され、送信しなかったフィールドは変更されません。

定義
更新可能項目 sales_order_subject : 受注タイトル sales_order_date : 受注日 customer_order_no : 顧客注文No. customer_id : 顧客の取引先ID sales_on : 売上予定日 deliveries_on : 納品予定日 accepts_on : 検収予定日 delivery_template_id : 納品書テンプレートID delivery_subject : 納品書件名 delivery_note : 納品書の備考欄に掲載する内容 billing_creating_method_type : 請求の管理 bills_on : 請求予定日 billing_partner_id : 請求先の取引先ID invoice_template_id : 請求書テンプレートID invoice_subject : 請求書件名 in...

### パラメータ

- id* (path): string - 受注ID

### リクエストボディ

- company_id*: integer(int64) - 事業所ID 例: `1` (最小: 1, 最大: 9223372036854776000)
- sales_order_subject: string - 受注タイトル 例: `サンプル案件パンフレット作成`
- sales_order_date: string(date) - 受注日 例: `2021-12-12`
- customer_order_no: string - 顧客注文No. 例: `C-PO-20211212-001`
- customer_id: integer(int64) - 顧客の取引先ID 例: `1001` (最小: 1, 最大: 9223372036854776000)
- sales_on: string(date) - 売上予定日 例: `2021-12-12`
- deliveries_on: string(date) - 納品予定日 例: `2021-12-12`
- accepts_on: string(date) - 検収予定日 例: `2021-12-12`
- delivery_template_id: integer(int64) - 納品書テンプレートID 例: `10001` (最小: 1, 最大: 9223372036854776000)
- delivery_subject: string - 納品書件名 例: `サンプル案件パンフレット作成`
- delivery_note: string - 納品書の備考欄に掲載する内容 例: `納品時の注意事項`
- billing_creating_method_type: string - 請求作成方法区分 (自動作成: automatically, 手動作成: manually) (選択肢: automatically, manually) 例: `automatically`
- bills_on: string(date) - 請求予定日 例: `2021-12-12`
- billing_partner_id: integer(int64) - 請求先の取引先ID 例: `1002` (最小: 1, 最大: 9223372036854776000)
- invoice_template_id: integer(int64) - 請求書テンプレートID 例: `10002` (最小: 1, 最大: 9223372036854776000)
- invoice_subject: string - 請求書件名 例: `サンプル案件パンフレット作成`
- invoice_note: string - 請求書の備考欄に掲載する内容 例: `お振込期限は月末までとなります`
- collects_on: string(date) - 入金予定日 例: `2021-12-12`
- collecting_partner_id: integer(int64) - 入金元の取引先ID 例: `1003` (最小: 1, 最大: 9223372036854776000)
- collection_method_type: string - 入金方法 (振込: transfer, 現金: cash, 手形: bill_payable, 振替: direct_debit) (選択肢: transfer, cash, bill_payable, direct_debit) 例: `transfer`
- charge_employee_id: integer(int64) - 社内担当者の従業員ID 例: `101` (最小: 0, 最大: 9223372036854776000)
- reporting_section_id: integer(int64) - 担当部門ID

  ※ 親部門のIDは指定できません 例: `67890` (最小: 1, 最大: 9223372036854776000)
- internal_memo: string - 社内メモ 例: `重要案件のため優先対応`
- business_id: string - 案件ID 例: `01JPP4FD1CVQWCDSWA90VE1ZTM`
- quotation_id: string - 見積ID 例: `01JPP4FD1CVQWCDSWA90VE1ZTM`
- lines: array[object] - 明細リスト

## POST /sales_orders/{id}/cancellation — 受注取消

概要 指定されたIDの受注を取り消します。

### パラメータ

PATCH /sales_orders/{id} と同じ

### リクエストボディ

- company_id*: integer(int64) - 事業所ID 例: `1` (最小: 1, 最大: 9223372036854776000)
