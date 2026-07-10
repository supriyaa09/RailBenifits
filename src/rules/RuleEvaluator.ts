import { formatCurrency, formatDisplayDate, formatQualifyingService, type SettlementAssessment } from "@/lib/settlement-assessment";
import { getRetirementTypeLabel, hasMinimumService } from "./EligibilityRules";
import { benefitRules } from "./BenefitRules";
import type { BenefitResult, EmployeeSummary, RuleTraceStep, SettlementResult } from "./RuleTypes";

function unique(values: string[]): string[] {
  return Array.from(new Set(values.filter(Boolean)));
}

function createEmployeeSummary(assessment: SettlementAssessment): EmployeeSummary {
  return {
    employeeName: assessment.employeeDetails.employeeName,
    scheme: assessment.serviceDetails.pensionScheme,
    retirementType: getRetirementTypeLabel(assessment),
    qualifyingService: formatQualifyingService(assessment.serviceDetails.qualifyingService),
    retirementDate: formatDisplayDate(assessment.serviceDetails.retirementDate),
    employeeGroup: assessment.employeeDetails.employeeGroup,
    pensionEmoluments: formatCurrency(assessment.promotionDetails.emoluments),
  };
}

function createRuleTrace(assessment: SettlementAssessment): RuleTraceStep[] {
  return [
    { title: "Employee", description: assessment.employeeDetails.employeeName },
    { title: "Retirement Type", description: getRetirementTypeLabel(assessment) },
    { title: "Qualifying Service", description: formatQualifyingService(assessment.serviceDetails.qualifyingService) },
    { title: "Pension Scheme", description: assessment.serviceDetails.pensionScheme },
    { title: "Pay Matrix Level", description: assessment.employeeDetails.payMatrixLevel || "Not provided" },
    { title: "RELHS Eligibility Engine", description: "Retirement type and qualifying service evaluated as per RELHS rules." },
    { title: "Subscription Calculation", description: "Subscription amount selected from Pay Matrix Level lookup table." },
    { title: "Result Generated", description: "Rule Engine output prepared for settlement result display." },
  ];
}

function createWarnings(assessment: SettlementAssessment, benefits: BenefitResult[]): string[] {
  const warnings: string[] = [];

  if (!hasMinimumService(assessment, 20)) {
    warnings.push("Employee has less than 20 years of qualifying service.");
  }

  if (benefits.some((benefit) => benefit.benefitName === "RELHS" && benefit.eligibility === "Not Eligible")) {
    warnings.push("Employee not eligible for RELHS under the current eligibility rules.");
  }

  warnings.push("CGIS value entered manually.");
  warnings.push("PF value entered manually.");

  if (benefits.some((benefit) => benefit.eligibility === "Conditional" || benefit.eligibility === "Pending Verification")) {
    warnings.push("Some benefits require officer verification before settlement processing.");
  }

  return unique(warnings);
}

export function evaluateSettlementRules(assessment: SettlementAssessment): SettlementResult {
  const benefitResults = benefitRules.map((rule) => rule.evaluate(assessment));
  const missingDocuments = unique(benefitResults.flatMap((benefit) => benefit.requiredDocuments));
  const totalEligibleBenefits = benefitResults.filter((benefit) => benefit.eligibility === "Eligible").length;
  const notEligibleBenefits = benefitResults.filter((benefit) => benefit.eligibility === "Not Eligible" || benefit.eligibility === "Not Opted").length;
  const pendingVerification = benefitResults.filter((benefit) => benefit.eligibility === "Conditional" || benefit.eligibility === "Pending Verification").length;

  return {
    employeeSummary: createEmployeeSummary(assessment),
    benefitResults,
    ruleTrace: createRuleTrace(assessment),
    warnings: createWarnings(assessment, benefitResults),
    remarks: [
      "This is a rule-based eligibility advisory.",
      "Financial calculations are pending Sprint 3B workbook integration.",
      "Final settlement remains subject to officer verification and official records.",
    ],
    missingDocuments,
    totalEligibleBenefits,
    notEligibleBenefits,
    pendingVerification,
    estimatedSettlement: "Calculation Pending",
    generatedBy: "RailAssist Rule Engine",
    generatedOn: new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
  };
}
