import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { b as Scale, r as Variable } from "../_libs/lucide-react.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { c as SearchBar, l as SectionCard, s as PageHeader, t as Badge } from "./common-DvgjYd9Y.mjs";
import { r as getAdminFormulas } from "./adminDb-Cwlxs_RN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/officer.formulas-8a34t8Ei.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "C:/Users/Abhishek/Downloads/RailwayBenifits/rail-benefits-navigator/src/routes/officer.formulas.tsx?tsr-split=component";
function FormulaLibraryPage() {
	const formulas = getAdminFormulas();
	const [searchTerm, setSearchTerm] = (0, import_react.useState)("");
	const filteredFormulas = formulas.filter((f) => {
		const searchLower = searchTerm.toLowerCase();
		return f.name.toLowerCase().includes(searchLower) || f.completeFormula.toLowerCase().includes(searchLower) || f.ruleReference.toLowerCase().includes(searchLower) || f.variablesUsed.some((v) => v.toLowerCase().includes(searchLower));
	});
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PageHeader, {
			title: "Formula Library",
			description: "Statutory mathematical models used by the RailAssist core calculation engine to compute retirement payouts."
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 14,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SectionCard, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "w-full md:max-w-md",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SearchBar, {
					placeholder: "Search by formula name, variable, or rule reference...",
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
						children: filteredFormulas.length
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 22,
						columnNumber: 21
					}, this),
					" of",
					" ",
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "font-bold text-foreground",
						children: formulas.length
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 23,
						columnNumber: 13
					}, this),
					" formula models"
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
			className: "grid gap-6 md:grid-cols-2",
			children: [filteredFormulas.map((f) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "card-surface p-5 border border-border/80 hover:border-primary/45 transition-colors flex flex-col justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-start justify-between gap-2 border-b border-border/40 pb-3",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
									className: "font-semibold text-base text-foreground leading-tight",
									children: f.name
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 34,
									columnNumber: 21
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-[11px] text-muted-foreground mt-1 flex items-center gap-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Scale, { className: "h-3 w-3 shrink-0" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 38,
											columnNumber: 23
										}, this),
										"Rule Ref: ",
										f.ruleReference
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 37,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 33,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
								variant: "outline",
								className: "font-mono text-[10px] uppercase tracking-wider shrink-0 bg-background",
								children: f.id
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 42,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 32,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "bg-muted/40 p-4 rounded-lg border border-border/60 font-mono text-xs text-foreground font-semibold leading-relaxed break-all relative group overflow-x-auto",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "absolute right-2 top-2 text-[9px] bg-background border border-border px-1 py-0.5 rounded text-muted-foreground uppercase font-bold tracking-wider opacity-60",
								children: "Formula Expression"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 49,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "pt-2 text-primary",
								children: f.completeFormula
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 52,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 48,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "text-xs font-semibold text-muted-foreground flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Variable, { className: "h-3.5 w-3.5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 58,
									columnNumber: 21
								}, this), "Variables Map:"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 57,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex flex-wrap gap-1.5",
								children: f.variablesUsed.map((v) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "font-mono text-[10px] bg-background text-muted-foreground border border-border px-2 py-0.5 rounded hover:text-primary transition-colors",
									children: v
								}, v, false, {
									fileName: _jsxFileName,
									lineNumber: 62,
									columnNumber: 47
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 61,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 56,
							columnNumber: 17
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 30,
					columnNumber: 15
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-5 pt-3 border-t border-border/30 flex items-center justify-between text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-muted-foreground",
							children: "Scheme:"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 72,
							columnNumber: 19
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "font-semibold text-foreground",
							children: f.applicableScheme
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 73,
							columnNumber: 19
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 71,
						columnNumber: 17
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "h-2 w-2 rounded-full bg-emerald-500" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 76,
							columnNumber: 19
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-[11px] text-muted-foreground font-semibold uppercase tracking-wider",
							children: f.status
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 77,
							columnNumber: 19
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 75,
						columnNumber: 17
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 70,
					columnNumber: 15
				}, this)]
			}, f.id, true, {
				fileName: _jsxFileName,
				lineNumber: 29,
				columnNumber: 38
			}, this)), filteredFormulas.length === 0 && /* @__PURE__ */ (void 0)("div", {
				className: "md:col-span-2 text-center py-12 text-sm text-muted-foreground",
				children: [
					"No formulas found matching \"",
					searchTerm,
					"\"."
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 84,
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
export { FormulaLibraryPage as component };
