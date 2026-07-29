import { ExtractedRule, RuleType } from "./types";

const VALID_RULE_TYPES: RuleType[] = ["Formula", "Eligibility", "Policy", "Procedure", "Benefit", "Definition", "Other"];

export function validateExtractedRuleJson(rawResponse: string): ExtractedRule {
  let cleanJsonStr = rawResponse.trim();
  if (cleanJsonStr.startsWith("```")) {
    cleanJsonStr = cleanJsonStr.replace(/^```(json)?/i, "").replace(/```$/, "").trim();
  }

  let parsed: any;
  try {
    parsed = JSON.parse(cleanJsonStr);
  } catch (e: any) {
    throw new Error(`Failed to parse Groq response as JSON. Raw: "${rawResponse.slice(0, 200)}...". Error: ${e.message}`);
  }

  // --- ruleType ---
  const ruleType: RuleType = VALID_RULE_TYPES.includes(parsed.ruleType) ? parsed.ruleType : "Other";

  // --- formula: support Type A (mathematical) and Type B (textual calculation rule) across all rule types ---
  let formula: string | null = null;
  if (typeof parsed.formula === "string" && parsed.formula.trim().length > 0) {
    formula = parsed.formula.trim();
  } else if (typeof parsed.notes === "string" && (parsed.notes.toLowerCase().includes("equal to") || parsed.notes.toLowerCase().includes("computed") || parsed.notes.toLowerCase().includes("calculated") || parsed.notes.toLowerCase().includes("subscription"))) {
    // If AI erroneously put calculation rule into notes, extract it into formula
    formula = parsed.notes.trim();
  }

  const category = typeof parsed.category === "string" ? parsed.category : "Other";
  const benefit = typeof parsed.benefit === "string" ? parsed.benefit : "Other";
  const scheme = typeof parsed.scheme === "string" ? parsed.scheme : "All";
  const minimum = typeof parsed.minimum === "number" ? parsed.minimum : null;
  const maximum = typeof parsed.maximum === "number" ? parsed.maximum : null;

  let effective_date = "2026-07-01";
  if (typeof parsed.effective_date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(parsed.effective_date)) {
    effective_date = parsed.effective_date;
  }

  const rule_number = typeof parsed.rule_number === "string" ? parsed.rule_number : "N/A";
  const circular_number = typeof parsed.circular_number === "string" ? parsed.circular_number : "N/A";
  const eligibility = typeof parsed.eligibility === "string" ? parsed.eligibility : "Not specified.";
  const conditions = typeof parsed.conditions === "string" ? parsed.conditions : "None";
  const confidence = typeof parsed.confidence === "number" ? parsed.confidence : 75;
  const notes = typeof parsed.notes === "string" ? parsed.notes : "";

  // Build or validate structured representation for backend engine execution
  const rawSf = parsed.structuredFormula || {};
  const formulaText = formula || "";
  
  // Extract variables automatically if missing
  const detectedVariables = Array.isArray(rawSf.variables) && rawSf.variables.length > 0
    ? rawSf.variables
    : Array.from(new Set(formulaText.match(/([A-Z][a-zA-Z0-9_]+)/g) || ["BasicPay"]));

  // Extract operators automatically if missing
  const detectedOperators = Array.isArray(rawSf.operators) && rawSf.operators.length > 0
    ? rawSf.operators
    : Array.from(new Set(formulaText.match(/(\+|\-|\*|\/|MIN|MAX|<=|>=|==)/gi) || ["*"]));

  const structuredFormula = {
    variables: detectedVariables,
    operators: detectedOperators,
    decisionLogic: typeof rawSf.decisionLogic === "string" && rawSf.decisionLogic.length > 0 ? rawSf.decisionLogic : formulaText,
    thresholds: Array.isArray(rawSf.thresholds) ? rawSf.thresholds : [
      ...(minimum !== null ? [{ name: "MinimumFloor", value: minimum, condition: ">=" }] : []),
      ...(maximum !== null ? [{ name: "MaximumCap", value: maximum, condition: "<=" }] : [])
    ],
    limits: {
      minimum: typeof rawSf.limits?.minimum === "number" ? rawSf.limits.minimum : minimum,
      maximum: typeof rawSf.limits?.maximum === "number" ? rawSf.limits.maximum : maximum,
    }
  };

  return {
    ruleType,
    rule_number,
    circular_number,
    effective_date,
    category,
    scheme,
    benefit,
    formula,
    structuredFormula,
    eligibility,
    minimum,
    maximum,
    conditions,
    confidence,
    notes,
  };
}
