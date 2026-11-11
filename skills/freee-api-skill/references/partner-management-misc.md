<!-- freee業務委託管理 の小さいタグをまとめたファイル。タグごとの行範囲は INDEX.md を参照し、必要な範囲だけ読むこと。 -->

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

# partner_management_orderer_sections

partner_management_orderer_sections

## GET /hub/partner_management/orderer/sections — 部門一覧取得（β版）

部門一覧を取得する

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- company_id*: integer(int64) - freee事業所ID
- page_size: integer(int32) - 1ページあたりの取得件数（デフォルト20、最大100）
- page_token: string - カーソルトークン。前回レスポンスの next_page_token を指定する
- code: string - 部門コードによる絞り込み

### レスポンス

部門一覧レスポンス
- data*: array[object] - 部門のリスト
- next_page_token*: string - 次ページのカーソルトークン。最終ページは null

# partner_management_orderer_partners

partner_management_orderer_partners

## GET /hub/partner_management/orderer/partners — パートナー一覧取得（β版）

パートナー一覧を取得する

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- company_id*: integer(int64) - freee事業所ID
- page_size: integer(int32) - 1ページあたりの取得件数（デフォルト20、最大100）
- page_token: string - カーソルトークン。前回レスポンスの next_page_token を指定する
- status: string - アカウント状態 (active: 有効, invitation_pending: 招待中) (選択肢: active, invitation_pending)
- name_contains: string - パートナー名の部分一致で絞り込む。招待未承諾時は招待時の名前、承諾済みは名前を対象
- invoice_name_contains: string - 屋号の部分一致で絞り込む
- email: string - メールアドレスの完全一致で絞り込む
- custom_code: string - カスタムコードの完全一致で絞り込む
- evaluation_rate_average_min: number(double) - 評価 (平均) の下限 (0.0〜5.0)で絞り込む
- evaluation_rate_average_max: number(double) - 評価 (平均) の上限 (0.0〜5.0)で絞り込む
- task_estimate_unit_price_min: number(double) - タスク見積単価の下限で絞り込む
- task_estimate_unit_price_max: number(double) - タスク見積単価の上限で絞り込む
- business_classification: string - 事業者区分 (taxable: 課税事業者, exempt: 免税事業者) (選択肢: taxable, exempt)
- has_invoice_number: boolean - インボイス登録番号の有無で絞り込む
- tax_chargeable: boolean - 消費税請求可否で絞り込む
- withholding_tax_required: boolean - 源泉所得税 (請求) が有効かで絞り込む
- expense_withholding_tax_required: boolean - 源泉所得税 (経費) が有効かで絞り込む
- two_factor_authentication_setting_type: string - 二要素認証の設定種別 (unset: 未設定, mail: メール, app: アプリ) (選択肢: unset, mail, app)

### レスポンス

パートナー一覧レスポンス
- data*: array[object] - パートナーのリスト
- next_page_token*: string - 次ページのカーソルトークン。最終ページは null

## GET /hub/partner_management/orderer/partners/{id} — パートナー詳細取得（β版）

指定したパートナー1件のプロフィール・請求情報・源泉徴収設定・招待状態を取得する

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- company_id*: integer(int64) - freee事業所ID
- id* (path): integer(int32) - 取得対象のパートナーID

### レスポンス

パートナー詳細レスポンス
- id*: integer(int32) - パートナーID
- email*: string - メールアドレス。招待未承諾時は招待時に指定したメールアドレスを返す
- name*: string - 氏名。招待未承諾時は招待時に指定した名前を返す
- status*: string - アカウント状態 (active: 有効, invitation_pending: 招待中)
- invited_at*: string(date-time) - 招待送信日時
- invitation_accepted_at*: string(date-time) - 招待受諾日時
- freee_partner_id*: string - freee連携の取引先ID
- custom_code*: string - 企業が任意に付与する管理コード (企業内で一意)
- memo*: string - 企業がパートナーごとに任意で記録する社内メモ
- task_estimate_unit_price*: string(decimal) - 発注時のデフォルト単価 (税抜)
- task_quantity_unit*: string - 発注時のデフォルト数量の単位。デフォルト「件」
- task_estimate_quantity*: string(decimal) - 発注時のデフォルト数量
- taxpayer_number*: string - インボイス登録番号。招待未承諾時は null
- withholding_tax_required*: boolean - 請求書の源泉徴収を必須とするか
- withholding_tax_type*: string - 請求書の源泉徴収税率の種別
- custom_withholding_tax_rate*: string(decimal) - 請求書の源泉徴収のカスタム税率。種別が custom の時に設定される
- expense_withholding_tax_required*: boolean - 経費の源泉徴収を必須とするか
- expense_withholding_tax_type*: string - 経費の源泉徴収税率の種別
- custom_expense_withholding_tax_rate*: string(decimal) - 経費の源泉徴収のカスタム税率。種別が custom の時に設定される
- order_amount_limit*: integer(int32) - 発注金額の上限 (円)
- invoice_name*: string - 屋号(請求書宛名)。招待未承諾時は null
- postal_code*: string - 郵便番号。招待未承諾時は null
- address*: string - 住所。招待未承諾時は null
- phone_number*: string - 電話番号。招待未承諾時は null
- business_classification*: string - 事業者区分 (taxable: 課税事業者, exempt: 免税事業者)。招待未承諾時は null
- bank_account*: object - 銀行口座。招待未承諾時は null

