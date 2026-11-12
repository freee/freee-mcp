<!-- freee人事労務 の小さいタグをまとめたファイル。タグごとの行範囲は INDEX.md を参照し、必要な範囲だけ読むこと。 -->

# 申請経路

申請経路の操作

## GET /api/v1/approval_flow_routes — 申請経路一覧の取得

概要 指定した事業所の申請経路一覧を取得する。

注意点
指定した事業所の従業員に紐づくユーザーのみ実行可能です。 申請経路、承認者の指定として部門役職データ連携を活用し、以下のいずれかを利用している申請と申請経路はAPI経由で参照は可能ですが、作成と更新、承認ステータスの変更ができません。 役職指定（申請者の所属部門） 役職指定（申請時に部門指定） 部門および役職指定

### パラメータ

- company_id*: integer - 事業所ID
- included_user_id: integer - 経路に含まれるユーザーのユーザーID
- usage: string - 申請種別（申請経路を使用できる申請種別を示します。例えば、AttendanceWorkflow の場合は、勤怠申請で使用できる申請経路です。）
  - `AttendanceWorkflow` - 勤怠申請
  - `PersonalDataWorkflow` - 身上変更申請 (選択肢: AttendanceWorkflow, PersonalDataWorkflow)

### レスポンス

- approval_flow_routes*: array[object]

## GET /api/v1/approval_flow_routes/{id} — 申請経路の取得

概要 指定した事業所の申請経路を取得する。

注意点
指定した事業所の従業員に紐づくユーザーのみ実行可能です。 申請経路、承認者の指定として部門役職データ連携を活用し、以下のいずれかを利用している申請と申請経路はAPI経由で参照は可能ですが、作成と更新、承認ステータスの変更ができません。 役職指定（申請者の所属部門） 役職指定（申請時に部門指定） 部門および役職指定

### パラメータ

- id* (path): integer - 申請経路ID
- company_id*: integer - 事業所ID

### レスポンス

- approval_flow_route*: object

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

# 従業員の銀行口座

従業員の銀行口座の操作

## GET /api/v1/employees/{employee_id}/bank_account_rule — 従業員の銀行口座の取得

概要 指定した従業員・日付の銀行口座情報を返します。

### パラメータ

- company_id*: integer - 事業所ID
- year*: integer - 従業員情報を取得したい年
- month*: integer - 従業員情報を取得したい月

  締め日支払い日設定が翌月払いの従業員情報の場合は、 指定したmonth + 1の値が検索結果として返します。

  翌月払いの従業員の2022/01の従業員情報を取得する場合は、year=2021,month=12を指定してください。
- employee_id* (path): integer - 従業員ID

### レスポンス

- employee_bank_account_rule: object

## PUT /api/v1/employees/{employee_id}/bank_account_rule — 従業員の銀行口座の更新

概要 指定した従業員の銀行口座1の情報を更新します。

### パラメータ

- employee_id* (path): integer - 従業員ID

### リクエストボディ

- company_id*: integer(int32) - 更新対象事業所ID（必須） (最小: 1, 最大: 2147483647)
- year*: integer(int32) - 更新対象年（必須） 例: `2021` (最小: 2000, 最大: 2100)
- month*: integer(int32) - 更新対象月（必須）

  締め日支払い日設定が翌月払いの従業員情報の場合は、 指定したmonth + 1の値が更新されます。

  翌月払いの従業員の2022/01の従業員情報を更新する場合は、year=2021,month=12を指定してください。 例: `1` (最小: 1, 最大: 12)
- employee_bank_account_rule*: object
  - bank_name: string - 金融機関名
  - bank_name_kana: string - 金融機関名カナ 英字カナのみ
  - bank_code: string - 金融機関コード 数値文字列4桁 例: `0000`
  - branch_name: string - 支店名
  - branch_name_kana: string - 支店名カナ　英字カナのみ
  - branch_code: string - 支店コード 数値文字列3桁 例: `000`
  - account_number: string - 口座番号 数値文字列7桁 例: `0000000`
  - account_name: string - 口座名義カナ　英字カナのみ
  - account_type: string - 預金種類 ordinary: 普通預金, current: 当座預金, saving: 貯蓄預金 (選択肢: ordinary, current, saving)

