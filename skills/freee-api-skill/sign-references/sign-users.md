# ユーザー

## GET /v1/users — ユーザー一覧の取得

ユーザー一覧を取得する。 ここで取得できるユーザーには、チーム内のユーザー、文書の作成者、文書の受領者が含まれます。 そのため、複数のチームのユーザーが含まれる場合があります。

### パラメータ

- page: object
- per_page: object
- ids[]: array[object] - 配列でユーザーIDを指定して、ユーザー一覧を取得できる
- team_id: object - チームIDを指定して、指定したチームのユーザー一覧を取得できる
- email: string(email) - メールアドレスを指定してユーザー情報を取得できる（完全一致）
- status: string - ユーザーのステータス
  * receiving_only - 文書を受領した未登録ユーザー
  * active - 登録済ユーザー
  * unconfirmed - 登録途中ユーザー
  * canceled - 退会済ユーザー (選択肢: receiving_only, active, unconfirmed, canceled)

### レスポンス

条件に一致したユーザー一覧（ユーザーID昇順）

## POST /v1/users/invitations — ユーザーを招待する

ユーザーを招待する。

### リクエストボディ

- inviter_id: integer(int64) - 招待を実行するユーザーID 例: `1` (最小: 1)
- email*: string(email) - 被招待者のメールアドレス
- role: string - 被招待者の権限
  * admin - 全権管理
  * chief_document_manager - 締結・文書管理
  * document_manager - 文書管理
  * document_sender - 作成・送信
  * document_creator - 作成
  * member - メンバー
  ご利用プランのアクセス制御が無効な場合, admin と member 以外は指定できません (選択肢: admin, chief_document_manager, document_manager, document_sender, document_creator, member) 例: `member`
- lastname: string - 被招待者の姓
- firstname: string - 被招待者の名
- affiliation: string - 被招待者の部署・役職

### レスポンス

ユーザーへ招待メール送付完了
- id*: integer - ユーザー招待ID
- team_id*: integer(int64) - 招待先のチームID
- inviter_id*: integer(int64) - 招待を実行するユーザーID
- email*: string(email) - 被招待者のメールアドレス
- status*: string - 招待の状態
  * waiting - 被招待者の確認待ち
  * registered - 被招待者のユーザー登録が完了
- expires_at: string(date-time) - 招待された側が招待を承認する期限
- invitation_user_profile*: object - 被招待ユーザーのプロフィール

## GET /v1/users/invitations — ユーザーの参加待ちの招待一覧

ユーザーの参加待ちの招待一覧

### パラメータ

- page: object
- per_page: object

### レスポンス

取得成功

## POST /v1/users/invitations/{invitation_id}/re_invitations — ユーザーを再招待する

ユーザーを再招待する。

### パラメータ

- invitation_id* (path): integer(int64) - 再招待する招待のID

### リクエストボディ

- inviter_id: integer(int64) - 招待を実行するユーザーID 例: `1` (最小: 1)

### レスポンス

ユーザーへの再招待メール送付完了
- id*: integer - ユーザー招待ID
- team_id*: integer(int64) - 招待先のチームID
- inviter_id*: integer(int64) - 招待を実行するユーザーID
- email*: string(email) - 被招待者のメールアドレス
- status*: string - 招待の状態
  * waiting - 被招待者の確認待ち
  * registered - 被招待者のユーザー登録が完了
- expires_at: string(date-time) - 招待された側が招待を承認する期限
- invitation_user_profile*: object - 被招待ユーザーのプロフィール

## GET /v1/users/me — 認証中のユーザー情報の取得

現在認証しているユーザーの情報を取得する。 OAuth 2.0認証でのみ利用可能です。APIクライアント（アクセストークン認証）では利用できません。

### レスポンス

取得成功
- id*: integer(int64) - ユーザーID
- team_id: integer(int64) - チームID。本登録していないユーザーはチームに所属していない。
- status*: string - ユーザーのステータス
  * receiving_only - 文書を受領した未登録ユーザー
  * active - 登録済ユーザー
  * unconfirmed - 登録途中ユーザー
  * canceled - 退会済ユーザー
- email: string(email) - メールアドレス

  メールアドレスの登録がない場合は無し。
- sms_telephone_number: string - SMS用の電話番号

  E.164形式。登録されていない場合は無し。
  ex. +8190xxxxxxxx
- full_name: string - フルネーム。本登録していないユーザーは無い。

## DELETE /v1/users/{user_id}/activenesses — ユーザーの退会

特定のユーザーを退会させる。

### リクエストボディ

- executor_id: integer(int64) - 退会処理を実行するユーザーのID (APIクライアントを利用する場合は必須) 例: `1` (最小: 1)

### レスポンス

退会処理が成功
- id*: integer(int64) - ユーザーID
- team_id: integer(int64) - チームID。本登録していないユーザーはチームに所属していない。
- status*: string - ユーザーのステータス
  * receiving_only - 文書を受領した未登録ユーザー
  * active - 登録済ユーザー
  * unconfirmed - 登録途中ユーザー
  * canceled - 退会済ユーザー
- email: string(email) - メールアドレス

  メールアドレスの登録がない場合は無し。
- sms_telephone_number: string - SMS用の電話番号

  E.164形式。登録されていない場合は無し。
  ex. +8190xxxxxxxx
- full_name: string - フルネーム。本登録していないユーザーは無い。
