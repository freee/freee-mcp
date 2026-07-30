# LaborBudgets

## 概要

LaborBudgetsの操作

## エンドポイント一覧

### GET /labor_budgets

操作: 人件費予算一覧の取得

説明: この事業所の人件費予算の一覧を返します。プロジェクト・従業員・年月範囲 で絞り込みができます。対象プロジェクト数が一定値を超えるとエラーとなります。その場合はプロジェクトIDまたは従業員IDを指定して絞り込む必要があります。

### パラメータ

| 名前 | 位置 | 必須 | 型 | 説明 |
|------|------|------|-----|------|
| company_id | query | はい | integer | 事業所ID |
| project_id | query | いいえ | integer | プロジェクトID |
| person_id | query | いいえ | integer | 従業員ID |
| from | query | いいえ | string | 取得対象の開始年月（YYYY-MM）。指定した年月を含みます。 |
| to | query | いいえ | string | 取得対象の終了年月（YYYY-MM）。指定した年月を含みます。 |
| limit | query | いいえ | integer | 取得レコードの件数（デフォルト：50, 最小：1, 最大：100） |
| offset | query | いいえ | integer | 取得レコードのオフセット（デフォルト：0） |

### レスポンス (200)

成功時

- labor_budgets (必須): array[object]
  配列の要素:
    - project_id (必須): integer - 対象プロジェクトID 例: `100`
    - person_id (必須): integer - 対象従業員ID 例: `1`
    - year_month (必須): string - 対象年月（YYYY-MM） 例: `2026-06`
    - cost (必須): integer - 人件費予算の金額（円） 例: `40000`
    - hours (必須): integer - 予定工数（時間） 例: `8`
- meta (必須): object

### PUT /labor_budgets/projects/{project_id}/people/{person_id}/year_month/{year_month}

操作: 人件費予算の更新

説明: 指定したプロジェクト・従業員・年月の予定工数（時間）と人件費予算の金額を更新します。金額は従業員の単価に基づき、自動で更新されます。

### パラメータ

| 名前 | 位置 | 必須 | 型 | 説明 |
|------|------|------|-----|------|
| project_id | path | はい | integer | プロジェクトID |
| person_id | path | はい | integer | 対象従業員ID |
| year_month | path | はい | string | 対象年月（YYYY-MM） |

### リクエストボディ

- company_id (必須): integer(int32) - 事業所ID 例: `1`
- hours (必須): integer(int32) - 予定工数（時間） 例: `8` (最小: 0)

### レスポンス (200)

成功時

- labor_budget (必須): object



## 参考情報

- freee API公式ドキュメント: https://developer.freee.co.jp/docs
