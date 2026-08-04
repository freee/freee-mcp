# Approval requests

各種申請

## GET /api/1/approval_requests — 各種申請一覧の取得

概要 指定した事業所の各種申請一覧を取得する 各種申請APIの使い方については、 freee会計の各種申請APIの使い方 をご参照ください

注意点
本APIでは、各種申請一覧を取得することができます。 申請経路、承認者の指定として部門役職データ連携を活用し、以下のいずれかを利用している各種申請と申請経路はAPI経由で参照は可能ですが、作成と更新、承認ステータスの変更ができません。 役職指定（申請者の所属部門） 役職指定（申請時に部門指定） 部門および役職指定 申請フォームの項目に契約書（freeeサイン連携）が利用されている各種申請については、API経由で参照は可能ですが、作成と更新ができません。

### パラメータ

- company_id*: integer(int64) - 事業所ID
- status: string - 申請ステータス(draft:下書き, in_progress:申請中, approved:承認済, rejected:却下, feedback:差戻し)
  承認者指定時には無効です。 (選択肢: draft, in_progress, approved, rejected, feedback)
- application_number: integer(int64) - 申請No.
- title: string - 申請タイトル
- form_id: integer(int64) - 申請フォームID
- start_application_date: string - 申請日で絞込：開始日(yyyy-mm-dd)
- end_application_date: string - 申請日で絞込：終了日(yyyy-mm-dd)
- applicant_id: integer(int64) - 申請者のユーザーID
- min_amount: integer(int64) - 金額で絞込：以上
- max_amount: integer(int64) - 金額で絞込：以下
- approver_id: integer(int64) - 承認者のユーザーID
  承認者指定時には申請ステータスが申請中のものだけが取得可能です。
- offset: integer(int64) - 取得レコードのオフセット (デフォルト: 0)
- limit: integer(int64) - 取得レコードの件数 (デフォルト: 50, 最小: 1, 最大: 500)

### レスポンス

- approval_requests*: array[object]

## POST /api/1/approval_requests — 各種申請の作成

概要 指定した事業所の各種申請を作成する 各種申請APIの使い方については、 freee会計の各種申請APIの使い方 をご参照ください

注意点
本APIでは、各種申請を作成することができます。 申請項目(request_items)については、申請フォームで設定された項目のIDとそれに対応する値を入力してください。 タイトル(title)：文字列(必須項目, 255文字まで, 改行なし) 例)予算申請 1行コメント(single_line)：文字列(255文字まで, 改行なし) 例)予算に関する申請 複数行コメント(multi_line)：文字列(1000文字まで, 改行あり) &nbsp;&nbsp;例) &nbsp;&nbsp;予算に関する申請 &nbsp;&nbsp;申請日 2019-12-17 プルダウン(select)： プルダウンの選択肢の名前(改行なし) 例)開発部 日付(date)： 日付形式 例)2019-12-17 金額(amount)： 数値(申請フォームで設定した上限・下限金額内の値, 改行なし) 例)10000 添付ファイル(receipt)： ファイルボック...

### リクエストボディ

- company_id*: integer(int64) - 事業所ID 例: `1` (最小: 1)
- application_date: string - 申請日 (yyyy-mm-dd)

  指定しない場合は当日の日付が登録されます。 例: `2019-12-17`
- approval_flow_route_id*: integer(int64) - 申請経路ID 例: `1` (最小: 1)
- form_id*: integer(int64) - 申請フォームID 例: `1` (最小: 1)
- approver_id: integer(int64) - 承認者のユーザーID 例: `1` (最小: 1)
- draft*: boolean - 各種申請のステータス

  falseを指定した時は申請中（in_progress）で各種申請を作成します。

  trueを指定した時は下書き（draft）で各種申請を作成します。 例: `true`
