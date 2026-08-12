# 年末調整

年末調整の操作

## GET /api/v1/yearend_adjustments/{year}/employees — 年末調整対象一覧の取得

指定した年の年末調整対象のリスト返します。

### パラメータ

- company_id*: integer - 事業所ID
- year* (path): integer - 年末調整対象を取得したい年
- limit: integer - 取得レコードの件数 (デフォルト: 50, 最小: 1, 最大: 100)
- offset: integer - 取得レコードのオフセット (デフォルト: 0)

### レスポンス

- employees: array[object]
- total_count: integer(int32) - 合計件数

## GET /api/v1/yearend_adjustments/{year}/employees/{employee_id} — 年末調整の取得

指定した年、従業員IDの年末調整の詳細内容を返します。 年末調整対象外の従業員は、本人情報、給与・賞与、前職情報のみが取得できます。

### パラメータ

- company_id*: integer - 事業所ID
- year* (path): integer - 年末調整を取得したい年
- employee_id* (path): integer - 従業員ID

### レスポンス

- employee: object
- dependents: array[object] - 家族情報(年末調整対象外の場合は取得できません。)
- insurances: array[object] - 保険料情報(年末調整対象外の場合は取得できません。)
- housing_loan_deduction: integer(int32) - 住宅借入金等特別控除(年末調整対象外の場合は取得できません。)
- housing_loans: array[object] - 住宅ローン(年末調整対象外の場合は取得できません。)
- payroll_and_bonus: object
- previous_job: object

## PUT /api/v1/yearend_adjustments/{year}/employees/{employee_id} — 年末調整従業員情報の更新

概要 指定した従業員の姓名・住所などを更新します。

注意点
本APIは、年末調整が確定済みの従業員には非対応です。

### パラメータ

- year* (path): integer - 更新対象年
- employee_id* (path): integer - 従業員ID

### リクエストボディ

- company_id*: integer(int32) - 更新対象事業所ID（必須） 例: `1` (最小: 1, 最大: 2147483647)
- employee*: object
  - last_name*: string - 姓 null不可 例: `山田`
  - first_name*: string - 名 null不可 例: `太郎`
  - last_name_kana*: string - 姓カナ 例: `ヤマダ`
  - first_name_kana*: string - 名カナ 例: `タロウ`
  - zipcode1*: string - 住民票住所の郵便番号1 例: `141`
  - zipcode2*: string - 住民票住所の郵便番号2 例: `0031`
  - prefecture_code*: integer - 住民票住所の都道府県コード（-1: 設定しない、0: 北海道、1:青森、2:岩手、3:宮城、4:秋田、5:山形、6:福島、7:茨城、8:栃木、9:群馬、10:埼玉、11:千葉、12:東京、13:神奈川、14:新潟、15:富山、16:石川、17:福井、18:山梨、19:長野、20:岐阜、21:静岡、22:愛知、23:三重、24:滋賀、25:京都、26:大阪、27:兵庫、28:奈良、29:和歌山、30:鳥取、31:島根、32:岡山、33:広島、34:山口、35:徳島、36:香川、37:愛媛、38:高知、39:福岡、40:佐賀、41:長崎、42:熊本、43:大分、44:宮崎、45:鹿児島、46:沖縄) 例: `12` (最小: -1, 最大: 46)
  - address*: string - 住民票住所の市区町村以降の住所 例: `品川区大崎1-2-2`
  - address_kana: string - 住民票住所の市区町村以降の住所カナ 例: `シナガワクオオサキ1-2-2`
  - payer_type: string - 所得税納税者区分 kou: 甲, otsu: 乙, hei: 丙 (選択肢: kou, otsu, hei)
  - widow_type: string - 寡夫／寡婦かどうか null不可 na: 空白, widow: 寡婦, one_parent: ひとり親 (選択肢: na, widow, one_parent)
  - disability_type: string - 障害者かどうか null不可 na: 空白, general: 障害者, heavy: 特別障害者 (選択肢: na, general, heavy)
  - married: boolean - 配偶者の有無 null不可
  - is_working_student: boolean - 勤労学生かどうか null不可
  - is_foreigner: boolean - 外国人かどうか null不可
  - other_company_revenue: integer - その他の事業所の給与収入 例: `1000000` (最小: -999999999, 最大: 1999999999)
  - all_other_income: integer - 給与以外の所得 例: `1000000` (最小: -999999999, 最大: 1999999999)
  - householder: string - 世帯主の続柄 myself: 本人, husband: 夫, wife: 妻, father: 父, mother: 母, child: 子, senior_brother: 兄, junior_brother: 弟, senior_sister: 姉, junior_sister: 妹, grandchild: 孫, grandfather: 祖父, grandmother: 祖母, father_in_law: 義父, mother_in_law: 義母, grandfather_in_law: 義祖父, grandmother_in_law: 義祖母, other: その他 (選択肢: myself, husband, wife, father, mother, child, senior_brother, junior_brother, senior_sister, junior_sister, grandchild, grandfather, grandmother, father_in_law, mother_in_law, grandfather_in_law, grandmother_in_law, other)
  - householder_name: string - 世帯主の名前 例: `山田 太郎`

