# API リファレンス索引

`freee_api_*` ツールの service ごとに、`references/` 内の各リファレンスを
「ファイル名 [行範囲] — 内容」の形式で列挙する。
目的の API が分かっている場合はここからファイルを特定し、分からない場合は
`references/` 全体をキーワード検索する。

`L120-185` のような行範囲が付いたものは、小さいタグを1ファイルに束ねたもの。
ファイル全体ではなく、その範囲だけを読む（Read なら offset=120, limit=66）。

このファイルは `scripts/generate-references.ts` が自動生成する（手編集しないこと）。

## accounting - freee会計

- accounting-misc.md L3-23 — 決算書表示名
- accounting-account-items.md — 勘定科目
- accounting-misc.md L25-66 — 申請経路
- accounting-approval-requests.md — 各種申請
- accounting-misc.md L68-107 — 連携サービス
- accounting-misc.md L109-145 — 事業所
- accounting-deals.md — 取引（収入・支出）
- accounting-misc.md L147-175 — 経費申請の金額の自動計算
- accounting-misc.md L177-250 — 経費精算の外貨
- accounting-misc.md L252-313 — Expense application forms
- accounting-expense-application-line-templates.md — 経費科目
- accounting-expense-applications.md — 経費精算
- accounting-misc.md L315-341 — 固定資産台帳
- accounting-misc.md L343-378 — 総勘定元帳
- accounting-misc.md L380-425 — 請求書
- accounting-items.md — 品目
- accounting-journals.md — 仕訳帳
- accounting-manual-journals.md — 振替伝票
- accounting-partners.md — 取引先
- accounting-payment-requests.md — 支払依頼
- accounting-misc.md L427-485 — 取引（収入・支出）の支払行
- accounting-purchase-requests.md — 購買申請
- accounting-misc.md L487-529 — 見積書
- accounting-misc.md L531-626 — ファイルボックス（証憑ファイル）
- accounting-misc.md L628-731 — 取引（収入・支出）の+更新
- accounting-sections.md — 部門
- accounting-segment-tags.md — セグメントタグ
- accounting-misc.md L733-754 — フォーム用選択項目情報
- accounting-misc.md L756-853 — メモタグ
- accounting-misc.md L855-900 — 税区分
- accounting-transfers.md — 取引（振替）
- accounting-trial-balance.md — 試算表
- accounting-user-matchers.md — 自動登録ルール
- accounting-users.md — ユーザー
- accounting-wallet-txns.md — 口座明細
- accounting-walletables.md — 口座

## hr - freee人事労務

- hr-misc.md L3-40 — 申請経路の操作
- hr-attendance-summaries.md — 勤怠情報の月次サマリの操作
- hr-attendances.md — 勤怠の操作
- hr-misc.md L42-82 — 賞与明細の操作
- hr-misc.md L84-137 — 従業員の銀行口座の操作
- hr-misc.md L139-191 — 従業員の基本給の操作
- hr-misc.md L193-217 — 従業員のカスタム項目の操作
- hr-employee-dependents.md — 従業員の家族情報の操作
- hr-misc.md L219-291 — 従業員の健康保険の操作
- hr-misc.md L293-356 — 従業員の厚生年金保険の操作
- hr-misc.md L358-436 — 従業員の姓名・住所などの操作
- hr-misc.md L438-456 — 従業員の特別休暇の操作
- hr-employees.md — 従業員の操作
- hr-misc.md L458-503 — 所属の操作
- hr-misc.md L505-519 — ログインユーザーの取得
- hr-monthly-attendance-closing-requests.md — 月次勤怠締め申請の操作
- hr-overtime-requests.md — 残業申請の操作
- hr-paid-leave-requests.md — 有給休暇申請の操作
- hr-misc.md L521-584 — 給与明細の操作
- hr-misc.md L586-653 — 役職の操作
- hr-misc.md L655-726 — 部門の操作
- hr-special-holiday-requests.md — 特別休暇申請の操作
- hr-misc.md L728-794 — タイムレコーダー(打刻)機能の操作
- hr-misc.md L796-838 — 勤怠タグサマリの操作
- hr-misc.md L840-893 — 勤怠タグの操作
- hr-work-time-correction-requests.md — 勤務時間修正申請の操作
- hr-year-end-adjustments.md — 年末調整の操作

## invoice - freee請求書

