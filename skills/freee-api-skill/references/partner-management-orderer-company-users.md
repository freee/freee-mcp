# partner_management_orderer_company_users

partner_management_orderer_company_users

## GET /hub/partner_management/orderer/company_users — 企業ユーザー一覧取得（β版）

企業ユーザーの一覧を取得する

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- company_id*: integer(int64) - freee事業所ID
- page_size: integer(int32) - 1ページあたりの取得件数（デフォルト20、最大100）
- page_token: string - カーソルトークン。前回レスポンスの next_page_token を指定する
- name_contains: string - 氏名の部分一致で絞り込む
- email: string - メールアドレスの完全一致で絞り込む
- role_id: integer(int64) - ロールIDで絞り込む
- section_code: string - 部門コードで絞り込む
- status: string - アカウント状態 (active: 有効, invitation_pending: 招待中) (選択肢: active, invitation_pending)
- freee_account_integrated: boolean - freeeアカウント連携済みかで絞り込む
- two_factor_authentication_setting_type: string - 2FA設定タイプ (unset: 未設定, mail: メール, app: アプリ) (選択肢: unset, mail, app)
- saml_sso_enabled: boolean - SAML SSO設定済みかで絞り込む

### レスポンス

企業ユーザー一覧レスポンス
- data*: array[object] - 企業ユーザーのリスト
- next_page_token*: string - 次ページのカーソルトークン。最終ページは null

## GET /hub/partner_management/orderer/company_users/{id} — 企業ユーザー詳細取得（β版）

企業ユーザー情報を取得する

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- company_id*: integer(int64) - freee事業所ID
- id* (path): integer(int32) - 取得対象の企業ユーザーID

### レスポンス

企業ユーザー詳細レスポンス
- id*: integer(int32) - CompanyUser ID
- email*: string - メールアドレス
- name*: string - 氏名
- status*: string - アカウント状態 (active: 有効, invitation_pending: 招待中)
- role_id*: integer(int64) - ロールID。基本ロールは全企業共通で 1: オーナー, 2: マスター, 3: 経理, 4: メンバー で固定。
- section_code*: string - 部門コード。部門未設定の場合は null
- two_factor_authentication_setting_type*: string - 2FA設定タイプ (unset: 未設定, mail: メール, app: アプリ)
- freee_account_integrated*: boolean - freeeアカウント連携済みか
- saml_sso_enabled*: boolean - SAML SSO設定済みか
- notification_settings*: object - 通知設定
- invitation_sent_at*: string(date-time) - 招待送信日時
- invitation_accepted_at*: string(date-time) - 招待受諾日時。未受諾は null
- created_at*: string(date-time) - 作成日時