### レスポンス

- employees: object

## PUT /api/v1/yearend_adjustments/{year}/payroll_and_bonus/{employee_id} — 年末調整従業員給与・賞与の更新

概要 指定した従業員の給与・賞与を更新します。

注意点
本APIは、年末調整が確定済みの従業員には非対応です。

### パラメータ

PUT /api/v1/yearend_adjustments/{year}/employees/{employee_id} と同じ

### リクエストボディ

- company_id*: integer(int32) - 更新対象事業所ID（必須） 例: `1` (最小: 1, 最大: 2147483647)
- payroll_and_bonus*: object
  - unentered_payroll_amount: integer(int32) - 未入力給与額 例: `1000000` (最小: -999999999, 最大: 999999999)
  - unentered_payroll_deduction_amount: integer(int32) - 未入力給与控除額 例: `1000000` (最小: -999999999, 最大: 999999999)
  - unentered_payroll_income_tax_amount: integer(int32) - 未入力給与所得税額 例: `1000000` (最小: -999999999, 最大: 999999999)
  - unentered_bonus_amount: integer(int32) - 未入力賞与額 例: `1000000` (最小: -999999999, 最大: 999999999)
  - unentered_bonus_deduction_amount: integer(int32) - 未入力賞与控除額 例: `1000000` (最小: -999999999, 最大: 999999999)
  - unentered_bonus_income_tax_amount: integer(int32) - 未入力賞与所得税額 例: `1000000` (最小: -999999999, 最大: 999999999)

### レスポンス

- payroll_and_bonus: object

## PUT /api/v1/yearend_adjustments/{year}/dependents/{employee_id} — 年末調整家族情報の更新

概要 指定した年末調整の家族情報を更新します。

注意点
本APIは、年末調整が確定済みの従業員には非対応です。 idがない場合は新規作成、destroyがtrueの場合は削除になります。

### パラメータ

PUT /api/v1/yearend_adjustments/{year}/employees/{employee_id} と同じ

### リクエストボディ

