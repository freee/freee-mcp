# Expense application line templates

経費科目

## GET /api/1/expense_application_line_templates — 経費科目一覧の取得

概要 指定した事業所の経費科目一覧を取得する 経費科目は、経費申請の作成時に申請者が選択する項目で、勘定科目・税区分・品目などの組み合わせをあらかじめ設定したものです。

### パラメータ

- company_id*: integer(int64) - 事業所ID
- offset: integer(int64) - 取得レコードのオフセット (デフォルト: 0)
- limit: integer(int64) - 取得レコードの件数 (デフォルト: 20, 最小: 1, 最大: 100)
- section_ids[]: array[integer] - 申請部門ID。指定した場合、指定部門と認証ユーザー（申請者）で利用可能な経費科目のみを返します。指定しない場合は利用可能範囲による絞り込みを行わず、従来どおりの経費科目を返します。

### レスポンス

- expense_application_line_templates*: array[object]

## POST /api/1/expense_application_line_templates — 経費科目の作成

概要 指定した事業所の経費科目を作成する

注意点
作成された経費科目のsource_line_template_idには、作成された経費科目自身のIDが設定されます。 required_receiptを未指定で作成した場合、添付ファイルは任意（false）になります。 item_idで品目を紐付けた場合でも、レスポンスに品目IDは含まれません。

### リクエストボディ*

- company_id*: integer(int64) - 事業所ID 例: `1` (最小: 1)
- name*: string - 経費科目名 (1000文字以内) 例: `交通費`
- account_item_id*: integer(int64) - 経費科目に紐付ける勘定科目のID。指定した事業所に存在する勘定科目のIDのみ指定可能です（存在しない場合は400エラー）。勘定科目IDは /account_items のAPIから取得可能です。 例: `1` (最小: 1)
- item_id: integer(int64) - 経費科目に紐付ける品目のID。指定した事業所に存在する品目のIDのみ指定可能です（存在しない場合は400エラー）。勘定科目と品目の紐付けが設定されている事業所では、指定した勘定科目に紐付く品目のみ指定可能です。品目IDは /items のAPIから取得可能です。なお、レスポンスに品目IDは含まれません。 例: `1` (最小: 1)
- tax_code*: integer(int64) - 経費科目に紐付ける税区分コード（税区分のdisplay_categoryがtax_5: 5%表示の税区分, tax_r8: 軽減税率8%表示の税区分に該当するtax_codeのみ利用可能です。それ以外のtax_codeを指定した場合は400エラーになります。税区分のdisplay_categoryは /taxes/companies/{company_id}のAPIから取得可能です。） 例: `1` (最小: 0, 最大: 2147483647)
- description: string - 経費科目の説明 (1000文字以内) 例: `電車、バス、飛行機などの交通費`
- line_description: string - 内容の補足 (1000文字以内)。経費申請の作成時に内容欄へ何を入力すべきかを申請者に案内する文言 例: `移動区間`
- required_receipt: boolean - 添付ファイルの必須/任意

  falseを指定した時は申請時の領収書の添付を任意とします。

  trueを指定した時は申請時の領収書の添付を必須とします。

  未指定の時は申請時の領収書の添付を任意とします。 例: `true`
- line_content_setting: string - 内容の入力設定（optional: 経費申請の作成時に内容欄の入力が任意, required: 内容欄の入力が必須, disable: 内容欄を表示しない）

  作成時に未指定の場合はrequiredになります。

  更新時に省略した場合は変更しません（他の基本項目と異なり全置換の対象外です）。 (選択肢: optional, required, disable) 例: `required`
- available_section_ids: array[integer] - 利用可能な部門IDの配列。経費申請の部門が指定した部門のいずれかの場合に、この経費科目を選択できます（申請者の所属部門ではなく、経費申請で指定した部門で判定します）。

  available_user_idsと両方を設定した場合は、どちらかの設定に該当すれば選択できます。両方が空の場合は制限なしとなり、全従業員が選択できます。

  空配列を指定すると部門による制限を解除します。更新時に省略した場合は変更しません。 例: `[1,2]`
- available_user_ids: array[integer] - 利用可能な事業所メンバー (ユーザー) IDの配列。経費申請の申請者が指定したメンバーのいずれかの場合に、経費申請の部門に関わらずこの経費科目を選択できます。

  available_section_idsと両方を設定した場合は、どちらかの設定に該当すれば選択できます。両方が空の場合は制限なしとなり、全従業員が選択できます。

  空配列を指定するとメンバーによる制限を解除します。更新時に省略した場合は変更しません。 例: `[10,11]`
