<!-- freeeIT管理 の小さいタグをまとめたファイル。タグごとの行範囲は INDEX.md を参照し、必要な範囲だけ読むこと。 -->

# it_management_application_accounts

application_accounts

## GET /hub/it_management/application_accounts — アカウント一覧取得（β版）

アカウントの一覧をカーソルページネーションで取得します。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- company_id*: integer(int64) - 事業所ID
- page_token: string - ページネーションのトークン
- page_size: integer(int32) - 1ページあたりの取得件数（デフォルト25、最大100）
- application_id: string(uuid) - アプリケーションIDでフィルタ
- keyword: string - キーワード検索（account に部分一致）
- status_id: string(uuid) - ステータスIDでフィルタ
- member_id: string(uuid) - アカウントホルダーのメンバーIDでフィルタ

### レスポンス

アカウント一覧取得レスポンス
- data*: array[object] - アカウントのリスト
- next_page_token*: string - 次のページを取得するためのカーソルトークン。次ページがない場合はnull

## POST /hub/it_management/application_accounts — アカウント作成（β版）

アカウントを作成します。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)

### リクエストボディ*

- company_id*: integer(int64) - 事業所ID 例: `1`
- account*: string - アカウント名 例: `yamada.taro@example.com`
- account_kind*: string - アカウント種別 (選択肢: email, id_string)
- external_id*: string - 外部システムID 例: `user-12345`
- external_url: string - アプリケーションのアカウントページURL 例: `https://app.example.com/users/12345`
- application_id*: string(uuid) - アプリケーションID 例: `550e8400-e29b-41d4-a716-446655440001`

### レスポンス

アカウント作成レスポンス
- id*: string(uuid) - アカウントID
- account*: string - アカウント名
- account_kind*: string - アカウント種別
- external_id*: string - 外部システムID
- external_url*: string - アプリケーションのアカウントページURL
- discovered_at*: string(date-time) - 検出日時(ISO8601)
- last_login_at*: string(date-time) - 最終ログイン日時(ISO8601)
- last_synced_at*: string(date-time) - 最終同期日時(ISO8601)
- application*: object - アプリケーション
- status*: object - ステータス
- role*: object - ロール
- member*: object - 紐づくメンバー
- data*: object - アプリケーション固有のアカウント属性（コネクタにより構造が異なる）
- created_at*: string(date-time) - 作成日時(ISO8601)
- updated_at*: string(date-time) - 更新日時(ISO8601)

## GET /hub/it_management/application_accounts/{id} — アカウント詳細取得（β版）

アカウントの詳細を取得します。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- company_id*: integer(int64) - 事業所ID
- id* (path): string(uuid) - アカウントID

### レスポンス

アカウント詳細取得レスポンス
- id*: string(uuid) - アカウントID
- account*: string - アカウント名
- account_kind*: string - アカウント種別
- external_id*: string - 外部システムID
- external_url*: string - アプリケーションのアカウントページURL
- discovered_at*: string(date-time) - 検出日時(ISO8601)
- last_login_at*: string(date-time) - 最終ログイン日時(ISO8601)
- last_synced_at*: string(date-time) - 最終同期日時(ISO8601)
- application*: object - アプリケーション
- status*: object - ステータス
- role*: object - ロール
- member*: object - 紐づくメンバー
- data*: object - アプリケーション固有のアカウント属性（コネクタにより構造が異なる）
- created_at*: string(date-time) - 作成日時(ISO8601)
- updated_at*: string(date-time) - 更新日時(ISO8601)

## PATCH /hub/it_management/application_accounts/{id} — アカウント部分更新（β版）

アカウントを部分的に更新します。 ##

注意点
- 指定されたパラメータのみが更新されます。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- id* (path): string(uuid) - アカウントID

### リクエストボディ*

- company_id*: integer(int64) - 事業所ID 例: `1`
- account: string - アカウント名 例: `yamada.taro@example.com`
- account_kind: string - アカウント種別 (選択肢: email, id_string)
- external_id: string - 外部システムID 例: `user-12345`
- external_url: string - アプリケーションのアカウントページURL 例: `https://app.example.com/users/12345`
- application_account_status_id: string(uuid) - ステータスID（同一アプリケーション内のものを指定） 例: `550e8400-e29b-41d4-a716-446655440002`
- application_account_role_id: string(uuid) - ロールID（同一アプリケーション内のものを指定。null を指定するとロールを解除） 例: `550e8400-e29b-41d4-a716-446655440004`
- attributes: object - アプリケーション固有のアカウント属性。キーは attribute の UUID または title（同一アプリ内で一意）のどちらでも指定可能。

### レスポンス

アカウント部分更新レスポンス
- id*: string(uuid) - アカウントID
- account*: string - アカウント名
- account_kind*: string - アカウント種別
- external_id*: string - 外部システムID
- external_url*: string - アプリケーションのアカウントページURL
- discovered_at*: string(date-time) - 検出日時(ISO8601)
- last_login_at*: string(date-time) - 最終ログイン日時(ISO8601)
- last_synced_at*: string(date-time) - 最終同期日時(ISO8601)
- application*: object - アプリケーション
- status*: object - ステータス
- role*: object - ロール
- member*: object - 紐づくメンバー
- data*: object - アプリケーション固有のアカウント属性（コネクタにより構造が異なる）
- created_at*: string(date-time) - 作成日時(ISO8601)
- updated_at*: string(date-time) - 更新日時(ISO8601)

## DELETE /hub/it_management/application_accounts/{id} — アカウント削除（β版）

アカウントを削除します（ソフトデリート）。

### パラメータ

GET /hub/it_management/application_accounts/{id} と同じ

### レスポンス

アカウント削除レスポンス

# it_management_application_masters

application_masters

## GET /hub/it_management/application_masters — アプリマスタ一覧取得（β版）

freee IT管理 のアプリカタログに含まれる標準アプリマスタの一覧をカーソルページネーションで取得します。 `keyword` を指定すると、アプリ名、slug、提供会社名を対象に部分一致検索を行います (空白区切りで AND 検索)。 ##

