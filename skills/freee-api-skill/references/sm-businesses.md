# businesses

案件

## GET /businesses — 案件一覧

概要 案件の一覧を取得します。 登録されている案件情報を一覧形式で取得できます。 各種フィルタ条件を指定することで、特定の条件に合致する案件のみを取得することが可能です。

定義
start_business_date : 案件登録日(絞り込み開始) end_business_date : 案件登録日(絞り込み終了) start_last_updated_date : 案件更新日(絞り込み開始) end_last_updated_date : 案件更新日(絞り込み終了) sales_progression_ids : 受注確度ID(複数指定可) business_phase_ids : 案件フェーズID(複数指定可) charge_employee_ids : 社内担当者の従業員ID(複数指定可) customer_ids : 顧客の取引先ID(複数指定可) code : 案件コード canceled : 取消状態(デフォルト:false) `limit`と`offset`パラメータを使用してページネーションが可能です。 デフォルトでは20件ずつ取得され、最大100件まで一度に取得できま...

### パラメータ

- company_id*: integer(int64) - 事業所ID
- start_business_date: string(date) - 案件登録日で絞込：開始日(yyyy-mm-dd)
- end_business_date: string(date) - 案件登録日で絞込：終了日(yyyy-mm-dd)
- start_last_updated_date: string(date) - 案件更新日で絞込：開始日(yyyy-mm-dd)
- end_last_updated_date: string(date) - 案件更新日で絞込：終了日(yyyy-mm-dd)
- sales_progression_ids[]: array[string] - 受注確度ID
- business_phase_ids[]: array[string] - 案件フェーズID
- charge_employee_ids[]: array[integer] - 社内担当者の従業員ID
- customer_ids[]: array[integer] - 顧客の取引先ID
- code: string - 案件コードで絞込
- canceled: boolean - 取消状態
- limit: integer(int32) - 取得レコードの件数（デフォルト：20, 最小：1, 最大：100）
- offset: integer(int32) - 取得レコードのオフセット（デフォルト：0）

## POST /businesses — 案件登録

概要 新しい案件を登録します。 顧客との商談や受注案件を管理するための案件情報を登録できます。

定義
必須項目 name : 案件名称 company_id : 事業所ID 任意項目 code : 案件コード business_date : 案件登録日 charge_employee_id : 社内担当者の従業員ID customer_id : 顧客の取引先ID prospect_sales_order : 受注見込 sales_progression_id : 受注確度ID scheduled_completion_date : 完了予定日 completion_date : 完了日 business_phase_id : 案件フェーズID reporting_section_id : 担当部門ID internal_memo : 社内メモ common_business_id : 案件マスタID custom_fields : カスタム項目

### リクエストボディ

- company_id*: integer(int64) - 事業所ID 例: `1` (最小: 1, 最大: 9223372036854776000)
- name*: string - 案件名称 例: `サンプル案件`
- code: string - 案件コード（null・空文字での送信不可。POSTの自動採番ON時およびPATCHのキー省略時は省略可能） 例: `B-0000000001`
- business_date: string(date) - 案件登録日 例: `2025-04-01`
- charge_employee_id: integer(int64) - 社内担当者の従業員ID 例: `101` (最小: 0, 最大: 9223372036854776000)
- customer_id: integer(int64) - 顧客の取引先ID 例: `1001` (最小: 1, 最大: 9223372036854776000)
- prospect_sales_order: integer(int64) - 受注見込 例: `6000000` (最大: 9223372036854776000)
- sales_progression_id: string - 受注確度ID 例: `01JPP4FD1CVQWCDSWA90VE1ZTM`
- scheduled_completion_date: string(date) - 完了予定日 例: `2025-06-30`
- completion_date: string(date) - 完了日 例: `2025-06-15`
- business_phase_id: string - 案件フェーズID 例: `01JPP4FD1CVQWCDSWA90VE1ZTM`
- reporting_section_id: integer(int64) - 担当部門ID

  ※ 親部門のIDは指定できません 例: `67890` (最小: 1, 最大: 9223372036854776000)
- internal_memo: string - 社内メモ 例: `重要案件のため優先対応`
- common_business_id: string - 紐付ける案件マスタID（ULID形式）。案件登録時のみ指定可能で、案件更新では紐付けの変更はできません（紐付け済みの案件に対して既存と異なる値を指定した場合はエラー） 例: `01JPP4FD1CVQWCDSWA90VE1ZTM`
- custom_fields: array[object] - カスタム項目 例: `[{"definition_id":"01JPP4FD1CVQWCDSWA90VE1ZTM","value":"PJ-123456"},{"definition_id":"01JPP4FD1CVQWCDSWA90VE1ZTN","value":234}]`
  配列の要素:
    - definition_id*: string - カスタム項目ID 例: `01JPP4FD1CVQWCDSWA90VE1ZTM`
    - value*: object - カスタム項目の値 例: `サンプル値`

