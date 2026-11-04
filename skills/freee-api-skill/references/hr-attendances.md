# 勤怠

勤怠の操作

## GET /api/v1/employees/{employee_id}/work_records/{date} — 勤怠の取得

概要 指定した従業員・日付の勤怠情報を返します。

### パラメータ

- company_id*: integer - 事業所ID
- employee_id* (path): integer - 従業員ID
- date* (path): string(date) - 従業員情報を取得したい年月日(YYYY-MM-DD)(例:2018-08-01)

### レスポンス

次のいずれかの形: ApiV1EmployeesWorkRecordSerializer / LegacyApiV1EmployeesWorkRecordSerializer
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
- paid_holidays: array[object] - [deprecated] 年次有給休暇の実績 ※ 削除予定のため holidays を参照してください （ApiV1EmployeesWorkRecordSerializer のみ）
- holidays: array[object] - 休暇の内訳（年次有給休暇、特別休暇、代休）。
  full では mins と time_ranges を返しません。half では mins を返します。
  morning_off、afternoon_off では mins を返さず、時間帯を持つ実績の場合は time_ranges を返します。
  hourly は年休・特休のみで、mins を返し、時間帯を持つ実績の場合は time_ranges も返します。 （ApiV1EmployeesWorkRecordSerializer のみ）（要素は holiday_category により形が異なる: annual_paid_holiday / special_holiday / compensatory_holiday）
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
- half_paid_holiday_mins: integer(int32) - [deprecated] 有給休暇の半休を利用した時間（分単位） ※ 削除予定のため holidays を参照してください （LegacyApiV1EmployeesWorkRecordSerializer のみ）
- hourly_paid_holiday_mins: integer(int32) - [deprecated] 有給休暇の時間休を利用した時間（分単位） ※ 削除予定のため holidays を参照してください （LegacyApiV1EmployeesWorkRecordSerializer のみ）
- paid_holiday: number(float) - [deprecated] この日に対する有給取得日数。半休の場合は0.5が入ります。時間休の場合はhourly_paid_holiday_minsを所定労働時間で割った値が入るため、実際の時間を確認するにはhourly_paid_holiday_minsを参照してください。 ※ 削除予定のため holidays を参照してください （LegacyApiV1EmployeesWorkRecordSerializer のみ）

## PUT /api/v1/employees/{employee_id}/work_records/{date} — 勤怠の更新

概要 指定した従業員の勤怠情報を更新します。

注意点
振替出勤・振替休日・代休出勤・代休の登録はAPIでは行うことができません。 examples 出勤日について出退勤時刻および休憩時間を更新する場合は以下のようなパラメータをリクエストします。 { "company_id": 1, "break_records": [ { "clock_in_at": "2017-05-25 12:00:00", "clock_out_at": "2017-05-25 13:00:00" } ], "work_record_segments": [ { "clock_in_at": "2017-05-25 09:10:00", "clock_out_at": "2017-05-25 18:20:00" } ] } 勤務パターンや既定の所定労働時間を変更する場合は use_default_work_pattern に false を指定するとともに、各設定を上書きするパラメータをリクエストします。 { "company_id": 1, "break_records": [ { "clock_in_at"...

### パラメータ

- employee_id* (path): integer - 従業員ID
- date* (path): string(date) - 更新対象年月日(YYYY-MM-DD)(例:2018-08-01)

### リクエストボディ

次のいずれかの形: ApiV1EmployeesWorkRecordsController.update_body / LegacyApiV1EmployeesWorkRecordsController.update_body
- company_id: integer(int32) - 事業所ID（必須） (最小: 1, 最大: 2147483647)
- break_records: array[object] - 休憩時間のリスト
  配列の要素:
    - clock_in_at*: string(date-time) - 開始時刻 例: `2018-07-31 08:00:00` (パターン: ^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}(:[0-9]{2})?$)
    - clock_out_at*: string(date-time) - 終了時刻 例: `2018-07-31 08:00:00` (パターン: ^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}(:[0-9]{2})?$)
- work_record_segments: array[object] - 出退勤のリスト
  配列の要素:
    - clock_in_at*: string(date-time) - 開始時刻 例: `2018-07-31 08:00:00` (パターン: ^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}(:[0-9]{2})?$)
    - clock_out_at*: string(date-time) - 終了時刻 例: `2018-07-31 08:00:00` (パターン: ^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}(:[0-9]{2})?$)
