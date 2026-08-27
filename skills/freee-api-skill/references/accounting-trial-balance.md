# Trial balance

試算表

## GET /api/1/reports/trial_bs — 貸借対照表の取得

概要 指定した事業所の貸借対照表（Balance Sheet, BS）を取得します。決算作業や月次の残高確認、取引先・品目・部門・セグメント単位のBS内訳集計に利用できます。

定義
created_at : 作成日時（ISO 8601, JST） account_item_name : 勘定科目名 hierarchy_level : 階層レベル（1が最上位、値が大きいほど深い階層） parent_account_category_name : 上位勘定科目カテゴリー名 opening_balance : 期首残高（円） debit_amount : 期間中の借方金額（円） credit_amount : 期間中の貸方金額（円） closing_balance : 期末残高（円） composition_ratio : 構成比（百分率、%。BSの区分合計（資産の部合計、または負債及び純資産の部合計）に対する当該行の残高割合を 100 換算した値。相殺科目などで基準額を超える場合は 100 を超え得る）

注意点
会計年度が指定されない場合、現在の会計年度がデフォルトとなります。 up_to...

### パラメータ

- company_id*: integer(int64) - 事業所ID
- fiscal_year: integer(int64) - 会計年度（会計期間の開始日が属する年。例: 会計期間が 2019-04-01 開始なら 2019）。会計年度の作成後に期間を変更した場合などに、指定した年と実際に集計対象となる会計年度がずれることがあります。意図した期間が集計されない場合は、fiscal_year ではなく start_date・end_date で期間を指定してください。
- start_month: integer(int64) - 発生月で絞込：開始会計月(1-12)。指定されない場合、現在の会計年度の期首月が指定されます。
- end_month: integer(int64) - 発生月で絞込：終了会計月(1-12)(会計年度が10月始まりでstart_monthが11なら11, 12, 1, ... 9のいずれかを指定する)。指定されない場合、現在の会計年度の期末月が指定されます。
- start_date: string - 発生日で絞込：開始日(yyyy-mm-dd)
- end_date: string - 発生日で絞込：終了日(yyyy-mm-dd)
- account_item_display_type: string - 勘定科目の表示。指定されない場合、`account_item` が指定されます。
  * `account_item` - 勘定科目単位で表示
  * `group` - 決算書表示単位で表示 (選択肢: account_item, group)
- breakdown_display_type: string - 内訳の表示。`account_item_display_type` と組み合わせ制約がある。
  * `partner` / `item` / `section` / `segment_1_tag` / `segment_2_tag` / `segment_3_tag` は `account_item_display_type=account_item`（または省略）のときのみ指定可能。それぞれ各行の `balances[].partners` / `items` / `sections` / `segment_1_tags` / `segment_2_tags` / `segment_3_tags` に内訳配列を返す
  * `account_item` は `account_item_display_type=group` のときのみ指定可能。他の値と異なり内訳配列は返らず、決算書表示名行に続けて勘定科目行が同じ `balances[]` に展開される
  * 上記の組み合わせ以外（例: `account_item_display_type=group` かつ `partner` / `item` / `section` / `segment_*_tag`）は validation error になる

  取引先、品目、部門、セグメント の各項目が単独で5,000以上登録されている場合は、breakdown_display_type で該当項目を指定するとエラーになります。

  例）取引先の登録数が5,000以上、品目の登録数が4,999以下の場合
  * breakdown_display_type: 取引先を指定 → エラーになる
  * breakdown_display_type: 品目を指定 → エラーにならない (選択肢: partner, item, section, account_item, segment_1_tag, segment_2_tag, segment_3_tag)
- partner_id: integer(int64) - 取引先IDで絞込（0を指定すると、取引先が未選択で絞り込めます）
- partner_code: string - 取引先コードで絞込（事業所設定で取引先コードの利用を有効にしている場合のみ利用可能です）
- item_id: integer(int64) - 品目IDで絞込（0を指定すると、品目が未選択で絞り込めます）
- section_id: integer(int64) - 部門IDで絞込（0を指定すると、部門が未選択で絞り込めます）
- adjustment: string - 決算整理仕訳の絞り込み条件。指定されない場合、決算整理仕訳を含む金額が返却されます。
  * `only` - 決算整理仕訳のみを集計
  * `without` - 決算整理仕訳を除外して集計 (選択肢: only, without)
- approval_flow_status: string - 承認ステータスの絞り込み条件。プレミアムプラン、法人アドバンスプラン（および旧法人プロフェッショナルプラン）以上で、かつ事業所の設定から仕訳承認フローの利用を有効にした場合に指定可能です。
  * `without_in_progress` - 未承認を除く（デフォルト）
  * `all` - 全ての承認ステータスを含む (選択肢: without_in_progress, all)

### レスポンス

- trial_bs*: object
- up_to_date*: boolean - 集計結果が最新かどうか。`false` の場合は残高の集計が完了していないため、時間を置いてから再取得してください。
- up_to_date_reasons: array[object] - 集計が最新でない場合の要因情報。`up_to_date=false` のときのみ要因が含まれ、`up_to_date=true` のときは空配列となる。

## GET /api/1/reports/trial_bs_two_years — 貸借対照表(前年比較)の取得

概要 指定した事業所の貸借対照表(前年比較)を取得します。当年度と前年度の期末残高を並べて比較し、前年比を確認する用途に利用できます。

定義
created_at : 作成日時（ISO 8601, JST） account_item_name : 勘定科目名 hierarchy_level : 階層レベル（1が最上位、値が大きいほど深い階層） parent_account_category_name : 上位勘定科目カテゴリー名 last_year_closing_balance : 前年度期末残高（円） closing_balance : 当年度期末残高（円） year_on_year : 前年比（百分率、%。100 は前年と同額、200 は前年比 2 倍、50 は前年比 0.5 倍。前年度期末残高が 0 以下、または当年度期末残高が負数の場合は 0 が返る）

注意点
会計年度が指定されない場合、現在の会計年度がデフォルトとなります。 up_to_dateがfalseの場合、残高の集計が完了していません。最新の集計結果を確認したい場合は、時間を空けて再度取得する必要があります。 pa...

