# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `bun run build` - Build the project (uses Bun.build)
- `bun run typecheck` - TypeScript type checking
- `bun run lint` - Run Biome linter
- `bun run format` - Run Biome formatter
- `bun run check` - Run Biome lint + format (recommended before PR)
- `bun run test:run` - Run tests (vitest)
- `bun run dev` - Start development server
- `bun run inspector` - MCP inspector for debugging tools
- `bun run changeset` - Create a new changeset for version bumps
- `bun run version` - Apply changesets to update versions and CHANGELOG
- `bun run release` - Build and publish to npm

## Architecture

MCP server that exposes freee API endpoints as MCP tools:

- Schema: Multiple OpenAPI schemas in `openapi/` directory
  - `accounting-api-schema.json` - 会計API (https://api.freee.co.jp)
  - `hr-api-schema.json` - 人事労務API (https://api.freee.co.jp/hr)
  - `invoice-api-schema.json` - 請求書API (https://api.freee.co.jp/iv)
  - `pm-api-schema.json` - 工数管理API (https://api.freee.co.jp/pm)
  - `sm-api-schema.json` - 販売API (https://api.freee.co.jp/sm)
  - `it-management-api-schema.json` - IT管理API (https://api.freee.co.jp、パスに `/hub/it_management/` プレフィックス)
  - `partner-management-api-schema.json` - 業務委託管理API (https://api.freee.co.jp、パスに `/hub/partner_management/` プレフィックス)
  - `mcponly-api-schema.json` - mcp-only（freee-mcp リモート版限定）区分のエンドポイント集約スキーマ (https://api.freee.co.jp)。現状はサーベイAPI（パスに `/hub/survey/` プレフィックス）のみ
  - `sign-api-schema.json` - サイン（電子契約）API (https://ninja-sign.com)
- Schema Loader: `src/openapi/schema-loader.ts` loads and manages all API schemas
- Tool Generation: `generateClientModeTool()` in `src/openapi/client-mode.ts` creates method-specific tools
  - Tools: `freee_api_get`, `freee_api_post`, `freee_api_put`, `freee_api_delete`, `freee_api_patch`, `freee_api_list_paths`
  - Automatically detects API type from path and uses correct base URL
  - Validates paths against all OpenAPI schemas before execution
  - Supports all 5 freee APIs seamlessly
- Requests: `makeApiRequest()` in `src/api/client.ts` handles API calls with auto-auth and company_id injection

### Configuration

Run `freee-mcp configure` to set up configuration interactively:

- Creates `~/.config/freee-mcp/config.json` with OAuth credentials and company settings
- More secure (file permissions 0600)

### CLI Subcommands

- `freee-mcp` - Start MCP server
- `freee-mcp configure` - Interactive configuration setup
- `freee-sign-mcp` - Start Sign MCP server
- `freee-sign-mcp configure` - Sign interactive configuration setup

### MCP Configuration

After running `freee-mcp configure`:

```json
{
  "mcpServers": {
    "freee": {
      "command": "npx",
      "args": ["freee-mcp"]
    }
  }
}
```

Configuration is automatically loaded from `~/.config/freee-mcp/config.json`.

Development mode: Use `"command": "bun", "args": ["run", "src/index.ts"]` with `"cwd": "/path/to/freee-mcp"`

Sign development mode: Use `"command": "bun", "args": ["run", "src/sign/index.ts"]` with `"cwd": "/path/to/freee-mcp"`

### API Base URL の上書き（開発用）

環境変数 `FREEE_API_BASE_URL_{SERVICE}` でAPIの向き先を変更できる（`src/openapi/schema-loader.ts` の `resolveBaseUrl` で処理）。

- `FREEE_API_BASE_URL` - freee public APIのベースURL
- `FREEE_API_BASE_URL_ACCOUNTING` - 会計API
- `FREEE_API_BASE_URL_HR` - 人事労務API
- `FREEE_API_BASE_URL_INVOICE` - 請求書API
- `FREEE_API_BASE_URL_PM` - 工数管理API
- `FREEE_API_BASE_URL_SM` - 販売API
- `FREEE_API_BASE_URL_IT_MANAGEMENT` - IT管理API
- `FREEE_API_BASE_URL_PARTNER_MANAGEMENT` - 業務委託管理API
- `FREEE_API_BASE_URL_SURVEY` - サーベイAPI
- `FREEE_SIGN_API_URL` - サインAPI（`src/sign/config.ts` で処理）

### Remote モードのファイルアップロード UI（MCP Apps）

Remote モードでは `freee_file_upload_ui`（`src/mcp/file-upload-app.ts`）が MCP Apps の UI リソースを返し、ブラウザから `POST /upload/receipts`（`src/server/upload-endpoint.ts`）へ直接送る。ローカルでの動作確認手順は `docs/local-upload-ui-testing.md` を参照（`NODE_ENV=development` で `/dev/upload-harness` が有効になる）。

### Remote モードのロギング (canonical log line)

Remote モードは「1 HTTP リクエスト = 1 ログ行 = 1 trace」パターン。ペイロード形状は `CanonicalLogPayload` (`src/server/request-context.ts`)、emit は `src/telemetry/middleware.ts` の `res.on('finish')`。

読み落としやすい注意点:

- synthetic error (validation 失敗、routing 404 等) は `makeErrorChain(name, message)` 経由で登録すること。素の `[{ name, message }]` リテラルは `scrubErrorMessage()` を通らず privacy 漏洩の原因になる
- `http.status` は MCP クライアントへの最終応答、`api_calls[].status_code` は freee API からの応答。freee API 500 でも MCP 応答は 200 で wrap する場合があり、両方を見る必要がある

Datadog 検索例:

- `@http.status:500` — MCP サーバー自体の 5xx
- `@api_calls.error_type:timeout` — 外部 API タイムアウト
- `@http.status:200 @errors:*` — 見かけ上は成功だが内部的に失敗
- `@request_id:<uuid>` — 特定リクエストの全情報
- `@user_agent:ClaudeDesktop*` — MCP クライアント種別でフィルタ

## PR Creation Pre-flight Checklist

Always run before creating a PR:

```bash
bun run typecheck && bun run lint && bun run test:run && bun run build
```

Changeset requirement (必須):

- コミット時に changeset ファイルを必ず作成すること（忘れやすいので注意）
- `bun run changeset` が対話モードで使えない場合は `.changeset/<短い説明>.md` を直接作成する
- フォーマット: frontmatter に `"freee-mcp": patch|minor|major`、本文に変更内容の説明（日本語）
- bump type: `patch`（バグ修正）、`minor`（新機能）、`major`（破壊的変更）

Changeset の書き方:

- 1 行サマリ＋必要に応じて短い箇条書き（2〜5 項目）に留める。実装詳細・内部モジュール名・facet 名等は PR 説明に書き、CHANGELOG には残さない
- BREAKING や運用影響（ダッシュボード移行など）の警告だけは要約として明示する
- サブセクション（`## 〇〇`）を切る粒度の長文は避ける

Contributor の追加:

- Issue を起票してくれた人を README.md の Contributors セクション（`<!-- CONTRIBUTORS-START -->` ～ `<!-- CONTRIBUTORS-END -->` の間）に追加する
- 既存のフォーマットに合わせて `<a href="https://github.com/{username}"><img src="https://github.com/{username}.png" width="40" height="40" alt="@{username}"></a>` を末尾に追記する

Common issues:

- Mock function return types (ensure `id` fields are strings)
- Missing return type annotations on exported functions
- Undefined environment variables in tests

## Skill について

- `skills/freee-api-skill/` 内の `VERSION.md` は npm publish 時に自動生成されるため、開発環境（ローカル）には存在しない
- 開発環境では `freee_server_info` のバージョンが `dev` と返る（正常動作）。実際のバージョンは `package.json` の `version` を参照する
- Skill の更新（レシピ・リファレンスの追加・修正など）は changeset で `patch` バージョンとする
- `skills/freee-api-skill/references/INDEX.md` は `scripts/generate-references.ts` が自動生成する（手編集しないこと）。新しいドメインを追加する場合は同スクリプトの `SERVICE_LABELS` にも prefix を足す
- `README.md` の「対応操作数」は `<!-- API-STATS-TOTAL-START -->` ～ `<!-- API-STATS-TOTAL-END -->` の間を同スクリプトが `API_CONFIGS` の全スキーマから再計算して埋める（手編集しないこと）。スキーマを更新したら `bun run fetch:schemas` → `bun run generate:references` で自動的に追従する
- `SKILL.md` は実行時に毎回読まれるので、セットアップ手順（`SETUP.md`）や配色定義（`COLORS.md`）のように条件が揃ったときだけ必要な情報は別ファイルに置き、`SKILL.md` からは参照条件だけ書く

## Skill レシピの書き方

- レシピ（`skills/*/recipes/`）は操作の流れと注意点に集中し、APIの仕様詳細（パス一覧・パラメータ・レスポンス・制約等）はリファレンス（`references/`）へのパス参照に留める
- レシピにリファレンスと同じ情報を重複して書かない

## mcp-only（freee-mcp リモート版限定）エンドポイントについて

一部のエンドポイントは freee-mcp（リモート版）でのみ利用でき、ローカル（stdio）モードでは使えない。この区分は公開スキーマの配信元で mcp-only として指定され、必ず単一ファイル `mcponly.yml` に集約される。freee-mcp 側はこれを「出自（provenance）」として扱い、エンドポイント個別のフラグや手動リストは持たない。

仕組み:

- `scripts/fetch-schemas.ts` が `mcponly.yml` を1ソースとして取得し、`openapi/mcponly-api-schema.json` と `openapi/minimal/mcponly.json` を生成する
- `scripts/generate-references.ts` は `mcponly-api-schema.json` の全パスを mcp-only 集合として読み込み、該当タグのリファレンス冒頭に「⚠ freee-mcp（リモート版） 限定」バナーを自動挿入する（手編集は不要・不可）
- `src/openapi/schema-loader.ts` の `isMcpOnlyPath()` が同じ集合で判定し、`src/openapi/client-mode.ts` が stdio モードでの呼び出しを API に到達させず弾く

新しく mcp-only 区分のエンドポイントがリリースされたとき:

- それは必ず `mcponly.yml` に入るため、`bun run fetch:schemas` → `bun run generate:references` を流すだけでバナーと stdio ゲートは自動で反映される
- 新しいドメインを `service` として増やす場合のみ、通常のドメイン追加と同様に `schema-loader.ts`（ApiType / API_METADATA）・`client-mode.ts`（enum / hint）・`tag-mappings.json` を配線する。バナーとゲートは provenance で自動

## Writing Style

- Do not use markdown bold syntax (`**`)  in any files
- PR の説明・コミットメッセージ・CHANGELOG・ドキュメント等の公開される文章には、freee organization 以外のリポジトリ（フォーク含む）への参照や、Jira などの社内ツールの URL を書かない
