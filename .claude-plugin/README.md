# freee-mcp プラグイン

freee会計、人事労務、請求書、工数管理、販売、IT管理、固定資産、業務委託管理、サーベイ、開業、人事評価、申告を Claude から操作するための freee 公式プラグインです。

このプラグインには次の 2 つが含まれます。

- Remote MCP サーバー `freee`（`https://mcp.freee.co.jp/mcp`）: freee が運用するサーバーで、freee API の呼び出し・認証・リクエスト検証を担当します。ローカルでのインストールやセットアップは不要です
- Agent Skill `freee-api-skill`: freee API のリファレンスと操作レシピです。Claude が必要な部分だけを読み込み、正しいエンドポイントとパラメータで API を呼び出せるようにします

## 使い方

1. プラグインをインストールします
2. Claude Code で `/mcp` を開き、`freee` サーバーを選んで認証します。ブラウザで freee アカウントにログインし、連携を許可してください
3. 「先月の取引一覧を見せて」「この請求書を参考に今月分を作成して」のように、freee の操作を依頼します

対象の事業所は会話の中で切り替えられます（`freee_list_companies`、`freee_set_current_company`）。

## Agent Skill の内容

| API          | 内容                                                   |
| ------------ | ------------------------------------------------------ |
| 会計         | 取引、勘定科目、取引先、請求書、経費申請など           |
| 人事労務     | 従業員、勤怠、給与明細、年末調整など                   |
| 請求書       | 請求書、見積書、納品書、領収書、発注書、支払通知書     |
| 工数管理     | プロジェクト、チーム、パートナー、工数、ユーザーなど   |
| 販売         | 案件、受注、マスタ                                     |
| IT管理       | メンバー、SaaSアカウント、アプリ、備品、部署、会社など |
| 固定資産     | 固定資産の一覧、詳細、登録、更新、削除                 |
| 業務委託管理 | 業務委託先の企業ユーザー、部門、取引先                 |
| サーベイ     | サーベイ企画、実施回                                   |
| 開業         | 開業申請用データ                                       |
| 人事評価     | 人事評価結果                                           |
| 申告         | 法人税申告データ、帳票（別表・決算書など）             |

サーベイ・開業・人事評価・申告は、対応する接続環境、契約プラン、利用者権限が必要です。

freee サイン（電子契約）のリファレンスも含まれますが、サインの API は Remote MCP では提供していません。サインを使う場合はローカルの MCP サーバーが必要です（下記「ローカル MCP を使う場合」を参照）。

## データの取り扱い

- freee のデータへのアクセスは、すべて Remote MCP サーバー `https://mcp.freee.co.jp/mcp` を経由します。サーバーは、利用者が OAuth で許可したアカウントの権限の範囲で freee API を呼び出します
- Agent Skill は Markdown のリファレンスとレシピだけで構成されており、スクリプトの実行や外部への通信は行いません
- 作成・更新・削除の操作は freee 上の実データに反映されます。Claude が書き込み系のツールを呼び出す前に、内容を確認してください
- 個人情報の取り扱いは [freee のプライバシーポリシー](https://www.freee.co.jp/privacy_policy/) をご覧ください

## ローカル MCP を使う場合

自分で登録した freee アプリケーションの認証情報を使って、ローカルで MCP サーバーを起動することもできます。freee サイン（電子契約）を使う場合もこちらです。手順は [freee-mcp の README](https://github.com/freee/freee-mcp#ローカル-mcp-を使う場合) をご覧ください。

## サポート

- 不具合の報告・機能の要望・質問: [GitHub Issues](https://github.com/freee/freee-mcp/issues)
- 脆弱性の報告: 公開の Issue には書かず、[セキュリティポリシー](https://github.com/freee/freee-mcp/blob/main/SECURITY.md) の手順に従ってください
- freee の各サービスの使い方: [freee ヘルプセンター](https://support.freee.co.jp/hc/ja)

## 関連リンク

- [freee-mcp リポジトリ](https://github.com/freee/freee-mcp)
- [freee API ドキュメント](https://developer.freee.co.jp/docs)

## ライセンス

[Apache-2.0](https://github.com/freee/freee-mcp/blob/main/LICENSE)
