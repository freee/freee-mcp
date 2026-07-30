---
"freee-mcp": patch
---

販売(sm)の前受金APIリリースに追従し、レシピ・リファレンス・スキーマを同期

- 前受金(`/advance_receipts`)の一覧・詳細・取消・取崩・定期取崩を追加
- 売上予定(`/sales_schedules`)・定期売上(`/periodic_sales`)・発注(`/purchase_orders`)・仕入(`/procurements`)をパス一覧に追記
- 各リソースの取消・復元・ステータス変更のサブパスを網羅し、仕入登録の使用例を追加
