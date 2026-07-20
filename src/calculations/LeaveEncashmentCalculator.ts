import { BaseBenefitCalculator } from "./BenefitCalculator";
import { LEAVE_RULES } from "../../formula-engine/generated/referenceData";
import {
  calculatedAmount,
  calculatedFormula,
  calculateDearnessAllowanceAmount,
} from "./CalculationHelpers";
import type { CalculationContext } from "./CalculationTypes";

export class LeaveEncashmentCalculator extends BaseBenefitCalculator {
  formulaReference() {
    return calculatedFormula(
      "Leave Encashment = (Basic Pay + DA) x Total Encashable Days / 30",
      "OPS_LEAVE_ENCASHMENT",
      "Calculated according to Railway Leave Encashment Rules 2026.",
    );
  }

  explain() {
    return "Calculated according to Railway Leave Encashment Rules (Maximum 300 encashable days, utilizing LAP first, and LHAP converted at 2:1 ratio up to 100 encashable days).";
  }

  calculate(context: CalculationContext) {
    const basic = context.assessment.salaryDetails.currentBasicPay;
    const da = calculateDearnessAllowanceAmount(
      basic,
      context.assessment.salaryDetails.dearnessAllowance,
    );
    const lapDays = context.assessment.salaryDetails.lapDays;
    const lhapDays = context.assessment.salaryDetails.lhapDays;

    // Step 1: Encashable LAP Days
    const effectiveLapDays = Math.min(lapDays, LEAVE_RULES.maxLapDays);

    // Step 2: Remaining Days
    const remainingDays = Math.max(0, LEAVE_RULES.maxTotalEncashableDays - effectiveLapDays);

    // Step 3: Encashable LHAP Days (2 LHAP Days = 1 Encashable Day)
    const convertedLhapDays = Math.floor(lhapDays / LEAVE_RULES.lhapConversionDivisor);
    const effectiveLhapDays = Math.min(
      convertedLhapDays,
      remainingDays,
      LEAVE_RULES.maxEncashableLhapDays,
    );

    // Step 4: Total Encashable Days
    const totalEncashableDays = effectiveLapDays + effectiveLhapDays;

    // Leave Encashment Amount
    const amount = ((basic + da) * totalEncashableDays) / LEAVE_RULES.monthDivisor;

    // Warnings
    const warnings: string[] = [];
    if (lapDays > LEAVE_RULES.maxLapDays) {
      warnings.push("LAP days exceed the maximum limit of 300 days.");
    }
    if (
      lapDays + lhapDays / LEAVE_RULES.lhapConversionDivisor >
      LEAVE_RULES.maxTotalEncashableDays
    ) {
      warnings.push(
        "Combined LAP and converted LHAP days exceed the maximum limit of 300 encashable days.",
      );
    }
    if (
      convertedLhapDays > LEAVE_RULES.maxEncashableLhapDays &&
      effectiveLhapDays === LEAVE_RULES.maxEncashableLhapDays
    ) {
      warnings.push(
        "Encashable LHAP days are capped at the maximum limit of 100 days (200 actual LHAP days).",
      );
    }

    return calculatedAmount(
      "leaveEncashment",
      "Leave Encashment",
      amount,
      this.explain(),
      this.formulaReference(),
      {
        basicPay: basic,
        dearnessAllowanceAmount: da,
        lapDays,
        effectiveLapDays,
        lhapDays,
        effectiveLhapDays, // Converted LHAP / Encashable LHAP
        totalEncashableDays,
        formula: "(Basic Pay + DA) x Total Encashable Days / 30",
      },
      warnings,
    );
  }

  calculateHalfPay(context: CalculationContext) {
    const lhapDays = context.assessment.salaryDetails.lhapDays;
    return {
      key: "halfLeaveEncashment" as const,
      benefitName: "Half Leave Encashment",
      amount: 0,
      eligible: false,
      status: "Not Applicable" as const,
      reason: "LHAP is converted and included in the main Leave Encashment calculation.",
      warnings: [],
      details: {
        lhapDays,
        conversionRatio: "2 LHAP Days = 1 Encashable Day",
      },
      formula: calculatedFormula(
        "LHAP Encashment is included in Leave Encashment",
        "OPS_LHAP_ENCASHMENT",
        "LHAP days are converted at 2:1 and combined with LAP days.",
      ),
    };
  }
}
