export interface AdminRule {
  id: string;
  name: string;
  ruleNumber: string;
  description: string;
  applicableRetirementTypes: string[];
  applicableScheme: string;
  status: "Active" | "Inactive";
  ruleReference: string;
}

export interface AdminFormula {
  id: string;
  name: string;
  completeFormula: string;
  variablesUsed: string[];
  applicableScheme: string;
  applicableRetirementType: string[];
  ruleReference: string;
  status: "Active" | "Inactive";
}

export interface AdminBenefit {
  id: string;
  name: string;
  eligibility: string;
  formulaUsed: string;
  applicableRetirementTypes: string[];
  requiredDocuments: string[];
  ruleReference: string;
  status: "Active" | "Inactive";
}

export interface AdminDocument {
  id: string;
  name: string;
  type: "Circular" | "Memorandum" | "Government Order" | "Manual" | "Book" | "Reference PDF";
  date: string;
  size: string;
  status: "Active" | "Indexed";
  url: string;
  category: string;
}

export interface SystemConfiguration {
  ruleVersion: string;
  formulaVersion: string;
  currentPayMatrix: string;
  databaseStatus: string;
  aiModel: string;
  accessibilityStatus: string;
  lastFormulaUpdate: string;
  applicationVersion: string;
}

// Baseline Initial Seed Datasets
const DEFAULT_RULES: AdminRule[] = [
  {
    id: "R101",
    name: "Qualifying Service for Pension",
    ruleNumber: "Rule 49",
    description: "Requires minimum 10 years of qualifying service under defined pension schemes (OPS/UPS).",
    applicableRetirementTypes: ["Normal Retirement", "Voluntary Retirement", "Compulsory Retirement", "Medical Invalidation"],
    applicableScheme: "OPS & UPS",
    status: "Active",
    ruleReference: "RBE No. 45/2022"
  },
  {
    id: "R203",
    name: "Pension Computation (OPS)",
    ruleNumber: "Rule 50(2)",
    description: "Admissible pension is computed at 50% of the last basic pay or average of the last 10 months, whichever is more beneficial.",
    applicableRetirementTypes: ["Normal Retirement", "Voluntary Retirement", "Compulsory Retirement", "Medical Invalidation"],
    applicableScheme: "OPS",
    status: "Active",
    ruleReference: "RBE No. 45/2022"
  },
  {
    id: "R310",
    name: "Family Pension Eligibility",
    ruleNumber: "Rule 54",
    description: "Family pension admissible to eligible legal heirs (spouse, children, dependent parents) on employee demise.",
    applicableRetirementTypes: ["Death"],
    applicableScheme: "OPS & UPS",
    status: "Active",
    ruleReference: "RBE No. 12/2021"
  },
  {
    id: "R312",
    name: "Enhanced Family Pension",
    ruleNumber: "Rule 54(3)",
    description: "Enhanced family pension payable at 50% of basic pay (instead of 30%) for 10 years or until age 67, whichever is earlier.",
    applicableRetirementTypes: ["Death"],
    applicableScheme: "OPS & UPS",
    status: "Active",
    ruleReference: "RBE No. 12/2021"
  },
  {
    id: "R405",
    name: "Retirement / Death Gratuity Computation",
    ruleNumber: "Rule 50(1)",
    description: "Computed at 1/4 of monthly emoluments (Basic + DA) per completed six-month service, subject to a statutory cap of ₹20,00,000.",
    applicableRetirementTypes: ["Normal Retirement", "Voluntary Retirement", "Compulsory Retirement", "Medical Invalidation", "Death"],
    applicableScheme: "All",
    status: "Active",
    ruleReference: "RBE No. 78/2020"
  },
  {
    id: "R502",
    name: "Leave Encashment Cap",
    ruleNumber: "Rule 39-A",
    description: "Admissible cash equivalent of leave salary for accumulated Earned Leave (LAP) and Half Pay Leave (LHAP) up to 300 days.",
    applicableRetirementTypes: ["Normal Retirement", "Voluntary Retirement", "Compulsory Retirement", "Medical Invalidation", "Death"],
    applicableScheme: "All",
    status: "Active",
    ruleReference: "RBE No. 22/2019"
  },
  {
    id: "R601",
    name: "Provident Fund / NPS Withdrawal rules",
    ruleNumber: "PF Act 1925",
    description: "Enables withdrawal of full GPF credit or NPS corpus exit guidelines (60% lump sum, 40% mandatory annuity).",
    applicableRetirementTypes: ["Normal Retirement", "Voluntary Retirement", "Compulsory Retirement", "Medical Invalidation", "Death"],
    applicableScheme: "All",
    status: "Active",
    ruleReference: "RBE No. 09/2023"
  },
  {
    id: "R701",
    name: "Group Insurance Scheme (GIS) Payout",
    ruleNumber: "CGEGIS-1980",
    description: "Payment of savings component and insurance component as per employee's subscription group slabs.",
    applicableRetirementTypes: ["Normal Retirement", "Voluntary Retirement", "Compulsory Retirement", "Medical Invalidation", "Death"],
    applicableScheme: "All",
    status: "Active",
    ruleReference: "RBE No. 11/2018"
  },
  {
    id: "R810",
    name: "RELHS Medical Enrolment",
    ruleNumber: "Medical Manual Para 512",
    description: "Retiring railway employees with 20+ years of service are eligible for life-long free medical facilities under RELHS-97.",
    applicableRetirementTypes: ["Normal Retirement", "Voluntary Retirement", "Compulsory Retirement", "Medical Invalidation"],
    applicableScheme: "All",
    status: "Active",
    ruleReference: "RBE No. 55/2017"
  },
  {
    id: "R905",
    name: "Complimentary Passes entitlement",
    ruleNumber: "Pass Rules 1986",
    description: "Admissible Post-Retirement Complimentary Passes (PRCP) based on employee's group and length of service.",
    applicableRetirementTypes: ["Normal Retirement", "Voluntary Retirement", "Medical Invalidation"],
    applicableScheme: "All",
    status: "Active",
    ruleReference: "RBE No. 33/2022"
  }
];

