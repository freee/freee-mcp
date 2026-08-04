# Partners

取引先

## GET /api/1/partners — 取引先一覧の取得

概要 指定した事業所の取引先一覧を取得する 振込元口座ID（payer_walletable_id）, 振込手数料負担（transfer_fee_handling_side）は法人スタータープラン（および旧法人プロフェッショナルプラン）以上で利用可能です。

### パラメータ

- company_id*: integer(int64) - 事業所ID
- start_update_date: string - 更新日で絞り込み：開始日(yyyy-mm-dd)
- end_update_date: string - 更新日で絞り込み：終了日(yyyy-mm-dd)
- offset: integer(int64) - 取得レコードのオフセット (デフォルト: 0)
- limit: integer(int64) - 取得レコードの件数 (デフォルト: 50, 最小: 1, 最大: 3000)
- keyword: string - 検索キーワード

  取引先コード・取引先名・正式名称・カナ名称・ショートカットキー1・2のいずれかに対する部分一致。

  以下のいずれかで区切って複数キーワードを指定した場合はAND検索となります。

  半角スペース

  全角スペース

  タブ

### レスポンス

- partners*: array[object]

## POST /api/1/partners — 取引先の作成

概要 指定した事業所の取引先を作成する 取引先名称（name）は重複不可です。 codeを利用するには、事業所の設定から取引先コードの利用を有効にする必要があります。 取引先コードの利用を有効にしている場合は、 codeの指定は必須です。 name、codeそれぞれ重複不可です。 振込元口座ID（payer_walletable_id）, 振込手数料負担（transfer_fee_handling_side）, 支払期日設定（payment_term_attributes）, 請求の入金期日設定（invoice_payment_term_attributes）は法人スタータープラン（および旧法人プロフェッショナルプラン）以上で利用可能です。

### リクエストボディ

- company_id*: integer(int64) - 事業所ID 例: `1` (最小: 1)
- name*: string - 取引先名 (255文字以内、重複不可) 例: `新しい取引先`
- code: string - 取引先コード（取引先コードの利用を有効にしている場合は、codeの指定は必須です。ただし重複は不可。） 例: `code001`
- shortcut1: string - ショートカット１ (255文字以内) 例: `NEWPARTNER`
- shortcut2: string - ショートカット２ (255文字以内) 例: `502`
- org_code: integer(int64) - 事業所種別（null: 未設定、1: 法人、2: 個人） (選択肢: 1, 2) 例: `1`
- country_code: string - 地域（JP: 国内、ZZ:国外）、指定しない場合JPになります。 (選択肢: JP, ZZ) 例: `JP`
- long_name: string - 正式名称（255文字以内） 例: `新しい取引先正式名称`
- name_kana: string - カナ名称（255文字以内） 例: `アタラシイトリヒキサキメイショウ`
- default_title: string - 敬称（御中、様、(空白)の3つから選択） 例: `御中`
- phone: string - 電話番号 例: `03-1234-xxxx`
- contact_name: string - 担当者 氏名 (255文字以内) 例: `営業担当`
- email: string - 担当者 メールアドレス (255文字以内) 例: `contact@example.com`
- payer_walletable_id: integer(int64) - 振込元口座ID（一括振込ファイル用）:（walletableのtypeが'bank_account'のidのみ指定できます。また、未設定にする場合は、nullを指定してください。） 例: `1` (最小: 1)
- transfer_fee_handling_side: string - 振込手数料負担（一括振込ファイル用）: (振込元(当方): payer, 振込先(先方): payee)、指定しない場合payerになります。 (選択肢: payer, payee) 例: `payer`
- qualified_invoice_issuer: boolean - インボイス制度適格請求書発行事業者（true: 対象事業者、false: 非対象事業者）
  国税庁インボイス制度適格請求書発行事業者公表サイト 例: `false`
- invoice_registration_number: string - インボイス制度適格請求書発行事業者登録番号
  - 先頭T数字13桁の固定14桁の文字列
  国税庁インボイス制度適格請求書発行事業者公表サイト 例: `T1000000000001` (パターン: ^T?[1-9][0-9]{12}$)
- address_attributes: object
  - zipcode: string - 郵便番号（8文字以内） 例: `000-0000`
  - prefecture_code: integer(int64) - 都道府県コード（-1: 設定しない、0: 北海道、1:青森、2:岩手、3:宮城、4:秋田、5:山形、6:福島、7:茨城、8:栃木、9:群馬、10:埼玉、11:千葉、12:東京、13:神奈川、14:新潟、15:富山、16:石川、17:福井、18:山梨、19:長野、20:岐阜、21:静岡、22:愛知、23:三重、24:滋賀、25:京都、26:大阪、27:兵庫、28:奈良、29:和歌山、30:鳥取、31:島根、32:岡山、33:広島、34:山口、35:徳島、36:香川、37:愛媛、38:高知、39:福岡、40:佐賀、41:長崎、42:熊本、43:大分、44:宮崎、45:鹿児島、46:沖縄 例: `4` (最小: -1, 最大: 46)
  - street_name1: string - 市区町村・番地（255文字以内） 例: `ＸＸ区ＹＹ１−１−１`
  - street_name2: string - 建物名・部屋番号など（255文字以内） 例: `ビル１Ｆ`
