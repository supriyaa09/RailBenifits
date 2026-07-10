import type { BenefitCalculator, CalculationContext } from "./CalculationTypes";

export abstract class BaseBenefitCalculator implements BenefitCalculator {
  validate(_context: CalculationContext): string[] {
    return [];
  }

  abstract calculate(context: CalculationContext): ReturnType<BenefitCalculator["calculate"]>;
  abstract explain(context: CalculationContext): string;
  abstract formulaReference(): ReturnType<BenefitCalculator["formulaReference"]>;
}
