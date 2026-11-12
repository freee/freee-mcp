<!-- freee債権管理 の小さいタグをまとめたファイル。タグごとの行範囲は INDEX.md を参照し、必要な範囲だけ読むこと。 -->

# receivable_management_incoming_payments

receivable_management_incoming_payments

## GET /hub/receivable_management/incoming_payments — 入金一覧取得

事業所の入金の一覧を取得します。入金には、freee会計 の口座から取り込んだものと、手動で登録したものがあります。 ##

注意点
- 絞り込み条件を複数指定した場合は、すべてに該当する入金を返します。 - 口座名は返しません。必要な場合は `bank_account_id` で freee会計 の口座APIを利用してください。

### パラメータ

- company_id*: integer(int64) - 事業所ID
- page_size: integer(int32) - 1 ページあたりの取得件数 (既定値 100、上限 500)。0 以下を指定した場合は既定値になります
- page_token: string - 次のページを取得するためのトークン。前回のレスポンスの next_page_token を指定します。絞り込み条件と sort_by / sort_order は前回と同じ値を指定してください
- bank_account_id: integer(int64) - freee会計 の口座ID。指定した口座から取り込んだ入金だけを返します。
  消込口座に登録されていない口座を指定した場合は、空の一覧ではなく 404 を返します
- origin: string - 発生元。sync = freee会計 の口座から取り込み、manual = 手動登録 (選択肢: sync, manual)
- statuses[]: array[string] - 消込状況 (複数指定可、いずれかに該当する入金を返します)。
  processed = 入金残額が 0、または freee会計 で処理済みにした入金、unprocessed = それ以外の入金。2 件まで指定できます
- issue_date_from: string(date) - 入金日の開始日。指定日を含みます
- issue_date_to: string(date) - 入金日の終了日。指定日を含みます
- amount_from: integer(int64) - 入金金額の下限。指定額を含みます
- amount_to: integer(int64) - 入金金額の上限。指定額を含みます
- allocated_amount_from: integer(int64) - 消込済み金額の下限。指定額を含みます
- allocated_amount_to: integer(int64) - 消込済み金額の上限。指定額を含みます
- sort_by: string - 並び替えの項目 (既定値 issue_date) (選択肢: issue_date, amount, allocated_amount)
- sort_order: string - 並び順 (既定値 desc) (選択肢: asc, desc)

### レスポンス

入金一覧取得レスポンス
- data*: array[object] - 入金の一覧。該当する入金が無い場合は空配列
- next_page_token*: string - 次のページを取得するためのトークン。次のページが無い場合は null

## GET /hub/receivable_management/incoming_payments/{id} — 入金取得

入金と、入金を含む消込結果のIDを取得します。 ##

注意点
- 口座名は返しません。必要な場合は `bank_account_id` で freee会計 の口座APIを利用してください。 - 消込結果は ID だけを返します。消込結果の内容は消込結果取得APIで取得してください。解除した消込結果は含みません。

### パラメータ

- company_id*: integer(int64) - 事業所ID
- id* (path): string - 取得する入金のID (ULID 形式の 26 文字)。形式が不正な場合は 400 を返します

### レスポンス

入金取得レスポンス
- id*: string - 入金ID
- issue_date*: string(date) - 入金日
- amount*: string(int64) - 入金金額
- allocated_amount*: string(int64) - 消込済み金額
- unallocated_amount*: string(int64) - 入金残額 (入金金額 - 消込済み金額)
- description*: string - 摘要。摘要が無い場合は null (空文字は、摘要が空であることを表します)
- bank_account_id*: string(int64) - 入金元の freee会計 の口座ID。freee会計 の口座から取り込んでいない入金の場合は null。
  口座名が必要な場合はこのIDで freee会計 の口座APIを利用してください
- comment*: string - 入金のメモ
- origin*: string - 発生元。sync = freee会計 の口座から取り込み、manual = 手動登録
- status*: string - 消込状況。processed = 入金残額が 0、または freee会計 で処理済みにした入金、unprocessed = それ以外の入金
- allocations*: array[object] - 入金を含む消込結果の一覧。消込日時の降順 (同じ日時の場合は消込番号の降順) で返します。消込結果が無い場合は空配列

