# 決算書 B/S（貸借対照表）

<!-- markdownlint-disable MD013 -->

- sheet_code: `balance_sheet`
- 様式ID: `jpfr-t-cte_BalanceSheetsAbstract`
- 形式: XBRL（財務諸表タクソノミ）
- 取得API: `GET /hub/tax_return/corporate/sheet/financial_statements/{tax_return_id}/balance_sheet`
- レスポンス: XBRL インスタンスの XML
- xpath ルート: `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl`
- 共通仕様（xpath 表記の規則・名前空間・共通ヘッダ）は [`index.md`](./index.md) を参照。

## 勘定科目マッピング

| 勘定科目名 (name) | xpath | 階層 | 子 |
| --- | --- | --- | --- |
| **貸借対照表** | （抽象要素。XBRL ファクトなし） | 0 | Y |
| ├ 資産の部 | （抽象要素。XBRL ファクトなし） | 1 | Y |
| 　├ 流動資産 | （抽象要素。XBRL ファクトなし） | 2 | Y |
| 　　├ 当座資産 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:QuickAssets[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 現金及び預金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:CashAndDeposits[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 | Y |
| 　　　├ 現金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:CashHand[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 小口現金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:PettyCash[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 預金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:Deposits[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 | Y |
| 　　　　├ 当座預金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:CheckingAccounts[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 郵便振替貯金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:PostalTransferSavings[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 普通預金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:OrdinaryDeposit[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 郵便貯金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:PostalSavings[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 通知預金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:DepositsNotice[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 納税準備預金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:DepositsPreparationTaxPayment[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 貯蓄預金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:SavingsDeposit[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ その他の流動性預金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:OtherCurrentDeposit[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 定期預金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:TimeDeposits[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 定期積金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:PeriodicalDeposits[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 積立預金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:InstallmentDeposit[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 別段預金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:SpecialDeposits[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 特定金銭信託 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:SpecifiedMoneyTrust[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ その他の固定性預金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:OtherFixedDeposit[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ その他の預金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:OtherDeposits[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　├ 受取手形及び売掛金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:NotesAndAccountsReceivableTrade[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 | Y |
| 　　　├ 貸倒引当金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AllowanceForDoubtfulAccountsNotesAndAccountsReceivableTrade[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 受取手形及び売掛金（純額） | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:NotesAndAccountsReceivableTradeNet[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　├ 受取手形 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:NotesReceivableTrade[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 | Y |
| 　　　├ 貸倒引当金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AllowanceForDoubtfulAccountsNotesReceivableTrade[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 受取手形（純額） | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:NotesReceivableTradeNet[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　├ 完成工事未収入金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cns:AccountsReceivableFromCompletedConstructionContractsCNS[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 | Y |
| 　　　├ 貸倒引当金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:AllowanceForDoubtfulAccountsAccountsReceivableFromCompletedConstructionContractsCNS[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 完成工事未収入金(純額) | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:AccountsReceivableFromCompletedConstructionContractsCNSNet[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　├ 売掛金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AccountsReceivableTrade[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 | Y |
| 　　　├ 貸倒引当金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AllowanceForDoubtfulAccountsAccountsReceivableTrade[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 売掛金（純額） | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AccountsReceivableTradeNet[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　├ 兼業事業売掛金(純額) | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:AccountsReceivableOtherOperation[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ その他の売上債権 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:AccountReceivableOtherSales[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ その他の医業収益未収入金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:OtherAccountsReceivableMedicalRevenue[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ リース債権 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:LeaseReceivablesCA[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 | Y |
| 　　　├ 貸倒引当金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AllowanceForDoubtfulAccountsLeaseReceivablesCA[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ リース債権（純額） | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:LeaseReceivablesNetCA[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　├ その他の当座資産 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:OtherQuickAssets[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ リース投資資産 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:LeaseInvestmentAssetsCA[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 | Y |
| 　　　├ 貸倒引当金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AllowanceForDoubtfulAccountsLeaseInvestmentAssetsCA[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ リース投資資産（純額） | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:LeaseInvestmentAssetsNetCA[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　├ リース債権及びリース投資資産 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:LeaseReceivablesAndInvestmentAssetsCA[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 | Y |
| 　　　├ 貸倒引当金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AllowanceForDoubtfulAccountsLeaseReceivablesAndInvestmentAssetsCA[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ リース債権及びリース投資資産（純額） | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:LeaseReceivablesAndInvestmentAssetsNetCA[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　├ 仕掛品(半製品) | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:InventoriesWorkProcessSemiFinishedGoods[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 薬品 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:InventoriesMedicine[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 診療材料 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:InventoriesMedicalInstruments[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 給食材料 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:InventoriesFoodsForService[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 医療消耗備品 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:InventoriesMedicalSupplies[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 有価証券 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ShortTermInvestmentSecurities[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ たな卸資産 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:Inventories[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 建設業 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:InventoriesOtherInventoriesConstruction[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 | Y |
| 　　　├ 材料 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:InventoriesMaterialsConstruction[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 貯蔵品 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:InventoriesSuppliesConstruction[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　├ 兼業事業 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:InventoriesOtherOtherOperation[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 | Y |
| 　　　├ 商品 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:InventoriesMaterialsOtherOperation[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 貯蔵品 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:InventoriesSuppliesOtherOperation[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ その他たな卸資産 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:InventoriesOtherInventoriesOtherOperation[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　├ 原価差額 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:CostVariance[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 商品及び製品 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:MerchandiseAndFinishedGoods[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 商品 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:Merchandise[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 製品 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:FinishedGoods[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 副産物 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ByProduct[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 半製品 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:SemiFinishedGoods[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 原材料 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:RawMaterials[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 原材料及び貯蔵品 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:RawMaterialsAndSupplies[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 未着原材料 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:RawMaterialsInTransit[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 未成工事支出金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cns:CostsOnUncompletedConstructionContractsCNS[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 仕掛品 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:WorkInProcess[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 半成工事 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:PartlyFinishedWork[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 貯蔵品 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:Supplies[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 関係会社売掛金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AccountsReceivableFromSubsidiariesAndAffiliatesTrade[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 積送品 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:Consignment[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 販売用不動産 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:RealEstateForSale[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 仕掛販売用不動産 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:RealEstateForSaleInProcess[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 開発事業等支出金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:DevelopmentProjectsInProgress[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 不動産事業支出金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:CostsOnRealEstateBusiness[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 未成業務支出金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:CostsOnUncompletedServices[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 分譲土地建物 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:LandAndBuildingsForSaleInLots[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 分譲土地 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:LandForSaleInLots[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 割賦売掛金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AccountsReceivableInstallment[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 開発事業未収入金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AccountsReceivableDevelopmentBusiness[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 不動産事業未収入金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AccountsReceivableRealEstateBusiness[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 完成業務未収入金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AccountsReceivableCompletedOperation[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 加盟店貸勘定 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AccountsReceivableDueFromFranchisedStores[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 受取手形及び営業未収入金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:NotesAndOperatingAccountsReceivableCA[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 営業未収入金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:OperatingAccountsReceivableCA[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 電子記録債権 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ElectronicallyRecordedMonetaryClaimsOperatingCA[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 営業貸付金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:OperatingLoansCA[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 親会社株式 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:StocksOfParentCompanyCA[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 金銭の信託 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:MoneyHeldInTrustCA[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 営業投資有価証券 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:OperationalInvestmentSecuritiesCA[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ デリバティブ債権 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:DerivativesCA[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 | Y |
| 　　　├ 為替予約 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ForwardExchangeContractsCA[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 金利スワップ資産 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:InterestRateSwapAssetsCA[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 金利スワップ | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:InterestRateSwapCA[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 買建通貨オプション | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:PurchasedCurrencyOptionCA[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 通貨オプション | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:CurrencyOptionCA[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ オプション資産 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:OptionCA[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　├ 前払年金費用 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:PrepaidPensionCostCA[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 流動資産に属する資産に係る引当金 | （抽象要素。XBRL ファクトなし） | 3 | Y |
| 　　　├ 貸倒引当金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AllowanceForDoubtfulAccountsCA[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　├ 寄託有価証券 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:SecuritiesInDepositCA[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 商業手形 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:CommercialNotesCA[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 貸借取引貸付金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:LoansOnMarginTransactionCA[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 一般貸付金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:GeneralLoansCA[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 公社債貸付金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:BondFinancingCA[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 貸付有価証券 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:SecuritiesLentCA[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 借入有価証券代り金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:CollateralMoneyForSecuritiesBorrowedCA[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 買取債権 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:PurchasedReceivablesCA[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 前払金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AdvancePaymentsOther[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 前渡金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AdvancePaymentsTrade[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 前払費用 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:PrepaidExpenses[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 繰延税金資産 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:DeferredTaxAssetsCA[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 未収収益 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AccruedIncome[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 | Y |
| 　　　├ 未収利息 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AccruedInterest[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　├ その他の前払費用 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:OtherPrepaidExpenses[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ その他の未収収益 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:AccruedIncomeOther[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 医業外受取手形 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:NotesReceivableNonMedical[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 仮払消費税等 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:SuspenseAccountPaymentConsumptionTaxes[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 不渡手形 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:DishonoredDraft[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ その他の資産で1年内に現金化できると認められるもの | （抽象要素。XBRL ファクトなし） | 3 | Y |
| 　　　├ 株主、役員又は従業員に対する短期債権 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ShortTermClaimsOnShareholdersDirectorsOrEmployees[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 | Y |
| 　　　　├ 貸倒引当金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AllowanceForDoubtfulAccountsShortTermClaimsOnShareholdersDirectorsOrEmployees[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 株主、役員又は従業員に対する短期債権（純額） | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ShortTermClaimsOnShareholdersDirectorsOrEmployeesNet[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　├ 短期貸付金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ShortTermLoansReceivable[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 | Y |
| 　　　　├ 貸倒引当金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AllowanceForDoubtfulAccountsShortTermLoans[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 短期貸付金（純額） | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ShortTermLoansReceivableNet[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　├ 関係会社短期貸付金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ShortTermLoansReceivableToSubsidiariesAndAffiliates[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 | Y |
| 　　　　├ 貸倒引当金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AllowanceForDoubtfulAccountsShortTermLoansReceivableFromSubsidiariesAndAffiliates[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 関係会社短期貸付金（純額） | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ShortTermLoansReceivableToSubsidiariesAndAffiliatesNet[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　├ 関係会社未収入金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AccountsReceivableOtherFromSubsidiariesAndAffiliates[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 未収消費税等 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ConsumptionTaxesReceivable[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 未収還付法人税等 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:IncomeTaxesReceivable[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 営業外受取手形 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:NonOperatingNotesReceivable[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 営業外電子記録債権 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ElectronicallyRecordedMonetaryClaimsNonOperatingCA[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 1年内回収予定の長期貸付金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:CurrentPortionOfLongTermLoansReceivable[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 1年内回収予定の関係会社長期貸付金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:CurrentPortionOfLongTermLoansReceivableFromSubsidiariesAndAffiliates[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 1年内回収予定の差入保証金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:CurrentPortionOfGuaranteeDeposits[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ その他の未収入金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:OtherAccountsReceivable[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 関係会社預け金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:DepositPaidInSubsidiariesAndAffiliates[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 関係会社短期債権 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ShortTermReceivablesFromSubsidiariesAndAffiliates[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 金銭債権信託受益権 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:BeneficiaryRightOfAccountsReceivableInTrust[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 差入保証金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:GuaranteeDepositsCA[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 従業員に対する短期債権 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ShortTermClaimsOnEmployees[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 従業員に対する短期貸付金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ShortTermLoansToEmployees[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 信託受益権 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:TrustBeneficiaryRightCA[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 立替金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AdvancesPaid[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 仮払金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:SuspensePayments[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 預け金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:DepositsPaid[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　├ 未収入金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AccountsReceivableOther[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ その他 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:OtherCA[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 流動資産合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:CurrentAssets[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　├ 固定資産 | （抽象要素。XBRL ファクトなし） | 2 | Y |
| 　　├ 有形固定資産 | （抽象要素。XBRL ファクトなし） | 3 | Y |
| 　　　├ 建物 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:Buildings[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 | Y |
| 　　　　├ 減価償却累計額 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AccumulatedDepreciationBuildings[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 減損損失累計額 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AccumulatedImpairmentLossBuildings[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 減価償却累計額及び減損損失累計額 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AccumulatedDepreciationAndImpairmentLossBuildings[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 建物（純額） | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:BuildingsNet[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　├ 建物附属設備 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:BuildingsAndAccompanyingFacilities[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 | Y |
| 　　　　├ 減価償却累計額 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AccumulatedDepreciationBuildingsAndAccompanyingFacilities[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 減損損失累計額 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AccumulatedImpairmentLossBuildingsAndAccompanyingFacilities[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 減価償却累計額及び減損損失累計額 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AccumulatedDepreciationAndImpairmentLossBuildingsAndAccompanyingFacilities[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 建物附属設備（純額） | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:BuildingsAndAccompanyingFacilitiesNet[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　├ 構築物 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:Structures[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 | Y |
| 　　　　├ 減価償却累計額 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AccumulatedDepreciationStructures[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 減損損失累計額 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AccumulatedImpairmentLossStructures[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 減価償却累計額及び減損損失累計額 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AccumulatedDepreciationAndImpairmentLossStructures[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 構築物（純額） | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:StructuresNet[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　├ 建物及び構築物 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:BuildingsAndStructures[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 | Y |
| 　　　　├ 減価償却累計額 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AccumulatedDepreciationBuildingsAndStructures[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 減損損失累計額 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AccumulatedImpairmentLossBuildingsAndStructures[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 減価償却累計額及び減損損失累計額 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AccumulatedDepreciationAndImpairmentLossBuildingsAndStructures[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 建物及び構築物（純額） | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:BuildingsAndStructuresNet[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　├ 機械及び装置 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:MachineryAndEquipment[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 | Y |
| 　　　　├ 減価償却累計額 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AccumulatedDepreciationMachineryAndEquipment[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 減損損失累計額 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AccumulatedImpairmentLossMachineryAndEquipment[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 減価償却累計額及び減損損失累計額 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AccumulatedDepreciationAndImpairmentLossMachineryAndEquipment[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 機械及び装置（純額） | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:MachineryAndEquipmentNet[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　├ 機械装置及び運搬具 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:MachineryEquipmentAndVehicles[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 | Y |
| 　　　　├ 減価償却累計額 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AccumulatedDepreciationMachineryEquipmentAndVehicles[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 減損損失累計額 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AccumulatedImpairmentLossMachineryEquipmentAndVehicles[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 減価償却累計額及び減損損失累計額 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AccumulatedDepreciationAndImpairmentLossMachineryEquipmentAndVehicles[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 機械装置及び運搬具（純額） | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:MachineryEquipmentAndVehiclesNet[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　├ 船舶 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:Vessels[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 | Y |
| 　　　　├ 減価償却累計額 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AccumulatedDepreciationVessels[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 減損損失累計額 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AccumulatedImpairmentLossVessels[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 減価償却累計額及び減損損失累計額 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AccumulatedDepreciationAndImpairmentLossVessels[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 船舶（純額） | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:VesselsNet[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　├ 車両運搬具 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:Vehicles[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 | Y |
| 　　　　├ 減価償却累計額 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AccumulatedDepreciationVehicles[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 減損損失累計額 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AccumulatedImpairmentLossVehicles[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 減価償却累計額及び減損損失累計額 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AccumulatedDepreciationAndImpairmentLossVehicles[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 車両運搬具（純額） | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:VehiclesNet[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　├ 車両及び船舶 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:VehiclesVessels[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 車両運搬具及び工具器具備品 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:VehiclesToolsFurnitureAndFixtures[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 | Y |
| 　　　　├ 減価償却累計額 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AccumulatedDepreciationVehiclesToolsFurnitureAndFixtures[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 減損損失累計額 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AccumulatedImpairmentLossVehiclesToolsFurnitureAndFixtures[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 減価償却累計額及び減損損失累計額 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AccumulatedDepreciationAndImpairmentLossVehiclesToolsFurnitureAndFixtures[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 車両運搬具及び工具器具備品（純額） | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:VehiclesToolsFurnitureAndFixturesNet[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　├ 工具、器具及び備品 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ToolsFurnitureAndFixtures[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 | Y |
| 　　　　├ 減価償却累計額 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AccumulatedDepreciationToolsFurnitureAndFixtures[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 減損損失累計額 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AccumulatedImpairmentLossToolsFurnitureAndFixtures[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 減価償却累計額及び減損損失累計額 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AccumulatedDepreciationAndImpairmentLossToolsFurnitureAndFixtures[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 工具、器具及び備品（純額） | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ToolsFurnitureAndFixturesNet[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　├ 工具 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:ToolsGross[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 | Y |
| 　　　　├ 減価償却累計額 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:ToolsAccumulatedDepreciation[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 減損損失累計額 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:ToolsAccumulatedImpairment[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 減価償却累計額及び減損損失累計額 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:AccumulatedDepreciationAndImpairmentTools[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 工具(純額) | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:ToolsNet[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　├ 機械、運搬具及び工具器具備品 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:MachineryVehiclesToolsFurnitureAndFixtures[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 | Y |
| 　　　　├ 減価償却累計額 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AccumulatedDepreciationMachineryVehiclesToolsFurnitureAndFixtures[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 減損損失累計額 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AccumulatedImpairmentLossMachineryVehiclesToolsFurnitureAndFixtures[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 減価償却累計額及び減損損失累計額 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AccumulatedDepreciationAndImpairmentLossMachineryVehiclesToolsFurnitureAndFixtures[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 機械、運搬具及び工具器具備品（純額） | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:MachineryVehiclesToolsFurnitureAndFixturesNet[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　├ 器具備品 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:FurnitureFixturesGross[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 | Y |
| 　　　　├ 減価償却累計額 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:FurnitureFixturesAccumulatedDepreciation[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 減損損失累計額 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:FurnitureFixturesAccumulatedImpairment[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 減価償却累計額及び減損損失累計額 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:AccumulatedDepreciationAndImpairmentFurnitureFixtures[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 器具備品(純額) | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:FurnitureFixturesNet[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　├ 医療用器械備品 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:MedicalEquipmentFurnishings[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 放射性同位元素 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:Radioisotope[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 一括償却資産 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:LumpsumDepreciableAssetsGross[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 | Y |
| 　　　　├ 減価償却累計額 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:LumpsumDepreciableAssetsAccumulatedDepreciation[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 減価償却累計額及び減損損失累計額 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:AccumulatedDepreciationAndImpairmentLumpsumDepreciableAssets[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 一括償却資産(純額) | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:LumpsumDepreciableAssetsNet[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　├ リース資産 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:LeaseAssetsPPE[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 | Y |
| 　　　　├ 減価償却累計額 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AccumulatedDepreciationLeaseAssetsPPE[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 減損損失累計額 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AccumulatedImpairmentLossLeaseAssetsPPE[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 減価償却累計額及び減損損失累計額 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AccumulatedDepreciationAndImpairmentLossLeaseAssetsPPE[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ リース資産（純額） | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:LeaseAssetsNetPPE[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　├ 土地 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:Land[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ その他の非減価償却資産 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:NonDepreciableAssetsOther[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 建設仮勘定 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ConstructionInProgress[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ その他 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:OtherPPE[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 | Y |
| 　　　　├ 減価償却累計額 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AccumulatedDepreciationOtherPPE[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 減損損失累計額 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AccumulatedImpairmentLossOtherPPE[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 減価償却累計額及び減損損失累計額 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AccumulatedDepreciationAndImpairmentLossOtherPPE[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ その他（純額） | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:OtherNetPPE[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　├ その他の有形固定資産で流動資産または投資たる資産に属しないもの | （抽象要素。XBRL ファクトなし） | 4 | Y |
| 　　　　├ 航空機 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:Aircraft[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 | Y |
| 　　　　　├ 減価償却累計額 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AccumulatedDepreciationAircraft[@contextRef='CurrentYearNonConsolidatedInstant']` | 6 |  |
| 　　　　　├ 航空機（純額） | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AircraftNet[@contextRef='CurrentYearNonConsolidatedInstant']` | 6 |  |
| 　　　　├ 山林 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:MountainForests[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 貸与資産 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AssetsForRent[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 | Y |
| 　　　　　├ 減価償却累計額 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AccumulatedDepreciationAssetsForRent[@contextRef='CurrentYearNonConsolidatedInstant']` | 6 |  |
| 　　　　　├ 貸与資産（純額） | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AssetsForRentNet[@contextRef='CurrentYearNonConsolidatedInstant']` | 6 |  |
| 　　　　├ 賃貸不動産 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:RealEstateForRent[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 | Y |
| 　　　　　├ 減価償却累計額 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AccumulatedDepreciationRealEstateForRent[@contextRef='CurrentYearNonConsolidatedInstant']` | 6 |  |
| 　　　　　├ 賃貸不動産（純額） | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:RealEstateForRentNet[@contextRef='CurrentYearNonConsolidatedInstant']` | 6 |  |
| 　　　　├ 立木 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:TreesPPE[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ その他の設備 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:OtherFacilitiesPPE[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ コース勘定 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:GolfCourses[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　├ 減価償却累計額 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AccumulatedDepreciationPPEByGroup[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 減損損失累計額 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AccumulatedImpairmentLossPPEByGroup[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 減価償却累計額及び減損損失累計額 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AccumulatedDepreciationAndImpairmentLossPPEByGroup[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 有形固定資産合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:PropertyPlantAndEquipment[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　├ 無形固定資産 | （抽象要素。XBRL ファクトなし） | 3 | Y |
| 　　　├ のれん | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:Goodwill[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 工業所有権 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:IndustrialProperty[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 特許権 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:PatentRight[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 借地権 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:LeaseholdRight[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 商標権 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:RightOfTrademark[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 実用新案権 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:UtilityModelRight[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 意匠権 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:DesignRight[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 鉱業権 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:MiningRight[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 漁業権 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:FisheryRight[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ ダム使用権 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:RightUseDam[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ ソフトウエア | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:Software[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ ソフトウエア仮勘定 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:SoftwareInProgress[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 育成者権 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:RaiserRights[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 専用側線利用権 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:RightUseExclusiveSidetrack[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 鉄道軌道連絡通行施設利用権 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:RightUseRailroadConnectingFacility[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 電気ガス供給施設利用権 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:RightUseElectricityGasSupplyFacility[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 熱供給施設利用権 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:RightUseHeatSupplyFacility[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 工業用水道施設利用権 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:RightUseIndustrialWaterSupplySystem[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ リース資産 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:LeaseAssetsIA[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 仕掛研究開発 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:InProcessResearchAndDevelopmentIA[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ その他の無形資産で流動資産又は投資たる資産に属しないもの | （抽象要素。XBRL ファクトなし） | 4 | Y |
| 　　　　├ 施設利用権 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:RightOfUsingFacilitiesIA[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 電話加入権 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:TelephoneSubscriptionRight[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 電気供給施設利用権 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:RightOfUsingElectricSupplyFacilities[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 電気通信施設利用権 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:RightOfUsingTelecommunicationFacilities[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 電信電話専用施設利用権 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:RightOfUsingTelephoneAndTelegraphFacilities[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 公共施設利用権 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:RightOfUsingPublicFacilities[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 水道施設利用権 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:RightOfUsingWaterFacilities[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ その他の施設利用権 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:RightOfUsingOtherFacilities[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 特許実施権 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:RightOfUsingPatent[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 水利権 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:WaterRight[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 版権 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:CopyrightPublishing[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 著作権 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:Copyright[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　├ その他 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:OtherIA[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 無形固定資産合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:IntangibleAssets[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　├ 投資その他の資産 | （抽象要素。XBRL ファクトなし） | 3 | Y |
| 　　　├ 投資有価証券 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:InvestmentSecurities[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 投資公債 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:InvestmentSecuritiesPublicBond[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 貸付信託 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:InvestmentSecuritiesLoanTrust[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 投資信託 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:InvestmentSecuritiesInvestmentTrust[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 子会社株式・子会社出資金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:EquitySecuritiesInvestmentsSubsidiaries[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 関係会社株式 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:StocksOfSubsidiariesAndAffiliates[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 関係会社社債 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:BondsOfSubsidiariesAndAffiliates[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 関係会社株式その他流動資産に属しない有価証券 | （抽象要素。XBRL ファクトなし） | 4 | Y |
| 　　　　├ 営業投資有価証券 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:OperationalInvestmentSecuritiesIOA[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 関係会社長期投資 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:LongTermInvestmentForSubsidiariesAndAffiliates[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　├ その他の関係会社有価証券 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:InvestmentsInOtherSecuritiesOfSubsidiariesAndAffiliates[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 出資金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:InvestmentsInCapital[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 営業出資金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:OperatingInvestmentsInCapital[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 匿名組合出資金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:InvestmentsInSilentPartnership[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 関係会社出資金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:InvestmentsInCapitalOfSubsidiariesAndAffiliates[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 長期貸付金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:LongTermLoansReceivable[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 | Y |
| 　　　　├ 貸倒引当金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AllowanceForDoubtfulAccountsLongTermLoansReceivable[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 長期貸付金（純額） | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:LongTermLoansReceivableNet[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　├ 関係会社長期貸付金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:LongTermLoansReceivableFromSubsidiariesAndAffiliates[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 | Y |
| 　　　　├ 貸倒引当金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AllowanceForDoubtfulAccountsLongTermLoansReceivableFromSubsidiariesAndAffiliates[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 関係会社長期貸付金（純額） | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:LongTermLoansReceivableFromSubsidiariesAndAffiliatesNet[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　├ 株主、役員又は従業員に対する長期貸付金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:LongTermLoansReceivableFromShareholdersDirectorsOrEmployees[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 | Y |
| 　　　　├ 貸倒引当金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AllowanceForDoubtfulAccountsLongTermLoansReceivableFromShareholdersDirectorsOrEmployees[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 株主、役員又は従業員に対する長期貸付金（純額） | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:LongTermLoansReceivableFromShareholdersDirectorsOrEmployeesNet[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　├ 従業員に対する長期貸付金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:LongTermLoansReceivableFromEmployees[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 | Y |
| 　　　　├ 貸倒引当金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AllowanceForDoubtfulAccountsLongTermLoansReceivableFromEmployees[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 従業員に対する長期貸付金（純額） | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:LongTermLoansReceivableFromEmployeesNet[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　├ 長期営業外受取手形 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:LongTermNotesReceivableOtherGross[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 | Y |
| 　　　　├ 貸倒引当金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:LongTermNotesReceivableOtherAllowanceDoubtfulAccounts[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 長期営業外受取手形(純額) | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:LongTermNotesReceivableOtherNet[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　├ 長期貸付金 | （抽象要素。XBRL ファクトなし） | 4 | Y |
| 　　　　├ 役員及び従業員に対する長期貸付金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:LongTermLoansReceivableFromDirectorsAndEmployees[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 役員に対する長期貸付金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:LongTermLoansReceivableFromDirectors[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　├ 医業外受取手形 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:LongTermNotesReceivableNonMedical[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 長期前払費用 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:LongTermPrepaidExpenses[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ その他の長期前払費用 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:OtherLongTermPrepaidExpenses[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 長期未収収益 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:LongTermAccruedRevenue[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 繰延税金資産 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:DeferredTaxAssetsIOA[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 投資固定資産 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:FixedAssetsInvestment[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 権利金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:Foregift[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ リサイクル預託金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:DepositRecycling[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ その他の保険積立金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:OtherPrepaidInsurance[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 繰延ヘッジ損失 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:LongTermInvestmentsDeferredHedgeAssets[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 前各号に掲げられるものの外、流動資産、有形固定資産、無形固定資産又は繰延資産に属するもの以外の長期資産 | （抽象要素。XBRL ファクトなし） | 4 | Y |
| 　　　　├ 親会社株式 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:StocksOfParentCompanyIOA[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 破産更生債権等 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ClaimsProvableInBankruptcyClaimsProvableInRehabilitationAndOther[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 | Y |
| 　　　　　├ 貸倒引当金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AllowanceForDoubtfulAccountsClaimsInBankruptcyReorganizationClaimsAndOther[@contextRef='CurrentYearNonConsolidatedInstant']` | 6 |  |
| 　　　　　├ 破産更生債権等（純額） | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ClaimsProvableInBankruptcyClaimsProvableInRehabilitationAndOtherNet[@contextRef='CurrentYearNonConsolidatedInstant']` | 6 |  |
| 　　　　├ 長期前払消費税等 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:LongTermPrepaidConsumptionTaxes[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 前払年金費用 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:PrepaidPensionCostIOA[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 再評価に係る繰延税金資産 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:DeferredTaxAssetsForLandRevaluation[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 投資不動産 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:RealEstateForInvestment[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 | Y |
| 　　　　　├ 減価償却累計額 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AccumulatedDepreciationRealEstateForInvestment[@contextRef='CurrentYearNonConsolidatedInstant']` | 6 |  |
| 　　　　　├ 減損損失累計額 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AccumulatedImpairmentLossRealEstateForInvestment[@contextRef='CurrentYearNonConsolidatedInstant']` | 6 |  |
| 　　　　　├ 減価償却累計額及び減損損失累計額 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AccumulatedDepreciationAndImpairmentLossRealEstateForInvestment[@contextRef='CurrentYearNonConsolidatedInstant']` | 6 |  |
| 　　　　　├ 投資不動産（純額） | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:RealEstateForInvestmentNet[@contextRef='CurrentYearNonConsolidatedInstant']` | 6 |  |
| 　　　　├ 不動産信託受益権 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:BeneficiaryRightOfRealEstateInTrust[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 信託土地 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:LandInTrust[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 信託建物 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:BuildingsInTrust[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ リース投資資産 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:LeaseInvestmentAssetsIOA[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ デリバティブ債権 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:DerivativesIOA[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 | Y |
| 　　　　　├ 為替予約 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ForwardExchangeContractsIOA[@contextRef='CurrentYearNonConsolidatedInstant']` | 6 |  |
| 　　　　　├ 金利スワップ資産 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:InterestRateSwapAssetsIOA[@contextRef='CurrentYearNonConsolidatedInstant']` | 6 |  |
| 　　　　　├ 金利スワップ | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:InterestRateSwapIOA[@contextRef='CurrentYearNonConsolidatedInstant']` | 6 |  |
| 　　　　　├ 買建通貨オプション | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:PurchasedCurrencyOptionIOA[@contextRef='CurrentYearNonConsolidatedInstant']` | 6 |  |
| 　　　　　├ 通貨オプション | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:CurrencyOptionIOA[@contextRef='CurrentYearNonConsolidatedInstant']` | 6 |  |
| 　　　　　├ オプション資産 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:OptionIOA[@contextRef='CurrentYearNonConsolidatedInstant']` | 6 |  |
| 　　　　├ 長期預け金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:LongTermDeposits[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 長期預金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:LongTermTimeDeposits[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 保険積立金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:InsuranceFunds[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 生命保険積立金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:LifeInsuranceFunds[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 団体生命保険金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:GroupLifeInsurance[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 会員権 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:Membership[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 | Y |
| 　　　　　├ ゴルフ会員権 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:GolfClubMembership[@contextRef='CurrentYearNonConsolidatedInstant']` | 6 |  |
| 　　　　　├ 施設利用会員権 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:FacilityMembership[@contextRef='CurrentYearNonConsolidatedInstant']` | 6 |  |
| 　　　　├ 差入保証金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:GuaranteeDepositsIOA[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 関係会社長期未収入金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:LongTermAccountsReceivableFromSubsidiariesAndAffiliates[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 敷金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:LeaseDepositsIOA[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 敷金及び保証金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:LeaseAndGuaranteeDeposits[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 固定化営業債権 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:BadDebts[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 事業保険積立金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:BusinessInsuranceFunds[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 事業保険金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:BusinessInsurance[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 入会金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AdmissionFeeIOA[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 入会保証金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:DepositsOnAdmission[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 信託受益権 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:TrustBeneficiaryRightIOA[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 長期営業外未収入金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:LongTermNonOperatingAccountsReceivable[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 長期未収入金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:LongTermAccountsReceivableOther[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 建設協力金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ConstructionAssistanceFundReceivables[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 店舗賃借仮勘定 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:DepositsForStoresInPreparation[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 役員退職積立金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:FundForRetirementBenefitsForDirectorsIOA[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 役員に対する保険積立金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:InsuranceFundsForDirectors[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 長期投資 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:LongTermInvestments[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 投資その他の資産に属する資産に係る引当金 | （抽象要素。XBRL ファクトなし） | 5 | Y |
| 　　　　　├ 貸倒引当金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AllowanceForDoubtfulAccountsIOAByGroup[@contextRef='CurrentYearNonConsolidatedInstant']` | 6 |  |
| 　　　　　├ 投資損失引当金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AllowanceForInvestmentLoss[@contextRef='CurrentYearNonConsolidatedInstant']` | 6 |  |
| 　　　├ 投資その他の資産 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:InvestmentsAndOtherAssetsGross[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ その他 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:OtherIOA[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 減価償却累計額 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AccumulatedDepreciationIOAByGroup[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 減損損失累計額 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AccumulatedImpairmentLossIOAByGroup[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 減価償却累計額及び減損損失累計額 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AccumulatedDepreciationAndImpairmentLossIOAByGroup[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 投資その他の資産合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:InvestmentsAndOtherAssets[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　├ 固定資産合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:NoncurrentAssets[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　├ 繰延資産 | （抽象要素。XBRL ファクトなし） | 2 | Y |
| 　　├ 創立費 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:DeferredOrganizationExpensesDA[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 開業費 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:BusinessCommencementExpensesDA[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 株式交付費 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:StockIssuanceCostDA[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 新株発行費 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:StockIssuanceCost[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 社債発行費 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:BondIssuanceCostDA[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 開発費 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:DevelopmentExpensesDA[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ その他 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:OtherDA[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 繰延資産合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:DeferredAssets[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　├ 資産合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:Assets[@contextRef='CurrentYearNonConsolidatedInstant']` | 2 |  |
| ├ 負債の部 | （抽象要素。XBRL ファクトなし） | 1 | Y |
| 　├ 流動負債 | （抽象要素。XBRL ファクトなし） | 2 | Y |
| 　　├ 支払手形 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:NotesPayableTrade[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 買掛金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AccountsPayableTrade[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 工事未払金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cns:AccountsPayableForConstructionContractsCNS[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 兼業事業買掛金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:AccountsPayableOtherOperation[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ その他の買入債務 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:OtherAccountsPayableTrade[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 短期借入金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ShortTermLoansPayable[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ リース債務 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:LeaseObligationsCL[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 資産除去債務 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AssetRetirementObligationsCL[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 未払金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AccountsPayableOther[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 未払費用 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AccruedExpenses[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 未払法人税等 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:IncomeTaxesPayable[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 繰延税金負債 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:DeferredTaxLiabilitiesCL[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 未成工事受入金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cns:AdvancesReceivedOnUncompletedConstructionContractsCNS[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 前受金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AdvancesReceived[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 預り金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:DepositsReceived[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 前受収益 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:UnearnedRevenue[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ １年以内償還予定の新株引受権付社債 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:BondsWarrantsCurrentPortion[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ １年以内償還予定の新株予約権付社債 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:BondsStockPurchaseWarrantCurrentPortion[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ １年以内返済予定のリース債務 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:LeaseLiabilitiesCurrentPortion[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 医業外支払手形 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:NotesPayableNonMedical[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 未払役員賞与 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:BonusPayableOfficers[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 未払給与 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:AccruedSalaries[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 未払利息 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:AccruedAccruedExpensesInterest[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ その他の未払費用 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:AccruedAccruedExpensesOther[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 未払事業税 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:EnterpriseTaxPayable[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ その他の未払税金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:OtherTaxesPayable[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 預り保証金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:GuaranteeDepositsReceived[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 入院保証金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:HospitalizationGuaranteeDepositsReceived[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 割賦売上未実現利益 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:DeferredRevenueInstallmentSales[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 引当金 | （抽象要素。XBRL ファクトなし） | 3 | Y |
| 　　　├ 製品保証引当金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionForProductWarranties[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 賞与引当金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionForBonuses[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 役員賞与引当金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionForDirectorsBonuses[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 債務保証損失引当金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionForLossOnGuaranteesCL[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ ポイント引当金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionForPointCardCertificatesCL[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 売上割戻引当金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionForSalesRebates[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 工事損失引当金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionForLossOnConstructionContracts[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 完成工事補償引当金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionForWarrantiesForCompletedConstruction[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 店舗閉鎖損失引当金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionForLossOnStoreClosing[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 販売促進引当金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionForSalesPromotionExpenses[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 返品調整引当金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionForSalesReturns[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 受注損失引当金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionForLossOnOrderReceivedCL[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 関係会社整理損失引当金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionForLossOnLiquidationOfSubsidiariesAndAffiliatesCL[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 事業整理損失引当金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionForLossOnBusinessLiquidationCL[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 関係会社事業損失引当金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionForLossOnBusinessOfSubsidiariesAndAffiliatesCL[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 事業構造改善引当金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionForBusinessStructureImprovementCL[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 環境対策引当金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionForEnvironmentalMeasuresCL[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 訴訟損失引当金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionForLossOnLitigationCL[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 利息返還損失引当金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionForLossOnInterestRepaymentCL[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 偶発損失引当金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionForContingentLossCL[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ ローン保証引当金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionForGuaranteeForLoansCL[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 災害損失引当金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionForLossOnDisasterCL[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 損害補償損失引当金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:ReserveGuaranteeLoss[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 景品費引当金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:ReserveGiveawayExpense[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ その他の引当金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:OtherProvisionCL[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 引当金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionCL[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　├ 修繕引当金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionForRepairs[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 株主、役員又は従業員からの短期借入金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ShortTermLoansPayableToShareholdersDirectorsOrEmployees[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 従業員預り金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:DepositsReceivedFromEmployees[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 源泉預り金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:DepositsReceivedTaxesWithheld[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 特別預り金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:DepositsReceivedSpecialDepositReceived[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 社保預り金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:DepositsReceivedSocialInsuranceWithheld[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 支払手形及び買掛金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:NotesAndAccountsPayableTrade[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 営業未払金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:OperatingAccountsPayable[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 支払手形及び営業未払金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:NotesAndOperatingAccountsPayableTrade[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 電子記録債務 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ElectronicallyRecordedObligationsOperatingCL[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 業務未払金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AccountsPayableOperatingSpecific[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 受託販売未払金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AccountsPayableConsignment[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 不動産事業未払金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AccountsPayableRealEstate[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 加盟店借勘定 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:DueToFranchisedStores[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 商品券 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:GiftCertificates[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 未成業務受入金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AdvancesReceivedOnUncompletedContracts[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 不動産事業受入金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:DepositReceivedRealEstate[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 未払金及び未払費用 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AccountsPayableOtherAndAccruedExpenses[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ デリバティブ債務 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:DerivativesLiabilitiesCL[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 | Y |
| 　　　├ 為替予約 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ForwardExchangeContractsCL[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 金利スワップ負債 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:InterestRateSwapLiabilitiesCL[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 金利スワップ | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:InterestRateSwapCL[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 売建通貨オプション | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:SoldCurrencyOptionCL[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 通貨オプション | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:CurrencyOptionCL[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ オプション負債 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:OptionCL[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　├ 通常の取引に関連して発生する未払金又は預り金で一般の取引慣行として発生後短期間に支払われるもの | （抽象要素。XBRL ファクトなし） | 3 | Y |
| 　　　├ 未払事業所税 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AccruedBusinessOfficeTaxes[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 未払消費税等 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AccruedConsumptionTaxes[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 未払税金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AccruedTaxes[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 未払酒税 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AccruedAlcoholTax[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 関係会社預り金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:DepositsReceivedFromSubsidiariesAndAffiliates[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 未払代理店手数料 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AccruedAgencyCommission[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 1年内返還予定の預り保証金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:CurrentPortionOfGuaranteeDepositsReceived[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　├ その他の負債で1年内に支払又は返済されると認められるもの | （抽象要素。XBRL ファクトなし） | 3 | Y |
| 　　　├ 設備関係支払手形 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:NotesPayableFacilities[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 設備関係未払金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AccountsPayableFacilities[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 営業外支払手形 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:NotesPayableNonOperating[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 営業外電子記録債務 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ElectronicallyRecordedObligationsNonOperatingCL[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 短期社債 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ShortTermBondsPayable[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 関係会社短期借入金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ShortTermLoansPayableToSubsidiariesAndAffiliates[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ コマーシャル・ペーパー | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:CommercialPapersLiabilities[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 1年内償還予定の社債 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:CurrentPortionOfBonds[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 1年内返済予定の長期借入金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:CurrentPortionOfLongTermLoansPayable[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 1年内返済予定の関係会社長期借入金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:CurrentPortionOfLongTermLoansPayableToSubsidiariesAndAffiliates[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 1年内償還予定の転換社債 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:CurrentPortionOfConvertibleBonds[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 1年内償還予定の新株予約権付社債 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:CurrentPortionOfBondsWithSubscriptionRightsToShares[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 1年内期限到来予定のその他の固定負債 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:CurrentPortionOfOtherNoncurrentLiabilities[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 仮受金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:SuspenseReceipt[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 仮受消費税等 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:SuspenseReceiptOfConsumptionTaxes[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 未払賞与 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AccruedBonuses[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 未払役員報酬 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:DirectorsCompensationPayable[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 未払配当金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:DividendsPayable[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 株主、役員又は従業員からの預り金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:DepositsReceivedFromShareholdersDirectorsOrEmployees[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　├ 圧縮未決算特別勘定 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:SpecialSuspenseAccountForReductionEntry[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 新株引受権 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:SubscriptionRightsToSharesPrior[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ リース資産減損勘定 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AccumulatedImpairmentLossOnLeasedAssetsCL[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 持分法適用に伴う負債 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:LiabilitiesFromApplicationOfEquityMethodCL[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 企業結合に係る特定勘定 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionIncurredFromABusinessCombinationCL[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 組織再編により生じた株式の特別勘定 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:StockSpecialAccountCausedByRestructuringCL[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 割賦利益繰延 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:DeferredInstallmentIncomeCL[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 借入有価証券 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:SecuritiesBorrowedCL[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 信用保証買掛金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AccountsPayableCreditGuaranteeCL[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 貸借取引担保金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:CollateralMoneyReceivedForLoanTransactionsCL[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 貸付有価証券代り金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:CollateralMoneyReceivedForSecuritiesLentCL[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ その他の従業員預り金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:DepositsReceivedEmployeeOther[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ その他預り金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:DepositsReceivedOther[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ その他 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:OtherCL[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 流動負債合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:CurrentLiabilities[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　├ 固定負債 | （抽象要素。XBRL ファクトなし） | 2 | Y |
| 　　├ 社債 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:BondsPayable[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 新株引受権 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:NoncurrentLiabilitiesStockWarrant[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 長期借入金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:LongTermLoansPayable[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 関係会社長期借入金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:LongTermLoansPayableToSubsidiariesAndAffiliates[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 株主、役員又は従業員からの長期借入金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:LongTermLoansPayableToShareholdersDirectorsOrEmployees[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ リース債務 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:LeaseObligationsNCL[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 資産除去債務 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AssetRetirementObligationsNCL[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 長期営業外支払手形 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:LongTermNotesPayableOther[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 医業外支払手形 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:LongTermNotesPayableNonMedical[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 長期未払費用 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:LongTermAccruedExpenses[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 長期未払金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:LongTermAccountsPayableOther[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 繰延ヘッジ利益 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:NoncurrentLiabilitiesDeferredHedgeLiabilities[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 繰延税金負債 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:DeferredTaxLiabilitiesNCL[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 退職給付引当金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionForRetirementBenefits[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 引当金 | （抽象要素。XBRL ファクトなし） | 3 | Y |
| 　　　├ 役員退職慰労引当金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionForDirectorsRetirementBenefits[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 債務保証損失引当金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionForLossOnGuarantees[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ ポイント引当金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionForPointCardCertificatesNCL[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 特別修繕引当金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionForSpecialRepairs[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 修繕引当金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionForRepairsNCL[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 製品保証引当金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionForProductWarrantiesNCL[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 関係会社整理損失引当金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionForLossOnLiquidationOfSubsidiariesAndAffiliatesNCL[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 事業整理損失引当金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionForLossOnBusinessLiquidationNCL[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 関係会社事業損失引当金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionForLossOnBusinessOfSubsidiariesAndAffiliatesNCL[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 事業構造改善引当金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionForBusinessStructureImprovementNCL[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 環境対策引当金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionForEnvironmentalMeasuresNCL[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 訴訟損失引当金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionForLossOnLitigationNCL[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 利息返還損失引当金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionForLossOnInterestRepaymentNCL[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 偶発損失引当金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionForContingentLossNCL[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 災害損失引当金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionForLossOnDisasterNCL[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ その他の引当金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:OtherProvisionNCL[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 引当金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionNCL[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　├ 負ののれん | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:NegativeGoodwill[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ その他の負債で流動負債に属しないもの | （抽象要素。XBRL ファクトなし） | 3 | Y |
| 　　　├ 受入保証金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:GuaranteeDepositsReceivedNCL[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 長期預り金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:LongTermDepositsReceived[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 会員預り金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:DepositsReceivedFromMembers[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 長期割賦未払金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:LongTermAccountsPayableInstallmentPurchase[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 受入敷金保証金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:LeaseAndGuaranteeDepositsReceived[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 長期設備関係支払手形 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:LongTermNotesPayableFacilities[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 長期設備関係未払金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:LongTermAccountsPayableFacilities[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 長期前受金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:LongTermAdvancesReceived[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 長期前受工事負担金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:LongTermDeferredContributionForConstruction[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 長期預り敷金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:LongTermLeaseDeposited[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 長期預り敷金保証金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:LongTermLeaseAndGuaranteeDeposited[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 長期預り保証金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:LongTermGuaranteeDeposited[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 保険契約準備金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReserveForContractOfInsurance[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 長期前受収益 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:LongTermUnearnedRevenue[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ デリバティブ債務 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:DerivativesLiabilitiesNCL[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 | Y |
| 　　　　├ 為替予約 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ForwardExchangeContractsNCL[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 金利スワップ負債 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:InterestRateSwapLiabilitiesNCL[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 金利スワップ | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:InterestRateSwapNCL[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 売建通貨オプション | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:SoldCurrencyOptionNCL[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 通貨オプション | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:CurrencyOptionNCL[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ オプション負債 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:OptionNCL[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　├ 長期リース資産減損勘定 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:AccumulatedImpairmentLossOnLongTermLeasedAssetsNCL[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 再評価に係る繰延税金負債 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:DeferredTaxLiabilitiesForLandRevaluation[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 持分法適用に伴う負債 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:LiabilitiesFromApplicationOfEquityMethodNCL[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 企業結合に係る特定勘定 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ProvisionIncurredFromABusinessCombinationNCL[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 組織再編により生じた株式の特別勘定 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:StockSpecialAccountCausedByRestructuringNCL[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　├ その他 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:OtherNCL[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 固定負債合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:NoncurrentLiabilities[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　├ 特別法上の準備金 | （抽象要素。XBRL ファクトなし） | 2 | Y |
| 　　├ 特別法上の準備金合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReservesUnderTheSpecialLaws1[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　├ 特別法上の引当金 | （抽象要素。XBRL ファクトなし） | 2 | Y |
| 　　├ 特別法上の引当金合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReservesUnderTheSpecialLaws2[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　├ 負債合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:Liabilities[@contextRef='CurrentYearNonConsolidatedInstant']` | 2 |  |
| ├ 純資産の部 | （抽象要素。XBRL ファクトなし） | 1 | Y |
| 　├ 株主資本 | （抽象要素。XBRL ファクトなし） | 2 | Y |
| 　　├ 資本金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:CapitalStock[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 新株式申込証拠金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:DepositForSubscriptionsToShares[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 資本剰余金 | （抽象要素。XBRL ファクトなし） | 3 | Y |
| 　　　├ 資本準備金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:LegalCapitalSurplus[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 国庫等補助金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:NationalSubsidy[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 指定寄付金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:DonationDesignatedOrganization[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ その他資本剰余金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:OtherCapitalSurplus[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 資本準備金減少額 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:TransferCapitalReserve[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 保険差益積立金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:GainInsuranceReserve[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 資本剰余金合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:CapitalSurplus[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　├ 利益剰余金 | （抽象要素。XBRL ファクトなし） | 3 | Y |
| 　　　├ 利益準備金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:LegalRetainedEarnings[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ 代替基金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:AlternateFundMED[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　　├ その他利益剰余金 | （抽象要素。XBRL ファクトなし） | 4 | Y |
| 　　　　├ 積立金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:Reserve[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 自由貿易地域投資損失準備金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:FreeTradeAreaInvestmentLossReserve[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 創業中小企業投資損失準備金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:FoundingSmallMediumSizedEnterpriseInvestmentLossReserve[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 金属鉱業等鉱害防止準備金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:MetalMiningPollutionPreventionReserve[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 特定災害防止準備金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:SpecifiedDisastersPreventionReserve[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 特定都市鉄道整備準備金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:SpecifiedUrbanRailroadMaintenanceReserve[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ ガス熱量変更償却準備金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:GasCalorieChangeAmortizationReserve[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 電子計算機買戻損失準備金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:ComputerRepurchaseLossReserve[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 使用済核燃料再処理準備金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:SpentNuclearFuelReprocessingReserve[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 原子力発電施設解体準備金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:NuclearPowerGenerationSystemDismantlementReserve[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 異常危険準備金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:ExtraordinaryDangerReserve[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 特別修繕準備金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:SpecialRepairReserve[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 探鉱準備金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:MineProspectingReserve[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 海外探鉱準備金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:OverseaMineProspectingReserve[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 農用地利用集積準備金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:UtilizationIntegrationLandFarmingReserve[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 再評価積立金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:RevaluationReserve[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 退職給付積立金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:RevenueReserveRetirementBenefitsReserve[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 公害防止準備金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:RevenueReservePollutionControlReserve[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 減債積立金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReserveForBondSinkingFund[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 中間配当積立金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReserveForInterimDividends[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 配当平均積立金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReserveForDividendEqualization[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 事業拡張積立金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReserveForBusinessExpansion[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 偶発損失積立金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:ReserveForContingentLoss[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 自家保険積立金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReserveForPrivateInsurance[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 固定資産圧縮積立金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReserveForAdvancedDepreciationOfNoncurrentAssets[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 固定資産圧縮特別勘定積立金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReserveForSpecialAccountForAdvancedDepreciationOfNoncurrentAssets[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 特別償却準備金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReserveForSpecialDepreciation[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ プログラム等準備金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReserveForSoftwarePrograms[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 海外投資等損失準備金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReserveForOverseasInvestmentLoss[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 研究開発積立金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReserveForResearchAndDevelopment[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 配当積立金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReserveForDividends1[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 配当準備金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReserveForDividends2[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 配当準備積立金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReserveForDividends3[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 配当引当積立金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReserveForDividends4[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 退職給与積立金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReserveForRetirementAllowance1[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 退職積立金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReserveForRetirementAllowance2[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 退職手当積立金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReserveForRetirementAllowance3[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 退職慰労積立金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReserveForRetirementAllowance4[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 役員退職積立金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReserveForDirectorsRetirementAllowance[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 圧縮記帳積立金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReserveForReductionEntry1[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 圧縮積立金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReserveForReductionEntry2[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 土地圧縮積立金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReserveForReductionEntryOfLand[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 建物圧縮積立金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReserveForReductionEntryOfBuildings[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 不動産圧縮積立金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReserveForReductionEntryOfRealEstate[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 資産圧縮積立金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReserveForReductionEntryOfAssets[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 償却資産圧縮積立金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReserveForReductionEntryOfDepreciableAssets[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 買換資産圧縮積立金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReserveForReductionEntryOfReplacedProperty[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 買換資産積立金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReserveForPropertyReplacement[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 特別償却積立金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ReserveForSpecialDepreciationGeneral[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 特別積立金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:SpecialReserve[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 任意積立金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:VoluntaryRetainedEarnings[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 別途積立金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:GeneralReserve[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ 繰越利益剰余金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:RetainedEarningsBroughtForward[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　　├ その他利益剰余金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:OtherRetainedEarnings[@contextRef='CurrentYearNonConsolidatedInstant']` | 5 |  |
| 　　　├ 利益剰余金合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:RetainedEarnings[@contextRef='CurrentYearNonConsolidatedInstant']` | 4 |  |
| 　　├ 自己株式 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:TreasuryStock[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 自己株式申込証拠金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:DepositForSubscriptionsToTreasuryStock[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 株主資本合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ShareholdersEquity[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　├ 評価・換算差額等 | （抽象要素。XBRL ファクトなし） | 2 | Y |
| 　　├ その他有価証券評価差額金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ValuationDifferenceOnAvailableForSaleSecurities[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 繰延ヘッジ損益 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:DeferredGainsOrLossesOnHedges[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 土地再評価差額金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:RevaluationReserveForLand[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 為替換算調整勘定 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ForeignCurrencyTranslationAdjustment[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　　├ 評価・換算差額等合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:ValuationAndTranslationAdjustments[@contextRef='CurrentYearNonConsolidatedInstant']` | 3 |  |
| 　├ 新株予約権 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:SubscriptionRightsToShares[@contextRef='CurrentYearNonConsolidatedInstant']` | 2 |  |
| 　├ 自己新株予約権 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:TreasurySubscriptionRightsToShares[@contextRef='CurrentYearNonConsolidatedInstant']` | 2 |  |
| 　├ 少数株主持分 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:MinorityInterests[@contextRef='CurrentYearNonConsolidatedInstant']` | 2 |  |
| 　├ 基金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:FundMED[@contextRef='CurrentYearNonConsolidatedInstant']` | 2 |  |
| 　├ 純資産合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:NetAssets[@contextRef='CurrentYearNonConsolidatedInstant']` | 2 |  |
| ├ 負債純資産合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-t-cte:LiabilitiesAndNetAssets[@contextRef='CurrentYearNonConsolidatedInstant']` | 1 |  |
