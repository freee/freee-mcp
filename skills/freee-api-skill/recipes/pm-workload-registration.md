# 工数の安全な登録（PM・HR連携ワークフロー）

freee工数管理と人事労務APIを連携した工数登録ワークフロー。勤怠チェック・重複確認・ユーザー承認を経て登録することで、休日・有給取得日への登録、既存工数との重複、締め済み日へのエラー登録を防ぐ。

工数APIの基本操作は `recipes/pm-operations.md`、勤怠APIの基本操作は `recipes/hr-attendance-operations.md` を参照。

## Step 1: ユーザーID解決

PM側の person_id と HR側の employee_id を紐付ける。

PM側は `GET /users/me`（service: pm）のレスポンスの `companies[].person_me.id` が person_id、`companies[].id` が company_id。

HR側の employee_id は次のいずれかで取得する。

- PM `GET /people`（`company_id` と `person_ids[]` を指定）のレスポンス `people[].payroll_employee_id`
- HR `GET /api/v1/users/me` のレスポンス `companies[].employee_id`（`payroll_employee_id` が null の場合はこちら）

どちらも null の場合は HR 未利用のユーザーなので、Step 2 をスキップして Step 3 に進む。self_only 権限の詳細は `recipes/hr-attendance-operations.md` を参照。

## Step 2: 勤怠情報の事前確認

対象日の勤怠記録を取得し、以下のいずれかに該当する場合は登録をブロックする。

```
freee_api_get {
  "service": "hr",
  "path": "/api/v1/employees/{employee_id}/work_records/2025-03-10",
  "query": {
    "company_id": 123456
  }
}
```

- 休日: `day_pattern` が `prescribed_holiday` または `legal_holiday`
- 欠勤: `is_absence` が true
- 有給: `paid_holidays` が空でない
- 締め済み: `is_editable` が false

## Step 3: 既存工数の重複チェック

PM `GET /workloads` で対象月の既存工数を取得し、同じ日・同じプロジェクトに登録済みでないか確認する。既存レコードがあればブロックする。

## Step 4: ユーザー承認（Human-in-the-Loop）

以下の情報をユーザーに提示し、承認を得てから登録を実行する。

- 登録対象日
- 勤怠状態（Step 2 の結果）
- 対象プロジェクト
- 登録時間
- 業務内容（メモ）
- 既存工数の有無（Step 3 の結果）

## Step 5: 工数登録の実行

PM `POST /workloads` で登録する（例は `recipes/pm-operations.md` 参照）。

## Step 6: 登録結果の検証

PM `GET /workloads` で登録した工数を取得し、日・プロジェクト・時間が正しいことを確認してユーザーに報告する。

## Tips

複数日分を一括登録する場合は、各日ごとに Step 2〜4 を繰り返す。ブロック条件に該当した日はスキップし、ユーザーに報告する。

権限の制約:

- 管理者権限がない場合、他の従業員の勤怠情報は取得できない（self_only 制約）
- 自分の工数登録のみであれば self_only 権限で実行可能
- 他者の工数を登録する場合は管理者権限が必要

## リファレンス

- `references/pm-workloads.md` - 工数実績
- `references/pm-people.md` - 従業員（payroll_employee_id）
- `references/pm-users.md` - ログインユーザー
- `references/hr-attendances.md` - 勤怠
