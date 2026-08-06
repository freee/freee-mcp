# ManualJournals

振替伝票

## GET /api/1/manual_journals — 振替伝票一覧の取得

概要 指定した事業所の振替伝票一覧を取得する

定義
issue_date : 発生日 adjustment : 決算整理仕訳フラグ（true: 決算整理仕訳, false: 日常仕訳） txn_number : 仕訳番号 ref_number : 管理番号 details : 振替伝票の貸借行 entry_side : 貸借区分 credit : 貸方 debit : 借方 amount : 金額

注意点
振替伝票は売掛・買掛レポートには反映されません。債権・債務データの登録は取引(Deals)をお使いください。 事業所の仕訳番号形式が有効な場合のみ、レスポンスで仕訳番号(txn_number)を返します。 セグメントタグ情報は法人アドバンスプラン（および旧法人プロフェッショナルプラン）以上で利用可能です。利用可能なセグメントの数は、法人アドバンスプラン（および旧法人プロフェッショナルプラン）の場合は1つ、法人エンタープライズプランの場合は3つです。 partner_codeを利用するには、事業所の設定から取引先コードの利用を有効にする必要があります。またpartner_codeとpa...

### パラメータ

- company_id*: integer(int64) - 事業所ID
- start_issue_date: string - 発生日で絞込：開始日(yyyy-mm-dd)
- end_issue_date: string - 発生日で絞込：終了日(yyyy-mm-dd)
- entry_side: string - 貸借で絞込 (貸方: credit, 借方: debit) (選択肢: credit, debit)
- account_item_id: integer(int64) - 勘定科目IDで絞込
- min_amount: integer(int64) - 金額で絞込：下限
- max_amount: integer(int64) - 金額で絞込：上限
- partner_id: integer(int64) - 取引先IDで絞込（0を指定すると、取引先が未選択の貸借行を絞り込めます）
- partner_code: string - 取引先コードで絞込
- item_id: integer(int64) - 品目IDで絞込（0を指定すると、品目が未選択の貸借行を絞り込めます）
- section_id: integer(int64) - 部門IDで絞込（0を指定すると、部門が未選択の貸借行を絞り込めます）
- segment_1_tag_id: integer(int64) - セグメント１タグIDで絞込（0を指定すると、セグメント１タグが未選択の貸借行を絞り込めます）
- segment_2_tag_id: integer(int64) - セグメント２タグIDで絞込（0を指定すると、セグメント２タグが未選択の貸借行を絞り込めます）
- segment_3_tag_id: integer(int64) - セグメント３タグIDで絞込（0を指定すると、セグメント３タグが未選択の貸借行を絞り込めます）
- comment_status: string - コメント状態で絞込（自分宛のコメント: posted_with_mention, 自分宛のコメント-未解決: raised_with_mention, 自分宛のコメント-解決済: resolved_with_mention, コメントあり: posted, 未解決: raised, 解決済: resolved, コメントなし: none） (選択肢: posted_with_mention, raised_with_mention, resolved_with_mention, posted, raised, resolved, none)
- comment_important: boolean - お気に入りコメント付きの振替伝票を絞込
- adjustment: string - 決算整理仕訳で絞込（決算整理仕訳のみ: only, 決算整理仕訳以外: without） (選択肢: only, without)
- txn_number: string - 仕訳番号で絞込（事業所の仕訳番号形式が有効な場合のみ）
- ref_number: string - 管理番号で絞込（前方一致）
- offset: integer(int64) - 取得レコードのオフセット (デフォルト: 0)
- limit: integer(int64) - 取得レコードの件数 (デフォルト: 20, 最小: 1, 最大: 500)

### レスポンス

- manual_journals*: array[object]

## POST /api/1/manual_journals — 振替伝票の作成

概要 指定した事業所の振替伝票を作成する

定義
issue_date : 発生日 adjustment : 決算整理仕訳フラグ（true: 決算整理仕訳, false: 日常仕訳） txn_number : 仕訳番号 ref_number : 管理番号 details : 振替伝票の貸借行 entry_side : 貸借区分 credit : 貸方 debit : 借方 amount : 金額

