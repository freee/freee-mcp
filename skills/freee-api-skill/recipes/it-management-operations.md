# IT管理の操作

freeeIT管理APIを使った SaaSアカウント・備品・メンバー管理ガイド。

各リソースの詳細なエンドポイント仕様は以下のリファレンスを参照。

- `references/it-management-members.md` - メンバー
- `references/it-management-application-account.md` - SaaSアカウント
- `references/it-management-assets.md` - 備品

## リソース

| リソース | path 接頭辞 | 用途 |
|----------|-------------|------|
| メンバー | `/hub/it_management/members` | 従業員（IT管理上の利用者） |
| SaaSアカウント | `/hub/it_management/application_accounts` | 各 SaaS 上のアカウント。メンバーに紐付く |
| 備品 | `/hub/it_management/assets` | PC・周辺機器など物理資産。メンバーに利用者として割当 |

## オープンベータについて

IT管理 API はオープンベータ。仕様は予告なく変更される可能性がある。

## 認証と事業所スコープ

- 認証は OAuth2（`read` / `write` スコープ）。freee 共通の認可フローを利用する
- 他の freee API と同様、操作対象の事業所を `company_id` で指定する。指定値は現在の事業所（`freee_get_current_company`）と一致する必要があり、不一致だとエラーになる。切り替えは `freee_set_current_company` を使う
- メソッドにより `company_id` の位置が異なる:
  - GET（一覧・単体取得）/ DELETE: クエリパラメータ `company_id`（必須）
  - POST / PATCH（作成・更新）: リクエストボディ `company_id`（必須）

## ページネーション

一覧取得（GET）はすべてカーソルベース。従来の `offset` / `limit` ではない点に注意。

- 1ページ目: `company_id`（必須）のみで GET
- 2ページ目以降: 直前のレスポンス `next_page_token` を query `page_token` に渡す
- `next_page_token` が `null` のときは末尾

```
freee_api_get {
  "service": "it_management",
  "path": "/hub/it_management/members",
  "query": { "company_id": 123456 }
}
# → response.next_page_token = "eyJ..."

freee_api_get {
  "service": "it_management",
  "path": "/hub/it_management/members",
  "query": { "company_id": 123456, "page_token": "eyJ..." }
}
```

`page_size` で1ページの件数も指定できる（共通 query パラメータ）。`keyword`, `application_id`, `status_id` 等のフィルタは一覧エンドポイントごとに異なるため、リファレンスを参照。

## ページサイズと並び順の制約

- `page_size` の上限は 100。超過すると `AHB-3003-0002`。未指定時は 25。
- 並び順は `created_at DESC` 固定。`updated_at` / `name` 等のソート指定には対応していない。

## キーワード検索の対象

`keyword` クエリは部分一致 OR 検索。対象はリソースごとに異なる。

- メンバー: `family_name` / `given_name` / `yomi` / `code` / `phone_number` / 部署名 / `login_email` / カスタム属性
- SaaS アカウント: `account` / `external_id` / `data` 内 attribute 値
- 備品: `asset_number` / `serial_number` / 利用者名 / 各 attribute 値

ヒット範囲が広いため、絞り込みたい場合は別途フィルタ（`status_id`, `application_id` 等）と組み合わせる。

## 削除の挙動

API ごとに削除の意味が違うので注意:

- メンバー削除（`DELETE /hub/it_management/members/{id}`）: ソフトデリート
- SaaSアカウント削除（`DELETE /hub/it_management/application_accounts/{id}`）: ソフトデリート
- 備品削除（`DELETE /hub/it_management/assets/{id}`）: ハードデリート（復元不可）

備品は誤削除すると戻せないため、削除前にユーザー確認を行うこと。

## SaaSアカウント (application_accounts) の特殊仕様

### Write 系はカスタムアプリ限定

`POST` / `PATCH` / `DELETE /hub/it_management/application_accounts/*` はカスタムアプリ（ユーザーが手動で追加した管理対象 SaaS）配下のアカウントのみ受け付ける。Slack / Microsoft 365 等の自動同期で取り込まれた標準アプリのアカウントは Write 系が拒否され、`ITM-05-02-0003` が返る。

カスタムアプリかどうかを事前判定する API は提供されていないため、Write 試行時のエラーで判別する。

### POST と PATCH で受け付けるフィールドの差

`POST /application_accounts` は `attributes` をリクエストボディに含められない（ゲートウェイで `AHB-3003-0002 unsupported`）。属性値の設定は、作成直後にレスポンスの `id` を使って `PATCH /application_accounts/{id}` を続けて呼ぶ二段階運用が必要。

### attributes（カスタム属性）の操作

カスタムアプリは「アカウントID / 表示名 / 権限 / ライセンス / ステータス / …」などの動的属性を持つ。

- 属性スキーマは `GET /application_accounts/{id}` レスポンスの `application.attributes` 配列で取得できる（`id` / `title` / `data_type` / `is_identity` / `is_display` / `is_status` / `entitlement_kind` / `order`）。AI はこれを参照して有効な title を把握する。
- 更新リクエストの `attributes` キーは UUID（attribute.id）または title 名のどちらでも OK。同一アプリ内で title はユニーク制約があるため安全に逆引きされる。
- レスポンスの `data` フィールドは title キーで値が返る。

