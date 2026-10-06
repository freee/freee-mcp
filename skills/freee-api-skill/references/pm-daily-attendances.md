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
