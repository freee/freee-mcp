# Receipts

ファイルボックス（証憑ファイル）

## GET /api/1/receipts — ファイルボックス（証憑ファイル）一覧の取得

概要 指定した事業所のファイルボックス（証憑ファイル）一覧を取得する

### パラメータ

- company_id*: integer(int64) - 事業所ID
- start_date*: string - アップロード日 (yyyy-mm-dd)
- end_date*: string - アップロード日 (yyyy-mm-dd)
- user_name: string - アップロードしたユーザー名、メールアドレス
- number: integer(int64) - アップロードファイルNo
- comment_type: string - posted:コメントあり, raised:未解決, resolved:解決済 (選択肢: posted, raised, resolved)
- comment_important: boolean - trueの時、お気に入りコメント付きが対象
- category: string - all:すべて、without_deal:未登録、with_expense_application_line:経費申請中, with_deal:登録済み、ignored:無視 (選択肢: all, without_deal, with_expense_application_line, with_deal, ignored)
- offset: integer(int64) - 取得レコードのオフセット (デフォルト: 0)
- limit: integer(int64) - 取得レコードの件数 (デフォルト: 50, 最小: 1, 最大: 3000)

### レスポンス

- receipts*: array[object]

## POST /api/1/receipts — ファイルボックス（証憑ファイル）のアップロード

概要 ファイルボックス（証憑ファイル）をアップロードする

注意点
リクエストヘッダーの Content-Type は、multipart/form-dataにのみ対応しています。 インボイス制度適格請求書発行事業者登録番号はOCR解析結果が採用されます。OCR解析結果を確認する場合は、Web画面にてご確認ください。上書きする場合は、ファイルボックス（証憑ファイル）の更新APIをご利用ください。 以下の制限を満たさない場合アップロードに失敗します。 ファイルサイズの制限： 64MBまで 月間アップロード容量の制限： 月間合計10GBまで 1分間あたりのアップロード数制限： 300ファイルまで プランによる月間アップロード数の制限： 以下のリンクからご確認ください 【個人】freee会計のプランについて 【法人】freee会計のプランについて（2024年7月以降）

### レスポンス

- receipt*: object

## GET /api/1/receipts/{id} — ファイルボックス（証憑ファイル）の取得

概要 指定した事業所のファイルボックス（証憑ファイル）を取得する

### パラメータ

- id* (path): integer(int64) - ファイルボックス（証憑ファイル）ID
- company_id*: integer(int64) - 事業所ID

### レスポンス

POST /api/1/receipts と同じ

## PUT /api/1/receipts/{id} — ファイルボックス（証憑ファイル）の更新

概要 ファイルボックス（証憑ファイル）を更新する

注意点
本APIでは、証憑ファイルの再アップロードはできません。

### パラメータ

- id* (path): integer(int64) - ファイルボックス（証憑ファイル）ID

### リクエストボディ

- company_id*: integer(int64) - 事業所ID 例: `1` (最小: 1)
- description: string - メモ (255文字以内) 例: `メモ`
- receipt_metadatum: object
  - partner_name: string - 発行元 例: `freeeパートナー`
  - issue_date: string - 発行日 (yyyy-mm-dd) 例: `2019-12-17`
  - amount: integer(int64) - 金額 例: `5250` (最小: -999999999999, 最大: 999999999999)
- qualified_invoice: string - 適格請求書等（qualified: 該当する、not_qualified: 該当しない、unselected: 未選択） (選択肢: qualified, not_qualified, unselected) 例: `qualified`
- invoice_registration_number: string - インボイス制度適格請求書発行事業者登録番号
  - 先頭T数字13桁の固定14桁の文字列
  国税庁インボイス制度適格請求書発行事業者公表サイト 例: `T1000000000001` (パターン: ^T?[1-9][0-9]{12}$)
- document_type: string - 書類の種類（receipt: 領収書、invoice: 請求書、other: その他） (選択肢: receipt, invoice, other) 例: `receipt`

### レスポンス

POST /api/1/receipts と同じ

## DELETE /api/1/receipts/{id} — ファイルボックス（証憑ファイル）の削除

概要 ファイルボックス（証憑ファイル）を削除する

### パラメータ

GET /api/1/receipts/{id} と同じ

## GET /api/1/receipts/{id}/download — ファイルボックス（証憑ファイル）のダウンロード

概要 指定した事業所のファイルボックス（証憑ファイル）をダウンロードする

### パラメータ

GET /api/1/receipts/{id} と同じ
