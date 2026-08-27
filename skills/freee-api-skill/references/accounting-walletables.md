# Walletables

口座

## GET /api/1/walletables — 口座一覧の取得

概要 指定した事業所の口座（銀行口座・クレジットカード・その他の決済口座）の一覧を取得する 取得できる口座は、リクエストしたユーザーが所属するグループ管理（work_group）で参照可能な口座に限られます。 ここで取得できる口座IDと種別（type）は、取引の作成（POST /api/1/deals）・口座振替（POST /api/1/transfers）・入出金明細の取得（GET /api/1/wallet_txns）などで from_walletable_type / to_walletable_type と ID を指定する際に利用します。

注意点
type を指定しない場合は、bank_account・credit_card・wallet の全種別を返します。 残高情報（walletable_balance / last_balance）、最終同期成功日時（last_synced_at）、同期ステータス（sync_status）は、いずれもオプションのため、それぞれ with_balance / with_last_synced_at / with_sync_status を...

### パラメータ

- company_id*: integer(int64) - 事業所ID。/api/1/companies（事業所一覧の取得）で取得できます。
- type: string - 口座種別で絞り込みます。未指定の場合は全種別を返します。
  * `bank_account` - 銀行口座
  * `credit_card` - クレジットカード
  * `wallet` - その他の決済口座（現金・電子マネー・売掛/買掛など） (選択肢: bank_account, credit_card, wallet)
- with_balance: boolean - true を指定すると、レスポンスに walletable_balance（登録残高、円）と last_balance（同期残高、円）を含めます。デフォルトは false です。
- with_last_synced_at: boolean - true を指定すると、レスポンスに last_synced_at（最終同期成功日時、ISO 8601 形式）を含めます。同期成功実績がない場合は null になります。デフォルトは false です。
- with_sync_status: boolean - true を指定すると、レスポンスに sync_status（同期ステータス）を含めます。デフォルトは false です。
- start_update_date: string - 更新日で絞込：開始日（yyyy-mm-dd、JST）。指定した日以降に更新された口座のみを返します。
- end_update_date: string - 更新日で絞込：終了日（yyyy-mm-dd、JST）。指定した日以前に更新された口座のみを返します。

### レスポンス

- walletables*: array[object] - 口座一覧
- meta: object - メタ情報

## POST /api/1/walletables — 口座の作成

概要 指定した事業所に口座を作成する 作成した口座は、取引の作成（POST /api/1/deals）や口座振替（POST /api/1/transfers）などで from_walletable_type / to_walletable_type と ID を指定して利用できます。

注意点
同期に対応した金融機関の口座はこのAPIでは作成できません。web画面で登録してください。 type に bank_account / credit_card を指定する場合は bank_id が必須です。type に wallet を指定する場合は bank_id を省略できます。 type に wallet を指定し、かつ bank_id を省略した場合のみ、is_asset で資産口座（true）と負債口座（false）を選択できます。bank_id を指定した場合は、資産口座か負債口座かは bank_id で指定したサービスに応じて自動判定され、is_asset は無視されます。 既存の口座と重複する口座名を指定した場合は 400 エラーが返ります。

### リクエストボディ

- name*: string - 口座名（255文字以内）。事業所内で既存の口座名と重複する場合は 400 エラーになります。 例: `ＸＸ銀行`
- type*: string - 口座種別。
  * `bank_account` - 銀行口座
  * `credit_card` - クレジットカード
  * `wallet` - その他の決済口座（現金・電子マネー・売掛/買掛など） (選択肢: bank_account, credit_card, wallet) 例: `bank_account`
- company_id*: integer(int64) - 事業所ID。/api/1/companies（事業所一覧の取得）で取得できます。 例: `1` (最小: 1)
- bank_id: integer(int64) - 連携サービスID。/api/1/banks（連携サービス一覧の取得）で取得できます。type に bank_account、credit_card を指定する場合は必須です。type に wallet を指定する場合は省略できます（省略時は連携サービスに紐づかない現金口座などとして作成されます）。 例: `1` (最小: 1)
- is_asset: boolean - 口座を資産口座（true、デフォルト）とするか負債口座（false）とするか。

  type に wallet を指定し、かつ bank_id を省略した場合にのみ有効です。

  bank_id を指定した場合は、資産口座か負債口座かは bank_id に指定したサービスに応じて自動判定され、is_asset に指定した値は無視されます。 例: `true`

