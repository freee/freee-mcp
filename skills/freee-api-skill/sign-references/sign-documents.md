# 文書

## POST /v1/documents — 文書作成

文書をクイック作成する。

### リクエストボディ

- document*: object
  - title*: string - 作成する文書のタイトル 例: `文書 忍者太郎様`
  - items: array[object] - 入力項目
- template_id*: integer(int64) - 使用する文書テンプレートのID 例: `1` (最小: 1)
- creator_id: integer(int64) - 文書の作成者となるユーザーのID (APIクライアントを利用する場合は必須) 例: `1` (最小: 1)
- folder_id*: integer(int64) - 作成した文書の保存先フォルダのID

### レスポンス

作成成功
- id*: integer(int64) - 文書ID
- title*: string - 文書のタイトル
- owner_id*: integer(int64) - 文書作成者ユーザーID
- status*: string - 文書のステータス
  * draft - 作成中
  * in_progress - 確認待ち
  * awaiting_receipt - 受け取り待ち
  * approved - 要確認
  * concluded - 完了
  * rejected - 却下
  * expired - 有効期限切れ
  * trashed - 削除済み
- folder_id*: integer(int64) - 文書が保存されているフォルダのID
- folder_name*: string - 文書が保存されているフォルダの名前
- items: array[object] - 入力項目 設定されていない場合は無し。
- meta_items: array[object] - 検索項目 設定されていない場合は無し。
- signers: array[object] - 文書に設定されている署名者
  送信前は無し。
- signer_url: object - 署名者用URLを受け取った相手は、そのURLから署名依頼の手続きを進めることができます
- created_at*: string(date-time) - 作成日時。 ISO8601 形式を受け入れます。

  入力例: 2022-01-01T00:00:00+09:00
- updated_at*: string(date-time) - 更新日時。 ISO8601 形式を受け入れます。

  入力例: 2022-02-01T00:00:00+09:00
- timestamped*: boolean - タイムスタンプが付与されているかどうか
- expires_at: string(date-time) - 有効期限日時
- sent_at: string(date-time) - 送信日時
- concluded_at: string(date-time) - 締結完了日時
- skip_approval*: boolean - trueの場合、配付文書（署名合意をスキップする文書）。
  falseの場合、署名・合意文書。
- signer_document_confirmation*: boolean - 配付文書の受領者が文書を確認済みかどうか。
  配付文書でない場合は常にfalse。
- approve_on_signing: boolean - trueの場合は三者間以上の契約での合意タイミングの設定が「署名と同時に行う」になっており、署名完了後の復路合意ステップを省略する。
  falseの場合は三者間以上の契約での合意タイミングの設定が「署名とは別に行う」になっており、署名完了後に受領者による合意操作が必要になる。
- face_to_face_url: string(uri) - 対面契約（face_to_face）として送信した文書の対面署名画面URL。
  このURLを署名者の端末で開くことで対面契約フローを開始できます。
  対面契約以外の文書では含まれません。

## GET /v1/documents — 文書一覧の取得

文書一覧を取得する。

### パラメータ

- page: object
- per_page: object
- folder_id: object - フォルダID。IDで指定したフォルダに格納されている文書一覧を取得できる。
- title: string - 文書名に一致する一覧を取得できる（部分一致も可）。送信相手のメールアドレスに一致する一覧を取得できる（完全一致）。
- ids[]: array[integer] - 配列で文書IDを指定して、文書一覧を取得できる
- status: string - ステータス毎に文書一覧を取得できる。
  * draft - 作成中
  * in_progress - 確認待ち
  * awaiting_receipt - 受け取り待ち
  * approved - 要確認
  * concluded - 完了
  * rejected - 却下
  * expired - 有効期限切れ (選択肢: draft, in_progress, awaiting_receipt, approved, concluded, rejected, expired)
- created_at_from: object - 作成日時が指定した作成日時以降である文書を取得できます。

  開始は区切りを含みますが、終了は区切りを含みません。(左閉右開区間)
- created_at_to: object - 作成日時が指定した作成日時より過去である文書を取得できます。

  開始は区切りを含みますが、終了は区切りを含みません。(左閉右開区間)
- updated_at_from: object - 更新日時が指定した更新日時以降である文書を取得できます。

  開始は区切りを含みますが、終了は区切りを含みません。(左閉右開区間)
- updated_at_to: object - 更新日時が指定した更新日時より過去である文書を取得できます。

  開始は区切りを含みますが、終了は区切りを含みません。(左閉右開区間)

### レスポンス

取得成功

## POST /v1/documents/uploads — ファイルをアップロードして、作成中ステータスの文書を作成

PDF/Word/Excel/PowerPointから文書を作成する。作成された文書のステータスは「作成中」になる

### リクエストボディ

- file*: object
  - name*: string - アップロードファイル名（拡張子込み）

    - ファイルのタイトルは255文字以内にしてください。
  - content*: string - アップロードファイルの内容

    - アップロードファイルのバイナリをBase64エンコードした文字列を指定してください。
    - ファイル形式はPDF/Word/Excel/PowerPointのみ有効です。
    - ファイルのサイズは10MB以下にしてください。
