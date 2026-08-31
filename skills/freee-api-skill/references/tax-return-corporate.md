# tax_return_corporate

tax_return_corporate

## GET /hub/tax_return/corporate — 申告一覧取得

事業所に紐づく法人税の申告一覧をカーソルページネーションで取得します。 各申告データには利用可能な帳票一覧（available_sheets）が含まれており、帳票取得APIで使用するtax_return_idとsheet_keyを取得できます。

### パラメータ

- company_id*: integer(int64) - 事業所ID
- page_size: integer(int32) - 1ページあたりの取得件数（10〜50、デフォルト10）
- page_token: string - 次のページを取得するためのカーソルトークン

### レスポンス

申告一覧取得レスポンス
- data*: array[object] - 申告データの一覧
  配列の要素:
    - id*: integer(int64) - 申告ID
    - tax_type*: string - 税目
    - org_type*: string - 事業所区分
    - start_date*: string - 事業年度開始日(yyyy-mm-dd)
    - end_date*: string - 事業年度終了日(yyyy-mm-dd)
    - status*: string - 申告ステータス
    - current*: boolean - 現在の申告かどうか
    - synchronized_at*: string(date-time) - 会計連携日時(ISO8601)
    - payroll_synchronized_at*: string(date-time) - 人事労務連携日時(ISO8601)
    - prev_tax_return_id*: integer(int64) - 前年度の申告ID
    - created_at*: string(date-time) - 作成日時(ISO8601)
    - updated_at*: string(date-time) - 更新日時(ISO8601)
    - available_sheets*: array[object] - 利用可能な帳票一覧
      配列の要素:
        - sheet_key*: string - 帳票キー（廃止予定。sheet_code を利用してください）
        - title*: string - 帳票タイトル
        - category*: string - 帳票カテゴリ
        - sheet_code: string - 帳票コード。 - 国税・地方税: 帳票の sheet_code - 決算書: 識別キー（balance_sheet / profit_and_loss / cost_report / statements_of_shareholders / notes_to_financial_statements）
- next_page_token*: string - 次のページを取得するためのカーソルトークン。次ページがない場合はnull

## GET /hub/tax_return/corporate/office_info/{tax_return_id} — 事業所情報一覧取得

申告に紐づく事業所情報の一覧をカーソルページネーションで取得します。 地方税帳票取得APIで必要となる自治体コード（prefecture_government_code、city_government_code）は、このAPIから取得できます。

### パラメータ

- tax_return_id* (path): integer(int64) - 申告書ID
- company_id*: integer(int64) - 事業所ID
- page_size: integer(int32) - 1ページあたりの取得件数（10〜50、デフォルト10）
- page_token: string - 次のページを取得するためのカーソルトークン

### レスポンス

事業所情報取得レスポンス
- data*: array[object] - 事業所情報の一覧
  配列の要素:
    - id*: integer(int64) - 事業所ID
    - name*: string - 事業所名
    - head_office*: boolean - 本店かどうか
    - prefecture_code*: string - 都道府県コード
    - prefecture_government_code*: string - 都道府県庁コード
    - city_government_code*: string - 市区町村コード
- next_page_token*: string - 次のページを取得するためのカーソルトークン。次ページがない場合はnull

## GET /hub/tax_return/corporate/sheet/national/{tax_return_id}/{sheet_key} — 国税帳票取得

