# 勤務時間修正申請

勤務時間修正申請の操作

## GET /api/v1/approval_requests/work_times — 勤務時間修正申請一覧の取得

概要 指定した事業所の指定日付時点における勤務時間修正申請情報をリストで返します。

注意点
申請経路、承認者の指定として部門役職データ連携を活用し、以下のいずれかを利用している申請と申請経路はAPI経由で参照は可能ですが、作成と更新、承認ステータスの変更ができません。 役職指定（申請者の所属部門） 役職指定（申請時に部門指定） 部門および役職指定

### パラメータ

- company_id*: integer - 事業所ID
- status: string - 申請ステータス
  - `draft` - 下書き
  - `in_progress` - 申請中
  - `approved` - 承認済
  - `feedback` - 差戻し (選択肢: draft, in_progress, approved, feedback)
- application_number: integer - 申請No
- start_issue_date: string(date) - 申請開始日
- end_issue_date: string(date) - 申請終了日
- approver_id: integer - 現在承認ステップの承認者のユーザーID
  approver_idに値を指定する場合、指定なしの申請経路を利用した申請は返却されません
- applicant_id: integer - 申請者のユーザーID
- start_target_date: string(date) - 対象開始日
- end_target_date: string(date) - 対象終了日
- passed_auto_check: boolean - 自動チェック結果
  - trueを指定した場合、自動チェック結果がtrueの申請のみ返却します。
  - falseを指定した場合、自動チェック結果がfalseの申請のみ返却します。
  - キーごと指定しない場合、すべての申請を返却します。
- limit: integer - 取得レコードの件数 (デフォルト: 50, 最小: 1, 最大: 100)
- offset: integer - 取得レコードのオフセット (デフォルト: 0)

### レスポンス

- work_times*: array[object]
- total_count*: integer(int32) - 合計件数

## POST /api/v1/approval_requests/work_times — 勤務時間修正申請の作成

概要 指定した事業所の勤務時間修正を新規作成します。 examples 勤務時間を修正する場合は以下のようなパラメータを指定します。 { "company_id": 1, "target_date": "2017-05-25", "break_records": [ { "clock_in_at": "2017-05-25 12:00:00", "clock_out_at": "2017-05-25 13:00:00" } ], "work_records": [ { "clock_in_at": "2017-05-25 09:10:00", "clock_out_at": "2017-05-25 18:20:00" } ], "approval_flow_route_id": 1 }

注意点
申請経路、承認者の指定として部門役職データ連携を活用し、以下のいずれかを利用している申請と申請経路はAPI経由で参照は可能ですが、作成と更新、承認ステータスの変更ができません。 役職指定（申請者の所属部門） 役職指定（申請時に部門指定） 部門および役職指定 申請者と承認者が同一ユーザーの場合、f...

### リクエストボディ

- company_id*: integer(int32) - 事業所ID（必須） 例: `1` (最小: 1, 最大: 2147483647)
- target_date*: string(date) - 対象日（必須） (パターン: ^[0-9]{4}-[0-9]{2}-[0-9]{2}$)
- clear_work_time: boolean - false: 勤務時間を修正する
  true: 勤務時間を削除する

  勤務時間を削除する場合は以下のパラメータは指定しないでください。
  - work_records
  - lateness_mins
  - early_leaving_mins
  - break_records
