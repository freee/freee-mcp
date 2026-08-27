# fixed_asset_management_fixed_assets

fixed_assets

## GET /hub/fixed_asset_management/fixed_assets — 固定資産一覧取得

固定資産の一覧を取得します。 ##

注意点
- 勘定科目別一覧（`list_type=account_item`）は非対応です。指定した場合は 400 エラーを返します。

### パラメータ

- company_id*: integer(int64) - 事業所ID
- fiscal_year_id: integer(int64) - 会計年度ID（一覧の基準年度。未指定時は当期）
- name: string - 資産名（部分一致）
- account_item_id: integer(int64) - 勘定科目ID（会計マスタID）での絞り込み
- section_id: integer(int64) - 部門ID（会計マスタID）での絞り込み
- status: string - 資産ステータスでフィルタ
- acquisition_date_from: string(date) - 取得日の範囲（開始, yyyy-mm-dd）
- acquisition_date_to: string(date) - 取得日の範囲（終了, yyyy-mm-dd）
- acquisition_cost_from: integer(int64) - 取得価額の範囲（下限）
- acquisition_cost_to: integer(int64) - 取得価額の範囲（上限）
- management_number: string - 管理番号（前方一致）
- lease_category: string - リース区分での絞り込み
- order_by: string - 並び替えキー。例: acquisition_date / acquisition_cost / name
- order: string - 並び順 (選択肢: asc, desc)
- page_size: integer(int32) - 1ページあたりの取得件数（デフォルト20、最大100）
- offset: integer(int32) - 取得開始位置（0始まり）

### レスポンス

固定資産一覧取得レスポンス
- data*: array[object] - 固定資産のリスト
- total_count*: integer(int64) - 総件数

## POST /hub/fixed_asset_management/fixed_assets — 固定資産登録

固定資産を登録します。

### リクエストボディ*

- company_id*: integer(int64) - 事業所ID 例: `123`
- name*: string - 資産名 例: `本社サーバー`
- acquisition_date*: string(date) - 取得日(yyyy-mm-dd)。翌期末より先は不可
- start_date*: string(date) - 事業供用開始日(yyyy-mm-dd)。翌期末より先は不可
- acquisition_cost*: integer(int64) - 取得価額 例: `1200000`
- quantity*: integer(int64) - 数量（1以上の整数） 例: `1` (最小: 1)
- unit: string - 単位 例: `台`
- area: number(double) - 面積（0以上）
- area_unit: string - 面積単位
- asset_code: string - 管理名
- management_number: string - 管理番号 例: `PC-001`
- description: string - 摘要
- note: string - 備考
- lease_category: string - リース区分。未設定の場合は null 例: `not_applicable`
- lease_property_id: integer(int64) - リース物件ID（登録時のみ有効）
- acquired_group_company: boolean - グループ会社取得フラグ
- collateral: boolean - 担保提供フラグ
- is_depreciable_asset_tax: boolean - 償却資産税対象フラグ
- item: object - 品目参照（会計マスタID）
  - id*: integer(int64) - 会計マスタID 例: `301`
- segment1: object - セグメント1参照（会計マスタID）
  - id*: integer(int64) - 会計マスタID 例: `301`
- segment2: object - セグメント2参照（会計マスタID）
  - id*: integer(int64) - 会計マスタID 例: `301`
- segment3: object - セグメント3参照（会計マスタID）
  - id*: integer(int64) - 会計マスタID 例: `301`
- prefecture: object - 申告先都道府県
  - code: string - 自治体コード
  - name: string - 自治体名
- municipality: object - 申告先市区町村
  - code: string - 自治体コード
  - name: string - 自治体名
- account_item*: object - 勘定科目参照（必須 / 会計マスタID）
  - id*: integer(int64) - 勘定科目ID 例: `501`
  - name: string - 勘定科目名（任意・参考表示用。検証はidで行う） 例: `工具器具備品`