注意点
- ロールが「一般」のユーザーでは、一覧は常に空になります。詳細取得は利用できます。 - フリープランでは、プランで利用できるアプリマスタだけが返ります。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- company_id*: integer(int64) - 事業所ID
- keyword: string - アプリ名 / slug / 提供会社名の部分一致検索キーワード (空白区切りで AND 検索)
- page_token: string - ページネーションのトークン
- page_size: integer(int32) - 1ページあたりの取得件数（デフォルト25、最大100）

### レスポンス

アプリマスタ一覧取得レスポンス
- data*: array[object] - アプリマスタのリスト
- next_page_token*: string - 次のページを取得するためのカーソルトークン。次ページがない場合はnull

## GET /hub/it_management/application_masters/{id} — アプリマスタ詳細取得（β版）

アプリマスタの詳細を取得します。 ##

注意点
- フリープランでは、プランで利用できないアプリマスタを指定すると 404 になります。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- company_id*: integer(int64) - 事業所ID
- id* (path): string(uuid) - アプリマスタID

### レスポンス

アプリマスタ詳細取得レスポンス
- id*: string(uuid) - アプリマスタID
- name*: string - アプリマスタ名
- slug*: string - アプリマスタの一意 slug
- description*: string - 説明
- service_url*: string - サービスの公式サイト URL
- privacy_url*: string - プライバシーポリシー URL
- terms_url*: string - 利用規約 URL
- stage*: string - 公開ステージ
- category*: object - カテゴリ
- company*: object - 提供会社

# it_management_applications

applications

## GET /hub/it_management/applications — アプリ一覧取得（β版）

利用中 (未アーカイブ) のアプリ一覧をカーソルページネーションで取得します。 `keyword` を指定すると、テナント名、アプリ名、標準アプリの slug、標準アプリの提供会社名を対象に部分一致検索を行います (空白区切りで AND 検索)。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- company_id*: integer(int64) - 事業所ID
- keyword: string - テナント名 / アプリ名 / 標準アプリの slug / 標準アプリの提供会社名の部分一致検索キーワード (空白区切りで AND 検索)
- page_token: string - ページネーションのトークン
- page_size: integer(int32) - 1ページあたりの取得件数（デフォルト25、最大100）

### レスポンス

アプリ一覧取得レスポンス
- data*: array[object] - アプリのリスト
- next_page_token*: string - 次のページを取得するためのカーソルトークン。次ページがない場合はnull

## GET /hub/it_management/applications/{id} — アプリ詳細取得（β版）

アプリの詳細を取得します。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- company_id*: integer(int64) - 事業所ID
- id* (path): string(uuid) - アプリID

### レスポンス

アプリ詳細取得レスポンス
- id*: string(uuid) - アプリID
- name*: string - アプリ名 (標準アプリはアプリマスタの名前、カスタムアプリはカスタムアプリマスタの名前)
- tenant_name*: string - 各テナントで管理しているアプリ表示名
- external_id*: string - アプリの外部識別子
- slug*: string - 標準アプリの slug (custom_application が true の場合は null)
- resource_type*: string - 紐づくアプリマスタの種別
- resource_id*: string(uuid) - 紐づくアプリマスタの id
- custom_application*: boolean - カスタムアプリかどうか
- archived*: boolean - アーカイブ済みかどうか。一覧取得では常に false。詳細取得ではアーカイブ済みのアプリも返す
- order*: integer(int32) - 表示順
- product_company*: object - 所属会社 (IT管理の会社)。作成時に既定の会社が割り当てられる。アーカイブ済みのアプリでは null
- created_at*: string(date-time) - 作成日時(ISO8601)
- updated_at*: string(date-time) - 更新日時(ISO8601)

## PATCH /hub/it_management/applications/{id} — アプリ部分更新（β版）

アプリの所属会社 / テナント名を部分的に更新します。 ##

注意点
- 指定されたパラメーターのみが更新されます。 - アプリ名はこの API では変更できません。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- id* (path): string(uuid) - アプリID

### リクエストボディ*

- company_id*: integer(int64) - 事業所ID 例: `1`
- product_company_id: string(uuid) - 所属会社 (IT管理の会社) の ID。会社一覧取得 (GET /hub/it_management/product_companies) で取得できます。指定すると、アプリの所属会社を変更します。存在しない ID を指定すると 422 になります (エラーの invalid_fields では company_id と表示されます) 例: `550e8400-e29b-41d4-a716-446655440001`
- tenant_name: string - 各テナントで管理しているアプリ表示名。標準アプリ / カスタムアプリのどちらも更新できます 例: `本社 Slack`

### レスポンス

アプリ部分更新レスポンス
- id*: string(uuid) - アプリID
- name*: string - アプリ名 (標準アプリはアプリマスタの名前、カスタムアプリはカスタムアプリマスタの名前)
- tenant_name*: string - 各テナントで管理しているアプリ表示名
- external_id*: string - アプリの外部識別子
- slug*: string - 標準アプリの slug (custom_application が true の場合は null)
- resource_type*: string - 紐づくアプリマスタの種別
- resource_id*: string(uuid) - 紐づくアプリマスタの id
- custom_application*: boolean - カスタムアプリかどうか
- archived*: boolean - アーカイブ済みかどうか。一覧取得では常に false。詳細取得ではアーカイブ済みのアプリも返す
- order*: integer(int32) - 表示順
- product_company*: object - 所属会社 (IT管理の会社)。作成時に既定の会社が割り当てられる。アーカイブ済みのアプリでは null
- created_at*: string(date-time) - 作成日時(ISO8601)
- updated_at*: string(date-time) - 更新日時(ISO8601)

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

- company_id*: integer(int64) - 事業所ID 例: `1`
- name: string - 備品属性名 例: `シリアル番号`
- icon: string - アイコン識別子 例: `hash`
- options: object - `select` 種別の選択肢
  - options*: array[string] - 選択肢のリスト 例: `["新品","中古"]`
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

# it_management_asset_categories

asset_categories

## GET /hub/it_management/asset_categories — 備品種別一覧取得（β版）

備品種別の一覧をカーソルページネーションで取得します。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- company_id*: integer(int64) - 事業所ID
- page_token: string - ページネーションのトークン
- page_size: integer(int32) - 1ページあたりの取得件数（デフォルト25、最大100）

### レスポンス

