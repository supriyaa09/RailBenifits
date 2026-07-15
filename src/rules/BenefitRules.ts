import type { SettlementAssessment } from "@/lib/settlement-assessment";
import { evaluateFMAWithRELHS, evaluateRELHS } from "@/calculations/relhs/RELHSService";
import { hasMinimumService, pensionSchemeIsSupported } from "./EligibilityRules";
import { evaluateRetirementRules, isBenefitAdmissible } from "./RetirementRuleEngine";
import type { BenefitResult, BenefitRule, EligibilityStatus } from "./RuleTypes";

const calculationPending = "Formula Repository Calculation";
const railwayRules = "Railway Pension Rules 2026";

function benefit(
  benefitName: string,
  eligibility: EligibilityStatus,
  reason: string,
  requiredDocuments: string[],
  remarks = "Financial calculation processed by RailAssist Rule Engine.",
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
    evaluate: (assessment: SettlementAssessment) => {
      const retirementRules = evaluateRetirementRules(assessment);
      const eligible =
        pensionSchemeIsSupported(assessment.serviceDetails.pensionScheme) &&
        retirementRules.benefits.pension;
      return benefit(
        "Pension",
        eligible ? "Eligible" : "Not Eligible",
        eligible
          ? `${assessment.serviceDetails.pensionScheme} pension scheme is supported for ${retirementRules.label}.`
          : retirementRules.reason,
        ["Service Register", "Retirement Order", "PPO"],
      );
    },
  },
  {
    benefitName: "Family Pension",
    evaluate: (assessment: SettlementAssessment) =>
      benefit(
        "Family Pension",
        isBenefitAdmissible(assessment, "familyPension") ? "Eligible" : "Conditional",
        isBenefitAdmissible(assessment, "familyPension")
          ? "Employee case is marked as Death Case."
          : "Family Pension applies only on death cases and requires family/nominee verification.",
        ["Death Certificate", "Nominee Details", "Family Composition Certificate"],
        "Conditional unless the case is a verified death case.",
      ),
  },
  {
    benefitName: "Retirement Gratuity",
    evaluate: (assessment: SettlementAssessment) => {
      const retirementRules = evaluateRetirementRules(assessment);
      const blocked = !retirementRules.benefits.retirementGratuity;
      return benefit(
        "Retirement Gratuity",
        blocked ? "Not Eligible" : "Eligible",
        blocked
          ? retirementRules.reason
          : "Employee separation type is eligible for gratuity rule evaluation.",
        ["Service Register", "Retirement Order", "PPO"],
      );
    },
  },
  {
    benefitName: "Leave Encashment",
    evaluate: (assessment: SettlementAssessment) => {
      const hasLeave =
        assessment.salaryDetails.lapDays > 0 || assessment.salaryDetails.lhapDays > 0;
      const admissible = isBenefitAdmissible(assessment, "leaveEncashment");
      return benefit(
        "Leave Encashment",
        hasLeave && admissible ? "Eligible" : "Not Eligible",
        admissible
          ? hasLeave
            ? "LAP or LHAP balance is greater than zero."
            : "No LAP or LHAP balance entered."
          : evaluateRetirementRules(assessment).reason,
        ["Leave Account", "Service Register"],
      );
    },
  },
  {
    benefitName: "Provident Fund",
    evaluate: (assessment: SettlementAssessment) =>
      benefit(
        "Provident Fund",
        isBenefitAdmissible(assessment, "providentFund") ? "Eligible" : "Not Eligible",
        isBenefitAdmissible(assessment, "providentFund")
          ? "Provident Fund value is manually entered for future settlement processing."
          : evaluateRetirementRules(assessment).reason,
        ["PF Statement", "Bank Details"],
        "Manual PF input captured. Amount validation and settlement calculation remain pending.",
      ),
  },
  {
    benefitName: "CGIS",
    evaluate: (assessment: SettlementAssessment) =>
      benefit(
        "CGIS",
        isBenefitAdmissible(assessment, "cgis") ? "Eligible" : "Not Eligible",
        isBenefitAdmissible(assessment, "cgis")
          ? "CGIS value is manually entered for future settlement processing."
          : evaluateRetirementRules(assessment).reason,
        ["CGIS Statement", "Service Register"],
        "Manual CGIS input captured. Amount validation and settlement calculation remain pending.",
      ),
  },
  {
    benefitName: "RELHS",
    evaluate: (assessment: SettlementAssessment) => {
      const relhs = evaluateRELHS(assessment);
      const admissible = isBenefitAdmissible(assessment, "relhs");
      return benefit(
        "RELHS",
        relhs.eligible && admissible ? "Eligible" : "Not Eligible",
        admissible ? relhs.reason : evaluateRetirementRules(assessment).reason,
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
      const admissible = isBenefitAdmissible(assessment, "fma");
      return benefit(
        "Fixed Medical Allowance",
        admissible ? fma.status : "Not Eligible",
        admissible ? fma.reason : evaluateRetirementRules(assessment).reason,
        ["FMA Option Form"],
        "Recurring monthly benefit. Not included in total settlement.",
      );
    },
  },
  {
    benefitName: "Complimentary Pass",
    evaluate: (assessment: SettlementAssessment) => {
      const eligible =
        isBenefitAdmissible(assessment, "complimentaryPass") && hasMinimumService(assessment, 20);
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
    evaluate: (assessment: SettlementAssessment) => {
      const retirementRules = evaluateRetirementRules(assessment);
      return benefit(
        "Composite Transfer Grant",
        retirementRules.benefits.ctg ? "Conditional" : "Not Eligible",
        retirementRules.benefits.ctg
          ? "Eligibility depends on movement/settlement conditions and officer verification."
          : retirementRules.reason,
        ["Transfer Details", "Settlement Order"],
      );
    },
  },
  {
    benefitName: "Medical Facilities",
    evaluate: (assessment: SettlementAssessment) => {
      const retirementRules = evaluateRetirementRules(assessment);
      return benefit(
        "Medical Facilities",
        retirementRules.benefits.medicalFacilities ? "Eligible" : "Not Eligible",
        retirementRules.benefits.medicalFacilities
          ? "Employee separation type is eligible for medical facility evaluation."
          : retirementRules.reason,
        ["Medical Option Form", "Service Register"],
      );
    },
  },
];