- depreciation*: object - 会計償却情報（必須ブロック）
  - depreciation_method*: integer(int64) - 償却方法（コード値） 例: `2`
  - life_years: integer(int64) - 耐用年数。月数ベース償却以外で使用 例: `5`
  - life_months: integer(int64) - 償却月数。月数ベース償却（均等償却・リース期間定額法）で使用
  - boy_value: integer(int64) - 期首残高（過年度供用は必須） 例: `800000`
  - revised_acquisition_cost: integer(int64) - 改定取得価額
  - acquisition_cost_for_calculation: integer(int64) - 取得価額相当額（残存価額〜取得価額の範囲内）
  - accumulated_impairment_loss: integer(int64) - 減損損失累計額（0以上かつ（取得価額 − 期首残高）以下）
  - residual_value: integer(int64) - 残存価額（取得価額・期首残高を超えない）
  - special_amount: integer(int64) - 特別償却額（供用開始が当期超なら不可）
  - allocation_type: string - 配分タイプ 例: `allocation_type_none`
  - allocation_for_biz: number(double) - 事業専用割合（0.0 - 100.0） 例: `100`
  - allocation_for_manufacture: number(double) - 製造業利用比率（0.0 - 100.0）
  - biz_depreciation_account_item: object - 償却勘定科目（販管費 / 経費）。事業専用割合が正なら必須
  - manufacture_depreciation_account_item: object - 償却勘定科目（製造経費）。割合が正なら必須
  - section_infos: array[object] - 部門配分情報（by_section 時必須・最大10件）
  - management_section_id: integer(int64) - 管理部門ID。by_section 時は先頭セクションが自動採用
  - allocation_for_non_operating_expenses: number(double) - 営業外費用割合（0.0 - 100.0、法人のみ）
  - non_operating_expenses_account_item: object - 償却勘定科目（営業外費用 / 法人のみ）。割合が正なら必須
  - allocation_for_loan: number(double) - 不動産経費割合（0.0 - 100.0、個人のみ）
  - allocation_for_owner_drawing: number(double) - 事業主貸割合（0.0 - 100.0、個人のみ）
  - loan_depreciation_account_item: object - 償却勘定科目（不動産経費 / 個人のみ）。割合が正なら必須
  - owner_drawing_account_item: object - 償却勘定科目（事業主貸 / 個人のみ）。割合が正なら必須
- tax_depreciation: object - 税務償却情報（法人のみ任意）。

  - 法人＋指定あり: この値で税務台帳を生成・更新する
  - 法人＋省略: 会計償却情報と同値で自動補完する
  - 個人事業主: 税務台帳を持たないため指定しても生成しない
  - depreciation_method*: integer(int64) - 償却方法（コード値）。会計と別値を指定可 例: `2`
  - life_years: integer(int64) - 耐用年数。月数ベース償却以外で使用 例: `5`
  - life_months: integer(int64) - 償却月数。月数ベース償却で使用
  - boy_value: integer(int64) - 期首残高（過年度供用は必須）
  - revised_acquisition_cost: integer(int64) - 改定取得価額
  - acquisition_cost_for_calculation: integer(int64) - 取得価額相当額
  - accumulated_impairment_loss: integer(int64) - 減損損失累計額
  - residual_value: integer(int64) - 残存価額

### レスポンス

固定資産登録レスポンス
- id*: integer(int64) - 固定資産ID
- name*: string - 資産名
- acquisition_date*: string(date) - 取得日(yyyy-mm-dd)
- start_date: string(date) - 事業供用開始日(yyyy-mm-dd)
- acquisition_cost*: integer(int64) - 取得価額
- quantity*: integer(int64) - 数量
- unit: string - 単位
- area: number(double) - 面積（0以上）
- area_unit: string - 面積単位
- asset_code: string - 管理名
- management_number: string - 管理番号
- description: string - 摘要
- note: string - 備考
- lease_category: string - リース区分。未設定の場合は null
- lease_property_id: integer(int64) - リース物件ID（登録時のみ有効）
- acquired_group_company: boolean - グループ会社取得フラグ
- collateral: boolean - 担保提供フラグ
- is_depreciable_asset_tax: boolean - 償却資産税対象フラグ
- item: object - 品目参照（会計マスタID）
- segment1: object - セグメント1参照（会計マスタID）
- segment2: object - セグメント2参照（会計マスタID）
- segment3: object - セグメント3参照（会計マスタID）
- prefecture: object - 申告先都道府県
- municipality: object - 申告先市区町村
- account_item: object - 勘定科目参照（会計マスタID）
- depreciation: object - 会計償却情報（読み形も書き形と対称キーで返す）
- tax_depreciation: object - 税務償却情報（法人かつ税務台帳が存在する場合のみ。個人事業主・税務台帳なしでは null）
- current_status: object - 現況値（read-only）
- asset_changes: array[object] - 異動履歴のリスト（異動なし資産では空配列）
- impaired: boolean - 減損済みか
- shortened: boolean - 耐用年数短縮済みか
- disposed: boolean - 除却済みか
- original_fixed_asset_id: integer(int64) - 元資産参照（異動分割の派生資産で設定）

## GET /hub/fixed_asset_management/fixed_assets/{id} — 固定資産詳細取得

固定資産の詳細を取得します。

### パラメータ

