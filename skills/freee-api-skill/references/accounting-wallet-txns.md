# Wallet txns

口座明細

## GET /api/1/wallet_txns — 口座明細一覧の取得

概要 指定した事業所の口座明細一覧を取得する

定義
amount : 明細金額 due_amount : 取引登録待ち金額 balance : 残高 entry_side income : 入金 expense : 出金 walletable_type bank_account : 銀行口座 credit_card : クレジットカード wallet : その他の決済口座

### パラメータ

- company_id*: integer(int64) - 事業所ID
- walletable_type: string - 口座区分 (銀行口座: bank_account, クレジットカード: credit_card, 現金: wallet) walletable_type、walletable_idは同時に指定が必要です。 (選択肢: bank_account, credit_card, wallet)
- walletable_id: integer(int64) - 口座ID walletable_type、walletable_idは同時に指定が必要です。
- start_date: string - 取引日で絞込：開始日 (yyyy-mm-dd)
- end_date: string - 取引日で絞込：終了日 (yyyy-mm-dd)
- entry_side: string - 入金／出金 (入金: income, 出金: expense) (選択肢: income, expense)
- offset: integer(int64) - 取得レコードのオフセット (デフォルト: 0)
- limit: integer(int64) - 取得レコードの件数 (デフォルト: 20, 最小: 1, 最大: 100)

### レスポンス

- wallet_txns*: array[object]

## POST /api/1/wallet_txns — 口座明細の作成

概要 指定した事業所の口座明細を作成する

定義
amount : 明細金額 due_amount : 取引登録待ち金額 balance : 残高 entry_side income : 入金 expense : 出金 walletable_type bank_account : 銀行口座 credit_card : クレジットカード wallet : その他の決済口座

### リクエストボディ

- entry_side*: string - 入金／出金 (入金: income, 出金: expense) (選択肢: income, expense) 例: `income`
- description: string - 取引内容 例: `取引内容`
- amount*: integer(int64) - 取引金額 例: `5000` (最小: -9223372036854776000, 最大: 9223372036854776000)
- walletable_id*: integer(int64) - 口座ID 例: `1` (最小: 1)
- walletable_type*: string - 口座区分 (銀行口座: bank_account, クレジットカード: credit_card, 現金: wallet) (選択肢: bank_account, credit_card, wallet) 例: `bank_account`
- date*: string - 取引日 (yyyy-mm-dd) 例: `2019-12-17`
- company_id*: integer(int64) - 事業所ID 例: `1` (最小: 1)
- balance: integer(int64) - 残高 (銀行口座等) 例: `10000` (最小: -9223372036854776000, 最大: 9223372036854776000)

### レスポンス

- wallet_txn*: object

## GET /api/1/wallet_txns/{id} — 口座明細の取得

概要 指定した事業所の口座明細を取得する

定義
amount : 明細金額 due_amount : 取引登録待ち金額 balance : 残高 entry_side income : 入金 expense : 出金 walletable_type bank_account : 銀行口座 credit_card : クレジットカード wallet : その他の決済口座

### パラメータ

- id* (path): integer(int64) - 明細ID
- company_id*: integer(int64) - 事業所ID

### レスポンス

POST /api/1/wallet_txns と同じ

## DELETE /api/1/wallet_txns/{id} — 口座明細の削除

概要 指定した事業所の口座明細を削除する

注意点
同期をして取得したデータが「明細」の場合は、削除および再取得はできません。 詳細は freeeヘルプセンター をご確認ください。

### パラメータ

GET /api/1/wallet_txns/{id} と同じ
