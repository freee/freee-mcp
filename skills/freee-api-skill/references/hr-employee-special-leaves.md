# 従業員の特別休暇

従業員の特別休暇の操作

## GET /api/v1/employees/{employee_id}/special_holidays — 従業員の特別休暇一覧の取得

概要 指定した従業員に付与された特別休暇情報をリストで返します。

### パラメータ

- company_id*: integer - 事業所ID
- employee_id* (path): integer - 従業員ID
- date: string(date) - 対象日
- start_date: string(date) - 対象開始日
- end_date: string(date) - 対象終了日

### レスポンス

- employee_special_holidays: array[object]
