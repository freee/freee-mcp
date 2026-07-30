# survey

⚠ freee-mcp（リモート版） 限定: このAPIは 「freee-mcp（リモート版）」でのみ利用できます。freee_server_info の transport が stdio の場合は呼び出せません。その際はユーザーに freee-mcp（リモート版）の設定（https://support.freee.co.jp/hc/ja/articles/56390747520537）を案内してください。

## 概要

survey

## エンドポイント一覧

### GET /hub/survey/base_surveys

操作: サーベイ企画一覧取得（リモート版freee-mcp限定）

説明: サーベイ企画の一覧を取得します。

### パラメータ

| 名前 | 位置 | 必須 | 型 | 説明 |
|------|------|------|-----|------|
| company_id | query | はい | integer(int64) | 事業所ID |

### レスポンス (200)

サーベイ企画一覧取得レスポンス

- base_surveys (必須): array[object] - サーベイ企画のリスト
  配列の要素:
    - id (必須): integer(int64) - サーベイ企画ID 例: `1`
    - title (必須): string - タイトル 例: `入社1ヶ月アンケート`
    - description (必須): string - 説明 例: `入社1ヶ月の従業員向けアンケートです`
    - template_id (必須): integer(int64) - テンプレートID 例: `1`
    - is_auto_add (必須): boolean - 対象者を自動追加するか 例: `true`
    - next_start_date (必須): string(date-time) - 次回開始日(ISO8601) 例: `2026-08-01T00:00:00Z`
    - is_pause (必須): boolean - 一時停止中か 例: `false`
    - survey_type (必須): string - サーベイ種別 (選択肢: retention)
    - answer_period (必須): integer(int32) - 回答期間 例: `7`
    - answer_period_unit (必須): string - 回答期間の単位 (選択肢: days, weeks)
    - reminder_setting (必須): object - リマインド設定
    - repeat_frequency_setting (必須): object - 繰り返し設定
    - questions_summary (必須): object - 質問数のサマリ
    - viewer_scope (必須): string - 閲覧範囲 例: `all`

### GET /hub/survey/base_surveys/{base_survey_id}/surveys

操作: 実施回一覧取得（リモート版freee-mcp限定）

説明: 指定したサーベイ企画に紐づく実施回の一覧を取得します。

### パラメータ

| 名前 | 位置 | 必須 | 型 | 説明 |
|------|------|------|-----|------|
| company_id | query | はい | integer(int64) | 事業所ID |
| base_survey_id | path | はい | integer(int64) | サーベイ企画ID |
| include_hidden | query | いいえ | boolean | 非表示の実施回も含めるか |
| year | query | いいえ | integer(int32) | 対象年でのフィルタ |

### レスポンス (200)

実施回一覧取得レスポンス

- surveys (必須): array[object] - 実施回のリスト
  配列の要素:
    - id (必須): integer(int64) - 実施回ID 例: `1`
    - title (必須): string - タイトル 例: `2026年8月度`
    - start_date (必須): string(date-time) - 開始日(ISO8601) 例: `2026-08-01T00:00:00Z`
    - status (必須): string - 実施回のステータス (選択肢: in_progress, completed)
    - answered_ratio (必須): number(float) - 回答率 例: `0.5`
    - target_count (必須): integer(int32) - 対象者数 例: `20`
    - unanswered_count (必須): integer(int32) - 未回答者数 例: `10`
    - is_hidden (必須): boolean - 非表示か 例: `false`

### GET /hub/survey/surveys/{survey_id}

操作: 実施回詳細取得（リモート版freee-mcp限定）

説明: 指定した実施回の詳細と回答対象者を取得します。

### パラメータ

| 名前 | 位置 | 必須 | 型 | 説明 |
|------|------|------|-----|------|
| company_id | query | はい | integer(int64) | 事業所ID |
| survey_id | path | はい | integer(int64) | 実施回ID |

### レスポンス (200)

実施回詳細取得レスポンス

- survey (必須): object - 実施回の詳細
  - id (必須): integer(int64) - 実施回ID 例: `1`
  - title (必須): string - タイトル 例: `2026年8月度`
  - description (必須): string - 説明 例: `入社1ヶ月の従業員向けアンケートです`
  - start_date (必須): string(date-time) - 開始日(ISO8601) 例: `2026-08-01T00:00:00Z`
  - end_date (必須): string(date-time) - 終了日(ISO8601) 例: `2026-08-08T00:00:00Z`
  - status (必須): string - 実施回のステータス (選択肢: in_progress, completed)
  - answered_ratio (必須): number(float) - 回答率 例: `0.5`
  - target_count (必須): integer(int32) - 対象者数 例: `20`
  - unanswered_count (必須): integer(int32) - 未回答者数 例: `10`
  - viewer_scope (必須): string - 閲覧範囲 例: `all`
- survey_targets (必須): array[object] - 回答対象者のリスト
  配列の要素:
    - id (必須): integer(int64) 例: `1`
    - employee_id (必須): integer(int64) - 従業員ID 例: `100`
    - answered_at (必須): string(date-time) - 回答日時(ISO8601)。未回答の場合はnull 例: `2026-08-02T10:00:00Z`
    - consecutive_unanswered_count (必須): integer(int32) - 連続未回答回数 例: `2`
- estimated_time (必須): integer(int32) - 回答所要時間の目安(分) 例: `5`



## 参考情報

- freee API公式ドキュメント: https://developer.freee.co.jp/docs
