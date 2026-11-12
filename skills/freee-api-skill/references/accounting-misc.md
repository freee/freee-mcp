<!-- freee会計 の小さいタグをまとめたファイル。タグごとの行範囲は INDEX.md を参照し、必要な範囲だけ読むこと。 -->

# Account groups

決算書表示名

## POST /api/1/account_groups — 決算書表示名の作成

概要 指定した事業所の決算書表示名（小カテゴリー）を作成する 決算書表示名は、貸借対照表・損益計算書などの決算書上で勘定科目をまとめて表示するための表示名です。勘定科目カテゴリー（中分類）の配下に作成され、勘定科目の作成・更新時に決算書表示名として指定できるようになります。

注意点
nameは同一年度内で一意である必要があります。すでに存在する決算書表示名と同じnameを指定した場合は400エラーになります。 account_category_idには、決算書表示名を配下に作成できる勘定科目カテゴリーのみ指定できます。指定可能な値はSelectablesフォーム用選択項目情報エンドポイント(account_groups.account_category_id)で取得してください。 indexを指定しない場合、決算書表示名は同一勘定科目カテゴリー内の末尾に追加されます。

### リクエストボディ*

- company_id*: integer(int64) - 事業所ID 例: `1`
- name*: string - 決算書表示名 (20文字以内)。同一年度内で一意である必要があります。末尾に半角スペースは指定できません。 例: `新しい決算書表示名`
- account_category_id*: integer(int64) - 勘定科目カテゴリーID。決算書表示名を配下に作成できる勘定科目カテゴリーのみ指定できます。指定可能な値はSelectablesフォーム用選択項目情報エンドポイント(account_groups.account_category_id)で取得可能です。指定できないIDの場合は400エラーになります。 例: `1`
- index: integer(int64) - 表示順 (同一勘定科目カテゴリー内の挿入位置、0始まり)。指定した位置に挿入され、同一勘定科目カテゴリー内の他の決算書表示名の表示順は自動で振り直されます。未指定の場合や既存の決算書表示名の数を超える値を指定した場合は末尾に追加されます。 例: `1`

### レスポンス

- account_group*: object - 作成された決算書表示名（小カテゴリー）

# Approval flow routes

申請経路

## GET /api/1/approval_flow_routes — 申請経路一覧の取得

概要 指定した事業所の申請経路一覧を取得する 各種申請APIの使い方については、 freee会計の各種申請APIの使い方 をご参照ください 経費精算APIの使い方については、 freee会計の経費精算APIの使い方 をご参照ください

注意点
承認ステップの詳細（steps）は本APIのレスポンスには含まれません。承認方法や分岐条件を確認する場合は、申請経路の取得（GET /api/1/approval_flow_routes/{id}）をご利用ください。

### パラメータ

- company_id*: integer(int64) - 事業所ID
- included_user_id: integer(int64) - 経路に含まれるユーザーのユーザーID（指定したユーザーが承認ステップの承認者に含まれる申請経路に絞り込めます）
- usage: string - 申請種別（各申請種別が使用できる申請経路に絞り込めます。例えば、ApprovalRequest を指定すると、各種申請が使用できる申請経路に絞り込めます。未指定の場合は全ての申請種別の申請経路が対象になります。）
  * `TxnApproval` - 仕訳承認
  * `ExpenseApplication` - 経費精算
  * `PaymentRequest` - 支払依頼
  * `ApprovalRequest` - 各種申請
  * `DocApproval` - 請求書等 (見積書・納品書・請求書・発注書) (選択肢: TxnApproval, ExpenseApplication, PaymentRequest, ApprovalRequest, DocApproval)
- request_form_id: integer(int64) - 申請フォームID（指定した申請フォームが使用できる申請経路に絞り込めます。usage に ApprovalRequest を指定した場合のみ有効で、usage が ApprovalRequest 以外または未指定の場合、このパラメータは無視されます。指定した申請フォームが存在しない場合や無効な場合は空配列が返ります。）

### レスポンス

- approval_flow_routes*: array[object] - 申請経路の一覧

## GET /api/1/approval_flow_routes/{id} — 申請経路の取得

概要 指定した事業所の申請経路を取得する 各種申請APIの使い方については、 freee会計の各種申請APIの使い方 をご参照ください 経費精算APIの使い方については、 freee会計の経費精算APIの使い方 をご参照ください

注意点
承認ステップごとの承認方法は steps[].resource_type で判別できます。役職で承認者を指定する承認ステップ（and_position / or_position）では steps[].approver_determination_type、steps[].group、steps[].position_types を、条件分岐の承認ステップ（switchable）では steps[].switching_rules をご参照ください。

### パラメータ

- id* (path): integer(int64) - 申請経路ID
- company_id*: integer(int64) - 事業所ID

### レスポンス

- approval_flow_route*: object

# Banks

連携サービス

## GET /api/1/banks — 連携サービス一覧の取得

概要 freee会計に口座として登録できる連携サービス（銀行口座・クレジットカード・その他の決済口座）の一覧を取得する

注意点
連携サービスはfreeeが管理する事業所に依存しないマスタデータのため、company_idパラメータの指定は不要です。 typeパラメータは指定必須です。未指定または定義されていない値を指定した場合は、ステータスコード400のエラーが返ります。 取得結果は連携サービス名(カナ)の昇順（name_kanaが同一の場合はidの昇順）で返ります。 取得したidは、口座の作成（POST /api/1/walletables）のbank_idパラメータに指定して利用します。

### パラメータ

- offset: integer(int64) - 取得レコードのオフセット (デフォルト: 0)。limitと組み合わせてページングに利用します。
- limit: integer(int64) - 取得レコードの件数 (デフォルト: 20, 最小: 1, 最大: 500)
- type: string - 連携サービス種別
  * `bank_account` - 銀行口座
  * `credit_card` - クレジットカード
  * `wallet` - その他の決済口座

  このパラメータは指定必須です。未指定または上記以外の値を指定した場合は、ステータスコード400のエラーが返ります。 (選択肢: bank_account, credit_card, wallet)

### レスポンス

- banks*: array[object]

## GET /api/1/banks/{id} — 連携サービスの取得

概要 指定したIDの連携サービス（銀行口座・クレジットカード・その他の決済口座）を取得する

注意点
連携サービスはfreeeが管理する事業所に依存しないマスタデータのため、company_idパラメータの指定は不要です。 存在しないID、または連携が終了したサービスのIDを指定した場合は、ステータスコード404のエラーが返ります。

### パラメータ

- id* (path): integer(int64) - 連携サービスID。連携サービス一覧の取得（GET /api/1/banks）で取得したidを指定します。

### レスポンス

- bank*: object

# Companies

事業所

## GET /api/1/companies — 事業所一覧の取得

概要 アクセストークンのユーザーが所属するすべての事業所の一覧を取得する

注意点
本APIで取得できるのは事業所の基本情報（ID・名称・事業所番号・ユーザー権限）のみです。会計年度や設定情報を含む詳細は事業所の取得（GET /api/1/companies/{id}）を利用してください。 他のAPIのパラメータとして利用する事業所ID（company_id）は、本APIのレスポンスの id を指定します。