備品種別一覧取得レスポンス
- data*: array[object] - 備品種別のリスト
- next_page_token*: string - 次のページを取得するためのカーソルトークン。次ページがない場合はnull

## POST /hub/it_management/asset_categories — 備品種別作成（β版）

備品種別を作成します。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)

### リクエストボディ*

- company_id*: integer(int64) - 事業所ID 例: `1`
- name*: string - 備品種別名 例: `ノートPC`

### レスポンス

備品種別作成レスポンス
- id*: string(uuid) - 備品種別ID
- name*: string - 備品種別名
- asset_attributes*: array[object] - この備品種別に紐づく備品属性のリスト (表示順)。備品の作成・更新で asset_attribute_values に指定できるのはこれらの備品属性です

## GET /hub/it_management/asset_categories/{id} — 備品種別詳細取得（β版）

備品種別の詳細を取得します。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- company_id*: integer(int64) - 事業所ID
- id* (path): string(uuid) - 備品種別ID

### レスポンス

備品種別詳細取得レスポンス
- id*: string(uuid) - 備品種別ID
- name*: string - 備品種別名
- asset_attributes*: array[object] - この備品種別に紐づく備品属性のリスト (表示順)。備品の作成・更新で asset_attribute_values に指定できるのはこれらの備品属性です

## PATCH /hub/it_management/asset_categories/{id} — 備品種別部分更新（β版）

備品種別を部分的に更新します。 ##

注意点
- 指定されたパラメーターのみが更新されます。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- id* (path): string(uuid) - 備品種別ID

### リクエストボディ*

- company_id*: integer(int64) - 事業所ID 例: `1`
- name: string - 備品種別名 例: `ノートPC`

### レスポンス

備品種別部分更新レスポンス
- id*: string(uuid) - 備品種別ID
- name*: string - 備品種別名
- asset_attributes*: array[object] - この備品種別に紐づく備品属性のリスト (表示順)。備品の作成・更新で asset_attribute_values に指定できるのはこれらの備品属性です

## DELETE /hub/it_management/asset_categories/{id} — 備品種別削除（β版）

備品種別を削除します。備品が紐付いている、または system-managed な種別は削除できません。

### パラメータ

GET /hub/it_management/asset_categories/{id} と同じ

### レスポンス

備品種別削除レスポンス

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

- company_id*: integer(int64) - 事業所ID 例: `1`
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

- company_id*: integer(int64) - 事業所ID 例: `1`
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

# it_management_asset_statuses

asset_statuses

## GET /hub/it_management/asset_statuses — 備品ステータス一覧取得（β版）

備品ステータスの一覧をカーソルページネーションで取得します。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- company_id*: integer(int64) - 事業所ID
- page_token: string - ページネーションのトークン
- page_size: integer(int32) - 1ページあたりの取得件数（デフォルト25、最大100）

### レスポンス

備品ステータス一覧取得レスポンス
- data*: array[object] - 備品ステータスのリスト
- next_page_token*: string - 次のページを取得するためのカーソルトークン。次ページがない場合はnull

## POST /hub/it_management/asset_statuses — 備品ステータス作成（β版）

備品ステータスを作成します。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)

### リクエストボディ*