### パラメータ

GET /api/1/reports/trial_bs と同じ

### レスポンス

- trial_bs_two_years*: object
- up_to_date*: boolean - 集計結果が最新かどうか。`false` の場合は残高の集計が完了していないため、時間を置いてから再取得してください。
- up_to_date_reasons: array[object] - 集計が最新でない場合の要因情報。`up_to_date=false` のときのみ要因が含まれ、`up_to_date=true` のときは空配列となる。

## GET /api/1/reports/trial_bs_three_years — 貸借対照表(３期間比較)の取得

概要 指定した事業所の貸借対照表(３期間比較)を取得します。当年度・前年度・前々年度の期末残高を並べて比較し、中期の推移や前年比を確認する用途に利用できます。

定義
created_at : 作成日時（ISO 8601, JST） account_item_name : 勘定科目名 hierarchy_level : 階層レベル（1が最上位、値が大きいほど深い階層） parent_account_category_name : 上位勘定科目カテゴリー名 two_years_before_closing_balance : 前々年度期末残高（円） last_year_closing_balance : 前年度期末残高（円） closing_balance : 当年度期末残高（円） year_on_year : 前年比（百分率、%。100 は前年と同額、200 は前年比 2 倍、50 は前年比 0.5 倍。前年度期末残高が 0 以下、または当年度期末残高が負数の場合は 0 が返る）

注意点
会計年度が指定されない場合、現在の会計年度がデフォルトとなります。 up_to_dateがfalse...

### パラメータ

GET /api/1/reports/trial_bs と同じ

### レスポンス

- trial_bs_three_years*: object
- up_to_date*: boolean - 集計結果が最新かどうか。`false` の場合は残高の集計が完了していないため、時間を置いてから再取得してください。
- up_to_date_reasons: array[object] - 集計が最新でない場合の要因情報。`up_to_date=false` のときのみ要因が含まれ、`up_to_date=true` のときは空配列となる。

## GET /api/1/reports/trial_pl — 損益計算書の取得

概要 指定した事業所の損益計算書（Profit and Loss statement, PL）を取得します。月次・期間指定での損益確認や、取引先・品目・部門・セグメント単位のPL内訳集計に利用できます。

定義
created_at : 作成日時（ISO 8601, JST） account_item_name : 勘定科目名 hierarchy_level : 階層レベル（1が最上位、値が大きいほど深い階層） parent_account_category_name : 上位勘定科目カテゴリー名 opening_balance : 期首残高（円） debit_amount : 期間中の借方金額（円） credit_amount : 期間中の貸方金額（円） closing_balance : 期末残高（円） composition_ratio : 構成比（百分率、%。PLの基準額（法人の場合は売上高の合計、個人の場合は収入金額の合計）に対する当該行の金額割合を 100 換算した値。基準額を超える行では 100 を超え得る）

注意点
会計年度が指定されない場合、現在の会計年度がデフォルトと...

### パラメータ

- company_id*: integer(int64) - 事業所ID
- fiscal_year: integer(int64) - 会計年度（会計期間の開始日が属する年。例: 会計期間が 2019-04-01 開始なら 2019）。会計年度の作成後に期間を変更した場合などに、指定した年と実際に集計対象となる会計年度がずれることがあります。意図した期間が集計されない場合は、fiscal_year ではなく start_date・end_date で期間を指定してください。
- start_month: integer(int64) - 発生月で絞込：開始会計月(1-12)。指定されない場合、現在の会計年度の期首月が指定されます。
- end_month: integer(int64) - 発生月で絞込：終了会計月(1-12)(会計年度が10月始まりでstart_monthが11なら11, 12, 1, ... 9のいずれかを指定する)。指定されない場合、現在の会計年度の期末月が指定されます。
- start_date: string - 発生日で絞込：開始日(yyyy-mm-dd)
- end_date: string - 発生日で絞込：終了日(yyyy-mm-dd)
- account_item_display_type: string - 勘定科目の表示。指定されない場合、`account_item` が指定されます。
  * `account_item` - 勘定科目単位で表示
  * `group` - 決算書表示単位で表示 (選択肢: account_item, group)
- breakdown_display_type: string - 内訳の表示。`account_item_display_type` と組み合わせ制約がある。
  * `partner` / `item` / `section` / `segment_1_tag` / `segment_2_tag` / `segment_3_tag` は `account_item_display_type=account_item`（または省略）のときのみ指定可能。それぞれ各行の `balances[].partners` / `items` / `sections` / `segment_1_tags` / `segment_2_tags` / `segment_3_tags` に内訳配列を返す
  * `account_item` は `account_item_display_type=group` のときのみ指定可能。他の値と異なり内訳配列は返らず、決算書表示名行に続けて勘定科目行が同じ `balances[]` に展開される
  * 上記の組み合わせ以外（例: `account_item_display_type=group` かつ `partner` / `item` / `section` / `segment_*_tag`）は validation error になる

  取引先、品目、部門、セグメント の各項目が単独で5,000以上登録されている場合は、breakdown_display_type で該当項目を指定するとエラーになります。

  例）取引先の登録数が5,000以上、品目の登録数が4,999以下の場合
  * breakdown_display_type: 取引先を指定 → エラーになる
  * breakdown_display_type: 品目を指定 → エラーにならない (選択肢: partner, item, section, account_item, segment_1_tag, segment_2_tag, segment_3_tag)
- partner_id: integer(int64) - 取引先IDで絞込（0を指定すると、取引先が未選択で絞り込めます）
- partner_code: string - 取引先コードで絞込（事業所設定で取引先コードの利用を有効にしている場合のみ利用可能です）
- item_id: integer(int64) - 品目IDで絞込（0を指定すると、品目が未選択で絞り込めます）
- section_id: integer(int64) - 部門IDで絞込（0を指定すると、部門が未選択で絞り込めます）
- adjustment: string - 決算整理仕訳の絞り込み条件。指定されない場合、決算整理仕訳を含む金額が返却されます。
  * `only` - 決算整理仕訳のみを集計
  * `without` - 決算整理仕訳を除外して集計 (選択肢: only, without)
