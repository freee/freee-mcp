---
"freee-mcp": minor
---

`FREEE_MCP_CONFIG_DIR` 環境変数で設定ディレクトリを上書きできるようにしました。

- 優先順: `FREEE_MCP_CONFIG_DIR` → `$XDG_CONFIG_HOME/freee-mcp` → `~/.config/freee-mcp`
- `XDG_CONFIG_HOME` と異なり freee-mcp 専用に隔離でき、開発・テスト用途で他の XDG 対応ツールへの副作用を避けられる
- `configure` / `sign configure` の保存先メッセージを解決後の実パスに変更