const DEFAULT_FORMULAS: AdminFormula[] = [
  {
    id: "F1",
    name: "Basic Pension (OPS)",
    completeFormula: "0.50 * Last Drawn Basic Pay (or average of last 10 months, if higher)",
    variablesUsed: ["currentBasicPay", "averageLastTenMonthsBasicPay"],
    applicableScheme: "OPS",
    applicableRetirementType: ["Normal Retirement", "Voluntary Retirement", "Compulsory Retirement", "Medical Invalidation"],
    ruleReference: "Rule 50(2) / R203",
    status: "Active"
  },
  {
    id: "F2",
    name: "Family Pension",
    completeFormula: "0.30 * Last Drawn Basic Pay (subject to minimum of ₹9,000/month)",
    variablesUsed: ["currentBasicPay"],
    applicableScheme: "OPS & UPS",
    applicableRetirementType: ["Death"],
    ruleReference: "Rule 54 / R310",
    status: "Active"
  },
  {
    id: "F3",
    name: "Enhanced Family Pension",
    completeFormula: "0.50 * Last Drawn Basic Pay (payable until age of 67 or 10 years)",
    variablesUsed: ["currentBasicPay"],
    applicableScheme: "OPS & UPS",
    applicableRetirementType: ["Death"],
    ruleReference: "Rule 54(3) / R312",
    status: "Active"
  },
  {
    id: "F4",
    name: "Retirement / Death Gratuity",
    completeFormula: "Min(20,00,000, 0.25 * (Basic Pay + Dearness Allowance) * Qualifying half-years)",
    variablesUsed: ["currentBasicPay", "dearnessAllowance", "qualifyingServiceYears"],
    applicableScheme: "All",
    applicableRetirementType: ["Normal Retirement", "Voluntary Retirement", "Compulsory Retirement", "Medical Invalidation", "Death"],
    ruleReference: "Rule 50(1) / R405",
    status: "Active"
  },
  {
    id: "F5",
    name: "Leave Encashment",
    completeFormula: "((Basic Pay + DA) / 30) * Min(300, (LAP + LHAP days))",
    variablesUsed: ["currentBasicPay", "dearnessAllowance", "lapDays", "lhapDays"],
    applicableScheme: "All",
    applicableRetirementType: ["Normal Retirement", "Voluntary Retirement", "Compulsory Retirement", "Medical Invalidation", "Death"],
    ruleReference: "Rule 39-A / R502",
    status: "Active"
  },
  {
    id: "F6",
    name: "Commutation Value",
    completeFormula: "Commuted Amount * 12 * Commutation Age Factor",
    variablesUsed: ["commutedAmount", "commutationFactor"],
    applicableScheme: "OPS",
    applicableRetirementType: ["Normal Retirement", "Voluntary Retirement", "Medical Invalidation"],
    ruleReference: "Rule 5 / R203",
    status: "Active"
  }
];

