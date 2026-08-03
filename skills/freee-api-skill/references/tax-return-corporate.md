# tax_return_corporate

## 概要

tax_return_corporateの操作

## エンドポイント一覧

### GET /hub/tax_return/corporate

操作: 申告一覧取得

説明: 事業所に紐づく法人税の申告一覧をカーソルページネーションで取得します。 各申告データには利用可能な帳票一覧（available_sheets）が含まれており、帳票取得APIで使用するtax_return_idとsheet_keyを取得できます。

### パラメータ

| 名前 | 位置 | 必須 | 型 | 説明 |
|------|------|------|-----|------|
| company_id | query | はい | integer(int64) | 事業所ID |
| page_size | query | いいえ | integer(int32) | 1ページあたりの取得件数（10〜50、デフォルト10） |
| page_token | query | いいえ | string | 次のページを取得するためのカーソルトークン |

### レスポンス (200)

申告一覧取得レスポンス

- data (必須): array[object] - 申告データの一覧
  配列の要素:
    - id (必須): integer(int64) - 申告ID 例: `4`
    - tax_type (必須): string - 税目 (選択肢: corporate)
    - org_type (必須): string - 事業所区分 (選択肢: corporate)
    - start_date (必須): string - 事業年度開始日(yyyy-mm-dd) 例: `2025-01-01`
    - end_date (必須): string - 事業年度終了日(yyyy-mm-dd) 例: `2025-12-31`
    - status (必須): string - 申告ステータス (選択肢: waiting, working, fixed)
    - current (必須): boolean - 現在の申告かどうか 例: `true`
    - synchronized_at (必須): string(date-time) - 会計連携日時(ISO8601) 例: `2026-04-15T01:30:00Z`
    - payroll_synchronized_at (必須): string(date-time) - 人事労務連携日時(ISO8601) 例: `2026-04-15T01:30:00Z`
    - prev_tax_return_id (必須): integer(int64) - 前年度の申告ID 例: `3`
    - created_at (必須): string(date-time) - 作成日時(ISO8601) 例: `2026-01-05T00:00:00Z`
    - updated_at (必須): string(date-time) - 更新日時(ISO8601) 例: `2026-04-20T09:45:12Z`
    - available_sheets (必須): array[object] - 利用可能な帳票一覧
      配列の要素:
        - sheet_key (必須): string - 帳票キー（廃止予定。sheet_code を利用してください） 例: `schedule_1_blue`
        - title (必須): string - 帳票タイトル 例: `別表一青色申告`
        - category (必須): string - 帳票カテゴリ (選択肢: national, local, financial_statements)
        - sheet_code (任意): string - 帳票コード。 - 国税・地方税: 帳票の sheet_code - 決算書: 識別キー（balance_sheet / profit_and_loss / cost_report / statements_of_shareholders / notes_to_financial_statements） 例: `10100100`
- next_page_token (必須): string - 次のページを取得するためのカーソルトークン。次ページがない場合はnull 例: `eyJpZCI6M30`

### GET /hub/tax_return/corporate/office_info/{tax_return_id}

操作: 事業所情報一覧取得

説明: 申告に紐づく事業所情報の一覧をカーソルページネーションで取得します。 地方税帳票取得APIで必要となる自治体コード（prefecture_government_code、city_government_code）は、このAPIから取得できます。

### パラメータ

| 名前 | 位置 | 必須 | 型 | 説明 |
|------|------|------|-----|------|
| tax_return_id | path | はい | integer(int64) | 申告書ID |
| company_id | query | はい | integer(int64) | 事業所ID |
| page_size | query | いいえ | integer(int32) | 1ページあたりの取得件数（10〜50、デフォルト10） |
| page_token | query | いいえ | string | 次のページを取得するためのカーソルトークン |

### レスポンス (200)

事業所情報取得レスポンス

- data (必須): array[object] - 事業所情報の一覧
  配列の要素:
    - id (必須): integer(int64) - 事業所ID 例: `1`
    - name (必須): string - 事業所名 例: `freee株式会社 本店`
    - head_office (必須): boolean - 本店かどうか 例: `true`
    - prefecture_code (必須): string - 都道府県コード 例: `13`
    - prefecture_government_code (必須): string - 都道府県庁コード 例: `13000`
    - city_government_code (必須): string - 市区町村コード 例: `13109`
- next_page_token (必須): string - 次のページを取得するためのカーソルトークン。次ページがない場合はnull 例: `eyJpZCI6M30`

### GET /hub/tax_return/corporate/sheet/national/{tax_return_id}/{sheet_key}

操作: 国税帳票取得

説明: 指定した申告データの国税帳票を XML 形式 (application/xml) で取得します。 レスポンスボディの XML は api-hub では検証・加工せずそのまま返却します。 JSON 形式 (application/json) のレスポンスは廃止予定です。application/xml を利用してください。

### パラメータ

| 名前 | 位置 | 必須 | 型 | 説明 |
|------|------|------|-----|------|
| tax_return_id | path | はい | integer(int64) | 申告ID |
| sheet_key | path | はい | string | 帳票キー |
| company_id | query | はい | integer(int64) | 事業所ID |