# partner_management_orderer_project_business_partners

partner_management_orderer_project_business_partners

## GET /hub/partner_management/orderer/projects/{project_id}/project_business_partners — プロジェクトのログインなしパートナー一覧取得（β版）

指定プロジェクトにアサインされているログインなしパートナー一覧を取得する

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- project_id* (path): integer(int32) - 取得対象のプロジェクトID
- company_id*: integer(int64) - freee事業所ID
- page_size: integer(int32) - 1ページあたりの取得件数（デフォルト20、最大100）
- page_token: string - カーソルトークン。前回レスポンスの next_page_token を指定する

### レスポンス

プロジェクトのログインなしパートナー一覧レスポンス
- data*: array[object] - ログインなしパートナーのリスト
- next_page_token*: string - 次ページのカーソルトークン。最終ページは null

# partner_management_orderer_project_company_users

partner_management_orderer_project_company_users

## GET /hub/partner_management/orderer/projects/{project_id}/project_company_users — プロジェクト担当者一覧取得（β版）

指定プロジェクトの担当者（アサインされている企業ユーザー）の一覧を取得する

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- company_id*: integer(int64) - freee事業所ID
- project_id* (path): integer(int32) - 取得対象のプロジェクト ID
- page_size: integer(int32) - 1ページあたりの取得件数（デフォルト20、最大100）
- page_token: string - カーソルトークン。前回レスポンスの next_page_token を指定する

### レスポンス

プロジェクトの担当者一覧レスポンス
- data*: array[object] - 担当者一覧
- next_page_token*: string - 次ページのカーソルトークン。最終ページは null

# partner_management_orderer_project_partners

partner_management_orderer_project_partners

## GET /hub/partner_management/orderer/projects/{project_id}/project_partners — プロジェクトパートナー一覧取得（β版）

指定したプロジェクトにアサインされているパートナーの一覧を取得する。 ##

注意点
- パートナーの詳細情報は返さないため、必要な場合はレスポンスの `partner_id` を使って パートナー詳細取得 API を呼び出す。 - 招待を承諾していないパートナーもプロジェクトにアサインできるため、一覧に含まれる。 その場合 `name` には招待時に指定した名前を返す。

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- company_id*: integer(int64) - freee事業所ID
- project_id* (path): integer(int32) - 取得対象のプロジェクトID
- page_size: integer(int32) - 1ページあたりの取得件数（デフォルト20、最大100）
- page_token: string - カーソルトークン。前回レスポンスの next_page_token を指定する

### レスポンス

プロジェクトパートナー一覧レスポンス
- data*: array[object] - プロジェクトパートナーのリスト
- next_page_token*: string - 次ページのカーソルトークン。最終ページは null

# partner_management_orderer_projects

partner_management_orderer_projects

## GET /hub/partner_management/orderer/projects — プロジェクト一覧取得（β版）

プロジェクトを一覧で取得する

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- company_id*: integer(int64) - freee事業所ID
- company_user_ids[]: array[integer] - 担当者（企業ユーザー）のIDで絞り込む。指定したIDをすべて含むプロジェクトだけを返す（AND条件）
- partner_ids[]: array[integer] - パートナー（ログインあり）のIDで絞り込む。指定したIDをすべて含むプロジェクトだけを返す（AND条件）
- business_partner_ids[]: array[integer] - ログインなしパートナーのIDで絞り込む。指定したIDをすべて含むプロジェクトだけを返す（AND条件）
- project_ids[]: array[integer] - プロジェクトIDで絞り込む。指定したいずれかのIDに一致するプロジェクトを返す（OR条件）
- name_contains: string - プロジェクト名で絞り込む（部分一致）
- description_contains: string - 説明で絞り込む（部分一致）
- page_size: integer(int32) - 1ページあたりの取得件数（デフォルト20、最大100）
- page_token: string - カーソルトークン。前回レスポンスの next_page_token を指定する

### レスポンス

プロジェクト一覧レスポンス
- data*: array[object] - プロジェクトの一覧
- next_page_token*: string - 次ページのカーソルトークン。最終ページは null

## GET /hub/partner_management/orderer/projects/{id} — プロジェクト詳細取得（β版）

プロジェクト情報を取得する

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- company_id*: integer(int64) - freee事業所ID
- id* (path): integer(int32) - 取得対象のプロジェクトID

### レスポンス

