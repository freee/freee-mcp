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

### リクエストボディ

- company_id*: integer(int64) - 事業所ID 例: `1` (最小: 1, 最大: 9223372036854776000)
- account_item_id*: integer(int64) - 勘定科目ID 例: `12345` (最小: 1, 最大: 9223372036854776000)
- accounting_reporting_section_id: integer(int64) - 会計計上部門ID

  ※ 親部門のIDは指定できません 例: `67890` (最小: 1, 最大: 9223372036854776000)
- advance_receipt_date*: string(date) - 前受金発生日 例: `2024-01-31`
- billing_partner_id*: integer(int64) - 請求先の取引先ID 例: `1002` (最小: 1, 最大: 9223372036854776000)
- bills_on*: string(date) - 請求日 例: `2024-02-01`
- business_id*: string - 案件ID 例: `01JPP4FD1CVQWCDSWA90VE1ZTM`
- charge_employee_id: integer(int64) - 社内担当者の従業員ID 例: `101` (最小: 0, 最大: 9223372036854776000)
- collecting_partner_id*: integer(int64) - 入金元の取引先ID 例: `1003` (最小: 1, 最大: 9223372036854776000)
- collection_method_type*: string - 入金方法 (振込: transfer, 現金: cash, 手形: bill_payable, 振替: direct_debit) (選択肢: transfer, cash, bill_payable, direct_debit) 例: `transfer`
- collects_on*: string(date) - 入金期日 例: `2024-02-28`
- customer_id*: integer(int64) - 顧客の取引先ID 例: `1001` (最小: 1, 最大: 9223372036854776000)
- customer_order_no: string - 顧客注文No. 例: `C-PO-20211212-001`
- internal_memo: string - 社内メモ 例: `重要案件のため優先対応`
- internal_subject: string - 前受金タイトル 例: `前受金サンプル案件`
- invoice_note: string - 請求書の備考欄に掲載する内容 例: `お振込期限は月末までとなります`
- invoice_subject: string - 請求書件名 例: `前受金請求書件名`
- invoice_template_id: integer(int64) - 請求書テンプレートID 例: `10002` (最小: 1, 最大: 9223372036854776000)
- item_tag_id: integer(int64) - 会計品目タグID 例: `2001` (最小: 1, 最大: 9223372036854776000)
- lines*: array[object] - 明細リスト
  配列の要素:
    - line_type*: string - 明細種別（前受金は basic のみサポート） (選択肢: basic) 例: `basic`
    - deal_line_type_id*: string - 明細取引タイプID 例: `01JPP4FD1CVQWCDSWA90VE1ZTM`
    - master_item_id: string - 商品ID 例: `01JPP4FD1CVQWCDSWA90VE1ZTM`
    - description: string - 摘要 例: `前受金明細の摘要`
    - quantity*: number(double) - 数量 例: `1`
    - unit_price*: number(double) - 単価 例: `100000` (最小: 0, 最大: 999999999999)
    - uom_name: string - 単位 例: `個`
    - is_manual_tax_entry*: boolean - 税の手動入力を行うかどうか 例: `false`
    - tax: integer(int64) - 手動入力した税額

      ※is_manual_tax_entryがtrueの場合のみ参照されます。falseの場合は値を設定しても無視されます。 例: `10000` (最小: -999999999999, 最大: 999999999999)
- memo_tags: array[integer] - メモタグID
- reporting_section_id: integer(int64) - 担当部門ID

  ※ 親部門のIDは指定できません 例: `67890` (最小: 1, 最大: 9223372036854776000)
- sales_order_id: string - 引継元受注ID 例: `01JPP4FD1CVQWCDSWA90VE1ZTM`
- segment_tag_1_id: integer(int64) - セグメントタグ1のID 例: `12345` (最小: 1, 最大: 9223372036854776000)
- segment_tag_2_id: integer(int64) - セグメントタグ2のID 例: `12345` (最小: 1, 最大: 9223372036854776000)
- segment_tag_3_id: integer(int64) - セグメントタグ3のID 例: `12345` (最小: 1, 最大: 9223372036854776000)

## GET /advance_receipts/{id} — 前受金詳細取得

概要 指定されたIDの前受金の詳細情報を取得します。 前受金の基本情報に加えて、明細、勘定科目、品目タグ、メモタグ、セグメントタグなどの詳細情報も取得できます。

### パラメータ

- company_id*: integer(int64) - 事業所ID
- id* (path): string - 前受金ID

