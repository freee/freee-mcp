# 従業員のカスタム項目

従業員のカスタム項目の操作

## GET /api/v1/employees/{employee_id}/profile_custom_fields — 従業員のカスタム項目の取得

概要 指定した従業員・日付のカスタム項目情報を返します。

注意点
管理者権限を持ったユーザーのみ実行可能です。 指定年月に在籍していない従業員および給与計算対象外の従業員ではデータが存在しないため、空の配列が返ります。

### パラメータ

- company_id*: integer - 事業所ID
- year*: integer - 従業員情報を取得したい年
- month*: integer - 従業員情報を取得したい月

  締め日支払い日設定が翌月払いの従業員情報の場合は、 指定したmonth + 1の値が検索結果として返します。

  翌月払いの従業員の2022/01の従業員情報を取得する場合は、year=2021,month=12を指定してください。
- employee_id* (path): integer - 従業員ID

### レスポンス

- profile_custom_field_groups: array[object]
