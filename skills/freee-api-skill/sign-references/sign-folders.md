# フォルダ

## GET /v1/folders — フォルダ一覧の取得

フォルダ一覧を取得する

### パラメータ

- page: object
- per_page: object
- parent_id: object - 親フォルダID。IDで指定した親フォルダに格納されているフォルダ一覧を取得できる。
- name: string - フォルダ名に一致する一覧を取得できる（部分一致も可）

### レスポンス

取得成功

ホームもレスポンスに含まれます。