- clock_in_at: string(date-time) - 出勤時刻

  複数の出退勤を指定できないため非推奨です。 `work_record_segments` を利用してください。 例: `2018-07-31 08:00:00` (パターン: ^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}(:[0-9]{2})?$)
- clock_out_at: string(date-time) - 退勤時刻

  複数の出退勤を指定できないため非推奨です。 `work_record_segments` を利用してください。 例: `2018-07-31 08:00:00` (パターン: ^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}(:[0-9]{2})?$)
- day_pattern: string - 勤務パターン（所定労働日: normal_day, 所定休日: prescribed_holiday, 法定休日: legal_holiday）

  prescribed_holiday、legal_holidayを指定すると、以下のパラメータについて、指定した値が反映されず無視されます。
  - early_leaving_mins
  - lateness_mins
  - paid_holiday (選択肢: normal_day, prescribed_holiday, legal_holiday)
- early_leaving_mins: integer(int32) - 早退分の時間（分単位） (最小: 0, 最大: 1440)
- is_absence: boolean - 欠勤かどうか

  is_absenceにtrueを指定すると、以下のパラメータについて、指定した値が反映されず無視されます。
  - break_records
  - clock_in_at
  - clock_out_at
  - clock_in_at
  - clock_out_at
  - early_leaving_mins
  - lateness_mins
  - normal_work_clock_in_at
  - normal_work_clock_out_at
  - normal_work_mins

  ただし、休暇（holidays、paid_holidays、special_holiday、half_special_holiday_mins、hourly_special_holiday_mins）を指定した場合は休暇の登録が優先され、is_absence の指定は無視されます。
- lateness_mins: integer(int32) - 遅刻分の時間（分単位） (最小: 0, 最大: 1440)
- normal_work_clock_in_at: string(date-time) - 所定労働開始時刻。指定しない場合はデフォルト設定が使用されます。（デフォルト設定は従業員に設定した勤務賃金設定の出退勤時刻と労働時間の設定を参照して値が決まります。） 例: `2018-07-31 08:00:00` (パターン: ^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}(:[0-9]{2})?$)
- normal_work_clock_out_at: string(date-time) - 所定労働終了時刻。指定しない場合はデフォルト設定が使用されます。（デフォルト設定は従業員に設定した勤務賃金設定の出退勤時刻と労働時間の設定を参照して値が決まります。） 例: `2018-07-31 08:00:00` (パターン: ^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}(:[0-9]{2})?$)
- normal_work_mins: integer(int32) - 所定労働時間。指定しない場合はデフォルト設定が使用されます。（デフォルト設定は従業員に設定した勤務賃金設定の出退勤時刻と労働時間の設定を参照して値が決まります。） (最小: 0, 最大: 1440)
- note: string - 勤怠メモ
- paid_holidays: array[object] - [deprecated] 年次有給休暇の内訳 ※ 削除予定のため holidays をご利用ください （ApiV1EmployeesWorkRecordsController.update_body のみ）
  配列の要素:
    - type*: string - 有給休暇の種別を指定します（全休：full, 半休：half, 午前休：morning_off, 午後休：afternoon_off, 時間休：hourly） (選択肢: full, half, morning_off, afternoon_off, hourly) 例: `half`
    - mins: integer(int32) - 有給休暇を利用した時間（分単位） ※ 全休の場合や午前休、午後休の場合にはこちらの値は参照されません (最小: 0)
