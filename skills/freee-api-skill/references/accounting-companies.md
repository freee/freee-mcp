# Companies

事業所

## GET /api/1/companies — 事業所一覧の取得

概要 ユーザーが所属する事業所一覧を取得する

### レスポンス

- companies*: array[object]

## GET /api/1/companies/{id} — 事業所の取得

概要 ユーザーが所属する事業所を取得する

### パラメータ

- id* (path): integer(int64) - 事業所ID
- details: boolean - 取得情報に勘定科目・税区分コード・品目・取引先・部門・メモタグ・口座の一覧を含める (選択肢: true)
- account_items: boolean - 取得情報に勘定科目一覧を含める (選択肢: true)
- taxes: boolean - 取得情報に税区分コード一覧を含める (選択肢: true)
- items: boolean - 取得情報に品目一覧を含める (選択肢: true)
- partners: boolean - 取得情報に取引先一覧を含める (選択肢: true)
- sections: boolean - 取得情報に部門一覧を含める (選択肢: true)
- tags: boolean - 取得情報にメモタグ一覧を含める (選択肢: true)
- walletables: boolean - 取得情報に口座一覧を含める (選択肢: true)

### レスポンス

- company*: object
