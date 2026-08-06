# 勤怠タグサマリ

勤怠タグサマリの操作

## GET /api/v1/employees/{employee_id}/attendance_tag_summaries/{year}/{month} — 勤怠タグ月次サマリの取得

概要 指定した従業員・年月の勤怠タグサマリの一覧を返します。 年月は給与支払い月を指定してください。

### パラメータ

- company_id*: integer - 事業所ID
- employee_id* (path): integer - 従業員ID
- year* (path): integer - 勤怠タグサマリを取得したい年
- month* (path): integer - 勤怠タグサマリを取得したい月

### レスポンス

- employee_attendance_tag_summaries: array[object]

## PUT /api/v1/employees/{employee_id}/attendance_tag_summaries/{year}/{month} — 勤怠タグ月次サマリの更新

概要 指定した従業員・年月の勤怠タグサマリを更新します。 年月は給与支払い月を指定してください。

注意点
管理者権限を持ったユーザーのみ実行可能です。 指定した従業員・年月の勤怠タグサマリが存在する場合は、上書き更新されます。 指定がなかった勤怠タグは自動的に0が設定されます。

### パラメータ

- employee_id* (path): integer - 従業員ID
- year* (path): integer - 勤怠タグサマリを更新したい年
- month* (path): integer - 勤怠タグサマリを更新したい月

### リクエストボディ

- company_id*: integer(int32) - 事業所ID 例: `1` (最小: 1, 最大: 2147483647)
- employee_attendance_tag_summaries*: array[object] - 更新対象の勤怠タグサマリのリスト
  配列の要素:
    - attendance_tag_id*: integer(int32) - 勤怠タグID 例: `1` (最小: 1, 最大: 2147483647)
    - amount*: integer(int32) - 勤怠タグ回数 例: `1` (最小: 0, 最大: 99999)

### レスポンス

GET /api/v1/employees/{employee_id}/attendance_tag_summaries/{year}/{month} と同じ
