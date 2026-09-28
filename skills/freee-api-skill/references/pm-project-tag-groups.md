# ProjectTagGroups

## GET /project_tag_groups — プロジェクトタググループの取得

事業所のプロジェクトタググループと、その配下に属するプロジェクトタグの一覧を取得します。

### パラメータ

- company_id*: integer - 事業所ID
- limit: integer - 取得レコードの件数（デフォルト：50, 最小：1, 最大：100）
- offset: integer - 取得レコードのオフセット（デフォルト：0）

### レスポンス

- project_tag_groups*: array[object]
- meta*: object
