# フォルダ

## GET /v1/folders — フォルダ一覧の取得

フォルダ一覧を取得する

### パラメータ

- page: integer - 取得ページ番号
- per_page: integer - 取得件数
- parent_id: integer(int64) - フォルダID
- name: string - フォルダ名に一致する一覧を取得できる（部分一致も可）

### レスポンス

取得成功

ホームもレスポンスに含まれます。
