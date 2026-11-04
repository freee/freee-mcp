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