### レスポンス

- companies*: array[object] - アクセストークンのユーザーが所属する事業所の一覧

## GET /api/1/companies/{id} — 事業所の取得

概要 指定した事業所の詳細情報（名称・連絡先・各種設定・会計年度の一覧）を取得する

注意点
クエリパラメータを指定しない場合は事業所の基本情報と会計年度の一覧のみを返します。勘定科目・税区分コード・品目・取引先・部門・メモタグ・口座の一覧が必要な場合は、details または対応する個別のクエリパラメータを指定してください。 details および個別指定のクエリパラメータに指定できる値は true のみです。一覧を含めない場合は、false を指定するのではなくパラメータ自体を省略してください。 アクセストークンのユーザーが所属していない事業所IDを指定した場合は 400 (存在しない事業所のid) を返します。所属する事業所のIDは事業所一覧の取得（GET /api/1/companies）で確認できます。

### パラメータ

- id* (path): integer(int64) - 事業所ID。事業所一覧の取得（GET /api/1/companies）のレスポンスの id を指定する
- details: boolean - true を指定すると、レスポンスに勘定科目 (account_items)・税区分コード (tax_codes)・品目 (items)・取引先 (partners)・部門 (sections)・メモタグ (tags)・口座 (walletables) の一覧をまとめて含める。一覧を含めない場合はパラメータ自体を省略する (選択肢: true)
- account_items: boolean - true を指定すると、レスポンスに勘定科目一覧 (account_items) を含める (選択肢: true)
- taxes: boolean - true を指定すると、レスポンスに税区分コード一覧 (tax_codes) を含める (選択肢: true)
- items: boolean - true を指定すると、レスポンスに品目一覧 (items) を含める (選択肢: true)
- partners: boolean - true を指定すると、レスポンスに取引先一覧 (partners) を含める (選択肢: true)
- sections: boolean - true を指定すると、レスポンスに部門一覧 (sections) を含める (選択肢: true)
- tags: boolean - true を指定すると、レスポンスにメモタグ一覧 (tags) を含める (選択肢: true)
- walletables: boolean - true を指定すると、レスポンスに口座一覧 (walletables) を含める (選択肢: true)

### レスポンス

- company*: object

# Expense application amount calculations

経費申請の金額の自動計算

## POST /api/1/expense_applications/amount_calculations — 経費申請の金額の自動計算

概要 指定した経費科目の金額計算設定にカスタム申請項目の入力値を適用し、経費申請の明細行の金額を計算します。計算するだけで、経費申請も計算結果も保存されません。

### リクエストボディ*

- company_id*: integer(int64) - 事業所ID 例: `1` (最小: 1)
- expense_application_line_template_id*: integer(int64) - 金額計算設定を持つ経費科目のID 例: `101` (最小: 1)
- custom_values*: array[object] - カスタム申請項目の入力値。計算式が参照する項目を含めてください （要素は type により形が異なる: single_line_string / multi_line_string / date / date_range / datetime / number / pulldown / radio_button / checkbox）
  配列の要素:
    - key*: string - カスタム申請項目を識別する永続キー。英小文字で始まる 1〜64 文字の半角英小文字・数字・アンダースコアで、
      経費科目内で一意です。経費科目 API (GET /api/1/expense_application_line_templates/{id}) が
      custom_form_parts[].key として返す値をそのまま指定します。キーが未設定の項目には、システムが
      custom_field_ の後ろにカスタム申請項目 ID を付けたキー (例: custom_field_12) を補って返すため、
      その値を指定します。指定した経費科目に存在しないキーを指定した場合は 400 になります。 例: `travel_days` (パターン: ^[a-z][a-z0-9_]*$)
    - type*: string - 入力値の種別 (選択肢: single_line_string, multi_line_string, date, date_range, datetime, number, pulldown, radio_button, checkbox) 例: `single_line_string`
    - value*: string - 入力値 (255文字以内) 例: `東京出張`
- applicant*: object - 計算対象の申請者。申請者はアクセストークンのユーザーに固定され、指定できるのは所属部門だけです。所属部門と役職が金額計算ルールの条件判定に使われます
  - group_id*: integer(int64) - 申請者 (アクセストークンのユーザー) の所属部門ID (部門に所属しない場合は null)。申請者が所属していない部門を指定した場合は 400 になります 例: `2` (最小: 1)

### レスポンス

- calculated_amount*: integer(int64) - 計算式によって算出された金額
- applied_rule*: object - 適用された金額計算ルール。経費科目APIの amount_calculation_setting と同じ語彙です
- evaluated_as*: object - 金額計算の条件判定に用いた申請者の所属情報

# Expense application currencies

経費精算の外貨

## GET /api/1/expense_applications/currencies — 経費精算の外貨一覧の取得

概要 指定した事業所の経費精算で利用する外貨の一覧を取得します。

### パラメータ

- company_id*: integer(int64) - 事業所ID
- search_status: string - 利用状態での絞り込み (usable: 利用可能, unusable: 利用不可) (選択肢: usable, unusable)

### レスポンス

- data*: array[object] - 外貨一覧

## POST /api/1/expense_applications/currencies — 経費精算の外貨の作成

概要 指定した事業所の経費精算で利用する外貨を作成します。

### リクエストボディ*

- company_id*: integer(int64) - 事業所ID 例: `1` (最小: 1)
- name*: string - 外貨名 (30文字以内、前後の空白を除去した上で事業所内で重複不可) 例: `ベトナム・ドン`
- code*: string - 通貨コード (半角英大文字3文字) 例: `VND` (パターン: ^[A-Z]{3}$)
- search_status*: string - 利用状態 (usable: 利用可能, unusable: 利用不可) (選択肢: usable, unusable) 例: `usable`
- description: string - 備考 例: `ハノイ支社経費用`

### レスポンス

- id*: integer(int64) - 外貨ID
- name*: string - 外貨名 (30文字以内)
- code*: string - 通貨コード (半角英大文字3文字)
- description*: string - 備考
- search_status*: string - 利用状態 (usable: 利用可能, unusable: 利用不可)
- updated_at*: string - 更新日時 (ISO8601形式)

## GET /api/1/expense_applications/currencies/{id} — 経費精算の外貨の取得

概要 指定した事業所の経費精算で利用する外貨を取得します。

### パラメータ

- id* (path): integer(int64) - 外貨ID
- company_id*: integer(int64) - 事業所ID

### レスポンス

POST /api/1/expense_applications/currencies と同じ

## PUT /api/1/expense_applications/currencies/{id} — 経費精算の外貨の更新

概要 指定した事業所の経費精算で利用する外貨を更新します。

### パラメータ

- id* (path): integer(int64) - 外貨ID

### リクエストボディ*

POST /api/1/expense_applications/currencies と同じ

### レスポンス

POST /api/1/expense_applications/currencies と同じ

