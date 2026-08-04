# 従業員の健康保険

従業員の健康保険の操作

## GET /api/v1/employees/{employee_id}/health_insurance_rule — 従業員の健康保険の取得

概要 指定した従業員・日付の健康保険情報を返します。

注意点
管理者権限を持ったユーザーのみ実行可能です。 保険料計算方法が自動計算の場合、対応する保険料の直接指定金額は無視されnullが返されます。(例: 給与計算時の健康保険料の計算方法が自動計算の場合、給与計算時の健康保険料の直接指定金額はnullが返されます)

### パラメータ

- company_id*: integer - 事業所ID
- year*: integer - 従業員情報を取得したい年
- month*: integer - 従業員情報を取得したい月

  締め日支払い日設定が翌月払いの従業員情報の場合は、 指定したmonth + 1の値が検索結果として返します。

  翌月払いの従業員の2022/01の従業員情報を取得する場合は、year=2021,month=12を指定してください。
- employee_id* (path): integer - 従業員ID

### レスポンス

- employee_health_insurance_rule: object

## PUT /api/v1/employees/{employee_id}/health_insurance_rule — 従業員の健康保険の更新

概要 指定した従業員の健康保険情報を更新します。

注意点
管理者権限を持ったユーザーのみ実行可能です。 保険料計算方法が自動計算の場合、対応する保険料の直接指定金額は無視されnullが返されます。(例: 給与計算時の健康保険料の計算方法が自動計算の場合、給与計算時の健康保険料の直接指定金額はnullが返されます) 事業所が定額制の健康保険組合に加入している場合、保険料の直接指定金額は無視されnullが返されます。 事業所が定額制の健康保険組合に加入している場合、保険料の計算方法と保険料の更新はできません。

### パラメータ

- employee_id* (path): integer - 従業員ID

### リクエストボディ

- company_id*: integer(int32) - 更新対象事業所ID（必須） 例: `1` (最小: 1, 最大: 2147483647)
- year*: integer(int32) - 更新対象年（必須） 例: `2021` (最小: 2000, 最大: 2100)
- month*: integer(int32) - 更新対象月（必須）

  締め日支払い日設定が翌月払いの従業員情報の場合は、 指定したmonth + 1の値が更新されます。

  翌月払いの従業員の2022/01の従業員情報を更新する場合は、year=2021,month=12を指定してください。 例: `1` (最小: 1, 最大: 12)
- employee_health_insurance_rule*: object
  - entried: boolean - 健康保険に加入しているかどうか null不可
  - health_insurance_salary_calc_type: string - 給与計算時の健康保険料の計算方法 (選択肢: auto, manual) 例: `manual`
  - health_insurance_bonus_calc_type: string - 賞与計算時の健康保険料の計算方法 (選択肢: auto, manual) 例: `manual`
  - manual_health_insurance_amount_of_employee_salary: integer(int32) - 給与計算時の健康保険料の直接指定金額（従業員負担分） 例: `8888` (最小: -999999999, 最大: 999999999)
  - manual_health_insurance_amount_of_employee_bonus: integer(int32) - 賞与計算時の健康保険料の直接指定金額（従業員負担分） 例: `7777` (最小: -999999999, 最大: 999999999)
  - manual_health_insurance_amount_of_company_salary: number(float) - 給与計算時の健康保険料の直接指定金額（会社負担分） 例: `6666.0001` (最小: -999999999.9999, 最大: 999999999.9999)
  - manual_health_insurance_amount_of_company_bonus: number(float) - 賞与計算時の健康保険料の直接指定金額（会社負担分） 例: `5555.0001` (最小: -999999999.9999, 最大: 999999999.9999)
  - care_insurance_salary_calc_type: string - 給与計算時の介護保険料の計算方法 (選択肢: auto, manual) 例: `manual`
  - care_insurance_bonus_calc_type: string - 賞与計算時の介護保険料の計算方法 (選択肢: auto, manual) 例: `manual`
  - manual_care_insurance_amount_of_employee_salary: integer(int32) - 給与計算時の介護保険料の直接指定金額（従業員負担分） 例: `4444` (最小: -999999999, 最大: 999999999)
  - manual_care_insurance_amount_of_employee_bonus: integer(int32) - 賞与計算時の介護保険料の直接指定金額（従業員負担分） 例: `3333` (最小: -999999999, 最大: 999999999)
  - manual_care_insurance_amount_of_company_salary: number(float) - 給与計算時の介護保険料の直接指定金額（会社負担分） 例: `2222.0001` (最小: -999999999.9999, 最大: 999999999.9999)
  - manual_care_insurance_amount_of_company_bonus: number(float) - 賞与計算時の介護保険料の直接指定金額（会社負担分） 例: `1111.0001` (最小: -999999999.9999, 最大: 999999999.9999)
  - child_support_fund_salary_calc_type: string - 給与計算時の子ども・子育て支援金の計算方法 (選択肢: auto, manual) 例: `manual`
  - child_support_fund_bonus_calc_type: string - 賞与計算時の子ども・子育て支援金の計算方法 (選択肢: auto, manual) 例: `manual`
  - manual_child_support_fund_amount_of_employee_salary: integer(int32) - 給与計算時の子ども・子育て支援金の直接指定金額（従業員負担分） 例: `4000` (最小: -999999999, 最大: 999999999)
  - manual_child_support_fund_amount_of_employee_bonus: integer(int32) - 賞与計算時の子ども・子育て支援金の直接指定金額（従業員負担分） 例: `3000` (最小: -999999999, 最大: 999999999)
  - manual_child_support_fund_amount_of_company_salary: number(float) - 給与計算時の子ども・子育て支援金の直接指定金額（会社負担分） 例: `2000.0001` (最小: -999999999.9999, 最大: 999999999.9999)
  - manual_child_support_fund_amount_of_company_bonus: number(float) - 賞与計算時の子ども・子育て支援金の直接指定金額（会社負担分） 例: `1000.0001` (最小: -999999999.9999, 最大: 999999999.9999)
  - reference_num: string - 健康保険の被保険者整理番号 例: `0000000000`
  - standard_monthly_remuneration*: integer(int32) - 標準報酬月額 null不可 例: `58000` (最小: 1, 最大: 2147483647)
  - health_insurance_qualification_required: boolean - 健康保険の資格確認書の発行が必要かどうか

### レスポンス

GET /api/v1/employees/{employee_id}/health_insurance_rule と同じ
