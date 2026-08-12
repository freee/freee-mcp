# 従業員の家族情報

従業員の家族情報の操作

## GET /api/v1/employees/{employee_id}/dependent_rules — 従業員の家族情報の取得

概要 指定した従業員・日付の家族情報を返します。

### パラメータ

- company_id*: integer - 事業所ID
- year*: integer - 従業員情報を取得したい年
- month*: integer - 従業員情報を取得したい月

  締め日支払い日設定が翌月払いの従業員情報の場合は、 指定したmonth + 1の値が検索結果として返します。

  翌月払いの従業員の2022/01の従業員情報を取得する場合は、year=2021,month=12を指定してください。
- employee_id* (path): integer - 従業員ID

### レスポンス

- employee_dependent_rules: array[object]

## PUT /api/v1/employees/{employee_id}/dependent_rules/bulk_update — 従業員の家族情報の更新

概要 指定した従業員の家族情報を更新します。

注意点
idがない場合は新規作成、destroyがtrueの場合は削除になります。 residence_type=live_in: 同居の場合、以下のパラメータに指定した値はWebに反映されません。 zipcode1 zipcode2 prefecture_code address address_kana annual_remittance_amount residence_type=non_resident: 別居(国外)の場合、以下のパラメータに指定した値はWebに反映されません。 prefecture_code

### パラメータ

- employee_id* (path): integer - 従業員ID

### リクエストボディ

- company_id*: integer(int32) - 更新対象事業所ID（必須） (最小: 1, 最大: 2147483647)
- year*: integer(int32) - 更新対象年（必須） 例: `2021` (最小: 2000, 最大: 2100)
- month*: integer(int32) - 更新対象月（必須）

  締め日支払い日設定が翌月払いの従業員情報の場合は、 指定したmonth + 1の値が更新されます。

  翌月払いの従業員の2022/01の従業員情報を更新する場合は、year=2021,month=12を指定してください。 例: `1` (最小: 1, 最大: 12)
