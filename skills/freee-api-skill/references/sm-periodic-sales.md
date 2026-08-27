# periodic_sales

定期売上

## GET /periodic_sales — 定期売上一覧

概要 定期売上の一覧を取得します。 登録されている定期売上情報を一覧形式で取得できます。 各種フィルタ条件を指定することで、特定の条件に合致する定期売上のみを取得することが可能です。

定義
canceled : 取消状態(デフォルト:false) start_recurrence_period : 繰り返し期間(絞り込み開始) end_recurrence_period : 繰り返し期間(絞り込み終了) start_recorded_count : 計上済み回数(絞り込み下限) end_recorded_count : 計上済み回数(絞り込み上限) start_total_schedule_count : 売上予定の総回数(絞り込み下限) end_total_schedule_count : 売上予定の総回数(絞り込み上限) start_next_sales_on : 次回売上予定日(絞り込み開始) end_next_sales_on : 次回売上予定日(絞り込み終了) start_last_revenue_recognition_date : 最終計上日(絞り込み開始) end_la...

### パラメータ

- company_id*: integer(int64) - 事業所ID
- canceled: boolean - 取消状態
- start_recurrence_period: string(date) - 繰り返し期間で絞込：指定期間の開始日。この日付以降も有効な（繰り返し終了日がこの日付以降の）定期売上を返す(yyyy-mm-dd)
- end_recurrence_period: string(date) - 繰り返し期間で絞込：指定期間の終了日。この日付までに開始している（繰り返し開始日がこの日付以前の）定期売上を返す(yyyy-mm-dd)
- start_recorded_count: integer(int32) - 計上済み回数で絞込：下限
- end_recorded_count: integer(int32) - 計上済み回数で絞込：上限
- start_total_schedule_count: integer(int32) - 売上予定の総回数で絞込：下限
- end_total_schedule_count: integer(int32) - 売上予定の総回数で絞込：上限
- start_next_sales_on: string(date) - 次回売上予定日で絞込：開始日(yyyy-mm-dd)
- end_next_sales_on: string(date) - 次回売上予定日で絞込：終了日(yyyy-mm-dd)
- start_last_revenue_recognition_date: string(date) - 最終計上日で絞込：開始日(yyyy-mm-dd)
- end_last_revenue_recognition_date: string(date) - 最終計上日で絞込：終了日(yyyy-mm-dd)
- customer_ids[]: array[integer] - 顧客の取引先ID
- charge_employee_ids[]: array[integer] - 社内担当者の従業員ID
- reporting_section_ids[]: array[integer] - 担当部門ID
- business_ids[]: array[string] - 案件ID
- periodic_sales_no: string - 定期売上No.で絞込
- limit: integer(int32) - 取得レコードの件数（デフォルト：20, 最小：1, 最大：100）
- offset: integer(int32) - 取得レコードのオフセット（デフォルト：0）

## POST /periodic_sales — 定期売上登録

概要 新しい定期売上を登録します。 登録した定期売上の繰り返しルールに従って売上予定が作成されます。 前受金を取り崩す定期売上を登録する場合は、本APIではなく「前受金取崩（定期売上登録）」API（ POST /advance_receipts/{id}/periodic_reduction ）を使用してください。

定義
必須項目 customer_id : 顧客の取引先ID recurrence_rule : 繰り返しルール billing_partner_id : 請求先の取引先ID billing_creating_method_type : 請求の管理 collecting_partner_id : 入金元の取引先ID collection_method_type : 入金方法 lines : 明細リスト 任意項目 business_id : 案件ID subject : 定期売上タイトル customer_order_no : 顧客注文No. invoice_template_id : 請求書テンプレートID ※指定しない場合はデフォルトのテンプレートが適用されます。 bil...

### リクエストボディ

- company_id*: integer(int64) - 事業所ID 例: `1` (最小: 1, 最大: 9223372036854776000)
- business_id: string - 案件ID 例: `01JPP4FD1CVQWCDSWA90VE1ZTM`
- customer_id*: integer(int64) - 顧客の取引先ID 例: `1001` (最小: 1, 最大: 9223372036854776000)
- subject: string - 定期売上タイトル 例: `サンプル案件定期売上の件`
- customer_order_no: string - 顧客注文No. 例: `C-PO-20211212-001`
- recurrence_rule*: object - 繰り返しルール
  - start_date*: string(date) - 開始日 例: `2025-04-01`
  - end_date*: string(date) - 終了日 例: `2026-03-31`
  - interval*: string - 周期 (毎月: 1, 2ヶ月ごと: 2, 3ヶ月ごと: 3, 6ヶ月ごと: 6, 12ヶ月ごと: 12, 偶数月: even, 奇数月: odd) (選択肢: 1, 2, 3, 6, 12, even, odd) 例: `1`
  - day_of_month*: integer(int32) - 周期日。1〜28 の日付、または末日を指定します。末日は 32 を指定してください（29〜31 は月によって存在しない日があるため指定できません）。 例: `32`