- work_records: array[object] - 勤務時間のリスト
  配列の要素:
    - id*: integer(int32) - 申請ID 例: `1` (最小: 1, 最大: 2147483647)
    - company_id*: integer(int32) - 事業所ID 例: `1` (最小: 1, 最大: 2147483647)
    - application_number*: integer(int32) - 申請No 例: `1` (最小: 1, 最大: 2147483647)
    - applicant_id*: integer(int32) - 申請者のユーザーID 例: `1` (最小: 1, 最大: 2147483647)
    - approver_ids: array[integer] - 承認者のユーザーID配列
      次の場合、空配列になります。
      - 指定なしの申請経路を利用した、申請ステータスが承認済み以外の申請
      - 申請が差戻された
    - target_date*: string(date) - 対象日 (パターン: ^[0-9]{4}-[0-9]{2}-[0-9]{2}$)
    - clear_work_time*: boolean - 勤務時間削除フラグ（false:勤務時間を修正する、true:勤務時間を削除する）
    - clock_in_at: string - 勤務開始時間
      - 勤務時間が複数登録されている場合は、最初の勤務の出勤時間を返します。 例: `12:00` (パターン: ^[0-9]{2}:[0-9]{2}(:[0-9]{2})?$)
    - clock_out_at: string - 勤務終了時間
      - 勤務時間が複数登録されている場合は、最後の勤務の退勤時間を返します。 例: `23:59` (パターン: ^[0-9]{2}:[0-9]{2}(:[0-9]{2})?$)
    - work_records: array[object] - 勤務時間のリスト
      - 登録されている全ての勤務時間のリストを返します。
    - lateness_mins*: integer(int32) - 遅刻分の時間（分単位）
    - early_leaving_mins*: integer(int32) - 早退分の時間（分単位）
    - break_records: array[object] - 休憩時間のリスト
    - issue_date*: string(date) - 申請日 (パターン: ^[0-9]{4}-[0-9]{2}-[0-9]{2}$)
    - comment: string - 申請理由 例: `申請理由`
    - status*: string - 申請ステータス。（draft:下書き、in_progress:申請中、approved:承認済、feedback:差戻し） (選択肢: draft, in_progress, approved, feedback) 例: `in_progress`
    - passed_auto_check*: boolean - 自動チェック結果 例: `true`
    - proxy_applicant_id: integer(int32) - 代理申請者のユーザーID 例: `1` (最小: 1, 最大: 2147483647)
- lateness_mins: integer(int32) - 遅刻分の時間（分単位）
- early_leaving_mins: integer(int32) - 早退分の時間（分単位）
- break_records: array[object] - 休憩時間のリスト
  配列の要素:
    - id*: integer(int32) - 申請ID 例: `1` (最小: 1, 最大: 2147483647)
    - company_id*: integer(int32) - 事業所ID 例: `1` (最小: 1, 最大: 2147483647)
    - application_number*: integer(int32) - 申請No 例: `1` (最小: 1, 最大: 2147483647)
    - applicant_id*: integer(int32) - 申請者のユーザーID 例: `1` (最小: 1, 最大: 2147483647)
    - approver_ids: array[integer] - 承認者のユーザーID配列
      次の場合、空配列になります。
      - 指定なしの申請経路を利用した、申請ステータスが承認済み以外の申請
      - 申請が差戻された
    - target_date*: string(date) - 対象日 (パターン: ^[0-9]{4}-[0-9]{2}-[0-9]{2}$)
    - clear_work_time*: boolean - 勤務時間削除フラグ（false:勤務時間を修正する、true:勤務時間を削除する）
    - clock_in_at: string - 勤務開始時間
      - 勤務時間が複数登録されている場合は、最初の勤務の出勤時間を返します。 例: `12:00` (パターン: ^[0-9]{2}:[0-9]{2}(:[0-9]{2})?$)
    - clock_out_at: string - 勤務終了時間
      - 勤務時間が複数登録されている場合は、最後の勤務の退勤時間を返します。 例: `23:59` (パターン: ^[0-9]{2}:[0-9]{2}(:[0-9]{2})?$)
    - work_records: array[object] - 勤務時間のリスト
      - 登録されている全ての勤務時間のリストを返します。
    - lateness_mins*: integer(int32) - 遅刻分の時間（分単位）
    - early_leaving_mins*: integer(int32) - 早退分の時間（分単位）
    - break_records: array[object] - 休憩時間のリスト
    - issue_date*: string(date) - 申請日 (パターン: ^[0-9]{4}-[0-9]{2}-[0-9]{2}$)
    - comment: string - 申請理由 例: `申請理由`
    - status*: string - 申請ステータス。（draft:下書き、in_progress:申請中、approved:承認済、feedback:差戻し） (選択肢: draft, in_progress, approved, feedback) 例: `in_progress`
    - passed_auto_check*: boolean - 自動チェック結果 例: `true`
    - proxy_applicant_id: integer(int32) - 代理申請者のユーザーID 例: `1` (最小: 1, 最大: 2147483647)
