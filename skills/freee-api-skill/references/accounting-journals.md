# Journals

仕訳帳

## GET /api/1/journals — 仕訳帳のダウンロード要求

概要 ユーザーが所属する事業所の仕訳帳のダウンロードをリクエストします。 生成されるファイルのファイル形式と出力項目に関しては、 ヘルプページ をご参照ください。

定義
download_type generic (旧CSV) generic_v2 (新CSV（freee汎用形式）) csv (弥生会計) pdf (PDF) encoding : download_typeがgeneric, generic_v2の場合のみ有効で、指定しない場合はsjisになります。無効なdownload_typeのうちcsvの場合はsjisでファイル出力されるので、レスポンスでsjisがかえります。 sjis utf-8 visible_tags : download_typeがgeneric, csv, pdfの場合のみ有効です。指定しない場合は従来の仕様の仕訳帳が出力されます。 partner : 取引先タグ item : 品目タグ tag : メモタグ section : 部門タグ description : 備考欄 wallet_txn_description : 明細の備考欄 segment...

### パラメータ

- download_type*: string - ダウンロード形式 (選択肢: generic, generic_v2, csv, pdf)
- encoding: string - 文字コード (選択肢: sjis, utf-8)
- company_id*: integer(int64) - 事業所ID
- visible_tags[]: array[string] - 補助科目やコメントとして出力する項目
- visible_ids[]: array[string] - 追加出力するID項目
- start_date: string - 取得開始日 (yyyy-mm-dd)
- end_date: string - 取得終了日 (yyyy-mm-dd)

## GET /api/1/journals/reports/{id}/status — 仕訳帳のステータスの取得

概要 仕訳帳のダウンロードリクエストのステータスを取得する

定義
status enqueued : 実行待ち working : 実行中 uploaded : 準備完了 id : 受け付けID

### パラメータ

- company_id*: integer(int64) - 事業所ID
- id* (path): integer(int64) - 受け付けID

### レスポンス

- journals*: object

## GET /api/1/journals/reports/{id}/download — 仕訳帳のダウンロード

概要 仕訳帳をダウンロードする

定義
id : 受け付けID

### パラメータ

- id* (path): integer(int64) - 受け付けID
- company_id*: integer(int64) - 事業所ID
