# Transfers

取引（振替）

## GET /api/1/transfers — 取引（振替）一覧の取得

概要 指定した事業所の取引（振替）一覧を取得する

注意点
振替元・振替先に指定できる口座のIDと口座区分（type）は、口座一覧の取得（GET /api/1/walletables）で確認できます。 振替先口座はレスポンスの to_walletables（複数行）で返します。amount / to_walletable_type / to_walletable_id / description は振替先の複数指定に対応していない旧形式のフィールド（廃止予定）で、振替先が複数ある場合、amount は全行の合計金額（支払手数料が設定されている場合は手数料分を加算した金額）、to_walletable_type / to_walletable_id は金額が最大の行の値、description は各行の備考を結合した文字列を返します。

### パラメータ

- company_id*: integer(int64) - 事業所ID
- start_date: string - 振替日で絞込：開始日 (yyyy-mm-dd)
- end_date: string - 振替日で絞込：終了日 (yyyy-mm-dd)
- offset: integer(int64) - 取得レコードのオフセット (デフォルト: 0)
- limit: integer(int64) - 取得レコードの件数 (デフォルト: 20, 最小: 1, 最大: 100)

### レスポンス

- transfers*: array[object] - 取引（振替）の一覧

## POST /api/1/transfers — 取引（振替）の作成

概要 指定した事業所の取引（振替）を作成する

注意点
振替元・振替先に指定できる口座のIDと口座区分（type）は、口座一覧の取得（GET /api/1/walletables）で確認できます。 振替先が1つの場合は to_walletable_type / to_walletable_id / amount（必要に応じて description）を指定します。振替先が複数の場合は to_walletables（最大50行）を指定します。両方を同時に指定することはできません。 to_walletables を指定する場合、振替元は from_walletable_type / from_walletable_id で共通指定し、各行の amount には0円より大きい金額を指定します。複数行で同一の振替先口座は指定できません。

### リクエストボディ

- to_walletable_id: integer(int64) - 振替先口座ID（単一振替先の場合に指定）。口座一覧の取得（GET /api/1/walletables）で取得できるIDを指定します。to_walletablesと同時に指定することはできません。将来廃止予定。振替先の複数指定に対応していないため、to_walletablesを利用してください。 例: `1` (最小: 1)
- to_walletable_type: string - 振替先口座の口座区分（単一振替先の場合に指定）。to_walletablesと同時に指定することはできません。将来廃止予定。振替先の複数指定に対応していないため、to_walletablesを利用してください。
  * `bank_account` - 銀行口座
  * `credit_card` - クレジットカード
  * `wallet` - その他の決済口座（現金・電子マネー・売掛/買掛など） (選択肢: bank_account, credit_card, wallet) 例: `bank_account`
- from_walletable_id*: integer(int64) - 振替元口座ID。口座一覧の取得（GET /api/1/walletables）で取得できるIDを指定します。 例: `1` (最小: 1)
- from_walletable_type*: string - 振替元口座の口座区分
  * `bank_account` - 銀行口座
  * `credit_card` - クレジットカード
  * `wallet` - その他の決済口座（現金・電子マネー・売掛/買掛など） (選択肢: bank_account, credit_card, wallet) 例: `credit_card`
- amount: integer(int64) - 振替金額（円・単一振替先の場合に指定）。to_walletablesと同時に指定することはできません。将来廃止予定。振替先の複数指定に対応していないため、to_walletablesの各行amountを利用してください。 例: `5000` (最小: -9223372036854776000, 最大: 9223372036854776000)
- date*: string - 振替日 (yyyy-mm-dd) 例: `2019-12-17`
- company_id*: integer(int64) - 事業所ID 例: `1` (最小: 1)
- description: string - 備考（単一振替先の場合に指定）。to_walletablesと同時に指定することはできません。将来廃止予定。振替先の複数指定に対応していないため、to_walletablesの各行descriptionを利用してください。 例: `備考`
- to_walletables: array[object] - 振替先口座行（振替先が複数の場合に指定・最大50行）。単一のto_walletable_id / to_walletable_type / amount / descriptionと同時に指定することはできません。振替元はfrom_walletable_id / from_walletable_typeで共通指定。
  配列の要素:
    - type*: string - 振替先口座の口座区分
      * `bank_account` - 銀行口座
      * `credit_card` - クレジットカード
      * `wallet` - その他の決済口座（現金・電子マネー・売掛/買掛など） (選択肢: bank_account, credit_card, wallet) 例: `bank_account`
    - id*: integer(int64) - 振替先口座ID。口座一覧の取得（GET /api/1/walletables）で取得できるIDを指定します。 例: `1` (最小: 1)
    - amount*: integer(int64) - 振替先口座への振替金額（円）。0円より大きい金額を指定します。 例: `3000` (最小: -9223372036854776000, 最大: 9223372036854776000)
    - description: string - 備考 例: `備考`

### レスポンス

- transfer*: object

## GET /api/1/transfers/{id} — 取引（振替）の取得

