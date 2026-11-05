# SalesOrderStatuses

## GET /sales_order_statuses — 受注ステータスの取得

事業所の受注ステータスの一覧を取得します。

### パラメータ

- company_id*: integer - 事業所ID
- limit: integer - 取得レコードの件数（デフォルト：50, 最小：1, 最大：100）
- offset: integer - 取得レコードのオフセット（デフォルト：0）

### レスポンス

- sales_order_statuses*: array[object]
- meta*: object - ページネーションのメタ情報