- uploader_id*: integer(int64) - アップロードするユーザーのID
- folder_id*: integer(int64) - アップロードした文書の保存先フォルダのID
- title: string - 作成する文書のタイトル（設定しない場合はアップロードファイルのタイトルになります） 例: `文書 忍者太郎様`
- signers_count: integer(int64) - 相手方の人数 (最小: 1, 最大: 20)
- skip_approval: boolean - 文書の種別

  - false の場合、署名・合意文書
  - true の場合、配付文書

### レスポンス

- document: object - 文書

## GET /v1/documents/{document_id} — 文書取得

文書を取得する。 PDF を取得したい場合は、Media Type を application/pdf にしてください。 PDF作成処理中はエラーとなる為、時間を置いてAPIを再実行してください。 締結済ファイル取得の際、Acceptヘッダーで`application/json`を指定し、`timestamped=true`を確認後にPDFファイルを取得してください。

### レスポンス

取得成功
- id*: integer(int64) - 文書ID
- title*: string - 文書のタイトル
- owner_id*: integer(int64) - 文書作成者ユーザーID
- status*: string - 文書のステータス
  * draft - 作成中
  * in_progress - 確認待ち
  * awaiting_receipt - 受け取り待ち
  * approved - 要確認
  * concluded - 完了
  * rejected - 却下
  * expired - 有効期限切れ
  * trashed - 削除済み
- folder_id*: integer(int64) - 文書が保存されているフォルダのID
- folder_name*: string - 文書が保存されているフォルダの名前
- items: array[object] - 入力項目 設定されていない場合は無し。
- meta_items: array[object] - 検索項目 設定されていない場合は無し。
- signers: array[object] - 文書に設定されている署名者
  送信前は無し。
- signer_url: object - 署名者用URLを受け取った相手は、そのURLから署名依頼の手続きを進めることができます
- created_at*: string(date-time) - 作成日時。 ISO8601 形式を受け入れます。

  入力例: 2022-01-01T00:00:00+09:00
- updated_at*: string(date-time) - 更新日時。 ISO8601 形式を受け入れます。

  入力例: 2022-02-01T00:00:00+09:00
- timestamped*: boolean - タイムスタンプが付与されているかどうか
- expires_at: string(date-time) - 有効期限日時
- sent_at: string(date-time) - 送信日時
- concluded_at: string(date-time) - 締結完了日時
- skip_approval*: boolean - trueの場合、配付文書（署名合意をスキップする文書）。
  falseの場合、署名・合意文書。
- signer_document_confirmation*: boolean - 配付文書の受領者が文書を確認済みかどうか。
  配付文書でない場合は常にfalse。
- approve_on_signing: boolean - trueの場合は三者間以上の契約での合意タイミングの設定が「署名と同時に行う」になっており、署名完了後の復路合意ステップを省略する。
  falseの場合は三者間以上の契約での合意タイミングの設定が「署名とは別に行う」になっており、署名完了後に受領者による合意操作が必要になる。
- face_to_face_url: string(uri) - 対面契約（face_to_face）として送信した文書の対面署名画面URL。
  このURLを署名者の端末で開くことで対面契約フローを開始できます。
  対面契約以外の文書では含まれません。
- cloud_file_updated_at*: string(date-time) - Google Doc または PDF 更新日時

## PATCH /v1/documents/{document_id} — 文書更新

文書を更新する。

### リクエストボディ

- document*: object
  - title*: string - 文書のタイトル 例: `文書 忍者太郎様`
- user_id: integer(int64) - 実行するユーザーのID (APIクライアントを利用する場合は必須) 例: `1` (最小: 1)

### レスポンス

- id*: integer(int64) - 文書ID
- title*: string - 文書のタイトル
- owner_id*: integer(int64) - 文書作成者ユーザーID
- status*: string - 文書のステータス
  * draft - 作成中
  * in_progress - 確認待ち
  * awaiting_receipt - 受け取り待ち
  * approved - 要確認
  * concluded - 完了
  * rejected - 却下
  * expired - 有効期限切れ
  * trashed - 削除済み
- folder_id*: integer(int64) - 文書が保存されているフォルダのID
- folder_name*: string - 文書が保存されているフォルダの名前
- items: array[object] - 入力項目 設定されていない場合は無し。
- meta_items: array[object] - 検索項目 設定されていない場合は無し。
- signers: array[object] - 文書に設定されている署名者
  送信前は無し。
- signer_url: object - 署名者用URLを受け取った相手は、そのURLから署名依頼の手続きを進めることができます
- created_at*: string(date-time) - 作成日時。 ISO8601 形式を受け入れます。

  入力例: 2022-01-01T00:00:00+09:00
- updated_at*: string(date-time) - 更新日時。 ISO8601 形式を受け入れます。

  入力例: 2022-02-01T00:00:00+09:00
- timestamped*: boolean - タイムスタンプが付与されているかどうか
- expires_at: string(date-time) - 有効期限日時
- sent_at: string(date-time) - 送信日時
- concluded_at: string(date-time) - 締結完了日時
- skip_approval*: boolean - trueの場合、配付文書（署名合意をスキップする文書）。
  falseの場合、署名・合意文書。
- signer_document_confirmation*: boolean - 配付文書の受領者が文書を確認済みかどうか。
  配付文書でない場合は常にfalse。
