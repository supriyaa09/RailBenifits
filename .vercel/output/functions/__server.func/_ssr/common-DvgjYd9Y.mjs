import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { v as Search } from "../_libs/lucide-react.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/common-DvgjYd9Y.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var _jsxFileName$2 = "C:/Users/Abhishek/Downloads/RailwayBenifits/rail-benefits-navigator/src/components/ui/badge.tsx";
var badgeVariants = cva("inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", {
	variants: { variant: {
		default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
		secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
		destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
		outline: "text-foreground"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: cn(badgeVariants({ variant }), className),
		...props
	}, void 0, false, {
		fileName: _jsxFileName$2,
		lineNumber: 29,
		columnNumber: 10
	}, this);
}
var _jsxFileName$1 = "C:/Users/Abhishek/Downloads/RailwayBenifits/rail-benefits-navigator/src/components/ui/input.tsx";
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
		type,
		className: cn("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	}, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 8,
		columnNumber: 7
	}, void 0);
});
Input.displayName = "Input";
var _jsxFileName = "C:/Users/Abhishek/Downloads/RailwayBenifits/rail-benefits-navigator/src/components/rail/common.tsx";
var INDIAN_RAILWAYS_LOGO = "/assets/logo/indian-railways.png";
function Brand({ subtitle }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
		to: "/",
		className: "flex items-center gap-3 group",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
			src: INDIAN_RAILWAYS_LOGO,
			alt: "Indian Railways",
			className: "h-10 w-10 shrink-0 object-contain md:h-12 md:w-12 lg:h-14 lg:w-14 group-hover:scale-105 transition-transform"
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 13,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "leading-tight",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "font-semibold tracking-tight text-foreground",
				children: "RailAssist"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 19,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "text-[11px] text-muted-foreground",
				children: subtitle ?? "South Central Railway HQ"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 20,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 18,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 12,
		columnNumber: 5
	}, this);
}
function PageHeader({ title, description, actions }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-6 rounded-lg border border-border bg-card p-5 shadow-soft print:hidden",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
			className: "text-2xl font-semibold tracking-tight text-foreground",
			children: title
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 40,
			columnNumber: 9
		}, this), description && /* @__PURE__ */ (void 0)("p", {
			className: "text-sm text-muted-foreground mt-1 max-w-2xl",
			children: description
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 42,
			columnNumber: 11
		}, this)] }, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 39,
			columnNumber: 7
		}, this), actions && /* @__PURE__ */ (void 0)("div", {
			className: "flex gap-2",
			children: actions
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 45,
			columnNumber: 19
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 38,
		columnNumber: 5
	}, this);
}
function StatCard({ label, value, hint, icon }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "card-surface p-5",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex items-start justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "text-xs uppercase tracking-wider text-muted-foreground",
					children: label
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 67,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "text-2xl font-semibold text-foreground mt-1",
					children: value
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 68,
					columnNumber: 11
				}, this),
				hint && /* @__PURE__ */ (void 0)("div", {
					className: "text-xs text-muted-foreground mt-1",
					children: hint
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 69,
					columnNumber: 20
				}, this)
			] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 66,
				columnNumber: 9
			}, this), icon && /* @__PURE__ */ (void 0)("div", {
				className: "h-9 w-9 rounded-md bg-primary-soft text-primary grid place-items-center ring-1 ring-primary/10",
				children: icon
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 72,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 65,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 64,
		columnNumber: 5
	}, this);
}
function DashboardCard({ title, description, icon, action }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "card-surface p-5 h-full flex flex-col gap-4 hover:border-primary/30 transition-colors",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex items-start gap-3",
			children: [icon && /* @__PURE__ */ (void 0)("div", {
				className: "h-10 w-10 rounded-md bg-primary-soft text-primary grid place-items-center ring-1 ring-primary/10 shrink-0",
				children: icon
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 96,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
					className: "font-medium text-foreground",
					children: title
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 101,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-sm text-muted-foreground mt-1",
					children: description
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 102,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 100,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 94,
			columnNumber: 7
		}, this), action && /* @__PURE__ */ (void 0)("div", {
			className: "mt-auto",
			children: action
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 105,
			columnNumber: 18
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 93,
		columnNumber: 5
	}, this);
}
function SectionCard({ title, description, children }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		className: "card-surface p-5",
		children: [(title || description) && /* @__PURE__ */ (void 0)("div", {
			className: "mb-4",
			children: [title && /* @__PURE__ */ (void 0)("h2", {
				className: "font-medium text-foreground",
				children: title
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 123,
				columnNumber: 21
			}, this), description && /* @__PURE__ */ (void 0)("p", {
				className: "text-sm text-muted-foreground mt-1",
				children: description
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 124,
				columnNumber: 27
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 122,
			columnNumber: 9
		}, this), children]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 120,
		columnNumber: 5
	}, this);
}
function StatusPlaceholder({ title, description, sprint = "Coming in Sprint 2", icon }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PageHeader, {
		title,
		description
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 145,
		columnNumber: 7
	}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SectionCard, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex flex-col md:flex-row md:items-center gap-4",
		children: [icon && /* @__PURE__ */ (void 0)("div", {
			className: "h-12 w-12 rounded-md bg-primary-soft text-primary grid place-items-center ring-1 ring-primary/10",
			children: icon
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 149,
			columnNumber: 13
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex-1",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "font-medium text-foreground",
					children: "Module Status"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 155,
					columnNumber: 15
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
					variant: "secondary",
					children: sprint
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 156,
					columnNumber: 15
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 154,
				columnNumber: 13
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "text-sm text-muted-foreground mt-1",
				children: "This page is part of the application foundation. Business workflows, uploads, calculations, rule processing, database logic, and AI integrations are intentionally not enabled yet."
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 158,
				columnNumber: 13
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 153,
			columnNumber: 11
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 147,
		columnNumber: 9
	}, this) }, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 146,
		columnNumber: 7
	}, this)] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 144,
		columnNumber: 5
	}, this);
}
function SearchBar({ placeholder = "Search", value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "relative w-full",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Search, { className: "h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 191,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
			value,
			onChange: (event) => onChange?.(event.target.value),
			placeholder,
			className: "pl-9"
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 192,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 190,
		columnNumber: 5
	}, this);
}
function EmptyState({ title, description, icon, action }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "card-surface p-10 text-center",
		children: [
			icon && /* @__PURE__ */ (void 0)("div", {
				className: "mx-auto h-12 w-12 rounded-full bg-primary-soft text-primary grid place-items-center mb-4 ring-1 ring-primary/10",
				children: icon
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 216,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "font-medium text-foreground",
				children: title
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 220,
				columnNumber: 7
			}, this),
			description && /* @__PURE__ */ (void 0)("div", {
				className: "text-sm text-muted-foreground mt-1 max-w-md mx-auto",
				children: description
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 222,
				columnNumber: 9
			}, this),
			action && /* @__PURE__ */ (void 0)("div", {
				className: "mt-4",
				children: action
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 224,
				columnNumber: 18
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 214,
		columnNumber: 5
	}, this);
}
//#endregion
export { INDIAN_RAILWAYS_LOGO as a, SearchBar as c, StatusPlaceholder as d, cn as f, EmptyState as i, SectionCard as l, Brand as n, Input as o, DashboardCard as r, PageHeader as s, Badge as t, StatCard as u };
