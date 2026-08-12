# quotations

見積

## GET /quotations — 見積一覧

概要 見積の一覧を取得します。 登録されている見積情報を一覧形式で取得できます。 各種フィルタ条件を指定することで、特定の条件に合致する見積のみを取得することが可能です。

定義
start_registered_date : 見積登録日(絞り込み開始) end_registered_date : 見積登録日(絞り込み終了) start_last_updated_date : 見積更新日(絞り込み開始) end_last_updated_date : 見積更新日(絞り込み終了) start_quotation_date : 見積日(絞り込み開始) end_quotation_date : 見積日(絞り込み終了) charge_employee_ids : 社内担当者の従業員ID(複数指定可) customer_ids : 顧客の取引先ID(複数指定可) business_ids : 案件ID(複数指定可) quotation_no : 見積No. quotation_status : 見積ステータス billing_status : 請求書送付ステータス canceled : 取消状態(...

### パラメータ

- company_id*: integer(int64) - 事業所ID
- start_registered_date: string(date) - 見積登録日で絞込：開始日(yyyy-mm-dd)
- end_registered_date: string(date) - 見積登録日で絞込：終了日(yyyy-mm-dd)
- start_last_updated_date: string(date) - 見積更新日で絞込：開始日(yyyy-mm-dd)
- end_last_updated_date: string(date) - 見積更新日で絞込：終了日(yyyy-mm-dd)
- start_quotation_date: string(date) - 見積日で絞込：開始日(yyyy-mm-dd)
- end_quotation_date: string(date) - 見積日で絞込：終了日(yyyy-mm-dd)
- charge_employee_ids[]: array[integer] - 社内担当者の従業員ID
- customer_ids[]: array[integer] - 顧客の取引先ID
- business_ids[]: array[string] - 案件ID
- quotation_no: string - 見積No.で絞込
- quotation_status: string - 見積ステータス (未受注: unanswered, 受注済: order_received, 失注: order_lost) (選択肢: unanswered, order_received, order_lost)
- billing_status: string - 請求書送付ステータス (未請求: not_billed, 一部請求済: partially_billed, 請求済: billed, なし: none) (選択肢: not_billed, partially_billed, billed, none)
- canceled: boolean - 取消状態
- limit: integer(int32) - 取得レコードの件数（デフォルト：20, 最小：1, 最大：100）
- offset: integer(int32) - 取得レコードのオフセット（デフォルト：0）

## POST /quotations — 見積登録

概要 新しい見積を登録します。 顧客への見積情報を登録し、見積書の発行や受注への引き継ぎに利用できます。

定義
必須項目 quotation_date : 見積日 customer_id : 顧客の取引先ID lines : 明細リスト 任意項目 business_id : 案件ID internal_subject : 見積タイトル expires_on : 有効期限日 delivery_deadline : 納品期限日 delivery_location : 納品場所 quotation_template_id : 見積書テンプレートID ※指定しない場合はデフォルトのテンプレートが適用されます。 quotation_subject : 見積書件名 quotation_note : 見積書の備考欄に記載する内容 recipient_address : 宛先情報 ※Web画面とは異なり、顧客マスタからの自動補完は行われません。指定しない場合は全ての項目がnullとして登録されます。 charge_employee_id : 社内担当者の従業員ID reporting_section_...

### リクエストボディ

- company_id*: integer(int64) - 事業所ID 例: `1` (最小: 1, 最大: 9223372036854776000)
- business_id: string - 案件ID 例: `01JPP4FD1CVQWCDSWA90VE1ZTM`
- internal_subject: string - 見積タイトル 例: `サンプル案件見積の件`
- quotation_date*: string(date) - 見積日 例: `2025-04-01`
- customer_id*: integer(int64) - 顧客の取引先ID 例: `1001` (最小: 1, 最大: 9223372036854776000)
- expires_on: string(date) - 有効期限日 例: `2025-04-30`
- delivery_deadline: string(date) - 納品期限日 例: `2025-05-15`
- delivery_location: string - 納品場所 例: `東京都渋谷区`
- quotation_template_id: integer(int64) - 見積書テンプレートID 例: `10001` (最小: 1, 最大: 9223372036854776000)
- quotation_subject: string - 見積書件名 例: `サンプル案件見積の件`
- quotation_note: string - 見積書の備考欄に記載する内容 例: `有効期限内にご回答ください`
- recipient_address: object - 宛先
  - official_name: string - 正式名称 例: `株式会社サンプル`
  - default_title: string - 敬称 (選択肢: none, to_person, to_organization)
  - zipcode: string - 郵便番号 例: `150-0001`
  - prefecture_code: integer(int64) - 都道府県コード（-1: 設定しない、0: 北海道、1:青森、2:岩手、3:宮城、4:秋田、5:山形、6:福島、7:茨城、8:栃木、9:群馬、10:埼玉、11:千葉、12:東京、13:神奈川、14:新潟、15:富山、16:石川、17:福井、18:山梨、19:長野、20:岐阜、21:静岡、22:愛知、23:三重、24:滋賀、25:京都、26:大阪、27:兵庫、28:奈良、29:和歌山、30:鳥取、31:島根、32:岡山、33:広島、34:山口、35:徳島、36:香川、37:愛媛、38:高知、39:福岡、40:佐賀、41:長崎、42:熊本、43:大分、44:宮崎、45:鹿児島、46:沖縄） 例: `12`
  - street_name1: string - 住所1 例: `渋谷区神宮前1-1-1`
  - street_name2: string - 住所2 例: `サンプルビル3F`
  - contact_department: string - 連絡先部署 例: `営業部`
  - contact_name: string - 連絡先名 例: `山田太郎`
- charge_employee_id: integer(int64) - 社内担当者の従業員ID 例: `101` (最小: 0, 最大: 9223372036854776000)
- reporting_section_id: integer(int64) - 担当部門ID

  ※ 親部門のIDは指定できません 例: `67890` (最小: 1, 最大: 9223372036854776000)
- internal_memo: string - 社内メモ 例: `重要案件のため優先対応`
- lines*: array[object] - 明細リスト

## GET /quotations/{id} — 見積詳細取得

概要 指定されたIDの見積の詳細情報を取得します。 見積の基本情報に加えて、明細情報や各種ステータスなどの詳細な情報も取得できます。

### パラメータ

- company_id*: integer(int64) - 事業所ID
- id* (path): string - 見積ID

### レスポンス

見積詳細取得のレスポンス
- id*: string - 見積ID
- canceled*: boolean - 取消状態
- registered_by*: object - 登録者
- quotation_no*: string - 見積No.
- branch_no: integer(int32) - 枝番
- quotation_date*: string(date) - 見積日
- quotation_subject: string - 見積書件名
- internal_subject: string - 見積タイトル
- expires_on: string(date) - 有効期限日
- delivery_deadline: string(date) - 納品期限日
- delivery_location: string - 納品場所
- issued*: boolean - 送付ステータス
- issued_on: string(date) - 送付日
- registered_at*: string(date-time) - 登録日時
- last_updated_at*: string(date-time) - 変更日時
- total_amount*: integer(int64) - 源泉徴収税額を除いた合計金額
- amount_set*: object - 金額セット
- amount_of_withholding_tax: integer(int64) - 源泉徴収税額
- quotation_status*: string - 見積ステータス (未受注: unanswered, 受注済: order_received, 失注: order_lost)
- delivery_progress*: string - 納品進捗 (未納品: not_delivered, 一部納品済: partially_delivered, 納品済: delivered)
- delivery_issue_progress*: string - 納品書発行進捗 (未発行: not_issued, 一部発行済: partially_issued, 発行済: issued)
- sales_status*: string - 売上ステータス (未計上: not_sold, 一部計上済: partially_sold, 計上済: sold)
- billing_status*: string - 請求書送付ステータス (未送付: not_billed, 一部送付済: partially_billed, 送付済: billed, 対象外: none)
  ※partially_billed（一部送付済）は納品でのみ発生します。none（対象外）は売上でのみ発生します。
- customer*: object - 顧客
- charge_employee: object - 社内担当者
- reporting_section: object - 担当部門
- business: object - 案件
- internal_memo: string - 社内メモ
- quotation_note: string - 見積書の備考欄に記載する内容
- last_updated_by*: object - 変更者
- amount_set_rates*: array[object]
- quotation_template_name*: string - 見積書テンプレート名称
- recipient_address*: object - 宛先
- lines*: array[object] - 明細リスト

## PATCH /quotations/{id} — 見積更新

概要 指定されたIDの見積を更新します。 見積の基本情報を部分的に更新できます。 送信したフィールドのみが更新され、送信しなかったフィールドは変更されません。

定義
更新可能項目 business_id : 案件ID internal_subject : 見積タイトル quotation_date : 見積日 customer_id : 顧客の取引先ID expires_on : 有効期限日 delivery_deadline : 納品期限日 delivery_location : 納品場所 quotation_template_id : 見積書テンプレートID quotation_subject : 見積書件名 quotation_note : 見積書の備考欄に記載する内容 recipient_address : 宛先情報（指定した場合、既存の宛先情報は全て削除され、新しい宛先情報に置き換えられます） charge_employee_id : 社内担当者の従業員ID reporting_section_id : 担当部門ID internal_memo : 社内メモ branch_n...

### パラメータ

- id* (path): string - 見積ID

### リクエストボディ

- company_id*: integer(int64) - 事業所ID 例: `1` (最小: 1, 最大: 9223372036854776000)
- business_id: string - 案件ID 例: `01JPP4FD1CVQWCDSWA90VE1ZTM`
- internal_subject: string - 見積タイトル 例: `サンプル案件見積の件`
- quotation_date: string(date) - 見積日 例: `2025-04-01`
- customer_id: integer(int64) - 顧客の取引先ID 例: `1001` (最小: 1, 最大: 9223372036854776000)
- expires_on: string(date) - 有効期限日 例: `2025-04-30`
- delivery_deadline: string(date) - 納品期限日 例: `2025-05-15`
- delivery_location: string - 納品場所 例: `東京都渋谷区`
- quotation_template_id: integer(int64) - 見積書テンプレートID 例: `10001` (最小: 1, 最大: 9223372036854776000)
- quotation_subject: string - 見積書件名 例: `サンプル案件見積の件`
- quotation_note: string - 見積書の備考欄に記載する内容 例: `有効期限内にご回答ください`
- recipient_address: object - 宛先
  - official_name: string - 正式名称 例: `株式会社サンプル`
  - default_title: string - 敬称 (選択肢: none, to_person, to_organization)
  - zipcode: string - 郵便番号 例: `150-0001`
  - prefecture_code: integer(int64) - 都道府県コード（-1: 設定しない、0: 北海道、1:青森、2:岩手、3:宮城、4:秋田、5:山形、6:福島、7:茨城、8:栃木、9:群馬、10:埼玉、11:千葉、12:東京、13:神奈川、14:新潟、15:富山、16:石川、17:福井、18:山梨、19:長野、20:岐阜、21:静岡、22:愛知、23:三重、24:滋賀、25:京都、26:大阪、27:兵庫、28:奈良、29:和歌山、30:鳥取、31:島根、32:岡山、33:広島、34:山口、35:徳島、36:香川、37:愛媛、38:高知、39:福岡、40:佐賀、41:長崎、42:熊本、43:大分、44:宮崎、45:鹿児島、46:沖縄） 例: `12`
  - street_name1: string - 住所1 例: `渋谷区神宮前1-1-1`
  - street_name2: string - 住所2 例: `サンプルビル3F`
  - contact_department: string - 連絡先部署 例: `営業部`
  - contact_name: string - 連絡先名 例: `山田太郎`
- charge_employee_id: integer(int64) - 社内担当者の従業員ID 例: `101` (最小: 0, 最大: 9223372036854776000)
- reporting_section_id: integer(int64) - 担当部門ID

  ※ 親部門のIDは指定できません 例: `67890` (最小: 1, 最大: 9223372036854776000)
- internal_memo: string - 社内メモ 例: `重要案件のため優先対応`
- lines: array[object] - 明細リスト
- branch_no: integer(int32) - 枝番 例: `1`

## PUT /quotations/{id}/quotation_status — 見積ステータス変更

概要 指定されたIDの見積のステータスを変更します。 見積のステータス（未受注/失注）を更新できます。

定義
quotation_status : 見積ステータス (未受注: unanswered, 失注: order_lost) ※ステータス変更は取り消されていない見積に対してのみ可能です。 ※受注済（order_received）への変更は本APIでは行えません。受注登録APIで対象の見積を指定して受注登録することで、見積ステータスが自動的に受注済へ更新されます。

### パラメータ

PATCH /quotations/{id} と同じ

### リクエストボディ*

- company_id*: integer(int64) - 事業所ID 例: `1` (最小: 1, 最大: 9223372036854776000)
- quotation_status*: string - 更新可能な見積ステータス (未受注: unanswered, 失注: order_lost) (選択肢: unanswered, order_lost) 例: `unanswered`

### レスポンス

見積ステータス変更のレスポンス
- id*: string - 見積ID
- registered_at*: string(date-time) - 登録日時
- last_updated_at*: string(date-time) - 変更日時

## POST /quotations/{id}/cancellation — 見積取消

概要 指定されたIDの見積を取り消します。

### パラメータ

PATCH /quotations/{id} と同じ

### リクエストボディ

- company_id*: integer(int64) - 事業所ID 例: `1` (最小: 1, 最大: 9223372036854776000)
