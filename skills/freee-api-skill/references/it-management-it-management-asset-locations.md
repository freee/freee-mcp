# it_management_asset_locations

asset_locations

## GET /hub/it_management/asset_locations — 備品保管場所一覧取得（β版）

備品保管場所の一覧をカーソルページネーションで取得します。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- company_id*: integer(int64) - 事業所ID
- page_token: string - ページネーションのトークン
- page_size: integer(int32) - 1ページあたりの取得件数（デフォルト25、最大100）

### レスポンス

備品保管場所一覧取得レスポンス
- data*: array[object] - 備品保管場所のリスト
- next_page_token*: string - 次のページを取得するためのカーソルトークン。次ページがない場合はnull

## POST /hub/it_management/asset_locations — 備品保管場所作成（β版）

備品保管場所を作成します。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)

### リクエストボディ*

- company_id*: integer(int64) - 事業所ID 例: `1`
- name*: string - 備品保管場所名 例: `本社`
- zipcode: string - 郵便番号(ハイフンなし、7桁) 例: `1410033`
- prefecture: string - 都道府県名 (北海道、東京都 等) または都道府県コード ("01"〜"47") 例: `東京都`
- address: string - 住所 例: `品川区西品川1丁目2-1`

### レスポンス

備品保管場所作成レスポンス
- id*: string(uuid) - 備品保管場所ID
- name*: string - 備品保管場所名
- zipcode*: string - 郵便番号(ハイフンなし、7桁)
- prefecture*: string - 都道府県名(北海道、東京都 等)。作成/更新時は都道府県コード ("01"〜"47") でも指定可能
- address*: string - 住所

## GET /hub/it_management/asset_locations/{id} — 備品保管場所詳細取得（β版）

備品保管場所の詳細を取得します。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- company_id*: integer(int64) - 事業所ID
- id* (path): string(uuid) - 備品保管場所ID

### レスポンス

備品保管場所詳細取得レスポンス
- id*: string(uuid) - 備品保管場所ID
- name*: string - 備品保管場所名
- zipcode*: string - 郵便番号(ハイフンなし、7桁)
- prefecture*: string - 都道府県名(北海道、東京都 等)。作成/更新時は都道府県コード ("01"〜"47") でも指定可能
- address*: string - 住所

## PATCH /hub/it_management/asset_locations/{id} — 備品保管場所部分更新（β版）

備品保管場所を部分的に更新します。 ##

注意点
- 指定されたパラメーターのみが更新されます。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- id* (path): string(uuid) - 備品保管場所ID

### リクエストボディ*

- company_id: integer(int64) - 事業所ID 例: `1`
- name: string - 備品保管場所名 例: `本社`
- zipcode: string - 郵便番号(ハイフンなし、7桁) 例: `1410033`
- prefecture: string - 都道府県名 (北海道、東京都 等) または都道府県コード ("01"〜"47") 例: `東京都`
- address: string - 住所 例: `品川区西品川1丁目2-1`

### レスポンス

備品保管場所部分更新レスポンス
- id*: string(uuid) - 備品保管場所ID
- name*: string - 備品保管場所名
- zipcode*: string - 郵便番号(ハイフンなし、7桁)
- prefecture*: string - 都道府県名(北海道、東京都 等)。作成/更新時は都道府県コード ("01"〜"47") でも指定可能
- address*: string - 住所

## DELETE /hub/it_management/asset_locations/{id} — 備品保管場所削除（β版）

備品保管場所を削除します。使用中 (アクティブな備品配置がある) の保管場所は削除できません。

### パラメータ

GET /hub/it_management/asset_locations/{id} と同じ

### レスポンス

備品保管場所削除レスポンス
