# master

関連マスタ

## GET /master/business_phases — 案件フェーズ一覧

概要 案件フェーズ一覧を取得します。 使用可能なもののみを返却します。

### パラメータ

- company_id*: integer(int64) - 事業所ID

## GET /master/sales_progressions — 受注確度一覧

概要 受注確度情報を取得します。 使用可能なもののみを返却します。

### パラメータ

GET /master/business_phases と同じ

## GET /master/items — 商品一覧

概要 商品情報を取得します。 使用可能なもののみを返却します。

### パラメータ

- company_id*: integer(int64) - 事業所ID
- offset: integer(int32) - 取得レコードのオフセット（デフォルト：0）
- limit: integer(int32) - 取得レコードの件数（デフォルト：100, 最小：1, 最大：500）
- type*: string - 業務区分 (sales: 販売系, procurement: 調達系) (選択肢: sales, procurement)

## GET /master/deal_line_types — 明細取引タイプ一覧

概要 明細取引タイプ一覧を取得します。 使用停止中のものはレスポンスに含まれません。

### パラメータ

- company_id*: integer(int64) - 事業所ID
- type*: string - 利用区分: 販売系、調達系どちらの明細取引タイプを取得するか (選択肢: sales, procurement)

## GET /master/employees — 従業員一覧

概要 従業員一覧を取得します。 使用可能なもののみを返却します。

### パラメータ

- company_id*: integer(int64) - 事業所ID
- offset: integer(int32) - 取得レコードのオフセット（デフォルト：0）
- limit: integer(int32) - 取得レコードの件数（デフォルト：100, 最小：1, 最大：500）

## GET /master/custom_fields/business/definitions — 案件カスタム項目定義一覧

概要 カスタム項目定義の一覧を取得します。 使用可能なもののみを返却します。 入力形式の一覧 text : 一行テキスト textarea : 複数行テキスト amount : 金額 quantity : 数量 number : 数値 date : 日付 enum : プルダウン partner : 取引先 employee : 従業員 section : 部門 master_item : 商品

### パラメータ

GET /master/business_phases と同じ
