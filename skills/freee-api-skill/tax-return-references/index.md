# tax_return API v3 帳票項目マッピング

<!-- markdownlint-disable MD013 -->

freee申告（法人税）の帳票取得 API が返す XML と、紙の帳票の項目名との対応表。
帳票ごとに 1 ファイルに分かれており、各ファイルの xpath 列はレスポンス XML に対してそのまま評価できる。

使い方: 調べたい帳票の `sheet_code` または帳票名で下表を引き、該当ファイルだけを開く。
XTX/XBRL のタグ名から項目の意味を調べる場合も、タグ名でファイル内を検索すれば項目名に辿り着ける。

## 出典と注意事項

- freee 社内の帳票定義（電子申告タグ定義・帳票項目定義）と、e-Tax / eLTAX が配布する様式仕様書から**機械生成**したもの。手書きの対応表ではない
- 生成スクリプト: `scripts/tax_return_xtx-mapping/generate_md_mapping.rb`（freee-ctax リポジトリ）
- 対象の様式バージョン: 202512 / 202604
- 各表は**様式のテンプレート**であり、実際のレスポンスには値が未入力の項目が現れないことがある。ページ番号は代表値として 1 ページ目を表示している
- 公式仕様書の代替ではない。ここに無い項目や、表記と実レスポンスが食い違う場合は、e-Tax / eLTAX の公式仕様書を確認すること
- 税務上の解釈・判断は含まない。項目の意味と XML 上の在り処だけを示す

## 帳票一覧

帳票 56 件。

| sheet_code | 帳票名 | 形式 | ファイル |
| --- | --- | --- | --- |
| `10100100` | 別表一青色 | e-Tax（国税） | [`10100100_別表一青色.md`](./10100100_別表一青色.md) |
| `10100101` | 別表一白色 | e-Tax（国税） | [`10100101_別表一白色.md`](./10100101_別表一白色.md) |
| `10100102` | 別表一次葉 | e-Tax（国税） | [`10100102_別表一次葉.md`](./10100102_別表一次葉.md) |
| `10100102` | 別表一次葉白色 | e-Tax（国税） | [`10100102_別表一次葉白色.md`](./10100102_別表一次葉白色.md) |
| `10200000` | 別表二 | e-Tax（国税） | [`10200000_別表二.md`](./10200000_別表二.md) |
| `10040200` | 別表四 | e-Tax（国税） | [`10040200_別表四.md`](./10040200_別表四.md) |
| `10040100` | 別表四（原則様式） | e-Tax（国税） | [`10040100_別表四（原則様式）.md`](./10040100_別表四（原則様式）.md) |
| `10050100` | 別表五（一） | e-Tax（国税） | [`10050100_別表五（一）.md`](./10050100_別表五（一）.md) |
| `10050200` | 別表五（二） | e-Tax（国税） | [`10050200_別表五（二）.md`](./10050200_別表五（二）.md) |
| `10600100` | 別表六（一） | e-Tax（国税） | [`10600100_別表六（一）.md`](./10600100_別表六（一）.md) |
| `10603100` | 別表六（二十四） | e-Tax（国税） | [`10603100_別表六（二十四）.md`](./10603100_別表六（二十四）.md) |
| `10700100` | 別表七（一） | e-Tax（国税） | [`10700100_別表七（一）.md`](./10700100_別表七（一）.md) |
| `10800100` | 別表八（一） | e-Tax（国税） | [`10800100_別表八（一）.md`](./10800100_別表八（一）.md) |
| `11000600` | 別表十（八） | e-Tax（国税） | [`11000600_別表十（八）.md`](./11000600_別表十（八）.md) |
| `11100100` | 別表十一（一） | e-Tax（国税） | [`11100100_別表十一（一）.md`](./11100100_別表十一（一）.md) |
| `11100120` | 別表十一（一の二） | e-Tax（国税） | [`11100120_別表十一（一の二）.md`](./11100120_別表十一（一の二）.md) |
| `11400200` | 別表十四（二） | e-Tax（国税） | [`11400200_別表十四（二）.md`](./11400200_別表十四（二）.md) |
| `11500000` | 別表十五 | e-Tax（国税） | [`11500000_別表十五.md`](./11500000_別表十五.md) |
| `11600100` | 別表十六（一） | e-Tax（国税） | [`11600100_別表十六（一）.md`](./11600100_別表十六（一）.md) |
| `11600200` | 別表十六（二） | e-Tax（国税） | [`11600200_別表十六（二）.md`](./11600200_別表十六（二）.md) |
| `11600600` | 別表十六（六） | e-Tax（国税） | [`11600600_別表十六（六）.md`](./11600600_別表十六（六）.md) |
| `11600700` | 別表十六（七） | e-Tax（国税） | [`11600700_別表十六（七）.md`](./11600700_別表十六（七）.md) |
| `11600800` | 別表十六（八） | e-Tax（国税） | [`11600800_別表十六（八）.md`](./11600800_別表十六（八）.md) |
| `402001000` | 適用額明細書 | e-Tax（国税） | [`402001000_適用額明細書.md`](./402001000_適用額明細書.md) |
| `401001000` | 法人事業概況説明書 | e-Tax（国税） | [`401001000_法人事業概況説明書.md`](./401001000_法人事業概況説明書.md) |
| `401002001` | 預貯金等の内訳書 | e-Tax（国税） | [`401002001_預貯金等の内訳書.md`](./401002001_預貯金等の内訳書.md) |
| `401002002` | 受取手形の内訳書 | e-Tax（国税） | [`401002002_受取手形の内訳書.md`](./401002002_受取手形の内訳書.md) |
| `401002003` | 売掛金の内訳書 | e-Tax（国税） | [`401002003_売掛金の内訳書.md`](./401002003_売掛金の内訳書.md) |
| `401002004` | 仮払金・貸付金の内訳書 | e-Tax（国税） | [`401002004_仮払金・貸付金の内訳書.md`](./401002004_仮払金・貸付金の内訳書.md) |
| `401002005` | 棚卸資産の内訳書 | e-Tax（国税） | [`401002005_棚卸資産の内訳書.md`](./401002005_棚卸資産の内訳書.md) |
| `401002006` | 有価証券の内訳書 | e-Tax（国税） | [`401002006_有価証券の内訳書.md`](./401002006_有価証券の内訳書.md) |
| `401002007` | 固定資産の内訳書 | e-Tax（国税） | [`401002007_固定資産の内訳書.md`](./401002007_固定資産の内訳書.md) |
| `401002008` | 支払手形の内訳書 | e-Tax（国税） | [`401002008_支払手形の内訳書.md`](./401002008_支払手形の内訳書.md) |
| `401002009` | 買掛金の内訳書 | e-Tax（国税） | [`401002009_買掛金の内訳書.md`](./401002009_買掛金の内訳書.md) |
| `401002010` | 仮受金・源泉所得税預り金の内訳書 | e-Tax（国税） | [`401002010_仮受金・源泉所得税預り金の内訳書.md`](./401002010_仮受金・源泉所得税預り金の内訳書.md) |
| `401002011` | 借入金及び支払利子の内訳書 | e-Tax（国税） | [`401002011_借入金及び支払利子の内訳書.md`](./401002011_借入金及び支払利子の内訳書.md) |
| `401002012` | 土地の売上高等の内訳書 | e-Tax（国税） | [`401002012_土地の売上高等の内訳書.md`](./401002012_土地の売上高等の内訳書.md) |
| `401002013` | 売上高等の事業所別内訳書 | e-Tax（国税） | [`401002013_売上高等の事業所別内訳書.md`](./401002013_売上高等の事業所別内訳書.md) |
| `401002014` | 役員給与等の内訳書 | e-Tax（国税） | [`401002014_役員給与等の内訳書.md`](./401002014_役員給与等の内訳書.md) |
| `401002015` | 地代家賃等・工業所有権等の使用料の内訳書 | e-Tax（国税） | [`401002015_地代家賃等・工業所有権等の使用料の内訳書.md`](./401002015_地代家賃等・工業所有権等の使用料の内訳書.md) |
| `401002016` | 雑益・雑損失等の内訳書 | e-Tax（国税） | [`401002016_雑益・雑損失等の内訳書.md`](./401002016_雑益・雑損失等の内訳書.md) |
| `403001000` | 税務代理権限証書（国税） | e-Tax（国税） | [`403001000_税務代理権限証書（国税）.md`](./403001000_税務代理権限証書（国税）.md) |
| `206000000` | 第六号様式 | eLTAX（地方税） | [`206000000_第六号様式.md`](./206000000_第六号様式.md) |
| `99500328` | 第六号様式（その2） | eLTAX（地方税） | [`99500328_第六号様式（その2）.md`](./99500328_第六号様式（その2）.md) |
| `206000430` | 第六号様式別表四の三 | eLTAX（地方税） | [`206000430_第六号様式別表四の三.md`](./206000430_第六号様式別表四の三.md) |
| `206000900` | 第六号様式別表九 | eLTAX（地方税） | [`206000900_第六号様式別表九.md`](./206000900_第六号様式別表九.md) |
| `99500352` | 【第3号】第六号様式別表九 | eLTAX（地方税） | [`99500352_【第3号】第六号様式別表九.md`](./99500352_【第3号】第六号様式別表九.md) |
| `220000000` | 第二十号様式 | eLTAX（地方税） | [`220000000_第二十号様式.md`](./220000000_第二十号様式.md) |
| `403002001` | 税務代理権限証書（都道府県民税） | eLTAX（地方税） | [`403002001_税務代理権限証書（都道府県民税）.md`](./403002001_税務代理権限証書（都道府県民税）.md) |
| `403003001` | 税務代理権限証書（市町村民税） | eLTAX（地方税） | [`403003001_税務代理権限証書（市町村民税）.md`](./403003001_税務代理権限証書（市町村民税）.md) |
| `balance_sheet` | 貸借対照表 | XBRL（決算書） | [`balance_sheet_貸借対照表.md`](./balance_sheet_貸借対照表.md) |
| `profit_and_loss` | 損益計算書 | XBRL（決算書） | [`profit_and_loss_損益計算書.md`](./profit_and_loss_損益計算書.md) |
| `cost_report` | 原価報告書 | XBRL（決算書） | [`cost_report_原価報告書.md`](./cost_report_原価報告書.md) |
| `notes_to_financial_statements` | 個別注記表 | XBRL（決算書） | [`notes_to_financial_statements_個別注記表.md`](./notes_to_financial_statements_個別注記表.md) |
| `statements_of_shareholders` | 株主資本等変動計算書 | XBRL（決算書） | [`statements_of_shareholders_株主資本等変動計算書.md`](./statements_of_shareholders_株主資本等変動計算書.md) |
| `301001000` | 還付請求書 | 電子申告未対応（XTX なし） | [`301001000_還付請求書.md`](./301001000_還付請求書.md) |

