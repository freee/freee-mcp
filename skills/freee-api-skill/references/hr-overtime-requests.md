# 残業申請

残業申請の操作

## GET /api/v1/approval_requests/overtime_works — 残業申請一覧の取得

概要 指定した事業所の指定日付時点における残業申請情報をリストで返します。

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

- overtime_works*: array[object]
- total_count*: integer(int32) - 合計件数

## POST /api/v1/approval_requests/overtime_works — 残業申請の作成

概要 指定した事業所の残業申請を新規作成します。

注意点
申請の内容を勤怠に反映させるかの設定次第でリクエスト時に指定するパラメータが異なります。残業申請に必要な設定情報の取得APIで確認してください。 勤怠に反映する設定の場合 設定情報の取得APIで受け取った値を用いてパラメータを指定します。 早出（early_work_start_at, early_work_end_at）か残業（overtime_work_start_at, overtime_work_end_at）のどちらか、もしくは両方を指定してください。 早出・残業両方とも指定しなかった場合は取り消し申請となります。対象日の承認済み残業申請は全て取り消され、打刻データがあれば勤怠に反映し直します。 早出の終了時刻（early_work_end_at）は所定の出勤時刻と同じ、残業の開始時刻（overtime_work_start_at）は所定の退勤時刻と同じ時刻を指定する必要があります。 早出・残業の時刻に指定できる分の単位はそれぞれ設定（early_work_mins_unit, overtime_work_mins_u...

### リクエストボディ

- company_id*: integer(int32) - 事業所ID（必須） 例: `1` (最小: 1, 最大: 2147483647)
- target_date*: string(date) - 対象日（必須） (パターン: ^[0-9]{4}-[0-9]{2}-[0-9]{2}$)
- start_at: string - 取得予定開始時間 例: `12:00` (パターン: ^[0-9]{2}:[0-9]{2}(:[0-9]{2})?$)
- end_at: string - 取得予定終了時間 例: `23:59` (パターン: ^[0-9]{2}:[0-9]{2}(:[0-9]{2})?$)
- early_work_start_at: string - 実績反映ありの早出申請の開始予定時刻
  実績反映ありの早出申請する場合は必須 例: `12:00` (パターン: ^[0-9]{2}:[0-9]{2}(:[0-9]{2})?$)
- early_work_end_at: string - 実績反映ありの早出申請の終了予定時刻
  実績反映ありの早出申請する場合は必須 例: `23:59` (パターン: ^[0-9]{2}:[0-9]{2}(:[0-9]{2})?$)
- overtime_work_start_at: string - 実績反映ありの残業申請の開始予定時刻
  実績反映ありの残業申請する場合は必須 例: `12:00` (パターン: ^[0-9]{2}:[0-9]{2}(:[0-9]{2})?$)
- overtime_work_end_at: string - 実績反映ありの残業申請の終了予定時刻
  実績反映ありの残業申請する場合は必須 例: `23:59` (パターン: ^[0-9]{2}:[0-9]{2}(:[0-9]{2})?$)
- comment: string - 申請理由 例: `申請理由`
- approval_flow_route_id*: integer(int32) - 申請経路ID（必須） 例: `1` (最小: 1, 最大: 2147483647)
- approver_id: integer(int32) - 承認者のユーザーID 例: `1` (最小: 1, 最大: 2147483647)

### レスポンス

- overtime_work*: object

## GET /api/v1/approval_requests/overtime_works/{id} — 残業申請の取得

概要 指定した事業所の残業申請情報を取得します。

注意点
申請経路、承認者の指定として部門役職データ連携を活用し、以下のいずれかを利用している申請と申請経路はAPI経由で参照は可能ですが、作成と更新、承認ステータスの変更ができません。 役職指定（申請者の所属部門） 役職指定（申請時に部門指定） 部門および役職指定 申請者と承認者が同一ユーザーの場合、feedback(差戻し)をするとレスポンスは以下のようになります。 status: draft approval_flow_logs.action: cancel

### パラメータ

- company_id*: integer - 事業所ID
- id* (path): integer - 残業申請ID

### レスポンス

POST /api/v1/approval_requests/overtime_works と同じ

## PUT /api/v1/approval_requests/overtime_works/{id} — 残業申請の更新

概要 指定した事業所の残業申請情報を更新します。