- company_id*: integer(int64) - 事業所ID
- id* (path): integer(int64) - 固定資産ID

### レスポンス

固定資産詳細取得レスポンス
- id*: integer(int64) - 固定資産ID
- name*: string - 資産名
- acquisition_date*: string(date) - 取得日(yyyy-mm-dd)
- start_date: string(date) - 事業供用開始日(yyyy-mm-dd)
- acquisition_cost*: integer(int64) - 取得価額
- quantity*: integer(int64) - 数量
- unit: string - 単位
- area: number(double) - 面積（0以上）
- area_unit: string - 面積単位
- asset_code: string - 管理名
- management_number: string - 管理番号
- description: string - 摘要
- note: string - 備考
- lease_category: string - リース区分。未設定の場合は null
- lease_property_id: integer(int64) - リース物件ID（登録時のみ有効）
- acquired_group_company: boolean - グループ会社取得フラグ
- collateral: boolean - 担保提供フラグ
- is_depreciable_asset_tax: boolean - 償却資産税対象フラグ
- item: object - 品目参照（会計マスタID）
- segment1: object - セグメント1参照（会計マスタID）
- segment2: object - セグメント2参照（会計マスタID）
- segment3: object - セグメント3参照（会計マスタID）
- prefecture: object - 申告先都道府県
- municipality: object - 申告先市区町村
- account_item: object - 勘定科目参照（会計マスタID）
- depreciation: object - 会計償却情報（読み形も書き形と対称キーで返す）
- tax_depreciation: object - 税務償却情報（法人かつ税務台帳が存在する場合のみ。個人事業主・税務台帳なしでは null）
- current_status: object - 現況値（read-only）
- asset_changes: array[object] - 異動履歴のリスト（異動なし資産では空配列）
- impaired: boolean - 減損済みか
- shortened: boolean - 耐用年数短縮済みか
- disposed: boolean - 除却済みか
- original_fixed_asset_id: integer(int64) - 元資産参照（異動分割の派生資産で設定）

## PUT /hub/fixed_asset_management/fixed_assets/{id} — 固定資産更新

固定資産を更新します。全項目を指定するフル更新です。 ##

注意点
- 詳細取得のレスポンスから read-only 項目（current_status / asset_changes / 状態フラグ / id）を除いたものがリクエストボディになります。

### パラメータ

- id* (path): integer(int64) - 固定資産ID

### リクエストボディ*

POST /hub/fixed_asset_management/fixed_assets と同じ

### レスポンス

固定資産更新レスポンス
- id*: integer(int64) - 固定資産ID
- name*: string - 資産名
- acquisition_date*: string(date) - 取得日(yyyy-mm-dd)
- start_date: string(date) - 事業供用開始日(yyyy-mm-dd)
- acquisition_cost*: integer(int64) - 取得価額
- quantity*: integer(int64) - 数量
- unit: string - 単位
- area: number(double) - 面積（0以上）
- area_unit: string - 面積単位
- asset_code: string - 管理名
- management_number: string - 管理番号
- description: string - 摘要
- note: string - 備考
- lease_category: string - リース区分。未設定の場合は null
- lease_property_id: integer(int64) - リース物件ID（登録時のみ有効）
- acquired_group_company: boolean - グループ会社取得フラグ
- collateral: boolean - 担保提供フラグ
- is_depreciable_asset_tax: boolean - 償却資産税対象フラグ
- item: object - 品目参照（会計マスタID）
- segment1: object - セグメント1参照（会計マスタID）
- segment2: object - セグメント2参照（会計マスタID）
- segment3: object - セグメント3参照（会計マスタID）
- prefecture: object - 申告先都道府県
- municipality: object - 申告先市区町村
- account_item: object - 勘定科目参照（会計マスタID）
- depreciation: object - 会計償却情報（読み形も書き形と対称キーで返す）
- tax_depreciation: object - 税務償却情報（法人かつ税務台帳が存在する場合のみ。個人事業主・税務台帳なしでは null）
- current_status: object - 現況値（read-only）
- asset_changes: array[object] - 異動履歴のリスト（異動なし資産では空配列）
- impaired: boolean - 減損済みか
- shortened: boolean - 耐用年数短縮済みか
- disposed: boolean - 除却済みか
- original_fixed_asset_id: integer(int64) - 元資産参照（異動分割の派生資産で設定）

## DELETE /hub/fixed_asset_management/fixed_assets/{id} — 固定資産削除

固定資産を物理削除します。削除できない資産（deletable=false）の場合は 400 を返します。

### パラメータ

GET /hub/fixed_asset_management/fixed_assets/{id} と同じ

### レスポンス

固定資産削除レスポンス
