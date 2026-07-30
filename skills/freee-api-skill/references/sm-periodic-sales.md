# periodic_sales

## 概要

定期売上

## エンドポイント一覧

### GET /periodic_sales

操作: 定期売上一覧

説明: 概要 定期売上の一覧を取得します。 登録されている定期売上情報を一覧形式で取得できます。 各種フィルタ条件を指定することで、特定の条件に合致する定期売上のみを取得することが可能です。

定義
canceled : 取消状態(デフォルト:false) start_recurrence_period : 繰り返し期間(絞り込み開始) end_recurrence_period : 繰り返し期間(絞り込み終了) start_recorded_count : 計上済み回数(絞り込み下限) end_recorded_count : 計上済み回数(絞り込み上限) start_total_schedule_count : 売上予定の総回数(絞り込み下限) end_total_schedule_count : 売上予定の総回数(絞り込み上限) start_next_sales_on : 次回売上予定日(絞り込み開始) end_next_sales_on : 次回売上予定日(絞り込み終了) start_last_revenue_recognition_date : 最終計上日(絞り込み開始) end_la...

### パラメータ

| 名前 | 位置 | 必須 | 型 | 説明 |
|------|------|------|-----|------|
| company_id | query | はい | integer(int64) | 事業所ID |
| canceled | query | いいえ | boolean | 取消状態 |
| start_recurrence_period | query | いいえ | string(date) | 繰り返し期間で絞込：指定期間の開始日。この日付以降も有効な（繰り返し終了日がこの日付以降の）定期売上を返す(yyyy-mm-dd) |
| end_recurrence_period | query | いいえ | string(date) | 繰り返し期間で絞込：指定期間の終了日。この日付までに開始している（繰り返し開始日がこの日付以前の）定期売上を返す(yyyy-mm-dd) |
| start_recorded_count | query | いいえ | integer(int32) | 計上済み回数で絞込：下限 |
| end_recorded_count | query | いいえ | integer(int32) | 計上済み回数で絞込：上限 |
| start_total_schedule_count | query | いいえ | integer(int32) | 売上予定の総回数で絞込：下限 |
| end_total_schedule_count | query | いいえ | integer(int32) | 売上予定の総回数で絞込：上限 |
| start_next_sales_on | query | いいえ | string(date) | 次回売上予定日で絞込：開始日(yyyy-mm-dd) |
| end_next_sales_on | query | いいえ | string(date) | 次回売上予定日で絞込：終了日(yyyy-mm-dd) |
| start_last_revenue_recognition_date | query | いいえ | string(date) | 最終計上日で絞込：開始日(yyyy-mm-dd) |
| end_last_revenue_recognition_date | query | いいえ | string(date) | 最終計上日で絞込：終了日(yyyy-mm-dd) |
| customer_ids[] | query | いいえ | array[integer] | 顧客の取引先ID |
| charge_employee_ids[] | query | いいえ | array[integer] | 社内担当者の従業員ID |
| reporting_section_ids[] | query | いいえ | object | 担当部門ID |
| business_ids[] | query | いいえ | array[string] | 案件ID |
| periodic_sales_no | query | いいえ | string | 定期売上No.で絞込 |
| limit | query | いいえ | integer(int32) | 取得レコードの件数（デフォルト：20, 最小：1, 最大：100） |
| offset | query | いいえ | integer(int32) | 取得レコードのオフセット（デフォルト：0） |

### レスポンス (200)

### POST /periodic_sales

操作: 定期売上登録

説明: 概要 新しい定期売上を登録します。 登録した定期売上の繰り返しルールに従って売上予定が作成されます。 前受金を取り崩す定期売上を登録する場合は、本APIではなく「前受金取崩（定期売上登録）」API（POST /advance_receipts/{id}/periodic_reduction）を使用してください。

定義
必須項目 customer_id : 顧客の取引先ID recurrence_rule : 繰り返しルール billing_partner_id : 請求先の取引先ID billing_creating_method_type : 請求の管理 collecting_partner_id : 入金元の取引先ID collection_method_type : 入金方法 lines : 明細リスト 任意項目 business_id : 案件ID subject : 定期売上タイトル customer_order_no : 顧客注文No. invoice_template_id : 請求書テンプレートID ※指定しない場合はデフォルトのテンプレートが適用されます。 bills...

### レスポンス (201)

### GET /periodic_sales/{id}

操作: 定期売上詳細取得

説明: 概要 指定されたIDの定期売上の詳細情報を取得します。

### パラメータ

| 名前 | 位置 | 必須 | 型 | 説明 |
|------|------|------|-----|------|
| company_id | query | はい | integer(int64) | 事業所ID |
| id | path | はい | string | 定期売上ID |

### レスポンス (200)

### PATCH /periodic_sales/{id}

操作: 定期売上更新

説明: 概要 指定されたIDの定期売上を更新します。 定期売上の基本情報や繰り返しルール、請求・入金情報などを部分的に更新できます。 送信したフィールドのみが更新され、送信しなかったフィールドは変更されません。

定義
更新可能項目 subject : 定期売上タイトル customer_order_no : 顧客注文No. recurrence_rule : 繰り返しルール customer_id : 顧客の取引先ID billing_creating_method_type : 請求の管理 bills_on_rule : 請求予定日ルール ※billing_creating_method_typeがautomaticallyの場合は必須 invoice_template_id : 請求書テンプレートID billing_partner_id : 請求先の取引先ID invoice_subject : 請求書件名 invoice_note : 請求書の備考欄に掲載する内容 collects_on_rule : 入金予定日ルール ※billing_creating_method_typeがaut...

### パラメータ

| 名前 | 位置 | 必須 | 型 | 説明 |
|------|------|------|-----|------|
| id | path | はい | string | 定期売上ID |

### レスポンス (200)

### GET /periodic_sales/{id}/sales_entries

操作: 売上計上状況取得

説明: 概要 指定された定期売上に含まれる各回の売上予定について、計上済みか未計上かの状況を一覧で取得します。 各行は1回分の売上予定に対応し、statusが計上済み(actual)か未計上(scheduled)かを示します。 limit/offsetによるページネーションに対応しています。

### パラメータ

| 名前 | 位置 | 必須 | 型 | 説明 |
|------|------|------|-----|------|
| company_id | query | はい | integer(int64) | 事業所ID |
| id | path | はい | string | 定期売上ID |
| limit | query | いいえ | integer(int32) | 取得レコードの件数（デフォルト：20, 最小：1, 最大：100） |
| offset | query | いいえ | integer(int32) | 取得レコードのオフセット（デフォルト：0） |

### レスポンス (200)

### POST /periodic_sales/{id}/cancellation

操作: 定期売上取消

説明: 概要 指定されたIDの定期売上を取り消します。

### パラメータ

| 名前 | 位置 | 必須 | 型 | 説明 |
|------|------|------|-----|------|
| id | path | はい | string | 定期売上ID |

### レスポンス (200)



## 参考情報

- freee API公式ドキュメント: https://developer.freee.co.jp/docs