const DEFAULT_BENEFITS: AdminBenefit[] = [
  {
    id: "B1",
    name: "Retirement Gratuity",
    eligibility: "Minimum 5 years of completed qualifying service upon honorable retirement.",
    formulaUsed: "F4 (Gratuity Formula)",
    applicableRetirementTypes: ["Normal Retirement", "Voluntary Retirement", "Compulsory Retirement", "Medical Invalidation"],
    requiredDocuments: ["Form 6", "Nomination Form", "Service Register Receipt"],
    ruleReference: "Rule 50 / R405",
    status: "Active"
  },
  {
    id: "B2",
    name: "Death Gratuity",
    eligibility: "Paid to designated nominee or family members upon employee death in service.",
    formulaUsed: "F4 (Gratuity Formula - graduated scale for <5y service)",
    applicableRetirementTypes: ["Death"],
    requiredDocuments: ["Death Certificate", "Form 12 (Nomination Lookup)", "Legal Heirship Certificate"],
    ruleReference: "Rule 50 / R405",
    status: "Active"
  },
  {
    id: "B3",
    name: "Leave Encashment",
    eligibility: "Paid for accumulated Earned Leave (LAP) and Half Pay Leave (LHAP) up to 300 days.",
    formulaUsed: "F5 (Leave Encashment Formula)",
    applicableRetirementTypes: ["Normal Retirement", "Voluntary Retirement", "Compulsory Retirement", "Medical Invalidation", "Death"],
    requiredDocuments: ["Form LE-1", "Leave Account Book Sheet"],
    ruleReference: "Rule 39-A / R502",
    status: "Active"
  },
  {
    id: "B4",
    name: "Basic Pension",
    eligibility: "Minimum 10 years of qualifying service under OPS/UPS schemes.",
    formulaUsed: "F1 (Basic Pension Formula)",
    applicableRetirementTypes: ["Normal Retirement", "Voluntary Retirement", "Compulsory Retirement", "Medical Invalidation"],
    requiredDocuments: ["Form 5 (Pension Form)", "PPO Application Form", "Aadhaar Card", "Bank Account Details"],
    ruleReference: "Rule 50(2) / R203",
    status: "Active"
  },
  {
    id: "B5",
    name: "Family Pension",
    eligibility: "Admissible to dependents on the death of employee/pensioner.",
    formulaUsed: "F2 (Family Pension Formula)",
    applicableRetirementTypes: ["Death"],
    requiredDocuments: ["Death Certificate", "Form 14", "Joint Photo of Spouse/Legal Heir", "Active bank credentials"],
    ruleReference: "Rule 54 / R310",
    status: "Active"
  },
  {
    id: "B6",
    name: "RELHS Medical Facility",
    eligibility: "Retiring railway employee with 20+ years of service (one-time fee equivalent to 1 month basic).",
    formulaUsed: "Flat rate contribution (1 month basic pay)",
    applicableRetirementTypes: ["Normal Retirement", "Voluntary Retirement", "Compulsory Retirement", "Medical Invalidation"],
    requiredDocuments: ["RELHS Application Form", "Medical Option Card (Form Med-2)", "Two passport size joint photos"],
    ruleReference: "Para 512 Medical Manual / R810",
    status: "Active"
  }
];