## DELETE /api/1/expense_applications/currencies/{id} — 経費精算の外貨の削除

概要 指定した事業所の経費精算で利用する外貨を削除します。

### パラメータ

GET /api/1/expense_applications/currencies/{id} と同じ

# Expense application forms

## GET /api/1/expense_applications/form — 経費申請フォームの取得

概要 指定した事業所の経費申請フォームの設定を取得します。設定が未作成の場合は初期値を返します。

### パラメータ

- company_id*: integer(int64) - 事業所ID

### レスポンス

- section_setting*: string - 部門の入力設定 (optional: 任意入力, required: 必須入力)
- tag_setting*: string - メモタグの入力設定 (optional: 任意入力, required: 必須入力, disable: 非表示)
- line_template_setting*: string - 経費科目の入力設定 (optional: 任意入力, required: 必須入力, disable: 非表示)。経費科目は `/api/1/expense_application_line_templates` で取得できます。
- segment_1_tag_setting*: string - セグメント1タグの入力設定 (optional: 任意入力, required: 必須入力, disable: 非表示)
- segment_2_tag_setting*: string - セグメント2タグの入力設定 (optional: 任意入力, required: 必須入力, disable: 非表示)
- segment_3_tag_setting*: string - セグメント3タグの入力設定 (optional: 任意入力, required: 必須入力, disable: 非表示)
- description_setting*: string - 備考の入力設定 (optional: 任意入力, required: 必須入力)
- commuter_pass_deduction*: string - 定期券区間控除の利用設定 (disable: 利用しない, enable: 利用する)
- default_flow_route_src_id*: integer(int64) - デフォルトで選択する申請経路のID (未設定の場合は null)。申請経路一覧の取得API (`/api/1/approval_flow_routes`) のレスポンス id と同じ値です。
- observer_addition*: string - 承認者以外の閲覧者追加の利用設定 (disable: 利用しない, enable: 利用する)
- receipt_partner_name_setting*: string - 支払先の入力設定 (optional: 任意入力, required: 必須入力, disable: 非表示)
- default_title*: string - 申請タイトルの初期値 (255文字以内)
- use_currency*: boolean - 外貨の利用設定
- auto_calculation_amount_fraction*: string - 金額の自動計算結果の端数処理 (omit: 切り捨て, round_up: 切り上げ, round: 四捨五入)
- allow_modify_parent_application_by_applicant*: boolean - 申請者による親申請の変更を許可するか
- allow_modify_parent_application_by_approver*: boolean - 承認者による親申請の変更を許可するか
- allow_modify_parent_application_by_admin*: boolean - 管理者による親申請の変更を許可するか
- require_parent_purchase_request*: boolean - 親となる購買申請を必須にするか
- allow_modify_on_approval*: boolean - 承認中の申請の変更を許可するか

## PUT /api/1/expense_applications/form — 経費申請フォームの更新

概要 指定した事業所の経費申請フォームの設定を更新します。設定が未作成の場合は作成します。

### リクエストボディ*

- company_id*: integer(int64) - 事業所ID 例: `1` (最小: 1)
- section_setting*: string - 部門の入力設定 (optional: 任意入力, required: 必須入力) (選択肢: optional, required) 例: `optional`
- tag_setting*: string - メモタグの入力設定 (optional: 任意入力, required: 必須入力, disable: 非表示) (選択肢: optional, required, disable) 例: `optional`
- line_template_setting*: string - 経費科目の入力設定 (optional: 任意入力, required: 必須入力, disable: 非表示)。経費科目は `/api/1/expense_application_line_templates` で取得できます。 (選択肢: optional, required, disable) 例: `optional`
- segment_1_tag_setting*: string - セグメント1タグの入力設定 (optional: 任意入力, required: 必須入力, disable: 非表示) (選択肢: optional, required, disable) 例: `optional`
- segment_2_tag_setting*: string - セグメント2タグの入力設定 (optional: 任意入力, required: 必須入力, disable: 非表示) (選択肢: optional, required, disable) 例: `optional`
- segment_3_tag_setting*: string - セグメント3タグの入力設定 (optional: 任意入力, required: 必須入力, disable: 非表示) (選択肢: optional, required, disable) 例: `optional`
- description_setting*: string - 備考の入力設定 (optional: 任意入力, required: 必須入力) (選択肢: optional, required) 例: `optional`
- commuter_pass_deduction*: string - 定期券区間控除の利用設定 (disable: 利用しない, enable: 利用する) (選択肢: disable, enable) 例: `disable`
- default_flow_route_src_id*: integer(int64) - デフォルトで選択する申請経路のID (未設定の場合は null)。申請経路一覧の取得API (`/api/1/approval_flow_routes`) のレスポンス id と同じ値です。 例: `101` (最小: 1)
- observer_addition*: string - 承認者以外の閲覧者追加の利用設定 (disable: 利用しない, enable: 利用する) (選択肢: disable, enable) 例: `disable`
- receipt_partner_name_setting*: string - 支払先の入力設定 (optional: 任意入力, required: 必須入力, disable: 非表示) (選択肢: optional, required, disable) 例: `disable`
- default_title*: string - 申請タイトルの初期値 (255文字以内) 例: `交通費精算`
- use_currency*: boolean - 外貨の利用設定 例: `true`
- auto_calculation_amount_fraction*: string - 金額の自動計算結果の端数処理 (omit: 切り捨て, round_up: 切り上げ, round: 四捨五入) (選択肢: omit, round_up, round) 例: `round_up`
- allow_modify_parent_application_by_applicant*: boolean - 申請者による親申請の変更を許可するか 例: `true`
- allow_modify_parent_application_by_approver*: boolean - 承認者による親申請の変更を許可するか 例: `false`
- allow_modify_parent_application_by_admin*: boolean - 管理者による親申請の変更を許可するか 例: `false`
- require_parent_purchase_request*: boolean - 親となる購買申請を必須にするか 例: `false`
- allow_modify_on_approval*: boolean - 承認中の申請の変更を許可するか 例: `false`

### レスポンス

GET /api/1/expense_applications/form と同じ

# Fixed assets

固定資産台帳

## GET /api/1/fixed_assets — 固定資産一覧の取得

概要 指定した事業所の固定資産一覧を取得する target_dateで指定した会計期間に償却データが存在する固定資産を、固定資産IDの昇順で返します。

定義
このAPIは法人エンタープライズに加入している事業所のみが利用できます。 target_date : 表示したい会計期間の開始年月日。開始年月日以外を指定した場合は、その日付が含まれる会計期間が対象となります。 depreciation_amount : 本年分の償却費合計 depreciation_method : 償却方法 depreciation_account_item_id : 減価償却に使う勘定科目 acquisition_cost : 取得価額 opening_balance : 期首残高 undepreciated_balance : 未償却残高。土地などの償却しない固定資産はnullが返ります。 opening_accumulated_depreciation : 期首減価償却累計額 closing_accumulated_depreciation : 期末減価償却累計額

注意点
up_to_dateがfalse...

### パラメータ

