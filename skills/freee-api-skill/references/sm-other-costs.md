# other_costs

その他原価

## GET /other_costs — その他原価一覧

概要 その他原価の一覧を取得します。 登録されているその他原価情報を一覧形式で取得できます。 各種フィルタ条件を指定することで、特定の条件に合致するその他原価のみを取得することが可能です。

定義
start_amount_excluding_tax : 金額(税抜)の絞り込み下限 end_amount_excluding_tax : 金額(税抜)の絞り込み上限 business_ids : 案件ID(複数指定可) other_cost_no : その他原価No. start_last_updated_date : 更新日(絞り込み開始) end_last_updated_date : 更新日(絞り込み終了) start_incurred_date : 発生日の絞り込み開始日 end_incurred_date : 発生日の絞り込み終了日 canceled : 取消状態(デフォルト:false) `limit`と`offset`パラメータを使用してページネーションが可能です。 デフォルトでは20件ずつ取得され、最大100件まで一度に取得できます。

### パラメータ

- company_id*: integer(int64) - 事業所ID
- start_amount_excluding_tax: integer(int64) - 金額(税抜)で絞込：下限
- end_amount_excluding_tax: integer(int64) - 金額(税抜)で絞込：上限
- business_ids[]: array[string] - 案件ID
- other_cost_no: string - その他原価No.で絞込
- canceled: boolean - 取消状態
- start_last_updated_date: string(date) - 更新日で絞込：開始日(yyyy-mm-dd)
- end_last_updated_date: string(date) - 更新日で絞込：終了日(yyyy-mm-dd)
- start_incurred_date: string(date) - 発生日で絞込：開始日(yyyy-mm-dd)
- end_incurred_date: string(date) - 発生日で絞込：終了日(yyyy-mm-dd)
- limit: integer(int32) - 取得レコードの件数（デフォルト：20, 最小：1, 最大：100）
- offset: integer(int32) - 取得レコードのオフセット（デフォルト：0）

## POST /other_costs — その他原価登録

概要 新しいその他原価を登録します。 案件に紐づくその他原価、または案件に紐づかないその他原価を登録できます。

定義
必須項目 company_id : 事業所ID amount_excluding_tax : 金額(税抜) incurred_date : 発生日 任意項目 business_id : 案件ID memo : メモ

### リクエストボディ

- company_id*: integer(int64) - 事業所ID 例: `1` (最小: 1, 最大: 9223372036854776000)
- business_id: string - 案件ID 例: `01JPP4FD1CVQWCDSWA90VE1ZTM`
- amount_excluding_tax*: integer(int64) - 税抜金額 例: `10000` (最小: -999999999999, 最大: 999999999999)
- incurred_date*: string(date) - 発生日 例: `2025-04-01`
- memo: string - メモ 例: `その他原価メモ`

## PATCH /other_costs/{id} — その他原価更新

概要 指定されたIDのその他原価を更新します。 送信したフィールドのみが更新され、送信しなかったフィールドは変更されません。

定義
更新可能項目 business_id : 案件ID amount_excluding_tax : 金額(税抜) incurred_date : 発生日 memo : メモ ※全ての項目は任意です。更新したい項目のみを送信してください。

注意点
freee会計の取引明細インポートから登録されたその他原価は本APIでは更新できません。該当データを更新しようとした場合はエラーになります。

### パラメータ

- id* (path): string - その他原価ID

### リクエストボディ

- company_id*: integer(int64) - 事業所ID 例: `1` (最小: 1, 最大: 9223372036854776000)
- business_id: string - 案件ID 例: `01JPP4FD1CVQWCDSWA90VE1ZTM`
- amount_excluding_tax: integer(int64) - 税抜金額 例: `10000` (最小: -999999999999, 最大: 999999999999)
- incurred_date: string(date) - 発生日 例: `2025-04-01`
- memo: string - メモ 例: `その他原価メモ`

## GET /other_costs/{id} — その他原価詳細取得

概要 指定されたIDのその他原価の詳細情報を取得します。

### パラメータ

- company_id*: integer(int64) - 事業所ID
- id* (path): string - その他原価ID

### レスポンス

その他原価詳細取得のレスポンス
- id*: string - その他原価ID
- other_cost_no*: string - その他原価番号
- canceled*: boolean - 取消状態
- amount_excluding_tax*: integer(int64) - 税抜金額
- incurred_date*: string(date) - 発生日
- memo: string - メモ
- registered_at*: string(date-time) - 登録日時
- registered_by*: object - 登録者
- last_updated_at*: string(date-time) - 変更日時
- last_updated_by*: object - 変更者
- business: object - 案件
- deal_line: object - 会計連携情報

## POST /other_costs/{id}/restoration — その他原価復元

概要 指定されたIDの取消済みその他原価を復元します。

### パラメータ

PATCH /other_costs/{id} と同じ

### リクエストボディ

- company_id*: integer(int64) - 事業所ID 例: `1` (最小: 1, 最大: 9223372036854776000)

## POST /other_costs/{id}/cancellation — その他原価取消

概要 指定されたIDのその他原価を取り消します。

### パラメータ

PATCH /other_costs/{id} と同じ

### リクエストボディ

POST /other_costs/{id}/restoration と同じ