- company_id*: integer(int32) - 更新対象事業所ID（必須） 例: `1` (最小: 1, 最大: 2147483647)
- dependents*: array[object] - 家族情報
  配列の要素:
    - id: integer(int32) - 家族情報ID（idがない場合は新規作成になる) 例: `1` (最小: 1, 最大: 2147483647)
    - destroy: boolean - 家族情報を削除するか true: 削除する, false: 削除しない 例: `false`
    - last_name*: string - 姓 null不可 例: `山田`
    - first_name*: string - 名 null不可 例: `花子`
    - last_name_kana: string - 姓カナ 例: `ヤマダ`
    - first_name_kana: string - 名カナ 例: `ハナコ`
    - relationship*: string - 続柄 null不可 spouse: 配偶者, father: 父, mother: 母, child: 子, senior_brother: 兄, junior_brother: 弟, senior_sister: 姉, junior_sister: 妹, grandchild: 孫, grandfather: 祖父, grandmother: 祖母, father_in_law: 義父, mother_in_law: 義母, grandfather_in_law: 義祖父, grandmother_in_law: 義祖母, other: その他, great_grandfather: 曽祖父, great_grandmother: 曽祖母, spouses_child: 配偶者の連れ子 (選択肢: spouse, father, mother, child, senior_brother, junior_brother, senior_sister, junior_sister, grandchild, grandfather, grandmother, father_in_law, mother_in_law, grandfather_in_law, grandmother_in_law, other, great_grandfather, great_grandmother, spouses_child)
    - birth_date*: string(date) - 生年月日 null不可 1900年1月1日から現在年+5の12月31日まで登録可能 例: `1999-01-01` (パターン: ^[1-9][0-9]{3}-[0-9]{2}-[0-9]{2}$)
    - social_insurance_and_tax_dependent*: string - 扶養状況 social_insurance_and_tax: 所得税・住民税と社会保険, tax_only: 所得税・住民税のみ, social_insurance_only: 社会保険のみ, not_dependent: 扶養していない (選択肢: social_insurance_and_tax, tax_only, social_insurance_only, not_dependent)
    - income: integer(int32) - 所得 配偶者は「扶養状況」がsocial_insurance_only又はnot_dependentの場合のみ更新可能。配偶者以外は更新可能。 配偶者で「扶養状況」がsocial_insurance_and_tax又はtax_onlyの場合、「給与収入」、「給与以外の所得」から自動で「所得」が計算されます。 (最小: 0, 最大: 999999999)
    - employment_revenue: integer(int32) - 給与収入 配偶者は「扶養状況」がsocial_insurance_and_tax又はtax_onlyの場合のみ更新可能。配偶者以外は更新不可。更新不可の場合は0となります。 (最小: -999999999, 最大: 999999999)
    - all_other_income: integer(int32) - 給与以外の所得 配偶者は「扶養状況」がsocial_insurance_and_tax又はtax_onlyの場合のみ更新可能。配偶者以外は更新不可。更新不可の場合は0となります。 (最小: -999999999, 最大: 999999999)
    - disability_type*: string - 障害に該当するか null不可 na: 障害なし, general: 一般の障害者, heavy: 特別障害者 (選択肢: na, general, heavy)
    - residence_type*: string - 同居・別居 null不可 live_in: 同居, resident: 別居(国内), non_resident: 別居(国外) (選択肢: live_in, resident, non_resident)
    - zipcode1: string - 住民票住所の郵便番号1 「同居・別居」が「同居」の場合は「年末調整従業員情報」の「住民票住所の郵便番号1」を登録 例: `141`
    - zipcode2: string - 住民票住所の郵便番号2 「同居・別居」が「同居」の場合は「年末調整従業員情報」の「住民票住所の郵便番号2」を登録 例: `0031`
    - prefecture_code: integer - 住民票住所の都道府県コード（-1: 設定しない、0: 北海道、1:青森、2:岩手、3:宮城、4:秋田、5:山形、6:福島、7:茨城、8:栃木、9:群馬、10:埼玉、11:千葉、12:東京、13:神奈川、14:新潟、15:富山、16:石川、17:福井、18:山梨、19:長野、20:岐阜、21:静岡、22:愛知、23:三重、24:滋賀、25:京都、26:大阪、27:兵庫、28:奈良、29:和歌山、30:鳥取、31:島根、32:岡山、33:広島、34:山口、35:徳島、36:香川、37:愛媛、38:高知、39:福岡、40:佐賀、41:長崎、42:熊本、43:大分、44:宮崎、45:鹿児島、46:沖縄) 「同居・別居」が「同居」の場合は「年末調整従業員情報」の「住民票住所の都道府県コード」を登録 例: `12` (最小: -1, 最大: 46)
    - address: string - 住民票住所の市区町村以降の住所 「同居・別居」が「同居」の場合は「年末調整従業員情報」の「住民票住所の市区町村以降の住所」を登録 例: `品川区大崎1-2-2`
    - address_kana: string - 住民票住所の市区町村以降の住所カナ 「同居・別居」が「同居」の場合は「年末調整従業員情報」の「住民票住所の市区町村以降の住所カナ」を登録 例: `シナガワクオオサキ1-2-2`
    - annual_remittance_amount: integer(int32) - 国外居住親族への年間の送金額 「同居・別居」が「同居」、「別居(国内)」の場合は登録不可 (最小: 0, 最大: 999999999)
    - non_resident_dependents_reason: string(string) - 非居住者である親族の条件 none: なし, over_16_to_under_30_or_over_70: 16歳以上30歳未満又は70歳以上, study_abroad: 留学, handicapped: 障害者, over_38_man: 38万円以上の支払 続柄が「配偶者」または「同居・別居」が「同居」、「別居(国内)」の場合は登録不可 (選択肢: none, over_16_to_under_30_or_over_70, study_abroad, handicapped, over_38_man)
    - is_resident_tax_only_deduction: boolean - 住民税のみの控除対象かどうか
    - retirement_income: integer(int32) - 退職所得 (最小: 0, 最大: 999999999)

### レスポンス

- dependents: array[object] - 家族情報

## PUT /api/v1/yearend_adjustments/{year}/previous_jobs/{employee_id} — 年末調整従業員前職情報の更新

概要 指定した従業員の前職情報を更新します。