- company_id*: integer(int64) - 事業所ID
- target_date*: string - 表示したい会計期間の開始年月日 (yyyy-mm-dd)。開始年月日以外を指定した場合は、その日付が含まれる会計期間が対象となります。
- offset: integer(int64) - 取得レコードのオフセット (デフォルト: 0)。2ページ目以降を取得する場合に、先頭からスキップする件数を指定します
- limit: integer(int64) - 取得レコードの件数 (デフォルト: 50, 最小: 1, 最大: 200)

### レスポンス

- fixed_assets*: array[object] - 固定資産の一覧（固定資産IDの昇順）。指定した会計期間に償却データが存在する固定資産のみが含まれます
- fiscal_year*: object - target_dateで指定した日付が含まれる会計期間。fixed_assetsの償却費や残高はこの会計期間で集計されています
- up_to_date*: boolean - 集計結果が最新かどうか。falseの場合は残高の集計が完了していないため、時間を空けて再度取得してください
- up_to_date_reasons*: array[object] - 集計が最新でない場合（up_to_dateがfalseの場合）の要因情報。最新の場合は空配列になります

# General ledgers

総勘定元帳

## GET /api/1/reports/general_ledgers — 総勘定元帳一覧の取得（β版）

概要 指定した事業所の総勘定元帳一覧を取得する ※このAPIはβ版として提供しています。 このAPIは法人アドバンスプラン（および旧法人プロフェッショナルプラン）・法人エンタープライズプランに加入している事業所のみが利用できます。 利用状況によって事前の告知なく提供プラン・コール数の上限を変更する可能性があります。 他エンドポイントと比べてレスポンスタイムが遅い場合があります。

### パラメータ

- company_id*: integer(int64) - 事業所ID
- start_date*: string(date) - 期間で絞込：開始日 (yyyy-mm-dd)
- end_date*: string(date) - 期間で絞込：終了日 (yyyy-mm-dd)
- account_item_name: string - 勘定科目名で絞込
- tax_name: string - 税区分名で絞込 (選択肢: 課税, 対象外, 非課税, 不課税, 輸出等, 未選択, 課税売上, 輸出売上, 非課売上, 非資売上, 有価譲渡, 対外売上, 課税売返, 輸出売返, 非課売返, 非資売返, 課税売倒, 輸出売倒, 非課売倒, 非資売倒, 課税売回, 課対輸本, 非対輸本, 共対輸本, 課対輸税, 非対輸税, 共対輸税, 地消貨割, 課対仕入, 非対仕入, 共対仕入, 非課仕入, 対外仕入, 課対仕返, 非対仕返, 共対仕返, 非課仕返, 課売上一, 課売上二, 課売上三, 課売上四, 課売上五, 課売上六, 課対輸返, 非対輸返, 共対輸返, 課売返一, 課売返二, 課売返三, 課売返四, 課売返五, 課売返六)
- tax_rate: string - 税率で絞込 (選択肢: tax_rate_5, tax_rate_8, tax_rate_10, tax_rate_r8, tax_rate_5_exempt_80, tax_rate_5_exempt_70, tax_rate_5_exempt_50, tax_rate_5_exempt_30, tax_rate_8_exempt_80, tax_rate_8_exempt_70, tax_rate_8_exempt_50, tax_rate_8_exempt_30, tax_rate_10_exempt_80, tax_rate_10_exempt_70, tax_rate_10_exempt_50, tax_rate_10_exempt_30, tax_rate_r8_exempt_80, tax_rate_r8_exempt_70, tax_rate_r8_exempt_50, tax_rate_r8_exempt_30)
- adjustment: string - 決算整理仕訳で絞込（決算整理仕訳のみ：only, 決算整理仕訳以外：without）。指定されない場合、決算整理仕訳を含む金額が返却されます。 (選択肢: only, without)
- cost_allocation: string - 配賦仕訳で絞込（配賦仕訳のみ：only,配賦仕訳以外：without）。指定されない場合、配賦仕訳を含む金額が返却されます。 (選択肢: only, without)
- partner_name: string - 取引先で絞込（未選択を指定すると、取引先が未選択で絞り込めます）
- item_name: string - 品目で絞込（未選択を指定すると、品目が未選択で絞り込めます）
- section_name: string - 部門で絞込（未選択を指定すると、部門が未選択で絞り込めます）
- tag_name: string - メモタグで絞込

  取引数が多すぎる場合はタイムアウトする場合があります。

  その場合はWeb画面よりPDF/CSV出力をご利用ください。
- segment_tag_1_name: string - セグメント１タグ名で絞込（未選択を指定すると、セグメント１タグが未選択で絞り込めます）
- segment_tag_2_name: string - セグメント２タグ名で絞込（未選択を指定すると、セグメント２タグが未選択で絞り込めます）
- segment_tag_3_name: string - セグメント３タグ名で絞込（未選択を指定すると、セグメント３タグが未選択で絞り込めます）
- approval_flow_status: string - 承認ステータスで絞込 (未承認を除く: without_in_progress (デフォルト)、全てのステータス: all)

  事業所の設定から仕訳承認フローの利用を有効にした場合に指定可能です。 (選択肢: all, without_in_progress)

### レスポンス

- general_ledgers*: array[object]

# Invoices

請求書

## GET /api/1/invoices — 請求書一覧の取得

概要 指定した事業所の請求書一覧を取得する

注意点
partner_id と partner_code は同時に指定できません。どちらか一方のみ指定してください。 partner_code は、事業所で取引先コードの利用設定が有効な場合のみ指定できます。無効な事業所で指定した場合はエラーになります。 APIを利用するユーザーに閲覧権限のない部門が紐づく請求書は、取得結果に含まれません。

### パラメータ

- company_id*: integer(int64) - 事業所ID
- partner_id: integer(int64) - 取引先IDで絞込（partner_code と同時に指定することはできません）
- partner_code: string - 取引先コードで絞込（事業所で取引先コードの利用設定が有効な場合のみ利用できます。partner_id と同時に指定することはできません）
- start_issue_date: string - 請求日の開始日(yyyy-mm-dd)
- end_issue_date: string - 請求日の終了日(yyyy-mm-dd)
- start_due_date: string - 期日の開始日(yyyy-mm-dd)
- end_due_date: string - 期日の終了日(yyyy-mm-dd)
- invoice_number: string - 請求書番号
- description: string - 概要
- invoice_status: string - 請求書ステータス (draft: 下書き, applying: 申請中, remanded: 差し戻し, rejected: 却下, approved: 承認済み, unsubmitted: 送付待ち, submitted: 送付済み) (選択肢: draft, applying, remanded, rejected, approved, unsubmitted, submitted)
- payment_status: string - 入金ステータス (unsettled: 入金待ち, settled: 入金済み) (選択肢: unsettled, settled)
- offset: integer(int64) - 取得レコードのオフセット (デフォルト: 0)
- limit: integer(int64) - 取得レコードの件数 (デフォルト: 20, 最大: 100)

### レスポンス

- invoices*: array[object]

## GET /api/1/invoices/{id} — 請求書の取得