## xpath 表記の規則: 国税 (e-Tax) / 地方税 (eLTAX) の XTX

各帳票ファイルの「項目マッピング」表の xpath 列は、帳票 API が返す XTX(XML) に対してそのまま評価できる形式。
JSON 形式のレスポンスでは `data.xtx.{様式ID}.pages[N]` に対応する。

- 単純タグ: `//様式ID[@page='1']/タグ`（page は 1 始まり。マッピングはテンプレートのため代表値 1 を表示）
- グループ要素: 様式の入れ子をそのまま辿る `//様式ID[@page='1']/グループ/タグ`（国税は BGA00000 等のグループ要素が挟まる。地方税はフラット）
- サブキー（日付・区分等）: 親要素の子ノード `//様式ID[@page='1']/…/親タグ/gen:サブキー`。`kubun_CD` / `kubun_NM` のみ国税では接頭辞なし。表では項目名を空にして xpath 列の頭に `└` を付ける
- 繰り返しグループ: 配列要素を `[n]` で表記 `//様式ID[@page='1']/…/ラッパー[n]/子タグ`。表では項目名を **【繰り返しグループ】** とし、その配下の項目は `└` を付ける
- 「区分値 / envelope」列が `envelope.KEY` の項目は、様式部の要素が空で値は envelope 側にある。直下の `└` 行に envelope の xpath `//IT/KEY` を示す
- 「型」列が `API出力対象外` の項目は、紙の様式には存在するがレスポンスには出力されない
- 値が未入力の項目は要素ごとレスポンスに現れないことがある
- 名前空間: 国税は既定 `http://xml.e-tax.nta.go.jp/XSD/hojin` / `gen`=`http://xml.e-tax.nta.go.jp/XSD/general`、地方税は様式要素が既定 `http://eltax.jp/HOJIN_DOFUKEN` / `gen`=`http://eltax.jp/general`。xpath 評価時は既定名前空間の束縛が必要

## xpath 表記の規則: 決算書 (XBRL)

決算書は国税/地方税と異なり XBRL タクソノミで、レスポンスは XBRL インスタンスの XML。