- parent_id: integer(int64) - 親申請ID(既存各種申請IDのみ指定可能です。) 例: `2` (最小: 1)
- request_items*: array[object]
  配列の要素:
    - id: integer(int64) - 項目ID 例: `1` (最小: 1)
    - type: string - 項目タイプ(title: 申請タイトル, single_line: 自由記述形式 1行, multi_line: 自由記述形式 複数行, select: プルダウン, date: 日付, amount: 金額, receipt: 添付ファイル, section: 部門ID, partner: 取引先ID) (選択肢: title, single_line, multi_line, select, date, amount, receipt, section, partner)
    - value: string - 項目の値 例: `申請理由`

### レスポンス

- approval_request*: object

## GET /api/1/approval_requests/{id} — 各種申請の取得

概要 指定した事業所の各種申請を取得する 各種申請APIの使い方については、 freee会計の各種申請APIの使い方 をご参照ください

注意点
申請経路、承認者の指定として部門役職データ連携を活用し、以下のいずれかを利用している各種申請と申請経路はAPI経由で参照は可能ですが、作成と更新、承認ステータスの変更ができません。 役職指定（申請者の所属部門） 役職指定（申請時に部門指定） 部門および役職指定 申請フォームの項目に契約書（freeeサイン連携）が利用されている各種申請については、API経由で参照は可能ですが、作成と更新ができません。

### パラメータ

- id* (path): integer(int64) - 各種申請ID
- company_id*: integer(int64) - 事業所ID

### レスポンス

POST /api/1/approval_requests と同じ

## PUT /api/1/approval_requests/{id} — 各種申請の更新

概要 指定した事業所の各種申請を更新する 各種申請APIの使い方については、 freee会計の各種申請APIの使い方 をご参照ください

