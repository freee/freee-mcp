# Approval flow routes

申請経路

## GET /api/1/approval_flow_routes — 申請経路一覧の取得

概要 指定した事業所の申請経路一覧を取得する 各種申請APIの使い方については、 freee会計の各種申請APIの使い方 をご参照ください 経費精算APIの使い方については、 freee会計の経費精算APIの使い方 をご参照ください

注意点
申請経路、承認者の指定として部門役職データ連携を活用し、以下のいずれかを利用している申請と申請経路はAPI経由で参照は可能ですが、作成と更新、承認ステータスの変更ができません。 役職指定（申請者の所属部門） 役職指定（申請時に部門指定） 部門および役職指定

### パラメータ

- company_id*: integer(int64) - 事業所ID
- included_user_id: integer(int64) - 経路に含まれるユーザーのユーザーID
- usage: string - 申請種別（各申請種別が使用できる申請経路に絞り込めます。例えば、ApprovalRequest を指定すると、各種申請が使用できる申請経路に絞り込めます。）
  * `TxnApproval` - 仕訳承認
  * `ExpenseApplication` - 経費精算
  * `PaymentRequest` - 支払依頼
  * `ApprovalRequest` - 各種申請
  * `DocApproval` - 請求書等 (見積書・納品書・請求書・発注書) (選択肢: TxnApproval, ExpenseApplication, PaymentRequest, ApprovalRequest, DocApproval)
- request_form_id: integer - 申請フォームID request_form_id指定時はusage条件をApprovalRequestに指定してください。指定しない場合無効になります。

### レスポンス

- approval_flow_routes*: array[object]

## GET /api/1/approval_flow_routes/{id} — 申請経路の取得

概要 指定した事業所の申請経路を取得する 各種申請APIの使い方については、 freee会計の各種申請APIの使い方 をご参照ください 経費精算APIの使い方については、 freee会計の経費精算APIの使い方 をご参照ください

注意点
申請経路、承認者の指定として部門役職データ連携を活用し、以下のいずれかを利用している申請と申請経路はAPI経由で参照は可能ですが、作成と更新、承認ステータスの変更ができません。 役職指定（申請者の所属部門） 役職指定（申請時に部門指定） 部門および役職指定

### パラメータ

- id* (path): integer - 経路申請ID
- company_id*: integer - 事業所ID

### レスポンス

- approval_flow_route*: object
