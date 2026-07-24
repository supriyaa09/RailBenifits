import { B as Eye, C as RefreshCw, U as Database, W as Cpu, m as Shield } from "../_libs/lucide-react.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { l as SectionCard, s as PageHeader, t as Badge } from "./common-DvgjYd9Y.mjs";
import { o as getSystemConfig } from "./adminDb-Cwlxs_RN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/officer.configuration-jYtwX8VM.js
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "C:/Users/Abhishek/Downloads/RailwayBenifits/rail-benefits-navigator/src/routes/officer.configuration.tsx?tsr-split=component";
function SystemConfigurationPage() {
	const config = getSystemConfig();
	const configs = [
		{
			group: "Policy Governance",
			icon: Shield,
			items: [{
				label: "Railway Rule Version",
				value: config.ruleVersion,
				hint: "Statutory rules engine baseline"
			}, {
				label: "Last Rules Ref Update",
				value: config.lastFormulaUpdate,
				hint: "Revision synchronization date"
			}]
		},
		{
			group: "Calculation Core",
			icon: Cpu,
			items: [{
				label: "Formula Version",
				value: config.formulaVersion,
				hint: "Mathematical calculation model code version"
			}, {
				label: "Current Pay Matrix",
				value: config.currentPayMatrix,
				hint: "Admissible salary matrix tiers"
			}]
		},
		{
			group: "Services & Databases",
			icon: Database,
			items: [{
				label: "Database Status",
				value: config.databaseStatus,
				badge: "Active",
				hint: "Storage engine status"
			}, {
				label: "AI Assistance Engine",
				value: config.aiModel,
				hint: "Large Language Model backing query indexer"
			}]
		},
		{
			group: "Application Compliance",
			icon: Eye,
			items: [{
				label: "Accessibility Standard",
				value: config.accessibilityStatus,
				badge: "Compliant",
				hint: "UI inclusion parameters"
			}, {
				label: "Application Version",
				value: config.applicationVersion,
				hint: "Build version for demo verification"
			}]
		}
	];
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PageHeader, {
				title: "System Configuration",
				description: "Core policy rules parameters, database service statuses, and compliance levels for RailAssist."
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 59,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid gap-6 md:grid-cols-2",
				children: configs.map((grp) => {
					const GroupIcon = grp.icon;
					return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SectionCard, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-2 border-b border-border/55 pb-3 mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(GroupIcon, { className: "h-5 w-5 text-primary shrink-0" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 66,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
							className: "font-semibold text-foreground text-sm leading-none",
							children: grp.group
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 67,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 65,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-4",
						children: grp.items.map((item) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-lg border border-border/40 bg-muted/5 hover:bg-muted/10 transition-colors",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "text-[11px] font-bold text-muted-foreground uppercase tracking-wider",
									children: item.label
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 72,
									columnNumber: 23
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "text-sm font-semibold text-foreground mt-0.5",
									children: item.value
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 75,
									columnNumber: 23
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "text-[10px] text-muted-foreground mt-0.5",
									children: item.hint
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 78,
									columnNumber: 23
								}, this)
							] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 71,
								columnNumber: 21
							}, this), item.badge && /* @__PURE__ */ (void 0)(Badge, {
								variant: "outline",
								className: "h-6 text-[10px] font-bold bg-emerald-500/10 text-emerald-500 border-emerald-500/20 shrink-0 self-start sm:self-center",
								children: item.badge
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 80,
								columnNumber: 36
							}, this)]
						}, item.label, true, {
							fileName: _jsxFileName,
							lineNumber: 70,
							columnNumber: 40
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 69,
						columnNumber: 15
					}, this)] }, grp.group, true, {
						fileName: _jsxFileName,
						lineNumber: 64,
						columnNumber: 16
					}, this);
				})
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 61,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SectionCard, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-lg bg-red-500/5 border border-red-500/10",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "space-y-1 text-center sm:text-left",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", {
						className: "font-semibold text-foreground text-sm",
						children: "Reset Local Database Tables"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 93,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-xs text-muted-foreground",
						children: "Re-seeding will clear document uploads and restore default rules parameters."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 94,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 92,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					onClick: () => {
						if (confirm("Reset local rules database to initial values?")) {
							if (typeof window !== "undefined") {
								window.localStorage.removeItem("railassist:admin:rules");
								window.localStorage.removeItem("railassist:admin:formulas");
								window.localStorage.removeItem("railassist:admin:benefits");
								window.localStorage.removeItem("railassist:admin:documents");
								window.localStorage.removeItem("railassist:admin:config");
								window.localStorage.removeItem("railassist:admin:updates");
								alert("Local Storage Tables Re-seeded. Reloading...");
								window.location.reload();
							}
						}
					},
					className: "flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-red-500/20 hover:border-red-500/40 bg-red-500/10 hover:bg-red-500/20 text-red-500 text-xs font-bold transition-all cursor-pointer shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RefreshCw, { className: "h-3.5 w-3.5" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 112,
						columnNumber: 13
					}, this), "Reset & Re-Seed"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 98,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 91,
				columnNumber: 9
			}, this) }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 90,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 58,
		columnNumber: 10
	}, this);
}
//#endregion
export { SystemConfigurationPage as component };
