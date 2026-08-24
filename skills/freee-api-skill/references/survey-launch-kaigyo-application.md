# launch_kaigyo_application

⚠ freee-mcp（リモート版） 限定: このAPIは 「freee-mcp（リモート版）」でのみ利用できます。freee_server_info の transport が stdio の場合は呼び出せません。その際はユーザーに freee-mcp（リモート版）の設定（https://support.freee.co.jp/hc/ja/articles/56390747520537）を案内してください。

launch_kaigyo_application

## GET /hub/launch/kaigyo_application — 開業申請用データの取得（リモート版freee-mcp限定）

現在入力されている開業申請用データを取得します。

### レスポンス

開業申請用データ取得レスポンス
- owner_first_name*: string - 届出者の名
- owner_last_name*: string - 届出者の姓
- owner_first_name_kana*: string - 届出者の名(カナ)
- owner_last_name_kana*: string - 届出者の姓(カナ)
- owner_zipcode*: string - 届出者の郵便番号(123-4567形式)
- owner_prefecture*: string - 届出者の都道府県
- owner_city*: string - 届出者の市区町村
- owner_street_name1*: string - 届出者の住所1
- owner_street_name2*: string - 届出者の住所2(任意)
- owner_birth_date*: string(date) - 届出者の生年月日(yyyy-mm-dd)
- owner_contact_phone1*: string - 届出者の電話番号1
- owner_contact_phone2*: string - 届出者の電話番号2
- owner_contact_phone3*: string - 届出者の電話番号3
- workplace_style*: string - 主な仕事場所の種別(home:自宅, shop:店舗, office:事務所, undecided:未定)
- workplace_zipcode*: string - 仕事場所の郵便番号
- workplace_prefecture*: object - 仕事場所の都道府県
- workplace_city*: string - 仕事場所の市区町村
- workplace_street_name*: string - 仕事場所の住所
- workplace_contact_phone1*: string - 仕事場所の電話番号1
- workplace_contact_phone2*: string - 仕事場所の電話番号2
- workplace_contact_phone3*: string - 仕事場所の電話番号3
- workplace_is_tax_payment_place*: boolean - 仕事場所を納税地とするか
- business_type*: string - 業種
- business_description*: string - 事業概要
- business_name*: string - 屋号
- business_name_kana*: string - 屋号(カナ)
- has_business_name*: boolean - 屋号を持つか
- business_start_date*: string(date) - 事業開始日(yyyy-mm-dd)
- income_business*: boolean - 事業所得があるか
- income_realestate*: boolean - 不動産所得があるか
- income_forest*: boolean - 山林所得があるか
- payroll_plan*: string - 給与支払いの計画(not_pay:支払わない, pay_employee:従業員に支払う, pay_family:家族に支払う, pay_family_and_employee:家族と従業員に支払う)
- employees*: integer(int32) - 使用人(従業員)の人数
- family_employees*: array[object] - 青色事業専従者(給与を支払う家族)のリスト。常に全件置き換え(id は露出しない)
- tax_return_type*: string - 確定申告の種類(blue_65:青色申告 65万円控除, blue_10:青色申告 10万円控除, white:白色申告)
- completion_hint*: object - 入力補完のためのヒント

## PATCH /hub/launch/kaigyo_application — 開業申請用データの更新（リモート版freee-mcp限定）

開業申請用データのサブセットを受け付けて部分/一括更新します。 指定されたパラメータのみが更新されます。入力値が異常な場合はエラーを返します。

### リクエストボディ*