### レスポンス

GET /api/v1/employees/{employee_id}/bank_account_rule と同じ

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

# 従業員の厚生年金保険

従業員の厚生年金保険の操作

## GET /api/v1/employees/{employee_id}/welfare_pension_insurance_rule — 従業員の厚生年金保険の取得

概要 指定した従業員・日付の厚生年金保険情報を返します。

注意点
管理者権限を持ったユーザーのみ実行可能です。 保険料計算方法が自動計算の場合、対応する保険料の直接指定金額は無視されnullが返されます。(例: 給与計算時の厚生年金保険料の計算方法が自動計算の場合、給与計算時の厚生年金保険料の直接指定金額はnullが返されます)

### パラメータ

- company_id*: integer - 事業所ID
- year*: integer - 従業員情報を取得したい年
- month*: integer - 従業員情報を取得したい月

  締め日支払い日設定が翌月払いの従業員情報の場合は、 指定したmonth + 1の値が検索結果として返します。

  翌月払いの従業員の2022/01の従業員情報を取得する場合は、year=2021,month=12を指定してください。
- employee_id* (path): integer - 従業員ID

### レスポンス

- employee_welfare_pension_insurance_rule: object

## PUT /api/v1/employees/{employee_id}/welfare_pension_insurance_rule — 従業員の厚生年金保険の更新

概要 指定した従業員の厚生年金保険情報を更新します。

注意点
管理者権限を持ったユーザーのみ実行可能です。 保険料計算方法が自動計算の場合、対応する保険料の直接指定金額は無視されnullが返されます。(例: 給与計算時の厚生年金保険料の計算方法が自動計算の場合、給与計算時の厚生年金保険料の直接指定金額はnullが返されます)

### パラメータ

- employee_id* (path): integer - 従業員ID

### リクエストボディ

- company_id*: integer(int32) - 更新対象事業所ID（必須） (最小: 1, 最大: 2147483647)
- year*: integer(int32) - 更新対象年（必須） 例: `2021` (最小: 2000, 最大: 2100)
- month*: integer(int32) - 更新対象月（必須）

  締め日支払い日設定が翌月払いの従業員情報の場合は、 指定したmonth + 1の値が更新されます。

  翌月払いの従業員の2022/01の従業員情報を更新する場合は、year=2021,month=12を指定してください。 例: `1` (最小: 1, 最大: 12)
- employee_welfare_pension_insurance_rule*: object
  - entried: boolean - 厚生年金保険に加入しているかどうか null不可
  - welfare_pension_insurance_salary_calc_type: string - 給与計算時の厚生年金保険料の計算方法 (選択肢: auto, manual) 例: `manual`
  - welfare_pension_insurance_bonus_calc_type: string - 賞与計算時の厚生年金保険料の計算方法 (選択肢: auto, manual) 例: `manual`
  - manual_welfare_pension_insurance_amount_of_employee_salary: integer(int32) - 給与計算時の厚生年金保険料の直接指定金額（従業員負担分） 例: `1111` (最小: -999999999, 最大: 999999999)
  - manual_welfare_pension_insurance_amount_of_employee_bonus: integer(int32) - 賞与計算時の厚生年金保険料の直接指定金額（従業員負担分） 例: `2222` (最小: -999999999, 最大: 999999999)
  - manual_welfare_pension_insurance_amount_of_company_salary: number(float) - 給与計算時の厚生年金保険料の直接指定金額（会社負担分） 例: `3333.0001` (最小: -999999999.9999, 最大: 999999999.9999)
  - manual_welfare_pension_insurance_amount_of_company_bonus: number(float) - 賞与計算時の厚生年金保険料の直接指定金額（会社負担分） 例: `4444.0001` (最小: -999999999.9999, 最大: 999999999.9999)
  - child_allowance_contribution_salary_calc_type: string - 給与計算時の子ども・子育て拠出金の計算方法 (選択肢: auto, manual) 例: `manual`
  - child_allowance_contribution_bonus_calc_type: string - 賞与計算時の子ども・子育て拠出金の計算方法 (選択肢: auto, manual) 例: `manual`
  - manual_child_allowance_contribution_amount_salary: number(float) - 給与計算時の子ども・子育て拠出金の直接指定金額 例: `5555.0001` (最小: -999999999.9999, 最大: 999999999.9999)
  - manual_child_allowance_contribution_amount_bonus: number(float) - 賞与計算時の子ども・子育て拠出金の直接指定金額 例: `6666.0001` (最小: -999999999.9999, 最大: 999999999.9999)
  - reference_num: string - 厚生年金保険の被保険者整理番号 例: `0000000000`
  - standard_monthly_remuneration*: integer(int32) - 標準報酬月額 null不可 例: `88000` (最小: 1, 最大: 2147483647)

