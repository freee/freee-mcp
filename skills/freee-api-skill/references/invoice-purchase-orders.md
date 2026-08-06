# PurchaseOrders

発注書

## GET /purchase_orders — 発注書一覧の取得


発注書の一覧を返します。

### パラメータ

- company_id*: integer(int64) - 事業所ID
- purchase_order_number: string - 発注書番号
- subject: string - 件名
- partner_ids: string - 取引先ID（半角数字のidを半角カンマ区切りスペースなしで指定してください。最大3件まで指定できます。）
- deal_status: string - 取引ステータス（registered: 登録済み、 unregistered: 登録待ち） (選択肢: registered, unregistered)
- sending_status: string - 送付ステータス（sent: 送付済み、 unsent: 送付待ち） (選択肢: sent, unsent)
- cancel_status: string - 取消済み（canceled: 該当する、 uncanceled: 該当しない） (選択肢: canceled, uncanceled)
- payment_status: string - 決済ステータス（unsettled: 決済待ち, settled: 決済済み） (選択肢: settled, unsettled)
- start_purchase_order_date: string(date) - 発注日の開始日
- end_purchase_order_date: string(date) - 発注日の終了日
- start_collects_on: string(date) - 支払予定日の開始日
- end_collects_on: string(date) - 支払予定日の終了日
- limit: integer - 取得レコードの件数 (デフォルト: 20, 最小: 1, 最大: 100)。limit と offset の合計は 10,000 を超えることはできません。
- offset: integer - 取得レコードのオフセット (デフォルト: 0)。limit と offset の合計は 10,000 を超えることはできません。

### レスポンス

The request has succeeded.
- purchase_orders*: array[object]

## POST /purchase_orders — 発注書の作成


発注書の作成をします。 issue_date, account_item_id, tax_code, item_id, section_id, tag_ids, segment_1_tag_id, segment_2_tag_id, segment_3_tag_id は、取引登録の下書き保存で利用されます。 tag_idsは10個まで設定可能です。

### リクエストボディ*

- company_id*: integer(int64) - 事業所ID (最小: 1, 最大: 9223372036854775000)
- template_id: integer(int64) - 帳票テンプレートID（指定しない場合、事業所の既定のテンプレートが指定されます。） (最小: 1, 最大: 9223372036854775000)
- purchase_order_number: string - 発注書番号

  - 採番の設定が、[自動採番する]の場合、指定できません。
  - 採番の設定が、[自動採番する]以外の場合、必須になります。
- branch_no: integer - 枝番 (最小: 0, 最大: 2147483647)
- purchase_order_date*: string(date) - 発注日 (パターン: ^[0-9]{4}-[0-9]{2}-[0-9]{2}$)
- issue_date: string(date) - 発生日（取引登録の下書き保存で利用されます。）
  - 入力がない場合、発注日が補完されます。 (パターン: ^[0-9]{4}-[0-9]{2}-[0-9]{2}$)
- subject: string - 件名
- tax_entry_method*: string - 消費税の内税・外税区分（in: 税込表示（内税）、out: 税別表示（外税）） (選択肢: in, out)
- tax_fraction*: string - 消費税端数の計算方法（omit: 切り捨て、round_up: 切り上げ、round: 四捨五入） (選択肢: omit, round_up, round)
- line_amount_fraction: string - 金額端数の計算方法（omit: 切り捨て、round_up: 切り上げ、round: 四捨五入） (選択肢: omit, round_up, round)
- withholding_tax_entry_method*: string - 源泉徴収の計算方法（in: 税込み価格で計算、out: 税別価格で計算） (選択肢: in, out)
- purchase_order_note: string - 発注書備考
- collects_on: string(date) - 支払予定日
  - 発注日（purchase_order_date）以降の日付を指定してください。 (パターン: ^[0-9]{4}-[0-9]{2}-[0-9]{2}$)
