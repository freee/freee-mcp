# WorkloadTagGroups

## GET /workload_tag_groups — 工数タグの取得

事業所の工数タググループと、その配下に属する工数タグの一覧を取得します。

### パラメータ

- company_id*: integer - 事業所ID
- limit: integer - 取得レコードの件数（デフォルト：50, 最小：1, 最大：100）
- offset: integer - 取得レコードのオフセット（デフォルト：0）

### レスポンス

- workload_tag_groups*: array[object]
- meta*: object