const DEFAULT_DOCUMENTS: AdminDocument[] = [
  {
    id: "RBE-45-2022",
    name: "RBE-45-2022-Pension-Revision.pdf",
    type: "Circular",
    date: "2022-08-12",
    size: "1.2 MB",
    status: "Indexed",
    url: "/reports/RBE-45-2022-Pension-Revision.pdf",
    category: "Pension Rules"
  },
  {
    id: "RBE-12-2021",
    name: "Family-Pension-Guidelines-RBE-12.pdf",
    type: "Circular",
    date: "2021-03-04",
    size: "890 KB",
    status: "Indexed",
    url: "/reports/Family-Pension-Guidelines-RBE-12.pdf",
    category: "Family Pension"
  },
  {
    id: "RBE-78-2020",
    name: "Gratuity-Rules-Amendment-RBE-78.pdf",
    type: "Government Order",
    date: "2020-11-19",
    size: "540 KB",
    status: "Indexed",
    url: "/reports/Gratuity-Rules-Amendment-RBE-78.pdf",
    category: "Gratuity"
  },
  {
    id: "RBE-22-2019",
    name: "Leave-Encashment-Policy-RBE-22.pdf",
    type: "Circular",
    date: "2019-05-22",
    size: "420 KB",
    status: "Indexed",
    url: "/reports/Leave-Encashment-Policy-RBE-22.pdf",
    category: "Leave"
  },
  {
    id: "RBE-09-2023",
    name: "PF-Withdrawal-SOP-2023.pdf",
    type: "Manual",
    date: "2023-02-17",
    size: "1.8 MB",
    status: "Indexed",
    url: "/reports/PF-Withdrawal-SOP-2023.pdf",
    category: "PF / NPS"
  },
  {
    id: "RBE-55-2017",
    name: "RELHS-Enrolment-Manual.pdf",
    type: "Manual",
    date: "2017-09-30",
    size: "2.1 MB",
    status: "Indexed",
    url: "/reports/RELHS-Enrolment-Manual.pdf",
    category: "Medical"
  },
  {
    id: "RBE-11-2018",
    name: "CGEGIS-Subscription-Tables-RBE-11.pdf",
    type: "Office Memorandum",
    date: "2018-07-08",
    size: "320 KB",
    status: "Indexed",
    url: "/reports/CGEGIS-Subscription-Tables-RBE-11.pdf",
    category: "Insurance"
  },
  {
    id: "RBE-33-2022",
    name: "Post-Retirement-PRCP-Pass-Rules.pdf",
    type: "Rule Books",
    date: "2022-01-15",
    size: "3.4 MB",
    status: "Indexed",
    url: "/reports/Post-Retirement-PRCP-Pass-Rules.pdf",
    category: "Passes"
  }
];

const DEFAULT_CONFIG: SystemConfiguration = {
  ruleVersion: "Railway Pension Rules 2026 (v4.2)",
  formulaVersion: "v2.4.1",
  currentPayMatrix: "7th Central Pay Commission (7th CPC) Levels 1 to 18",
  databaseStatus: "Online (Indexed Local Storage)",
  aiModel: "Gemini 3.5 Flash",
  accessibilityStatus: "WCAG 2.1 AA Compliant",
  lastFormulaUpdate: "2026-06-15 10:30 IST",
  applicationVersion: "1.12.0"
};

// Storage Keys
const KEYS = {
  RULES: "railassist:admin:rules",
  FORMULAS: "railassist:admin:formulas",
  BENEFITS: "railassist:admin:benefits",
  DOCUMENTS: "railassist:admin:documents",
  CONFIG: "railassist:admin:config",
  UPDATES: "railassist:admin:updates"
};

interface RecentUpdate {
  id: string;
  title: string;
  type: string;
  date: string;
}