注意点
振替伝票は売掛・買掛レポートには反映されません。債権・債務データの登録は取引(Deals)をお使いください。 事業所の仕訳番号形式が有効な場合のみ、レスポンスで仕訳番号(txn_number)を返します。 貸借合わせて100行まで仕訳行を登録できます。 セグメントタグ情報は法人アドバンスプラン（および旧法人プロフェッショナルプラン）以上で利用可能です。利用可能なセグメントの数は、法人アドバンスプラン（および旧法人プロフェッショナルプラン）の場合は1つ、法人エンタープライズプランの場合は3つです。 partner_codeを利用するには、事業所の設定から取引先コードの利用を有効にする必要が...

### リクエストボディ

- company_id*: integer(int64) - 事業所ID 例: `1` (最小: 1)
- issue_date*: string - 発生日 (yyyy-mm-dd) 例: `2019-12-17`
- adjustment: boolean - 決算整理仕訳フラグ（falseまたは未指定の場合: 日常仕訳） 例: `false`
- ref_number: string - 管理番号（20文字以内） 例: `123-456`
- details*: array[object]
  配列の要素:
    - entry_side*: string - 貸借（貸方: credit, 借方: debit） (選択肢: debit, credit) 例: `debit`
    - tax_code*: integer(int64) - 税区分コード 例: `1` (最小: 0, 最大: 2147483647)
    - account_item_id: integer(int64) - 勘定科目ID 例: `1` (最小: 1)
    - account_item_code: string - 勘定科目コード 例: `code001`
    - amount*: integer(int64) - 取引金額（税込で指定してください） 例: `10800` (最小: 1, 最大: 9223372036854776000)
    - vat: integer(int64) - 消費税額（指定しない場合は自動で計算されます） 例: `800`
    - partner_id: integer(int64) - 取引先ID 例: `1` (最小: 1)
    - partner_code: string - 取引先コード 例: `code001`
    - item_id: integer(int64) - 品目ID 例: `1` (最小: 1)
    - item_code: string - 品目コード 例: `code001`
    - section_id: integer(int64) - 部門ID 例: `1` (最小: 1)
    - section_code: string - 部門コード 例: `code001`
    - tag_ids: array[integer] - メモタグID
    - segment_1_tag_id: integer(int64) - セグメント１タグID 例: `1` (最小: 1)
    - segment_2_tag_id: integer(int64) - セグメント２タグID 例: `1` (最小: 1)
    - segment_3_tag_id: integer(int64) - セグメント３タグID 例: `1` (最小: 1)
    - segment_1_tag_code: string - セグメント１タグコード 例: `code001`
    - segment_2_tag_code: string - セグメント２タグコード 例: `code001`
    - segment_3_tag_code: string - セグメント３タグコード 例: `code001`
    - description: string - 備考 例: `備考`
- receipt_ids: array[integer] - ファイルボックス（証憑ファイル）ID（配列）

### レスポンス

- manual_journal*: object

## GET /api/1/manual_journals/{id} — 振替伝票の取得

概要 指定した事業所の振替伝票を取得する

定義
issue_date : 発生日 adjustment : 決算整理仕訳フラグ（true: 決算整理仕訳, false: 日常仕訳） txn_number : 仕訳番号 details : 振替伝票の貸借行 entry_side : 貸借区分 credit : 貸方 debit : 借方 amount : 金額

注意点
振替伝票は売掛・買掛レポートには反映されません。債権・債務データの登録は取引(Deals)をお使いください。 事業所の仕訳番号形式が有効な場合のみ、レスポンスで仕訳番号(txn_number)を返します。 セグメントタグ情報は法人アドバンスプラン（および旧法人プロフェッショナルプラン）以上で利用可能です。利用可能なセグメントの数は、法人アドバンスプラン（および旧法人プロフェッショナルプラン）の場合は1つ、法人エンタープライズプランの場合は3つです。

### パラメータ

