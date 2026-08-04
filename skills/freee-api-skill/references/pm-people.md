# People

## GET /people — 従業員一覧の取得

このリクエストで指定したIDの事業所の従業員一覧を返します。 権限・ステータス・従業員IDで取得する情報を絞り込むことができます。

### パラメータ

- company_id*: integer - 事業所ID
- role: string - 役割
- status: string - ステータス（招待中・利用中・無効） (選択肢: sent, accepted, inactive)
- person_ids[]: array[integer] - 従業員ID
- limit: integer - 取得レコードの件数（デフォルト：50, 最小：1, 最大100）
- offset: integer - 取得レコードのオフセット（デフォルト：0）

### レスポンス

- meta*: object
- people_counts*: object
- people*: array[object]