- 勘定科目（値ノード）: `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/{prefix}:{要素名}[@contextRef='…']`
- 要素名は名前空間接頭辞付きの QName（例: `jpfr-t-cte:CashAndDeposits`）。定義上の xbrl_id は `jpfr-t-cte_CashAndDeposits` のように `_` 区切りだが、XML 上は `:` 区切りになる
- contextRef は期間区分で決まる。期間値=`CurrentYearNonConsolidatedDuration`、時点値=`CurrentYearNonConsolidatedInstant`。ただし S/S の「当期首残高」と注記表の「前期末…」は前期時点 `Prior1YearNonConsolidatedInstant`
- 「（タプル）」は子ファクトを内包する入れ物要素。自身は値も contextRef も持たず、繰り返し出現しうるため `[n]` で表記し、配下のファクトはその子になる
- 抽象要素（見出し・区分行）は XBRL ファクトを持たないため xpath なし。**子を持つ科目でも抽象要素でなければ自身の金額ファクトを出力する**（例: 現金及び預金）
- 値が未入力の科目は要素ごとレスポンスに現れない
- タプルは定義上は多段に入れ子になっているが、インスタンス上の入れ子は 1 段のみ（例: `ItemsTransactions` は `BreakdownRelatedPartyTransactions` の子ではなく `xbrli:xbrl` 直下に出力される）
- `contextRef='DocumentInfo'` のファクト（`EntityName` / `ExtendedLinkRole…` / `…DocInfo` 等）は帳票項目ではなく、XBRL インスタンスの書類メタ情報。各帳票の表には含めない
- 名前空間: `xbrli`=`http://www.xbrl.org/2003/instance`。`jpfr-t-cte` / `jpfr-etax-t-cte` 等はインスタンス冒頭の宣言を参照。xpath 評価時は接頭辞の束縛が必要

## xpath 表記の規則: 電子申告未対応帳票

電子申告（XTX）に対応していない帳票は、様式仕様書ではなく freee 内部の項目定義がそのまま要素名になる。

- 項目: `/data/{ルートキー}/{項目キー}`。XTX タグ名ではなく意味のある英語キーが要素名になる
- 日付など複数の値を持つ項目は `{項目キー}_{サブキー}` の要素に分かれる（例: `submission_date_year`）
- 値が nil の項目は `<要素 nil="true"/>` の空要素として出力される
- 名前空間は使用しない

## 共通ヘッダ: 国税 (e-Tax) の envelope / IT セクション

納税者・代表者・税理士・事業年度など、国税(e-Tax)の**全帳票のレスポンスに共通で出力される**部分。
各帳票の様式部にある IDREF 項目（「区分値 / envelope」列が `envelope.XXX` の行）は、ここの同名要素を参照する。
手続き要素 (RHO0012 等) は帳票により変わるため `//IT` を起点に表記する。
値が未設定の項目は要素ごと出力されないことがある（例: ゆうちょ銀行の項目は銀行口座指定時には出力されない）。