### レスポンス

GET /api/v1/employees/{employee_id}/welfare_pension_insurance_rule と同じ

# 従業員の姓名・住所など

従業員の姓名・住所などの操作

## GET /api/v1/employees/{employee_id}/profile_rule — 従業員の姓名・住所などの取得

概要 指定した従業員・日付の姓名などの情報を返します。

注意点
本APIは、給与計算対象外の従業員には非対応です。employee_idに給与計算対象外の従業員IDを指定した場合、本APIを利用できません。

### パラメータ

- company_id*: integer - 事業所ID
- year*: integer - 従業員情報を取得したい年
- month*: integer - 従業員情報を取得したい月

  締め日支払い日設定が翌月払いの従業員情報の場合は、指定したmonth + 1の値が検索結果として返します。

  翌月払いの従業員の2022/01の従業員情報を取得する場合は、year=2021,month=12を指定してください。
- employee_id* (path): integer - 従業員ID

### レスポンス

- employee_profile_rule: object

## PUT /api/v1/employees/{employee_id}/profile_rule — 従業員の姓名・住所などの更新

概要 指定した従業員の姓名・住所などを更新します。

注意点
本APIは、給与計算対象外の従業員には非対応です。employee_idに給与計算対象外の従業員IDを指定した場合、本APIを利用できません。

### パラメータ

- employee_id* (path): integer - 従業員ID

### リクエストボディ

- company_id*: integer(int32) - 更新対象事業所ID（必須） (最小: 1, 最大: 2147483647)
- year*: integer(int32) - 更新対象年（必須） 例: `2021` (最小: 2000, 最大: 2100)
- month*: integer(int32) - 更新対象月（必須）

  締め日支払い日設定が翌月払いの従業員情報の場合は、指定したmonth + 1の値が更新されます。

  翌月払いの従業員の2022/01の従業員情報を更新する場合は、year=2021,month=12を指定してください。 例: `1` (最小: 1, 最大: 12)