- billing_partner_id*: integer(int64) - 請求先の取引先ID 例: `1002` (最小: 1, 最大: 9223372036854776000)
- invoice_template_id: integer(int64) - 請求書テンプレートID 例: `10002` (最小: 1, 最大: 9223372036854776000)
- bills_on_rule: object - 請求予定日ルール ※billing_creating_method_typeがautomaticallyの場合は必須
  - cutoff_day*: integer(int32) - 締め日。1〜28 の日付、または末日を指定します。末日は 32 を指定してください（29〜31 は月によって存在しない日があるため指定できません）。 例: `32`
  - additional_months*: integer(int32) - 締め日を基準に加算する月数。0 は当月、1 は翌月、2 は翌々月 例: `1` (最小: 0, 最大: 6)
  - fixed_day*: integer(int32) - 締め日を基準に additional_months か月後の予定日の日。1〜28 の日付、または末日を指定します。末日は 32 を指定してください（29〜31 は月によって存在しない日があるため指定できません）。 例: `32`
- billing_creating_method_type*: string - 請求作成方法区分 (自動作成: automatically, 手動作成: manually) (選択肢: automatically, manually) 例: `automatically`
- invoice_subject: string - 請求書件名 例: `サンプル案件定期売上の件`
- invoice_note: string - 請求書の備考欄に掲載する内容 例: `お振込期限は月末までとなります`
- collecting_partner_id*: integer(int64) - 入金元の取引先ID 例: `1003` (最小: 1, 最大: 9223372036854776000)
- collection_method_type*: string - 入金方法 (振込: transfer, 現金: cash, 手形: bill_payable, 振替: direct_debit) (選択肢: transfer, cash, bill_payable, direct_debit) 例: `transfer`
- collects_on_rule: object - 入金予定日ルール ※billing_creating_method_typeがautomaticallyの場合は必須
  - cutoff_day*: integer(int32) - 締め日。1〜28 の日付、または末日を指定します。末日は 32 を指定してください（29〜31 は月によって存在しない日があるため指定できません）。 例: `32`
  - additional_months*: integer(int32) - 締め日を基準に加算する月数。0 は当月、1 は翌月、2 は翌々月 例: `1` (最小: 0, 最大: 6)
  - fixed_day*: integer(int32) - 締め日を基準に additional_months か月後の予定日の日。1〜28 の日付、または末日を指定します。末日は 32 を指定してください（29〜31 は月によって存在しない日があるため指定できません）。 例: `32`
- charge_employee_id: integer(int64) - 社内担当者の従業員ID 例: `101` (最小: 0, 最大: 9223372036854776000)
- reporting_section_id: integer(int64) - 担当部門ID

  ※ 親部門のIDは指定できません 例: `67890` (最小: 1, 最大: 9223372036854776000)
- internal_memo: string - 社内メモ 例: `重要案件のため優先対応`
- lines*: array[object] - 明細リスト

## GET /periodic_sales/{id} — 定期売上詳細取得

概要 指定されたIDの定期売上の詳細情報を取得します。

### パラメータ

- company_id*: integer(int64) - 事業所ID
- id* (path): string - 定期売上ID

## PATCH /periodic_sales/{id} — 定期売上更新

概要 指定されたIDの定期売上を更新します。 定期売上の基本情報や繰り返しルール、請求・入金情報などを部分的に更新できます。 送信したフィールドのみが更新され、送信しなかったフィールドは変更されません。

定義
更新可能項目 subject : 定期売上タイトル customer_order_no : 顧客注文No. recurrence_rule : 繰り返しルール customer_id : 顧客の取引先ID billing_creating_method_type : 請求の管理 bills_on_rule : 請求予定日ルール ※billing_creating_method_typeがautomaticallyの場合は必須 invoice_template_id : 請求書テンプレートID billing_partner_id : 請求先の取引先ID invoice_subject : 請求書件名 invoice_note : 請求書の備考欄に掲載する内容 collects_on_rule : 入金予定日ルール ※billing_creating_method_typeがaut...

### パラメータ

- id* (path): string - 定期売上ID

### リクエストボディ