| 項目名 | xpath | 説明 / 区分値 | envelope 要素 |
| --- | --- | --- | --- |
| 提出先税務署 - gen:zeimusho_CD | `//IT/ZEIMUSHO/gen:zeimusho_CD` | マスタ参照(5桁) | `envelope.ZEIMUSHO` |
| 提出先税務署 - gen:zeimusho_NM | `//IT/ZEIMUSHO/gen:zeimusho_NM` | 税務署名 |  |
| 提出年月日 - gen:era | `//IT/TEISYUTSU_DAY/gen:era` | 1=明治, 2=大正, 3=昭和, 4=平成, 5=令和 | `envelope.TEISYUTSU_DAY` |
| 提出年月日 - gen:yy | `//IT/TEISYUTSU_DAY/gen:yy` | 和暦年(2桁) |  |
| 提出年月日 - gen:mm | `//IT/TEISYUTSU_DAY/gen:mm` | 月(2桁) |  |
| 提出年月日 - gen:dd | `//IT/TEISYUTSU_DAY/gen:dd` | 日(2桁) |  |
| 利用者識別番号 | `//IT/NOZEISHA_ID` | 利用者識別番号(半角数字16桁) | `envelope.NOZEISHA_ID` |
| 法人番号 / 個人番号 - gen:kojinbango | `//IT/NOZEISHA_BANGO/gen:kojinbango` | 12桁数値(個人番号。法人申告では出力されない) | `envelope.NOZEISHA_BANGO` |
| 法人番号 / 個人番号 - gen:hojinbango | `//IT/NOZEISHA_BANGO/gen:hojinbango` | 13桁数値 |  |
| 納税者名 (カナ) | `//IT/NOZEISHA_NM_KN` | 全角カナ | `envelope.NOZEISHA_NM_KN` |
| 納税者名 | `//IT/NOZEISHA_NM` | 納税者名(法人名) | `envelope.NOZEISHA_NM` |
| 納税者 郵便番号 - gen:zip1 | `//IT/NOZEISHA_ZIP/gen:zip1` | 3桁 | `envelope.NOZEISHA_ZIP` |
| 納税者 郵便番号 - gen:zip2 | `//IT/NOZEISHA_ZIP/gen:zip2` | 4桁 |  |
| 納税者 住所 | `//IT/NOZEISHA_ADR` | 納税地の住所 | `envelope.NOZEISHA_ADR` |
| 納税者 電話番号 - gen:tel1 | `//IT/NOZEISHA_TEL/gen:tel1` | 市外局番 | `envelope.NOZEISHA_TEL` |
| 納税者 電話番号 - gen:tel2 | `//IT/NOZEISHA_TEL/gen:tel2` | 市内局番 |  |
| 納税者 電話番号 - gen:tel3 | `//IT/NOZEISHA_TEL/gen:tel3` | 加入者番号 |  |
| 資本金 | `//IT/SHIHON_KIN` | 資本金の額(円) | `envelope.SHIHON_KIN` |
| 事業内容 | `//IT/JIGYO_NAIYO` | 事業内容(業種) | `envelope.JIGYO_NAIYO` |
| 還付金の受取場所 (金融機関 / ゆうちょ) - gen:kinyukikan_NM | `//IT/KANPU_KINYUKIKAN/gen:kinyukikan_NM` | 金融機関名。属性 kinyukikan_KB = 1=銀行, 2=金庫, 3=組合, 4=農協, 5=漁協 | `envelope.KANPU_KINYUKIKAN` |
| 還付金の受取場所 (金融機関 / ゆうちょ) - gen:shiten_NM | `//IT/KANPU_KINYUKIKAN/gen:shiten_NM` | 支店名。属性 shiten_KB = 1=本店, 2=支店, 3=本所, 4=支所, 5=出張所 |  |
| 還付金の受取場所 (金融機関 / ゆうちょ) - gen:kinyukikan_CD | `//IT/KANPU_KINYUKIKAN/gen:kinyukikan_CD` | 金融機関コード(4桁) |  |
| 還付金の受取場所 (金融機関 / ゆうちょ) - gen:shiten_CD | `//IT/KANPU_KINYUKIKAN/gen:shiten_CD` | 支店コード(3桁) |  |
| 還付金の受取場所 (金融機関 / ゆうちょ) - gen:yokin | `//IT/KANPU_KINYUKIKAN/gen:yokin` | 1=普通, 2=当座, 3=納税準備, 4=通知, 5=別段, 6=貯蓄, 9=その他 |  |
| 還付金の受取場所 (金融機関 / ゆうちょ) - gen:koza | `//IT/KANPU_KINYUKIKAN/gen:koza` | 口座番号 |  |
| 還付金の受取場所 (金融機関 / ゆうちょ) - gen:yubinkyoku_NM | `//IT/KANPU_KINYUKIKAN/gen:yubinkyoku_NM` | 郵便局名(ゆうちょ指定時のみ出力) |  |
| 還付金の受取場所 (金融機関 / ゆうちょ) - gen:kigobango1 | `//IT/KANPU_KINYUKIKAN/gen:kigobango1` | 記号(ゆうちょ指定時のみ出力) |  |
| 還付金の受取場所 (金融機関 / ゆうちょ) - gen:kigobango2 | `//IT/KANPU_KINYUKIKAN/gen:kigobango2` | 番号(ゆうちょ指定時のみ出力) |  |
| 代表者名 (カナ) | `//IT/DAIHYO_NM_KN` | 全角カナ | `envelope.DAIHYO_NM_KN` |
| 代表者名 | `//IT/DAIHYO_NM` | 代表者名 | `envelope.DAIHYO_NM` |
| 代表者 郵便番号 - gen:zip1 | `//IT/DAIHYO_ZIP/gen:zip1` | 3桁 | `envelope.DAIHYO_ZIP` |
| 代表者 郵便番号 - gen:zip2 | `//IT/DAIHYO_ZIP/gen:zip2` | 4桁 |  |
| 代表者 住所 | `//IT/DAIHYO_ADR` | 代表者の住所 | `envelope.DAIHYO_ADR` |
| 代表者 電話番号 - gen:tel1 | `//IT/DAIHYO_TEL/gen:tel1` | 市外局番 | `envelope.DAIHYO_TEL` |
| 代表者 電話番号 - gen:tel2 | `//IT/DAIHYO_TEL/gen:tel2` | 市内局番 |  |
| 代表者 電話番号 - gen:tel3 | `//IT/DAIHYO_TEL/gen:tel3` | 加入者番号 |  |
| 税理士 利用者識別番号 | `//IT/DAIRI_ID` | 税理士の利用者識別番号(半角数字16桁)。税理士関与でない場合は空 | `envelope.DAIRI_ID` |
| 税理士名 | `//IT/DAIRI_NM` | 税理士名(税理士法人名) | `envelope.DAIRI_NM` |
| 税理士 郵便番号 - gen:zip1 | `//IT/DAIRI_ZIP/gen:zip1` | 3桁 | `envelope.DAIRI_ZIP` |
| 税理士 郵便番号 - gen:zip2 | `//IT/DAIRI_ZIP/gen:zip2` | 4桁 |  |
| 税理士 住所 | `//IT/DAIRI_ADR` | 税理士の住所 | `envelope.DAIRI_ADR` |
| 税理士 電話番号 - gen:tel1 | `//IT/DAIRI_TEL/gen:tel1` | 市外局番 | `envelope.DAIRI_TEL` |
| 税理士 電話番号 - gen:tel2 | `//IT/DAIRI_TEL/gen:tel2` | 市内局番 |  |
| 税理士 電話番号 - gen:tel3 | `//IT/DAIRI_TEL/gen:tel3` | 加入者番号 |  |
| 手続き (申告手続コード / 名称) - procedure_CD | `//IT/TETSUZUKI/procedure_CD` | マスタ参照(英数7桁) | `envelope.TETSUZUKI` |
| 手続き (申告手続コード / 名称) - procedure_NM | `//IT/TETSUZUKI/procedure_NM` | 手続き名 |  |
| 事業年度 自 - gen:era | `//IT/JIGYO_NENDO_FROM/gen:era` | 1=明治, 2=大正, 3=昭和, 4=平成, 5=令和 | `envelope.JIGYO_NENDO_FROM` |
| 事業年度 自 - gen:yy | `//IT/JIGYO_NENDO_FROM/gen:yy` | 和暦年(2桁) |  |
| 事業年度 自 - gen:mm | `//IT/JIGYO_NENDO_FROM/gen:mm` | 月(2桁) |  |
| 事業年度 自 - gen:dd | `//IT/JIGYO_NENDO_FROM/gen:dd` | 日(2桁) |  |
| 事業年度 至 - gen:era | `//IT/JIGYO_NENDO_TO/gen:era` | 1=明治, 2=大正, 3=昭和, 4=平成, 5=令和 | `envelope.JIGYO_NENDO_TO` |
| 事業年度 至 - gen:yy | `//IT/JIGYO_NENDO_TO/gen:yy` | 和暦年(2桁) |  |
| 事業年度 至 - gen:mm | `//IT/JIGYO_NENDO_TO/gen:mm` | 月(2桁) |  |
| 事業年度 至 - gen:dd | `//IT/JIGYO_NENDO_TO/gen:dd` | 日(2桁) |  |
| 経理責任者 | `//IT/KEIRI_SEKININSHA` | 経理責任者名 | `envelope.KEIRI_SEKININSHA` |
| 申告区分 - kubun_CD | `//IT/SHINKOKU_KBN/kubun_CD` | 30=確定申告, 31=中間申告, 33=修正申告 | `envelope.SHINKOKU_KBN` |
| 申告区分 - kubun_NM | `//IT/SHINKOKU_KBN/kubun_NM` | kubun_CDに対応する名称(最大30文字) |  |

## 共通ヘッダ: 地方税 (eLTAX) の構成管理情報 / KOUSEI_KANRI_INF