概要 指定した事業所の請求書を取得する

注意点
APIを利用するユーザーに閲覧権限のない部門が紐づく請求書を指定した場合は、存在しない請求書としてエラーになります。

### パラメータ

- company_id*: integer(int64) - 事業所ID
- id* (path): integer(int64) - 請求書ID

### レスポンス

- invoice*: object

# Payments

取引（収入・支出）の支払行

## POST /api/1/deals/{id}/payments — 取引（収入・支出）の支払行の作成

概要 指定した事業所の取引（収入・支出）の支払行を作成する

定義
issue_date : 発生日 due_date : 支払期日 amount : 金額 due_amount : 支払残額 type income : 収入 expense : 支出 details : 取引の明細行 renews : 取引の+更新行 payments : 取引の支払行 from_walletable_type bank_account : 銀行口座 credit_card : クレジットカード wallet : 現金 private_account_item : プライベート資金（法人の場合は役員借入金もしくは役員借入金、個人の場合は事業主貸もしくは事業主借）

### パラメータ

- id* (path): integer(int64) - 取引ID

### リクエストボディ*

- company_id*: integer(int64) - 事業所ID 例: `1` (最小: 1)
- date*: string - 支払日 (yyyy-mm-dd) 例: `2019-12-17`
- from_walletable_type*: string - 口座区分 (銀行口座: bank_account, クレジットカード: credit_card, 現金: wallet, プライベート資金: private_account_item) (選択肢: bank_account, credit_card, wallet, private_account_item) 例: `bank_account`
- from_walletable_id*: integer(int64) - 口座ID（from_walletable_typeがprivate_account_itemの場合は勘定科目ID） 例: `1` (最小: 1)
- amount*: integer(int64) - 支払金額（円） 例: `10000` (最小: 1, 最大: 9223372036854776000)

### レスポンス

- deal*: object

## PUT /api/1/deals/{id}/payments/{payment_id} — 取引（収入・支出）の支払行の更新

概要 指定した事業所の取引（収入・支出）の支払行を更新する

定義
issue_date : 発生日 due_date : 支払期日 amount : 金額 due_amount : 支払残額 type income : 収入 expense : 支出 details : 取引の明細行 renews : 取引の+更新行 payments : 取引の支払行 from_walletable_type bank_account : 銀行口座 credit_card : クレジットカード wallet : 現金 private_account_item : プライベート資金（法人の場合は役員借入金もしくは役員借入金、個人の場合は事業主貸もしくは事業主借）

### パラメータ

- id* (path): integer(int64) - 取引ID
- payment_id* (path): integer(int64) - 支払行ID（取引のレスポンスのpayments配列のid）

### リクエストボディ*

POST /api/1/deals/{id}/payments と同じ

### レスポンス

POST /api/1/deals/{id}/payments と同じ

## DELETE /api/1/deals/{id}/payments/{payment_id} — 取引（収入・支出）の支払行の削除

概要 指定した事業所の取引（収入・支出）の支払行を削除する

定義
issue_date : 発生日 due_date : 支払期日 amount : 金額 due_amount : 支払残額 type income : 収入 expense : 支出 details : 取引の明細行

### パラメータ

- id* (path): integer(int64) - 取引ID
- payment_id* (path): integer(int64) - 支払行ID（取引のレスポンスのpayments配列のid）
- company_id*: integer(int64) - 事業所ID

# Quotations

見積書

## GET /api/1/quotations — 見積書一覧の取得

概要 指定した事業所の見積書一覧を取得する

注意点
partner_id と partner_code は同時に指定できません。どちらか一方のみ指定してください。 partner_code は、事業所で取引先コードの利用設定が有効な場合のみ指定できます。無効な事業所で指定した場合はエラーになります。 APIを利用するユーザーに閲覧権限のない部門が紐づく見積書は、取得結果に含まれません。

### パラメータ

- company_id*: integer(int64) - 事業所ID
- partner_id: integer(int64) - 取引先IDで絞込（partner_code と同時に指定することはできません）
- partner_code: string - 取引先コードで絞込（事業所で取引先コードの利用設定が有効な場合のみ利用できます。partner_id と同時に指定することはできません）
- start_issue_date: string - 見積日の開始日(yyyy-mm-dd)
- end_issue_date: string - 見積日の終了日(yyyy-mm-dd)
- quotation_number: string - 見積書番号
- description: string - 概要
- quotation_status: string - 見積書ステータス (unsubmitted: 送付待ち, submitted: 送付済み, all: 全て) (選択肢: all, unsubmitted, submitted)
- offset: integer(int64) - 取得レコードのオフセット (デフォルト: 0)
- limit: integer(int64) - 取得レコードの件数 (デフォルト: 20, 最大: 100)

### レスポンス

- quotations*: array[object]

## GET /api/1/quotations/{id} — 見積書の取得

概要 指定した事業所の見積書詳細を取得する

注意点
APIを利用するユーザーに閲覧権限のない部門が紐づく見積書を指定した場合は、存在しない見積書としてエラーになります。

### パラメータ

- company_id*: integer(int64) - 事業所ID
- id* (path): integer(int64) - 見積書ID

### レスポンス

- quotation*: object

# Receipts

ファイルボックス（証憑ファイル）

## GET /api/1/receipts — ファイルボックス（証憑ファイル）一覧の取得

概要 指定した事業所のファイルボックス（証憑ファイル）一覧を取得する アップロード日（start_date〜end_date）の期間を指定して取得します。ファイルの実体（バイナリ）は本APIでは取得できないため、ファイルボックス（証憑ファイル）のダウンロードAPI（GET /api/1/receipts/{id}/download）を利用してください。

注意点
一度に取得できる件数は最大3000件です（デフォルト: 50件）。それを超えるファイルを取得する場合は、offsetとlimitを利用してページングしてください。

### パラメータ

- company_id*: integer(int64) - 事業所ID
- start_date*: string - アップロード日で絞込：開始日 (yyyy-mm-dd)
- end_date*: string - アップロード日で絞込：終了日 (yyyy-mm-dd)
- user_name: string - アップロードしたユーザーで絞込。ユーザーの表示名またはメールアドレスの部分一致で指定します。
- number: integer(int64) - アップロードファイルNo（ファイルボックス上でファイルごとに表示される番号）で絞込
- comment_type: string - ファイルに付けられたコメントの状態で絞込（posted:コメントあり, raised:未解決, resolved:解決済） (選択肢: posted, raised, resolved)
- comment_important: boolean - trueを指定した場合、お気に入りコメントが付いたファイルのみが対象になります
- category: string - ファイルの取引への登録状態で絞込（all:すべて, without_deal:未登録, with_expense_application_line:経費申請中, with_deal:登録済み, ignored:無視。デフォルト: all） (選択肢: all, without_deal, with_expense_application_line, with_deal, ignored)
- offset: integer(int64) - 取得レコードのオフセット (デフォルト: 0)
- limit: integer(int64) - 取得レコードの件数 (デフォルト: 50, 最小: 1, 最大: 3000)

