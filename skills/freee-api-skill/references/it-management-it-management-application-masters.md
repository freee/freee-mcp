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