- company_id*: integer(int64) - 事業所ID 例: `1`
- name*: string - 備品ステータス名 例: `使用中`
- color: string - 表示色 (HEXカラーコード) 例: `#4CAF50` (パターン: ^#[0-9A-Fa-f]{6}$)

### レスポンス

備品ステータス作成レスポンス
- id*: string(uuid) - 備品ステータスID
- name*: string - 備品ステータス名

## GET /hub/it_management/asset_statuses/{id} — 備品ステータス詳細取得（β版）

備品ステータスの詳細を取得します。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- company_id*: integer(int64) - 事業所ID
- id* (path): string(uuid) - 備品ステータスID

### レスポンス

備品ステータス詳細取得レスポンス
- id*: string(uuid) - 備品ステータスID
- name*: string - 備品ステータス名

## PATCH /hub/it_management/asset_statuses/{id} — 備品ステータス部分更新（β版）

備品ステータスを部分的に更新します。 ##

注意点
- 指定されたパラメーターのみが更新されます。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- id* (path): string(uuid) - 備品ステータスID

### リクエストボディ*

- company_id*: integer(int64) - 事業所ID 例: `1`
- name: string - 備品ステータス名 例: `使用中`
- color: string - 表示色 (HEXカラーコード) 例: `#4CAF50` (パターン: ^#[0-9A-Fa-f]{6}$)

### レスポンス

備品ステータス部分更新レスポンス
- id*: string(uuid) - 備品ステータスID
- name*: string - 備品ステータス名

## DELETE /hub/it_management/asset_statuses/{id} — 備品ステータス削除（β版）

備品ステータスを削除します。備品が紐付いているステータスは削除できません。

### パラメータ

GET /hub/it_management/asset_statuses/{id} と同じ

### レスポンス

備品ステータス削除レスポンス

# it_management_assets

assets

## GET /hub/it_management/assets — 備品一覧取得（β版）

備品の一覧をカーソルページネーションで取得します。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- company_id*: integer(int64) - 事業所ID
- page_token: string - ページネーションのトークン
- page_size: integer(int32) - 1ページあたりの取得件数（デフォルト25、最大100）
- keyword: string - キーワード検索（name, asset_number, serial_number に部分一致）
- asset_status_id: string(uuid) - ステータスIDでフィルタ
- asset_category_id: string(uuid) - 種別IDでフィルタ
- member_id: string(uuid) - 利用者のメンバーIDでフィルタ

### レスポンス

備品一覧取得レスポンス
- data*: array[object] - 備品のリスト
- next_page_token*: string - 次のページを取得するためのカーソルトークン。次ページがない場合はnull

## POST /hub/it_management/assets — 備品作成（β版）

備品を作成します。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)

### リクエストボディ*

- company_id*: integer(int64) - 事業所ID 例: `1`
- name*: string - 備品名 例: `MacBook Pro 14inch`
- asset_number: string - 資産管理番号（チーム内一意） 例: `A-001`
- serial_number: string - シリアル番号（チーム内一意） 例: `C02X1234ABCD`
- external_id: string - 外部システムID（チーム内一意） 例: `EXT-001`
- asset_status_id*: string(uuid) - ステータスID 例: `550e8400-e29b-41d4-a716-446655440001`
- asset_category_id*: string(uuid) - 種別ID 例: `550e8400-e29b-41d4-a716-446655440002`
- asset_location_id: string(uuid) - 保管場所ID 例: `550e8400-e29b-41d4-a716-446655440004`
- asset_attribute_values: array[object] - 備品属性の値のリスト。asset_attribute_id には、指定した種別に紐づく備品属性を指定します
  配列の要素:
    - asset_attribute_id*: string(uuid) - 備品属性ID 例: `550e8400-e29b-41d4-a716-446655440005`
    - string_value: string - 文字列の値。入力種別が string / text / select の備品属性で使用する 例: `Apple M3`
    - integer_value: integer(int32) - 整数の値。入力種別が integer の備品属性で使用する 例: `512`
    - date_value: string(date) - 日付の値(yyyy-mm-dd)。入力種別が date の備品属性で使用する 例: `2024-04-01`

### レスポンス

備品作成レスポンス
- id*: string(uuid) - 備品ID
- asset_number*: string - 資産管理番号
- name*: string - 備品名
- serial_number*: string - シリアル番号
- external_id*: string - 外部システムID
- last_scanned_at*: string(date-time) - 最終スキャン日時(ISO8601)
- asset_status*: object - ステータス
- asset_category*: object - 種別
- asset_location*: object - 現在の保管場所。未設定の場合は null
- current_member*: object - 現在の利用者
- asset_attribute_values*: array[object] - 備品属性の値のリスト
- created_at*: string(date-time) - 作成日時(ISO8601)
- updated_at*: string(date-time) - 更新日時(ISO8601)

## GET /hub/it_management/assets/{id} — 備品詳細取得（β版）

備品の詳細を取得します。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- company_id*: integer(int64) - 事業所ID
- id* (path): string(uuid) - 備品ID

### レスポンス

備品詳細取得レスポンス
- id*: string(uuid) - 備品ID
- asset_number*: string - 資産管理番号
- name*: string - 備品名
- serial_number*: string - シリアル番号
- external_id*: string - 外部システムID
- last_scanned_at*: string(date-time) - 最終スキャン日時(ISO8601)
- asset_status*: object - ステータス
- asset_category*: object - 種別
- asset_location*: object - 現在の保管場所。未設定の場合は null
- current_member*: object - 現在の利用者
- asset_attribute_values*: array[object] - 備品属性の値のリスト
- created_at*: string(date-time) - 作成日時(ISO8601)
- updated_at*: string(date-time) - 更新日時(ISO8601)

## PATCH /hub/it_management/assets/{id} — 備品部分更新（β版）

備品を部分的に更新します。 ##

注意点
- 指定されたパラメータのみが更新されます。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- id* (path): string(uuid) - 備品ID

### リクエストボディ*

- company_id*: integer(int64) - 事業所ID 例: `1`
- name: string - 備品名 例: `MacBook Pro 14inch`
- asset_number: string - 資産管理番号（チーム内一意） 例: `A-001`
- serial_number: string - シリアル番号（チーム内一意） 例: `C02X1234ABCD`
- external_id: string - 外部システムID（チーム内一意） 例: `EXT-001`
- asset_status_id: string(uuid) - ステータスID 例: `550e8400-e29b-41d4-a716-446655440001`
- asset_category_id: string(uuid) - 種別ID 例: `550e8400-e29b-41d4-a716-446655440002`
- asset_location_id: string(uuid) - 保管場所ID。null を指定すると保管場所の紐付けを解除します。省略した場合は現在の紐付けを維持します 例: `550e8400-e29b-41d4-a716-446655440004`
- asset_attribute_values: array[object] - 備品属性の値のリスト。指定した備品属性の値だけを更新し、指定しなかった備品属性の値は維持します。省略した場合は値を変更しません。asset_attribute_id には、備品の種別に紐づく備品属性を指定します。値が保存されていない必須の備品属性は含める必要があります
  配列の要素:
    - asset_attribute_id*: string(uuid) - 備品属性ID 例: `550e8400-e29b-41d4-a716-446655440005`
    - string_value: string - 文字列の値。入力種別が string / text / select の備品属性で使用する 例: `Apple M3`
    - integer_value: integer(int32) - 整数の値。入力種別が integer の備品属性で使用する 例: `512`
    - date_value: string(date) - 日付の値(yyyy-mm-dd)。入力種別が date の備品属性で使用する 例: `2024-04-01`

### レスポンス

備品部分更新レスポンス
- id*: string(uuid) - 備品ID
- asset_number*: string - 資産管理番号
- name*: string - 備品名
- serial_number*: string - シリアル番号
- external_id*: string - 外部システムID
- last_scanned_at*: string(date-time) - 最終スキャン日時(ISO8601)
- asset_status*: object - ステータス
- asset_category*: object - 種別
- asset_location*: object - 現在の保管場所。未設定の場合は null
- current_member*: object - 現在の利用者
- asset_attribute_values*: array[object] - 備品属性の値のリスト
- created_at*: string(date-time) - 作成日時(ISO8601)
- updated_at*: string(date-time) - 更新日時(ISO8601)

## DELETE /hub/it_management/assets/{id} — 備品削除（β版）

備品を削除します。

### パラメータ

GET /hub/it_management/assets/{id} と同じ

### レスポンス

備品削除レスポンス

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

- company_id*: integer(int64) - 事業所ID 例: `1`
- name: string - カスタムアプリマスタ名 例: `社内システム`

### レスポンス

カスタムアプリマスタ部分更新レスポンス
- id*: string(uuid) - カスタムアプリマスタID
- name*: string - カスタムアプリマスタ名
- created_at*: string(date-time) - 作成日時(ISO8601)
- updated_at*: string(date-time) - 更新日時(ISO8601)

# it_management_departments

departments

## GET /hub/it_management/departments — 部署一覧取得（β版）

部署の一覧をカーソルページネーションで取得します。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- company_id*: integer(int64) - 事業所ID
- page_token: string - ページネーションのトークン
- page_size: integer(int32) - 1ページあたりの取得件数（デフォルト25、最大100）
- keyword: string - キーワード検索（部署名に部分一致）
- code: string - 部署コードでフィルター（完全一致）

### レスポンス

部署一覧取得レスポンス
- data*: array[object] - 部署のリスト
- next_page_token*: string - 次のページを取得するためのカーソルトークン。次ページがない場合はnull

## POST /hub/it_management/departments — 部署作成（β版）

部署を作成します。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)