### レスポンス

- receipts*: array[object]

## POST /api/1/receipts — ファイルボックス（証憑ファイル）のアップロード

概要 ファイルボックス（証憑ファイル）をアップロードする

注意点
リクエストヘッダーの Content-Type は、multipart/form-dataにのみ対応しています。 インボイス制度適格請求書発行事業者登録番号はOCR解析結果が採用されます。OCR解析結果を確認する場合は、Web画面にてご確認ください。上書きする場合は、ファイルボックス（証憑ファイル）の更新APIをご利用ください。 以下の制限を満たさない場合アップロードに失敗します。 ファイルサイズの制限： 64MBまで 月間アップロード容量の制限： 月間合計10GBまで 1分間あたりのアップロード数制限： 300ファイルまで プランによる月間アップロード数の制限： 以下のリンクからご確認ください 【個人】freee会計のプランについて 【法人】freee会計のプランについて（2024年7月以降）

### レスポンス

- receipt*: object

## GET /api/1/receipts/{id} — ファイルボックス（証憑ファイル）の取得

概要 指定した事業所のファイルボックス（証憑ファイル）を取得する ファイルの実体（バイナリ）は本APIでは取得できないため、ファイルボックス（証憑ファイル）のダウンロードAPI（GET /api/1/receipts/{id}/download）を利用してください。

### パラメータ

- id* (path): integer(int64) - ファイルボックス（証憑ファイル）ID
- company_id*: integer(int64) - 事業所ID

### レスポンス

POST /api/1/receipts と同じ

## PUT /api/1/receipts/{id} — ファイルボックス（証憑ファイル）の更新

概要 ファイルボックス（証憑ファイル）を更新する

注意点
本APIでは、証憑ファイルの再アップロードはできません。 リクエストボディに含めたフィールドのみが更新されます。含めなかったフィールドの値は変更されません。

### パラメータ

- id* (path): integer(int64) - ファイルボックス（証憑ファイル）ID

### リクエストボディ*

- company_id*: integer(int64) - 事業所ID 例: `1` (最小: 1)
- description: string - メモ (255文字以内) 例: `タクシー利用`
- receipt_metadatum: object - 電子帳簿保存法の検索要件に対応するメタデータ（発行元・発行日・金額）
  - partner_name: string - 発行元 例: `freeeパートナー`
  - issue_date: string - 発行日 (yyyy-mm-dd) 例: `2019-12-17`
  - amount: integer(int64) - 金額（円） 例: `5250` (最小: -999999999999, 最大: 999999999999)
- qualified_invoice: string - 適格請求書等（qualified: 該当する、not_qualified: 該当しない、unselected: 未選択） (選択肢: qualified, not_qualified, unselected) 例: `qualified`
- invoice_registration_number: string - インボイス制度適格請求書発行事業者登録番号
  - 先頭T数字13桁の14桁の文字列。先頭のTは省略可能です（省略した場合もT付きの登録番号として登録され、レスポンスではT付きの14桁で返ります）
  国税庁インボイス制度適格請求書発行事業者公表サイト 例: `T1000000000001` (パターン: ^T?[1-9][0-9]{12}$)
- document_type: string - 書類の種類（receipt: 領収書、invoice: 請求書、other: その他） (選択肢: receipt, invoice, other) 例: `receipt`

### レスポンス

POST /api/1/receipts と同じ

## DELETE /api/1/receipts/{id} — ファイルボックス（証憑ファイル）の削除

概要 ファイルボックス（証憑ファイル）を削除する

### パラメータ

GET /api/1/receipts/{id} と同じ

## GET /api/1/receipts/{id}/download — ファイルボックス（証憑ファイル）のダウンロード

概要 指定した事業所のファイルボックス（証憑ファイル）をダウンロードする レスポンスのContent-Typeは、アップロードされたファイルの形式（ファイルボックス（証憑ファイル）の取得APIで返るmime_type）に応じて返ります。

### パラメータ

GET /api/1/receipts/{id} と同じ

# Renews

取引（収入・支出）の+更新

## POST /api/1/deals/{id}/renews — 取引（収入・支出）の+更新の作成

概要 指定した事業所の取引（収入・支出）の+更新を作成する

定義
issue_date : 発生日 due_date : 支払期日 amount : 金額 due_amount : 支払残額 type income : 収入 expense : 支出 details : 取引の明細行 accruals : 取引の債権債務行 renews : 取引の+更新行 payments : 取引の支払行 from_walletable_type bank_account : 銀行口座 credit_card : クレジットカード wallet : 現金 private_account_item : プライベート資金（法人の場合は役員借入金もしくは役員借入金、個人の場合は事業主貸もしくは事業主借）

注意点
本APIではdetails(取引の明細行)、accruals(債権債務行)、renewsのdetails(+更新の明細行)のみ操作可能です。 本APIで取引を更新すると、消費税の計算方法は必ず内税方式が選択されます。

### パラメータ

- id* (path): integer(int64) - 取引ID

### リクエストボディ*

- company_id*: integer(int64) - 事業所ID 例: `1` (最小: 1)
- update_date*: string - 更新日 (yyyy-mm-dd) 例: `2019-12-17`
- renew_target_id*: integer(int64) - +更新対象行ID (details(取引の明細行), accruals(債権債務行), renewsのdetails(+更新の明細行)のIDを指定) 例: `1` (最小: 1)
- details*: array[object] - +更新の明細行
  配列の要素:
    - account_item_id*: integer(int64) - 勘定科目ID 例: `1` (最小: 1)
    - tax_code*: integer(int64) - 税区分コード 例: `1` (最小: 0, 最大: 2147483647)
    - amount*: integer(int64) - 取引金額（円・税込で指定してください）

      マイナスの値を指定した場合、控除・マイナス行として登録されます。

      上記以外の値を指定した場合、通常行として登録されます。 例: `1080` (最小: -9223372036854776000, 最大: 9223372036854776000)
    - vat: integer(int64) - 消費税額（円。指定しない場合は自動で計算されます） 例: `80` (最小: -9223372036854776000, 最大: 9223372036854776000)
    - item_id: integer(int64) - 品目ID 例: `1` (最小: 1)
    - section_id: integer(int64) - 部門ID 例: `1` (最小: 1)
    - partner_id: integer(int64) - 取引先ID 例: `1` (最小: 0)
    - tag_ids: array[integer] - メモタグID 例: `[1,2,3]`
    - segment_1_tag_id: integer(int64) - セグメント１タグID 例: `1` (最小: 1)
    - segment_2_tag_id: integer(int64) - セグメント２タグID 例: `1` (最小: 1)
    - segment_3_tag_id: integer(int64) - セグメント３タグID 例: `1` (最小: 1)
    - description: string - 備考 例: `備考`

### レスポンス

- deal*: object

## PUT /api/1/deals/{id}/renews/{renew_id} — 取引（収入・支出）の+更新の更新

概要 指定した事業所の取引（収入・支出）の+更新を更新する

