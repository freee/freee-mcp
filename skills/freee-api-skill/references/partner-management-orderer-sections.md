# partner_management_orderer_sections

partner_management_orderer_sections

## GET /hub/partner_management/orderer/sections — 部門一覧取得（β版）

部門一覧を取得する

### パラメータ

- freee-using-beta* (header): string - オープンベータのエンドポイントのため `true` を指定（必須） (選択肢: true)
- company_id*: integer(int64) - freee事業所ID
- page_size: integer(int32) - 1ページあたりの取得件数（デフォルト20、最大100）
- page_token: string - カーソルトークン。前回レスポンスの next_page_token を指定する
- code: string - 部門コードによる絞り込み

### レスポンス

部門一覧レスポンス
- data*: array[object] - 部門のリスト
- next_page_token*: string - 次ページのカーソルトークン。最終ページは null