- approve_on_signing: boolean - trueの場合は三者間以上の契約での合意タイミングの設定が「署名と同時に行う」になっており、署名完了後の復路合意ステップを省略する。
  falseの場合は三者間以上の契約での合意タイミングの設定が「署名とは別に行う」になっており、署名完了後に受領者による合意操作が必要になる。
- face_to_face_url: string(uri) - 対面契約（face_to_face）として送信した文書の対面署名画面URL。
  このURLを署名者の端末で開くことで対面契約フローを開始できます。
  対面契約以外の文書では含まれません。

## DELETE /v1/documents/{document_id} — 文書削除

文書を削除する。

### リクエストボディ

- user_id: integer(int64) - 文書を削除するユーザーのユーザーID (APIクライアントを利用する場合は必須) 例: `1` (最小: 1)

### レスポンス

削除成功
- id*: integer(int64) - 文書ID
- title*: string - 文書のタイトル
- owner_id*: integer(int64) - 文書作成者ユーザーID
- status*: string - 文書のステータス
  * draft - 作成中
  * in_progress - 確認待ち
  * awaiting_receipt - 受け取り待ち
  * approved - 要確認
  * concluded - 完了
  * rejected - 却下
  * expired - 有効期限切れ
  * trashed - 削除済み
- folder_id*: integer(int64) - 文書が保存されているフォルダのID
- folder_name*: string - 文書が保存されているフォルダの名前
- items: array[object] - 入力項目 設定されていない場合は無し。
- meta_items: array[object] - 検索項目 設定されていない場合は無し。
- signers: array[object] - 文書に設定されている署名者
  送信前は無し。
- signer_url: object - 署名者用URLを受け取った相手は、そのURLから署名依頼の手続きを進めることができます
- created_at*: string(date-time) - 作成日時。 ISO8601 形式を受け入れます。

  入力例: 2022-01-01T00:00:00+09:00
- updated_at*: string(date-time) - 更新日時。 ISO8601 形式を受け入れます。

  入力例: 2022-02-01T00:00:00+09:00
- timestamped*: boolean - タイムスタンプが付与されているかどうか
- expires_at: string(date-time) - 有効期限日時
- sent_at: string(date-time) - 送信日時
- concluded_at: string(date-time) - 締結完了日時
- skip_approval*: boolean - trueの場合、配付文書（署名合意をスキップする文書）。
  falseの場合、署名・合意文書。
- signer_document_confirmation*: boolean - 配付文書の受領者が文書を確認済みかどうか。
  配付文書でない場合は常にfalse。
- approve_on_signing: boolean - trueの場合は三者間以上の契約での合意タイミングの設定が「署名と同時に行う」になっており、署名完了後の復路合意ステップを省略する。
  falseの場合は三者間以上の契約での合意タイミングの設定が「署名とは別に行う」になっており、署名完了後に受領者による合意操作が必要になる。
- face_to_face_url: string(uri) - 対面契約（face_to_face）として送信した文書の対面署名画面URL。
  このURLを署名者の端末で開くことで対面契約フローを開始できます。
  対面契約以外の文書では含まれません。

## GET /v1/documents/{document_id}/activities — 文書の操作履歴の一覧取得

文書の操作履歴の一覧を取得する。

### レスポンス

GET /v1/documents と同じ

## GET /v1/documents/{document_id}/attachment_files — 添付ファイルの一覧取得

添付ファイルの一覧を取得する。 このエンドポイントはセキュリティ保護のため、`APIクライアント` でのご利用を制限しております。`OAuth 2.0 APIクライアント` をご利用ください。

### レスポンス

GET /v1/documents と同じ

## GET /v1/documents/{document_id}/attachment_files/{attachment_file_id} — 指定した添付ファイルの取得

指定した添付ファイルを取得する。 このエンドポイントはセキュリティ保護のため、`APIクライアント` でのご利用を制限しております。`OAuth 2.0 APIクライアント` をご利用ください。

### レスポンス

取得成功
- id*: integer(int64) - ファイルID
- name*: string - ファイルの名前
- content_type*: string - ContentType
- extension*: string - 拡張子
- creator_id*: integer(int64) - ユーザーID

## GET /v1/documents/{document_id}/comments — 文書コメント一覧の取得

指定した文書のコメント一覧を取得する。 取得者はアクセストークンの保有者（OAuth 連携の認可ユーザー）である必要がある。 コメント機能を含むプランの契約が必要。

### パラメータ

- page: object
- per_page: object

### レスポンス

GET /v1/documents と同じ

## POST /v1/documents/{document_id}/comments — 文書コメントの投稿

指定した文書にコメントを投稿する。 投稿者はアクセストークンの保有者（OAuth 連携の認可ユーザー）に固定される。 コメント機能を含むプランの契約が必要。

### リクエストボディ*

- body*: string - コメント本文

### レスポンス

投稿成功
- id*: integer(int64) - コメントID
- body*: string - コメント本文
- category*: string - アクティビティの種別
  * comment - コメント
  * confirmation - 送信
  * reconfirmation - 再送
  * cancel - 依頼取消
  * forward - 転送
  * cancel_forward - 転送キャンセル
  * send_back_forward - 転送差し戻し
  * signing - 署名
  * approval - 合意
  * rejection - 却下
  * conclusion - 締結完了
  * share - 共有
  * send_back_approval - 署名差し戻し
  * url_issued - 署名URL発行
  * signer_email_verified - 署名URL受領