注意点
本APIは、年末調整が確定済みの従業員には非対応です。

### パラメータ

PUT /api/v1/yearend_adjustments/{year}/employees/{employee_id} と同じ

### リクエストボディ

- company_id*: integer(int32) - 更新対象事業所ID（必須） 例: `1` (最小: 1, 最大: 2147483647)
- previous_job*: object
  - income*: integer - 前職の支払金額 例: `5000000` (最小: -999999999, 最大: 999999999)
  - deduction*: integer - 前職の社会保険料等の金額 例: `1200000` (最小: -999999999, 最大: 999999999)
  - withholding_tax_amount*: integer - 前職の源泉徴収額 例: `100000` (最小: -999999999, 最大: 999999999)
  - company_name*: string - 前職の社名 例: `株式会社 前職`
  - company_address*: string - 前職の事業所住所 例: `品川区大崎1-2-2`
  - retire_date*: string(date) - 前職の退職日 現在年-10年1月1日から現在年+5年12月31日まで登録可能 例: `2022-03-31`

### レスポンス

- previous_job: object

## DELETE /api/v1/yearend_adjustments/{year}/previous_jobs/{employee_id} — 年末調整従業員前職情報の削除

概要 指定した従業員の前職情報を削除します。

注意点
本APIは、年末調整が確定済みの従業員には非対応です。

### パラメータ

- company_id*: integer - 事業所ID
- year* (path): integer - 更新対象年
- employee_id* (path): integer - 従業員ID

## POST /api/v1/yearend_adjustments/{year}/insurances/{employee_id} — 年末調整従業員保険料情報の作成

概要 指定した従業員の保険料情報を作成します。

注意点
本APIは、年末調整が確定済みの従業員には非対応です。

### パラメータ

- year* (path): integer - 作成対象年
- employee_id* (path): integer - 従業員ID

### リクエストボディ

