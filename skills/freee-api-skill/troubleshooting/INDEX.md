# トラブルシューティング

freee API スキル使用時の問題と解決方法。症状に応じて以下を参照する。

- `troubleshooting/auth.md` - 認証エラー（401 / 403）、接続モードの確認、OAuth 認証画面が表示されない
- `troubleshooting/company.md` - 事業所が見つからない、事業所の切り替え、company_id の不整合、工数管理・販売APIの500エラー
- `troubleshooting/expense-errors.md` - 経費申請の作成・取得時のエラー、経費科目・部門IDの確認、経費申請のよくある質問
- `troubleshooting/support.md` - freee API 自体の機能制限、要望の送り先、問い合わせ先

## 問い合わせ前に確認すること

1. `freee_auth_status` で認証を確認したか
2. `freee_get_current_company` で事業所を確認したか
3. エラーメッセージを正確に確認したか
4. freee-mcp の問題か、freee API の機能制限か（`troubleshooting/support.md`）