### レスポンス

前受金詳細取得のレスポンス
- id*: string - 前受金ID
- deal_id: integer(int64) - 会計の取引ID(null は未連携を示す)
- canceled*: boolean - 取消状態
- registered_at*: string(date-time) - 登録日時
- registered_by*: object - 登録者
- last_updated_at*: string(date-time) - 変更日時
- last_updated_by*: object - 変更者
- amount_set*: object - 金額セット
- total_amount*: integer(int64) - 源泉徴収税額を除いた合計金額
- business*: object - 案件
- advance_receipt_no*: string - 前受金No.
- advance_receipt_date*: string(date) - 前受金発生日
- internal_subject: string - 前受金タイトル
- customer_order_no: string - 顧客注文No.
- customer*: object - 顧客
- bill_id: string - 請求ID
- billing_status*: string - 請求書送付ステータス
- billing_partner*: object - 請求先
- bills_on: string(date) - 請求予定日
- is_reduced*: boolean - 前受金が取り崩されているかどうか
- invoice_subject: string - 請求書件名
- invoice_note: string - 請求書の備考欄に掲載する内容
- collecting_partner*: object - 入金元
- collection_method_type*: string - 入金方法 (振込: transfer, 現金: cash, 手形: bill_payable, 振替: direct_debit)
- collects_on: string(date) - 入金予定日
- collection_status*: string - 入金ステータス
- charge_employee: object - 社内担当者
- reporting_section: object - 担当部門
- internal_memo: string - 社内メモ
- sales_order_id: string - 受注ID
- consumption_total_amount*: integer(int64) - 売上計上済金額(取崩済金額)
- remaining_total_expense*: integer(int64) - 前受金残額(取崩可能額)
- account_item*: object - 勘定科目
- item_tag: object - 会計品目タグ
- memo_tags: array[object] - メモタグ
- segment_tag_1: object - セグメントタグ1
- segment_tag_2: object - セグメントタグ2
- segment_tag_3: object - セグメントタグ3
- invoice_template*: object - 請求書テンプレート
- lines*: array[object] - 明細リスト
- amount_set_rates*: array[object]

## PATCH /advance_receipts/{id} — 前受金更新

概要 指定されたIDの前受金を更新します。 前受金の基本情報を部分的に更新できます。 送信したフィールドのみが更新され、送信しなかったフィールドは変更されません。

定義
更新可能項目 account_item_id : 勘定科目ID advance_receipt_date : 前受金発生日 business_id : 案件ID customer_id : 顧客の取引先ID lines : 明細リスト（指定した場合、既存の明細は全て削除され、新しい明細に置き換えられます） accounting_reporting_section_id : 会計計上部門ID charge_employee_id : 社内担当者の従業員ID customer_order_no : 顧客注文No. internal_memo : 社内メモ internal_subject : 前受金タイトル item_tag_id : 会計品目タグID memo_tags : メモタグID reporting_section_id : 担当部門ID segment_tag_1_id : セグメント1のID segment_...

### パラメータ

- id* (path): string - 前受金ID

### リクエストボディ

- company_id*: integer(int64) - 事業所ID 例: `1` (最小: 1, 最大: 9223372036854776000)
- account_item_id: integer(int64) - 勘定科目ID 例: `12345` (最小: 1, 最大: 9223372036854776000)
- accounting_reporting_section_id: integer(int64) - 会計計上部門ID

  ※ 親部門のIDは指定できません 例: `67890` (最小: 1, 最大: 9223372036854776000)
