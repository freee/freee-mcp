# receivable_management_allocations

receivable_management_allocations

## GET /hub/receivable_management/allocations — 消込結果一覧取得

事業所の消込結果の一覧を取得します。 ##

注意点
- 絞り込み条件を複数指定した場合は、すべてに該当する消込結果を返します。 - 消込結果に含まれる請求・入金・差額調整の内訳は返しません。必要な場合は、消込結果取得APIで取得してください。

### パラメータ

- company_id*: integer(int64) - 事業所ID
- page_size: integer(int32) - 1 ページあたりの取得件数 (既定値 100、上限 500)。0 以下を指定した場合は既定値になります
- page_token: string - 次のページを取得するためのトークン。前回のレスポンスの next_page_token を指定します。絞り込み条件と sort_by / sort_order は前回と同じ値を指定してください
- statuses[]: array[string] - 消込ステータス (複数指定可、いずれかに該当する消込結果を返します)。
  allocated = 取引反映待ち、posted = 取引反映済み、post_failed = 取引反映失敗。
  レスポンスの status と違い posting (取引反映中) は指定できません。取引反映中の消込結果は、取引反映を受け付ける前のステータス (allocated / post_failed) で絞り込まれます。3 件まで指定できます
- allocated_at_from: string(date) - 消込日の開始日。指定日を含みます。allocated_at_to との期間は 10 年以内で指定してください
- allocated_at_to: string(date) - 消込日の終了日。指定日を含みます
- allocated_by: integer(int64) - 消込を実行したユーザーのID。freee会計 のユーザーAPI (Users) で取得できるIDを指定します
- total_adjustment_amount_from: integer(int64) - 差額調整の合計金額の下限。指定額を含みます。負の値も指定できます
- total_adjustment_amount_to: integer(int64) - 差額調整の合計金額の上限。指定額を含みます。負の値も指定できます
- adjustment_account_item_id: integer(int64) - 差額調整の勘定科目ID (freee会計)。この勘定科目の差額調整を 1 件以上含む消込結果を返します
- adjustment_amount_from: integer(int64) - 差額調整 1 件ごとの金額の下限 (合計ではありません)。指定額を含みます。負の値も指定できます
- adjustment_amount_to: integer(int64) - 差額調整 1 件ごとの金額の上限 (合計ではありません)。指定額を含みます。負の値も指定できます
- sort_by: string - 並び替えの項目 (既定値 allocated_at) (選択肢: allocated_at, total_receivable_amount, total_adjustment_amount)
- sort_order: string - 並び順 (既定値 desc) (選択肢: asc, desc)

### レスポンス

消込結果一覧取得レスポンス
- data*: array[object] - 消込結果の一覧。該当する消込結果が無い場合は空配列
- next_page_token*: string - 次のページを取得するためのトークン。次のページが無い場合は null

## POST /hub/receivable_management/allocations — 消込

請求と入金を紐づけて消込します。登録された消込結果のステータスは allocated (取引反映待ち) です。 ## 金額の条件 - 請求・入金はそれぞれ 1 件以上指定します。 - 請求に充当する金額の合計は、入金金額と差額調整の金額の合計と一致させてください。 - 差額調整の金額は、入金が請求より少ない場合 (振込手数料など) は正、多い場合は負の値を指定します。 ## 従量課金 入金は 1 件につき 1 回、はじめて消込したときに充当件数として数えます。当月の充当件数が上限件数を超えた分が従量課金の対象です。消込を解除して同じ入金を再度消込しても、重ねて数えません。 ## リトライ このAPIは冪等ではありませんが、1 つの入金を複数の消込結果に含めることはできないため、同じリクエストを再実行しても消込結果が重複して登録されることはありません。 結果が分からない場合は、入金取得APIで、指定した入金の入金残額 (unallocated_amount) が 0 になっているかで確認できます。

### リクエストボディ*

- company_id*: integer(int64) - 事業所ID 例: `1`
- receivables*: array[object] - 消込する請求 (1〜10 件)
  配列の要素:
    - receivable_id*: string - 請求ID 例: `01H5D1C19V442X3BA9TEPGDSTB`
    - amount_applied: string(int64) - この請求に充当する金額。請求残額以下かつ 1,000,000,000,000 以下の正の整数を指定します。
      lines を指定する場合は lines の金額の合計と一致させてください。
      省略した場合、lines を指定していれば lines の合計、指定していなければ請求残額の全額を充当します 例: `11000`
    - lines: array[object] - 明細ごとに充当する場合に指定します。省略した場合は請求内の明細へ自動で割り当てます。
      事業所設定で「明細単位の消込」を有効にしている場合だけ指定できます。5000 件まで指定できます
- incoming_payments*: array[object] - 消込に使う入金 (1〜10 件)
  配列の要素:
    - incoming_payment_id*: string - 入金ID 例: `01H5D1C19V442X3BA9TEPGDSTD`
    - adjustments: array[object] - この入金の差額調整 (振込手数料・雑収入など)。10 件まで指定できます

### レスポンス

消込レスポンス
- id*: string - 登録された消込結果のID

## GET /hub/receivable_management/allocations/{id} — 消込結果取得

消込結果と、消込結果に含まれる請求・入金・差額調整の内訳を取得します。 ##

