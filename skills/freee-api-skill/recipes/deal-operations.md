# 取引（収入・支出）の操作

freee会計APIを使った取引の登録・検索ガイド。

## 取引作成の前準備

取引の作成には事業所固有のマスタID（勘定科目ID、税区分コード、口座ID等）が必要。事業所ごとに異なるため推測やハードコードはせず、事前にAPIで取得すること。

- 勘定科目ID: `GET /api/1/account_items` から目的の勘定科目（例: 消耗品費、旅費交通費）を選ぶ
- 税区分コード: `GET /api/1/taxes/companies/{company_id}`
- 口座ID（決済済み取引の場合）: `GET /api/1/walletables`（`type` で口座区分を絞り込む）

## 使用例

### 取引一覧を取得

```
freee_api_get {
  "service": "accounting",
  "path": "/api/1/deals",
  "query": {
    "start_issue_date": "2025-01-01",
    "end_issue_date": "2025-01-31",
    "type": "expense",
    "limit": 10
  }
}
```

### 支出を作成（未決済）

`account_item_id`、`tax_code` は前準備で取得した実際の値を使う。

```
freee_api_post {
  "service": "accounting",
  "path": "/api/1/deals",
  "body": {
    "company_id": 123456,
    "issue_date": "2025-01-15",
    "type": "expense",
    "details": [
      {
        "account_item_id": <取得した勘定科目ID>,
        "tax_code": <取得した税区分コード>,
        "amount": 10000,
        "description": "消耗品購入",
        "tag_ids": [TAG_ID]
      }
    ]
  }
}
```

### 支出を作成（決済済み）

上記のbodyに支払行 `payments` を追加する。

```
"payments": [
  {
    "amount": 10000,
    "from_walletable_type": "wallet",
    "from_walletable_id": <取得した口座ID>,
    "date": "2025-01-15"
  }
]
```

## メモタグ「freee-mcp」の付与

取引を作成する際は、freee-mcp 経由で作成したデータであることを識別できるよう、メモタグ「freee-mcp」を必ず付与すること。手順は `recipes/freee-mcp-tag.md` を参照。取引では `details[].tag_ids` にタグIDを指定する。

## 作成後のWeb確認URL

作成した取引は `https://secure.freee.co.jp/deals#deal_id={id}` でWeb画面から確認できる。

## リファレンス

パス一覧・パラメータ・レスポンスの詳細は `references/accounting-deals.md` を参照。
