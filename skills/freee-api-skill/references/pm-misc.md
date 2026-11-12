<!-- freee工数管理 の小さいタグをまとめたファイル。タグごとの行範囲は INDEX.md を参照し、必要な範囲だけ読むこと。 -->

# DailyAttendances

## PUT /daily_attendances/bulk — 勤怠情報の一括登録・更新

外部勤怠データを工数管理に取り込み、工数照合に必要な日単位の勤怠情報を登録・更新します。対象従業員の勤怠連携設定が「Public API」になっていない場合はエラーになります。

### リクエストボディ*

- company_id*: integer(int32) - 事業所ID 例: `1`
- person_id: integer(int32) - 対象従業員ID。本人以外を指定できるのは、管理者か、対象従業員が所属するチームのリーダーとしてログインしている場合のみです。省略時はAPI利用者本人が対象です。 例: `10`
- daily_attendances*: array[object] - 登録・更新する勤怠情報（最大31件）。同一 date を複数指定することはできません。
  配列の要素:
    - date*: string(date) - 対象日（YYYY-MM-DD） 例: `2026-09-21`
    - day_status*: string - 工数カレンダー上のその日の扱い（workday: 出勤日、holiday: 休日、full_day_leave: 有給休暇・特別休暇・代休などによる全休、absence: 欠勤） (選択肢: workday, holiday, full_day_leave, absence) 例: `workday`
    - worked_minutes: integer(int32) - 勤務時間（分）。省略時は0分として扱います。day_status が full_day_leave または absence の場合は0または未指定にしてください。それ以外を指定した場合はエラーになります。 例: `480` (最小: 0, 最大: 1440)

### レスポンス

- person_id*: integer(int32) - 対象従業員ID
- daily_attendances*: array[object] - 登録・更新された勤怠情報

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
- meta*: object - ページネーションのメタ情報

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

- labor_budget*: object - 人件費予算

# Partners

## GET /partners — 取引先の一覧取得

登録されている取引先の一覧を返します。

### パラメータ

- company_id*: integer - 事業所ID
- limit: integer - 取得レコードの件数（デフォルト：50, 最小：1, 最大100）
- offset: integer - 取得レコードのオフセット（デフォルト：0）

### レスポンス

- partners*: array[object]
- meta*: object - ページネーションのメタ情報

# People

## GET /people — 従業員一覧の取得

このリクエストで指定したIDの事業所の従業員一覧を返します。 権限・ステータス・従業員IDで取得する情報を絞り込むことができます。

### パラメータ

- company_id*: integer - 事業所ID
- role: string - 役割
- status: string - ステータス（招待中・利用中・無効） (選択肢: sent, accepted, inactive)
- person_ids[]: array[integer] - 従業員ID
- limit: integer - 取得レコードの件数（デフォルト：50, 最小：1, 最大100）
- offset: integer - 取得レコードのオフセット（デフォルト：0）

### レスポンス

- meta*: object - ページネーションのメタ情報
- people_counts*: object
- people*: array[object]

# ProjectTagGroups

## GET /project_tag_groups — プロジェクトタググループの取得

事業所のプロジェクトタググループと、その配下に属するプロジェクトタグの一覧を取得します。

### パラメータ

- company_id*: integer - 事業所ID
- limit: integer - 取得レコードの件数（デフォルト：50, 最小：1, 最大：100）
- offset: integer - 取得レコードのオフセット（デフォルト：0）

### レスポンス

- project_tag_groups*: array[object]
- meta*: object - ページネーションのメタ情報

# SalesOrderStatuses

## GET /sales_order_statuses — 受注ステータスの取得

事業所の受注ステータスの一覧を取得します。

### パラメータ

- company_id*: integer - 事業所ID
- limit: integer - 取得レコードの件数（デフォルト：50, 最小：1, 最大：100）
- offset: integer - 取得レコードのオフセット（デフォルト：0）

### レスポンス

- sales_order_statuses*: array[object]
- meta*: object - ページネーションのメタ情報

# Teams

## GET /teams — チームの一覧取得

登録されているチームの一覧を返します。

### パラメータ

- company_id*: integer - 事業所ID
- limit: integer - 取得レコードの件数（デフォルト：50, 最小：1, 最大100）
- offset: integer - 取得レコードのオフセット（デフォルト：0）

### レスポンス

- teams*: array[object]
- meta*: object - ページネーションのメタ情報

# UnitCosts

## GET /unit_costs — 従業員単価マスタの取得

従業員の単価マスタを返します。

### パラメータ

- company_id*: integer - 事業所ID
- limit: integer - 取得レコードの件数（デフォルト：50, 最小：1, 最大100）
- offset: integer - 取得レコードのオフセット（デフォルト：0）

### レスポンス

- unit_costs*: array[object]
- meta*: object - ページネーションのメタ情報

# Users

ログインユーザー

## GET /users/me — ログインユーザー情報の取得

このリクエストの認可セッションにおけるログインユーザーの情報を返します。 freee工数管理では一人のログインユーザーを複数の事業所に関連付けられるため、このユーザーと関連のあるすべての事業所の情報をリストで返します。 他のAPIのパラメータとして company_id が求められる場合は、このAPIで取得した company_id を使用します。

### レスポンス

- id: integer - ユーザーID
- companies: array[object] - ユーザーが属する事業所の一覧

# WorkloadAvailableProjects

工数入力可能なプロジェクト

## GET /workloads/available_projects — 工数入力可能なプロジェクトの取得

指定した日付時点で、対象従業員が工数を入力できるプロジェクトの一覧を取得します。 「アサインされている」「運用ステータスが運用中」「指定日がプロジェクト期間内」の3条件を全て満たすプロジェクトを、プロジェクトIDの昇順で返します。

### パラメータ

- company_id*: integer - 事業所ID
- target_date*: string - 対象日（この日付時点で工数入力可能なプロジェクトを返します）
- person_id: integer - 従業員ID
  本人以外を指定できるのは、本人が「工数カレンダー　閲覧（全従業員）」権限を持つか、対象従業員が所属するチームのリーダーである場合のみ
  本人は権限がなくても指定可能
  省略時はAPI利用者本人が対象
- limit: integer - 取得レコードの件数（デフォルト：50, 最小：1, 最大：100）
- offset: integer - 取得レコードのオフセット（デフォルト：0）

### レスポンス

- workload_available_projects*: array[object]
- meta*: object - ページネーションのメタ情報

# WorkloadTagGroups

## GET /workload_tag_groups — 工数タグの取得

事業所の工数タググループと、その配下に属する工数タグの一覧を取得します。

### パラメータ

- company_id*: integer - 事業所ID
- limit: integer - 取得レコードの件数（デフォルト：50, 最小：1, 最大：100）
- offset: integer - 取得レコードのオフセット（デフォルト：0）

### レスポンス

- workload_tag_groups*: array[object]
- meta*: object - ページネーションのメタ情報

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
- meta*: object - ページネーションのメタ情報

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

POST /workloads と同じ

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
- meta*: object - ページネーションのメタ情報
