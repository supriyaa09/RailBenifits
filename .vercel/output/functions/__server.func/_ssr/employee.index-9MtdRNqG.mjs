import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { I as FileText, at as Bot, lt as ArrowRight, q as ClipboardCheck } from "../_libs/lucide-react.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { r as DashboardCard, s as PageHeader } from "./common-DvgjYd9Y.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/employee.index-9MtdRNqG.js
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "C:/Users/Abhishek/Downloads/RailwayBenifits/rail-benefits-navigator/src/routes/employee.index.tsx?tsr-split=component";
var cards = [
	{
		title: "Start Settlement Assessment",
		description: "Begin the guided settlement assessment workflow when Sprint 2 enables forms and rules.",
		to: "/employee/benefits",
		icon: ClipboardCheck
	},
	{
		title: "My Settlement Reports",
		description: "Review generated settlement summaries and advisory reports once reporting is enabled.",
		to: "/employee/reports",
		icon: FileText
	},
	{
		title: "Railway Knowledge Assistant",
		description: "Access the knowledge assistant to ask AI guided pension and settlement questions.",
		to: "/employee/assistant",
		icon: Bot
	}
];
function EmployeeDashboard() {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PageHeader, {
		title: "Employee Dashboard",
		description: "A readable portal shell for railway employees to access settlement and pension advisory modules."
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 22,
		columnNumber: 7
	}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "grid gap-4 md:grid-cols-2 xl:grid-cols-3",
		children: cards.map((card) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DashboardCard, {
			title: card.title,
			description: card.description,
			icon: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(card.icon, { className: "h-5 w-5" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 25,
				columnNumber: 116
			}, this),
			action: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
				to: card.to,
				className: "text-sm font-medium text-primary inline-flex items-center gap-2",
				children: ["Open module", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowRight, { className: "h-4 w-4" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 27,
					columnNumber: 17
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 25,
				columnNumber: 159
			}, this)
		}, card.title, false, {
			fileName: _jsxFileName,
			lineNumber: 25,
			columnNumber: 28
		}, this))
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 24,
		columnNumber: 7
	}, this)] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 21,
		columnNumber: 10
	}, this);
}
//#endregion
export { EmployeeDashboard as component };
