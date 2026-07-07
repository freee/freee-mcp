# it_management_members

## 概要

members

## エンドポイント一覧

### GET /hub/it_management/members

操作: メンバー一覧取得（β版）

説明: メンバーの一覧をカーソルページネーションで取得します。

### パラメータ

| 名前 | 位置 | 必須 | 型 | 説明 |
|------|------|------|-----|------|
| freee-using-beta | header | はい | string | オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true) |
| company_id | query | はい | integer(int64) | 事業所ID |
| page_token | query | いいえ | string | ページネーションのトークン |
| page_size | query | いいえ | integer(int32) | 1ページあたりの取得件数（デフォルト25、最大100） |
| keyword | query | いいえ | string | キーワード検索（name, email, code に部分一致） |
| status | query | いいえ | object | 在籍ステータス |
| department_id | query | いいえ | string(uuid) | 部署IDでフィルタ |
| employment_type_id | query | いいえ | string(uuid) | 雇用形態IDでフィルタ |
| entered_since | query | いいえ | string(date) | 入社日の範囲検索の開始日(yyyy-mm-dd、指定日を含む以降) |
| entered_until | query | いいえ | string(date) | 入社日の範囲検索の終了日(yyyy-mm-dd、指定日を含む以前) |
| resigned_since | query | いいえ | string(date) | 退職日の範囲検索の開始日(yyyy-mm-dd、指定日を含む以降) |
| resigned_until | query | いいえ | string(date) | 退職日の範囲検索の終了日(yyyy-mm-dd、指定日を含む以前) |

### レスポンス (200)

メンバー一覧取得レスポンス

- data (必須): array[object] - メンバーのリスト
  配列の要素:
    - id (必須): string(uuid) - メンバーID 例: `550e8400-e29b-41d4-a716-446655440000`
    - email (必須): string - メールアドレス 例: `yamada.taro@example.com`
    - login_email (必須): string - freeeアカウントメールアドレス 例: `yamada.taro@example.com`
    - display_name (必須): string - 表示名 例: `山田 太郎`
    - family_name (必須): string - 姓 例: `山田`
    - given_name (必須): string - 名 例: `太郎`
    - family_name_yomi (必須): string - 姓（ヨミ） 例: `ヤマダ`
    - given_name_yomi (必須): string - 名（ヨミ） 例: `タロウ`
    - family_name_romaji (必須): string - 姓（ローマ字） 例: `Yamada`
    - given_name_romaji (必須): string - 名（ローマ字） 例: `Taro`
    - code (必須): string - 社員番号 例: `EMP-001`
    - status (必須): string - 在籍ステータス (選択肢: employed, retired, in_leaving, pre_employment)
    - entered_at (必須): string(date) - 入社日(yyyy-mm-dd) 例: `2020-04-01`
    - resigned_at (必須): string(date) - 離職日(yyyy-mm-dd) 例: `2024-03-31`
    - position (必須): object - 役職
    - employment_type (必須): object - 雇用形態
    - departments (必須): array[object] - 所属部署一覧
    - created_at (必須): string(date-time) - 作成日時(ISO8601) 例: `2020-04-01T00:00:00Z`
    - updated_at (必須): string(date-time) - 更新日時(ISO8601) 例: `2024-01-15T10:30:00Z`
- next_page_token (必須): string - 次のページを取得するためのカーソルトークン。次ページがない場合はnull 例: `eyJvcmRlciI6W10sImlkIjoiYWJjIn0`

### POST /hub/it_management/members

操作: メンバー作成（β版）

説明: メンバーを作成します。

### パラメータ

| 名前 | 位置 | 必須 | 型 | 説明 |
|------|------|------|-----|------|
| freee-using-beta | header | はい | string | オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true) |

### リクエストボディ

(必須)

- company_id (必須): integer(int64) - 事業所ID 例: `1`
- email (必須): string - メールアドレス 例: `yamada.taro@example.com`
- family_name (必須): string - 姓 例: `山田`
- given_name (必須): string - 名 例: `太郎`
- family_name_yomi (任意): string - 姓（ヨミ） 例: `ヤマダ`
- given_name_yomi (任意): string - 名（ヨミ） 例: `タロウ`
- family_name_romaji (任意): string - 姓（ローマ字） 例: `Yamada`
- given_name_romaji (任意): string - 名（ローマ字） 例: `Taro`
- code (任意): string - 社員番号（チーム内一意） 例: `EMP-001`
- status (任意): string - 在籍ステータス（デフォルト: employed） (選択肢: employed, retired, in_leaving, pre_employment)
- entered_at (任意): string(date) - 入社日(yyyy-mm-dd) 例: `2020-04-01`
- position_id (任意): string(uuid) - 役職ID 例: `550e8400-e29b-41d4-a716-446655440001`
- employment_type_id (任意): string(uuid) - 雇用形態ID 例: `550e8400-e29b-41d4-a716-446655440002`
- department_ids (任意): array[string] - 所属部署IDの配列 例: `["550e8400-e29b-41d4-a716-446655440003"]`

