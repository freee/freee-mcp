# 請求書・見積書・納品書・領収書・発注書の操作

freee請求書APIを使った帳票操作のガイド。

## 概要

請求書 API は `https://api.freee.co.jp/iv` をベースとした独立した API です。

注意: 会計 API の `/api/1/invoices` は過去の API であり、現在は請求書 API (`service: "invoice"`) を使用してください。

## 利用可能なパス

| パス                             | 説明           |
| -------------------------------- | -------------- |
| `/invoices`                      | 請求書一覧     |
| `/invoices/{id}`                 | 請求書詳細     |
| `/invoices/{id}/cancel`          | 請求書の取消   |
| `/invoices/{id}/uncancel`        | 請求書の復元   |
| `/quotations`                    | 見積書一覧     |
| `/quotations/{id}`               | 見積書詳細     |
| `/quotations/{id}/cancel`        | 見積書の取消   |
| `/quotations/{id}/uncancel`      | 見積書の復元   |
| `/delivery_slips`                | 納品書一覧     |
| `/delivery_slips/{id}`           | 納品書詳細     |
| `/delivery_slips/{id}/cancel`    | 納品書の取消   |
| `/delivery_slips/{id}/uncancel`  | 納品書の復元   |
| `/receipts`                      | 領収書一覧     |
| `/receipts/{id}`                 | 領収書詳細     |
| `/receipts/{id}/cancel`          | 領収書の取消   |
| `/receipts/{id}/uncancel`        | 領収書の復元   |
| `/purchase_orders`               | 発注書一覧     |
| `/purchase_orders/{id}`          | 発注書詳細     |
| `/purchase_orders/{id}/cancel`   | 発注書の取消   |
| `/purchase_orders/{id}/uncancel` | 発注書の復元   |

## 注意: company_id は必須

請求書APIの一覧取得（GET）では、クエリパラメータに `company_id` が必須です。省略すると認証エラーになります。
作成（POST）でもリクエストボディに `company_id` が必須です。

## 使用例

請求書一覧を取得:

```
freee_api_get {
  "service": "invoice",
  "path": "/invoices",
  "query": { "company_id": 123456 }
}
```

請求書を作成:

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

領収書を作成:

```
freee_api_post {
  "service": "invoice",
  "path": "/receipts",
  "body": {
    "company_id": 123456,
    "receipt_date": "2025-01-15",
    "partner_id": 789,
    "partner_title": "御中",
    "tax_entry_method": "out",
    "tax_fraction": "omit",
    "withholding_tax_entry_method": "out",
    "lines": [
      {
        "description": "商品代金",
        "quantity": 1,
        "unit_price": "100000",
        "tax_rate": 10,
        "tag_ids": [TAG_ID]
      }
    ]
  }
}
```

領収書では `receipt_date`（領収日）が必須です。`receipt_number`（領収書番号）は採番設定が[自動採番する]以外の場合に必須です。

発注書を作成:

```
freee_api_post {
  "service": "invoice",
  "path": "/purchase_orders",
  "body": {
    "company_id": 123456,
    "purchase_order_date": "2025-01-15",
    "partner_id": 789,
    "partner_title": "御中",
    "tax_entry_method": "out",
    "tax_fraction": "omit",
    "withholding_tax_entry_method": "out",
    "lines": [
      {
        "description": "外注費",
        "quantity": 1,
        "unit_price": "100000",
        "tax_rate": 10,
        "tag_ids": [TAG_ID]
      }
    ]
  }
}
```

発注書では `purchase_order_date`（発注日）が必須です。`purchase_order_number`（発注書番号）は採番設定が[自動採番する]以外の場合に必須、`collects_on`（支払予定日）等の発注書固有項目も指定できます。

## 帳票の取消・復元

請求書・見積書・納品書・領収書・発注書は、削除ではなく取消（cancel）/復元（uncancel）が可能です。いずれも `PUT` メソッドで、リクエストボディに `company_id` が必須です。

請求書を取消:

```
freee_api_put {
  "service": "invoice",
  "path": "/invoices/49034614/cancel",
  "body": { "company_id": 123456 }
}
```

取消した請求書を復元:

```
freee_api_put {
  "service": "invoice",
  "path": "/invoices/49034614/uncancel",
  "body": { "company_id": 123456 }
}
```

取消・復元の結果はレスポンスの `cancel_status`（`canceled`: 取消済み、`uncanceled`: 取消されていない）で確認できます。

注意: 取消すると、取引が紐づいている帳票（請求書・納品書・領収書・発注書）では取引も削除されます。見積書は取引が紐づかないため取引削除はありません。

見積書・納品書・領収書・発注書も同様に `/{帳票パス}/{id}/cancel` および `/{帳票パス}/{id}/uncancel` で取消・復元できます。

## Tips

### メモタグ「freee-mcp」の付与

請求書・見積書・納品書・領収書・発注書を作成する際は、freee-mcp 経由で作成したデータであることを識別できるよう、メモタグ「freee-mcp」を必ず付与すること。手順は `recipes/freee-mcp-tag.md` を参照。`lines[].tag_ids` にタグIDを指定する。

### 作成後のWeb確認URL

請求書・見積書・納品書・領収書・発注書を作成・更新した後、以下のURLでWeb画面から確認できます:

| 種類   | URL形式                                                           |
| ------ | ----------------------------------------------------------------- |
| 請求書 | `https://invoice.secure.freee.co.jp/reports/invoices/{id}`        |
| 見積書 | `https://invoice.secure.freee.co.jp/reports/quotations/{id}`      |
| 納品書 | `https://invoice.secure.freee.co.jp/reports/delivery_slips/{id}`  |
| 領収書 | `https://invoice.secure.freee.co.jp/reports/receipts/{id}`        |
| 発注書 | `https://invoice.secure.freee.co.jp/reports/purchase_orders/{id}` |

レスポンスの `report_url` フィールドにも帳票詳細ページのURLが含まれます。

`{id}` は API レスポンスで返されるID（`invoice.id`など）を使用します。

例: 請求書ID `49034614` の場合

```
https://invoice.secure.freee.co.jp/reports/invoices/49034614
```

作成完了時にこのURLをユーザーに提示すると、すぐにWeb画面で内容を確認できます。

## リファレンス

詳細なAPIパラメータは以下を参照:

- `references/invoice-invoices.md` - 請求書API
- `references/invoice-quotations.md` - 見積書API
- `references/invoice-delivery-slips.md` - 納品書API
- `references/invoice-receipts.md` - 領収書API
- `references/invoice-purchase-orders.md` - 発注書API
