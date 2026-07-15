import type { OtherRetirementType, SettlementAssessment } from "@/lib/settlement-assessment";

export type SettlementBenefitKey =
  | "pension"
  | "familyPension"
  | "retirementGratuity"
  | "leaveEncashment"
  | "commutation"
  | "fma"
  | "relhs"
  | "providentFund"
  | "cgis"
  | "ctg"
  | "complimentaryPass"
  | "medicalFacilities";

export interface RetirementRuleDecision {
  retirementType: "normal" | OtherRetirementType;
  label: string;
  reportMode: "retirement" | "death" | "not-admissible";
  visibleInputs: string[];
  benefits: Record<SettlementBenefitKey, boolean>;
  pensionSanctionPercentage: number;
  reason: string;
}

const commonBenefits: Record<SettlementBenefitKey, boolean> = {
  pension: true,
  familyPension: false,
  retirementGratuity: true,
  leaveEncashment: true,
  commutation: true,
  fma: true,
  relhs: true,
  providentFund: true,
  cgis: true,
  ctg: true,
  complimentaryPass: true,
  medicalFacilities: true,
};

const labels: Record<"normal" | OtherRetirementType, string> = {
  normal: "Normal Retirement",
  voluntary: "Voluntary Retirement",
  medical: "Medical Retirement (Invalid Pension)",
  compulsory: "Compulsory Retirement",
  death: "Death While in Service",
  removal: "Removal from Service",
  dismissal: "Dismissal",
  "self-resignation": "Self Resignation",
};

function decision(
  assessment: SettlementAssessment,
  overrides: Partial<RetirementRuleDecision> & {
    benefits?: Partial<Record<SettlementBenefitKey, boolean>>;
  },
): RetirementRuleDecision {
  const retirementType = assessment.serviceDetails.otherRetirementType ?? "normal";
  const { benefits, ...rest } = overrides;
  return {
    retirementType,
    label: labels[retirementType],
    reportMode: "retirement",
    visibleInputs: [],
    benefits: { ...commonBenefits, ...benefits },
    pensionSanctionPercentage: 100,
    reason: "Common retirement formulas apply.",
    ...rest,
  };
}

export function evaluateRetirementRules(assessment: SettlementAssessment): RetirementRuleDecision {
  if (assessment.serviceDetails.retirementCategory === "normal") {
    return decision(assessment, {
      retirementType: "normal",
      label: labels.normal,
      reason:
        "Normal retirement selected. Common retirement benefits are admissible subject to service verification.",
    });
  }

  const type = assessment.serviceDetails.otherRetirementType;
  const details = assessment.serviceDetails.otherRetirementDetails;

  switch (type) {
    case "voluntary":
      return decision(assessment, {
        visibleInputs: [],
        reason:
          "Voluntary retirement selected. Common retirement formulas apply where qualifying service permits.",
      });
    case "medical": {
      const approved = details?.medicalRetirementApproved === true;
      return decision(assessment, {
        visibleInputs: ["medicalRetirementApproved", "notionalServiceAddition"],
        benefits: approved ? {} : { pension: false, retirementGratuity: false, commutation: false },
        reason: approved
          ? "Medical retirement approved. Invalid pension case uses common formulas with entered notional service addition."
          : "Medical retirement approval is required before pension, gratuity, and commutation can be admitted.",
      });
    }
    case "compulsory":
      return decision(assessment, {
        visibleInputs: ["pensionSanctionPercentage"],
        pensionSanctionPercentage: Math.min(
          100,
          Math.max(0, Number(details?.pensionSanctionPercentage ?? 100)),
        ),
        reason:
          "Compulsory retirement selected. Pension is restricted by the sanctioned percentage entered by the officer.",
      });
    case "death":
      return decision(assessment, {
        reportMode: "death",
        visibleInputs: ["dateOfDeath", "spouseAvailable", "familyPensionEligible"],
        benefits: {
          pension: false,
          familyPension: details?.familyPensionEligible !== false,
          commutation: false,
          fma: false,
          relhs: false,
          ctg: false,
          complimentaryPass: false,
          medicalFacilities: false,
        },
        reason: "Death while in service selected. Death benefits and family pension rules apply.",
      });
    case "removal": {
      const compassionate = details?.compassionateAllowanceSanctioned === true;
      return decision(assessment, {
        reportMode: compassionate ? "retirement" : "not-admissible",
        visibleInputs: ["compassionateAllowanceSanctioned"],
        benefits: {
          pension: compassionate,
          retirementGratuity: false,
          commutation: false,
          fma: false,
          relhs: false,
          ctg: false,
          complimentaryPass: false,
          medicalFacilities: false,
        },
        pensionSanctionPercentage: compassionate ? 66.67 : 0,
        reason: compassionate
          ? "Removal case with compassionate allowance sanctioned. Pension is treated as compassionate allowance only."
          : "Removal from service selected. Pensionary benefits are not admissible unless compassionate allowance is sanctioned.",
      });
    }
    case "dismissal":
      return decision(assessment, {
        reportMode: "not-admissible",
        visibleInputs: [],
        benefits: {
          pension: false,
          retirementGratuity: false,
          commutation: false,
          fma: false,
          relhs: false,
          ctg: false,
          complimentaryPass: false,
          medicalFacilities: false,
        },
        pensionSanctionPercentage: 0,
        reason:
          "Dismissal selected. Pensionary benefits are not admissible under the current rule set.",
      });
    case "self-resignation": {
      const technical = details?.technicalResignation === true;
      return decision(assessment, {
        reportMode: technical ? "retirement" : "not-admissible",
        visibleInputs: ["technicalResignation"],
        benefits: technical
          ? {
              commutation: false,
              fma: false,
              relhs: false,
              ctg: false,
              complimentaryPass: false,
              medicalFacilities: false,
            }
          : {
              pension: false,
              retirementGratuity: false,
              commutation: false,
              fma: false,
              relhs: false,
              ctg: false,
              complimentaryPass: false,
              medicalFacilities: false,
            },
        reason: technical
          ? "Technical resignation selected. Common payable accumulations continue where rules permit."
          : "Self resignation selected. Pensionary benefits are not admissible unless treated as technical resignation.",
      });
    }
    default:
      return decision(assessment, {
        benefits: { pension: false, retirementGratuity: false, commutation: false },
        reason: "Other than normal retirement type is not selected.",
      });
  }
}

export function isBenefitAdmissible(
  assessment: SettlementAssessment,
  key: SettlementBenefitKey,
): boolean {
  return evaluateRetirementRules(assessment).benefits[key];
}
