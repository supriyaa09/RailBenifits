export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  skipped: boolean;
  skipReason?: string;
}

/**
 * Validates formula tokens ONLY when:
 *   - ruleType === "Formula"
 *   - formula is a non-empty string
 *
 * All other rule types and null formulas bypass validation entirely.
 */
export function validateFormulaTokens(ruleType: string, formula: string | null): ValidationResult {
  // Gate: only validate Formula rules with an actual formula string
  if (ruleType !== "Formula" || formula === null) {
    return {
      isValid: true,
      errors: [],
      skipped: true,
      skipReason: formula === null
        ? `No formula present (ruleType: "${ruleType}"). Formula validation skipped.`
        : `Rule type is "${ruleType}", not "Formula". Formula validation skipped.`,
    };
  }

  const errors: string[] = [];
  const normalized = formula.replace(/\s+/g, "");

  // Detect malicious keywords
  const blockedTokens = [
    "eval", "function", "window", "document", "process", "global", "require",
    "import", "fetch", "axios", "fs", "path", "database", "sql", "cookie",
    "localStorage", "sessionStorage", "alert", "console", "this", "constructor"
  ];
  for (const token of blockedTokens) {
    if (new RegExp(`\\b${token}\\b`, "i").test(formula)) {
      errors.push(`Security Block: Forbidden keyword '${token}' detected in formula.`);
    }
  }

  // Allowed variables
  const allowedVariables = [
    "BasicPay",
    "Emoluments",
    "AverageEmoluments",
    "DA",
    "QualifyingServiceYears",
    "LAPDays",
    "LHAPDays"
  ];

  let stripped = normalized;
  stripped = stripped.replace(/Min/gi, "").replace(/Max/gi, "");
  for (const variable of allowedVariables) {
    stripped = stripped.replace(new RegExp(variable, "g"), "");
  }

  const remainingInvalid = stripped.match(/[^0-9.+\-*/(),]/g);
  if (remainingInvalid && remainingInvalid.length > 0) {
    const uniqueInvalid = Array.from(new Set(remainingInvalid));
    errors.push(`Formula contains invalid tokens: ${uniqueInvalid.join(", ")}`);
  }

  // Check parenthesis balance
  let balance = 0;
  for (const ch of normalized) {
    if (ch === "(") balance++;
    else if (ch === ")") balance--;
    if (balance < 0) {
      errors.push("Unbalanced closing parenthesis in formula.");
      break;
    }
  }
  if (balance > 0) {
    errors.push("Unbalanced opening parenthesis in formula.");
  }

  return { isValid: errors.length === 0, errors, skipped: false };
}
