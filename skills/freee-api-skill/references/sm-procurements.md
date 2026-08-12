# procurements

仕入

## GET /procurements — 仕入一覧

概要 仕入の一覧を取得します。 登録されている仕入情報を一覧形式で取得できます。 各種フィルタ条件を指定することで、特定の条件に合致する仕入のみを取得することが可能です。

定義
start_registered_date : 仕入登録日(絞り込み開始) end_registered_date : 仕入登録日(絞り込み終了) start_last_updated_date : 仕入更新日(絞り込み開始) end_last_updated_date : 仕入更新日(絞り込み終了) start_procurement_date : 仕入日(絞り込み開始) end_procurement_date : 仕入日(絞り込み終了) charge_employee_ids : 社内担当者の従業員ID(複数指定可) supplier_ids : 仕入先の取引先ID(複数指定可) business_ids : 案件ID(複数指定可) ※複数の案件が紐づく仕入は本パラメータでヒットしません procurement_no : 仕入No. payment_status : 決済ステータス canceled : ...

### パラメータ

- company_id*: integer(int64) - 事業所ID
- start_registered_date: string(date) - 仕入登録日で絞込：開始日(yyyy-mm-dd)
- end_registered_date: string(date) - 仕入登録日で絞込：終了日(yyyy-mm-dd)
- start_last_updated_date: string(date) - 仕入更新日で絞込：開始日(yyyy-mm-dd)
- end_last_updated_date: string(date) - 仕入更新日で絞込：終了日(yyyy-mm-dd)
- start_procurement_date: string(date) - 仕入日で絞込：開始日(yyyy-mm-dd)
- end_procurement_date: string(date) - 仕入日で絞込：終了日(yyyy-mm-dd)
- charge_employee_ids[]: array[integer] - 社内担当者の従業員ID
- supplier_ids[]: array[integer] - 仕入先の取引先ID
- business_ids[]: array[string] - 案件ID

  ※ 複数の案件が紐づく仕入は本パラメータでヒットしません
- procurement_no: string - 仕入No.で絞込
- payment_status: string - 決済ステータス (未決済: not_settled, 一部決済済: partially_settled, 決済済: settled, 対象外: none) (選択肢: not_settled, partially_settled, settled, none)
- canceled: boolean - 取消状態
- limit: integer(int32) - 取得レコードの件数（デフォルト：20, 最小：1, 最大：100）
- offset: integer(int32) - 取得レコードのオフセット（デフォルト：0）

## POST /procurements — 仕入登録

概要 新しい仕入を登録します。 仕入先への仕入情報を登録し、支払管理や会計連携に利用できます。

定義
必須項目 procurement_date : 仕入日 supplier_id : 仕入先の取引先ID payments_on : 支払期日 payment_method_type : 支払方法 payment_partner_id : 支払先の取引先ID lines : 明細リスト 任意項目 is_qualified_invoice_issuer : 適格請求書発行事業者該当フラグ internal_subject : 仕入タイトル charge_employee_id : 社内担当者の従業員ID reporting_section_id : 担当部門ID internal_memo : 社内メモ

注意点
適格請求書発行事業者該当フラグ(is_qualified_invoice_issuer)について 本フラグの登録時の挙動は、freee会計の「税区分の設定 &gt; インボイス制度関連 &gt; 買い手側対応機能」の設定状況によって変わります。リクエストでの指定値がそのまま登録され...

### リクエストボディ

- company_id*: integer(int64) - 事業所ID 例: `1` (最小: 1, 最大: 9223372036854776000)
- internal_subject: string - 仕入タイトル 例: `事務用品仕入`
- procurement_date*: string(date) - 仕入日 例: `2025-04-01`
- supplier_id*: integer(int64) - 仕入先の取引先ID 例: `1001` (最小: 1, 最大: 9223372036854776000)
- is_qualified_invoice_issuer: boolean - 適格請求書発行事業者該当フラグ

  ※ 登録値はfreee会計の「税区分の設定 > インボイス制度関連 > 買い手側対応機能」の設定状況により決定されます。

  ※ 買い手側対応機能を「使用する」場合、リクエスト指定値が優先され、未指定時は「適格チェックボックスと税区分」の設定に従います。 例: `true`
- payments_on*: string(date) - 支払期日 例: `2025-05-31`
- payment_method_type*: string - 支払方法 (振込: transfer, 現金: cash, 手形: bill_payable) (選択肢: transfer, cash, bill_payable) 例: `transfer`
- payment_partner_id*: integer(int64) - 支払先の取引先ID 例: `1002` (最小: 1, 最大: 9223372036854776000)
- charge_employee_id: integer(int64) - 社内担当者の従業員ID 例: `101` (最小: 0, 最大: 9223372036854776000)
- reporting_section_id: integer(int64) - 担当部門ID

  ※ 親部門のIDは指定できません 例: `67890` (最小: 1, 最大: 9223372036854776000)
