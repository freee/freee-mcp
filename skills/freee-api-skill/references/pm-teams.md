# Teams

## GET /teams — チームの一覧取得

登録されているチームの一覧を返します。

### パラメータ

- company_id*: integer - 事業所ID
- limit: integer - 取得レコードの件数（デフォルト：50, 最小：1, 最大100）
- offset: integer - 取得レコードのオフセット（デフォルト：0）

### レスポンス

- teams*: array[object]
- meta*: object
