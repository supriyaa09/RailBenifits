import { calculateAgeNextBirthday } from "@/lib/settlement-assessment";
import { PENSION_RATES } from "../../formula-engine/generated/referenceData";
import { getCommutationFactor } from "./commutation/CommutationService";
import { BaseBenefitCalculator } from "./BenefitCalculator";
import { calculatedFormula } from "./CalculationHelpers";
import type { BenefitCalculation, CalculationContext } from "./CalculationTypes";

export class CommutationCalculator extends BaseBenefitCalculator {
  formulaReference() {
    return calculatedFormula(
      "Commuted Value = Commuted Pension x 12 x Commutation Factor",
      "COMMUTATION_FACTOR_BY_AGE_NEXT_BIRTHDAY",
      "Commutation factor is fetched by Age Next Birthday from the commutation_factors table or default JSON fallback.",
    );
  }

  explain() {
    return "Commutation uses Age Next Birthday to retrieve the official commutation factor.";
  }

  calculate(context: CalculationContext): BenefitCalculation {
    const ageNextBirthday = calculateAgeNextBirthday(
      context.assessment.employeeDetails.dateOfBirth,
    );
    const factorResult = getCommutationFactor(ageNextBirthday ?? 0);
    const hasFactor = factorResult.factor !== null;
    const opted = context.assessment.commutationDetails.commutationOpted;
    const percentage = opted ? context.assessment.commutationDetails.commutationPercentage : 0;
    const basicPension =
      context.assessment.salaryDetails.currentBasicPay * PENSION_RATES.basicPension;
    const commutedPension = (basicPension * percentage) / 100;
    const amount = hasFactor ? commutedPension * factorResult.factor! * 12 : 0;
    const eligible =
      context.assessment.serviceDetails.pensionScheme === "OPS" && opted && hasFactor;

    return {
      key: "commutation",
      benefitName: "Commutation",
      amount: Math.round(amount),
      eligible,
      status: eligible ? "Calculated" : "Not Eligible",
      formula: this.formulaReference(),
      reason: !opted
        ? "Employee did not opt for commutation."
        : hasFactor
          ? `Commutation factor ${factorResult.factor} found for Age Next Birthday ${factorResult.ageNextBirthday}.`
          : `No active commutation factor found for Age Next Birthday ${factorResult.ageNextBirthday}. Upload the official table to enable calculation.`,
      warnings:
        opted && !hasFactor ? ["Commutation factor table is empty or missing this age."] : [],
      details: {
        ageNextBirthday: factorResult.ageNextBirthday,
        commutationFactor: factorResult.factor,
        factorSource: factorResult.source,
        effectiveFrom: factorResult.effectiveFrom,
        circularNumber: factorResult.circularNumber,
        commutationOpted: opted,
        commutationPercentage: percentage,
        lastBasicPay: context.assessment.salaryDetails.currentBasicPay,
        basicPension: Math.round(basicPension),
        commutedPension: Math.round(commutedPension),
        formula:
          "Commuted Pension = Pension x Commutation Percentage; Commuted Value = Commuted Pension x 12 x Factor",
        residualPension: Math.round(basicPension - commutedPension),
      },
    };
  }
}