- user*: object - 投稿者
- created_at*: string(date-time) - コメント投稿日時

## POST /v1/documents/{document_id}/conclusion — 文書締結

要確認となった文書を締結する。

### リクエストボディ

- signer_id: integer(int64) - 締結するユーザーのID (APIクライアントを利用する場合は必須) 例: `1` (最小: 1)
- message: string - メッセージ
  メッセージを送らない場合は無し。

### レスポンス

PATCH /v1/documents/{document_id} と同じ

## POST /v1/documents/{document_id}/confirmations — 文書送信

文書を送信する。

### リクエストボディ

- notification_type: string - 締結の種類

  メール送信の場合は `email`、SMS送信の場合は `sms`、署名者用URL発行の場合は `url`、対面契約の場合は `face_to_face`。
  指定しない場合はメール送信として扱われます。

  送り先情報は選択した締結の種類に対応するパラメータを含めてください。
  文書配付の場合は、受領者に署名を求めないため、反映されない項目がありますのでご注意ください。

  url を指定した場合はAPI実行時点で送信処理はされず、署名者用URLの発行が行われます。
  発行されたURLを相手に伝え、署名依頼の手続きを進めてください。

  face_to_face を指定した場合、対面契約として処理されます。以下の値が自動的に強制されます。
  - es_type: timestamp_only
  - remind_about_expiry: false
  - パスワード必須設定を無効化
  - CC宛先は全削除

  face_to_face を指定した場合、レスポンスの `face_to_face_url` フィールドに対面署名画面のURLが返ります。
  このURLを署名者の端末で開くことで対面契約フローを開始してください。 (選択肢: email, sms, url, face_to_face)
- sender_id: integer(int64) - 送信するユーザーのID (APIクライアントを利用する場合は必須) 例: `1` (最小: 1)
- to*: object
- es_type: string - 署名方法

  電子サインの場合は `timestamp_only` 、電子署名の場合は `esign` 。
  指定しない場合は電子サインとして扱われます。

  ※ 電子署名は1通送信するごとに料金が発生します。

  文書配付の場合は送信内容には反映されません。 (選択肢: timestamp_only, esign)
- message: string - メッセージ
  メッセージを送らない場合は無し。

  SMSによる送信やURL発行の場合はパラメータに含めても送信内容には反映はされません。
- password: string - パスワード
  パスワードを使用しない場合は無し。

  ※チーム設定でパスワード必須になっている場合は必要です。
- cc: array[string] - CCとなるメールアドレスリスト。URL発行の場合は反映されません
- files: array[object] - 添付ファイルのリスト
  配列の要素:
    - name*: string - 添付ファイル名（拡張子込み）
    - content*: string - 添付ファイル内容

      添付ファイルのバイナリをBase64エンコードした文字列を指定してください。
- master_document_expiry_id: integer(int64) - 有効期限の設定
  有効期限を設定しない場合は、1週間で設定されます。

  1. 1週間
  2. 2週間
  3. 4週間

  文書配付の場合は送信内容には反映されません。 例: `1` (最小: 1)
- remind_about_expiry: boolean - 署名有効期間リマインドを行うかどうか。
  true のとき署名有効期限の4日前・1日前にリマインドメールが送信されます。

  文書配付の場合は送信内容には反映されません。 例: `true`
- approve_on_signing: boolean - 三者間以上の契約で、受領者の合意を「署名と同時に行う」場合は、trueとしてください。

  本パラメータを省略した場合、チームの「合意のデフォルト設定」が適用されます。

  文書配付の場合は送信内容には反映されません。

### レスポンス

送信成功
- id*: integer(int64) - 文書ID
- title*: string - 文書のタイトル
- owner_id*: integer(int64) - 文書作成者ユーザーID
- status*: string - 文書のステータス
  * draft - 作成中
  * in_progress - 確認待ち
  * awaiting_receipt - 受け取り待ち
  * approved - 要確認
  * concluded - 完了
  * rejected - 却下
  * expired - 有効期限切れ
  * trashed - 削除済み
- folder_id*: integer(int64) - 文書が保存されているフォルダのID
- folder_name*: string - 文書が保存されているフォルダの名前
- items: array[object] - 入力項目 設定されていない場合は無し。
- meta_items: array[object] - 検索項目 設定されていない場合は無し。
- signers: array[object] - 文書に設定されている署名者
  送信前は無し。
- signer_url: object - 署名者用URLを受け取った相手は、そのURLから署名依頼の手続きを進めることができます
- created_at*: string(date-time) - 作成日時。 ISO8601 形式を受け入れます。

  入力例: 2022-01-01T00:00:00+09:00
- updated_at*: string(date-time) - 更新日時。 ISO8601 形式を受け入れます。

  入力例: 2022-02-01T00:00:00+09:00
- timestamped*: boolean - タイムスタンプが付与されているかどうか
- expires_at: string(date-time) - 有効期限日時
- sent_at: string(date-time) - 送信日時
- concluded_at: string(date-time) - 締結完了日時
- skip_approval*: boolean - trueの場合、配付文書（署名合意をスキップする文書）。
  falseの場合、署名・合意文書。
