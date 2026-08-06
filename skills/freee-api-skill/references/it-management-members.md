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
- status: object - 在籍ステータス
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
- position_id: string(uuid) - 役職ID 例: `550e8400-e29b-41d4-a716-446655440001`
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
- position*: object - 役職
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
- position*: object - 役職
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

- company_id: integer(int64) - 事業所ID 例: `1`
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
- position_id: string(uuid) - 役職ID 例: `550e8400-e29b-41d4-a716-446655440001`
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
- position*: object - 役職
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
