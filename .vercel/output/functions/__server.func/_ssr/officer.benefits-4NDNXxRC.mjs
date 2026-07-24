import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { I as FileText } from "../_libs/lucide-react.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { c as SearchBar, l as SectionCard, s as PageHeader, t as Badge } from "./common-DvgjYd9Y.mjs";
import { t as getAdminBenefits } from "./adminDb-Cwlxs_RN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/officer.benefits-4NDNXxRC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "C:/Users/Abhishek/Downloads/RailwayBenifits/rail-benefits-navigator/src/routes/officer.benefits.tsx?tsr-split=component";
function SettlementBenefitsPage() {
	const benefits = getAdminBenefits();
	const [searchTerm, setSearchTerm] = (0, import_react.useState)("");
	const filteredBenefits = benefits.filter((b) => {
		const searchLower = searchTerm.toLowerCase();
		return b.name.toLowerCase().includes(searchLower) || b.eligibility.toLowerCase().includes(searchLower) || b.formulaUsed.toLowerCase().includes(searchLower) || b.ruleReference.toLowerCase().includes(searchLower);
	});
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PageHeader, {
			title: "Settlement Benefits Index",
			description: "Statutory reference ledger for one-time and monthly recurring benefits admissible to South Central Railway staff."
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 14,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SectionCard, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "w-full md:max-w-md",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SearchBar, {
					placeholder: "Search by benefit name, formula, or eligibility details...",
					value: searchTerm,
					onChange: setSearchTerm
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 19,
					columnNumber: 13
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 18,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "text-xs text-muted-foreground bg-muted/30 px-3 py-1.5 rounded border border-border shrink-0 font-medium",
				children: [
					"Showing ",
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "font-bold text-foreground",
						children: filteredBenefits.length
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 22,
						columnNumber: 21
					}, this),
					" of",
					" ",
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "font-bold text-foreground",
						children: benefits.length
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 23,
						columnNumber: 13
					}, this),
					" benefit records"
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 21,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 17,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "grid gap-6",
			children: [filteredBenefits.map((b) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "card-surface p-5 border border-border/80 hover:border-primary/30 transition-all flex flex-col md:flex-row gap-5 justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "space-y-3 flex-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex flex-wrap items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
									className: "font-semibold text-base text-foreground leading-tight",
									children: b.name
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 33,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
									variant: "secondary",
									className: "font-mono text-[9px] uppercase tracking-wider bg-muted/60 text-muted-foreground border-border/80",
									children: b.id
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 36,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-xs text-muted-foreground ml-auto md:ml-0 font-medium",
									children: ["Ref: ", b.ruleReference]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 39,
									columnNumber: 19
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 32,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "text-sm text-foreground/90 leading-relaxed bg-muted/10 p-3 rounded-lg border border-border/30",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1",
								children: "Admissibility & Eligibility Criteria"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 45,
								columnNumber: 19
							}, this), b.eligibility]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 44,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid gap-3 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1",
								children: "Computation Method"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 53,
								columnNumber: 21
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "text-xs text-primary font-mono bg-primary-soft/10 border border-primary/10 rounded px-2 py-1 inline-block",
								children: b.formulaUsed
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 56,
								columnNumber: 21
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 52,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1",
								children: "Required Documents Checklist"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 62,
								columnNumber: 21
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex flex-wrap gap-1.5",
								children: b.requiredDocuments.map((doc) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-[10px] bg-background text-muted-foreground border border-border/60 px-2 py-0.5 rounded flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FileText, { className: "h-3 w-3 text-muted-foreground/80" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 67,
										columnNumber: 27
									}, this), doc]
								}, doc, true, {
									fileName: _jsxFileName,
									lineNumber: 66,
									columnNumber: 55
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 65,
								columnNumber: 21
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 61,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 51,
							columnNumber: 17
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 31,
					columnNumber: 15
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "w-full md:w-64 border-t md:border-t-0 md:border-l border-border/40 pt-4 md:pt-0 md:pl-5 flex flex-col justify-between shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "text-xs font-bold text-muted-foreground uppercase tracking-wider",
							children: "Applicable Retirement Types"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 78,
							columnNumber: 19
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex flex-wrap gap-1",
							children: b.applicableRetirementTypes.map((type) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-[10px] bg-primary-soft/40 text-primary border border-primary/10 px-1.5 py-0.5 rounded font-medium",
								children: type
							}, type, false, {
								fileName: _jsxFileName,
								lineNumber: 82,
								columnNumber: 62
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 81,
							columnNumber: 19
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 77,
						columnNumber: 17
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-4 pt-3 border-t border-border/30 flex items-center justify-between text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-muted-foreground font-semibold",
							children: "Status"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 89,
							columnNumber: 19
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "h-1.5 w-1.5 rounded-full bg-emerald-500" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 91,
								columnNumber: 21
							}, this), b.status]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 90,
							columnNumber: 19
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 88,
						columnNumber: 17
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 76,
					columnNumber: 15
				}, this)]
			}, b.id, true, {
				fileName: _jsxFileName,
				lineNumber: 29,
				columnNumber: 38
			}, this)), filteredBenefits.length === 0 && /* @__PURE__ */ (void 0)("div", {
				className: "text-center py-12 text-sm text-muted-foreground",
				children: [
					"No benefits found matching \"",
					searchTerm,
					"\"."
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 98,
				columnNumber: 45
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 28,
			columnNumber: 9
		}, this)] }, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 16,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 13,
		columnNumber: 10
	}, this);
}
//#endregion
export { SettlementBenefitsPage as component };
