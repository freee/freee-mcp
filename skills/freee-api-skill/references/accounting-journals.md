# Journals

仕訳帳

## GET /api/1/journals — 仕訳帳のダウンロード要求

概要 指定した事業所の仕訳帳ファイルの作成を依頼する（非同期処理） 本APIはファイル作成のリクエストを受け付けるのみで、ファイルは非同期で作成されます。レスポンスの id（受け付けID）を使って、仕訳帳のステータスの取得（GET /api/1/journals/reports/{id}/status）でステータスを確認し、uploaded になったら仕訳帳のダウンロード（GET /api/1/journals/reports/{id}/download）でファイルを取得してください。 生成されるファイルのファイル形式と出力項目に関しては、 ヘルプページ をご参照ください。download_type ごとの詳細は以下をご参照ください。 generic (旧CSV) generic_v2 (新CSV（freee汎用形式）) csv (弥生会計) pdf (PDF)

注意点
start_date・end_date を指定しない場合は、当期の会計年度の開始日・終了日が自動で設定されます。 encoding は download_type が generic・generic_v2 の場合のみ指...

### パラメータ

- download_type*: string - ダウンロード形式
  * `generic` - 旧CSV形式
  * `generic_v2` - 新CSV形式（freee汎用形式）
  * `csv` - 弥生会計形式のCSV
  * `pdf` - PDF形式 (選択肢: generic, generic_v2, csv, pdf)
- encoding: string - 出力ファイルの文字コード。download_type が generic・generic_v2 の場合のみ指定できます。未指定の場合は sjis になります。
  * `sjis` - Shift_JIS
  * `utf-8` - UTF-8 (選択肢: sjis, utf-8)
- company_id*: integer(int64) - 事業所ID。/api/1/companies（事業所一覧の取得）で取得できます。
- visible_tags[]: array[string] - 補助科目やコメントとして出力する項目。download_type が generic・csv・pdf の場合のみ指定できます。
  * `partner` - 取引先タグ
  * `item` - 品目タグ
  * `tag` - メモタグ
  * `section` - 部門タグ
  * `description` - 備考欄
  * `wallet_txn_description` - 明細の備考欄
  * `segment_1_tag` - セグメント１タグ（download_type:generic のみ）
  * `segment_2_tag` - セグメント２タグ（download_type:generic のみ）
  * `segment_3_tag` - セグメント３タグ（download_type:generic のみ）
  * `all` - セグメントタグを除く上記すべてを有効として扱います。セグメントが必要な場合は all ではなく segment_1_tag・segment_2_tag・segment_3_tag を個別に指定してください。
- visible_ids[]: array[string] - 追加出力するID項目。download_type が generic の場合のみ指定できます。
  * `deal_id` - 取引ID
  * `transfer_id` - 取引（振替）ID
  * `manual_journal_id` - 振替伝票ID
- start_date: string - 取得開始日（yyyy-mm-dd）。未指定の場合は当期の会計年度の開始日になります。
- end_date: string - 取得終了日（yyyy-mm-dd）。未指定の場合は当期の会計年度の終了日になります。

## GET /api/1/journals/reports/{id}/status — 仕訳帳のステータスの取得

概要 仕訳帳のダウンロードリクエストのステータスを取得する 仕訳帳のダウンロード要求（GET /api/1/journals）のレスポンスで返る id（受け付けID）を指定します。status が uploaded になると、レスポンスに download_url（仕訳帳のダウンロード（GET /api/1/journals/reports/{id}/download）のURL）が含まれます。

注意点
status が failed の場合はファイルの作成に失敗しています。仕訳帳のダウンロード要求（GET /api/1/journals）から再度やり直してください。 指定した id が存在しない場合は 404 エラーになります。

### パラメータ

- company_id*: integer(int64) - 事業所ID。/api/1/companies（事業所一覧の取得）で取得できます。
- id* (path): integer(int64) - 受け付けID。仕訳帳のダウンロード要求（GET /api/1/journals）のレスポンスで返る id を指定します。

### レスポンス

- journals*: object

## GET /api/1/journals/reports/{id}/download — 仕訳帳のダウンロード

概要 作成が完了した仕訳帳ファイルをダウンロードする 仕訳帳のステータスの取得（GET /api/1/journals/reports/{id}/status）で status が uploaded になった後に呼び出してください。ファイルは仕訳帳のダウンロード要求（GET /api/1/journals）で指定した download_type に応じて CSV（text/csv）または PDF（application/pdf）で返ります。

注意点
ファイルの作成が完了していない場合や、指定した id が存在しない場合は 404 エラーになります。

### パラメータ

- id* (path): integer(int64) - 受け付けID。仕訳帳のダウンロード要求（GET /api/1/journals）のレスポンスで返る id を指定します。
- company_id*: integer(int64) - 事業所ID。/api/1/companies（事業所一覧の取得）で取得できます。
