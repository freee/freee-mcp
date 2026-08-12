# 賞与明細

賞与明細の操作

## GET /api/v1/bonuses/employee_payroll_statements — 賞与明細一覧の取得

概要 指定した事業所に所属する従業員の賞与明細をリストで返します。 指定した年月に支払いのある賞与明細が返されます。

注意点
管理者権限を持ったユーザーのみ実行可能です。

### パラメータ

- company_id*: integer - 事業所ID
- year*: integer - 従業員情報を取得したい年
- month*: integer - 従業員情報を取得したい月
- limit: integer - 取得レコードの件数 (デフォルト: 50, 最小: 1, 最大: 100)
- offset: integer - 取得レコードのオフセット (デフォルト: 0)

### レスポンス

- employee_payroll_statements: array[object]
- total_count: integer(int32) - 合計件数

## GET /api/v1/bonuses/employee_payroll_statements/{employee_id} — 賞与明細の取得

概要 指定した従業員ID、年月の賞与明細を返します。 指定した年月に支払いのある賞与明細が返されます。

注意点
管理者権限を持ったユーザーのみ実行可能です。 examples { "employee_payroll_statement": { "id": 1, "company_id": 1, "employee_id": 1, "employee_name": "給与 太郎", "employee_display_name": "給与 太郎", "employee_num": "001", "closing_date": "2018-03-31", "pay_date": "2018-03-31", "fixed": true, "calc_status": "calculated", "calculated_at": "2018-09-27T05:06:45.315Z", "bonus_amount": "300000.0", "total_allowance_amount": "0.0", "total_deduction_amount": "23830.0", "net_pay...

### パラメータ

- company_id*: integer - 事業所ID
- year*: integer - 従業員情報を取得したい年
- month*: integer - 従業員情報を取得したい月
- employee_id* (path): integer - 従業員ID

### レスポンス

- employee_payroll_statement: object
