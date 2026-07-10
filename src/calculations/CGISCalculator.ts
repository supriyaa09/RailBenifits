import { BaseBenefitCalculator } from "./BenefitCalculator";
import { manualCalculation, workbookFormula } from "./CalculationHelpers";
import type { CalculationContext } from "./CalculationTypes";

export class CGISCalculator extends BaseBenefitCalculator {
  formulaReference() {
    return workbookFormula(
      "CGIS",
      "CGIS_MANUAL_INPUT",
      "CGIS is currently accepted as a manual input and will be validated against official records later.",
    );
  }

  explain() {
    return "CGIS amount is taken from the manually entered assessment value.";
  }

  calculate(context: CalculationContext) {
    return manualCalculation("cgis", "CGIS", context.assessment.salaryDetails.cgis, this.explain(), this.formulaReference());
  }
}