### レスポンス (200)

帳票データ（XML形式）。
国税・地方税・決算書の帳票を XML 形式 (application/xml) で返却します。
レスポンスボディは api-hub では検証・加工せずそのまま透過します。

レスポンス形式: `application/xml`（推奨）

参考: 以下は互換性のためOpenAPIに残っている `application/json`（廃止予定）のschemaです。新しい処理ではXMLを利用してください。

- data (必須): object - 帳票データ（JSON形式・廃止予定）
  - envelope (任意): object - IT部（エンベロープ）データ。e-Tax XML の IT 部に格納される共通情報。 帳票シートの IDREF タグが参照する値を含む。 国税帳票（e-Tax）の場合のみ返却される。
  - tax_data (必須): object - 帳票メタデータ
    - sheet_key (必須): string - 帳票キー 例: `schedule_1_blue`
    - title (必須): string - 帳票タイトル 例: `別表一青色申告`
    - version (必須): integer(int32) - 帳票バージョン 例: `202512`
  - xtx (必須): object - XTX形式の帳票データ。style_idをキーとした構造

### GET /hub/tax_return/corporate/sheet/local/{tax_return_id}/{sheet_key}/{prefecture_government_code}/{city_government_code}

操作: 地方税帳票取得

説明: 指定した申告データの地方税帳票を XML 形式 (application/xml) で取得します。 レスポンスボディの XML は api-hub では検証・加工せずそのまま返却します。 帳票のreport_unit（prefecture/city）に応じて、prefecture_government_codeまたはcity_government_codeが使用されます。 JSON 形式 (application/json) のレスポンスは廃止予定です。application/xml を利用してください。

### パラメータ

| 名前 | 位置 | 必須 | 型 | 説明 |
|------|------|------|-----|------|
| tax_return_id | path | はい | integer(int64) | 申告ID |
| sheet_key | path | はい | string | 帳票キー |
| prefecture_government_code | path | はい | string | 都道府県の自治体コード |
| city_government_code | path | はい | string | 市区町村の自治体コード |
| company_id | query | はい | integer(int64) | 事業所ID |

### レスポンス (200)

帳票データ（XML形式）。
国税・地方税・決算書の帳票を XML 形式 (application/xml) で返却します。
レスポンスボディは api-hub では検証・加工せずそのまま透過します。

レスポンス形式: `application/xml`（推奨）

参考: 以下は互換性のためOpenAPIに残っている `application/json`（廃止予定）のschemaです。新しい処理ではXMLを利用してください。

- data (必須): object - 帳票データ（JSON形式・廃止予定）
  - tax_data (必須): object - 帳票メタデータ
    - sheet_key (必須): string - 帳票キー 例: `local_form_6`
    - title (必須): string - 帳票タイトル 例: `第六号様式`
    - version (必須): integer(int32) - 帳票バージョン 例: `202512`
    - prefecture_government_code (必須): string - 都道府県の自治体コード（例: 13000） 例: `13000`
    - city_government_code (必須): string - 市区町村の自治体コード（例: 13100） 例: `13109`
  - xtx (必須): object - XTX形式の帳票データ。style_idをキーとした構造

### GET /hub/tax_return/corporate/sheet/financial_statements/{tax_return_id}/{sheet_key}

操作: 決算書取得

説明: 指定した申告データの決算書を XML 形式 (application/xml) で取得します。 レスポンスボディの XML は api-hub では検証・加工せずそのまま返却します。 JSON 形式 (application/json) のレスポンスは廃止予定です。application/xml を利用してください。

### パラメータ

| 名前 | 位置 | 必須 | 型 | 説明 |
|------|------|------|-----|------|
| tax_return_id | path | はい | integer(int64) | 申告ID |
| sheet_key | path | はい | string | 決算書種別キー (選択肢: balance_sheet, profit_and_loss, cost_report, statements_of_shareholders, notes_to_financial_statements, bs, pl, cr, ss, ifs) |
| company_id | query | はい | integer(int64) | 事業所ID |

### レスポンス (200)

帳票データ（XML形式）。
国税・地方税・決算書の帳票を XML 形式 (application/xml) で返却します。
レスポンスボディは api-hub では検証・加工せずそのまま透過します。

レスポンス形式: `application/xml`（推奨）

参考: 以下は互換性のためOpenAPIに残っている `application/json`（廃止予定）のschemaです。新しい処理ではXMLを利用してください。

- data (必須): object - 帳票データ（JSON形式・廃止予定）
  - tax_data (必須): object - 帳票メタデータ
    - sheet_key (必須): string - 決算書種別キー 例: `pl`
    - title (必須): string - 決算書タイトル 例: `損益計算書`
    - ctax_return_id (必須): integer(int64) - 申告ID 例: `4`
  - xtx (必須): object - XBRL定義のツリー構造。xbrl_idをキーとしたネスト構造



## 参考情報

- freee API公式ドキュメント: https://developer.freee.co.jp/docs