注意点
申請の内容を勤怠に反映させるかの設定次第でリクエスト時に指定するパラメータが異なります。残業申請に必要な設定情報の取得APIで確認してください。 勤怠に反映する設定の場合 設定情報の取得APIで受け取った値を用いてパラメータを指定します。 早出（early_work_start_at, early_work_end_at）か残業（overtime_work_start_at, overtime_work_end_at）のどちらか、もしくは両方を指定してください。 早出・残業両方とも指定しなかった場合は取り消し申請となります。対象日の承認済み残業申請は全て取り消され、打刻データがあれば勤怠に反映し直します。 早出の終了時刻（early_work_end_at）は所定の出勤時刻と同じ、残業の開始時刻（overtime_work_start_at）は所定の退勤時刻と同じ時刻を指定する必要があります。 早出・残業の時刻に指定できる分の単位はそれぞれ設定（early_work_mins_unit, overtime_work_mins_u...

### パラメータ

- id* (path): integer - 残業申請ID

### リクエストボディ

POST /api/v1/approval_requests/overtime_works と同じ

### レスポンス

POST /api/v1/approval_requests/overtime_works と同じ

## DELETE /api/v1/approval_requests/overtime_works/{id} — 残業申請の削除

概要 指定した事業所の残業申請情報を削除します。

注意点
申請経路、承認者の指定として部門役職データ連携を活用し、以下のいずれかを利用している申請と申請経路はAPI経由で参照は可能ですが、作成と更新、承認ステータスの変更ができません。 役職指定（申請者の所属部門） 役職指定（申請時に部門指定） 部門および役職指定

### パラメータ

- id* (path): integer - 残業申請ID
- company_id*: integer - 事業所ID

## POST /api/v1/approval_requests/overtime_works/{id}/actions — 残業申請の承認操作

概要 指定した事業所の残業申請情報を承認操作します。

注意点
申請経路、承認者の指定として部門役職データ連携を活用し、以下のいずれかを利用している申請と申請経路はAPI経由で参照は可能ですが、作成と更新、承認ステータスの変更ができません。 役職指定（申請者の所属部門） 役職指定（申請時に部門指定） 部門および役職指定 申請者と承認者が同一ユーザーの場合、feedback(差戻し)をするとレスポンスは以下のようになります。 status: draft approval_flow_logs.action: cancel

### パラメータ

PUT /api/v1/approval_requests/overtime_works/{id} と同じ

### リクエストボディ

- company_id*: integer(int32) - 事業所ID 例: `1` (最小: 1, 最大: 2147483647)
- approval_action*: string - 申請操作。（approve:承認、cancel:取り消し、feedback:差戻し、force_feedback:承認取り消し） (選択肢: approve, cancel, feedback, force_feedback) 例: `approve`
- target_round*: integer(int32) - 対象round。差戻し等により申請がstepの最初からやり直しになるとroundの値が増えます。取得APIレスポンス.current_roundを送信してください。 例: `1` (最小: 1, 最大: 2147483647)
- target_step_id*: integer(int32) - 対象承認ステップID。取得APIレスポンス.current_step_idを送信してください。 例: `1` (最小: 1, 最大: 2147483647)
- next_approver_id: integer(int32) - 次のステップの承認者のユーザーID 例: `1` (最小: 1, 最大: 2147483647)

### レスポンス

POST /api/v1/approval_requests/overtime_works と同じ

## GET /api/v1/approval_requests/overtime_works/setting — 残業申請に必要な設定情報の取得

概要 指定した従業員・日付の残業申請に必要な設定情報を取得します。 取得できる設定の一覧 勤怠カレンダーに申請を反映するかどうかの設定 この設定により、残業申請の作成や更新のリクエスト時に使用するパラメータが変わります。詳細は、残業申請の作成や更新の仕様を参照してください。 所定の出退勤時間 反映あり申請の場合、残業申請の作成や更新のリクエスト時に所定の出退勤時間が必要になります。詳細は、残業申請の作成や更新の仕様を参照してください。 申請で指定できる分の単位 反映あり申請の場合、勤務賃金設定の申請の単位設定によって、残業申請できる分単位が変わります。

### パラメータ

- company_id*: integer - 事業所ID
- date*: string - 対象日(YYYY-MM-DD)(例:2018-08-01)
  - 申請の対象日を指定してください。

### レスポンス

- start_at: string(date-time) - 所定出勤時刻
- end_at: string(date-time) - 所定退勤時刻
- should_reflect_in_work_record*: boolean - 勤務カレンダーに反映するかどうか
- early_work_mins_unit: array[integer] - 早出に指定できる分の単位
- overtime_work_mins_unit: array[integer] - 残業に指定できる分の単位
