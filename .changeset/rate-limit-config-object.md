---
"freee-mcp": patch
---

Remote モードの rate limit パラメータをエンドポイント単位の設定オブジェクトに集約

- 散在していた WINDOW/MAX/IP-MAX の定数を `RATE_LIMITS` にまとめ、各エンドポイントの二段構成（coarse per-IP + fine per-credential/state/user）を一箇所で見通せるように整理（挙動は不変）
