# 経費申請のトラブルシューティング

経費申請の基本操作は `recipes/expense-application-operations.md` を参照。

## expense_application_line_template_id が無効

原因: 指定した経費科目 ID が存在しない、または事業所で無効化されている。利用可能な経費科目は事業所ごとに異なるため、必ず `GET /api/1/expense_application_line_templates` で事前に確認する。

経費科目一覧が取得できない場合は、`freee_get_current_company` で事業所が正しく設定されているか、権限があるかを確認する。

経費科目が多く選択に迷う場合は、各科目の `name` と `description` を確認する（交通費: 電車・バス・タクシー、宿泊費: ホテル・旅館、接待交際費: 会食・接待、消耗品費: 文房具・備品など）。判断できない場合は経理部門に確認する。

## section_id が無効

原因: 指定した部門 ID が存在しない。`GET /api/1/sections` で部門一覧を確認する。

## 入力値のバリデーションエラー

- amount must be positive: 金額は正の整数で指定する。0以下・文字列・小数は不可
- Invalid date format: 日付は `yyyy-mm-dd` 形式で指定する。スラッシュ区切り、時刻付き、ハイフンなしは不可
- issue_date must be after transaction_date: 申請日（issue_date）は発生日（transaction_date）以降にする。通常は「今日」または発生日以降を指定する
- title is required: 申請タイトルを設定する（空文字は不可）
- expense_application_lines is required: 経費明細を少なくとも1つ含める

## 申請作成後に内容を確認したい

```
freee_api_get {
  "service": "accounting",
  "path": "/api/1/expense_applications",
  "query": { "limit": 10 }
}
```

Web画面では `https://secure.freee.co.jp/expense_applications/{id}` で確認できる。

## レスポンスが遅い

大量データの取得やネットワークが原因のことが多い。`limit` パラメータで取得件数を制限し、条件を絞って必要なデータのみ取得する。

## よくある質問

Q: 経費申請を下書き保存できるか
A: freee API では申請作成時に自動的に申請される。下書きにしたい場合はローカルにデータを保存しておき、後で API を実行する。

Q: 領収書画像を添付できるか
A: ファイルボックス API（`recipes/receipt-operations.md`）で証憑をアップロードし、`receipt_ids` で経費申請や取引に紐づける。

Q: 作成した申請を修正できるか
A: 下書き・差戻し状態の経費申請は PUT API で更新できる。申請中・承認済みの場合は freee Web UI を使う。

Q: 複数の経費をまとめて申請すべきか
A: 同じ出張の交通費・宿泊費や同じ月の交通費はまとめることが多い。異なる種類の経費は別々の申請を推奨。会社の方針に従う。
