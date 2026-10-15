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

- company_id: integer(int64) - 事業所ID 例: `1`
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
