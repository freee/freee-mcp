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