- cost_allocation: string - 配賦仕訳の絞り込み条件。指定されない場合、配賦仕訳を含む金額が返却されます。法人スタンダードプラン（および旧法人ベーシックプラン）以上で利用可能で、利用できないプランで指定した場合はエラー（403）になります。
  * `only` - 配賦仕訳のみを集計
  * `without` - 配賦仕訳を除外して集計 (選択肢: only, without)
- approval_flow_status: string - 承認ステータスの絞り込み条件。プレミアムプラン、法人アドバンスプラン（および旧法人プロフェッショナルプラン）以上で、かつ事業所の設定から仕訳承認フローの利用を有効にした場合に指定可能です。
  * `without_in_progress` - 未承認を除く（デフォルト）
  * `all` - 全ての承認ステータスを含む (選択肢: without_in_progress, all)

### レスポンス

- trial_pl*: object
- up_to_date*: boolean - 集計結果が最新かどうか。`false` の場合は残高の集計が完了していないため、時間を置いてから再取得してください。
- up_to_date_reasons: array[object] - 集計が最新でない場合の要因情報。`up_to_date=false` のときのみ要因が含まれ、`up_to_date=true` のときは空配列となる。

## GET /api/1/reports/trial_pl_two_years — 損益計算書(前年比較)の取得

概要 指定した事業所の損益計算書(前年比較)を取得します。当年度と前年度の期末残高を並べて比較し、前年比を確認する用途に利用できます。

定義
created_at : 作成日時（ISO 8601, JST） account_item_name : 勘定科目名 hierarchy_level : 階層レベル（1が最上位、値が大きいほど深い階層） parent_account_category_name : 上位勘定科目カテゴリー名 last_year_closing_balance : 前年度期末残高（円） closing_balance : 当年度期末残高（円） year_on_year : 前年比（百分率、%。100 は前年と同額、200 は前年比 2 倍、50 は前年比 0.5 倍。前年度期末残高が 0 以下、または当年度期末残高が負数の場合は 0 が返る）

注意点
会計年度が指定されない場合、現在の会計年度がデフォルトとなります。 up_to_dateがfalseの場合、残高の集計が完了していません。最新の集計結果を確認したい場合は、時間を空けて再度取得する必要があります。 配賦...

### パラメータ

GET /api/1/reports/trial_pl と同じ

### レスポンス

- trial_pl_two_years*: object
- up_to_date*: boolean - 集計結果が最新かどうか。`false` の場合は残高の集計が完了していないため、時間を置いてから再取得してください。
- up_to_date_reasons: array[object] - 集計が最新でない場合の要因情報。`up_to_date=false` のときのみ要因が含まれ、`up_to_date=true` のときは空配列となる。

## GET /api/1/reports/trial_pl_three_years — 損益計算書(３期間比較)の取得

概要 指定した事業所の損益計算書(３期間比較)を取得します。当年度・前年度・前々年度の期末残高を並べて比較し、前年比を確認する用途に利用できます。

定義
created_at : 作成日時（ISO 8601, JST） account_item_name : 勘定科目名 hierarchy_level : 階層レベル（1が最上位、値が大きいほど深い階層） parent_account_category_name : 上位勘定科目カテゴリー名 two_years_before_closing_balance : 前々年度期末残高（円） last_year_closing_balance : 前年度期末残高（円） closing_balance : 当年度期末残高（円） year_on_year : 前年比（百分率、%。100 は前年と同額、200 は前年比 2 倍、50 は前年比 0.5 倍。前年度期末残高が 0 以下、または当年度期末残高が負数の場合は 0 が返る）

注意点
会計年度が指定されない場合、現在の会計年度がデフォルトとなります。 up_to_dateがfalseの場合、残高...

### パラメータ

GET /api/1/reports/trial_pl と同じ

### レスポンス

- trial_pl_three_years*: object
- up_to_date*: boolean - 集計結果が最新かどうか。`false` の場合は残高の集計が完了していないため、時間を置いてから再取得してください。
- up_to_date_reasons: array[object] - 集計が最新でない場合の要因情報。`up_to_date=false` のときのみ要因が含まれ、`up_to_date=true` のときは空配列となる。

## GET /api/1/reports/trial_pl_sections — 損益計算書(部門比較)の取得

概要 指定した事業所の損益計算書(部門比較)を取得します。指定した部門（最大5つ）ごとの期末残高を並べて比較する用途に利用できます。

定義
created_at : 作成日時（ISO 8601, JST） account_item_name : 勘定科目名 hierarchy_level : 階層レベル（1が最上位、値が大きいほど深い階層） parent_account_category_name : 上位勘定科目カテゴリー名 closing_balance : 期末残高（円。行直下の値は比較対象に指定した部門の合計、sections 配下の値は各部門の金額）

注意点
会計年度が指定されない場合、現在の会計年度がデフォルトとなります。 up_to_dateがfalseの場合、残高の集計が完了していません。最新の集計結果を確認したい場合は、時間を空けて再度取得する必要があります。 配賦仕訳の絞り込み（cost_allocation）は法人スタンダードプラン（および旧法人ベーシックプラン）以上で利用可能です。 partner_codeとpartner_idは同時に指定することはできません。...

### パラメータ

- company_id*: integer(int64) - 事業所ID
- section_ids*: string - 比較する部門IDの指定。半角数字のIDを半角カンマ区切り（スペースなし）で1〜5つ指定してください。同じIDを重複して指定することはできません。0を指定すると、未選択の部門で比較できます。
- fiscal_year: integer(int64) - 会計年度（会計期間の開始日が属する年。例: 会計期間が 2019-04-01 開始なら 2019）。会計年度の作成後に期間を変更した場合などに、指定した年と実際に集計対象となる会計年度がずれることがあります。意図した期間が集計されない場合は、fiscal_year ではなく start_date・end_date で期間を指定してください。
- start_month: integer(int64) - 発生月で絞込：開始会計月(1-12)。指定されない場合、現在の会計年度の期首月が指定されます。
- end_month: integer(int64) - 発生月で絞込：終了会計月(1-12)(会計年度が10月始まりでstart_monthが11なら11, 12, 1, ... 9のいずれかを指定する)。指定されない場合、現在の会計年度の期末月が指定されます。
- start_date: string - 発生日で絞込：開始日(yyyy-mm-dd)
- end_date: string - 発生日で絞込：終了日(yyyy-mm-dd)
- account_item_display_type: string - 勘定科目の表示。指定されない場合、`account_item` が指定されます。
  * `account_item` - 勘定科目単位で表示
  * `group` - 決算書表示単位で表示 (選択肢: account_item, group)