- partner_doc_setting_attributes: object
  - sending_method: string - 請求書送付方法(email:メール、posting:郵送、email_and_posting:メールと郵送、pdf_delivery:メール（PDFファイル添付）、pdf_delivery_and_posting:メール（PDFファイル添付）と郵送、null:設定しない) (選択肢: email, posting, email_and_posting, pdf_delivery, pdf_delivery_and_posting) 例: `posting`
- partner_bank_account_attributes: object
  - bank_name: string - 銀行名 例: `freee銀行`
  - bank_name_kana: string - 銀行名（カナ） 例: `フリーギンコウ`
  - bank_code: string - 銀行コード 例: `0001`
  - branch_name: string - 支店名 例: `銀座支店`
  - branch_kana: string - 支店名（カナ） 例: `ギンザシテン`
  - branch_code: string - 支店番号 例: `101`
  - account_type: string - 口座種別(ordinary:普通、checking：当座、earmarked：納税準備預金、savings：貯蓄、other:その他)、指定しない場合ordinaryになります。 例: `ordinary`
  - account_number: string - 口座番号 例: `1010101`
  - long_account_name: string - 受取人名 例: `freee太郎`
  - account_name: string - 受取人名（カナ） 例: `フリータロウ`
- payment_term_attributes: object
  - cutoff_day: integer(int64) - 締め日（29, 30, 31日の末日を指定する場合は、32を指定してください。） 例: `15` (最小: 1, 最大: 32)
  - additional_months: integer(int64) - 支払月（当月を指定する場合は、0を指定してください。） 例: `1` (最小: 0, 最大: 6)
  - fixed_day: integer(int64) - 支払日（29, 30, 31日の末日を指定する場合は、32を指定してください。） 例: `32` (最小: 1, 最大: 32)
- invoice_payment_term_attributes: object
  - cutoff_day: integer(int64) - 締め日（29, 30, 31日の末日を指定する場合は、32を指定してください。） 例: `15` (最小: 1, 最大: 32)
  - additional_months: integer - 入金月（当月を指定する場合は、0を指定してください。） 例: `1` (最小: 0, 最大: 6)
  - fixed_day: integer(int64) - 入金日（29, 30, 31日の末日を指定する場合は、32を指定してください。） 例: `32` (最小: 1, 最大: 32)

### レスポンス

- partner*: object

## GET /api/1/partners/{id} — 取引先の取得

概要 指定した事業所の取引先を取得する 振込元口座ID（payer_walletable_id）, 振込手数料負担（transfer_fee_handling_side）, 支払期日設定（payment_term_attributes）, 請求の入金期日設定（invoice_payment_term_attributes）は法人スタータープラン（および旧法人プロフェッショナルプラン）以上で利用可能です。

### パラメータ

- id* (path): integer(int64) - 取引先ID
- company_id*: integer(int64) - 事業所ID

### レスポンス

POST /api/1/partners と同じ

## PUT /api/1/partners/{id} — 取引先の更新

概要 指定した取引先の情報を更新する 取引先名称（name）は重複不可です。 codeを指定、更新することはできません。 振込元口座ID（payer_walletable_id）, 振込手数料負担（transfer_fee_handling_side）, 支払期日設定（payment_term_attributes）, 請求の入金期日設定（invoice_payment_term_attributes）は法人スタータープラン（および旧法人プロフェッショナルプラン）以上で利用可能です。 支払期日設定（payment_term_attributes）, 請求の入金期日設定（invoice_payment_term_attributes）にnull型を入力することにより、期日を未設定に変更可能です。

### パラメータ

- id* (path): integer(int64) - 取引先ID

### リクエストボディ