- employee_profile_rule*: object
  - last_name*: string - 姓 null不可 例: `山田`
  - first_name*: string - 名 null不可 例: `太郎`
  - last_name_kana*: string - 姓カナ 例: `ヤマダ`
  - first_name_kana*: string - 名カナ 例: `タロウ`
  - zipcode1: string - 住民票住所の郵便番号1 例: `000`
  - zipcode2: string - 住民票住所の郵便番号2 例: `0000`
  - prefecture_code: integer - 住民票住所の都道府県コード（-1: 設定しない、0: 北海道、1:青森、2:岩手、3:宮城、4:秋田、5:山形、6:福島、7:茨城、8:栃木、9:群馬、10:埼玉、11:千葉、12:東京、13:神奈川、14:新潟、15:富山、16:石川、17:福井、18:山梨、19:長野、20:岐阜、21:静岡、22:愛知、23:三重、24:滋賀、25:京都、26:大阪、27:兵庫、28:奈良、29:和歌山、30:鳥取、31:島根、32:岡山、33:広島、34:山口、35:徳島、36:香川、37:愛媛、38:高知、39:福岡、40:佐賀、41:長崎、42:熊本、43:大分、44:宮崎、45:鹿児島、46:沖縄) 例: `4` (最小: -1, 最大: 46)
  - address: string - 住民票住所の市区町村以降の住所
  - address_kana: string - 住民票住所の市区町村以降の住所カナ
  - phone1: string - 電話番号1（先頭番号、例:03-1111-222x の03部分） 例: `000`
  - phone2: string - 電話番号2（中間番号、例:03-1111-222x の1111部分） 例: `0000`
  - phone3: string - 電話番号3（末尾番号、例:03-1111-222x の222x部分） 例: `0000`
  - residential_zipcode1: string - 現住所の郵便番号１ 例: `000`
  - residential_zipcode2: string - 現住所の郵便番号２ 例: `0000`
  - residential_prefecture_code: integer - 現住所の都道府県コード（-1: 設定しない、0: 北海道、1:青森、2:岩手、3:宮城、4:秋田、5:山形、6:福島、7:茨城、8:栃木、9:群馬、10:埼玉、11:千葉、12:東京、13:神奈川、14:新潟、15:富山、16:石川、17:福井、18:山梨、19:長野、20:岐阜、21:静岡、22:愛知、23:三重、24:滋賀、25:京都、26:大阪、27:兵庫、28:奈良、29:和歌山、30:鳥取、31:島根、32:岡山、33:広島、34:山口、35:徳島、36:香川、37:愛媛、38:高知、39:福岡、40:佐賀、41:長崎、42:熊本、43:大分、44:宮崎、45:鹿児島、46:沖縄) 例: `4` (最小: -1, 最大: 46)
  - residential_address: string - 現住所の住所
  - residential_address_kana: string - 現住所の住所カナ
  - employment_type: string - 雇用形態 board-member: 役員, regular: 正社員, fixed-term: 契約社員, part-time: アルバイト・パート, temporary: 派遣社員, (空文字列): その他 (選択肢: board-member, regular, fixed-term, part-time, temporary, )
  - title: string - 肩書
  - gender: string - 性別　unselected: 未選択, male: 男性, female: 女性（デフォルト: unselected: 未選択） (選択肢: unselected, male, female) 例: `male`
  - married: boolean - null不可 配偶者の有無
  - is_working_student: boolean - null不可 勤労学生かどうか
  - widow_type: string - 寡夫／寡婦かどうか null不可 na: 空白, widower: 寡夫, widow: 寡婦, special_widow: 特別寡婦, one_parent: ひとり親 (選択肢: na, widower, widow, special_widow, one_parent)
  - disability_type: string - 障害者かどうか null不可 na: 空白, general: 障害者, heavy: 特別障害者 (選択肢: na, general, heavy)
  - email: string - メールアドレス 例: `test@example.com`
  - householder_name: string - 世帯主の名前
    世帯主の続柄に myself:本人 を指定している場合は、世帯主の名前は自動で従業員名で更新するため指定できません。 例: `山田 吾郎`
  - householder: string - 世帯主の続柄 myself:本人, husband:夫, wife:妻, father:父, mother:母, child:子供, senior_brother:兄, junior_brother:弟, senior_sister:姉, junior_sister:妹, grandchild:孫, grandfather:祖父, grandmother:祖母, father_in_law:義父, mother_in_law:義母, grandfather_in_law:義祖父, grandmother_in_law:義祖母, other:その他 (選択肢: myself, husband, wife, father, mother, child, senior_brother, junior_brother, senior_sister, junior_sister, grandchild, grandfather, grandmother, father_in_law, mother_in_law, grandfather_in_law, grandmother_in_law, other) 例: `father`

### レスポンス

GET /api/v1/employees/{employee_id}/profile_rule と同じ

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

# ログインユーザー

ログインユーザーの取得

## GET /api/v1/users/me — ログインユーザーの取得

概要 このリクエストの認可セッションにおけるログインユーザーの情報を返します。 freee人事労務では一人のログインユーザーを複数の事業所に関連付けられるため、このユーザーと関連のあるすべての事業所の情報をリストで返します。

