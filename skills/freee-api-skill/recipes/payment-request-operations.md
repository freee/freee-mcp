# 支払依頼の操作

freee会計APIを使った支払依頼の登録・検索ガイド。

## 作成前の注意

支払依頼の作成に必要な勘定科目ID（`account_item_id`）、税区分コード（`tax_code`）、申請経路ID（`approval_flow_route_id`）は事業所ごとに異なる。推測せず、事前にAPIで取得すること（勘定科目・税区分の取得方法は `recipes/deal-operations.md` の「取引作成の前準備」、申請経路は `references/accounting-approval-flow-routes.md` を参照）。

## 使用例

### 支払依頼一覧を取得

```
freee_api_get {
  "service": "accounting",
  "path": "/api/1/payment_requests",
  "query": {
    "status": "in_progress",
    "limit": 10
  }
}
```

### 支払依頼を作成

`draft` が true なら下書き、false なら申請として作成される。

```
freee_api_post {
  "service": "accounting",
  "path": "/api/1/payment_requests",
  "body": {
    "company_id": 123456,
    "title": "仕入代金支払い",
    "issue_date": "2025-01-15",
    "draft": true,
    "approval_flow_route_id": 1,
    "partner_id": 201,
    "payment_date": "2025-01-31",
    "payment_method": "domestic_bank_transfer",
    "payment_request_lines": [
      {
        "line_type": "deal_line",
        "description": "商品仕入",
        "amount": 50000,
        "account_item_id": <取得した勘定科目ID>,
        "tax_code": <取得した税区分コード>,
        "tag_ids": [TAG_ID]
      }
    ]
  }
}
```

## メモタグ「freee-mcp」の付与

支払依頼を作成する際は、freee-mcp 経由で作成したデータであることを識別できるよう、メモタグ「freee-mcp」を必ず付与すること。手順は `recipes/freee-mcp-tag.md` を参照。支払依頼では `payment_request_lines[].tag_ids` にタグIDを指定する。

## リファレンス

パス一覧・パラメータ・レスポンスの詳細は `references/accounting-payment-requests.md` を参照。
