# sales_schedules

## 概要

sales_schedulesの操作

## エンドポイント一覧

### GET /sales_schedules

操作: 売上予定一覧

説明: 概要 売上予定の一覧を取得します。 登録されている売上予定情報を一覧形式で取得できます。 各種フィルタ条件を指定することで、特定の条件に合致する売上予定のみを取得することが可能です。

定義
periodic_sales_id : 定期売上IDで絞込 start_scheduled_date : 売上予定日(絞り込み開始) end_scheduled_date : 売上予定日(絞り込み終了) customer_ids : 顧客の取引先ID(複数指定可) start_bills_on : 請求予定日(絞り込み開始) end_bills_on : 請求予定日(絞り込み終了) start_collects_on : 入金予定日(絞り込み開始) end_collects_on : 入金予定日(絞り込み終了) charge_employee_ids : 社内担当者の従業員ID(複数指定可) reporting_section_ids : 担当部門ID(複数指定可) business_ids : 案件ID(複数指定可) start_last_updated_date : 変更日時(絞り込み開始) e...

### パラメータ

| 名前 | 位置 | 必須 | 型 | 説明 |
|------|------|------|-----|------|
| company_id | query | はい | integer(int64) | 事業所ID |
| periodic_sales_id | query | いいえ | string | 定期売上IDで絞込 |
| start_scheduled_date | query | いいえ | string(date) | 売上予定日で絞込：開始日(yyyy-mm-dd) |
| end_scheduled_date | query | いいえ | string(date) | 売上予定日で絞込：終了日(yyyy-mm-dd) |
| customer_ids[] | query | いいえ | array[integer] | 顧客の取引先ID |
| start_bills_on | query | いいえ | string(date) | 請求予定日で絞込：開始日(yyyy-mm-dd) |
| end_bills_on | query | いいえ | string(date) | 請求予定日で絞込：終了日(yyyy-mm-dd) |
| start_collects_on | query | いいえ | string(date) | 入金予定日で絞込：開始日(yyyy-mm-dd) |
| end_collects_on | query | いいえ | string(date) | 入金予定日で絞込：終了日(yyyy-mm-dd) |
| charge_employee_ids[] | query | いいえ | array[integer] | 社内担当者の従業員ID |
| reporting_section_ids[] | query | いいえ | object | 担当部門ID |
| business_ids[] | query | いいえ | array[string] | 案件ID |
| start_last_updated_date | query | いいえ | string(date) | 変更日時で絞込：開始日(yyyy-mm-dd) |
| end_last_updated_date | query | いいえ | string(date) | 変更日時で絞込：終了日(yyyy-mm-dd) |
| limit | query | いいえ | integer(int32) | 取得レコードの件数（デフォルト：20, 最小：1, 最大：100） |
| offset | query | いいえ | integer(int32) | 取得レコードのオフセット（デフォルト：0） |

### レスポンス (200)

### GET /sales_schedules/{id}

操作: 売上予定詳細取得

説明: 概要 指定されたIDの売上予定の詳細情報を取得します。 指定された売上予定が既に売上として計上済みの場合、303 See Otherを返却し、Locationヘッダーに計上済み売上の詳細取得APIのURLを設定します。

### パラメータ

| 名前 | 位置 | 必須 | 型 | 説明 |
|------|------|------|-----|------|
| company_id | query | はい | integer(int64) | 事業所ID |
| id | path | はい | string | 売上予定ID |

### レスポンス (200)

### PATCH /sales_schedules/{id}

操作: 売上予定更新

説明: 概要 指定されたIDの売上予定を更新します。 送信したフィールドのみが更新され、送信しなかったフィールドは変更されません。

定義
更新可能項目 customer_id : 顧客の取引先ID subject : 件名 customer_order_no : 顧客注文No. scheduled_date : 売上予定日 billing_creating_method_type : 請求の管理 bills_on : 請求予定日 billing_partner_id : 請求先の取引先ID invoice_template_id : 請求書テンプレートID invoice_subject : 請求書件名 invoice_note : 請求書の備考欄に掲載する内容 collects_on : 入金予定日 collecting_partner_id : 入金元の取引先ID collection_method_type : 入金方法 charge_employee_id : 社内担当者の従業員ID reporting_section_id : 担当部門ID internal_memo : 社内メモ ...

### パラメータ

| 名前 | 位置 | 必須 | 型 | 説明 |
|------|------|------|-----|------|
| id | path | はい | string | 売上予定ID |

### レスポンス (200)

### DELETE /sales_schedules/{id}

操作: 売上予定削除

説明: 指定されたIDの売上予定を削除します。

### パラメータ

| 名前 | 位置 | 必須 | 型 | 説明 |
|------|------|------|-----|------|
| company_id | query | はい | integer(int64) | 事業所ID |
| id | path | はい | string | 売上予定ID |

### レスポンス (200)

### POST /sales_schedules/{id}/actualization

操作: 売上予定の売上計上

説明: 指定されたIDの売上予定を売上として計上します。

### パラメータ

| 名前 | 位置 | 必須 | 型 | 説明 |
|------|------|------|-----|------|
| id | path | はい | string | 売上予定ID |

### レスポンス (201)



## 参考情報

- freee API公式ドキュメント: https://developer.freee.co.jp/docs
