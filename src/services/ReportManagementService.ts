import type { SettlementCalculation } from "@/calculations/CalculationTypes";
import type { SettlementAssessment } from "@/lib/settlement-assessment";
import type { SettlementResult } from "@/rules/RuleTypes";

export type SettlementReportStatus =
  | "Draft"
  | "Submitted"
  | "Verified"
  | "Approved"
  | "Rejected"
  | "Archived";

export interface SettlementReportRecord {
  report_id: string;
  employee_id: string;
  assessment_id: string;
  generated_date: string;
  report_version: number;
  pdf_path: string;
  status: SettlementReportStatus;
  remarks: string;
  generated_by: string;
  verified_by: string;
  approved_by: string;
  report_type: "Retirement" | "Death" | "VRS" | "Other";
  pension_scheme: string;
  employee_name: string;
  total_one_time_settlement: number;
  monthly_benefits: number;
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
      .reduce((latest, report) => Math.max(latest, report.report_version), 0) + 1;
  const generatedDate = new Date().toISOString();
  const reportId = buildReportId(employeeId, nextVersion, generatedDate);
  const record: SettlementReportRecord = {
    report_id: reportId,
    employee_id: employeeId,
    assessment_id: `ASM-${employeeId}-${nextVersion}`,
    generated_date: generatedDate,
    report_version: nextVersion,
    pdf_path: options.pdfPath ?? buildPdfFileName(employeeId, generatedDate),
    status: options.status ?? "Draft",
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

export function buildPdfFileName(employeeId: string, generatedDate = new Date().toISOString()): string {
  const date = new Date(generatedDate);
  const dateStamp = Number.isNaN(date.getTime())
    ? "undated"
    : `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;
  return `Settlement_Report_${employeeId || "Employee"}_${dateStamp}.pdf`;
}

export function restoreReportToSession(report: SettlementReportRecord) {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem("railassist:settlement-assessment", JSON.stringify(report.assessment));
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