- company_id*: integer(int64) - 事業所ID 例: `1` (最小: 1)
- name*: string - 取引先名 (255文字以内、重複不可) 例: `新しい取引先`
- available: boolean - true: 使用可能、false: 使用停止 例: `false`
- shortcut1: string - ショートカット１ (255文字以内) 例: `NEWPARTNER`
- shortcut2: string - ショートカット２ (255文字以内) 例: `502`
- org_code: integer(int64) - 事業所種別（null: 未設定、1: 法人、2: 個人） (選択肢: 1, 2) 例: `1`
- country_code: string - 地域（JP: 国内、ZZ:国外）、指定しない場合JPになります。 (選択肢: JP, ZZ) 例: `JP`
- long_name: string - 正式名称（255文字以内） 例: `新しい取引先正式名称`
- name_kana: string - カナ名称（255文字以内） 例: `アタラシイトリヒキサキメイショウ`
- default_title: string - 敬称（御中、様、(空白)の3つから選択） 例: `御中`
- phone: string - 電話番号 例: `03-1234-xxxx`
- contact_name: string - 担当者 氏名 (255文字以内) 例: `営業担当`
- email: string - 担当者 メールアドレス (255文字以内) 例: `contact@example.com`
- payer_walletable_id: integer(int64) - 振込元口座ID（一括振込ファイル用）:（walletableのtypeが'bank_account'のidのみ指定できます。また、未設定にする場合は、nullを指定してください。） 例: `1` (最小: 1)
- transfer_fee_handling_side: string - 振込手数料負担（一括振込ファイル用）: (振込元(当方): payer, 振込先(先方): payee)、指定しない場合payerになります。 (選択肢: payer, payee) 例: `payer`
- qualified_invoice_issuer: boolean - インボイス制度適格請求書発行事業者（true: 対象事業者、false: 非対象事業者）
  国税庁インボイス制度適格請求書発行事業者公表サイト 例: `false`
- invoice_registration_number: string - インボイス制度適格請求書発行事業者登録番号
  - 先頭T数字13桁の固定14桁の文字列
  国税庁インボイス制度適格請求書発行事業者公表サイト 例: `T1000000000001` (パターン: ^T?[1-9][0-9]{12}$)
- address_attributes: object
  - zipcode: string - 郵便番号（8文字以内） 例: `000-0000`
  - prefecture_code: integer(int64) - 都道府県コード（-1: 設定しない、0: 北海道、1:青森、2:岩手、3:宮城、4:秋田、5:山形、6:福島、7:茨城、8:栃木、9:群馬、10:埼玉、11:千葉、12:東京、13:神奈川、14:新潟、15:富山、16:石川、17:福井、18:山梨、19:長野、20:岐阜、21:静岡、22:愛知、23:三重、24:滋賀、25:京都、26:大阪、27:兵庫、28:奈良、29:和歌山、30:鳥取、31:島根、32:岡山、33:広島、34:山口、35:徳島、36:香川、37:愛媛、38:高知、39:福岡、40:佐賀、41:長崎、42:熊本、43:大分、44:宮崎、45:鹿児島、46:沖縄 例: `4` (最小: -1, 最大: 46)
  - street_name1: string - 市区町村・番地（255文字以内） 例: `ＸＸ区ＹＹ１−１−１`
  - street_name2: string - 建物名・部屋番号など（255文字以内） 例: `ビル１Ｆ`
- partner_doc_setting_attributes: object
  - sending_method: string - 請求書送付方法(email:メール、posting:郵送、email_and_posting:メールと郵送、pdf_delivery:メール（PDFファイル添付）、pdf_delivery_and_posting:メール（PDFファイル添付）と郵送、null:設定しない) (選択肢: email, posting, email_and_posting, pdf_delivery, pdf_delivery_and_posting) 例: `posting`
- partner_bank_account_attributes: object
  - bank_name: string - 銀行名 例: `freee銀行`
  - bank_name_kana: string - 銀行名（カナ） 例: `フリーギンコウ`
  - bank_code: string - 銀行コード 例: `0001`
  - branch_name: string - 支店名 例: `銀座支店`
  - branch_kana: string - 支店名（カナ） 例: `ギンザシテン`
  - branch_code: string - 支店番号 例: `101`
  - account_type: string - 口座種別(ordinary:普通、checking：当座、earmarked：納税準備預金、savings：貯蓄、other:その他)、指定しない場合ordinaryになります。 例: `ordinary`
  - account_number: string - 口座番号 例: `1010101`
  - long_account_name: string - 受取人名 例: `freee太郎`
  - account_name: string - 受取人名（カナ） 例: `フリータロウ`
- payment_term_attributes: object
  - cutoff_day: integer(int64) - 締め日（29, 30, 31日の末日を指定する場合は、32を指定してください。） 例: `15` (最小: 1, 最大: 32)
  - additional_months: integer(int64) - 支払月（当月を指定する場合は、0を指定してください。） 例: `1` (最小: 0, 最大: 6)
  - fixed_day: integer(int64) - 支払日（29, 30, 31日の末日を指定する場合は、32を指定してください。） 例: `32` (最小: 1, 最大: 32)
- invoice_payment_term_attributes: object
  - cutoff_day: integer(int64) - 締め日（29, 30, 31日の末日を指定する場合は、32を指定してください。） 例: `15` (最小: 1, 最大: 32)
  - additional_months: integer(int64) - 入金月（当月を指定する場合は、0を指定してください。） 例: `1` (最小: 0, 最大: 6)
  - fixed_day: integer(int64) - 入金日（29, 30, 31日の末日を指定する場合は、32を指定してください。） 例: `32` (最小: 1, 最大: 32)

