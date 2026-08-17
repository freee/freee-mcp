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

### リクエストボディ

- company_id*: integer(int64) - 事業所ID 例: `1` (最小: 1, 最大: 9223372036854776000)
- sales_order_id: string - 受注ID 例: `01JPP4FD1CVQWCDSWA90VE1ZTM`
- business_id: string - 案件ID 例: `01JPP4FD1CVQWCDSWA90VE1ZTM`
- internal_subject: string - 納品タイトル 例: `サンプル案件納品の件`
- customer_order_no: string - 顧客注文No. 例: `C-PO-20250401-001`
- delivery_date*: string(date) - 納品日 例: `2025-04-01`
- acceptance_date: string(date) - 検収日 例: `2025-04-01`
- customer_id*: integer(int64) - 顧客の取引先ID 例: `1001` (最小: 1, 最大: 9223372036854776000)
- delivery_note: string - 納品書の備考欄に記載する内容 例: `納品時の注意事項`
- delivery_template_id: integer(int64) - 納品書テンプレートID 例: `10001` (最小: 1, 最大: 9223372036854776000)
- subject: string - 納品書件名 例: `サンプル案件納品の件`
- recipient_address: object - 宛先
  - official_name: string - 正式名称 例: `株式会社サンプル`
  - default_title: string - 敬称 (選択肢: none, to_person, to_organization)
  - zipcode: string - 郵便番号 例: `150-0001`
  - prefecture_code: integer(int64) - 都道府県コード（-1: 設定しない、0: 北海道、1:青森、2:岩手、3:宮城、4:秋田、5:山形、6:福島、7:茨城、8:栃木、9:群馬、10:埼玉、11:千葉、12:東京、13:神奈川、14:新潟、15:富山、16:石川、17:福井、18:山梨、19:長野、20:岐阜、21:静岡、22:愛知、23:三重、24:滋賀、25:京都、26:大阪、27:兵庫、28:奈良、29:和歌山、30:鳥取、31:島根、32:岡山、33:広島、34:山口、35:徳島、36:香川、37:愛媛、38:高知、39:福岡、40:佐賀、41:長崎、42:熊本、43:大分、44:宮崎、45:鹿児島、46:沖縄） 例: `12`
  - street_name1: string - 住所1 例: `渋谷区神宮前1-1-1`
  - street_name2: string - 住所2 例: `サンプルビル3F`
  - contact_department: string - 連絡先部署 例: `営業部`
  - contact_name: string - 連絡先名 例: `山田太郎`
- billing_creating_method_type*: string - 請求作成方法区分 (自動作成: automatically, 手動作成: manually) (選択肢: automatically, manually) 例: `automatically`
- bills_on: string(date) - 請求予定日 例: `2025-04-01`
- invoice_template_id: integer(int64) - 請求書テンプレートID 例: `10002` (最小: 1, 最大: 9223372036854776000)
- billing_partner_id*: integer(int64) - 請求先の取引先ID 例: `1002` (最小: 1, 最大: 9223372036854776000)
- invoice_subject: string - 請求書件名 例: `サンプル案件納品の件`
- invoice_note: string - 請求書の備考欄に掲載する内容 例: `お振込期限は月末までとなります`
- collects_on: string(date) - 入金予定日 例: `2025-04-01`
- collection_method_type*: string - 入金方法 (振込: transfer, 現金: cash, 手形: bill_payable, 振替: direct_debit) (選択肢: transfer, cash, bill_payable, direct_debit) 例: `transfer`
- collecting_partner_id*: integer(int64) - 入金元の取引先ID 例: `1003` (最小: 1, 最大: 9223372036854776000)
- charge_employee_id: integer(int64) - 社内担当者の従業員ID 例: `101` (最小: 0, 最大: 9223372036854776000)
- reporting_section_id: integer(int64) - 担当部門ID

  ※ 親部門のIDは指定できません 例: `67890` (最小: 1, 最大: 9223372036854776000)
- internal_memo: string - 社内メモ 例: `重要案件のため優先対応`
- lines*: array[object] - 明細リスト

## GET /deliveries/{id} — 納品詳細取得

概要 指定されたIDの納品の詳細情報を取得します。 納品の基本情報に加えて、売上・請求情報などの詳細な進捗情報も取得できます。

### パラメータ

- company_id*: integer(int64) - 事業所ID
- id* (path): string - 納品ID

### レスポンス

