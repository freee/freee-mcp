# API リファレンス索引

`freee_api_*` ツールの service ごとに、`references/` 内の各リファレンスを
「ファイル名 — 内容」の形式で列挙する。
目的の API が分かっている場合はここからファイルを特定し、分からない場合は
`references/` 全体をキーワード検索する。

このファイルは `scripts/generate-references.ts` が自動生成する（手編集しないこと）。

## accounting - freee会計

- accounting-account-groups.md — 決算書表示名
- accounting-account-items.md — 勘定科目
- accounting-approval-flow-routes.md — 申請経路
- accounting-approval-requests.md — 各種申請
- accounting-banks.md — 連携サービス
- accounting-companies.md — 事業所
- accounting-deals.md — 取引（収入・支出）
- accounting-expense-application-line-templates.md — 経費科目
- accounting-expense-applications.md — 経費精算
- accounting-fixed-assets.md — 固定資産台帳
- accounting-general-ledgers.md — 総勘定元帳
- accounting-invoices.md — 請求書
- accounting-items.md — 品目
- accounting-journals.md — 仕訳帳
- accounting-manual-journals.md — 振替伝票
- accounting-partners.md — 取引先
- accounting-payment-requests.md — 支払依頼
- accounting-payments.md — 取引（収入・支出）の支払行
- accounting-purchase-requests.md — 購買申請
- accounting-quotations.md — 見積書
- accounting-receipts.md — ファイルボックス（証憑ファイル）
- accounting-renews.md — 取引（収入・支出）の+更新
- accounting-sections.md — 部門
- accounting-segment-tags.md — セグメントタグ
- accounting-selectables.md — フォーム用選択項目情報
- accounting-tags.md — メモタグ
- accounting-taxes.md — 税区分
- accounting-transfers.md — 取引（振替）
- accounting-trial-balance.md — 試算表
- accounting-user-matchers.md — 自動登録ルール
- accounting-users.md — ユーザー
- accounting-wallet-txns.md — 口座明細
- accounting-walletables.md — 口座

## hr - freee人事労務

- hr-approval-flow-routes.md — 申請経路の操作
- hr-attendance-summaries.md — 勤怠情報の月次サマリの操作
- hr-attendances.md — 勤怠の操作
- hr-bonus-statements.md — 賞与明細の操作
- hr-employee-bank-accounts.md — 従業員の銀行口座の操作
- hr-employee-base-pay.md — 従業員の基本給の操作
- hr-employee-custom-fields.md — 従業員のカスタム項目の操作
- hr-employee-dependents.md — 従業員の家族情報の操作
- hr-employee-health-insurance.md — 従業員の健康保険の操作
- hr-employee-pension-insurance.md — 従業員の厚生年金保険の操作
- hr-employee-profiles.md — 従業員の姓名・住所などの操作
- hr-employee-special-leaves.md — 従業員の特別休暇の操作
- hr-employees.md — 従業員の操作
- hr-groups.md — 所属の操作
- hr-login-user.md — ログインユーザーの取得
- hr-monthly-attendance-closing-requests.md — 月次勤怠締め申請の操作
- hr-overtime-requests.md — 残業申請の操作
- hr-paid-holiday-requests.md — 有給申請
- hr-paid-leave-requests.md — 有給休暇申請の操作
- hr-payroll-statements.md — 給与明細の操作
- hr-positions.md — 役職の操作
- hr-sections.md — 部門の操作
- hr-special-holiday-requests.md — 特別休暇申請の操作
- hr-time-clocks.md — タイムレコーダー(打刻)機能の操作
- hr-work-record-summaries.md — 勤怠タグサマリの操作
- hr-work-record-tags.md — 勤怠タグの操作
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

- pm-labor-budgets.md — LaborBudgets
- pm-partners.md — Partners
- pm-people.md — People
- pm-projects.md — Projects
- pm-teams.md — Teams
- pm-unit-costs.md — UnitCosts
- pm-users.md — ログインユーザー
- pm-workload-tag-groups.md — WorkloadTagGroups
- pm-workloads.md — Workloads

## sm - freee販売

- sm-advance-receipts.md — 前受金
- sm-businesses.md — 案件
- sm-cost-budgets.md — 原価予算
- sm-deliveries.md — 納品
- sm-master.md — 関連マスタ
- sm-other-costs.md — その他原価
- sm-periodic-sales.md — 定期売上
- sm-procurements.md — 仕入
- sm-purchase-orders.md — 発注
- sm-quotations.md — 見積
- sm-sales-orders.md — 受注
- sm-sales-schedules.md — 売上予定
- sm-sales.md — 売上

## it_management - freeeIT管理

- it-management-application-account.md — application_accounts
- it-management-assets.md — assets
- it-management-members.md — members

## partner_management - freee業務委託管理

- partner-management-orderer-company-users.md — partner_management_orderer_company_users
- partner-management-orderer-sections.md — partner_management_orderer_sections
- partner-management-partner-management-orderer-partners.md — partner_management_orderer_partners

## survey - freeeサーベイ

- survey-employee-evaluation-evaluation-results.md — ⚠ freee-mcp（リモート版） 限定 / evaluation_results
- survey-launch-kaigyo-application.md — ⚠ freee-mcp（リモート版） 限定 / launch_kaigyo_application
- survey-surveys.md — ⚠ freee-mcp（リモート版） 限定 / survey

## tax_return - freee申告

- tax-return-corporate.md — tax_return_corporate