概要 指定した事業所の取引（振替）を取得する

注意点
振替先口座はレスポンスの to_walletables（複数行）で返します。amount / to_walletable_type / to_walletable_id / description は振替先の複数指定に対応していない旧形式のフィールド（廃止予定）で、振替先が複数ある場合、amount は全行の合計金額（支払手数料が設定されている場合は手数料分を加算した金額）、to_walletable_type / to_walletable_id は金額が最大の行の値、description は各行の備考を結合した文字列を返します。 指定したIDの取引（振替）が存在しない場合や、削除済み・権限がない場合は404を返します。

### パラメータ

- id* (path): integer(int64) - 取引(振替)ID
- company_id*: integer(int64) - 事業所ID

### レスポンス

POST /api/1/transfers と同じ

## PUT /api/1/transfers/{id} — 取引（振替）の更新

概要 指定した事業所の取引（振替）を更新する

注意点
部分更新ではありません。作成時と同様に、更新後の取引（振替）の内容全体をリクエストで指定します。 振替先が複数ある取引（振替）を更新する場合は to_walletables の指定が必要です。to_walletables を指定せず旧形式の単一フィールド（to_walletable_type / to_walletable_id / amount）のみで更新しようとするとエラーになります（複数の振替先を意図せず1件に置き換えることを防ぐためです）。 受取利息や振込手数料が設定された取引（振替）は本APIでは更新できません。 承認済みの取引（振替）は、事業所の設定や実行ユーザーの権限によっては更新できません。

### パラメータ

- id* (path): integer(int64) - 取引(振替)ID

### リクエストボディ*

- to_walletable_id: integer(int64) - 振替先口座ID（単一振替先の場合に指定）。口座一覧の取得（GET /api/1/walletables）で取得できるIDを指定します。to_walletablesと同時に指定することはできません。将来廃止予定。振替先の複数指定に対応していないため、to_walletablesを利用してください。 例: `1` (最小: 1)
- to_walletable_type: string - 振替先口座の口座区分（単一振替先の場合に指定）。to_walletablesと同時に指定することはできません。将来廃止予定。振替先の複数指定に対応していないため、to_walletablesを利用してください。
  * `bank_account` - 銀行口座
  * `credit_card` - クレジットカード
  * `wallet` - その他の決済口座（現金・電子マネー・売掛/買掛など） (選択肢: bank_account, credit_card, wallet) 例: `bank_account`
- from_walletable_id*: integer(int64) - 振替元口座ID。口座一覧の取得（GET /api/1/walletables）で取得できるIDを指定します。 例: `1` (最小: 1)
- from_walletable_type*: string - 振替元口座の口座区分
  * `bank_account` - 銀行口座
  * `credit_card` - クレジットカード
  * `wallet` - その他の決済口座（現金・電子マネー・売掛/買掛など） (選択肢: bank_account, credit_card, wallet) 例: `credit_card`
- amount: integer(int64) - 振替金額（円・単一振替先の場合に指定）。to_walletablesと同時に指定することはできません。将来廃止予定。振替先の複数指定に対応していないため、to_walletablesの各行amountを利用してください。 例: `5000` (最小: -9223372036854776000, 最大: 9223372036854776000)
- date*: string - 振替日 (yyyy-mm-dd) 例: `2019-12-17`
- company_id*: integer(int64) - 事業所ID 例: `1` (最小: 1)
- description: string - 備考（単一振替先の場合に指定）。to_walletablesと同時に指定することはできません。将来廃止予定。振替先の複数指定に対応していないため、to_walletablesの各行descriptionを利用してください。 例: `備考`
- to_walletables: array[object] - 振替先口座行（振替先が複数の場合に指定・最大50行）。単一のto_walletable_id / to_walletable_type / amount / descriptionと同時に指定することはできません。振替元はfrom_walletable_id / from_walletable_typeで共通指定。
  配列の要素:
    - type*: string - 振替先口座の口座区分
      * `bank_account` - 銀行口座
      * `credit_card` - クレジットカード
      * `wallet` - その他の決済口座（現金・電子マネー・売掛/買掛など） (選択肢: bank_account, credit_card, wallet) 例: `bank_account`
    - id*: integer(int64) - 振替先口座ID。口座一覧の取得（GET /api/1/walletables）で取得できるIDを指定します。 例: `1` (最小: 1)
    - amount*: integer(int64) - 振替先口座への振替金額（円）。0円より大きい金額を指定します。 例: `3000` (最小: -9223372036854776000, 最大: 9223372036854776000)
    - description: string - 備考 例: `備考`

### レスポンス

POST /api/1/transfers と同じ

## DELETE /api/1/transfers/{id} — 取引（振替）の削除

概要 指定した事業所の取引（振替）を削除する

注意点
指定したIDの取引（振替）が存在しない場合や、削除済み・権限がない場合は404を返します。 取引（振替）の状態により削除できない場合は400を返します。エラーメッセージに削除できない理由を含みます。

### パラメータ

GET /api/1/transfers/{id} と同じ
