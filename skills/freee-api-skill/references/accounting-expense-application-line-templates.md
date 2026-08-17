# Expense application line templates

経費科目

## GET /api/1/expense_application_line_templates — 経費科目一覧の取得

概要 指定した事業所の経費科目一覧を取得する 経費科目は、経費申請の作成時に申請者が選択する項目で、勘定科目・税区分・品目などの組み合わせをあらかじめ設定したものです。

注意点
カスタム申請項目を含むなど、Web版freee会計専用の設定を含む経費科目も一覧には含まれます。ただし、これらの経費科目は経費科目の取得・更新APIでは404エラーになります。

### パラメータ

- company_id*: integer(int64) - 事業所ID
- offset: integer(int64) - 取得レコードのオフセット (デフォルト: 0)
- limit: integer(int64) - 取得レコードの件数 (デフォルト: 20, 最小: 1, 最大: 100)

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

### レスポンス

- expense_application_line_template*: object

## GET /api/1/expense_application_line_templates/{id} — 経費科目の取得

概要 指定した事業所の経費科目を取得する

注意点
以下のいずれかに該当する経費科目はWeb版freee会計専用のため、本APIでは404エラーになります（経費科目一覧の取得APIでは取得できます）。 カスタム申請項目を含む 内容の入力設定が「必須」以外 金額の設定が「なし」以外

### パラメータ

- id* (path): integer(int64) - 経費科目ID
- company_id*: integer(int64) - 事業所ID

### レスポンス

POST /api/1/expense_application_line_templates と同じ

## PUT /api/1/expense_application_line_templates/{id} — 経費科目の更新

概要 指定した事業所の経費科目を更新する

注意点
本APIはリクエストボディで指定した内容への全置換で更新します。任意パラメータ（item_id, description, line_description, required_receipt）を未指定にした場合、その項目は未設定（required_receiptは任意 = false）にリセットされます。更新前の値を維持したい場合は、経費科目の取得APIで現在の値を確認し、すべてのパラメータを指定してください。 以下のいずれかに該当する経費科目はWeb版freee会計専用のため、本APIでは404エラーになります。 カスタム申請項目を含む 内容の入力設定が「必須」以外 金額の設定が「なし」以外

### パラメータ

- id* (path): integer(int64) - 経費科目ID

### リクエストボディ*

POST /api/1/expense_application_line_templates と同じ

### レスポンス

POST /api/1/expense_application_line_templates と同じ

## DELETE /api/1/expense_application_line_templates/{id} — 経費科目の削除

概要 指定した事業所の経費科目を削除する

### パラメータ

GET /api/1/expense_application_line_templates/{id} と同じ
