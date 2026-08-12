# Selectables

フォーム用選択項目情報

## GET /api/1/forms/selectables — フォーム用選択項目情報の取得

概要 指定した事業所のフォーム用選択項目情報を取得する

### パラメータ

- company_id*: integer(int64) - 事業所ID
- includes: string - 取得する項目(項目: account_item) (選択肢: account_item)

### レスポンス

- account_categories: array[object]
- account_groups: array[object] - 決算書表示名（小カテゴリー）
