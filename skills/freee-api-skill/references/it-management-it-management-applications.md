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
- company*: object - 所属会社。作成時に既定の会社が割り当てられる。アーカイブ済みのアプリでは null
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

- company_id: integer(int64) - 事業所ID 例: `1`
- it_management_company_id: string(uuid) - 所属会社 (IT管理の会社) の ID。指定すると、アプリの所属会社を変更します。存在しない ID を指定すると 422 になります (エラーの invalid_fields では company_id と表示されます) 例: `550e8400-e29b-41d4-a716-446655440001`
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
- company*: object - 所属会社。作成時に既定の会社が割り当てられる。アーカイブ済みのアプリでは null
- created_at*: string(date-time) - 作成日時(ISO8601)
- updated_at*: string(date-time) - 更新日時(ISO8601)
