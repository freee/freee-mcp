# Companies

事業所

## GET /api/1/companies — 事業所一覧の取得

概要 アクセストークンのユーザーが所属するすべての事業所の一覧を取得する

注意点
本APIで取得できるのは事業所の基本情報（ID・名称・事業所番号・ユーザー権限）のみです。会計年度や設定情報を含む詳細は事業所の取得（GET /api/1/companies/{id}）を利用してください。 他のAPIのパラメータとして利用する事業所ID（company_id）は、本APIのレスポンスの id を指定します。

### レスポンス

- companies*: array[object] - アクセストークンのユーザーが所属する事業所の一覧

## GET /api/1/companies/{id} — 事業所の取得

概要 指定した事業所の詳細情報（名称・連絡先・各種設定・会計年度の一覧）を取得する

注意点
クエリパラメータを指定しない場合は事業所の基本情報と会計年度の一覧のみを返します。勘定科目・税区分コード・品目・取引先・部門・メモタグ・口座の一覧が必要な場合は、details または対応する個別のクエリパラメータを指定してください。 details および個別指定のクエリパラメータに指定できる値は true のみです。一覧を含めない場合は、false を指定するのではなくパラメータ自体を省略してください。 アクセストークンのユーザーが所属していない事業所IDを指定した場合は 400 (存在しない事業所のid) を返します。所属する事業所のIDは事業所一覧の取得（GET /api/1/companies）で確認できます。

### パラメータ

- id* (path): integer(int64) - 事業所ID。事業所一覧の取得（GET /api/1/companies）のレスポンスの id を指定する
- details: boolean - true を指定すると、レスポンスに勘定科目 (account_items)・税区分コード (tax_codes)・品目 (items)・取引先 (partners)・部門 (sections)・メモタグ (tags)・口座 (walletables) の一覧をまとめて含める。一覧を含めない場合はパラメータ自体を省略する (選択肢: true)
- account_items: boolean - true を指定すると、レスポンスに勘定科目一覧 (account_items) を含める (選択肢: true)
- taxes: boolean - true を指定すると、レスポンスに税区分コード一覧 (tax_codes) を含める (選択肢: true)
- items: boolean - true を指定すると、レスポンスに品目一覧 (items) を含める (選択肢: true)
- partners: boolean - true を指定すると、レスポンスに取引先一覧 (partners) を含める (選択肢: true)
- sections: boolean - true を指定すると、レスポンスに部門一覧 (sections) を含める (選択肢: true)
- tags: boolean - true を指定すると、レスポンスにメモタグ一覧 (tags) を含める (選択肢: true)
- walletables: boolean - true を指定すると、レスポンスに口座一覧 (walletables) を含める (選択肢: true)

### レスポンス

- company*: object
