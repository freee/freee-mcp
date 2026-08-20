# Quotations

見積書

## GET /api/1/quotations — 見積書一覧の取得

概要 指定した事業所の見積書一覧を取得する

注意点
partner_id と partner_code は同時に指定できません。どちらか一方のみ指定してください。 partner_code は、事業所で取引先コードの利用設定が有効な場合のみ指定できます。無効な事業所で指定した場合はエラーになります。 APIを利用するユーザーに閲覧権限のない部門が紐づく見積書は、取得結果に含まれません。

### パラメータ

- company_id*: integer(int64) - 事業所ID
- partner_id: integer(int64) - 取引先IDで絞込（partner_code と同時に指定することはできません）
- partner_code: string - 取引先コードで絞込（事業所で取引先コードの利用設定が有効な場合のみ利用できます。partner_id と同時に指定することはできません）
- start_issue_date: string - 見積日の開始日(yyyy-mm-dd)
- end_issue_date: string - 見積日の終了日(yyyy-mm-dd)
- quotation_number: string - 見積書番号
- description: string - 概要
- quotation_status: string - 見積書ステータス (unsubmitted: 送付待ち, submitted: 送付済み, all: 全て) (選択肢: all, unsubmitted, submitted)
- offset: integer(int64) - 取得レコードのオフセット (デフォルト: 0)
- limit: integer(int64) - 取得レコードの件数 (デフォルト: 20, 最大: 100)

### レスポンス

- quotations*: array[object]

## GET /api/1/quotations/{id} — 見積書の取得

概要 指定した事業所の見積書詳細を取得する

注意点
APIを利用するユーザーに閲覧権限のない部門が紐づく見積書を指定した場合は、存在しない見積書としてエラーになります。

### パラメータ

- company_id*: integer(int64) - 事業所ID
- id* (path): integer(int64) - 見積書ID

### レスポンス

- quotation*: object
