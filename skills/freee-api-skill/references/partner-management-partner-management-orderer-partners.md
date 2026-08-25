# partner_management_orderer_partners

partner_management_orderer_partners

## GET /hub/partner_management/orderer/partners — パートナー一覧取得（β版）

パートナー一覧を取得する

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- company_id*: integer(int64) - freee事業所ID
- page_size: integer(int32) - 1ページあたりの取得件数（デフォルト20、最大100）
- page_token: string - カーソルトークン。前回レスポンスの next_page_token を指定する
- status: object - アカウント状態で絞り込む
- name_contains: string - パートナー名の部分一致で絞り込む。招待未承諾時は招待時の名前、承諾済みは名前を対象
- invoice_name_contains: string - 屋号の部分一致で絞り込む
- email: string - メールアドレスの完全一致で絞り込む
- custom_code: string - カスタムコードの完全一致で絞り込む
- evaluation_rate_average_min: number(double) - 評価 (平均) の下限 (0.0〜5.0)で絞り込む
- evaluation_rate_average_max: number(double) - 評価 (平均) の上限 (0.0〜5.0)で絞り込む
- task_estimate_unit_price_min: number(double) - タスク見積単価の下限で絞り込む
- task_estimate_unit_price_max: number(double) - タスク見積単価の上限で絞り込む
- business_classification: object - 事業者区分で絞り込む
- has_invoice_number: boolean - インボイス登録番号の有無で絞り込む
- tax_chargeable: boolean - 消費税請求可否で絞り込む
- withholding_tax_required: boolean - 源泉所得税 (請求) が有効かで絞り込む
- expense_withholding_tax_required: boolean - 源泉所得税 (経費) が有効かで絞り込む
- two_factor_authentication_setting_type: object - 二要素認証の設定種別で絞り込む

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
