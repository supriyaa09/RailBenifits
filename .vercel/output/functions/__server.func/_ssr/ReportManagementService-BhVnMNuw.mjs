import { o as getSystemConfig } from "./adminDb-Cwlxs_RN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ReportManagementService-BhVnMNuw.js
var reportStorageKey = "railassist:settlement-reports";
function listSettlementReports() {
	if (typeof window === "undefined") return [];
	try {
		const raw = window.localStorage.getItem(reportStorageKey);
		if (!raw) return [];
		const parsed = JSON.parse(raw);
		return Array.isArray(parsed) ? parsed : [];
	} catch {
		return [];
	}
}
function saveSettlementReport(assessment, result, calculation, options = {}) {
	const existingReports = listSettlementReports();
	const employeeId = assessment.employeeDetails.employeeId || "unassigned";
	const reportType = getReportType(assessment);
	const nextVersion = existingReports.filter((report) => report.employee_id === employeeId).reduce((latest, report) => Math.max(latest, report.version || report.report_version || 0), 0) + 1;
	const generatedDate = (/* @__PURE__ */ new Date()).toISOString();
	const timeStr = new Intl.DateTimeFormat("en-IN", {
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		hour12: false,
		timeZone: "Asia/Kolkata"
	}).format(/* @__PURE__ */ new Date()) + " IST";
	const reportId = buildReportId(employeeId, nextVersion, generatedDate);
	const config = getSystemConfig();
	const record = {
		report_id: reportId,
		employee_id: employeeId,
		report_number: `SCR-STL-${(/* @__PURE__ */ new Date()).getFullYear()}-${String(assessment.employeeDetails.employeeId || assessment.employeeDetails.employeeName || "DRAFT").replace(/[^a-zA-Z0-9]/g, "").slice(0, 12).toUpperCase()}`,
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
			calculation
		},
		pdf_path: options.pdfPath ?? buildPdfFileName(employeeId, generatedDate),
		status: options.status ?? "Draft",
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
		calculation
	};
	writeReports([record, ...existingReports]);
	return record;
}
function buildPdfFileName(employeeId, generatedDate = (/* @__PURE__ */ new Date()).toISOString()) {
	const date = new Date(generatedDate);
	const dateStamp = Number.isNaN(date.getTime()) ? "undated" : `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;
	return `Settlement_Report_${employeeId || "Employee"}_${dateStamp}.pdf`;
}
function restoreReportToSession(report) {
	if (typeof window === "undefined") return;
	window.sessionStorage.setItem("railassist:settlement-assessment", JSON.stringify(report.assessment || report.report_snapshot?.assessment));
	window.sessionStorage.setItem("railassist:active-report-snapshot", JSON.stringify(report));
}
function writeReports(reports) {
	window.localStorage.setItem(reportStorageKey, JSON.stringify(reports));
}
function buildReportId(employeeId, version, generatedDate) {
	return `SCR-STL-${employeeId}-${generatedDate.replace(/[^0-9]/g, "").slice(0, 14)}-V${version}`;
}
function getReportType(assessment) {
	if (assessment.serviceDetails.otherRetirementType === "death") return "Death";
	if (assessment.serviceDetails.otherRetirementType === "voluntary") return "VRS";
	if (assessment.serviceDetails.retirementCategory === "normal") return "Retirement";
	return "Other";
}
//#endregion
export { restoreReportToSession as n, saveSettlementReport as r, listSettlementReports as t };
