# タイムレコーダー(打刻)

タイムレコーダー(打刻)機能の操作

## GET /api/v1/employees/{employee_id}/time_clocks — 打刻一覧の取得

概要 指定した従業員・期間の打刻情報を返します。

### パラメータ

- company_id*: integer - 事業所ID
- from_date: string(date) - 取得する打刻期間の開始日(YYYY-MM-DD)(例:2018-08-01)(デフォルト: 当月の打刻開始日)
- to_date: string(date) - 取得する打刻期間の終了日(YYYY-MM-DD)(例:2018-08-31)(デフォルト: 当日)
- limit: integer - 取得レコードの件数 (デフォルト: 50, 最小: 1, 最大: 100)
- offset: integer - 取得レコードのオフセット (デフォルト: 0)
- employee_id* (path): integer - 従業員ID

## POST /api/v1/employees/{employee_id}/time_clocks — 打刻の登録

概要 指定した従業員の打刻情報を登録します。

注意点
休憩開始の連続や退勤のみなど、整合性の取れていない打刻は登録できません。 打刻可能種別の取得APIを呼ぶことで、その従業員がその時点で登録可能な打刻種別が取得できます。 出勤の打刻は 前日の出勤時刻から24時間以内の場合、前日の退勤打刻が必須です。 前日の出勤時刻から24時間経過している場合は、前日の退勤打刻がなくとも出勤打刻を登録することができます。 退勤の打刻は 『退勤を自動打刻する』 の設定を使用している場合は、出勤打刻から24時間経過しても退勤打刻がない場合に、退勤打刻が自動で登録されます。 すでに登録されている退勤打刻よりも後の時刻であれば上書き登録することができます。 打刻が日をまたぐ場合は、base_date(打刻日)に前日の日付を指定してください。 datetime(打刻日時)を指定できるのは管理者の権限を持ったユーザーのみです。

### パラメータ

- employee_id* (path): integer - 従業員ID

### リクエストボディ

- company_id*: integer(int32) - (required) (最小: 1, 最大: 2147483647)
- type*: string - 打刻種別（required）[clock_in:出勤, break_begin:休憩開始, break_end:休憩終了, clock_out:退勤]の何れか (選択肢: clock_in, break_begin, break_end, clock_out)
- base_date: string(date) - 打刻日。打刻が日をまたぐ場合に、前日の日付を指定します。(YYYY-MM-DD)(例:2018-07-31) 例: `2018-07-31` (パターン: ^[0-9]{4}-[0-9]{2}-[0-9]{2}$)
- datetime: string(date-time) - 打刻時刻。(YYYY-MM-DD&nbsp;HH:MM:SS)(例:2018-07-31&nbsp;08:00:00) 例: `2018-07-31 08:00:00` (パターン: ^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}(:[0-9]{2})?$)

### レスポンス

- employee_time_clock: object

## GET /api/v1/employees/{employee_id}/time_clocks/{id} — 打刻の取得

概要 指定した従業員・指定した打刻の詳細情報を返します。

### パラメータ

- company_id*: integer - 事業所ID
- employee_id* (path): integer - 従業員ID
- id* (path): integer - 打刻ID

### レスポンス

POST /api/v1/employees/{employee_id}/time_clocks と同じ

## GET /api/v1/employees/{employee_id}/time_clocks/available_types — 打刻可能種別の取得

概要 指定した従業員・日付の打刻可能種別と打刻基準日を返します。 例: すでに出勤した状態だと、休憩開始、退勤が配列で返ります。

### パラメータ

- company_id*: integer - 事業所ID
- date: string(date) - 従業員情報を取得したい年月日(YYYY-MM-DD)(例:2018-08-01)(デフォルト：当日)
- employee_id* (path): integer - 従業員ID

### レスポンス

- available_types: array[string] - 打刻可能種別(clock_in:出勤, break_begin:休憩開始, break_end:休憩終了, clock_out:退勤)
- base_date: string(date) - 打刻基準日
