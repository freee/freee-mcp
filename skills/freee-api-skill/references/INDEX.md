# API リファレンス索引

`freee_api_*` ツールの service と、`references/` 内の各リファレンスの対応表。
目的の API が分かっている場合はこの表からファイルを特定し、分からない場合は
`references/` 全体をキーワード検索する。

このファイルは `scripts/generate-references.ts` が自動生成する（手編集しないこと）。

## accounting - freee会計

| ファイル | 内容 | 主なパス |
| --- | --- | --- |
| `accounting-account-groups.md` | 決算書表示名 | `/api/1/account_groups` |
| `accounting-account-items.md` | 勘定科目 | `/api/1/account_items`, `/api/1/account_items/{id}`, `/api/1/account_items/code/upsert` |
| `accounting-approval-flow-routes.md` | 申請経路 | `/api/1/approval_flow_routes`, `/api/1/approval_flow_routes/{id}` |
| `accounting-approval-requests.md` | 各種申請 | `/api/1/approval_requests`, `/api/1/approval_requests/{id}`, `/api/1/approval_requests/forms` ほか2件 |
| `accounting-banks.md` | 連携サービス | `/api/1/banks`, `/api/1/banks/{id}` |
| `accounting-companies.md` | 事業所 | `/api/1/companies`, `/api/1/companies/{id}` |
| `accounting-deals.md` | 取引（収入・支出） | `/api/1/deals`, `/api/1/deals/{id}` |
| `accounting-expense-application-line-templates.md` | 経費科目 | `/api/1/expense_application_line_templates`, `/api/1/expense_application_line_templates/{id}` |
| `accounting-expense-applications.md` | 経費精算 | `/api/1/expense_applications`, `/api/1/expense_applications/{id}`, `/api/1/expense_applications/{id}/actions` ほか1件 |
| `accounting-fixed-assets.md` | 固定資産台帳 | `/api/1/fixed_assets` |
| `accounting-general-ledgers.md` | 総勘定元帳 | `/api/1/reports/general_ledgers` |
| `accounting-invoices.md` | 請求書 | `/api/1/invoices`, `/api/1/invoices/{id}` |
| `accounting-items.md` | 品目 | `/api/1/items`, `/api/1/items/{id}`, `/api/1/items/code/upsert` |
| `accounting-journals.md` | 仕訳帳 | `/api/1/journals`, `/api/1/journals/reports/{id}/status`, `/api/1/journals/reports/{id}/download` |
| `accounting-manual-journals.md` | 振替伝票 | `/api/1/manual_journals`, `/api/1/manual_journals/{id}` |
| `accounting-partners.md` | 取引先 | `/api/1/partners`, `/api/1/partners/{id}`, `/api/1/partners/code/{code}` ほか1件 |
| `accounting-payment-requests.md` | 支払依頼 | `/api/1/payment_requests`, `/api/1/payment_requests/{id}`, `/api/1/payment_requests/{id}/actions` |
| `accounting-payments.md` | 取引（収入・支出）の支払行 | `/api/1/deals/{id}/payments`, `/api/1/deals/{id}/payments/{payment_id}` |
| `accounting-purchase-requests.md` | 購買申請 | `/api/1/purchase_requests`, `/api/1/purchase_requests/{id}`, `/api/1/purchase_requests/forms` ほか2件 |
| `accounting-quotations.md` | 見積書 | `/api/1/quotations`, `/api/1/quotations/{id}` |
| `accounting-receipts.md` | ファイルボックス（証憑ファイル） | `/api/1/receipts`, `/api/1/receipts/{id}`, `/api/1/receipts/{id}/download` |
| `accounting-renews.md` | 取引（収入・支出）の+更新 | `/api/1/deals/{id}/renews`, `/api/1/deals/{id}/renews/{renew_id}` |
| `accounting-sections.md` | 部門 | `/api/1/sections`, `/api/1/sections/{id}`, `/api/1/sections/code/upsert` |
| `accounting-segment-tags.md` | セグメントタグ | `/api/1/segments/{segment_id}/tags`, `/api/1/segments/{segment_id}/tags/{id}`, `/api/1/segments/{segment_id}/tags/code/upsert` |
| `accounting-selectables.md` | フォーム用選択項目情報 | `/api/1/forms/selectables` |
| `accounting-tags.md` | メモタグ | `/api/1/tags`, `/api/1/tags/{id}` |
| `accounting-taxes.md` | 税区分 | `/api/1/taxes/codes`, `/api/1/taxes/codes/{code}`, `/api/1/taxes/companies/{company_id}` |
| `accounting-transfers.md` | 取引（振替） | `/api/1/transfers`, `/api/1/transfers/{id}` |
| `accounting-trial-balance.md` | 試算表 | `/api/1/reports/trial_bs`, `/api/1/reports/trial_cr`, `/api/1/reports/trial_pl` ほか14件 |
| `accounting-user-matchers.md` | 自動登録ルール | `/api/1/user_matchers`, `/api/1/user_matchers/{id}` |
| `accounting-users.md` | ユーザー | `/api/1/users`, `/api/1/users/me`, `/api/1/users/capabilities` |
| `accounting-wallet-txns.md` | 口座明細 | `/api/1/wallet_txns`, `/api/1/wallet_txns/{id}` |
| `accounting-walletables.md` | 口座 | `/api/1/walletables`, `/api/1/walletables/{type}/{id}` |