- delivery_deadline: string - 納品期限
- delivery_location: string - 納品場所
- payment_condition: string - 支払条件
- memo: string - 社内メモ
- partner_id: integer(int64) - 取引先ID

  取引先IDと取引先コードはどちらか一方を必ず指定してください。

  取引先役割に関してはヘルプページを御覧ください。 (最小: 1, 最大: 9223372036854775000)
- partner_code: string - 取引先コード

  取引先コードと取引先IDはどちらか一方を必ず指定してください。

  取引先役割に関してはヘルプページを御覧ください。
- partner_title*: string - 敬称（御中、様、(空白)の3つから選択）
  - [非推奨]全角カッコの（空白）は削除予定です。
  - 全角カッコの（空白）を指定した場合、はレスポンスは、半角カッコの(空白)になります。 (選択肢: 御中, 様, (空白), （空白）)
- partner_address_zipcode: string - 郵便番号
  - 入力がない場合、帳票に指定されたpartner_id, partner_codeに紐づく郵便番号が利用されます。 (パターン: ^[0-9]{3}-?[0-9]{4}$)
- partner_address_prefecture_code: integer - 都道府県コード（-1: 設定しない、0: 北海道、1:青森、2:岩手、3:宮城、4:秋田、5:山形、6:福島、7:茨城、8:栃木、9:群馬、10:埼玉、11:千葉、12:東京、13:神奈川、14:新潟、15:富山、16:石川、17:福井、18:山梨、19:長野、20:岐阜、21:静岡、22:愛知、23:三重、24:滋賀、25:京都、26:大阪、27:兵庫、28:奈良、29:和歌山、30:鳥取、31:島根、32:岡山、33:広島、34:山口、35:徳島、36:香川、37:愛媛、38:高知、39:福岡、40:佐賀、41:長崎、42:熊本、43:大分、44:宮崎、45:鹿児島、46:沖縄）
  - 入力がない場合、帳票に指定されたpartner_id, partner_codeに紐づく都道府県コードが利用されます。 (最小: -1, 最大: 46)
- partner_address_street_name1: string - 取引先 市区町村・番地
  - 入力がない場合、帳票に指定されたpartner_id, partner_codeに紐づく取引先 市区町村・番地が利用されます。
- partner_address_street_name2: string - 取引先 建物名・部屋番号など
  - 入力がない場合、帳票に指定されたpartner_id, partner_codeに紐づく取引先 建物名・部屋番号などが利用されます。
- partner_contact_department: string - 取引先部署
  - 入力がない場合、帳票に指定されたpartner_id, partner_codeに紐づく取引先部署が利用されます。
- partner_contact_name: string - 取引先担当者名
  - 入力がない場合、帳票に指定されたpartner_id, partner_codeに紐づく取引先担当者名が利用されます。
- partner_display_name: string - 取引先宛名
  - 帳票の宛名に利用されます。
  - 入力がない場合、帳票に指定されたpartner_id, partner_codeに紐づく取引先名称が利用されます。
