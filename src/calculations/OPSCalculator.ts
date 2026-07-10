import { BaseBenefitCalculator } from "./BenefitCalculator";
import { calculatedAmount, calculatedFormula } from "./CalculationHelpers";
import type { CalculationContext } from "./CalculationTypes";

export class OPSCalculator extends BaseBenefitCalculator {
  formulaReference() {
    return calculatedFormula("Basic Pension = Pension Emoluments x 50%", "BASIC_PENSION", "Calculated using selected Pension Emoluments.");
  }

  explain() {
    return "Basic Pension is 50% of Pension Emoluments.";
  }

  calculate(context: CalculationContext) {
    const emoluments = context.assessment.promotionDetails.emoluments;
    return calculatedAmount("basicPension", "Basic Pension", emoluments * 0.5, this.explain(), this.formulaReference(), {
      pensionEmoluments: emoluments,
      percentage: "50%",
    });
  }
}