- internal_memo: string - 社内メモ 例: `重要案件のため優先対応`
- lines*: array[object] - 明細リスト
  配列の要素:
    - master_item_id: string - 商品ID 例: `01JPP4FD1CVQWCDSWA90VE1ZTM`
    - deal_line_type_id*: string - 明細取引タイプID 例: `01JPP4FD1CVQWCDSWA90VE1ZTM`
    - description: string - 摘要 例: `事務用品購入`
    - quantity*: number(double) - 数量 例: `100`
    - uom_name: string - 単位 例: `個`
    - unit_price*: number(double) - 単価 例: `1000` (最小: 0, 最大: 999999999999)
    - withholding_enabled*: boolean - 源泉徴収税対象明細かどうか 例: `false`
    - is_manual_tax_entry*: boolean - 税の手動入力を行うかどうか 例: `false`
    - tax: integer(int64) - 手動入力した税額

      ※is_manual_tax_entryがtrueの場合のみ参照されます。falseの場合は値を設定しても無視されます。 例: `10000` (最小: -999999999999, 最大: 999999999999)
    - business_id: string - 案件ID 例: `01JPP4FD1CVQWCDSWA90VE1ZTM`
    - purchase_order_id: string - 発注ID 例: `01JPP4FD1CVQWCDSWA90VE1ZTM`
    - accounting_reporting_section_id: integer(int64) - 会計計上部門ID

      ※ 親部門のIDは指定できません 例: `67890` (最小: 1, 最大: 9223372036854776000)
    - item_tag_id: integer(int64) - 会計品目タグID 例: `2001` (最小: 1, 最大: 9223372036854776000)
    - memo_tags: array[integer] - メモタグID
    - segment_tag_1_id: integer(int64) - セグメントタグ1のID 例: `12345` (最小: 1, 最大: 9223372036854776000)
    - segment_tag_2_id: integer(int64) - セグメントタグ2のID 例: `12346` (最小: 1, 最大: 9223372036854776000)
    - segment_tag_3_id: integer(int64) - セグメントタグ3のID 例: `12347` (最小: 1, 最大: 9223372036854776000)

## PATCH /procurements/{id} — 仕入更新

概要 指定されたIDの仕入を更新します。 仕入の基本情報を部分的に更新できます。 送信したフィールドのみが更新され、送信しなかったフィールドは変更されません。

定義
更新可能項目 internal_subject : 仕入タイトル procurement_date : 仕入日 supplier_id : 仕入先の取引先ID is_qualified_invoice_issuer : 適格請求書発行事業者該当フラグ payments_on : 支払期日 payment_method_type : 支払方法 payment_partner_id : 支払先の取引先ID charge_employee_id : 社内担当者の従業員ID reporting_section_id : 担当部門ID internal_memo : 社内メモ lines : 明細リスト（指定した場合、既存の明細は全て削除され、新しい明細に置き換えられます） ※全ての項目は任意です。更新したい項目のみを送信してください。

注意点
明細行のpurchase_order_id（発注ID）について linesを指定して明細...

### パラメータ

- id* (path): string - 仕入ID

### リクエストボディ

- company_id*: integer(int64) - 事業所ID 例: `1` (最小: 1, 最大: 9223372036854776000)
- internal_subject: string - 仕入タイトル 例: `事務用品仕入`
- procurement_date: string(date) - 仕入日 例: `2025-04-01`
- supplier_id: integer(int64) - 仕入先の取引先ID 例: `1001` (最小: 1, 最大: 9223372036854776000)
- is_qualified_invoice_issuer: boolean - 適格請求書発行事業者該当フラグ

  ※ 登録値はfreee会計の「税区分の設定 > インボイス制度関連 > 買い手側対応機能」の設定状況により決定されます。

  ※ 買い手側対応機能を「使用する」場合、リクエスト指定値が優先され、未指定時は「適格チェックボックスと税区分」の設定に従います。 例: `true`
- payments_on: string(date) - 支払期日 例: `2025-05-31`
- payment_method_type: string - 支払方法 (振込: transfer, 現金: cash, 手形: bill_payable) (選択肢: transfer, cash, bill_payable) 例: `transfer`
- payment_partner_id: integer(int64) - 支払先の取引先ID 例: `1002` (最小: 1, 最大: 9223372036854776000)
- charge_employee_id: integer(int64) - 社内担当者の従業員ID 例: `101` (最小: 0, 最大: 9223372036854776000)
- reporting_section_id: integer(int64) - 担当部門ID

  ※ 親部門のIDは指定できません 例: `67890` (最小: 1, 最大: 9223372036854776000)
