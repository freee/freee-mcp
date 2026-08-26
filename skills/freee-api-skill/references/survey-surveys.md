# survey

⚠ freee-mcp（リモート版） 限定: このAPIは 「freee-mcp（リモート版）」でのみ利用できます。freee_server_info の transport が stdio の場合は呼び出せません。その際はユーザーに freee-mcp（リモート版）の設定（https://support.freee.co.jp/hc/ja/articles/56390747520537）を案内してください。

survey

## GET /hub/survey/base_surveys — サーベイ企画一覧取得（リモート版freee-mcp限定）

サーベイ企画の一覧を取得します。

### パラメータ

- company_id*: integer(int64) - 事業所ID

### レスポンス

サーベイ企画一覧取得レスポンス
- data*: array[object] - サーベイ企画のリスト

## GET /hub/survey/base_surveys/{base_survey_id}/surveys — 実施回一覧取得（リモート版freee-mcp限定）

指定したサーベイ企画に紐づく実施回の一覧を取得します。

### パラメータ

- company_id*: integer(int64) - 事業所ID
- base_survey_id* (path): integer(int64) - サーベイ企画ID
- include_hidden: boolean - 非表示の実施回も含めるか
- year: integer(int32) - 対象年でのフィルタ

### レスポンス

実施回一覧取得レスポンス
- data*: array[object] - 実施回のリスト

## GET /hub/survey/surveys/{id} — 実施回詳細取得（リモート版freee-mcp限定）

指定した実施回の詳細と回答対象者を取得します。

### パラメータ

- company_id*: integer(int64) - 事業所ID
- id* (path): integer(int64) - 実施回ID

### レスポンス

実施回詳細取得レスポンス
- survey*: object - 実施回の詳細
- survey_targets*: array[object] - 回答対象者のリスト
- estimated_time*: integer(int32) - 回答所要時間の目安(分)

## GET /hub/survey/base_surveys/{base_survey_id}/company_survey_results — 全社平均一覧取得（リモート版freee-mcp限定）

指定した実施回の全社平均を取得します。

### パラメータ

- company_id*: integer(int64) - 事業所ID
- base_survey_id* (path): integer(int64) - サーベイ企画ID
- survey_ids[]: array[integer] - 実施回IDでのフィルタ。指定しない場合は全件対象
- page_token: string - ページネーションのトークン
- page_size: integer(int32) - 1ページあたりの取得件数

### レスポンス

全社平均一覧取得レスポンス
- data*: array[object] - 全社平均のリスト
- next_page_token*: string - 次のページを取得するためのカーソルトークン。次ページがない場合はnull

## GET /hub/survey/base_surveys/{base_survey_id}/employee_survey_results — サーベイ結果一覧取得（リモート版freee-mcp限定）

指定した実施回の従業員別のサーベイ結果を取得します

### パラメータ

- company_id*: integer(int64) - 事業所ID
- base_survey_id* (path): integer(int64) - サーベイ企画ID
- employee_id: integer(int64) - 従業員IDでのフィルタ。指定しない場合は全従業員が対象
- survey_ids[]: array[integer] - 実施回IDでのフィルタ。指定しない場合は指定サーベイ企画内の全実施回が対象
- page_token: string - ページネーションのトークン
- page_size: integer(int32) - 1ページあたりの取得件数

### レスポンス

サーベイ結果一覧取得レスポンス
- data*: array[object] - サーベイ結果のリスト
- next_page_token*: string - 次のページを取得するためのカーソルトークン。次ページがない場合はnull

## GET /hub/survey/surveys/{survey_id}/result_summaries — AI個人分析一覧取得（リモート版freee-mcp限定）

指定した実施回のAI個人分析の一覧を取得します。従業員IDを指定すると対象を絞り込みます。

### パラメータ

- survey_id* (path): integer(int64) - 実施回ID
- company_id*: integer(int64) - 事業所ID
- employee_id: integer(int64) - 従業員IDでのフィルタ。指定しない場合は全従業員が対象

### レスポンス

AI個人分析一覧取得レスポンス
- data*: array[object] - AI個人分析のリスト

## GET /hub/survey/surveys/{survey_id}/questions — 設問の取得（リモート版freee-mcp限定）

指定した実施回の設問の一覧を取得します。

### パラメータ

- survey_id* (path): integer(int64) - 実施回ID
- company_id*: integer(int64) - 事業所ID

### レスポンス

設問一覧取得レスポンス
- data*: array[object] - 設問のリスト
