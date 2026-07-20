import { BaseBenefitCalculator } from "./BenefitCalculator";
import { PENSION_RATES } from "../../formula-engine/generated/referenceData";
import { calculatedFormula } from "./CalculationHelpers";
import type { BenefitCalculation, CalculationContext } from "./CalculationTypes";

export class FamilyPensionCalculator extends BaseBenefitCalculator {
  formulaReference() {
    return calculatedFormula(
      "Family Pension = Last Drawn Basic Pay x 30%; Enhanced Family Pension = Last Drawn Basic Pay x 50%",
      "FAMILY_PENSION",
      "Family Pension is calculated for death cases and remains conditional until family verification is complete.",
    );
  }

  explain() {
    return "Family Pension amount depends on death-case and family verification rules.";
  }

  calculate(context: CalculationContext): BenefitCalculation {
    const result = context.ruleResult.benefitResults.find(
      (benefit) => benefit.benefitName === "Family Pension",
    );
    const eligible = result?.eligibility === "Eligible";
    const basicPay = context.assessment.salaryDetails.currentBasicPay;
    const ordinaryFamilyPension = basicPay * PENSION_RATES.familyPension.ordinary;
    const enhancedFamilyPension = basicPay * PENSION_RATES.familyPension.enhanced;

    return {
      key: "familyPension",
      benefitName: "Family Pension",
      amount: eligible ? Math.round(ordinaryFamilyPension) : 0,
      monthlyAmount: eligible ? Math.round(ordinaryFamilyPension) : 0,
      eligible,
      status: eligible ? "Calculated" : "Not Eligible",
      reason: eligible
        ? "Death case selected. Family Pension calculated from Last Drawn Basic Pay."
        : "Family Pension applies only to death cases.",
      formula: this.formulaReference(),
      warnings: eligible
        ? ["Family and nominee details must be verified before final authorization."]
        : [],
      details: {
        lastDrawnBasicPay: basicPay,
        ordinaryFamilyPension: Math.round(ordinaryFamilyPension),
        enhancedFamilyPension: Math.round(enhancedFamilyPension),
        requiresFamilyVerification: true,
      },
    };
  }
}
