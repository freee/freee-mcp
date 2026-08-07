# 決算書 個別注記表

<!-- markdownlint-disable MD013 -->

- sheet_code: `notes_to_financial_statements`
- 様式ID: `jpfr-etax-t-cte_NotesAbstract`
- 形式: XBRL（財務諸表タクソノミ）
- 取得API: `GET /hub/tax_return/corporate/sheet/financial_statements/{tax_return_id}/notes_to_financial_statements`
- レスポンス: XBRL インスタンスの XML
- xpath ルート: `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl`
- 共通仕様（xpath 表記の規則・名前空間・共通ヘッダ）は [`index.md`](./index.md) を参照。

## 勘定科目マッピング

| 勘定科目名 (name) | xpath | 階層 | 子 |
| --- | --- | --- | --- |
| **個別注記表** | （抽象要素。XBRL ファクトなし） | 0 | Y |
| ├ 継続企業の前提に関する注記 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:NotesGoingConcernAssumption[@contextRef='CurrentYearNonConsolidatedInstant']` | 1 |  |
| ├ 重要な会計方針に係る事項に関する注記 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:NotesSignificantAccountingPolicy[@contextRef='CurrentYearNonConsolidatedInstant']` | 1 | Y |
| 　├ 資産の評価基準及び評価方法 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:ValuationBasisValuationMethodAssets[@contextRef='CurrentYearNonConsolidatedInstant']` | 2 | Y |
| 　　├ 有価証券の評価基準及び評価方法 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:ValuationBasisValuationMethodMarketableSecurities[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ たな卸資産の評価基準及び評価方法 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:ValuationBasisValuationMethodInventories[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　├ 固定資産の減価償却の方法 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:DepreciationMethodFixedAssets[@contextRef='CurrentYearNonConsolidatedInstant']` | 2 |  |
| 　├ 引当金の計上基準 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:RecordingBasisReserves[@contextRef='CurrentYearNonConsolidatedInstant']` | 2 |  |
| 　├ 収益及び費用の計上基準 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:RecordingBasisRevenueExpense[@contextRef='CurrentYearNonConsolidatedInstant']` | 2 |  |
| 　├ その他計算書類の作成のための基本となる重要な事項 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:OtherSignificantMattersFundamentalsPreparingFinancialStatements[@contextRef='CurrentYearNonConsolidatedInstant']` | 2 | Y |
| 　　├ 金利の取得原価算入 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:InclusionInterestExpenseAcquisitionCost[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ その他（タプル） | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:SignificantAccountingPoliciesOther[n]` | 3 | Y |
| 　　　├ 項目名 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:SignificantAccountingPoliciesOther[n]/jpfr-etax-t-cte:SignificantAccountingPoliciesItemName[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 内容 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:SignificantAccountingPoliciesOther[n]/jpfr-etax-t-cte:SignificantAccountingPoliciesDescription[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　├ 会計処理の原則又は手続の変更 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:ChangesAccountingPrincipleProcedure[@contextRef='CurrentYearNonConsolidatedInstant']` | 2 |  |
| 　├ 表示方法の変更 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:ChangesPresentation[@contextRef='CurrentYearNonConsolidatedInstant']` | 2 |  |
| ├ 貸借対照表に関する注記 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:NoteBalanceSheet[@contextRef='CurrentYearNonConsolidatedInstant']` | 1 | Y |
| 　├ 担保資産及び担保付債務 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:PledgedAssets[@contextRef='CurrentYearNonConsolidatedInstant']` | 2 |  |
| 　├ 資産の部から直接控除した貸倒引当金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:AllowanceDoubtfulAccountsDeductedDirectlyAssets[@contextRef='CurrentYearNonConsolidatedInstant']` | 2 | Y |
| 　　├ 流動資産 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:AllowanceDoubtfulAccountsDeductedDirectlyCurrentAssets[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 投資その他の資産 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:AllowanceDoubtfulAccountsDeductedDirectlyLongTermInvestments[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　├ 有形固定資産の減価償却累計額 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:DepreciationTangibleAssets[@contextRef='CurrentYearNonConsolidatedInstant']` | 2 |  |
| 　├ 保証債務額 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:AmountGuaranties[@contextRef='CurrentYearNonConsolidatedInstant']` | 2 |  |
| 　├ 受取手形割引高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:AmountNotesReceivableDiscounted[@contextRef='CurrentYearNonConsolidatedInstant']` | 2 |  |
| 　├ 受取手形裏書譲渡高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:AmountNotesReceivableEndorsed[@contextRef='CurrentYearNonConsolidatedInstant']` | 2 |  |
| 　├ 重要な係争事件に係る損害賠償義務 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:MaterialCompensationObligationDamageLitigation[@contextRef='CurrentYearNonConsolidatedInstant']` | 2 |  |
| 　├ 不良債権の状況 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:CircumstanceDoubtfulLoan[@contextRef='CurrentYearNonConsolidatedInstant']` | 2 |  |
| 　├ 受取手形中の不渡手形 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:DishonoredNotesNotesPayable[@contextRef='CurrentYearNonConsolidatedInstant']` | 2 |  |
| 　├ 関係会社に対する金銭債権・金銭債務 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:MonetaryReceivablesPayablesAffiliates[@contextRef='CurrentYearNonConsolidatedInstant']` | 2 | Y |
| 　　├ 内訳（タプル） | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:MonetaryReceivablesPayablesAffiliatesDetails[n]` | 3 | Y |
| 　　　├ 科目名 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:MonetaryReceivablesPayablesAffiliatesDetails[n]/jpfr-etax-t-cte:MonetaryReceivablesPayablesAffiliatesAccountName[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 金額 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:MonetaryReceivablesPayablesAffiliatesDetails[n]/jpfr-etax-t-cte:MonetaryReceivablesPayablesAffiliatesAmount[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　├ 取締役等に対する金銭債権・金銭債務 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:MonetaryReceivablesPayablesDirectors[@contextRef='CurrentYearNonConsolidatedInstant']` | 2 | Y |
| 　　├ 金銭債権 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:MonetaryReceivablesDirectors[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 金銭債務 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:MonetaryPayablesDirectors[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　├ 有価証券中の親会社株式 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:ParentCompanySecuritiesMarketableSecurities[@contextRef='CurrentYearNonConsolidatedInstant']` | 2 |  |
| 　├ 回復の見込みがあるたな卸資産等 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:RecoverableInventoriesEtc[@contextRef='CurrentYearNonConsolidatedInstant']` | 2 |  |
| 　├ 重要な所有権留保資産 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:SignificantOwnershipReservedAssets[@contextRef='CurrentYearNonConsolidatedInstant']` | 2 |  |
| 　├ 事業用土地の再評価 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:RevaluationLandBusiness[@contextRef='CurrentYearNonConsolidatedInstant']` | 2 |  |
| 　├ 特別法上の準備金等 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:RevenueReserveSpecialLaw[@contextRef='CurrentYearNonConsolidatedInstant']` | 2 |  |
| 　├ 圧縮記帳 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:AdvancedDepreciation[@contextRef='CurrentYearNonConsolidatedInstant']` | 2 |  |
| 　├ 期末日満期手形 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:NotesReceivablesNotesPayablesMaturedAtClosingDate[@contextRef='CurrentYearNonConsolidatedInstant']` | 2 | Y |
| 　　├ 期末日満期手形の会計処理 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:AccountingMethodNotesReceivablesNotesPayablesMaturedClosingDate[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 受取手形 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:NotesReceivablesNotesPayablesMaturedAtClosingDateNotesReceivables[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 支払手形 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:NotesReceivablesNotesPayablesMaturedAtClosingDateNotesPayables[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　├ 消費税及び地方消費税の会計処理 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:AccountingMethodConsumptionTaxes[@contextRef='CurrentYearNonConsolidatedInstant']` | 2 |  |
| 　├ その他貸借対照表に関する注記（タプル） | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:OthersNotesBalanceSheet[n]` | 2 | Y |
| 　　├ 項目名 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:OthersNotesBalanceSheet[n]/jpfr-etax-t-cte:OthersNotesBalanceSheetItemName[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 内容 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:OthersNotesBalanceSheet[n]/jpfr-etax-t-cte:OthersNotesBalanceSheetDescription[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| ├ 損益計算書に関する注記 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:NoteIncomeStatement[@contextRef='CurrentYearNonConsolidatedInstant']` | 1 | Y |
| 　├ 関係会社との取引に係るもの | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:TransactionsAffiliates[@contextRef='CurrentYearNonConsolidatedInstant']` | 2 | Y |
| 　　├ 売上高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:SalesAffiliates[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 仕入高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:PurchaseAffiliates[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ その他の営業取引高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:OtherOperatingTransactionsAffiliates[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 営業取引以外の取引高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:NonoperatingTransactionsAffiliates[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　├ 期末たな卸高から控除した評価損 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:ValuationLossDeductedClosingInventories[@contextRef='CurrentYearNonConsolidatedInstant']` | 2 | Y |
| 　　├ 内訳（タプル） | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:ValuationLossDeductedClosingInventoriesDetails[n]` | 3 | Y |
| 　　　├ 項目名 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:ValuationLossDeductedClosingInventoriesDetails[n]/jpfr-etax-t-cte:ValuationLossDeductedClosingInventoriesItemName[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 金額 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:ValuationLossDeductedClosingInventoriesDetails[n]/jpfr-etax-t-cte:ValuationLossDeductedClosingInventoriesAmount[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　├ 過年度法人税等 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:IncomeTaxesPastYear[@contextRef='CurrentYearNonConsolidatedInstant']` | 2 |  |
| 　├ その他の損益計算書注記項目（タプル） | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:OtherNotesIncomeStatement[n]` | 2 | Y |
| 　　├ 項目名 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:OtherNotesIncomeStatement[n]/jpfr-etax-t-cte:OtherNotesIncomeStatementItemName[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 内容 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:OtherNotesIncomeStatement[n]/jpfr-etax-t-cte:OtherNotesIncomeStatementDescription[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| ├ 株主資本等変動計算書に関する注記 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:NotesStatementChangesNetAssets[@contextRef='CurrentYearNonConsolidatedInstant']` | 1 | Y |
| 　├ 発行済株式の種類及び総数に関する事項 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:MattersTypesTotalNumberSharesIssued[@contextRef='CurrentYearNonConsolidatedInstant']` | 2 | Y |
| 　　├ 発行済株式 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:SharesIssued[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 | Y |
| 　　　├ 普通株式（発行済株式） | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:IssuanceNewOrdinaryShares[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 | Y |
| 　　　　├ 前期末株式数（発行済普通株式） | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:NumberSharesIssuanceNewOrdinaryShares[@contextRef='Prior1YearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 当期増加株式数（発行済普通株式） | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:NumberSharesIncreasedDuringPeriodIssuanceNewOrdinaryShares[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 当期減少株式数（発行済普通株式） | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:NumberSharesDecreasedDuringPeriodIssuanceNewOrdinaryShares[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 当期末株式数（発行済普通株式） | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:NumberSharesIssuanceNewOrdinaryShares[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 摘要（発行済普通株式） | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:RemarksIssuanceNewOrdinaryShares[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　├ 優先株式（発行済株式） | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:IssuanceNewPreferenceShares[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 | Y |
| 　　　　├ 前期末株式数（発行済優先株式） | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:NumberSharesEndPreviousPeriodIssuanceNewPreferenceShares[@contextRef='Prior1YearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 当期増加株式数（発行済優先株式） | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:NumberSharesIncreasedDuringPeriodIssuanceNewPreferenceShares[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 当期減少株式数（発行済優先株式） | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:NumberSharesDecreasedDuringPeriodIssuanceNewPreferenceShares[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 当期末株式数（発行済優先株式） | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:NumberSharesEndPreviousPeriodIssuanceNewPreferenceShares[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 摘要（発行済優先株式） | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:RemarksIssuanceNewPreferenceShares[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　├ 合計（発行済株式） | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:TotalSharesIssued[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 | Y |
| 　　　　├ 前期末株式数（発行済株式） | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:NumberSharesEndPreviousPeriodTotalSharesIssued[@contextRef='Prior1YearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 当期増加株式数（発行済株式） | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:NumberSharesIncreasedDuringPeriodTotalSharesIssued[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 当期減少株式数（発行済株式） | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:NumberSharesDecreasedDuringPeriodTotalSharesIssued[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 当期末株式数（発行済株式） | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:NumberSharesEndPreviousPeriodTotalSharesIssued[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 摘要（発行済株式） | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:RemarksTotalSharesIssued[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　├ 自己株式の種類及び株式数に関する事項 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:MattersTypesTotalNumberTreasuryStock[@contextRef='CurrentYearNonConsolidatedInstant']` | 2 | Y |
| 　　├ 自己株式（種類及び株式数） | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:TreasuryStockTypesTotalNumber[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 | Y |
| 　　　├ 普通株式（自己株式） | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:TreasuryOrdinaryShares[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 | Y |
| 　　　　├ 前期末株式数（自己株式） | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:NumberSharesTreasuryOrdinaryShares[@contextRef='Prior1YearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 当期増加株式数（自己株式） | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:NumberSharesIncreasedDuringPeriodTreasuryOrdinaryShares[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 当期減少株式数（自己株式） | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:NumberSharesDecreasedDuringPeriodTreasuryOrdinaryShares[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 当期末株式数（自己株式） | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:NumberSharesTreasuryOrdinaryShares[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 摘要（自己株式） | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:RemarksTreasuryOrdinaryShares[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　├ 合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:TotalTreasuryOrdinaryShares[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 | Y |
| 　　　　├ 前期末株式数 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:NumberSharesTotalTreasuryOrdinaryShares[@contextRef='Prior1YearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 当期増加株式数 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:NumberSharesIncreasedDuringPeriodTotalTreasuryOrdinaryShares[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 当期減少株式数 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:NumberSharesDecreasedDuringPeriodTotalTreasuryOrdinaryShares[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 当期末株式数 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:NumberSharesTotalTreasuryOrdinaryShares[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 摘要 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:RemarksTotalTreasuryOrdinaryShares[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　├ 新株予約権及び自己新株予約権に関する事項 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:MattersSubscriptionRightsSharesTreasurySubscriptionRightsShares[@contextRef='CurrentYearNonConsolidatedInstant']` | 2 | Y |
| 　　├ 新株予約権の内訳 | （抽象要素。XBRL ファクトなし） | 3 | Y |
| 　　　├ 新株予約権の目的となる株式の種類 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:TypeStocksPurposeSubscriptionRightsShares[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 新株予約権の目的となる株式の数 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:NumberSharesPurposeSubscriptionRightsShares[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 | Y |
| 　　　　├ 前期末株式数 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:NumberSharesEndPreviousPeriodSubscriptionRightsShares[@contextRef='Prior1YearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 当期増加株式数 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:NumberSharesIncreasedDuringPeriodSubscriptionRightsShares[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 当期減少株式数 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:NumberSharesDecreasedDuringPeriodSubscriptionRightsShares[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 当期末株式数 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:NumberSharesEndPreviousPeriodSubscriptionRightsShares[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　├ 期末残高（新株予約権） | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:SubscriptionRightsSharesBalanceEndCurrentPeriod[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 摘要 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:RemarksSubscriptionRightsShares[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　├ 自己新株予約権に関する事項 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:MattersTreasurySubscriptionRightsShares[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 | Y |
| 　　　├ 新株予約権の目的となる株式の種類 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:TypeStocksPurposeTreasurySubscriptionRightsShares[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 新株予約権の目的となる株式の数 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:NumberSharesPurposeTreasurySubscriptionRightsShares[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 新株予約権の当期末残高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:TreasurySubscriptionRightsSharesBalanceEndCurrentPeriod[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　├ 配当に関する事項 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:MattersDividends[@contextRef='CurrentYearNonConsolidatedInstant']` | 2 | Y |
| 　　├ 配当財産が金銭の場合 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:InCaseCashDividend[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 | Y |
| 　　　├ 金銭配当の株式の種類別内訳（タプル） | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:ItemsCashDividendTypeStocks[n]` | 4 | Y |
| 　　　　├ 株式の種類 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:ItemsCashDividendTypeStocks[n]/jpfr-etax-t-cte:TypeStocksCashDividend[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 決議 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:ItemsCashDividendTypeStocks[n]/jpfr-etax-t-cte:ResolutionCashDividend[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 配当金の総額 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:ItemsCashDividendTypeStocks[n]/jpfr-etax-t-cte:TotalDividendCashDividend[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 1株当たり配当額 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:ItemsCashDividendTypeStocks[n]/jpfr-etax-t-cte:DividendsPerShareCashDividend[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 基準日 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:ItemsCashDividendTypeStocks[n]/jpfr-etax-t-cte:RecordDateCashDividend[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 効力発生日 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:ItemsCashDividendTypeStocks[n]/jpfr-etax-t-cte:EffectiveDateCashDividend[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　├ 配当財産が金銭以外の場合 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:InCasePropertyDividend[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 | Y |
| 　　　├ 非金銭配当の株式の種類別内訳（タプル） | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:ItemsPropertyDividendTypeStocks[n]` | 4 | Y |
| 　　　　├ 株式の種類 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:ItemsPropertyDividendTypeStocks[n]/jpfr-etax-t-cte:TypeStocksPropertyDividend[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 決議 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:ItemsPropertyDividendTypeStocks[n]/jpfr-etax-t-cte:ResolutionPropertyDividend[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 配当財産の種類 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:ItemsPropertyDividendTypeStocks[n]/jpfr-etax-t-cte:TypeDividendProperty[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 配当財産の帳簿価額 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:ItemsPropertyDividendTypeStocks[n]/jpfr-etax-t-cte:BookValueDividendProperty[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 1株当たり配当額 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:ItemsPropertyDividendTypeStocks[n]/jpfr-etax-t-cte:DividendsPerSharePropertyDividend[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 基準日 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:ItemsPropertyDividendTypeStocks[n]/jpfr-etax-t-cte:RecordDatePropertyDividend[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 効力発生日 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:ItemsPropertyDividendTypeStocks[n]/jpfr-etax-t-cte:EffectiveDatePropertyDividend[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　├ 基準日が当期に属する配当のうち、配当の効力発生日が翌期となるもの | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:DividendsWhichEffectiveDatesAreAfterPeriodDividendsWhichRecordDatesArePeriod[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 | Y |
| 　　　├ 配当の原資 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:FundsDividendAfterPeriod[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 配当財産が金銭の場合 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:InCaseCashDividendAfterPeriod[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 | Y |
| 　　　　├ 株式の種類別内訳（タプル） | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:ItemsCashDividendAfterPeriodTypeStocks[n]` | 5 | Y |
| 　　　　　├ 株式の種類 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:ItemsCashDividendAfterPeriodTypeStocks[n]/jpfr-etax-t-cte:TypeStocksCashDividendAfterPeriod[@contextRef='CurrentYearNonConsolidatedInstant']` | 6 |  |
| 　　　　　├ 決議 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:ItemsCashDividendAfterPeriodTypeStocks[n]/jpfr-etax-t-cte:ResolutionCashDividendAfterPeriod[@contextRef='CurrentYearNonConsolidatedInstant']` | 6 |  |
| 　　　　　├ 配当金の総額 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:ItemsCashDividendAfterPeriodTypeStocks[n]/jpfr-etax-t-cte:TotalDividendCashDividendAfterPeriod[@contextRef='CurrentYearNonConsolidatedInstant']` | 6 |  |
| 　　　　　├ 1株当たり配当額 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:ItemsCashDividendAfterPeriodTypeStocks[n]/jpfr-etax-t-cte:DividendsPerShareCashDividendAfterPeriod[@contextRef='CurrentYearNonConsolidatedInstant']` | 6 |  |
| 　　　　　├ 基準日 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:ItemsCashDividendAfterPeriodTypeStocks[n]/jpfr-etax-t-cte:RecordDateCashDividendAfterPeriod[@contextRef='CurrentYearNonConsolidatedInstant']` | 6 |  |
| 　　　　　├ 効力発生日 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:ItemsCashDividendAfterPeriodTypeStocks[n]/jpfr-etax-t-cte:EffectiveDateCashDividendAfterPeriod[@contextRef='CurrentYearNonConsolidatedInstant']` | 6 |  |
| 　　　├ 配当財産が金銭以外の場合 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:InCasePropertyDividendAfterPeriod[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 | Y |
| 　　　　├ 非金銭配当の株式の種類別内訳（タプル） | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:ItemsPropertyDividendAfterPeriodTypeStocks[n]` | 5 | Y |
| 　　　　　├ 株式の種類 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:ItemsPropertyDividendAfterPeriodTypeStocks[n]/jpfr-etax-t-cte:TypeStocksPropertyDividendAfterPeriod[@contextRef='CurrentYearNonConsolidatedInstant']` | 6 |  |
| 　　　　　├ 決議 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:ItemsPropertyDividendAfterPeriodTypeStocks[n]/jpfr-etax-t-cte:ResolutionPropertyDividendAfterPeriod[@contextRef='CurrentYearNonConsolidatedInstant']` | 6 |  |
| 　　　　　├ 配当財産の種類 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:ItemsPropertyDividendAfterPeriodTypeStocks[n]/jpfr-etax-t-cte:TypeDividendPropertyAfterPeriod[@contextRef='CurrentYearNonConsolidatedInstant']` | 6 |  |
| 　　　　　├ 配当財産の帳簿価額 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:ItemsPropertyDividendAfterPeriodTypeStocks[n]/jpfr-etax-t-cte:BookValueDividendPropertyAfterPeriod[@contextRef='CurrentYearNonConsolidatedInstant']` | 6 |  |
| 　　　　　├ 1株当たり配当額 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:ItemsPropertyDividendAfterPeriodTypeStocks[n]/jpfr-etax-t-cte:DividendsPerSharePropertyDividendAfterPeriod[@contextRef='CurrentYearNonConsolidatedInstant']` | 6 |  |
| 　　　　　├ 基準日 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:ItemsPropertyDividendAfterPeriodTypeStocks[n]/jpfr-etax-t-cte:RecordDatePropertyDividendAfterPeriod[@contextRef='CurrentYearNonConsolidatedInstant']` | 6 |  |
| 　　　　　├ 効力発生日 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:ItemsPropertyDividendAfterPeriodTypeStocks[n]/jpfr-etax-t-cte:EffectiveDatePropertyDividendAfterPeriod[@contextRef='CurrentYearNonConsolidatedInstant']` | 6 |  |
| ├ 税効果会計に関する注記 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:NotesTaxEffectAccounting[@contextRef='CurrentYearNonConsolidatedInstant']` | 1 | Y |
| 　├ 繰延税金資産の発生の主な原因 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:MajorCauseDeferredTaxAssets[@contextRef='CurrentYearNonConsolidatedInstant']` | 2 |  |
| 　├ 繰延税金負債の発生の主な原因 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:MajorCauseDeferredTaxLiabilities[@contextRef='CurrentYearNonConsolidatedInstant']` | 2 |  |
| ├ リースにより使用する固定資産に関する注記 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:NotesFixedAssetsUsingFinanceLease[@contextRef='CurrentYearNonConsolidatedInstant']` | 1 | Y |
| 　├ 事業年度の末日における取得原価相当額 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:EquivalentValueAcquisitionValueEndPeriod[@contextRef='CurrentYearNonConsolidatedInstant']` | 2 |  |
| 　├ 事業年度の末日における減価償却累計額相当額 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:EquivalentValueAccumulatedDepreciationEndPeriod[@contextRef='CurrentYearNonConsolidatedInstant']` | 2 |  |
| 　├ 事業年度の末日における未経過リース料相当額 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:EquivalentValueUnexpiredLeasePaymentEndPeriod[@contextRef='CurrentYearNonConsolidatedInstant']` | 2 |  |
| 　├ その他リース物件に係る重要な事項 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:OtherSignificantMattersLeasedAssets[@contextRef='CurrentYearNonConsolidatedInstant']` | 2 |  |
| ├ 関連当事者との取引に関する注記 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:NotesRelatedPartyTransactions[@contextRef='CurrentYearNonConsolidatedInstant']` | 1 | Y |
| 　├ 関連当事者との取引の内訳（タプル） | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:BreakdownRelatedPartyTransactions[n]` | 2 | Y |
| 　　├ 関連当事者の名称又は氏名 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:BreakdownRelatedPartyTransactions[n]/jpfr-etax-t-cte:NameRelatedParty[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 関連当事者の総株主の議決権の総数に占める会社が有する議決権の数の割合 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:BreakdownRelatedPartyTransactions[n]/jpfr-etax-t-cte:RatioVotingRightsOwnedCompanyTotalVotingRightsOwnedAllShareholdersRelatedParty[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 会社の総株主の議決権の総数に占める関連当事者が有する議決権の数の割合 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:BreakdownRelatedPartyTransactions[n]/jpfr-etax-t-cte:RatioVotingRightsOwnedRelatedPartyTotalVotingRightsOwnedAllShareholdersCompany[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 会社と関連当事者との関係 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:BreakdownRelatedPartyTransactions[n]/jpfr-etax-t-cte:RelationshipCompanyRelatedParty[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 取引の内容 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:BreakdownRelatedPartyTransactions[n]/jpfr-etax-t-cte:DetailsTransactions[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 取引の種類別の取引金額 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:BreakdownRelatedPartyTransactions[n]/jpfr-etax-t-cte:TransactionAmountTransactionType[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 | Y |
| 　　　├ 取引内訳（タプル） | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:ItemsTransactions[n]` | 4 | Y |
| 　　　　├ 取引の種類 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:ItemsTransactions[n]/jpfr-etax-t-cte:TransactionType[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 取引金額 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:ItemsTransactions[n]/jpfr-etax-t-cte:TransactionAmount[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　├ 取引条件及び取引条件の決定方針 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:BreakdownRelatedPartyTransactions[n]/jpfr-etax-t-cte:TransactionTermsDecisionPolicyTransactionTerms[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 取引により発生した債権又は債務に係る主な項目別の当該事業年度の末日における残高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:BreakdownRelatedPartyTransactions[n]/jpfr-etax-t-cte:EndingBalancesMajorItemsReceivablesPayablesTransactions[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 取引条件の変更 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:BreakdownRelatedPartyTransactions[n]/jpfr-etax-t-cte:ChangesTransactionTerms[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| ├ 1株当たり情報に関する注記 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:NotesPerShareInformation[@contextRef='CurrentYearNonConsolidatedInstant']` | 1 | Y |
| 　├ 1株当たりの純資産額 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:NetAssetsPerShare[@contextRef='CurrentYearNonConsolidatedInstant']` | 2 |  |
| 　├ 1株当たりの当期純利益金額又は当期純損失金額 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:NetIncomeNetLossPerShare[@contextRef='CurrentYearNonConsolidatedInstant']` | 2 |  |
| ├ 重要な後発事象に関する注記 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:NotesMaterialSubsequentEvents[@contextRef='CurrentYearNonConsolidatedInstant']` | 1 |  |
| ├ 連結配当規制適用会社に関する注記 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:NotesConsolidatedDividendRestrictionsAppliedCompany[@contextRef='CurrentYearNonConsolidatedInstant']` | 1 |  |
| ├ その他の注記（タプル） | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:ItemsOtherNotes[n]` | 1 | Y |
| 　├ 項目名 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:ItemsOtherNotes[n]/jpfr-etax-t-cte:ItemNameOtherNotes[@contextRef='CurrentYearNonConsolidatedInstant']` | 2 |  |
| 　├ 内容 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:ItemsOtherNotes[n]/jpfr-etax-t-cte:ItemDescriptionOtherNotes[@contextRef='CurrentYearNonConsolidatedInstant']` | 2 |  |
