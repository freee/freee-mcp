# IT管理の操作

freeeIT管理APIを使った SaaSアカウント・備品・メンバー管理ガイド。IT管理 API はオープンベータで、仕様は予告なく変更される可能性がある。

## リソース

- メンバー: `/hub/it_management/members` — 従業員（IT管理上の利用者）
- SaaSアカウント: `/hub/it_management/application_accounts` — 各 SaaS 上のアカウント。メンバーに紐付く
- 備品: `/hub/it_management/assets` — PC・周辺機器など物理資産。メンバーに利用者として割当
- 備品ステータス: `/hub/it_management/asset_statuses` — 備品の状態ラベル（例: 使用中 / 保管中）。備品の `asset_status_id` から参照される
- 備品種別: `/hub/it_management/asset_categories` — 備品の種類ラベル（例: ノートPC）。備品の `asset_category_id` から参照される
- 部署: `/hub/it_management/departments` — 組織階層上の部署。メンバーの `department_ids` から参照される
- 備品属性: `/hub/it_management/asset_attributes` — 備品に持たせる追加項目の定義。値は備品の `asset_attribute_values` に入る
- 備品保管場所: `/hub/it_management/asset_locations` — 備品を置く場所。備品の `asset_location_id` から参照される
- 備品利用者: `/hub/it_management/assets/{asset_id}/members` — 備品をメンバーに割り当てた履歴
- アプリ: `/hub/it_management/applications` — 利用中の SaaS（標準アプリ / カスタムアプリ）
- アプリマスタ: `/hub/it_management/application_masters` — 標準アプリのカタログ
- カスタムアプリマスタ: `/hub/it_management/custom_application_masters` — カスタムアプリの元になるカタログ
- 会社: `/hub/it_management/product_companies` — IT管理で管理している会社。アプリ・部署の所属先
- 役職: `/hub/it_management/positions` — IT管理で管理している役職。メンバーの `position_id` から参照される
- 雇用形態: `/hub/it_management/employment_types` — メンバーの `employment_type_id` から参照される
- ゲスト: `/hub/it_management/guests` — freee 従業員ではない外部ユーザー
- システムアカウント: `/hub/it_management/system_account_owners` — 人ではないサービス / bot / 共有アカウントなどの所有者

## 認証と事業所スコープ

- 認証は OAuth2（`read` / `write` スコープ）。freee 共通の認可フローを利用する
- 操作対象の事業所を `company_id` で指定する。指定値は現在の事業所（`freee_get_current_company`）と一致する必要があり、不一致だとエラーになる。切り替えは `freee_set_current_company` を使う
- `company_id` の位置はメソッドで異なる。GET（一覧・単体取得）/ DELETE はクエリパラメータ、POST / PATCH はリクエストボディ（いずれも必須）
- `company_id` は freee の事業所 ID（整数）。IT管理の会社（`product_companies`）の ID（UUID）は `product_company_id` / レスポンスの `product_company` で扱い、`company_id` とは別物なので混同しない
- ただし `product_company_id` に不正な値を送ったときの 400 は、`fields` の `name` が `company_id` で返る。このエラーで事業所を切り替えず、`product_company_id` の値を見直す

## ページネーション

一覧取得（GET）はすべてカーソルベース。`offset` / `limit` ではない点に注意。

- 1ページ目: `company_id`（必須）のみで GET
- 2ページ目以降: 直前のレスポンスの `next_page_token` を query `page_token` に渡す

```
freee_api_get {
  "service": "it_management",
  "path": "/hub/it_management/members",
  "query": { "company_id": 123456, "page_token": "eyJ..." }
}
```

- `page_size` 上限は 100。超過すると `AHB-3003-0002`
- 並び順は `created_at DESC` 固定。`updated_at` / `name` 等のソート指定には対応していない

## キーワード検索の対象

`keyword` クエリは部分一致検索。検索対象はリソースごとに異なるので、各リファレンスの `keyword` の説明を確認する。空白区切りで複数語を渡したときの扱い（AND / OR）もリソースごとに違い、リファレンスに書かれていない場合は 1 語で検索する。

絞り込みたい場合は、別途フィルタ（`status_id`, `application_id` 等）と組み合わせる。

## 削除の挙動

API ごとに削除の意味が違うので注意。

- メンバー削除・SaaSアカウント削除: ソフトデリート
- 備品削除: ハードデリート（復元不可）。誤削除すると戻せないため、削除前にユーザー確認を行うこと
- 備品ステータス・備品種別: 該当マスタを参照している備品が1件でも残っていると削除できない（`system-managed` な備品種別も削除不可）。移行が必要なら先に対象備品の `asset_status_id` / `asset_category_id` を別のマスタに付け替える
- 部署: 子部署が存在する、またはメンバーの `department_ids` に含まれている場合は削除できない
- そのほかのマスタ（会社・役職・備品属性・保管場所など）にも、参照が残っていると削除できないなどの制約がある。削除する前に、各リファレンスの削除 API の説明を確認する。制約に当たると 400 + `ITM-05-01-0007` が返る
- 雇用形態: メンバーに設定されていても削除でき、そのメンバーの雇用形態は未設定になる。削除の前に、影響するメンバーをユーザーに確認すること