- owner_first_name: string - 届出者の名
- owner_last_name: string - 届出者の姓
- owner_first_name_kana: string - 届出者の名(カナ)
- owner_last_name_kana: string - 届出者の姓(カナ)
- owner_zipcode: string - 届出者の郵便番号(123-4567形式)
- owner_prefecture: string - 届出者の都道府県 (選択肢: 北海道, 青森県, 岩手県, 宮城県, 秋田県, 山形県, 福島県, 茨城県, 栃木県, 群馬県, 埼玉県, 千葉県, 東京都, 神奈川県, 新潟県, 富山県, 石川県, 福井県, 山梨県, 長野県, 岐阜県, 静岡県, 愛知県, 三重県, 滋賀県, 京都府, 大阪府, 兵庫県, 奈良県, 和歌山県, 鳥取県, 島根県, 岡山県, 広島県, 山口県, 徳島県, 香川県, 愛媛県, 高知県, 福岡県, 佐賀県, 長崎県, 熊本県, 大分県, 宮崎県, 鹿児島県, 沖縄県)
- owner_city: string - 届出者の市区町村
- owner_street_name1: string - 届出者の住所1
- owner_street_name2: string - 届出者の住所2(任意)
- owner_birth_date: string(date) - 届出者の生年月日(yyyy-mm-dd)
- owner_contact_phone1: string - 届出者の電話番号1
- owner_contact_phone2: string - 届出者の電話番号2
- owner_contact_phone3: string - 届出者の電話番号3
- workplace_style: string - 主な仕事場所の種別(home:自宅, shop:店舗, office:事務所, undecided:未定) (選択肢: home, shop, office, undecided)
- workplace_zipcode: string - 仕事場所の郵便番号
- workplace_prefecture: string - 仕事場所の都道府県 (選択肢: 北海道, 青森県, 岩手県, 宮城県, 秋田県, 山形県, 福島県, 茨城県, 栃木県, 群馬県, 埼玉県, 千葉県, 東京都, 神奈川県, 新潟県, 富山県, 石川県, 福井県, 山梨県, 長野県, 岐阜県, 静岡県, 愛知県, 三重県, 滋賀県, 京都府, 大阪府, 兵庫県, 奈良県, 和歌山県, 鳥取県, 島根県, 岡山県, 広島県, 山口県, 徳島県, 香川県, 愛媛県, 高知県, 福岡県, 佐賀県, 長崎県, 熊本県, 大分県, 宮崎県, 鹿児島県, 沖縄県)
- workplace_city: string - 仕事場所の市区町村
- workplace_street_name: string - 仕事場所の住所
- workplace_contact_phone1: string - 仕事場所の電話番号1
- workplace_contact_phone2: string - 仕事場所の電話番号2
- workplace_contact_phone3: string - 仕事場所の電話番号3
- workplace_is_tax_payment_place: boolean - 仕事場所を納税地とするか
- business_type: string - 業種
- business_description: string - 事業概要
- business_name: string - 屋号
- business_name_kana: string - 屋号(カナ)
- has_business_name: boolean - 屋号を持つか
- business_start_date: string(date) - 事業開始日(yyyy-mm-dd)
- income_business: boolean - 事業所得があるか
- income_realestate: boolean - 不動産所得があるか
- income_forest: boolean - 山林所得があるか
- payroll_plan: string - 給与支払いの計画(not_pay:支払わない, pay_employee:従業員に支払う, pay_family:家族に支払う, pay_family_and_employee:家族と従業員に支払う) (選択肢: not_pay, pay_employee, pay_family, pay_family_and_employee)
- employees: integer(int32) - 使用人(従業員)の人数
- family_employees: array[object] - 青色事業専従者のリスト(常に全件置き換え)
  配列の要素:
    - name*: string - 氏名
    - age*: integer(int32) - 年齢
    - relation*: string - 続柄(wife:妻, husband:夫, mother:母, father:父, child:子, o_sister:姉, y_sister:妹, o_brother:兄, y_brother:弟, g_mother:祖母, g_father:祖父, grandson:孫, cousin:従兄弟, uncle:叔父, aunt:叔母, nephew:甥, niece:姪) (選択肢: wife, husband, mother, father, o_brother, y_brother, o_sister, y_sister, child, grandson, cousin, g_mother, g_father, uncle, aunt, nephew, niece)
    - experience_years*: integer(int32) - 経験年数
    - work_description*: string - 仕事内容
    - work_time*: string - 従事の程度
    - qualification*: string - 資格
    - salary_amount*: integer(int32) - 給与額
    - salary_payday*: string - 給与支払日(end_of_month:月末, middle_of_month:月中, beginning_of_month:月初) (選択肢: end_of_month, middle_of_month, beginning_of_month)
    - bonus_cycle*: string - 賞与の支給サイクル(not_paid:支払わない, quarter:四半期ごと, half_year:半年ごと, year:年1回) (選択肢: not_paid, quarter, half_year, year)
    - bonus_amount*: integer(int32) - 賞与額
