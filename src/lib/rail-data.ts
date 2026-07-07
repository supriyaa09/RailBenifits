export type CaseType = "retirement" | "death" | "removal";
export type PensionScheme = "OPS" | "NPS" | "UPS";
export type EmployeeGroup = "A" | "B" | "C" | "D";
export type Relationship = "Wife" | "Husband" | "Son" | "Daughter" | "Parent";

export interface BenefitInput {
  caseType: CaseType;
  scheme: PensionScheme;
  years: number;
  basicPay: number;
  da: number;
  group: EmployeeGroup;
  relationship?: Relationship;
}

export interface BenefitResult {
  name: string;
  eligible: boolean;
  reason: string;
  documents: string[];
  circular: string;
  circularId: string;
  amount?: string;
  rulesApplied: string[];
}

export interface EvaluationOutput {
  benefits: BenefitResult[];
  trace: string[];
}

const money = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

export function evaluateBenefits(input: BenefitInput): EvaluationOutput {
  const { caseType, scheme, years, basicPay, da, group, relationship } = input;
  const emoluments = basicPay + (basicPay * da) / 100;
  const results: BenefitResult[] = [];
  const trace: string[] = [
    "Employee Details captured",
    `Case = ${caseType === "retirement" ? "Retirement" : caseType === "death" ? "Death Case" : "Removal / Resignation"} ✔`,
    `Pension Scheme = ${scheme} ✔`,
    `Group = ${group} ✔`,
  ];

  // Pension
  if (caseType === "retirement") {
    const pensionEligible = (scheme === "OPS" || scheme === "UPS") && years >= 10;
    const monthly = pensionEligible ? Math.round((basicPay * 0.5)) : 0;
    results.push({
      name: "Pension",
      eligible: pensionEligible,
      reason: pensionEligible
        ? `Minimum 10 years qualifying service met under ${scheme}.`
        : scheme === "NPS"
        ? "Under NPS, monthly defined-benefit pension does not apply — subscriber receives annuity via PFRDA."
        : "Minimum 10 years qualifying service not completed.",
      documents: ["Service Book", "Form 5 (Pension)", "Aadhaar", "Bank Details", "PPO Application"],
      circular: "RBE No. 45/2022 — Revised Pension Rules",
      circularId: "RBE-45-2022",
      amount: pensionEligible ? `${money(monthly)} / month (50% of last basic)` : undefined,
      rulesApplied: pensionEligible ? ["R101", "R203"] : ["R101"],
    });
    trace.push(pensionEligible ? "Rule R101 (Qualifying Service ≥ 10y) ✔" : "Rule R101 (Qualifying Service ≥ 10y) ✗");
    if (pensionEligible) trace.push("Rule R203 (Pension Computation) ✔");
  }

  // Family Pension
  if (caseType === "death") {
    const validRel = relationship === "Wife" || relationship === "Husband" || (relationship === "Son" || relationship === "Daughter") || relationship === "Parent";
    results.push({
      name: "Family Pension",
      eligible: !!validRel,
      reason: validRel
        ? `Family pension admissible to ${relationship} under Rule 54 of CCS (Pension) Rules.`
        : "Relationship not eligible under Rule 54.",
      documents: ["Death Certificate", "Legal Heir Certificate", "Form 14", "Joint Photograph", "Bank Details"],
      circular: "RBE No. 12/2021 — Family Pension Guidelines",
      circularId: "RBE-12-2021",
      amount: validRel ? `${money(Math.round(basicPay * 0.3))} / month (30% of last basic, enhanced 50% for 10y)` : undefined,
      rulesApplied: validRel ? ["R310", "R312"] : ["R310"],
    });
    trace.push(validRel ? "Rule R310 (Family Pension) ✔" : "Rule R310 (Family Pension) ✗");
  }

  // Gratuity
  const gratuityEligible = caseType !== "removal" && years >= 5;
  const gratuityAmt = gratuityEligible ? Math.min(2000000, Math.round((emoluments * years) / 4)) : 0;
  results.push({
    name: "Retirement / Death Gratuity",
    eligible: gratuityEligible,
    reason: gratuityEligible
      ? "5+ years of qualifying service. Computed at 1/4 of emoluments per completed 6-month period, capped at ₹20,00,000."
      : caseType === "removal"
      ? "Not admissible in cases of removal or self-resignation before 20 years."
      : "Minimum 5 years qualifying service not met.",
    documents: ["Form 6", "Nomination Form", "Service Certificate"],
    circular: "RBE No. 78/2020 — Gratuity Rules",
    circularId: "RBE-78-2020",
    amount: gratuityEligible ? money(gratuityAmt) : undefined,
    rulesApplied: gratuityEligible ? ["R405"] : [],
  });
  if (gratuityEligible) trace.push("Rule R405 (Gratuity Computation) ✔");

  // Leave Encashment
  results.push({
    name: "Leave Encashment",
    eligible: caseType !== "removal",
    reason:
      caseType !== "removal"
        ? "Up to 300 days of earned leave encashable on retirement / death."
        : "Not admissible in cases of removal / dismissal.",
    documents: ["Leave Account", "Form LE-1"],
    circular: "RBE No. 22/2019 — Leave Encashment",
    circularId: "RBE-22-2019",
    amount: caseType !== "removal" ? `${money(Math.round(emoluments * 10))} (approx. 300 days)` : undefined,
    rulesApplied: caseType !== "removal" ? ["R502"] : [],
  });

  // Provident Fund
  results.push({
    name: "Provident Fund (GPF/PRAN)",
    eligible: true,
    reason: scheme === "NPS" ? "NPS corpus withdrawable per PFRDA guidelines (60% lumpsum, 40% annuity)." : "Full GPF balance with interest is payable.",
    documents: ["GPF/NPS Statement", "Withdrawal Form", "Bank Details"],
    circular: "RBE No. 09/2023 — PF Withdrawal",
    circularId: "RBE-09-2023",
    rulesApplied: ["R601"],
  });

  // GIS
  results.push({
    name: "Group Insurance Scheme (GIS)",
    eligible: true,
    reason: `Savings + Insurance component payable as per Group ${group} subscription slab.`,
    documents: ["GIS Form", "Nomination"],
    circular: "RBE No. 11/2018 — CGEGIS",
    circularId: "RBE-11-2018",
    amount: money({ A: 120000, B: 60000, C: 30000, D: 15000 }[group]),
    rulesApplied: ["R701"],
  });

  // RELHS
  const relhsEligible = caseType !== "removal" && years >= 20;
  results.push({
    name: "RELHS (Medical)",
    eligible: relhsEligible,
    reason: relhsEligible
      ? "Eligible for Railway Employees Liberalised Health Scheme post-retirement."
      : "Minimum 20 years of service required for RELHS.",
    documents: ["RELHS Application", "Passport Photo", "Medical Card Form"],
    circular: "RBE No. 55/2017 — RELHS",
    circularId: "RBE-55-2017",
    rulesApplied: relhsEligible ? ["R810"] : [],
  });

  // Complimentary Passes
  results.push({
    name: "Complimentary Passes",
    eligible: caseType !== "removal" && years >= 20,
    reason:
      caseType !== "removal" && years >= 20
        ? `Post-retirement complimentary passes admissible per Group ${group} entitlement.`
        : "Requires 20+ years of service and non-removal separation.",
    documents: ["Pass Application", "Photo ID"],
    circular: "RBE No. 33/2022 — Passes & PTOs",
    circularId: "RBE-33-2022",
    rulesApplied: caseType !== "removal" && years >= 20 ? ["R905"] : [],
  });

  trace.push("Benefits Generated ✔");
  return { benefits: results, trace };
}