### リクエストボディ*

- company_id*: integer(int64) - 事業所ID 例: `1`
- name*: string - 部署名 例: `開発部`
- code: string - 部署コード 例: `DEV`
- product_company_id: string(uuid) - 所属会社 (IT管理の会社) の ID。会社一覧取得 (GET /hub/it_management/product_companies) で取得できます。省略すると既定の会社 (default = true) に作成します。親部署を指定する場合は、親部署と同じ会社を指定してください。存在しない ID を指定すると 422 になります (エラーの invalid_fields では company_id と表示されます) 例: `550e8400-e29b-41d4-a716-446655440002`
- parent_id: string(uuid) - 親部署ID 例: `550e8400-e29b-41d4-a716-446655440001`
- manager_ids: array[string] - マネージャーのメンバーID (最大 1 名) 例: `["550e8400-e29b-41d4-a716-446655440003"]`

### レスポンス

部署作成レスポンス
- id*: string(uuid) - 部署ID
- name*: string - 部署名
- code*: string - 部署コード
- parent*: object - 親部署
- product_company*: object - 所属会社 (IT管理の会社)
- managers*: array[object] - マネージャー一覧
- created_at*: string(date-time) - 作成日時(ISO8601)
- updated_at*: string(date-time) - 更新日時(ISO8601)

## GET /hub/it_management/departments/{id} — 部署詳細取得（β版）

部署の詳細を取得します。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- company_id*: integer(int64) - 事業所ID
- id* (path): string(uuid) - 部署ID

### レスポンス

部署詳細取得レスポンス
- id*: string(uuid) - 部署ID
- name*: string - 部署名
- code*: string - 部署コード
- parent*: object - 親部署
- product_company*: object - 所属会社 (IT管理の会社)
- managers*: array[object] - マネージャー一覧
- created_at*: string(date-time) - 作成日時(ISO8601)
- updated_at*: string(date-time) - 更新日時(ISO8601)

## PATCH /hub/it_management/departments/{id} — 部署部分更新（β版）

部署を部分的に更新します。 ##

注意点
- 指定されたパラメーターのみが更新されます。 - 所属会社 (product_company) は変更できません。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- id* (path): string(uuid) - 部署ID

### リクエストボディ*

- company_id*: integer(int64) - 事業所ID 例: `1`
- name: string - 部署名 例: `開発部`
- code: string - 部署コード 例: `DEV`
- parent_id: string(uuid) - 親部署ID 例: `550e8400-e29b-41d4-a716-446655440001`
- manager_ids: array[string] - マネージャーのメンバーID (最大 1 名) 例: `["550e8400-e29b-41d4-a716-446655440003"]`

### レスポンス

部署部分更新レスポンス
- id*: string(uuid) - 部署ID
- name*: string - 部署名
- code*: string - 部署コード
- parent*: object - 親部署
- product_company*: object - 所属会社 (IT管理の会社)
- managers*: array[object] - マネージャー一覧
- created_at*: string(date-time) - 作成日時(ISO8601)
- updated_at*: string(date-time) - 更新日時(ISO8601)

## DELETE /hub/it_management/departments/{id} — 部署削除（β版）

部署を削除します。子部署が存在する、または利用中の場合は削除できません。

### パラメータ

GET /hub/it_management/departments/{id} と同じ

### レスポンス

部署削除レスポンス

# it_management_employment_types

employment_types

## GET /hub/it_management/employment_types — 雇用形態一覧取得（β版）

雇用形態の一覧をカーソルページネーションで取得します。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- company_id*: integer(int64) - 事業所ID
- page_token: string - ページネーションのトークン
- page_size: integer(int32) - 1ページあたりの取得件数（デフォルト25、最大100）

### レスポンス

雇用形態一覧取得レスポンス
- data*: array[object] - 雇用形態のリスト
- next_page_token*: string - 次のページを取得するためのカーソルトークン。次ページがない場合はnull

## POST /hub/it_management/employment_types — 雇用形態作成（β版）

雇用形態を作成します。 ##

注意点
- 雇用形態名と外部コードは、ほかの雇用形態と重複できません。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)

### リクエストボディ*

- company_id*: integer(int64) - 事業所ID 例: `1`
- name*: string - 雇用形態名 例: `正社員`
- code: string - 外部コード 例: `FT-001`

### レスポンス

雇用形態作成レスポンス
- id*: string(uuid) - 雇用形態ID
- name*: string - 雇用形態名
- code*: string - 外部コード
- preset_kind*: string - プリセット雇用形態の識別子。ユーザー作成の雇用形態は null

  - board_member: 役員
  - full_timer: 正社員
  - contract_worker: 契約社員
  - permatemp: 派遣社員
  - part_timer: アルバイト・パート
  - outsourcing_contractor: 業務委託

## GET /hub/it_management/employment_types/{id} — 雇用形態詳細取得（β版）

雇用形態の詳細を取得します。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- company_id*: integer(int64) - 事業所ID
- id* (path): string(uuid) - 雇用形態ID

### レスポンス

雇用形態詳細取得レスポンス
- id*: string(uuid) - 雇用形態ID
- name*: string - 雇用形態名
- code*: string - 外部コード
- preset_kind*: string - プリセット雇用形態の識別子。ユーザー作成の雇用形態は null

  - board_member: 役員
  - full_timer: 正社員
  - contract_worker: 契約社員
  - permatemp: 派遣社員
  - part_timer: アルバイト・パート
  - outsourcing_contractor: 業務委託

## PATCH /hub/it_management/employment_types/{id} — 雇用形態部分更新（β版）

雇用形態を部分的に更新します。 ##

注意点
- 指定されたパラメーターのみが更新されます。 - 雇用形態名と外部コードは、ほかの雇用形態と重複できません。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- id* (path): string(uuid) - 雇用形態ID

### リクエストボディ*

- company_id*: integer(int64) - 事業所ID 例: `1`
- name: string - 雇用形態名 例: `正社員`
- code: string - 外部コード 例: `FT-001`