- company_id*: integer(int32) - 更新対象事業所ID（必須） 例: `1` (最小: 1, 最大: 2147483647)
- insurance*: object
  - type*: string - 保険の種類 life_care_pension_insurance: 生命保険・介護医療保険・個人年金保険, earthquake_non_life_insurance: 地震保険・旧長期損害保険, social_insurance: 社会保険, other_insurance: その他の保険（小規模企業共済等） (選択肢: life_care_pension_insurance, earthquake_non_life_insurance, social_insurance, other_insurance)
  - category*: string - 区分

    保険会社等が発行する証明書類に基づいて区分を設定してください。

    保険の種類によって設定可能な値が変わります。

    ・life_care_pension_insurance

    　life: 生命保険

    　care: 介護保険

    　pension: 個人年金保険

    ・earthquake_non_life_insurance

    　earthquake: 地震保険

    　old_long_term_non_life: 旧長期損害保険

    ・social_insurance

    　national_pension: 国民年金

    　national_pension_fund_premium: 国民年金基金

    　national_health: 国民健康保険

    　health: 健康保険

    　care_insurance_deduction_of_pension: 介護保険

    　employee_pension: 厚生年金

    　advanced_elderly_medical: 後期高齢者医療保険

    　none: その他（印刷後に手書き）

    ・other_insurance

    　sema: 独立行政法人中小企業基盤整備機構の共済契約の掛金

    　idc: 個人型確定拠出年金（iDeCo）

    　cdc: 企業型確定拠出年金

    　dsma: 心身障害者扶養共済制度に関する契約の掛金 (選択肢: life, care, pension, earthquake, old_long_term_non_life, national_pension, national_pension_fund_premium, national_health, care_insurance_deduction_of_pension, health, employee_pension, advanced_elderly_medical, sema, idc, cdc, dsma, none) 例: `life`
  - new_or_old*: string - 新旧区分

    区分が生命保険または個人年金保険の時のみ、新制度なら new を、旧制度なら old を指定します。

    上記以外の保険では none を指定してください。 (選択肢: new, old, none)
  - company_name: string - 保険会社等の名称

    保険の種類にて、生命保険・介護医療保険・個人年金保険または地震保険・旧長期損害保険を選択している時のみ、入力した値が反映されます。

    上記以外の保険では入力した値は反映されません。 例: `freee生命保険株式会社`
  - kind_of_purpose: string - 保険等の種類（目的）

    保険の種類にて、生命保険・介護医療保険・個人年金保険または地震保険・旧長期損害保険を選択している時のみ、入力した値が反映されます。

    上記以外の保険では入力した値は反映されません。 例: `利差配当付終身`
  - period: string - 保険期間又は年金支払期間

    保険の種類にて、生命保険・介護医療保険・個人年金保険または地震保険・旧長期損害保険を選択している時のみ、入力した値が反映されます。

    上記以外の保険では入力した値は反映されません。 (選択肢: 終身, 0年, 1年, 2年, 3年, 4年, 5年, 6年, 7年, 8年, 9年, 10年, 11年, 12年, 13年, 14年, 15年, 16年, 17年, 18年, 19年, 20年, 21年, 22年, 23年, 24年, 25年, 26年, 27年, 28年, 29年, 30年, 31年, 32年, 33年, 34年, 35年, 36年, 37年, 38年, 39年, 40年, 41年, 42年, 43年, 44年, 45年, 46年, 47年, 48年, 49年, 50年, 51年, 52年, 53年, 54年, 55年, 56年, 57年, 58年, 59年, 60年, 61年, 62年, 63年, 64年, 65年, 66年, 67年, 68年, 69年, 70年, 71年, 72年, 73年, 74年, 75年, 76年, 77年, 78年, 79年, 80年, 81年, 82年, 83年, 84年, 85年, 86年, 87年, 88年, 89年, 90年, 91年, 92年, 93年, 94年, 95年, 96年, 97年, 98年, 99年, 100年, ) 例: `終身`
  - policyholder_last_name: string - 保険等の契約者 姓

    保険の種類にて、生命保険・介護医療保険・個人年金保険または地震保険・旧長期損害保険を選択している時のみ、入力した値が反映されます。

    上記以外の保険では入力した値は反映されません。 例: `契約`
  - policyholder_first_name: string - 保険等の契約者 名

    保険の種類にて、生命保険・介護医療保険・個人年金保険または地震保険・旧長期損害保険を選択している時のみ、入力した値が反映されます。

    上記以外の保険では入力した値は反映されません。 例: `太郎`
  - recipient_last_name: string - 保険金等の受取人 姓

    保険の種類にて、生命保険・介護医療保険・個人年金保険、地震保険・旧長期損害保険または社会保険を選択している時のみ、入力した値が反映されます。

    上記以外の保険では入力した値は反映されません。 例: `受取`
  - recipient_first_name: string - 保険金等の受取人 名

    保険の種類にて、生命保険・介護医療保険・個人年金保険、地震保険・旧長期損害保険または社会保険を選択している時のみ、入力した値が反映されます。

    上記以外の保険では入力した値は反映されません。 例: `太郎`
  - recipient_relationship: string - 保険金等の受取人 あなたとの続柄 myself: 本人, husband: 夫, wife: 妻, father: 父, mother: 母, child: 子, senior_brother: 兄, junior_brother: 弟, senior_sister: 姉, junior_sister: 妹, grandchild: 孫, grandfather: 祖父, grandmother: 祖母, father_in_law: 義父, mother_in_law: 義母, grandfather_in_law: 義祖父, grandmother_in_law: 義祖母, other: その他, "": 空欄

    保険の種類にて、生命保険・介護医療保険・個人年金保険、地震保険・旧長期損害保険または社会保険を選択している時のみ、入力した値が反映されます。

    上記以外の保険では入力した値は反映されません。 (選択肢: myself, husband, wife, father, mother, child, senior_brother, junior_brother, senior_sister, junior_sister, grandchild, grandfather, grandmother, father_in_law, mother_in_law, grandfather_in_law, grandmother_in_law, other, ) 例: `child`
  - payment_start_date: string - 年金の支払開始日 1900年1月1日から現在年+100の12月31日まで登録可能。

    区分が個人年金保険の時のみ、入力した値が反映されます。

    上記以外の保険では入力した値は反映されません。 例: `2000-04-01` (パターン: ^([1-2][0-9]{3}-[0-9]{2}-[0-9]{2})?$)
  - amount*: integer - 保険料額 例: `1000000` (最小: 0, 最大: 99999999)
  - is_group_insurance: boolean - 団体保険に該当するかどうか

### レスポンス

- insurances: array[object]

## PUT /api/v1/yearend_adjustments/{year}/insurances/{employee_id}/{id} — 年末調整従業員保険料情報の更新

概要 指定した従業員の保険料情報を更新します。

注意点
本APIは、年末調整が確定済みの従業員には非対応です。 certification_type="xml"の場合、recipient_first_name、recipient_last_name、recipient_relationshipのみが更新の対象となります。

### パラメータ

