# partner_management_orderer_task_line_items

partner_management_orderer_task_line_items

## GET /hub/partner_management/orderer/tasks/{task_id}/task_line_items — タスク品目一覧取得（β版）

指定したタスクに紐づくタスク品目を一覧取得する

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- company_id*: integer(int64) - freee事業所ID
- task_id* (path): integer(int32) - 取得対象のタスクID
- page_size: integer(int32) - 1ページあたりの取得件数（デフォルト20、最大100）
- page_token: string - カーソルトークン。前回レスポンスの next_page_token を指定する

### レスポンス

タスク品目一覧レスポンス
- data*: array[object] - タスク品目の一覧。タスク内の表示順で返す
- next_page_token*: string - 次ページのカーソルトークン。最終ページは null

## POST /hub/partner_management/orderer/tasks/{task_id}/task_line_items — タスク品目作成（β版）

指定したタスクにタスク品目を 1 件追加する。タスクが請求書に紐づいておらず、かつタスクが提出済み・差し戻し・検収済み・キャンセル以外のステータスの場合であれば品目の追加が可能。 ##

注意点
- 同じタスクへの別の更新が実行中で、一定時間待機しても完了しなかった場合は 409 を返す

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- task_id* (path): integer(int32) - 追加先のタスクID

### リクエストボディ*

- company_id*: integer(int64) - freee事業所ID 例: `1`
- item_calculation_type*: string - 品目種別 (normal: 通常)。現仕様では「通常」のみ作成可能。作成後の変更は不可。 (選択肢: normal)
- title*: string - 品目名 例: `LP デザイン制作`
- estimate_quantity: string(decimal) - 数量。発注額未定のタスクでは省略できる。それ以外のタスクでは必須。
  企業設定で「小数点入力の利用設定」が有効な場合のみ小数での設定が可能。
  企業設定「タスク作成時に数量0を許容」が有効なら 0 以上、無効なら 0 より大きい値 例: `1.0`
- quantity_unit: string - 単位。省略した場合は「件」が入る。発注額未定のタスクでは空文字も指定できる。 例: `件`
- estimate_unit_price: string(decimal) - 発注単価 (税抜き)。0 より大きく 100,000,000 未満。発注額未定のタスクでは省略できる。それ以外のタスクでは必須。 例: `300000.0`
- sales_tax_rate_type*: string - 消費税設定 (rate_8: 8 %, rate_8_keigen: 軽減 8 %, rate_10: 10 %, disregarded: 対象外) (選択肢: rate_8, rate_8_keigen, rate_10, disregarded)
- account_title_id: integer(int64) - 勘定科目ID。企業設定の「勘定科目の必須化」が有効なとき必須
- subsidiary_account_title_id: integer(int64) - 補助科目ID。企業設定の「補助科目の必須化」が有効で、勘定科目に補助科目が登録されているとき必須
- section_id: integer(int64) - 部門ID。企業設定の「部門の必須化」が有効なとき必須
- freee_integration_item: object - freee会計項目。事前にサービス連携設定画面の「freee会計項目のマスタ連携」より事前同期を完了させること。
  - freee_account_item_identifier: integer(int64) - freee会計の勘定科目ID
  - freee_section_identifier: integer(int64) - freee会計の部門ID
  - freee_item_identifier: integer(int64) - freee会計の品目ID
  - freee_tag_identifiers: array[integer] - freee会計のメモタグIDの配列
  - freee_segment_1_tag_identifier: integer(int64) - freee会計のセグメントタグID (セグメント1)。プロプラン以上で指定できる
  - freee_segment_2_tag_identifier: integer(int64) - freee会計のセグメントタグID (セグメント2)。アドバンスプラン以上で指定できる
  - freee_segment_3_tag_identifier: integer(int64) - freee会計のセグメントタグID (セグメント3)。アドバンスプラン以上で指定できる
- custom_field_values: array[object] - タスク品目のカスタム項目。
  カスタム項目側で必須設定のものは、必ず配列に含めたうえで値を設定すること。
  配列の要素:
    - custom_field_id*: integer(int64) - 入力対象のカスタム項目ID
    - value: string - 入力値。data_type によらず文字列で指定。カスタム項目側で必須設定のものは設定必須。
- change_reason: string - 発注書の金額修正理由。企業設定の「タスクおよび請求書の金額の修正理由の必須化」が有効で、紐づくタスクのステータスが「下書き」ではない場合、入力必須

### レスポンス

タスク品目作成レスポンス
- id*: integer(int64) - タスク品目ID
- item_calculation_type*: string - 品目種別 (normal: 通常, variable_work_time: 精算幅, time_based: 時間単価)。作成後は変更不可
- title*: string - 品目名
- estimate_quantity*: string(decimal) - 発注時の数量
- quantity*: string(decimal) - 提出時の数量。未提出のタスクでは estimate_quantity と同じ値が入り、提出時に数量が変更された場合に上書きされる。ただし品目種別が時間単価の場合は提出時の稼働時間から算出されるため、未提出では null
- quantity_unit*: string - 単位
- estimate_unit_price*: string(decimal) - 発注単価 (税抜き)。
  通常: 入力した単価。estimate_quantity と掛けたものが estimate_total になる。
  時間単価: 1 時間あたりの単価。
  精算幅: 稼働時間が精算幅 (deduction_threshold 〜 excess_threshold) に収まり、超過も控除も発生しない場合の単価。
  金額の閲覧権限が無い場合は null