## hr - freee人事労務

| ファイル | 内容 | 主なパス |
| --- | --- | --- |
| `hr-approval-flow-routes.md` | 申請経路の操作 | `/api/v1/approval_flow_routes`, `/api/v1/approval_flow_routes/{id}` |
| `hr-attendance-summaries.md` | 勤怠情報の月次サマリの操作 | `/api/v1/employees/{employee_id}/work_record_summaries/{year}/{month}` |
| `hr-attendances.md` | 勤怠の操作 | `/api/v1/employees/{employee_id}/work_records/{date}` |
| `hr-bonus-statements.md` | 賞与明細の操作 | `/api/v1/bonuses/employee_payroll_statements`, `/api/v1/bonuses/employee_payroll_statements/{employee_id}` |
| `hr-employee-bank-accounts.md` | 従業員の銀行口座の操作 | `/api/v1/employees/{employee_id}/bank_account_rule` |
| `hr-employee-base-pay.md` | 従業員の基本給の操作 | `/api/v1/employees/{employee_id}/basic_pay_rule` |
| `hr-employee-custom-fields.md` | 従業員のカスタム項目の操作 | `/api/v1/employees/{employee_id}/profile_custom_fields` |
| `hr-employee-dependents.md` | 従業員の家族情報の操作 | `/api/v1/employees/{employee_id}/dependent_rules`, `/api/v1/employees/{employee_id}/dependent_rules/bulk_update` |
| `hr-employee-health-insurance.md` | 従業員の健康保険の操作 | `/api/v1/employees/{employee_id}/health_insurance_rule` |
| `hr-employee-pension-insurance.md` | 従業員の厚生年金保険の操作 | `/api/v1/employees/{employee_id}/welfare_pension_insurance_rule` |
| `hr-employee-profiles.md` | 従業員の姓名・住所などの操作 | `/api/v1/employees/{employee_id}/profile_rule` |
| `hr-employee-special-leaves.md` | 従業員の特別休暇の操作 | `/api/v1/employees/{employee_id}/special_holidays` |
| `hr-employees.md` | 従業員の操作 | `/api/v1/employees`, `/api/v1/employees/{id}`, `/api/v1/companies/{company_id}/employees` |
| `hr-groups.md` | 所属の操作 | `/api/v1/employee_group_memberships`, `/api/v1/employees/{employee_id}/group_memberships` |
| `hr-login-user.md` | ログインユーザーの取得 | `/api/v1/users/me` |
| `hr-monthly-attendance-closing-requests.md` | 月次勤怠締め申請の操作 | `/api/v1/approval_requests/monthly_attendances`, `/api/v1/approval_requests/monthly_attendances/{id}`, `/api/v1/approval_requests/monthly_attendances/{id}/actions` |
| `hr-overtime-requests.md` | 残業申請の操作 | `/api/v1/approval_requests/overtime_works`, `/api/v1/approval_requests/overtime_works/{id}`, `/api/v1/approval_requests/overtime_works/setting` ほか1件 |
| `hr-paid-holiday-requests.md` | 有給申請 |  |
| `hr-paid-leave-requests.md` | 有給休暇申請の操作 | `/api/v1/approval_requests/paid_holidays`, `/api/v1/approval_requests/paid_holidays/{id}`, `/api/v1/approval_requests/paid_holidays/{id}/actions` |
| `hr-payroll-statements.md` | 給与明細の操作 | `/api/v1/salaries/employee_payroll_statements`, `/api/v1/salaries/employee_payroll_statements/{employee_id}`, `/api/v1/salaries/employee_payroll_statements/{employee_id}/remark` |
| `hr-positions.md` | 役職の操作 | `/api/v1/positions`, `/api/v1/positions/{id}` |
| `hr-sections.md` | 部門の操作 | `/api/v1/groups`, `/api/v1/groups/{id}` |
| `hr-special-holiday-requests.md` | 特別休暇申請の操作 | `/api/v1/approval_requests/special_holidays`, `/api/v1/approval_requests/special_holidays/{id}`, `/api/v1/approval_requests/special_holidays/{id}/actions` |
| `hr-time-clocks.md` | タイムレコーダー(打刻)機能の操作 | `/api/v1/employees/{employee_id}/time_clocks`, `/api/v1/employees/{employee_id}/time_clocks/{id}`, `/api/v1/employees/{employee_id}/time_clocks/available_types` |
| `hr-work-record-summaries.md` | 勤怠タグサマリの操作 | `/api/v1/employees/{employee_id}/attendance_tag_summaries/{year}/{month}` |
| `hr-work-record-tags.md` | 勤怠タグの操作 | `/api/v1/employees/{employee_id}/attendance_tags`, `/api/v1/employees/{employee_id}/attendance_tags/{date}` |
| `hr-work-time-correction-requests.md` | 勤務時間修正申請の操作 | `/api/v1/approval_requests/work_times`, `/api/v1/approval_requests/work_times/{id}`, `/api/v1/approval_requests/work_times/{id}/actions` |
| `hr-year-end-adjustments.md` | 年末調整の操作 | `/api/v1/yearend_adjustments/{year}/employees`, `/api/v1/yearend_adjustments/{year}/employees/{employee_id}`, `/api/v1/yearend_adjustments/{year}/dependents/{employee_id}` ほか7件 |