- breakdown_display_type: string - 内訳の表示。`account_item_display_type` と組み合わせ制約がある。
  * `partner` / `item` / `segment_1_tag` / `segment_2_tag` / `segment_3_tag` は `account_item_display_type=account_item`（または省略）のときのみ指定可能。`balances[].sections[]` の各部門要素配下の `partners` / `items` / `segment_1_tags` / `segment_2_tags` / `segment_3_tags` に内訳配列を返す
  * `account_item` は `account_item_display_type=group` のときのみ指定可能。他の値と異なり内訳配列は返らず、決算書表示名行に続けて勘定科目行が同じ `balances[]` に展開される
  * 部門比較では `section` は指定できない
  * 上記の組み合わせ以外は validation error になる

  取引先、品目、セグメント の各項目が単独で5,000以上登録されている場合は、breakdown_display_type で該当項目を指定するとエラーになります。

  例）取引先の登録数が5,000以上、品目の登録数が4,999以下の場合
  * breakdown_display_type: 取引先を指定 → エラーになる
  * breakdown_display_type: 品目を指定 → エラーにならない (選択肢: partner, item, account_item, segment_1_tag, segment_2_tag, segment_3_tag)
- partner_id: integer(int64) - 取引先IDで絞込（0を指定すると、取引先が未選択で絞り込めます）
- partner_code: string - 取引先コードで絞込（事業所設定で取引先コードの利用を有効にしている場合のみ利用可能です）
- item_id: integer(int64) - 品目IDで絞込（0を指定すると、品目が未選択で絞り込めます）
- adjustment: string - 決算整理仕訳の絞り込み条件。指定されない場合、決算整理仕訳を含む金額が返却されます。
  * `only` - 決算整理仕訳のみを集計
  * `without` - 決算整理仕訳を除外して集計 (選択肢: only, without)
- cost_allocation: string - 配賦仕訳の絞り込み条件。指定されない場合、配賦仕訳を含む金額が返却されます。法人スタンダードプラン（および旧法人ベーシックプラン）以上で利用可能で、利用できないプランで指定した場合はエラー（403）になります。
  * `only` - 配賦仕訳のみを集計
  * `without` - 配賦仕訳を除外して集計 (選択肢: only, without)
- approval_flow_status: string - 承認ステータスの絞り込み条件。プレミアムプラン、法人アドバンスプラン（および旧法人プロフェッショナルプラン）以上で、かつ事業所の設定から仕訳承認フローの利用を有効にした場合に指定可能です。
  * `without_in_progress` - 未承認を除く（デフォルト）
  * `all` - 全ての承認ステータスを含む (選択肢: without_in_progress, all)

### レスポンス

- trial_pl_sections*: object
- up_to_date*: boolean - 集計結果が最新かどうか。`false` の場合は残高の集計が完了していないため、時間を置いてから再取得してください。
- up_to_date_reasons: array[object] - 集計が最新でない場合の要因情報。`up_to_date=false` のときのみ要因が含まれ、`up_to_date=true` のときは空配列となる。

## GET /api/1/reports/trial_pl_segment_1_tags — 損益計算書(セグメント１比較)の取得

概要 指定した事業所の損益計算書(セグメント1比較)を取得します。指定したセグメント1タグ（最大5つ）ごとの期末残高を並べて比較する用途に利用できます。

定義
created_at : 作成日時（ISO 8601, JST） account_item_name : 勘定科目名 hierarchy_level : 階層レベル（1が最上位、値が大きいほど深い階層） parent_account_category_name : 上位勘定科目カテゴリー名 closing_balance : 期末残高（円。行直下の値は比較対象に指定したセグメント1タグの合計、segment_1_tags 配下の値は各タグの金額）

注意点
会計年度が指定されない場合、現在の会計年度がデフォルトとなります。 up_to_dateがfalseの場合、残高の集計が完了していません。最新の集計結果を確認したい場合は、時間を空けて再度取得する必要があります。 配賦仕訳の絞り込み（cost_allocation）は法人スタンダードプラン（および旧法人ベーシックプラン）以上で利用可能です。 partner_codeとpartn...

### パラメータ

- company_id*: integer(int64) - 事業所ID
- segment_1_tag_ids*: string - 比較するセグメント1タグIDの指定。半角数字のIDを半角カンマ区切り（スペースなし）で1〜5つ指定してください。同じIDを重複して指定することはできません。0を指定すると、未選択のセグメント1タグで比較できます。
- fiscal_year: integer(int64) - 会計年度（会計期間の開始日が属する年。例: 会計期間が 2019-04-01 開始なら 2019）。会計年度の作成後に期間を変更した場合などに、指定した年と実際に集計対象となる会計年度がずれることがあります。意図した期間が集計されない場合は、fiscal_year ではなく start_date・end_date で期間を指定してください。
- start_month: integer(int64) - 発生月で絞込：開始会計月(1-12)。指定されない場合、現在の会計年度の期首月が指定されます。
- end_month: integer(int64) - 発生月で絞込：終了会計月(1-12)(会計年度が10月始まりでstart_monthが11なら11, 12, 1, ... 9のいずれかを指定する)。指定されない場合、現在の会計年度の期末月が指定されます。
- start_date: string - 発生日で絞込：開始日(yyyy-mm-dd)
- end_date: string - 発生日で絞込：終了日(yyyy-mm-dd)
- account_item_display_type: string - 勘定科目の表示。指定されない場合、`account_item` が指定されます。
  * `account_item` - 勘定科目単位で表示
  * `group` - 決算書表示単位で表示 (選択肢: account_item, group)
