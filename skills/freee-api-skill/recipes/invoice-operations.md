# 請求書・見積書・納品書・領収書・発注書・支払通知書の操作

freee請求書API（`service: "invoice"`、ベースURLは `https://api.freee.co.jp/iv`）を使った帳票操作のガイド。

会計APIの `/api/1/invoices` は過去のAPIのため、現在は請求書APIを使うこと。

## company_id は必須

一覧取得（GET）ではクエリパラメータ、作成（POST）・取消/復元（PUT）ではリクエストボディに `company_id` が必須。省略すると認証エラーになる。

## 帳票の種類とパス・日付フィールド

作成時の必須の日付フィールド名は帳票ごとに異なる。

- 請求書: `/invoices` / `billing_date`
- 見積書: `/quotations` / `quotation_date`
- 納品書: `/delivery_slips` / `delivery_slip_date`
- 領収書: `/receipts` / `receipt_date`
- 発注書: `/purchase_orders` / `purchase_order_date`
- 支払通知書: `/payment_notices` / `payment_notice_date`

支払通知書のみ他帳票と仕様が異なり、`withholding_tax_entry_method` を指定できず、明細行の `tag_ids` にも対応していない。

## 使用例

### 一覧を取得

```
freee_api_get {
  "service": "invoice",
  "path": "/invoices",
  "query": { "company_id": 123456 }
}
```

### 作成

以下は請求書の例。他の帳票も日付フィールド名を差し替えれば同じ構造で作成できる。

```
freee_api_post {
  "service": "invoice",
  "path": "/invoices",
  "body": {
    "company_id": 123456,
    "billing_date": "2025-01-15",
    "partner_id": 789,
    "partner_title": "御中",
    "tax_entry_method": "out",
    "tax_fraction": "omit",
    "withholding_tax_entry_method": "out",
    "lines": [
      {
        "description": "コンサルティング費用",
        "quantity": 1,
        "unit_price": "100000",
        "tax_rate": 10,
        "tag_ids": [TAG_ID]
      }
    ]
  }
}
```

### 取消・復元

各帳票は削除ではなく取消（`PUT /{帳票パス}/{id}/cancel`）・復元（`PUT /{帳票パス}/{id}/uncancel`）を行う。

```
freee_api_put {
  "service": "invoice",
  "path": "/invoices/49034614/cancel",
  "body": { "company_id": 123456 }
}
```

取消すると、取引が紐づいている帳票（請求書・納品書・領収書・発注書・支払通知書）では取引も削除される。見積書は取引が紐づかないため取引削除はない。

## メモタグ「freee-mcp」の付与

帳票を作成する際は、freee-mcp 経由で作成したデータであることを識別できるよう、メモタグ「freee-mcp」を必ず付与すること。手順は `recipes/freee-mcp-tag.md` を参照。`lines[].tag_ids` にタグIDを指定する。支払通知書は明細行に `tag_ids` が無いため対象外。

## 作成後のWeb確認URL

`https://invoice.secure.freee.co.jp/reports/{帳票パス}/{id}` でWeb画面から確認できる（例: 請求書ID 49034614 なら `https://invoice.secure.freee.co.jp/reports/invoices/49034614`）。作成完了時にこのURLをユーザーに提示すると、すぐに内容を確認できる。

## リファレンス

パス一覧・パラメータ・レスポンスの詳細は以下を参照:

- `references/invoice-invoices.md` - 請求書
- `references/invoice-quotations.md` - 見積書
- `references/invoice-delivery-slips.md` - 納品書
- `references/invoice-receipts.md` - 領収書
- `references/invoice-purchase-orders.md` - 発注書
- `references/invoice-payment-notices.md` - 支払通知書