## invoice - freee請求書

| ファイル | 内容 | 主なパス |
| --- | --- | --- |
| `invoice-delivery-slips.md` | 納品書 | `/delivery_slips`, `/delivery_slips/{id}`, `/delivery_slips/templates` ほか2件 |
| `invoice-invoices.md` | 請求書 | `/invoices`, `/invoices/{id}`, `/invoices/templates` ほか2件 |
| `invoice-payment-notices.md` | 支払通知書 | `/payment_notices`, `/payment_notices/{id}`, `/payment_notices/templates` ほか2件 |
| `invoice-purchase-orders.md` | 発注書 | `/purchase_orders`, `/purchase_orders/{id}`, `/purchase_orders/templates` ほか2件 |
| `invoice-quotations.md` | 見積書 | `/quotations`, `/quotations/{id}`, `/quotations/templates` ほか2件 |
| `invoice-receipts.md` | 領収書 | `/receipts`, `/receipts/{id}`, `/receipts/templates` ほか2件 |

## pm - freee工数管理

| ファイル | 内容 | 主なパス |
| --- | --- | --- |
| `pm-labor-budgets.md` | LaborBudgets | `/labor_budgets`, `/labor_budgets/projects/{project_id}/people/{person_id}/year_month/{year_month}` |
| `pm-partners.md` | Partners | `/partners` |
| `pm-people.md` | People | `/people` |
| `pm-projects.md` | Projects | `/projects`, `/projects/{id}` |
| `pm-teams.md` | Teams | `/teams` |
| `pm-unit-costs.md` | UnitCosts | `/unit_costs` |
| `pm-users.md` | ログインユーザー | `/users/me` |
| `pm-workload-tag-groups.md` | WorkloadTagGroups | `/workload_tag_groups` |
| `pm-workloads.md` | Workloads | `/workloads`, `/workloads/{id}`, `/workload_summaries` |

