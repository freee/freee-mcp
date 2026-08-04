# 従業員の銀行口座

従業員の銀行口座の操作

## GET /api/v1/employees/{employee_id}/bank_account_rule — 従業員の銀行口座の取得

概要 指定した従業員・日付の銀行口座情報を返します。

### パラメータ

- company_id*: integer - 事業所ID
- year*: integer - 従業員情報を取得したい年
- month*: integer - 従業員情報を取得したい月

  締め日支払い日設定が翌月払いの従業員情報の場合は、 指定したmonth + 1の値が検索結果として返します。

  翌月払いの従業員の2022/01の従業員情報を取得する場合は、year=2021,month=12を指定してください。
- employee_id* (path): integer - 従業員ID

### レスポンス

- employee_bank_account_rule: object

## PUT /api/v1/employees/{employee_id}/bank_account_rule — 従業員の銀行口座の更新

概要 指定した従業員の銀行口座1の情報を更新します。

### パラメータ

- employee_id* (path): integer - 従業員ID

### リクエストボディ

- company_id*: integer(int32) - 更新対象事業所ID（必須） (最小: 1, 最大: 2147483647)
- year*: integer(int32) - 更新対象年（必須） 例: `2021` (最小: 2000, 最大: 2100)
- month*: integer(int32) - 更新対象月（必須）

  締め日支払い日設定が翌月払いの従業員情報の場合は、 指定したmonth + 1の値が更新されます。

  翌月払いの従業員の2022/01の従業員情報を更新する場合は、year=2021,month=12を指定してください。 例: `1` (最小: 1, 最大: 12)
- employee_bank_account_rule*: object
  - bank_name: string - 金融機関名
  - bank_name_kana: string - 金融機関名カナ 英字カナのみ
  - bank_code: string - 金融機関コード 数値文字列4桁 例: `0000`
  - branch_name: string - 支店名
  - branch_name_kana: string - 支店名カナ　英字カナのみ
  - branch_code: string - 支店コード 数値文字列3桁 例: `000`
  - account_number: string - 口座番号 数値文字列7桁 例: `0000000`
  - account_name: string - 口座名義カナ　英字カナのみ
  - account_type: string - 預金種類 ordinary: 普通預金, current: 当座預金, saving: 貯蓄預金 (選択肢: ordinary, current, saving)

### レスポンス

GET /api/v1/employees/{employee_id}/bank_account_rule と同じ
