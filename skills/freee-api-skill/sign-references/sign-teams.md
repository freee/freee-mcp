# チーム

## GET /v1/team — 所属しているチームの取得

自分が所属しているチームを取得する。

### レスポンス

取得成功
- id*: integer(int64) - チームID
- name*: string - チームの名前

## GET /v1/team/team_setting — 所属しているチーム設定の取得

自分が所属しているチームの設定を取得する。

### レスポンス

取得成功
- document_password*: boolean - 文書のパスワード設定が必須か否か
- folder_necessary*: boolean - フォルダ選択が必須か否か
- approval_workflow*: boolean - ワークフロー承認が必須か否か
- workflow_route*: boolean - ルートテンプレート選択が必須か否か
- multiple_approvals*: boolean - 相手方による署名依頼の転送が必須か否か
- verify_signer_telephone_number*: boolean - 相手方の電話番号確認が必須か否か
- default_approve_on_signing*: boolean - 合意タイミングのデフォルト設定

## GET /v1/teams — チーム一覧の取得

チーム一覧を取得する。 自チームも含め、文書を交わした全てのチームを取得することができます。 相手方がfreeeサイン上にアカウントを作成していない場合はチームは存在していないので取得できません。

### パラメータ

- page: object
- per_page: object
- name: string - チーム名に一致する一覧を取得できる（部分一致も可）
- ids[]: array[object] - 配列でチームIDを指定して、チーム一覧を取得できる

### レスポンス

取得成功
