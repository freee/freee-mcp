# Deals

取引（収入・支出）

## GET /api/1/deals — 取引（収入・支出）一覧の取得

概要 指定した事業所の取引（収入・支出）一覧を取得する

定義
issue_date : 発生日 due_date : 支払期日 amount : 金額 due_amount : 支払残額 type income : 収入 expense : 支出 details : 取引の明細行 accruals : 取引の債権債務行 renews : 取引の+更新行 payments : 取引の支払行 from_walletable_type bank_account : 銀行口座 credit_card : クレジットカード wallet : 現金 private_account_item : プライベート資金（法人の場合は役員借入金もしくは役員借入金、個人の場合は事業主貸もしくは事業主借）

注意点
セグメントタグ情報は法人アドバンスプラン（および旧法人プロフェッショナルプラン）以上で利用可能です。利用可能なセグメントの数は、法人アドバンスプラン（および旧法人プロフェッショナルプラン）の場合は1つ、法人エンタープライズプランの場合は3つです。 partner_codeを利用するには、事業所の設定か...

### パラメータ

- company_id*: integer(int64) - 事業所ID
- partner_id: integer(int64) - 取引先IDで絞込
- account_item_id: integer(int64) - 勘定科目IDで絞込
- partner_code: string - 取引先コードで絞込
- status: string - 決済状況で絞込 (未決済: unsettled, 完了: settled) (選択肢: unsettled, settled)
- type: string - 収支区分 (収入: income, 支出: expense) (選択肢: income, expense)
- start_issue_date: string - 発生日で絞込：開始日(yyyy-mm-dd)
- end_issue_date: string - 発生日で絞込：終了日(yyyy-mm-dd)
- start_due_date: string - 支払期日で絞込：開始日(yyyy-mm-dd)
- end_due_date: string - 支払期日で絞込：終了日(yyyy-mm-dd)
- start_renew_date: string - +更新日で絞込：開始日(yyyy-mm-dd)
- end_renew_date: string - +更新日で絞込：終了日(yyyy-mm-dd)
- offset: integer(int64) - 取得レコードのオフセット (デフォルト: 0)
- limit: integer(int64) - 取得レコードの件数 (デフォルト: 20, 最大: 100)
- accruals: string - 取引の債権債務行の表示（without: 表示しない(デフォルト), with: 表示する） (選択肢: without, with)

### レスポンス

- deals*: array[object]
- meta*: object

## POST /api/1/deals — 取引（収入・支出）の作成

概要 指定した事業所の取引（収入・支出）を作成する

定義
issue_date : 発生日 due_date : 支払期日 amount : 金額 due_amount : 支払残額 type income : 収入 expense : 支出 ref_number : 管理番号 details : 取引の明細行(最大100行) payments : 取引の支払行 receipt_ids : ファイルボックス（証憑ファイル）ID from_walletable_type bank_account : 銀行口座 credit_card : クレジットカード wallet : 現金 private_account_item : プライベート資金（法人の場合は役員借入金もしくは役員借入金、個人の場合は事業主貸もしくは事業主借）

注意点
本APIでは+更新行(renews)の操作ができません。取引（収入・支出）の+更新の作成APIをご利用ください。 セグメントタグ情報は法人アドバンスプラン（および旧法人プロフェッショナルプラン）以上で利用可能です。利用可能なセグメントの数は、法人アドバンスプラン...

### リクエストボディ

