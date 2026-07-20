import type { SettlementAssessment } from "@/lib/settlement-assessment";
import type { SettlementResult } from "@/rules/RuleTypes";
import type {
  BenefitCalculation,
  BenefitCalculationKey,
  CalculationContext,
  FormulaMetadata,
  SettlementCalculation,
  WorkbookData,
} from "./CalculationTypes";

// TODO(formula-engine): Replace this placeholder with the real Formula Engine import
// once the engine exposes an application-facing TypeScript API.
// import { calculateSettlement } from "@/formula-engine";

const FORMULA_ENGINE_REFERENCE = "Formula Engine";
const FORMULA_ENGINE_PENDING_REASON =
  "Formula Engine integration is pending. Legacy calculation logic has been removed.";

export function formulaEngineFormula(formulaKey: string, explanation: string): FormulaMetadata {
  return {
    formulaName: FORMULA_ENGINE_REFERENCE,
    formulaKey,
    workbookSheet: FORMULA_ENGINE_REFERENCE,
    cellReference: "Pending Formula Engine binding",
    ruleReference: FORMULA_ENGINE_REFERENCE,
    explanation,
  };
}

export function formulaEnginePendingBenefit(
  key: BenefitCalculationKey,
  benefitName: string,
  formulaKey: string,
  details: Record<string, string | number | boolean | string[] | null> = {},
): BenefitCalculation {
  return {
    key,
    benefitName,
    amount: 0,
    monthlyAmount: monthlyAmountFor(key),
    eligible: false,
    status: "Pending Formula Engine",
    formula: formulaEngineFormula(formulaKey, FORMULA_ENGINE_PENDING_REASON),
    reason: FORMULA_ENGINE_PENDING_REASON,
    warnings: ["Connect the Formula Engine source before authorizing this calculation."],
    details: {
      source: FORMULA_ENGINE_REFERENCE,
      integrationStatus: "Pending",
      ...details,
    },
  };
}

export function calculateWithFormulaEngine(
  assessment: SettlementAssessment,
  ruleResult: SettlementResult,
  workbookData?: WorkbookData,
): SettlementCalculation {
  const context: CalculationContext = { assessment, ruleResult, workbookData };
  const basicPension = formulaEnginePendingBenefit(
    "basicPension",
    "Basic Pension",
    `${assessment.serviceDetails.pensionScheme}_BASIC_PENSION`,
  );
  const familyPension = formulaEnginePendingBenefit(
    "familyPension",
    "Family Pension",
    "FAMILY_PENSION",
  );
  const retirementGratuity = formulaEnginePendingBenefit(
    "retirementGratuity",
    "Retirement Gratuity",
    "RETIREMENT_GRATUITY",
  );
  const leaveEncashment = formulaEnginePendingBenefit(
    "leaveEncashment",
    "Leave Encashment",
    "LEAVE_ENCASHMENT",
  );
  const halfLeaveEncashment = formulaEnginePendingBenefit(
    "halfLeaveEncashment",
    "Half Leave Encashment",
    "HALF_LEAVE_ENCASHMENT",
  );
  const providentFund = formulaEnginePendingBenefit(
    "providentFund",
    "Provident Fund",
    "PROVIDENT_FUND",
  );
  const cgis = formulaEnginePendingBenefit("cgis", "CGIS", "CGEGIS");
  const relhs = formulaEnginePendingBenefit("relhs", "RELHS", "RELHS");
  const fma = formulaEnginePendingBenefit("fma", "Fixed Medical Allowance", "FMA");
  const ctg = formulaEnginePendingBenefit("ctg", "Composite Transfer Grant", "CTG");
  const commutation = formulaEnginePendingBenefit("commutation", "Commutation", "COMMUTATION");
  const residualPension = formulaEnginePendingBenefit(
    "residualPension",
    "Residual Pension",
    "RESIDUAL_PENSION",
  );

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
    totalOneTimeBenefits: 0,
    monthlyPension: 0,
    monthlyFma: 0,
    totalEstimatedSettlement: 0,
  };
}

export function formulaEngineContextDetails(context: CalculationContext) {
  return {
    pensionScheme: context.assessment.serviceDetails.pensionScheme,
    retirementCategory: context.assessment.serviceDetails.retirementCategory,
  };
}

function monthlyAmountFor(key: BenefitCalculationKey): number | undefined {
  return key === "basicPension" ||
    key === "familyPension" ||
    key === "fma" ||
    key === "residualPension"
    ? 0
    : undefined;
}