### レスポンス

- walletable*: object - 作成された口座

## GET /api/1/walletables/{type}/{id} — 口座の取得

概要 指定した事業所の口座を1件取得する

注意点
指定した口座が存在しない、またはリクエストしたユーザーのグループ管理（work_group）で参照できない口座を指定した場合は 404 エラーが返ります。 残高情報（walletable_balance / last_balance）は常に含まれます。最終同期成功日時（last_synced_at）と同期ステータス（sync_status）は、それぞれ with_last_synced_at / with_sync_status を true にした場合のみレスポンスに含まれます。

### パラメータ

- id* (path): integer(int64) - 口座ID。/api/1/walletables（口座一覧の取得）で取得できます。
- type* (path): string - 口座種別。
  * `bank_account` - 銀行口座
  * `credit_card` - クレジットカード
  * `wallet` - その他の決済口座（現金・電子マネー・売掛/買掛など） (選択肢: bank_account, credit_card, wallet)
- company_id*: integer(int64) - 事業所ID。/api/1/companies（事業所一覧の取得）で取得できます。
- with_last_synced_at: boolean - true を指定すると、レスポンスに last_synced_at（最終同期成功日時、ISO 8601 形式）を含めます。同期成功実績がない場合は null になります。デフォルトは false です。
- with_sync_status: boolean - true を指定すると、レスポンスに sync_status（同期ステータス）を含めます。デフォルトは false です。

### レスポンス

- walletable*: object
- meta: object - メタ情報

## PUT /api/1/walletables/{type}/{id} — 口座の更新

概要 指定した事業所の口座の口座名を更新する

注意点
更新できるのは口座名（name）のみです。type や bank_id、資産/負債区分の変更はできません。 既存の口座と重複する口座名を指定した場合は 400 エラーが返ります。 指定した口座が存在しない、またはリクエストしたユーザーのグループ管理（work_group）で参照できない口座を指定した場合は 404 エラーが返ります。

### パラメータ

- id* (path): integer(int64) - 口座ID。/api/1/walletables（口座一覧の取得）で取得できます。
- type* (path): string - 口座種別。
  * `bank_account` - 銀行口座
  * `credit_card` - クレジットカード
  * `wallet` - その他の決済口座（現金・電子マネー・売掛/買掛など） (選択肢: bank_account, credit_card, wallet)

### リクエストボディ

- name*: string - 口座名（255文字以内）。事業所内で既存の口座名と重複する場合は 400 エラーになります。type や bank_id、資産/負債区分は更新できません（変更したい場合は口座を作り直してください）。 例: `ＸＸ銀行`
- company_id*: integer(int64) - 事業所ID。/api/1/companies（事業所一覧の取得）で取得できます。 例: `1` (最小: 1)

### レスポンス

GET /api/1/walletables/{type}/{id} と同じ

## DELETE /api/1/walletables/{type}/{id} — 口座の削除

概要 指定した事業所の口座を削除する

注意点
削除を実行するには、当該口座に関連する仕訳データを事前に削除する必要があります。仕訳が残っている場合は 400 エラーが返ります。 当該口座に仕訳が残っていないか確認するには、レポートの「仕訳帳」等を参照し、必要に応じて、「取引」や「口座振替」も削除します。 指定した口座が存在しない、またはリクエストしたユーザーのグループ管理（work_group）で参照できない口座を指定した場合は 404 エラーが返ります。

### パラメータ

- id* (path): integer(int64) - 口座ID。/api/1/walletables（口座一覧の取得）で取得できます。
- type* (path): string - 口座種別。
  * `bank_account` - 銀行口座
  * `credit_card` - クレジットカード
  * `wallet` - その他の決済口座（現金・電子マネー・売掛/買掛など） (選択肢: bank_account, credit_card, wallet)
- company_id*: integer(int64) - 事業所ID。/api/1/companies（事業所一覧の取得）で取得できます。
