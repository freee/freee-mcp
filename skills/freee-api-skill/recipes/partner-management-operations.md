# 業務委託管理の操作

freee業務委託管理APIを使った、発注者（orderer）視点でのパートナー・企業ユーザー・部門・プロジェクト・タスク（発注書）の参照ガイド。オープンベータ提供。

各エンドポイントのパラメータとレスポンス仕様は以下を参照。

- `references/partner-management-orderer-company-users.md` - 企業ユーザー（発注者側）
- `references/partner-management-orderer-sections.md` - 部門
- `references/partner-management-partner-management-orderer-partners.md` - パートナー
- `references/partner-management-partner-management-orderer-projects.md` - プロジェクト（一覧・詳細）
- `references/partner-management-partner-management-orderer-project-partners.md` - プロジェクトパートナー
- `references/partner-management-partner-management-orderer-project-business-partners.md` - プロジェクトのログインなしパートナー
- `references/partner-management-partner-management-orderer-project-company-users.md` - プロジェクト担当者
- `references/partner-management-partner-management-orderer-tasks.md` - タスク（発注書）の一覧・詳細
- `references/partner-management-partner-management-orderer-task-line-items.md` - タスク品目
- `references/partner-management-partner-management-orderer-task-line-items-custom-fields.md` - タスク品目のカスタム項目
- `references/partner-management-partner-management-orderer-task-delivery-data-custom-fields.md` - タスク納品データのカスタム項目

## 読み取り専用

業務委託管理APIは現時点で参照系（GET）のみ。作成・更新・削除のエンドポイントは提供されていない。

## 他プロダクトと言葉が重複するリソースに注意

「プロジェクト」「パートナー」「部門」「タスク」など、業務委託管理で使う名前は他の freee プロダクトにも同名のリソースがある。名前は同じでもマスタは別で、IDや意味も互換ではない。ユーザーの依頼にこれらの単語が単独で出てきた場合は、業務委託管理のリソースを指しているか確認してから API を選ぶこと（明確に「業務委託の〜」「発注先の〜」等と言及されている場合は確認不要）。

- プロジェクト
  - 業務委託管理: `partner_management` の `/orderer/projects`（本レシピの対象。発注先パートナーに仕事を割り当てる単位）
  - 工数管理: `pm` の `/projects`（社内メンバーの工数を積むプロジェクト）
- パートナー / 取引先
  - 業務委託管理: `partner_management` の `/orderer/partners`（発注先の企業。ログインなしパートナーは `project_business_partners`）
  - 工数管理: `pm` の `/partners`
  - 会計: `accounting` の `/api/1/partners`（取引先マスタ）
- 部門
  - 業務委託管理: `partner_management` の `/orderer/sections`（発注者側の部門）
  - 会計: `accounting` の `/api/1/sections`
  - 人事労務: `hr` の `/api/v1/sections`
- タスク
  - 業務委託管理では発注書に相当するリソース（`/orderer/tasks`）。「タスク」＝一般的なToDoではない
  - 他プロダクトに同名の API はないが、ユーザーが「タスク」と言った場合に本 API を意図しているとは限らない。文脈が読み取れないときは確認する

確認するときの聞き方の例: 「業務委託管理（発注先パートナーに仕事を発注する画面）のプロジェクトのことでしょうか、それとも工数管理（社内メンバーの工数を積むプロジェクト）のことでしょうか。」

## company_id はクエリで明示指定する（必須）

業務委託管理APIは、全エンドポイントでクエリパラメータ `company_id`（integer）が必須。呼び出し前に `freee_get_current_company` で取得した値を、必ず `query.company_id` に明示的に指定する。

Remote MCP のヘッダ（`x-freee-company-id`）だけに依存しないこと。ヘッダ経由の補完はエンドポイント側でサポートされておらず、`company_id` の指定漏れは 403「事業所を作成してください。」として返るため（後述）、症状が原因を示さず切り分けが難しい。

なお、オープンベータ提供のため必要な `freee-using-beta: true` ヘッダは MCP クライアントが自動付与する。ユーザー側で `headers` に含める必要はない。

## 基本フロー

1. `freee_get_current_company` で現在の事業所IDを取得する（セッション内で1回取得すれば以降は使い回せる）
2. 事業所を変えたいときは `freee_set_current_company` で切り替えたうえで、`freee_get_current_company` を取り直す
3. 目的のリソースに応じて `freee_api_get` を呼び出す。`query.company_id` を必ず含める

呼び出し例（企業ユーザー一覧）:

```
freee_api_get {
  "service": "partner_management",
  "path": "/hub/partner_management/orderer/company_users",
  "query": { "company_id": 123456 }
}
```

