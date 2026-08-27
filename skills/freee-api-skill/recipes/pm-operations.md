# 工数管理の操作

freee工数管理APIを使ったプロジェクト・工数の管理ガイド。

## company_id の指定方法

すべてのエンドポイントで `company_id` が必須。GETリクエストは `query`、POST/PATCHリクエストは `body` に含める。

## 使用例

以下はリクエスト構造の参考例。APIを呼び出す前に、リファレンスで実際のパラメータ名・型・必須項目・制約を確認すること。

### プロジェクト一覧を取得

```
freee_api_get {
  "service": "pm",
  "path": "/projects",
  "query": {
    "company_id": 123456
  }
}
```

### プロジェクトを作成

```
freee_api_post {
  "service": "pm",
  "path": "/projects",
  "body": {
    "company_id": 123456,
    "name": "新規プロジェクト",
    "code": "PJ-001",
    "from_date": "2025-04-01",
    "thru_date": "2025-12-31",
    "pm_budgets_cost": 5000
  }
}
```

### 工数を登録

```
freee_api_post {
  "service": "pm",
  "path": "/workloads",
  "body": {
    "company_id": 123456,
    "project_id": 1,
    "date": "2025-03-10",
    "minutes": 120,
    "memo": "設計作業"
  }
}
```

### 工数実績を取得

```
freee_api_get {
  "service": "pm",
  "path": "/workloads",
  "query": {
    "company_id": 123456,
    "year_month": "2025-03"
  }
}
```

月次の集計は `/workload_summaries` を同じ形式で取得する。

## 人事労務APIとの連携

`/people` レスポンスの `payroll_employee_id` が人事労務側の `employee_id` に対応する。
安全な工数登録ワークフロー（勤怠チェック・重複確認・承認フロー）は `recipes/pm-workload-registration.md` を参照。

## リファレンス

パス一覧・パラメータ・レスポンスの詳細は以下を参照:

- `references/pm-projects.md` - プロジェクト
- `references/pm-workloads.md` - 工数実績・工数サマリ
- `references/pm-workload-tag-groups.md` - 工数タグ
- `references/pm-labor-budgets.md` - 人件費予算
- `references/pm-people.md` - 従業員
- `references/pm-teams.md` - チーム
- `references/pm-partners.md` - 取引先
- `references/pm-unit-costs.md` - 従業員単価
- `references/pm-users.md` - ログインユーザー
