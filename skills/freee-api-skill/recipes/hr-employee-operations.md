# 従業員・給与の操作

freee人事労務APIを使った従業員情報・給与明細の取得ガイド。

## 従業員一覧の使い分け

- 対象年月に在籍している従業員: `GET /api/v1/employees`（指定年月に退職済みのユーザーは含まれない）
- 退職者を含む全期間の従業員: `GET /api/v1/companies/{company_id}/employees`

締め日支払い日設定が翌月払いの従業員は指定 month + 1 の情報が返るため、2025年1月分を取得するには year=2024, month=12 を指定する。

## 使用例

### 従業員一覧を取得

```
freee_api_get {
  "service": "hr",
  "path": "/api/v1/employees",
  "query": {
    "year": 2025,
    "month": 1
  }
}
```

### 全期間の従業員一覧を取得

```
freee_api_get {
  "service": "hr",
  "path": "/api/v1/companies/123456/employees"
}
```

### 給与明細一覧を取得

```
freee_api_get {
  "service": "hr",
  "path": "/api/v1/salaries/employee_payroll_statements",
  "query": {
    "year": 2025,
    "month": 1
  }
}
```

賞与明細は `/api/v1/bonuses/employee_payroll_statements` を使う。

## Web確認URL

従業員詳細は `https://p.secure.freee.co.jp/employees/{id}` で確認できる。

## 注意点

管理者権限を持ったユーザーのみ実行可能なAPIが多い。自分自身の情報のみを扱う場合は `recipes/hr-attendance-operations.md` の self_only 権限の項を参照。

## リファレンス

- `references/hr-employees.md` - 従業員
- `references/hr-payroll-statements.md` - 給与明細
- `references/hr-bonus-statements.md` - 賞与明細
