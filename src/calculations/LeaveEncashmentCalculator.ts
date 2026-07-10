import { BaseBenefitCalculator } from "./BenefitCalculator";
import { calculatedAmount, calculatedFormula, calculateDearnessAllowanceAmount } from "./CalculationHelpers";
import type { CalculationContext } from "./CalculationTypes";

export class LeaveEncashmentCalculator extends BaseBenefitCalculator {
  formulaReference() {
    return calculatedFormula("Leave Encashment = (Basic + DA) x LAP Days / 30", "LEAVE_ENCASHMENT", "Half-pay leave uses configurable half-pay salary basis.");
  }

  explain() {
    return "Leave Encashment is calculated from leave balance and salary plus DA.";
  }

  calculate(context: CalculationContext) {
    const basic = context.assessment.salaryDetails.currentBasicPay;
    const da = calculateDearnessAllowanceAmount(basic, context.assessment.salaryDetails.dearnessAllowance);
    const amount = ((basic + da) * context.assessment.salaryDetails.lapDays) / 30;
    return calculatedAmount("leaveEncashment", "Leave Encashment", amount, this.explain(), this.formulaReference(), {
      basicPay: basic,
      dearnessAllowanceAmount: da,
      lapDays: context.assessment.salaryDetails.lapDays,
    });
  }

  calculateHalfPay(context: CalculationContext) {
    const basic = context.assessment.salaryDetails.currentBasicPay;
    const da = calculateDearnessAllowanceAmount(basic, context.assessment.salaryDetails.dearnessAllowance);
    const halfPaySalary = basic / 2 + da;
    const amount = (halfPaySalary * context.assessment.salaryDetails.lhapDays) / 30;
    return calculatedAmount("halfLeaveEncashment", "Half Leave Encashment", amount, "Half Leave Encashment is calculated using half-pay leave salary.", calculatedFormula("Half Leave Encashment = Applicable Half Leave Salary x LHAP Days / 30", "HALF_LEAVE_ENCASHMENT", "Architecture allows this rule to change later."), {
      halfPaySalary,
      lhapDays: context.assessment.salaryDetails.lhapDays,
    });
  }
}
