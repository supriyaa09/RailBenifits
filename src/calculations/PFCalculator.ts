import { BaseBenefitCalculator } from "./BenefitCalculator";
import { manualCalculation, workbookFormula } from "./CalculationHelpers";
import type { CalculationContext } from "./CalculationTypes";

export class PFCalculator extends BaseBenefitCalculator {
  formulaReference() {
    return workbookFormula(
      "Provident Fund",
      "PF_MANUAL_INPUT",
      "PF is currently accepted as a manual input and will be validated against official records later.",
    );
  }

  explain() {
    return "PF amount is taken from the manually entered assessment value.";
  }

  calculate(context: CalculationContext) {
    return manualCalculation("providentFund", "Provident Fund", context.assessment.salaryDetails.providentFund, this.explain(), this.formulaReference());
  }
}
