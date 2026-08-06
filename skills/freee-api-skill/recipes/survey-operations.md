# サーベイの操作

⚠ freee-mcp（リモート版） 限定: このAPIは 「freee-mcp（リモート版）」でのみ利用できます。freee_server_info の transport が stdio の場合は呼び出せません。その際はユーザーに freee-mcp（リモート版）の設定（https://support.freee.co.jp/hc/ja/articles/56390747520537）を案内してください。

freeeサーベイAPIを使ったサーベイ企画・実施回の取得ガイド。

各リソースの詳細なエンドポイント仕様は以下のリファレンスを参照。

- `references/survey-surveys.md` - サーベイ企画・実施回

## 読み取り専用

サーベイAPIは現時点で参照系（GET）のみ。作成・更新・削除のエンドポイントは提供されていない。

## リソースとドリルダウン

サーベイ企画（`base_survey`）1件に対して、実施回（`survey`）が複数紐づく。

| リソース | path | 用途 |
|----------|------|------|
| サーベイ企画 | `/hub/survey/base_surveys` | 企画そのもの（テンプレート、繰り返し設定など） |
| 実施回 | `/hub/survey/base_surveys/{base_survey_id}/surveys` | 企画に紐づく実施回の一覧 |
| 実施回詳細 | `/hub/survey/surveys/{survey_id}` | 実施回の詳細＋回答対象者一覧 |

```
freee_api_get {
  "service": "survey",
  "path": "/hub/survey/base_surveys",
  "query": { "company_id": 123456 }
}
# → base_surveys[].id を使って実施回一覧を取得

freee_api_get {
  "service": "survey",
  "path": "/hub/survey/base_surveys/1/surveys",
  "query": { "company_id": 123456 }
}
# → surveys[].id (survey_id) を使って詳細を取得

freee_api_get {
  "service": "survey",
  "path": "/hub/survey/surveys/10",
  "query": { "company_id": 123456 }
}
# → survey, survey_targets（回答対象者）, estimated_time を返す
```

## company_id の取り扱い

他の freee API と同様、`company_id`（クエリパラメータ、必須）は現在の事業所（`freee_get_current_company`）と一致している必要がある。不一致だとエラーになる。切り替えは `freee_set_current_company` を使う。

## 実施回一覧の絞り込み

`/hub/survey/base_surveys/{base_survey_id}/surveys` は `include_hidden` / `year` で絞り込み可能。`include_hidden` を省略すると非表示の実施回は結果に含まれない点に注意。詳細なパラメータは `references/survey-surveys.md` を参照。

## 回答対象者の未回答状況

督促対象の洗い出しには、`GET /hub/survey/surveys/{survey_id}` レスポンスの `survey_targets[].answered_at` と `consecutive_unanswered_count` を使う。フィールドの詳細は `references/survey-surveys.md` を参照。
