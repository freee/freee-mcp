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
