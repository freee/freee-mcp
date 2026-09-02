# ファイルボックス（証憑ファイル）の操作

freee会計APIを使った証憑ファイル（レシート・請求書等）のアップロード・検索・更新ガイド。

## ファイルアップロード

`POST /api/1/receipts` は multipart/form-data が必要なため、通常の `freee_api_post` では利用できない。接続モードに応じて専用ツールを使う。

- ローカルモード（stdio）: `freee_file_upload` にローカルファイルのパスを渡す
- Remote MCP: `freee_file_upload_ui` でアップロード画面を表示し、ユーザーが画面上でファイルを選ぶ

### Remote MCP でのアップロード（freee_file_upload_ui）

Remote MCP ではファイルの中身を MCP 経由で送れない（LLM のツール引数・MCP のリクエストボディにサイズ制限がある）ため、ファイルの読み込み・Base64 化・`freee_api_post` への直接投入は行わない。代わりに `freee_file_upload_ui` を呼ぶと、MCP Apps 対応クライアントの会話内にアップロード画面が表示され、ユーザーが選んだファイルはブラウザから freee MCP サーバー経由で直接 freee API に送られる（1 ファイル 64MB まで、複数選択可。メモ・取引先名・発行日・金額・書類の種類・適格請求書区分も画面で指定できる）。

```
freee_file_upload_ui {
  "company_id": 12345
}
```

- company_id は省略可。指定した場合は現在の事業所と一致しないとエラーになる
- 画面で選ぶのはユーザーなので、ファイルパスや内容を尋ねる必要はない。ツール呼び出し後は「画面でファイルを選んでアップロードしてください」と案内する
- アップロード完了時、画面から会話にファイルボックス ID が通知される。以降のメタ情報更新は通常どおり `PUT /api/1/receipts/{id}` で行う
- MCP Apps 非対応のクライアント（画面が出ない場合）は freee Web (https://secure.freee.co.jp/receipts) からアップロードするよう案内する

### ローカルモードでのアップロード（freee_file_upload）

```
freee_file_upload {
  "file_path": "/path/to/receipt.jpg",
  "company_id": 12345,
  "document_type": "receipt",
  "description": "ファミリーマート レシート",
  "receipt_metadatum_amount": 460,
  "receipt_metadatum_issue_date": "2024-09-29",
  "receipt_metadatum_partner_name": "ファミリーマート"
}
```

パラメータ:

- file_path（必須）: アップロードするファイルのローカルパス
- company_id（必須）: 事業所ID。他の `freee_api_*` ツールと同じく現在の事業所と一致しない場合はエラーになる（切り替えは `freee_set_current_company`）
- document_type: 書類の種類（receipt: 領収書 / invoice: 請求書 / other: その他）
- description: メモ（最大255文字）
- receipt_metadatum_amount: 金額
- receipt_metadatum_issue_date: 発行日（yyyy-mm-dd）
- receipt_metadatum_partner_name: 取引先名（最大255文字）
- qualified_invoice: 適格請求書等（qualified / not_qualified / unselected）

## 使用例

### 証憑ファイル一覧を取得

```
freee_api_get {
  "service": "accounting",
  "path": "/api/1/receipts",
  "query": {
    "start_date": "2025-01-01",
    "end_date": "2025-01-31"
  }
}
```

### 証憑ファイルのメタ情報を更新

```
freee_api_put {
  "service": "accounting",
  "path": "/api/1/receipts/432228305",
  "body": {
    "description": "ファミリーマート 一の橋店 レシート",
    "receipt_metadatum": {
      "partner_name": "ファミリーマート",
      "issue_date": "2024-09-29",
      "amount": 460
    },
    "document_type": "receipt"
  }
}
```

## アップロード後のWeb確認URL

アップロードしたファイルは `https://secure.freee.co.jp/receipts/{id}` でWeb画面から確認できる。

## リファレンス

パス一覧・パラメータ・レスポンス、アップロード制限の詳細は `references/accounting-receipts.md` を参照。
