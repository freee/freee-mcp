---
"freee-mcp": patch
---

Claude プラグインのレビューでいただいた提案を反映しました。

- 支払依頼・取引・振替伝票・勤怠のレシピと、SKILL.md の `freee_api_bulk_write` に、書き込み前にユーザーへ内容を示して確認する手順を追加しました
- サイン文書のレシピから、トークンファイルを読んで API を直接呼び出す手順を削除し、プラグインにも同梱するようにしました（SIGN-GUIDE.md から GitHub 上のレシピへのリンクがなくなります）
- SETUP.md と SIGN-GUIDE.md の `npx` コマンドを、リリースごとにそのバージョンへ固定するようにしました
- Claude が作成したデータにメモタグ「freee-mcp」が付くことを、プラグインの README とレシピで案内するようにしました
- plugin.json・marketplace.json とプラグインの README に、短い英語の説明を追加しました
