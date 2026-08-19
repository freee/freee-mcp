# 販売管理の操作

freee販売(sm)APIを使った案件・見積・受注・納品・売上（売上予定・定期売上・前受金）・発注・仕入・原価の管理ガイド。

## company_id は全リクエストで必須

sm APIは一覧・詳細の取得(GET)を含め、全エンドポイントで `company_id` が必須。GETは `query`、POST / PATCH / PUT（作成・更新・取消・ステータス変更）は `body` に含める。指定がないと初回から400になる。

## ドメイン用語とパスの対応

ユーザーの言葉とAPIパスの用語が異なるため注意。

- 案件: `/businesses`
- 見積: `/quotations`
- 受注: `/sales_orders`
- 納品: `/deliveries`
- 売上: `/sales`
- 売上予定: `/sales_schedules`
- 定期売上: `/periodic_sales`
- 前受金: `/advance_receipts`
- 発注: `/purchase_orders`
- 仕入: `/procurements`
- 原価予算（仕入・外部仕入・その他原価）: `/cost_budgets`
- その他原価: `/other_costs`
- マスタ（商品・明細取引タイプ・案件フェーズ・受注確度・従業員・カスタムフィールド定義）: `/master/*`

請求・入金は専用リソースではなく、売上(`/sales`)や受注(`/sales_orders`)の属性（`billing_status` / `collection_status` 等）として表現される。

## 使用例

### 案件一覧を取得

```
freee_api_get {
  "service": "sm",
  "path": "/businesses",
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

送信したフィールドのみ更新される。

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

明細(`lines`)は `deal_line_type_id` 方式で指定する（`name` は使えない）。`deal_line_type_id` は `GET /master/deal_line_types?type=sales` で取得する。

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

`lines` の `line_type` は2種類。`basic` は `deal_line_type_id` / `quantity` / `unit_price` / `withholding_enabled` / `is_manual_tax_entry` が必須、`text` は `text`（フリーテキスト行）のみ。

仕入（`/procurements`）も同じく `lines` に `deal_line_type_id`（`GET /master/deal_line_types?type=procurement` で取得）を指定して作成する。

## ID は ULID 形式

案件・受注・売上などのIDは `01JPP4FD1CVQWCDSWA90VE1ZTM` のようなULID文字列（このガイドの `/businesses/1` のような数値は説明用）。詳細・更新には一覧で取得した実際のIDを使う。

## 取消・ロック・復元の違い

- 取消（`POST /{リソース}/{id}/cancellation`）: レコードを取消状態にする（`canceled: true`）。「無かったことにする」操作
- 復元（`POST /other_costs/{id}/restoration`）: 取消済みを元に戻す（対応リソースのみ）
- ロック（`POST /businesses/{id}/close`）/ ロック解除（`POST /businesses/{id}/reopen`）: 案件を編集不可にする「確定させて編集を止める」操作

一覧の `canceled` や `closed` フィールドで状態を判別できる。

## ページネーション

一覧は `limit`（既定20・最大100）と `offset` でページングする。全件取得は `offset` を `limit` ずつ進めて、返却件数が `limit` 未満になるまでループする。

```
freee_api_get {
  "service": "sm",
  "path": "/sales",
  "query": { "company_id": 123456, "limit": 100, "offset": 0 }
}
```

## リファレンス

パス一覧・パラメータ・レスポンスの詳細は以下を参照:

- `references/sm-businesses.md` - 案件
- `references/sm-quotations.md` - 見積
- `references/sm-sales-orders.md` - 受注
- `references/sm-deliveries.md` - 納品
- `references/sm-sales.md` - 売上
- `references/sm-sales-schedules.md` - 売上予定
- `references/sm-periodic-sales.md` - 定期売上
- `references/sm-advance-receipts.md` - 前受金
- `references/sm-purchase-orders.md` - 発注
- `references/sm-procurements.md` - 仕入
- `references/sm-cost-budgets.md` - 原価予算
- `references/sm-other-costs.md` - その他原価
- `references/sm-master.md` - マスタ（商品・明細取引タイプ・案件フェーズ・受注確度・従業員等）