- company_id*: integer(int64) - 事業所ID 例: `1` (最小: 1, 最大: 9223372036854776000)
- business_id: string - 案件ID 例: `01JPP4FD1CVQWCDSWA90VE1ZTM`
- customer_id: integer(int64) - 顧客の取引先ID 例: `1001` (最小: 1, 最大: 9223372036854776000)
- subject: string - 定期売上タイトル 例: `サンプル案件定期売上の件`
- customer_order_no: string - 顧客注文No. 例: `C-PO-20211212-001`
- recurrence_rule: object - 繰り返しルール
  - start_date*: string(date) - 開始日 例: `2025-04-01`
  - end_date*: string(date) - 終了日 例: `2026-03-31`
  - interval*: string - 周期 (毎月: 1, 2ヶ月ごと: 2, 3ヶ月ごと: 3, 6ヶ月ごと: 6, 12ヶ月ごと: 12, 偶数月: even, 奇数月: odd) (選択肢: 1, 2, 3, 6, 12, even, odd) 例: `1`
  - day_of_month*: integer(int32) - 周期日。1〜28 の日付、または末日を指定します。末日は 32 を指定してください（29〜31 は月によって存在しない日があるため指定できません）。 例: `32`
- billing_partner_id: integer(int64) - 請求先の取引先ID 例: `1002` (最小: 1, 最大: 9223372036854776000)
- invoice_template_id: integer(int64) - 請求書テンプレートID 例: `10002` (最小: 1, 最大: 9223372036854776000)
- bills_on_rule: object - 請求予定日ルール ※billing_creating_method_typeがautomaticallyの場合は必須
  - cutoff_day*: integer(int32) - 締め日。1〜28 の日付、または末日を指定します。末日は 32 を指定してください（29〜31 は月によって存在しない日があるため指定できません）。 例: `32`
  - additional_months*: integer(int32) - 締め日を基準に加算する月数。0 は当月、1 は翌月、2 は翌々月 例: `1` (最小: 0, 最大: 6)
  - fixed_day*: integer(int32) - 締め日を基準に additional_months か月後の予定日の日。1〜28 の日付、または末日を指定します。末日は 32 を指定してください（29〜31 は月によって存在しない日があるため指定できません）。 例: `32`
- billing_creating_method_type: string - 請求作成方法区分 (自動作成: automatically, 手動作成: manually) (選択肢: automatically, manually) 例: `automatically`
- invoice_subject: string - 請求書件名 例: `サンプル案件定期売上の件`
- invoice_note: string - 請求書の備考欄に掲載する内容 例: `お振込期限は月末までとなります`
- collecting_partner_id: integer(int64) - 入金元の取引先ID 例: `1003` (最小: 1, 最大: 9223372036854776000)
- collection_method_type: string - 入金方法 (振込: transfer, 現金: cash, 手形: bill_payable, 振替: direct_debit) (選択肢: transfer, cash, bill_payable, direct_debit) 例: `transfer`
- collects_on_rule: object - 入金予定日ルール ※billing_creating_method_typeがautomaticallyの場合は必須
  - cutoff_day*: integer(int32) - 締め日。1〜28 の日付、または末日を指定します。末日は 32 を指定してください（29〜31 は月によって存在しない日があるため指定できません）。 例: `32`
  - additional_months*: integer(int32) - 締め日を基準に加算する月数。0 は当月、1 は翌月、2 は翌々月 例: `1` (最小: 0, 最大: 6)
  - fixed_day*: integer(int32) - 締め日を基準に additional_months か月後の予定日の日。1〜28 の日付、または末日を指定します。末日は 32 を指定してください（29〜31 は月によって存在しない日があるため指定できません）。 例: `32`
- charge_employee_id: integer(int64) - 社内担当者の従業員ID 例: `101` (最小: 0, 最大: 9223372036854776000)
- reporting_section_id: integer(int64) - 担当部門ID

  ※ 親部門のIDは指定できません 例: `67890` (最小: 1, 最大: 9223372036854776000)
- internal_memo: string - 社内メモ 例: `重要案件のため優先対応`
- lines: array[object] - 明細リスト

## GET /periodic_sales/{id}/sales_entries — 売上計上状況取得

概要 指定された定期売上に含まれる各回の売上予定について、計上済みか未計上かの状況を一覧で取得します。 各行は1回分の売上予定に対応し、 status が計上済み(actual)か未計上(scheduled)かを示します。 limit/offsetによるページネーションに対応しています。

### パラメータ

- company_id*: integer(int64) - 事業所ID
- id* (path): string - 定期売上ID
- limit: integer(int32) - 取得レコードの件数（デフォルト：20, 最小：1, 最大：100）
- offset: integer(int32) - 取得レコードのオフセット（デフォルト：0）

## POST /periodic_sales/{id}/cancellation — 定期売上取消

概要 指定されたIDの定期売上を取り消します。

### パラメータ

PATCH /periodic_sales/{id} と同じ

### リクエストボディ*

- company_id*: integer(int64) - 事業所ID 例: `1` (最小: 1, 最大: 9223372036854776000)