## sm - freee販売

| ファイル | 内容 | 主なパス |
| --- | --- | --- |
| `sm-advance-receipts.md` | 前受金 | `/advance_receipts`, `/advance_receipts/{id}`, `/advance_receipts/{id}/reduction` ほか2件 |
| `sm-businesses.md` | 案件 | `/businesses`, `/businesses/{id}`, `/businesses/{id}/close` ほか2件 |
| `sm-cost-budgets.md` | 原価予算 | `/cost_budgets`, `/cost_budgets/{id}`, `/cost_budgets/{id}/cancellation` |
| `sm-deliveries.md` | 納品 | `/deliveries`, `/deliveries/{id}`, `/deliveries/{id}/cancellation` ほか2件 |
| `sm-master.md` | 関連マスタ | `/master/items`, `/master/employees`, `/master/business_phases` ほか3件 |
| `sm-other-costs.md` | その他原価 | `/other_costs`, `/other_costs/{id}`, `/other_costs/{id}/restoration` ほか1件 |
| `sm-periodic-sales.md` | 定期売上 | `/periodic_sales`, `/periodic_sales/{id}`, `/periodic_sales/{id}/cancellation` ほか1件 |
| `sm-procurements.md` | 仕入 | `/procurements`, `/procurements/{id}`, `/procurements/{id}/cancellation` |
| `sm-purchase-orders.md` | 発注 | `/purchase_orders`, `/purchase_orders/{id}`, `/purchase_orders/{id}/cancellation` |
| `sm-quotations.md` | 見積 | `/quotations`, `/quotations/{id}`, `/quotations/{id}/cancellation` ほか1件 |
| `sm-sales-orders.md` | 受注 | `/sales_orders`, `/sales_orders/{id}`, `/sales_orders/{id}/cancellation` |
| `sm-sales-schedules.md` | 売上予定 | `/sales_schedules`, `/sales_schedules/{id}`, `/sales_schedules/{id}/actualization` |
| `sm-sales.md` | 売上 | `/sales`, `/sales/{id}`, `/sales/{id}/cancellation` |

## it_management - freeeIT管理

| ファイル | 内容 | 主なパス |
| --- | --- | --- |
| `it-management-application-account.md` | application_accounts | `/hub/it_management/application_accounts`, `/hub/it_management/application_accounts/{id}` |
| `it-management-assets.md` | assets | `/hub/it_management/assets`, `/hub/it_management/assets/{id}` |
| `it-management-members.md` | members | `/hub/it_management/members`, `/hub/it_management/members/{id}` |

## survey - freeeサーベイ

| ファイル | 内容 | 主なパス |
| --- | --- | --- |
| `survey-launch-kaigyo-application.md` | ⚠ freee-mcp（リモート版） 限定 / launch_kaigyo_application | `/hub/launch/kaigyo_application`, `/hub/launch/kaigyo_application/online_submission_result_messages` |
| `survey-surveys.md` | ⚠ freee-mcp（リモート版） 限定 / survey | `/hub/survey/base_surveys`, `/hub/survey/surveys/{id}`, `/hub/survey/base_surveys/{base_survey_id}/surveys` |
