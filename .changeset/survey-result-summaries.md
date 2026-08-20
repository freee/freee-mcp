---
"freee-mcp": minor
---

freeeサーベイAPIに全社平均・サーベイ結果・AI個人分析の取得エンドポイントを追加

- `list_survey_company_survey_results` / `list_survey_employee_survey_results` / `list_survey_result_summaries` の3エンドポイントが利用可能になりました
- いずれも参照系（GET）のみで、作成・更新・削除には対応していません
- サーベイAPIは freee-mcp（リモート版）でのみ利用できます。ローカルモードでは呼び出せません