- signer_document_confirmation*: boolean - 配付文書の受領者が文書を確認済みかどうか。
  配付文書でない場合は常にfalse。
- approve_on_signing: boolean - trueの場合は三者間以上の契約での合意タイミングの設定が「署名と同時に行う」になっており、署名完了後の復路合意ステップを省略する。
  falseの場合は三者間以上の契約での合意タイミングの設定が「署名とは別に行う」になっており、署名完了後に受領者による合意操作が必要になる。
- face_to_face_url: string(uri) - 対面契約（face_to_face）として送信した文書の対面署名画面URL。
  このURLを署名者の端末で開くことで対面契約フローを開始できます。
  対面契約以外の文書では含まれません。

## GET /v1/documents/{document_id}/contract_certificate — 電子契約締結に関する情報の取得

文書に紐づく電子契約締結に関する情報を取得する。 PDF を取得したい場合は、Media Type を application/pdf にしてください。

### レスポンス

取得成功
- title: string - 文書名
- document_code: string - 書類コード
- es_type: string - 署名方法
- sending: object - 送信情報
- signatures: array[object] - 署名情報
- conclusion: object - 締結情報
- timestamps: array[object] - タイムスタンプ情報

## POST /v1/documents/{document_id}/document_items — 入力項目付与

文書に入力項目を付与する。

### リクエストボディ

- item_id*: integer(int64) - 入力項目の項目ID
  チームで設定されているものの中から選んで指定する。 例: `1` (最小: 1)
- order*: integer(int64) - 入力項目を付与する署名者の値
  * 0 - 送信者
  * 1以降 - n番目の受領者 (最小: 0)
- value: string - 入力項目に設定する値
  入力タイプによっては値のフォーマットがあります。
  以下を参照して値を設定してください。
  * テキスト - 任意の文字列
  * プルダウン - 選択項目名と一致した文字列
  * 数値 - 任意の整数
  * 日付 - YYYY-MM-DD形式
  * 印鑑(文字列) - 任意の文字列
  * 印鑑(マイ印鑑) - 「マイ印鑑一覧の取得」で取得したnameを設定してください
- required: boolean - 必須項目かどうか
- seal_image_id: integer(int64) - 入力タイプが印鑑かつマイ印鑑を設定したい場合のみ、マイ印鑑のIDを設定してください。
  マイ印鑑のIDは「マイ印鑑一覧の取得」で取得可能です。

  ※ マイ印鑑のIDが指定された場合、マイ印鑑を有効にするためvalueに任意の文字列を指定してもマイ印鑑のnameが登録されます。 例: `1` (最小: 1)
- signatures: object - 入力項目のPDF上の配置座標リスト。
  配列でない値を指定した場合は無視され、入力項目のみ作成される。
  配列の要素が不正な場合（Hash でない、座標が不足しているなど）は 400 を返す。

### レスポンス

成功時
入力項目を付与した文書を返す。
- name*: string - 項目名
- role*: string - どちら側の入力項目か
  * owner 送信者側
  * signer 承認側
- order*: integer(int64) - 署名の順番。以下の順で表示
  * ownerのアイテム群
  * signer1のアイテム群
  * signer2のアイテム群
  …
- required*: boolean - 必須項目かどうか
- value: string - 入力された値
  未入力の場合は無し。
- user_id: integer(int64) - 文書入力項目入力ユーザーID
  未入力の場合は無し。
- seal_image_id: integer(int64) - マイ印鑑画像のID
  入力項目が印鑑でなかった場合またはマイ印鑑機能を使用していない場合は無し。
- item_id: integer(int64) - 入力項目のID
- signatures: array[object] - 付与された配置座標一覧

## PATCH /v1/documents/{document_id}/document_items/{document_item_id} — 入力項目に値を設定

文書に付与した入力項目の値を設定する。

### リクエストボディ

- value*: string - 入力項目に設定する値
  入力タイプによっては値のフォーマットがあります。
  以下を参照して値を設定してください。

  * テキスト - 任意の文字列
  * プルダウン - 選択項目名と一致した文字列
  * 数値 - 任意の整数
  * 日付 - YYYY-MM-DD形式
  * 印鑑(文字列) - 任意の文字列
  * 印鑑(マイ印鑑) - 「マイ印鑑一覧の取得」で取得したnameを設定してください
- seal_image_id: integer(int64) - 入力タイプが印鑑かつマイ印鑑を設定したい場合のみ、マイ印鑑のIDを設定してください。
  マイ印鑑のIDは「マイ印鑑一覧の取得」で取得可能です。

  ※ マイ印鑑のIDが指定された場合、マイ印鑑を有効にするためvalueに任意の文字列を指定してもマイ印鑑のnameが登録されます。 例: `1` (最小: 1)

### レスポンス

- name*: string - 項目名
- role*: string - どちら側の入力項目か
  * owner 送信者側
  * signer 承認側
- order*: integer(int64) - 署名の順番。以下の順で表示
  * ownerのアイテム群
  * signer1のアイテム群
  * signer2のアイテム群
  …
- required*: boolean - 必須項目かどうか
- value: string - 入力された値
  未入力の場合は無し。
