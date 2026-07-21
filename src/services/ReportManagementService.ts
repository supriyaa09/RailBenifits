import type { SettlementCalculation } from "@/calculations/CalculationTypes";
import type { SettlementAssessment } from "@/lib/settlement-assessment";
import type { SettlementResult } from "@/rules/RuleTypes";
import { getSystemConfig } from "@/database/adminDb";

export type SettlementReportStatus =
  "Draft" | "Submitted" | "Verified" | "Approved" | "Rejected" | "Archived";

export interface SettlementReportRecord {
  report_id: string;
  employee_id: string;
  report_number: string;
  version: number;
  generated_date: string;
  generated_time: string;
  retirement_type: "Retirement" | "Death" | "VRS" | "Other";
  scheme: string;
  rule_version: string;
  formula_version: string;
  report_snapshot: {
    assessment: SettlementAssessment;
    result: SettlementResult;
    calculation: SettlementCalculation;
  };
  pdf_path: string;
  status: SettlementReportStatus;

  // Keep these for backward compatibility
  assessment_id: string;
  report_version: number;
  employee_name: string;
  total_one_time_settlement: number;
  monthly_benefits: number;
  remarks: string;
  generated_by: string;
  verified_by: string;
  approved_by: string;
  report_type: "Retirement" | "Death" | "VRS" | "Other";
  pension_scheme: string;
  assessment: SettlementAssessment;
  result: SettlementResult;
  calculation: SettlementCalculation;
}

const reportStorageKey = "railassist:settlement-reports";

export function listSettlementReports(): SettlementReportRecord[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(reportStorageKey);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as SettlementReportRecord[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveSettlementReport(
  assessment: SettlementAssessment,
  result: SettlementResult,
  calculation: SettlementCalculation,
  options: {
    status?: SettlementReportStatus;
    remarks?: string;
    generatedBy?: string;
    pdfPath?: string;
  } = {},
): SettlementReportRecord {
  const existingReports = listSettlementReports();
  const employeeId = assessment.employeeDetails.employeeId || "unassigned";
  const reportType = getReportType(assessment);

  const nextVersion =
    existingReports
      .filter((report) => report.employee_id === employeeId)
      .reduce(
        (latest, report) => Math.max(latest, report.version || report.report_version || 0),
        0,
      ) + 1;

  const generatedDate = new Date().toISOString();

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Asia/Kolkata",
  };
  const timeStr = new Intl.DateTimeFormat("en-IN", timeOptions).format(new Date()) + " IST";

  const reportId = buildReportId(employeeId, nextVersion, generatedDate);
  const config = getSystemConfig();

  const reportNumber = `SCR-STL-${new Date().getFullYear()}-${String(
    assessment.employeeDetails.employeeId || assessment.employeeDetails.employeeName || "DRAFT",
  )
    .replace(/[^a-zA-Z0-9]/g, "")
    .slice(0, 12)
    .toUpperCase()}`;

  const record: SettlementReportRecord = {
    report_id: reportId,
    employee_id: employeeId,
    report_number: reportNumber,
    version: nextVersion,
    generated_date: generatedDate,
    generated_time: timeStr,
    retirement_type: reportType,
    scheme: assessment.serviceDetails.pensionScheme,
    rule_version: config.ruleVersion,
    formula_version: config.formulaVersion,
    report_snapshot: {
      assessment,
      result,
      calculation,
    },
    pdf_path: options.pdfPath ?? buildPdfFileName(employeeId, generatedDate),
    status: options.status ?? "Draft",

    // Backward compatibility fields
    assessment_id: `ASM-${employeeId}-${nextVersion}`,
    report_version: nextVersion,
    remarks: options.remarks ?? "",
    generated_by: options.generatedBy ?? "RailAssist Settlement Engine",
    verified_by: "",
    approved_by: "",
    report_type: reportType,
    pension_scheme: assessment.serviceDetails.pensionScheme,
    employee_name: assessment.employeeDetails.employeeName,
    total_one_time_settlement: calculation.totalOneTimeBenefits,
    monthly_benefits: calculation.monthlyPension + calculation.monthlyFma,
    assessment,
    result,
    calculation,
  };

  writeReports([record, ...existingReports]);
  return record;
}

export function findSettlementReport(reportId: string): SettlementReportRecord | null {
  return listSettlementReports().find((report) => report.report_id === reportId) ?? null;
}

export function buildPdfFileName(
  employeeId: string,
  generatedDate = new Date().toISOString(),
): string {
  const date = new Date(generatedDate);
  const dateStamp = Number.isNaN(date.getTime())
    ? "undated"
    : `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;
  return `Settlement_Report_${employeeId || "Employee"}_${dateStamp}.pdf`;
}

export function restoreReportToSession(report: SettlementReportRecord) {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(
    "railassist:settlement-assessment",
    JSON.stringify(report.assessment || report.report_snapshot?.assessment),
  );
  window.sessionStorage.setItem("railassist:active-report-snapshot", JSON.stringify(report));
}

function writeReports(reports: SettlementReportRecord[]) {
  window.localStorage.setItem(reportStorageKey, JSON.stringify(reports));
}

function buildReportId(employeeId: string, version: number, generatedDate: string): string {
  const compactDate = generatedDate.replace(/[^0-9]/g, "").slice(0, 14);
  return `SCR-STL-${employeeId}-${compactDate}-V${version}`;
}

function getReportType(assessment: SettlementAssessment): SettlementReportRecord["report_type"] {
  if (assessment.serviceDetails.otherRetirementType === "death") return "Death";
  if (assessment.serviceDetails.otherRetirementType === "voluntary") return "VRS";
  if (assessment.serviceDetails.retirementCategory === "normal") return "Retirement";
  return "Other";
}
