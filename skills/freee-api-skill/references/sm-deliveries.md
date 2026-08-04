# deliveries

納品

## GET /deliveries — 納品一覧

概要 納品の一覧を取得します。 登録されている納品情報を一覧形式で取得できます。 各種フィルタ条件を指定することで、特定の条件に合致する納品のみを取得することが可能です。

定義
start_registered_date : 登録日(絞り込み開始) end_registered_date : 登録日(絞り込み終了) start_last_updated_date : 更新日(絞り込み開始) end_last_updated_date : 更新日(絞り込み終了) start_delivery_date : 納品日(絞り込み開始) end_delivery_date : 納品日(絞り込み終了) start_acceptance_date : 検収日(絞り込み開始) end_acceptance_date : 検収日(絞り込み終了) charge_employee_ids : 社内担当者の従業員ID(複数指定可) customer_ids : 顧客の取引先ID(複数指定可) delivery_no : 納品No. delivery_status : 納品ステータス canceled : 取消...

### パラメータ

- company_id*: integer(int64) - 事業所ID
- start_registered_date: string(date) - 登録日で絞込：開始日(yyyy-mm-dd)
- end_registered_date: string(date) - 登録日で絞込：終了日(yyyy-mm-dd)
- start_last_updated_date: string(date) - 更新日で絞込：開始日(yyyy-mm-dd)
- end_last_updated_date: string(date) - 更新日で絞込：終了日(yyyy-mm-dd)
- start_delivery_date: string(date) - 納品日で絞込：開始日(yyyy-mm-dd)
- end_delivery_date: string(date) - 納品日で絞込：終了日(yyyy-mm-dd)
- start_acceptance_date: string(date) - 検収日で絞込：開始日(yyyy-mm-dd)
- end_acceptance_date: string(date) - 検収日で絞込：終了日(yyyy-mm-dd)
- charge_employee_ids[]: array[integer] - 社内担当者の従業員ID
- customer_ids[]: array[integer] - 顧客の取引先ID
- delivery_no: string - 納品No.で絞込
- delivery_status: string - 納品ステータス (未納品: not_delivered, 納品済: delivered) (選択肢: not_delivered, delivered)
- canceled: boolean - 取消状態
- limit: integer(int32) - 取得レコードの件数（デフォルト：20, 最小：1, 最大：100）
- offset: integer(int32) - 取得レコードのオフセット（デフォルト：0）

## POST /deliveries — 納品登録

概要 新しい納品を登録します。 受注に紐づく納品、または独立した納品を登録できます。

定義
必須項目 delivery_date : 納品日 customer_id : 顧客の取引先ID billing_partner_id : 請求先の取引先ID billing_creating_method_type : 請求作成方法 collecting_partner_id : 入金元の取引先ID collection_method_type : 入金方法 lines : 明細リスト 任意項目 sales_order_id : 受注ID（受注に紐づける場合） business_id : 案件ID internal_subject : 納品タイトル customer_order_no : 顧客注文No. acceptance_date : 検収日 delivery_note : 納品書の備考欄に記載する内容 delivery_template_id : 納品書テンプレートID ※指定しない場合はデフォルトのテンプレートが適用されます。 subject : 納品書件名 recipient_addr...

## GET /deliveries/{id} — 納品詳細取得

概要 指定されたIDの納品の詳細情報を取得します。 納品の基本情報に加えて、売上・請求情報などの詳細な進捗情報も取得できます。

### パラメータ

- company_id*: integer(int64) - 事業所ID
- id* (path): string - 納品ID

### レスポンス

納品詳細取得のレスポンス

## PATCH /deliveries/{id} — 納品更新

概要 指定されたIDの納品を更新します。 納品の基本情報、請求・入金情報などを部分的に更新できます。 送信したフィールドのみが更新され、送信しなかったフィールドは変更されません。

定義
更新可能項目 branch_no : 枝番 internal_subject : 納品タイトル delivery_date : 納品日 customer_order_no : 顧客注文No. acceptance_date : 検収日 customer_id : 顧客の取引先ID delivery_note : 納品書の備考欄に記載する内容 delivery_template_id : 納品書テンプレートID subject : 納品書件名 recipient_address : 宛先情報（指定した場合、既存の宛先情報は全て削除され、新しい宛先情報に置き換えられます） billing_creating_method_type : 請求作成方法 bills_on : 請求予定日 invoice_template_id : 請求書テンプレートID billing_partner_id : 請求先の取引先ID...

### パラメータ

- id* (path): string - 納品ID

## POST /deliveries/{id}/cancellation — 納品取消

概要 指定されたIDの納品を取り消します。

### パラメータ

PATCH /deliveries/{id} と同じ

## PUT /deliveries/{id}/delivery_status — 納品ステータス変更

概要 指定されたIDの納品の納品ステータスを変更します。

定義
status : 納品ステータス (未納品: not_delivered, 納品済: delivered)

### パラメータ

PATCH /deliveries/{id} と同じ

## PUT /deliveries/{id}/acceptance_status — 検収ステータス変更

概要 指定されたIDの納品の検収ステータスを変更します。

定義
status : 検収ステータス (未検収: not_accepted, 検収済: accepted)

### パラメータ

PATCH /deliveries/{id} と同じ