### レスポンス (201)

メンバー作成レスポンス

- id (必須): string(uuid) - メンバーID 例: `550e8400-e29b-41d4-a716-446655440000`
- email (必須): string - メールアドレス 例: `yamada.taro@example.com`
- login_email (必須): string - freeeアカウントメールアドレス 例: `yamada.taro@example.com`
- display_name (必須): string - 表示名 例: `山田 太郎`
- family_name (必須): string - 姓 例: `山田`
- given_name (必須): string - 名 例: `太郎`
- family_name_yomi (必須): string - 姓（ヨミ） 例: `ヤマダ`
- given_name_yomi (必須): string - 名（ヨミ） 例: `タロウ`
- family_name_romaji (必須): string - 姓（ローマ字） 例: `Yamada`
- given_name_romaji (必須): string - 名（ローマ字） 例: `Taro`
- code (必須): string - 社員番号 例: `EMP-001`
- status (必須): string - 在籍ステータス (選択肢: employed, retired, in_leaving, pre_employment)
- entered_at (必須): string(date) - 入社日(yyyy-mm-dd) 例: `2020-04-01`
- resigned_at (必須): string(date) - 離職日(yyyy-mm-dd) 例: `2024-03-31`
- position (必須): object - 役職
  - id (必須): string(uuid) - 役職ID 例: `550e8400-e29b-41d4-a716-446655440001`
  - name (必須): string - 役職名 例: `マネージャー`
- employment_type (必須): object - 雇用形態
  - id (必須): string(uuid) - 雇用形態ID 例: `550e8400-e29b-41d4-a716-446655440002`
  - name (必須): string - 雇用形態名 例: `正社員`
- departments (必須): array[object] - 所属部署一覧
  配列の要素:
    - id (必須): string(uuid) - 部署ID 例: `550e8400-e29b-41d4-a716-446655440003`
    - name (必須): string - 部署名 例: `開発部`
- created_at (必須): string(date-time) - 作成日時(ISO8601) 例: `2020-04-01T00:00:00Z`
- updated_at (必須): string(date-time) - 更新日時(ISO8601) 例: `2024-01-15T10:30:00Z`

### GET /hub/it_management/members/{id}

操作: メンバー詳細取得（β版）

説明: メンバーの詳細を取得します。

### パラメータ

| 名前 | 位置 | 必須 | 型 | 説明 |
|------|------|------|-----|------|
| freee-using-beta | header | はい | string | オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true) |
| company_id | query | はい | integer(int64) | 事業所ID |
| id | path | はい | string(uuid) | メンバーID |

### レスポンス (200)

メンバー詳細取得レスポンス

- id (必須): string(uuid) - メンバーID 例: `550e8400-e29b-41d4-a716-446655440000`
- email (必須): string - メールアドレス 例: `yamada.taro@example.com`
- login_email (必須): string - freeeアカウントメールアドレス 例: `yamada.taro@example.com`
- display_name (必須): string - 表示名 例: `山田 太郎`
- family_name (必須): string - 姓 例: `山田`
- given_name (必須): string - 名 例: `太郎`
- family_name_yomi (必須): string - 姓（ヨミ） 例: `ヤマダ`
- given_name_yomi (必須): string - 名（ヨミ） 例: `タロウ`
- family_name_romaji (必須): string - 姓（ローマ字） 例: `Yamada`
- given_name_romaji (必須): string - 名（ローマ字） 例: `Taro`
- code (必須): string - 社員番号 例: `EMP-001`
- status (必須): string - 在籍ステータス (選択肢: employed, retired, in_leaving, pre_employment)
- entered_at (必須): string(date) - 入社日(yyyy-mm-dd) 例: `2020-04-01`
- resigned_at (必須): string(date) - 離職日(yyyy-mm-dd) 例: `2024-03-31`
- position (必須): object - 役職
  - id (必須): string(uuid) - 役職ID 例: `550e8400-e29b-41d4-a716-446655440001`
  - name (必須): string - 役職名 例: `マネージャー`
- employment_type (必須): object - 雇用形態
  - id (必須): string(uuid) - 雇用形態ID 例: `550e8400-e29b-41d4-a716-446655440002`
  - name (必須): string - 雇用形態名 例: `正社員`
- departments (必須): array[object] - 所属部署一覧
  配列の要素:
    - id (必須): string(uuid) - 部署ID 例: `550e8400-e29b-41d4-a716-446655440003`
    - name (必須): string - 部署名 例: `開発部`
