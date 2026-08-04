# Transfers

取引（振替）

## GET /api/1/transfers — 取引（振替）一覧の取得

概要 指定した事業所の取引（振替）一覧を取得する

定義
amount : 振替金額 from_walletable_type, to_walletable_type bank_account : 銀行口座 credit_card : クレジットカード wallet : その他の決済口座

### パラメータ

- company_id*: integer(int64) - 事業所ID
- start_date: string - 振替日で絞込：開始日 (yyyy-mm-dd)
- end_date: string - 振替日で絞込：終了日 (yyyy-mm-dd)
- offset: integer(int64) - 取得レコードのオフセット (デフォルト: 0)
- limit: integer(int64) - 取得レコードの件数 (デフォルト: 20, 最小: 1, 最大: 100)

### レスポンス

- transfers*: array[object]

## POST /api/1/transfers — 取引（振替）の作成

概要 指定した事業所の取引（振替）を作成する

定義
amount : 振替金額 from_walletable_type, to_walletable_type bank_account : 銀行口座 credit_card : クレジットカード wallet : その他の決済口座

### リクエストボディ

- to_walletable_id: integer(int64) - 振替先口座ID（単一振替先の場合に指定）。to_walletablesと同時に指定することはできません。将来廃止予定。振替先の複数指定に対応していないため、to_walletablesを利用してください。 例: `1` (最小: 1)
- to_walletable_type: string - 振替先口座区分 (銀行口座: bank_account, クレジットカード: credit_card, 現金: wallet)。単一振替先の場合に指定。to_walletablesと同時に指定することはできません。将来廃止予定。振替先の複数指定に対応していないため、to_walletablesを利用してください。 (選択肢: bank_account, credit_card, wallet) 例: `bank_account`
- from_walletable_id*: integer(int64) - 振替元口座ID 例: `1` (最小: 1)
- from_walletable_type*: string - 振替元口座区分 (銀行口座: bank_account, クレジットカード: credit_card, 現金: wallet) (選択肢: bank_account, credit_card, wallet) 例: `credit_card`
- amount: integer(int64) - 金額（単一振替先の場合に指定）。to_walletablesと同時に指定することはできません。将来廃止予定。振替先の複数指定に対応していないため、to_walletablesの各行amountを利用してください。 例: `5000` (最小: -9223372036854776000, 最大: 9223372036854776000)
- date*: string - 振替日 (yyyy-mm-dd) 例: `2019-12-17`
- company_id*: integer(int64) - 事業所ID 例: `1` (最小: 1)
- description: string - 備考（単一振替先の場合に指定）。to_walletablesと同時に指定することはできません。将来廃止予定。振替先の複数指定に対応していないため、to_walletablesの各行descriptionを利用してください。 例: `備考`
- to_walletables: array[object] - 振替先口座行（振替先が複数の場合に指定・最大50行）。単一のto_walletable_id / to_walletable_type / amount / descriptionと同時に指定することはできません。振替元はfrom_walletable_id / from_walletable_typeで共通指定。
  配列の要素:
    - type*: string - 振替先口座区分 (銀行口座: bank_account, クレジットカード: credit_card, 現金: wallet) (選択肢: bank_account, credit_card, wallet) 例: `bank_account`
    - id*: integer(int64) - 振替先口座ID 例: `1` (最小: 1)
    - amount*: integer(int64) - 振替先口座への金額 例: `3000` (最小: -9223372036854776000, 最大: 9223372036854776000)
    - description: string - 備考 例: `備考`

### レスポンス

- transfer*: object

## GET /api/1/transfers/{id} — 取引（振替）の取得

概要 指定した事業所の取引（振替）を取得する

定義
amount : 振替金額 from_walletable_type, to_walletable_type bank_account : 銀行口座 credit_card : クレジットカード wallet : その他の決済口座

### パラメータ

- id* (path): integer(int64) - 取引(振替)ID
- company_id*: integer(int64) - 事業所ID

### レスポンス

POST /api/1/transfers と同じ

## PUT /api/1/transfers/{id} — 取引（振替）の更新

概要 指定した事業所の取引（振替）を更新する

定義
amount : 振替金額 from_walletable_type, to_walletable_type bank_account : 銀行口座 credit_card : クレジットカード wallet : その他の決済口座

### パラメータ

- id* (path): integer(int64) - 取引(振替)ID

### リクエストボディ

POST /api/1/transfers と同じ

### レスポンス

POST /api/1/transfers と同じ

## DELETE /api/1/transfers/{id} — 取引（振替）の削除

概要 指定した事業所の取引（振替）を削除する

### パラメータ

GET /api/1/transfers/{id} と同じ
