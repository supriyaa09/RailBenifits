import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { c as SearchBar, l as SectionCard, s as PageHeader, t as Badge } from "./common-DvgjYd9Y.mjs";
import { i as getAdminRules } from "./adminDb-Cwlxs_RN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/officer.rules-nF8OLBw0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "C:/Users/Abhishek/Downloads/RailwayBenifits/rail-benefits-navigator/src/routes/officer.rules.tsx?tsr-split=component";
function PensionRulesPage() {
	const allRules = getAdminRules();
	const [searchTerm, setSearchTerm] = (0, import_react.useState)("");
	const filteredRules = allRules.filter((rule) => {
		const searchLower = searchTerm.toLowerCase();
		return rule.name.toLowerCase().includes(searchLower) || rule.ruleNumber.toLowerCase().includes(searchLower) || rule.id.toLowerCase().includes(searchLower) || rule.description.toLowerCase().includes(searchLower) || rule.ruleReference.toLowerCase().includes(searchLower);
	});
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PageHeader, {
			title: "Pension Rules Database",
			description: "Comprehensive read-only repository of statutory pension rules governing Indian Railways retirement benefits."
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 14,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SectionCard, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "w-full md:max-w-md",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SearchBar, {
					placeholder: "Search by rule name, rule number, or reference...",
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
				className: "text-xs text-muted-foreground bg-muted/30 px-3 py-1.5 rounded border border-border shrink-0",
				children: [
					"Showing ",
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "font-semibold text-foreground",
						children: filteredRules.length
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 22,
						columnNumber: 21
					}, this),
					" of",
					" ",
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "font-semibold text-foreground",
						children: allRules.length
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 23,
						columnNumber: 13
					}, this),
					" rules"
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
			className: "overflow-x-auto rounded-lg border border-border bg-card",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("table", {
				className: "w-full text-left text-sm border-collapse",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("thead", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", {
					className: "border-b border-border bg-muted/20 text-xs font-semibold text-muted-foreground uppercase",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
							className: "px-4 py-3 font-semibold w-24",
							children: "Rule ID"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 32,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
							className: "px-4 py-3 font-semibold",
							children: "Rule details"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 33,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
							className: "px-4 py-3 font-semibold",
							children: "Applicable Retirement Types"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 34,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
							className: "px-4 py-3 font-semibold w-32",
							children: "Scheme"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 35,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
							className: "px-4 py-3 font-semibold w-28 text-center",
							children: "Status"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 36,
							columnNumber: 17
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 31,
					columnNumber: 15
				}, this) }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 30,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tbody", {
					className: "divide-y divide-border/60",
					children: [filteredRules.map((rule) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", {
						className: "hover:bg-muted/10 transition-colors align-top",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
								className: "px-4 py-4 font-mono text-xs font-bold text-primary",
								children: rule.id
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 41,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
								className: "px-4 py-4 space-y-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "font-medium text-foreground",
											children: rule.name
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 44,
											columnNumber: 23
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-[10px] bg-muted text-muted-foreground border border-border px-1.5 py-0.5 rounded font-mono",
											children: rule.ruleNumber
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 45,
											columnNumber: 23
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 43,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "text-xs text-muted-foreground line-clamp-2 max-w-xl",
										children: rule.description
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 49,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "text-[11px] text-primary/80 font-medium pt-1",
										children: ["Reference: ", rule.ruleReference]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 52,
										columnNumber: 21
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 42,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
								className: "px-4 py-4",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex flex-wrap gap-1 max-w-xs",
									children: rule.applicableRetirementTypes.map((type) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-[10px] bg-primary-soft/40 text-primary border border-primary/10 px-1.5 py-0.5 rounded",
										children: type
									}, type, false, {
										fileName: _jsxFileName,
										lineNumber: 58,
										columnNumber: 67
									}, this))
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 57,
									columnNumber: 21
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 56,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
								className: "px-4 py-4",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
									variant: rule.applicableScheme.includes("OPS") ? "default" : "secondary",
									className: "text-[10px] px-2 py-0.5 font-bold",
									children: rule.applicableScheme
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 64,
									columnNumber: 21
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 63,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
								className: "px-4 py-4 text-center",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 70,
										columnNumber: 23
									}, this), rule.status]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 69,
									columnNumber: 21
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 68,
								columnNumber: 19
							}, this)
						]
					}, rule.id, true, {
						fileName: _jsxFileName,
						lineNumber: 40,
						columnNumber: 42
					}, this)), filteredRules.length === 0 && /* @__PURE__ */ (void 0)("tr", { children: /* @__PURE__ */ (void 0)("td", {
						colSpan: 5,
						className: "px-4 py-8 text-center text-muted-foreground",
						children: [
							"No rules found matching \"",
							searchTerm,
							"\"."
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 76,
						columnNumber: 19
					}, this) }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 75,
						columnNumber: 46
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 39,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 29,
				columnNumber: 11
			}, this)
		}, void 0, false, {
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
export { PensionRulesPage as component };
