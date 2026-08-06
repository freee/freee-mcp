# サイン文書の作成・アップロード

freee サイン（電子契約）で文書を作成し、署名依頼までつなげる操作ガイド。
MCP ツールのセットアップと認証は `../SIGN-GUIDE.md`、API 仕様の詳細は `../sign-references/sign-documents.md` を参照。

## 文書作成エンドポイントの選び方

目的によって使うエンドポイントが異なる。

| 目的 | エンドポイント | 作成後のステータス |
|------|--------------|------------------|
| テンプレートから文書を作成する | POST /v1/documents | 作成中 (draft) |
| 手元のファイルから署名用の文書を作成する | POST /v1/documents/uploads | 作成中 (draft) |
| 締結済みの PDF を保管用に取り込む | POST /v1/pdf_documents | 完了 (concluded) |

注意点:

- POST /v1/documents は template_id が必須。テンプレートが 1 件もない環境では使用できないため、先に GET /v1/templates でテンプレートの有無を確認する
- POST /v1/documents/uploads は PDF/Word/Excel/PowerPoint、10MB 以下
- POST /v1/pdf_documents は PDF のみ、10MB 以下。作成される文書は「完了」扱いになり、署名フローには乗せられない
- POST /v1/pdf_documents には title パラメータがなく、文書タイトルはアップロードファイル名になる。タイトルを変えたい場合はアップロード前にローカルでファイル名を変更する（拡張子の扱いなど実際に設定されたタイトルは、作成後のレスポンスの title で確認する）
- リファレンスの「APIクライアントを利用する場合は必須」という注記（creator_id・sender_id・user_id 等）は、アクセストークン発行 API（POST /v1/token）を使う「APIクライアント」向けのもの。freee-sign-mcp は OAuth 2.0 認証で接続するため、この注記の対象ではない

## uploader_id / creator_id の取得

アップロード系エンドポイントの uploader_id と POST /v1/documents の creator_id には、GET /v1/users/me で取得できる自分のユーザー ID（レスポンスの id フィールド）を指定する。

## folder_id の取得

GET /v1/folders でフォルダ一覧を取得する。レスポンスは id・name・parent_id（ホームフォルダには無し）を持つフォルダの配列で、ホームフォルダも含まれる。保存先の指定がユーザーからない場合は、一覧を提示して選んでもらう。

## ファイルから文書を作成する

### sign_file_upload ツールを使う（推奨）

sign_api_post の body に Base64 を直接渡す方法は、ファイルが数百 KB を超えると LLM がツール引数を生成しきれず失敗する。ローカルにあるファイルは専用ツール sign_file_upload を使う。ファイルの読み込みと Base64 変換はツール側で行われる。

```
sign_file_upload {
  "file_path": "/path/to/契約書.pdf",
  "folder_id": 123,
  "title": "業務委託契約書"
}
```

パラメータ:

| 名前 | 必須 | 説明 |
|------|------|------|
| file_path | はい | アップロードするファイルのローカルパス |
| folder_id | はい | 保存先フォルダのID（GET /v1/folders で取得） |
| uploader_id | いいえ | アップロードするユーザーのID。省略時は GET /v1/users/me の id で自動解決 |
| title | いいえ | 文書のタイトル。省略時はファイル名から設定されるが、拡張子の扱いなど変換規則は文書化されていないため、タイトルを確実にしたい場合は明示指定する。draft のみ有効で、concluded では反映されない |
| document_status | いいえ | draft（既定）: 署名依頼に使う「作成中」の文書を作成（POST /v1/documents/uploads を使用） / concluded: 締結済み PDF を「完了」文書として保管（POST /v1/pdf_documents を使用） |
| signers_count | いいえ | 相手方の署名者の人数（draft のみ有効、1〜20、省略時は 1）。1 社でも署名する人が 2 名なら 2。「相手は N 社」「先方の担当者」などの曖昧な人数表現から断定せず、実際に署名する人数をユーザーに確認する。送信時に to へ指定する送り先の数と一致させる |
| skip_approval | いいえ | true: 配付文書 / false: 署名・合意文書（draft のみ有効、省略時は false） |

### sign_api_post で直接送る（小さいファイルのみ）

Base64 文字列が小さい場合（目安: 数十 KB まで）は sign_api_post でも作成できる。body の形式は `../sign-references/sign-documents.md` の POST /v1/documents/uploads を参照。

### MCP 外から送る（curl でのデバッグ・直接呼び出し）

MCP を経由せず API を直接呼び出す場合のベース URL は https://ninja-sign.com（`../SIGN-GUIDE.md` 参照）。

curl の例（アクセストークンは `~/.config/freee-mcp/sign-tokens.json` の access_token を使用）:

```bash
base64 -w0 契約書.pdf > content.b64
jq -n --arg name "契約書.pdf" --rawfile content content.b64 \
  '{file: {name: $name, content: $content}, uploader_id: 42, folder_id: 123}' \
  | curl -X POST https://ninja-sign.com/v1/documents/uploads \
      -H "Authorization: Bearer $ACCESS_TOKEN" \
      -H "Content-Type: application/json" \
      -d @-
```

保管用の POST /v1/pdf_documents に送る場合は、body のキーが file ではなく pdf_file になる（title パラメータはない）。

## アップロード後の流れ（署名依頼まで）

1. 文書を作成（上記いずれか）し、レスポンスの document.id を控える
2. 相手に入力させる欄（押印欄・テキスト欄など）が必要な場合のみ入力項目を付与: GET /v1/items で item_id を確認し、POST /v1/documents/{document_id}/document_items を呼ぶ（order は 0 が送信者、1 以降が n 番目の受領者）。合意・署名だけを求める場合、この手順は不要
3. 送信前にユーザーが内容を確認する場合はここで止める。確認は freee サイン Web UI で文書を開いてもらう。PDF を API で取得する方法（GET /v1/documents/{document_id} に Accept: application/pdf）は sign_api_get がヘッダー指定に対応していないため MCP 経由では実行できず、curl 等の直接呼び出しが必要（PDF 作成処理中はエラーになるため時間を置いて再実行）
4. 文書を送信: POST /v1/documents/{document_id}/confirmations（メール / SMS / 署名者用 URL 発行）

送信（メールの場合）の例:

```
sign_api_post {
  "path": "/v1/documents/123/confirmations",
  "body": {
    "notification_type": "email",
    "to": [{ "email": "signer@example.com" }],
    "es_type": "timestamp_only"
  }
}
```

to はオブジェクトではなく送り先の配列で、メール送信では相手方の署名者の人数分（signers_count と同数）を過不足なく指定する（リファレンスでは to の内部構造が展開されていないため注意）。メール送信の要素に指定できるフィールドは email のほかは転送・本人確認関連のフラグ（forwarding_required・verification_file_required・telephone_number_verification_required、いずれも省略時 false）のみで、宛先名は指定できない。SMS 送信は `[{ "telephone_number": "080xxxxxxxx" }]`、署名者用 URL 発行（notification_type: "url"）は `[{}]` を 1 件だけ指定する。es_type は timestamp_only（電子サイン、既定）/ esign（電子署名、送信ごとに料金が発生）。

その他のパラメータ（message・cc・password・有効期限など）は `../sign-references/sign-documents.md` の POST /v1/documents/{document_id}/confirmations を参照。
