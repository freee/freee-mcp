# Users

ユーザー

## GET /api/1/users — 事業所に所属するユーザー一覧の取得

概要 指定した事業所に所属するユーザーの一覧を取得する 事業所のメンバーのユーザーID・メールアドレス・氏名を確認できます。取引や申請などの担当者（user_id）を指定する前に、対象ユーザーのIDを調べる用途で使用します。

注意点
各ユーザーの権限は返りません。ログインユーザー自身の権限を確認する場合は「ログインユーザーの権限の取得 (/api/1/users/capabilities)」を使用してください。

### パラメータ

- company_id*: integer(int64) - 事業所ID
- limit: integer(int64) - 取得レコードの件数 (デフォルト: 50, 最小: 1, 最大: 3000)

### レスポンス

- users*: array[object]

## GET /api/1/users/me — ログインユーザーの取得

概要 アクセストークンに紐づくログインユーザーの情報を取得する API連携アプリの認可後に、操作しているユーザー本人の情報（ユーザーID・メールアドレス・氏名）や、そのユーザーが所属する事業所の一覧を確認する用途で使用します。

注意点
companiesパラメータを指定しない場合は、ユーザーの基本情報のみが返ります（レスポンスにcompaniesは含まれません）。 advisorパラメータはcompaniesと同時に指定してください。companiesを指定せずにadvisorを指定した場合は400エラーになります。 companies・advisorはパラメータの指定有無で判定されます。falseを指定した場合もtrueと同様に扱われるため、事業所一覧が不要な場合はパラメータ自体を省略してください。

### パラメータ

- companies: boolean - ユーザーが所属する事業所一覧をレスポンスに含めるかどうか (true: 含める、未指定: 含めない)。指定有無で判定されるため、falseを指定した場合もtrueと同様に扱われます。 (選択肢: true, false)
- advisor: boolean - 事業所ごとのアドバイザープロファイルID (advisor_id) をレスポンスの事業所一覧に含めるかどうか (true: 含める、未指定: 含めない)。companiesと同時に指定してください。指定有無で判定されるため、falseを指定した場合もtrueと同様に扱われます。 (選択肢: true, false)

### レスポンス

- user*: object

## PUT /api/1/users/me — ログインユーザーの更新

概要 アクセストークンに紐づくログインユーザーの基本情報（表示名・氏名・カナ氏名）を更新する

注意点
更新できるのはログインユーザー自身の情報のみです。他のユーザーの情報は更新できません（ユーザーIDの指定はありません）。 リクエストボディでキーを省略した項目は更新されません。項目を未設定に戻す場合は空文字を指定してください。

### リクエストボディ

- display_name: string - 表示名 (20文字以内)。キーを省略した場合は更新されません。空文字を指定すると未設定になります。 例: `山田太郎`
- first_name: string - 氏名（名） (20文字以内)。キーを省略した場合は更新されません。空文字を指定すると未設定になります。 例: `太郎`
- last_name: string - 氏名（姓） (20文字以内)。キーを省略した場合は更新されません。空文字を指定すると未設定になります。 例: `山田`
- first_name_kana: string - 氏名（カナ・名） (20文字以内)。キーを省略した場合は更新されません。空文字を指定すると未設定になります。 例: `タロウ`
- last_name_kana: string - 氏名（カナ・姓） (20文字以内)。キーを省略した場合は更新されません。空文字を指定すると未設定になります。 例: `ヤマダ`

### レスポンス

GET /api/1/users/me と同じ

## GET /api/1/users/capabilities — ログインユーザーの権限の取得

概要 指定した事業所におけるログインユーザーの権限を取得する 機能（レスポンスの各キー）ごとに、閲覧 (read)・作成 (create)・更新 (update)・削除 (destroy) などの操作が許可されているかどうかがbooleanで返ります。APIで取引や申請などを操作する前に、必要な権限があるかを確認する用途で使用します。

注意点
ログインユーザーが所属していない事業所のcompany_idを指定した場合は404エラーになります。 一部の機能では、read/create/update/destroy以外のキー（例: 操作可能な範囲を表すallowed_target、操作可否を表すwrite/confirm）が返ります。各機能のスキーマを参照してください。

### パラメータ

- company_id*: integer(int64) - 事業所ID

### レスポンス

レスポンスの各キーは以下の項目と対応しています。

詳細は https://support.freee.co.jp/hc/ja/articles/210265673 を参照してください。

キー | 対応する項目

wallet_txns | 自動で経理 / 取得した明細

deals | 取引

deal_linkage | 取引連携（freee請求書など、freee会計以外から連携させる取引）

transfers | 口座振替

docs | 見積書・納品書・請求書・領収書・発注書

doc_postings | (請求書の)郵送

receipts | ファイルボックス

receipt_stream_editor | 連続取引登録

spreadsheets | エクセルインポート

expense_applications | 経費精算

expense_application_sync_payroll | 経費精算の給与連携

manage_bulk_expense_application_approvals | 経費精算の一括承認

payment_requests | 支払依頼

payment_request_templates | 支払テンプレート

approval_requests | 各種申請

purchase_requests | 購買申請

suspense_payments | 仮払金

reports | 収益 / 費用レポート

reports_income_expense | 損益レポート

reports_receivables | 入金管理レポート

reports_payables | 支払管理レポート(一括振込ファイルを含む)

reports_purchase_budgets | 購買進捗モニター

reports_cash_balance | 現預金レポート/資金繰りレポート

reports_managements_planning | 経営プランニング

reports_managements_navigation | 経営ナビゲーション

reports_managements_introduction | 経営プランニング・経営ナビゲーションの紹介ページ

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

consolidation | 連結会計

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

entries_reviews | 記帳レビュー

freee_cards_stream | freeeカードで経理

proxy_application_settings | 代理申請の設定

workflows | 仕訳承認

oauth_applications | アプリ利用

oauth_authorizations | アプリ認可

division_tag_1 | セグメント1

division_tag_2 | セグメント2

division_tag_3 | セグメント3

currencies | 外貨（通貨の設定）

bank_accountant_staff_users | アドバイザー事業所内でのメンバー管理
- wallet_txns*: object
- deals*: object
- deal_linkage*: object
- transfers*: object
- docs*: object
- doc_postings*: object
- receipts*: object
- receipt_stream_editor*: object
- spreadsheets*: object
- expense_applications*: object
- expense_application_sync_payroll*: object
- manage_bulk_expense_application_approvals*: object
- payment_requests*: object
- payment_request_templates*: object
- approval_requests*: object
- purchase_requests*: object
- suspense_payments*: object
- reports*: object
- reports_income_expense*: object
- reports_receivables*: object
- reports_payables*: object
- reports_purchase_budgets*: object
- reports_cash_balance*: object
- reports_managements_planning*: object
- reports_managements_navigation*: object
- reports_managements_introduction*: object
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
- consolidation*: object
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
- division_tag_1*: object
- division_tag_2*: object
- division_tag_3*: object
- currencies*: object
- entries_reviews*: object
- freee_cards_stream*: object
- proxy_application_settings*: object
- bank_accountant_staff_users*: object