納税者・代表者・税理士・事業年度など、地方税(eLTAX)の**全帳票のレスポンスに共通で出力される**部分。
国税の `//IT` にあたるもので、様式部（`//{様式ID}[@page='1']` 配下）の外にある。
提出様式の数だけ `FORM_ATTR` が繰り返される点に注意。
固定資産税・個人住民税(特別徴収)専用の分岐（KOTEI / KOJIN_TOKUCYO）は法人税目では出力されないため省略している。

| 項目名 | xpath | 説明 / 区分値 |
| --- | --- | --- |
| 構成管理バージョン | `/SHINKOKU_UNIT/KOUSEI_KANRI_INF/KOUSEI_KANRI/KANRI_INF/KOUSEI_KANRI_VR` | 固定値 0001 |
| 地方公共団体コード | `/SHINKOKU_UNIT/KOUSEI_KANRI_INF/KOUSEI_KANRI/KANRI_INF/ORG1_CD` | 6桁 |
| 手続きID | `/SHINKOKU_UNIT/KOUSEI_KANRI_INF/KOUSEI_KANRI/KANRI_INF/PROC_ID` | 例: R0102100 = 法人都道府県民税・事業税・特別法人事業税 確定申告 |
| 手続き名称 | `/SHINKOKU_UNIT/KOUSEI_KANRI_INF/KOUSEI_KANRI/KANRI_INF/PROC_NAME` |  |
| 当初受付番号 | `/SHINKOKU_UNIT/KOUSEI_KANRI_INF/KOUSEI_KANRI/KANRI_INF/FIRST_RCPT_NUM` | 訂正申告時のみ設定。通常は空 |
| 様式ID | `/SHINKOKU_UNIT/KOUSEI_KANRI_INF/KOUSEI_KANRI/FORM_ATTR/FORM_ID` | 例: R0102AA250 = 第六号様式。提出する様式の数だけ FORM_ATTR が繰り返す |
| 様式名 | `/SHINKOKU_UNIT/KOUSEI_KANRI_INF/KOUSEI_KANRI/FORM_ATTR/FORM_NAME` |  |
| 様式ファイル名 | `/SHINKOKU_UNIT/KOUSEI_KANRI_INF/KOUSEI_KANRI/FORM_ATTR/FORM_FILE_NAME` | freee は空で出力 |
| 様式XSLファイル名 | `/SHINKOKU_UNIT/KOUSEI_KANRI_INF/KOUSEI_KANRI/FORM_ATTR/FORM_XSL_NAME` | freee は空で出力 |
| 添付書類名称 | `/SHINKOKU_UNIT/KOUSEI_KANRI_INF/KOUSEI_KANRI/TENPU_ATTR/TENPU_NAME` | 添付書類がある場合のみ繰り返し出力 |
| 添付書類ファイル名 | `/SHINKOKU_UNIT/KOUSEI_KANRI_INF/KOUSEI_KANRI/TENPU_ATTR/TENPU_FILE_NAME` |  |
| XBRL名称 | `/SHINKOKU_UNIT/KOUSEI_KANRI_INF/KOUSEI_KANRI/XBRL_ATTR/XBRL_NAME` | 決算書(XBRL)を添付する場合のみ出力 |
| XBRLファイル名 | `/SHINKOKU_UNIT/KOUSEI_KANRI_INF/KOUSEI_KANRI/XBRL_ATTR/XBRL_FILE_NAME` |  |
| 業務区分 | `/SHINKOKU_UNIT/KOUSEI_KANRI_INF/KOUSEI_KANRI/GYOMU_PROC/PROC_INF/GYOMU_KBN` | R0=申告, S0=申請, T0=届出 |
| 税事務所コード | `/SHINKOKU_UNIT/KOUSEI_KANRI_INF/KOUSEI_KANRI/GYOMU_PROC/PROC_INF/ORG2_CD` | 政令指定都市の場合は区コード |
| 所属コード | `/SHINKOKU_UNIT/KOUSEI_KANRI_INF/KOUSEI_KANRI/GYOMU_PROC/PROC_INF/ORG3_CD` | 固定値 000000 |
| 受付行政機関名称 | `/SHINKOKU_UNIT/KOUSEI_KANRI_INF/KOUSEI_KANRI/GYOMU_PROC/PROC_INF/ORG1_NAME` | 例: 北海道札幌道税事務所長 |
| 事業年度 自 - gen:era | `/SHINKOKU_UNIT/KOUSEI_KANRI_INF/KOUSEI_KANRI/GYOMU_PROC/PROC_INF/SDATE/gen:era` | 1=明治, 2=大正, 3=昭和, 4=平成, 5=令和 |
| 事業年度 自 - gen:yy | `/SHINKOKU_UNIT/KOUSEI_KANRI_INF/KOUSEI_KANRI/GYOMU_PROC/PROC_INF/SDATE/gen:yy` | 和暦年(2桁) |
| 事業年度 自 - gen:mm | `/SHINKOKU_UNIT/KOUSEI_KANRI_INF/KOUSEI_KANRI/GYOMU_PROC/PROC_INF/SDATE/gen:mm` | 月(2桁) |
| 事業年度 自 - gen:dd | `/SHINKOKU_UNIT/KOUSEI_KANRI_INF/KOUSEI_KANRI/GYOMU_PROC/PROC_INF/SDATE/gen:dd` | 日(2桁) |
| 事業年度 自 - gen:yyyymmdd | `/SHINKOKU_UNIT/KOUSEI_KANRI_INF/KOUSEI_KANRI/GYOMU_PROC/PROC_INF/SDATE/gen:yyyymmdd` | 西暦日付(8桁) |
| 事業年度 至 - gen:era | `/SHINKOKU_UNIT/KOUSEI_KANRI_INF/KOUSEI_KANRI/GYOMU_PROC/PROC_INF/EDATE/gen:era` | 1=明治, 2=大正, 3=昭和, 4=平成, 5=令和 |
| 事業年度 至 - gen:yy | `/SHINKOKU_UNIT/KOUSEI_KANRI_INF/KOUSEI_KANRI/GYOMU_PROC/PROC_INF/EDATE/gen:yy` | 和暦年(2桁) |
| 事業年度 至 - gen:mm | `/SHINKOKU_UNIT/KOUSEI_KANRI_INF/KOUSEI_KANRI/GYOMU_PROC/PROC_INF/EDATE/gen:mm` | 月(2桁) |
| 事業年度 至 - gen:dd | `/SHINKOKU_UNIT/KOUSEI_KANRI_INF/KOUSEI_KANRI/GYOMU_PROC/PROC_INF/EDATE/gen:dd` | 日(2桁) |
| 事業年度 至 - gen:yyyymmdd | `/SHINKOKU_UNIT/KOUSEI_KANRI_INF/KOUSEI_KANRI/GYOMU_PROC/PROC_INF/EDATE/gen:yyyymmdd` | 西暦日付(8桁) |
| 申告年月日 - gen:era | `/SHINKOKU_UNIT/KOUSEI_KANRI_INF/KOUSEI_KANRI/GYOMU_PROC/PROC_INF/RPT_DATE/gen:era` | 1=明治, 2=大正, 3=昭和, 4=平成, 5=令和 |
| 申告年月日 - gen:yy | `/SHINKOKU_UNIT/KOUSEI_KANRI_INF/KOUSEI_KANRI/GYOMU_PROC/PROC_INF/RPT_DATE/gen:yy` | 和暦年(2桁) |
| 申告年月日 - gen:mm | `/SHINKOKU_UNIT/KOUSEI_KANRI_INF/KOUSEI_KANRI/GYOMU_PROC/PROC_INF/RPT_DATE/gen:mm` | 月(2桁) |
| 申告年月日 - gen:dd | `/SHINKOKU_UNIT/KOUSEI_KANRI_INF/KOUSEI_KANRI/GYOMU_PROC/PROC_INF/RPT_DATE/gen:dd` | 日(2桁) |
| 税目区分 | `/SHINKOKU_UNIT/KOUSEI_KANRI_INF/KOUSEI_KANRI/GYOMU_PROC/PROC_INF/TAX_KBN` | 102=法人都道府県民税・事業税・特別法人事業税, 502=個人都道府県民税・市区町村民税(特徴), 504=法人市町村民税, 513=固定資産税(償却資産) |
| 申告区分 | `/SHINKOKU_UNIT/KOUSEI_KANRI_INF/KOUSEI_KANRI/GYOMU_PROC/PROC_INF/RPT_KBN` | 010/030/040=予定申告, 020/050/060=中間申告, 011=修正予定申告, 021=修正中間申告, 100/110/120=確定申告, 101/111/121=修正確定申告 |
| 税目名称 | `/SHINKOKU_UNIT/KOUSEI_KANRI_INF/KOUSEI_KANRI/GYOMU_PROC/PROC_INF/TAX_NAME` | TAX_KBN に対応する名称 |
| 申告区分名称 | `/SHINKOKU_UNIT/KOUSEI_KANRI_INF/KOUSEI_KANRI/GYOMU_PROC/PROC_INF/RPT_NAME` | RPT_KBN に対応する名称 |
| 作成区分 | `/SHINKOKU_UNIT/KOUSEI_KANRI_INF/KOUSEI_KANRI/GYOMU_PROC/PROC_INF/MAKE_KBN` | 1=新規, 2=プレ申告, 3=訂正。freee は 1 固定 |
| 訂正申告の受付番号 | `/SHINKOKU_UNIT/KOUSEI_KANRI_INF/KOUSEI_KANRI/GYOMU_PROC/PROC_INF/REV_RCPT_NUM` | 訂正申告時のみ設定。通常は空 |
| 利用者ID | `/SHINKOKU_UNIT/KOUSEI_KANRI_INF/KOUSEI_KANRI/GYOMU_PROC/USER_INF/USER_ID` | eLTAX の利用者ID |
| 納税者名カナ | `/SHINKOKU_UNIT/KOUSEI_KANRI_INF/KOUSEI_KANRI/GYOMU_PROC/USER_INF/KANA` |  |
| 納税者名 | `/SHINKOKU_UNIT/KOUSEI_KANRI_INF/KOUSEI_KANRI/GYOMU_PROC/USER_INF/NAME` |  |
| 本店住所 | `/SHINKOKU_UNIT/KOUSEI_KANRI_INF/KOUSEI_KANRI/GYOMU_PROC/USER_INF/HONTEN/HONTEN_ADDR` |  |
| 本店郵便番号 | `/SHINKOKU_UNIT/KOUSEI_KANRI_INF/KOUSEI_KANRI/GYOMU_PROC/USER_INF/HONTEN/HONTEN_ZIP` | ハイフンなし7桁 |
| 本店電話番号 | `/SHINKOKU_UNIT/KOUSEI_KANRI_INF/KOUSEI_KANRI/GYOMU_PROC/USER_INF/HONTEN/HONTEN_TEL` | ハイフンなし |
| 代表者格コード | `/SHINKOKU_UNIT/KOUSEI_KANRI_INF/KOUSEI_KANRI/GYOMU_PROC/USER_INF/DAIHYO/DAIHYOKAKU_CD` | 01=代表者, 02=破産管財人, 03=清算人, 99=その他。freee は 01 固定 |
| 代表者氏名カナ | `/SHINKOKU_UNIT/KOUSEI_KANRI_INF/KOUSEI_KANRI/GYOMU_PROC/USER_INF/DAIHYO/DAIHYO_KANA` |  |
| 代表者氏名 | `/SHINKOKU_UNIT/KOUSEI_KANRI_INF/KOUSEI_KANRI/GYOMU_PROC/USER_INF/DAIHYO/DAIHYO_NAME` |  |
| 代表者住所 | `/SHINKOKU_UNIT/KOUSEI_KANRI_INF/KOUSEI_KANRI/GYOMU_PROC/USER_INF/DAIHYO/DAIHYO_ADDR` |  |
| 代表者郵便番号 | `/SHINKOKU_UNIT/KOUSEI_KANRI_INF/KOUSEI_KANRI/GYOMU_PROC/USER_INF/DAIHYO/DAIHYO_ZIP` | ハイフンなし7桁 |
| 代表者電話番号 | `/SHINKOKU_UNIT/KOUSEI_KANRI_INF/KOUSEI_KANRI/GYOMU_PROC/USER_INF/DAIHYO/DAIHYO_TEL` | ハイフンなし |
| 届出番号 | `/SHINKOKU_UNIT/KOUSEI_KANRI_INF/KOUSEI_KANRI/GYOMU_PROC/USER_INF/T_RCPT_NUM` | freee は空で出力 |
| 法人番号 | `/SHINKOKU_UNIT/KOUSEI_KANRI_INF/KOUSEI_KANRI/GYOMU_PROC/USER_INF/HOJIN_NUMBER` | 13桁 |
| 事業所名カナ | `/SHINKOKU_UNIT/KOUSEI_KANRI_INF/KOUSEI_KANRI/GYOMU_PROC/JIGYOSHO_INF/JIGYOSHO_KANA` |  |
| 事業所名 | `/SHINKOKU_UNIT/KOUSEI_KANRI_INF/KOUSEI_KANRI/GYOMU_PROC/JIGYOSHO_INF/JIGYOSHO_NAME` |  |
| 本支店区分 | `/SHINKOKU_UNIT/KOUSEI_KANRI_INF/KOUSEI_KANRI/GYOMU_PROC/JIGYOSHO_INF/HONSHI_KBN` | 11=本店, 12=支店, 13=寮 等 |
| 税理士の利用者ID | `/SHINKOKU_UNIT/KOUSEI_KANRI_INF/KOUSEI_KANRI/GYOMU_PROC/DAIRI_INF/DAIRI_ID` | 税理士による代理送信時のみ設定 |
| 税理士名 | `/SHINKOKU_UNIT/KOUSEI_KANRI_INF/KOUSEI_KANRI/GYOMU_PROC/DAIRI_INF/DAIRI_NAME` |  |
| 税理士電話番号 | `/SHINKOKU_UNIT/KOUSEI_KANRI_INF/KOUSEI_KANRI/GYOMU_PROC/DAIRI_INF/DAIRI_TEL` |  |
| 連帯納税義務者1 の利用者ID | `/SHINKOKU_UNIT/KOUSEI_KANRI_INF/KOUSEI_KANRI/GYOMU_PROC/RENTAI_INF/RENTAI1_ID` | freee は空で出力 |
| 連帯納税義務者2 の利用者ID | `/SHINKOKU_UNIT/KOUSEI_KANRI_INF/KOUSEI_KANRI/GYOMU_PROC/RENTAI_INF/RENTAI2_ID` | freee は空で出力 |
| 連帯納税義務者3 の利用者ID | `/SHINKOKU_UNIT/KOUSEI_KANRI_INF/KOUSEI_KANRI/GYOMU_PROC/RENTAI_INF/RENTAI3_ID` | freee は空で出力 |
| 連帯納税義務者4 の利用者ID | `/SHINKOKU_UNIT/KOUSEI_KANRI_INF/KOUSEI_KANRI/GYOMU_PROC/RENTAI_INF/RENTAI4_ID` | freee は空で出力 |
| 連帯納税義務者5 の利用者ID | `/SHINKOKU_UNIT/KOUSEI_KANRI_INF/KOUSEI_KANRI/GYOMU_PROC/RENTAI_INF/RENTAI5_ID` | freee は空で出力 |
| 連帯納税義務者6 の利用者ID | `/SHINKOKU_UNIT/KOUSEI_KANRI_INF/KOUSEI_KANRI/GYOMU_PROC/RENTAI_INF/RENTAI6_ID` | freee は空で出力 |
| 連帯納税義務者7 の利用者ID | `/SHINKOKU_UNIT/KOUSEI_KANRI_INF/KOUSEI_KANRI/GYOMU_PROC/RENTAI_INF/RENTAI7_ID` | freee は空で出力 |
| 連帯納税義務者8 の利用者ID | `/SHINKOKU_UNIT/KOUSEI_KANRI_INF/KOUSEI_KANRI/GYOMU_PROC/RENTAI_INF/RENTAI8_ID` | freee は空で出力 |
| 連帯納税義務者9 の利用者ID | `/SHINKOKU_UNIT/KOUSEI_KANRI_INF/KOUSEI_KANRI/GYOMU_PROC/RENTAI_INF/RENTAI9_ID` | freee は空で出力 |
| 住所コード | `/SHINKOKU_UNIT/KOUSEI_KANRI_INF/KOUSEI_KANRI/GYOMU_TAX/ORG_INF/ADDR_CD` | 行政機関の記入欄。freee は空で出力 |
| 課税地住所 | `/SHINKOKU_UNIT/KOUSEI_KANRI_INF/KOUSEI_KANRI/GYOMU_TAX/ORG_INF/KAZEI_ADDR` | 行政機関の記入欄。freee は空で出力 |
| 課税地郵便番号 | `/SHINKOKU_UNIT/KOUSEI_KANRI_INF/KOUSEI_KANRI/GYOMU_TAX/ORG_INF/KAZEI_ZIP` | 行政機関の記入欄。freee は空で出力 |
| 課税地電話番号 | `/SHINKOKU_UNIT/KOUSEI_KANRI_INF/KOUSEI_KANRI/GYOMU_TAX/ORG_INF/KAZEI_TEL` | 行政機関の記入欄。freee は空で出力 |
| 法源番号 | `/SHINKOKU_UNIT/KOUSEI_KANRI_INF/KOUSEI_KANRI/GYOMU_TAX/ORG_INF/HOGEN_NUM` | 行政機関の記入欄。freee は空で出力 |
| 管理番号 | `/SHINKOKU_UNIT/KOUSEI_KANRI_INF/KOUSEI_KANRI/GYOMU_TAX/ORG_INF/KANRI_NUM` | 行政機関の記入欄。freee は空で出力 |
| 課税番号 | `/SHINKOKU_UNIT/KOUSEI_KANRI_INF/KOUSEI_KANRI/GYOMU_TAX/ORG_INF/KAZEI_NUM` | 行政機関の記入欄。freee は空で出力 |
| 補助番号 | `/SHINKOKU_UNIT/KOUSEI_KANRI_INF/KOUSEI_KANRI/GYOMU_TAX/ORG_INF/HOJO_NUM` | 行政機関の記入欄。freee は空で出力 |
| 職員番号 | `/SHINKOKU_UNIT/KOUSEI_KANRI_INF/KOUSEI_KANRI/GYOMU_TAX/ORG_INF/STF_NUM` | 行政機関の記入欄。freee は空で出力 |
| 処理時刻 | `/SHINKOKU_UNIT/KOUSEI_KANRI_INF/KOUSEI_KANRI/GYOMU_TAX/STIME` | freee は空で出力 |
| 事業種目 | `/SHINKOKU_UNIT/KOUSEI_KANRI_INF/KOUSEI_KANRI/GYOMU_TAX/HOJIN_DOFUKEN/FORM_INF/JIGYO_NAME` |  |
| 資本金の額 | `/SHINKOKU_UNIT/KOUSEI_KANRI_INF/KOUSEI_KANRI/GYOMU_TAX/HOJIN_DOFUKEN/FORM_INF/SHIHON` | 未設定時は 0 |
| 法人コード | `/SHINKOKU_UNIT/KOUSEI_KANRI_INF/KOUSEI_KANRI/GYOMU_TAX/HOJIN_DOFUKEN/FORM_INF/HOJIN_NUM` | freee は空で出力 |
| 事業所コード | `/SHINKOKU_UNIT/KOUSEI_KANRI_INF/KOUSEI_KANRI/GYOMU_TAX/HOJIN_DOFUKEN/FORM_INF/JIMUSHO_NUM` | freee は空で出力 |
| 整理番号 | `/SHINKOKU_UNIT/KOUSEI_KANRI_INF/KOUSEI_KANRI/GYOMU_TAX/HOJIN_DOFUKEN/FORM_INF/SEIRI_NUM` |  |
| 郵送区分 | `/SHINKOKU_UNIT/KOUSEI_KANRI_INF/TAX_DATA/TENPU_INF/YUSO_KBN` | 1=送付書を添付する, 0=添付しない |
| 添付書類データ | `/SHINKOKU_UNIT/KOUSEI_KANRI_INF/TAX_DATA/TENPU_INF/TENPU/TENPU_DATA` | Base64 エンコードされた添付ファイル本体 |
| 添付書類の署名 | `/SHINKOKU_UNIT/KOUSEI_KANRI_INF/TAX_DATA/TENPU_INF/TENPU/Signature` |  |
| 添付書類名 | `/SHINKOKU_UNIT/KOUSEI_KANRI_INF/TAX_DATA/TENPU_INF/TENPU/TENPU_NAME` |  |
| 電子署名データ | `/SHINKOKU_UNIT/Signature_INF/Signature_DATA` | 送信時に付与される。API レスポンスでは空 |
| 署名付き添付情報 | `/SHINKOKU_UNIT/Signature_INF/ATT_INF` | 送信時に付与される。API レスポンスでは空 |
| システムデータ | `/SHINKOKU_UNIT/SYSTEM_INF/SYSTEM_DATA` | freee は空で出力 |
| 作成日時 | `/SHINKOKU_UNIT/SYSTEM_INF/NOUZEI_UPDATE/SDATE` | freee は空で出力 |
| 更新日時 | `/SHINKOKU_UNIT/SYSTEM_INF/NOUZEI_UPDATE/UDATE` | freee は空で出力 |
| 署名日時 | `/SHINKOKU_UNIT/SYSTEM_INF/NOUZEI_UPDATE/SIGN_DATE` | freee は空で出力 |
| 送信日時 | `/SHINKOKU_UNIT/SYSTEM_INF/NOUZEI_UPDATE/SEND_DATE` | freee は空で出力 |
| 申告データ申告状況 | `/SHINKOKU_UNIT/SYSTEM_INF/NOUZEI_UPDATE/RPT_INF` | 40=作成中 |
| 申告データ作成モード | `/SHINKOKU_UNIT/SYSTEM_INF/NOUZEI_UPDATE/CREATE_SYS` | 1=納税者システム作成, 2=税務ソフト作成, 3=プレ申告, 4=CSV取込み |
| 申告データ入力モード | `/SHINKOKU_UNIT/SYSTEM_INF/NOUZEI_UPDATE/INP_KBN` | 1=通常入力モード, 2=強制入力モード |
| ユーザファイル名 | `/SHINKOKU_UNIT/SYSTEM_INF/NOUZEI_UPDATE/USER_FILE_NM` |  |

