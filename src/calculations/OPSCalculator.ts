import { BaseBenefitCalculator } from "./BenefitCalculator";
import { calculatedAmount, calculatedFormula } from "./CalculationHelpers";
import type { CalculationContext } from "./CalculationTypes";

export class OPSCalculator extends BaseBenefitCalculator {
  formulaReference() {
    return calculatedFormula("Pension = Last Basic Pay / 2", "OPS_BASIC_PENSION", "OPS pension is 50% of Last Basic Pay.");
  }

  explain() {
    return "OPS Basic Pension is 50% of Last Basic Pay.";
  }

  calculate(context: CalculationContext) {
    const lastBasicPay = context.assessment.salaryDetails.currentBasicPay;
    return calculatedAmount("basicPension", "Basic Pension", lastBasicPay * 0.5, this.explain(), this.formulaReference(), {
      lastBasicPay,
      pensionEmoluments: context.assessment.promotionDetails.emoluments,
      percentage: "50%",
    });
  }
}