- invoice-delivery-slips.md — 納品書
- invoice-invoices.md — 請求書
- invoice-payment-notices.md — 支払通知書
- invoice-purchase-orders.md — 発注書
- invoice-quotations.md — 見積書
- invoice-receipts.md — 領収書

## pm - freee工数管理

- pm-misc.md L3-22 — DailyAttendances
- pm-misc.md L24-62 — LaborBudgets
- pm-misc.md L64-79 — Partners
- pm-misc.md L81-100 — People
- pm-misc.md L102-117 — ProjectTagGroups
- pm-projects.md — Projects
- pm-misc.md L119-134 — SalesOrderStatuses
- pm-misc.md L136-151 — Teams
- pm-misc.md L153-168 — UnitCosts
- pm-misc.md L170-181 — ログインユーザー
- pm-misc.md L183-205 — 工数入力可能なプロジェクト
- pm-misc.md L207-222 — WorkloadTagGroups
- pm-misc.md L224-315 — Workloads

## sm - freee販売

- sm-advance-receipts.md — 前受金
- sm-businesses.md — 案件
- sm-cost-budgets.md — 原価予算
- sm-deliveries.md — 納品
- sm-misc.md L3-102 — 関連マスタ
- sm-misc.md L104-250 — その他原価
- sm-periodic-sales.md — 定期売上
- sm-procurements.md — 仕入
- sm-purchase-orders.md — 発注
- sm-quotations.md — 見積
- sm-sales-orders.md — 受注
- sm-sales-schedules.md — 売上予定
- sm-sales.md — 売上

## it_management - freeeIT管理

- it-management-misc.md L3-145 — application_accounts
- it-management-misc.md L147-197 — application_masters
- it-management-misc.md L199-281 — applications
- it-management-misc.md L283-405 — asset_attributes
- it-management-misc.md L407-499 — asset_categories
- it-management-misc.md L501-605 — asset_locations
- it-management-misc.md L607-723 — asset_members
- it-management-misc.md L725-816 — asset_statuses
- it-management-misc.md L818-968 — assets
- it-management-misc.md L970-1033 — custom_application_masters
- it-management-misc.md L1035-1151 — departments
- it-management-misc.md L1153-1277 — employment_types
- it-management-misc.md L1279-1388 — guests
- it-management-misc.md L1390-1562 — members
- it-management-misc.md L1564-1665 — positions
- it-management-misc.md L1667-1771 — product_companies
- it-management-misc.md L1773-1877 — system_account_owners

## fixed_asset_management - freee固定資産

- fixed-asset-management-fixed-assets.md — fixed_assets

## receivable_management - freee債権管理

- receivable-management-allocations.md — receivable_management_allocations
- receivable-management-misc.md L3-65 — receivable_management_incoming_payments
- receivable-management-misc.md L67-166 — receivable_management_receivables
- receivable-management-misc.md L168-191 — receivable_management_usages

## partner_management - freee業務委託管理

- partner-management-misc.md L3-57 — partner_management_orderer_company_users
- partner-management-misc.md L59-79 — partner_management_orderer_sections
- partner-management-misc.md L81-155 — partner_management_orderer_partners
- partner-management-misc.md L157-177 — partner_management_orderer_project_business_partners
- partner-management-misc.md L179-199 — partner_management_orderer_project_company_users
- partner-management-misc.md L201-224 — partner_management_orderer_project_partners
- partner-management-misc.md L226-278 — partner_management_orderer_projects
- partner-management-misc.md L280-300 — partner_management_orderer_task_delivery_data_custom_fields
- partner-management-misc.md L302-322 — partner_management_orderer_task_line_items_custom_fields
- partner-management-partner-management-orderer-task-line-items.md — partner_management_orderer_task_line_items
- partner-management-misc.md L324-368 — partner_management_orderer_task_order_approval_flows
- partner-management-partner-management-orderer-tasks.md — partner_management_orderer_tasks

## survey - freeeサーベイ

- survey-surveys.md — ⚠ freee-mcp（リモート版） 限定 / survey

## launch - freee開業

- launch-kaigyo-application.md — ⚠ freee-mcp（リモート版） 限定 / launch_kaigyo_application

## employee_evaluation - 人事評価

- employee-evaluation-evaluation-results.md — ⚠ freee-mcp（リモート版） 限定 / employee_evaluation

## tax_return - freee申告

- tax-return-corporate.md — tax_return_corporate
