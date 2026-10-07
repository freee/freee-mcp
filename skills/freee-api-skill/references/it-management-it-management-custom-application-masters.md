# it_management_custom_application_masters

custom_application_masters

## GET /hub/it_management/custom_application_masters — カスタムアプリマスタ一覧取得（β版）

テナント内で定義されているカスタムアプリマスタ (カスタムアプリの元になるカタログ) の一覧をカーソルページネーションで取得します。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- company_id*: integer(int64) - 事業所ID
- keyword: string - 名前の部分一致検索キーワード
- page_token: string - ページネーションのトークン
- page_size: integer(int32) - 1ページあたりの取得件数（デフォルト25、最大100）

### レスポンス

カスタムアプリマスタ一覧取得レスポンス
- data*: array[object] - カスタムアプリマスタのリスト
- next_page_token*: string - 次のページを取得するためのカーソルトークン。次ページがない場合はnull

## GET /hub/it_management/custom_application_masters/{id} — カスタムアプリマスタ詳細取得（β版）

カスタムアプリマスタの詳細を取得します。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- company_id*: integer(int64) - 事業所ID
- id* (path): string(uuid) - カスタムアプリマスタID

### レスポンス

カスタムアプリマスタ詳細取得レスポンス
- id*: string(uuid) - カスタムアプリマスタID
- name*: string - カスタムアプリマスタ名
- created_at*: string(date-time) - 作成日時(ISO8601)
- updated_at*: string(date-time) - 更新日時(ISO8601)

## PATCH /hub/it_management/custom_application_masters/{id} — カスタムアプリマスタ部分更新（β版）

カスタムアプリマスタの name を部分的に更新します。 ##

注意点
- 同じマスタを複数のカスタムアプリ (Application) が共有している場合、 rename は共有している全 Application の表示 name に反映されます。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- id* (path): string(uuid) - カスタムアプリマスタID

### リクエストボディ*

- company_id: integer(int64) - 事業所ID 例: `1`
- name: string - カスタムアプリマスタ名 例: `社内システム`

### レスポンス

カスタムアプリマスタ部分更新レスポンス
- id*: string(uuid) - カスタムアプリマスタID
- name*: string - カスタムアプリマスタ名
- created_at*: string(date-time) - 作成日時(ISO8601)
- updated_at*: string(date-time) - 更新日時(ISO8601)