- unit_price*: string(decimal) - 実績単価 (税抜き)。未提出のタスクでは estimate_unit_price と同じ値が入り、提出時に精算幅の控除・超過が発生した場合に上書きされる。金額の閲覧権限が無い場合は null
- sales_tax_rate_type*: string - 消費税率 (rate_8: 8 %, rate_8_keigen: 軽減 8 %, rate_10: 10 %, disregarded: 対象外)。金額の閲覧権限が無い場合は null
- estimate_total*: integer(int32) - 発注額 (税抜き)。estimate_unit_price × estimate_quantity を算出して保存する。金額の閲覧権限が無い場合と発注額が未確定の場合は null
- total*: integer(int32) - 提出時の金額 (税抜き)。未提出のタスクでは estimate_total と同じ値が入り、提出時に数量や単価が変更された場合に上書きされる。提出時の数量が無い場合 (品目種別が時間単価で未提出のとき) は null。金額の閲覧権限が無い場合と発注額が未確定の場合は null
- work_time_minutes*: integer(int32) - 稼働時間 (分)。提出時の入力値。品目種別が精算幅 / 時間単価の場合のみ値が入る。金額の閲覧権限が無い場合は null
- work_report_target*: boolean - 作業報告対象にするか
- item_work_time_variation_rule*: object - 精算幅の設定。品目種別が精算幅の場合のみ値が入る。金額の閲覧権限が無い場合は null
- item_time_based_rule*: object - 時間単価の設定。品目種別が時間単価の場合のみ値が入る。金額の閲覧権限が無い場合は null
- account_title_id*: integer(int64) - 勘定科目ID
- subsidiary_account_title_id*: integer(int64) - 補助科目ID。企業設定で補助科目が有効な場合のみ値が入る
- section_id*: integer(int64) - 部門ID
- freee_integration_item*: object - freee会計項目。企業が freee 会計と連携している場合のみ値が入る
- created_at*: string(date-time) - 作成日時
- custom_fields*: array[object] - 作成されたタスク品目のカスタム項目
- change_reason: string - 発注書の金額修正理由。リクエストで送られた値をそのまま返却

## PATCH /hub/partner_management/orderer/task_line_items/{id} — タスク品目更新（β版）

タスク品目を部分的に更新する。リクエストに含まれないフィールドは更新対象外。タスクが請求書に紐づいておらず、かつタスクが提出済み・差し戻し・検収済み・キャンセル以外のステータスの場合であれば、品目名・数量・単価・単位・消費税の値を更新可能。タスクが検収済み・キャンセル以外のステータスの場合、かつタスク品目が紐づく請求書が仮締めまたは本締めされていない場合であれば、勘定科目・補助科目・部門・freee会計項目・カスタム項目の値を更新可能。 ##

注意点
- 同じタスクへの別の更新が実行中で、一定時間待機しても完了しなかった場合は 409 を返す

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- id* (path): integer(int64) - 更新対象のタスク品目ID

### リクエストボディ*

- company_id*: integer(int64) - freee事業所ID 例: `1`
- title: string - 品目名。 例: `LP デザイン制作（改訂）`
- estimate_quantity: string(decimal) - 数量。企業設定で「小数点入力の利用設定」が有効な場合のみ小数での設定が可能。
  企業設定「タスク作成時に数量0を許容」が有効なら 0 以上、無効なら 0 より大きい値。
  発注額が未定の場合は null 許容。 例: `2.0`
- quantity_unit: string - 単位。発注額未定のタスクでは空文字を指定できる 例: `件`
- estimate_unit_price: string(decimal) - 発注単価 (税抜き)。0 より大きく 100,000,000 未満。発注額が未定の場合は null 許容 例: `150000.0`
- sales_tax_rate_type: string - 消費税設定 (rate_8: 8 %, rate_8_keigen: 軽減 8 %, rate_10: 10 %, disregarded: 対象外) (選択肢: rate_8, rate_8_keigen, rate_10, disregarded)
- account_title_id: integer(int64) - 勘定科目ID。
- subsidiary_account_title_id: integer(int64) - 補助科目ID。
- section_id: integer(int64) - 部門ID。
- freee_integration_item: object - freee会計項目。事前にサービス連携でfreee連携用の同期アカウントの設定が必要。指定されたキーのみ更新し、未指定（省略）のキーは現状維持。キーの値を削除する場合は null を指定 (freee_tag_identifiers は空配列)。更新後に全項目が空になった場合は freee会計項目のレコード自体が削除される。
  - freee_account_item_identifier: integer(int64) - freee 会計の勘定科目 ID。null 指定で設定解除
  - freee_section_identifier: integer(int64) - freee 会計の部門 ID。null 指定で設定解除
  - freee_item_identifier: integer(int64) - freee 会計の品目 ID。null 指定で設定解除
  - freee_tag_identifiers: array[integer] - freee 会計のメモタグ ID の配列 (複数選択可)。指定した配列で全置換（指定に含まれない既存のメモタグは解除）。空配列で全解除
  - freee_segment_1_tag_identifier: integer(int64) - freee 会計のセグメントタグ ID。プロプラン以上のときのみ設定可能。null 指定で設定解除
  - freee_segment_2_tag_identifier: integer(int64) - freee 会計のセグメントタグ ID。アドバンスプラン以上のときのみ設定可能。null 指定で設定解除
  - freee_segment_3_tag_identifier: integer(int64) - freee 会計のセグメントタグ ID。アドバンスプラン以上のときのみ設定可能。null 指定で設定解除
