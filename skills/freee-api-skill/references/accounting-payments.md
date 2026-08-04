# Payments

取引（収入・支出）の支払行

## POST /api/1/deals/{id}/payments — 取引（収入・支出）の支払行の作成

概要 指定した事業所の取引（収入・支出）の支払行を作成する

定義
issue_date : 発生日 due_date : 支払期日 amount : 金額 due_amount : 支払残額 type income : 収入 expense : 支出 details : 取引の明細行 renews : 取引の+更新行 payments : 取引の支払行 from_walletable_type bank_account : 銀行口座 credit_card : クレジットカード wallet : 現金 private_account_item : プライベート資金（法人の場合は役員借入金もしくは役員借入金、個人の場合は事業主貸もしくは事業主借）

### パラメータ

- id* (path): integer(int64) - 取引ID

### リクエストボディ*

- company_id*: integer(int64) - 事業所ID 例: `1` (最小: 1)
- date*: string - 支払日 例: `2019-12-17`
- from_walletable_type*: string - 口座区分 (銀行口座: bank_account, クレジットカード: credit_card, 現金: wallet, プライベート資金: private_account_item)：payments指定時は必須 (選択肢: bank_account, credit_card, wallet, private_account_item) 例: `bank_account`
- from_walletable_id*: integer(int64) - 口座ID（from_walletable_typeがprivate_account_itemの場合は勘定科目ID）：payments指定時は必須 例: `1` (最小: 1)
- amount*: integer(int64) - 金額 例: `10000` (最小: 1, 最大: 9223372036854776000)

### レスポンス

- deal*: object

## PUT /api/1/deals/{id}/payments/{payment_id} — 取引（収入・支出）の支払行の更新

概要 指定した事業所の取引（収入・支出）の支払行を更新する

定義
issue_date : 発生日 due_date : 支払期日 amount : 金額 due_amount : 支払残額 type income : 収入 expense : 支出 details : 取引の明細行 renews : 取引の+更新行 payments : 取引の支払行 from_walletable_type bank_account : 銀行口座 credit_card : クレジットカード wallet : 現金 private_account_item : プライベート資金（法人の場合は役員借入金もしくは役員借入金、個人の場合は事業主貸もしくは事業主借）

### パラメータ

- id* (path): integer(int64) - 取引ID
- payment_id* (path): integer(int64) - 決済ID

### リクエストボディ*

POST /api/1/deals/{id}/payments と同じ

### レスポンス

POST /api/1/deals/{id}/payments と同じ

## DELETE /api/1/deals/{id}/payments/{payment_id} — 取引（収入・支出）の支払行の削除

概要 指定した事業所の取引（収入・支出）の支払行を削除する

定義
issue_date : 発生日 due_date : 支払期日 amount : 金額 due_amount : 支払残額 type income : 収入 expense : 支出 details : 取引の明細行

### パラメータ

- id* (path): integer(int64) - 取引ID
- payment_id* (path): integer(int64) - 決済ID
- company_id*: integer(int64) - 事業所ID