### レスポンス

雇用形態部分更新レスポンス
- id*: string(uuid) - 雇用形態ID
- name*: string - 雇用形態名
- code*: string - 外部コード
- preset_kind*: string - プリセット雇用形態の識別子。ユーザー作成の雇用形態は null

  - board_member: 役員
  - full_timer: 正社員
  - contract_worker: 契約社員
  - permatemp: 派遣社員
  - part_timer: アルバイト・パート
  - outsourcing_contractor: 業務委託

## DELETE /hub/it_management/employment_types/{id} — 雇用形態削除（β版）

雇用形態を削除します。 ##

注意点
- プリセットの雇用形態 (preset_kind が null でないもの) は削除できません。 - グループのルールやメンバーフィルターの条件で使われている雇用形態は削除できません。 - 削除した雇用形態が設定されていたメンバーは、雇用形態が未設定になります。

### パラメータ

GET /hub/it_management/employment_types/{id} と同じ

### レスポンス

雇用形態削除レスポンス

# it_management_guests

guests

## GET /hub/it_management/guests — ゲスト一覧取得（β版）

ゲスト (freee 従業員ではない外部ユーザー) の一覧をカーソルページネーションで取得します。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- company_id*: integer(int64) - 事業所ID
- keyword: string - 名前 / メールアドレスの部分一致検索キーワード
- page_token: string - ページネーションのトークン
- page_size: integer(int32) - 1ページあたりの取得件数（デフォルト25、最大100）

### レスポンス

ゲスト一覧取得レスポンス
- data*: array[object] - ゲストのリスト
- next_page_token*: string - 次のページを取得するためのカーソルトークン。次ページがない場合はnull

## POST /hub/it_management/guests — ゲスト作成（β版）

ゲストを作成します。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)

### リクエストボディ*

- company_id*: integer(int64) - 事業所ID 例: `1`
- family_name*: string - 姓 例: `山田`
- given_name*: string - 名 例: `太郎`
- emails*: array[string] - メールアドレス (1 個以上) 例: `["yamada@example.com"]`

### レスポンス

ゲスト作成レスポンス
- id*: string(uuid) - ゲストID
- display_name*: string - 表示名
- family_name*: string - 姓
- given_name*: string - 名
- emails*: array[string] - メールアドレス (複数可)
- created_at*: string(date-time) - 作成日時(ISO8601)
- updated_at*: string(date-time) - 更新日時(ISO8601)

## GET /hub/it_management/guests/{id} — ゲスト詳細取得（β版）

ゲストの詳細を取得します。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- company_id*: integer(int64) - 事業所ID
- id* (path): string(uuid) - ゲストID

### レスポンス

ゲスト詳細取得レスポンス
- id*: string(uuid) - ゲストID
- display_name*: string - 表示名
- family_name*: string - 姓
- given_name*: string - 名
- emails*: array[string] - メールアドレス (複数可)
- created_at*: string(date-time) - 作成日時(ISO8601)
- updated_at*: string(date-time) - 更新日時(ISO8601)

## PATCH /hub/it_management/guests/{id} — ゲスト部分更新（β版）

ゲストを部分的に更新します。 ##

注意点
- 指定されたパラメーターのみが更新されます。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- id* (path): string(uuid) - ゲストID

### リクエストボディ*

- company_id*: integer(int64) - 事業所ID 例: `1`
- family_name: string - 姓 例: `山田`
- given_name: string - 名 例: `太郎`
- emails: array[string] - メールアドレス (1 個以上) 例: `["yamada@example.com"]`

### レスポンス

ゲスト部分更新レスポンス
- id*: string(uuid) - ゲストID
- display_name*: string - 表示名
- family_name*: string - 姓
- given_name*: string - 名
- emails*: array[string] - メールアドレス (複数可)
- created_at*: string(date-time) - 作成日時(ISO8601)
- updated_at*: string(date-time) - 更新日時(ISO8601)

## DELETE /hub/it_management/guests/{id} — ゲスト削除（β版）

ゲストを削除します。

### パラメータ

GET /hub/it_management/guests/{id} と同じ

### レスポンス

ゲスト削除レスポンス

# it_management_members

members

## GET /hub/it_management/members — メンバー一覧取得（β版）

メンバーの一覧をカーソルページネーションで取得します。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- company_id*: integer(int64) - 事業所ID
- page_token: string - ページネーションのトークン
- page_size: integer(int32) - 1ページあたりの取得件数（デフォルト25、最大100）
- keyword: string - キーワード検索（name, email, code に部分一致）
- status: string - 在籍ステータス (選択肢: employed, retired, in_leaving, pre_employment)
- department_id: string(uuid) - 部署IDでフィルタ
- employment_type_id: string(uuid) - 雇用形態IDでフィルタ
- entered_since: string(date) - 入社日の範囲検索の開始日(yyyy-mm-dd、指定日を含む以降)
- entered_until: string(date) - 入社日の範囲検索の終了日(yyyy-mm-dd、指定日を含む以前)
- resigned_since: string(date) - 退職日の範囲検索の開始日(yyyy-mm-dd、指定日を含む以降)
- resigned_until: string(date) - 退職日の範囲検索の終了日(yyyy-mm-dd、指定日を含む以前)

### レスポンス

メンバー一覧取得レスポンス
- data*: array[object] - メンバーのリスト
- next_page_token*: string - 次のページを取得するためのカーソルトークン。次ページがない場合はnull

## POST /hub/it_management/members — メンバー作成（β版）

メンバーを作成します。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)

### リクエストボディ*

- company_id*: integer(int64) - 事業所ID 例: `1`
- email*: string - メールアドレス 例: `yamada.taro@example.com`
- family_name*: string - 姓 例: `山田`
- given_name*: string - 名 例: `太郎`
- family_name_yomi: string - 姓（ヨミ） 例: `ヤマダ`
- given_name_yomi: string - 名（ヨミ） 例: `タロウ`
- family_name_romaji: string - 姓（ローマ字） 例: `Yamada`
- given_name_romaji: string - 名（ローマ字） 例: `Taro`
- code: string - 社員番号（チーム内一意） 例: `EMP-001`
- status: string - 在籍ステータス（デフォルト: employed） (選択肢: employed, retired, in_leaving, pre_employment)
- entered_at: string(date) - 入社日(yyyy-mm-dd) 例: `2020-04-01`
- position_id: string(uuid) - 役職 (IT管理の役職) の ID。役職一覧取得 (GET /hub/it_management/positions) で取得できます 例: `550e8400-e29b-41d4-a716-446655440001`
- employment_type_id: string(uuid) - 雇用形態ID 例: `550e8400-e29b-41d4-a716-446655440002`
- department_ids: array[string] - 所属部署IDの配列 例: `["550e8400-e29b-41d4-a716-446655440003"]`

