import { BaseBenefitCalculator } from "./BenefitCalculator";
import {
  GRATUITY_RULES,
  findDeathGratuitySlab,
} from "../../formula-engine/generated/referenceData";
import {
  calculatedAmount,
  calculatedFormula,
  calculateDearnessAllowanceAmount,
  completedHalfYearPeriods,
} from "./CalculationHelpers";
import type { CalculationContext } from "./CalculationTypes";

export class GratuityCalculator extends BaseBenefitCalculator {
  formulaReference() {
    return calculatedFormula(
      "Retirement Gratuity = (Basic Pay + DA) x Completed Six Monthly Periods / 4",
      "OPS_RETIREMENT_GRATUITY",
      "Applies configurable maximum limit.",
    );
  }

  explain() {
    return "Retirement Gratuity is calculated from Basic Pay, DA, and completed six-monthly periods.";
  }

  calculate(context: CalculationContext) {
    const eligible =
      context.ruleResult.benefitResults.find(
        (benefit) => benefit.benefitName === "Retirement Gratuity",
      )?.eligibility === "Eligible";
    if (!eligible)
      return calculatedAmount(
        "retirementGratuity",
        "Retirement Gratuity",
        0,
        "Not eligible under Rule Engine.",
        this.formulaReference(),
      );
    const basic = context.assessment.salaryDetails.currentBasicPay;
    const da = calculateDearnessAllowanceAmount(
      basic,
      context.assessment.salaryDetails.dearnessAllowance,
    );
    const emoluments = basic + da;
    const periods = completedHalfYearPeriods(
      context.assessment.serviceDetails.qualifyingService.years,
      context.assessment.serviceDetails.qualifyingService.months,
    );
    const deathCase = context.assessment.serviceDetails.otherRetirementType === "death";
    const raw = deathCase
      ? this.calculateDeathGratuity(
          emoluments,
          context.assessment.serviceDetails.qualifyingService.years,
          periods,
        )
      : (emoluments * periods) / 4;
    const amount = Math.min(raw, GRATUITY_RULES.maximumLimit);
    return calculatedAmount(
      "retirementGratuity",
      deathCase ? "Death Gratuity" : "Retirement Gratuity",
      amount,
      deathCase ? "Death Gratuity is calculated from qualifying service slabs." : this.explain(),
      deathCase ? this.deathFormulaReference() : this.formulaReference(),
      {
        basicPay: basic,
        dearnessAllowanceAmount: da,
        emoluments,
        completedSixMonthlyPeriods: periods,
        gratuityType: deathCase ? "Death Gratuity" : "Retirement Gratuity",
        rawAmount: Math.round(raw),
        maximumLimit: GRATUITY_RULES.maximumLimit,
      },
    );
  }

  private deathFormulaReference() {
    return calculatedFormula(
      "Death Gratuity = slab multiplier x Emoluments",
      "OPS_DEATH_GRATUITY",
      "QS < 1 year = 2x; 1-5 years = 6x; 5-12 years = 12x; 12-20 years = 20x; 20+ years = 0.5 x Emoluments x completed six-monthly periods.",
    );
  }

  private calculateDeathGratuity(
    emoluments: number,
    serviceYears: number,
    completedPeriods: number,
  ): number {
    const slab = findDeathGratuitySlab(serviceYears);
    if (slab) return emoluments * slab.multiplier;
    return GRATUITY_RULES.longServiceDeathMultiplier * emoluments * completedPeriods;
  }
}