- issue_date*: string - 発生日 (yyyy-mm-dd) 例: `2019-12-17`
- type*: string - 収支区分 (収入: income, 支出: expense) (選択肢: income, expense) 例: `income`
- company_id*: integer(int64) - 事業所ID 例: `1` (最小: 1)
- due_date: string - 支払期日(yyyy-mm-dd) 例: `2019-12-17`
- partner_id: integer(int64) - 取引先ID 例: `1` (最小: 1)
- partner_code: string - 取引先コード 例: `code001`
- ref_number: string - 管理番号 例: `1`
- details*: array[object]
  配列の要素:
    - tax_code*: integer(int64) - 税区分コード 例: `1` (最小: 0, 最大: 2147483647)
    - account_item_id: integer(int64) - 勘定科目ID 例: `1` (最小: 1)
    - account_item_code: string - 勘定科目コード 例: `code001`
    - amount*: integer(int64) - 取引金額（税込で指定してください）

      マイナスの値を指定した場合、控除・マイナス行として登録されます。

      上記以外の値を指定した場合、通常行として登録されます。 例: `1` (最小: -9223372036854776000, 最大: 9223372036854776000)
    - item_id: integer(int64) - 品目ID 例: `1` (最小: 1)
    - item_code: string - 品目コード 例: `code001`
    - section_id: integer(int64) - 部門ID 例: `1` (最小: 1)
    - section_code: string - 部門コード 例: `code001`
    - partner_id: integer(int64) - 取引先ID 例: `1` (最小: 0)
    - partner_code: string - 取引先コード 例: `code001`
    - tag_ids: array[integer] - メモタグID
    - segment_1_tag_id: integer(int64) - セグメント１タグID 例: `1` (最小: 1)
    - segment_1_tag_code: string - セグメント１タグコード 例: `code001`
    - segment_2_tag_id: integer(int64) - セグメント２タグID 例: `1` (最小: 1)
    - segment_2_tag_code: string - セグメント２タグコード 例: `code001`
    - segment_3_tag_id: integer(int64) - セグメント３タグID 例: `1` (最小: 1)
    - segment_3_tag_code: string - セグメント３タグコード 例: `code001`
    - description: string - 備考 例: `備考`
    - vat: integer(int64) - 消費税額（指定しない場合は自動で計算されます）。 tax_code で税額が不要な税区分を指定する場合は指定できません。 例: `800`
- payments: array[object] - 支払行一覧（配列）：未指定の場合、未決済の取引を作成します。
  配列の要素:
    - amount*: integer(int64) - 支払金額：payments指定時は必須 例: `5250` (最小: -9223372036854776000, 最大: 9223372036854776000)
    - from_walletable_id*: integer(int64) - 口座ID（from_walletable_typeがprivate_account_itemの場合は勘定科目ID）：payments指定時は必須 例: `1` (最小: 1)
    - from_walletable_type*: string - 口座区分 (銀行口座: bank_account, クレジットカード: credit_card, 現金: wallet, プライベート資金: private_account_item)：payments指定時は必須 (選択肢: bank_account, credit_card, wallet, private_account_item) 例: `bank_account`
    - date*: string - 支払日：payments指定時は必須 例: `2019-12-17`
- receipt_ids: array[integer] - ファイルボックス（証憑ファイル）ID（配列）

### レスポンス

- deal*: object

## GET /api/1/deals/{id} — 取引（収入・支出）の取得

概要 指定した事業所の取引（収入・支出）を取得する

定義
issue_date : 発生日 due_date : 支払期日 amount : 金額 due_amount : 支払残額 type income : 収入 expense : 支出 details : 取引の明細行 accruals : 取引の債権債務行 renews : 取引の+更新行 payments : 取引の支払行 from_walletable_type bank_account : 銀行口座 credit_card : クレジットカード wallet : 現金 private_account_item : プライベート資金（法人の場合は役員借入金もしくは役員借入金、個人の場合は事業主貸もしくは事業主借）

注意点
セグメントタグ情報は法人アドバンスプラン（および旧法人プロフェッショナルプラン）以上で利用可能です。利用可能なセグメントの数は、法人アドバンスプラン（および旧法人プロフェッショナルプラン）の場合は1つ、法人エンタープライズプランの場合は3つです。

### パラメータ

