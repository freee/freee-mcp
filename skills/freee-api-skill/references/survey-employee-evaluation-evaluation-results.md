# employee_evaluation_evaluation_results

⚠ freee-mcp（リモート版） 限定: このAPIは 「freee-mcp（リモート版）」でのみ利用できます。freee_server_info の transport が stdio の場合は呼び出せません。その際はユーザーに freee-mcp（リモート版）の設定（https://support.freee.co.jp/hc/ja/articles/56390747520537）を案内してください。

evaluation_results

## GET /hub/employee_evaluation/evaluation_results — 人事評価結果一覧取得（リモート版freee-mcp限定）

人事評価結果を一覧で取得します。

### パラメータ

- company_id*: integer(int64) - 事業所ID
- employee_ids[]: array[integer] - 従業員IDでのフィルタ。最大50件まで指定できます。指定しない場合はアクセス可能な全従業員が対象です。
- start_date: string(date) - 評価期間の開始日（yyyy-mm-dd）
- end_date: string(date) - 評価期間の終了日（yyyy-mm-dd）
- page_size: integer(int32) - 1ページあたりの取得件数（デフォルト100、最大500）
- page_token: string - 次ページ取得用トークン

### レスポンス

人事評価結果一覧取得レスポンス
- data*: array[object] - 人事評価結果のリスト
- next_page_token*: string - 次ページ取得用トークン。次ページがない場合は空文字列です。
