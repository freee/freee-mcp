# Account items

勘定科目

## GET /api/1/account_items/{id} — 勘定科目の取得

概要 指定した勘定科目を取得する 事業所の設定で勘定科目コードを使用する設定にしている場合、レスポンスで勘定科目コード(code)を返します

### パラメータ

- company_id*: integer(int64) - 事業所ID
- id* (path): integer(int64) - 勘定科目ID

### レスポンス

- account_item*: object

## PUT /api/1/account_items/{id} — 勘定科目の更新

概要 指定した勘定科目を更新する

注意点
tax_codeは、指定した事業所の税区分一覧の取得APIでavailableの値がtrue、かつ経過措置税区分ではない5%の税区分を確認して、そのcodeを指定して勘定科目の更新をしてください。例 課対仕入の場合、34を指定してください codeを利用するには、事業所の設定で勘定科目コードを使用する設定にする必要があります。

### パラメータ

- id* (path): integer(int64) - 勘定科目ID

### リクエストボディ*

- company_id*: integer(int64) - 事業所ID 例: `1` (最小: 1)
- account_item*: object
  - name: string - 勘定科目名 (30文字以内)
    口座に紐付かない勘定科目の更新時は必須です。
    口座に紐付く勘定科目の更新時は指定することができません。 例: `新しい勘定科目`
  - shortcut: string - ショートカット1 (20文字以内) 例: `NEWACCOUNTITEM`
  - shortcut_num: string - ショートカット2 (20文字以内) 例: `999`
  - code: string - 勘定科目コード (20文字以内)。半角英数字・ハイフン・アンダースコアのみ利用できます。事業所の設定で勘定科目コードを使用する設定にしている場合のみ有効で、設定が無効の場合は指定しても無視されます。 例: `999` (パターン: ^[0-9a-zA-Z_-]+$)
  - tax_code*: integer(int64) - 税区分コード 指定できるコードは本APIの注意点をご確認ください。 例: `1` (最小: 0, 最大: 2147483647)
  - group_name*: string - 決算書表示名（小カテゴリー） Selectablesフォーム用選択項目情報エンドポイント(account_groups.name)で取得可能です 例: `その他預金`
  - account_category_id*: integer(int64) - 勘定科目カテゴリーID Selectablesフォーム用選択項目情報エンドポイント(account_groups.account_category_id)で取得可能です 例: `1` (最小: 1)
  - corresponding_income_id*: integer(int64) - 収入取引相手勘定科目ID 例: `1`
  - corresponding_expense_id*: integer(int64) - 支出取引相手勘定科目ID 例: `1` (最小: 1)
  - accumulated_dep_account_item_id: integer(int64) - 減価償却累計額勘定科目ID（法人のみ利用可能） 例: `1` (最小: 1)
  - searchable: integer(int64) - 検索可能:2, 検索不可：3(登録時未指定の場合は2で登録されます。更新時未指定の場合はsearchableは変更されません。) 例: `2` (最小: 2, 最大: 3)
  - items: array[object] - 勘定科目に紐付ける品目の一覧
  - partners: array[object] - 勘定科目に紐付ける取引先の一覧

### レスポンス

GET /api/1/account_items/{id} と同じ

## DELETE /api/1/account_items/{id} — 勘定科目の削除

概要 指定した勘定科目を削除する

注意点
削除できる勘定科目は、追加で作成したカスタム勘定科目のみです。 デフォルトで存在する勘定科目や口座の勘定科目は削除できません。

### パラメータ

- id* (path): integer(int64) - 勘定科目ID
- company_id*: integer(int64) - 事業所ID

## GET /api/1/account_items — 勘定科目一覧の取得

概要 指定した事業所の勘定科目一覧を取得する

定義
default_tax_code : リクエストした日時を基準とした税区分コード

注意点
default_tax_code は勘定科目作成・更新時に利用するものではありません 事業所の設定で勘定科目コードを使用する設定にしている場合、レスポンスで勘定科目コード(code)を返します

### パラメータ

- company_id*: integer(int64) - 事業所ID
- base_date: string - 基準日(yyyy-mm-dd)。指定した場合、勘定科目に紐づく税区分(default_tax_code)が、基準日の税率に基づいて返ります。指定しない場合はリクエスト日が基準日になります。
- start_update_date: string - 更新日で絞込：開始日(yyyy-mm-dd)。指定した日以降に更新された勘定科目を返します。
- end_update_date: string - 更新日で絞込：終了日(yyyy-mm-dd)。指定した日以前に更新された勘定科目を返します。

### レスポンス

- account_items*: array[object]

## POST /api/1/account_items — 勘定科目の作成

概要 指定した事業所の勘定科目を作成する

注意点
tax_codeは、指定した事業所の税区分一覧の取得APIでavailableの値がtrue、かつ経過措置税区分ではない5%の税区分を確認して、そのcodeを指定して勘定科目の作成をしてください。例 課対仕入の場合、34を指定してください codeを利用するには、事業所の設定で勘定科目コードを使用する設定にする必要があります。

### リクエストボディ*