- custom_field_values: array[object] - タスク品目のカスタム項目。custom_field_id で突き合わせて更新する差分適用で、配列に含まれないカスタム項目の値は変更しない。フィールド自体の省略時は処理をスキップ。ただし、本フィールドを指定した場合、カスタム項目側で必須設定のものは配列に含めなくても値が空ならバリデーションエラー（422）となる
  配列の要素:
    - custom_field_id*: integer(int64) - 入力対象のカスタム項目ID
    - value: string - 入力値。data_type に関わらず文字列で指定。指定した値で更新し、値を削除する場合は空文字を設定。カスタム項目側で必須設定のものは空にできない
- change_reason: string - 発注書の金額修正理由。企業設定の「タスクおよび請求書の金額の修正理由の必須化」が有効で、紐づくtaskのステータスが「下書き」ではない場合、金額に関わる項目を変更するなら入力必須

### レスポンス

タスク品目更新レスポンス
- id*: integer(int64) - タスク品目ID
- item_calculation_type*: string - 品目種別 (normal: 通常, variable_work_time: 精算幅, time_based: 時間単価)。作成後は変更不可
- title*: string - 品目名
- estimate_quantity*: string(decimal) - 発注時の数量
- quantity*: string(decimal) - 提出時の数量。未提出のタスクでは estimate_quantity と同じ値が入り、提出時に数量が変更された場合に上書きされる。ただし品目種別が時間単価の場合は提出時の稼働時間から算出されるため、未提出では null
- quantity_unit*: string - 単位
- estimate_unit_price*: string(decimal) - 発注単価 (税抜き)。
  通常: 入力した単価。estimate_quantity と掛けたものが estimate_total になる。
  時間単価: 1 時間あたりの単価。
  精算幅: 稼働時間が精算幅 (deduction_threshold 〜 excess_threshold) に収まり、超過も控除も発生しない場合の単価。
  金額の閲覧権限が無い場合は null
- unit_price*: string(decimal) - 実績単価 (税抜き)。未提出のタスクでは estimate_unit_price と同じ値が入り、提出時に精算幅の控除・超過が発生した場合に上書きされる。金額の閲覧権限が無い場合は null
- sales_tax_rate_type*: string - 消費税率 (rate_8: 8 %, rate_8_keigen: 軽減 8 %, rate_10: 10 %, disregarded: 対象外)。金額の閲覧権限が無い場合は null
- estimate_total*: integer(int32) - 発注額 (税抜き)。estimate_unit_price × estimate_quantity を算出して保存する。金額の閲覧権限が無い場合と発注額が未確定の場合は null
- total*: integer(int32) - 提出時の金額 (税抜き)。未提出のタスクでは estimate_total と同じ値が入り、提出時に数量や単価が変更された場合に上書きされる。提出時の数量が無い場合 (品目種別が時間単価で未提出のとき) は null。金額の閲覧権限が無い場合と発注額が未確定の場合は null
- work_time_minutes*: integer(int32) - 稼働時間 (分)。提出時の入力値。品目種別が精算幅 / 時間単価の場合のみ値が入る。金額の閲覧権限が無い場合は null
- work_report_target*: boolean - 作業報告対象にするか
- item_work_time_variation_rule*: object - 精算幅の設定。品目種別が精算幅の場合のみ値が入る。金額の閲覧権限が無い場合は null
- item_time_based_rule*: object - 時間単価の設定。品目種別が時間単価の場合のみ値が入る。金額の閲覧権限が無い場合は null
- account_title_id*: integer(int64) - 勘定科目ID
- subsidiary_account_title_id*: integer(int64) - 補助科目ID。企業設定で補助科目が有効な場合のみ値が入る
- section_id*: integer(int64) - 部門ID
- freee_integration_item*: object - freee会計項目。企業が freee 会計と連携している場合のみ値が入る
- created_at*: string(date-time) - 作成日時
- custom_fields*: array[object] - タスク品目のカスタム項目
- change_reason: string - 発注書の金額修正理由。リクエストで送られた値をそのまま返却
