# ManualJournals

振替伝票

## GET /api/1/manual_journals — 振替伝票一覧の取得

概要 指定した事業所の振替伝票を、発生日・勘定科目・金額・取引先などの条件で絞り込んで取得します。

注意点
振替伝票は売掛・買掛レポートには反映されません。債権・債務データの登録には取引APIを使用してください。 事業所の仕訳番号形式が有効な場合のみ、 txn_number に仕訳番号が入ります。 セグメントタグは法人アドバンスプラン（旧法人プロフェッショナルプランを含む）以上で利用できます。法人アドバンスプランではセグメント1、法人エンタープライズプランではセグメント1〜3を利用できます。 partner_code を利用するには、事業所の取引先コード利用設定を有効にしてください。 partner_id と partner_code は同時に指定できません。

### パラメータ

- company_id*: integer(int64) - 事業所ID
- start_issue_date: string(date) - 発生日で絞込：開始日(yyyy-mm-dd)
- end_issue_date: string(date) - 発生日で絞込：終了日(yyyy-mm-dd)
- entry_side: string - 貸借区分で絞込（credit: 貸方、debit: 借方） (選択肢: credit, debit)
- account_item_id: integer(int64) - 勘定科目IDで絞込
- min_amount: integer(int64) - 取引金額（税込・円）の下限で絞込
- max_amount: integer(int64) - 取引金額（税込・円）の上限で絞込
- partner_id: integer(int64) - 取引先IDで絞込（0を指定すると、取引先が未選択の貸借行を絞り込めます）
- partner_code: string - 取引先コードで絞込
- item_id: integer(int64) - 品目IDで絞込（0を指定すると、品目が未選択の貸借行を絞り込めます）
- section_id: integer(int64) - 部門IDで絞込（0を指定すると、部門が未選択の貸借行を絞り込めます）
- segment_1_tag_id: integer(int64) - セグメント１タグIDで絞込（0を指定すると、セグメント１タグが未選択の貸借行を絞り込めます）
- segment_2_tag_id: integer(int64) - セグメント２タグIDで絞込（0を指定すると、セグメント２タグが未選択の貸借行を絞り込めます）
- segment_3_tag_id: integer(int64) - セグメント３タグIDで絞込（0を指定すると、セグメント３タグが未選択の貸借行を絞り込めます）
- comment_status: string - コメント状態で絞込
  * `posted_with_mention` - 自分宛のコメントあり
  * `raised_with_mention` - 自分宛の未解決コメントあり
  * `resolved_with_mention` - 自分宛の解決済みコメントあり
  * `posted` - コメントあり
  * `raised` - 未解決コメントあり
  * `resolved` - 解決済みコメントあり
  * `none` - コメントなし (選択肢: posted_with_mention, raised_with_mention, resolved_with_mention, posted, raised, resolved, none)
- comment_important: boolean - お気に入りコメント付きの振替伝票を絞込
- adjustment: string - 決算整理仕訳で絞込（only: 決算整理仕訳のみ、without: 日常仕訳のみ） (選択肢: only, without)
- txn_number: string - 仕訳番号で絞込（事業所の仕訳番号形式が有効な場合のみ）
- ref_number: string - 管理番号で絞込（前方一致）
- offset: integer(int64) - 取得レコードのオフセット (デフォルト: 0)
- limit: integer(int64) - 取得レコードの件数 (デフォルト: 20, 最小: 1, 最大: 500)

### レスポンス

振替伝票の一覧
- manual_journals*: array[object]

## POST /api/1/manual_journals — 振替伝票の作成

概要 指定した事業所に、貸借が一致する振替伝票を作成します。各貸借行の金額は税込・円で指定します。

注意点
振替伝票は売掛・買掛レポートには反映されません。債権・債務データの登録には取引APIを使用してください。 貸借行は貸方・借方の合計で100行まで指定でき、貸方と借方の金額合計を一致させる必要があります。 勘定科目は account_item_id または account_item_code のどちらか一方を指定してください。コードを利用するには事業所の勘定科目コード利用設定を有効にしてください。 取引先・品目・部門・セグメントタグも、IDとコードを同時に指定できません。各コードを利用するには、対応する事業所のコード利用設定を有効にしてください。 セグメントタグは法人アドバンスプラン（旧法人プロフェッショナルプランを含む）以上で利用できます。

### リクエストボディ

