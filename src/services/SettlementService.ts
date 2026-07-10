import type { SettlementAssessment } from "@/lib/settlement-assessment";
import { runCalculationEngine } from "@/calculations/CalculationEngine";
import type { SettlementCalculation, WorkbookData } from "@/calculations/CalculationTypes";
import { runRuleEngine } from "@/rules/RuleEngine";
import type { SettlementResult } from "@/rules/RuleTypes";

export interface ProcessedSettlement {
  ruleResult: SettlementResult;
  calculation: SettlementCalculation;
}

export function processSettlement(
  assessment: SettlementAssessment,
  workbookData?: WorkbookData,
): ProcessedSettlement {
  const ruleResult = runRuleEngine(assessment);
  const calculation = runCalculationEngine(assessment, ruleResult, workbookData);

  return {
    ruleResult,
    calculation,
  };
}
