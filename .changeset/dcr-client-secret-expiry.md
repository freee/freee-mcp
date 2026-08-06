---
"freee-mcp": patch
---

Remote モードで DCR クライアントの client_secret が30日で失効し、認可後の `/token` で `invalid_client: Client secret has expired` となる問題を修正。

- 発行する client_secret を無期限化（登録レコードの寿命と揃える）
- `/register` の dedup が失効済み client_secret を持つ登録を返さないようにした。失効時はヒットしなかったものとして扱い、fingerprint インデックスを削除して新規登録を発行する

claude.ai 等のベンダー経由クライアントは1つの登録を全ユーザーで共有するため、失効すると全ユーザーが同時に接続不能になっていた。さらに再登録しても metadata が同一で dedup が同じ失効登録を返すため、クライアント側からは復旧できなかった。修正前に発行済みの失効クライアントも、次回登録時に手動オペなしで自動回復する。
