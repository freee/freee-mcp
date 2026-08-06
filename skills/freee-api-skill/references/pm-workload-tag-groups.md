# WorkloadTagGroups

## 概要

WorkloadTagGroupsの操作

## エンドポイント一覧

### GET /workload_tag_groups

操作: 工数タグの取得

説明: 事業所の工数タググループと、その配下に属する工数タグの一覧を取得します。

### パラメータ

| 名前 | 位置 | 必須 | 型 | 説明 |
|------|------|------|-----|------|
| company_id | query | はい | integer | 事業所ID |
| limit | query | いいえ | integer | 取得レコードの件数（デフォルト：50, 最小：1, 最大：100） |
| offset | query | いいえ | integer | 取得レコードのオフセット（デフォルト：0） |

### レスポンス (200)

成功時

- workload_tag_groups (必須): array[object]
  配列の要素:
    - id (必須): integer - 工数タググループID 例: `1`
    - name (必須): string - 工数タググループ名 例: `工程`
    - workload_tags (必須): array[object] - 配下の工数タグ
- meta (必須): object



## 参考情報

- freee API公式ドキュメント: https://developer.freee.co.jp/docs
