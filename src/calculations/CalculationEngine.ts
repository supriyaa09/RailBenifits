import type { SettlementAssessment } from "@/lib/settlement-assessment";
import type { SettlementResult } from "@/rules/RuleTypes";
import { evaluateRetirementRules, type SettlementBenefitKey } from "@/rules/RetirementRuleEngine";
import { SETTLEMENT_RULES, toPercent } from "../../formula-engine/generated/referenceData";
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
import type {
  BenefitCalculation,
  CalculationContext,
  SettlementCalculation,
  WorkbookData,
} from "./CalculationTypes";

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
    const retirementRules = evaluateRetirementRules(assessment);
    const adjustedBasicPension = this.applyRetirementRules(
      "pension",
      basicPension,
      retirementRules,
    );
    const adjustedFamilyPension = this.applyRetirementRules(
      "familyPension",
      familyPension,
      retirementRules,
    );
    const adjustedRetirementGratuity = this.applyRetirementRules(
      "retirementGratuity",
      retirementGratuity,
      retirementRules,
    );
    const adjustedLeaveEncashment = this.applyRetirementRules(
      "leaveEncashment",
      leaveEncashment,
      retirementRules,
    );
    const adjustedHalfLeaveEncashment = this.applyRetirementRules(
      "leaveEncashment",
      halfLeaveEncashment,
      retirementRules,
    );
    const adjustedProvidentFund = this.applyRetirementRules(
      "providentFund",
      providentFund,
      retirementRules,
    );
    const adjustedCgis = this.applyRetirementRules("cgis", cgis, retirementRules);
    const adjustedRelhs = this.applyRetirementRules("relhs", relhs, retirementRules);
    const adjustedFma = this.applyRetirementRules("fma", fma, retirementRules);
    const adjustedCommutation = this.applyRetirementRules(
      "commutation",
      commutation,
      retirementRules,
    );
    const adjustedCtg = this.applyRetirementRules("ctg", ctg, retirementRules);
    const residualPension = this.calculateResidualPension(
      context,
      adjustedBasicPension,
      adjustedCommutation,
    );
    const adjustedResidualPension = this.applyRetirementRules(
      "pension",
      residualPension,
      retirementRules,
    );
    const oneTimeBenefits = [
      adjustedRetirementGratuity,
      adjustedLeaveEncashment,
      adjustedHalfLeaveEncashment,
      adjustedProvidentFund,
      adjustedCgis,
      adjustedCommutation,
      adjustedCtg,
    ];

    return {
      basicPension: adjustedBasicPension,
      familyPension: adjustedFamilyPension,
      retirementGratuity: adjustedRetirementGratuity,
      leaveEncashment: adjustedLeaveEncashment,
      halfLeaveEncashment: adjustedHalfLeaveEncashment,
      providentFund: adjustedProvidentFund,
      cgis: adjustedCgis,
      relhs: adjustedRelhs,
      fma: adjustedFma,
      ctg: adjustedCtg,
      commutation: adjustedCommutation,
      residualPension: adjustedResidualPension,
      totalOneTimeBenefits: this.total(oneTimeBenefits),
      monthlyPension: adjustedResidualPension.monthlyAmount ?? adjustedResidualPension.amount,
      monthlyFma: adjustedFma.monthlyAmount ?? 0,
      totalEstimatedSettlement: this.total(oneTimeBenefits),
    };
  }

  private total(calculations: BenefitCalculation[]): number {
    return calculations.reduce((sum, calculation) => sum + calculation.amount, 0);
  }

  private calculateCtg(context: CalculationContext): BenefitCalculation {
    const eligible =
      context.ruleResult.benefitResults.find(
        (benefit) => benefit.benefitName === "Composite Transfer Grant",
      )?.eligibility !== "Not Eligible";
    const lastDrawnBasicPay = context.assessment.salaryDetails.currentBasicPay;
    const amount = eligible ? lastDrawnBasicPay * SETTLEMENT_RULES.ctgRate : 0;
    return {
      key: "ctg",
      benefitName: "Composite Transfer Grant",
      amount: Math.round(amount),
      eligible,
      status: eligible ? "Calculated" : "Not Eligible",
      reason: eligible
        ? "Composite Transfer Grant is calculated as 80% of Last Drawn Basic Pay."
        : "Composite Transfer Grant is not eligible under Rule Engine.",
      warnings: [],
      details: {
        lastDrawnBasicPay,
        percentage: `${toPercent(SETTLEMENT_RULES.ctgRate)}%`,
      },
      formula: calculatedFormula(
        "CTG = 80% x Last Drawn Basic Pay",
        "OPS_CTG",
        "Composite Transfer Grant formula from Railway Pension Formula Sheet.",
      ),
    };
  }

  private applyRetirementRules(
    benefitKey: SettlementBenefitKey,
    calculation: BenefitCalculation,
    retirementRules: ReturnType<typeof evaluateRetirementRules>,
  ): BenefitCalculation {
    if (!retirementRules.benefits[benefitKey]) {
      return this.notAdmissible(calculation, retirementRules.reason);
    }

    if (benefitKey === "pension" && retirementRules.pensionSanctionPercentage < 100) {
      const factor = retirementRules.pensionSanctionPercentage / 100;
      const amount = Math.round(calculation.amount * factor);
      return {
        ...calculation,
        amount,
        monthlyAmount:
          calculation.monthlyAmount === undefined
            ? undefined
            : Math.round(calculation.monthlyAmount * factor),
        reason: `${calculation.reason} Sanctioned at ${retirementRules.pensionSanctionPercentage}% for ${retirementRules.label}.`,
        details: {
          ...calculation.details,
          retirementType: retirementRules.label,
          pensionSanctionPercentage: retirementRules.pensionSanctionPercentage,
        },
      };
    }

    return calculation;
  }

  private notAdmissible(calculation: BenefitCalculation, reason: string): BenefitCalculation {
    return {
      ...calculation,
      amount: 0,
      monthlyAmount: calculation.monthlyAmount === undefined ? undefined : 0,
      eligible: false,
      status: "Not Eligible",
      reason: `Not Admissible: ${reason}`,
      warnings: [],
      details: {
        ...calculation.details,
        admissibility: "Not Admissible",
      },
      formula: calculatedFormula(
        "Not admissible for selected retirement type",
        "RETIREMENT_TYPE_RULE",
        reason,
      ),
    };
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
      status:
        context.assessment.serviceDetails.pensionScheme !== "NPS" ? "Calculated" : "Not Eligible",
      reason:
        context.assessment.serviceDetails.pensionScheme !== "NPS"
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