指定した申告データの国税帳票を XML 形式 (application/xml) で取得します。 レスポンスの XML は e-Tax の申告データ (XTX) 形式に準拠します。 XML の各項目の仕様は [tax_return API v3 帳票項目マッピング](https://github.com/freee/freee-mcp/blob/main/skills/freee-api-skill/tax-return-references/index.md)で公開されている仕様書を参照してください。

### パラメータ

- tax_return_id* (path): integer(int64) - 申告ID
- sheet_key* (path): string - 帳票キー
- company_id*: integer(int64) - 事業所ID

### レスポンス

帳票データ（XML形式）。
国税・地方税・決算書の帳票を XML 形式 (application/xml) で返却します。
XML は国税帳票が e-Tax、地方税帳票が eLTAX、決算書が e-Tax に提出する XBRL の各形式に準拠します。
レスポンス形式: `application/xml`（推奨）

参考: 以下は互換性のためOpenAPIに残っている `application/json`（廃止予定）のschemaです。新しい処理ではXMLを利用してください。

- data*: object - 帳票データ（JSON形式・廃止予定）
  - envelope: object - IT部（エンベロープ）データ。e-Tax XML の IT 部に格納される共通情報。 帳票シートの IDREF タグが参照する値を含む。 国税帳票（e-Tax）の場合のみ返却される。
  - tax_data*: object - 帳票メタデータ
    - sheet_key*: string - 帳票キー
    - title*: string - 帳票タイトル
    - version*: integer(int32) - 帳票バージョン
  - xtx*: object - XTX形式の帳票データ。style_idをキーとした構造

## GET /hub/tax_return/corporate/sheet/local/{tax_return_id}/{sheet_key}/{prefecture_government_code}/{city_government_code} — 地方税帳票取得

指定した申告データの地方税帳票を XML 形式 (application/xml) で取得します。 レスポンスの XML は eLTAX の申告データ形式に準拠します。 XML の各項目の仕様は [tax_return API v3 帳票項目マッピング](https://github.com/freee/freee-mcp/blob/main/skills/freee-api-skill/tax-return-references/index.md)で案内されている公開仕様書を参照してください。 帳票のreport_unit（prefecture/city）に応じて、prefecture_government_codeまたはcity_government_codeが使用されます。

### パラメータ

- tax_return_id* (path): integer(int64) - 申告ID
- sheet_key* (path): string - 帳票キー
- prefecture_government_code* (path): string - 都道府県の自治体コード
- city_government_code* (path): string - 市区町村の自治体コード
- company_id*: integer(int64) - 事業所ID

### レスポンス

帳票データ（XML形式）。
国税・地方税・決算書の帳票を XML 形式 (application/xml) で返却します。
XML は国税帳票が e-Tax、地方税帳票が eLTAX、決算書が e-Tax に提出する XBRL の各形式に準拠します。
レスポンス形式: `application/xml`（推奨）

参考: 以下は互換性のためOpenAPIに残っている `application/json`（廃止予定）のschemaです。新しい処理ではXMLを利用してください。

- data*: object - 帳票データ（JSON形式・廃止予定）
  - tax_data*: object - 帳票メタデータ
    - sheet_key*: string - 帳票キー
    - title*: string - 帳票タイトル
    - version*: integer(int32) - 帳票バージョン
    - prefecture_government_code*: string - 都道府県の自治体コード（例: 13000）
    - city_government_code*: string - 市区町村の自治体コード（例: 13100）
  - xtx*: object - XTX形式の帳票データ。style_idをキーとした構造

## GET /hub/tax_return/corporate/sheet/financial_statements/{tax_return_id}/{sheet_key} — 決算書取得

指定した申告データの決算書を XML 形式 (application/xml) で取得します。 レスポンスの XML は e-Tax に提出する決算書 (XBRL) 形式に準拠します。 XML の各項目の仕様は [tax_return API v3 帳票項目マッピング](https://github.com/freee/freee-mcp/blob/main/skills/freee-api-skill/tax-return-references/index.md)で公開されている仕様書を参照してください。

### パラメータ

- tax_return_id* (path): integer(int64) - 申告ID
- sheet_key* (path): string - 決算書種別キー (選択肢: balance_sheet, profit_and_loss, cost_report, statements_of_shareholders, notes_to_financial_statements, bs, pl, cr, ss, ifs)
- company_id*: integer(int64) - 事業所ID

### レスポンス

帳票データ（XML形式）。
国税・地方税・決算書の帳票を XML 形式 (application/xml) で返却します。
XML は国税帳票が e-Tax、地方税帳票が eLTAX、決算書が e-Tax に提出する XBRL の各形式に準拠します。
レスポンス形式: `application/xml`（推奨）

参考: 以下は互換性のためOpenAPIに残っている `application/json`（廃止予定）のschemaです。新しい処理ではXMLを利用してください。

- data*: object - 帳票データ（JSON形式・廃止予定）
  - tax_data*: object - 帳票メタデータ
    - sheet_key*: string - 決算書種別キー
    - title*: string - 決算書タイトル
    - ctax_return_id*: integer(int64) - 申告ID
  - xtx*: object - XBRL定義のツリー構造。xbrl_idをキーとしたネスト構造