- user_id: integer(int64) - 文書入力項目入力ユーザーID
  未入力の場合は無し。
- seal_image_id: integer(int64) - マイ印鑑画像のID
  入力項目が印鑑でなかった場合またはマイ印鑑機能を使用していない場合は無し。
- item_id: integer(int64) - 入力項目のID

## DELETE /v1/documents/{document_id}/document_items/{document_item_id} — 入力項目の削除

文書に付与した入力項目を削除する。

### レスポンス

削除成功
- name*: string - 項目名
- role*: string - どちら側の入力項目か
  * owner 送信者側
  * signer 承認側
- order*: integer(int64) - 署名の順番。以下の順で表示
  * ownerのアイテム群
  * signer1のアイテム群
  * signer2のアイテム群
  …
- required*: boolean - 必須項目かどうか
- value: string - 入力された値
  未入力の場合は無し。
- user_id: integer(int64) - 文書入力項目入力ユーザーID
  未入力の場合は無し。
- seal_image_id: integer(int64) - マイ印鑑画像のID
  入力項目が印鑑でなかった場合またはマイ印鑑機能を使用していない場合は無し。
- item_id: integer(int64) - 入力項目のID

## GET /v1/documents/{document_id}/document_items/{document_item_id}/signatures — 配置座標の一覧取得

入力項目に紐づくPDF上の配置座標一覧を取得する。 ファイルから作成した文書のみ対象。テンプレート文書等への操作は422を返す。

### パラメータ

- page: object
- per_page: integer - 取得件数
  1〜100 の範囲外や不正な値を指定した場合はエラーにせず 1〜100 に丸めて処理する。

### レスポンス

GET /v1/documents と同じ

## POST /v1/documents/{document_id}/document_items/{document_item_id}/signatures — 配置座標の追加

入力項目のPDF上の配置座標を追加する。 1つの入力項目に対して複数の配置座標を指定可能（複数ページにまたがる場合等）。 ファイルから作成した文書のみ対象。テンプレート文書等への操作は422を返す。

### リクエストボディ*

- page*: integer - 配置するページ番号（1始まり） (最小: 1)
- x*: integer - X座標（左上端起点、右方向に正、Web画面ピクセル単位） (最小: 0)
- y*: integer - Y座標（左上端起点、下方向に正、Web画面ピクセル単位） (最小: 0)
- formatting: object - テキスト表示のフォーマット設定（SignatureFormatting に対応、input_type=string の場合のみ有効）
  - alignment: string - テキスト配置 (選択肢: left, right, center)
  - width: integer - テキストボックス幅（Web画面ピクセル単位） (最小: 0)
  - word_wrap: boolean - テキスト折り返しの有無

### レスポンス

追加成功
- page*: integer - 配置するページ番号（1始まり）
- x*: integer - X座標（左上端起点、右方向に正、Web画面ピクセル単位）
- y*: integer - Y座標（左上端起点、下方向に正、Web画面ピクセル単位）
- formatting: object - テキスト表示のフォーマット設定（SignatureFormatting に対応、input_type=string の場合のみ有効）
- id*: integer(int64) - 配置座標ID
- created_at*: string(date-time) - 作成日時
- updated_at*: string(date-time) - 更新日時

## PATCH /v1/documents/{document_id}/document_items/{document_item_id}/signatures/{signature_id} — 配置座標の更新

入力項目のPDF上の配置座標を更新する。 `formatting` キーを省略した場合、既存の formatting 設定はそのまま残る。 `formatting: null` を明示的に指定した場合のみ、既存の formatting が削除される。 `formatting: { ... }` を指定した場合は、既存の formatting が置き換えられる。 ファイルから作成した文書のみ対象。テンプレート文書等への操作は422を返す。

### リクエストボディ*

POST /v1/documents/{document_id}/document_items/{document_item_id}/signatures と同じ

### レスポンス

更新成功
- page*: integer - 配置するページ番号（1始まり）
- x*: integer - X座標（左上端起点、右方向に正、Web画面ピクセル単位）
- y*: integer - Y座標（左上端起点、下方向に正、Web画面ピクセル単位）
- formatting: object - テキスト表示のフォーマット設定（SignatureFormatting に対応、input_type=string の場合のみ有効）
- id*: integer(int64) - 配置座標ID
- created_at*: string(date-time) - 作成日時
- updated_at*: string(date-time) - 更新日時

## DELETE /v1/documents/{document_id}/document_items/{document_item_id}/signatures/{signature_id} — 配置座標の削除

入力項目のPDF上の配置座標を削除する。 ファイルから作成した文書のみ対象。テンプレート文書等への操作は422を返す。

### レスポンス

削除成功
- page*: integer - 配置するページ番号（1始まり）
- x*: integer - X座標（左上端起点、右方向に正、Web画面ピクセル単位）
- y*: integer - Y座標（左上端起点、下方向に正、Web画面ピクセル単位）
- formatting: object - テキスト表示のフォーマット設定（SignatureFormatting に対応、input_type=string の場合のみ有効）
- id*: integer(int64) - 配置座標ID
- created_at*: string(date-time) - 作成日時
- updated_at*: string(date-time) - 更新日時

## POST /v1/documents/{document_id}/face_to_face_extension — 対面契約の有効期限の延長