- company_contact_name: string - 自社担当者(デフォルトは表示ユーザー名が補完されます)
- company_name: string - 自社名を上書きする場合に指定します。
- company_description: string - 自社説明を上書きする場合に指定します。
- lines*: array[object] - 発注書の明細行
  配列の要素:
    - type: string - 明細の種類
      - item: 品目行
      - tax_rate、quantityは必須になります。
      - text: テキスト行
      - descriptionのみ入力可能です。
      - 入力がない場合、itemが利用されます。 (選択肢: item, text)
    - description: string - 摘要（品名）
    - unit: string - 明細の単位名
    - quantity: number - 明細の数量 (整数部は8桁まで、小数部は3桁まで) (最小: -99999999.999, 最大: 99999999.999)
    - unit_price: string - 明細の単価 (整数部は13桁まで、小数部は3桁まで) (パターン: ^-?[0-9]{0,13}(\.[0-9]{1,3})?$)
    - tax_rate: number - 税率（%）（帳票の税額計算に用います。） (選択肢: 0, 8, 10)
    - reduced_tax_rate: boolean - 軽減税率対象（true: 対象、 false: 対象外）trueはtax_rate:8の時のみ指定可能です。
    - withholding: boolean - 源泉徴収対象
    - account_item_id: integer - 勘定科目ID（取引登録の下書き保存で利用されます。） (最小: 1, 最大: 2147483647)
    - tax_code: integer - 税区分コード（取引登録の下書き保存で利用されます。） (最小: 0, 最大: 2147483647)
    - item_id: integer - 品目ID（取引登録の下書き保存で利用されます。） (最小: 1, 最大: 2147483647)
    - section_id: integer - 部門ID

      - 取引登録の下書き保存で利用されます。
      - 親部門は利用できません。
      - グループ管理で制限された部門は利用できません。

      グループ管理の設定はヘルプページを御覧ください。 (最小: 1, 最大: 2147483647)
    - tag_ids: array[integer]
    - segment_1_tag_id: integer(int64) - セグメント１ID

      - 取引登録の下書き保存で利用されます。
      - freee会計法人向け プロフェッショナルプラン以上で利用可能です。

      セグメント（分析用タグ）の設定はヘルプページを御覧ください。 (最小: 1, 最大: 9223372036854775000)
    - segment_2_tag_id: integer(int64) - セグメント２ID

      - 取引登録の下書き保存で利用されます。
      - freee会計法人向け エンタープライズプランで利用可能です。

      セグメント（分析用タグ）の設定はヘルプページを御覧ください。 (最小: 1, 最大: 9223372036854775000)
    - segment_3_tag_id: integer(int64) - セグメント３ID

      - 取引登録の下書き保存で利用されます。
      - freee会計法人向け エンタープライズプランで利用可能です。

      セグメント（分析用タグ）の設定はヘルプページを御覧ください。 (最小: 1, 最大: 9223372036854775000)

### レスポンス

The request has succeeded and a new resource has been created as a result.
- purchase_order*: object

## GET /purchase_orders/templates — 使用可能な発注書の帳票テンプレート一覧の取得


使用可能な発注書の帳票テンプレート一覧を返します。

### パラメータ

- company_id*: integer(int64) - 事業所ID

### レスポンス

The request has succeeded.
- templates*: array[object]

## GET /purchase_orders/{id} — 発注書の取得


指定されたIDの発注書を返します。

### パラメータ

- company_id*: integer(int64) - 事業所ID
- id* (path): integer - 発注書ID

### レスポンス

The request has succeeded.
- purchase_order*: object

## PUT /purchase_orders/{id} — 発注書の更新


発注書の更新をします。 issue_date, account_item_id, tax_code, item_id, section_id, tag_ids, segment_1_tag_id, segment_2_tag_id, segment_3_tag_id は、取引登録の下書き保存で利用されます。 tag_idsは10個まで設定可能です。

### パラメータ

- id* (path): integer - 発注書ID

### リクエストボディ*

POST /purchase_orders と同じ

### レスポンス

GET /purchase_orders/{id} と同じ

## PUT /purchase_orders/{id}/cancel — 発注書の取消


指定された発注書を取消状態にします。 取引が紐づいている場合は取引も削除されます。

### パラメータ

PUT /purchase_orders/{id} と同じ

### リクエストボディ*

- company_id*: integer(int64) - 事業所ID (最小: 1, 最大: 9223372036854775000)

### レスポンス

GET /purchase_orders/{id} と同じ

## PUT /purchase_orders/{id}/uncancel — 取消された発注書の復元


指定された取消済み発注書を復元します。

### パラメータ

PUT /purchase_orders/{id} と同じ

### リクエストボディ*

PUT /purchase_orders/{id}/cancel と同じ

### レスポンス

GET /purchase_orders/{id} と同じ
