# Users

ユーザー

## GET /api/1/users — 事業所に所属するユーザー一覧の取得

概要 事業所に所属するユーザー一覧を取得する

### パラメータ

- company_id*: integer(int64) - 事業所ID
- limit: integer(int64) - 取得レコードの件数 (デフォルト: 50, 最小: 1, 最大: 3000)

### レスポンス

- users*: array[object]

## GET /api/1/users/me — ログインユーザーの取得

概要 ログインユーザーを取得する

### パラメータ

- companies: boolean - 取得情報にユーザーが所属する事業所一覧を含める (選択肢: true, false)
- advisor: boolean - 取得情報に事業がアドバイザー事象所の場合は事業所毎の一意なプロフィールIDを含める (選択肢: true, false)

### レスポンス

- user*: object

## PUT /api/1/users/me — ログインユーザーの更新

概要 ログインユーザーを更新する

### リクエストボディ

- display_name: string - 表示名 (20文字以内) 例: `山田太郎`
- first_name: string - 氏名（名） (20文字以内) 例: `太郎`
- last_name: string - 氏名（姓） (20文字以内) 例: `山田`
- first_name_kana: string - 氏名（カナ・名） (20文字以内) 例: `タロウ`
- last_name_kana: string - 氏名（カナ・姓） (20文字以内) 例: `ヤマダ`

### レスポンス

- user: object

## GET /api/1/users/capabilities — ログインユーザーの権限の取得

概要 ログインユーザーの権限を取得する

### パラメータ

- company_id*: integer(int64) - 事業所ID

### レスポンス

レスポンスの各キーは以下の項目と対応しています。

詳細は https://support.freee.co.jp/hc/ja/articles/210265673 を参照してください。

キー | 対応する項目

wallet_txns | 自動で経理 / 取得した明細

deals | 取引

transfers | 口座振替

docs | 見積書・納品書・請求書・領収書・発注書

doc_postings | (請求書の)郵送

receipts | ファイルボックス

receipt_stream_editor | 連続取引登録

spreadsheets | エクセルインポート

expense_applications | 経費精算

expense_application_sync_payroll | 経費精算の給与連携

payment_requests | 支払依頼

approval_requests | 各種申請

reports | 収益 / 費用レポート

reports_income_expense | 損益レポート

reports_receivables | 入金管理レポート

reports_payables | 支払管理レポート(一括振込ファイルを含む)

reports_cash_balance | 現預金レポート/資金繰りレポート

reports_managements_planning | 経営プランニング

reports_managements_navigation | 経営ナビゲーション

reports_custom_reports_aggregate | カスタムレポート

reports_pl | 損益計算書(月次推移/試算表)

reports_bs | 貸借対照表(月次推移/試算表)

reports_general_ledgers | 総勘定元帳

reports_journals | 仕訳帳

manual_journals | 振替伝票

fixed_assets | 固定資産台帳

inventory_refreshes | 在庫棚卸

biz_allocations | 家事按分

payment_records | 支払調書

annual_reports | 決算書、確定申告書類

tax_reports | 消費税区分別表・消費税集計表

consumption_entries | 消費税申告書

tax_return | 連携用データ

account_item_statements | 勘定科目内訳明細書

month_end | 月締め

year_end | 年度締め

walletables | 口座 / 口座の同期

companies | 事業所の設定

invitations | メンバー招待

access_controls | 権限管理

sign_in_logs | ログイン履歴

user_attribute_logs | ユーザー更新履歴

app_role_logs | 権限変更履歴

txn_relationship_logs | 仕訳関連履歴

backups | バックアップ

opening_balances | 開始残高の設定

system_conversion | 乗り換え設定

resets | リセット

partners | 取引先

items | 品目

sections | 部門

tags | メモタグ

account_items | 勘定科目

taxes | 税区分

payroll_item_sets | 給与連携の設定

user_matchers | 自動登録ルール

deal_templates | 取引テンプレート

manual_journal_templates | 振替伝票テンプレート

cost_allocations | 部門配賦

approval_flow_routes | 承認経路

expense_application_templates | 経費科目

request_forms | 申請フォーム

system_messages_for_admin | 管理者向けお知らせ

company_internal_announcements | アナウンス

doc_change_logs | 受発注書類変更履歴

workflows | 仕訳承認

oauth_applications | アプリ利用

oauth_authorizations | アプリ認可

bank_accountant_staff_users | アドバイザー事業所内でのメンバー管理
- wallet_txns*: object
- deals*: object
- transfers*: object
- docs*: object
- doc_postings*: object
- receipts*: object
- receipt_stream_editor*: object
- spreadsheets*: object
- expense_applications*: object
- expense_application_sync_payroll*: object
- payment_requests*: object
- approval_requests*: object
- reports*: object
- reports_income_expense*: object
- reports_receivables*: object
- reports_payables*: object
- reports_cash_balance*: object
- reports_managements_planning*: object
- reports_managements_navigation*: object
- reports_custom_reports_aggregate*: object
- reports_pl*: object
- reports_bs*: object
- reports_general_ledgers*: object
- reports_journals*: object
- manual_journals*: object
- fixed_assets*: object
- inventory_refreshes*: object
- biz_allocations*: object
- payment_records*: object
- annual_reports*: object
- tax_reports*: object
- consumption_entries*: object
- tax_return*: object
- account_item_statements*: object
- month_end*: object
- year_end*: object
- walletables*: object
- companies*: object
- invitations*: object
- access_controls*: object
- sign_in_logs*: object
- user_attribute_logs*: object
- app_role_logs*: object
- txn_relationship_logs*: object
- backups*: object
- opening_balances*: object
- system_conversion*: object
- resets*: object
- partners*: object
- items*: object
- sections*: object
- tags*: object
- account_items*: object
- taxes*: object
- payroll_item_sets*: object
- user_matchers*: object
- deal_templates*: object
- manual_journal_templates*: object
- cost_allocations*: object
- approval_flow_routes*: object
- expense_application_templates*: object
- request_forms*: object
- system_messages_for_admin*: object
- company_internal_announcements*: object
- doc_change_logs*: object
- workflows*: object
- oauth_applications*: object
- oauth_authorizations*: object
- bank_accountant_staff_users*: object