- comment: string - 申請理由 例: `申請理由`
- approval_flow_route_id*: integer(int32) - 申請経路ID（必須） 例: `1` (最小: 1, 最大: 2147483647)
- approver_id: integer(int32) - 承認者のユーザーID 例: `1` (最小: 1, 最大: 2147483647)

### レスポンス

- work_time*: object

## GET /api/v1/approval_requests/work_times/{id} — 勤務時間修正申請の取得

概要 指定した事業所の勤務時間修正申請情報を取得します。

注意点
申請経路、承認者の指定として部門役職データ連携を活用し、以下のいずれかを利用している申請と申請経路はAPI経由で参照は可能ですが、作成と更新、承認ステータスの変更ができません。 役職指定（申請者の所属部門） 役職指定（申請時に部門指定） 部門および役職指定 申請者と承認者が同一ユーザーの場合、feedback(差戻し)をするとレスポンスは以下のようになります。 status: draft approval_flow_logs.action: cancel

### パラメータ

- company_id*: integer - 事業所ID
- id* (path): integer - 勤務時間修正申請ID

## PUT /api/v1/approval_requests/work_times/{id} — 勤務時間修正申請の更新

概要 指定した事業所の勤務時間修正申請情報を更新します。 examples 勤務時間を修正する場合は以下のようなパラメータを指定します。 { "company_id": 1, "target_date": "2017-05-25", "break_records": [ { "clock_in_at": "2017-05-25 12:00:00", "clock_out_at": "2017-05-25 13:00:00" } ], "work_records": [ { "clock_in_at": "2017-05-25 09:10:00", "clock_out_at": "2017-05-25 18:20:00" } ], "approval_flow_route_id": 1 }

注意点
申請経路、承認者の指定として部門役職データ連携を活用し、以下のいずれかを利用している申請と申請経路はAPI経由で参照は可能ですが、作成と更新、承認ステータスの変更ができません。 役職指定（申請者の所属部門） 役職指定（申請時に部門指定） 部門および役職指定 申請者と承認者が同一ユーザーの場合...

### パラメータ

- id* (path): integer - 勤務時間修正申請ID

## DELETE /api/v1/approval_requests/work_times/{id} — 勤務時間修正申請の削除

概要 指定した事業所の勤務時間修正申請情報を削除します。

注意点
申請経路、承認者の指定として部門役職データ連携を活用し、以下のいずれかを利用している申請と申請経路はAPI経由で参照は可能ですが、作成と更新、承認ステータスの変更ができません。 役職指定（申請者の所属部門） 役職指定（申請時に部門指定） 部門および役職指定

### パラメータ

- id* (path): integer - 勤務時間修正申請ID
- company_id*: integer - 事業所ID

## POST /api/v1/approval_requests/work_times/{id}/actions — 勤務時間修正申請の承認操作

概要 指定した事業所の勤務時間修正申請情報を承認操作します。

注意点
申請経路、承認者の指定として部門役職データ連携を活用し、以下のいずれかを利用している申請と申請経路はAPI経由で参照は可能ですが、作成と更新、承認ステータスの変更ができません。 役職指定（申請者の所属部門） 役職指定（申請時に部門指定） 部門および役職指定 申請者と承認者が同一ユーザーの場合、feedback(差戻し)をするとレスポンスは以下のようになります。 status: draft approval_flow_logs.action: cancel

### パラメータ

PUT /api/v1/approval_requests/work_times/{id} と同じ

### リクエストボディ

- company_id*: integer(int32) - 事業所ID 例: `1` (最小: 1, 最大: 2147483647)
- approval_action*: string - 申請操作。（approve:承認、cancel:取り消し、feedback:差戻し、force_feedback:承認取り消し） (選択肢: approve, cancel, feedback, force_feedback) 例: `approve`
- target_round*: integer(int32) - 対象round。差戻し等により申請がstepの最初からやり直しになるとroundの値が増えます。取得APIレスポンス.current_roundを送信してください。 例: `1` (最小: 1, 最大: 2147483647)
- target_step_id*: integer(int32) - 対象承認ステップID。取得APIレスポンス.current_step_idを送信してください。 例: `1` (最小: 1, 最大: 2147483647)
- next_approver_id: integer(int32) - 次のステップの承認者のユーザーID 例: `1` (最小: 1, 最大: 2147483647)