注意点
本APIでは、各種申請を更新することができます。 申請項目(request_items)については、各種申請の取得APIで取得したrequest_items.idとそれに対応する値を入力してください。 タイトル(title)：文字列(必須項目, 255文字まで, 改行なし) 例)予算申請 1行コメント(single_line)：文字列(255文字まで, 改行なし) 例)予算に関する申請 複数行コメント(multi_line)：文字列(1000文字まで, 改行あり) &nbsp;&nbsp;例) &nbsp;&nbsp;予算に関する申請 &nbsp;&nbsp;申請日 2019-12-17 プルダウン(select)： プルダウンの選択肢の名前(改行なし) 例)開発部 日付(date)： 日付形式 例)2019-12-17 金額(amount)： 数値(申請フォームで設定した上限・下限金額内の値, 改行なし) 例)10000 添付ファイル(rec...

### パラメータ

- id* (path): integer(int64) - 各種申請ID

### リクエストボディ

- company_id*: integer(int64) - 事業所ID 例: `1` (最小: 1)
- application_date: string - 申請日 (yyyy-mm-dd)

  指定しない場合は当日の日付が登録されます。 例: `2019-12-17`
- approval_flow_route_id*: integer(int64) - 申請経路ID 例: `1` (最小: 1)
- approver_id: integer(int64) - 承認者のユーザーID 例: `1` (最小: 1)
- draft*: boolean - 各種申請のステータス

  falseを指定した時は申請中（in_progress）で各種申請を更新します。

  trueを指定した時は下書き（draft）で各種申請を更新します。 例: `true`
- request_items*: array[object]
  配列の要素:
    - id: integer(int64) - 項目ID 例: `1` (最小: 1)
    - type: string - 項目タイプ(title: 申請タイトル, single_line: 自由記述形式 1行, multi_line: 自由記述形式 複数行, select: プルダウン, date: 日付, amount: 金額, receipt: 添付ファイル, section: 部門ID, partner: 取引先ID) (選択肢: title, single_line, multi_line, select, date, amount, receipt, section, partner)
    - value: string - 項目の値 例: `申請理由`

### レスポンス

POST /api/1/approval_requests と同じ

## DELETE /api/1/approval_requests/{id} — 各種申請の削除

概要 指定した事業所の各種申請を削除する 各種申請APIの使い方については、 freee会計の各種申請APIの使い方 をご参照ください

注意点
申請ステータス(下書き、申請中)の指定と変更、及び承認操作（承認する、却下する、申請者へ差し戻す、特権承認する、承認済み・却下済みを取り消す）は以下を参考にして行ってください。 承認操作は申請ステータスが申請中、承認済み、却下のものだけが対象です。 初回申請の場合 申請の作成（POST） 作成済みの申請の申請ステータス変更・更新する場合 申請の更新（PUT） 申請中、承認済み、却下の申請の承認操作を行う場合 承認操作の実行（POST） 申請の削除（DELETE）が可能なのは申請ステータスが下書き、差戻しの場合のみです

### パラメータ

GET /api/1/approval_requests/{id} と同じ

## POST /api/1/approval_requests/{id}/actions — 各種申請の承認操作

概要 指定した事業所の各種申請の承認操作を行う 各種申請APIの使い方については、 freee会計の各種申請APIの使い方 をご参照ください

注意点
本APIでは、各種申請の承認操作（承認する、却下する、申請者へ差し戻す、特権承認する、承認済み・却下済みを取り消す）を行うことができます。 申請ステータス(下書き、申請中)の指定と変更、及び承認操作（承認する、却下する、申請者へ差し戻す、特権承認する、承認済み・却下済みを取り消す）は以下を参考にして行ってください。 承認操作は申請ステータスが申請中、承認済み、却下のものだけが対象です。 初回申請の場合 申請の作成（POST） 作成済みの申請の申請ステータス変更・更新する場合 申請の更新（PUT） 申請中、承認済み、却下の申請の承認操作を行う場合 承認操作の実行（POST） 申請の削除（DELETE）が可能なのは申請ステータスが下書き、差戻しの場合のみです 申請経路、承認者の指定として部門役職データ連携を活用し、以下のいずれかを利用している各種申請はAPI経由で承認ステータスの変更ができません。 役職指定（申請者の所属部門） 役職指定（申請...

### パラメータ

PUT /api/1/approval_requests/{id} と同じ

### リクエストボディ

- company_id*: integer(int64) - 事業所ID 例: `1` (最小: 1)
- approval_action*: string - 操作(approve: 承認する、force_approve: 特権承認する、cancel: 申請を取り消す、reject: 却下する、feedback: 申請者へ差し戻す、force_feedback: 承認済み・却下済みを取り消す) (選択肢: approve, force_approve, cancel, reject, feedback, force_feedback) 例: `approve`
- target_step_id*: integer(int64) - 対象承認ステップID 各種申請の取得APIレスポンス.current_step_idを送信してください。 例: `1` (最小: 1)
- target_round*: integer - 対象round。差し戻し等により申請がstepの最初からやり直しになるとroundの値が増えます。各種申請の取得APIレスポンス.current_roundを送信してください。 例: `1` (最小: 0, 最大: 2147483647)
- next_approver_id: integer(int64) - 次ステップの承認者のユーザーID 例: `1` (最小: 1)

### レスポンス

POST /api/1/approval_requests と同じ

## GET /api/1/approval_requests/forms — 各種申請の申請フォーム一覧の取得

概要 指定した事業所の各種申請の申請フォーム一覧を取得する 各種申請APIの使い方については、 freee会計の各種申請APIの使い方 をご参照ください

### パラメータ

- company_id*: integer(int64) - 事業所ID

### レスポンス

- approval_request_forms*: array[object]

## GET /api/1/approval_requests/forms/{id} — 各種申請の申請フォームの取得

概要 指定した事業所の各種申請の申請フォームを取得する 各種申請APIの使い方については、 freee会計の各種申請APIの使い方 をご参照ください

### パラメータ

- id* (path): integer(int64) - 申請フォームID
- company_id*: integer(int64) - 事業所ID

### レスポンス

- approval_request_form*: object