```json
PATCH /hub/it_management/application_accounts/{id}
{
  "company_id": 123456,
  "attributes": { "表示名": "Yamada Taro", "権限": "Administrator" }
}
```

- 部分更新では送信していない attribute は既存値が維持される。明示的に `null` を送れば NULL クリア可能。
- `is_display: true` の属性は必須。既存値が無い状態で省略すると `ITM-05-02-0001 表示名を入力してください` (422)。一度値をセットすれば、以降の部分更新で省略しても既存値が保持される。
- `is_status: true` の属性に値をセットすると `status.id` が連動切替（指定文字列に対応する `ApplicationAccountStatus` が `find_or_create_by` される）。
- 未知の title キーは無音で無視される（エラーにならない）。タイポに気付けないため、AI は `application.attributes` メタデータの title セットに含まれていることを確認してから送ること。

### ステータス・ロール

- `application_account_status_id` / `application_account_role_id` を PATCH ボディで指定可能。
- 不正な UUID は `ITM-05-02-0001` + `invalid_fields.application_account_status_id`（or `application_account_role_id`）で 422。
- `application_account_role_id: null` で既存ロールをクリア。

## よくある操作の流れ

### メンバー登録 → SaaS アカウント紐付け

1. メンバーを作成（POST `/hub/it_management/members`）
2. レスポンスの `id` を `application_account` の `member_id` 系フィールドに利用してアカウント作成（POST `/hub/it_management/application_accounts`、カスタムアプリのみ）

メンバーの `position_id` / `employment_type_id` / `department_ids` 等の参照 ID には、対応する一覧取得エンドポイントが提供されていない。事前に値を持っている前提で扱う。不正な ID は `ITM-05-03-0001` の 422 で返り、`fields` 配列で具体的なフィールド名が判別できる。

メンバーの primary email（`PATCH /members/{id}` の `email`）は API での更新に対応していない。

### メンバーに紐づくアカウント・備品の棚卸し

特定メンバーの利用状況を横断的に確認したいとき（入退社時の棚卸し等）は、各一覧をメンバーで絞り込む。

1. SaaSアカウント: GET `/hub/it_management/application_accounts` を `member_id`（アカウントホルダー）で絞り込み
2. 備品: GET `/hub/it_management/assets` を `member_id`（利用者）で絞り込み
3. メンバー一覧自体は雇用形態（`employment_type_id`）・入社日/退職日の範囲でも絞り込める（GET `/hub/it_management/members`）。退職者の洗い出しは退職日の範囲指定が使える

各フィルタの型・指定方法はリファレンスを参照。`employment_type_id` のように対応するマスタ一覧 API がない参照 ID は、既存メンバーの一覧レスポンス（`employment_type.id`）から値を取得する。

### 備品の貸与状況を更新

1. 備品一覧を取得し対象を特定（GET `/hub/it_management/assets`）
2. PATCH `/hub/it_management/assets/{id}` で更新可能フィールドを変更（リファレンス参照）

備品 PATCH のリクエストボディに `current_member_id` を含めるとゲートウェイで `AHB-3003-0002 unsupported` で拒否される。API からメンバーへの貸与状況変更は不可で、UI 側での操作が必要。

### 部分更新

更新系（PATCH）は指定したフィールドのみが更新される。SaaS アカウントの `attributes` についても上記の通り部分更新が機能する。null クリアの挙動はフィールドごとに異なるため、必ず差分のみを送る。

## エラー形式

`code` を見れば発生源と扱い方が分かる。

- `ITM-05-01-XXXX` は備品 API 由来。形式は `{ message, code, fields: [{ name, message, user_message }] }`
- `ITM-05-02-XXXX` は SaaS アカウント API 由来。形式は同上
- `ITM-05-03-XXXX` はメンバー API 由来。形式は同上
- `AHB-3003-0002` は API ゲートウェイ層のスキーマ違反（必須項目欠落 / 型不一致 / `unsupported` フィールド送信 / `page_size` 上限超過 等）。形式は `{ message, code, fields: [{ name, message }] }`
- `AHB-1002-9001` はシステムエラー（5xx）。形式は `{ message, code }`。通常運用では発生しない

具体例:

- 存在しない ID へのアクセス → `ITM-05-XX-0002` (404)
- 不正な参照 ID（status_id / role_id / position_id 等） → `ITM-05-XX-0001` + `fields` (422)
- 一意制約違反（`external_id` 重複等） → `ITM-05-XX-0001` + `fields` (400)
- カスタムアプリでない SaaS アカウントへの Write → `ITM-05-02-0003` (400)

AI 利用時は `ITM-` プレフィックスのとき `fields` を経由して具体的なフィールドエラーを取得することを推奨。`AHB-3003-0002` も `fields` を持つので同様に利用可能。

## エラー対応

- 401/403: 認証エラー。`freee_auth_status` で確認。Remote MCP は再認証を促される。ローカルは `freee_clear_auth` → `freee_authenticate`
- 404: 指定 ID のリソースが存在しない、または既にソフトデリート済みのケース。レスポンスは `ITM-05-XX-0002`
- 一意制約違反（`asset_number`, `serial_number`, `external_id`, `code` 等のチーム内一意フィールド）は 400 + `ITM-05-XX-0001` + `fields` で返る
