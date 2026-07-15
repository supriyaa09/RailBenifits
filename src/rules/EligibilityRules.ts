import type {
  OtherRetirementType,
  PensionScheme,
  SettlementAssessment,
} from "@/lib/settlement-assessment";
import { evaluateRetirementRules } from "./RetirementRuleEngine";

export function getRetirementTypeLabel(assessment: SettlementAssessment): string {
  return evaluateRetirementRules(assessment).label;
}

export function hasMinimumService(assessment: SettlementAssessment, years: number): boolean {
  return assessment.serviceDetails.qualifyingService.years >= years;
}

export function isDeathCase(assessment: SettlementAssessment): boolean {
  return assessment.serviceDetails.otherRetirementType === "death";
}

export function isRemovalOrDismissal(assessment: SettlementAssessment): boolean {
  return (
    assessment.serviceDetails.otherRetirementType === "removal" ||
    assessment.serviceDetails.otherRetirementType === "dismissal"
  );
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