プロジェクト詳細レスポンス
- id*: integer(int32) - プロジェクトID
- is_archived*: boolean - アーカイブ済みかどうか
- archived_at*: string(date-time) - アーカイブ日時
- name*: string - プロジェクト名
- description*: string - 説明
- require_hide_other_freelancers*: boolean - 他パートナーのアカウントを非表示にするか
- default_inspection_date_days*: integer(int32) - 検収日のデフォルト設定
- default_task_order_note*: string - 発注書の備考欄のデフォルト設定
- default_invoice_note*: string - 請求書の備考欄のデフォルト設定
- approval_flow_pattern_task_order_id*: integer(int64) - タスク発注の社内承認フローID
- approval_flow_pattern_task_submit_id*: integer(int64) - タスク検収の社内承認フローID
- approval_flow_pattern_invoice_submit_id*: integer(int64) - 請求書の社内承認フローID
- created_at*: string(date-time) - 作成日時

# partner_management_orderer_task_delivery_data_custom_fields

partner_management_orderer_task_delivery_data_custom_fields

## GET /hub/partner_management/orderer/tasks/{task_id}/delivery_data/custom_fields — タスク納品データのカスタム項目一覧取得（β版）

タスクの納品データに設定されたカスタム項目の一覧を取得する

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- company_id*: integer(int64) - freee事業所ID
- task_id* (path): integer(int32) - 取得対象のタスク（発注書）ID
- page_size: integer(int32) - 1ページあたりの取得件数（デフォルト20、最大100）
- page_token: string - カーソルトークン。前回レスポンスの next_page_token を指定する

### レスポンス

タスク納品データのカスタム項目一覧レスポンス
- data*: array[object] - 納品データのカスタム項目一覧
- next_page_token*: string - 次ページのカーソルトークン。最終ページは null

# partner_management_orderer_task_line_items_custom_fields

partner_management_orderer_task_line_items_custom_fields

## GET /hub/partner_management/orderer/task_line_items/{task_line_item_id}/custom_fields — タスク品目のカスタム項目一覧取得（β版）

指定タスク品目のカスタム項目の一覧を取得する

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- company_id*: integer(int64) - freee事業所ID
- task_line_item_id* (path): integer(int64) - 取得対象のタスク品目 ID
- page_size: integer(int32) - 1ページあたりの取得件数（デフォルト20、最大100）
- page_token: string - カーソルトークン。前回レスポンスの next_page_token を指定する

### レスポンス

タスク品目のカスタム項目一覧レスポンス
- data*: array[object] - タスク品目カスタム項目一覧
- next_page_token*: string - 次ページのカーソルトークン。最終ページは null

# partner_management_orderer_task_order_approval_flows

partner_management_orderer_task_order_approval_flows

## GET /hub/partner_management/orderer/task_order/approval_flows/{id} — 承認フロー詳細取得（β版）

タスクの発注承認フローを 1 件取得する。取得できるのはタスクを閲覧できる企業ユーザー。検収承認と請求書の承認フローは対象外

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- company_id*: integer(int64) - freee事業所ID
- id* (path): integer(int64) - 取得対象の承認フロー ID。タスク詳細取得 API の task_order_approval_flow_id

### レスポンス

承認フロー詳細レスポンス
- id*: integer(int64) - 承認フロー ID
- task_id*: integer(int32) - タスク ID
- name*: string - フロー名。申請前は `未定`。初回の申請時にプロジェクトに設定された承認フローの名前が入る
- status*: string - 発注承認のステータス (unrequested: 未申請, requested: 申請中, accepted: 承認, rejected: 差し戻し)
- steps*: array[object] - 承認フローのステップ。申請前は空配列

## POST /hub/partner_management/orderer/task_order/approval_flows/{approval_flow_id}/request — 発注承認の申請（β版）

タスクの発注承認を申請する。承認フローを申請中にし、最初のステップの承認者に通知する。申請できるのはタスクの担当者で、タスクが下書きかつ発注承認が未申請または差し戻しのとき。検収承認と請求書の承認フローは対象外

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- approval_flow_id* (path): integer(int64) - 申請する承認フローの ID。タスク詳細取得 API の task_order_approval_flow_id

### リクエストボディ*

- company_id*: integer(int64) - freee事業所ID 例: `1`
- comment: string - コメント。最初のステップの承認者に社内コメントとして通知される。社内コメントの投稿制限が有効な企業では、空でない値を送ると 422 になる 例: `ご確認をお願いします`

### レスポンス

発注承認の申請レスポンス
- id*: integer(int64) - 承認フロー ID
- task_id*: integer(int32) - タスク ID
- name*: string - フロー名。申請前は `未定`。初回の申請時にプロジェクトに設定された承認フローの名前が入る
- status*: string - 発注承認のステータス (unrequested: 未申請, requested: 申請中, accepted: 承認, rejected: 差し戻し)
- steps*: array[object] - 承認フローのステップ。申請前は空配列
