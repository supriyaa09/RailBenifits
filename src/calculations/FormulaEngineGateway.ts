import { calculateAgeNextBirthday, addQualifyingService } from "../lib/settlement-assessment.ts";
import type { SettlementAssessment } from "../lib/settlement-assessment.ts";
import type { SettlementResult } from "../rules/RuleTypes.ts";
import {
  PENSION_RATES,
  GRATUITY_RULES,
  LEAVE_RULES,
  SETTLEMENT_RULES,
  COMMUTATION_FACTORS,
  findDeathGratuitySlab,
} from "../../formulas/generated/referenceData.ts";
import { evaluateRELHS, evaluateFMAWithRELHS } from "./relhs/RELHSService.ts";
import {
  evaluateRetirementRules,
  type RetirementRuleDecision,
  type SettlementBenefitKey,
} from "../rules/RetirementRuleEngine.ts";
import type {
  BenefitCalculation,
  BenefitCalculationKey,
  CalculationContext,
  FormulaMetadata,
  SettlementCalculation,
  WorkbookData,
} from "./CalculationTypes.ts";

// ---------------------------------------------------------------------------
// Dynamic Rule Loader & Math Expression Evaluator
// ---------------------------------------------------------------------------

function findActiveRuleVersion(ruleId: string, retirementDate: string, dbRuleVersions?: any[]): any | null {
  if (!dbRuleVersions || dbRuleVersions.length === 0) return null;
  
  // Find approved rule versions for the ruleId which are effective on or before the retirement date
  const matches = dbRuleVersions.filter(
    (v: any) => v.rule_id === ruleId && v.status === "Approved" && v.effective_date <= retirementDate
  );
  
  if (matches.length === 0) return null;
  
  // Sort descending by effective_date, then version
  matches.sort((a: any, b: any) => {
    if (a.effective_date !== b.effective_date) {
      return b.effective_date.localeCompare(a.effective_date);
    }
    return b.version - a.version;
  });
  
  return matches[0];
}

function evaluateSimpleArithmetic(expr: string): number {
  const sanitized = expr.replace(/[^0-9.+\-*/() ]/g, "");
  try {
    const fn = new Function(`return (${sanitized});`);
    return fn();
  } catch {
    return 0;
  }
}

