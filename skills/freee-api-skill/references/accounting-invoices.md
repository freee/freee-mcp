# Invoices

請求書

## GET /api/1/invoices — 請求書一覧の取得

概要 指定した事業所の請求書一覧を取得する

### パラメータ

- company_id*: integer(int64) - 事業所ID
- partner_id: integer(int64) - 取引先IDで絞込
- partner_code: string - 取引先コードで絞込
- start_issue_date: string - 請求日の開始日(yyyy-mm-dd)
- end_issue_date: string - 請求日の終了日(yyyy-mm-dd)
- start_due_date: string - 期日の開始日(yyyy-mm-dd)
- end_due_date: string - 期日の終了日(yyyy-mm-dd)
- invoice_number: string - 請求書番号
- description: string - 概要
- invoice_status: string - 請求書ステータス (draft: 下書き, applying: 申請中, remanded: 差し戻し, rejected: 却下, approved: 承認済み, unsubmitted: 送付待ち, submitted: 送付済み) (選択肢: draft, applying, remanded, rejected, approved, unsubmitted, submitted)
- payment_status: string - 入金ステータス (unsettled: 入金待ち, settled: 入金済み) (選択肢: unsettled, settled)
- offset: integer(int64) - 取得レコードのオフセット (デフォルト: 0)
- limit: integer(int64) - 取得レコードの件数 (デフォルト: 20, 最大: 100)

### レスポンス

- invoices*: array[object]

## GET /api/1/invoices/{id} — 請求書の取得

概要 指定した事業所の請求書を取得する

### パラメータ

- company_id*: integer(int64) - 事業所ID
- id* (path): integer(int64) - 請求書ID

### レスポンス

- invoice*: object