- year* (path): integer - 更新対象年
- employee_id* (path): integer - 従業員ID
- id* (path): integer - 保険料ID

### リクエストボディ

POST /api/v1/yearend_adjustments/{year}/insurances/{employee_id} と同じ

### レスポンス

POST /api/v1/yearend_adjustments/{year}/insurances/{employee_id} と同じ

## DELETE /api/v1/yearend_adjustments/{year}/insurances/{employee_id}/{id} — 年末調整従業員保険料情報の削除

概要 指定した従業員の保険料情報を削除します。

注意点
本APIは、年末調整が確定済みの従業員には非対応です。

### パラメータ

- company_id*: integer - 事業所ID
- year* (path): integer - 更新対象年
- employee_id* (path): integer - 従業員ID
- id* (path): integer - 保険料ID

## PUT /api/v1/yearend_adjustments/{year}/housing_loan_deductions/{employee_id} — 年末調整従業員住宅ローン控除額の更新

概要 指定した従業員の住宅ローン控除額を更新します。

注意点
本APIは、年末調整が確定済みの従業員には非対応です。

### パラメータ

PUT /api/v1/yearend_adjustments/{year}/employees/{employee_id} と同じ

### リクエストボディ

- company_id*: integer(int32) - 更新対象事業所ID（必須） 例: `1` (最小: 1, 最大: 2147483647)
- housing_loan_deduction*: integer(int32) - 住宅借入金等特別控除（必須） 例: `1` (最小: 0, 最大: 999999999)

### レスポンス

- housing_loan_deduction: integer(int32) - 住宅借入金等特別控除
- housing_loans: array[object] - 住宅ローン

## POST /api/v1/yearend_adjustments/{year}/housing_loans/{employee_id} — 年末調整従業員住宅ローンの作成

概要 指定した従業員の住宅ローンを作成します。

注意点
本APIは、年末調整が確定済みの従業員には非対応です。

### パラメータ

POST /api/v1/yearend_adjustments/{year}/insurances/{employee_id} と同じ

### リクエストボディ

- company_id*: integer(int32) - 更新対象事業所ID（必須） 例: `1` (最小: 1, 最大: 2147483647)
- housing_loan*: object
  - residence_start_date*: string(date) - 居住開始の年月日 2000年1月1日から現在年+5の12月31日まで登録可能 例: `2022-03-31` (パターン: ^[2-9][0-9]{3}-[0-9]{2}-[0-9]{2}$)
  - remaining_balance_at_yearend*: integer - 住宅借入金等年末残高 例: `5000000` (最小: -999999999, 最大: 999999999)
  - category*: string - 住宅借入金等特別控除区分 general: 住: 一般の住宅借入金等, qualified: 認: 認定住宅の新築等, extension: 増: 特定増改築等, earthquake: 震: 震災特例法による特別控除 (選択肢: general, qualified, extension, earthquake)
  - specific_case_type*: string - 特定取得/特別特定取得 not_qualified: 該当しない, specified: 特定取得, special_specified_or_special_exception: 特別特定取得または特別特例取得, exception_special_exception: 特例特別特例取得 special_residential_house 特家 (選択肢: not_qualified, specified, special_specified_or_special_exception, exception_special_exception, special_residential_house)

### レスポンス

PUT /api/v1/yearend_adjustments/{year}/housing_loan_deductions/{employee_id} と同じ

## PUT /api/v1/yearend_adjustments/{year}/housing_loans/{employee_id}/{id} — 年末調整従業員住宅ローンの更新

概要 指定した従業員の住宅ローンを更新します。

注意点
本APIは、年末調整が確定済みの従業員には非対応です。

### パラメータ

- year* (path): integer - 更新対象年
- employee_id* (path): integer - 従業員ID
- id* (path): integer - 住宅ローンID

### リクエストボディ

POST /api/v1/yearend_adjustments/{year}/housing_loans/{employee_id} と同じ

### レスポンス

PUT /api/v1/yearend_adjustments/{year}/housing_loan_deductions/{employee_id} と同じ

## DELETE /api/v1/yearend_adjustments/{year}/housing_loans/{employee_id}/{id} — 年末調整従業員住宅ローンの削除

概要 指定した従業員の住宅ローンを削除します。

注意点
本APIは、年末調整が確定済みの従業員には非対応です。

### パラメータ

- company_id*: integer - 事業所ID
- year* (path): integer - 更新対象年
- employee_id* (path): integer - 従業員ID
- id* (path): integer - 住宅ローンID
