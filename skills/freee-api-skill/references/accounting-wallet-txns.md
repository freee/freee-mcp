# Wallet txns

口座明細

## GET /api/1/wallet_txns — 口座明細一覧の取得

概要 指定した事業所の口座明細（銀行口座・クレジットカード・その他の決済口座の入出金明細）一覧を取得する

注意点
デフォルトでは取引日（date）の降順で返されます。sort_type に created_at_desc を指定すると、明細の作成日時の降順で返されます。 取得件数は limit と offset で制御します（デフォルト: 20件、最大: 100件）。

定義
amount : 取引金額（単位: 円） due_amount : 取引登録待ち金額（明細に対してまだ取引が登録されていない金額） balance : 残高（銀行口座等） entry_side income : 入金 expense : 出金 walletable_type bank_account : 銀行口座 credit_card : クレジットカード wallet : 現金・その他の決済口座

### パラメータ

- company_id*: integer(int64) - 事業所ID
- walletable_type: string - 口座区分で絞り込みます。walletable_type と walletable_id は同時に指定が必要です（片方のみ指定した場合、この条件は無視されます）。
  * `bank_account` - 銀行口座
  * `credit_card` - クレジットカード
  * `wallet` - 現金・その他の決済口座 (選択肢: bank_account, credit_card, wallet)
- walletable_id: integer(int64) - 口座IDで絞り込みます。walletable_type と walletable_id は同時に指定が必要です（片方のみ指定した場合、この条件は無視されます）。口座IDは口座一覧の取得API（GET /api/1/walletables）で確認できます。
- start_date: string - 取引日で絞込：開始日 (yyyy-mm-dd)
- end_date: string - 取引日で絞込：終了日 (yyyy-mm-dd)
- entry_side: string - 入金・出金の区分で絞り込みます。
  * `income` - 入金
  * `expense` - 出金 (選択肢: income, expense)
- sort_type: string - 並び順の指定（未指定の場合は取引日の降順で返されます）
  * `created_at_desc` - 明細の作成日時の降順
- offset: integer(int64) - 取得レコードのオフセット (デフォルト: 0)
- limit: integer(int64) - 取得レコードの件数 (デフォルト: 20, 最小: 1, 最大: 100)

### レスポンス

- wallet_txns*: array[object]

## POST /api/1/wallet_txns — 口座明細の作成

概要 指定した事業所の口座明細を作成する

注意点
登録時に 自動登録ルールの設定 の条件に一致した場合はルールが適用され、取引の登録などが自動で行われることがあります。ルールが適用され登録処理が実行された場合、レスポンスの rule_matched が true になります。

定義
amount : 取引金額（単位: 円） due_amount : 取引登録待ち金額（明細に対してまだ取引が登録されていない金額） balance : 残高（銀行口座等） entry_side income : 入金 expense : 出金 walletable_type bank_account : 銀行口座 credit_card : クレジットカード wallet : 現金・その他の決済口座

### リクエストボディ

- entry_side*: string - 入金・出金の区分
  * `income` - 入金
  * `expense` - 出金 (選択肢: income, expense) 例: `income`
- description: string - 取引内容（摘要）。未指定の場合は空文字列で登録されます。 例: `振込 カ）ABC`
- amount*: integer(int64) - 取引金額（単位: 円）。入金・出金の区別は entry_side で指定します。 例: `5000` (最小: -9223372036854776000, 最大: 9223372036854776000)
- walletable_id*: integer(int64) - 口座ID（walletable_type で指定した口座区分の口座のID）。口座一覧の取得API（GET /api/1/walletables）で確認できます。 例: `1` (最小: 1)
- walletable_type*: string - 口座区分
  * `bank_account` - 銀行口座
  * `credit_card` - クレジットカード
  * `wallet` - 現金・その他の決済口座 (選択肢: bank_account, credit_card, wallet) 例: `bank_account`
- date*: string - 取引日 (yyyy-mm-dd) 例: `2019-12-17`
- company_id*: integer(int64) - 事業所ID 例: `1` (最小: 1)
- balance: integer(int64) - 残高（単位: 円）。指定しない場合、作成された明細の balance は null になります。 例: `10000` (最小: -9223372036854776000, 最大: 9223372036854776000)

### レスポンス

- wallet_txn*: object

## GET /api/1/wallet_txns/{id} — 口座明細の取得

概要 指定した事業所の口座明細を取得する

定義
amount : 取引金額（単位: 円） due_amount : 取引登録待ち金額（明細に対してまだ取引が登録されていない金額） balance : 残高（銀行口座等） entry_side income : 入金 expense : 出金 walletable_type bank_account : 銀行口座 credit_card : クレジットカード wallet : 現金・その他の決済口座

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