function resolveMinMax(expr: string): string {
  let changed = true;
  let iterations = 0;
  while (changed && iterations < 50) {
    iterations++;
    changed = false;

    // Find first "Min(" or "Max(" case-insensitively
    const matchMin = expr.match(/Min\(/i);
    const matchMax = expr.match(/Max\(/i);
    
    const indexMin = matchMin && matchMin.index !== undefined ? matchMin.index : -1;
    const indexMax = matchMax && matchMax.index !== undefined ? matchMax.index : -1;
    
    let isMin = false;
    let startIdx = -1;
    
    if (indexMin !== -1 && (indexMax === -1 || indexMin < indexMax)) {
      isMin = true;
      startIdx = indexMin;
    } else if (indexMax !== -1) {
      isMin = false;
      startIdx = indexMax;
    }

    if (startIdx === -1) break;

    // Find the matching closing parenthesis by balancing parentheses
    let balance = 1;
    let i = startIdx + 4; // Skip "Min(" or "Max("
    let endIdx = -1;
    for (; i < expr.length; i++) {
      if (expr[i] === "(") balance++;
      else if (expr[i] === ")") balance--;
      
      if (balance === 0) {
        endIdx = i;
        break;
      }
    }

    if (endIdx === -1) break;

    const inside = expr.slice(startIdx + 4, endIdx);
    
    // Split arguments at top-level commas (ignoring commas inside nested parentheses)
    const args: string[] = [];
    let currentArg = "";
    let pBalance = 0;
    for (let charIdx = 0; charIdx < inside.length; charIdx++) {
      const char = inside[charIdx];
      if (char === "(") pBalance++;
      else if (char === ")") pBalance--;
      
      if (char === "," && pBalance === 0) {
        args.push(currentArg);
        currentArg = "";
      } else {
        currentArg += char;
      }
    }
    args.push(currentArg);

    const evaluatedArgs = args.map((arg) => {
      const resolvedArg = resolveMinMax(arg);
      return evaluateSimpleArithmetic(resolvedArg);
    });

    const val = isMin ? Math.min(...evaluatedArgs) : Math.max(...evaluatedArgs);
    const toReplace = expr.slice(startIdx, endIdx + 1);
    expr = expr.replace(toReplace, val.toString());
    changed = true;
  }
  return expr;
}

export function evaluateMathFormula(formulaStr: string, variables: Record<string, number>): number {
  try {
    let expr = formulaStr;
    
    // Sort variables by length descending to prevent partial replacements (e.g. AverageEmoluments vs Emoluments)
    const sortedVarNames = Object.keys(variables).sort((a, b) => b.length - a.length);
    for (const name of sortedVarNames) {
      const val = variables[name];
      const regex = new RegExp(`\\b${name}\\b`, "g");
      expr = expr.replace(regex, val.toString());
    }

    // Resolve Min/Max statements
    expr = resolveMinMax(expr);

    // Sanitize the rest
    const sanitized = expr.replace(/[^0-9.+\-*/() ]/g, "");
    if (/[^0-9.+\-*/() ]/.test(sanitized)) {
      throw new Error("Invalid characters in expression");
    }
    
    const fn = new Function(`return (${sanitized});`);
    return fn();
  } catch (e) {
    console.error("Error evaluating formula string:", formulaStr, e);
    return 0;
  }
}

export function evaluateRuleFormula(
  version: any,
  variables: Record<string, number>,
  fallbackValue: number
): { amount: number; formulaUsed: string } {
  if (!version || !version.formula) {
    return { amount: fallbackValue, formulaUsed: "Fallback Standard Formula" };
  }
  
  const rawAmount = evaluateMathFormula(version.formula, variables);
  let amount = rawAmount;
  
  // Apply minimum limit
  if (version.minimum_limit !== null && version.minimum_limit !== undefined && amount < version.minimum_limit) {
    amount = version.minimum_limit;
  }
  
  // Apply maximum limit
  if (version.maximum_limit !== null && version.maximum_limit !== undefined && version.maximum_limit > 0 && amount > version.maximum_limit) {
    amount = version.maximum_limit;
  }
  
  return {
    amount: Math.round(amount),
    formulaUsed: version.formula
  };
}

// ---------------------------------------------------------------------------
// Formula metadata helpers
// ---------------------------------------------------------------------------

const ENGINE = "Formula Engine";

export function formulaEngineFormula(formulaKey: string, explanation: string): FormulaMetadata {
  return {
    formulaName: ENGINE,
    formulaKey,
    workbookSheet: ENGINE,
    cellReference: `formulas/generated/referenceData.ts`,
    ruleReference: "Railway Pension Rules 2026",
    explanation,
  };
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

function benefit(
  key: BenefitCalculationKey,
  benefitName: string,
  amount: number,
  eligible: boolean,
  reason: string,
  formulaKey: string,
  explanation: string,
  details: Record<string, string | number | boolean | string[] | null> = {},
  warnings: string[] = [],
  monthlyAmount?: number,
): BenefitCalculation {
  return {
    key,
    benefitName,
    amount: Math.round(amount),
    monthlyAmount,
    eligible,
    status: eligible ? "Calculated" : "Not Eligible",
    formula: formulaEngineFormula(formulaKey, explanation),
    reason,
    warnings,
    details,
  };
}

function notEligible(
  key: BenefitCalculationKey,
  benefitName: string,
  reason: string,
  formulaKey: string,
): BenefitCalculation {
  return benefit(key, benefitName, 0, false, reason, formulaKey, reason);
}

function manualInput(
  key: BenefitCalculationKey,
  benefitName: string,
  amount: number,
  reason: string,
): BenefitCalculation {
  return {
    key,
    benefitName,
    amount: Math.round(amount),
    eligible: amount > 0,
    status: "Manual Input",
    formula: formulaEngineFormula(`${key.toUpperCase()}_MANUAL_INPUT`, reason),
    reason,
    warnings: [],
    details: {},
  };
}

// ---------------------------------------------------------------------------
// Individual benefit calculators
// ---------------------------------------------------------------------------

function calcBasicPension(
  context: CalculationContext,
  decision: RetirementRuleDecision,
): BenefitCalculation {
  const { assessment, dbRuleVersions } = context;
  const scheme = assessment.serviceDetails.pensionScheme;
  const admissible = decision.benefits["pension" as SettlementBenefitKey];
  if (!admissible) {
    return notEligible("basicPension", "Basic Pension", decision.reason, `${scheme}_BASIC_PENSION`);
  }
  const emoluments = assessment.promotionDetails.emoluments;
  const sanctionPct = decision.pensionSanctionPercentage / 100;

  // Try DB version lookup for Pension Rule (R203)
  const exitDate = assessment.serviceDetails.dateOfExit;
  const version = findActiveRuleVersion("R203", exitDate, dbRuleVersions);

  let amount: number;
  let formulaKey = `${scheme}_BASIC_PENSION`;
  let formulaExpl = "Basic Pension = Emoluments × 50% × Sanction Percentage";
  let explanation = "";

  const variables = {
    BasicPay: assessment.salaryDetails.currentBasicPay,
    Emoluments: emoluments,
    AverageEmoluments: assessment.promotionDetails.averageLastTenMonthsBasicPay || emoluments,
    DA: assessment.salaryDetails.dearnessAllowance,
  };

  if (version) {
    const res = evaluateRuleFormula(version, variables, emoluments * 0.5);
    amount = res.amount * sanctionPct;
    formulaExpl = `Formula: ${version.formula} (Version ${version.version}, Effective ${version.effective_date})`;
    explanation = `Basic Pension = [Extracted Formula Evaluated: ₹${res.amount.toLocaleString("en-IN")}] × ${decision.pensionSanctionPercentage}% sanction (Circular: ${version.rule_number}).`;
  } else {
    amount = emoluments * PENSION_RATES.basicPension * sanctionPct;
    explanation = `Basic Pension = ${PENSION_RATES.basicPension * 100}% of emoluments × ${decision.pensionSanctionPercentage}% sanction.`;
  }

  return benefit(
    "basicPension",
    "Basic Pension",
    amount,
    true,
    explanation,
    formulaKey,
    formulaExpl,
    {
      emoluments,
      pensionRate: version ? "Dynamic (DB)" : PENSION_RATES.basicPension,
      pensionSanctionPercentage: decision.pensionSanctionPercentage,
      pensionScheme: scheme,
      ruleReference: version ? version.rule_number : "Railway Pension Rules 2026",
    },
    undefined,
    amount,
  );
}

function calcFamilyPension(
  context: CalculationContext,
  decision: RetirementRuleDecision,
): BenefitCalculation {
  const { assessment, dbRuleVersions } = context;
  const admissible = decision.benefits["familyPension" as SettlementBenefitKey];
  if (!admissible) {
    return notEligible("familyPension", "Family Pension", decision.reason, "FAMILY_PENSION");
  }
  const emoluments = assessment.promotionDetails.emoluments;
  const isEnhanced = decision.enhancedFamilyPension === true;
  const exitDate = assessment.serviceDetails.dateOfExit;

  const ruleId = isEnhanced ? "R312" : "R310";
  const version = findActiveRuleVersion(ruleId, exitDate, dbRuleVersions);

  let amount: number;
  let formulaExpl = "Family Pension = Emoluments × 30% (ordinary) or 50% (enhanced)";
  let explanation = "";

  const variables = {
    BasicPay: assessment.salaryDetails.currentBasicPay,
    Emoluments: emoluments,
    AverageEmoluments: assessment.promotionDetails.averageLastTenMonthsBasicPay || emoluments,
    DA: assessment.salaryDetails.dearnessAllowance,
  };

  if (version) {
    const res = evaluateRuleFormula(version, variables, isEnhanced ? emoluments * 0.5 : emoluments * 0.3);
    amount = res.amount;
    formulaExpl = `Formula: ${version.formula} (Version ${version.version}, Effective ${version.effective_date})`;
    explanation = `Family Pension = [Extracted Formula Evaluated: ₹${amount.toLocaleString("en-IN")}] (${isEnhanced ? "enhanced" : "ordinary"} rate from Circular: ${version.rule_number}).`;
  } else {
    const rate = isEnhanced
      ? PENSION_RATES.familyPension.enhanced
      : PENSION_RATES.familyPension.ordinary;
    amount = emoluments * rate;
    explanation = isEnhanced
      ? `Family Pension = ${rate * 100}% of emoluments (enhanced rate).`
      : `Family Pension = ${rate * 100}% of emoluments (ordinary rate).`;
  }

  const enhancedFamilyPension = emoluments * 0.5;

  return benefit(
    "familyPension",
    "Family Pension",
    amount,
    true,
    explanation,
    "FAMILY_PENSION",
    formulaExpl,
    {
      emoluments,
      rate: version ? "Dynamic (DB)" : (isEnhanced ? PENSION_RATES.familyPension.enhanced : PENSION_RATES.familyPension.ordinary),
      enhancedFamilyPension,
      ruleReference: version ? version.rule_number : "Railway Pension Rules 2026",
    },
    undefined,
    amount,
  );
}

function calcRetirementGratuity(
  context: CalculationContext,
  decision: RetirementRuleDecision,
): BenefitCalculation {
  const { assessment, dbRuleVersions } = context;
  const admissible = decision.benefits["retirementGratuity" as SettlementBenefitKey];
  const isDeath = assessment.serviceDetails.otherRetirementType === "death";

  if (!admissible) {
    return notEligible(
      "retirementGratuity",
      "Retirement Gratuity",
      decision.reason,
      "RETIREMENT_GRATUITY",
    );
  }

  const emoluments = assessment.promotionDetails.emoluments;
  const da = assessment.salaryDetails.dearnessAllowance;
  const qs = assessment.serviceDetails.qualifyingService;
  const details = assessment.serviceDetails.otherRetirementDetails;

  // For medical retirement: add notional service addition if present
  const effectiveQS =
    assessment.serviceDetails.otherRetirementType === "medical" && details?.notionalServiceAddition
      ? addQualifyingService(qs, details.notionalServiceAddition)
      : qs;

  const serviceYears = effectiveQS.years + effectiveQS.months / 12;

  if (!isDeath && serviceYears < 5) {
    return notEligible(
      "retirementGratuity",
      "Retirement Gratuity",
      `Qualifying service of ${serviceYears.toFixed(2)} years is less than the required minimum of 5 years for retirement gratuity.`,
      "RETIREMENT_GRATUITY",
    );
  }

  const exitDate = assessment.serviceDetails.dateOfExit;
  const version = findActiveRuleVersion("R405", exitDate, dbRuleVersions);

  let amount: number;
  let formula: string;
  let maxLimit = version ? version.maximum_limit : GRATUITY_RULES.maximumLimit;
  if (!maxLimit || maxLimit <= 0) maxLimit = 2000000; // safe default

  const variables = {
    BasicPay: assessment.salaryDetails.currentBasicPay,
    Emoluments: emoluments,
    AverageEmoluments: assessment.promotionDetails.averageLastTenMonthsBasicPay || emoluments,
    DA: da,
    QualifyingServiceYears: serviceYears,
  };

  if (version) {
    // Dynamic rule evaluation from DB
    const res = evaluateRuleFormula(version, variables, 0);
    amount = res.amount;
    formula = `Retirement Gratuity = [Extracted Formula: ${version.formula}] (capped at ₹${maxLimit.toLocaleString("en-IN")}, Circular: ${version.rule_number})`;
  } else {
    // Standard calculation logic
    if (isDeath) {
      // Death Gratuity: slab-based
      const slab = findDeathGratuitySlab(effectiveQS.years);
      if (slab) {
        const rawAmount = (emoluments + da) * slab.multiplier;
        amount = Math.min(rawAmount, maxLimit);
        formula = `Death Gratuity = (Emoluments + DA) × ${slab.multiplier} (slab for ${slab.minYears}–${slab.maxYearsExclusive ?? "+"} yrs), capped at ₹${maxLimit.toLocaleString("en-IN")}`;
      } else {
        // Long service (20+ years): half monthly emoluments per completed 6-month period, capped at 33× and ₹2,000,000
        const periods = Math.floor(serviceYears * 2);
        const rawAmount = (emoluments + da) * GRATUITY_RULES.longServiceDeathMultiplier * periods;
        const thirtyThreeLimit = (emoluments + da) * 33;
        amount = Math.min(rawAmount, thirtyThreeLimit, maxLimit);
        formula = `Death Gratuity (long service) = (Emoluments + DA) × 0.5 × completed 6-month periods, capped at 33×Emoluments and ₹${maxLimit.toLocaleString("en-IN")}`;
      }
    } else {
      // Retirement Gratuity: (Emoluments + DA) × qualifying service years / 4, capped at 16.5×Emoluments and the gratuity ceiling
      const completedHalfYears = Math.floor(serviceYears * 2);
      const rawAmount = (emoluments + da) * 0.25 * completedHalfYears;
      const sixteenPointFiveLimit = (emoluments + da) * 16.5;
      amount = Math.min(rawAmount, sixteenPointFiveLimit, maxLimit);
      formula = `Retirement Gratuity = (Emoluments + DA) × ¼ × completed 6-month periods, capped at 16.5×(Emoluments + DA) and ₹${maxLimit.toLocaleString("en-IN")}`;
    }
  }

  return benefit(
    "retirementGratuity",
    isDeath ? "Death Gratuity" : "Retirement Gratuity",
    amount,
    true,
    formula,
    isDeath ? "DEATH_GRATUITY" : "RETIREMENT_GRATUITY",
    formula,
    {
      emoluments,
      dearnessAllowance: da,
      qualifyingServiceYears: effectiveQS.years,
      qualifyingServiceMonths: effectiveQS.months,
      maximumLimit: maxLimit,
      isDeath,
      ruleReference: version ? version.rule_number : "Railway Pension Rules 2026",
    },
    amount >= maxLimit
      ? [
          `Gratuity capped at the maximum limit of ₹${maxLimit.toLocaleString("en-IN")}.`,
        ]
      : [],
  );
}

function calcLeaveEncashment(
  context: CalculationContext,
  decision: RetirementRuleDecision,
): BenefitCalculation {
  const { assessment, dbRuleVersions } = context;
  const admissible = decision.benefits["leaveEncashment" as SettlementBenefitKey];
  if (!admissible) {
    return notEligible(
      "leaveEncashment",
      "Leave Encashment",
      decision.reason,
      "OPS_LEAVE_ENCASHMENT",
    );
  }

  const basic = assessment.salaryDetails.currentBasicPay;
  const daPercent = assessment.salaryDetails.dearnessAllowance;
  const daAmount = (basic * daPercent) / 100;
  const lapDays = assessment.salaryDetails.lapDays;
  const lhapDays = assessment.salaryDetails.lhapDays;

  // Determine exit type
  const otherRetirementType = assessment.serviceDetails.otherRetirementType;
  const isVoluntary = otherRetirementType === "voluntary";
  const isCompulsory = otherRetirementType === "compulsory";
  const isMedical = otherRetirementType === "medical";
  const isDeath = otherRetirementType === "death";
  const isResignation =
    otherRetirementType === "self-resignation" &&
    assessment.serviceDetails.otherRetirementDetails?.technicalResignation !== true;
  const isTechnicalResignation =
    otherRetirementType === "self-resignation" &&
    assessment.serviceDetails.otherRetirementDetails?.technicalResignation === true;

  const warnings: string[] = [];

  if (isTechnicalResignation) {
    return {
      key: "leaveEncashment",
      benefitName: "Leave Encashment",
      amount: 0,
      eligible: true,
      status: "Leave Transferred",
      formula: formulaEngineFormula(
        "OPS_LEAVE_ENCASHMENT",
        "Technical Resignation: Leave Encashment is not payable. Leave balance is transferred to the new Government organization.",
      ),
      reason: "Technical resignation. Leave balance transferred.",
      warnings: [],
      details: {
        basicPay: basic,
        dearnessAllowanceAmount: daAmount,
        lapDays,
        lhapDays,
        status: "Leave Transferred",
      },
    };
  }

  const exitDate = assessment.serviceDetails.dateOfExit;
  const version = findActiveRuleVersion("R502", exitDate, dbRuleVersions);

  let amount: number;
  let formulaExplanation: string;
  let totalEncashableDays = 0;
  let effectiveLapDays = 0;
  let effectiveLhapDays = 0;

  const maxLap = version && version.maximum_limit !== null ? version.maximum_limit : LEAVE_RULES.maxLapDays; // e.g. 300 days

  const variables = {
    BasicPay: basic,
    DA: daPercent,
    LAPDays: lapDays,
    LHAPDays: lhapDays,
  };

  if (version) {
    // Dynamic rule evaluation from DB
    const res = evaluateRuleFormula(version, variables, 0);
    amount = res.amount;
    formulaExplanation = `Leave Encashment = [Extracted Formula: ${version.formula}] (Circular: ${version.rule_number})`;

    // For breakdown details, calculate days using default logic
    effectiveLapDays = Math.min(lapDays, maxLap);
    const remainingDays = Math.max(0, maxLap - effectiveLapDays);
    const convertedLhapDays = Math.floor(lhapDays / 2);
    effectiveLhapDays = Math.min(convertedLhapDays, remainingDays, 100);
    totalEncashableDays = effectiveLapDays + effectiveLhapDays;
  } else {
    // Default logic
    if (isResignation) {
      totalEncashableDays = Math.min(Math.floor(lapDays * 0.5), 150);
      effectiveLapDays = totalEncashableDays;
      effectiveLhapDays = 0;
      if (lapDays * 0.5 > 150) {
        warnings.push(
          `Resignation Leave Encashment (50% of LAP) is capped at the maximum limit of 150 days.`,
        );
      }
    } else {
      effectiveLapDays = Math.min(lapDays, LEAVE_RULES.maxLapDays);
      const remainingDays = Math.max(0, LEAVE_RULES.maxTotalEncashableDays - effectiveLapDays);
      const convertedLhapDays = Math.floor(lhapDays / LEAVE_RULES.lhapConversionDivisor);
      effectiveLhapDays = Math.min(
        convertedLhapDays,
        remainingDays,
        LEAVE_RULES.maxEncashableLhapDays,
      );
      totalEncashableDays = effectiveLapDays + effectiveLhapDays;

      if (lapDays > LEAVE_RULES.maxLapDays) {
        warnings.push(`LAP days exceed the maximum limit of ${LEAVE_RULES.maxLapDays} days.`);
      }
      if (
        lapDays + lhapDays / LEAVE_RULES.lhapConversionDivisor >
        LEAVE_RULES.maxTotalEncashableDays
      ) {
        warnings.push(
          `Combined LAP and converted LHAP days exceed the maximum limit of ${LEAVE_RULES.maxTotalEncashableDays} encashable days.`,
        );
      }
      if (
        convertedLhapDays > LEAVE_RULES.maxEncashableLhapDays &&
        effectiveLhapDays === LEAVE_RULES.maxEncashableLhapDays
      ) {
        warnings.push(
          `Encashable LHAP days are capped at the maximum limit of ${LEAVE_RULES.maxEncashableLhapDays} days.`,
        );
      }
    }

    // Calculate Leave Salary
    const leaveSalaryPerDay = (basic + daAmount) / 30;
    amount = totalEncashableDays * leaveSalaryPerDay;
    formulaExplanation = isResignation
      ? `Leave Encashment = MIN(50% × LAP, 150) × (Basic Pay + DA) / 30`
      : `Leave Encashment = (Basic Pay + DA) × Total Encashable Days / 30`;
  }

  let exitLabel = "Superannuation";
  if (isVoluntary) exitLabel = "Voluntary Retirement";
  else if (isCompulsory) exitLabel = "Compulsory Retirement";
  else if (isMedical) exitLabel = "Medical Retirement";
  else if (isDeath) exitLabel = "Death Case";
  else if (isResignation) exitLabel = "Resignation Case";

  return benefit(
    "leaveEncashment",
    "Leave Encashment",
    amount,
    true,
    `Leave Encashment calculated for ${exitLabel} with ${totalEncashableDays} eligible days.`,
    "OPS_LEAVE_ENCASHMENT",
    formulaExplanation,
    {
      basicPay: basic,
      dearnessAllowanceAmount: daAmount,
      lapDays,
      effectiveLapDays,
      lhapDays,
      effectiveLhapDays,
      totalEncashableDays,
      exitLabel,
      ruleReference: version ? version.rule_number : "Railway Pension Rules 2026",
    },
    warnings,
  );
}

function calcHalfLeaveEncashment(context: CalculationContext): BenefitCalculation {
  // LHAP is converted and included in main Leave Encashment; this benefit is always not-applicable.
  return {
    key: "halfLeaveEncashment",
    benefitName: "Half Leave Encashment",
    amount: 0,
    eligible: false,
    status: "Not Eligible",
    reason: "LHAP is converted and included in the main Leave Encashment calculation.",
    formula: formulaEngineFormula(
      "OPS_LHAP_ENCASHMENT",
      "LHAP days are converted at 2:1 and combined with LAP days.",
    ),
    warnings: [],
    details: {
      lhapDays: context.assessment.salaryDetails.lhapDays,
      conversionRatio: "2 LHAP Days = 1 Encashable Day",
    },
  };
}

function calcProvidentFund(context: CalculationContext): BenefitCalculation {
  return manualInput(
    "providentFund",
    "Provident Fund",
    context.assessment.salaryDetails.providentFund,
    "PF amount is taken from the manually entered assessment value.",
  );
}

function calcCGIS(context: CalculationContext): BenefitCalculation {
  return manualInput(
    "cgis",
    "CGIS",
    context.assessment.salaryDetails.cgis,
    "CGIS amount is taken from the manually entered assessment value.",
  );
}

function calcRELHS(
  context: CalculationContext,
  decision: RetirementRuleDecision,
): BenefitCalculation {
  const { assessment } = context;
  const admissible = decision.benefits["relhs" as SettlementBenefitKey];
  if (!admissible) {
    return notEligible("relhs", "RELHS", decision.reason, "RELHS_SUBSCRIPTION");
  }

  const relhs = evaluateRELHS(assessment);
  return benefit(
    "relhs",
    "RELHS",
    relhs.subscriptionAmount,
    relhs.eligible,
    relhs.reason,
    "RELHS_SUBSCRIPTION",
    "RELHS subscription is calculated from Pay Matrix Level using the RELHS subscription lookup table.",
    {
      medicalCard: relhs.medicalCard,
      familyEligible: relhs.familyEligible,
      verificationStatus: relhs.verificationStatus,
      subscriptionBand: relhs.subscriptionBand,
      payMatrixLevel: relhs.payMatrixLevel,
      requiredDocuments: relhs.requiredDocuments,
      ruleReference: relhs.ruleReference,
      remarks: relhs.remarks,
    },
    relhs.verificationStatus === "Automatic" ? [] : [relhs.remarks],
  );
}

function calcFMA(
  context: CalculationContext,
  decision: RetirementRuleDecision,
): BenefitCalculation {
  const { assessment } = context;
  const admissible = decision.benefits["fma" as SettlementBenefitKey];
  if (!admissible) {
    return notEligible("fma", "Fixed Medical Allowance", decision.reason, "FMA_MONTHLY_AMOUNT");
  }

  const relhs = evaluateRELHS(assessment);
  const fma = evaluateFMAWithRELHS(assessment, relhs);

  return benefit(
    "fma",
    "Fixed Medical Allowance",
    0, // one-time amount is 0; FMA is a monthly benefit
    fma.eligible,
    fma.reason,
    "FMA_MONTHLY_AMOUNT",
    "FMA monthly amount is driven by RELHS eligibility and the employee's FMA option.",
    {
      relhsEligible: relhs.eligible,
      fmaStatus: fma.status,
      reference: fma.reference,
    },
    [],
    fma.eligible ? fma.monthlyAmount : 0,
  );
}

function calcCTG(
  context: CalculationContext,
  decision: RetirementRuleDecision,
): BenefitCalculation {
  const { assessment } = context;
  const admissible = decision.benefits["ctg" as SettlementBenefitKey];
  if (!admissible) {
    return notEligible("ctg", "Composite Transfer Grant", decision.reason, "CTG");
  }

  const emoluments = assessment.promotionDetails.emoluments;
  const amount = emoluments * SETTLEMENT_RULES.ctgRate;
  return benefit(
    "ctg",
    "Composite Transfer Grant",
    amount,
    true,
    `CTG = ${SETTLEMENT_RULES.ctgRate * 100}% of Emoluments`,
    "CTG",
    `Composite Transfer Grant = Emoluments × ${SETTLEMENT_RULES.ctgRate}`,
    {
      emoluments,
      ctgRate: SETTLEMENT_RULES.ctgRate,
    },
  );
}

function calcCommutation(
  context: CalculationContext,
  decision: RetirementRuleDecision,
  basicPensionAmount: number,
): BenefitCalculation {
  const { assessment } = context;
  const admissible = decision.benefits["commutation" as SettlementBenefitKey];
  if (!admissible) {
    return notEligible(
      "commutation",
      "Commutation",
      decision.reason,
      "COMMUTATION_FACTOR_BY_AGE_NEXT_BIRTHDAY",
    );
  }

  const opted = assessment.commutationDetails.commutationOpted;
  if (!opted) {
    return notEligible(
      "commutation",
      "Commutation",
      "Employee did not opt for commutation.",
      "COMMUTATION_FACTOR_BY_AGE_NEXT_BIRTHDAY",
    );
  }

  if (assessment.serviceDetails.pensionScheme !== "OPS") {
    return notEligible(
      "commutation",
      "Commutation",
      "Commutation is only applicable under OPS.",
      "COMMUTATION_FACTOR_BY_AGE_NEXT_BIRTHDAY",
    );
  }

  const ageNextBirthday = calculateAgeNextBirthday(
    assessment.employeeDetails.dateOfBirth,
    new Date(assessment.serviceDetails.dateOfExit),
  );
  if (ageNextBirthday === null || ageNextBirthday === undefined) {
    return notEligible(
      "commutation",
      "Commutation",
      "Invalid date of birth provided, cannot calculate age next birthday.",
      "COMMUTATION_FACTOR_BY_AGE_NEXT_BIRTHDAY",
    );
  }

  const row = COMMUTATION_FACTORS.find((r) => r.age_next_birthday === ageNextBirthday && r.active);

  if (!row) {
    return {
      key: "commutation",
      benefitName: "Commutation",
      amount: 0,
      eligible: false,
      status: "Not Eligible",
      formula: formulaEngineFormula(
        "COMMUTATION_FACTOR_BY_AGE_NEXT_BIRTHDAY",
        "Commutation factor is fetched from COMMUTATION_FACTORS table by Age Next Birthday.",
      ),
      reason: `No active commutation factor found for Age Next Birthday ${ageNextBirthday}. Upload the official table to enable calculation.`,
      warnings: ["Commutation factor table is empty or missing this age."],
      details: { ageNextBirthday },
    };
  }

  const percentage = assessment.commutationDetails.commutationPercentage;
  const commutedPension = (basicPensionAmount * percentage) / 100;
  const amount = commutedPension * row.factor * 12;

  return benefit(
    "commutation",
    "Commutation",
    amount,
    true,
    `Commuted Value = Commuted Pension (${percentage}% of ₹${Math.round(basicPensionAmount)}) × 12 × Factor ${row.factor}`,
    "COMMUTATION_FACTOR_BY_AGE_NEXT_BIRTHDAY",
    "Commuted Value = Commuted Pension × 12 × Commutation Factor (by Age Next Birthday)",
    {
      ageNextBirthday: row.age_next_birthday,
      commutationFactor: row.factor,
      factorSource: "formulas/generated/referenceData.ts",
      effectiveFrom: row.effective_from,
      circularNumber: row.circular_number,
      commutationOpted: opted,
      commutationPercentage: percentage,
      basicPension: Math.round(basicPensionAmount),
      commutedPension: Math.round(commutedPension),
      residualPension: Math.round(basicPensionAmount - commutedPension),
      formula:
        "Commuted Pension = Pension × Commutation%; Commuted Value = Commuted Pension × 12 × Factor",
    },
  );
}

function calcResidualPension(
  context: CalculationContext,
  decision: RetirementRuleDecision,
  basicPensionAmount: number,
  commutationAmount: number,
): BenefitCalculation {
  const { assessment } = context;
  const admissible = decision.benefits["pension" as SettlementBenefitKey];
  if (!admissible) {
    return notEligible("residualPension", "Residual Pension", decision.reason, "RESIDUAL_PENSION");
  }

  const opted = assessment.commutationDetails.commutationOpted;
  const percentage = opted ? assessment.commutationDetails.commutationPercentage : 0;
  const commutedPension = (basicPensionAmount * percentage) / 100;
  const residual = basicPensionAmount - commutedPension;

  return benefit(
    "residualPension",
    "Residual Pension",
    0,
    true,
    `Residual Pension = Basic Pension − Commuted Pension (${percentage}%)`,
    "RESIDUAL_PENSION",
    "Residual Pension = Basic Pension − Commuted Pension",
    {
      basicPension: Math.round(basicPensionAmount),
      commutationPercentage: percentage,
      commutedPension: Math.round(commutedPension),
      residualPension: Math.round(residual),
    },
    [],
    Math.round(residual),
  );
}

function calcComplimentaryPass(
  context: CalculationContext,
  decision: RetirementRuleDecision,
): BenefitCalculation {
  const { assessment } = context;
  const admissible = decision.benefits["complimentaryPass" as SettlementBenefitKey];

  const qs = assessment.serviceDetails.qualifyingService;
  const actualYears = qs.years + qs.months / 12 + qs.days / 365.25;
  const retirementType = assessment.serviceDetails.otherRetirementType ?? "normal";

  let effectiveServiceYears = actualYears;
  let hasMedicalCredit = false;
  if (retirementType === "medical") {
    effectiveServiceYears += 5;
    hasMedicalCredit = true;
  }

  // 19 years and 9 months = 19.75 years, rounded to 20.
  const isEligible = admissible && effectiveServiceYears >= 19.75;

  let passSetsPerYear = 0;
  let passClass = "Not Applicable";
  let familyEligibility = "Not Applicable";
  let conditions = "";
  const restrictions =
    "Admissibility is subject to non-retention of unauthorized railway quarters (one set of passes is forfeited for every month of unauthorized retention). Passes are not admissible in case of dismissal or removal from service (unless compassionate allowance is sanctioned).";

  if (isEligible) {
    const group = assessment.employeeDetails.employeeGroup;
    // Determine sets per year
    if (group === "A" || group === "B") {
      passSetsPerYear = effectiveServiceYears >= 25 ? 3 : 2;
    } else if (group === "C") {
      passSetsPerYear = effectiveServiceYears >= 25 ? 2 : 1;
    } else if (group === "D") {
      passSetsPerYear = 1;
    }

    // Determine pass class
    const payMatrixLevelStr = assessment.employeeDetails.payMatrixLevel;
    const match = payMatrixLevelStr.match(/\d+/);
    const parsedLevel = match ? Number(match[0]) : null;

    if (group === "A" || group === "B") {
      passClass = "First Class 'A'";
    } else if (group === "C") {
      if (parsedLevel !== null && parsedLevel >= 6) {
        passClass = "First Class";
      } else if (parsedLevel === 5) {
        passClass = "Second Class 'A'";
      } else {
        passClass = "Second Class";
      }
    } else {
      // Group D
      passClass = "Second Class";
    }

    familyEligibility =
      "Admissible for self, spouse, children, and dependent widowed mother, subject to dependency criteria.";
    conditions = `Minimum 20 years of qualifying service (or 19 years 9 months and above rounded off to 20 years).${
      hasMedicalCredit
        ? " Includes 5 years additional service credit for medical invalidation retirement."
        : ""
    }`;
  } else {
    conditions =
      "Qualifying service is less than the minimum required 20 years (including medical invalidation addition if applicable).";
  }

  return {
    key: "complimentaryPass" as BenefitCalculationKey,
    benefitName: "Complimentary Pass",
    amount: 0,
    eligible: isEligible,
    status: isEligible ? "Calculated" : "Not Eligible",
    formula: {
      formulaName: "Rule-Based Entitlement",
      formulaKey: "COMPLIMENTARY_PASS_ENTITLEMENT",
      workbookSheet: "Pass Rules",
      cellReference: "Schedule IV Rule 8(2)",
      ruleReference: "Railway Servants (Pass) Rules, 1986",
      explanation:
        "Post-Retirement Complimentary Pass entitlement is based on Group, Qualifying Service, and Pay Level.",
    },
    reason: isEligible
      ? `Eligible for ${passSetsPerYear} set(s) of ${passClass} passes per year.`
      : `Not eligible for Post-Retirement Complimentary Passes: ${conditions}`,
    warnings: [],
    details: {
      passSetsPerYear,
      passClass,
      familyEligibility,
      ruleReference: "Schedule IV, Rule 8(2) of Railway Servants (Pass) Rules, 1986",
      conditions,
      restrictions,
      requiredDocuments: [
        "Service Register",
        "Pass Account Declaration",
        "No Dues Certificate (for quarters)",
      ],
    },
  };
}

// ---------------------------------------------------------------------------
// Main gateway function
// ---------------------------------------------------------------------------

export function calculateWithFormulaEngine(
  assessment: SettlementAssessment,
  ruleResult: SettlementResult,
  workbookData?: WorkbookData,
): SettlementCalculation {
  const context: CalculationContext = { assessment, ruleResult, workbookData };

  // Evaluate retirement-type rule decisions (benefit admissibility + sanction %)
  const decision = evaluateRetirementRules(assessment);

  const basicPension = calcBasicPension(context, decision);
  const familyPension = calcFamilyPension(context, decision);
  const retirementGratuity = calcRetirementGratuity(context, decision);
  const leaveEncashment = calcLeaveEncashment(context, decision);
  const halfLeaveEncashment = calcHalfLeaveEncashment(context);
  const providentFund = calcProvidentFund(context);
  const cgis = calcCGIS(context);
  const relhs = calcRELHS(context, decision);
  const fma = calcFMA(context, decision);
  const ctg = calcCTG(context, decision);
  const commutation = calcCommutation(context, decision, basicPension.monthlyAmount ?? 0);
  const residualPension = calcResidualPension(
    context,
    decision,
    basicPension.monthlyAmount ?? 0,
    commutation.amount,
  );
  const complimentaryPass = calcComplimentaryPass(context, decision);

  // Totals: one-time lump sum (exclude monthly-only benefits like fma)
  const totalOneTimeBenefits =
    retirementGratuity.amount +
    leaveEncashment.amount +
    providentFund.amount +
    cgis.amount +
    relhs.amount +
    ctg.amount +
    commutation.amount;

  const monthlyPension = residualPension.monthlyAmount ?? 0;
  const monthlyFma = fma.monthlyAmount ?? 0;

  // Projected settlement: one-time + 10 years of monthly pension (rough estimate)
  const totalEstimatedSettlement =
    totalOneTimeBenefits + monthlyPension * 12 * 10 + monthlyFma * 12 * 10;

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
    complimentaryPass,
    totalOneTimeBenefits,
    monthlyPension,
    monthlyFma,
    totalEstimatedSettlement,
  };
}

export function formulaEngineContextDetails(context: CalculationContext) {
  return {
    pensionScheme: context.assessment.serviceDetails.pensionScheme,
    retirementCategory: context.assessment.serviceDetails.retirementCategory,
  };
}
