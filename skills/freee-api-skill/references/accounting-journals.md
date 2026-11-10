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

## POST /api/1/journals/search — 仕訳帳の仕訳一覧の取得

## 概要 指定した事業所の仕訳を、仕訳帳と同じ検索条件で絞り込んで取得します。検索条件はリクエストボディで指定します。 ##

定義
- `debit` / `credit`: 仕訳の借方行・貸方行。配列の順が表示順です。 - 消費税行 (`line_type: tax`): 税抜経理の期間に、仮払消費税等・仮受消費税等を取引先・税区分・貸借ごと (部門必須設定が「全科目」の事業所ではさらに部門ごと) にまとめた行です。`debit` / `credit` の末尾に付きます。明細としては存在しないため、`id` など一部の項目は `null` になります。 ## 検索条件の判定 複数の条件を指定したときは、次の単位で判定します。 - 仕訳単位: `start_issue_date` / `end_issue_date` / `deal_ids` / `start_created_date` / `end_created_date` / `adjustment` / `approval_status` / `current_approver_user_id` / `last_approv...

### リクエストボディ*

- company_id*: integer(int64) - 事業所ID (最小: 1)
- start_issue_date: string(date) - 発生日 開始 (YYYY-MM-DD、両端含む)。deal_ids が指定されていない場合は必須。
- end_issue_date: string(date) - 発生日 終了 (YYYY-MM-DD、両端含む)。deal_ids が指定されていない場合は必須。
- deal_ids: array[integer] - 取引ID配列。最大 500 件で、超えた場合は 400。複数指定は OR。指定時は発生日範囲を省略可能。両方指定した場合は取引の仕訳のうち発生日範囲内のものだけが返る。
- start_created_date: string(date) - 作成日 開始 (YYYY-MM-DD、両端含む)。仕訳の作成日時 (created_at) を日付単位で絞り込む。
- end_created_date: string(date) - 作成日 終了 (YYYY-MM-DD、両端含む)。仕訳の作成日時 (created_at) を日付単位で絞り込む。
- account_item_id: integer(int64) - 勘定科目ID (単数)。仕訳帳画面と同様に単数指定のみ。指定した勘定科目が仮払消費税等 / 仮受消費税等の場合、税抜経理の期間は消費税行の元になる明細行 (税額があるもの) も検索対象に含まれます。
- partner_id: integer(int64) - 取引先ID (単数)。
- item_id: integer(int64) - 品目ID (単数)。
- section_id: integer(int64) - 部門ID (単数)。指定した部門が事業所に存在しない場合は 400。閲覧不可な部門を指定した場合は 0 件を返す。
- memo_tag_id: integer(int64) - メモタグID (単数)。
- segment_tag_1_id: integer(int64) - セグメント1タグID (単数)。事業所で当該セグメントが未契約の場合に指定すると 400。
- segment_tag_2_id: integer(int64) - セグメント2タグID (単数)。事業所で当該セグメントが未契約の場合に指定すると 400。
- segment_tag_3_id: integer(int64) - セグメント3タグID (単数)。事業所で当該セグメントが未契約の場合に指定すると 400。
- tax_code: integer(int32) - 税区分コード。仕訳内のいずれかの明細行がこの税区分に一致する仕訳を返す。
- detail_amount_min: integer(int64) - 明細金額の下限。基準は detail_amount_basis で指定。
- detail_amount_max: integer(int64) - 明細金額の上限。基準は detail_amount_basis で指定。
- detail_amount_basis: string - 明細金額絞り込みの基準。既定 auto。 (選択肢: auto, tax_included)
- adjustment: string - 決算整理仕訳による絞り込み。 (選択肢: only, without)
- approval_status: string - 承認ステータスによる絞り込み。 (選択肢: none, in_progress, approved)
- receipts: string - 証憑 (レシート) 添付有無による絞り込み。 (選択肢: only, without)
- cost_allocation: string - 配賦仕訳による絞り込み。 (選択肢: only, without)
- reverse_journal: string - 逆仕訳・元仕訳による絞り込み。 (選択肢: reverse, not_reverse, base, not_base, both, neither)
- create_user_id: integer(int64) - 作成者ユーザーID。
- current_approver_user_id: integer(int64) - 現在の承認待ちユーザーID (承認申請中のものが対象)。
- last_approver_user_id: integer(int64) - 最終承認者ユーザーID (承認済みのものが対象)。
- comment_status: string - コメントステータスによる絞り込み。 (選択肢: posted, raised, resolved)
- comment_important: boolean - 重要コメントで絞り込む。true のときのみ意味を持つ。false は指定なしと同義。
- comment_details: string - コメント本文の部分一致検索。
- comment_poster_user_id: integer(int64) - コメント投稿者ユーザーID。
- comment_recipient_user_id: integer(int64) - コメント宛先ユーザーID。
- receipt_partner_name: string - 証憑の発行元名で検索 (部分一致)。
- ref_number: string - 管理番号 (ref_number) による前方一致検索。
- txn_number: string - 仕訳番号 (txn_number) による完全一致検索。
- description: string - 明細行の備考による部分一致検索。行単位ではなく仕訳単位で返る。
- wallet_txn_description: string - 口座明細の取引内容による部分一致検索。口座明細から作られた仕訳のみが対象。
- order_by: string - 並び順のキー。既定は txn_date。 (選択肢: txn_date, created_at)
- direction: string - 並び順の方向。既定は asc。 (選択肢: asc, desc)
- page_size: integer(int32) - 最大取得件数。既定 100、範囲 1〜1000。 (最小: 1, 最大: 1000)
- page_token: string - ページネーションのトークン。前レスポンスの next_page_token をそのまま渡す。不透明文字列。

### レスポンス

仕訳帳の仕訳一覧取得レスポンス
- data*: array[object] - 仕訳のリスト。
- next_page_token*: string - 次ページ取得のためのトークン。null の場合が最終ページ。
