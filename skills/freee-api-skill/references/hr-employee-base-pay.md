# 従業員の基本給

従業員の基本給の操作

## GET /api/v1/employees/{employee_id}/basic_pay_rule — 従業員の基本給の取得

概要 指定した従業員・日付の基本給情報を返します。

注意点
管理者権限を持ったユーザーのみ実行可能です。

### パラメータ

- company_id*: integer - 事業所ID
- year*: integer - 従業員情報を取得したい年
- month*: integer - 従業員情報を取得したい月

  締め日支払い日設定が翌月払いの従業員情報の場合は、 指定したmonth + 1の値が検索結果として返します。

  翌月払いの従業員の2022/01の従業員情報を取得する場合は、year=2021,month=12を指定してください。
- employee_id* (path): integer - 従業員ID

### レスポンス

- employee_basic_pay_rule: object

## PUT /api/v1/employees/{employee_id}/basic_pay_rule — 従業員の基本給の更新

概要 指定した従業員の基本給情報を更新します。

注意点
管理者権限を持ったユーザーのみ実行可能です。

### パラメータ

- employee_id* (path): integer - 従業員ID

### リクエストボディ

- company_id*: integer(int32) - 更新対象事業所ID（必須） 例: `1` (最小: 1, 最大: 2147483647)
- year*: integer(int32) - 更新対象年（必須） 例: `2021` (最小: 2000, 最大: 2100)
- month*: integer(int32) - 更新対象月（必須）

  締め日支払い日設定が翌月払いの従業員情報の場合は、 指定したmonth + 1の値が更新されます

  翌月払いの従業員の2022/01の従業員情報を更新する場合は、year=2021,month=12を指定してください。 例: `1` (最小: 1, 最大: 12)
- employee_basic_pay_rule*: object
  - pay_calc_type*: string - 給与方式 null不可 monthly: 月給, daily: 日給, hourly: 時給 (選択肢: monthly, daily, hourly) 例: `monthly`
  - pay_amount*: integer(int32) - 基本給 null不可 例: `220000` (最小: 0, 最大: 99999999)

### レスポンス

GET /api/v1/employees/{employee_id}/basic_pay_rule と同じ
