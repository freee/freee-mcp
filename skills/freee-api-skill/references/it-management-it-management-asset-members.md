# it_management_asset_members

asset_members

## GET /hub/it_management/assets/{asset_id}/members — 備品利用者一覧取得（β版）

指定した備品の利用者履歴をカーソルページネーションで取得します。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- company_id*: integer(int64) - 事業所ID
- asset_id* (path): string(uuid) - 備品ID
- current: boolean - `true` の場合、現在割当中 (end_at が null) のみを返す
- member_id: string(uuid) - メンバー ID による絞り込み
- page_token: string - ページネーションのトークン
- page_size: integer(int32) - 1ページあたりの取得件数（デフォルト25、最大100）

### レスポンス

備品利用者一覧取得レスポンス
- data*: array[object] - 備品利用者のリスト
- next_page_token*: string - 次のページを取得するためのカーソルトークン。次ページがない場合はnull

## POST /hub/it_management/assets/{asset_id}/members — 備品にメンバーを割当（β版）

備品にメンバーを割当てます。 ##

注意点
- start_at を省略すると当日になります。 - 現在割当中のメンバーがいて、start_at を省略するか現在の割当の開始日以降を指定した場合、現在の割当は自動で終了します。終了日には新しい start_at (省略時は当日) が設定されます。 - end_at を省略すると null (現在割当中) になります。ただし start_at を指定し、その日以降に始まる別の履歴がある場合は、その履歴の start_at が end_at に設定されます。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- asset_id* (path): string(uuid) - 備品ID

### リクエストボディ*

- company_id*: integer(int64) - 事業所ID 例: `1`
- member_id*: string(uuid) - メンバーID 例: `550e8400-e29b-41d4-a716-446655440001`
- start_at: string(date) - 割当開始日 (YYYY-MM-DD)。省略時は当日 例: `2026-01-01`
- end_at: string(date) - 割当終了日 (YYYY-MM-DD)。省略時は null (現在割当中)。ただし start_at を指定し、その日以降に始まる別の履歴がある場合は、その履歴の start_at が設定されます 例: `2026-12-31`

### レスポンス

備品利用者作成レスポンス
- id*: string(uuid) - 備品利用者ID
- asset_id*: string(uuid) - 割当先の備品ID
- start_at*: string(date) - 割当開始日 (YYYY-MM-DD)
- end_at*: string(date) - 割当終了日 (YYYY-MM-DD)。null の場合は現在割当中
- member*: object - 割当先メンバー
- created_at*: string(date-time) - 作成日時(ISO8601)
- updated_at*: string(date-time) - 更新日時(ISO8601)

## GET /hub/it_management/assets/{asset_id}/members/{id} — 備品利用者詳細取得（β版）

指定した備品利用者の詳細を取得します。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- company_id*: integer(int64) - 事業所ID
- asset_id* (path): string(uuid) - 備品ID
- id* (path): string(uuid) - 備品利用者ID

### レスポンス

備品利用者詳細取得レスポンス
- id*: string(uuid) - 備品利用者ID
- asset_id*: string(uuid) - 割当先の備品ID
- start_at*: string(date) - 割当開始日 (YYYY-MM-DD)
- end_at*: string(date) - 割当終了日 (YYYY-MM-DD)。null の場合は現在割当中
- member*: object - 割当先メンバー
- created_at*: string(date-time) - 作成日時(ISO8601)
- updated_at*: string(date-time) - 更新日時(ISO8601)

## PATCH /hub/it_management/assets/{asset_id}/members/{id} — 備品利用者部分更新（β版）

備品利用者の start_at / end_at を部分的に更新します。 ##

注意点
- 指定されたパラメーターのみが更新されます。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- asset_id* (path): string(uuid) - 備品ID
- id* (path): string(uuid) - 備品利用者ID

### リクエストボディ*

- company_id: integer(int64) - 事業所ID 例: `1`
- start_at: string(date) - 割当開始日 (YYYY-MM-DD) 例: `2026-01-01`
- end_at: string(date) - 割当終了日 (YYYY-MM-DD) 例: `2026-12-31`

### レスポンス

備品利用者部分更新レスポンス
- id*: string(uuid) - 備品利用者ID
- asset_id*: string(uuid) - 割当先の備品ID
- start_at*: string(date) - 割当開始日 (YYYY-MM-DD)
- end_at*: string(date) - 割当終了日 (YYYY-MM-DD)。null の場合は現在割当中
- member*: object - 割当先メンバー
- created_at*: string(date-time) - 作成日時(ISO8601)
- updated_at*: string(date-time) - 更新日時(ISO8601)

## DELETE /hub/it_management/assets/{asset_id}/members/{id} — 備品利用者削除（β版）

備品利用者の履歴を物理削除します。履歴を残したまま利用を終了する場合は、部分更新 (PATCH) で end_at を指定してください。

### パラメータ

GET /hub/it_management/assets/{asset_id}/members/{id} と同じ

### レスポンス

備品利用者削除レスポンス
