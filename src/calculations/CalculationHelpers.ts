import type { BenefitCalculation, BenefitCalculationKey, FormulaMetadata } from "./CalculationTypes";

export const railwayRuleReference = "Railway Pension Rules 2026";
export const GRATUITY_MAXIMUM_LIMIT = 2000000;

export function workbookFormula(
  benefitName: string,
  formulaKey: string,
  explanation: string,
): FormulaMetadata {
  return {
    formulaName: "Will be loaded from Workbook",
    formulaKey,
    workbookSheet: "Pending official workbook",
    cellReference: "Pending workbook mapping",
    ruleReference: railwayRuleReference,
    explanation,
  };
}

export function pendingCalculation(
  key: BenefitCalculationKey,
  benefitName: string,
  eligible: boolean,
  reason: string,
  formula: FormulaMetadata,
  warnings: string[] = [],
): BenefitCalculation {
  return {
    key,
    benefitName,
    amount: 0,
    eligible,
    status: eligible ? "Pending Workbook Formula" : "Not Eligible",
    formula,
    reason,
    warnings,
  };
}

export function manualCalculation(
  key: BenefitCalculationKey,
  benefitName: string,
  amount: number,
  reason: string,
  formula: FormulaMetadata,
  warnings: string[] = [],
): BenefitCalculation {
  return {
    key,
    benefitName,
    amount: Number.isFinite(amount) ? amount : 0,
    eligible: true,
    status: "Manual Input",
    formula,
    reason,
    warnings,
  };
}

export function calculatedFormula(
  formulaName: string,
  formulaKey: string,
  explanation: string,
): FormulaMetadata {
  return {
    formulaName,
    formulaKey,
    workbookSheet: "Business Formula Engine",
    cellReference: "Not Excel based",
    ruleReference: railwayRuleReference,
    explanation,
  };
}

export function calculatedAmount(
  key: BenefitCalculationKey,
  benefitName: string,
  amount: number,
  reason: string,
  formula: FormulaMetadata,
  details?: Record<string, string | number | boolean | string[] | null>,
): BenefitCalculation {
  return {
    key,
    benefitName,
    amount: Math.max(0, Math.round(Number.isFinite(amount) ? amount : 0)),
    eligible: true,
    status: "Calculated",
    formula,
    reason,
    warnings: [],
    details,
  };
}

export function calculateDearnessAllowanceAmount(basicPay: number, daPercent: number): number {
  return (basicPay * daPercent) / 100;
}

export function completedHalfYearPeriods(years: number, months: number): number {
  return years * 2 + Math.floor(months / 6);
}