呼び出し例（パートナー詳細）:

```
freee_api_get {
  "service": "partner_management",
  "path": "/hub/partner_management/orderer/partners/42",
  "query": { "company_id": 123456 }
}
```

呼び出し例（プロジェクトの担当者一覧）:

```
freee_api_get {
  "service": "partner_management",
  "path": "/hub/partner_management/orderer/projects/10/project_company_users",
  "query": { "company_id": 123456 }
}
```

## ページネーション

一覧取得はカーソル方式。`page_size` はデフォルト 20、最大 100。続きがある場合はレスポンスの `next_page_token` を次リクエストの `query.page_token` に渡す。`next_page_token` が `null` なら末尾。

## 403「事業所を作成してください。」が返ったとき

このエラーメッセージは、実態としては「`company_id` の指定漏れ」で発生することが最も多い。事業所が実際に未作成である状況とは限らないため、メッセージを字義通りに受け取って別の調査（事業所作成の案内・レートリミット待機・再認証）に進まないこと。

次の順で確認する。

1. 直前のリクエストで `query.company_id` が指定されているか。指定漏れならば `freee_get_current_company` で取得した値を `query.company_id` に設定して再実行する
2. `company_id` を指定しても解消しない場合は、実際のステータスコードとレスポンスボディをそのままユーザーに提示したうえで、次を順に確認する
   - 事業所IDが現在の事業所（`freee_get_current_company`）と一致しているか。異なる事業所を指定した場合は `freee_set_current_company` で切り替えてから再実行する
   - 対象事業所で業務委託管理の利用権限があるか（管理者による付与が必要な場合がある）

MCP ラッパーが「レートリミットの可能性があります」「再認証してください」といった補足を返してきた場合でも、`company_id` 指定漏れの切り分けが済むまではその案内を採用しない。`freee_authenticate` の再実行や待機を最初に提案しないこと。

## その他のエラーコードの読み方

- 400: 必須パラメータ欠落、または型・列挙値の違反。レスポンスから欠落項目名を確認する
- 401: 認証エラー。`freee_auth_status` で確認する。Remote MCP は再認証を促される。ローカルは `freee_clear_auth` → `freee_authenticate`
- 403（`事業所を作成してください。` 以外）: 対象事業所での業務委託管理の権限・契約状態を確認する
- 404: 指定 ID のリソースが存在しないか、対象事業所からアクセスできない
- 429: 短時間の連続呼び出しで発生。バックオフを入れて再試行する

## リソース間のドリルダウン

主なリソースと関係:

- パートナー（発注先の企業）: `partners`（一覧・詳細）
- 企業ユーザー（発注者側の従業員）: `company_users`（一覧・詳細）
- 部門: `sections`
- プロジェクト: `projects`（一覧・詳細）→ 配下に `project_partners` / `project_business_partners` / `project_company_users`
- タスク（発注書）: `tasks`（一覧）→ 詳細は `/projects/{project_id}/tasks/{id}`。タスク配下に `task_line_items`（品目）と `delivery_data/custom_fields`（納品データのカスタム項目）

プロジェクト配下のリソース（`project_partners` 等）はパスに `{project_id}` を含むため、対象のプロジェクトが不明な場合は先に `GET /orderer/projects` で一覧取得し、`name_contains` などで絞り込む。

タスク詳細はパスが `/projects/{project_id}/tasks/{id}` の順で、プロジェクトIDが必須。タスク一覧（`GET /orderer/tasks`）のレスポンス各要素からプロジェクトIDを取得できる。

呼び出し例（プロジェクト一覧）:

```
freee_api_get {
  "service": "partner_management",
  "path": "/hub/partner_management/orderer/projects",
  "query": { "company_id": 123456, "name_contains": "運用" }
}
```

呼び出し例（タスク一覧を担当者・期間で絞り込み）:

```
freee_api_get {
  "service": "partner_management",
  "path": "/hub/partner_management/orderer/tasks",
  "query": {
    "company_id": 123456,
    "project_id": 10,
    "assignee_type": "Partner",
    "assignee_id": 987,
    "deadline_from": "2026-09-01",
    "deadline_to": "2026-09-30"
  }
}
```

`assignee_id` を指定する場合は `assignee_type`（`Partner` / `BusinessPartner`）と必ずセットで指定する。単独指定は不可。

呼び出し例（タスク詳細）:

```
freee_api_get {
  "service": "partner_management",
  "path": "/hub/partner_management/orderer/projects/10/tasks/2001",
  "query": { "company_id": 123456 }
}
```