### レスポンス

メンバー作成レスポンス
- id*: string(uuid) - メンバーID
- email*: string - メールアドレス
- login_email*: string - freeeアカウントメールアドレス
- display_name*: string - 表示名
- family_name*: string - 姓
- given_name*: string - 名
- family_name_yomi*: string - 姓（ヨミ）
- given_name_yomi*: string - 名（ヨミ）
- family_name_romaji*: string - 姓（ローマ字）
- given_name_romaji*: string - 名（ローマ字）
- code*: string - 社員番号
- status*: string - 在籍ステータス
- entered_at*: string(date) - 入社日(yyyy-mm-dd)
- resigned_at*: string(date) - 離職日(yyyy-mm-dd)
- position*: object - 役職 (IT管理の役職)
- employment_type*: object - 雇用形態
- departments*: array[object] - 所属部署一覧
- created_at*: string(date-time) - 作成日時(ISO8601)
- updated_at*: string(date-time) - 更新日時(ISO8601)

## GET /hub/it_management/members/{id} — メンバー詳細取得（β版）

メンバーの詳細を取得します。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- company_id*: integer(int64) - 事業所ID
- id* (path): string(uuid) - メンバーID

### レスポンス

メンバー詳細取得レスポンス
- id*: string(uuid) - メンバーID
- email*: string - メールアドレス
- login_email*: string - freeeアカウントメールアドレス
- display_name*: string - 表示名
- family_name*: string - 姓
- given_name*: string - 名
- family_name_yomi*: string - 姓（ヨミ）
- given_name_yomi*: string - 名（ヨミ）
- family_name_romaji*: string - 姓（ローマ字）
- given_name_romaji*: string - 名（ローマ字）
- code*: string - 社員番号
- status*: string - 在籍ステータス
- entered_at*: string(date) - 入社日(yyyy-mm-dd)
- resigned_at*: string(date) - 離職日(yyyy-mm-dd)
- position*: object - 役職 (IT管理の役職)
- employment_type*: object - 雇用形態
- departments*: array[object] - 所属部署一覧
- created_at*: string(date-time) - 作成日時(ISO8601)
- updated_at*: string(date-time) - 更新日時(ISO8601)

## PATCH /hub/it_management/members/{id} — メンバー部分更新（β版）

メンバーを部分的に更新します。 ##

注意点
- 指定されたパラメータのみが更新されます。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- id* (path): string(uuid) - メンバーID

### リクエストボディ*

- company_id*: integer(int64) - 事業所ID 例: `1`
- family_name: string - 姓 例: `山田`
- given_name: string - 名 例: `太郎`
- family_name_yomi: string - 姓（ヨミ） 例: `ヤマダ`
- given_name_yomi: string - 名（ヨミ） 例: `タロウ`
- family_name_romaji: string - 姓（ローマ字） 例: `Yamada`
- given_name_romaji: string - 名（ローマ字） 例: `Taro`
- code: string - 社員番号（チーム内一意） 例: `EMP-001`
- status: string - 在籍ステータス (選択肢: employed, retired, in_leaving, pre_employment)
- entered_at: string(date) - 入社日(yyyy-mm-dd) 例: `2020-04-01`
- resigned_at: string(date) - 離職日(yyyy-mm-dd) 例: `2024-03-31`
- position_id: string(uuid) - 役職 (IT管理の役職) の ID。役職一覧取得 (GET /hub/it_management/positions) で取得できます 例: `550e8400-e29b-41d4-a716-446655440001`
- employment_type_id: string(uuid) - 雇用形態ID 例: `550e8400-e29b-41d4-a716-446655440002`
- department_ids: array[string] - 所属部署IDの配列 例: `["550e8400-e29b-41d4-a716-446655440003"]`

### レスポンス

メンバー部分更新レスポンス
- id*: string(uuid) - メンバーID
- email*: string - メールアドレス
- login_email*: string - freeeアカウントメールアドレス
- display_name*: string - 表示名
- family_name*: string - 姓
- given_name*: string - 名
- family_name_yomi*: string - 姓（ヨミ）
- given_name_yomi*: string - 名（ヨミ）
- family_name_romaji*: string - 姓（ローマ字）
- given_name_romaji*: string - 名（ローマ字）
- code*: string - 社員番号
- status*: string - 在籍ステータス
- entered_at*: string(date) - 入社日(yyyy-mm-dd)
- resigned_at*: string(date) - 離職日(yyyy-mm-dd)
- position*: object - 役職 (IT管理の役職)
- employment_type*: object - 雇用形態
- departments*: array[object] - 所属部署一覧
- created_at*: string(date-time) - 作成日時(ISO8601)
- updated_at*: string(date-time) - 更新日時(ISO8601)

## DELETE /hub/it_management/members/{id} — メンバー削除（β版）

メンバーを削除します（ソフトデリート）。

### パラメータ

GET /hub/it_management/members/{id} と同じ

### レスポンス

メンバー削除レスポンス

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

- company_id*: integer(int64) - 事業所ID 例: `1`
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

# it_management_product_companies

product_companies

## GET /hub/it_management/product_companies — 会社一覧取得（β版）

IT管理 内で管理している会社の一覧をカーソルページネーションで取得します。 アプリの所属先や、テナント内の複数の会社を分けて管理するために利用します。 ##

注意点
- この API の「会社」は、IT管理で管理している会社を指します。freee の事業所 (`company_id`) とは別のものです。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- company_id*: integer(int64) - 事業所ID
- page_token: string - ページネーションのトークン
- page_size: integer(int32) - 1ページあたりの取得件数（デフォルト25、最大100）

### レスポンス