const DEFAULT_UPDATES: RecentUpdate[] = [
  { id: "1", title: "Railway Board Circular (RBE No. 09/2023) uploaded", type: "Circular", date: "2026-07-10" },
  { id: "2", title: "Formula Library Version updated to v2.4.1", type: "Formula", date: "2026-07-08" },
  { id: "3", title: "Rule Book (Rule 49 & Rule 50) updated for Unified Pension Scheme (UPS)", type: "Rule Book", date: "2026-07-01" },
  { id: "4", title: "RELHS Medical Contribution guidelines revised", type: "Circular", date: "2026-06-25" }
];

export function getAdminRules(): AdminRule[] {
  if (typeof window === "undefined") return DEFAULT_RULES;
  const data = window.localStorage.getItem(KEYS.RULES);
  if (!data) {
    window.localStorage.setItem(KEYS.RULES, JSON.stringify(DEFAULT_RULES));
    return DEFAULT_RULES;
  }
  return JSON.parse(data);
}

export function getAdminFormulas(): AdminFormula[] {
  if (typeof window === "undefined") return DEFAULT_FORMULAS;
  const data = window.localStorage.getItem(KEYS.FORMULAS);
  if (!data) {
    window.localStorage.setItem(KEYS.FORMULAS, JSON.stringify(DEFAULT_FORMULAS));
    return DEFAULT_FORMULAS;
  }
  return JSON.parse(data);
}

export function getAdminBenefits(): AdminBenefit[] {
  if (typeof window === "undefined") return DEFAULT_BENEFITS;
  const data = window.localStorage.getItem(KEYS.BENEFITS);
  if (!data) {
    window.localStorage.setItem(KEYS.BENEFITS, JSON.stringify(DEFAULT_BENEFITS));
    return DEFAULT_BENEFITS;
  }
  return JSON.parse(data);
}

export function getAdminDocuments(): AdminDocument[] {
  if (typeof window === "undefined") return DEFAULT_DOCUMENTS;
  const data = window.localStorage.getItem(KEYS.DOCUMENTS);
  if (!data) {
    window.localStorage.setItem(KEYS.DOCUMENTS, JSON.stringify(DEFAULT_DOCUMENTS));
    return DEFAULT_DOCUMENTS;
  }
  return JSON.parse(data);
}

export function saveAdminDocument(doc: Omit<AdminDocument, "id">): AdminDocument {
  const docs = getAdminDocuments();
  const newDoc: AdminDocument = {
    ...doc,
    id: `DOC-${Date.now()}`
  };
  const updated = [newDoc, ...docs];
  if (typeof window !== "undefined") {
    window.localStorage.setItem(KEYS.DOCUMENTS, JSON.stringify(updated));
    // Add to recent updates too
    const updates = getRecentUpdates();
    const newUpdate: RecentUpdate = {
      id: `UPD-${Date.now()}`,
      title: `${doc.type} (${doc.name}) uploaded`,
      type: "Document",
      date: new Date().toISOString().split("T")[0]
    };
    window.localStorage.setItem(KEYS.UPDATES, JSON.stringify([newUpdate, ...updates]));
  }
  return newDoc;
}

export function getSystemConfig(): SystemConfiguration {
  if (typeof window === "undefined") return DEFAULT_CONFIG;
  const data = window.localStorage.getItem(KEYS.CONFIG);
  if (!data) {
    window.localStorage.setItem(KEYS.CONFIG, JSON.stringify(DEFAULT_CONFIG));
    return DEFAULT_CONFIG;
  }
  return JSON.parse(data);
}

export function getRecentUpdates(): RecentUpdate[] {
  if (typeof window === "undefined") return DEFAULT_UPDATES;
  const data = window.localStorage.getItem(KEYS.UPDATES);
  if (!data) {
    window.localStorage.setItem(KEYS.UPDATES, JSON.stringify(DEFAULT_UPDATES));
    return DEFAULT_UPDATES;
  }
  return JSON.parse(data);
}