確認待ちの対面契約の有効期限を延長する。 対象文書は以下の条件を満たす必要があります。 - ステータスが確認待ちであること - 対面契約として送信された文書であること - 対面契約プランが有効なチームの文書であること - 実行ユーザーが対面契約を開始できる権限（対面契約開始可能ロール）を持つこと

### リクエストボディ

- sender_id: integer(int64) - 送信するユーザーのID (APIクライアントを利用する場合は必須)

  OAuthアクセストークンを利用する場合は、アクセストークンに紐づくユーザーと同じIDを指定してください。異なるIDを指定すると 403 エラーとなります。 例: `1` (最小: 1)

### レスポンス

延長成功
- id*: integer(int64) - 文書ID
- title*: string - 文書のタイトル
- owner_id*: integer(int64) - 文書作成者ユーザーID
- status*: string - 文書のステータス
  * draft - 作成中
  * in_progress - 確認待ち
  * awaiting_receipt - 受け取り待ち
  * approved - 要確認
  * concluded - 完了
  * rejected - 却下
  * expired - 有効期限切れ
  * trashed - 削除済み
- folder_id*: integer(int64) - 文書が保存されているフォルダのID
- folder_name*: string - 文書が保存されているフォルダの名前
- items: array[object] - 入力項目 設定されていない場合は無し。
- meta_items: array[object] - 検索項目 設定されていない場合は無し。
- signers: array[object] - 文書に設定されている署名者
  送信前は無し。
- signer_url: object - 署名者用URLを受け取った相手は、そのURLから署名依頼の手続きを進めることができます
- created_at*: string(date-time) - 作成日時。 ISO8601 形式を受け入れます。

  入力例: 2022-01-01T00:00:00+09:00
- updated_at*: string(date-time) - 更新日時。 ISO8601 形式を受け入れます。

  入力例: 2022-02-01T00:00:00+09:00
- timestamped*: boolean - タイムスタンプが付与されているかどうか
- expires_at: string(date-time) - 有効期限日時
- sent_at: string(date-time) - 送信日時
- concluded_at: string(date-time) - 締結完了日時
- skip_approval*: boolean - trueの場合、配付文書（署名合意をスキップする文書）。
  falseの場合、署名・合意文書。
- signer_document_confirmation*: boolean - 配付文書の受領者が文書を確認済みかどうか。
  配付文書でない場合は常にfalse。
- approve_on_signing: boolean - trueの場合は三者間以上の契約での合意タイミングの設定が「署名と同時に行う」になっており、署名完了後の復路合意ステップを省略する。
  falseの場合は三者間以上の契約での合意タイミングの設定が「署名とは別に行う」になっており、署名完了後に受領者による合意操作が必要になる。
- face_to_face_url: string(uri) - 対面契約（face_to_face）として送信した文書の対面署名画面URL。
  このURLを署名者の端末で開くことで対面契約フローを開始できます。
  対面契約以外の文書では含まれません。

## PUT /v1/documents/{document_id}/meta — 検索項目付与

文書に検索項目を付与する。

### リクエストボディ

- items*: array[object] - 文書に付与する検索項目の配列

  すべてを置き換えるため、検索項目を追加したい場合は既存項目と追加したい項目を合わせてリクエストする。
  検索項目を削除する場合は既存項目から削除したい項目を除いたものをリクエストする。
  配列の要素:
    - item_id*: integer(int64) - 検索項目の項目ID

      チームで設定されているものの中から選んで指定する。
      検索項目以外に、文書に入力項目として設定する項目も指定可能。
    - value*: string - 検索項目の値

### レスポンス

OK

文書に設定されている検索項目が返る。

## GET /v1/documents/{document_id}/placeholder — 入力内容未反映の文書取得

作成中の値が入っていない入力項目が配置された文書のPDFを取得する。 Media Type を application/pdf にしてください。 PDF作成処理中はエラーとなる為、時間を置いてAPIを再実行してください。

### レスポンス

GET /v1/documents と同じ

## POST /v1/documents/{document_id}/re_confirmations — 文書再送信

文書を再送信する。

### リクエストボディ

- sender_id: integer(int64) - 送信するユーザーのID (APIクライアントを利用する場合は必須) 例: `1` (最小: 1)
- message: string - メッセージ
  メッセージを送らない場合は無し。

  SMSによる再送信の場合はパラメータに含めても送信内容には反映はされません。

### レスポンス

POST /v1/documents/{document_id}/confirmations と同じ

## POST /v1/documents/{document_id}/rejection — 文書却下

要確認となった文書を却下する。

### リクエストボディ

- rejector_id: integer(int64) - 文書の送信者となるユーザーのID 例: `1` (最小: 1)
- message: string - メッセージ
  メッセージを送らない場合は無し。

### レスポンス

PATCH /v1/documents/{document_id} と同じ

## POST /v1/documents/{document_id}/send_back — 文書差し戻し

要確認となった文書を差し戻しする。

### リクエストボディ

- executor_id: integer(int64) - 文書の送信者となるユーザーのID 例: `1` (最小: 1)
- message: string - メッセージ
  メッセージを送らない場合は無し。

### レスポンス

PATCH /v1/documents/{document_id} と同じ

