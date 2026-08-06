# 勤怠タグ

勤怠タグの操作

## GET /api/v1/employees/{employee_id}/attendance_tags — 勤怠タグ一覧の取得

概要 指定した従業員の利用可能な勤怠タグの一覧を返します。

### パラメータ

- company_id*: integer - 事業所ID
- employee_id* (path): integer - 従業員ID

### レスポンス

- employee_attendance_tags: array[object]

## GET /api/v1/employees/{employee_id}/attendance_tags/{date} — 勤怠タグと利用回数の取得

概要 指定した従業員・日付の勤怠タグと利用回数の一覧を返します。

### パラメータ

- company_id*: integer - 事業所ID
- employee_id* (path): integer - 従業員ID
- date* (path): string(date) - 対象年月日(YYYY-MM-DD)(例:2018-08-01)

### レスポンス

GET /api/v1/employees/{employee_id}/attendance_tags と同じ

## PUT /api/v1/employees/{employee_id}/attendance_tags/{date} — 勤怠タグの更新

概要 指定した従業員・日付の勤怠タグを更新します。

注意点
指定した従業員・日付の勤怠タグが存在する場合は、上書き更新されます。 指定がなかった勤怠タグは削除されます。

### パラメータ

- employee_id* (path): integer - 従業員ID
- date* (path): string(date) - 更新対象年月日(YYYY-MM-DD)(例:2018-08-01)

### リクエストボディ

- company_id*: integer(int32) - 事業所ID 例: `1` (最小: 1, 最大: 2147483647)
- employee_attendance_tags*: array[object] - 更新対象の勤怠タグのリスト
  配列の要素:
    - attendance_tag_id*: integer(int32) - 勤怠タグID 例: `1` (最小: 1, 最大: 2147483647)
    - amount*: integer(int32) - 勤怠タグ回数 例: `1` (最小: 0, 最大: 999)

### レスポンス

GET /api/v1/employees/{employee_id}/attendance_tags と同じ
