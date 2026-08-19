# 事業所（company_id）のトラブルシューティング

## Company not found

原因: 指定した事業所 ID が存在しないか、アクセス権限がない。

```
freee_list_companies
freee_set_current_company { "company_id": 12345 }
```

## 事業所を切り替えたい

```
freee_list_companies
freee_set_current_company { "company_id": 12345 }
freee_get_current_company
```

複数事業所がある場合、どれを選ぶか不明なときは `freee_list_companies` の事業所名・説明を確認し、判断できなければ経理部門に確認する。

## company_id の不整合

原因: リクエストに含まれる `company_id` と、現在設定されている事業所が異なる。company_id を含むリクエストは、必ず現在の事業所と一致している必要がある。

対処は次のいずれか。

- `freee_set_current_company` で事業所を切り替える
- リクエストの `company_id` を現在の事業所（`freee_get_current_company`）に合わせる

## 工数管理・販売APIで 500 Internal Server Error

原因: `company_id` がリクエストに含まれていない。

指定方法は `recipes/pm-operations.md` および `recipes/sm-operations.md` を参照。
