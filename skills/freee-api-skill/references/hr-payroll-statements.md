# 給与明細

給与明細の操作

## GET /api/v1/salaries/employee_payroll_statements — 給与明細一覧の取得

概要 指定した事業所に所属する従業員の給与明細をリストで返します。 指定した年月に支払いのある給与明細が返されます。

注意点
複数時給を設定している場合はpaymentsに内訳が返されます。 管理者権限を持ったユーザーのみ実行可能です。 給与計算中の場合は、各パラメータはnullおよび空配列が返ります。

### パラメータ

- company_id*: integer - 事業所ID
- year*: integer - 従業員情報を取得したい年
- month*: integer - 従業員情報を取得したい月
- limit: integer - 取得レコードの件数 (デフォルト: 50, 最小: 1, 最大: 100)
- offset: integer - 取得レコードのオフセット (デフォルト: 0)

### レスポンス

- employee_payroll_statements: array[object]
- total_count: integer(int32) - 指定した年月に支払いのある給与明細の合計件数

## GET /api/v1/salaries/employee_payroll_statements/{employee_id} — 給与明細の取得

概要 指定した従業員ID、年月の給与明細を返します。 指定した年月に支払いのある給与明細が返されます。

注意点
複数時給を設定している場合はpaymentsに内訳が返されます。 管理者権限を持ったユーザーのみ実行可能です。 給与計算中の場合は、各パラメータはnullおよび空配列が返ります。 examples { "employee_payroll_statement": { "id": 1, "company_id": 1, "employee_id": 1, "employee_name": "給与 太郎", "employee_display_name": "給与 太郎", "employee_num": "001", "pay_date": "2018-02-25", "start_date": "2018-02-01", "closing_date": "2018-02-28", "variable_pay_start_date": "2018-01-01", "variable_pay_closing_date": "2018-01-31", "fixed": true, "...

### パラメータ

- company_id*: integer - 事業所ID
- year*: integer - 従業員情報を取得したい年
- month*: integer - 従業員情報を取得したい月
- employee_id* (path): integer - 従業員ID

### レスポンス

- employee_payroll_statement: object

## PUT /api/v1/salaries/employee_payroll_statements/{employee_id}/remark — 給与明細の備考の更新

概要 指定した従業員の給与明細の備考を更新します。

注意点
管理者権限を持ったユーザーのみ実行可能です。

### パラメータ

- employee_id* (path): integer - 従業員ID

### リクエストボディ*

- company_id*: integer - 事業所ID 例: `1` (最小: 1, 最大: 2147483647)
- year*: integer - 更新対象の年 例: `2024` (最小: 2000, 最大: 2100)
- month*: integer - 更新対象の月 例: `10` (最小: 1, 最大: 12)
- remark*: object
  - body*: string - 備考本文（500 文字以内） 例: `備考の本文`

### レスポンス

- employee_payroll_statement_remark*: object
