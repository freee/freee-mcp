---
"freee-mcp": patch
---

configure / stdio モードでも `FREEE_*` エンドポイントの env 上書きを尊重するよう `loadConfig` を修正しました。

- これまで env を読むのは serve モードのみで、`loadConfig` は本番定数をハードコードしていたため、`.envrc` でローカルの authlete/accounts エンドポイントを指定しても configure が本番エンドポイントを開いてしまうバグがありました。
- `FREEE_AUTHORIZATION_ENDPOINT` / `FREEE_TOKEN_ENDPOINT` / `FREEE_API_BASE_URL`（末尾スラッシュ除去）/ `FREEE_SCOPE` を上書き可能にし、未設定時は本番定数へフォールバック（`loadRemoteServerConfig` と同一挙動）します。
- あわせて CLI の事業所取得を `FREEE_API_URL` 直参照から `getConfig().freee.apiUrl` 経由に統一し、ランタイム API クライアントと挙動を揃えました。
