# Segment tags

セグメントタグ

## GET /api/1/segments/{segment_id}/tags — セグメントタグ一覧の取得

概要 指定した事業所のセグメントタグ一覧を取得する

注意点
事業所の設定でセグメントタグコードを使用する設定にしている場合、レスポンスでセグメントタグコード(code)を返します

### パラメータ

- company_id*: integer(int64) - 事業所ID
- segment_id* (path): integer(int64) - セグメントID（1,2,3のいずれか）
  該当プラン以外で参照した場合にはエラーとなります。
- offset: integer(int64) - 取得レコードのオフセット (デフォルト: 0)
- limit: integer(int64) - 取得レコードの件数 (デフォルト: 20, 最小: 1, 最大: 500)
- start_update_date: string - 更新日で絞込：開始日(yyyy-mm-dd)
- end_update_date: string - 更新日で絞込：終了日(yyyy-mm-dd)

### レスポンス

- segment_tags*: array[object]

## POST /api/1/segments/{segment_id}/tags — セグメントタグの作成

概要 指定した事業所のセグメントタグを作成する

注意点
codeを利用するには、事業所の設定でセグメントタグコードを使用する設定にする必要があります。

### パラメータ

- segment_id* (path): integer(int64) - セグメントID（1,2,3のいずれか）
  該当プラン以外で参照した場合にはエラーとなります。

### リクエストボディ

- company_id*: integer(int64) - 事業所ID 例: `1` (最小: 1)
- name*: string - セグメントタグ名 (100文字以内) 例: `プロジェクトA`
- description: string - 備考 (30文字以内) 例: `備考`
- shortcut1: string - ショートカット１ (20文字以内) 例: `A`
- shortcut2: string - ショートカット２ (20文字以内) 例: `123`
- code: string - セグメントタグコード 例: `code001` (パターン: ^[0-9a-zA-Z_-]+$)

### レスポンス

- segment_tag*: object

## PUT /api/1/segments/{segment_id}/tags/{id} — セグメントタグの更新

概要 指定した事業所のセグメントタグを更新する

注意点
codeを利用するには、事業所の設定でセグメントタグコードを使用する設定にする必要があります。

### パラメータ

- segment_id* (path): integer(int64) - セグメントID（1,2,3のいずれか）
  該当プラン以外で参照した場合にはエラーとなります。
- id* (path): integer(int64) - セグメントタグID

### リクエストボディ

POST /api/1/segments/{segment_id}/tags と同じ

### レスポンス

POST /api/1/segments/{segment_id}/tags と同じ

## DELETE /api/1/segments/{segment_id}/tags/{id} — セグメントタグの削除

概要 指定した事業所のセグメントタグを削除する

### パラメータ

- segment_id* (path): integer(int64) - セグメントID（1,2,3のいずれか）
  該当プラン以外で参照した場合にはエラーとなります。
- id* (path): integer(int64) - セグメントタグID
- company_id*: integer(int64) - 事業所ID

## PUT /api/1/segments/{segment_id}/tags/code/upsert — セグメントタグの更新（作成）

概要 セグメントタグコードをキーに、指定したセグメントタグの情報を更新（存在しない場合は作成）する

注意点
codeを利用するには、事業所の設定でセグメントタグコードを使用する設定にする必要があります。

### パラメータ

POST /api/1/segments/{segment_id}/tags と同じ

### リクエストボディ

- company_id*: integer(int64) - 事業所ID 例: `1` (最小: 1)
- code*: string - セグメントタグコード 例: `code001` (パターン: ^[0-9a-zA-Z_-]+$)
- segment_tag*: object
  - name*: string - セグメントタグ名 (100文字以内) 例: `プロジェクトA`
  - description: string - 備考 (30文字以内) 例: `備考`
  - shortcut1: string - ショートカット１ (20文字以内) 例: `A`
  - shortcut2: string - ショートカット２ (20文字以内) 例: `123`

### レスポンス

POST /api/1/segments/{segment_id}/tags と同じ