## SaaSアカウント (application_accounts) の特殊仕様

### Write 系はカスタムアプリ限定

`POST` / `PATCH` / `DELETE /hub/it_management/application_accounts/*` はカスタムアプリ（ユーザーが手動で追加した管理対象 SaaS）配下のアカウントのみ受け付ける。Slack / Microsoft 365 等の自動同期で取り込まれた標準アプリのアカウントは Write 系が拒否され、400 + `ITM-05-01-0006` が返る。

カスタムアプリかどうかを事前判定する API は提供されていないため、Write 試行時のエラーで判別する。

### POST と PATCH で受け付けるフィールドの差

`POST /application_accounts` は `attributes` をリクエストボディに含められない（ゲートウェイで `AHB-3003-0002 unsupported`）。属性値の設定は、作成直後にレスポンスの `id` を使って `PATCH /application_accounts/{id}` を続けて呼ぶ二段階運用が必要。

### attributes（カスタム属性）の操作

カスタムアプリは「アカウントID / 表示名 / 権限 / ライセンス / ステータス / …」などの動的属性を持つ。

- 属性スキーマは `GET /application_accounts/{id}` レスポンスの `application.attributes` から取得できる。有効な title はこれを参照して把握する
- 更新リクエストの `attributes` キーは UUID（attribute.id）または title 名のどちらでもよい。同一アプリ内で title はユニーク制約があるため安全に逆引きされる

```json
PATCH /hub/it_management/application_accounts/{id}
{
  "company_id": 123456,
  "attributes": { "表示名": "Yamada Taro", "権限": "Administrator" }
}
```

- 部分更新では送信していない attribute は既存値が維持される。明示的に `null` を送れば NULL クリア可能
- `is_display: true` の属性は必須。既存値が無い状態で省略すると `ITM-05-01-0001 表示名を入力してください` (400)。一度値をセットすれば、以降の部分更新で省略しても既存値が保持される
- `is_status: true` の属性に値をセットすると `status.id` が連動切替される
- 未知の title キーは無音で無視される（エラーにならない）。タイポに気付けないため、送信前に `application.attributes` の title セットに含まれていることを確認すること

### ステータス・ロール

- `application_account_status_id` / `application_account_role_id` を PATCH ボディで指定可能
- 不正な UUID は `ITM-05-01-0001` + `fields` で 400
- `application_account_role_id: null` で既存ロールをクリア

## よくある操作の流れ

### メンバー登録 → SaaS アカウント紐付け

1. メンバーを作成（POST `/hub/it_management/members`）
2. レスポンスの `id` を `application_account` の `member_id` 系フィールドに利用してアカウント作成（POST `/hub/it_management/application_accounts`、カスタムアプリのみ）

メンバーの `department_ids` は `GET /hub/it_management/departments`、`position_id` は `/positions`、`employment_type_id` は `/employment_types` で参照可能。同様に、備品の `asset_status_id` は `/asset_statuses`、`asset_category_id` は `/asset_categories`、`asset_location_id` は `/asset_locations` で一覧を取得してから割り当てられる。不正な ID は 400 + `ITM-05-01-0001` で返り、`fields` 配列で具体的なフィールド名が判別できる。

メンバーの primary email（`PATCH /members/{id}` の `email`）は API での更新に対応していない。

### メンバーに紐づくアカウント・備品の棚卸し

特定メンバーの利用状況を横断的に確認したいとき（入退社時の棚卸し等）は、各一覧をメンバーで絞り込む。

1. SaaSアカウント: GET `/hub/it_management/application_accounts` を `member_id`（アカウントホルダー）で絞り込み
2. 備品: GET `/hub/it_management/assets` を `member_id`（利用者）で絞り込み
3. メンバー一覧自体は雇用形態（`employment_type_id`）・入社日/退職日の範囲でも絞り込める。退職者の洗い出しは退職日の範囲指定が使える

### 備品の貸与状況を更新

備品 PATCH には `current_member_id` がない（含めるとゲートウェイで `AHB-3003-0002 unsupported`）。貸与は備品利用者 API で操作する。

1. 備品一覧を取得し対象を特定（GET `/hub/it_management/assets`）
2. 割り当てる: POST `/hub/it_management/assets/{asset_id}/members`。現在の利用者の割当が自動で終わるかどうかは `start_at` の指定によって変わるので、リファレンスの注意点を確認してから送る
3. 返却する: GET `/hub/it_management/assets/{asset_id}/members` を `current=true` で呼んで現在の割当を取得し、PATCH `/hub/it_management/assets/{asset_id}/members/{id}` で `end_at` を指定する。DELETE は履歴そのものを消すので、返却には使わない

### 備品属性の値を設定する

