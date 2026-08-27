# ファイルボックス（証憑ファイル）の操作

freee会計APIを使った証憑ファイル（レシート・請求書等）のアップロード・検索・更新ガイド。

## ファイルアップロード

`POST /api/1/receipts` は multipart/form-data が必要なため、通常の `freee_api_post` では利用できない。ローカルファイルのアップロードにはカスタムツール `freee_file_upload` を使う。

`freee_file_upload` はローカルモードでのみ利用可能。Remote MCP を利用している場合、ファイルのアップロードは freee Web UI から行う。

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
