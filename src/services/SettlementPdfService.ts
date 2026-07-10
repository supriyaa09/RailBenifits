import type { SettlementCalculation } from "@/calculations/CalculationTypes";
import type { SettlementAssessment } from "@/lib/settlement-assessment";
import type { SettlementResult } from "@/rules/RuleTypes";
import { buildPdfFileName } from "./ReportManagementService";

export interface SettlementPdfRequest {
  assessment: SettlementAssessment;
  result: SettlementResult;
  calculation: SettlementCalculation;
  reportVersion: number;
  status: string;
}

export interface SettlementPdfResponse {
  fileName: string;
  pdfPath: string;
  renderMode: "structured-html-print";
}

export function prepareSettlementPdfRequest(request: SettlementPdfRequest): SettlementPdfResponse {
  const employeeId = request.assessment.employeeDetails.employeeId || "Employee";
  const fileName = buildPdfFileName(employeeId);

  return {
    fileName,
    pdfPath: `/reports/${fileName}`,
    renderMode: "structured-html-print",
  };
}

export function printStructuredCertificate() {
  if (typeof window === "undefined") return;
  window.print();
}
