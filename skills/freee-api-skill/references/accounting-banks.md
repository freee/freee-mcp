# Banks

連携サービス

## GET /api/1/banks — 連携サービス一覧の取得

概要 連携しているサービス一覧を取得する

定義
type bank_account : 銀行口座 credit_card : クレジットカード wallet : その他の決済口座

### パラメータ

- offset: integer(int64) - 取得レコードのオフセット (デフォルト: 0)
- limit: integer(int64) - 取得レコードの件数 (デフォルト: 20, 最小: 1, 最大: 500)
- type: string - サービス種別 (選択肢: bank_account, credit_card, wallet)

### レスポンス

- banks*: array[object]

## GET /api/1/banks/{id} — 連携サービスの取得

概要 連携しているサービスを取得する

定義
type bank_account : 銀行口座 credit_card : クレジットカード wallet : その他の決済口座

### パラメータ

- id* (path): integer(int64) - 連携サービスID

### レスポンス

- bank*: object
