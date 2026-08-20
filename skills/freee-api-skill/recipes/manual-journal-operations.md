# 振替伝票の操作

freee会計APIを使った振替伝票の登録・検索ガイド。

債権・債務データの登録には取引（deals）を使う（`recipes/deal-operations.md`）。

## 作成前の注意

振替伝票の作成に必要な勘定科目ID（`account_item_id`）、税区分コード（`tax_code`）は事業所ごとに異なる。推測せず、事前にAPIで取得すること（取得方法は `recipes/deal-operations.md` の「取引作成の前準備」を参照）。

## 使用例

### 振替伝票一覧を取得

```
freee_api_get {
  "service": "accounting",
  "path": "/api/1/manual_journals",
  "query": {
    "start_issue_date": "2025-01-01",
    "end_issue_date": "2025-01-31",
    "limit": 10
  }
}
```

### 振替伝票を作成

```
freee_api_post {
  "service": "accounting",
  "path": "/api/1/manual_journals",
  "body": {
    "company_id": 123456,
    "issue_date": "2025-01-15",
    "details": [
      {
        "entry_side": "debit",
        "account_item_id": <取得した勘定科目ID>,
        "tax_code": <取得した税区分コード>,
        "amount": 10000,
        "description": "前払費用の振替",
        "tag_ids": [TAG_ID]
      },
      {
        "entry_side": "credit",
        "account_item_id": <取得した勘定科目ID>,
        "tax_code": <取得した税区分コード>,
        "amount": 10000,
        "description": "前払費用の振替",
        "tag_ids": [TAG_ID]
      }
    ]
  }
}
```

### 振替伝票を更新

更新後も残したい貸借行は、貸借行ID（`details[].id`）を指定して `details` に含める。

```
freee_api_put {
  "service": "accounting",
  "path": "/api/1/manual_journals/1",
  "body": {
    "company_id": 123456,
    "issue_date": "2025-01-15",
    "details": [
      {
        "id": 1,
        "entry_side": "debit",
        "account_item_id": <取得した勘定科目ID>,
        "tax_code": <取得した税区分コード>,
        "amount": 15000,
        "tag_ids": [TAG_ID]
      },
      {
        "id": 2,
        "entry_side": "credit",
        "account_item_id": <取得した勘定科目ID>,
        "tax_code": <取得した税区分コード>,
        "amount": 15000,
        "tag_ids": [TAG_ID]
      }
    ]
  }
}
```

### 振替伝票を削除

```
freee_api_delete {
  "service": "accounting",
  "path": "/api/1/manual_journals/1"
}
```

## メモタグ「freee-mcp」の付与

振替伝票を作成する際は、freee-mcp 経由で作成したデータであることを識別できるよう、メモタグ「freee-mcp」を必ず付与すること。手順は `recipes/freee-mcp-tag.md` を参照。振替伝票では `details[].tag_ids` にタグIDを指定する。

## リファレンス

パス一覧・パラメータ・レスポンスの詳細は `references/accounting-manual-journals.md` を参照。