## PUT /v1/documents/{document_id}/signature_requests/cancel — 文書承認依頼キャンセル

文書の承認依頼をキャンセルする。

### リクエストボディ

- user_id: integer(int64) - 承認依頼をキャンセルするユーザーのID (APIクライアントを利用する場合は必須) 例: `1` (最小: 1)
- message: string - メッセージ
  メッセージを送らない場合は無し。

### レスポンス

承認依頼キャンセル成功
- id*: integer(int64) - 文書ID
- title*: string - 文書のタイトル
- owner_id*: integer(int64) - 文書作成者ユーザーID
- status*: string - 文書のステータス
  * draft - 作成中
  * in_progress - 確認待ち
  * awaiting_receipt - 受け取り待ち
  * approved - 要確認
  * concluded - 完了
  * rejected - 却下
  * expired - 有効期限切れ
  * trashed - 削除済み
- folder_id*: integer(int64) - 文書が保存されているフォルダのID
- folder_name*: string - 文書が保存されているフォルダの名前
- items: array[object] - 入力項目 設定されていない場合は無し。
- meta_items: array[object] - 検索項目 設定されていない場合は無し。
- signers: array[object] - 文書に設定されている署名者
  送信前は無し。
- signer_url: object - 署名者用URLを受け取った相手は、そのURLから署名依頼の手続きを進めることができます
- created_at*: string(date-time) - 作成日時。 ISO8601 形式を受け入れます。

  入力例: 2022-01-01T00:00:00+09:00
- updated_at*: string(date-time) - 更新日時。 ISO8601 形式を受け入れます。

  入力例: 2022-02-01T00:00:00+09:00
- timestamped*: boolean - タイムスタンプが付与されているかどうか
- expires_at: string(date-time) - 有効期限日時
- sent_at: string(date-time) - 送信日時
- concluded_at: string(date-time) - 締結完了日時
- skip_approval*: boolean - trueの場合、配付文書（署名合意をスキップする文書）。
  falseの場合、署名・合意文書。
- signer_document_confirmation*: boolean - 配付文書の受領者が文書を確認済みかどうか。
  配付文書でない場合は常にfalse。
- approve_on_signing: boolean - trueの場合は三者間以上の契約での合意タイミングの設定が「署名と同時に行う」になっており、署名完了後の復路合意ステップを省略する。
  falseの場合は三者間以上の契約での合意タイミングの設定が「署名とは別に行う」になっており、署名完了後に受領者による合意操作が必要になる。
- face_to_face_url: string(uri) - 対面契約（face_to_face）として送信した文書の対面署名画面URL。
  このURLを署名者の端末で開くことで対面契約フローを開始できます。
  対面契約以外の文書では含まれません。

## POST /v1/pdf_documents — 文書アップロード

任意のフォルダに文書をアップロードする。作成された文書のステータスは「完了」になる

### リクエストボディ

- pdf_file*: object
  - name*: string - アップロードファイル名（拡張子込み）

    - PDFファイルのタイトルは255文字以内にしてください。
  - content*: string - アップロードファイルの内容

    - アップロードファイルのバイナリをBase64エンコードした文字列を指定してください。
    - ファイル形式はPDF（application/pdf）のみ有効です。
    - PDFファイルのサイズは10MB以下にしてください。
- uploader_id*: integer(int64) - アップロードするユーザーのID
- folder_id*: integer(int64) - アップロードした文書の保存先フォルダのID

### レスポンス

- document: object - 文書
- message: string - メッセージ

## GET /v1/users/{user_id}/documents — ユーザーがアクセスできる文書一覧の取得

特定のユーザーがアクセスできる文書の一覧を取得する。 ここで取得できる文書には、作成した文書と受領した文書が含まれます。 文書は、新しく作成した順に取得されます。

### パラメータ

- page: object
- per_page: object
- folder_id: object - フォルダID。IDで指定したフォルダに格納されている文書一覧を取得できる。
- title: string - 文書名に一致する一覧を取得できる（部分一致も可）。送信相手のメールアドレスに一致する一覧を取得できる（完全一致）。
- status: string - ステータス毎に文書一覧を取得できる。
  * draft - 作成中
  * in_progress - 確認待ち
  * awaiting_receipt - 受け取り待ち
  * approved - 要確認
  * concluded - 完了
  * rejected - 却下
  * expired - 有効期限切れ (選択肢: draft, in_progress, awaiting_receipt, approved, concluded, rejected, expired)
- ids[]: array[integer] - 配列で文書IDを指定して、文書一覧を取得できる
- created_at_from: object - 作成日時が指定した作成日時以降である文書を取得できます。

  開始は区切りを含みますが、終了は区切りを含みません。(左閉右開区間)
- created_at_to: object - 作成日時が指定した作成日時より過去である文書を取得できます。

  開始は区切りを含みますが、終了は区切りを含みません。(左閉右開区間)
- updated_at_from: object - 更新日時が指定した更新日時以降である文書を取得できます。

  開始は区切りを含みますが、終了は区切りを含みません。(左閉右開区間)
- updated_at_to: object - 更新日時が指定した更新日時より過去である文書を取得できます。

  開始は区切りを含みますが、終了は区切りを含みません。(左閉右開区間)

### レスポンス

GET /v1/documents と同じ
