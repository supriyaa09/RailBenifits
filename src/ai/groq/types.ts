export type RuleType = "Formula" | "Eligibility" | "Policy" | "Procedure" | "Benefit" | "Definition" | "Other";

export interface RuleThreshold {
  name: string;
  value: number | string;
  condition?: string;
}

export interface StructuredFormula {
  variables: string[];
  operators: string[];
  decisionLogic: string;
  thresholds: RuleThreshold[];
  limits: {
    minimum: number | null;
    maximum: number | null;
  };
}

export interface ExtractedRule {
  ruleType: RuleType;
  rule_number: string;
  circular_number: string;
  effective_date: string;
  category: string;
  scheme: string;
  benefit: string;
  /** Primary calculation rule or formula string (preserves original wording for Type B textual rules) */
  formula: string | null;
  /** Machine-readable structured representation for backend engine execution */
  structuredFormula?: StructuredFormula;
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
