import type { SettlementAssessment } from "../lib/settlement-assessment.ts";

export type EligibilityStatus = "Eligible" | "Not Eligible" | "Conditional" | "Not Opted" | "Pending Verification";
export type BenefitStatus = "Approved by Rule" | "Not Applicable" | "Needs Verification" | "Calculation Pending";

export interface EmployeeSummary {
  employeeName: string;
  scheme: string;
  retirementType: string;
  qualifyingService: string;
  retirementDate: string;
  employeeGroup: string;
  pensionEmoluments: string;
}

export interface BenefitResult {
  benefitName: string;
  eligibility: EligibilityStatus;
  reason: string;
  ruleReference: string;
  requiredDocuments: string[];
  estimatedAmount: string;
  status: BenefitStatus;
  remarks: string;
  calculationMethod: string;
  formulaReference: string;
  excelFormulaKey: string;
}

export interface RuleTraceStep {
  title: string;
  description: string;
}

export interface SettlementResult {
  employeeSummary: EmployeeSummary;
  benefitResults: BenefitResult[];
  ruleTrace: RuleTraceStep[];
  warnings: string[];
  remarks: string[];
  missingDocuments: string[];
  totalEligibleBenefits: number;
  notEligibleBenefits: number;
  pendingVerification: number;
  estimatedSettlement: "Calculation Pending";
  generatedBy: string;
  generatedOn: string;
}

export interface BenefitRule {
  benefitName: string;
  evaluate: (assessment: SettlementAssessment) => BenefitResult;
}