- created_at (必須): string(date-time) - 作成日時(ISO8601) 例: `2020-04-01T00:00:00Z`
- updated_at (必須): string(date-time) - 更新日時(ISO8601) 例: `2024-01-15T10:30:00Z`

### PATCH /hub/it_management/members/{id}

操作: メンバー部分更新（β版）

説明: メンバーを部分的に更新します。 ##

注意点
- 指定されたパラメータのみが更新されます。

### パラメータ

| 名前 | 位置 | 必須 | 型 | 説明 |
|------|------|------|-----|------|
| freee-using-beta | header | はい | string | オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true) |
| id | path | はい | string(uuid) | メンバーID |

### リクエストボディ

(必須)

- company_id (任意): integer(int64) - 事業所ID 例: `1`
- family_name (任意): string - 姓 例: `山田`
- given_name (任意): string - 名 例: `太郎`
- family_name_yomi (任意): string - 姓（ヨミ） 例: `ヤマダ`
- given_name_yomi (任意): string - 名（ヨミ） 例: `タロウ`
- family_name_romaji (任意): string - 姓（ローマ字） 例: `Yamada`
- given_name_romaji (任意): string - 名（ローマ字） 例: `Taro`
- code (任意): string - 社員番号（チーム内一意） 例: `EMP-001`
- status (任意): string - 在籍ステータス (選択肢: employed, retired, in_leaving, pre_employment)
- entered_at (任意): string(date) - 入社日(yyyy-mm-dd) 例: `2020-04-01`
- resigned_at (任意): string(date) - 離職日(yyyy-mm-dd) 例: `2024-03-31`
- position_id (任意): string(uuid) - 役職ID 例: `550e8400-e29b-41d4-a716-446655440001`
- employment_type_id (任意): string(uuid) - 雇用形態ID 例: `550e8400-e29b-41d4-a716-446655440002`
- department_ids (任意): array[string] - 所属部署IDの配列 例: `["550e8400-e29b-41d4-a716-446655440003"]`

### レスポンス (200)

メンバー部分更新レスポンス

- id (必須): string(uuid) - メンバーID 例: `550e8400-e29b-41d4-a716-446655440000`
- email (必須): string - メールアドレス 例: `yamada.taro@example.com`
- login_email (必須): string - freeeアカウントメールアドレス 例: `yamada.taro@example.com`
- display_name (必須): string - 表示名 例: `山田 太郎`
- family_name (必須): string - 姓 例: `山田`
- given_name (必須): string - 名 例: `太郎`
- family_name_yomi (必須): string - 姓（ヨミ） 例: `ヤマダ`
- given_name_yomi (必須): string - 名（ヨミ） 例: `タロウ`
- family_name_romaji (必須): string - 姓（ローマ字） 例: `Yamada`
- given_name_romaji (必須): string - 名（ローマ字） 例: `Taro`
- code (必須): string - 社員番号 例: `EMP-001`
- status (必須): string - 在籍ステータス (選択肢: employed, retired, in_leaving, pre_employment)
- entered_at (必須): string(date) - 入社日(yyyy-mm-dd) 例: `2020-04-01`
- resigned_at (必須): string(date) - 離職日(yyyy-mm-dd) 例: `2024-03-31`
- position (必須): object - 役職
  - id (必須): string(uuid) - 役職ID 例: `550e8400-e29b-41d4-a716-446655440001`
  - name (必須): string - 役職名 例: `マネージャー`
- employment_type (必須): object - 雇用形態
  - id (必須): string(uuid) - 雇用形態ID 例: `550e8400-e29b-41d4-a716-446655440002`
  - name (必須): string - 雇用形態名 例: `正社員`
- departments (必須): array[object] - 所属部署一覧
  配列の要素:
    - id (必須): string(uuid) - 部署ID 例: `550e8400-e29b-41d4-a716-446655440003`
    - name (必須): string - 部署名 例: `開発部`
- created_at (必須): string(date-time) - 作成日時(ISO8601) 例: `2020-04-01T00:00:00Z`
- updated_at (必須): string(date-time) - 更新日時(ISO8601) 例: `2024-01-15T10:30:00Z`

### DELETE /hub/it_management/members/{id}

操作: メンバー削除（β版）

説明: メンバーを削除します（ソフトデリート）。

### パラメータ

| 名前 | 位置 | 必須 | 型 | 説明 |
|------|------|------|-----|------|
| freee-using-beta | header | はい | string | オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true) |
| company_id | query | はい | integer(int64) | 事業所ID |
| id | path | はい | string(uuid) | メンバーID |

### レスポンス (204)

メンバー削除レスポンス



## 参考情報

- freee API公式ドキュメント: https://developer.freee.co.jp/docs
