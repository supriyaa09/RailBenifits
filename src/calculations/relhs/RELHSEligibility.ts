import type { SettlementAssessment } from "../../lib/settlement-assessment.ts";
import { RELHS_RULES } from "../../../formulas/generated/referenceData.ts";
import { baseRELHSEvaluation, getRELHSRetirementLabel } from "./RELHSRules.ts";
import type { RELHSEvaluation } from "./RELHSTypes.ts";

export function evaluateRELHSEligibility(assessment: SettlementAssessment): RELHSEvaluation {
  const details = assessment.serviceDetails.otherRetirementDetails;
  if (details && details.relhsSubscriptionOpted === false) {
    return baseRELHSEvaluation(
      assessment,
      false,
      "Employee explicitly opted out of RELHS subscription.",
    );
  }

  const retirementType = assessment.serviceDetails.otherRetirementType;
  const qualifyingYears = assessment.serviceDetails.qualifyingService.years;

  if (assessment.serviceDetails.retirementCategory === "normal") {
    return baseRELHSEvaluation(
      assessment,
      true,
      "Employee retired under Superannuation. No minimum qualifying service is required.",
    );
  }

  if (retirementType === "death") {
    return baseRELHSEvaluation(
      assessment,
      true,
      "Death Case. Family / nominee becomes eligible for RELHS.",
    );
  }

  if (retirementType === "removal") {
    return baseRELHSEvaluation(assessment, false, "Removal cases are not eligible for RELHS.");
  }

  if (retirementType === "dismissal") {
    return baseRELHSEvaluation(assessment, false, "Dismissal cases are not eligible for RELHS.");
  }

  if (retirementType === "self-resignation") {
    return baseRELHSEvaluation(
      assessment,
      false,
      "Self resignation cases are not eligible for RELHS.",
    );
  }

  const eligible = qualifyingYears >= RELHS_RULES.minimumOtherThanNormalServiceYears;
  return baseRELHSEvaluation(
    assessment,
    eligible,
    eligible
      ? `${getRELHSRetirementLabel(assessment)} with qualifying service of ${qualifyingYears} years meets the 20 year RELHS requirement.`
      : `${getRELHSRetirementLabel(assessment)} has qualifying service below 20 years. RELHS requires at least 20 years for other than normal retirement.`,
  );
}
