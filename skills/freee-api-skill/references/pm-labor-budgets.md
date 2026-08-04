# LaborBudgets

## GET /labor_budgets — 人件費予算一覧の取得

この事業所の人件費予算の一覧を返します。プロジェクト・従業員・年月範囲 で絞り込みができます。対象プロジェクト数が一定値を超えるとエラーとなります。その場合はプロジェクトIDまたは従業員IDを指定して絞り込む必要があります。

### パラメータ

- company_id*: integer - 事業所ID
- project_id: integer - プロジェクトID
- person_id: integer - 従業員ID
- from: string - 取得対象の開始年月（YYYY-MM）。指定した年月を含みます。
- to: string - 取得対象の終了年月（YYYY-MM）。指定した年月を含みます。
- limit: integer - 取得レコードの件数（デフォルト：50, 最小：1, 最大：100）
- offset: integer - 取得レコードのオフセット（デフォルト：0）

### レスポンス

- labor_budgets*: array[object]
- meta*: object

## PUT /labor_budgets/projects/{project_id}/people/{person_id}/year_month/{year_month} — 人件費予算の更新

指定したプロジェクト・従業員・年月の予定工数（時間）と人件費予算の金額を更新します。金額は従業員の単価に基づき、自動で更新されます。

### パラメータ

- project_id* (path): integer - プロジェクトID
- person_id* (path): integer - 対象従業員ID
- year_month* (path): string - 対象年月（YYYY-MM）

### リクエストボディ

- company_id*: integer(int32) - 事業所ID 例: `1`
- hours*: integer(int32) - 予定工数（時間） 例: `8` (最小: 0)

### レスポンス

- labor_budget*: object
