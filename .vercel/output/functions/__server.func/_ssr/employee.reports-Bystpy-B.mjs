import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { B as Eye, H as Download, I as FileText, v as Search, w as Printer } from "../_libs/lucide-react.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { f as cn, l as SectionCard, o as Input, s as PageHeader, t as Badge } from "./common-DvgjYd9Y.mjs";
import { c as formatCurrency } from "./settlement-assessment-qVns9-hD.mjs";
import { t as Button } from "./button-B28lidbK.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-BTJpNtQe.mjs";
import { n as restoreReportToSession, t as listSettlementReports } from "./ReportManagementService-BhVnMNuw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/employee.reports-Bystpy-B.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName$1 = "C:/Users/Abhishek/Downloads/RailwayBenifits/rail-benefits-navigator/src/components/ui/table.tsx";
var Table = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
	className: "relative w-full overflow-auto",
	children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("table", {
		ref,
		className: cn("w-full caption-bottom text-sm", className),
		...props
	}, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 8,
		columnNumber: 7
	}, void 0)
}, void 0, false, {
	fileName: _jsxFileName$1,
	lineNumber: 7,
	columnNumber: 5
}, void 0));
Table.displayName = "Table";
var TableHeader = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("thead", {
	ref,
	className: cn("[&_tr]:border-b", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$1,
	lineNumber: 18,
	columnNumber: 3
}, void 0));
TableHeader.displayName = "TableHeader";
var TableBody = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tbody", {
	ref,
	className: cn("[&_tr:last-child]:border-0", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$1,
	lineNumber: 26,
	columnNumber: 3
}, void 0));
TableBody.displayName = "TableBody";
var TableFooter = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tfoot", {
	ref,
	className: cn("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$1,
	lineNumber: 34,
	columnNumber: 3
}, void 0));
TableFooter.displayName = "TableFooter";
var TableRow = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", {
	ref,
	className: cn("border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$1,
	lineNumber: 44,
	columnNumber: 5
}, void 0));
TableRow.displayName = "TableRow";
var TableHead = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
	ref,
	className: cn("h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$1,
	lineNumber: 60,
	columnNumber: 3
}, void 0));
TableHead.displayName = "TableHead";
var TableCell = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
	ref,
	className: cn("p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$1,
	lineNumber: 75,
	columnNumber: 3
}, void 0));
TableCell.displayName = "TableCell";
var TableCaption = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("caption", {
	ref,
	className: cn("mt-4 text-sm text-muted-foreground", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$1,
	lineNumber: 90,
	columnNumber: 3
}, void 0));
TableCaption.displayName = "TableCaption";
var _jsxFileName = "C:/Users/Abhishek/Downloads/RailwayBenifits/rail-benefits-navigator/src/routes/employee.reports.tsx?tsr-split=component";
var reportTypeFilters = [
	"All",
	"Retirement",
	"Death",
	"VRS"
];
var schemeFilters = [
	"All",
	"OPS",
	"UPS",
	"NPS"
];
function ReportsPage() {
	const navigate = useNavigate();
	const [query, setQuery] = (0, import_react.useState)("");
	const [typeFilter, setTypeFilter] = (0, import_react.useState)("All");
	const [schemeFilter, setSchemeFilter] = (0, import_react.useState)("All");
	const [sortOrder, setSortOrder] = (0, import_react.useState)("newest");
	const [selectedReports, setSelectedReports] = (0, import_react.useState)([]);
	const reports = (0, import_react.useMemo)(() => listSettlementReports(), []);
	const filteredReports = (0, import_react.useMemo)(() => {
		const normalizedQuery = query.trim().toLowerCase();
		return reports.filter((report) => {
			const matchesQuery = !normalizedQuery || report.employee_name.toLowerCase().includes(normalizedQuery) || report.employee_id.toLowerCase().includes(normalizedQuery) || report.report_id.toLowerCase().includes(normalizedQuery);
			const matchesType = typeFilter === "All" || report.report_type === typeFilter;
			const matchesScheme = schemeFilter === "All" || report.pension_scheme === schemeFilter;
			return matchesQuery && matchesType && matchesScheme;
		}).sort((a, b) => {
			const left = new Date(a.generated_date).getTime();
			const right = new Date(b.generated_date).getTime();
			return sortOrder === "newest" ? right - left : left - right;
		});
	}, [
		query,
		reports,
		schemeFilter,
		sortOrder,
		typeFilter
	]);
	const comparisonReports = selectedReports.map((reportId) => reports.find((report) => report.report_id === reportId)).filter((report) => Boolean(report));
	const openReport = (report, action = "view") => {
		restoreReportToSession(report);
		if (action === "print") navigate({
			to: "/employee/result",
			search: { print: "true" }
		});
		else if (action === "download") navigate({
			to: "/employee/result",
			search: { download: "true" }
		});
		else navigate({ to: "/employee/result" });
	};
	const toggleComparison = (reportId) => {
		setSelectedReports((current) => {
			if (current.includes(reportId)) return current.filter((id) => id !== reportId);
			return [...current.slice(-1), reportId];
		});
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PageHeader, {
			title: "My Settlement Reports",
			description: "View, search, print, download, and compare generated settlement report versions.",
			actions: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/employee/benefits",
					children: "New Assessment"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 67,
					columnNumber: 13
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 66,
				columnNumber: 153
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 66,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SectionCard, {
			title: "Report Filters",
			description: "Find reports by employee, report number, case type, scheme, or date order.",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid gap-3 md:grid-cols-[1fr_150px_150px_150px]",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Search, { className: "pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 73,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
							value: query,
							onChange: (event) => setQuery(event.target.value),
							placeholder: "Search reports",
							className: "pl-9"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 74,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 72,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, {
						value: typeFilter,
						onValueChange: (value) => setTypeFilter(value),
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectValue, {}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 78,
							columnNumber: 15
						}, this) }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 77,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectContent, { children: reportTypeFilters.map((value) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
							value,
							children: value
						}, value, false, {
							fileName: _jsxFileName,
							lineNumber: 81,
							columnNumber: 47
						}, this)) }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 80,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 76,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, {
						value: schemeFilter,
						onValueChange: (value) => setSchemeFilter(value),
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectValue, {}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 88,
							columnNumber: 15
						}, this) }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 87,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectContent, { children: schemeFilters.map((value) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
							value,
							children: value
						}, value, false, {
							fileName: _jsxFileName,
							lineNumber: 91,
							columnNumber: 43
						}, this)) }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 90,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 86,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, {
						value: sortOrder,
						onValueChange: (value) => setSortOrder(value),
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectValue, {}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 98,
							columnNumber: 15
						}, this) }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 97,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
							value: "newest",
							children: "Newest first"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 101,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
							value: "oldest",
							children: "Oldest first"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 102,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 100,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 96,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 71,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 70,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SectionCard, {
			title: "Previous Reports",
			description: "Each generated report creates a versioned record.",
			children: filteredReports.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "rounded-md border border-dashed border-border p-8 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FileText, { className: "mx-auto h-8 w-8 text-muted-foreground" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 110,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-3 font-medium",
						children: "No reports found"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 111,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "Save a draft or generate a new version from the Official Report tab."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 112,
						columnNumber: 13
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 109,
				columnNumber: 41
			}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableHead, { children: "Report & Version" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 118,
					columnNumber: 17
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableHead, { children: "Employee Details" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 119,
					columnNumber: 17
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableHead, { children: "Retirement Details" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 120,
					columnNumber: 17
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableHead, {
					className: "text-right",
					children: "One-Time Settlement"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 121,
					columnNumber: 17
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableHead, {
					className: "text-right",
					children: "Monthly Benefits"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 122,
					columnNumber: 17
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableHead, { children: "Generated Timestamp" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 123,
					columnNumber: 17
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableHead, {
					className: "text-right",
					children: "Actions"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 124,
					columnNumber: 17
				}, this)
			] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 117,
				columnNumber: 15
			}, this) }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 116,
				columnNumber: 13
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableBody, { children: filteredReports.map((report) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
					className: "flex items-start gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
						type: "checkbox",
						checked: selectedReports.includes(report.report_id),
						onChange: () => toggleComparison(report.report_id),
						className: "mt-1"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 131,
						columnNumber: 23
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "block font-bold text-foreground",
							children: ["Version ", report.version || report.report_version]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 133,
							columnNumber: 25
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "block text-xs font-mono text-muted-foreground",
							children: report.report_number || "Draft Report"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 136,
							columnNumber: 25
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "block text-[11px] text-muted-foreground mt-0.5",
							children: [
								"Rules: ",
								report.rule_version || "Railway Pension Rules 2026",
								" | Formula:",
								" ",
								report.formula_version || "v2.4.1"
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 139,
							columnNumber: 25
						}, this)
					] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 132,
						columnNumber: 23
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 130,
					columnNumber: 21
				}, this) }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 129,
					columnNumber: 19
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableCell, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "font-semibold text-foreground",
					children: report.employee_name || "Not available"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 147,
					columnNumber: 21
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "text-xs text-muted-foreground",
					children: ["ID: ", report.employee_id]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 150,
					columnNumber: 21
				}, this)] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 146,
					columnNumber: 19
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableCell, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "font-medium text-foreground",
					children: report.retirement_type || report.report_type
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 153,
					columnNumber: 21
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "text-xs text-muted-foreground",
					children: ["Scheme: ", report.scheme || report.pension_scheme]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 156,
					columnNumber: 21
				}, this)] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 152,
					columnNumber: 19
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableCell, {
					className: "text-right font-bold text-foreground",
					children: formatCurrency(report.total_one_time_settlement)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 161,
					columnNumber: 19
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableCell, {
					className: "text-right font-bold text-foreground",
					children: formatCurrency(report.monthly_benefits)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 164,
					columnNumber: 19
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableCell, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "font-medium text-foreground",
					children: formatReportDate(report.generated_date)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 168,
					columnNumber: 21
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "text-xs text-muted-foreground",
					children: report.generated_time || "10:30 IST"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 171,
					columnNumber: 21
				}, this)] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 167,
					columnNumber: 19
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex justify-end gap-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							variant: "ghost",
							size: "icon",
							onClick: () => openReport(report, "view"),
							title: "View report",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Eye, { className: "h-4 w-4 text-primary" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 178,
								columnNumber: 25
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 177,
							columnNumber: 23
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							variant: "ghost",
							size: "icon",
							onClick: () => openReport(report, "print"),
							title: "Print report",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Printer, { className: "h-4 w-4 text-primary" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 181,
								columnNumber: 25
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 180,
							columnNumber: 23
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							variant: "ghost",
							size: "icon",
							onClick: () => openReport(report, "download"),
							title: "Download PDF",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Download, { className: "h-4 w-4 text-primary" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 184,
								columnNumber: 25
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 183,
							columnNumber: 23
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 176,
					columnNumber: 21
				}, this) }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 175,
					columnNumber: 19
				}, this)
			] }, report.report_id, true, {
				fileName: _jsxFileName,
				lineNumber: 128,
				columnNumber: 46
			}, this)) }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 127,
				columnNumber: 13
			}, this)] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 115,
				columnNumber: 20
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 108,
			columnNumber: 7
		}, this),
		comparisonReports.length > 0 && /* @__PURE__ */ (void 0)(SectionCard, {
			title: "Version Comparison",
			description: "Select up to two saved report versions to compare totals and status.",
			children: /* @__PURE__ */ (void 0)("div", {
				className: "grid gap-4 lg:grid-cols-2",
				children: comparisonReports.map((report) => /* @__PURE__ */ (void 0)("div", {
					className: "rounded-md border border-border p-4",
					children: [/* @__PURE__ */ (void 0)("div", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("div", {
							className: "font-semibold",
							children: ["Version ", report.report_version]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 198,
							columnNumber: 21
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "text-xs text-muted-foreground",
							children: report.report_id
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 199,
							columnNumber: 21
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 197,
							columnNumber: 19
						}, this), /* @__PURE__ */ (void 0)(Badge, {
							variant: "secondary",
							children: report.status
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 201,
							columnNumber: 19
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 196,
						columnNumber: 17
					}, this), /* @__PURE__ */ (void 0)("div", {
						className: "mt-4 grid gap-2 text-sm",
						children: [
							/* @__PURE__ */ (void 0)(CompareLine, {
								label: "Generated",
								value: formatReportDate(report.generated_date)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 204,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (void 0)(CompareLine, {
								label: "Report Type",
								value: report.report_type
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 205,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (void 0)(CompareLine, {
								label: "Pension Scheme",
								value: report.pension_scheme
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 206,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (void 0)(CompareLine, {
								label: "One-Time Settlement",
								value: formatCurrency(report.total_one_time_settlement)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 207,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (void 0)(CompareLine, {
								label: "Monthly Benefits",
								value: formatCurrency(report.monthly_benefits)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 208,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (void 0)(CompareLine, {
								label: "PDF Path",
								value: report.pdf_path
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 209,
								columnNumber: 19
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 203,
						columnNumber: 17
					}, this)]
				}, report.report_id, true, {
					fileName: _jsxFileName,
					lineNumber: 195,
					columnNumber: 46
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 194,
				columnNumber: 11
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 193,
			columnNumber: 40
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 65,
		columnNumber: 10
	}, this);
}
function CompareLine({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex justify-between gap-3 border-b border-border pb-1 last:border-b-0",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
			className: "text-muted-foreground",
			children: label
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 224,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
			className: "text-right font-medium",
			children: value
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 225,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 223,
		columnNumber: 10
	}, this);
}
function formatReportDate(value) {
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) return "Not available";
	return date.toLocaleDateString("en-IN", {
		day: "2-digit",
		month: "short",
		year: "numeric"
	});
}
//#endregion
export { ReportsPage as component };
