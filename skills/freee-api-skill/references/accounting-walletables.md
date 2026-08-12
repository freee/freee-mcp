# Walletables

口座

## GET /api/1/walletables — 口座一覧の取得

概要 指定した事業所の口座一覧を取得する

定義
type bank_account : 銀行口座 credit_card : クレジットカード wallet : その他の決済口座 walletable_balance : 登録残高 last_balance : 同期残高 last_synced_at : 最終同期成功日時 sync_status : 同期ステータス

### パラメータ

- company_id*: integer(int64) - 事業所ID
- type: string - 口座種別（bank_account : 銀行口座, credit_card : クレジットカード, wallet : その他の決済口座） (選択肢: bank_account, credit_card, wallet)
- with_balance: boolean - 残高情報を含める
- with_last_synced_at: boolean - 最終同期成功日時を含める
- with_sync_status: boolean - 同期ステータスを含める
- start_update_date: string - 更新日で絞込：開始日(yyyy-mm-dd)
- end_update_date: string - 更新日で絞込：終了日(yyyy-mm-dd)

### レスポンス

- walletables*: array[object]
- meta: object

## POST /api/1/walletables — 口座の作成

概要 指定した事業所の口座を作成する

注意点
同期に対応した口座はこのAPIでは作成できません

定義
type bank_account : 銀行口座 credit_card : クレジットカード wallet : その他の決済口座 name : 口座名 bank_id : 連携サービスID is_asset : type:wallet指定時に口座を資産口座とするか負債口座とするか（true: 資産口座 (デフォルト), false: 負債口座）

### リクエストボディ

- name*: string - 口座名 (255文字以内) 例: `ＸＸ銀行`
- type*: string - 口座種別（bank_account : 銀行口座, credit_card : クレジットカード, wallet : その他の決済口座） (選択肢: bank_account, credit_card, wallet) 例: `bank_account`
- company_id*: integer(int64) - 事業所ID 例: `1` (最小: 1)
- bank_id: integer(int64) - 連携サービスID（typeにbank_account、credit_cardを指定する場合は必須） 例: `1` (最小: 1)
- is_asset: boolean - 口座を資産口座とするか負債口座とするか（true: 資産口座 (デフォルト), false: 負債口座）

  bank_idを指定しない場合にのみ使われます。

  bank_idを指定する場合には資産口座か負債口座かはbank_idに指定したサービスに応じて決定され、is_assetに指定した値は無視されます。 例: `true`

### レスポンス

- walletable*: object

## GET /api/1/walletables/{type}/{id} — 口座の取得

概要 指定した事業所の口座を取得する

定義
type bank_account : 銀行口座 credit_card : クレジットカード wallet : その他の決済口座 walletable_balance : 登録残高 last_balance : 同期残高 last_synced_at : 最終同期成功日時 sync_status : 同期ステータス

### パラメータ

- id* (path): integer(int64) - 口座ID
- type* (path): string - 口座種別（bank_account : 銀行口座, credit_card : クレジットカード, wallet : その他の決済口座） (選択肢: bank_account, credit_card, wallet)
- company_id*: integer(int64) - 事業所ID
- with_last_synced_at: boolean - 最終同期成功日時を含める
- with_sync_status: boolean - 同期ステータスを含める

### レスポンス

- walletable*: object
- meta: object

## PUT /api/1/walletables/{type}/{id} — 口座の更新

概要 指定した事業所の口座を更新する

### パラメータ

- id* (path): integer(int64) - 口座ID
- type* (path): string - 口座種別（bank_account : 銀行口座, credit_card : クレジットカード, wallet : その他の決済口座） (選択肢: bank_account, credit_card, wallet)

### リクエストボディ

- name*: string - 口座名 (255文字以内) 例: `ＸＸ銀行`
- company_id*: integer(int64) - 事業所ID 例: `1` (最小: 1)

### レスポンス

GET /api/1/walletables/{type}/{id} と同じ

## DELETE /api/1/walletables/{type}/{id} — 口座の削除

概要 指定した事業所の口座を削除する

注意点
削除を実行するには、当該口座に関連する仕訳データを事前に削除する必要があります。 当該口座に仕訳が残っていないか確認するには、レポートの「仕訳帳」等を参照し、必要に応じて、「取引」や「口座振替」も削除します。

### パラメータ

- id* (path): integer(int64) - 口座ID
- type* (path): string - 口座種別（bank_account : 銀行口座, credit_card : クレジットカード, wallet : その他の決済口座） (選択肢: bank_account, credit_card, wallet)
- company_id*: integer(int64) - 事業所ID