- internal_memo: string - 社内メモ 例: `重要案件のため優先対応`
- lines: array[object] - 明細リスト（指定した場合、既存の明細は全て削除され、新しい明細に置き換えられます）
  配列の要素:
    - master_item_id: string - 商品ID 例: `01JPP4FD1CVQWCDSWA90VE1ZTM`
    - deal_line_type_id*: string - 明細取引タイプID 例: `01JPP4FD1CVQWCDSWA90VE1ZTM`
    - description: string - 摘要 例: `事務用品購入`
    - quantity*: number(double) - 数量 例: `100`
    - uom_name: string - 単位 例: `個`
    - unit_price*: number(double) - 単価 例: `1000` (最小: 0, 最大: 999999999999)
    - withholding_enabled*: boolean - 源泉徴収税対象明細かどうか 例: `false`
    - is_manual_tax_entry*: boolean - 税の手動入力を行うかどうか 例: `false`
    - tax: integer(int64) - 手動入力した税額

      ※is_manual_tax_entryがtrueの場合のみ参照されます。falseの場合は値を設定しても無視されます。 例: `10000` (最小: -999999999999, 最大: 999999999999)
    - business_id: string - 案件ID 例: `01JPP4FD1CVQWCDSWA90VE1ZTM`
    - purchase_order_id: string - 発注ID

      ※省略した場合、またはnullを指定した場合、発注との紐づけは解除されます。既存の紐づけを維持したい場合は必ず指定してください。 例: `01JPP4FD1CVQWCDSWA90VE1ZTM`
    - accounting_reporting_section_id: integer(int64) - 会計計上部門ID

      ※ 親部門のIDは指定できません 例: `67890` (最小: 1, 最大: 9223372036854776000)
    - item_tag_id: integer(int64) - 会計品目タグID 例: `2001` (最小: 1, 最大: 9223372036854776000)
    - memo_tags: array[integer] - メモタグID
    - segment_tag_1_id: integer(int64) - セグメントタグ1のID 例: `12345` (最小: 1, 最大: 9223372036854776000)
    - segment_tag_2_id: integer(int64) - セグメントタグ2のID 例: `12346` (最小: 1, 最大: 9223372036854776000)
    - segment_tag_3_id: integer(int64) - セグメントタグ3のID 例: `12347` (最小: 1, 最大: 9223372036854776000)

## GET /procurements/{id} — 仕入詳細取得

概要 指定されたIDの仕入の詳細情報を取得します。 仕入の基本情報に加えて、明細情報や各種ステータスなどの詳細な情報も取得できます。

### パラメータ

- company_id*: integer(int64) - 事業所ID
- id* (path): string - 仕入ID

### レスポンス

仕入詳細取得のレスポンス
- id*: string - 仕入ID
- deal_id: integer(int64) - 会計の取引ID
- canceled*: boolean - 取消状態
- registered_by*: object - 登録者
- procurement_no*: string - 仕入No.
- internal_subject: string - 仕入タイトル
- procurement_date*: string(date) - 仕入日
- supplier*: object - 仕入先
- is_qualified_invoice_issuer: boolean - 適格請求書発行事業者該当フラグ

  ※ 登録値はfreee会計の「税区分の設定 > インボイス制度関連 > 買い手側対応機能」の設定状況により決定されます。

  ※ 買い手側対応機能を「使用する」場合、リクエスト指定値が優先され、未指定時は「適格チェックボックスと税区分」の設定に従います。
- payment_status*: string - 決済ステータス (未決済: not_settled, 一部決済済: partially_settled, 決済済: settled)
- payments_on*: string(date) - 支払期日
- payment_method_type*: string - 支払方法 (振込: transfer, 現金: cash, 手形: bill_payable)
- payment_partner*: object - 支払先
- charge_employee: object - 社内担当者
- reporting_section: object - 担当部門
- business: object - 案件
  ※ 複数の案件が紐づく場合はnullになります
- purchase_order_id: string - 発注ID
  ※ 複数の発注が紐づく場合はnullになります
- internal_memo: string - 社内メモ
- amount_set*: object - 金額セット
- amount_of_withholding_tax: integer(int64) - 源泉徴収税額
- registered_at*: string(date-time) - 登録日時
- last_updated_at*: string(date-time) - 変更日時
- last_updated_by*: object - 変更者
- amount_set_rates*: array[object]
- lines*: array[object] - 明細リスト

## POST /procurements/{id}/cancellation — 仕入取消

概要 指定されたIDの仕入を取り消します。

定義
必須項目 company_id : 事業所ID

### パラメータ

PATCH /procurements/{id} と同じ

### リクエストボディ

- company_id*: integer(int64) - 事業所ID 例: `1` (最小: 1, 最大: 9223372036854776000)
