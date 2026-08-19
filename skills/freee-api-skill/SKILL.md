---
name: freee-api-skill
description: "freee-mcp / freee-sign-mcp と連携するスキル。会計・人事労務・請求書・工数管理・販売・IT管理・サーベイ・サイン（電子契約）の詳細APIリファレンスと使い方ガイドを提供。freee の経費申請・取引登録・勤怠打刻・給与明細・見積書・試算表・仕訳・従業員管理・工数登録・売上管理・SaaSアカウント管理・備品管理・サーベイ企画/実施回の取得・電子契約の文書管理などの操作やAPI仕様を調べたいときに使う。ユーザーが freee のデータ操作、会計処理、人事労務管理、請求・見積、プロジェクト工数管理、販売管理、IT管理、サーベイ、電子契約について質問や操作を依頼してきた場合は、明示的に freee と言及していなくても、このスキルの利用を検討すること。サインは別途 freee-sign-mcp の設定が必要。"
license: Apache-2.0
metadata:
  author: freee_jp
  homepage: https://github.com/freee/freee-mcp
---

# freee API スキル

## 概要

freee の会計・人事労務・請求書・工数管理・販売・IT管理・サーベイのデータを AI から直接操作できるスキルです。

[freee-mcp](https://www.npmjs.com/package/freee-mcp) (MCP サーバー) を通じて freee API と連携。

このスキルの役割:

- freee API の詳細リファレンスを提供
- freee-mcp 使用ガイドと API 呼び出し例を提供

## セットアップ

`freee_*` ツールが利用できている場合、セットアップは不要です。

以下のいずれかに該当する場合のみ `SETUP.md` を読み、ユーザーに接続手順を案内してください。

- `freee_*` ツールが1つも利用できない
- `freee_auth_status` が未認証を返し、「エラー対応」の手順でも解決しない
- ユーザーが接続方法・初期設定について質問している

接続モードは `freee_server_info` の transport フィールドで確認できます（`remote` = Remote MCP、`stdio` = ローカル）。

## リファレンス

API リファレンスが `references/` に含まれます。各リファレンスにはパラメータ、リクエストボディ、レスポンスの情報があります。

目的の API を探す手順:

1. `references/INDEX.md` を読む（service ごとのファイル名と内容の一覧）
2. 索引で特定できない場合は `references/` 内のファイルをキーワード検索する

リファレンスの記法:

- `名前*` は必須、無印は任意
- 見出しの `### リクエストボディ*` はリクエストボディ自体が必須であることを示す
- パラメータは特記なき限り query。`(path)` `(header)` は該当箇所に明記
- `GET /xxx と同じ` は、同一ファイル内の該当エンドポイントと内容が同一であることを示す
- レスポンスはトップレベルの項目のみ記載。ネストした構造は実際に API を呼び出して確認する

## 使い方

### MCP ツール

認証・事業所管理:

- `freee_authenticate` - OAuth 認証（Remote MCP では認証は自動処理されるため通常は不要）
- `freee_auth_status` - 認証状態確認
- `freee_clear_auth` - 認証情報クリア（ローカルモード用）
- `freee_current_user` - ログインユーザー情報取得
- `freee_list_companies` - 事業所一覧
- `freee_set_current_company` - 事業所切り替え
- `freee_get_current_company` - 現在の事業所取得

サーバー情報:

- `freee_server_info` - サーバー情報取得（バージョン、transport: remote/stdio）

ファイル操作:

- `freee_file_upload` - ファイルボックスにファイルをアップロード (POST /api/1/receipts) ※ローカルモードのみ

API 呼び出し:

- `freee_api_get` - GET リクエスト
- `freee_api_post` - POST リクエスト
- `freee_api_put` - PUT リクエスト
- `freee_api_delete` - DELETE リクエスト
- `freee_api_patch` - PATCH リクエスト
- `freee_api_list_paths` - 利用可能なAPIパス一覧

serviceパラメータ (必須):

- `accounting` - freee会計（取引、勘定科目、取引先など） 例: `/api/1/deals`
- `hr` - freee人事労務（従業員、勤怠など） 例: `/api/v1/employees`
- `invoice` - freee請求書（請求書、見積書、納品書） 例: `/invoices`
- `pm` - freee工数管理（プロジェクト、工数など） 例: `/projects`
- `sm` - freee販売（見積、受注、売上など） 例: `/businesses`
- `it_management` - freeeIT管理（SaaSアカウント、備品、メンバー） 例: `/hub/it_management/members`
- `survey` - freeeサーベイ（サーベイ企画、実施回）※ freee-mcp（リモート版） 限定 例: `/hub/survey/base_surveys`

### 基本ワークフロー

接続モードが不明な場合は `freee_server_info` で確認できます（transport が `remote` なら Remote MCP、`stdio` ならローカル）。Remote MCP の場合、認証は自動処理されるため手順1から開始できます。ローカルモードで未認証の場合は先に `freee_authenticate` を実行してください。

1. 事業所を確認: `freee_get_current_company` で現在の事業所IDを取得する（初回は必須。セッション内で1回取得すれば以降は使い回せる）
   - APIは事業所ごとにデータが分離されているため、正しい事業所を選択しないと意図しないデータにアクセスしてしまう
2. レシピを確認: `recipes/` 内の該当レシピを読む
   - よくある操作のパターンと注意点がまとまっているため、直接APIを叩くより効率的でミスが少ない
3. リファレンスを検索: 必要に応じて `references/INDEX.md` から該当ファイルを引く
   - レシピにない詳細なパラメータやレスポンス仕様を確認する
4. API を呼び出す: `freee_api_*` ツールを使用（company_id が必要なエンドポイントでは手順1で取得した値を使う）

注意:
- `company_id` は現在設定されている事業所と一致している必要がある。不一致の場合はエラーになる
- 事業所を変更する場合: 先に `freee_set_current_company` で切り替えてからリクエストを実行

### レシピ

よくある操作のユースケースサンプルとTipsは以下を参照:

- `recipes/expense-application-operations.md` - 経費申請
- `recipes/deal-operations.md` - 取引（収入・支出）
- `recipes/manual-journal-operations.md` - 振替伝票
- `recipes/payment-request-operations.md` - 支払依頼
- `recipes/hr-employee-operations.md` - 人事労務（従業員・給与）
- `recipes/hr-attendance-operations.md` - 勤怠（出退勤・打刻・休憩の登録）
- `recipes/invoice-operations.md` - 請求書・見積書・納品書
- `recipes/receipt-operations.md` - ファイルボックス（証憑ファイルのアップロード・管理）
- `recipes/pm-operations.md` - 工数管理（プロジェクト・工数実績）
- `recipes/pm-workload-registration.md` - 工数の安全な登録（PM・HR連携ワークフロー）
- `recipes/sm-operations.md` - 販売管理（案件・受注）
- `recipes/it-management-operations.md` - IT管理（メンバー・SaaSアカウント・備品）
- `recipes/survey-operations.md` - サーベイ（サーベイ企画・実施回の取得）
- `recipes/report-operations.md` - 試算表・総勘定元帳（レポート取得・未承認仕訳の確認）
- `recipes/freee-mcp-tag.md` - メモタグ「freee-mcp」の付与ガイド

## freee サイン（電子契約）

freee サインは別の MCP サーバー（`freee-sign-mcp`）で提供されます。
`sign_api_get` 等のサインツールが利用可能な場合は `SIGN-GUIDE.md` を参照してください。

## データの可視化

freee のデータをグラフ・表・HTML 等で可視化する場合は `COLORS.md` を読み、そこで指定された配色を使うこと。

## エラー対応

- バージョン確認: `VERSION.md` を読んでスキルのバージョンを確認し（ファイルが存在しない場合は開発版を使用中）、`freee_server_info` でサーバーバージョンを確認してください。スキルのバージョンがサーバーより古い場合、スキルの情報が最新のサーバーに対応していない可能性があります。スキルを最新版に更新してから再度お試しください。
- 認証エラー（Remote MCP）: MCP クライアント（Claude Desktop 等）が自動的に再認証を促します。解決しない場合はカスタムコネクタを一度削除し、再度追加してください。
- 認証エラー（ローカル）: `freee_auth_status` で確認 → `freee_clear_auth` → `freee_authenticate`
- 事業所エラー: `freee_list_companies` → `freee_set_current_company`
- 詳細: `recipes/troubleshooting/INDEX.md` 参照（症状別に auth / company / expense-errors / support へ分かれています）

## freee-mcp（リモート版） 限定のエンドポイントについて

一部のAPIエンドポイントは freee-mcp（リモート版）でのみ利用可能で、ローカルモードでは利用できない。該当する `recipes/` `references/` には「⚠ freee-mcp（リモート版） 限定」の注記がある。

該当エンドポイントを呼び出す前に `freee_server_info` で transport を確認し、`stdio`（ローカルモード）の場合は呼び出さず、ユーザーに freee-mcp（リモート版）への切り替え（[設定方法](https://support.freee.co.jp/hc/ja/articles/56390747520537)）を案内すること。

## API の機能制限について

freee API 自体の機能制限に起因する問題は freee-mcp では解決できません。詳細は `recipes/troubleshooting/support.md` を参照してください。