// -------- Sample datasets --------

export const CIRCULARS = [
  { id: "RBE-45-2022", name: "Revised Pension Rules 2022", date: "2022-08-12", category: "Pension", summary: "Revised computation methodology for retirement pension under OPS/UPS.", status: "Active" },
  { id: "RBE-12-2021", name: "Family Pension Guidelines", date: "2021-03-04", category: "Family Pension", summary: "Consolidated guidelines for family pension including enhanced rates.", status: "Active" },
  { id: "RBE-78-2020", name: "Gratuity Rules Amendment", date: "2020-11-19", category: "Gratuity", summary: "Ceiling revised to ₹20,00,000 with computation clarifications.", status: "Active" },
  { id: "RBE-22-2019", name: "Leave Encashment Policy", date: "2019-05-22", category: "Leave", summary: "Encashment of up to 300 days of earned leave.", status: "Active" },
  { id: "RBE-09-2023", name: "PF Withdrawal SOP", date: "2023-02-17", category: "PF", summary: "Standard operating procedure for GPF and NPS withdrawal.", status: "Active" },
  { id: "RBE-11-2018", name: "CGEGIS Subscription Slabs", date: "2018-07-08", category: "Insurance", summary: "Group-wise subscription and payout tables.", status: "Active" },
  { id: "RBE-55-2017", name: "RELHS Scheme Details", date: "2017-09-30", category: "Medical", summary: "Eligibility and enrolment for RELHS post-retirement.", status: "Active" },
  { id: "RBE-33-2022", name: "Passes & PTOs Manual", date: "2022-01-15", category: "Passes", summary: "Complimentary pass entitlements by group and service length.", status: "Active" },
];