会社一覧取得レスポンス
- data*: array[object] - 会社のリスト
- next_page_token*: string - 次のページを取得するためのカーソルトークン。次ページがない場合はnull

## POST /hub/it_management/product_companies — 会社作成（β版）

会社を作成します。 ##

注意点
- この API の「会社」は、IT管理で管理している会社を指します。freee の事業所 (`company_id`) とは別のものです。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)

### リクエストボディ*

- company_id*: integer(int64) - 事業所ID 例: `1`
- name*: string - 会社名 例: `株式会社サンプル`

### レスポンス

会社作成レスポンス
- id*: string(uuid) - IT管理の会社の ID (freee の事業所 ID とは別)
- name*: string - 会社名
- default*: boolean - 既定会社かどうか (テナント内で 1 社のみ true)

## GET /hub/it_management/product_companies/{id} — 会社詳細取得（β版）

会社の詳細を取得します。 ##

注意点
- この API の「会社」は、IT管理で管理している会社を指します。freee の事業所 (`company_id`) とは別のものです。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- company_id*: integer(int64) - 事業所ID
- id* (path): string(uuid) - IT管理の会社の ID (freee の事業所 ID とは別)

### レスポンス

会社詳細取得レスポンス
- id*: string(uuid) - IT管理の会社の ID (freee の事業所 ID とは別)
- name*: string - 会社名
- default*: boolean - 既定会社かどうか (テナント内で 1 社のみ true)

## PATCH /hub/it_management/product_companies/{id} — 会社部分更新（β版）

会社を部分的に更新します。 ##

注意点
- この API の「会社」は、IT管理で管理している会社を指します。freee の事業所 (`company_id`) とは別のものです。 - 指定されたパラメーターのみが更新されます。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- id* (path): string(uuid) - IT管理の会社の ID (freee の事業所 ID とは別)

### リクエストボディ*

- company_id*: integer(int64) - 事業所ID 例: `1`
- name: string - 会社名 例: `株式会社サンプル`

### レスポンス

会社部分更新レスポンス
- id*: string(uuid) - IT管理の会社の ID (freee の事業所 ID とは別)
- name*: string - 会社名
- default*: boolean - 既定会社かどうか (テナント内で 1 社のみ true)

## DELETE /hub/it_management/product_companies/{id} — 会社削除（β版）

会社を削除します。既定会社 (default = true) は削除できません。会社に紐づくアプリ・部署が残っている場合や、メンバーフィルターの条件で使われている場合も削除できません。 ##

注意点
- この API の「会社」は、IT管理で管理している会社を指します。freee の事業所 (`company_id`) とは別のものです。

### パラメータ

GET /hub/it_management/product_companies/{id} と同じ

### レスポンス

会社削除レスポンス

# it_management_system_account_owners

system_account_owners

## GET /hub/it_management/system_account_owners — システムアカウント一覧取得（β版）

システムアカウント (人ではないサービス / bot / 共有アカウント等の所有者情報) の一覧をカーソルページネーションで取得します。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- company_id*: integer(int64) - 事業所ID
- keyword: string - 名前 / メールアドレスの部分一致検索キーワード。空白で区切って複数指定した場合は、すべてに一致するものを返します
- page_token: string - ページネーションのトークン
- page_size: integer(int32) - 1ページあたりの取得件数（デフォルト25、最大100）

### レスポンス

システムアカウント一覧取得レスポンス
- data*: array[object] - システムアカウントのリスト
- next_page_token*: string - 次のページを取得するためのカーソルトークン。次ページがない場合はnull

## POST /hub/it_management/system_account_owners — システムアカウント作成（β版）

システムアカウントを作成します。 ##

注意点
- 同じ事業所の他のメンバー・ゲスト・システムアカウントで使用中のメールアドレスは登録できません。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)

### リクエストボディ*

- company_id*: integer(int64) - 事業所ID 例: `1`
- name*: string - システムアカウント名 例: `prod-monitoring-bot`
- emails*: array[string] - メールアドレス (1 個以上) 例: `["prod-monitoring-bot@example.com"]`

### レスポンス

システムアカウント作成レスポンス
- id*: string(uuid) - システムアカウントID
- name*: string - システムアカウント名
- emails*: array[string] - メールアドレス (複数可)
- created_at*: string(date-time) - 作成日時(ISO8601)
- updated_at*: string(date-time) - 更新日時(ISO8601)

## GET /hub/it_management/system_account_owners/{id} — システムアカウント詳細取得（β版）

システムアカウントの詳細を取得します。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- company_id*: integer(int64) - 事業所ID
- id* (path): string(uuid) - システムアカウントID

### レスポンス

システムアカウント詳細取得レスポンス
- id*: string(uuid) - システムアカウントID
- name*: string - システムアカウント名
- emails*: array[string] - メールアドレス (複数可)
- created_at*: string(date-time) - 作成日時(ISO8601)
- updated_at*: string(date-time) - 更新日時(ISO8601)

## PATCH /hub/it_management/system_account_owners/{id} — システムアカウント部分更新（β版）

システムアカウントを部分的に更新します。 ##

注意点
- 指定されたパラメーターのみが更新されます。 - emails を指定した場合は指定した内容で置き換えられ、含まれない既存のメールアドレスは削除されます。 - 同じ事業所の他のメンバー・ゲスト・システムアカウントで使用中のメールアドレスは登録できません。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- id* (path): string(uuid) - システムアカウントID

### リクエストボディ*

- company_id*: integer(int64) - 事業所ID 例: `1`
- name: string - システムアカウント名 例: `prod-monitoring-bot`
- emails: array[string] - メールアドレス (1 個以上) 例: `["prod-monitoring-bot@example.com"]`

### レスポンス

システムアカウント部分更新レスポンス
- id*: string(uuid) - システムアカウントID
- name*: string - システムアカウント名
- emails*: array[string] - メールアドレス (複数可)
- created_at*: string(date-time) - 作成日時(ISO8601)
- updated_at*: string(date-time) - 更新日時(ISO8601)

## DELETE /hub/it_management/system_account_owners/{id} — システムアカウント削除（β版）

システムアカウントを削除します。

### パラメータ

GET /hub/it_management/system_account_owners/{id} と同じ

### レスポンス

システムアカウント削除レスポンス