注意点
他のAPIのパラメータとしてcompany_idが求められる場合は、このAPIで取得したcompany_idを使用します。 給与計算対象外の従業員のemployee_idとdisplay_nameは取得できません。

### レスポンス

- id: integer(int32) - ユーザーID
- companies: array[object] - ユーザーが属する事業所の一覧

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

# 役職

役職の操作

## GET /api/v1/positions — 役職一覧の取得

概要 指定した事業所の指定日付時点における役職情報をリストで返します。

注意点
管理者権限を持ったユーザーのみ実行可能です。

### パラメータ

- company_id*: integer - 事業所ID

### レスポンス

- positions*: array[object]
- total_count*: integer(int32) - 合計件数

## POST /api/v1/positions — 役職の作成

概要 指定した事業所の役職を新規作成します。

注意点
管理者権限を持ったユーザーのみ実行可能です。

### リクエストボディ

- company_id*: integer(int32) - 作成対象事業所ID（必須） 例: `1` (最小: 1, 最大: 2147483647)
- position*: object
  - code: string - 役職コード（入力しない場合、空文字が入力されます。） 例: `position1`
  - name*: string - 役職名称（必須） 例: `部長`

### レスポンス

- position*: object

## PUT /api/v1/positions/{id} — 役職の更新

概要 指定した事業所の役職の情報を更新します。

注意点
管理者権限を持ったユーザーのみ実行可能です。

### パラメータ

- id* (path): integer - 役職ID

### リクエストボディ

POST /api/v1/positions と同じ

### レスポンス

POST /api/v1/positions と同じ

## DELETE /api/v1/positions/{id} — 役職の削除

概要 指定した事業所の役職の情報を削除します。

注意点
管理者権限を持ったユーザーのみ実行可能です。 従業員に役職が適用されている場合、従業員の役職情報も削除されます。

### パラメータ

- id* (path): integer - 役職ID
- company_id*: integer - 事業所ID

# 部門

部門の操作

## GET /api/v1/groups — 部門一覧の取得

概要 指定した事業所の指定日付時点における部門情報をリストで返します。 部門APIの使い方については、 部門APIを利用した組織図の取得について をご参照ください。

注意点
管理者権限を持ったユーザーのみ実行可能です。

### パラメータ

- company_id*: integer - 事業所ID

### レスポンス

- groups*: array[object]
- total_count*: integer(int32) - 合計件数

## POST /api/v1/groups — 部門の作成

概要 指定した事業所の部門を新規作成します。 部門APIの使い方については、 部門APIを利用した組織図の取得について をご参照ください。

注意点
管理者権限を持ったユーザーのみ実行可能です。

### リクエストボディ

- company_id*: integer(int32) - 作成対象事業所ID（必須） 例: `1` (最小: 1, 最大: 2147483647)
- group*: object
  - code: string - 部門コード（入力しない場合、空文字が入力されます。） 例: `group2`
  - name*: string - 部門名称（必須） 例: `営業部門`
  - parent_group_id: integer(int32) - 親部門ID（部門階層レベルが10以内になるように親部門IDを指定してください。） 例: `2` (最小: 1, 最大: 2147483647)

### レスポンス

- group*: object

## PUT /api/v1/groups/{id} — 部門の更新

概要 指定した事業所の部門の情報を更新します。 部門APIの使い方については、 部門APIを利用した組織図の取得について をご参照ください。

注意点
管理者権限を持ったユーザーのみ実行可能です。

### パラメータ

- id* (path): integer - 部門ID

### リクエストボディ

- company_id*: integer(int32) - 作成対象事業所ID（必須） 例: `1` (最小: 1, 最大: 2147483647)
- group*: object
  - code: string - 部門コード（入力しない場合、空文字が入力されます。） 例: `group2`
  - name*: string - 部門名称 例: `営業部門`

### レスポンス

POST /api/v1/groups と同じ

## DELETE /api/v1/groups/{id} — 部門の削除

概要 指定した事業所の部門の情報を削除します。 部門APIの使い方については、 部門APIを利用した組織図の取得について をご参照ください。

注意点
管理者権限を持ったユーザーのみ実行可能です。