- company_id*: integer(int64) - 事業所ID 例: `1` (最小: 1)
- account_item*: object
  - name*: string - 勘定科目名 (30文字以内) 例: `新しい勘定科目`
  - shortcut: string - ショートカット1 (20文字以内) 例: `NEWACCOUNTITEM`
  - shortcut_num: string - ショートカット2 (20文字以内) 例: `999`
  - code: string - 勘定科目コード (20文字以内)。半角英数字・ハイフン・アンダースコアのみ利用できます。事業所の設定で勘定科目コードを使用する設定にしている場合のみ有効で、設定が無効の場合は指定しても無視されます。 例: `999` (パターン: ^[0-9a-zA-Z_-]+$)
  - tax_code*: integer(int64) - 税区分コード 指定できるコードは本APIの注意点をご確認ください。 例: `1` (最小: 0, 最大: 2147483647)
  - group_name*: string - 決算書表示名（小カテゴリー） Selectablesフォーム用選択項目情報エンドポイント(account_groups.name)で取得可能です 例: `その他預金`
  - account_category_id*: integer(int64) - 勘定科目カテゴリーID Selectablesフォーム用選択項目情報エンドポイント(account_groups.account_category_id)で取得可能です 例: `1` (最小: 1)
  - corresponding_income_id*: integer(int64) - 収入取引相手勘定科目ID 例: `1` (最小: 1)
  - corresponding_expense_id*: integer(int64) - 支出取引相手勘定科目ID 例: `1` (最小: 1)
  - accumulated_dep_account_item_id: integer(int64) - 減価償却累計額勘定科目ID（法人のみ利用可能） 例: `1` (最小: 1)
  - searchable: integer(int64) - 検索可能:2, 検索不可：3(登録時未指定の場合は2で登録されます。更新時未指定の場合はsearchableは変更されません。) 例: `2` (最小: 2, 最大: 3)
  - items: array[object] - 勘定科目に紐付ける品目の一覧
  - partners: array[object] - 勘定科目に紐付ける取引先の一覧

### レスポンス

GET /api/1/account_items/{id} と同じ

## PUT /api/1/account_items/code/upsert — 勘定科目の更新（存在しない場合は作成）

概要 勘定科目コードをキーに、指定した勘定科目の情報を更新（存在しない場合は作成）する リクエストのトップレベルのcodeに指定した勘定科目コードに一致する勘定科目が存在する場合は更新（ステータスコード200）、存在しない場合は作成（ステータスコード201）します

注意点
本APIを利用するには、事業所の設定で勘定科目コードを使用する設定にする必要があります。設定が無効の場合はエラー（ステータスコード400）になります。 更新対象を特定する勘定科目コードはトップレベルのcodeで指定してください。account_item.codeは指定できません（指定した場合はエラーになります）。 tax_codeは、指定した事業所の税区分一覧の取得APIでavailableの値がtrue、かつ経過措置税区分ではない5%の税区分を確認して、そのcodeを指定して勘定科目の更新をしてください。例 課対仕入の場合、34を指定してください

### リクエストボディ*

- code*: string - 勘定科目コード (20文字以内)。半角英数字・ハイフン・アンダースコアのみ利用できます。このコードをキーに勘定科目を検索し、一致する勘定科目が存在すれば更新、存在しなければ作成します。 例: `999` (パターン: ^[0-9a-zA-Z_-]+$)
- company_id*: integer(int64) - 事業所ID 例: `1` (最小: 1)
- account_item*: object
  - name: string - 勘定科目名 (30文字以内)
    口座に紐付かない勘定科目の更新時は必須です。
    口座に紐付く勘定科目の更新時は指定することができません。 例: `新しい勘定科目`
  - shortcut: string - ショートカット1 (20文字以内) 例: `NEWACCOUNTITEM`
  - shortcut_num: string - ショートカット2 (20文字以内) 例: `999`
  - tax_code*: integer(int64) - 税区分コード 指定できるコードは本APIの注意点をご確認ください。 例: `1` (最小: 0, 最大: 2147483647)
  - group_name*: string - 決算書表示名（小カテゴリー） Selectablesフォーム用選択項目情報エンドポイント(account_groups.name)で取得可能です 例: `その他預金`
  - account_category_id*: integer(int64) - 勘定科目カテゴリーID Selectablesフォーム用選択項目情報エンドポイント(account_groups.account_category_id)で取得可能です 例: `1` (最小: 1)
  - corresponding_income_id*: integer(int64) - 収入取引相手勘定科目ID 例: `1` (最小: 1)
  - corresponding_expense_id*: integer(int64) - 支出取引相手勘定科目ID 例: `1` (最小: 1)
  - accumulated_dep_account_item_id: integer(int64) - 減価償却累計額勘定科目ID（法人のみ利用可能） 例: `1` (最小: 1)
  - searchable: integer(int64) - 検索可能:2, 検索不可：3(登録時未指定の場合は2で登録されます。更新時未指定の場合はsearchableは変更されません。) 例: `2` (最小: 2, 最大: 3)
  - items: array[object] - 勘定科目に紐付ける品目の一覧
  - partners: array[object] - 勘定科目に紐付ける取引先の一覧

### レスポンス

既存の勘定科目を更新した場合
- account_item*: object
