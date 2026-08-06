# テンプレート

## GET /v1/templates — テンプレート一覧取得

テンプレート一覧を取得する

### パラメータ

- title: string - テンプレート名に一致する一覧を取得できる（部分一致も可）
- page: object
- per_page: object

### レスポンス

テンプレート一覧取得成功

## GET /v1/templates/{template_id} — テンプレート取得

テンプレートを取得する。 PDF を取得したい場合は、Media Type を application/pdf にしてください。

### レスポンス

取得成功
- id*: integer(int64) - 文書テンプレートID
- title*: string - テンプレートのタイトル
- message: string - テンプレートのメッセージ。送信時にデフォルトメッセージとして相手方に表示されます
- folder_id*: integer(int64) - テンプレートの保存先フォルダのID
- signers_count: integer - 相手方の人数
- skip_approval*: boolean - trueの場合、配付文書（署名合意をスキップする文書）のテンプレート。
  falseの場合、署名・合意文書のテンプレート。
- items: array[object] - テンプレート入力項目一覧