- custom_form_parts: array[object] - カスタム申請項目 (20件以内)。配列の並び順が経費申請の作成時の表示順になります。定義はレスポンスと共通で、取得した内容をそのまま送り返せます。
  作成時はidを指定しても無視され、すべて新しい項目として作成されます。
  更新時は指定した内容でカスタム申請項目を全置換します。既存の項目を残す場合はidとkeyを、新しく追加する項目はidを省略してkeyを指定します。
  更新時に省略した場合は変更しません。空配列を指定した場合はカスタム申請項目をすべて削除します。
  配列の要素:
    - id: integer(int64) - カスタム申請項目ID。サーバーが採番し、レスポンスでは常に返します。
      更新時に既存の項目を指す場合だけ指定し、新規に追加する項目では省略します。
      作成時は指定しても無視され、新しいIDが採番されます。取得した経費科目の内容をそのまま送ると、その内容をコピーした経費科目を作成できます。
      経費科目の更新で経費科目が作り直されると振り直されるため、項目を安定して識別する用途にはkeyを使ってください。 例: `1` (最小: 1)
    - key*: string - カスタム申請項目を識別する永続キー。英小文字で始まる1〜64文字の半角英小文字・数字・アンダースコアで、経費科目内で一意です。
      金額計算式からはこのキーを {key} の形式で参照します。
      Web版freee会計で作成した項目など、キーが未設定の項目にはシステムが custom_field_ の後ろにカスタム申請項目IDを付けたキー (例: custom_field_12) を補って返します。
      custom_field_ で始まるキーはシステム採番に予約されているため、新しい項目には指定できません。既存の項目には取得した値をそのまま送り返せます。 例: `transport` (パターン: ^[a-z][a-z0-9_]*$)
    - name*: string - カスタム申請項目名 (255文字以内) 例: `交通手段`
    - type*: string - カスタム申請項目の入力形式 (single_line_string: 一行文字列, multi_line_string: 複数行文字列, date: 日付, date_range: 期間, datetime: 日時, number: 数値, pulldown: プルダウン, checkbox: チェックボックス, radio_button: ラジオボタン)。
      金額計算式から参照できるのは number (入力された数値)、pulldown (選択された選択肢の calculation_value)、date_range (開始日から終了日までの日数) の項目です。 (選択肢: single_line_string, multi_line_string, date, date_range, datetime, number, pulldown, checkbox, radio_button) 例: `pulldown`
    - required*: boolean - 経費申請の作成時にこの項目の入力を必須にするかどうか (true: 必須, false: 任意) 例: `true`
    - annotation*: string - カスタム申請項目の補足説明。未設定の場合はnull 例: `利用した交通手段を選択してください`
    - default_value*: object - カスタム申請項目の初期値。typeに応じた値で指定します (single_line_string: 255文字以内の文字列, multi_line_string: 10000文字以内の文字列, number: 整数部10桁・小数部3桁以内の数値)。
      それ以外のtypeでは初期値を持てないためnullを指定します。未設定の場合はnull 例: `電車`
    - unit*: string - 数値の単位 (255文字以内)。typeがnumberの場合だけ指定できます。未設定の場合はnull 例: `km`
    - options*: array[object] - 選択肢。typeがpulldown、checkbox、radio_buttonの場合に1件以上指定し、それ以外のtypeでは空配列を指定します。
      calculation_valueはpulldownの選択肢を金額計算式から参照するときの評価値で、計算に使わない場合はすべての選択肢でnullにします。calculation_valueを指定する場合はすべての選択肢に指定します。
- amount_calculation_setting: object - 金額計算設定。定義はレスポンスと共通で、取得した内容をそのまま送り返せます。
  計算式はカスタム申請項目のkeyを {key} の形式で参照します。同じリクエストのcustom_form_partsで指定したkeyを参照できます。
  更新時は指定した内容で金額計算設定を全置換します。更新時に省略した場合は変更しません。

### レスポンス

- expense_application_line_template*: object

## GET /api/1/expense_application_line_templates/{id} — 経費科目の取得

概要 指定した事業所の経費科目を取得する

### パラメータ

- id* (path): integer(int64) - 経費科目ID、または経費科目のsource_line_template_id。
  経費科目は設定内容を変更すると経費科目IDが変わることがあります。変更前に取得した経費科目IDと、設定を変更しても変わらないsource_line_template_idのどちらを指定しても、最新の経費科目を操作できます。
- company_id*: integer(int64) - 事業所ID

### レスポンス

POST /api/1/expense_application_line_templates と同じ

## PUT /api/1/expense_application_line_templates/{id} — 経費科目の更新

概要 指定した事業所の経費科目を更新する

注意点
本APIはリクエストボディで指定した内容への全置換で更新します。任意パラメータ（item_id, description, line_description, required_receipt）を未指定にした場合、その項目は未設定（required_receiptは任意 = false）にリセットされます。更新前の値を維持したい場合は、経費科目の取得APIで現在の値を確認し、すべてのパラメータを指定してください。 custom_form_parts と amount_calculation_setting は、パラメータ自体を省略した場合のみ現在の設定を維持します。指定した場合はその内容で全置換し、空配列（custom_form_parts: []）を指定した場合はカスタム申請項目をすべて削除します。既存のカスタム申請項目を残す場合は取得した id と key をそのまま指定してください。 更新内容によっては経費科目が作り直され、レスポンスのidが更新前と変わります。カスタム申請項目や金額計算設定を変更した場合に発生し、custom_f...

### パラメータ

- id* (path): integer(int64) - 経費科目ID、または経費科目のsource_line_template_id。
  経費科目は設定内容を変更すると経費科目IDが変わることがあります。変更前に取得した経費科目IDと、設定を変更しても変わらないsource_line_template_idのどちらを指定しても、最新の経費科目を操作できます。

### リクエストボディ*

POST /api/1/expense_application_line_templates と同じ

### レスポンス

POST /api/1/expense_application_line_templates と同じ

## DELETE /api/1/expense_application_line_templates/{id} — 経費科目の削除

概要 指定した事業所の経費科目を削除する

### パラメータ

GET /api/1/expense_application_line_templates/{id} と同じ
