import type { SettlementAssessment } from "../lib/settlement-assessment.ts";
import type { SettlementResult } from "../rules/RuleTypes.ts";


export type BenefitCalculationKey =
  | "basicPension"
  | "familyPension"
  | "retirementGratuity"
  | "leaveEncashment"
  | "halfLeaveEncashment"
  | "providentFund"
  | "cgis"
  | "relhs"
  | "fma"
  | "ctg"
  | "commutation"
  | "residualPension";

export interface WorkbookData {
  sourceName?: string;
  sheets?: Record<string, unknown>;
}

export interface FormulaMetadata {
  formulaName: string;
  formulaKey: string;
  workbookSheet: string;
  cellReference: string;
  ruleReference: string;
  explanation: string;
}

export interface BenefitCalculation {
  key: BenefitCalculationKey;
  benefitName: string;
  amount: number;
  monthlyAmount?: number;
  eligible: boolean;
  status:
    | "Calculated"
    | "Manual Input"
    | "Not Eligible"
    | "Pending Workbook Formula"
    | "Pending Formula Engine";
  formula: FormulaMetadata;
  reason: string;
  warnings: string[];
  details?: Record<string, string | number | boolean | string[] | null>;
}

export interface SettlementCalculation {
  basicPension: BenefitCalculation;
  familyPension: BenefitCalculation;
  retirementGratuity: BenefitCalculation;
  leaveEncashment: BenefitCalculation;
  halfLeaveEncashment: BenefitCalculation;
  providentFund: BenefitCalculation;
  cgis: BenefitCalculation;
  relhs: BenefitCalculation;
  fma: BenefitCalculation;
  ctg: BenefitCalculation;
  commutation: BenefitCalculation;
  residualPension: BenefitCalculation;
  totalOneTimeBenefits: number;
  monthlyPension: number;
  monthlyFma: number;
  totalEstimatedSettlement: number;
}

export interface CalculationContext {
  assessment: SettlementAssessment;
  ruleResult: SettlementResult;
  workbookData?: WorkbookData;
}

export interface BenefitCalculator {
  calculate(context: CalculationContext): BenefitCalculation;
  validate(context: CalculationContext): string[];
  explain(context: CalculationContext): string;
  formulaReference(): FormulaMetadata;
}