- breakdown_display_type: string - 内訳の表示。`account_item_display_type` と組み合わせ制約がある。
  * `partner` / `item` / `section` は `account_item_display_type=account_item`（または省略）のときのみ指定可能。`balances[].segment_1_tags[]` の各セグメント1タグ要素配下の `partners` / `items` / `sections` に内訳配列を返す
  * `account_item` は `account_item_display_type=group` のときのみ指定可能。他の値と異なり内訳配列は返らず、決算書表示名行に続けて勘定科目行が同じ `balances[]` に展開される
  * 上記の組み合わせ以外は validation error になる

  取引先、品目、部門 の各項目が単独で5,000以上登録されている場合は、breakdown_display_type で該当項目を指定するとエラーになります。

  例）取引先の登録数が5,000以上、品目の登録数が4,999以下の場合
  * breakdown_display_type: 取引先を指定 → エラーになる
  * breakdown_display_type: 品目を指定 → エラーにならない (選択肢: partner, item, section, account_item)
- partner_id: integer(int64) - 取引先IDで絞込（0を指定すると、取引先が未選択で絞り込めます）
- partner_code: string - 取引先コードで絞込（事業所設定で取引先コードの利用を有効にしている場合のみ利用可能です）
- item_id: integer(int64) - 品目IDで絞込（0を指定すると、品目が未選択で絞り込めます）
- section_id: integer(int64) - 部門IDで絞込（0を指定すると、部門が未選択で絞り込めます）
- adjustment: string - 決算整理仕訳の絞り込み条件。指定されない場合、決算整理仕訳を含む金額が返却されます。
  * `only` - 決算整理仕訳のみを集計
  * `without` - 決算整理仕訳を除外して集計 (選択肢: only, without)
- cost_allocation: string - 配賦仕訳の絞り込み条件。指定されない場合、配賦仕訳を含む金額が返却されます。法人スタンダードプラン（および旧法人ベーシックプラン）以上で利用可能で、利用できないプランで指定した場合はエラー（403）になります。
  * `only` - 配賦仕訳のみを集計
  * `without` - 配賦仕訳を除外して集計 (選択肢: only, without)
- approval_flow_status: string - 承認ステータスの絞り込み条件。プレミアムプラン、法人アドバンスプラン（および旧法人プロフェッショナルプラン）以上で、かつ事業所の設定から仕訳承認フローの利用を有効にした場合に指定可能です。
  * `without_in_progress` - 未承認を除く（デフォルト）
  * `all` - 全ての承認ステータスを含む (選択肢: without_in_progress, all)

### レスポンス

- trial_pl_segment_1_tags*: object
- up_to_date*: boolean - 集計結果が最新かどうか。`false` の場合は残高の集計が完了していないため、時間を置いてから再取得してください。
- up_to_date_reasons: array[object] - 集計が最新でない場合の要因情報。`up_to_date=false` のときのみ要因が含まれ、`up_to_date=true` のときは空配列となる。

## GET /api/1/reports/trial_pl_segment_2_tags — 損益計算書(セグメント２比較)の取得

概要 指定した事業所の損益計算書(セグメント2比較)を取得します。指定したセグメント2タグ（最大5つ）ごとの期末残高を並べて比較する用途に利用できます。

定義
created_at : 作成日時（ISO 8601, JST） account_item_name : 勘定科目名 hierarchy_level : 階層レベル（1が最上位、値が大きいほど深い階層） parent_account_category_name : 上位勘定科目カテゴリー名 closing_balance : 期末残高（円。行直下の値は比較対象に指定したセグメント2タグの合計、segment_2_tags 配下の値は各タグの金額）

注意点
会計年度が指定されない場合、現在の会計年度がデフォルトとなります。 up_to_dateがfalseの場合、残高の集計が完了していません。最新の集計結果を確認したい場合は、時間を空けて再度取得する必要があります。 配賦仕訳の絞り込み（cost_allocation）は法人スタンダードプラン（および旧法人ベーシックプラン）以上で利用可能です。 partner_codeとpartn...

### パラメータ

- company_id*: integer(int64) - 事業所ID
- segment_2_tag_ids*: string - 比較するセグメント2タグIDの指定。半角数字のIDを半角カンマ区切り（スペースなし）で1〜5つ指定してください。同じIDを重複して指定することはできません。0を指定すると、未選択のセグメント2タグで比較できます。
- fiscal_year: integer(int64) - 会計年度（会計期間の開始日が属する年。例: 会計期間が 2019-04-01 開始なら 2019）。会計年度の作成後に期間を変更した場合などに、指定した年と実際に集計対象となる会計年度がずれることがあります。意図した期間が集計されない場合は、fiscal_year ではなく start_date・end_date で期間を指定してください。
- start_month: integer(int64) - 発生月で絞込：開始会計月(1-12)。指定されない場合、現在の会計年度の期首月が指定されます。
- end_month: integer(int64) - 発生月で絞込：終了会計月(1-12)(会計年度が10月始まりでstart_monthが11なら11, 12, 1, ... 9のいずれかを指定する)。指定されない場合、現在の会計年度の期末月が指定されます。
- start_date: string - 発生日で絞込：開始日(yyyy-mm-dd)
- end_date: string - 発生日で絞込：終了日(yyyy-mm-dd)
- account_item_display_type: string - 勘定科目の表示。指定されない場合、`account_item` が指定されます。
  * `account_item` - 勘定科目単位で表示
  * `group` - 決算書表示単位で表示 (選択肢: account_item, group)
- breakdown_display_type: string - 内訳の表示。`account_item_display_type` と組み合わせ制約がある。
  * `partner` / `item` / `section` は `account_item_display_type=account_item`（または省略）のときのみ指定可能。`balances[].segment_2_tags[]` の各セグメント2タグ要素配下の `partners` / `items` / `sections` に内訳配列を返す
  * `account_item` は `account_item_display_type=group` のときのみ指定可能。他の値と異なり内訳配列は返らず、決算書表示名行に続けて勘定科目行が同じ `balances[]` に展開される
  * 上記の組み合わせ以外は validation error になる

  取引先、品目、部門 の各項目が単独で5,000以上登録されている場合は、breakdown_display_type で該当項目を指定するとエラーになります。

  例）取引先の登録数が5,000以上、品目の登録数が4,999以下の場合
  * breakdown_display_type: 取引先を指定 → エラーになる
  * breakdown_display_type: 品目を指定 → エラーにならない (選択肢: partner, item, section, account_item)
