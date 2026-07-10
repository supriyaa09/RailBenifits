import type { SettlementAssessment } from "@/lib/settlement-assessment";
import type { SettlementResult } from "@/rules/RuleTypes";
import { CGISCalculator } from "./CGISCalculator";
import { CommutationCalculator } from "./CommutationCalculator";
import { FamilyPensionCalculator } from "./FamilyPensionCalculator";
import { FMACalculator } from "./FMACalculator";
import { GratuityCalculator } from "./GratuityCalculator";
import { LeaveEncashmentCalculator } from "./LeaveEncashmentCalculator";
import { NPSCalculator } from "./NPSCalculator";
import { OPSCalculator } from "./OPSCalculator";
import { PFCalculator } from "./PFCalculator";
import { RELHSCalculator } from "./RELHSCalculator";
import { UPSCalculator } from "./UPSCalculator";
import { calculatedFormula, pendingCalculation, workbookFormula } from "./CalculationHelpers";
import type { BenefitCalculation, CalculationContext, SettlementCalculation, WorkbookData } from "./CalculationTypes";

export class CalculationEngine {
  calculate(
    assessment: SettlementAssessment,
    ruleResult: SettlementResult,
    workbookData?: WorkbookData,
  ): SettlementCalculation {
    const context: CalculationContext = { assessment, ruleResult, workbookData };
    const schemeCalculator =
      assessment.serviceDetails.pensionScheme === "UPS"
        ? new UPSCalculator()
        : assessment.serviceDetails.pensionScheme === "NPS"
          ? new NPSCalculator()
          : new OPSCalculator();

    const basicPension = schemeCalculator.calculate(context);
    const familyPension = new FamilyPensionCalculator().calculate(context);
    const retirementGratuity = new GratuityCalculator().calculate(context);
    const leaveCalculator = new LeaveEncashmentCalculator();
    const leaveEncashment = leaveCalculator.calculate(context);
    const halfLeaveEncashment = leaveCalculator.calculateHalfPay(context);
    const providentFund = new PFCalculator().calculate(context);
    const cgis = new CGISCalculator().calculate(context);
    const relhs = new RELHSCalculator().calculate(context);
    const fma = new FMACalculator().calculate(context);
    const commutation = new CommutationCalculator().calculate(context);
    const ctg = this.calculateCtg(context);
    const residualPension = this.calculateResidualPension(context, basicPension, commutation);
    const oneTimeBenefits = [
      retirementGratuity,
      leaveEncashment,
      halfLeaveEncashment,
      providentFund,
      cgis,
      commutation,
      ctg,
    ];

    return {
      basicPension,
      familyPension,
      retirementGratuity,
      leaveEncashment,
      halfLeaveEncashment,
      providentFund,
      cgis,
      relhs,
      fma,
      ctg,
      commutation,
      residualPension,
      totalOneTimeBenefits: this.total(oneTimeBenefits),
      monthlyPension: residualPension.monthlyAmount ?? residualPension.amount,
      monthlyFma: fma.monthlyAmount ?? 0,
      totalEstimatedSettlement: this.total(oneTimeBenefits),
    };
  }

  private total(calculations: BenefitCalculation[]): number {
    return calculations.reduce((sum, calculation) => sum + calculation.amount, 0);
  }

  private calculateCtg(context: CalculationContext): BenefitCalculation {
    const eligible = context.ruleResult.benefitResults.find((benefit) => benefit.benefitName === "Composite Transfer Grant")?.eligibility !== "Not Eligible";
    return pendingCalculation(
      "ctg",
      "Composite Transfer Grant",
      eligible,
      "Composite Transfer Grant will be calculated after official workbook mapping.",
      workbookFormula(
        "Composite Transfer Grant",
        "CTG",
        "Calculated using transfer grant rules after workbook integration.",
      ),
    );
  }

  private calculateResidualPension(
    context: CalculationContext,
    basicPension: BenefitCalculation,
    commutation: BenefitCalculation,
  ): BenefitCalculation {
    const commutedPension = Number(commutation.details?.commutedPension ?? 0);
    const residualPension = Math.max(0, basicPension.amount - commutedPension);

    return {
      key: "residualPension",
      benefitName: "Residual Pension",
      amount: residualPension,
      monthlyAmount: residualPension,
      eligible: context.assessment.serviceDetails.pensionScheme !== "NPS",
      status: context.assessment.serviceDetails.pensionScheme !== "NPS" ? "Calculated" : "Not Eligible",
      reason: context.assessment.serviceDetails.pensionScheme !== "NPS"
        ? "Residual Pension is Basic Pension minus Commuted Pension."
        : "Residual Pension is not applicable for NPS in the current rule set.",
      warnings: [],
      details: {
        basicPension: basicPension.amount,
        commutedPension,
      },
      formula: calculatedFormula(
        "Residual Pension = Basic Pension - Commuted Pension",
        "RESIDUAL_PENSION",
        "Calculated after commutation using the selected commutation percentage.",
      ),
    };
  }
}

export function runCalculationEngine(
  assessment: SettlementAssessment,
  ruleResult: SettlementResult,
  workbookData?: WorkbookData,
): SettlementCalculation {
  return new CalculationEngine().calculate(assessment, ruleResult, workbookData);
}
