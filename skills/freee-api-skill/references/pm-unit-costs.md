# UnitCosts

## GET /unit_costs — 従業員単価マスタの取得

従業員の単価マスタを返します。

### パラメータ

- company_id*: integer - 事業所ID
- limit: integer - 取得レコードの件数（デフォルト：50, 最小：1, 最大100）
- offset: integer - 取得レコードのオフセット（デフォルト：0）

### レスポンス

- unit_costs*: array[object]
- meta*: object
