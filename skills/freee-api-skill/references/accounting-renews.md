# Renews

取引（収入・支出）の+更新

## POST /api/1/deals/{id}/renews — 取引（収入・支出）の+更新の作成

概要 指定した事業所の取引（収入・支出）の+更新を作成する

定義
issue_date : 発生日 due_date : 支払期日 amount : 金額 due_amount : 支払残額 type income : 収入 expense : 支出 details : 取引の明細行 accruals : 取引の債権債務行 renews : 取引の+更新行 payments : 取引の支払行 from_walletable_type bank_account : 銀行口座 credit_card : クレジットカード wallet : 現金 private_account_item : プライベート資金（法人の場合は役員借入金もしくは役員借入金、個人の場合は事業主貸もしくは事業主借）

注意点
本APIではdetails(取引の明細行)、accruals(債権債務行)、renewsのdetails(+更新の明細行)のみ操作可能です。 本APIで取引を更新すると、消費税の計算方法は必ず内税方式が選択されます。

### パラメータ

- id* (path): integer(int64) - 取引ID

### リクエストボディ*

- company_id*: integer(int64) - 事業所ID 例: `1` (最小: 1)
- update_date*: string - 更新日 (yyyy-mm-dd) 例: `2019-12-17`
- renew_target_id*: integer(int64) - +更新対象行ID (details(取引の明細行), accruals(債権債務行), renewsのdetails(+更新の明細行)のIDを指定) 例: `1` (最小: 1)
- details*: array[object] - +更新の明細行
  配列の要素:
    - account_item_id*: integer(int64) - 勘定科目ID 例: `1` (最小: 1)
    - tax_code*: integer(int64) - 税区分コード 例: `1` (最小: 0, 最大: 2147483647)
    - amount*: integer(int64) - 取引金額（円・税込で指定してください）

      マイナスの値を指定した場合、控除・マイナス行として登録されます。

      上記以外の値を指定した場合、通常行として登録されます。 例: `1080` (最小: -9223372036854776000, 最大: 9223372036854776000)
    - vat: integer(int64) - 消費税額（円。指定しない場合は自動で計算されます） 例: `80` (最小: -9223372036854776000, 最大: 9223372036854776000)
    - item_id: integer(int64) - 品目ID 例: `1` (最小: 1)
    - section_id: integer(int64) - 部門ID 例: `1` (最小: 1)
    - partner_id: integer(int64) - 取引先ID 例: `1` (最小: 0)
    - tag_ids: array[integer] - メモタグID 例: `[1,2,3]`
    - segment_1_tag_id: integer(int64) - セグメント１タグID 例: `1` (最小: 1)
    - segment_2_tag_id: integer(int64) - セグメント２タグID 例: `1` (最小: 1)
    - segment_3_tag_id: integer(int64) - セグメント３タグID 例: `1` (最小: 1)
    - description: string - 備考 例: `備考`

### レスポンス

- deal*: object

## PUT /api/1/deals/{id}/renews/{renew_id} — 取引（収入・支出）の+更新の更新

概要 指定した事業所の取引（収入・支出）の+更新を更新する

定義
issue_date : 発生日 due_date : 支払期日 amount : 金額 due_amount : 支払残額 type income : 収入 expense : 支出 details : 取引の明細行 accruals : 取引の債権債務行 renews : 取引の+更新行 payments : 取引の支払行 from_walletable_type bank_account : 銀行口座 credit_card : クレジットカード wallet : 現金 private_account_item : プライベート資金（法人の場合は役員借入金もしくは役員借入金、個人の場合は事業主貸もしくは事業主借）

注意点
本APIでは+更新の更新のみ可能です。取引や支払行に対する更新はできません。 renew_idにはrenewsのid(+更新ID)を指定してください。renewsのdetailsのid(+更新の明細行ID)を指定できません。 月締めされている仕訳に紐づく＋更新行の編集・削除はできません。 承認済み...

### パラメータ

- id* (path): integer(int64) - 取引ID
- renew_id* (path): integer(int64) - +更新ID

### リクエストボディ*

- company_id*: integer(int64) - 事業所ID 例: `1` (最小: 1)
- update_date*: string - 更新日 (yyyy-mm-dd) 例: `2019-12-17`
- details*: array[object] - +更新の明細行
  配列の要素:
    - account_item_id*: integer(int64) - 勘定科目ID 例: `1` (最小: 1)
    - tax_code*: integer(int64) - 税区分コード 例: `1` (最小: 0, 最大: 2147483647)
    - amount*: integer(int64) - 取引金額（円・税込で指定してください）

      マイナスの値を指定した場合、控除・マイナス行として登録されます。

      上記以外の値を指定した場合、通常行として登録されます。 例: `1080` (最小: -9223372036854776000, 最大: 9223372036854776000)
    - vat: integer(int64) - 消費税額（円。指定しない場合は自動で計算されます） 例: `80` (最小: -9223372036854776000, 最大: 9223372036854776000)
    - item_id: integer(int64) - 品目ID 例: `1` (最小: 1)
    - section_id: integer(int64) - 部門ID 例: `1` (最小: 1)
    - partner_id: integer(int64) - 取引先ID 例: `1` (最小: 0)
    - tag_ids: array[integer] - メモタグID 例: `[1,2,3]`
    - segment_1_tag_id: integer(int64) - セグメント１タグID 例: `1` (最小: 1)
    - segment_2_tag_id: integer(int64) - セグメント２タグID 例: `1` (最小: 1)
    - segment_3_tag_id: integer(int64) - セグメント３タグID 例: `1` (最小: 1)
    - description: string - 備考 例: `備考`

### レスポンス

POST /api/1/deals/{id}/renews と同じ

## DELETE /api/1/deals/{id}/renews/{renew_id} — 取引（収入・支出）の+更新の削除

概要 指定した事業所の取引（収入・支出）の+更新を削除する

注意点
本APIでは+更新の削除のみ可能です。取引や支払行に対する削除はできません。 renew_idにはrenewsのid(+更新ID)を指定してください。renewsのdetailsのid(+更新の明細行ID)を指定できません。 月締めされている仕訳に紐づく＋更新行の編集・削除はできません。 承認済み仕訳に紐づく＋更新行の編集・削除は管理者権限のユーザーのみ可能です。 本APIで取引を更新すると、消費税の計算方法は必ず内税方式が選択されます。

### パラメータ

- id* (path): integer(int64) - 取引ID
- renew_id* (path): integer(int64) - +更新ID
- company_id*: integer(int64) - 事業所ID

### レスポンス

POST /api/1/deals/{id}/renews と同じ
