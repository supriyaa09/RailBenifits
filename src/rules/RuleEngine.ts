import type { SettlementAssessment } from "@/lib/settlement-assessment";
import { evaluateSettlementRules } from "./RuleEvaluator";
import type { SettlementResult } from "./RuleTypes";

export class RuleEngine {
  evaluate(assessment: SettlementAssessment): SettlementResult {
    return evaluateSettlementRules(assessment);
  }
}

export function runRuleEngine(assessment: SettlementAssessment): SettlementResult {
  return new RuleEngine().evaluate(assessment);
}
