# Tags

メモタグ

## GET /api/1/tags — メモタグ一覧の取得

概要 指定した事業所のメモタグ一覧を取得する

### パラメータ

- company_id*: integer(int64) - 事業所ID
- start_update_date: string - 更新日で絞り込み：開始日(yyyy-mm-dd)
- end_update_date: string - 更新日で絞り込み：終了日(yyyy-mm-dd)
- offset: integer(int64) - 取得レコードのオフセット (デフォルト: 0)
- limit: integer(int64) - 取得レコードの件数 (デフォルト: 50, 最小: 1, 最大: 3000)

### レスポンス

- tags*: array[object]

## POST /api/1/tags — メモタグの作成

概要 指定した事業所のメモタグを作成する

### リクエストボディ

- company_id*: integer(int64) - 事業所ID 例: `1` (最小: 1)
- name*: string - メモタグ名 (30文字以内) 例: `メモタグ1`
- shortcut1: string - ショートカット1 (20文字以内) 例: `tag1`
- shortcut2: string - ショートカット2 (20文字以内) 例: `t1`

### レスポンス

- tag*: object

## GET /api/1/tags/{id} — メモタグの取得

概要 指定した事業所のメモタグを取得する

### パラメータ

- id* (path): integer(int64) - タグID
- company_id*: integer(int64) - 事業所ID

### レスポンス

POST /api/1/tags と同じ

## PUT /api/1/tags/{id} — メモタグの更新

概要 指定した事業所のメモタグを更新する

### パラメータ

- id* (path): integer(int64) - メモタグID

### リクエストボディ

POST /api/1/tags と同じ

### レスポンス

POST /api/1/tags と同じ

## DELETE /api/1/tags/{id} — メモタグの削除

概要 指定した事業所のメモタグを削除する

### パラメータ

GET /api/1/tags/{id} と同じ