## GET /businesses/{id} — 案件詳細取得

概要 指定されたIDの案件の詳細情報を取得します。 案件の基本情報に加えて、粗利や売上情報などの詳細な集計情報も取得できます。

### パラメータ

- company_id*: integer(int64) - 事業所ID
- id* (path): string - 案件ID

## PATCH /businesses/{id} — 案件更新

概要 指定されたIDの案件を更新します。 案件の基本情報、受注見込、完了予定日などを部分的に更新できます。 送信したフィールドのみが更新され、送信しなかったフィールドは変更されません。

定義
更新可能項目 name : 案件名称 code : 案件コード business_date : 案件登録日 charge_employee_id : 社内担当者の従業員ID customer_id : 顧客の取引先ID prospect_sales_order : 受注見込 sales_progression_id : 受注確度ID scheduled_completion_date : 完了予定日 completion_date : 完了日 business_phase_id : 案件フェーズID reporting_section_id : 担当部門ID internal_memo : 社内メモ custom_fields : カスタム項目(指定した場合、既存のカスタム項目は全て削除され、新しいカスタム項目に置き換えられます) ※全ての項目は任意です。更新したい項目のみを送信してください。 ※...

### パラメータ

- id* (path): string - 案件ID

### リクエストボディ

- company_id*: integer(int64) - 事業所ID 例: `1` (最小: 1, 最大: 9223372036854776000)
- name: string - 案件名称 例: `サンプル案件`
- code: string - 案件コード（null・空文字での送信不可。POSTの自動採番ON時およびPATCHのキー省略時は省略可能） 例: `B-0000000001`
- business_date: string(date) - 案件登録日 例: `2025-04-01`
- charge_employee_id: integer(int64) - 社内担当者の従業員ID 例: `101` (最小: 0, 最大: 9223372036854776000)
- customer_id: integer(int64) - 顧客の取引先ID 例: `1001` (最小: 1, 最大: 9223372036854776000)
- prospect_sales_order: integer(int64) - 受注見込 例: `6000000` (最大: 9223372036854776000)
- sales_progression_id: string - 受注確度ID 例: `01JPP4FD1CVQWCDSWA90VE1ZTM`
- scheduled_completion_date: string(date) - 完了予定日 例: `2025-06-30`
- completion_date: string(date) - 完了日 例: `2025-06-15`
- business_phase_id: string - 案件フェーズID 例: `01JPP4FD1CVQWCDSWA90VE1ZTM`
- reporting_section_id: integer(int64) - 担当部門ID

  ※ 親部門のIDは指定できません 例: `67890` (最小: 1, 最大: 9223372036854776000)
- internal_memo: string - 社内メモ 例: `重要案件のため優先対応`
- common_business_id: string - 紐付ける案件マスタID（ULID形式）。案件登録時のみ指定可能で、案件更新では紐付けの変更はできません（紐付け済みの案件に対して既存と異なる値を指定した場合はエラー） 例: `01JPP4FD1CVQWCDSWA90VE1ZTM`
- custom_fields: array[object] - カスタム項目 例: `[{"definition_id":"01JPP4FD1CVQWCDSWA90VE1ZTM","value":"PJ-123456"},{"definition_id":"01JPP4FD1CVQWCDSWA90VE1ZTN","value":234}]`
  配列の要素:
    - definition_id*: string - カスタム項目ID 例: `01JPP4FD1CVQWCDSWA90VE1ZTM`
    - value*: object - カスタム項目の値 例: `サンプル値`

## POST /businesses/{id}/cancellation — 案件取消

概要 指定されたIDの案件を取り消します。

### パラメータ

PATCH /businesses/{id} と同じ

### リクエストボディ

- company_id*: integer(int64) - 事業所ID 例: `1` (最小: 1, 最大: 9223372036854776000)

## POST /businesses/{id}/close — 案件ロック

概要 指定されたIDの案件をロックします。

### パラメータ

PATCH /businesses/{id} と同じ

### リクエストボディ

POST /businesses/{id}/cancellation と同じ

## POST /businesses/{id}/reopen — 案件ロック解除

概要 指定されたIDの案件ロックを解除します。

### パラメータ

PATCH /businesses/{id} と同じ

### リクエストボディ

POST /businesses/{id}/cancellation と同じ
