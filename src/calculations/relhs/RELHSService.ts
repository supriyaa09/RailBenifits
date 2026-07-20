import type { SettlementAssessment } from "../../lib/settlement-assessment.ts";
import { RELHS_RULES } from "../../../formulas/generated/referenceData.ts";
import { evaluateRELHSEligibility } from "./RELHSEligibility.ts";
import { calculateRELHSSubscription } from "./RELHSSubscription.ts";
import type { FMAEvaluation, RELHSEvaluation } from "./RELHSTypes.ts";

export function evaluateRELHS(assessment: SettlementAssessment): RELHSEvaluation {
  const eligibility = evaluateRELHSEligibility(assessment);
  return calculateRELHSSubscription(assessment, eligibility);
}

export function evaluateFMAWithRELHS(
  assessment: SettlementAssessment,
  relhsEvaluation: RELHSEvaluation,
): FMAEvaluation {
  if (!relhsEvaluation.eligible) {
    return {
      eligible: false,
      status: "Not Eligible",
      monthlyAmount: 0,
      reason: "RELHS eligibility is mandatory before FMA can be granted.",
      reference: RELHS_RULES.ruleReference,
    };
  }

  if (!assessment.medicalBenefits.fmaOpted) {
    return {
      eligible: false,
      status: "Not Opted",
      monthlyAmount: 0,
      reason: "Employee chose not to receive Fixed Medical Allowance.",
      reference: RELHS_RULES.ruleReference,
    };
  }

  return {
    eligible: true,
    status: "Eligible",
    monthlyAmount: RELHS_RULES.fmaMonthlyAmount,
    reason: "Employee opted for FMA.",
    reference: RELHS_RULES.ruleReference,
  };
}
