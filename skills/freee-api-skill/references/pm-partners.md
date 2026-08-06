# Partners

## GET /partners — 取引先の一覧取得

登録されている取引先の一覧を返します。

### パラメータ

- company_id*: integer - 事業所ID
- limit: integer - 取得レコードの件数（デフォルト：50, 最小：1, 最大100）
- offset: integer - 取得レコードのオフセット（デフォルト：0）

### レスポンス

- partners*: array[object]
- meta*: object
