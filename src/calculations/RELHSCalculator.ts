import { BaseBenefitCalculator } from "./BenefitCalculator";
import { workbookFormula } from "./CalculationHelpers";
import { evaluateRELHS } from "./relhs/RELHSService";
import type { BenefitCalculation, CalculationContext } from "./CalculationTypes";

export class RELHSCalculator extends BaseBenefitCalculator {
  formulaReference() {
    return workbookFormula(
      "RELHS",
      "RELHS_SUBSCRIPTION",
      "RELHS subscription is calculated from Pay Matrix Level using the RELHS subscription lookup table.",
    );
  }

  explain() {
    return "RELHS eligibility and subscription are evaluated by the dedicated RELHS module.";
  }

  calculate(context: CalculationContext): BenefitCalculation {
    const relhs = evaluateRELHS(context.assessment);
    return {
      key: "relhs",
      benefitName: "RELHS",
      amount: relhs.subscriptionAmount,
      eligible: relhs.eligible,
      status: relhs.eligible ? "Calculated" : "Not Eligible",
      formula: this.formulaReference(),
      reason: relhs.reason,
      warnings: relhs.verificationStatus === "Automatic" ? [] : [relhs.remarks],
      details: {
        medicalCard: relhs.medicalCard,
        familyEligible: relhs.familyEligible,
        verificationStatus: relhs.verificationStatus,
        subscriptionBand: relhs.subscriptionBand,
        payMatrixLevel: relhs.payMatrixLevel,
        requiredDocuments: relhs.requiredDocuments,
        ruleReference: relhs.ruleReference,
        remarks: relhs.remarks,
      },
    };
  }
}