注意点
- 請求・入金は ID と充当した金額だけを返します。請求・入金のそのほかの項目は、請求取得API・入金取得APIで取得してください。 - 差額調整の勘定科目名は返しません。必要な場合は `account_item_id` で freee会計 の勘定科目APIを利用してください。 - 解除した消込結果は取得できません。

### パラメータ

- company_id*: integer(int64) - 事業所ID
- id* (path): string - 取得する消込結果のID

### レスポンス

消込結果取得レスポンス
- id*: string - 消込結果ID
- allocation_number*: string(int64) - 消込番号 (事業所ごとの連番)
- allocated_at*: string(date-time) - 消込日時
- status*: string - 消込ステータス。allocated = 取引反映待ち、posting = 取引反映中、posted = 取引反映済み、post_failed = 取引反映失敗。
  posting は、取引反映を受け付けてから一定時間 (現在は 24 時間) 内に取引反映が完了しないと、受付前の status に戻ります
- registration_method*: string - 消込方法。manual = 手動、auto = 自動
- allocated_by*: string(int64) - 消込を実行したユーザーのID。ユーザー名が必要な場合は、このIDで freee会計 のユーザーAPI (Users) を利用してください
- accounting_sync_error_reason*: string - 直近の取引反映に失敗した理由を表す値。status が post_failed の場合だけ返し、それ以外の場合と、理由が記録されていない場合は null。
  取引反映を受け付けてから一定時間内に完了せず post_failed に戻った場合は、受け付ける前の失敗理由を返します。
  プログラムで処理を分ける場合に使います。利用者に表示する場合は accounting_sync_error_reason_message を使ってください。
  accounting_unavailable と accounting_closing は、時間をおいて再度取引反映すると解消することがあります。
  値は今後追加されることがあります
- accounting_sync_error_reason_message*: string - 直近の取引反映に失敗した理由と対処を説明する、利用者向けの文。accounting_sync_error_reason が null の場合は null
- receivables*: array[object] - 消込結果に含まれる請求
- incoming_payments*: array[object] - 消込結果に含まれる入金

## DELETE /hub/receivable_management/allocations/{id} — 消込の解除

消込を解除し、請求の請求残額と入金の入金残額を消込前に戻します。消込結果の差額調整は削除されます。解除した消込結果は、消込結果一覧取得APIで取得できなくなります。 ## 入金への影響 消込中に freee会計 で入金が変更されていた場合は、解除したときにその変更が入金に反映されます。freee会計 で削除された、または出金に変更された入金は、解除と同時に削除されます。 freee会計 で入金を処理済みにしていた場合、解除後の入金は処理済みになり、再度消込することはできません。

### パラメータ

- company_id*: integer(int64) - 事業所ID
- id* (path): string - 解除する消込結果のID

### レスポンス

消込の解除レスポンス

## POST /hub/receivable_management/allocations/{id}/post — 消込結果の取引反映

消込結果を freee会計 に取引反映するよう受け付けます。取引反映は受け付けた後に非同期で行うため、202 は受け付けたことだけを表し、取引反映の成否は含みません。 ## 取引反映の結果 受け付けた消込結果は、消込結果取得APIで status が posting (取引反映中) になります。取引反映の結果は、status が posted (取引反映済み) または post_failed (取引反映失敗) に変わったことで確認してください。 受け付けるときに消込結果の status でエラーを返すことはありません。取引反映できなかった場合は status が post_failed になり、理由は消込結果取得APIの accounting_sync_error_reason_message で確認できます。post_failed の消込結果も、再度実行すると受け付けます。解除した消込結果は、存在しない消込結果と同じく 404 を返します。 ## リトライ 消込結果が取引反映済み (status が posted)、または取引反映中 (status が posting) の場合は、何...

### パラメータ

- id* (path): string - 取引反映する消込結果のID

### リクエストボディ*

- company_id*: integer(int64) - 事業所ID 例: `1`

## POST /hub/receivable_management/allocations/{id}/unpost — 消込結果の取引反映の取消

取引反映済み (status が posted) の消込結果について取引反映を取り消し、status を allocated (取引反映待ち) に戻します。freee会計 に計上されていた決済取引が削除され、請求に対応する取引が「未決済」もしくは「決済中」に戻ります。差額を含む消込結果の場合は、合わせて差額に対応する取引も削除されます。債権管理 の消込結果は解除されません。解除する場合は消込の解除APIを使ってください。 ## 取り消せない場合 - 400: 消込結果が取引反映失敗 (status が post_failed)。取り消すものが無いため、必要な場合は消込の解除APIで解除してください - 400: 呼び出したユーザーが、freee会計 で入金の口座にアクセスできない、または取り消す権限が無い - 404: 消込結果が存在しない、または解除されている - 409: 消込結果が取引反映中 (status が posting)。取引反映の完了後に再実行してください - 409: 取引反映した入金が、債権管理 以外 (freee会計 の画面など) で消込されている - 409: ...

### パラメータ

- id* (path): string - 取引反映を取り消す消込結果のID

### リクエストボディ*

POST /hub/receivable_management/allocations/{id}/post と同じ

### レスポンス

消込結果の取引反映の取消レスポンス
