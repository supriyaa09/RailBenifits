import type { OtherRetirementType, SettlementAssessment } from "@/lib/settlement-assessment";
import { RELHS_RULES } from "../../../formulas/generated/referenceData";
import type { RELHSEvaluation } from "./RELHSTypes";

export function parsePayMatrixLevel(payMatrixLevel: string): number | null {
  const match = payMatrixLevel.match(/\d+/);
  if (!match) return null;
  const level = Number(match[0]);
  return Number.isFinite(level) ? level : null;
}

export function getRELHSRetirementLabel(assessment: SettlementAssessment): string {
  if (assessment.serviceDetails.retirementCategory === "normal") return "Superannuation";

  const labels: Partial<Record<OtherRetirementType, string>> = {
    voluntary: "Voluntary Retirement",
    medical: "Medical Retirement",
    compulsory: "Compulsory Retirement",
    death: "Death Case",
    removal: "Removal",
    dismissal: "Dismissal",
    "self-resignation": "Self Resignation",
  };

  return assessment.serviceDetails.otherRetirementType
    ? (labels[assessment.serviceDetails.otherRetirementType] ?? "Other Than Normal Retirement")
    : "Other Than Normal Retirement";
}

export function baseRELHSEvaluation(
  assessment: SettlementAssessment,
  eligible: boolean,
  reason: string,
): RELHSEvaluation {
  return {
    eligible,
    subscriptionAmount: 0,
    reason,
    ruleReference: RELHS_RULES.ruleReference,
    requiredDocuments: [...RELHS_RULES.requiredDocuments],
    remarks: eligible
      ? "RELHS eligibility determined automatically from retirement type, service, pension scheme, and pay matrix details."
      : "RELHS is not admissible for this case under the current Railway rules.",
    medicalCard: eligible ? "Eligible" : "Not Eligible",
    familyEligible: eligible,
    verificationStatus: "Automatic",
    pensionScheme: assessment.serviceDetails.pensionScheme,
    payMatrixLevel: parsePayMatrixLevel(assessment.employeeDetails.payMatrixLevel),
    subscriptionBand: null,
  };
}
