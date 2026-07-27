import { executeGroqCompletion } from "./client";
import { RULE_EXTRACTION_SYSTEM_PROMPT, buildRuleExtractionUserPrompt } from "./prompts";
import { validateExtractedRuleJson } from "./schemas";
import { validateFormulaTokens } from "./validation";
import { ExtractedRule, CircularMetadata } from "./types";

export async function extractRules(
  documentText: string,
  metadata: CircularMetadata
): Promise<ExtractedRule> {
  const messages = [
    { role: "system", content: RULE_EXTRACTION_SYSTEM_PROMPT },
    { role: "user", content: buildRuleExtractionUserPrompt(documentText, metadata) },
  ];

  // Request JSON output from Groq
  const rawReply = await executeGroqCompletion(messages, true);

  // Parse and validate schema (ruleType-aware, formula nullable)
  const rule = validateExtractedRuleJson(rawReply);

  console.log(`[AI Extraction] Rule classified as: "${rule.ruleType}" | Formula: ${rule.formula ?? "null (not applicable)"}`);

  // Only validate formula tokens when ruleType is Formula AND a formula was returned
  const validation = validateFormulaTokens(rule.ruleType, rule.formula);

  if (validation.skipped) {
    console.log(`[Formula Validation] Skipped — ${validation.skipReason}`);
  } else if (!validation.isValid) {
    // For Formula-type rules with an invalid formula: throw so officer sees the problem
    throw new Error(
      `Extracted formula contains invalid tokens or expressions: ${validation.errors.join("; ")}`
    );
  } else {
    console.log(`[Formula Validation] Passed for formula: "${rule.formula}"`);
  }

  return rule;
}
