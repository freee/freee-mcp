# 特別休暇申請

特別休暇申請の操作

## GET /api/v1/approval_requests/special_holidays — 特別休暇申請一覧の取得

概要 指定した事業所の指定日付時点における特別休暇申請情報をリストで返します。

注意点
申請経路、承認者の指定として部門役職データ連携を活用し、以下のいずれかを利用している申請と申請経路はAPI経由で参照は可能ですが、作成と更新、承認ステータスの変更ができません。 役職指定（申請者の所属部門） 役職指定（申請時に部門指定） 部門および役職指定 申請者と承認者が同一ユーザーの場合、feedback(差戻し)をするとレスポンスは以下のようになります。 status: draft approval_flow_logs.action: cancel

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

- special_holidays*: array[object]
- total_count*: integer(int32) - 合計件数

## POST /api/v1/approval_requests/special_holidays — 特別休暇申請の作成

概要 指定した事業所の特別休暇申請を新規作成します。

注意点
申請経路、承認者の指定として部門役職データ連携を活用し、以下のいずれかを利用している申請と申請経路はAPI経由で参照は可能ですが、作成と更新、承認ステータスの変更ができません。 役職指定（申請者の所属部門） 役職指定（申請時に部門指定） 部門および役職指定 申請者と承認者が同一ユーザーの場合、feedback(差戻し)をするとレスポンスは以下のようになります。 status: draft approval_flow_logs.action: cancel

### リクエストボディ

- company_id*: integer(int32) - 事業所ID（必須） 例: `1` (最小: 1, 最大: 2147483647)
- target_date*: string(date) - 対象日（必須） 例: `2018-07-31` (パターン: ^[0-9]{4}-[0-9]{2}-[0-9]{2}$)
- special_holiday_setting_id*: integer(int32) - 特別休暇設定ID（必須） 例: `1` (最小: 1, 最大: 2147483647)
- holiday_type*: string - 取得単位（必須）（full:全休、half:半休、morning:午前休、 afternoon:午後休、hour:時間休） (選択肢: full, half, morning, afternoon, hour) 例: `half`
- start_at: string - 取得予定開始時間（条件付き必須）
  取得単位が半休、時間休の場合は必須 例: `12:00` (パターン: ^[0-9]{2}:[0-9]{2}?$)
- end_at: string - 取得予定終了時間（条件付き必須）
  取得単位が半休、時間休の場合は必須 例: `23:59` (パターン: ^[0-9]{2}:[0-9]{2}?$)
- comment: string - 申請理由 例: `申請理由`
- approval_flow_route_id*: integer(int32) - 申請経路ID（必須） 例: `1` (最小: 1, 最大: 2147483647)
- approver_id: integer(int32) - 承認者のユーザーID 例: `1` (最小: 1, 最大: 2147483647)

### レスポンス

- special_holiday*: object

## GET /api/v1/approval_requests/special_holidays/{id} — 特別休暇申請の取得

概要 指定した事業所の特別休暇申請情報を取得します。

注意点
申請経路、承認者の指定として部門役職データ連携を活用し、以下のいずれかを利用している申請と申請経路はAPI経由で参照は可能ですが、作成と更新、承認ステータスの変更ができません。 役職指定（申請者の所属部門） 役職指定（申請時に部門指定） 部門および役職指定 申請者と承認者が同一ユーザーの場合、feedback(差戻し)をするとレスポンスは以下のようになります。 status: draft approval_flow_logs.action: cancel

### パラメータ

- company_id*: integer - 事業所ID
- id* (path): integer - 特別休暇申請ID

### レスポンス

POST /api/v1/approval_requests/special_holidays と同じ

## PUT /api/v1/approval_requests/special_holidays/{id} — 特別休暇申請の更新

概要 指定した事業所の特別休暇申請情報を更新します。

注意点
申請経路、承認者の指定として部門役職データ連携を活用し、以下のいずれかを利用している申請と申請経路はAPI経由で参照は可能ですが、作成と更新、承認ステータスの変更ができません。 役職指定（申請者の所属部門） 役職指定（申請時に部門指定） 部門および役職指定 申請者と承認者が同一ユーザーの場合、feedback(差戻し)をするとレスポンスは以下のようになります。 status: draft approval_flow_logs.action: cancel

### パラメータ

- id* (path): integer - 特別休暇申請ID

### リクエストボディ

POST /api/v1/approval_requests/special_holidays と同じ

### レスポンス

POST /api/v1/approval_requests/special_holidays と同じ

## DELETE /api/v1/approval_requests/special_holidays/{id} — 特別休暇申請の削除

概要 指定した事業所の特別休暇申請情報を削除します。

注意点
申請経路、承認者の指定として部門役職データ連携を活用し、以下のいずれかを利用している申請と申請経路はAPI経由で参照は可能ですが、作成と更新、承認ステータスの変更ができません。 役職指定（申請者の所属部門） 役職指定（申請時に部門指定） 部門および役職指定

### パラメータ

- id* (path): integer - 特別休暇申請ID
- company_id*: integer - 事業所ID

## POST /api/v1/approval_requests/special_holidays/{id}/actions — 特別休暇申請の承認操作

概要 指定した事業所の特別休暇申請情報を承認操作します。

注意点
申請経路、承認者の指定として部門役職データ連携を活用し、以下のいずれかを利用している申請と申請経路はAPI経由で参照は可能ですが、作成と更新、承認ステータスの変更ができません。 役職指定（申請者の所属部門） 役職指定（申請時に部門指定） 部門および役職指定 全休の特別休暇申請は承認されると申請者の特別休暇の残数が減ります。 半休と時間休の特別休暇申請は承認されても申請者の特別休暇の残数が減らない場合があります。以下の条件を満たす場合、申請者の特別休暇の残数が減ります。 申請承認後、申請者が申請の対象日に出勤打刻と退勤打刻をする。 申請承認前に、申請者が申請の対象日に勤怠を登録している。 申請者と承認者が同一ユーザーの場合、feedback(差戻し)をするとレスポンスは以下のようになります。 status: draft approval_flow_logs.action: cancel

### パラメータ

PUT /api/v1/approval_requests/special_holidays/{id} と同じ

### リクエストボディ

- company_id*: integer(int32) - 事業所ID 例: `1` (最小: 1, 最大: 2147483647)
- approval_action*: string - 申請操作。（approve:承認、cancel:取り消し、feedback:差戻し、force_feedback:承認取り消し） (選択肢: approve, cancel, feedback, force_feedback) 例: `approve`
- target_round*: integer(int32) - 対象round。差戻し等により申請がstepの最初からやり直しになるとroundの値が増えます。取得APIレスポンス.current_roundを送信してください。 例: `1` (最小: 1, 最大: 2147483647)
- target_step_id*: integer(int32) - 対象承認ステップID。取得APIレスポンス.current_step_idを送信してください。 例: `1` (最小: 1, 最大: 2147483647)
- next_approver_id: integer(int32) - 次のステップの承認者のユーザーID 例: `1` (最小: 1, 最大: 2147483647)

### レスポンス

POST /api/v1/approval_requests/special_holidays と同じ
