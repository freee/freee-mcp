# advance_receipts

前受金

## GET /advance_receipts — 前受金一覧

概要 前受金の一覧を取得します。 登録されている前受金情報を一覧形式で取得できます。 各種フィルタ条件を指定することで、特定の条件に合致する前受金のみを取得することが可能です。

定義
advance_receipt_no : 前受金No. start_advance_receipt_date : 前受金発生日(絞り込み開始) end_advance_receipt_date : 前受金発生日(絞り込み終了) start_registered_date : 前受金登録日(絞り込み開始) end_registered_date : 前受金登録日(絞り込み終了) start_last_updated_date : 前受金更新日(絞り込み開始) end_last_updated_date : 前受金更新日(絞り込み終了) customer_ids : 顧客の取引先ID(複数指定可) charge_employee_ids : 社内担当者の従業員ID(複数指定可) business_ids : 案件ID(複数指定可) billing_status : 請求書送付ステータス collection_...

### パラメータ

- company_id*: integer(int64) - 事業所ID
- advance_receipt_no: string - 前受金No.で絞込
- start_advance_receipt_date: string(date) - 前受金発生日で絞込：開始日(yyyy-mm-dd)
- end_advance_receipt_date: string(date) - 前受金発生日で絞込：終了日(yyyy-mm-dd)
- start_registered_date: string(date) - 前受金登録日で絞込：開始日(yyyy-mm-dd)
- end_registered_date: string(date) - 前受金登録日で絞込：終了日(yyyy-mm-dd)
- start_last_updated_date: string(date) - 前受金更新日で絞込：開始日(yyyy-mm-dd)
- end_last_updated_date: string(date) - 前受金更新日で絞込：終了日(yyyy-mm-dd)
- customer_ids[]: array[integer] - 顧客の取引先ID
- charge_employee_ids[]: array[integer] - 社内担当者の従業員ID
- business_ids[]: array[string] - 案件ID
- billing_status: string - 請求書送付ステータス (未請求: not_billed, 一部請求済: partially_billed, 請求済: billed, なし: none) (選択肢: not_billed, partially_billed, billed, none)
- collection_status: string - 入金ステータス (未決済: not_settled, 一部決済済: partially_settled, 決済済: settled, 無効: invalidated, 対象外: none) (選択肢: not_settled, partially_settled, settled, invalidated, none)
- canceled: boolean - 取消状態
- limit: integer(int32) - 取得レコードの件数（デフォルト：20, 最小：1, 最大：100）
- offset: integer(int32) - 取得レコードのオフセット（デフォルト：0）

## POST /advance_receipts — 前受金登録

概要 新しい前受金を登録します。 顧客から受け取った前受金情報を登録し、請求・入金管理に利用できます。

定義
必須項目 account_item_id : 勘定科目ID advance_receipt_date : 前受金発生日 billing_partner_id : 請求先の取引先ID bills_on : 請求日 business_id : 案件ID collecting_partner_id : 入金元の取引先ID collection_method_type : 入金方法 collects_on : 入金期日 customer_id : 顧客の取引先ID lines : 明細リスト 任意項目 sales_order_id : 引継元受注ID（受注に紐づける場合） accounting_reporting_section_id : 会計計上部門ID charge_employee_id : 社内担当者の従業員ID customer_order_no : 顧客注文No. internal_memo : 社内メモ internal_subject : 前受金タイトル invoice...

## GET /advance_receipts/{id} — 前受金詳細取得

概要 指定されたIDの前受金の詳細情報を取得します。 前受金の基本情報に加えて、明細、勘定科目、品目タグ、メモタグ、セグメントタグなどの詳細情報も取得できます。

### パラメータ

- company_id*: integer(int64) - 事業所ID
- id* (path): string - 前受金ID

### レスポンス

前受金詳細取得のレスポンス

## PATCH /advance_receipts/{id} — 前受金更新

概要 指定されたIDの前受金を更新します。 前受金の基本情報を部分的に更新できます。 送信したフィールドのみが更新され、送信しなかったフィールドは変更されません。

定義
更新可能項目 account_item_id : 勘定科目ID advance_receipt_date : 前受金発生日 business_id : 案件ID customer_id : 顧客の取引先ID lines : 明細リスト（指定した場合、既存の明細は全て削除され、新しい明細に置き換えられます） accounting_reporting_section_id : 会計計上部門ID charge_employee_id : 社内担当者の従業員ID customer_order_no : 顧客注文No. internal_memo : 社内メモ internal_subject : 前受金タイトル item_tag_id : 会計品目タグID memo_tags : メモタグID reporting_section_id : 担当部門ID segment_tag_1_id : セグメント1のID segment_...

### パラメータ

- id* (path): string - 前受金ID

## POST /advance_receipts/{id}/cancellation — 前受金取消

概要 指定されたIDの前受金を取り消します。

### パラメータ

PATCH /advance_receipts/{id} と同じ

## POST /advance_receipts/{id}/reduction — 前受金取崩（売上登録）

概要 指定されたIDの前受金を取り崩して売上を登録します。

### パラメータ

PATCH /advance_receipts/{id} と同じ

## POST /advance_receipts/{id}/periodic_reduction — 前受金取崩（定期売上登録）

概要 指定されたIDの前受金を取り崩す定期売上を登録します。繰り返しルールに従って売上予定が作成されます。

### パラメータ

PATCH /advance_receipts/{id} と同じ
