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

### リクエストボディ*

- company_id*: integer(int64) - 事業所ID 例: `1` (最小: 1, 最大: 9223372036854776000)
- business_id: string - 案件ID 例: `01JPP4FD1CVQWCDSWA90VE1ZTM`
- internal_subject: string - 発注タイトル 例: `サンプル案件発注の件`
- purchase_order_date*: string(date) - 発注日 例: `2025-04-01`
- procurements_on: string(date) - 仕入予定日 例: `2025-05-01`
- supplier_id*: integer(int64) - 仕入先の取引先ID 例: `1001` (最小: 1, 最大: 9223372036854776000)
- is_qualified_invoice_issuer: boolean - 適格請求書発行事業者該当フラグ

  ※ 登録値はfreee会計の「税区分の設定 > インボイス制度関連 > 買い手側対応機能」の設定状況により決定されます。

  ※ 買い手側対応機能を「使用する」場合、リクエスト指定値が優先され、未指定時は「適格チェックボックスと税区分」の設定に従います。 例: `true`
- delivery_deadline: string(date) - 納品期限日 例: `2025-05-15`
- delivery_location: string - 納品場所 例: `東京都渋谷区`
- purchase_order_note: string - 発注書の備考欄に記載する内容 例: `納期厳守でお願いします`
- purchase_order_template_id: integer(int64) - 発注書テンプレートID 例: `10001` (最小: 1, 最大: 9223372036854776000)
- purchase_order_subject: string - 発注書件名 例: `サンプル案件発注の件`
- recipient_address: object - 宛先
  - official_name: string - 正式名称 例: `株式会社サンプル`
  - default_title: string - 敬称 (選択肢: none, to_person, to_organization)
  - zipcode: string - 郵便番号 例: `150-0001`
  - prefecture_code: integer(int64) - 都道府県コード（-1: 設定しない、0: 北海道、1:青森、2:岩手、3:宮城、4:秋田、5:山形、6:福島、7:茨城、8:栃木、9:群馬、10:埼玉、11:千葉、12:東京、13:神奈川、14:新潟、15:富山、16:石川、17:福井、18:山梨、19:長野、20:岐阜、21:静岡、22:愛知、23:三重、24:滋賀、25:京都、26:大阪、27:兵庫、28:奈良、29:和歌山、30:鳥取、31:島根、32:岡山、33:広島、34:山口、35:徳島、36:香川、37:愛媛、38:高知、39:福岡、40:佐賀、41:長崎、42:熊本、43:大分、44:宮崎、45:鹿児島、46:沖縄） 例: `12`
  - street_name1: string - 住所1 例: `渋谷区神宮前1-1-1`
  - street_name2: string - 住所2 例: `サンプルビル3F`
  - contact_department: string - 連絡先部署 例: `営業部`
  - contact_name: string - 連絡先名 例: `山田太郎`
- payments_on: string(date) - 支払予定日 例: `2025-06-30`
- payment_method_type*: string - 支払方法 (選択肢: transfer, cash, bill_payable) 例: `transfer`
- payment_partner_id*: integer(int64) - 支払先の取引先ID 例: `1002` (最小: 1, 最大: 9223372036854776000)
- charge_employee_id: integer(int64) - 社内担当者の従業員ID 例: `101` (最小: 0, 最大: 9223372036854776000)
- reporting_section_id: integer(int64) - 担当部門ID

  ※ 親部門のIDは指定できません 例: `67890` (最小: 1, 最大: 9223372036854776000)
- internal_memo: string - 社内メモ 例: `重要案件のため優先対応`
- lines*: array[object] - 明細リスト

## GET /purchase_orders/{id} — 発注詳細取得

概要 指定されたIDの発注の詳細情報を取得します。 発注の基本情報に加えて、明細情報や各種ステータスなどの詳細な情報も取得できます。

### パラメータ

- company_id*: integer(int64) - 事業所ID
- id* (path): string - 発注ID

### レスポンス

発注詳細取得のレスポンス
- id*: string - 発注ID
- canceled*: boolean - 取消状態
- registered_by*: object - 登録者
- registered_at*: string(date-time) - 登録日時
- last_updated_by*: object - 変更者
- last_updated_at*: string(date-time) - 変更日時
- business: object - 案件
- purchase_order_no*: string - 発注No.
- branch_no: integer(int32) - 枝番
- internal_subject: string - 発注タイトル
- purchase_order_date*: string(date) - 発注日
- procurements_on: string(date) - 仕入予定日
- supplier*: object - 仕入先
- is_qualified_invoice_issuer: boolean - 適格請求書発行事業者該当フラグ

  ※ 登録値はfreee会計の「税区分の設定 > インボイス制度関連 > 買い手側対応機能」の設定状況により決定されます。

  ※ 買い手側対応機能を「使用する」場合、リクエスト指定値が優先され、未指定時は「適格チェックボックスと税区分」の設定に従います。
- delivery_deadline: string(date) - 納品期限日
- delivery_location: string - 納品場所
- purchase_order_note: string - 発注書の備考欄に掲載する内容
- issued*: boolean - 送付ステータス
- issued_on: string(date) - 送付日
- purchase_order_template: object - 発注書テンプレート
- purchase_order_subject: string - 発注書件名
- procurement_status*: string - 仕入ステータス (未計上: not_sold, 一部計上済: partially_sold, 計上済: sold)
- recorded_procurement_amount_excluding_tax*: integer(int64) - 仕入計上済金額(税抜)
- remaining_procurement_amount_excluding_tax*: integer(int64) - 仕入残金額(税抜)
- payment_status*: string - 支払ステータス (なし: none, 未決済: not_settled, 一部決済済: partially_settled, 決済済: settled)
- payments_on: string(date) - 支払予定日
- payment_method_type*: string - 支払方法
- payment_partner*: object - 支払先
- charge_employee: object - 社内担当者
- reporting_section: object - 担当部門
- internal_memo: string - 社内メモ
- amount_set*: object - 金額セット
- amount_of_withholding_tax: integer(int64) - 源泉徴収税額
- amount_set_rates*: array[object]
- recipient_address*: object - 宛先
- lines*: array[object] - 明細リスト

