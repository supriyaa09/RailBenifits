export type RuleType = "Formula" | "Eligibility" | "Policy" | "Procedure" | "Benefit" | "Definition" | "Other";

export interface ExtractedRule {
  ruleType: RuleType;
  rule_number: string;
  circular_number: string;
  effective_date: string;
  category: string;
  scheme: string;
  benefit: string;
  /** Mathematical expression only when ruleType === "Formula". null for all other rule types. */
  formula: string | null;
  eligibility: string;
  minimum: number | null;
  maximum: number | null;
  conditions: string;
  confidence: number;
  notes: string;
}

export interface CircularMetadata {
  title: string;
  circularNumber: string;
  effectiveDate: string;
  issueDate: string;
  category: string;
  benefitType: string;
  pensionScheme: string;
  retirementType: string;
  description: string;
}

export interface ComparisonField {
  status: "Added" | "Modified" | "Removed" | "Unchanged";
  current: any;
  proposed: any;
}

export interface ComparisonReport {
  hasChanges: boolean;
  ruleType: RuleType;
  differences: {
    ruleType: ComparisonField;
    formula: ComparisonField;
    eligibility: ComparisonField;
    minimum: ComparisonField;
    maximum: ComparisonField;
    effective_date: ComparisonField;
    conditions: ComparisonField;
    benefit: ComparisonField;
    notes: ComparisonField;
  };
}
