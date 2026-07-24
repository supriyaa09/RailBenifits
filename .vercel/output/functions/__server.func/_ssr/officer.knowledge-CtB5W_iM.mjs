import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { R as FileCog, Z as CircleQuestionMark, h as ShieldCheck, l as TrendingUp, lt as ArrowRight, n as Wallet, ot as BookOpen, v as Search, y as ScrollText } from "../_libs/lucide-react.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { s as PageHeader, t as Badge } from "./common-DvgjYd9Y.mjs";
import { i as getAdminRules, n as getAdminDocuments, r as getAdminFormulas, t as getAdminBenefits } from "./adminDb-Cwlxs_RN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/officer.knowledge-CtB5W_iM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "C:/Users/Abhishek/Downloads/RailwayBenifits/rail-benefits-navigator/src/routes/officer.knowledge.tsx?tsr-split=component";
function RailwayKnowledgeBasePage() {
	const [searchTerm, setSearchTerm] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (typeof window !== "undefined") {
			const queryParam = new URLSearchParams(window.location.search).get("q") || "";
			setSearchTerm(queryParam);
		}
	}, [typeof window !== "undefined" ? window.location.search : ""]);
	const rules = getAdminRules();
	const formulas = getAdminFormulas();
	const benefits = getAdminBenefits();
	const documents = getAdminDocuments();
	const isSearching = searchTerm.trim().length > 0;
	const searchLower = searchTerm.toLowerCase();
	const matchedRules = rules.filter((r) => r.name.toLowerCase().includes(searchLower) || r.description.toLowerCase().includes(searchLower) || r.ruleNumber.toLowerCase().includes(searchLower) || r.ruleReference.toLowerCase().includes(searchLower));
	const matchedFormulas = formulas.filter((f) => f.name.toLowerCase().includes(searchLower) || f.completeFormula.toLowerCase().includes(searchLower) || f.ruleReference.toLowerCase().includes(searchLower) || f.variablesUsed.some((v) => v.toLowerCase().includes(searchLower)));
	const matchedBenefits = benefits.filter((b) => b.name.toLowerCase().includes(searchLower) || b.eligibility.toLowerCase().includes(searchLower) || b.formulaUsed.toLowerCase().includes(searchLower) || b.ruleReference.toLowerCase().includes(searchLower));
	const matchedDocuments = documents.filter((d) => d.name.toLowerCase().includes(searchLower) || d.category.toLowerCase().includes(searchLower) || d.type.toLowerCase().includes(searchLower));
	const totalMatches = matchedRules.length + matchedFormulas.length + matchedBenefits.length + matchedDocuments.length;
	const handleQuickSearch = (term) => {
		if (typeof window !== "undefined") {
			const newUrl = new URL(window.location.href);
			newUrl.searchParams.set("q", term);
			window.history.pushState({}, "", newUrl.toString());
			setSearchTerm(term);
		}
	};
	const handleSearchInput = (e) => {
		const val = e.target.value;
		setSearchTerm(val);
		if (typeof window !== "undefined") {
			const newUrl = new URL(window.location.href);
			if (val) newUrl.searchParams.set("q", val);
			else newUrl.searchParams.delete("q");
			window.history.replaceState({}, "", newUrl.toString());
		}
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PageHeader, {
				title: "Railway Knowledge Base",
				description: "Search indexed policy files, mathematical calculation formulas, and benefits checklists in a single query."
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 52,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "card-surface p-6 bg-gradient-to-br from-card to-muted/20 border border-border/80 shadow-soft",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "max-w-2xl mx-auto text-center space-y-4 py-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
							className: "text-xl font-semibold text-foreground",
							children: "SCR Rules & Formulas Query Center"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 57,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-xs text-muted-foreground",
							children: "Type any keyword (e.g. Gratuity, Pension, Leave, RELHS) to query the administration ledger."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 60,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "relative max-w-xl mx-auto",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Search, { className: "h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/80" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 66,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
								type: "text",
								placeholder: "Search index database...",
								value: searchTerm,
								onChange: handleSearchInput,
								className: "h-11 w-full pl-10 pr-4 rounded-lg border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-primary/30 shadow-sm"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 67,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 65,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground pt-1 font-medium",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Quick Queries:" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 71,
								columnNumber: 13
							}, this), [
								"Gratuity",
								"Pension",
								"Leave",
								"RELHS",
								"CGEGIS"
							].map((term) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								onClick: () => handleQuickSearch(term),
								className: "bg-muted hover:bg-primary-soft/50 border border-border/80 px-2 py-0.5 rounded text-[11px] text-foreground hover:text-primary transition-colors cursor-pointer",
								children: term
							}, term, false, {
								fileName: _jsxFileName,
								lineNumber: 72,
								columnNumber: 78
							}, this))]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 70,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 56,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 55,
				columnNumber: 7
			}, this),
			isSearching ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "space-y-6",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center justify-between border-b border-border pb-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
						className: "font-semibold text-foreground text-sm flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TrendingUp, { className: "h-4 w-4 text-primary" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 84,
								columnNumber: 15
							}, this),
							"Query Results for \"",
							searchTerm,
							"\""
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 83,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
						variant: "outline",
						className: "text-xs font-semibold bg-primary-soft/30 text-primary",
						children: [totalMatches, " matches found"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 87,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 82,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid gap-6 lg:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", {
								className: "font-bold text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-1.5 px-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShieldCheck, { className: "h-4 w-4 text-blue-500" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 96,
										columnNumber: 17
									}, this),
									"Rules Admissibility (",
									matchedRules.length,
									")"
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 95,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-2",
								children: [matchedRules.map((rule) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "card-surface p-4 border border-border/80 bg-card hover:border-blue-500/20 transition-colors",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "flex items-center justify-between gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "font-semibold text-sm text-foreground",
												children: rule.name
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 102,
												columnNumber: 23
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
												variant: "outline",
												className: "text-[10px] uppercase font-mono font-bold",
												children: rule.id
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 103,
												columnNumber: 23
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 101,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
											className: "text-xs text-muted-foreground mt-1.5 line-clamp-2 leading-relaxed",
											children: rule.description
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 107,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "flex items-center gap-2 mt-2 pt-2 border-t border-border/30 text-[10px] text-muted-foreground font-medium",
											children: [
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: rule.ruleNumber }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 111,
													columnNumber: 23
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "h-1 w-1 rounded-full bg-border" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 112,
													columnNumber: 23
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: ["Ref: ", rule.ruleReference] }, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 113,
													columnNumber: 23
												}, this)
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 110,
											columnNumber: 21
										}, this)
									]
								}, rule.id, true, {
									fileName: _jsxFileName,
									lineNumber: 100,
									columnNumber: 43
								}, this)), matchedRules.length === 0 && /* @__PURE__ */ (void 0)("div", {
									className: "text-center py-6 text-xs text-muted-foreground border border-dashed rounded-lg bg-muted/5",
									children: "No matching rules."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 116,
									columnNumber: 47
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 99,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 94,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", {
								className: "font-bold text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-1.5 px-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FileCog, { className: "h-4 w-4 text-amber-500" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 125,
										columnNumber: 17
									}, this),
									"Calculation Formulas (",
									matchedFormulas.length,
									")"
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 124,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-2",
								children: [matchedFormulas.map((formula) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "card-surface p-4 border border-border/80 bg-card hover:border-amber-500/20 transition-colors",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "flex items-center justify-between gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "font-semibold text-sm text-foreground",
												children: formula.name
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 131,
												columnNumber: 23
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
												variant: "outline",
												className: "text-[10px] uppercase font-mono font-bold",
												children: formula.id
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 132,
												columnNumber: 23
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 130,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "bg-muted/30 p-2 rounded border border-border/60 font-mono text-[11px] text-primary mt-2 break-all",
											children: formula.completeFormula
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 136,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "flex items-center gap-2 mt-2 pt-2 border-t border-border/30 text-[10px] text-muted-foreground font-medium",
											children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: ["Vars: ", formula.variablesUsed.join(", ")] }, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 140,
												columnNumber: 23
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 139,
											columnNumber: 21
										}, this)
									]
								}, formula.id, true, {
									fileName: _jsxFileName,
									lineNumber: 129,
									columnNumber: 49
								}, this)), matchedFormulas.length === 0 && /* @__PURE__ */ (void 0)("div", {
									className: "text-center py-6 text-xs text-muted-foreground border border-dashed rounded-lg bg-muted/5",
									children: "No matching formulas."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 143,
									columnNumber: 50
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 128,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 123,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", {
								className: "font-bold text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-1.5 px-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Wallet, { className: "h-4 w-4 text-emerald-500" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 152,
										columnNumber: 17
									}, this),
									"Settlement Benefits (",
									matchedBenefits.length,
									")"
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 151,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-2",
								children: [matchedBenefits.map((benefit) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "card-surface p-4 border border-border/80 bg-card hover:border-emerald-500/20 transition-colors",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "flex items-center justify-between gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "font-semibold text-sm text-foreground",
												children: benefit.name
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 158,
												columnNumber: 23
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
												variant: "outline",
												className: "text-[10px] uppercase font-mono font-bold",
												children: benefit.id
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 159,
												columnNumber: 23
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 157,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
											className: "text-xs text-muted-foreground mt-1.5 line-clamp-2 leading-relaxed",
											children: benefit.eligibility
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 163,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "mt-2 text-[11px] font-mono text-primary bg-primary-soft/10 px-2 py-0.5 rounded border border-primary/10 inline-block",
											children: ["Uses: ", benefit.formulaUsed]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 166,
											columnNumber: 21
										}, this)
									]
								}, benefit.id, true, {
									fileName: _jsxFileName,
									lineNumber: 156,
									columnNumber: 49
								}, this)), matchedBenefits.length === 0 && /* @__PURE__ */ (void 0)("div", {
									className: "text-center py-6 text-xs text-muted-foreground border border-dashed rounded-lg bg-muted/5",
									children: "No matching benefit definitions."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 170,
									columnNumber: 50
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 155,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 150,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", {
								className: "font-bold text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-1.5 px-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ScrollText, { className: "h-4 w-4 text-purple-500" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 179,
										columnNumber: 17
									}, this),
									"Reference Circulars & PDFs (",
									matchedDocuments.length,
									")"
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 178,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-2",
								children: [matchedDocuments.map((doc) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "card-surface p-4 border border-border/80 bg-card hover:border-purple-500/20 transition-colors",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex items-center justify-between gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "font-semibold text-sm text-foreground truncate max-w-[200px] sm:max-w-xs",
											children: doc.name
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 185,
											columnNumber: 23
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
											variant: "outline",
											className: "text-[9px] uppercase tracking-wider bg-background px-1.5 py-0 shrink-0",
											children: doc.type
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 188,
											columnNumber: 23
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 184,
										columnNumber: 21
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex items-center justify-between mt-2 pt-2 border-t border-border/30 text-[10px] text-muted-foreground font-medium",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: ["Category: ", doc.category] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 193,
											columnNumber: 23
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: ["Size: ", doc.size] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 194,
											columnNumber: 23
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 192,
										columnNumber: 21
									}, this)]
								}, doc.id, true, {
									fileName: _jsxFileName,
									lineNumber: 183,
									columnNumber: 46
								}, this)), matchedDocuments.length === 0 && /* @__PURE__ */ (void 0)("div", {
									className: "text-center py-6 text-xs text-muted-foreground border border-dashed rounded-lg bg-muted/5",
									children: "No matching source documentation."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 197,
									columnNumber: 51
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 182,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 177,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 92,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 81,
				columnNumber: 5
			}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid gap-6 md:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "card-surface p-5 md:col-span-2 space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
						className: "font-semibold text-foreground text-sm flex items-center gap-2 border-b border-border/60 pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BookOpen, { className: "h-4.5 w-4.5 text-primary" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 208,
							columnNumber: 15
						}, this), "Indexed Administrative Guidelines"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 207,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-3 text-xs text-muted-foreground leading-relaxed",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: "Welcome to the South Central Railway Knowledge Index. This lookup interface offers reading lookup capabilities mapped against the underlying pension rules calculation engine." }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 213,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid gap-3 sm:grid-cols-2 pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "p-3 bg-muted/20 border border-border/60 rounded-lg",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "font-bold text-foreground mb-1",
									children: "Qualifying Service Mapping"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 220,
									columnNumber: 19
								}, this), "Rule 49 defines qualifying service limits for full vs. partial pensions (minimum 10 years for pension eligibility, 5 years for gratuity)."]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 219,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "p-3 bg-muted/20 border border-border/60 rounded-lg",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "font-bold text-foreground mb-1",
									children: "Gratuity Formula Admissibility"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 225,
									columnNumber: 19
								}, this), "Rule 50 limits maximum lump sum gratuity payouts to ₹20,00,000 using completed six-month service emolument factors."]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 224,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 218,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 212,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 206,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "card-surface p-5 space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
						className: "font-semibold text-foreground text-sm flex items-center gap-2 border-b border-border/60 pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleQuestionMark, { className: "h-4.5 w-4.5 text-primary" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 237,
							columnNumber: 15
						}, this), "Quick Reference Index"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 236,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
						className: "space-y-2 text-xs font-semibold",
						children: [
							{
								name: "How is LAP Leave Encashment calculated?",
								term: "Leave"
							},
							{
								name: "What is the enhanced family pension limit?",
								term: "Family Pension"
							},
							{
								name: "RELHS post-retirement medical eligibility",
								term: "RELHS"
							},
							{
								name: "CGEGIS subscription saving multipliers",
								term: "CGEGIS"
							}
						].map((faq, idx) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
							className: "flex items-start gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowRight, { className: "h-3.5 w-3.5 text-primary mt-0.5 shrink-0" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 254,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								onClick: () => handleQuickSearch(faq.term),
								className: "text-left text-muted-foreground hover:text-primary hover:underline transition-colors",
								children: faq.name
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 255,
								columnNumber: 19
							}, this)]
						}, idx, true, {
							fileName: _jsxFileName,
							lineNumber: 253,
							columnNumber: 32
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 240,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 235,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 205,
				columnNumber: 5
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 51,
		columnNumber: 10
	}, this);
}
//#endregion
export { RailwayKnowledgeBasePage as component };
