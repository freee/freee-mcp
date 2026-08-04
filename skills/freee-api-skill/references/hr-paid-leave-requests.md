# 有給休暇申請

有給休暇申請の操作

## GET /api/v1/approval_requests/paid_holidays — 有給休暇申請一覧の取得

概要 指定した事業所の指定日付時点における有給休暇申請情報をリストで返します。

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

- paid_holidays*: array[object]
- total_count*: integer(int32) - 合計件数

## POST /api/v1/approval_requests/paid_holidays — 有給休暇申請の作成

概要 指定した事業所の有給休暇申請を新規作成します。

注意点
申請経路、承認者の指定として部門役職データ連携を活用し、以下のいずれかを利用している申請と申請経路はAPI経由で参照は可能ですが、作成と更新、承認ステータスの変更ができません。 役職指定（申請者の所属部門） 役職指定（申請時に部門指定） 部門および役職指定 申請者と承認者が同一ユーザーの場合、feedback(差戻し)をするとレスポンスは以下のようになります。 status: draft approval_flow_logs.action: cancel

### レスポンス

- paid_holiday*: object

## GET /api/v1/approval_requests/paid_holidays/{id} — 有給休暇申請の取得

概要 指定した事業所の有給休暇申請情報を取得します。

注意点
申請経路、承認者の指定として部門役職データ連携を活用し、以下のいずれかを利用している申請と申請経路はAPI経由で参照は可能ですが、作成と更新、承認ステータスの変更ができません。 役職指定（申請者の所属部門） 役職指定（申請時に部門指定） 部門および役職指定 申請者と承認者が同一ユーザーの場合、feedback(差戻し)をするとレスポンスは以下のようになります。 status: draft approval_flow_logs.action: cancel

### パラメータ

- company_id*: integer - 事業所ID
- id* (path): integer - 有給休暇申請ID

### レスポンス

POST /api/v1/approval_requests/paid_holidays と同じ

## PUT /api/v1/approval_requests/paid_holidays/{id} — 有給休暇申請の更新

概要 指定した事業所の有給休暇申請情報を更新します。

注意点
申請経路、承認者の指定として部門役職データ連携を活用し、以下のいずれかを利用している申請と申請経路はAPI経由で参照は可能ですが、作成と更新、承認ステータスの変更ができません。 役職指定（申請者の所属部門） 役職指定（申請時に部門指定） 部門および役職指定 申請者と承認者が同一ユーザーの場合、feedback(差戻し)をするとレスポンスは以下のようになります。 status: draft approval_flow_logs.action: cancel

### パラメータ

- id* (path): integer - 有給休暇申請ID

### レスポンス

POST /api/v1/approval_requests/paid_holidays と同じ

## DELETE /api/v1/approval_requests/paid_holidays/{id} — 有給休暇申請の削除

概要 指定した事業所の有給休暇申請情報を削除します。

注意点
申請経路、承認者の指定として部門役職データ連携を活用し、以下のいずれかを利用している申請と申請経路はAPI経由で参照は可能ですが、作成と更新、承認ステータスの変更ができません。 役職指定（申請者の所属部門） 役職指定（申請時に部門指定） 部門および役職指定

### パラメータ

- id* (path): integer - 有給休暇申請ID
- company_id*: integer - 事業所ID

## POST /api/v1/approval_requests/paid_holidays/{id}/actions — 有給休暇申請の承認操作

概要 指定した事業所の有給休暇申請情報を承認操作します。

注意点
申請経路、承認者の指定として部門役職データ連携を活用し、以下のいずれかを利用している申請と申請経路はAPI経由で参照は可能ですが、作成と更新、承認ステータスの変更ができません。 役職指定（申請者の所属部門） 役職指定（申請時に部門指定） 部門および役職指定 全休の有給休暇申請は承認されると申請者の有給の残数が減ります。 半休と時間休の有給休暇申請は承認されても申請者の有給の残数が減らない場合があります。以下の条件を満たす場合、申請者の有給の残数が減ります。 申請承認後、申請者が申請の対象日に出勤打刻と退勤打刻をする。 申請承認前に、申請者が申請の対象日に勤怠を登録している。 申請者と承認者が同一ユーザーの場合、feedback(差戻し)をするとレスポンスは以下のようになります。 status: draft approval_flow_logs.action: cancel

### パラメータ

PUT /api/v1/approval_requests/paid_holidays/{id} と同じ

### リクエストボディ

- company_id*: integer(int32) - 事業所ID 例: `1` (最小: 1, 最大: 2147483647)
- approval_action*: string - 申請操作。（approve:承認、cancel:取り消し、feedback:差戻し、force_feedback:承認取り消し） (選択肢: approve, cancel, feedback, force_feedback) 例: `approve`
- target_round*: integer(int32) - 対象round。差戻し等により申請がstepの最初からやり直しになるとroundの値が増えます。取得APIレスポンス.current_roundを送信してください。 例: `1` (最小: 1, 最大: 2147483647)
- target_step_id*: integer(int32) - 対象承認ステップID。取得APIレスポンス.current_step_idを送信してください。 例: `1` (最小: 1, 最大: 2147483647)
- next_approver_id: integer(int32) - 次のステップの承認者のユーザーID 例: `1` (最小: 1, 最大: 2147483647)

### レスポンス

POST /api/v1/approval_requests/paid_holidays と同じ