- partner_id: integer(int64) - 取引先IDで絞込（0を指定すると、取引先が未選択で絞り込めます）
- partner_code: string - 取引先コードで絞込（事業所設定で取引先コードの利用を有効にしている場合のみ利用可能です）
- item_id: integer(int64) - 品目IDで絞込（0を指定すると、品目が未選択で絞り込めます）
- section_id: integer(int64) - 部門IDで絞込（0を指定すると、部門が未選択で絞り込めます）
- adjustment: string - 決算整理仕訳の絞り込み条件。指定されない場合、決算整理仕訳を含む金額が返却されます。
  * `only` - 決算整理仕訳のみを集計
  * `without` - 決算整理仕訳を除外して集計 (選択肢: only, without)
- cost_allocation: string - 配賦仕訳の絞り込み条件。指定されない場合、配賦仕訳を含む金額が返却されます。法人スタンダードプラン（および旧法人ベーシックプラン）以上で利用可能で、利用できないプランで指定した場合はエラー（403）になります。
  * `only` - 配賦仕訳のみを集計
  * `without` - 配賦仕訳を除外して集計 (選択肢: only, without)
- approval_flow_status: string - 承認ステータスの絞り込み条件。プレミアムプラン、法人アドバンスプラン（および旧法人プロフェッショナルプラン）以上で、かつ事業所の設定から仕訳承認フローの利用を有効にした場合に指定可能です。
  * `without_in_progress` - 未承認を除く（デフォルト）
  * `all` - 全ての承認ステータスを含む (選択肢: without_in_progress, all)

### レスポンス

- trial_pl_segment_2_tags*: object
- up_to_date*: boolean - 集計結果が最新かどうか。`false` の場合は残高の集計が完了していないため、時間を置いてから再取得してください。
- up_to_date_reasons: array[object] - 集計が最新でない場合の要因情報。`up_to_date=false` のときのみ要因が含まれ、`up_to_date=true` のときは空配列となる。

## GET /api/1/reports/trial_pl_segment_3_tags — 損益計算書(セグメント３比較)の取得

概要 指定した事業所の損益計算書(セグメント3比較)を取得します。指定したセグメント3タグ（最大5つ）ごとの期末残高を並べて比較する用途に利用できます。

定義
created_at : 作成日時（ISO 8601, JST） account_item_name : 勘定科目名 hierarchy_level : 階層レベル（1が最上位、値が大きいほど深い階層） parent_account_category_name : 上位勘定科目カテゴリー名 closing_balance : 期末残高（円。行直下の値は比較対象に指定したセグメント3タグの合計、segment_3_tags 配下の値は各タグの金額）

注意点
会計年度が指定されない場合、現在の会計年度がデフォルトとなります。 up_to_dateがfalseの場合、残高の集計が完了していません。最新の集計結果を確認したい場合は、時間を空けて再度取得する必要があります。 配賦仕訳の絞り込み（cost_allocation）は法人スタンダードプラン（および旧法人ベーシックプラン）以上で利用可能です。 partner_codeとpartn...

### パラメータ

- company_id*: integer(int64) - 事業所ID
- segment_3_tag_ids*: string - 比較するセグメント3タグIDの指定。半角数字のIDを半角カンマ区切り（スペースなし）で1〜5つ指定してください。同じIDを重複して指定することはできません。0を指定すると、未選択のセグメント3タグで比較できます。
- fiscal_year: integer(int64) - 会計年度（会計期間の開始日が属する年。例: 会計期間が 2019-04-01 開始なら 2019）。会計年度の作成後に期間を変更した場合などに、指定した年と実際に集計対象となる会計年度がずれることがあります。意図した期間が集計されない場合は、fiscal_year ではなく start_date・end_date で期間を指定してください。
- start_month: integer(int64) - 発生月で絞込：開始会計月(1-12)。指定されない場合、現在の会計年度の期首月が指定されます。
- end_month: integer(int64) - 発生月で絞込：終了会計月(1-12)(会計年度が10月始まりでstart_monthが11なら11, 12, 1, ... 9のいずれかを指定する)。指定されない場合、現在の会計年度の期末月が指定されます。
- start_date: string - 発生日で絞込：開始日(yyyy-mm-dd)
- end_date: string - 発生日で絞込：終了日(yyyy-mm-dd)
- account_item_display_type: string - 勘定科目の表示。指定されない場合、`account_item` が指定されます。
  * `account_item` - 勘定科目単位で表示
  * `group` - 決算書表示単位で表示 (選択肢: account_item, group)
- breakdown_display_type: string - 内訳の表示。`account_item_display_type` と組み合わせ制約がある。
  * `partner` / `item` / `section` は `account_item_display_type=account_item`（または省略）のときのみ指定可能。`balances[].segment_3_tags[]` の各セグメント3タグ要素配下の `partners` / `items` / `sections` に内訳配列を返す
  * `account_item` は `account_item_display_type=group` のときのみ指定可能。他の値と異なり内訳配列は返らず、決算書表示名行に続けて勘定科目行が同じ `balances[]` に展開される
  * 上記の組み合わせ以外は validation error になる

  取引先、品目、部門 の各項目が単独で5,000以上登録されている場合は、breakdown_display_type で該当項目を指定するとエラーになります。

  例）取引先の登録数が5,000以上、品目の登録数が4,999以下の場合
  * breakdown_display_type: 取引先を指定 → エラーになる
  * breakdown_display_type: 品目を指定 → エラーにならない (選択肢: partner, item, section, account_item)