- company_id*: integer(int64) - 事業所ID 例: `1` (最小: 1)
- issue_date*: string(date) - 振替伝票の発生日（yyyy-mm-dd） 例: `2019-12-17`
- adjustment: boolean - 決算整理仕訳フラグ（true: 決算整理仕訳、falseまたは未指定: 日常仕訳） 例: `false`
- ref_number: string - 利用者が振替伝票を管理するための管理番号（20文字以内） 例: `123-456`
- details*: array[object] - 貸借行一覧。貸方と借方の合計金額を一致させ、合計100行以内で指定します。
  配列の要素:
    - entry_side*: string - 貸借区分（debit: 借方、credit: 貸方） (選択肢: debit, credit) 例: `debit`
    - tax_code*: integer(int64) - 貸借行に適用する税区分コード。税区分APIで取得したcodeを指定します。 例: `1` (最小: 0, 最大: 2147483647)
    - account_item_id: integer(int64) - 勘定科目ID。account_item_codeと同時に指定できません。どちらか一方を指定してください。 例: `1` (最小: 1)
    - account_item_code: string - 勘定科目コード。事業所の勘定科目コード利用設定が有効な場合に、account_item_idの代わりに指定できます。 例: `code001`
    - amount*: integer(int64) - 取引金額（税込・円） 例: `10800` (最小: 1, 最大: 9223372036854776000)
    - vat: integer(int64) - 消費税額（円）。未指定の場合はamountとtax_codeから自動計算されます。 例: `800`
    - partner_id: integer(int64) - 取引先ID。partner_codeと同時に指定できません。 例: `1` (最小: 1)
    - partner_code: string - 取引先コード。事業所の取引先コード利用設定が有効な場合に、partner_idの代わりに指定できます。 例: `code001`
    - item_id: integer(int64) - 品目ID。item_codeと同時に指定できません。 例: `1` (最小: 1)
    - item_code: string - 品目コード。事業所の品目コード利用設定が有効な場合に、item_idの代わりに指定できます。 例: `code001`
    - section_id: integer(int64) - 部門ID。section_codeと同時に指定できません。操作ユーザーが利用可能な部門を指定してください。 例: `1` (最小: 1)
    - section_code: string - 部門コード。事業所の部門コード利用設定が有効な場合に、section_idの代わりに指定できます。 例: `code001`
    - tag_ids: array[integer] - 貸借行に付与するメモタグIDの一覧
    - segment_1_tag_id: integer(int64) - セグメント1タグID。segment_1_tag_codeと同時に指定できません。 例: `1` (最小: 1)
    - segment_2_tag_id: integer(int64) - セグメント2タグID。segment_2_tag_codeと同時に指定できません。 例: `1` (最小: 1)
    - segment_3_tag_id: integer(int64) - セグメント3タグID。segment_3_tag_codeと同時に指定できません。 例: `1` (最小: 1)
    - segment_1_tag_code: string - セグメント1タグコード。事業所のセグメントタグコード利用設定が有効な場合に、segment_1_tag_idの代わりに指定できます。 例: `code001`
    - segment_2_tag_code: string - セグメント2タグコード。事業所のセグメントタグコード利用設定が有効な場合に、segment_2_tag_idの代わりに指定できます。 例: `code001`
    - segment_3_tag_code: string - セグメント3タグコード。事業所のセグメントタグコード利用設定が有効な場合に、segment_3_tag_idの代わりに指定できます。 例: `code001`
    - description: string - 備考 例: `備考`
- receipt_ids: array[integer] - 振替伝票に添付するファイルボックス（証憑ファイル）IDの一覧。操作ユーザーが参照可能なファイルを指定してください。

### レスポンス

作成した振替伝票
- manual_journal*: object

## GET /api/1/manual_journals/{id} — 振替伝票の取得

概要 指定した事業所と振替伝票IDに一致する振替伝票を取得します。

注意点
事業所の仕訳番号形式が有効な場合のみ、 txn_number に仕訳番号が入ります。 セグメントタグは契約プランで利用可能なものだけがレスポンスに含まれます。 各種コードは、対応する事業所のコード利用設定が有効な場合だけレスポンスに含まれます。

### パラメータ

- company_id*: integer(int64) - 事業所ID
- id* (path): integer(int64) - 振替伝票ID

### レスポンス

指定した振替伝票
- manual_journal*: object

## PUT /api/1/manual_journals/{id} — 振替伝票の更新

概要 指定した振替伝票を、リクエストに含めた貸借行の内容で更新します。各貸借行の金額は税込・円で指定します。

注意点
details に含まれない既存の貸借行は削除されます。残す行は貸借行IDを指定して必ず details に含めてください。 貸借行IDを指定した行は更新され、指定しない行は新規行として追加されます。 貸借行は貸方・借方の合計で100行まで指定でき、貸方と借方の金額合計を一致させる必要があります。 勘定科目・取引先・品目・部門・セグメントタグは、IDとコードを同時に指定できません。コードを利用するには、対応する事業所のコード利用設定を有効にしてください。 承認済みの振替伝票は、事業所設定と操作ユーザーの権限によって更新できない場合があります。

