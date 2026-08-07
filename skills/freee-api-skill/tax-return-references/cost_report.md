# 決算書 C/R（原価報告書）

<!-- markdownlint-disable MD013 -->

- sheet_code: `cost_report`
- 様式ID: `jpfr-etax-t-cte_ScheduleCostGoodsManufactured`
- 形式: XBRL（財務諸表タクソノミ）
- 取得API: `GET /hub/tax_return/corporate/sheet/financial_statements/{tax_return_id}/cost_report`
- レスポンス: XBRL インスタンスの XML
- xpath ルート: `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl`
- 共通仕様（xpath 表記の規則・名前空間・共通ヘッダ）は [`index.md`](./index.md) を参照。

## 勘定科目マッピング

| 勘定科目名 (name) | xpath | 階層 | 子 |
| --- | --- | --- | --- |
| **製造原価報告書** | （抽象要素。XBRL ファクトなし） | 0 | Y |
| ├ 仕入原価 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:CostGoodsPurchased[@contextRef='CurrentYearNonConsolidatedDuration']` | 1 | Y |
| 　├ 期首たな卸高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:CostGoodsPurchasedBeginningInventory[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| 　├ 商品仕入高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:CostGoodsPurchasedPurchase[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| 　├ 仕入値引・戻し高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:CostGoodsPurchasedReturnsAllowances[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| 　├ 合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:CostGoodsPurchasedSubtotal[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| 　├ 期末たな卸高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:CostGoodsPurchasedClosingInventory[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| ├ 材料費 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:MaterialCost[@contextRef='CurrentYearNonConsolidatedDuration']` | 1 | Y |
| 　├ 期首原材料たな卸高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:RawMaterialsBeginningInventory[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| 　├ 当期原材料仕入高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:RawMaterialsPurchase[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| 　├ 非課税原材料仕入 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:RawMaterialsNontaxablePurchase[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| 　├ 薬品仕入高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:PurchaseMedicine[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| 　├ 診療材料仕入高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:PurchaseMedicalInstruments[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| 　├ 給食材料仕入高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:PurchaseFoodsService[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| 　├ 医療消耗備品仕入高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:PurchaseMedicalSupplies[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| 　├ 原材料仕入値引戻し高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:RawMaterialsReturnsAllowances[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| 　├ 原材料割戻し高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:RawMaterialsPurchaseRebates[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| 　├ その他の原材料仕入高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:RawMaterialsPurchaseOther[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| 　├ 合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:RawMaterialsSubtotal[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| 　├ 期末原材料たな卸高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:RawMaterialsClosingInventory[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| 　├ 主要材料費 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:MainMaterialsCost[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| 　├ 補助材料費 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:SubsidiaryMaterialsCost[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| ├ 労務費 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:LaborCost[@contextRef='CurrentYearNonConsolidatedDuration']` | 1 | Y |
| 　├ 建設労務費 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:LaborCostConstruction[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| 　├ (うち労務外注費) | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:SubcontractLaborCostIncluded[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| 　├ 医師給与 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:SalaryDoctor[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| 　├ 看護士給与 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:SalaryNurse[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| 　├ 医療技術員給与 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:SalaryMedicalTechnician[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| 　├ 役員報酬 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:DirectorsRemuneration[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| 　├ 賃金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:Wages[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| 　├ 賞与 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:Bonuses[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| 　├ 雑給 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:WagesParttimer[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| 　├ 退職金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:EmployeeRetirementPay[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| 　├ 退職給付費用 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:PeriodicRetirementBenefitCost[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| 　├ 法定福利費 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:LegalWelfareExpense[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| 　├ 福利厚生費 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:WelfareExpense[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| 　├ 役員賞与引当金繰入額 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:ProvisionReserveBonusesOfficers[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| 　├ 賞与引当金繰入 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:ProvisionReserveBonuses[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| 　├ 退職給付引当金繰入 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:ProvisionLiabilityRetirementBenefits[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| 　├ 臨時傭員費 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:WagesPartTimerTransportation[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| 　├ その他の労務費 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:LaborCostOther[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| ├ 燃料油脂費 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:FuelGreaseCost[@contextRef='CurrentYearNonConsolidatedDuration']` | 1 | Y |
| 　├ ガソリン費 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:FuelGreaseCostGasCost[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| 　├ 軽油費 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:FuelGreaseCostLightOilCost[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| 　├ LPガス費 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:FuelGreaseCostLPGasCost[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| 　├ その他の燃料費 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:FuelGreaseCostOtherFuelCost[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| 　├ 油脂費 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:FuelGreaseCostGreaseCost[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| ├ 修繕費 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:RepairsExpenseTransportation[@contextRef='CurrentYearNonConsolidatedDuration']` | 1 | Y |
| 　├ 車両修繕費 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:RepairsExpenseEquipmentTransportationTransportation[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| ├ 外注費 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:SubcontractCost[@contextRef='CurrentYearNonConsolidatedDuration']` | 1 | Y |
| 　├ 建設外注費 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:SubcontractCostConstruction[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| ├ 経費 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:OverheadExpenses[@contextRef='CurrentYearNonConsolidatedDuration']` | 1 | Y |
| 　├ 外注加工費 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:AmountsPaidSubcontractors[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| 　├ (仮設経費) | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:TemporaryHousingCostIncluded[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| 　├ 委託費 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:CommissionFee[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| 　├ その他の委託費 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:OtheCommissionFee[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| 　├ 衛生管理費 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:HygieneExpense[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| 　├ 減価償却費 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:Depreciation[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 | Y |
| 　　├ 車両償却費 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:DepreciationTransportationEquipment[@contextRef='CurrentYearNonConsolidatedDuration']` | 3 |  |
| 　　├ その他の償却費 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:DepreciationOther[@contextRef='CurrentYearNonConsolidatedDuration']` | 3 |  |
| 　├ 電力料等 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:ElectricPowerCost[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| 　├ 水道光熱費 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:UtilitiesExpense[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| 　├ ガス代 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:GasCost[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| 　├ 水道代 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:WaterCost[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| 　├ 動力用光熱費 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:PowerCost[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| 　├ 車両費 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:VehiclesExpense[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| 　├ 運賃 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:Freightout[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| 　├ 消耗品費 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:SuppliesExpense[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| 　├ 事務用消耗品費 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:StationeryExpense[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| 　├ 賃借料 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:RentExpense[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| 　├ 地代家賃 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:LandHouseRent[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| 　├ 保管料 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:StorageExpense[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| 　├ 保険料 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:InsuranceExpense[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 | Y |
| 　　├ 自動車損害賠償保険料 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:InsuranceExpenseDamageGuarantee[@contextRef='CurrentYearNonConsolidatedDuration']` | 3 |  |
| 　　├ 自動車保険料 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:InsuranceExpenseCarGuarantee[@contextRef='CurrentYearNonConsolidatedDuration']` | 3 |  |
| 　　├ その他の保険料 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:InsuranceExpenseOther[@contextRef='CurrentYearNonConsolidatedDuration']` | 3 |  |
| 　├ 修繕費 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:RepairsExpense[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| 　├ (運搬費) | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:ConveyanceCostIncluded[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| 　├ 機械等経費 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:MachineryCost[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| 　├ 設計費 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:DesignCost[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| 　├ 労務管理費 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:LaborAdministrativeCost[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| 　├ 施設使用料 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:FacilityUseCost[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| 　├ 事業税 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:EnterpriseTax[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| 　├ 租税公課 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:TaxesOtherThanIncomeTaxes[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 | Y |
| 　　├ 固定資産税 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:LotTax[@contextRef='CurrentYearNonConsolidatedDuration']` | 3 |  |
| 　　├ 自動車重量税 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:AutomobileWeightTax[@contextRef='CurrentYearNonConsolidatedDuration']` | 3 |  |
| 　　├ 自動車税 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:AutomobileTax[@contextRef='CurrentYearNonConsolidatedDuration']` | 3 |  |
| 　　├ 軽自動車税 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:LightAutomobileTax[@contextRef='CurrentYearNonConsolidatedDuration']` | 3 |  |
| 　　├ その他の租税 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:OtherTaxes[@contextRef='CurrentYearNonConsolidatedDuration']` | 3 |  |
| 　├ 事故賠償費 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:AccidentGuaranteeExpense[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| 　├ 道路使用料 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:Toll[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| 　├ 従業員給料手当 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:Salary[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| 　├ 退職金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:RetirementPay[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| 　├ 法定福利費 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:WelfareCostLegal[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| 　├ 福利厚生費 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:WelfareCostOptional[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| 　├ 支払消費税 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:ConsumptionTaxExpense[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| 　├ 旅費交通費 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:TravelingExpense[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 | Y |
| 　　├ 旅費 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:TravelingExpenseTravelingExpense[@contextRef='CurrentYearNonConsolidatedDuration']` | 3 |  |
| 　　├ 交通費 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:TravelingExpenseTransportationExpense[@contextRef='CurrentYearNonConsolidatedDuration']` | 3 |  |
| 　├ 通信費 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:CommunicationCost[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| 　├ 通信交通費 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:CommunicationTransportationCost[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| 　├ 交際接待費 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:EntertainmentExpense[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| 　├ 支払手数料 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:CommissionExpense[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| 　├ 支払報酬 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:ProfessionalsFee[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| 　├ 特許権使用料 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:Royalty[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| 　├ 棚卸減耗費 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:InventoryShortage[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| 　├ 会議費 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:ConventionExpense[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| 　├ 諸会費 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:MembershipExpense[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| 　├ 寄付金 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:Donation[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| 　├ 研究開発費 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:ResearchDevelopmentExpense[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| 　├ 補償費 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:GuaranteeCost[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| 　├ 出張所等経費配賦額 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:CostAllocationBranch[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| 　├ 間接工事費 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:IndirectConstructionCost[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| 　├ その他の完成工事原価(貸方) | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:OtherConstructionCost[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| 　├ 雑費 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:MiscellaneousExpense[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| 　├ その他の製造経費 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:OtherManufacturingExpenses[@contextRef='CurrentYearNonConsolidatedDuration']` | 2 |  |
| ├ 当期製造費用 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:TotalProductionCostUtilized[@contextRef='CurrentYearNonConsolidatedDuration']` | 1 |  |
| ├ 期首仕掛品たな卸高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:WorkProcessBeginningInventories[@contextRef='CurrentYearNonConsolidatedDuration']` | 1 |  |
| ├ 他勘定受入高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:TransferFromOtherAccounts[@contextRef='CurrentYearNonConsolidatedDuration']` | 1 |  |
| ├ 合計 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:SubtotalScheduleCostGoodsManufactured[@contextRef='CurrentYearNonConsolidatedDuration']` | 1 |  |
| ├ 期末仕掛品たな卸高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:WorkProcessClosingInventories[@contextRef='CurrentYearNonConsolidatedDuration']` | 1 |  |
| ├ 他勘定振替高 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:TransferOtherAccounts[@contextRef='CurrentYearNonConsolidatedDuration']` | 1 |  |
| ├ 当期製品製造原価 | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:CostFinishedGoods[@contextRef='CurrentYearNonConsolidatedDuration']` | 1 |  |
| ├ (注) | `/XBRL2_1/XBRL2_1_INSTANCE[@page='1']/xbrli:xbrl/jpfr-etax-t-cte:ScheduleCostGoodsManufacturedNotes[@contextRef='CurrentYearNonConsolidatedDuration']` | 1 |  |
