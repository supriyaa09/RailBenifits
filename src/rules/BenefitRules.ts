import type { SettlementAssessment } from "@/lib/settlement-assessment";
import { evaluateFMAWithRELHS, evaluateRELHS } from "@/calculations/relhs/RELHSService";
import {
  hasMinimumService,
  isDeathCase,
  isNormalRetirement,
  isRemovalOrDismissal,
  isSelfResignation,
  pensionSchemeIsSupported,
} from "./EligibilityRules";
import type { BenefitResult, BenefitRule, EligibilityStatus } from "./RuleTypes";

const calculationPending = "Will be calculated in Sprint 3B";
const railwayRules = "Railway Pension Rules 2026";

function benefit(
  benefitName: string,
  eligibility: EligibilityStatus,
  reason: string,
  requiredDocuments: string[],
  remarks = "Financial calculation pending official workbook integration.",
): BenefitResult {
  return {
    benefitName,
    eligibility,
    reason,
    ruleReference: railwayRules,
    requiredDocuments,
    estimatedAmount: calculationPending,
    status:
      eligibility === "Eligible"
        ? "Approved by Rule"
        : eligibility === "Not Eligible" || eligibility === "Not Opted"
          ? "Not Applicable"
          : "Needs Verification",
    remarks,
    calculationMethod: "",
    formulaReference: "",
    excelFormulaKey: "",
  };
}

export const benefitRules: BenefitRule[] = [
  {
    benefitName: "Pension",
    evaluate: (assessment: SettlementAssessment) =>
      benefit(
        "Pension",
        pensionSchemeIsSupported(assessment.serviceDetails.pensionScheme) ? "Eligible" : "Not Eligible",
        `${assessment.serviceDetails.pensionScheme} pension scheme is supported for rule evaluation.`,
        ["Service Register", "Retirement Order", "PPO"],
      ),
  },
  {
    benefitName: "Family Pension",
    evaluate: (assessment: SettlementAssessment) =>
      benefit(
        "Family Pension",
        isDeathCase(assessment) ? "Eligible" : "Conditional",
        isDeathCase(assessment)
          ? "Employee case is marked as Death Case."
          : "Family Pension applies only on death cases and requires family/nominee verification.",
        ["Death Certificate", "Nominee Details", "Family Composition Certificate"],
        "Conditional unless the case is a verified death case.",
      ),
  },
  {
    benefitName: "Retirement Gratuity",
    evaluate: (assessment: SettlementAssessment) => {
      const blocked = isRemovalOrDismissal(assessment);
      return benefit(
        "Retirement Gratuity",
        blocked ? "Not Eligible" : "Eligible",
        blocked
          ? "Removal or dismissal cases are not eligible under the current rule set."
          : "Employee separation type is eligible for gratuity rule evaluation.",
        ["Service Register", "Retirement Order", "PPO"],
      );
    },
  },
  {
    benefitName: "Leave Encashment",
    evaluate: (assessment: SettlementAssessment) => {
      const hasLeave = assessment.salaryDetails.lapDays > 0 || assessment.salaryDetails.lhapDays > 0;
      return benefit(
        "Leave Encashment",
        hasLeave ? "Eligible" : "Not Eligible",
        hasLeave ? "LAP or LHAP balance is greater than zero." : "No LAP or LHAP balance entered.",
        ["Leave Account", "Service Register"],
      );
    },
  },
  {
    benefitName: "Provident Fund",
    evaluate: () =>
      benefit(
        "Provident Fund",
        "Eligible",
        "Provident Fund value is manually entered for future settlement processing.",
        ["PF Statement", "Bank Details"],
        "Manual PF input captured. Amount validation and settlement calculation remain pending.",
      ),
  },
  {
    benefitName: "CGIS",
    evaluate: () =>
      benefit(
        "CGIS",
        "Eligible",
        "CGIS value is manually entered for future settlement processing.",
        ["CGIS Statement", "Service Register"],
        "Manual CGIS input captured. Amount validation and settlement calculation remain pending.",
      ),
  },
  {
    benefitName: "RELHS",
    evaluate: (assessment: SettlementAssessment) => {
      const relhs = evaluateRELHS(assessment);
      return benefit(
        "RELHS",
        relhs.eligible ? "Eligible" : "Not Eligible",
        relhs.reason,
        relhs.requiredDocuments,
        relhs.remarks,
      );
    },
  },
  {
    benefitName: "Fixed Medical Allowance",
    evaluate: (assessment: SettlementAssessment) => {
      const relhs = evaluateRELHS(assessment);
      const fma = evaluateFMAWithRELHS(assessment, relhs);
      return benefit(
        "Fixed Medical Allowance",
        fma.status,
        fma.reason,
        ["FMA Option Form"],
        "Recurring monthly benefit. Not included in total settlement.",
      );
    },
  },
  {
    benefitName: "Complimentary Pass",
    evaluate: (assessment: SettlementAssessment) => {
      const eligible = !isRemovalOrDismissal(assessment) && !isSelfResignation(assessment) && hasMinimumService(assessment, 20);
      return benefit(
        "Complimentary Pass",
        eligible ? "Eligible" : "Conditional",
        eligible
          ? "Employee has minimum qualifying service and separation type is not barred."
          : "Complimentary Pass requires service and separation-type verification.",
        ["Service Register", "Pass Account Details"],
      );
    },
  },
  {
    benefitName: "Composite Transfer Grant",
    evaluate: (assessment: SettlementAssessment) =>
      benefit(
        "Composite Transfer Grant",
        isRemovalOrDismissal(assessment) ? "Not Eligible" : "Conditional",
        isRemovalOrDismissal(assessment)
          ? "Removal or dismissal cases are not eligible in the current rule set."
          : "Eligibility depends on movement/settlement conditions and officer verification.",
        ["Transfer Details", "Settlement Order"],
      ),
  },
  {
    benefitName: "Medical Facilities",
    evaluate: (assessment: SettlementAssessment) =>
      benefit(
        "Medical Facilities",
        isRemovalOrDismissal(assessment) || isSelfResignation(assessment) ? "Not Eligible" : "Eligible",
        isRemovalOrDismissal(assessment) || isSelfResignation(assessment)
          ? "Separation type is not eligible for medical facilities in the current rule set."
          : "Employee separation type is eligible for medical facility evaluation.",
        ["Medical Option Form", "Service Register"],
      ),
  },
];