### パラメータ

- id* (path): integer(int64) - 振替伝票ID

### リクエストボディ

- company_id*: integer(int64) - 事業所ID 例: `1` (最小: 1)
- issue_date*: string(date) - 振替伝票の発生日（yyyy-mm-dd） 例: `2019-12-17`
- adjustment: boolean - 決算整理仕訳フラグ（true: 決算整理仕訳、falseまたは未指定: 日常仕訳） 例: `false`
- ref_number: string - 利用者が振替伝票を管理するための管理番号（20文字以内） 例: `123-456`
- details*: array[object] - 貸借行一覧。貸方と借方の合計金額を一致させ、合計100行以内で指定します。ここに含めない既存の貸借行は削除されます。
  配列の要素:
    - id: integer(int64) - 貸借行ID。既存行を更新して残す場合に指定します。IDを指定しない行は新規行として追加されます。 例: `1` (最小: 1)
    - entry_side*: string - 貸借区分（debit: 借方、credit: 貸方） (選択肢: debit, credit) 例: `debit`
    - tax_code*: integer(int64) - 貸借行に適用する税区分コード。税区分APIで取得したcodeを指定します。 例: `1` (最小: 0, 最大: 2147483647)
    - account_item_id: integer(int64) - 勘定科目ID。account_item_codeと同時に指定できません。どちらか一方を指定してください。 例: `1` (最小: 1)
    - account_item_code: string - 勘定科目コード。事業所の勘定科目コード利用設定が有効な場合に、account_item_idの代わりに指定できます。 例: `code001`
    - amount*: integer(int64) - 取引金額（税込・円） 例: `10800` (最小: 1, 最大: 9223372036854776000)
    - vat: integer(int64) - 消費税額（円）。未指定の場合はamountとtax_codeから自動計算されます。 例: `800`
    - partner_id: integer(int64) - 取引先ID。partner_codeと同時に指定できません。 例: `1` (最小: 1)
    - partner_code: string - 取引先コード。事業所の取引先コード利用設定が有効な場合に、partner_idの代わりに指定できます。 例: `code001`
    - item_id: integer(int64) - 品目ID。item_codeと同時に指定できません。 例: `1` (最小: 1)
    - item_code: string - 品目コード。事業所の品目コード利用設定が有効な場合に、item_idの代わりに指定できます。 例: `code001`
    - section_id: integer(int64) - 部門ID。section_codeと同時に指定できません。操作ユーザーが利用可能な部門を指定してください。 例: `1` (最小: 1)
    - section_code: string - 部門コード。事業所の部門コード利用設定が有効な場合に、section_idの代わりに指定できます。 例: `code001`
    - tag_ids: array[integer] - 貸借行に付与するメモタグIDの一覧
    - segment_1_tag_id: integer(int64) - セグメント1タグID。segment_1_tag_codeと同時に指定できません。 例: `1` (最小: 1)
    - segment_2_tag_id: integer(int64) - セグメント2タグID。segment_2_tag_codeと同時に指定できません。 例: `1` (最小: 1)
    - segment_3_tag_id: integer(int64) - セグメント3タグID。segment_3_tag_codeと同時に指定できません。 例: `1` (最小: 1)
    - segment_1_tag_code: string - セグメント1タグコード。事業所のセグメントタグコード利用設定が有効な場合に、segment_1_tag_idの代わりに指定できます。 例: `code001`
    - segment_2_tag_code: string - セグメント2タグコード。事業所のセグメントタグコード利用設定が有効な場合に、segment_2_tag_idの代わりに指定できます。 例: `code001`
    - segment_3_tag_code: string - セグメント3タグコード。事業所のセグメントタグコード利用設定が有効な場合に、segment_3_tag_idの代わりに指定できます。 例: `code001`
    - description: string - 備考 例: `備考`
- receipt_ids: array[integer] - 更新後に振替伝票へ添付するファイルボックス（証憑ファイル）IDの一覧。操作ユーザーが参照可能なファイルを指定してください。

### レスポンス

更新した振替伝票
- manual_journal*: object

## DELETE /api/1/manual_journals/{id} — 振替伝票の削除

概要 指定した事業所と振替伝票IDに一致する振替伝票を削除します。

注意点
承認済みの振替伝票は、事業所設定と操作ユーザーの権限によって削除できない場合があります。

### パラメータ

- id* (path): integer(int64) - 振替伝票ID
- company_id*: integer(int64) - 事業所ID

### レスポンス

削除成功（レスポンスボディなし）