備品の `asset_attribute_values` に指定できるのは、備品の種別に紐づく備品属性だけ。どれが紐づき、どれが必須かは備品種別から分かる。

1. GET `/hub/it_management/asset_categories/{id}` の `asset_attributes` で、紐づく属性と必須かどうかを確認する
2. 入力種別（`input_kind`）が `select` の属性は、GET `/hub/it_management/asset_attributes/{id}` で選択肢を確認する
3. 備品を作成・更新する（POST `/assets` / PATCH `/assets/{id}`）。作成時は、1 で `required` が true の属性をすべて含める。更新時の扱いは、リファレンスの PATCH の `asset_attribute_values` の説明を確認する

### 会社（product_companies）を割り当てる

アプリは部分更新、部署は作成のときに `product_company_id` で会社を指定する。部署の作成でデフォルト以外の会社に属する親部署を指定する場合は、親部署の `product_company.id` を `product_company_id` に明示して渡す（会社の決まり方と、作成後に変えられるかどうかはリファレンスを確認する）。

### 部分更新

更新系（PATCH）は指定したフィールドのみが更新される。null クリアの挙動はフィールドごとに異なるため、必ず差分のみを送る。

## エラーコードの読み方

`code` を見れば発生源と扱い方が分かる。`fields` を持つのはバリデーションエラー（400 + `ITM-05-01-0001`）と `AHB-3003-0002` だけで、具体的なフィールドエラーはそこから取得する。

- `ITM-05-01-XXXX` は IT管理 API 由来。メンバー・SaaS アカウント・備品・各マスタ・アプリなど、すべての API で共通（末尾の番号で種類が分かる）。ページネーション内部のエラーでだけ、まれに 500 + `ITM-05-02-0001` が返る
- IT管理 API からは、想定外のエラーで 500 + `ITM-99-99-9999`、認証エラーで 401 + `ITM-01-01-0001` も返る
- `AHB-3003-0002` は API ゲートウェイ層のスキーマ違反（必須項目欠落 / 型不一致 / `unsupported` フィールド送信 / `page_size` 上限超過 等）
- `AHB-1002-9001` は内部 API へのリクエスト送信の失敗（5xx）。内部 API がエラーコードなしの 5xx を返した場合は `AHB-2000-9001`。どちらも通常運用では発生しない

よくあるケース:

- 401、または `AHB-` で始まるコードの 403: 認証・認可のエラー（トークン切れ、スコープ不足など）。`freee_auth_status` で確認。Remote MCP は再認証を促される。ローカルは `freee_clear_auth` → `freee_authenticate`
- 403 + `ITM-05-01-0003`: IT管理のロールに、作成・更新・削除の権限がない。再認証では解決しないので、ユーザーに権限を確認してもらう
- 404 + `ITM-05-01-0002`: 指定 ID のリソースが存在しない、ソフトデリート済み、または参照権限がない。備品と SaaS アカウントの削除は、削除権限がない場合も 404 になるので、「すでに削除済み」と決めつけない
- 400 + `ITM-05-01-0001`: バリデーションエラー。必須項目の欠落、不正な参照 ID（status_id / role_id / position_id 等）、一意制約違反（`asset_number`, `serial_number`, `code` 等のチーム内一意フィールド。SaaS アカウントの作成時の `external_id` も含む）
- 500 + `ITM-99-99-9999`: 想定外のエラー。現在、`external_id` の重複（備品の作成・更新と、SaaS アカウントの更新）はこのエラーになるので、`external_id` を指定した操作で 500 が返ったら、ほかの備品・アカウントと重複していないかを確認する
- 400 + `ITM-05-01-0004` / `ITM-05-01-0005`: `page_token` が不正。1 ページ目から取り直す
- 400 + `ITM-05-01-0006`: 業務ルール違反（現在はカスタムアプリでない SaaS アカウントへの Write だけ）
- 400 + `ITM-05-01-0007`: 削除・更新の制約に当たった（制約の内容は各リファレンスの削除・更新 API の説明を確認する）

## リファレンス

パス一覧・パラメータ・レスポンスの詳細は以下を参照:

- `references/it-management-members.md` - メンバー
- `references/it-management-application-account.md` - SaaSアカウント
- `references/it-management-assets.md` - 備品
- `references/it-management-asset-statuses.md` - 備品ステータス
- `references/it-management-asset-categories.md` - 備品種別
- `references/it-management-departments.md` - 部署
- `references/it-management-asset-attributes.md` - 備品属性
- `references/it-management-asset-locations.md` - 備品保管場所
- `references/it-management-asset-members.md` - 備品利用者
- `references/it-management-applications.md` - アプリ
- `references/it-management-application-masters.md` - アプリマスタ
- `references/it-management-custom-application-masters.md` - カスタムアプリマスタ
- `references/it-management-product-companies.md` - 会社
- `references/it-management-positions.md` - 役職
- `references/it-management-employment-types.md` - 雇用形態
- `references/it-management-guests.md` - ゲスト
- `references/it-management-system-account-owners.md` - システムアカウント
