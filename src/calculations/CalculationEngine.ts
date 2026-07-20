import type { SettlementAssessment } from "@/lib/settlement-assessment";
import type { SettlementResult } from "@/rules/RuleTypes";
import { calculateWithFormulaEngine } from "./FormulaEngineGateway";
import type { SettlementCalculation, WorkbookData } from "./CalculationTypes";

export class CalculationEngine {
  calculate(
    assessment: SettlementAssessment,
    ruleResult: SettlementResult,
    workbookData?: WorkbookData,
  ): SettlementCalculation {
    return calculateWithFormulaEngine(assessment, ruleResult, workbookData);
  }
}

export function runCalculationEngine(
  assessment: SettlementAssessment,
  ruleResult: SettlementResult,
  workbookData?: WorkbookData,
): SettlementCalculation {
  return new CalculationEngine().calculate(assessment, ruleResult, workbookData);
}
