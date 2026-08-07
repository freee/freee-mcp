# 決算書 S/S（株主資本等変動計算書）

<!-- markdownlint-disable MD013 -->

- sheet_code: `statements_of_shareholders`
- 様式ID: `jpfr-t-cte_StatementsOfChangesInNetAssetsAbstract`
- 形式: XBRL（財務諸表タクソノミ）
- 取得API: `GET /hub/tax_return/corporate/sheet/financial_statements/{tax_return_id}/statements_of_shareholders`
- レスポンス: XBRL インスタンスの XML
- xpath ルート: `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl`
- 共通仕様（xpath 表記の規則・名前空間・共通ヘッダ）は [`index.md`](./index.md) を参照。

## 勘定科目マッピング

| 勘定科目名 (name) | xpath | 階層 | 子 |
| --- | --- | --- | --- |
| **株主資本等変動計算書** | （抽象要素。XBRL ファクトなし） | 0 | Y |
| ├ 株主資本 | （抽象要素。XBRL ファクトなし） | 1 | Y |
| 　├ 資本金 | （抽象要素。XBRL ファクトなし） | 2 | Y |
| 　　├ 当期首残高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:CapitalStock[@contextRef='Prior1YearNonConsolidatedInstant']` | 3 |  |
| 　　├ 当期変動額 | （抽象要素。XBRL ファクトなし） | 3 | Y |
| 　　　├ 新株の発行 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:IssuanceOfNewSharesCAP[@contextRef='CurrentYearNonConsolidatedDuration']` | 4 |  |
| 　　　├ 新株の発行（新株予約権の行使） | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:IssuanceOfNewSharesExerciseOfSubscriptionRightsToSharesCAP[@contextRef='CurrentYearNonConsolidatedDuration']` | 4 |  |
| 　　　├ 合併による増加 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:IncreaseByMergerCAP[@contextRef='CurrentYearNonConsolidatedDuration']` | 4 |  |
| 　　　├ 会社分割による増加 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:IncreaseByCorporateDivisionCAP[@contextRef='CurrentYearNonConsolidatedDuration']` | 4 |  |
| 　　　├ 株式交換による増加 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:IncreaseByShareExchangesCAP[@contextRef='CurrentYearNonConsolidatedDuration']` | 4 |  |
| 　　　├ 株式移転による増加 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:IncreaseByShareTransfersCAP[@contextRef='CurrentYearNonConsolidatedDuration']` | 4 |  |
| 　　　├ 分割型の会社分割による減少 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:DecreaseByCorporateDivisionSplitOffTypeCAP[@contextRef='CurrentYearNonConsolidatedDuration']` | 4 |  |
| 　　　├ 資本金から準備金への振替 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:TransferToLegalCapitalSurplusFromCapitalStockCAP[@contextRef='CurrentYearNonConsolidatedDuration']` | 4 |  |
| 　　　├ 資本金から剰余金への振替 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:TransferToOtherCapitalSurplusFromCapitalStockCAP[@contextRef='CurrentYearNonConsolidatedDuration']` | 4 |  |
| 　　　├ 準備金から資本金への振替 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:TransferToCapitalStockFromLegalCapitalSurplusCAP[@contextRef='CurrentYearNonConsolidatedDuration']` | 4 |  |
| 　　　├ 減資 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:CapitalReductionCAP[@contextRef='CurrentYearNonConsolidatedDuration']` | 4 |  |
| 　　　├ 当期変動額合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:TotalChangesOfItemsDuringThePeriodCAP[@contextRef='CurrentYearNonConsolidatedDuration']` | 4 |  |
| 　　├ 当期末残高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:CapitalStock[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　├ 資本剰余金 | （抽象要素。XBRL ファクトなし） | 2 | Y |
| 　　├ 資本準備金 | （抽象要素。XBRL ファクトなし） | 3 | Y |
| 　　　├ 当期首残高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:LegalCapitalSurplus[@contextRef='Prior1YearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 当期変動額 | （抽象要素。XBRL ファクトなし） | 4 | Y |
| 　　　　├ 新株の発行 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:IssuanceOfNewSharesLCS[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 新株の発行（新株予約権の行使） | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:IssuanceOfNewSharesExerciseOfSubscriptionRightsToSharesLCS[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 合併による増加 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:IncreaseByMergerLCS[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 会社分割による増加 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:IncreaseByCorporateDivisionLCS[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 株式交換による増加 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:IncreaseByShareExchangesLCS[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 株式移転による増加 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:IncreaseByShareTransfersLCS[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 分割型の会社分割による減少 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:DecreaseByCorporateDivisionSplitOffTypeLCS[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 資本金から準備金への振替 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:TransferToLegalCapitalSurplusFromCapitalStockLCS[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 準備金から資本金への振替 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:TransferToCapitalStockFromLegalCapitalSurplusLCS[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 準備金から剰余金への振替 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:TransferToOtherCapitalSurplusFromLegalCapitalSurplusLCS[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 欠損填補 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:DeficitDispositionLCS[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 資本準備金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfLegalCapitalSurplusLCS[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 当期変動額合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:TotalChangesOfItemsDuringThePeriodLCS[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　├ 当期末残高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:LegalCapitalSurplus[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　├ 国庫等補助金 | （抽象要素。XBRL ファクトなし） | 3 | Y |
| 　　　├ 当期首残高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:NationalSubsidy[@contextRef='Prior1YearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 当期変動額 | （抽象要素。XBRL ファクトなし） | 4 | Y |
| 　　　　├ 当期変動額合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:TotalChangesOfItemsDuringThePeriodNS[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　├ 当期末残高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:NationalSubsidy[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　├ 指定寄付金 | （抽象要素。XBRL ファクトなし） | 3 | Y |
| 　　　├ 当期首残高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:DonationDesignatedOrganization[@contextRef='Prior1YearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 当期変動額 | （抽象要素。XBRL ファクトなし） | 4 | Y |
| 　　　　├ 当期変動額合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:TotalChangesOfItemsDuringThePeriodDDO[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　├ 当期末残高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:DonationDesignatedOrganization[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　├ その他資本剰余金 | （抽象要素。XBRL ファクトなし） | 3 | Y |
| 　　　├ 当期首残高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:OtherCapitalSurplus[@contextRef='Prior1YearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 当期変動額 | （抽象要素。XBRL ファクトなし） | 4 | Y |
| 　　　　├ 剰余金（その他資本剰余金）の配当 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:DividendsFromSurplusOtherCapitalSurplusOCS[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 自己株式の処分 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:DisposalOfTreasuryStockOCS[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 合併による増加 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:IncreaseByMergerOCS[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 会社分割による増加 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:IncreaseByCorporateDivisionOCS[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 株式交換による増加 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:IncreaseByShareExchangesOCS[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 株式移転による増加 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:IncreaseByShareTransfersOCS[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 分割型の会社分割による減少 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:DecreaseByCorporateDivisionSplitOffTypeOCS[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 資本金から剰余金への振替 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:TransferToOtherCapitalSurplusFromCapitalStockOCS[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 準備金から剰余金への振替 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:TransferToOtherCapitalSurplusFromLegalCapitalSurplusOCS[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 利益剰余金から資本剰余金への振替 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:TransferToCapitalSurplusFromRetainedEarningsOCS[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 自己株式の消却 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:RetirementOfTreasuryStockOCS[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 欠損填補 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:DeficitDispositionOCS[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 資本準備金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfLegalCapitalSurplusOCS[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 減資 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:CapitalReductionOCS[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 当期変動額合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:TotalChangesOfItemsDuringThePeriodOCS[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　├ 当期末残高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:OtherCapitalSurplus[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　├ 資本準備金減少額 | （抽象要素。XBRL ファクトなし） | 3 | Y |
| 　　　├ 当期首残高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:TransferCapitalReserve[@contextRef='Prior1YearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 当期変動額 | （抽象要素。XBRL ファクトなし） | 4 | Y |
| 　　　　├ 当期変動額合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:TotalChangesOfItemsDuringThePeriodTCR[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　├ 当期末残高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:TransferCapitalReserve[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　├ 保険差益積立金 | （抽象要素。XBRL ファクトなし） | 3 | Y |
| 　　　├ 当期首残高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:GainInsuranceReserve[@contextRef='Prior1YearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 当期変動額 | （抽象要素。XBRL ファクトなし） | 4 | Y |
| 　　　　├ 当期変動額合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:TotalChangesOfItemsDuringThePeriodGIR[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　├ 当期末残高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:GainInsuranceReserve[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　├ 資本剰余金合計 | （抽象要素。XBRL ファクトなし） | 3 | Y |
| 　　　├ 当期首残高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:CapitalSurplus[@contextRef='Prior1YearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 当期変動額 | （抽象要素。XBRL ファクトなし） | 4 | Y |
| 　　　　├ 新株の発行 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:IssuanceOfNewSharesCS[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 新株の発行（新株予約権の行使） | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:IssuanceOfNewSharesExerciseOfSubscriptionRightsToSharesCS[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 剰余金（その他資本剰余金）の配当 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:DividendsFromSurplusOtherCapitalSurplusCS[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 自己株式の処分 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:DisposalOfTreasuryStockCS[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 合併による増加 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:IncreaseByMergerCS[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 会社分割による増加 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:IncreaseByCorporateDivisionCS[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 株式交換による増加 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:IncreaseByShareExchangesCS[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 株式移転による増加 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:IncreaseByShareTransfersCS[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 分割型の会社分割による減少 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:DecreaseByCorporateDivisionSplitOffTypeCS[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 資本金から準備金への振替 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:TransferToLegalCapitalSurplusFromCapitalStockCS[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 資本金から剰余金への振替 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:TransferToOtherCapitalSurplusFromCapitalStockCS[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 準備金から資本金への振替 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:TransferToCapitalStockFromLegalCapitalSurplusCS[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 準備金から剰余金への振替 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:TransferToOtherCapitalSurplusFromLegalCapitalSurplusCS[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 利益剰余金から資本剰余金への振替 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:TransferToCapitalSurplusFromRetainedEarningsCS[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 欠損填補 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:DeficitDispositionCS[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 自己株式の消却 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:RetirementOfTreasuryStockCS[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 資本準備金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfLegalCapitalSurplusCS[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 減資 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:CapitalReductionCS[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 当期変動額合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:TotalChangesOfItemsDuringThePeriodCS[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　├ 当期末残高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:CapitalSurplus[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　├ 利益剰余金 | （抽象要素。XBRL ファクトなし） | 2 | Y |
| 　　├ 利益準備金 | （抽象要素。XBRL ファクトなし） | 3 | Y |
| 　　　├ 当期首残高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:LegalRetainedEarnings[@contextRef='Prior1YearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 当期変動額 | （抽象要素。XBRL ファクトなし） | 4 | Y |
| 　　　　├ 剰余金の配当 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:DividendsFromSurplusLRE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 合併による増加 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:IncreaseByMergerLRE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 会社分割による増加 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:IncreaseByCorporateDivisionLRE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 株式交換による増加 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:IncreaseByShareExchangesLRE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 株式移転による増加 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:IncreaseByShareTransfersLRE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 分割型の会社分割による減少 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:DecreaseByCorporateDivisionSplitOffTypeLRE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 利益準備金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfLegalRetainedEarningsLRE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 利益準備金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfLegalRetainedEarningsLRE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 当期変動額合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:TotalChangesOfItemsDuringThePeriodLRE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　├ 当期末残高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:LegalRetainedEarnings[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　├ 代替基金 | （抽象要素。XBRL ファクトなし） | 3 | Y |
| 　　　├ 当期首残高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:AlternateFundMED[@contextRef='Prior1YearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 当期変動額 | （抽象要素。XBRL ファクトなし） | 4 | Y |
| 　　　　├ 当期変動額合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:TotalChangesOfItemsDuringThePeriodAFM[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　├ 当期末残高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:AlternateFundMED[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　├ その他利益剰余金 | （抽象要素。XBRL ファクトなし） | 3 | Y |
| 　　　├ 積立金 | （抽象要素。XBRL ファクトなし） | 4 | Y |
| 　　　　├ 当期首残高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:Reserve[@contextRef='Prior1YearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 当期変動額 | （抽象要素。XBRL ファクトなし） | 5 | Y |
| 　　　　　├ 当期変動額合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:TotalChangesOfItemsDuringThePeriodReserve[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　├ 当期末残高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:Reserve[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　├ 自由貿易地域投資損失準備金 | （抽象要素。XBRL ファクトなし） | 4 | Y |
| 　　　　├ 当期首残高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:FreeTradeAreaInvestmentLossReserve[@contextRef='Prior1YearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 当期変動額 | （抽象要素。XBRL ファクトなし） | 5 | Y |
| 　　　　　├ 当期変動額合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:TotalChangesOfItemsDuringThePeriodFIR[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　├ 当期末残高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:FreeTradeAreaInvestmentLossReserve[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　├ 創業中小企業投資損失準備金 | （抽象要素。XBRL ファクトなし） | 4 | Y |
| 　　　　├ 当期首残高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:FoundingSmallMediumSizedEnterpriseInvestmentLossReserve[@contextRef='Prior1YearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 当期変動額 | （抽象要素。XBRL ファクトなし） | 5 | Y |
| 　　　　　├ 当期変動額合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:TotalChangesOfItemsDuringThePeriodFEIR[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　├ 当期末残高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:FoundingSmallMediumSizedEnterpriseInvestmentLossReserve[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　├ 金属鉱業等鉱害防止準備金 | （抽象要素。XBRL ファクトなし） | 4 | Y |
| 　　　　├ 当期首残高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:MetalMiningPollutionPreventionReserve[@contextRef='Prior1YearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 当期変動額 | （抽象要素。XBRL ファクトなし） | 5 | Y |
| 　　　　　├ 当期変動額合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:TotalChangesOfItemsDuringThePeriodMPPR[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　├ 当期末残高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:MetalMiningPollutionPreventionReserve[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　├ 特定災害防止準備金 | （抽象要素。XBRL ファクトなし） | 4 | Y |
| 　　　　├ 当期首残高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:SpecifiedDisastersPreventionReserve[@contextRef='Prior1YearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 当期変動額 | （抽象要素。XBRL ファクトなし） | 5 | Y |
| 　　　　　├ 当期変動額合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:TotalChangesOfItemsDuringThePeriodSDR[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　├ 当期末残高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:SpecifiedDisastersPreventionReserve[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　├ 特定都市鉄道整備準備金 | （抽象要素。XBRL ファクトなし） | 4 | Y |
| 　　　　├ 当期首残高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:SpecifiedUrbanRailroadMaintenanceReserve[@contextRef='Prior1YearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 当期変動額 | （抽象要素。XBRL ファクトなし） | 5 | Y |
| 　　　　　├ 当期変動額合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:TotalChangesOfItemsDuringThePeriodSMR[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　├ 当期末残高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:SpecifiedUrbanRailroadMaintenanceReserve[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　├ ガス熱量変更償却準備金 | （抽象要素。XBRL ファクトなし） | 4 | Y |
| 　　　　├ 当期首残高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:GasCalorieChangeAmortizationReserve[@contextRef='Prior1YearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 当期変動額 | （抽象要素。XBRL ファクトなし） | 5 | Y |
| 　　　　　├ 当期変動額合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:TotalChangesOfItemsDuringThePeriodGCR[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　├ 当期末残高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:GasCalorieChangeAmortizationReserve[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　├ 電子計算機買戻損失準備金 | （抽象要素。XBRL ファクトなし） | 4 | Y |
| 　　　　├ 当期首残高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:ComputerRepurchaseLossReserve[@contextRef='Prior1YearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 当期変動額 | （抽象要素。XBRL ファクトなし） | 5 | Y |
| 　　　　　├ 当期変動額合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:TotalChangesOfItemsDuringThePeriodCLR[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　├ 当期末残高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:ComputerRepurchaseLossReserve[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　├ 使用済核燃料再処理準備金 | （抽象要素。XBRL ファクトなし） | 4 | Y |
| 　　　　├ 当期首残高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:SpentNuclearFuelReprocessingReserve[@contextRef='Prior1YearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 当期変動額 | （抽象要素。XBRL ファクトなし） | 5 | Y |
| 　　　　　├ 当期変動額合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:TotalChangesOfItemsDuringThePeriodSFR[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　├ 当期末残高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:SpentNuclearFuelReprocessingReserve[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　├ 原子力発電施設解体準備金 | （抽象要素。XBRL ファクトなし） | 4 | Y |
| 　　　　├ 当期首残高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:NuclearPowerGenerationSystemDismantlementReserve[@contextRef='Prior1YearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 当期変動額 | （抽象要素。XBRL ファクトなし） | 5 | Y |
| 　　　　　├ 当期変動額合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:TotalChangesOfItemsDuringThePeriodNDR[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　├ 当期末残高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:NuclearPowerGenerationSystemDismantlementReserve[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　├ 異常危険準備金 | （抽象要素。XBRL ファクトなし） | 4 | Y |
| 　　　　├ 当期首残高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:ExtraordinaryDangerReserve[@contextRef='Prior1YearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 当期変動額 | （抽象要素。XBRL ファクトなし） | 5 | Y |
| 　　　　　├ 当期変動額合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:TotalChangesOfItemsDuringThePeriodEDR[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　├ 当期末残高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:ExtraordinaryDangerReserve[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　├ 特別修繕準備金 | （抽象要素。XBRL ファクトなし） | 4 | Y |
| 　　　　├ 当期首残高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:SpecialRepairReserve[@contextRef='Prior1YearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 当期変動額 | （抽象要素。XBRL ファクトなし） | 5 | Y |
| 　　　　　├ 当期変動額合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:TotalChangesOfItemsDuringThePeriodSRR[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　├ 当期末残高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:SpecialRepairReserve[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　├ 探鉱準備金 | （抽象要素。XBRL ファクトなし） | 4 | Y |
| 　　　　├ 当期首残高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:MineProspectingReserve[@contextRef='Prior1YearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 当期変動額 | （抽象要素。XBRL ファクトなし） | 5 | Y |
| 　　　　　├ 当期変動額合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:TotalChangesOfItemsDuringThePeriodMPR[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　├ 当期末残高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:MineProspectingReserve[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　├ 海外探鉱準備金 | （抽象要素。XBRL ファクトなし） | 4 | Y |
| 　　　　├ 当期首残高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:OverseaMineProspectingReserve[@contextRef='Prior1YearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 当期変動額 | （抽象要素。XBRL ファクトなし） | 5 | Y |
| 　　　　　├ 当期変動額合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:TotalChangesOfItemsDuringThePeriodOPR[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　├ 当期末残高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:OverseaMineProspectingReserve[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　├ 農用地利用集積準備金 | （抽象要素。XBRL ファクトなし） | 4 | Y |
| 　　　　├ 当期首残高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:UtilizationIntegrationLandFarmingReserve[@contextRef='Prior1YearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 当期変動額 | （抽象要素。XBRL ファクトなし） | 5 | Y |
| 　　　　　├ 当期変動額合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:TotalChangesOfItemsDuringThePeriodUFR[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　├ 当期末残高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:UtilizationIntegrationLandFarmingReserve[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　├ 再評価積立金 | （抽象要素。XBRL ファクトなし） | 4 | Y |
| 　　　　├ 当期首残高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:RevaluationReserve[@contextRef='Prior1YearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 当期変動額 | （抽象要素。XBRL ファクトなし） | 5 | Y |
| 　　　　　├ 当期変動額合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:TotalChangesOfItemsDuringThePeriodRR[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　├ 当期末残高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:RevaluationReserve[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　├ 退職給付積立金 | （抽象要素。XBRL ファクトなし） | 4 | Y |
| 　　　　├ 当期首残高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:RevenueReserveRetirementBenefitsReserve[@contextRef='Prior1YearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 当期変動額 | （抽象要素。XBRL ファクトなし） | 5 | Y |
| 　　　　　├ 当期変動額合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:TotalChangesOfItemsDuringThePeriodRBR[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　├ 当期末残高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:RevenueReserveRetirementBenefitsReserve[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　├ 公害防止準備金 | （抽象要素。XBRL ファクトなし） | 4 | Y |
| 　　　　├ 当期首残高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:RevenueReservePollutionControlReserve[@contextRef='Prior1YearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 当期変動額 | （抽象要素。XBRL ファクトなし） | 5 | Y |
| 　　　　　├ 当期変動額合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:TotalChangesOfItemsDuringThePeriodFPR[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　├ 当期末残高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:RevenueReservePollutionControlReserve[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　├ 減債積立金 | （抽象要素。XBRL ファクトなし） | 4 | Y |
| 　　　　├ 減債積立金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReserveForBondSinkingFund[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 当期変動額 | （抽象要素。XBRL ファクトなし） | 5 | Y |
| 　　　　　├ 当期変動額合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:TotalChangesOfItemsDuringThePeriodReserveForBondSinkingFund[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　├ 中間配当積立金 | （抽象要素。XBRL ファクトなし） | 4 | Y |
| 　　　　├ 中間配当積立金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReserveForInterimDividends[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 当期変動額 | （抽象要素。XBRL ファクトなし） | 5 | Y |
| 　　　　　├ 当期変動額合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:TotalChangesOfItemsDuringThePeriodReserveForInterimDividends[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　├ 配当平均積立金 | （抽象要素。XBRL ファクトなし） | 4 | Y |
| 　　　　├ 配当平均積立金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReserveForDividendEqualization[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 当期変動額 | （抽象要素。XBRL ファクトなし） | 5 | Y |
| 　　　　　├ 配当平均積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForDividendEqualizationReserveForDividendEqualization[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 配当平均積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForDividendEqualizationReserveForDividendEqualization[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 当期変動額合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:TotalChangesOfItemsDuringThePeriodReserveForDividendEqualization[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　├ 事業拡張積立金 | （抽象要素。XBRL ファクトなし） | 4 | Y |
| 　　　　├ 事業拡張積立金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReserveForBusinessExpansion[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 当期変動額 | （抽象要素。XBRL ファクトなし） | 5 | Y |
| 　　　　　├ 当期変動額合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:TotalChangesOfItemsDuringThePeriodReserveForBusinessExpansion[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　├ 偶発損失積立金 | （抽象要素。XBRL ファクトなし） | 4 | Y |
| 　　　　├ 偶発損失積立金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:ReserveForContingentLoss[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 当期変動額 | （抽象要素。XBRL ファクトなし） | 5 | Y |
| 　　　　　├ 当期変動額合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:TotalChangesOfItemsDuringThePeriodReserveForContingentLoss[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　├ 自家保険積立金 | （抽象要素。XBRL ファクトなし） | 4 | Y |
| 　　　　├ 自家保険積立金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReserveForPrivateInsurance[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 当期変動額 | （抽象要素。XBRL ファクトなし） | 5 | Y |
| 　　　　　├ 当期変動額合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:TotalChangesOfItemsDuringThePeriodReserveForPrivateInsurance[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　├ 固定資産圧縮積立金 | （抽象要素。XBRL ファクトなし） | 4 | Y |
| 　　　　├ 固定資産圧縮積立金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReserveForAdvancedDepreciationOfNoncurrentAssets[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 当期変動額 | （抽象要素。XBRL ファクトなし） | 5 | Y |
| 　　　　　├ 固定資産圧縮積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForAdvancedDepreciationOfNoncurrentAssetsReserveForAdvancedDepreciationOfNoncurrentAssets[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 固定資産圧縮積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForAdvancedDepreciationOfNoncurrentAssetsReserveForAdvancedDepreciationOfNoncurrentAssets[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 当期変動額合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:TotalChangesOfItemsDuringThePeriodReserveForAdvancedDepreciationOfNoncurrentAssets[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　├ 固定資産圧縮特別勘定積立金 | （抽象要素。XBRL ファクトなし） | 4 | Y |
| 　　　　├ 固定資産圧縮特別勘定積立金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReserveForSpecialAccountForAdvancedDepreciationOfNoncurrentAssets[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 当期変動額 | （抽象要素。XBRL ファクトなし） | 5 | Y |
| 　　　　　├ 固定資産圧縮特別勘定積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForSpecialAccountForAdvancedDepreciationOfNoncurrentAssetsReserveForSpecialAccountForAdvancedDepreciationOfNoncurrentAssets[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 固定資産圧縮特別勘定積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForSpecialAccountForAdvancedDepreciationOfNoncurrentAssetsReserveForSpecialAccountForAdvancedDepreciationOfNoncurrentAssets[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 当期変動額合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:TotalChangesOfItemsDuringThePeriodReserveForSpecialAccountForAdvancedDepreciationOfNoncurrentAssets[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　├ 特別償却準備金 | （抽象要素。XBRL ファクトなし） | 4 | Y |
| 　　　　├ 特別償却準備金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReserveForSpecialDepreciation[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 当期変動額 | （抽象要素。XBRL ファクトなし） | 5 | Y |
| 　　　　　├ 特別償却準備金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForSpecialDepreciationReserveForSpecialDepreciation[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 特別償却準備金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForSpecialDepreciationReserveForSpecialDepreciation[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 当期変動額合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:TotalChangesOfItemsDuringThePeriodReserveForSpecialDepreciation[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　├ プログラム等準備金 | （抽象要素。XBRL ファクトなし） | 4 | Y |
| 　　　　├ プログラム等準備金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReserveForSoftwarePrograms[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 当期変動額 | （抽象要素。XBRL ファクトなし） | 5 | Y |
| 　　　　　├ プログラム等準備金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForSoftwareProgramsReserveForSoftwarePrograms[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 当期変動額合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:TotalChangesOfItemsDuringThePeriodReserveForSoftwarePrograms[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　├ 海外投資等損失準備金 | （抽象要素。XBRL ファクトなし） | 4 | Y |
| 　　　　├ 海外投資等損失準備金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReserveForOverseasInvestmentLoss[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 当期変動額 | （抽象要素。XBRL ファクトなし） | 5 | Y |
| 　　　　　├ 海外投資等損失準備金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForOverseasInvestmentLossReserveForOverseasInvestmentLoss[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 海外投資等損失準備金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForOverseasInvestmentLossReserveForOverseasInvestmentLoss[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 当期変動額合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:TotalChangesOfItemsDuringThePeriodReserveForOverseasInvestmentLoss[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　├ 研究開発積立金 | （抽象要素。XBRL ファクトなし） | 4 | Y |
| 　　　　├ 研究開発積立金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReserveForResearchAndDevelopment[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 当期変動額 | （抽象要素。XBRL ファクトなし） | 5 | Y |
| 　　　　　├ 研究開発積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForResearchAndDevelopmentReserveForResearchAndDevelopment[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 研究開発積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForResearchAndDevelopmentReserveForResearchAndDevelopment[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 当期変動額合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:TotalChangesOfItemsDuringThePeriodReserveForResearchAndDevelopment[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　├ 配当積立金 | （抽象要素。XBRL ファクトなし） | 4 | Y |
| 　　　　├ 配当積立金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReserveForDividends1[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 当期変動額 | （抽象要素。XBRL ファクトなし） | 5 | Y |
| 　　　　　├ 配当積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForDividends1ReserveForDividends1[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 配当積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForDividends1ReserveForDividends1[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 当期変動額合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:TotalChangesOfItemsDuringThePeriodReserveForDividends1[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　├ 配当準備金 | （抽象要素。XBRL ファクトなし） | 4 | Y |
| 　　　　├ 配当準備金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReserveForDividends2[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 当期変動額 | （抽象要素。XBRL ファクトなし） | 5 | Y |
| 　　　　　├ 配当準備金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForDividends2ReserveForDividends2[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 配当準備金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForDividends2ReserveForDividends2[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 当期変動額合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:TotalChangesOfItemsDuringThePeriodReserveForDividends2[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　├ 配当準備積立金 | （抽象要素。XBRL ファクトなし） | 4 | Y |
| 　　　　├ 配当準備積立金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReserveForDividends3[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 当期変動額 | （抽象要素。XBRL ファクトなし） | 5 | Y |
| 　　　　　├ 配当準備積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForDividends3ReserveForDividends3[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 配当準備積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForDividends3ReserveForDividends3[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 当期変動額合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:TotalChangesOfItemsDuringThePeriodReserveForDividends3[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　├ 配当引当積立金 | （抽象要素。XBRL ファクトなし） | 4 | Y |
| 　　　　├ 配当引当積立金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReserveForDividends4[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 当期変動額 | （抽象要素。XBRL ファクトなし） | 5 | Y |
| 　　　　　├ 配当引当積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForDividends4ReserveForDividends4[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 配当引当積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForDividends4ReserveForDividends4[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 当期変動額合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:TotalChangesOfItemsDuringThePeriodReserveForDividends4[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　├ 退職給与積立金 | （抽象要素。XBRL ファクトなし） | 4 | Y |
| 　　　　├ 退職給与積立金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReserveForRetirementAllowance1[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 当期変動額 | （抽象要素。XBRL ファクトなし） | 5 | Y |
| 　　　　　├ 退職給与積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForRetirementAllowance1ReserveForRetirementAllowance1[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 退職給与積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForRetirementAllowance1ReserveForRetirementAllowance1[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 当期変動額合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:TotalChangesOfItemsDuringThePeriodReserveForRetirementAllowance1[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　├ 退職積立金 | （抽象要素。XBRL ファクトなし） | 4 | Y |
| 　　　　├ 退職積立金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReserveForRetirementAllowance2[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 当期変動額 | （抽象要素。XBRL ファクトなし） | 5 | Y |
| 　　　　　├ 退職積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForRetirementAllowance2ReserveForRetirementAllowance2[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 退職積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForRetirementAllowance2ReserveForRetirementAllowance2[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 当期変動額合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:TotalChangesOfItemsDuringThePeriodReserveForRetirementAllowance2[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　├ 退職手当積立金 | （抽象要素。XBRL ファクトなし） | 4 | Y |
| 　　　　├ 退職手当積立金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReserveForRetirementAllowance3[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 当期変動額 | （抽象要素。XBRL ファクトなし） | 5 | Y |
| 　　　　　├ 退職手当積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForRetirementAllowance3ReserveForRetirementAllowance3[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 退職手当積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForRetirementAllowance3ReserveForRetirementAllowance3[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 当期変動額合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:TotalChangesOfItemsDuringThePeriodReserveForRetirementAllowance3[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　├ 退職慰労積立金 | （抽象要素。XBRL ファクトなし） | 4 | Y |
| 　　　　├ 退職慰労積立金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReserveForRetirementAllowance4[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 当期変動額 | （抽象要素。XBRL ファクトなし） | 5 | Y |
| 　　　　　├ 退職慰労積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForRetirementAllowance4ReserveForRetirementAllowance4[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 退職慰労積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForRetirementAllowance4ReserveForRetirementAllowance4[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 当期変動額合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:TotalChangesOfItemsDuringThePeriodReserveForRetirementAllowance4[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　├ 役員退職積立金 | （抽象要素。XBRL ファクトなし） | 4 | Y |
| 　　　　├ 役員退職積立金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReserveForDirectorsRetirementAllowance[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 当期変動額 | （抽象要素。XBRL ファクトなし） | 5 | Y |
| 　　　　　├ 役員退職積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForDirectorsRetirementAllowanceReserveForDirectorsRetirementAllowance[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 役員退職積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForDirectorsRetirementAllowanceReserveForDirectorsRetirementAllowance[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 当期変動額合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:TotalChangesOfItemsDuringThePeriodReserveForDirectorsRetirementAllowance[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　├ 圧縮記帳積立金 | （抽象要素。XBRL ファクトなし） | 4 | Y |
| 　　　　├ 圧縮記帳積立金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReserveForReductionEntry1[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 当期変動額 | （抽象要素。XBRL ファクトなし） | 5 | Y |
| 　　　　　├ 圧縮記帳積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForReductionEntry1ReserveForReductionEntry1[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 圧縮記帳積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForReductionEntry1ReserveForReductionEntry1[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 当期変動額合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:TotalChangesOfItemsDuringThePeriodReserveForReductionEntry1[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　├ 圧縮積立金 | （抽象要素。XBRL ファクトなし） | 4 | Y |
| 　　　　├ 圧縮積立金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReserveForReductionEntry2[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 当期変動額 | （抽象要素。XBRL ファクトなし） | 5 | Y |
| 　　　　　├ 圧縮積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForReductionEntry2ReserveForReductionEntry2[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 圧縮積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForReductionEntry2ReserveForReductionEntry2[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 当期変動額合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:TotalChangesOfItemsDuringThePeriodReserveForReductionEntry2[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　├ 土地圧縮積立金 | （抽象要素。XBRL ファクトなし） | 4 | Y |
| 　　　　├ 土地圧縮積立金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReserveForReductionEntryOfLand[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 当期変動額 | （抽象要素。XBRL ファクトなし） | 5 | Y |
| 　　　　　├ 土地圧縮積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForReductionEntryOfLandReserveForReductionEntryOfLand[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 土地圧縮積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForReductionEntryOfLandReserveForReductionEntryOfLand[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 当期変動額合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:TotalChangesOfItemsDuringThePeriodReserveForReductionEntryOfLand[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　├ 建物圧縮積立金 | （抽象要素。XBRL ファクトなし） | 4 | Y |
| 　　　　├ 建物圧縮積立金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReserveForReductionEntryOfBuildings[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 当期変動額 | （抽象要素。XBRL ファクトなし） | 5 | Y |
| 　　　　　├ 建物圧縮積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForReductionEntryOfBuildingsReserveForReductionEntryOfBuildings[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 建物圧縮積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForReductionEntryOfBuildingsReserveForReductionEntryOfBuildings[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 当期変動額合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:TotalChangesOfItemsDuringThePeriodReserveForReductionEntryOfBuildings[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　├ 不動産圧縮積立金 | （抽象要素。XBRL ファクトなし） | 4 | Y |
| 　　　　├ 不動産圧縮積立金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReserveForReductionEntryOfRealEstate[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 当期変動額 | （抽象要素。XBRL ファクトなし） | 5 | Y |
| 　　　　　├ 不動産圧縮積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForReductionEntryOfRealEstateReserveForReductionEntryOfRealEstate[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 不動産圧縮積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForReductionEntryOfRealEstateReserveForReductionEntryOfRealEstate[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 当期変動額合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:TotalChangesOfItemsDuringThePeriodReserveForReductionEntryOfRealEstate[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　├ 資産圧縮積立金 | （抽象要素。XBRL ファクトなし） | 4 | Y |
| 　　　　├ 資産圧縮積立金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReserveForReductionEntryOfAssets[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 当期変動額 | （抽象要素。XBRL ファクトなし） | 5 | Y |
| 　　　　　├ 資産圧縮積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForReductionEntryOfAssetsReserveForReductionEntryOfAssets[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 資産圧縮積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForReductionEntryOfAssetsReserveForReductionEntryOfAssets[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 当期変動額合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:TotalChangesOfItemsDuringThePeriodReserveForReductionEntryOfAssets[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　├ 償却資産圧縮積立金 | （抽象要素。XBRL ファクトなし） | 4 | Y |
| 　　　　├ 償却資産圧縮積立金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReserveForReductionEntryOfDepreciableAssets[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 当期変動額 | （抽象要素。XBRL ファクトなし） | 5 | Y |
| 　　　　　├ 償却資産圧縮積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForReductionEntryOfDepreciableAssetsReserveForReductionEntryOfDepreciableAssets[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 償却資産圧縮積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForReductionEntryOfDepreciableAssetsReserveForReductionEntryOfDepreciableAssets[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 当期変動額合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:TotalChangesOfItemsDuringThePeriodReserveForReductionEntryOfDepreciableAssets[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　├ 買換資産圧縮積立金 | （抽象要素。XBRL ファクトなし） | 4 | Y |
| 　　　　├ 買換資産圧縮積立金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReserveForReductionEntryOfReplacedProperty[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 当期変動額 | （抽象要素。XBRL ファクトなし） | 5 | Y |
| 　　　　　├ 買換資産圧縮積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForReductionEntryOfReplacedPropertyReserveForReductionEntryOfReplacedProperty[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 買換資産圧縮積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForReductionEntryOfReplacedPropertyReserveForReductionEntryOfReplacedProperty[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 当期変動額合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:TotalChangesOfItemsDuringThePeriodReserveForReductionEntryOfReplacedProperty[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　├ 買換資産積立金 | （抽象要素。XBRL ファクトなし） | 4 | Y |
| 　　　　├ 買換資産積立金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReserveForPropertyReplacement[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 当期変動額 | （抽象要素。XBRL ファクトなし） | 5 | Y |
| 　　　　　├ 買換資産積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForPropertyReplacementReserveForPropertyReplacement[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 買換資産積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForPropertyReplacementReserveForPropertyReplacement[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 当期変動額合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:TotalChangesOfItemsDuringThePeriodReserveForPropertyReplacement[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　├ 特別償却積立金 | （抽象要素。XBRL ファクトなし） | 4 | Y |
| 　　　　├ 特別償却積立金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReserveForSpecialDepreciationGeneral[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 当期変動額 | （抽象要素。XBRL ファクトなし） | 5 | Y |
| 　　　　　├ 特別償却積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForSpecialDepreciationGeneralReserveForSpecialDepreciationGeneral[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 特別償却積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForSpecialDepreciationGeneralReserveForSpecialDepreciationGeneral[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 当期変動額合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:TotalChangesOfItemsDuringThePeriodReserveForSpecialDepreciationGeneral[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　├ 特別積立金 | （抽象要素。XBRL ファクトなし） | 4 | Y |
| 　　　　├ 特別積立金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:SpecialReserve[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 当期変動額 | （抽象要素。XBRL ファクトなし） | 5 | Y |
| 　　　　　├ 特別積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfSpecialReserveSpecialReserve[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 特別積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfSpecialReserveSpecialReserve[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 当期変動額合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:TotalChangesOfItemsDuringThePeriodSpecialReserve[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　├ 任意積立金 | （抽象要素。XBRL ファクトなし） | 4 | Y |
| 　　　　├ 任意積立金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:VoluntaryRetainedEarnings[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 当期変動額 | （抽象要素。XBRL ファクトなし） | 5 | Y |
| 　　　　　├ 任意積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfVoluntaryRetainedEarningsVoluntaryRetainedEarnings[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 任意積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfVoluntaryRetainedEarningsVoluntaryRetainedEarnings[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 当期変動額合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:TotalChangesOfItemsDuringThePeriodVoluntaryRetainedEarnings[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　├ 別途積立金 | （抽象要素。XBRL ファクトなし） | 4 | Y |
| 　　　　├ 別途積立金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:GeneralReserve[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 当期変動額 | （抽象要素。XBRL ファクトなし） | 5 | Y |
| 　　　　　├ 別途積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfGeneralReserveGeneralReserve[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 別途積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfGeneralReserveGeneralReserve[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 利益処分 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProfitAppropriationGeneralReserve[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 当期変動額合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:TotalChangesOfItemsDuringThePeriodGeneralReserve[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　├ 繰越利益剰余金 | （抽象要素。XBRL ファクトなし） | 4 | Y |
| 　　　　├ 当期首残高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:RetainedEarningsBroughtForward[@contextRef='Prior1YearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 会計方針の変更による累積的影響額 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:CumulativeEffectOfChangesInAccountingPoliciesREBF[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 遡及処理後当期首残高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:RetainedEarningsBroughtForwardAsRestated[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 当期変動額 | （抽象要素。XBRL ファクトなし） | 5 | Y |
| 　　　　　├ 剰余金の配当 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:DividendsFromSurplusREBF[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 当期純利益 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:NetIncome[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 合併による増加 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:IncreaseByMergerREBF[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 会社分割による増加 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:IncreaseByCorporateDivisionREBF[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 株式交換による増加 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:IncreaseByShareExchangesREBF[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 株式移転による増加 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:IncreaseByShareTransfersREBF[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 分割型の会社分割による減少 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:DecreaseByCorporateDivisionSplitOffTypeREBF[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 自己株式の処分 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:DisposalOfTreasuryStockREBF[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 自己株式の消却 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:RetirementOfTreasuryStockREBF[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 役員賞与 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:DirectorsBonusesREBF[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 利益処分 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProfitAppropriationREBF[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 利益準備金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfLegalRetainedEarningsREBF[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 利益準備金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfLegalRetainedEarningsREBF[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 配当平均積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForDividendEqualizationREBF[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 配当平均積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForDividendEqualizationREBF[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 固定資産圧縮積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForAdvancedDepreciationOfNoncurrentAssetsREBF[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 固定資産圧縮積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForAdvancedDepreciationOfNoncurrentAssetsREBF[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 固定資産圧縮特別勘定積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForSpecialAccountForAdvancedDepreciationOfNoncurrentAssetsREBF[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 固定資産圧縮特別勘定積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForSpecialAccountForAdvancedDepreciationOfNoncurrentAssetsREBF[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 特別償却準備金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForSpecialDepreciationREBF[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 特別償却準備金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForSpecialDepreciationREBF[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ プログラム等準備金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForSoftwareProgramsREBF[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 海外投資等損失準備金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForOverseasInvestmentLossREBF[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 海外投資等損失準備金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForOverseasInvestmentLossREBF[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 研究開発積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForResearchAndDevelopmentREBF[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 研究開発積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForResearchAndDevelopmentREBF[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 配当積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForDividends1REBF[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 配当積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForDividends1REBF[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 配当準備金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForDividends2REBF[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 配当準備金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForDividends2REBF[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 配当準備積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForDividends3REBF[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 配当準備積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForDividends3REBF[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 配当引当積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForDividends4REBF[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 配当引当積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForDividends4REBF[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 退職給与積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForRetirementAllowance1REBF[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 退職給与積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForRetirementAllowance1REBF[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 退職積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForRetirementAllowance2REBF[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 退職積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForRetirementAllowance2REBF[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 退職手当積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForRetirementAllowance3REBF[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 退職手当積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForRetirementAllowance3REBF[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 退職慰労積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForRetirementAllowance4REBF[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 退職慰労積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForRetirementAllowance4REBF[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 役員退職積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForDirectorsRetirementAllowanceREBF[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 役員退職積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForDirectorsRetirementAllowanceREBF[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 圧縮記帳積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForReductionEntry1REBF[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 圧縮記帳積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForReductionEntry1REBF[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 圧縮積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForReductionEntry2REBF[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 圧縮積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForReductionEntry2REBF[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 土地圧縮積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForReductionEntryOfLandREBF[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 土地圧縮積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForReductionEntryOfLandREBF[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 建物圧縮積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForReductionEntryOfBuildingsREBF[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 建物圧縮積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForReductionEntryOfBuildingsREBF[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 不動産圧縮積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForReductionEntryOfRealEstateREBF[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 不動産圧縮積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForReductionEntryOfRealEstateREBF[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 資産圧縮積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForReductionEntryOfAssetsREBF[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 資産圧縮積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForReductionEntryOfAssetsREBF[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 償却資産圧縮積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForReductionEntryOfDepreciableAssetsREBF[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 償却資産圧縮積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForReductionEntryOfDepreciableAssetsREBF[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 買換資産圧縮積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForReductionEntryOfReplacedPropertyREBF[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 買換資産圧縮積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForReductionEntryOfReplacedPropertyREBF[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 買換資産積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForPropertyReplacementREBF[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 買換資産積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForPropertyReplacementREBF[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 特別償却積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForSpecialDepreciationGeneralREBF[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 特別償却積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForSpecialDepreciationGeneralREBF[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 特別積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfSpecialReserveREBF[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 特別積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfSpecialReserveREBF[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 任意積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfVoluntaryRetainedEarningsREBF[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 任意積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfVoluntaryRetainedEarningsREBF[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 別途積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfGeneralReserveREBF[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 別途積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfGeneralReserveREBF[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 土地再評価差額金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfRevaluationReserveForLandREBF[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 欠損填補 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:DeficitDispositionREBF[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 減資 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:CapitalReductionREBF[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 利益剰余金から資本剰余金への振替 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:TransferToCapitalSurplusFromRetainedEarningsREBF[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　　├ 当期変動額合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:TotalChangesOfItemsDuringThePeriodREBF[@contextRef='CurrentYearNonConsolidatedDuration']` | 6 |  |
| 　　　　├ 当期末残高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:RetainedEarningsBroughtForward[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　├ その他利益剰余金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:OtherRetainedEarnings[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 当期変動額 | （抽象要素。XBRL ファクトなし） | 4 | Y |
| 　　　　├ 剰余金の配当 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:DividendsFromSurplusORE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 当期純利益 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:NetIncomeORE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 合併による増加 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:IncreaseByMergerORE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 会社分割による増加 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:IncreaseByCorporateDivisionORE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 株式交換による増加 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:IncreaseByShareExchangesORE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 株式移転による増加 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:IncreaseByShareTransfersORE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 分割型の会社分割による減少 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:DecreaseByCorporateDivisionSplitOffTypeORE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 自己株式の処分 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:DisposalOfTreasuryStockORE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 自己株式の消却 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:RetirementOfTreasuryStockORE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 役員賞与 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:DirectorsBonusesORE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 利益処分 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProfitAppropriationORE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 利益準備金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfLegalRetainedEarningsORE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 利益準備金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfLegalRetainedEarningsORE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 配当平均積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForDividendEqualizationORE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 配当平均積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForDividendEqualizationORE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 固定資産圧縮積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForAdvancedDepreciationOfNoncurrentAssetsORE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 固定資産圧縮積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForAdvancedDepreciationOfNoncurrentAssetsORE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 固定資産圧縮特別勘定積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForSpecialAccountForAdvancedDepreciationOfNoncurrentAssetsORE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 固定資産圧縮特別勘定積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForSpecialAccountForAdvancedDepreciationOfNoncurrentAssetsORE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 特別償却準備金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForSpecialDepreciationORE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 特別償却準備金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForSpecialDepreciationORE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ プログラム等準備金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForSoftwareProgramsORE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 海外投資等損失準備金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForOverseasInvestmentLossORE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 海外投資等損失準備金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForOverseasInvestmentLossORE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 研究開発積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForResearchAndDevelopmentORE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 研究開発積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForResearchAndDevelopmentORE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 配当積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForDividends1ORE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 配当積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForDividends1ORE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 配当準備金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForDividends2ORE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 配当準備金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForDividends2ORE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 配当準備積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForDividends3ORE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 配当準備積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForDividends3ORE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 配当引当積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForDividends4ORE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 配当引当積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForDividends4ORE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 退職給与積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForRetirementAllowance1ORE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 退職給与積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForRetirementAllowance1ORE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 退職積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForRetirementAllowance2ORE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 退職積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForRetirementAllowance2ORE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 退職手当積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForRetirementAllowance3ORE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 退職手当積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForRetirementAllowance3ORE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 退職慰労積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForRetirementAllowance4ORE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 退職慰労積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForRetirementAllowance4ORE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 役員退職積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForDirectorsRetirementAllowanceORE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 役員退職積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForDirectorsRetirementAllowanceORE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 圧縮記帳積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForReductionEntry1ORE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 圧縮記帳積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForReductionEntry1ORE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 圧縮積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForReductionEntry2ORE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 圧縮積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForReductionEntry2ORE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 土地圧縮積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForReductionEntryOfLandORE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 土地圧縮積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForReductionEntryOfLandORE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 建物圧縮積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForReductionEntryOfBuildingsORE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 建物圧縮積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForReductionEntryOfBuildingsORE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 不動産圧縮積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForReductionEntryOfRealEstateORE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 不動産圧縮積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForReductionEntryOfRealEstateORE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 資産圧縮積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForReductionEntryOfAssetsORE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 資産圧縮積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForReductionEntryOfAssetsORE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 償却資産圧縮積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForReductionEntryOfDepreciableAssetsORE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 償却資産圧縮積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForReductionEntryOfDepreciableAssetsORE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 買換資産圧縮積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForReductionEntryOfReplacedPropertyORE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 買換資産圧縮積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForReductionEntryOfReplacedPropertyORE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 買換資産積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForPropertyReplacementORE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 買換資産積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForPropertyReplacementORE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 特別償却積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForSpecialDepreciationGeneralORE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 特別償却積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForSpecialDepreciationGeneralORE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 特別積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfSpecialReserveORE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 特別積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfSpecialReserveORE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 任意積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfVoluntaryRetainedEarningsORE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 任意積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfVoluntaryRetainedEarningsORE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 別途積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfGeneralReserveORE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 別途積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfGeneralReserveORE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 土地再評価差額金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfRevaluationReserveForLandORE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 欠損填補 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:DeficitDispositionORE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 減資 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:CapitalReductionORE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 利益剰余金から資本剰余金への振替 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:TransferToCapitalSurplusFromRetainedEarningsORE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 当期変動額合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:TotalChangesOfItemsDuringThePeriodORE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　├ 利益剰余金合計 | （抽象要素。XBRL ファクトなし） | 3 | Y |
| 　　　├ 当期首残高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:RetainedEarnings[@contextRef='Prior1YearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 会計方針の変更による累積的影響額 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:CumulativeEffectOfChangesInAccountingPoliciesRE[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 遡及処理後当期首残高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:RetainedEarningsAsRestated[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 在外子会社の会計処理の変更に伴う増減 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:EffectOfChangesInAccountingPoliciesAppliedToForeignSubsidiariesRE[@contextRef='CurrentYearNonConsolidatedDuration']` | 4 |  |
| 　　　├ 当期変動額 | （抽象要素。XBRL ファクトなし） | 4 | Y |
| 　　　　├ 剰余金の配当 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:DividendsFromSurplusRE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 当期純利益 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:NetIncomeRENonconsolidated[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 連結範囲の変動 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ChangeOfScopeOfConsolidationRE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 持分法の適用範囲の変動 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ChangeOfScopeOfEquityMethodRE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 合併による増加 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:IncreaseByMergerRE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 会社分割による増加 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:IncreaseByCorporateDivisionRE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 株式交換による増加 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:IncreaseByShareExchangesRE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 株式移転による増加 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:IncreaseByShareTransfersRE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 分割型の会社分割による減少 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:DecreaseByCorporateDivisionSplitOffTypeRE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 自己株式の処分 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:DisposalOfTreasuryStockRE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 自己株式の消却 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:RetirementOfTreasuryStockRE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 役員賞与 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:DirectorsBonusesRE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 利益処分 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProfitAppropriationRE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 利益準備金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfLegalRetainedEarningsRE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 利益準備金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfLegalRetainedEarningsRE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 配当平均積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForDividendEqualizationRE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 配当平均積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForDividendEqualizationRE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 固定資産圧縮積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForAdvancedDepreciationOfNoncurrentAssetsRE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 固定資産圧縮積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForAdvancedDepreciationOfNoncurrentAssetsRE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 固定資産圧縮特別勘定積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForSpecialAccountForAdvancedDepreciationOfNoncurrentAssetsRE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 固定資産圧縮特別勘定積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForSpecialAccountForAdvancedDepreciationOfNoncurrentAssetsRE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 特別償却準備金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForSpecialDepreciationRE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 特別償却準備金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForSpecialDepreciationRE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ プログラム等準備金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForSoftwareProgramsRE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 海外投資等損失準備金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForOverseasInvestmentLossRE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 海外投資等損失準備金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForOverseasInvestmentLossRE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 研究開発積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForResearchAndDevelopmentRE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 研究開発積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForResearchAndDevelopmentRE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 配当積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForDividends1RE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 配当積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForDividends1RE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 配当準備金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForDividends2RE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 配当準備金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForDividends2RE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 配当準備積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForDividends3RE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 配当準備積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForDividends3RE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 配当引当積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForDividends4RE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 配当引当積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForDividends4RE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 退職給与積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForRetirementAllowance1RE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 退職給与積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForRetirementAllowance1RE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 退職積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForRetirementAllowance2RE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 退職積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForRetirementAllowance2RE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 退職手当積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForRetirementAllowance3RE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 退職手当積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForRetirementAllowance3RE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 退職慰労積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForRetirementAllowance4RE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 退職慰労積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForRetirementAllowance4RE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 役員退職積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForDirectorsRetirementAllowanceRE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 役員退職積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForDirectorsRetirementAllowanceRE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 圧縮記帳積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForReductionEntry1RE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 圧縮記帳積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForReductionEntry1RE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 圧縮積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForReductionEntry2RE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 圧縮積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForReductionEntry2RE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 土地圧縮積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForReductionEntryOfLandRE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 土地圧縮積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForReductionEntryOfLandRE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 建物圧縮積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForReductionEntryOfBuildingsRE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 建物圧縮積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForReductionEntryOfBuildingsRE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 不動産圧縮積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForReductionEntryOfRealEstateRE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 不動産圧縮積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForReductionEntryOfRealEstateRE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 資産圧縮積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForReductionEntryOfAssetsRE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 資産圧縮積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForReductionEntryOfAssetsRE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 償却資産圧縮積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForReductionEntryOfDepreciableAssetsRE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 償却資産圧縮積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForReductionEntryOfDepreciableAssetsRE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 買換資産圧縮積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForReductionEntryOfReplacedPropertyRE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 買換資産圧縮積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForReductionEntryOfReplacedPropertyRE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 買換資産積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForPropertyReplacementRE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 買換資産積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForPropertyReplacementRE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 特別償却積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfReserveForSpecialDepreciationGeneralRE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 特別償却積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfReserveForSpecialDepreciationGeneralRE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 特別積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfSpecialReserveRE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 特別積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfSpecialReserveRE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 任意積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfVoluntaryRetainedEarningsRE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 任意積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfVoluntaryRetainedEarningsRE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 別途積立金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfGeneralReserveRE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 別途積立金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfGeneralReserveRE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 土地再評価差額金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfRevaluationReserveForLandRE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 欠損填補 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:DeficitDispositionRE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 減資 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:CapitalReductionRE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 利益剰余金から資本剰余金への振替 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:TransferToCapitalSurplusFromRetainedEarningsRE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ その他 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:OtherRE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　　├ 当期変動額合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:TotalChangesOfItemsDuringThePeriodRE[@contextRef='CurrentYearNonConsolidatedDuration']` | 5 |  |
| 　　　├ 当期末残高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:RetainedEarnings[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　├ 自己株式 | （抽象要素。XBRL ファクトなし） | 2 | Y |
| 　　├ 当期首残高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:TreasuryStock[@contextRef='Prior1YearNonConsolidatedInstant']` | 3 |  |
| 　　├ 当期変動額 | （抽象要素。XBRL ファクトなし） | 3 | Y |
| 　　　├ 自己株式の取得 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:PurchaseOfTreasuryStockTS[@contextRef='CurrentYearNonConsolidatedDuration']` | 4 |  |
| 　　　├ 自己株式の処分 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:DisposalOfTreasuryStockTS[@contextRef='CurrentYearNonConsolidatedDuration']` | 4 |  |
| 　　　├ 自己株式の消却 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:RetirementOfTreasuryStockTS[@contextRef='CurrentYearNonConsolidatedDuration']` | 4 |  |
| 　　　├ 持分法適用会社に対する持分変動に伴う自己株式の増減 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ChangeInEquityInAffiliatesAccountedForByEquityMethodTreasuryStockTS[@contextRef='CurrentYearNonConsolidatedDuration']` | 4 |  |
| 　　　├ 当期変動額合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:TotalChangesOfItemsDuringThePeriodTS[@contextRef='CurrentYearNonConsolidatedDuration']` | 4 |  |
| 　　├ 当期末残高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:TreasuryStock[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　├ 株主資本合計 | （抽象要素。XBRL ファクトなし） | 2 | Y |
| 　　├ 当期首残高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ShareholdersEquity[@contextRef='Prior1YearNonConsolidatedInstant']` | 3 |  |
| 　　├ 会計方針の変更による累積的影響額 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:CumulativeEffectOfChangesInAccountingPoliciesSE[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 遡及処理後当期首残高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ShareholdersEquityAsRestated[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 在外子会社の会計処理の変更に伴う増減 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:EffectOfChangesInAccountingPoliciesAppliedToForeignSubsidiariesSE[@contextRef='CurrentYearNonConsolidatedDuration']` | 3 |  |
| 　　├ 当期変動額 | （抽象要素。XBRL ファクトなし） | 3 | Y |
| 　　　├ 新株の発行 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:IssuanceOfNewSharesSE[@contextRef='CurrentYearNonConsolidatedDuration']` | 4 |  |
| 　　　├ 新株の発行（新株予約権の行使） | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:IssuanceOfNewSharesExerciseOfSubscriptionRightsToSharesSE[@contextRef='CurrentYearNonConsolidatedDuration']` | 4 |  |
| 　　　├ 剰余金（その他資本剰余金）の配当 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:DividendsFromSurplusOtherCapitalSurplusSE[@contextRef='CurrentYearNonConsolidatedDuration']` | 4 |  |
| 　　　├ 剰余金の配当 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:DividendsFromSurplusSE[@contextRef='CurrentYearNonConsolidatedDuration']` | 4 |  |
| 　　　├ 当期純利益 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:NetIncomeSE[@contextRef='CurrentYearNonConsolidatedDuration']` | 4 |  |
| 　　　├ 自己株式の取得 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:PurchaseOfTreasuryStockSE[@contextRef='CurrentYearNonConsolidatedDuration']` | 4 |  |
| 　　　├ 自己株式の処分 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:DisposalOfTreasuryStockSE[@contextRef='CurrentYearNonConsolidatedDuration']` | 4 |  |
| 　　　├ 自己株式の消却 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:RetirementOfTreasuryStockSE[@contextRef='CurrentYearNonConsolidatedDuration']` | 4 |  |
| 　　　├ 持分法適用会社に対する持分変動に伴う自己株式の増減 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ChangeInEquityInAffiliatesAccountedForByEquityMethodTreasuryStockSE[@contextRef='CurrentYearNonConsolidatedDuration']` | 4 |  |
| 　　　├ 連結範囲の変動 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ChangeOfScopeOfConsolidationSE[@contextRef='CurrentYearNonConsolidatedDuration']` | 4 |  |
| 　　　├ 持分法の適用範囲の変動 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ChangeOfScopeOfEquityMethodSE[@contextRef='CurrentYearNonConsolidatedDuration']` | 4 |  |
| 　　　├ 合併による増加 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:IncreaseByMergerSE[@contextRef='CurrentYearNonConsolidatedDuration']` | 4 |  |
| 　　　├ 会社分割による増加 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:IncreaseByCorporateDivisionSE[@contextRef='CurrentYearNonConsolidatedDuration']` | 4 |  |
| 　　　├ 株式交換による増加 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:IncreaseByShareExchangesSE[@contextRef='CurrentYearNonConsolidatedDuration']` | 4 |  |
| 　　　├ 株式移転による増加 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:IncreaseByShareTransfersSE[@contextRef='CurrentYearNonConsolidatedDuration']` | 4 |  |
| 　　　├ 分割型の会社分割による減少 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:DecreaseByCorporateDivisionSplitOffTypeSE[@contextRef='CurrentYearNonConsolidatedDuration']` | 4 |  |
| 　　　├ 資本金から準備金への振替 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:TransferToLegalCapitalSurplusFromCapitalStockSE[@contextRef='CurrentYearNonConsolidatedDuration']` | 4 |  |
| 　　　├ 資本金から剰余金への振替 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:TransferToOtherCapitalSurplusFromCapitalStockSE[@contextRef='CurrentYearNonConsolidatedDuration']` | 4 |  |
| 　　　├ 準備金から資本金への振替 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:TransferToCapitalStockFromLegalCapitalSurplusSE[@contextRef='CurrentYearNonConsolidatedDuration']` | 4 |  |
| 　　　├ 準備金から剰余金への振替 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:TransferToOtherCapitalSurplusFromLegalCapitalSurplusSE[@contextRef='CurrentYearNonConsolidatedDuration']` | 4 |  |
| 　　　├ 利益剰余金から資本剰余金への振替 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:TransferToCapitalSurplusFromRetainedEarningsSE[@contextRef='CurrentYearNonConsolidatedDuration']` | 4 |  |
| 　　　├ 利益処分 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProfitAppropriationSE[@contextRef='CurrentYearNonConsolidatedDuration']` | 4 |  |
| 　　　├ 役員賞与 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:DirectorsBonusesSE[@contextRef='CurrentYearNonConsolidatedDuration']` | 4 |  |
| 　　　├ 利益準備金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfLegalRetainedEarningsSE[@contextRef='CurrentYearNonConsolidatedDuration']` | 4 |  |
| 　　　├ 利益準備金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfLegalRetainedEarningsSE[@contextRef='CurrentYearNonConsolidatedDuration']` | 4 |  |
| 　　　├ 欠損填補 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:DeficitDispositionSE[@contextRef='CurrentYearNonConsolidatedDuration']` | 4 |  |
| 　　　├ 減資 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:CapitalReductionSE[@contextRef='CurrentYearNonConsolidatedDuration']` | 4 |  |
| 　　　├ 資本準備金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfLegalCapitalSurplusSE[@contextRef='CurrentYearNonConsolidatedDuration']` | 4 |  |
| 　　　├ 土地再評価差額金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfRevaluationReserveForLandSE[@contextRef='CurrentYearNonConsolidatedDuration']` | 4 |  |
| 　　　├ その他 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:OtherSE[@contextRef='CurrentYearNonConsolidatedDuration']` | 4 |  |
| 　　　├ 当期変動額合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:TotalChangesOfItemsDuringThePeriodSE[@contextRef='CurrentYearNonConsolidatedDuration']` | 4 |  |
| 　　├ 当期末残高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ShareholdersEquity[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| ├ 評価・換算差額等 | （抽象要素。XBRL ファクトなし） | 1 | Y |
| 　├ その他有価証券評価差額金 | （抽象要素。XBRL ファクトなし） | 2 | Y |
| 　　├ 当期首残高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ValuationDifferenceOnAvailableForSaleSecurities[@contextRef='Prior1YearNonConsolidatedInstant']` | 3 |  |
| 　　├ 当期変動額 | （抽象要素。XBRL ファクトなし） | 3 | Y |
| 　　　├ その他有価証券の売却による増減 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:SalesOfAvailableForSaleSecuritiesAFS[@contextRef='CurrentYearNonConsolidatedDuration']` | 4 |  |
| 　　　├ その他有価証券の減損処理による増減 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ImpairmentOfAvailableForSaleSecuritiesAFS[@contextRef='CurrentYearNonConsolidatedDuration']` | 4 |  |
| 　　　├ 純資産の部に直接計上されたその他有価証券評価差額金の増減 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:InsertedDirectlyIntoNetAssetsAFS[@contextRef='CurrentYearNonConsolidatedDuration']` | 4 |  |
| 　　　├ 連結子会社の増資による持分の増減 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:CapitalIncreaseOfConsolidatedSubsidiariesAFS[@contextRef='CurrentYearNonConsolidatedDuration']` | 4 |  |
| 　　　├ 株主資本以外の項目の当期変動額（純額） | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:NetChangesOfItemsOtherThanShareholdersEquityAFS[@contextRef='CurrentYearNonConsolidatedDuration']` | 4 |  |
| 　　　├ 当期変動額合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:TotalChangesOfItemsDuringThePeriodAFS[@contextRef='CurrentYearNonConsolidatedDuration']` | 4 |  |
| 　　├ 当期末残高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ValuationDifferenceOnAvailableForSaleSecurities[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　├ 繰延ヘッジ損益 | （抽象要素。XBRL ファクトなし） | 2 | Y |
| 　　├ 当期首残高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:DeferredGainsOrLossesOnHedges[@contextRef='Prior1YearNonConsolidatedInstant']` | 3 |  |
| 　　├ 当期変動額 | （抽象要素。XBRL ファクトなし） | 3 | Y |
| 　　　├ ヘッジ対象の損益認識による増減 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:RealizedGainOrLossOnHedgedObjectDeferredGainOrLossOnHedges[@contextRef='CurrentYearNonConsolidatedDuration']` | 4 |  |
| 　　　├ ヘッジ会計の終了による増減 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ClosingOfHedgingDeferredGainOrLossOnHedges[@contextRef='CurrentYearNonConsolidatedDuration']` | 4 |  |
| 　　　├ 純資産の部に直接計上された繰延ヘッジ損益の増減 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:InsertedDirectlyIntoNetAssetsDeferredGainsOrLossesOnHedgesDeferredGainOrLossOnHedges[@contextRef='CurrentYearNonConsolidatedDuration']` | 4 |  |
| 　　　├ 株主資本以外の項目の当期変動額（純額） | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:NetChangesOfItemsOtherThanShareholdersEquityDeferredGainOrLossOnHedges[@contextRef='CurrentYearNonConsolidatedDuration']` | 4 |  |
| 　　　├ 当期変動額合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:TotalChangesOfItemsDuringThePeriodDeferredGainOrLossOnHedges[@contextRef='CurrentYearNonConsolidatedDuration']` | 4 |  |
| 　　├ 当期末残高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:DeferredGainsOrLossesOnHedges[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　├ 土地再評価差額金 | （抽象要素。XBRL ファクトなし） | 2 | Y |
| 　　├ 当期首残高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:RevaluationReserveForLand[@contextRef='Prior1YearNonConsolidatedInstant']` | 3 |  |
| 　　├ 当期変動額 | （抽象要素。XBRL ファクトなし） | 3 | Y |
| 　　　├ 土地再評価差額金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfRevaluationReserveForLandRevaluationReserveForLand[@contextRef='CurrentYearNonConsolidatedDuration']` | 4 |  |
| 　　　├ 株主資本以外の項目の当期変動額（純額） | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:NetChangesOfItemsOtherThanShareholdersEquityRevaluationReserveForLand[@contextRef='CurrentYearNonConsolidatedDuration']` | 4 |  |
| 　　　├ 当期変動額合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:TotalChangesOfItemsDuringThePeriodRevaluationReserveForLand[@contextRef='CurrentYearNonConsolidatedDuration']` | 4 |  |
| 　　├ 当期末残高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:RevaluationReserveForLand[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　├ 為替換算調整勘定 | （抽象要素。XBRL ファクトなし） | 2 | Y |
| 　　├ 為替換算調整勘定 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ForeignCurrencyTranslationAdjustment[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 当期変動額 | （抽象要素。XBRL ファクトなし） | 3 | Y |
| 　　　├ 在外連結子会社等の株式の売却による増減 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:SalesOfStockOfForeignConsolidatedSubsidiariesFTA[@contextRef='CurrentYearNonConsolidatedDuration']` | 4 |  |
| 　　　├ 連結範囲の変動に伴う為替換算調整勘定の増減 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ChangeOfScopeOfConsolidationForeignCurrencyTranslationAdjustmentFTA[@contextRef='CurrentYearNonConsolidatedDuration']` | 4 |  |
| 　　　├ 純資産の部に直接計上された為替換算調整勘定の増減 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:InsertedDirectlyIntoNetAssetsForeignCurrencyTranslationAdjustmentFTA[@contextRef='CurrentYearNonConsolidatedDuration']` | 4 |  |
| 　　　├ 株主資本以外の項目の当期変動額（純額） | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:NetChangesOfItemsOtherThanShareholdersEquityFTA[@contextRef='CurrentYearNonConsolidatedDuration']` | 4 |  |
| 　　　├ 当期変動額合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:TotalChangesOfItemsDuringThePeriodFTA[@contextRef='CurrentYearNonConsolidatedDuration']` | 4 |  |
| 　├ 評価・換算差額等合計 | （抽象要素。XBRL ファクトなし） | 2 | Y |
| 　　├ 当期首残高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ValuationAndTranslationAdjustments[@contextRef='Prior1YearNonConsolidatedInstant']` | 3 |  |
| 　　├ 在外子会社の会計処理の変更に伴う増減 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:EffectOfChangesInAccountingPoliciesAppliedToForeignSubsidiariesVTA[@contextRef='CurrentYearNonConsolidatedDuration']` | 3 |  |
| 　　├ 当期変動額 | （抽象要素。XBRL ファクトなし） | 3 | Y |
| 　　　├ その他有価証券の売却による増減 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:SalesOfAvailableForSaleSecuritiesVTA[@contextRef='CurrentYearNonConsolidatedDuration']` | 4 |  |
| 　　　├ その他有価証券の減損処理による増減 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ImpairmentOfAvailableForSaleSecuritiesVTA[@contextRef='CurrentYearNonConsolidatedDuration']` | 4 |  |
| 　　　├ 純資産の部に直接計上されたその他有価証券評価差額金の増減 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:InsertedDirectlyIntoNetAssetsValuationDifferenceOnAvailableForSaleSecuritiesVTA[@contextRef='CurrentYearNonConsolidatedDuration']` | 4 |  |
| 　　　├ 連結子会社の増資による持分の増減 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:CapitalIncreaseOfConsolidatedSubsidiariesVTA[@contextRef='CurrentYearNonConsolidatedDuration']` | 4 |  |
| 　　　├ ヘッジ対象の損益認識による増減 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:RealizedGainOrLossOnHedgedObjectVTA[@contextRef='CurrentYearNonConsolidatedDuration']` | 4 |  |
| 　　　├ ヘッジ会計の終了による増減 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ClosingOfHedgingVTA[@contextRef='CurrentYearNonConsolidatedDuration']` | 4 |  |
| 　　　├ 純資産の部に直接計上された繰延ヘッジ損益の増減 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:InsertedDirectlyIntoNetAssetsDeferredGainsOrLossesOnHedgesVTA[@contextRef='CurrentYearNonConsolidatedDuration']` | 4 |  |
| 　　　├ 在外連結子会社等の株式の売却による増減 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:SalesOfStockOfForeignConsolidatedSubsidiariesVTA[@contextRef='CurrentYearNonConsolidatedDuration']` | 4 |  |
| 　　　├ 連結範囲の変動に伴う為替換算調整勘定の増減 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ChangeOfScopeOfConsolidationForeignCurrencyTranslationAdjustmentVTA[@contextRef='CurrentYearNonConsolidatedDuration']` | 4 |  |
| 　　　├ 純資産の部に直接計上された為替換算調整勘定の増減 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:InsertedDirectlyIntoNetAssetsForeignCurrencyTranslationAdjustmentVTA[@contextRef='CurrentYearNonConsolidatedDuration']` | 4 |  |
| 　　　├ 土地再評価差額金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfRevaluationReserveForLandVTA[@contextRef='CurrentYearNonConsolidatedDuration']` | 4 |  |
| 　　　├ 株主資本以外の項目の当期変動額（純額） | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:NetChangesOfItemsOtherThanShareholdersEquityVTA[@contextRef='CurrentYearNonConsolidatedDuration']` | 4 |  |
| 　　　├ 当期変動額合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:TotalChangesOfItemsDuringThePeriodVTA[@contextRef='CurrentYearNonConsolidatedDuration']` | 4 |  |
| 　　├ 当期末残高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ValuationAndTranslationAdjustments[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| ├ 新株予約権 | （抽象要素。XBRL ファクトなし） | 1 | Y |
| 　├ 当期首残高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:SubscriptionRightsToShares[@contextRef='Prior1YearNonConsolidatedInstant']` | 2 |  |
| 　├ 当期変動額 | （抽象要素。XBRL ファクトなし） | 2 | Y |
| 　　├ 新株の発行（新株予約権の行使） | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:IssuanceOfNewSharesExerciseOfSubscriptionRightsToSharesSRS[@contextRef='CurrentYearNonConsolidatedDuration']` | 3 |  |
| 　　├ 新株予約権の発行 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:IssuanceOfSubscriptionRightsToSharesSRS[@contextRef='CurrentYearNonConsolidatedDuration']` | 3 |  |
| 　　├ 新株予約権の取得 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:PurchaseOfSubscriptionRightsToSharesSRS[@contextRef='CurrentYearNonConsolidatedDuration']` | 3 |  |
| 　　├ 新株予約権の行使 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ExerciseOfSubscriptionRightsToSharesSRS[@contextRef='CurrentYearNonConsolidatedDuration']` | 3 |  |
| 　　├ 新株予約権の失効 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:LapseOfSubscriptionRightsToSharesSRS[@contextRef='CurrentYearNonConsolidatedDuration']` | 3 |  |
| 　　├ 自己新株予約権の消却 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:RetirementOfTreasurySubscriptionRightsToSharesSRS[@contextRef='CurrentYearNonConsolidatedDuration']` | 3 |  |
| 　　├ 自己新株予約権の処分 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:DisposalOfTreasurySubscriptionRightsToSharesSRS[@contextRef='CurrentYearNonConsolidatedDuration']` | 3 |  |
| 　　├ 株主資本以外の項目の当期変動額（純額） | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:NetChangesOfItemsOtherThanShareholdersEquitySRS[@contextRef='CurrentYearNonConsolidatedDuration']` | 3 |  |
| 　　├ 当期変動額合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:TotalChangesOfItemsDuringThePeriodSRS[@contextRef='CurrentYearNonConsolidatedDuration']` | 3 |  |
| 　├ 当期末残高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:SubscriptionRightsToShares[@contextRef='CurrentYearNonConsolidatedInstant']` | 2 |  |
| ├ 少数株主持分 | （抽象要素。XBRL ファクトなし） | 1 | Y |
| 　├ 少数株主持分 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:MinorityInterests[@contextRef='CurrentYearNonConsolidatedInstant']` | 2 |  |
| 　├ 在外子会社の会計処理の変更に伴う増減 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:EffectOfChangesInAccountingPoliciesAppliedToForeignSubsidiariesMI[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| 　├ 当期変動額 | （抽象要素。XBRL ファクトなし） | 2 | Y |
| 　　├ 剰余金の配当 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:DividendsFromSurplusMI[@contextRef='CurrentYearNonConsolidatedDuration']` | 3 |  |
| 　　├ その他有価証券の売却による増減 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:SalesOfAvailableForSaleSecuritiesMI[@contextRef='CurrentYearNonConsolidatedDuration']` | 3 |  |
| 　　├ 純資産の部に直接計上されたその他有価証券評価差額金の増減 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:InsertedDirectlyIntoNetAssetsValuationDifferenceOnAvailableForSaleSecuritiesMI[@contextRef='CurrentYearNonConsolidatedDuration']` | 3 |  |
| 　　├ 連結子会社の増資による持分の増減 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:CapitalIncreaseOfConsolidatedSubsidiariesMI[@contextRef='CurrentYearNonConsolidatedDuration']` | 3 |  |
| 　　├ 連結子会社の増加による少数株主持分の増減 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:IncreaseOfConsolidatedSubsidiariesMI[@contextRef='CurrentYearNonConsolidatedDuration']` | 3 |  |
| 　　├ 連結子会社の減少による少数株主持分の増減 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:DecreaseOfConsolidatedSubsidiariesMI[@contextRef='CurrentYearNonConsolidatedDuration']` | 3 |  |
| 　　├ 連結子会社株式の取得による持分の増減 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:PurchaseOfSharesOfConsolidatedSubsidiariesMI[@contextRef='CurrentYearNonConsolidatedDuration']` | 3 |  |
| 　　├ 連結子会社株式の売却による持分の増減 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:SalesOfSharesOfConsolidatedSubsidiariesMI[@contextRef='CurrentYearNonConsolidatedDuration']` | 3 |  |
| 　　├ 少数株主利益 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:MinorityInterestsInIncomeMI[@contextRef='CurrentYearNonConsolidatedDuration']` | 3 |  |
| 　　├ 株主資本以外の項目の当期変動額（純額） | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:NetChangesOfItemsOtherThanShareholdersEquityMI[@contextRef='CurrentYearNonConsolidatedDuration']` | 3 |  |
| 　　├ 当期変動額合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:TotalChangesOfItemsDuringThePeriodMI[@contextRef='CurrentYearNonConsolidatedDuration']` | 3 |  |
| ├ 基金 | （抽象要素。XBRL ファクトなし） | 1 | Y |
| 　├ 当期首残高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:FundMED[@contextRef='Prior1YearNonConsolidatedInstant']` | 2 |  |
| 　├ 当期変動額 | （抽象要素。XBRL ファクトなし） | 2 | Y |
| 　　├ 当期変動額合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:TotalChangesOfItemsDuringThePeriodFM[@contextRef='CurrentYearNonConsolidatedDuration']` | 3 |  |
| 　├ 当期末残高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:FundMED[@contextRef='CurrentYearNonConsolidatedInstant']` | 2 |  |
| ├ 純資産合計 | （抽象要素。XBRL ファクトなし） | 1 | Y |
| 　├ 当期首残高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:NetAssets[@contextRef='Prior1YearNonConsolidatedInstant']` | 2 |  |
| 　├ 会計方針の変更による累積的影響額 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:CumulativeEffectOfChangesInAccountingPoliciesNA[@contextRef='CurrentYearNonConsolidatedInstant']` | 2 |  |
| 　├ 遡及処理後当期首残高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:NetAssetsAsRestated[@contextRef='CurrentYearNonConsolidatedInstant']` | 2 |  |
| 　├ 在外子会社の会計処理の変更に伴う増減 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:EffectOfChangesInAccountingPoliciesAppliedToForeignSubsidiariesNA[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| 　├ 当期変動額 | （抽象要素。XBRL ファクトなし） | 2 | Y |
| 　　├ 新株の発行 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:IssuanceOfNewSharesNA[@contextRef='CurrentYearNonConsolidatedDuration']` | 3 |  |
| 　　├ 新株の発行（新株予約権の行使） | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:IssuanceOfNewSharesExerciseOfSubscriptionRightsToSharesNA[@contextRef='CurrentYearNonConsolidatedDuration']` | 3 |  |
| 　　├ 剰余金（その他資本剰余金）の配当 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:DividendsFromSurplusOtherCapitalSurplusNA[@contextRef='CurrentYearNonConsolidatedDuration']` | 3 |  |
| 　　├ 剰余金の配当 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:DividendsFromSurplusNA[@contextRef='CurrentYearNonConsolidatedDuration']` | 3 |  |
| 　　├ 当期純利益 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:NetIncomeNA[@contextRef='CurrentYearNonConsolidatedDuration']` | 3 |  |
| 　　├ 自己株式の取得 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:PurchaseOfTreasuryStockNA[@contextRef='CurrentYearNonConsolidatedDuration']` | 3 |  |
| 　　├ 自己株式の処分 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:DisposalOfTreasuryStockNA[@contextRef='CurrentYearNonConsolidatedDuration']` | 3 |  |
| 　　├ 自己株式の消却 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:RetirementOfTreasuryStockNA[@contextRef='CurrentYearNonConsolidatedDuration']` | 3 |  |
| 　　├ 持分法適用会社に対する持分変動に伴う自己株式の増減 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ChangeInEquityInAffiliatesAccountedForByEquityMethodTreasuryStockNA[@contextRef='CurrentYearNonConsolidatedDuration']` | 3 |  |
| 　　├ 連結範囲の変動 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ChangeOfScopeOfConsolidationNA[@contextRef='CurrentYearNonConsolidatedDuration']` | 3 |  |
| 　　├ 持分法の適用範囲の変動 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ChangeOfScopeOfEquityMethodNA[@contextRef='CurrentYearNonConsolidatedDuration']` | 3 |  |
| 　　├ 合併による増加 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:IncreaseByMergerNA[@contextRef='CurrentYearNonConsolidatedDuration']` | 3 |  |
| 　　├ 会社分割による増加 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:IncreaseByCorporateDivisionNA[@contextRef='CurrentYearNonConsolidatedDuration']` | 3 |  |
| 　　├ 株式交換による増加 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:IncreaseByShareExchangesNA[@contextRef='CurrentYearNonConsolidatedDuration']` | 3 |  |
| 　　├ 株式移転による増加 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:IncreaseByShareTransfersNA[@contextRef='CurrentYearNonConsolidatedDuration']` | 3 |  |
| 　　├ 分割型の会社分割による減少 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:DecreaseByCorporateDivisionSplitOffTypeNA[@contextRef='CurrentYearNonConsolidatedDuration']` | 3 |  |
| 　　├ 資本金から準備金への振替 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:TransferToLegalCapitalSurplusFromCapitalStockNA[@contextRef='CurrentYearNonConsolidatedDuration']` | 3 |  |
| 　　├ 資本金から剰余金への振替 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:TransferToOtherCapitalSurplusFromCapitalStockNA[@contextRef='CurrentYearNonConsolidatedDuration']` | 3 |  |
| 　　├ 準備金から資本金への振替 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:TransferToCapitalStockFromLegalCapitalSurplusNA[@contextRef='CurrentYearNonConsolidatedDuration']` | 3 |  |
| 　　├ 準備金から剰余金への振替 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:TransferToOtherCapitalSurplusFromLegalCapitalSurplusNA[@contextRef='CurrentYearNonConsolidatedDuration']` | 3 |  |
| 　　├ 利益剰余金から資本剰余金への振替 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:TransferToCapitalSurplusFromRetainedEarningsNA[@contextRef='CurrentYearNonConsolidatedDuration']` | 3 |  |
| 　　├ その他有価証券の売却による増減 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:SalesOfAvailableForSaleSecuritiesNA[@contextRef='CurrentYearNonConsolidatedDuration']` | 3 |  |
| 　　├ その他有価証券の減損処理による増減 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ImpairmentOfAvailableForSaleSecuritiesNA[@contextRef='CurrentYearNonConsolidatedDuration']` | 3 |  |
| 　　├ 純資産の部に直接計上されたその他有価証券評価差額金の増減 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:InsertedDirectlyIntoNetAssetsValuationDifferenceOnAvailableForSaleSecuritiesNA[@contextRef='CurrentYearNonConsolidatedDuration']` | 3 |  |
| 　　├ 連結子会社の増資による持分の増減 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:CapitalIncreaseOfConsolidatedSubsidiariesNA[@contextRef='CurrentYearNonConsolidatedDuration']` | 3 |  |
| 　　├ ヘッジ対象の損益認識による増減 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:RealizedGainOrLossOnHedgedObjectNA[@contextRef='CurrentYearNonConsolidatedDuration']` | 3 |  |
| 　　├ ヘッジ会計の終了による増減 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ClosingOfHedgingNA[@contextRef='CurrentYearNonConsolidatedDuration']` | 3 |  |
| 　　├ 純資産の部に直接計上された繰延ヘッジ損益の増減 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:InsertedDirectlyIntoNetAssetsDeferredGainsOrLossesOnHedgesNA[@contextRef='CurrentYearNonConsolidatedDuration']` | 3 |  |
| 　　├ 在外連結子会社等の株式の売却による増減 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:SalesOfStockOfForeignConsolidatedSubsidiariesNA[@contextRef='CurrentYearNonConsolidatedDuration']` | 3 |  |
| 　　├ 連結範囲の変動に伴う為替換算調整勘定の増減 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ChangeOfScopeOfConsolidationForeignCurrencyTranslationAdjustmentNA[@contextRef='CurrentYearNonConsolidatedDuration']` | 3 |  |
| 　　├ 純資産の部に直接計上された為替換算調整勘定の増減 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:InsertedDirectlyIntoNetAssetsForeignCurrencyTranslationAdjustmentNA[@contextRef='CurrentYearNonConsolidatedDuration']` | 3 |  |
| 　　├ 新株予約権の発行 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:IssuanceOfSubscriptionRightsToSharesNA[@contextRef='CurrentYearNonConsolidatedDuration']` | 3 |  |
| 　　├ 新株予約権の取得 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:PurchaseOfSubscriptionRightsToSharesNA[@contextRef='CurrentYearNonConsolidatedDuration']` | 3 |  |
| 　　├ 新株予約権の行使 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ExerciseOfSubscriptionRightsToSharesNA[@contextRef='CurrentYearNonConsolidatedDuration']` | 3 |  |
| 　　├ 新株予約権の失効 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:LapseOfSubscriptionRightsToSharesNA[@contextRef='CurrentYearNonConsolidatedDuration']` | 3 |  |
| 　　├ 自己新株予約権の消却 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:RetirementOfTreasurySubscriptionRightsToSharesNA[@contextRef='CurrentYearNonConsolidatedDuration']` | 3 |  |
| 　　├ 自己新株予約権の処分 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:DisposalOfTreasurySubscriptionRightsToSharesNA[@contextRef='CurrentYearNonConsolidatedDuration']` | 3 |  |
| 　　├ 連結子会社の増加による少数株主持分の増減 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:IncreaseOfConsolidatedSubsidiariesMinorityInterestsNA[@contextRef='CurrentYearNonConsolidatedDuration']` | 3 |  |
| 　　├ 連結子会社の減少による少数株主持分の増減 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:DecreaseOfConsolidatedSubsidiariesMinorityInterestsNA[@contextRef='CurrentYearNonConsolidatedDuration']` | 3 |  |
| 　　├ 連結子会社株式の取得による持分の増減 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:PurchaseOfSharesOfConsolidatedSubsidiariesNA[@contextRef='CurrentYearNonConsolidatedDuration']` | 3 |  |
| 　　├ 連結子会社株式の売却による持分の増減 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:SalesOfSharesOfConsolidatedSubsidiariesNA[@contextRef='CurrentYearNonConsolidatedDuration']` | 3 |  |
| 　　├ 少数株主利益 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:MinorityInterestsInIncomeNA[@contextRef='CurrentYearNonConsolidatedDuration']` | 3 |  |
| 　　├ 株主資本以外の項目の当期変動額（純額） | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:NetChangesOfItemsOtherThanShareholdersEquityNA[@contextRef='CurrentYearNonConsolidatedDuration']` | 3 |  |
| 　　├ 利益処分 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProfitAppropriationNA[@contextRef='CurrentYearNonConsolidatedDuration']` | 3 |  |
| 　　├ 役員賞与 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:DirectorsBonusesNA[@contextRef='CurrentYearNonConsolidatedDuration']` | 3 |  |
| 　　├ 利益準備金の積立 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionOfLegalRetainedEarningsNA[@contextRef='CurrentYearNonConsolidatedDuration']` | 3 |  |
| 　　├ 利益準備金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfLegalRetainedEarningsNA[@contextRef='CurrentYearNonConsolidatedDuration']` | 3 |  |
| 　　├ 欠損填補 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:DeficitDispositionNA[@contextRef='CurrentYearNonConsolidatedDuration']` | 3 |  |
| 　　├ 減資 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:CapitalReductionNA[@contextRef='CurrentYearNonConsolidatedDuration']` | 3 |  |
| 　　├ 資本準備金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfLegalCapitalSurplusNA[@contextRef='CurrentYearNonConsolidatedDuration']` | 3 |  |
| 　　├ 土地再評価差額金の取崩 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReversalOfRevaluationReserveForLandNA[@contextRef='CurrentYearNonConsolidatedDuration']` | 3 |  |
| 　　├ その他 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:OtherNA[@contextRef='CurrentYearNonConsolidatedDuration']` | 3 |  |
| 　　├ 当期変動額合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:TotalChangesOfItemsDuringThePeriodNA[@contextRef='CurrentYearNonConsolidatedDuration']` | 3 |  |
| 　├ 当期末残高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:NetAssets[@contextRef='CurrentYearNonConsolidatedInstant']` | 2 |  |
