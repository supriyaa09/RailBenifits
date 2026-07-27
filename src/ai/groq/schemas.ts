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

  // --- formula: only allowed for Formula ruleType, must be null otherwise ---
  let formula: string | null = null;
  if (ruleType === "Formula") {
    if (typeof parsed.formula === "string" && parsed.formula.trim().length > 0) {
      formula = parsed.formula.trim();
    }
    // If ruleType is Formula but no formula string provided, leave it null — validation will decide
  }
  // For all other ruleTypes: formula stays null regardless of what AI returned

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

  return {
    ruleType,
    rule_number,
    circular_number,
    effective_date,
    category,
    scheme,
    benefit,
    formula,
    eligibility,
    minimum,
    maximum,
    conditions,
    confidence,
    notes,
  };
}
