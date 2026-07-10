import type { SettlementAssessment } from "@/lib/settlement-assessment";
import { RELHS_FMA_MONTHLY_AMOUNT, RELHS_RULE_REFERENCE } from "./RELHSConstants";
import { evaluateRELHSEligibility } from "./RELHSEligibility";
import { calculateRELHSSubscription } from "./RELHSSubscription";
import type { FMAEvaluation, RELHSEvaluation } from "./RELHSTypes";

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
      reference: RELHS_RULE_REFERENCE,
    };
  }

  if (!assessment.medicalBenefits.fmaOpted) {
    return {
      eligible: false,
      status: "Not Opted",
      monthlyAmount: 0,
      reason: "Employee chose not to receive Fixed Medical Allowance.",
      reference: RELHS_RULE_REFERENCE,
    };
  }

  return {
    eligible: true,
    status: "Eligible",
    monthlyAmount: RELHS_FMA_MONTHLY_AMOUNT,
    reason: "Employee opted for FMA.",
    reference: RELHS_RULE_REFERENCE,
  };
}