- advance_receipt_date: string(date) - 前受金発生日 例: `2024-01-31`
- business_id: string - 案件ID 例: `01JPP4FD1CVQWCDSWA90VE1ZTM`
- charge_employee_id: integer(int64) - 社内担当者の従業員ID 例: `101` (最小: 0, 最大: 9223372036854776000)
- customer_id: integer(int64) - 顧客の取引先ID 例: `1001` (最小: 1, 最大: 9223372036854776000)
- customer_order_no: string - 顧客注文No. 例: `C-PO-20211212-001`
- internal_memo: string - 社内メモ 例: `重要案件のため優先対応`
- internal_subject: string - 前受金タイトル 例: `前受金サンプル案件`
- item_tag_id: integer(int64) - 会計品目タグID 例: `2001` (最小: 1, 最大: 9223372036854776000)
- lines: array[object] - 明細リスト
  配列の要素:
    - line_type*: string - 明細種別（前受金は basic のみサポート） (選択肢: basic) 例: `basic`
    - deal_line_type_id*: string - 明細取引タイプID 例: `01JPP4FD1CVQWCDSWA90VE1ZTM`
    - master_item_id: string - 商品ID 例: `01JPP4FD1CVQWCDSWA90VE1ZTM`
    - description: string - 摘要 例: `前受金明細の摘要`
    - quantity*: number(double) - 数量 例: `1`
    - unit_price*: number(double) - 単価 例: `100000` (最小: 0, 最大: 999999999999)
    - uom_name: string - 単位 例: `個`
    - is_manual_tax_entry*: boolean - 税の手動入力を行うかどうか 例: `false`
    - tax: integer(int64) - 手動入力した税額

      ※is_manual_tax_entryがtrueの場合のみ参照されます。falseの場合は値を設定しても無視されます。 例: `10000` (最小: -999999999999, 最大: 999999999999)
- memo_tags: array[integer] - メモタグID
- reporting_section_id: integer(int64) - 担当部門ID

  ※ 親部門のIDは指定できません 例: `67890` (最小: 1, 最大: 9223372036854776000)
- segment_tag_1_id: integer(int64) - セグメントタグ1のID 例: `12345` (最小: 1, 最大: 9223372036854776000)
- segment_tag_2_id: integer(int64) - セグメントタグ2のID 例: `12345` (最小: 1, 最大: 9223372036854776000)
- segment_tag_3_id: integer(int64) - セグメントタグ3のID 例: `12345` (最小: 1, 最大: 9223372036854776000)

## POST /advance_receipts/{id}/cancellation — 前受金取消

概要 指定されたIDの前受金を取り消します。

### パラメータ

PATCH /advance_receipts/{id} と同じ

### リクエストボディ

- company_id*: integer(int64) - 事業所ID 例: `1` (最小: 1, 最大: 9223372036854776000)

## POST /advance_receipts/{id}/reduction — 前受金取崩（売上登録）

概要 指定されたIDの前受金を取り崩して売上を登録します。

### パラメータ

PATCH /advance_receipts/{id} と同じ

### リクエストボディ

- company_id*: integer(int64) - 事業所ID 例: `1` (最小: 1, 最大: 9223372036854776000)
- revenue_recognition_date*: string(date) - 売上日 例: `2024-01-31`
- customer_id*: integer(int64) - 顧客の取引先ID 例: `1001` (最小: 1, 最大: 9223372036854776000)
- business_id: string - 案件ID 例: `01JPP4FD1CVQWCDSWA90VE1ZTM`
- subject: string - 売上タイトル 例: `売上サンプル案件`
- customer_order_no: string - 顧客注文No. 例: `C-PO-20211212-001`
- charge_employee_id: integer(int64) - 社内担当者の従業員ID 例: `101` (最小: 0, 最大: 9223372036854776000)
- reporting_section_id: integer(int64) - 担当部門ID

  ※ 親部門のIDは指定できません 例: `67890` (最小: 1, 最大: 9223372036854776000)
- internal_memo: string - 社内メモ 例: `重要案件のため優先対応`
- sales_order_id: string - 引継元受注ID 例: `01JPP4FD1CVQWCDSWA90VE1ZTM`
- delivery_id: string - 引継元納品ID 例: `01JPP4FD1CVQWCDSWA90VE1ZTM`
- lines*: array[object] - 明細リスト
  配列の要素:
    - line_type*: string - 明細種別（売上は basic のみサポート） (選択肢: basic) 例: `basic`
    - deal_line_type_id*: string - 明細取引タイプID 例: `01JPP4FD1CVQWCDSWA90VE1ZTM`
    - master_item_id: string - 商品ID 例: `01JPP4FD1CVQWCDSWA90VE1ZTM`
    - description: string - 摘要 例: `売上明細の摘要`
    - quantity*: number(double) - 数量 例: `1`
    - unit_price*: number(double) - 単価 例: `100000` (最小: 0, 最大: 999999999999)
    - uom_name: string - 単位 例: `個`
    - item_tag_id: integer(int64) - 会計品目タグID 例: `2001` (最小: 1, 最大: 9223372036854776000)
    - accounting_reporting_section_id: integer(int64) - 会計計上部門ID

      ※ 親部門のIDは指定できません 例: `67890` (最小: 1, 最大: 9223372036854776000)
    - memo_tags: array[integer] - メモタグID
    - is_manual_tax_entry*: boolean - 税の手動入力を行うかどうか 例: `false`
    - tax: integer(int64) - 手動入力した税額

      ※is_manual_tax_entryがtrueの場合のみ参照されます。falseの場合は値を設定しても無視されます。 例: `10000` (最小: -999999999999, 最大: 999999999999)
    - segment_tag_1_id: integer(int64) - セグメントタグ1のID 例: `12345` (最小: 1, 最大: 9223372036854776000)
    - segment_tag_2_id: integer(int64) - セグメントタグ2のID 例: `12345` (最小: 1, 最大: 9223372036854776000)
    - segment_tag_3_id: integer(int64) - セグメントタグ3のID 例: `12345` (最小: 1, 最大: 9223372036854776000)

