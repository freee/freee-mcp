# 所属

所属の操作

## GET /api/v1/employee_group_memberships — 所属一覧の取得

概要 指定した事業所の指定日付時点における所属情報をリストで返します。

注意点
管理者権限を持ったユーザーのみ実行可能です。

### パラメータ

- company_id*: integer - 事業所ID
- base_date*: string(date) - 指定日。指定日付時点における所属情報をリストで返します。(YYYY-MM-DD)(例:2018-07-31)
- with_no_payroll_calculation: boolean - trueを指定すると給与計算対象外の従業員情報をレスポンスに含めます。
- employee_ids: string - 取得対象とする従業員IDを指定することができます。指定しない場合は全従業員が対象となります。
  (例:1,2,3,4,5)
- limit: integer - 取得レコードの件数 (デフォルト: 50, 最小: 1, 最大: 100)
- offset: integer - 取得レコードのオフセット (デフォルト: 0)

### レスポンス

- employee_group_memberships: array[object]
- total_count: integer(int32) - 合計件数

## GET /api/v1/employees/{employee_id}/group_memberships — 従業員の所属取得

概要 指定した従業員の所属情報をリストで返します。 base_dateを指定した場合は指定日付時点の所属情報を、base_dateを省略した場合は全期間の所属履歴を返します。

注意点
管理者権限を持ったユーザーのみ実行可能です。

### パラメータ

- employee_id* (path): integer - 従業員ID
- company_id*: integer - 事業所ID
- base_date: string(date) - 指定日。指定日付時点における所属情報を返します。(YYYY-MM-DD)(例:2018-07-31)
  省略した場合は全期間の所属履歴を返します。
- limit: integer - 取得レコードの件数 (デフォルト: 50, 最小: 1, 最大: 100)
- offset: integer - 取得レコードのオフセット (デフォルト: 0)

### レスポンス

- group_memberships*: array[object]
- total_count*: integer(int32) - 合計件数