# receivable_management_receivables

receivable_management_receivables

## GET /hub/receivable_management/receivables — 請求一覧取得

事業所の請求の一覧を取得します。 ##

注意点
- 絞り込み条件を複数指定した場合は、すべてに該当する請求を返します。 - 取引先名・取引先コードは返しません。必要な場合は `partner_id` で freee会計 の取引先APIを利用してください。

### パラメータ

- company_id*: integer(int64) - 事業所ID
- page_size: integer(int32) - 1 ページあたりの取得件数 (既定値 100、上限 500)。0 以下を指定した場合は既定値になります
- page_token: string - 次のページを取得するためのトークン。前回のレスポンスの next_page_token を指定します。絞り込み条件と sort_by / sort_order は前回と同じ値を指定してください
- origin: string - 発生元。invoice = freee請求書 (選択肢: invoice)
- statuses[]: array[string] - 消込状況 (複数指定可、いずれかに該当する請求を返します)。
  unprocessed = 請求残額が残っている、processed = 請求残額が 0、archived = 管理対象外。
  unprocessed / processed に管理対象外の請求は含みません。
  未指定の場合は管理対象外を含むすべての請求を返します。3 件まで指定できます
- partner_ids[]: array[string] - freee会計 の取引先ID (複数指定可、いずれかに該当する請求を返します)。100 件まで指定できます
- billing_date_from: string(date) - 請求日の開始日。指定日を含みます
- billing_date_to: string(date) - 請求日の終了日。指定日を含みます
- due_date_from: string(date) - 入金期日の開始日。指定日を含みます
- due_date_to: string(date) - 入金期日の終了日。指定日を含みます
- amount_from: integer(int64) - 請求金額の下限。指定額を含みます。負の値も指定できます
- amount_to: integer(int64) - 請求金額の上限。指定額を含みます。負の値も指定できます
- due_amount_from: integer(int64) - 請求残額の下限。指定額を含みます。負の値も指定できます
- due_amount_to: integer(int64) - 請求残額の上限。指定額を含みます。負の値も指定できます
- report_no: string - 請求書番号 (完全一致)
- sort_by: string - 並び替えの項目 (既定値 billing_date) (選択肢: billing_date, amount, due_amount, due_date)
- sort_order: string - 並び順 (既定値 desc) (選択肢: asc, desc)

### レスポンス

請求一覧取得レスポンス
- data*: array[object] - 請求の一覧。該当する請求が無い場合は空配列
- next_page_token*: string - 次のページを取得するためのトークン。次のページが無い場合は null

## GET /hub/receivable_management/receivables/{id} — 請求取得

請求と、請求を含む消込結果のIDを取得します。 ##

注意点
- 取引先名・取引先コードは返しません。必要な場合は `partner_id` で freee会計 の取引先APIを利用してください。 - 消込結果は ID だけを返します。消込結果の内容は消込結果取得APIで取得してください。解除した消込結果は含みません。

### パラメータ

- company_id*: integer(int64) - 事業所ID
- id* (path): string - 取得する請求のID (ULID 形式の 26 文字)。形式が不正な場合は 400 を返します

### レスポンス

請求取得レスポンス
- id*: string - 請求ID
- partner_id*: string(int64) - freee会計 の取引先ID。取引先名・取引先コードが必要な場合はこのIDで freee会計 の取引先APIを利用してください
- contact_name*: string - freee請求書 の帳票に設定された取引先担当者の氏名。freee請求書と連携していない請求、または未設定の場合は null
- contact_department*: string - freee請求書 の帳票に設定された取引先担当者の部署。freee請求書と連携していない請求、または未設定の場合は null
- issue_date*: string(date) - 発生日
- amount*: string(int64) - 請求金額
- allocated_amount*: string(int64) - 消込済み金額
- due_amount*: string(int64) - 請求残額 (請求金額 - 消込済み金額)
- billing_date*: string(date) - 請求日
- due_date*: string(date) - 入金期日
- report_id*: string(int64) - freee請求書 の帳票ID。freee請求書と連携していない請求の場合は null。
  1 つの請求に複数の帳票が紐づく場合は最新の帳票を返します
  (report_no / branch_no / contact_name / contact_department も同じ帳票の値です)
