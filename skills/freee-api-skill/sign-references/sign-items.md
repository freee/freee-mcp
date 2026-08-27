# 入力項目・検索項目

## GET /v1/items — 入力項目・検索項目一覧の取得

入力項目・検索項目一覧を取得する。

### パラメータ

- page: integer - 取得ページ番号
- per_page: integer - 取得件数
- display_name: string - 入力項目・検索項目名に一致する一覧を取得できる（部分一致も可）。
- ids[]: array[integer] - 配列で項目IDを指定して、入力項目・検索項目一覧を取得できる。
- active: boolean - 有効, 無効を指定して、入力項目・検索項目一覧を取得できる。
  * true - 有効
  * false - 無効
- input_type: string - 項目タイプを指定して、入力項目・検索項目一覧を取得できる。
  * date - 日付
  * image - 画像
  * number - 数値
  * select - プルダウン
  * string - テキスト
  * acceptance - チェックボックス (選択肢: date, image, number, select, string, acceptance)
- role: string - 用途を指定して、入力項目・検索項目一覧を取得できる。
  * input_item - 入力項目
  * metadata - 検索項目 (選択肢: input_item, metadata)

### レスポンス

取得成功

## POST /v1/items — 入力項目・検索項目の登録

入力項目・検索項目を登録する。

### リクエストボディ

- executor_id: integer(int64) - ユーザーID 例: `1` (最小: 1)
- display_name*: string - 表示名
- input_type*: string - 入力項目のフォーマットを示す
  文書作成時の入力項目値はこのフォーマットに応じて入力する。
  * string - 型はstring。自由入力。
  * date - 型はstring。日付フォーマット（例：2000-10-10）
  * select - 型はstring。選択肢に指定した文字列のみ。
  * number - 型はstring。数字のみ。
  * acceptance - 型はstring。真偽値のみ。
- description: string - 項目の説明
- owner_default_visible: boolean - 自分方の入力項目設定フィールドにてItemを初期表示するかどうか
  指定しない場合は `false` が指定されたものとして扱います。
- signer_default_visible: boolean - 相手方の入力項目設定フィールドにてItemを初期表示するかどうか
  指定しない場合は `false` が指定されたものとして扱います。
- item_options_attributes: array[object] - 入力項目のフォーマットが `select` のときの選択肢
  配列の要素:
    - value: string - 選択肢の内容
- placeholder: string - 入力項目のフォーマットが `string` または `number` のときの入力例
- date_format: string - 入力項目のフォーマットが`date`のときの日付の表示形式
  指定しない場合は `default` が指定されたものとして扱います。
  * default - 西暦（例：2020年1月1日）
  * japanese - 和暦（例：令和2年1月1日） 例: `default`
- role: string - 入力項目の用途
  指定しない場合は `input_item` が指定されたものとして扱います。
  * input_item - 入力項目
  * metadata - 検索項目 例: `input_item`
- encryption_required: boolean - 入力値の暗号化
  指定しない場合は `false` が指定されたものとして扱います。

### レスポンス

登録成功
- id*: integer(int64)
- display_name*: string
- description: string
- input_type*: string
- item_options: array[object]
- role*: string
