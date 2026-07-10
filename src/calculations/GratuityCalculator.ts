import { BaseBenefitCalculator } from "./BenefitCalculator";
import { calculatedAmount, calculatedFormula, calculateDearnessAllowanceAmount, completedHalfYearPeriods, GRATUITY_MAXIMUM_LIMIT } from "./CalculationHelpers";
import type { CalculationContext } from "./CalculationTypes";

export class GratuityCalculator extends BaseBenefitCalculator {
  formulaReference() {
    return calculatedFormula("Retirement Gratuity = (Basic + DA) x 1/4 x completed half-yearly periods", "RETIREMENT_GRATUITY", "Applies configurable maximum limit.");
  }

  explain() {
    return "Retirement Gratuity is calculated from Basic Pay, DA, and completed six-monthly periods.";
  }

  calculate(context: CalculationContext) {
    const eligible = context.ruleResult.benefitResults.find((benefit) => benefit.benefitName === "Retirement Gratuity")?.eligibility === "Eligible";
    if (!eligible) return calculatedAmount("retirementGratuity", "Retirement Gratuity", 0, "Not eligible under Rule Engine.", this.formulaReference());
    const basic = context.assessment.salaryDetails.currentBasicPay;
    const da = calculateDearnessAllowanceAmount(basic, context.assessment.salaryDetails.dearnessAllowance);
    const periods = completedHalfYearPeriods(
      context.assessment.serviceDetails.qualifyingService.years,
      context.assessment.serviceDetails.qualifyingService.months,
    );
    const raw = (basic + da) * 0.25 * periods;
    const amount = Math.min(raw, GRATUITY_MAXIMUM_LIMIT);
    return calculatedAmount("retirementGratuity", "Retirement Gratuity", amount, this.explain(), this.formulaReference(), {
      basicPay: basic,
      dearnessAllowanceAmount: da,
      completedSixMonthlyPeriods: periods,
      rawAmount: Math.round(raw),
      maximumLimit: GRATUITY_MAXIMUM_LIMIT,
    });
  }
}
