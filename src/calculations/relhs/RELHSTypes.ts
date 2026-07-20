import type { PensionScheme } from "../../lib/settlement-assessment.ts";

export type RELHSEligibilityStatus = "Eligible" | "Not Eligible";
export type RELHSVerificationStatus = "Automatic" | "Requires Pay Matrix Verification";

export interface RELHSEvaluation {
  eligible: boolean;
  subscriptionAmount: number;
  reason: string;
  ruleReference: string;
  requiredDocuments: string[];
  remarks: string;
  medicalCard: "Eligible" | "Not Eligible";
  familyEligible: boolean;
  verificationStatus: RELHSVerificationStatus;
  pensionScheme: PensionScheme;
  payMatrixLevel: number | null;
  subscriptionBand: string | null;
}

export interface FMAEvaluation {
  eligible: boolean;
  status: "Eligible" | "Not Opted" | "Not Eligible";
  monthlyAmount: number;
  reason: string;
  reference: string;
}
