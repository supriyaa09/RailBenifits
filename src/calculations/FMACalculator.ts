import { BaseBenefitCalculator } from "./BenefitCalculator";
import { workbookFormula } from "./CalculationHelpers";
import { evaluateFMAWithRELHS, evaluateRELHS } from "./relhs/RELHSService";
import type { BenefitCalculation, CalculationContext } from "./CalculationTypes";

export class FMACalculator extends BaseBenefitCalculator {
  formulaReference() {
    return workbookFormula(
      "Fixed Medical Allowance",
      "FMA_MONTHLY_AMOUNT",
      "FMA monthly amount is currently driven by the selected FMA option.",
    );
  }

  explain() {
    return "FMA is a recurring monthly benefit and is not included in one-time settlement totals.";
  }

  calculate(context: CalculationContext): BenefitCalculation {
    const relhs = evaluateRELHS(context.assessment);
    const fma = evaluateFMAWithRELHS(context.assessment, relhs);
    return {
      key: "fma",
      benefitName: "Fixed Medical Allowance",
      amount: 0,
      monthlyAmount: fma.monthlyAmount,
      eligible: fma.eligible,
      status: fma.eligible ? "Calculated" : "Not Eligible",
      formula: this.formulaReference(),
      reason: fma.reason,
      warnings: [],
      details: {
        relhsEligible: relhs.eligible,
        fmaStatus: fma.status,
        reference: fma.reference,
      },
    };
  }
}