export const RULES = [
  { id: "R101", name: "Qualifying Service for Pension", caseType: "Retirement", conditions: "Service ≥ 10 years, scheme in {OPS, UPS}", docs: "Service Book, Form 5", circular: "RBE-45-2022", effective: "2022-08-12", status: "Active" },
  { id: "R203", name: "Pension Computation", caseType: "Retirement", conditions: "Pension = 50% of last basic pay", docs: "PPO Application", circular: "RBE-45-2022", effective: "2022-08-12", status: "Active" },
  { id: "R310", name: "Family Pension Eligibility", caseType: "Death", conditions: "Legal heir per Rule 54 CCS (Pension)", docs: "Form 14, Legal Heir Cert.", circular: "RBE-12-2021", effective: "2021-03-04", status: "Active" },
  { id: "R312", name: "Enhanced Family Pension", caseType: "Death", conditions: "50% for first 10y / until age 67", docs: "Form 14", circular: "RBE-12-2021", effective: "2021-03-04", status: "Active" },
  { id: "R405", name: "Gratuity Computation", caseType: "Retirement/Death", conditions: "Emoluments × 1/4 × completed 6-month periods; cap ₹20L", docs: "Form 6, Nomination", circular: "RBE-78-2020", effective: "2020-11-19", status: "Active" },
  { id: "R502", name: "Leave Encashment Cap", caseType: "Retirement/Death", conditions: "Max 300 days EL encashable", docs: "Leave Account", circular: "RBE-22-2019", effective: "2019-05-22", status: "Active" },
  { id: "R601", name: "PF / NPS Withdrawal", caseType: "All", conditions: "GPF full or NPS 60/40", docs: "Withdrawal Form", circular: "RBE-09-2023", effective: "2023-02-17", status: "Active" },
  { id: "R701", name: "GIS Payout", caseType: "All", conditions: "Group-wise savings + insurance", docs: "GIS Form", circular: "RBE-11-2018", effective: "2018-07-08", status: "Active" },
  { id: "R810", name: "RELHS Eligibility", caseType: "Retirement", conditions: "Service ≥ 20 years", docs: "RELHS Form", circular: "RBE-55-2017", effective: "2017-09-30", status: "Active" },
  { id: "R905", name: "Complimentary Passes", caseType: "Retirement", conditions: "Service ≥ 20y; not removed", docs: "Pass Application", circular: "RBE-33-2022", effective: "2022-01-15", status: "Active" },
];

export const SCHEMES = [
  { code: "OPS", name: "Old Pension Scheme", desc: "Defined-benefit pension: 50% of last drawn basic pay for employees appointed before 01-Jan-2004.", features: ["Guaranteed monthly pension", "Family pension to legal heirs", "DA-linked revisions"] },
  { code: "NPS", name: "National Pension System", desc: "Defined-contribution scheme (10% employee + 14% employer) regulated by PFRDA.", features: ["Market-linked returns", "Portable across sectors", "60% lumpsum + 40% annuity on exit"] },
  { code: "UPS", name: "Unified Pension Scheme", desc: "Assured pension scheme (2025) blending features of OPS and NPS for eligible central employees.", features: ["Assured 50% pension after 25y", "Minimum ₹10,000 pension", "Family pension @ 60%"] },
];

export const FAQS = [
  { q: "What is the minimum service required for pension?", a: "10 years of qualifying service is required for pension under OPS/UPS." },
  { q: "Is gratuity taxable?", a: "Gratuity received by government employees is fully exempt from income tax." },
  { q: "Who is eligible for Family Pension?", a: "Spouse, dependent children, and dependent parents as defined under Rule 54." },
  { q: "How many days of leave can be encashed?", a: "Up to 300 days of earned leave can be encashed at retirement/death." },
  { q: "What is RELHS?", a: "Railway Employees Liberalised Health Scheme provides medical facilities post-retirement." },
  { q: "Can NPS subscribers get OPS pension?", a: "No, unless they opt for UPS as per the 2025 guidelines and meet the eligibility criteria." },
];

export const DOCS = [
  { name: "RBE-45-2022-Pension.pdf", uploaded: "2022-08-12", size: "1.2 MB", category: "Pension", status: "Indexed" },
  { name: "Family-Pension-Guidelines.pdf", uploaded: "2021-03-04", size: "890 KB", category: "Family Pension", status: "Indexed" },
  { name: "Gratuity-Amendment.pdf", uploaded: "2020-11-19", size: "540 KB", category: "Gratuity", status: "Indexed" },
  { name: "RELHS-Manual.pdf", uploaded: "2017-09-30", size: "2.1 MB", category: "Medical", status: "Indexed" },
  { name: "CGEGIS-Slabs.pdf", uploaded: "2018-07-08", size: "320 KB", category: "Insurance", status: "Indexed" },
];

export const LOGS = [
  { ts: "2025-07-06 14:22", user: "officer.rao", action: "Updated Rule R203 (Pension Computation)", level: "info" },
  { ts: "2025-07-06 12:04", user: "officer.mehta", action: "Uploaded circular RBE-09-2023", level: "info" },
  { ts: "2025-07-05 18:11", user: "system", action: "Reindexed circular knowledge base", level: "info" },
  { ts: "2025-07-05 09:47", user: "employee.42918", action: "Ran benefits check (Retirement, UPS)", level: "info" },
  { ts: "2025-07-04 16:33", user: "officer.rao", action: "Deactivated Rule R220 (legacy)", level: "warn" },
];