- partner_id: integer(int64) - 取引先IDで絞込（0を指定すると、取引先が未選択で絞り込めます）
- partner_code: string - 取引先コードで絞込（事業所設定で取引先コードの利用を有効にしている場合のみ利用可能です）
- item_id: integer(int64) - 品目IDで絞込（0を指定すると、品目が未選択で絞り込めます）
- section_id: integer(int64) - 部門IDで絞込（0を指定すると、部門が未選択で絞り込めます）
- adjustment: string - 決算整理仕訳の絞り込み条件。指定されない場合、決算整理仕訳を含む金額が返却されます。
  * `only` - 決算整理仕訳のみを集計
  * `without` - 決算整理仕訳を除外して集計 (選択肢: only, without)
- cost_allocation: string - 配賦仕訳の絞り込み条件。指定されない場合、配賦仕訳を含む金額が返却されます。法人スタンダードプラン（および旧法人ベーシックプラン）以上で利用可能で、利用できないプランで指定した場合はエラー（403）になります。
  * `only` - 配賦仕訳のみを集計
  * `without` - 配賦仕訳を除外して集計 (選択肢: only, without)
- approval_flow_status: string - 承認ステータスの絞り込み条件。プレミアムプラン、法人アドバンスプラン（および旧法人プロフェッショナルプラン）以上で、かつ事業所の設定から仕訳承認フローの利用を有効にした場合に指定可能です。
  * `without_in_progress` - 未承認を除く（デフォルト）
  * `all` - 全ての承認ステータスを含む (選択肢: without_in_progress, all)

### レスポンス

- trial_pl_segment_3_tags*: object
- up_to_date*: boolean - 集計結果が最新かどうか。`false` の場合は残高の集計が完了していないため、時間を置いてから再取得してください。
- up_to_date_reasons: array[object] - 集計が最新でない場合の要因情報。`up_to_date=false` のときのみ要因が含まれ、`up_to_date=true` のときは空配列となる。

## GET /api/1/reports/trial_cr — 製造原価報告書の取得

概要 指定した事業所の製造原価報告書（Cost Report, CR）を取得します。材料費・労務費・製造経費など製造原価の期間集計や、取引先・品目・部門・セグメント単位の内訳集計に利用できます。

定義
created_at : 作成日時（ISO 8601, JST） account_item_name : 勘定科目名 hierarchy_level : 階層レベル（1が最上位、値が大きいほど深い階層） parent_account_category_name : 上位勘定科目カテゴリー名 opening_balance : 期首残高（円） debit_amount : 期間中の借方金額（円） credit_amount : 期間中の貸方金額（円） closing_balance : 期末残高（円） composition_ratio : 構成比（百分率、%。製造原価報告書の基準額（勘定科目カテゴリー「製造原価」の金額。法人・個人共通）に対する当該行の金額割合を 100 換算した値。基準額を超える行では 100 を超え得る）

注意点
対象の会計年度で製造業向け機能を使用する設定になってい...

### パラメータ

GET /api/1/reports/trial_pl と同じ

### レスポンス

- trial_cr*: object
- up_to_date*: boolean - 集計結果が最新かどうか。`false` の場合は残高の集計が完了していないため、時間を置いてから再取得してください。
- up_to_date_reasons: array[object] - 集計が最新でない場合の要因情報。`up_to_date=false` のときのみ要因が含まれ、`up_to_date=true` のときは空配列となる。

## GET /api/1/reports/trial_cr_two_years — 製造原価報告書(前年比較)の取得

概要 指定した事業所の製造原価報告書(前年比較)を取得します。当年度と前年度の期末残高を並べて比較し、前年比を確認する用途に利用できます。

定義
created_at : 作成日時（ISO 8601, JST） account_item_name : 勘定科目名 hierarchy_level : 階層レベル（1が最上位、値が大きいほど深い階層） parent_account_category_name : 上位勘定科目カテゴリー名 last_year_closing_balance : 前年度期末残高（円） closing_balance : 当年度期末残高（円） year_on_year : 前年比（百分率、%。100 は前年と同額、200 は前年比 2 倍、50 は前年比 0.5 倍。前年度期末残高が 0 以下、または当年度期末残高が負数の場合は 0 が返る）

注意点
対象の会計年度で製造業向け機能を使用する設定になっている必要があります。無効の場合はエラー（400）になります。 会計年度が指定されない場合、現在の会計年度がデフォルトとなります。 up_to_dateがfalse...

### パラメータ

GET /api/1/reports/trial_pl と同じ

### レスポンス

- trial_cr_two_years*: object
- up_to_date*: boolean - 集計結果が最新かどうか。`false` の場合は残高の集計が完了していないため、時間を置いてから再取得してください。
- up_to_date_reasons: array[object] - 集計が最新でない場合の要因情報。`up_to_date=false` のときのみ要因が含まれ、`up_to_date=true` のときは空配列となる。

## GET /api/1/reports/trial_cr_three_years — 製造原価報告書(３期間比較)の取得

概要 指定した事業所の製造原価報告書(３期間比較)を取得します。当年度・前年度・前々年度の期末残高を並べて比較し、前年比を確認する用途に利用できます。

定義
created_at : 作成日時（ISO 8601, JST） account_item_name : 勘定科目名 hierarchy_level : 階層レベル（1が最上位、値が大きいほど深い階層） parent_account_category_name : 上位勘定科目カテゴリー名 two_years_before_closing_balance : 前々年度期末残高（円） last_year_closing_balance : 前年度期末残高（円） closing_balance : 当年度期末残高（円） year_on_year : 前年比（百分率、%。100 は前年と同額、200 は前年比 2 倍、50 は前年比 0.5 倍。前年度期末残高が 0 以下、または当年度期末残高が負数の場合は 0 が返る）

注意点
対象の会計年度で製造業向け機能を使用する設定になっている必要があります。無効の場合はエラー（400）になりま...

### パラメータ

GET /api/1/reports/trial_pl と同じ

### レスポンス

- trial_cr_three_years*: object
- up_to_date*: boolean - 集計結果が最新かどうか。`false` の場合は残高の集計が完了していないため、時間を置いてから再取得してください。
- up_to_date_reasons: array[object] - 集計が最新でない場合の要因情報。`up_to_date=false` のときのみ要因が含まれ、`up_to_date=true` のときは空配列となる。

## GET /api/1/reports/trial_cr_sections — 製造原価報告書(部門比較)の取得

