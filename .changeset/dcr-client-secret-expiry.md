---
"freee-mcp": patch
---

Remote モードで DCR クライアントの client_secret が30日で失効し、認可後の `/token` で `invalid_client: Client secret has expired` となる問題を修正。

- 発行する client_secret を無期限化（登録レコードの寿命と揃える）
- 既存の失効クライアントは再登録時に自動で再発行し、手動オペなしで回復するように変更

claude.ai 等のベンダー経由クライアントは1つの登録を全ユーザーで共有するため、失効すると全ユーザーが同時に接続不能になっていた。