- report_no*: string - 請求書番号。枝番は branch_no で返します
- branch_no*: integer(int32) - 請求書番号の枝番
- origin*: string - 発生元。invoice = freee請求書
- status*: string - 消込状況。processed = 請求残額が 0、unprocessed = 請求残額が残っている。管理対象外かどうかは is_archived で判定してください
- is_archived*: boolean - 管理対象外かどうか
- archived_at*: string(date-time) - 管理対象外にした日時。管理対象外でない場合は null
- archived_by*: string(int64) - 管理対象外にしたユーザーのID。管理対象外でない場合、または記録が無い場合は null。ユーザー名が必要な場合は、このIDで freee会計 のユーザーAPI (Users) を利用してください
- comment*: string - 請求のメモ
- payment_method*: string - freee請求書 の帳票に設定された入金方法。freee請求書と連携していない請求、または未設定の場合は null。
  transfer = 振込、card = カード、direct_debit = 振替、cash = 現金、
  bill_payable = 手形、deferred_payment = おまかせ回収
- allocations*: array[object] - 請求を含む消込結果の一覧。消込日時の降順 (同じ日時の場合は消込番号の降順) で返します。消込結果が無い場合は空配列

## GET /hub/receivable_management/receivables/{id}/lines — 請求明細一覧取得

請求明細の一覧を取得します。請求明細ごとに消込する場合は、ここで取得した請求明細IDを消込APIの `receivable_line_id` に指定します。 ##

注意点
- 請求明細は請求明細IDの昇順 (登録された順) で返します。並び順は指定できません。 - 請求が存在しない場合は、空の一覧ではなく 404 を返します。 - freee請求書 で請求書が更新されると、請求明細は新しい請求明細IDで登録し直されます。続きのページを取得する前に更新された場合は 400 を返すので、最初のページから取得し直してください。以前に取得した請求明細IDは使えなくなります。

### パラメータ

- company_id*: integer(int64) - 事業所ID
- id* (path): string - 請求明細を取得する請求のID (ULID 形式の 26 文字)。形式が不正な場合は 400 を返します
- page_size: integer(int32) - 1 ページあたりの取得件数 (既定値 100、上限 500)。0 以下を指定した場合は既定値になります
- page_token: string - 次のページを取得するためのトークン。前回のレスポンスの next_page_token を指定します。請求IDは前回と同じ値を指定してください。前回の取得の後に請求明細が登録し直された場合や、別の請求のトークンを指定した場合は 400 を返します

### レスポンス

請求明細一覧取得レスポンス
- data*: array[object] - 請求明細の一覧。請求明細IDの昇順
- next_page_token*: string - 次のページを取得するためのトークン。次のページが無い場合は null

# receivable_management_usages

receivable_management_usages

## GET /hub/receivable_management/company/usages — 当月の利用状況取得

事業所の当月の充当件数を、上限件数・上限件数を超えているかどうかと合わせて取得します。上限件数を超えた場合、従量課金の対象になる件数は usage_count から included_usage_count を引いた件数です。 ##

注意点
- 当月は日本時間の暦月です。過去の月は取得できません。 - 件数は事業所全体の合計です。 - 契約情報を一時的に取得できなかった場合は 500 を返します。時間をおいて再試行してください。

### パラメータ

- company_id*: integer(int64) - 事業所ID

### レスポンス

当月の利用状況取得レスポンス
- start_date*: string(date) - 対象月の初日
- end_date*: string(date) - 対象月の末日
- usage_count*: integer(int32) - 当月の充当件数。入金 1 件につき、はじめて消込した月に 1 回だけ数えます。
  消込を解除しても減らず、同じ入金を再度消込しても増えません
- included_usage_count*: integer(int32) - 当月の上限件数。リクエスト時点の契約で計算した、ベースプランに含まれる件数とまとめ割で購入した件数の合計です。usage_count がこれを超えた分が従量課金の対象です
- has_overage*: boolean - 充当件数が上限件数を超えているかどうか
