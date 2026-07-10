import type { OtherRetirementType, PensionScheme, SettlementAssessment } from "@/lib/settlement-assessment";

export function getRetirementTypeLabel(assessment: SettlementAssessment): string {
  if (assessment.serviceDetails.retirementCategory === "normal") return "Normal Retirement";

  const labels: Record<OtherRetirementType, string> = {
    voluntary: "Voluntary Retirement",
    medical: "Medical Retirement",
    compulsory: "Compulsory Retirement",
    death: "Death Case",
    removal: "Removal",
    dismissal: "Dismissal",
    "self-resignation": "Self Resignation",
  };

  return assessment.serviceDetails.otherRetirementType
    ? labels[assessment.serviceDetails.otherRetirementType]
    : "Other Than Normal Retirement";
}

export function hasMinimumService(assessment: SettlementAssessment, years: number): boolean {
  return assessment.serviceDetails.qualifyingService.years >= years;
}

export function isDeathCase(assessment: SettlementAssessment): boolean {
  return assessment.serviceDetails.otherRetirementType === "death";
}

export function isRemovalOrDismissal(assessment: SettlementAssessment): boolean {
  return assessment.serviceDetails.otherRetirementType === "removal" || assessment.serviceDetails.otherRetirementType === "dismissal";
}

export function isSelfResignation(assessment: SettlementAssessment): boolean {
  return assessment.serviceDetails.otherRetirementType === "self-resignation";
}

export function isNormalRetirement(assessment: SettlementAssessment): boolean {
  return assessment.serviceDetails.retirementCategory === "normal";
}

export function isMedicalRetirement(assessment: SettlementAssessment): boolean {
  return assessment.serviceDetails.otherRetirementType === "medical";
}

export function pensionSchemeIsSupported(scheme: PensionScheme): boolean {
  return scheme === "OPS" || scheme === "UPS" || scheme === "NPS";
}