- company_id*: integer(int64) - 事業所ID
- id* (path): integer(int64)

### レスポンス

POST /api/1/manual_journals と同じ

## PUT /api/1/manual_journals/{id} — 振替伝票の更新

概要 指定した事業所の振替伝票を更新する

定義
issue_date : 発生日 adjustment : 決算整理仕訳フラグ（true: 決算整理仕訳, false: 日常仕訳） txn_number : 仕訳番号 ref_number : 管理番号 details : 振替伝票の貸借行 entry_side : 貸借区分 credit : 貸方 debit : 借方 amount : 金額

注意点
振替伝票は売掛・買掛レポートには反映されません。債権・債務データの登録は取引(Deals)をお使いください。 事業所の仕訳番号形式が有効な場合のみ、レスポンスで仕訳番号(txn_number)を返します。 貸借合わせて100行まで仕訳行を登録できます。 detailsに含まれない既存の貸借行は削除されます。更新後も残したい行は、必ず貸借行IDを指定してdetailsに含めてください。 detailsに含まれる貸借行IDの指定がある行は、更新行として扱われ更新されます。 detailsに含まれる貸借行IDの指定がない行は、新規行として扱われ追加されます。 セグメントタグ情報は法人アドバンス...

### パラメータ

- id* (path): integer(int64)

### リクエストボディ

- company_id*: integer(int64) - 事業所ID 例: `1` (最小: 1)
- issue_date*: string - 発生日 (yyyy-mm-dd) 例: `2019-12-17`
- adjustment: boolean - 決算整理仕訳フラグ（falseまたは未指定の場合: 日常仕訳） 例: `false`
- ref_number: string - 管理番号（20文字以内） 例: `123-456`
- details*: array[object]
  配列の要素:
    - id: integer(int64) - 貸借行ID: 既存貸借行を更新または削除する場合に指定します。IDを指定しない貸借行は、新規行として扱われ追加されます。 例: `1` (最小: 1)
    - entry_side*: string - 貸借（貸方: credit, 借方: debit） (選択肢: debit, credit) 例: `debit`
    - tax_code*: integer(int64) - 税区分コード 例: `1` (最小: 0, 最大: 2147483647)
    - account_item_id: integer(int64) - 勘定科目ID 例: `1` (最小: 1)
    - account_item_code: string - 勘定科目コード 例: `code001`
    - amount*: integer(int64) - 取引金額（税込で指定してください） 例: `10800` (最小: 1, 最大: 9223372036854776000)
    - vat: integer(int64) - 消費税額（指定しない場合は自動で計算されます） 例: `800`
    - partner_id: integer(int64) - 取引先ID 例: `1` (最小: 1)
    - partner_code: string - 取引先コード 例: `code001`
    - item_id: integer(int64) - 品目ID 例: `1` (最小: 1)
    - item_code: string - 品目コード 例: `code001`
    - section_id: integer(int64) - 部門ID 例: `1` (最小: 1)
    - section_code: string - 部門コード 例: `code001`
    - tag_ids: array[integer] - メモタグID
    - segment_1_tag_id: integer(int64) - セグメント１タグID 例: `1` (最小: 1)
    - segment_2_tag_id: integer(int64) - セグメント２タグID 例: `1` (最小: 1)
    - segment_3_tag_id: integer(int64) - セグメント３タグID 例: `1` (最小: 1)
    - segment_1_tag_code: string - セグメント１タグコード 例: `code001`
    - segment_2_tag_code: string - セグメント２タグコード 例: `code001`
    - segment_3_tag_code: string - セグメント３タグコード 例: `code001`
    - description: string - 備考 例: `備考`
- receipt_ids: array[integer] - ファイルボックス（証憑ファイル）ID（配列）

### レスポンス

POST /api/1/manual_journals と同じ

## DELETE /api/1/manual_journals/{id} — 振替伝票の削除

概要 指定した事業所の振替伝票を削除する

### パラメータ

- id* (path): integer(int64)
- company_id*: integer(int64) - 事業所ID