### レスポンス

POST /api/1/partners と同じ

## DELETE /api/1/partners/{id} — 取引先の削除

概要 指定した事業所の取引先を削除する

### パラメータ

GET /api/1/partners/{id} と同じ

## PUT /api/1/partners/code/{code} — 取引先コードでの取引先の更新

概要 取引先コードをキーに、指定した取引先の情報を更新する このAPIを利用するには、事業所の設定から取引先コードの利用を有効にする必要があります。 コードを日本語に設定している場合は、URLエンコードしてURLに含めるようにしてください。 取引先名称（name）は重複不可です。 振込元口座ID（payer_walletable_id）, 振込手数料負担（transfer_fee_handling_side）, 支払期日設定（payment_term_attributes）, 請求の入金期日設定（invoice_payment_term_attributes）は法人スタータープラン（および旧法人プロフェッショナルプラン）以上で利用可能です。 支払期日設定（payment_term_attributes）, 請求の入金期日設定（invoice_payment_term_attributes）にnull型を入力することにより、期日を未設定に変更可能です。

### パラメータ

- code* (path): string - 取引先コード

### リクエストボディ

PUT /api/1/partners/{id} と同じ

### レスポンス

POST /api/1/partners と同じ

## PUT /api/1/partners/upsert_by_code — 取引先の更新（存在しない場合は作成）

概要 取引先コードをキーに、指定した取引先の情報を更新（存在しない場合は作成）する このAPIを利用するには、事業所の設定から取引先コードの利用を有効にする必要があります。 取引先名称（name）は重複不可です。 振込元口座ID（payer_walletable_id）, 振込手数料負担（transfer_fee_handling_side）, 支払期日設定（payment_term_attributes）, 請求の入金期日設定（invoice_payment_term_attributes）は法人スタータープラン（および旧法人プロフェッショナルプラン）以上で利用可能です。 支払期日設定（payment_term_attributes）, 請求の入金期日設定（invoice_payment_term_attributes）にnull型を入力することにより、期日を未設定に変更可能です。

### リクエストボディ

- code*: string - 取引先コード 例: `code001`
- company_id*: integer(int64) - 事業所ID 例: `1` (最小: 1)
- partner*: object
  - name*: string - 取引先名 (255文字以内、重複不可) 例: `新しい取引先`
  - available: boolean - true: 使用可能、false: 使用停止 例: `false`
  - shortcut1: string - ショートカット１ (255文字以内) 例: `NEWPARTNER`
  - shortcut2: string - ショートカット２ (255文字以内) 例: `502`
  - org_code: integer(int64) - 事業所種別（null: 未設定、1: 法人、2: 個人） (選択肢: 1, 2) 例: `1`
  - country_code: string - 地域（JP: 国内、ZZ:国外）、指定しない場合JPになります。 (選択肢: JP, ZZ) 例: `JP`
  - long_name: string - 正式名称（255文字以内） 例: `新しい取引先正式名称`
  - name_kana: string - カナ名称（255文字以内） 例: `アタラシイトリヒキサキメイショウ`
  - default_title: string - 敬称（御中、様、(空白)の3つから選択） 例: `御中`
  - phone: string - 電話番号 例: `03-1234-xxxx`
  - contact_name: string - 担当者 氏名 (255文字以内) 例: `営業担当`
  - email: string - 担当者 メールアドレス (255文字以内) 例: `contact@example.com`
  - payer_walletable_id: integer(int64) - 振込元口座ID（一括振込ファイル用）:（walletableのtypeが'bank_account'のidのみ指定できます。また、未設定にする場合は、nullを指定してください。） 例: `1` (最小: 1)
  - transfer_fee_handling_side: string - 振込手数料負担（一括振込ファイル用）: (振込元(当方): payer, 振込先(先方): payee)、指定しない場合payerになります。 (選択肢: payer, payee) 例: `payer`
  - qualified_invoice_issuer: boolean - インボイス制度適格請求書発行事業者（true: 対象事業者、false: 非対象事業者）
    国税庁インボイス制度適格請求書発行事業者公表サイト 例: `false`
  - invoice_registration_number: string - インボイス制度適格請求書発行事業者登録番号
    - 先頭T数字13桁の固定14桁の文字列
    国税庁インボイス制度適格請求書発行事業者公表サイト 例: `T1000000000001` (パターン: ^T?[1-9][0-9]{12}$)
  - address_attributes: object
  - partner_doc_setting_attributes: object
  - partner_bank_account_attributes: object
  - payment_term_attributes: object
  - invoice_payment_term_attributes: object

### レスポンス

POST /api/1/partners と同じ
