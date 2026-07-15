import { BaseBenefitCalculator } from "./BenefitCalculator";
import { calculatedAmount, calculatedFormula, calculateDearnessAllowanceAmount } from "./CalculationHelpers";
import type { CalculationContext } from "./CalculationTypes";

export class LeaveEncashmentCalculator extends BaseBenefitCalculator {
  formulaReference() {
    return calculatedFormula("LAP Encashment = (Basic Pay + DA) x LAP Days / 30", "OPS_LAP_ENCASHMENT", "OPS LAP encashment follows the Railway formula sheet.");
  }

  explain() {
    return "Leave Encashment is calculated from leave balance and salary plus DA.";
  }

  calculate(context: CalculationContext) {
    const basic = context.assessment.salaryDetails.currentBasicPay;
    const da = calculateDearnessAllowanceAmount(basic, context.assessment.salaryDetails.dearnessAllowance);
    const requestedLapDays = context.assessment.salaryDetails.lapDays;
    const effectiveLapDays = Math.min(requestedLapDays, 300);
    const amount = ((basic + da) * effectiveLapDays) / 30;
    const warnings = requestedLapDays > effectiveLapDays ? ["Combined LAP/LHAP encashment is capped at 300 days."] : [];
    return calculatedAmount("leaveEncashment", "Leave Encashment", amount, this.explain(), this.formulaReference(), {
      basicPay: basic,
      dearnessAllowanceAmount: da,
      requestedLapDays,
      effectiveLapDays,
      formula: "(Basic Pay + DA) x LAP Days / 30",
    }, warnings);
  }

  calculateHalfPay(context: CalculationContext) {
    const basic = context.assessment.salaryDetails.currentBasicPay;
    const da = calculateDearnessAllowanceAmount(basic, context.assessment.salaryDetails.dearnessAllowance);
    const requestedLapDays = context.assessment.salaryDetails.lapDays;
    const requestedLhapDays = context.assessment.salaryDetails.lhapDays;
    const effectiveLapDays = Math.min(requestedLapDays, 300);
    const effectiveLhapDays = Math.min(requestedLhapDays, Math.max(0, 300 - effectiveLapDays));
    const amount = ((basic + da) * effectiveLhapDays) / 60;
    const warnings =
      requestedLapDays + requestedLhapDays > 300
        ? ["Combined LAP/LHAP encashment is capped at 300 days. LHAP days were reduced after applying LAP days first."]
        : [];
    return calculatedAmount("halfLeaveEncashment", "Half Leave Encashment", amount, "LHAP Encashment is calculated using (Basic Pay + DA) x LHAP Days / 60.", calculatedFormula("LHAP Encashment = (Basic Pay + DA) x LHAP Days / 60", "OPS_LHAP_ENCASHMENT", "OPS LHAP encashment follows the Railway formula sheet."), {
      basicPay: basic,
      dearnessAllowanceAmount: da,
      requestedLhapDays,
      effectiveLhapDays,
      formula: "(Basic Pay + DA) x LHAP Days / 60",
    }, warnings);
  }
}
