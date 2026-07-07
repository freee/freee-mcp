# 販売管理の操作

freee販売(sm)APIを使った案件・見積・受注・納品・売上・原価の管理ガイド。

## 重要: company_id は全リクエストで必須

sm APIは一覧・詳細の取得(GET)を含め、全エンドポイントで `company_id` が必須です。指定する場所はメソッドで異なります。

| メソッド | company_id の指定場所 |
|----------|----------------------|
| GET（一覧・詳細） | `query` に含める |
| POST / PATCH / PUT（作成・更新・取消・ステータス変更） | `body` に含める |

company_id が無いと初回から400になります。GETの使用例でも必ず `query: { "company_id": ... }` を付けてください。

## ドメイン用語とパスの対応

ユーザーの言葉とAPIパスの用語が異なるため注意。

| 日本語 | リソース（パス） |
|--------|------------------|
| 案件 | `/businesses` |
| 見積 | `/quotations` |
| 受注 | `/sales_orders` |
| 納品 | `/deliveries` |
| 売上 | `/sales` |
| 原価予算（仕入・外部仕入・その他原価） | `/cost_budgets` |
| その他原価 | `/other_costs` |

請求・入金は専用リソースではなく、売上(`/sales`)や受注(`/sales_orders`)の属性（`billing_status` / `collection_status` 等）として表現されます。

## 利用可能なパス

| パス | 説明 |
|------|------|
| `/businesses` | 案件一覧・作成 |
| `/businesses/{id}` | 案件詳細・更新 |
| `/quotations` | 見積一覧・作成 |
| `/quotations/{id}` | 見積詳細・更新 |
| `/sales_orders` | 受注一覧・作成 |
| `/sales_orders/{id}` | 受注詳細・更新 |
| `/deliveries` | 納品一覧・作成 |
| `/deliveries/{id}` | 納品詳細・更新 |
| `/sales` | 売上一覧・作成 |
| `/sales/{id}` | 売上詳細・更新 |
| `/cost_budgets` | 原価予算一覧・作成 |
| `/cost_budgets/{id}` | 原価予算詳細・更新 |
| `/other_costs` | その他原価一覧・作成 |
| `/other_costs/{id}` | その他原価詳細・更新 |
| `/master/items` | 商品マスタ一覧（要 `type`: sales / procurement） |
| `/master/deal_line_types` | 明細取引タイプ一覧（要 `type`: sales / procurement） |
| `/master/business_phases` | 案件フェーズマスタ一覧 |
| `/master/sales_progressions` | 受注確度マスタ一覧 |
| `/master/employees` | 従業員一覧 |

取消・復元・ロックなどの操作は各リソースのサブパス（`/{id}/cancellation` 等）で提供されます。下記Tips参照。

## 使用例

### 案件一覧を取得

```
freee_api_get {
  "service": "sm",
  "path": "/businesses",
  "query": { "company_id": 123456 }
}
```

### 案件詳細を取得

```
freee_api_get {
  "service": "sm",
  "path": "/businesses/01JPP4FD1CVQWCDSWA90VE1ZTM",
  "query": { "company_id": 123456 }
}
```

### 案件を作成

```
freee_api_post {
  "service": "sm",
  "path": "/businesses",
  "body": {
    "company_id": 123456,
    "name": "新規案件"
  }
}
```

### 案件を更新

送信したフィールドのみ更新されます。

```
freee_api_patch {
  "service": "sm",
  "path": "/businesses/01JPP4FD1CVQWCDSWA90VE1ZTM",
  "body": {
    "company_id": 123456,
    "name": "案件名変更",
    "internal_memo": "メモ更新"
  }
}
```

### 受注を作成

明細(`lines`)は `deal_line_type_id` 方式で指定します（`name` は使えません）。`deal_line_type_id` は `GET /master/deal_line_types?type=sales` で取得してください。

```
freee_api_post {
  "service": "sm",
  "path": "/sales_orders",
  "body": {
    "company_id": 123456,
    "sales_order_date": "2025-03-10",
    "customer_id": 1,
    "billing_partner_id": 1,
    "collecting_partner_id": 1,
    "billing_creating_method_type": "manually",
    "collection_method_type": "transfer",
    "lines": [
      {
        "line_type": "basic",
        "deal_line_type_id": "01JPP4FD1CVQWCDSWA90VE1ZTM",
        "quantity": 1,
        "unit_price": 10000,
        "withholding_enabled": false,
        "is_manual_tax_entry": false
      }
    ]
  }
}
```

`lines` の `line_type` は2種類:

- `basic`: `deal_line_type_id` / `quantity` / `unit_price` / `withholding_enabled` / `is_manual_tax_entry` が必須
- `text`: `text`（フリーテキスト行）のみ

enum 値:

- `billing_creating_method_type`: `automatically`（自動で請求書作成）/ `manually`（手動）
- `collection_method_type`: `transfer`（振込）/ `cash`（現金）/ `bill_payable`（手形）/ `direct_debit`（口座振替）

### 受注一覧を取得

```
freee_api_get {
  "service": "sm",
  "path": "/sales_orders",
  "query": { "company_id": 123456 }
}
```

## Tips

### ID は ULID 形式

案件・受注・売上などのIDは `01JPP4FD1CVQWCDSWA90VE1ZTM` のようなULID文字列です（このガイドの `/businesses/1` のような数値は説明用）。詳細・更新には一覧で取得した実際のIDを使ってください。

### 取消・ロック・復元の違い

| 操作 | パス例 | 内容 |
|------|--------|------|
| 取消 | `POST /{resource}/{id}/cancellation` | レコードを取消状態にする（`canceled: true`） |
| 復元 | `POST /other_costs/{id}/restoration` | 取消済みを元に戻す（対応リソースのみ） |
| ロック | `POST /businesses/{id}/close` | 案件を編集不可にロック |
| ロック解除 | `POST /businesses/{id}/reopen` | 案件のロックを解除 |

取消は「無かったことにする」、ロックは「確定させて編集を止める」操作で別物です。一覧の `canceled` や `closed` フィールドで状態を判別できます。

### 請求・入金ステータス

売上(`/sales`)・見積(`/quotations`)の絞り込みで使うステータスの意味:

- `billing_status`: 請求書の送付状況（`not_billed` 未送付 / `billed` 送付済 / `none` 対象外）
- `collection_status`: 入金（決済）状況（`not_settled` 未決済 / `partially_settled` 一部決済済 / `settled` 決済済 / `none` 対象外）

### ページネーション

一覧は `limit`（既定20・最大100）と `offset` でページングします。全件取得は `offset` を `limit` ずつ進めて、返却件数が `limit` 未満になるまでループします。

```
freee_api_get {
  "service": "sm",
  "path": "/sales",
  "query": { "company_id": 123456, "limit": 100, "offset": 0 }
}
```

## 関連API

マスタ情報の取得:

- `references/sm-master.md` - マスタ情報（商品・明細取引タイプ・案件フェーズ・受注確度・従業員等）

## リファレンス

詳細なAPIパラメータは以下を参照:

- `references/sm-businesses.md` - 案件
- `references/sm-quotations.md` - 見積
- `references/sm-sales-orders.md` - 受注
- `references/sm-deliveries.md` - 納品
- `references/sm-sales.md` - 売上
- `references/sm-cost-budgets.md` - 原価予算
- `references/sm-other-costs.md` - その他原価
- `references/sm-master.md` - マスタ
