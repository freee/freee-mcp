# procurements

## 概要

仕入

## エンドポイント一覧

### GET /procurements

操作: 仕入一覧

説明: 概要 仕入の一覧を取得します。 登録されている仕入情報を一覧形式で取得できます。 各種フィルタ条件を指定することで、特定の条件に合致する仕入のみを取得することが可能です。

定義
start_registered_date : 仕入登録日(絞り込み開始) end_registered_date : 仕入登録日(絞り込み終了) start_last_updated_date : 仕入更新日(絞り込み開始) end_last_updated_date : 仕入更新日(絞り込み終了) start_procurement_date : 仕入日(絞り込み開始) end_procurement_date : 仕入日(絞り込み終了) charge_employee_ids : 社内担当者の従業員ID(複数指定可) supplier_ids : 仕入先の取引先ID(複数指定可) business_ids : 案件ID(複数指定可) ※複数の案件が紐づく仕入は本パラメータでヒットしません procurement_no : 仕入No. payment_status : 決済ステータス canceled : ...

### パラメータ

| 名前 | 位置 | 必須 | 型 | 説明 |
|------|------|------|-----|------|
| company_id | query | はい | integer(int64) | 事業所ID |
| start_registered_date | query | いいえ | string(date) | 仕入登録日で絞込：開始日(yyyy-mm-dd) |
| end_registered_date | query | いいえ | string(date) | 仕入登録日で絞込：終了日(yyyy-mm-dd) |
| start_last_updated_date | query | いいえ | string(date) | 仕入更新日で絞込：開始日(yyyy-mm-dd) |
| end_last_updated_date | query | いいえ | string(date) | 仕入更新日で絞込：終了日(yyyy-mm-dd) |
| start_procurement_date | query | いいえ | string(date) | 仕入日で絞込：開始日(yyyy-mm-dd) |
| end_procurement_date | query | いいえ | string(date) | 仕入日で絞込：終了日(yyyy-mm-dd) |
| charge_employee_ids[] | query | いいえ | array[integer] | 社内担当者の従業員ID |
| supplier_ids[] | query | いいえ | array[integer] | 仕入先の取引先ID |
| business_ids[] | query | いいえ | array[string] | 案件ID<br>
※ 複数の案件が紐づく仕入は本パラメータでヒットしません |
| procurement_no | query | いいえ | string | 仕入No.で絞込 |
| payment_status | query | いいえ | string | 決済ステータス (未決済: not_settled, 一部決済済: partially_settled, 決済済: settled, 対象外: none) (選択肢: not_settled, partially_settled, settled, none) |
| canceled | query | いいえ | boolean | 取消状態 |
| limit | query | いいえ | integer(int32) | 取得レコードの件数（デフォルト：20, 最小：1, 最大：100） |
| offset | query | いいえ | integer(int32) | 取得レコードのオフセット（デフォルト：0） |

### レスポンス (200)

### POST /procurements

操作: 仕入登録

説明: 概要 新しい仕入を登録します。 仕入先への仕入情報を登録し、支払管理や会計連携に利用できます。

定義
必須項目 procurement_date : 仕入日 supplier_id : 仕入先の取引先ID payments_on : 支払期日 payment_method_type : 支払方法 payment_partner_id : 支払先の取引先ID lines : 明細リスト 任意項目 is_qualified_invoice_issuer : 適格請求書発行事業者該当フラグ internal_subject : 仕入タイトル charge_employee_id : 社内担当者の従業員ID reporting_section_id : 担当部門ID internal_memo : 社内メモ

注意点
適格請求書発行事業者該当フラグ(is_qualified_invoice_issuer)について 本フラグの登録時の挙動は、freee会計の「税区分の設定 &gt; インボイス制度関連 &gt; 買い手側対応機能」の設定状況によって変わります。リクエストでの指定値がそのまま登録され...

### レスポンス (201)

### PATCH /procurements/{id}

操作: 仕入更新

説明: 概要 指定されたIDの仕入を更新します。 仕入の基本情報を部分的に更新できます。 送信したフィールドのみが更新され、送信しなかったフィールドは変更されません。

定義
更新可能項目 internal_subject : 仕入タイトル procurement_date : 仕入日 supplier_id : 仕入先の取引先ID is_qualified_invoice_issuer : 適格請求書発行事業者該当フラグ payments_on : 支払期日 payment_method_type : 支払方法 payment_partner_id : 支払先の取引先ID charge_employee_id : 社内担当者の従業員ID reporting_section_id : 担当部門ID internal_memo : 社内メモ lines : 明細リスト（指定した場合、既存の明細は全て削除され、新しい明細に置き換えられます） ※全ての項目は任意です。更新したい項目のみを送信してください。

注意点
明細行のpurchase_order_id（発注ID）について linesを指定して明細...

### パラメータ

| 名前 | 位置 | 必須 | 型 | 説明 |
|------|------|------|-----|------|
| id | path | はい | string | 仕入ID |

### レスポンス (200)

### GET /procurements/{id}

操作: 仕入詳細取得

説明: 概要 指定されたIDの仕入の詳細情報を取得します。 仕入の基本情報に加えて、明細情報や各種ステータスなどの詳細な情報も取得できます。

### パラメータ

| 名前 | 位置 | 必須 | 型 | 説明 |
|------|------|------|-----|------|
| company_id | query | はい | integer(int64) | 事業所ID |
| id | path | はい | string | 仕入ID |

### レスポンス (200)

仕入詳細取得のレスポンス


### POST /procurements/{id}/cancellation

操作: 仕入取消

説明: 概要 指定されたIDの仕入を取り消します。

定義
必須項目 company_id : 事業所ID

### パラメータ

| 名前 | 位置 | 必須 | 型 | 説明 |
|------|------|------|-----|------|
| id | path | はい | string | 仕入ID |

### レスポンス (200)



## 参考情報

- freee API公式ドキュメント: https://developer.freee.co.jp/docs