納品詳細取得のレスポンス
- id*: string - 納品ID
- sales_order_id: string - 受注ID
- delivery_status*: string - 納品ステータス (未納品: not_delivered, 納品済: delivered)
- acceptance_status*: string - 検収ステータス (未検収: not_accepted, 検収済: accepted)
- canceled*: boolean - 取消状態
- registered_at*: string(date-time) - 登録日時
- registered_by*: object - 登録者
- last_updated_at*: string(date-time) - 変更日時
- last_updated_by*: object - 変更者
- amount_set*: object - 金額セット
- amount_of_withholding_tax: integer(int64) - 源泉徴収税額
- total_amount*: integer(int64) - 源泉徴収税額を除いた合計金額
- business: object - 案件
- delivery_no*: string - 納品No.
- branch_no: integer(int32) - 枝番
- internal_subject: string - 納品タイトル
- customer_order_no: string - 顧客注文No.
- delivery_date*: string(date) - 納品日
- acceptance_date: string(date) - 検収日
- customer*: object - 顧客
- issued*: boolean - 送付ステータス
- issued_on: string(date) - 送付日
- subject: string - 納品書件名
- sales_status*: string - 売上ステータス (未計上: not_sold, 一部計上済: partially_sold, 計上済: sold)
- billing_status*: string - 請求書送付ステータス (未送付: not_billed, 一部送付済: partially_billed, 送付済: billed, 対象外: none)
  ※partially_billed（一部送付済）は納品でのみ発生します。none（対象外）は売上でのみ発生します。
- collection_status*: string - 決済ステータス (未決済: not_settled, 一部決済済: partially_settled, 決済済: settled, 無効: invalidated, 対象外: none)
  ※invalidated（無効）は請求でのみ発生します。売上・納品では発生しません。
- amount_set_rates*: array[object]
- delivery_note: string - 納品書の備考欄に記載する内容
- delivery_template_name*: string - 納品書テンプレート名称
- recipient_address*: object - 宛先
- recorded_sales_amount_excluding_tax*: integer(int64) - 売上金額(税抜)
- remaining_sales_amount_excluding_tax*: integer(int64) - 売上残金額(税抜)
- billing_creating_method_type*: string - 請求作成方法区分 (自動作成: automatically, 手動作成: manually)
- bills_on: string(date) - 請求予定日
- invoice_template_name*: string - 請求書テンプレート名称
- billing_partner: object - 請求先
- invoice_subject: string - 請求書件名
- invoice_note: string - 請求書の備考欄に掲載する内容
- collects_on: string(date) - 入金予定日
- collection_method_type*: string - 入金方法 (振込: transfer, 現金: cash, 手形: bill_payable, 振替: direct_debit)
- collecting_partner: object - 入金元
- charge_employee: object - 社内担当者
- reporting_section: object - 担当部門
- internal_memo: string - 社内メモ
- lines*: array[object] - 明細リスト

## PATCH /deliveries/{id} — 納品更新

概要 指定されたIDの納品を更新します。 納品の基本情報、請求・入金情報などを部分的に更新できます。 送信したフィールドのみが更新され、送信しなかったフィールドは変更されません。

定義
更新可能項目 branch_no : 枝番 internal_subject : 納品タイトル delivery_date : 納品日 customer_order_no : 顧客注文No. acceptance_date : 検収日 customer_id : 顧客の取引先ID delivery_note : 納品書の備考欄に記載する内容 delivery_template_id : 納品書テンプレートID subject : 納品書件名 recipient_address : 宛先情報（指定した場合、既存の宛先情報は全て削除され、新しい宛先情報に置き換えられます） billing_creating_method_type : 請求作成方法 bills_on : 請求予定日 invoice_template_id : 請求書テンプレートID billing_partner_id : 請求先の取引先ID...

### パラメータ

- id* (path): string - 納品ID

### リクエストボディ