- holidays: array[object] - 休暇の内訳。年次有給休暇、特別休暇、代休を指定できます。
  full、morning_off、afternoon_off では mins と time_ranges を指定しません。年休と有給の特休の half では mins を指定します。無給の特休の half では mins を指定できません。
  half を2つ組み合わせて全休にする場合は、どちらの half でも mins を指定できません。
  年休・特休の hourly は、対象日に適用される勤務賃金設定の時間休の入力方式に従い、時間数方式の場合は mins、時間帯方式の場合は time_ranges を指定します。mins は60分単位です。代休では holiday_type にかかわらず mins と time_ranges を指定しません。
  特別休暇では special_holiday_setting_id、代休では source_date が必須です。 （ApiV1EmployeesWorkRecordsController.update_body のみ）（要素は holiday_category により形が異なる: annual_paid_holiday / special_holiday / compensatory_holiday）
  配列の要素:
    - holiday_type*: string - 取得単位（全休: full、半休: half、午前休: morning_off、午後休: afternoon_off、時間休: hourly） (選択肢: full, half, morning_off, afternoon_off, hourly)
    - mins: integer(int32) - 休暇により計上する時間（分単位） （annual_paid_holiday / special_holiday のみ） (最小: 1, 最大: 1440)
    - time_ranges: array[object] - 時間休の取得時間帯 （annual_paid_holiday / special_holiday のみ）
    - holiday_category*: string - 休暇カテゴリ (選択肢: annual_paid_holiday, special_holiday, compensatory_holiday)
    - special_holiday_setting_id*: integer(int32) - 特別休暇設定ID （special_holiday のみ） (最小: 1, 最大: 2147483647)
    - source_date*: string(date) - 代休の元となる休日出勤日 （compensatory_holiday のみ） 例: `2018-07-31` (パターン: ^[0-9]{4}-[0-9]{2}-[0-9]{2}$)
- special_holiday: number(float) - [deprecated] この日の特別休暇取得日数。1日単位で指定します。 ※ 削除予定のため holidays をご利用ください (選択肢: 0, 1) 例: `1.0`
- special_holiday_setting_id: integer(int32) - [deprecated] 特別休暇設定ID ※ 削除予定のため holidays をご利用ください (最小: 1, 最大: 2147483647)
- half_special_holiday_mins: integer(int32) - [deprecated] 特別休暇の半休を利用した時間（分単位） ※ 削除予定のため holidays をご利用ください (最小: 0, 最大: 1440)
- hourly_special_holiday_mins: integer(int32) - [deprecated] 特別休暇の時間休を利用した時間（分単位） ※ 削除予定のため holidays をご利用ください (最小: 0, 最大: 1440)
- use_attendance_deduction: boolean - 欠勤・遅刻・早退を控除対象時間に算入するかどうか
- use_default_work_pattern: boolean - デフォルトの勤務設定を使うかどうか。

  trueを指定した場合、以下のパラメータについて、指定した値に関係なく、従業員に設定した勤務賃金設定の休日の設定を参照して値が決まります
  - day_pattern

  trueを指定した場合、以下のパラメータについて、指定した値に関係なく、従業員に設定した勤務賃金設定の出退勤時刻と労働時間の設定を参照して値が決まります。
  - normal_work_clock_in_at
  - normal_work_clock_out_at
  - normal_work_mins
- paid_holiday: number(float) - [deprecated] この日の有休取得日数。1日単位で指定します。 ※ paid_holidays を指定する場合にはこちらの値は参照されません ※ 削除予定のため holidays をご利用ください （LegacyApiV1EmployeesWorkRecordsController.update_body のみ） (選択肢: 0, 1) 例: `1.0`
- half_paid_holiday_mins: integer(int32) - [deprecated] 有給休暇の半休を利用した時間（分単位） ※ paid_holidaysを指定する場合にはこちらの値は参照されません ※ 削除予定のため holidays をご利用ください （LegacyApiV1EmployeesWorkRecordsController.update_body のみ） (最小: 0, 最大: 1440)
- hourly_paid_holiday_mins: integer(int32) - [deprecated] 有給休暇の時間休を利用した時間（分単位） ※ paid_holidaysを指定する場合にはこちらの値は参照されません ※ 削除予定のため holidays をご利用ください （LegacyApiV1EmployeesWorkRecordsController.update_body のみ） (最小: 0, 最大: 1440)

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
  hourly は年休・特休のみで、mins を返し、時間帯を持つ実績の場合は time_ranges も返します。 （要素は holiday_category により形が異なる: annual_paid_holiday / special_holiday / compensatory_holiday）
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
