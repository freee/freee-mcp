# it_management_asset_attributes

asset_attributes

## GET /hub/it_management/asset_attributes — 備品属性一覧取得（β版）

備品属性の一覧をカーソルページネーションで取得します。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- company_id*: integer(int64) - 事業所ID
- page_token: string - ページネーションのトークン
- page_size: integer(int32) - 1ページあたりの取得件数（デフォルト25、最大100）

### レスポンス

備品属性一覧取得レスポンス
- data*: array[object] - 備品属性のリスト
- next_page_token*: string - 次のページを取得するためのカーソルトークン。次ページがない場合はnull

## POST /hub/it_management/asset_attributes — 備品属性作成（β版）

備品属性を作成します。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)

### リクエストボディ*

- company_id*: integer(int64) - 事業所ID 例: `1`
- name*: string - 備品属性名 例: `シリアル番号`
- input_kind*: string - 入力種別 (選択肢: string, text, integer, date, select)
- icon: string - アイコン識別子 例: `hash`
- options: object - `select` 種別の選択肢 (`select` の場合は必須)
  - options*: array[string] - 選択肢のリスト 例: `["新品","中古"]`
- allow_duplicate: boolean - 重複を許可するか (`integer` 種別のみ意味を持つ、デフォルト true) 例: `true`

### レスポンス

備品属性作成レスポンス
- id*: string(uuid) - 備品属性ID
- name*: string - 備品属性名
- input_kind*: string - 入力種別
- icon*: string - アイコン識別子
- options*: object - 種別ごとの設定。`select` 種別では選択肢、`integer` 種別では単位が入る。設定がない場合は null
- order*: integer(int32) - 表示順
- allow_duplicate*: boolean - 重複を許可するか (`integer` 種別のみ意味を持つ)
- system_attribute*: string - システム管理属性の識別子 (`null` の場合はユーザー作成属性)
- created_at*: string(date-time) - 作成日時(ISO8601)
- updated_at*: string(date-time) - 更新日時(ISO8601)

## GET /hub/it_management/asset_attributes/{id} — 備品属性詳細取得（β版）

備品属性の詳細を取得します。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- company_id*: integer(int64) - 事業所ID
- id* (path): string(uuid) - 備品属性ID

### レスポンス

備品属性詳細取得レスポンス
- id*: string(uuid) - 備品属性ID
- name*: string - 備品属性名
- input_kind*: string - 入力種別
- icon*: string - アイコン識別子
- options*: object - 種別ごとの設定。`select` 種別では選択肢、`integer` 種別では単位が入る。設定がない場合は null
- order*: integer(int32) - 表示順
- allow_duplicate*: boolean - 重複を許可するか (`integer` 種別のみ意味を持つ)
- system_attribute*: string - システム管理属性の識別子 (`null` の場合はユーザー作成属性)
- created_at*: string(date-time) - 作成日時(ISO8601)
- updated_at*: string(date-time) - 更新日時(ISO8601)

## PATCH /hub/it_management/asset_attributes/{id} — 備品属性部分更新（β版）

備品属性を部分的に更新します。system-managed な属性は更新できません。 ##

注意点
- 指定されたパラメーターのみが更新されます。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- id* (path): string(uuid) - 備品属性ID

### リクエストボディ*

- company_id: integer(int64) - 事業所ID 例: `1`
- name: string - 備品属性名 例: `シリアル番号`
- icon: string - アイコン識別子 例: `hash`
- options: object - `select` 種別の選択肢
  - options: array[string] - 選択肢のリスト 例: `["新品","中古"]`
- allow_duplicate: boolean - 重複を許可するか (`integer` 種別のみ意味を持つ) 例: `true`

### レスポンス

備品属性部分更新レスポンス
- id*: string(uuid) - 備品属性ID
- name*: string - 備品属性名
- input_kind*: string - 入力種別
- icon*: string - アイコン識別子
- options*: object - 種別ごとの設定。`select` 種別では選択肢、`integer` 種別では単位が入る。設定がない場合は null
- order*: integer(int32) - 表示順
- allow_duplicate*: boolean - 重複を許可するか (`integer` 種別のみ意味を持つ)
- system_attribute*: string - システム管理属性の識別子 (`null` の場合はユーザー作成属性)
- created_at*: string(date-time) - 作成日時(ISO8601)
- updated_at*: string(date-time) - 更新日時(ISO8601)

## DELETE /hub/it_management/asset_attributes/{id} — 備品属性削除（β版）

備品属性を削除します。system-managed な属性は削除できません。

### パラメータ

GET /hub/it_management/asset_attributes/{id} と同じ

### レスポンス

備品属性削除レスポンス
