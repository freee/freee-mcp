# 申請経路

申請経路の操作

## GET /api/v1/approval_flow_routes — 申請経路一覧の取得

概要 指定した事業所の申請経路一覧を取得する。

注意点
指定した事業所の従業員に紐づくユーザーのみ実行可能です。 申請経路、承認者の指定として部門役職データ連携を活用し、以下のいずれかを利用している申請と申請経路はAPI経由で参照は可能ですが、作成と更新、承認ステータスの変更ができません。 役職指定（申請者の所属部門） 役職指定（申請時に部門指定） 部門および役職指定

### パラメータ

- company_id*: integer - 事業所ID
- included_user_id: integer - 経路に含まれるユーザーのユーザーID
- usage: string - 申請種別（申請経路を使用できる申請種別を示します。例えば、AttendanceWorkflow の場合は、勤怠申請で使用できる申請経路です。）
  - `AttendanceWorkflow` - 勤怠申請
  - `PersonalDataWorkflow` - 身上変更申請 (選択肢: AttendanceWorkflow, PersonalDataWorkflow)

### レスポンス

- approval_flow_routes*: array[object]

## GET /api/v1/approval_flow_routes/{id} — 申請経路の取得

概要 指定した事業所の申請経路を取得する。

注意点
指定した事業所の従業員に紐づくユーザーのみ実行可能です。 申請経路、承認者の指定として部門役職データ連携を活用し、以下のいずれかを利用している申請と申請経路はAPI経由で参照は可能ですが、作成と更新、承認ステータスの変更ができません。 役職指定（申請者の所属部門） 役職指定（申請時に部門指定） 部門および役職指定

### パラメータ

- id* (path): integer - 申請経路ID
- company_id*: integer - 事業所ID

### レスポンス

- approval_flow_route*: object