- tax_return_type: string - 確定申告の種類(blue_65:青色申告 65万円控除, blue_10:青色申告 10万円控除, white:白色申告) (選択肢: blue_65, blue_10, white)

### レスポンス

開業申請用データ更新レスポンス
- owner_first_name*: string - 届出者の名
- owner_last_name*: string - 届出者の姓
- owner_first_name_kana*: string - 届出者の名(カナ)
- owner_last_name_kana*: string - 届出者の姓(カナ)
- owner_zipcode*: string - 届出者の郵便番号(123-4567形式)
- owner_prefecture*: string - 届出者の都道府県
- owner_city*: string - 届出者の市区町村
- owner_street_name1*: string - 届出者の住所1
- owner_street_name2*: string - 届出者の住所2(任意)
- owner_birth_date*: string(date) - 届出者の生年月日(yyyy-mm-dd)
- owner_contact_phone1*: string - 届出者の電話番号1
- owner_contact_phone2*: string - 届出者の電話番号2
- owner_contact_phone3*: string - 届出者の電話番号3
- workplace_style*: string - 主な仕事場所の種別(home:自宅, shop:店舗, office:事務所, undecided:未定)
- workplace_zipcode*: string - 仕事場所の郵便番号
- workplace_prefecture*: object - 仕事場所の都道府県
- workplace_city*: string - 仕事場所の市区町村
- workplace_street_name*: string - 仕事場所の住所
- workplace_contact_phone1*: string - 仕事場所の電話番号1
- workplace_contact_phone2*: string - 仕事場所の電話番号2
- workplace_contact_phone3*: string - 仕事場所の電話番号3
- workplace_is_tax_payment_place*: boolean - 仕事場所を納税地とするか
- business_type*: string - 業種
- business_description*: string - 事業概要
- business_name*: string - 屋号
- business_name_kana*: string - 屋号(カナ)
- has_business_name*: boolean - 屋号を持つか
- business_start_date*: string(date) - 事業開始日(yyyy-mm-dd)
- income_business*: boolean - 事業所得があるか
- income_realestate*: boolean - 不動産所得があるか
- income_forest*: boolean - 山林所得があるか
- payroll_plan*: string - 給与支払いの計画(not_pay:支払わない, pay_employee:従業員に支払う, pay_family:家族に支払う, pay_family_and_employee:家族と従業員に支払う)
- employees*: integer(int32) - 使用人(従業員)の人数
- family_employees*: array[object] - 青色事業専従者(給与を支払う家族)のリスト。常に全件置き換え(id は露出しない)
- tax_return_type*: string - 確定申告の種類(blue_65:青色申告 65万円控除, blue_10:青色申告 10万円控除, white:白色申告)
- completion_hint*: object - 入力補完のためのヒント

## GET /hub/launch/kaigyo_application/online_submission_result_messages — 開業申請のオンライン送信結果メッセージ一覧の取得（リモート版freee-mcp限定）

e-Tax の受付結果メッセージ一覧を取得します。

### レスポンス

オンライン送信結果メッセージ一覧取得レスポンス
- data*: array[object] - 受付結果メッセージのリスト
- is_accepted*: boolean - e-Tax の受付が完了しているか
