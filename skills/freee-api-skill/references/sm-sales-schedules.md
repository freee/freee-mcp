# sales_schedules

売上予定

## GET /sales_schedules — 売上予定一覧

概要 売上予定の一覧を取得します。 登録されている売上予定情報を一覧形式で取得できます。 各種フィルタ条件を指定することで、特定の条件に合致する売上予定のみを取得することが可能です。

定義
periodic_sales_id : 定期売上IDで絞込 start_scheduled_date : 売上予定日(絞り込み開始) end_scheduled_date : 売上予定日(絞り込み終了) customer_ids : 顧客の取引先ID(複数指定可) start_bills_on : 請求予定日(絞り込み開始) end_bills_on : 請求予定日(絞り込み終了) start_collects_on : 入金予定日(絞り込み開始) end_collects_on : 入金予定日(絞り込み終了) charge_employee_ids : 社内担当者の従業員ID(複数指定可) reporting_section_ids : 担当部門ID(複数指定可) business_ids : 案件ID(複数指定可) start_last_updated_date : 変更日時(絞り込み開始) e...

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
- reporting_section_ids[]: array[integer] - 担当部門ID
- business_ids[]: array[string] - 案件ID
- start_last_updated_date: string(date) - 変更日時で絞込：開始日(yyyy-mm-dd)
- end_last_updated_date: string(date) - 変更日時で絞込：終了日(yyyy-mm-dd)
- limit: integer(int32) - 取得レコードの件数（デフォルト：20, 最小：1, 最大：100）
- offset: integer(int32) - 取得レコードのオフセット（デフォルト：0）

## GET /sales_schedules/{id} — 売上予定詳細取得

概要 指定されたIDの売上予定の詳細情報を取得します。 指定された売上予定が既に売上として計上済みの場合、303 See Otherを返却し、Locationヘッダーに計上済み売上の詳細取得APIのURLを設定します。

### パラメータ

- company_id*: integer(int64) - 事業所ID
- id* (path): string - 売上予定ID

## PATCH /sales_schedules/{id} — 売上予定更新

概要 指定されたIDの売上予定を更新します。 送信したフィールドのみが更新され、送信しなかったフィールドは変更されません。

定義
更新可能項目 customer_id : 顧客の取引先ID subject : 件名 customer_order_no : 顧客注文No. scheduled_date : 売上予定日 billing_creating_method_type : 請求の管理 bills_on : 請求予定日 billing_partner_id : 請求先の取引先ID invoice_template_id : 請求書テンプレートID invoice_subject : 請求書件名 invoice_note : 請求書の備考欄に掲載する内容 collects_on : 入金予定日 collecting_partner_id : 入金元の取引先ID collection_method_type : 入金方法 charge_employee_id : 社内担当者の従業員ID reporting_section_id : 担当部門ID internal_memo : 社内メモ ...

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
- charge_employee_id: integer(int64) - 社内担当者の従業員ID 例: `101` (最小: 0, 最大: 9223372036854776000)
- reporting_section_id: integer(int64) - 担当部門ID

  ※ 親部門のIDは指定できません 例: `67890` (最小: 1, 最大: 9223372036854776000)
- internal_memo: string - 社内メモ 例: `重要案件のため優先対応`
- lines: array[object] - 売上予定明細リスト（指定した場合、既存の明細は全て削除され、新しい明細に置き換えられます）

## DELETE /sales_schedules/{id} — 売上予定削除

指定されたIDの売上予定を削除します。

### パラメータ

GET /sales_schedules/{id} と同じ

## POST /sales_schedules/{id}/actualization — 売上予定の売上計上

指定されたIDの売上予定を売上として計上します。

### パラメータ

PATCH /sales_schedules/{id} と同じ

### リクエストボディ

- company_id*: integer(int64) - 事業所ID 例: `1` (最小: 1, 最大: 9223372036854776000)
