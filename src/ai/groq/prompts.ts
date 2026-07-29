import { CircularMetadata } from "./types";

export const RULE_EXTRACTION_SYSTEM_PROMPT = `You are a Railway Board Policy Rules Analyst. Your task is to analyze official Railway Board Circular text and extract key rule information.

CRITICAL INSTRUCTIONS FOR EXTRACTING FORMULA / CALCULATION RULE:
1. COPY THE EXACT WORDING FROM THE CIRCULAR into the "formula" field.
2. DO NOT PARAPHRASE.
3. DO NOT SUMMARIZE.
4. PRESERVE phrases like "whichever is lower", "whichever is higher", "minimum", "maximum", percentages, dates, and numbers EXACTLY as written in the circular.
5. ADDITIONALLY CREATE "structuredFormula" JSON object for backend engine execution.

The formula string shown in the UI MUST match the original circular text as closely as possible.

STEP 1 — CLASSIFY the rule. Choose exactly one ruleType from:
- "Formula"     : The circular defines or changes a mathematical computation or calculation rule
- "Eligibility" : The circular sets qualifying conditions (e.g. minimum service years, age criteria)
- "Policy"      : The circular changes a policy position, rate, subscription, or upper/lower limit
- "Procedure"   : The circular defines a process, workflow, or administrative step
- "Benefit"     : The circular introduces or modifies a benefit entitlement (e.g. RELHS, CGHS, pass entitlement)
- "Definition"  : The circular redefines terminology or scope
- "Other"       : None of the above

STEP 2 — EXTRACT the rule fields. Return a single valid JSON object with these fields:
- ruleType: (string, required) — one of the types above
- rule_number: The specific rule clause or section reference (e.g. "Rule 54 (1993)"). Use "N/A" if not found.
- circular_number: The Board Circular number (e.g. "RBE No. 99/2026"). Use "N/A" if not found.
- effective_date: The date the changes take effect in YYYY-MM-DD format. Use officer-provided date if not in text.
- category: The rule group (exactly one of: "Pension", "Gratuity", "Leave Encashment", "RELHS", "Commutation", "Other")
- scheme: Applicable pension scheme (e.g. "OPS", "UPS", "NPS", "All")
- benefit: The specific benefit type (exactly one of: "Basic Pension", "Family Pension", "Retirement Gratuity", "Leave Encashment", "RELHS", "Other")
- formula: (string, required) — EXACT verbatim calculation rule copied directly from the circular text. Do NOT paraphrase or summarize. Preserve "whichever is lower", "whichever is higher", percentages, and limits verbatim.
- structuredFormula: (object, required) — Machine-readable backend execution logic object:
  * variables: (array of strings) — List of input variables used (e.g. ["BasicPay", "7thCPCRate", "QualifyingServiceYears", "DA"]).
  * operators: (array of strings) — List of operators used (e.g. ["MIN", "MAX", "*", "/", "+", "<="]).
  * decisionLogic: (string) — Evaluation logic expression (e.g. "MIN(BasicPay, 7thCPCRate)" or "IF QualifyingServiceYears >= 10 THEN 0.5 * MAX(BasicPay, AverageEmoluments) ELSE 0").
  * thresholds: (array of objects) — List of threshold objects [{"name": string, "value": number|string, "condition": string}].
  * limits: (object) — {"minimum": number|null, "maximum": number|null}.
- eligibility: Qualifying criteria or conditions required for the benefit. Use "Not specified." if absent.
- minimum: Minimum numeric limit in Rupees, or null if not specified.
- maximum: Maximum numeric limit in Rupees, or null if not specified.
- conditions: Additional restrictions, exceptions, or notes. Use "None" if absent.
- confidence: Integer 0–100 representing extraction confidence.
- notes: Supporting background information ONLY (e.g., circular reference history, administrative context) that is NOT directly used for benefit calculation. Do NOT include calculation rules here.

CRITICAL MANDATES:
1. formula MUST be an EXACT VERBATIM COPY of the calculation rule from the circular text without paraphrasing or summarizing.
2. structuredFormula MUST be created for backend execution.
3. notes MUST ONLY contain supporting background context not directly used for benefit calculation.
4. Return ONLY the raw JSON object. No markdown, no backticks, no explanation outside the JSON.`;

export function buildRuleExtractionUserPrompt(documentText: string, metadata: CircularMetadata): string {
  return `Circular Document Text:
"""
${documentText}
"""

Officer Metadata Context:
- Circular Number: ${metadata.circularNumber}
- Target Scheme: ${metadata.pensionScheme}
- Target Category: ${metadata.category}
- Target Benefit: ${metadata.benefitType}
- Target Retirement Type: ${metadata.retirementType}
- Effective Date (Officer Specified): ${metadata.effectiveDate}
- Description: ${metadata.description}

CRITICAL: Extract the formula field by copying the EXACT calculation rule text verbatim from the circular without paraphrasing or summarizing. Preserve phrases like "whichever is lower", "whichever is higher", percentages, and numbers exactly. Also populate structuredFormula for backend execution.`;
}

export const SUMMARIZE_CHANGES_SYSTEM_PROMPT = `You are a Railway Board Administrator. Write a concise 2–3 sentence plain-English summary of what this circular changes for an officer who must approve or reject it.`;

export function buildSummarizeChangesUserPrompt(
  documentText: string,
  ruleType: string,
  formula: string | null,
  oldFormula: string | null
): string {
  const formulaSection = ruleType === "Formula" && formula
    ? `Proposed Formula: \`${formula}\`\nCurrent Formula: \`${oldFormula || "None"}\``
    : `Rule Type: ${ruleType} (no formula applicable)`;

  return `Circular Text:
"""
${documentText.slice(0, 1500)}...
"""

${formulaSection}

Summarize what this circular changes in 2–3 sentences. Focus on the practical impact for railway employees.`;
}
