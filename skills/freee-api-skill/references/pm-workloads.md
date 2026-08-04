# Workloads

## POST /workloads — 工数登録

工数を登録することが出来ます。

### リクエストボディ

- company_id*: integer(int32) - 事業所ID 例: `1`
- person_id: integer(int32) - 対象従業員ID
  このパラメータは管理者かチームリーダーでログインしているときのみ指定可能。
  指定しない場合はログインユーザに登録 例: `10`
- project_id*: integer(int32) - 対象プロジェクトID 例: `100`
- date*: string(date) - 対象日 例: `2020-12-15`
- minutes*: integer(int32) - 記録時間（分） 例: `120` (最小: 1)
- memo: string - 業務内容 例: `コーディング`
- workload_tags: array[object]
  配列の要素:
    - tag_group_id*: integer(int32) - 工数タググループID 例: `11`
    - tag_id*: integer(int32) - 工数タグID 例: `12`

### レスポンス

- workload*: object - 工数実績詳細

## GET /workloads — 工数詳細の取得

取得対象の従業員の工数実績の詳細を返します。 取得対象従業員と年月の取得範囲で絞り込みできます。

### パラメータ

- company_id*: integer - 事業所ID
- employees_scope: string - 取得対象従業員の検索スコープです。 allを指定した場合は全従業員が対象です。 絞り込みを行わない場合にご使用ください。 person_ids, team_idsでの絞り込みはできません。
  teamを指定した場合はチーム単位で絞り込みが可能です。 team_idsでの絞り込みができます。 person_idsでの絞り込みはできません。
  employeeを指定した場合はperson_idsによる絞り込みができます。 team_idsでの絞り込みは行なえません。
  scopeを指定しない場合はログインユーザの情報のみの取得です。 (選択肢: all, team, employee)
- person_ids[]: array[integer] - 取得対象従業員のユーザID
- team_ids[]: array[integer] - 取得対象のチームID
- year_month*: string - 取得対象範囲（YYYY-MM）
- limit: integer - 取得レコードの件数（デフォルト：50, 最小：1, 最大100）
- offset: integer - 取得レコードのオフセット（デフォルト：0）

### レスポンス

- workloads*: array[object]
- meta*: object

## PATCH /workloads/{id} — 工数編集

指定した工数の情報を更新します。リクエストに含まれていないフィールドは更新されません。memo と workload_tags は null（または空）で削除できます。

### パラメータ

- id* (path): integer - 工数ID

### リクエストボディ

- company_id*: integer(int32) - 事業所ID 例: `1`
- project_id: integer(int32) - 対象プロジェクトID 例: `100`
- date: string(date) - 対象日 例: `2020-12-15`
- minutes: integer(int32) - 記録時間（分） 例: `120` (最小: 1, 最大: 1440)
- memo: string - 業務内容。null または空文字を指定すると削除されます。 例: `コーディング`
- workload_tags: array[object] - 工数タグ。配列全体が指定内容で置き換えられます。null または空配列を指定すると削除されます。
  配列の要素:
    - tag_group_id*: integer(int32) - 工数タググループID 例: `11`
    - tag_id*: integer(int32) - 工数タグID 例: `12`

### レスポンス

- workload*: object

## DELETE /workloads/{id} — 工数削除

指定した工数を削除します。

### パラメータ

- id* (path): integer - 工数ID
- company_id*: integer - 事業所ID

## GET /workload_summaries — 工数実績の取得

取得対象の従業員の工数実績のサマリを返します。 取得対象従業員と年月の取得範囲で絞り込みできます。

### パラメータ

GET /workloads と同じ

### レスポンス

- workload_summaries*: array[object]
- meta*: object
