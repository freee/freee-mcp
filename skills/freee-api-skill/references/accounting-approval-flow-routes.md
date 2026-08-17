# Approval flow routes

申請経路

## GET /api/1/approval_flow_routes — 申請経路一覧の取得

概要 指定した事業所の申請経路一覧を取得する 各種申請APIの使い方については、 freee会計の各種申請APIの使い方 をご参照ください 経費精算APIの使い方については、 freee会計の経費精算APIの使い方 をご参照ください

注意点
申請経路、承認者の指定として部門役職データ連携を活用し、以下のいずれかを利用している申請と申請経路はAPI経由で参照は可能ですが、作成と更新、承認ステータスの変更ができません。 役職指定（申請者の所属部門） 役職指定（申請時に部門指定） 部門および役職指定

### パラメータ

- company_id*: integer(int64) - 事業所ID
- included_user_id: integer(int64) - 経路に含まれるユーザーのユーザーID（指定したユーザーが承認ステップの承認者に含まれる申請経路に絞り込めます）
- usage: string - 申請種別（各申請種別が使用できる申請経路に絞り込めます。例えば、ApprovalRequest を指定すると、各種申請が使用できる申請経路に絞り込めます。未指定の場合は全ての申請種別の申請経路が対象になります。）
  * `TxnApproval` - 仕訳承認
  * `ExpenseApplication` - 経費精算
  * `PaymentRequest` - 支払依頼
  * `ApprovalRequest` - 各種申請
  * `DocApproval` - 請求書等 (見積書・納品書・請求書・発注書) (選択肢: TxnApproval, ExpenseApplication, PaymentRequest, ApprovalRequest, DocApproval)
- request_form_id: integer(int64) - 申請フォームID（指定した申請フォームが使用できる申請経路に絞り込めます。usage に ApprovalRequest を指定した場合のみ有効で、usage が ApprovalRequest 以外または未指定の場合、このパラメータは無視されます。指定した申請フォームが存在しない場合や無効な場合は空配列が返ります。）

### レスポンス

- approval_flow_routes*: array[object] - 申請経路の一覧

## GET /api/1/approval_flow_routes/{id} — 申請経路の取得

概要 指定した事業所の申請経路を取得する 各種申請APIの使い方については、 freee会計の各種申請APIの使い方 をご参照ください 経費精算APIの使い方については、 freee会計の経費精算APIの使い方 をご参照ください

注意点
申請経路、承認者の指定として部門役職データ連携を活用し、以下のいずれかを利用している申請と申請経路はAPI経由で参照は可能ですが、作成と更新、承認ステータスの変更ができません。 役職指定（申請者の所属部門） 役職指定（申請時に部門指定） 部門および役職指定

### パラメータ

- id* (path): integer(int64) - 申請経路ID
- company_id*: integer(int64) - 事業所ID

### レスポンス

- approval_flow_route*: object