- company_id*: integer(int64) - 事業所ID 例: `1` (最小: 1, 最大: 9223372036854776000)
- business_id: string - 案件ID 例: `01JPP4FD1CVQWCDSWA90VE1ZTM`
- internal_subject: string - 納品タイトル 例: `サンプル案件納品の件`
- customer_order_no: string - 顧客注文No. 例: `C-PO-20250401-001`
- delivery_date: string(date) - 納品日 例: `2025-04-01`
- acceptance_date: string(date) - 検収日 例: `2025-04-01`
- customer_id: integer(int64) - 顧客の取引先ID 例: `1001` (最小: 1, 最大: 9223372036854776000)
- delivery_note: string - 納品書の備考欄に記載する内容 例: `納品時の注意事項`
- delivery_template_id: integer(int64) - 納品書テンプレートID 例: `10001` (最小: 1, 最大: 9223372036854776000)
- subject: string - 納品書件名 例: `サンプル案件納品の件`
- recipient_address: object - 宛先
  - official_name: string - 正式名称 例: `株式会社サンプル`
  - default_title: string - 敬称 (選択肢: none, to_person, to_organization)
  - zipcode: string - 郵便番号 例: `150-0001`
  - prefecture_code: integer(int64) - 都道府県コード（-1: 設定しない、0: 北海道、1:青森、2:岩手、3:宮城、4:秋田、5:山形、6:福島、7:茨城、8:栃木、9:群馬、10:埼玉、11:千葉、12:東京、13:神奈川、14:新潟、15:富山、16:石川、17:福井、18:山梨、19:長野、20:岐阜、21:静岡、22:愛知、23:三重、24:滋賀、25:京都、26:大阪、27:兵庫、28:奈良、29:和歌山、30:鳥取、31:島根、32:岡山、33:広島、34:山口、35:徳島、36:香川、37:愛媛、38:高知、39:福岡、40:佐賀、41:長崎、42:熊本、43:大分、44:宮崎、45:鹿児島、46:沖縄） 例: `12`
  - street_name1: string - 住所1 例: `渋谷区神宮前1-1-1`
  - street_name2: string - 住所2 例: `サンプルビル3F`
  - contact_department: string - 連絡先部署 例: `営業部`
  - contact_name: string - 連絡先名 例: `山田太郎`
- billing_creating_method_type: string - 請求作成方法区分 (自動作成: automatically, 手動作成: manually) (選択肢: automatically, manually) 例: `automatically`
- bills_on: string(date) - 請求予定日 例: `2025-04-01`
- invoice_template_id: integer(int64) - 請求書テンプレートID 例: `10002` (最小: 1, 最大: 9223372036854776000)
- billing_partner_id: integer(int64) - 請求先の取引先ID 例: `1002` (最小: 1, 最大: 9223372036854776000)
- invoice_subject: string - 請求書件名 例: `サンプル案件納品の件`
- invoice_note: string - 請求書の備考欄に掲載する内容 例: `お振込期限は月末までとなります`
- collects_on: string(date) - 入金予定日 例: `2025-04-01`
- collection_method_type: string - 入金方法 (振込: transfer, 現金: cash, 手形: bill_payable, 振替: direct_debit) (選択肢: transfer, cash, bill_payable, direct_debit) 例: `transfer`
- collecting_partner_id: integer(int64) - 入金元の取引先ID 例: `1003` (最小: 1, 最大: 9223372036854776000)
- charge_employee_id: integer(int64) - 社内担当者の従業員ID 例: `101` (最小: 0, 最大: 9223372036854776000)
- reporting_section_id: integer(int64) - 担当部門ID

  ※ 親部門のIDは指定できません 例: `67890` (最小: 1, 最大: 9223372036854776000)
- internal_memo: string - 社内メモ 例: `重要案件のため優先対応`
- lines: array[object] - 明細リスト
- branch_no: integer(int32) - 枝番 例: `1`

## POST /deliveries/{id}/cancellation — 納品取消

概要 指定されたIDの納品を取り消します。

### パラメータ

PATCH /deliveries/{id} と同じ

### リクエストボディ

- company_id*: integer(int64) - 事業所ID 例: `1` (最小: 1, 最大: 9223372036854776000)

## PUT /deliveries/{id}/delivery_status — 納品ステータス変更

概要 指定されたIDの納品の納品ステータスを変更します。

定義
status : 納品ステータス (未納品: not_delivered, 納品済: delivered)

### パラメータ

PATCH /deliveries/{id} と同じ

### リクエストボディ*

- company_id*: integer(int64) - 事業所ID 例: `1` (最小: 1, 最大: 9223372036854776000)
- delivery_status*: string - 納品ステータス (未納品: not_delivered, 納品済: delivered) (選択肢: not_delivered, delivered) 例: `not_delivered`

## PUT /deliveries/{id}/acceptance_status — 検収ステータス変更

概要 指定されたIDの納品の検収ステータスを変更します。

定義
status : 検収ステータス (未検収: not_accepted, 検収済: accepted)

### パラメータ

PATCH /deliveries/{id} と同じ

### リクエストボディ*

- company_id*: integer(int64) - 事業所ID 例: `1` (最小: 1, 最大: 9223372036854776000)
- acceptance_status*: string - 検収ステータス (未検収: not_accepted, 検収済: accepted) (選択肢: not_accepted, accepted) 例: `not_accepted`