定義
issue_date : 発生日 due_date : 支払期日 amount : 金額 due_amount : 支払残額 type income : 収入 expense : 支出 details : 取引の明細行 accruals : 取引の債権債務行 renews : 取引の+更新行 payments : 取引の支払行 from_walletable_type bank_account : 銀行口座 credit_card : クレジットカード wallet : 現金 private_account_item : プライベート資金（法人の場合は役員借入金もしくは役員借入金、個人の場合は事業主貸もしくは事業主借）

注意点
本APIでは+更新の更新のみ可能です。取引や支払行に対する更新はできません。 renew_idにはrenewsのid(+更新ID)を指定してください。renewsのdetailsのid(+更新の明細行ID)を指定できません。 月締めされている仕訳に紐づく＋更新行の編集・削除はできません。 承認済み...

### パラメータ

- id* (path): integer(int64) - 取引ID
- renew_id* (path): integer(int64) - +更新ID

### リクエストボディ*

- company_id*: integer(int64) - 事業所ID 例: `1` (最小: 1)
- update_date*: string - 更新日 (yyyy-mm-dd) 例: `2019-12-17`
- details*: array[object] - +更新の明細行
  配列の要素:
    - account_item_id*: integer(int64) - 勘定科目ID 例: `1` (最小: 1)
    - tax_code*: integer(int64) - 税区分コード 例: `1` (最小: 0, 最大: 2147483647)
    - amount*: integer(int64) - 取引金額（円・税込で指定してください）

      マイナスの値を指定した場合、控除・マイナス行として登録されます。

      上記以外の値を指定した場合、通常行として登録されます。 例: `1080` (最小: -9223372036854776000, 最大: 9223372036854776000)
    - vat: integer(int64) - 消費税額（円。指定しない場合は自動で計算されます） 例: `80` (最小: -9223372036854776000, 最大: 9223372036854776000)
    - item_id: integer(int64) - 品目ID 例: `1` (最小: 1)
    - section_id: integer(int64) - 部門ID 例: `1` (最小: 1)
    - partner_id: integer(int64) - 取引先ID 例: `1` (最小: 0)
    - tag_ids: array[integer] - メモタグID 例: `[1,2,3]`
    - segment_1_tag_id: integer(int64) - セグメント１タグID 例: `1` (最小: 1)
    - segment_2_tag_id: integer(int64) - セグメント２タグID 例: `1` (最小: 1)
    - segment_3_tag_id: integer(int64) - セグメント３タグID 例: `1` (最小: 1)
    - description: string - 備考 例: `備考`

### レスポンス

POST /api/1/deals/{id}/renews と同じ

## DELETE /api/1/deals/{id}/renews/{renew_id} — 取引（収入・支出）の+更新の削除

概要 指定した事業所の取引（収入・支出）の+更新を削除する

注意点
本APIでは+更新の削除のみ可能です。取引や支払行に対する削除はできません。 renew_idにはrenewsのid(+更新ID)を指定してください。renewsのdetailsのid(+更新の明細行ID)を指定できません。 月締めされている仕訳に紐づく＋更新行の編集・削除はできません。 承認済み仕訳に紐づく＋更新行の編集・削除は管理者権限のユーザーのみ可能です。 本APIで取引を更新すると、消費税の計算方法は必ず内税方式が選択されます。

### パラメータ

- id* (path): integer(int64) - 取引ID
- renew_id* (path): integer(int64) - +更新ID
- company_id*: integer(int64) - 事業所ID

### レスポンス

POST /api/1/deals/{id}/renews と同じ

# Selectables

フォーム用選択項目情報

## GET /api/1/forms/selectables — フォーム用選択項目情報の取得

概要 指定した事業所で勘定科目の入力フォームを構築するための、勘定科目カテゴリー、勘定科目、デフォルト税区分、決算書表示名を取得します。

注意点
includes に account_item を指定した場合に、 account_categories と account_groups を返します。 includes を指定しない場合、レスポンスは空のオブジェクトになります。

### パラメータ

- company_id*: integer(int64) - 事業所ID
- includes: string - 取得する選択項目
  * `account_item` - 勘定科目カテゴリー、勘定科目、デフォルト税区分、決算書表示名 (選択肢: account_item)

### レスポンス

フォーム用選択項目情報の取得に成功
- account_categories: array[object] - 勘定科目を用途別に分類したカテゴリーの一覧
- account_groups: array[object] - 勘定科目を決算書上で集約するための決算書表示名（小カテゴリー）の一覧

# Tags

メモタグ

## GET /api/1/tags — メモタグ一覧の取得

概要 指定した事業所に登録されているメモタグの一覧を取得します。取引や口座振替の明細に付与するメモタグを確認する用途を想定しています。

注意点
start_update_date / end_update_date でメモタグの更新日を範囲指定して絞り込めます。JST の日付を yyyy-mm-dd で指定してください（どちらも指定日を含みます）。 結果はメモタグIDの昇順で返します。

### パラメータ

- company_id*: integer(int64) - 事業所ID。取得対象の事業所を指定します。
- start_update_date: string - 更新日で絞り込む開始日 (yyyy-mm-dd, JST)。指定日を含む、それ以降に更新されたメモタグを対象にします。
- end_update_date: string - 更新日で絞り込む終了日 (yyyy-mm-dd, JST)。指定日を含む、それ以前に更新されたメモタグを対象にします。
- offset: integer(int64) - 取得レコードのオフセット (デフォルト: 0)。ページング用に、スキップする件数を指定します。
- limit: integer(int64) - 取得レコードの件数 (デフォルト: 50, 最小: 1, 最大: 3000)。1 回のリクエストで取得する上限件数を指定します。

### レスポンス

メモタグ一覧の取得に成功しました。
- tags*: array[object] - メモタグの一覧

## POST /api/1/tags — メモタグの作成

概要 指定した事業所に新しいメモタグを作成します。作成したメモタグは取引や口座振替の明細に付与できます。

注意点
メモタグ名（name）は事業所内で重複できません。既に同名のメモタグが存在する場合は 400 エラーになります。 shortcut1 / shortcut2 は、Web画面などでメモタグを検索する際のキーワードとして使用します。

### リクエストボディ*

- company_id*: integer(int64) - 事業所ID。メモタグを作成・更新する対象の事業所を指定します。 例: `1` (最小: 1)
- name*: string - メモタグ名 (30文字以内)。事業所内で重複できません。既に同名のメモタグが存在する場合は 400 エラーになります。 例: `プロジェクトA`
- shortcut1: string - ショートカット１ (20文字以内)。Web画面などでメモタグを検索する際のキーワードとして使用します。更新時に省略した場合は未設定（null）に更新されます。 例: `PROJECTA`
- shortcut2: string - ショートカット２ (20文字以内)。Web画面などでメモタグを検索する際のキーワードとして使用します。更新時に省略した場合は未設定（null）に更新されます。 例: `101`

### レスポンス

メモタグの作成に成功しました。作成されたメモタグを返します。
- tag*: object

## GET /api/1/tags/{id} — メモタグの取得