## 決算書 (XBRL) のカスタム項目（独自勘定科目）

画面で追加したカスタム項目は XBRL タクソノミに存在しない科目のため、**各帳票の勘定科目マッピング表には現れない**。
レスポンスには独自名前空間の要素として、以下の 4 箇所に分かれて出力される
（定義元: `app/services/e_report/presenter/xbrl_presenter.rb`）。

- **名前空間**: `c-tax-{取得日}`（`http://xbrlsoft.e-tax.nta.go.jp/XSD/c-tax-YYYY-MM-DD`）。**API を呼び出した日の日付**が入るため、同じ申告でも取得日が変わると接頭辞が変わる
- **要素名**: `{親科目の xbrl_id}_{階層}_{表示順}_{連番}`（フロントで自動採番。科目名は含まれない）
- **(1) インスタンス（金額）**: `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/c-tax-{取得日}:{要素名}[@contextRef='…']`。型は常に `monetaryItemType`（`unitRef="JPY"` / `decimals="0"`）、contextRef は**親科目の期間区分を継承**する
- **(2) タクソノミ**: `xsd:element` で要素を宣言（`xbrli:periodType` は親から継承、`xbrli:balance` は画面で選んだ借方/貸方がそのまま入る。親科目の貸借とは独立）
- **(3) presentation linkbase**: `link:presentationArc`（`parent-child`）で親科目 → カスタム項目を関連付け。`order` 属性が表示順
- **(4) label linkbase**: カスタム項目が 1 件でもある場合にのみ追加されるセクション（`<XBRL2_1_LINKBASE id="c-tax-{取得日}-label.xml">`）。**科目名はインスタンスには出力されず、ここの `link:label` にのみ存在する**ため、名称を得るには label linkbase を引く必要がある

