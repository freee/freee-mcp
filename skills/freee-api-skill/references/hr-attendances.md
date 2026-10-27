# 勤怠

勤怠の操作

## GET /api/v1/employees/{employee_id}/work_records/{date} — 勤怠の取得

概要 指定した従業員・日付の勤怠情報を返します。

### パラメータ

- company_id*: integer - 事業所ID
- employee_id* (path): integer - 従業員ID
- date* (path): string(date) - 従業員情報を取得したい年月日(YYYY-MM-DD)(例:2018-08-01)

## PUT /api/v1/employees/{employee_id}/work_records/{date} — 勤怠の更新

概要 指定した従業員の勤怠情報を更新します。

注意点
振替出勤・振替休日・代休出勤・代休の登録はAPIでは行うことができません。 examples 出勤日について出退勤時刻および休憩時間を更新する場合は以下のようなパラメータをリクエストします。 { "company_id": 1, "break_records": [ { "clock_in_at": "2017-05-25 12:00:00", "clock_out_at": "2017-05-25 13:00:00" } ], "work_record_segments": [ { "clock_in_at": "2017-05-25 09:10:00", "clock_out_at": "2017-05-25 18:20:00" } ] } 勤務パターンや既定の所定労働時間を変更する場合は use_default_work_pattern に false を指定するとともに、各設定を上書きするパラメータをリクエストします。 { "company_id": 1, "break_records": [ { "clock_in_at"...

### パラメータ

- employee_id* (path): integer - 従業員ID
- date* (path): string(date) - 更新対象年月日(YYYY-MM-DD)(例:2018-08-01)

### レスポンス

- break_records: array[object] - 休憩時間のリスト
- work_record_segments: array[object] - 出退勤のリスト
  - 登録されている全ての出退勤時間のリストを返します。
- clock_in_at: string(date-time) - 出勤時刻
  - 出勤時刻を返します。出退勤が複数登録されている場合は、最初の出退勤の出勤時間を返します。
- clock_out_at: string(date-time) - 退勤時刻
  - 退勤時刻を返します。出退勤が複数登録されている場合は、最後の出退勤の退勤時間を返します。
- date: string(date-time) - 対象日付
- day_pattern: string - 勤務パターン
  - normal_day: 所定労働日
  - prescribed_holiday: 所定休日
  - legal_holiday: 法定休日
- schedule_pattern: string - スケジュールパターン
  - substitute_holiday_work: 振替出勤
  - substitute_holiday: 振替休日
  - compensatory_holiday_work: 代休出勤
  - compensatory_holiday: 代休
  - special_holiday: 特別休暇
- early_leaving_mins: integer(int32) - 早退分の時間（分単位）
- half_special_holiday_mins: integer(int32) - [deprecated] 特別休暇の半休を利用した時間（分単位） ※ 削除予定のため holidays を参照してください
- hourly_special_holiday_mins: integer(int32) - [deprecated] 特別休暇の時間休を利用した時間（分単位） ※ 削除予定のため holidays を参照してください
- is_absence: boolean - 欠勤かどうか
- is_editable: boolean - 勤怠データが編集可能かどうか
- lateness_mins: integer(int32) - 遅刻分の時間（分単位）
- normal_work_clock_in_at: string(date-time) - 所定労働開始時刻
- normal_work_clock_out_at: string(date-time) - 所定労働終了時刻
- normal_work_mins: integer(int32) - 所定労働時間
- note: string - 勤怠メモ
- paid_holidays: array[object] - [deprecated] 年次有給休暇の実績 ※ 削除予定のため holidays を参照してください
- holidays: array[object] - 休暇の内訳（年次有給休暇、特別休暇、代休）。
  full では mins と time_ranges を返しません。half では mins を返します。
  morning_off、afternoon_off では mins を返さず、時間帯を持つ実績の場合は time_ranges を返します。
  hourly は年休・特休のみで、mins を返し、時間帯を持つ実績の場合は time_ranges も返します。
- special_holiday: number(float) - [deprecated] この日に対する特別休暇取得日数。半休の場合は0.5が入ります。時間休の場合はhourly_special_holiday_minsを所定労働時間で割った値が入るため、実際の時間を確認するにはhourly_special_holiday_minsを参照してください。 ※ 削除予定のため holidays を参照してください
- special_holiday_setting_id: integer(int32) - [deprecated] 特別休暇設定ID ※ 削除予定のため holidays を参照してください
- use_attendance_deduction: boolean - 欠勤・遅刻・早退を控除対象時間に算入するかどうか
- use_default_work_pattern: boolean - デフォルトの勤務時間設定を使っているかどうか
- use_half_compensatory_holiday: boolean - [deprecated] 代休の半休を利用したかどうか ※ 削除予定のため holidays を参照してください
- total_overtime_work_mins: integer(int32) - 時間外労働時間（分）（Webの勤怠登録画面にて詳細項目の「勤務時間の長さを自動で計算しない」にチェックを入れた場合0が返却されます。時間外労働時間はtotal_overtime_except_normal_work_minsを参照してください。）
- total_prescribed_holiday_work_mins: integer(int32) - 所定休日労働時間（分）
- total_holiday_work_mins: integer(int32) - 法定休日労働時間（分）
- total_latenight_work_mins: integer(int32) - 深夜労働時間（分）
- not_auto_calc_work_time: boolean - 勤怠登録時に勤務時間の長さを自動で計算しないかどうか
- total_excess_statutory_work_mins: integer(int32) - [deprecated] 法定内残業時間（分） ※ 削除予定のため total_overtime_within_statutory_work_mins を参照してください
- total_latenight_excess_statutory_work_mins: integer(int32) - [deprecated] 深夜の法定内残業時間（分） ※ 削除予定のため total_latenight_overtime_within_statutory_work_mins を参照してください
- total_overtime_within_statutory_work_mins: integer(int32) - 法定内残業時間（分）
- total_latenight_overtime_within_statutory_work_mins: integer(int32) - 深夜の法定内残業時間（分）
- total_overtime_except_normal_work_mins: integer(int32) - 所定外法定外労働時間（分）
- total_latenight_overtime_except_normal_work_mins: integer(int32) - 深夜の所定外法定外労働時間（分）

## DELETE /api/v1/employees/{employee_id}/work_records/{date} — 勤怠の削除

概要 指定した従業員の勤怠情報を削除します。

### パラメータ

- employee_id* (path): integer - 従業員ID
- date* (path): string(date) - 削除対象年月日(YYYY-MM-DD)(例:2018-08-01)
- company_id*: integer(int32) - 事業所ID
