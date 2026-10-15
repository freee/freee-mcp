# it_management_positions

positions

## GET /hub/it_management/positions — 役職一覧取得（β版）

役職の一覧をカーソルページネーションで取得します。 ##

注意点
- この API の「役職」は、IT管理で管理している役職を指します。freee人事労務の役職とは別のものです。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- company_id*: integer(int64) - 事業所ID
- page_token: string - ページネーションのトークン
- page_size: integer(int32) - 1ページあたりの取得件数（デフォルト25、最大100）

### レスポンス

役職一覧取得レスポンス
- data*: array[object] - 役職のリスト
- next_page_token*: string - 次のページを取得するためのカーソルトークン。次ページがない場合はnull

## POST /hub/it_management/positions — 役職作成（β版）

役職を作成します。 ##

注意点
- この API の「役職」は、IT管理で管理している役職を指します。freee人事労務の役職とは別のものです。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)

### リクエストボディ*

- company_id*: integer(int64) - 事業所ID 例: `1`
- name*: string - 役職名 例: `部長`

### レスポンス

役職作成レスポンス
- id*: string(uuid) - 役職ID
- name*: string - 役職名

## GET /hub/it_management/positions/{id} — 役職詳細取得（β版）

役職の詳細を取得します。 ##

注意点
- この API の「役職」は、IT管理で管理している役職を指します。freee人事労務の役職とは別のものです。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- company_id*: integer(int64) - 事業所ID
- id* (path): string(uuid) - 役職ID

### レスポンス

役職詳細取得レスポンス
- id*: string(uuid) - 役職ID
- name*: string - 役職名

## PATCH /hub/it_management/positions/{id} — 役職部分更新（β版）

役職を部分的に更新します。 ##

注意点
- この API の「役職」は、IT管理で管理している役職を指します。freee人事労務の役職とは別のものです。 - 指定されたパラメーターのみが更新されます。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- id* (path): string(uuid) - 役職ID

### リクエストボディ*

- company_id: integer(int64) - 事業所ID 例: `1`
- name: string - 役職名 例: `部長`

### レスポンス

役職部分更新レスポンス
- id*: string(uuid) - 役職ID
- name*: string - 役職名

## DELETE /hub/it_management/positions/{id} — 役職削除（β版）

役職を削除します。 ##

注意点
- この API の「役職」は、IT管理で管理している役職を指します。freee人事労務の役職とは別のものです。 - 役職が設定されているメンバーがいる場合は削除できません。 - グループのルールの条件で使われている役職は削除できません。

### パラメータ

GET /hub/it_management/positions/{id} と同じ

### レスポンス

役職削除レスポンス