出力例（貸借対照表の「預金」配下にカスタム項目「隠し口座」100,000 円を追加した場合）:

```xml
<!-- (1) インスタンス -->
<c-tax-2026-07-31:jpfr-etax-t-cte_Deposits_1_5_150001 decimals="0" unitRef="JPY"
    contextRef="CurrentYearNonConsolidatedInstant">100000</c-tax-2026-07-31:jpfr-etax-t-cte_Deposits_1_5_150001>

<!-- (2) タクソノミ -->
<xsd:element id="c-tax-2026-07-31_jpfr-etax-t-cte_Deposits_1_5_150001"
    name="jpfr-etax-t-cte_Deposits_1_5_150001" type="xbrli:monetaryItemType"
    substitutionGroup="xbrli:item" nillable="true" xbrli:periodType="instant" xbrli:balance="credit"/>

<!-- (3) presentation linkbase -->
<link:presentationArc xlink:arcrole="http://www.xbrl.org/2003/arcrole/parent-child"
    xlink:from="jpfr-etax-t-cte_Deposits" xlink:to="c-tax-2026-07-31_jpfr-etax-t-cte_Deposits_1_5_150001"
    order="15.0001"/>

<!-- (4) label linkbase（科目名はここにだけ現れる） -->
<link:label xlink:role="http://www.xbrl.org/2003/role/label" xml:lang="ja"
    xlink:label="label_c-tax-2026-07-31_jpfr-etax-t-cte_Deposits_1_5_150001">隠し口座</link:label>
```