- company_id*: integer(int64) - 事業所ID
- id* (path): integer(int64)
- accruals: string - 取引の債権債務行の表示（without: 表示しない(デフォルト), with: 表示する） (選択肢: without, with)

### レスポンス

POST /api/1/deals と同じ

## PUT /api/1/deals/{id} — 取引（収入・支出）の更新

概要 指定した事業所の取引（収入・支出）を更新する

定義
issue_date : 発生日 due_date : 支払期日 amount : 金額 due_amount : 支払残額 type income : 収入 expense : 支出 details : 取引の明細行(最大100行) renews : 取引の+更新行 payments : 取引の支払行 from_walletable_type bank_account : 銀行口座 credit_card : クレジットカード wallet : 現金 private_account_item : プライベート資金（法人の場合は役員借入金もしくは役員借入金、個人の場合は事業主貸もしくは事業主借） receipt_ids : ファイルボックス（証憑ファイル）ID

注意点
本APIでは支払行(payments)の操作ができません。取引（収入・支出）の支払行の作成・更新・削除APIをご利用ください。 本APIでは+更新行(renews)の操作ができません。取引（収入・支出）の+更新の作成・更新・削除APIをご利用ください。 本APIで...

### パラメータ

- id* (path): integer(int64) - 取引ID

### リクエストボディ

- issue_date*: string - 発生日 (yyyy-mm-dd) 例: `2019-12-17`
- type*: string - 収支区分 (収入: income, 支出: expense) (選択肢: income, expense) 例: `income`
- company_id*: integer(int64) - 事業所ID 例: `1` (最小: 1)
- due_date: string - 支払期日(yyyy-mm-dd) 例: `2019-12-17`
- partner_id: integer(int64) - 取引先ID 例: `1` (最小: 1)
- partner_code: string - 取引先コード 例: `code001`
- ref_number: string - 管理番号 例: `1`
- details*: array[object]
  配列の要素:
    - id: integer(int64) - 取引行ID: 既存取引行を更新する場合に指定します。IDを指定しない取引行は、新規行として扱われ追加されます。また、detailsに含まれない既存の取引行は削除されます。更新後も残したい行は、必ず取引行IDを指定してdetailsに含めてください。 例: `1` (最小: 1)
    - tax_code*: integer(int64) - 税区分コード 例: `1` (最小: 0, 最大: 2147483647)
    - account_item_id*: integer(int64) - 勘定科目ID 例: `1` (最小: 1)
    - amount*: integer(int64) - 取引金額（税込で指定してください）

      マイナスの値を指定した場合、控除・マイナス行として登録されます。

      上記以外の値を指定した場合、通常行として登録されます。 例: `1` (最小: -9223372036854776000, 最大: 9223372036854776000)
    - item_id: integer(int64) - 品目ID 例: `1` (最小: 1)
    - section_id: integer(int64) - 部門ID 例: `1` (最小: 1)
    - partner_id: integer(int64) - 取引先ID 例: `1` (最小: 0)
    - tag_ids: array[integer] - メモタグID
    - segment_1_tag_id: integer(int64) - セグメント１タグID 例: `1` (最小: 1)
    - segment_2_tag_id: integer(int64) - セグメント２タグID 例: `1` (最小: 1)
    - segment_3_tag_id: integer(int64) - セグメント３タグID 例: `1` (最小: 1)
    - description: string - 備考 例: `備考`
    - vat: integer(int64) - 消費税額（指定しない場合は自動で計算されます）。 tax_code で税額が不要な税区分を指定する場合は指定できません。 例: `800`
- receipt_ids: array[integer] - ファイルボックス（証憑ファイル）ID（配列）

### レスポンス

POST /api/1/deals と同じ

## DELETE /api/1/deals/{id} — 取引（収入・支出）の削除

概要 指定した取引（収入・支出）を削除する

### パラメータ

- id* (path): integer(int64) - 取引ID
- company_id*: integer(int64) - 事業所ID
