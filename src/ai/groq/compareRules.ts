import { ExtractedRule, ComparisonReport, ComparisonField, RuleType } from "./types";

function compareField(currentVal: any, proposedVal: any): ComparisonField {
  const currentClean = currentVal === undefined || currentVal === "" ? null : currentVal;
  const proposedClean = proposedVal === undefined || proposedVal === "" ? null : proposedVal;

  let status: "Added" | "Modified" | "Removed" | "Unchanged" = "Unchanged";
  if (currentClean === null && proposedClean !== null) status = "Added";
  else if (currentClean !== null && proposedClean === null) status = "Removed";
  else if (JSON.stringify(currentClean) !== JSON.stringify(proposedClean)) status = "Modified";

  return { status, current: currentClean, proposed: proposedClean };
}

/**
 * Compare proposed extracted rule against the current approved version.
 * Comparison logic is routed by ruleType:
 *   - Formula    → compare mathematical expressions
 *   - Eligibility → compare eligibility conditions
 *   - Policy     → compare text-based policy fields (rates, limits)
 *   - Procedure  → compare procedural steps in conditions/notes
 *   - Benefit    → compare benefit entitlement fields
 *   - Definition → compare definition text
 *   - Other      → generic field comparison
 */
export function compareRules(
  proposed: ExtractedRule,
  currentApprovedVersion: any | null
): ComparisonReport {
  const ruleType: RuleType = proposed.ruleType;

  // No existing baseline — everything is new
  if (!currentApprovedVersion) {
    return {
      hasChanges: true,
      ruleType,
      differences: {
        ruleType:       { status: "Added", current: null, proposed: ruleType },
        formula:        { status: proposed.formula ? "Added" : "Unchanged", current: null, proposed: proposed.formula },
        eligibility:    { status: "Added", current: null, proposed: proposed.eligibility },
        minimum:        { status: "Added", current: null, proposed: proposed.minimum },
        maximum:        { status: "Added", current: null, proposed: proposed.maximum },
        effective_date: { status: "Added", current: null, proposed: proposed.effective_date },
        conditions:     { status: "Added", current: null, proposed: proposed.conditions },
        benefit:        { status: "Added", current: null, proposed: proposed.benefit },
        notes:          { status: "Added", current: null, proposed: proposed.notes },
      }
    };
  }

  const currentRuleType = currentApprovedVersion.rule_type || "Other";
  const currentEligibility = currentApprovedVersion.eligibility || "Not specified.";
  const currentConditions = currentApprovedVersion.conditions || "None";
  const currentBenefit = currentApprovedVersion.benefit_type || "Basic Pension";
  const currentFormula = currentApprovedVersion.formula || null;

  // --- Route comparison by ruleType ---

  // Formula rules: compare mathematical expressions
  const formulaDiff = (ruleType === "Formula" || currentRuleType === "Formula")
    ? compareField(currentFormula, proposed.formula)
    : { status: "Unchanged" as const, current: null, proposed: null };

  // Eligibility rules: focus on eligibility conditions
  const eligibilityDiff = compareField(currentEligibility, proposed.eligibility);

  // Policy / Benefit rules: focus on limits and conditions
  const minimumDiff = compareField(currentApprovedVersion.minimum_limit ?? null, proposed.minimum);
  const maximumDiff = compareField(currentApprovedVersion.maximum_limit ?? null, proposed.maximum);

  // Procedure / Policy: compare conditions/steps
  const conditionsDiff = compareField(currentConditions, proposed.conditions);

  // Common fields across all types
  const effectiveDateDiff = compareField(currentApprovedVersion.effective_date, proposed.effective_date);
  const benefitDiff = compareField(currentBenefit, proposed.benefit);
  const notesDiff = compareField(currentApprovedVersion.notes || "", proposed.notes);
  const ruleTypeDiff = compareField(currentRuleType, ruleType);

  const hasChanges =
    formulaDiff.status !== "Unchanged" ||
    eligibilityDiff.status !== "Unchanged" ||
    minimumDiff.status !== "Unchanged" ||
    maximumDiff.status !== "Unchanged" ||
    effectiveDateDiff.status !== "Unchanged" ||
    conditionsDiff.status !== "Unchanged" ||
    benefitDiff.status !== "Unchanged" ||
    notesDiff.status !== "Unchanged" ||
    ruleTypeDiff.status !== "Unchanged";

  return {
    hasChanges,
    ruleType,
    differences: {
      ruleType:       ruleTypeDiff,
      formula:        formulaDiff,
      eligibility:    eligibilityDiff,
      minimum:        minimumDiff,
      maximum:        maximumDiff,
      effective_date: effectiveDateDiff,
      conditions:     conditionsDiff,
      benefit:        benefitDiff,
      notes:          notesDiff,
    }
  };
}
