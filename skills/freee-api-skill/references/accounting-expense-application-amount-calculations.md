# Expense application amount calculations

経費申請の金額の自動計算

## POST /api/1/expense_applications/amount_calculations — 経費申請の金額の自動計算

概要 指定した経費科目の金額計算設定にカスタム申請項目の入力値を適用し、経費申請の明細行の金額を計算します。計算するだけで、経費申請も計算結果も保存されません。

### リクエストボディ*

- company_id*: integer(int64) - 事業所ID 例: `1` (最小: 1)
- expense_application_line_template_id*: integer(int64) - 金額計算設定を持つ経費科目のID 例: `101` (最小: 1)
- custom_values*: array[object] - カスタム申請項目の入力値。計算式が参照する項目を含めてください
- applicant*: object - 計算対象の申請者。申請者はアクセストークンのユーザーに固定され、指定できるのは所属部門だけです。所属部門と役職が金額計算ルールの条件判定に使われます
  - group_id*: integer(int64) - 申請者 (アクセストークンのユーザー) の所属部門ID (部門に所属しない場合は null)。申請者が所属していない部門を指定した場合は 400 になります 例: `2` (最小: 1)

### レスポンス

- calculated_amount*: integer(int64) - 計算式によって算出された金額
- applied_rule*: object - 適用された金額計算ルール。経費科目APIの amount_calculation_setting と同じ語彙です
- evaluated_as*: object - 金額計算の条件判定に用いた申請者の所属情報
