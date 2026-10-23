# サイン文書を MCP 外から送る（curl でのデバッグ・直接呼び出し）

MCP を経由せず API を直接呼び出す場合のベース URL は https://ninja-sign.com（`../SIGN-GUIDE.md` 参照）。アクセストークンは `~/.config/freee-mcp/sign-tokens.json` の access_token を使用する。

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
