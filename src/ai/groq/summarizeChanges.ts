import { executeGroqCompletion } from "./client";
import { SUMMARIZE_CHANGES_SYSTEM_PROMPT, buildSummarizeChangesUserPrompt } from "./prompts";

export async function summarizeChanges(
  documentText: string,
  ruleType: string,
  formula: string | null,
  oldFormula: string | null
): Promise<string> {
  const messages = [
    { role: "system", content: SUMMARIZE_CHANGES_SYSTEM_PROMPT },
    { role: "user", content: buildSummarizeChangesUserPrompt(documentText, ruleType, formula, oldFormula) },
  ];

  try {
    const summary = await executeGroqCompletion(messages, false);
    return summary.trim();
  } catch (err) {
    console.error("Failed to generate summary via Groq:", err);
    return "This circular introduces a change to railway benefit parameters based on official Railway Board policy guidelines.";
  }
}