## PATCH /purchase_orders/{id} — 発注更新

概要 指定されたIDの発注を更新します。 発注の基本情報を部分的に更新できます。 送信したフィールドのみが更新され、送信しなかったフィールドは変更されません。

定義
更新可能項目 branch_no : 枝番 business_id : 案件ID internal_subject : 発注タイトル purchase_order_date : 発注日 supplier_id : 仕入先の取引先ID is_qualified_invoice_issuer : 適格請求書発行事業者該当フラグ procurements_on : 仕入予定日 delivery_deadline : 納品期限日 delivery_location : 納品場所 purchase_order_note : 発注書の備考欄に記載する内容 purchase_order_template_id : 発注書テンプレートID purchase_order_subject : 発注書件名 recipient_address : 宛先情報（指定した場合、既存の宛先情報は全て削除され、新しい宛先情報に置き換えられます） payme...

### パラメータ

- id* (path): string - 発注ID

### リクエストボディ*

- company_id*: integer(int64) - 事業所ID 例: `1` (最小: 1, 最大: 9223372036854776000)
- branch_no: integer(int32) - 枝番 例: `1`
- business_id: string - 案件ID 例: `01JPP4FD1CVQWCDSWA90VE1ZTM`
- internal_subject: string - 発注タイトル 例: `サンプル案件発注の件`
- purchase_order_date: string(date) - 発注日 例: `2025-04-01`
- procurements_on: string(date) - 仕入予定日 例: `2025-05-01`
- supplier_id: integer(int64) - 仕入先の取引先ID 例: `1001` (最小: 1, 最大: 9223372036854776000)
- is_qualified_invoice_issuer: boolean - 適格請求書発行事業者該当フラグ

  ※ 登録値はfreee会計の「税区分の設定 > インボイス制度関連 > 買い手側対応機能」の設定状況により決定されます。

  ※ 買い手側対応機能を「使用する」場合、リクエスト指定値が優先され、未指定時は「適格チェックボックスと税区分」の設定に従います。 例: `true`
- delivery_deadline: string(date) - 納品期限日 例: `2025-05-15`
- delivery_location: string - 納品場所 例: `東京都渋谷区`
- purchase_order_note: string - 発注書の備考欄に記載する内容 例: `納期厳守でお願いします`
- purchase_order_template_id: integer(int64) - 発注書テンプレートID 例: `10001` (最小: 1, 最大: 9223372036854776000)
- purchase_order_subject: string - 発注書件名 例: `サンプル案件発注の件`
- recipient_address: object - 宛先
  - official_name: string - 正式名称 例: `株式会社サンプル`
  - default_title: string - 敬称 (選択肢: none, to_person, to_organization)
  - zipcode: string - 郵便番号 例: `150-0001`
  - prefecture_code: integer(int64) - 都道府県コード（-1: 設定しない、0: 北海道、1:青森、2:岩手、3:宮城、4:秋田、5:山形、6:福島、7:茨城、8:栃木、9:群馬、10:埼玉、11:千葉、12:東京、13:神奈川、14:新潟、15:富山、16:石川、17:福井、18:山梨、19:長野、20:岐阜、21:静岡、22:愛知、23:三重、24:滋賀、25:京都、26:大阪、27:兵庫、28:奈良、29:和歌山、30:鳥取、31:島根、32:岡山、33:広島、34:山口、35:徳島、36:香川、37:愛媛、38:高知、39:福岡、40:佐賀、41:長崎、42:熊本、43:大分、44:宮崎、45:鹿児島、46:沖縄） 例: `12`
  - street_name1: string - 住所1 例: `渋谷区神宮前1-1-1`
  - street_name2: string - 住所2 例: `サンプルビル3F`
  - contact_department: string - 連絡先部署 例: `営業部`
  - contact_name: string - 連絡先名 例: `山田太郎`
- payments_on: string(date) - 支払予定日 例: `2025-06-30`
- payment_method_type: string - 支払方法 (選択肢: transfer, cash, bill_payable) 例: `transfer`
- payment_partner_id: integer(int64) - 支払先の取引先ID 例: `1002` (最小: 1, 最大: 9223372036854776000)
- charge_employee_id: integer(int64) - 社内担当者の従業員ID 例: `101` (最小: 0, 最大: 9223372036854776000)
- reporting_section_id: integer(int64) - 担当部門ID

  ※ 親部門のIDは指定できません 例: `67890` (最小: 1, 最大: 9223372036854776000)
- internal_memo: string - 社内メモ 例: `重要案件のため優先対応`
- lines: array[object] - 明細リスト

## POST /purchase_orders/{id}/cancellation — 発注取消

概要 指定されたIDの発注を取り消します。

定義
必須項目 company_id : 事業所ID

### パラメータ

PATCH /purchase_orders/{id} と同じ

### リクエストボディ

- company_id*: integer(int64) - 事業所ID 例: `1` (最小: 1, 最大: 9223372036854776000)