### パラメータ

- id* (path): integer - 部門ID
- company_id*: integer - 事業所ID

# タイムレコーダー(打刻)

タイムレコーダー(打刻)機能の操作

## GET /api/v1/employees/{employee_id}/time_clocks — 打刻一覧の取得

概要 指定した従業員・期間の打刻情報を返します。

### パラメータ

- company_id*: integer - 事業所ID
- from_date: string(date) - 取得する打刻期間の開始日(YYYY-MM-DD)(例:2018-08-01)(デフォルト: 当月の打刻開始日)
- to_date: string(date) - 取得する打刻期間の終了日(YYYY-MM-DD)(例:2018-08-31)(デフォルト: 当日)
- limit: integer - 取得レコードの件数 (デフォルト: 50, 最小: 1, 最大: 100)
- offset: integer - 取得レコードのオフセット (デフォルト: 0)
- employee_id* (path): integer - 従業員ID

## POST /api/v1/employees/{employee_id}/time_clocks — 打刻の登録

概要 指定した従業員の打刻情報を登録します。

注意点
休憩開始の連続や退勤のみなど、整合性の取れていない打刻は登録できません。 打刻可能種別の取得APIを呼ぶことで、その従業員がその時点で登録可能な打刻種別が取得できます。 出勤の打刻は 前日の出勤時刻から24時間以内の場合、前日の退勤打刻が必須です。 前日の出勤時刻から24時間経過している場合は、前日の退勤打刻がなくとも出勤打刻を登録することができます。 退勤の打刻は 『退勤を自動打刻する』 の設定を使用している場合は、出勤打刻から24時間経過しても退勤打刻がない場合に、退勤打刻が自動で登録されます。 すでに登録されている退勤打刻よりも後の時刻であれば上書き登録することができます。 打刻が日をまたぐ場合は、base_date(打刻日)に前日の日付を指定してください。 datetime(打刻日時)を指定できるのは管理者の権限を持ったユーザーのみです。

### パラメータ

- employee_id* (path): integer - 従業員ID

### リクエストボディ

- company_id*: integer(int32) - (required) (最小: 1, 最大: 2147483647)
- type*: string - 打刻種別（required）[clock_in:出勤, break_begin:休憩開始, break_end:休憩終了, clock_out:退勤]の何れか (選択肢: clock_in, break_begin, break_end, clock_out)
- base_date: string(date) - 打刻日。打刻が日をまたぐ場合に、前日の日付を指定します。(YYYY-MM-DD)(例:2018-07-31) 例: `2018-07-31` (パターン: ^[0-9]{4}-[0-9]{2}-[0-9]{2}$)
- datetime: string(date-time) - 打刻時刻。(YYYY-MM-DD&nbsp;HH:MM:SS)(例:2018-07-31&nbsp;08:00:00) 例: `2018-07-31 08:00:00` (パターン: ^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}(:[0-9]{2})?$)

### レスポンス

- employee_time_clock: object

## GET /api/v1/employees/{employee_id}/time_clocks/{id} — 打刻の取得

概要 指定した従業員・指定した打刻の詳細情報を返します。

### パラメータ

- company_id*: integer - 事業所ID
- employee_id* (path): integer - 従業員ID
- id* (path): integer - 打刻ID

### レスポンス

POST /api/v1/employees/{employee_id}/time_clocks と同じ

## GET /api/v1/employees/{employee_id}/time_clocks/available_types — 打刻可能種別の取得

概要 指定した従業員・日付の打刻可能種別と打刻基準日を返します。 例: すでに出勤した状態だと、休憩開始、退勤が配列で返ります。

### パラメータ

- company_id*: integer - 事業所ID
- date: string(date) - 従業員情報を取得したい年月日(YYYY-MM-DD)(例:2018-08-01)(デフォルト：当日)
- employee_id* (path): integer - 従業員ID

### レスポンス

- available_types: array[string] - 打刻可能種別(clock_in:出勤, break_begin:休憩開始, break_end:休憩終了, clock_out:退勤)
- base_date: string(date) - 打刻基準日

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
