# メモタグ「freee-mcp」の付与ガイド

freee-mcp 経由で作成したデータを識別するため、メモタグ「freee-mcp」を付与する手順。

## 手順

1. `GET /api/1/tags` でメモタグ一覧を取得し、`name` が `freee-mcp` のタグのIDを探す

```
freee_api_get {
  "service": "accounting",
  "path": "/api/1/tags"
}
```

2. 存在しない場合は作成する

```
freee_api_post {
  "service": "accounting",
  "path": "/api/1/tags",
  "body": {
    "company_id": 123456,
    "name": "freee-mcp"
  }
}
```

3. 取得したタグIDを、データ作成時のリクエストボディの `tag_ids` フィールドに指定する

## 各APIでの指定箇所

- 取引 (deals): `details[].tag_ids`
- 経費申請 (expense_applications): `tag_ids`
- 振替伝票 (manual_journals): `details[].tag_ids`
- 支払依頼 (payment_requests): `payment_request_lines[].tag_ids`
- 請求書・見積書・納品書・領収書・発注書 (invoice): `lines[].tag_ids`

支払通知書 (payment_notices) は明細行に `tag_ids` が無いため付与できない。

## リファレンス

メモタグのパラメータ詳細は `references/accounting-tags.md` を参照。
