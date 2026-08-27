# 試算表・総勘定元帳の操作

freee会計APIを使った試算表（BS/PL/CR）・総勘定元帳の取得ガイド。

## 未承認仕訳の取り扱い（呼び出し前に確認する）

試算表・総勘定元帳APIを呼び出す前に、未承認（承認待ち）の仕訳を含めた数値を取得するかユーザーに確認すること。デフォルトでは未承認仕訳は除外される（`without_in_progress`）。

- 含める場合: クエリパラメータに `approval_flow_status: "all"` を追加する
- 除外する場合: パラメータ指定は不要
- ユーザーが判断できない場合: 安全側として `approval_flow_status: "all"` を指定し、結果に「未承認仕訳を含む数値です」と注記する

`approval_flow_status` はプレミアムプラン以上、かつ仕訳承認フローが有効な事業所でのみ利用できる。

この確認は初回のAPI呼び出し前に行い、セッション内で方針が決まったら以降は同じ方針に従う。

## 使用例

### 損益計算書を取得（未承認仕訳を含む）

```
freee_api_get {
  "service": "accounting",
  "path": "/api/1/reports/trial_pl",
  "query": {
    "fiscal_year": 2025,
    "approval_flow_status": "all"
  }
}
```

### 総勘定元帳を取得

```
freee_api_get {
  "service": "accounting",
  "path": "/api/1/reports/general_ledgers",
  "query": {
    "start_date": "2025-01-01",
    "end_date": "2025-03-31",
    "approval_flow_status": "all"
  }
}
```

## リファレンス

パス一覧・パラメータ・レスポンスの詳細は以下を参照:

- `references/accounting-trial-balance.md` - 試算表（BS/PL/CR）
- `references/accounting-general-ledgers.md` - 総勘定元帳