## POST /advance_receipts/{id}/periodic_reduction — 前受金取崩（定期売上登録）

概要 指定されたIDの前受金を取り崩す定期売上を登録します。繰り返しルールに従って売上予定が作成されます。

### パラメータ

PATCH /advance_receipts/{id} と同じ

### リクエストボディ

- company_id*: integer(int64) - 事業所ID 例: `1` (最小: 1, 最大: 9223372036854776000)
- customer_id*: integer(int64) - 顧客の取引先ID 例: `1001` (最小: 1, 最大: 9223372036854776000)
- recurrence_rule*: object - 繰り返しルール
  - start_date*: string(date) - 開始日 例: `2025-04-01`
  - end_date*: string(date) - 終了日 例: `2026-03-31`
  - interval*: string - 周期 (毎月: 1, 2ヶ月ごと: 2, 3ヶ月ごと: 3, 6ヶ月ごと: 6, 12ヶ月ごと: 12, 偶数月: even, 奇数月: odd) (選択肢: 1, 2, 3, 6, 12, even, odd) 例: `1`
  - day_of_month*: integer(int32) - 周期日。32 は末日 例: `32`
- business_id: string - 案件ID 例: `01JPP4FD1CVQWCDSWA90VE1ZTM`
- subject: string - 定期売上タイトル 例: `サンプル案件定期売上の件`
- customer_order_no: string - 顧客注文No. 例: `C-PO-20211212-001`
- charge_employee_id: integer(int64) - 社内担当者の従業員ID 例: `101` (最小: 0, 最大: 9223372036854776000)
- reporting_section_id: integer(int64) - 担当部門ID

  ※ 親部門のIDは指定できません 例: `67890` (最小: 1, 最大: 9223372036854776000)
- internal_memo: string - 社内メモ 例: `重要案件のため優先対応`
- lines*: array[object] - 明細リスト
  配列の要素:
    - line_type*: string - 明細種別（売上は basic のみサポート） (選択肢: basic) 例: `basic`
    - deal_line_type_id*: string - 明細取引タイプID 例: `01JPP4FD1CVQWCDSWA90VE1ZTM`
    - master_item_id: string - 商品ID 例: `01JPP4FD1CVQWCDSWA90VE1ZTM`
    - description: string - 摘要 例: `売上明細の摘要`
    - quantity*: number(double) - 数量 例: `1`
    - unit_price*: number(double) - 単価 例: `100000` (最小: 0, 最大: 999999999999)
    - uom_name: string - 単位 例: `個`
    - item_tag_id: integer(int64) - 会計品目タグID 例: `2001` (最小: 1, 最大: 9223372036854776000)
    - accounting_reporting_section_id: integer(int64) - 会計計上部門ID

      ※ 親部門のIDは指定できません 例: `67890` (最小: 1, 最大: 9223372036854776000)
    - memo_tags: array[integer] - メモタグID
    - is_manual_tax_entry*: boolean - 税の手動入力を行うかどうか 例: `false`
    - tax: integer(int64) - 手動入力した税額

      ※is_manual_tax_entryがtrueの場合のみ参照されます。falseの場合は値を設定しても無視されます。 例: `10000` (最小: -999999999999, 最大: 999999999999)
    - segment_tag_1_id: integer(int64) - セグメントタグ1のID 例: `12345` (最小: 1, 最大: 9223372036854776000)
    - segment_tag_2_id: integer(int64) - セグメントタグ2のID 例: `12345` (最小: 1, 最大: 9223372036854776000)
    - segment_tag_3_id: integer(int64) - セグメントタグ3のID 例: `12345` (最小: 1, 最大: 9223372036854776000)
