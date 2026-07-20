import type { SettlementAssessment } from "../lib/settlement-assessment.ts";
import type { SettlementResult } from "../rules/RuleTypes.ts";
import { calculateWithFormulaEngine } from "./FormulaEngineGateway.ts";
import type { SettlementCalculation, WorkbookData } from "./CalculationTypes.ts";

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
