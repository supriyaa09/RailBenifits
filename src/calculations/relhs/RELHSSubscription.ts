import type { SettlementAssessment } from "../../lib/settlement-assessment.ts";
import { findRELHSSubscriptionBand } from "../../../formulas/generated/referenceData.ts";
import { parsePayMatrixLevel } from "./RELHSRules.ts";
import type { RELHSEvaluation } from "./RELHSTypes.ts";

export function calculateRELHSSubscription(
  assessment: SettlementAssessment,
  evaluation: RELHSEvaluation,
): RELHSEvaluation {
  if (!evaluation.eligible) return evaluation;

  const level = parsePayMatrixLevel(assessment.employeeDetails.payMatrixLevel);
  const band = level === null ? null : findRELHSSubscriptionBand(level);

  return {
    ...evaluation,
    subscriptionAmount: band?.amount ?? 0,
    payMatrixLevel: level,
    subscriptionBand: band?.label ?? null,
    verificationStatus: band ? "Automatic" : "Requires Pay Matrix Verification",
    remarks: band
      ? `RELHS subscription selected from lookup table: ${band.label}.`
      : "Pay Matrix Level could not be matched to the RELHS subscription lookup table.",
  };
}

export function calculateLegacySubscription(_revisedPension: number): number {
  return 0;
}