- employee_dependent_rules*: array[object] - 家族情報ルール
  配列の要素:
    - id: integer(int32) - 家族情報ルールID（idがない場合は新規作成になる) 例: `1` (最小: 1, 最大: 2147483647)
    - last_name*: string - 姓 null不可 例: `山田`
    - first_name*: string - 名 null不可 例: `花子`
    - last_name_kana: string - 姓カナ 例: `ヤマダ`
    - first_name_kana: string - 名カナ 例: `ハナコ`
    - gender*: string - 性別　unselected: 未選択, male: 男性, female: 女性（デフォルト: unselected: 未選択） (選択肢: unselected, male, female) 例: `male`
    - relationship*: string - 続柄 null不可 spouse: 配偶者, father: 父, mother: 母, child: 子, senior_brother: 兄, junior_brother: 弟, senior_sister: 姉, junior_sister: 妹, grandchild: 孫, grandfather: 祖父, grandmother: 祖母, father_in_law: 義父, mother_in_law: 義母, grandfather_in_law: 義祖父, grandmother_in_law: 義祖母, other: その他, great_grandfather: 曽祖父, great_grandmother: 曽祖母, spouses_child: 配偶者の連れ子 (選択肢: spouse, father, mother, child, senior_brother, junior_brother, senior_sister, junior_sister, grandchild, grandfather, grandmother, father_in_law, mother_in_law, grandfather_in_law, grandmother_in_law, other, great_grandfather, great_grandmother, spouses_child)
    - birth_date*: string(date) - 生年月日 null不可 例: `1999-01-01` (パターン: ^[0-9]{4}-[0-9]{2}-[0-9]{2}$)
    - residence_type*: string - 同居・別居 null不可 live_in: 同居, resident: 別居(国内), non_resident: 別居(国外) (選択肢: live_in, resident, non_resident)
    - zipcode1: string - 住民票住所の郵便番号1 例: `000`
    - zipcode2: string - 住民票住所の郵便番号2 例: `0000`
    - prefecture_code: integer - 住民票住所の都道府県コード（-1: 設定しない、0: 北海道、1:青森、2:岩手、3:宮城、4:秋田、5:山形、6:福島、7:茨城、8:栃木、9:群馬、10:埼玉、11:千葉、12:東京、13:神奈川、14:新潟、15:富山、16:石川、17:福井、18:山梨、19:長野、20:岐阜、21:静岡、22:愛知、23:三重、24:滋賀、25:京都、26:大阪、27:兵庫、28:奈良、29:和歌山、30:鳥取、31:島根、32:岡山、33:広島、34:山口、35:徳島、36:香川、37:愛媛、38:高知、39:福岡、40:佐賀、41:長崎、42:熊本、43:大分、44:宮崎、45:鹿児島、46:沖縄) 例: `4` (最小: -1, 最大: 46)
    - address: string - 住民票住所の市区町村以降の住所
    - address_kana: string - 住民票住所の市区町村以降の住所カナ
    - base_pension_num: string - 基礎年金番号 例: `1234567890`
    - income*: integer(int32) - 年間所得 null不可 (最小: 0, 最大: 999999999)
    - annual_revenue*: integer(int32) - 年間収入 null不可 (最小: 0, 最大: 999999999)
    - disability_type*: string - 障害に該当するか null不可 na: 障害なし, general: 一般の障害者, heavy: 特別障害者 (選択肢: na, general, heavy)
    - occupation: string - 職業
    - annual_remittance_amount: integer(int32) - 一年間の送金額 (最小: 0, 最大: 999999999)
    - employment_insurance_receive_status: string(string) - 雇用保険受給の有無
      - unselected 未選択
      - receiving_employment_insurance 雇用保険受給有り
      - not_receiving_employment_insurance 雇用保険受給無し
      - pending_employment_insurance 申請中 (選択肢: unselected, receiving_employment_insurance, not_receiving_employment_insurance, pending_employment_insurance) 例: `receiving_employment_insurance`
    - employment_insurance_receives_from: string(date) - 雇用保険受給開始年月日 employment_insurance_receive_statusが未選択、無しの場合は指定できません。 例: `2021-04-01` (パターン: ^[0-9]{4}-[0-9]{2}-[0-9]{2}$)
    - health_insurance_qualification_required: boolean - 健康保険の資格確認書の発行が必要かどうか
    - phone_type: string - 電話番号の種別
      - unselected 未選択
      - home 自宅
      - office 勤務先
      - mobile 携帯
      - other その他 (選択肢: unselected, home, office, mobile, other)
    - phone1: string - 電話番号1（先頭番号、例:03-1111-222x の03部分） 例: `000`
    - phone2: string - 電話番号2（中間番号、例:03-1111-222x の1111部分） 例: `0000`
    - phone3: string - 電話番号3（末尾番号、例:03-1111-222x の222x部分） 例: `0000`
    - destroy: boolean - 家族情報を削除するか 例: `false`
    - social_insurance_and_tax_dependent*: string - 扶養状況 social_insurance_and_tax: 所得税・住民税と社会保険, tax_only: 所得税・住民税のみ, social_insurance_only: 社会保険のみ, not_dependent: 扶養していない (選択肢: social_insurance_and_tax, tax_only, social_insurance_only, not_dependent)
    - social_insurance_dependent_acquisition_date: string(date) - 社会保険の扶養加入日
    - social_insurance_dependent_acquisition_reason: string - 社会保険の扶養加入理由 配偶者の場合 "": 未選択, start_working: 配偶者の就職, marriage: 婚姻, turnover: 離職, decrease_in_income: 収入減少, other: その他 配偶者以外の場合 "": 未選択, birth: 出生, turnover: 離職, decrease_in_income: 収入減, live_in: 同居, other: その他 (選択肢: , start_working, marriage, turnover, decrease_in_income, other, birth, live_in)
    - social_insurance_other_dependent_acquisition_reason: string - 社会保険のその他の扶養加入理由
    - social_insurance_dependent_disqualification_date: string(date) - 社会保険の扶養喪失日
    - social_insurance_dependent_disqualification_reason: string - 社会保険の扶養喪失理由 配偶者の場合 "": 未選択, death: 死亡, divorce: 離婚, start_working_or_increase_in_income: 就職・収入増加, reach_75_years_old: 歳到達, disability: 障害認定, other: その他 配偶者以外の場合 "": 未選択, death: 死亡, start_working: 就職, increase_in_income: 収入増加, reach_75_years_old: ７５歳到達, disability: 障害認定, other: その他 (選択肢: , death, divorce, start_working_or_increase_in_income, reach_75_years_old, disability, other, start_working, increase_in_income)
    - social_insurance_other_dependent_disqualification_reason: string - 社会保険のその他の扶養喪失理由
    - tax_dependent_acquisition_date: string(date) - 税扶養の加入日
    - tax_dependent_acquisition_reason: string - 税扶養の加入理由 配偶者の場合 "": 未選択, start_working: 配偶者の就職, marriage: 婚姻, turnover: 離職, decrease_in_income: 収入減少, other: その他 配偶者以外の場合 "": birth: 出生, turnover: 離職, decrease_in_income: 収入減, live_in: 同居, other: その他 (選択肢: , start_working, marriage, turnover, decrease_in_income, other, birth, live_in)
    - tax_other_dependent_acquisition_reason: string - 税扶養のその他の加入理由
    - tax_dependent_disqualification_date: string(date) - 税扶養の喪失日
    - tax_dependent_disqualification_reason: string - 税扶養の喪失理由 配偶者の場合 "": 未選択, death: 死亡, divorce: 離婚, start_working_or_increase_in_income: 就職・収入増加, reach_75_years_old: 歳到達, disability: 障害認定, other: その他 配偶者以外の場合 "": 未選択, death: 死亡, start_working: 就職, increase_in_income: 収入増加, reach_75_years_old: ７５歳到達, disability: 障害認定, other: その他 (選択肢: , death, divorce, start_working_or_increase_in_income, reach_75_years_old, disability, other, start_working, increase_in_income)
    - tax_other_dependent_disqualification_reason: string - 税扶養のその他の喪失理由
    - non_resident_dependents_reason: string(string) - 非居住者である親族の条件 none: なし, over_16_to_under_30_or_over_70: 16歳以上30歳未満又は70歳以上, study_abroad: 留学, handicapped: 障害者, over_38_man: 38万円以上の支払 (選択肢: none, over_16_to_under_30_or_over_70, study_abroad, handicapped, over_38_man)

### レスポンス

- employee_dependent_rules: array[object] - 家族情報ルール
