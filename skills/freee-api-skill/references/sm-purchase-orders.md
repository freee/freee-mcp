# purchase_orders

発注

## GET /purchase_orders — 発注一覧

概要 発注の一覧を取得します。 登録されている発注情報を一覧形式で取得できます。 各種フィルタ条件を指定することで、特定の条件に合致する発注のみを取得することが可能です。

定義
start_registered_date : 発注登録日(絞り込み開始) end_registered_date : 発注登録日(絞り込み終了) start_last_updated_date : 発注更新日(絞り込み開始) end_last_updated_date : 発注更新日(絞り込み終了) start_purchase_order_date : 発注日(絞り込み開始) end_purchase_order_date : 発注日(絞り込み終了) charge_employee_ids : 社内担当者の従業員ID(複数指定可) supplier_ids : 仕入先の取引先ID(複数指定可) business_ids : 案件ID(複数指定可) purchase_order_no : 発注No. payment_status : 支払ステータス issued : 送付ステータス procurement_s...

### パラメータ

- company_id*: integer(int64) - 事業所ID
- start_registered_date: string(date) - 発注登録日で絞込：開始日(yyyy-mm-dd)
- end_registered_date: string(date) - 発注登録日で絞込：終了日(yyyy-mm-dd)
- start_last_updated_date: string(date) - 発注更新日で絞込：開始日(yyyy-mm-dd)
- end_last_updated_date: string(date) - 発注更新日で絞込：終了日(yyyy-mm-dd)
- start_purchase_order_date: string(date) - 発注日で絞込：開始日(yyyy-mm-dd)
- end_purchase_order_date: string(date) - 発注日で絞込：終了日(yyyy-mm-dd)
- charge_employee_ids[]: array[integer] - 社内担当者の従業員ID
- supplier_ids[]: array[integer] - 仕入先の取引先ID
- business_ids[]: array[string] - 案件ID
- purchase_order_no: string - 発注No.で絞込
- payment_status: string - 支払ステータス (なし: none, 未決済: not_settled, 一部決済済: partially_settled, 決済済: settled) (選択肢: none, not_settled, partially_settled, settled)
- issued: boolean - 送付ステータス
- procurement_status: string - 仕入ステータス (未計上: not_sold, 一部計上済: partially_sold, 計上済: sold) (選択肢: not_sold, partially_sold, sold)
- canceled: boolean - 取消状態
- limit: integer(int32) - 取得レコードの件数（デフォルト：20, 最小：1, 最大：100）
- offset: integer(int32) - 取得レコードのオフセット（デフォルト：0）

## POST /purchase_orders — 発注登録

概要 新しい発注を登録します。 仕入先への発注情報を登録し、発注書の発行や仕入への引き継ぎに利用できます。

定義
必須項目 purchase_order_date : 発注日 supplier_id : 仕入先の取引先ID payment_method_type : 支払方法 payment_partner_id : 支払先の取引先ID lines : 明細リスト 任意項目 is_qualified_invoice_issuer : 適格請求書発行事業者該当フラグ business_id : 案件ID internal_subject : 発注タイトル procurements_on : 仕入予定日 delivery_deadline : 納品期限日 delivery_location : 納品場所 purchase_order_note : 発注書の備考欄に記載する内容 purchase_order_template_id : 発注書テンプレートID ※指定しない場合はデフォルトのテンプレートが適用されます。 purchase_order_subject : 発注書件名 recipi...

## GET /purchase_orders/{id} — 発注詳細取得

概要 指定されたIDの発注の詳細情報を取得します。 発注の基本情報に加えて、明細情報や各種ステータスなどの詳細な情報も取得できます。

### パラメータ

- company_id*: integer(int64) - 事業所ID
- id* (path): string - 発注ID

### レスポンス

発注詳細取得のレスポンス

## PATCH /purchase_orders/{id} — 発注更新

概要 指定されたIDの発注を更新します。 発注の基本情報を部分的に更新できます。 送信したフィールドのみが更新され、送信しなかったフィールドは変更されません。

定義
更新可能項目 branch_no : 枝番 business_id : 案件ID internal_subject : 発注タイトル purchase_order_date : 発注日 supplier_id : 仕入先の取引先ID is_qualified_invoice_issuer : 適格請求書発行事業者該当フラグ procurements_on : 仕入予定日 delivery_deadline : 納品期限日 delivery_location : 納品場所 purchase_order_note : 発注書の備考欄に記載する内容 purchase_order_template_id : 発注書テンプレートID purchase_order_subject : 発注書件名 recipient_address : 宛先情報（指定した場合、既存の宛先情報は全て削除され、新しい宛先情報に置き換えられます） payme...

### パラメータ

- id* (path): string - 発注ID

## POST /purchase_orders/{id}/cancellation — 発注取消

概要 指定されたIDの発注を取り消します。

定義
必須項目 company_id : 事業所ID

### パラメータ

PATCH /purchase_orders/{id} と同じ