概要 指定した事業所のメモタグを 1 件取得します。メモタグID（id）はメモタグ一覧の取得 API で確認できます。

注意点
存在しないか既に削除されたメモタグIDを指定した場合は 404 を返します。

### パラメータ

- id* (path): integer(int64) - メモタグID。メモタグ一覧の取得 API のレスポンスに含まれる id を指定します。
- company_id*: integer(int64) - 事業所ID。取得対象の事業所を指定します。

### レスポンス

メモタグの取得に成功しました。
- tag*: object

## PUT /api/1/tags/{id} — メモタグの更新

概要 指定した事業所のメモタグを更新します。

注意点
リクエストボディで shortcut1 / shortcut2 を省略した場合は未設定（null）に更新されます。値を維持したい場合は、現在の値も含めて指定してください。 メモタグ名（name）は事業所内で重複できません。別のメモタグと同名になる更新は 400 エラーになります。 存在しないか既に削除されたメモタグIDを指定した場合は 404 を返します。

### パラメータ

- id* (path): integer(int64) - メモタグID。メモタグ一覧の取得 API のレスポンスに含まれる id を指定します。

### リクエストボディ

- company_id*: integer(int64) - 事業所ID。メモタグを作成・更新する対象の事業所を指定します。 例: `1` (最小: 1)
- name*: string - メモタグ名 (30文字以内)。事業所内で重複できません。既に同名のメモタグが存在する場合は 400 エラーになります。 例: `プロジェクトA`
- shortcut1: string - ショートカット１ (20文字以内)。Web画面などでメモタグを検索する際のキーワードとして使用します。更新時に省略した場合は未設定（null）に更新されます。 例: `PROJECTA`
- shortcut2: string - ショートカット２ (20文字以内)。Web画面などでメモタグを検索する際のキーワードとして使用します。更新時に省略した場合は未設定（null）に更新されます。 例: `101`

### レスポンス

メモタグの更新に成功しました。更新後のメモタグを返します。
- tag*: object

## DELETE /api/1/tags/{id} — メモタグの削除

概要 指定した事業所のメモタグを削除します。

注意点
取引または配賦基準で使用されているメモタグは削除できず、400 エラーになります。 存在しないか既に削除されたメモタグIDを指定した場合は 404 を返します。

### パラメータ

- id* (path): integer(int64) - メモタグID。メモタグ一覧の取得 API のレスポンスに含まれる id を指定します。
- company_id*: integer(int64) - 事業所ID。削除対象のメモタグが属する事業所を指定します。

### レスポンス

メモタグの削除に成功しました。レスポンスボディはありません。

# Taxes

税区分

## GET /api/1/taxes/codes — 税区分一覧の取得（廃止予定）

概要 税区分一覧を取得する 税区分コード（code）は、取引の作成（POST /api/1/deals）や振替伝票の作成（POST /api/1/manual_journals）などで税区分を指定する際に tax_code として利用します。

注意点
このAPIは廃止予定のため非推奨です。/api/1/taxes/companies/{company_id}（指定した事業所の税区分一覧の取得）をご利用ください。 本APIは事業所の設定に依存しない共通の税区分マスタを返します。事業所ごとの使用設定（available）や表示カテゴリ（display_category）を確認する場合は /api/1/taxes/companies/{company_id} をご利用ください。 API利用上の非推奨税区分（課税、非課税、不課税、輸出等、未選択、課税8%）は返りません。

### レスポンス

- taxes*: array[object]

## GET /api/1/taxes/codes/{code} — 税区分の取得

概要 指定したコードに対応する税区分を取得する

注意点
存在しないコード、またはAPI利用上の非推奨税区分（課税、非課税、不課税、輸出等、未選択、課税8%）のコードを指定した場合は404エラーが返ります。

### パラメータ

- code* (path): integer(int64) - 税区分コード。/api/1/taxes/codes（税区分一覧の取得）または /api/1/taxes/companies/{company_id}（指定した事業所の税区分一覧の取得）で取得できる code を指定します。

### レスポンス

- tax*: object

## GET /api/1/taxes/companies/{company_id} — 指定した事業所の税区分一覧の取得

概要 指定した事業所の税区分一覧を取得する 税区分コード（code）は、取引の作成（POST /api/1/deals）や振替伝票の作成（POST /api/1/manual_journals）などで税区分を指定する際に tax_code として利用します。事業所で利用できる税区分と使用設定（available）を確認するために本APIをご利用ください。

注意点
一覧には事業所の設定で「使用しない」となっている税区分も含まれます。available=true を指定すると、使用する設定の税区分のみに絞り込めます。 display_category が null の税区分は、税率を持たない税区分（未選択、対象外など）です。

### パラメータ

- company_id* (path): integer(int64) - 事業所ID。/api/1/companies（事業所一覧の取得）で取得できます。
- display_category: string - 指定した表示カテゴリの税区分のみに絞り込みます。未指定の場合は全ての税区分が返ります。税区分の表示カテゴリ（ tax_5: 5%表示の税区分、 tax_8: 8%表示の税区分、 tax_r8: 軽減税率8%表示の税区分、 tax_10: 10%表示の税区分、 tax_5_e80: インボイス経過措置5%表示80%控除の税区分、 tax_5_e70: インボイス経過措置5%表示70%控除の税区分、 tax_5_e50: インボイス経過措置5%表示50%控除の税区分、 tax_5_e30: インボイス経過措置5%表示30%控除の税区分、 tax_8_e80: インボイス経過措置8%表示80%控除の税区分、 tax_8_e70: インボイス経過措置8%表示70%控除の税区分、 tax_8_e50: インボイス経過措置8%表示50%控除の税区分、 tax_8_e30: インボイス経過措置8%表示30%控除の税区分、 tax_r8_e80: インボイス経過措置軽減税率8%表示80%控除の税区分、 tax_r8_e70: インボイス経過措置軽減税率8%表示70%控除の税区分、 tax_r8_e50: インボイス経過措置軽減税率8%表示50%控除の税区分、 tax_r8_e30: インボイス経過措置軽減税率8%表示30%控除の税区分、 tax_10_e80: インボイス経過措置10%表示80%控除の税区分、 tax_10_e70: インボイス経過措置10%表示70%控除の税区分、 tax_10_e50: インボイス経過措置10%表示50%控除の税区分、 tax_10_e30: インボイス経過措置10%表示30%控除の税区分） (選択肢: tax_5, tax_8, tax_r8, tax_10, tax_5_e80, tax_5_e70, tax_5_e50, tax_5_e30, tax_8_e80, tax_8_e70, tax_8_e50, tax_8_e30, tax_r8_e80, tax_r8_e70, tax_r8_e50, tax_r8_e30, tax_10_e80, tax_10_e70, tax_10_e50, tax_10_e30)
- available: boolean - 指定した使用設定の税区分のみに絞り込みます。未指定の場合は全ての税区分が返ります。税区分の使用設定（true: 使用する、false: 使用しない）

### レスポンス

GET /api/1/taxes/codes と同じ
