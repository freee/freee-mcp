# Sections

部門

## GET /api/1/sections — 部門一覧の取得

概要 指定した事業所の部門一覧を取得する 事業所の設定で部門コードを使用する設定にしている場合、レスポンスで部門コード(code)を返します レスポンスの例 GET https://api.freee.co.jp/api/1/sections?company_id=1 // プレミアムプラン、法人スタンダードプラン（および旧法人ベーシックプラン）以上 { &quot;sections&quot; : [ { &quot;id&quot; : 101, &quot;company_id&quot; : 1, &quot;name&quot; : &quot;開発部門&quot;, &quot;long_name&quot;: &quot;開発部門&quot;, &quot;shortcut1&quot; : &quot;DEVELOPER&quot;, &quot;shortcut2&quot; : &quot;123&quot;, &quot;indent_count&quot;: 1, &quot;parent_id&quot;: 11 }, ... ] } // それ以外のプラン ...

### パラメータ

- company_id*: integer(int64) - 事業所ID
- start_update_date: string - 更新日で絞込：開始日(yyyy-mm-dd)
- end_update_date: string - 更新日で絞込：終了日(yyyy-mm-dd)

### レスポンス

- sections*: array[object]

## POST /api/1/sections — 部門の作成

概要 指定した事業所の部門を作成する codeを利用するには、事業所の設定で部門コードを使用する設定にする必要があります。 レスポンスの例 // プレミアムプラン、法人スタンダードプラン（および旧法人ベーシックプラン）以上 { &quot;section&quot; : { &quot;id&quot; : 102, &quot;company_id&quot; : 1, &quot;name&quot; : &quot;開発部門&quot;, &quot;shortcut1&quot; : &quot;DEVELOPER&quot;, &quot;shortcut2&quot; : &quot;123&quot;, &quot;indent_count&quot;: 1, &quot;parent_id&quot;: 101 } } // それ以外のプラン { &quot;section&quot; : { &quot;id&quot; : 102, &quot;company_id&quot; : 1, &quot;name&quot; : &quot;開発部門&quot;, &q...

### リクエストボディ

- company_id*: integer(int64) - 事業所ID 例: `1` (最小: 1)
- name*: string - 部門名 (30文字以内) 例: `開発部門`
- long_name: string - 正式名称 (255文字以内) 例: `xxxx開発部門`
- shortcut1: string - ショートカット１ (20文字以内) 例: `DEVELOPER`
- shortcut2: string - ショートカット２ (20文字以内) 例: `123`
- code: string - 部門コード 例: `code001` (パターン: ^[0-9a-zA-Z_-]+$)
- parent_id: integer(int64) - 親部門ID (プレミアムプラン、法人スタンダードプラン（および旧法人ベーシックプラン）以上) 例: `101` (最小: 1)

### レスポンス

- section*: object

## GET /api/1/sections/{id} — 部門の取得

概要 指定した事業所の部門を取得する 事業所の設定で部門コードを使用する設定にしている場合、レスポンスで部門コード(code)を返します レスポンスの例 // プレミアムプラン、法人スタンダードプラン（および旧法人ベーシックプラン）以上 { &quot;section&quot; : { &quot;id&quot; : 102, &quot;company_id&quot; : 1, &quot;name&quot; : &quot;開発部門&quot;, &quot;long_name&quot;: &quot;開発部門&quot;, &quot;shortcut1&quot; : &quot;DEVELOPER&quot;, &quot;shortcut2&quot; : &quot;123&quot;, &quot;indent_count&quot;: 1, &quot;parent_id&quot;: 101 } } // それ以外のプラン { &quot;section&quot; : { &quot;id&quot; : 102, &quot;company_id&qu...

### パラメータ

- id* (path): integer(int64) - 部門ID
- company_id*: integer(int64) - 事業所ID

### レスポンス

POST /api/1/sections と同じ

## PUT /api/1/sections/{id} — 部門の更新

概要 指定した事業所の部門を更新する codeを利用するには、事業所の設定で部門コードを使用する設定にする必要があります。 レスポンスの例 // プレミアムプラン、法人スタンダードプラン（および旧法人ベーシックプラン）以上 { &quot;section&quot; : { &quot;id&quot; : 102, &quot;company_id&quot; : 1, &quot;name&quot; : &quot;開発部門&quot;, &quot;long_name&quot;: &quot;開発部門&quot;, &quot;shortcut1&quot; : &quot;DEVELOPER&quot;, &quot;shortcut2&quot; : &quot;123&quot;, &quot;indent_count&quot;: 1, &quot;parent_id&quot;: 101 } } // それ以外のプラン { &quot;section&quot; : { &quot;id&quot; : 102, &quot;company_id&quot; : 1...

### パラメータ

- id* (path): integer(int64)

### リクエストボディ

POST /api/1/sections と同じ

### レスポンス

POST /api/1/sections と同じ

## DELETE /api/1/sections/{id} — 部門の削除

概要 指定した事業所の部門を削除する

### パラメータ

- id* (path): integer(int64)
- company_id*: integer(int64) - 事業所ID

## PUT /api/1/sections/code/upsert — 部門の更新（存在しない場合は作成）

概要 部門コードをキーに、指定した部門の情報を更新（存在しない場合は作成）する

注意点
codeを利用するには、事業所の設定で部門コードを使用する設定にする必要があります。

### リクエストボディ*

- company_id*: integer(int64) - 事業所ID 例: `1` (最小: 1)
- code*: string - 部門コード 例: `code001` (パターン: ^[0-9a-zA-Z_-]+$)
- section*: object
  - name*: string - 部門名 (30文字以内) 例: `開発部門`
  - long_name: string - 正式名称 (255文字以内) 例: `xxxx開発部門`
  - shortcut1: string - ショートカット１ (20文字以内) 例: `DEVELOPER`
  - shortcut2: string - ショートカット２ (20文字以内) 例: `123`
  - parent_code: string - 親部門コード。親部門コードの値が空の場合は、codeで指定した部門が親部門になる。 例: `code001` (パターン: ^[0-9a-zA-Z_-]+$)

### レスポンス

POST /api/1/sections と同じ
