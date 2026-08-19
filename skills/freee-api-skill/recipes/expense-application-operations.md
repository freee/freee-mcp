# 経費申請の操作

freee会計APIを使った経費申請の作成・取得・承認ガイド。

## 作成前の注意

経費申請の作成に必要な経費科目ID（`expense_application_line_template_id`）は事業所ごとに異なる。推測せず、事前に `GET /api/1/expense_application_line_templates` で取得すること。

## 使用例

### 経費申請一覧を取得

```
freee_api_get {
  "service": "accounting",
  "path": "/api/1/expense_applications",
  "query": {
    "limit": 10
  }
}
```

### 経費申請を作成

```
freee_api_post {
  "service": "accounting",
  "path": "/api/1/expense_applications",
  "body": {
    "company_id": 123456,
    "title": "交通費",
    "issue_date": "2025-01-15",
    "tag_ids": [TAG_ID],
    "expense_application_lines": [
      {
        "transaction_date": "2025-01-15",
        "description": "新宿→渋谷",
        "amount": 400
      }
    ]
  }
}
```

## メモタグ「freee-mcp」の付与

経費申請を作成する際は、freee-mcp 経由で作成したデータであることを識別できるよう、メモタグ「freee-mcp」を必ず付与すること。手順は `recipes/freee-mcp-tag.md` を参照。経費申請では `tag_ids` にタグIDを指定する。

## 作成後のWeb確認URL

作成した経費申請は `https://secure.freee.co.jp/expense_applications/{id}` でWeb画面から確認できる。

## 注意点

- 申請経路に部門役職データ連携を使用している経費申請はAPI経由で作成・更新できない
- 申請の削除は下書き・差戻し状態の場合のみ可能
- 領収書添付が必要な場合はファイルボックスAPIと連携する（`recipes/receipt-operations.md`）

## リファレンス

パス一覧・パラメータ・レスポンスの詳細は `references/accounting-expense-applications.md`、経費科目は `references/accounting-expense-application-line-templates.md` を参照。