概要 指定した事業所の製造原価報告書(部門比較)を取得します。指定した部門（最大5つ）ごとの期末残高を並べて比較する用途に利用できます。

定義
created_at : 作成日時（ISO 8601, JST） account_item_name : 勘定科目名 hierarchy_level : 階層レベル（1が最上位、値が大きいほど深い階層） parent_account_category_name : 上位勘定科目カテゴリー名 closing_balance : 期末残高（円。行直下の値は比較対象に指定した部門の合計、sections 配下の値は各部門の金額）

注意点
対象の会計年度で製造業向け機能を使用する設定になっている必要があります。無効の場合はエラー（400）になります。 会計年度が指定されない場合、現在の会計年度がデフォルトとなります。 up_to_dateがfalseの場合、残高の集計が完了していません。最新の集計結果を確認したい場合は、時間を空けて再度取得する必要があります。 配賦仕訳の絞り込み（cost_allocation）は法人スタンダードプラン（および旧法人ベ...

### パラメータ

GET /api/1/reports/trial_pl_sections と同じ

### レスポンス

- trial_cr_sections*: object
- up_to_date*: boolean - 集計結果が最新かどうか。`false` の場合は残高の集計が完了していないため、時間を置いてから再取得してください。
- up_to_date_reasons: array[object] - 集計が最新でない場合の要因情報。`up_to_date=false` のときのみ要因が含まれ、`up_to_date=true` のときは空配列となる。

## GET /api/1/reports/trial_cr_segment_1_tags — 製造原価報告書(セグメント１比較)の取得

概要 指定した事業所の製造原価報告書(セグメント1比較)を取得します。指定したセグメント1タグ（最大5つ）ごとの期末残高を並べて比較する用途に利用できます。

定義
created_at : 作成日時（ISO 8601, JST） account_item_name : 勘定科目名 hierarchy_level : 階層レベル（1が最上位、値が大きいほど深い階層） parent_account_category_name : 上位勘定科目カテゴリー名 closing_balance : 期末残高（円。行直下の値は比較対象に指定したセグメント1タグの合計、segment_1_tags 配下の値は各タグの金額）

注意点
対象の会計年度で製造業向け機能を使用する設定になっている必要があります。無効の場合はエラー（400）になります。 会計年度が指定されない場合、現在の会計年度がデフォルトとなります。 up_to_dateがfalseの場合、残高の集計が完了していません。最新の集計結果を確認したい場合は、時間を空けて再度取得する必要があります。 配賦仕訳の絞り込み（cost_allocatio...

### パラメータ

GET /api/1/reports/trial_pl_segment_1_tags と同じ

### レスポンス

- trial_cr_segment_1_tags*: object
- up_to_date*: boolean - 集計結果が最新かどうか。`false` の場合は残高の集計が完了していないため、時間を置いてから再取得してください。
- up_to_date_reasons: array[object] - 集計が最新でない場合の要因情報。`up_to_date=false` のときのみ要因が含まれ、`up_to_date=true` のときは空配列となる。

## GET /api/1/reports/trial_cr_segment_2_tags — 製造原価報告書(セグメント２比較)の取得

概要 指定した事業所の製造原価報告書(セグメント2比較)を取得します。指定したセグメント2タグ（最大5つ）ごとの期末残高を並べて比較する用途に利用できます。

定義
created_at : 作成日時（ISO 8601, JST） account_item_name : 勘定科目名 hierarchy_level : 階層レベル（1が最上位、値が大きいほど深い階層） parent_account_category_name : 上位勘定科目カテゴリー名 closing_balance : 期末残高（円。行直下の値は比較対象に指定したセグメント2タグの合計、segment_2_tags 配下の値は各タグの金額）

注意点
対象の会計年度で製造業向け機能を使用する設定になっている必要があります。無効の場合はエラー（400）になります。 会計年度が指定されない場合、現在の会計年度がデフォルトとなります。 up_to_dateがfalseの場合、残高の集計が完了していません。最新の集計結果を確認したい場合は、時間を空けて再度取得する必要があります。 配賦仕訳の絞り込み（cost_allocatio...

### パラメータ

GET /api/1/reports/trial_pl_segment_2_tags と同じ

### レスポンス

- trial_cr_segment_2_tags*: object
- up_to_date*: boolean - 集計結果が最新かどうか。`false` の場合は残高の集計が完了していないため、時間を置いてから再取得してください。
- up_to_date_reasons: array[object] - 集計が最新でない場合の要因情報。`up_to_date=false` のときのみ要因が含まれ、`up_to_date=true` のときは空配列となる。

## GET /api/1/reports/trial_cr_segment_3_tags — 製造原価報告書(セグメント３比較)の取得

概要 指定した事業所の製造原価報告書(セグメント3比較)を取得します。指定したセグメント3タグ（最大5つ）ごとの期末残高を並べて比較する用途に利用できます。

定義
created_at : 作成日時（ISO 8601, JST） account_item_name : 勘定科目名 hierarchy_level : 階層レベル（1が最上位、値が大きいほど深い階層） parent_account_category_name : 上位勘定科目カテゴリー名 closing_balance : 期末残高（円。行直下の値は比較対象に指定したセグメント3タグの合計、segment_3_tags 配下の値は各タグの金額）

注意点
対象の会計年度で製造業向け機能を使用する設定になっている必要があります。無効の場合はエラー（400）になります。 会計年度が指定されない場合、現在の会計年度がデフォルトとなります。 up_to_dateがfalseの場合、残高の集計が完了していません。最新の集計結果を確認したい場合は、時間を空けて再度取得する必要があります。 配賦仕訳の絞り込み（cost_allocatio...

### パラメータ

GET /api/1/reports/trial_pl_segment_3_tags と同じ

### レスポンス

- trial_cr_segment_3_tags*: object
- up_to_date*: boolean - 集計結果が最新かどうか。`false` の場合は残高の集計が完了していないため、時間を置いてから再取得してください。
- up_to_date_reasons: array[object] - 集計が最新でない場合の要因情報。`up_to_date=false` のときのみ要因が含まれ、`up_to_date=true` のときは空配列となる。
