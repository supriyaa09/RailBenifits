import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as useNavigate, f as Outlet, g as Link, l as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as LogOut, I as FileText, L as FileSpreadsheet, O as Moon, P as LayoutDashboard, R as FileCog, U as Database, X as CircleUser, at as Bot, f as Sun, g as Settings, h as ShieldCheck, k as Menu, n as Wallet, q as ClipboardCheck, st as Bell, t as X, v as Search, y as ScrollText } from "../_libs/lucide-react.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { a as INDIAN_RAILWAYS_LOGO } from "./common-DvgjYd9Y.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shell-BfKjr4g4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "C:/Users/Abhishek/Downloads/RailwayBenifits/rail-benefits-navigator/src/components/rail/shell.tsx";
var themeStorageKeyPrefix = "railassist:theme";
var employeeNav = [
	{
		title: "Dashboard",
		to: "/employee",
		icon: LayoutDashboard,
		exact: true
	},
	{
		title: "Settlement Assessment",
		to: "/employee/benefits",
		icon: ClipboardCheck
	},
	{
		title: "Settlement Results",
		to: "/employee/result",
		icon: FileSpreadsheet
	},
	{
		title: "My Settlement Reports",
		to: "/employee/reports",
		icon: FileText
	},
	{
		title: "Railway Knowledge Assistant",
		to: "/employee/assistant",
		icon: Bot
	}
];
var officerNav = [
	{
		title: "Dashboard",
		to: "/officer",
		icon: LayoutDashboard,
		exact: true
	},
	{
		title: "Pension Rules",
		to: "/officer/rules",
		icon: ShieldCheck
	},
	{
		title: "Formula Library",
		to: "/officer/formulas",
		icon: FileCog
	},
	{
		title: "Settlement Benefits",
		to: "/officer/benefits",
		icon: Wallet
	},
	{
		title: "Document Repository",
		to: "/officer/documents",
		icon: ScrollText
	},
	{
		title: "Railway Knowledge Base",
		to: "/officer/knowledge",
		icon: Database
	},
	{
		title: "System Configuration",
		to: "/officer/configuration",
		icon: Settings
	}
];
function RailShell({ role }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const navigate = useNavigate();
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const isOfficer = role === "officer";
	const roleThemeStorageKey = `${themeStorageKeyPrefix}:${role}`;
	const defaultTheme = isOfficer ? "dark" : "light";
	const [theme, setTheme] = (0, import_react.useState)(defaultTheme);
	const [themeLoaded, setThemeLoaded] = (0, import_react.useState)(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = (0, import_react.useState)(false);
	const handleSearchSubmit = (e) => {
		e.preventDefault();
		if (!searchQuery.trim()) return;
		if (isOfficer) navigate({
			to: "/officer/knowledge",
			search: { q: searchQuery }
		});
		else navigate({
			to: "/employee/assistant",
			search: { q: searchQuery }
		});
	};
	(0, import_react.useEffect)(() => {
		const savedTheme = window.localStorage.getItem(roleThemeStorageKey);
		setTheme(savedTheme === "dark" || savedTheme === "light" ? savedTheme : defaultTheme);
		setThemeLoaded(true);
	}, [defaultTheme, roleThemeStorageKey]);
	(0, import_react.useEffect)(() => {
		if (!themeLoaded) return;
		window.localStorage.setItem(roleThemeStorageKey, theme);
		document.documentElement.classList.toggle("dark", theme === "dark");
		document.documentElement.classList.toggle("theme-dark", theme === "dark");
		document.documentElement.classList.toggle("theme-light", theme === "light");
		document.documentElement.dataset.theme = theme;
	}, [
		roleThemeStorageKey,
		theme,
		themeLoaded
	]);
	(0, import_react.useEffect)(() => {
		setIsMobileMenuOpen(false);
	}, [pathname]);
	const isDarkMode = theme === "dark";
	const items = isOfficer ? officerNav : employeeNav;
	const isActive = (to, exact) => exact ? pathname === to : pathname === to || pathname.startsWith(to + "/");
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: `${isDarkMode ? "dark theme-dark" : "theme-light"} min-h-screen flex flex-col w-full bg-background text-foreground`,
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("header", {
				className: "border-b border-border bg-card/90 backdrop-blur sticky top-0 z-30 shadow-soft print:hidden",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex h-16 items-center justify-between gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-3",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
									to: "/",
									className: "flex items-center gap-3 group shrink-0",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
										src: INDIAN_RAILWAYS_LOGO,
										alt: "Indian Railways",
										className: "h-10 w-10 shrink-0 object-contain group-hover:scale-105 transition-transform"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 110,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "leading-tight",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "font-semibold text-lg tracking-tight text-primary flex items-center gap-1.5",
											children: ["RailAssist", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "text-[10px] bg-primary-soft text-primary px-1.5 py-0.5 rounded border border-primary/20 uppercase font-bold tracking-wider",
												children: isOfficer ? "Admin" : "Employee"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 118,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 116,
											columnNumber: 19
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "text-[10px] text-muted-foreground font-medium uppercase tracking-wider hidden sm:block",
											children: "South Central Railway Headquarters"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 122,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 115,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 109,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 108,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
								onSubmit: handleSearchSubmit,
								className: "hidden md:flex items-center gap-2 max-w-xs w-full",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "relative w-full",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Search, { className: "h-4 w-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 135,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
										value: searchQuery,
										onChange: (e) => setSearchQuery(e.target.value),
										placeholder: isOfficer ? "Search rules, formulas, benefits..." : "Search rules, circulars...",
										className: "h-9 w-full pl-8 pr-3 rounded-md border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-ring/40 transition-shadow"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 136,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 134,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 130,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										type: "button",
										onClick: () => setTheme(isDarkMode ? "light" : "dark"),
										className: "h-9 w-9 md:w-auto md:px-3 rounded-md hover:bg-primary-soft/40 hover:text-primary flex items-center justify-center gap-2 text-muted-foreground border border-transparent hover:border-primary/10 transition-colors",
										"aria-label": `Switch to ${isDarkMode ? "light" : "dark"} mode`,
										title: `Switch to ${isDarkMode ? "light" : "dark"} mode`,
										children: [isDarkMode ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sun, { className: "h-4 w-4 text-amber-500" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 158,
											columnNumber: 19
										}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Moon, { className: "h-4 w-4" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 160,
											columnNumber: 19
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "hidden text-xs font-semibold md:inline",
											children: isDarkMode ? "Light" : "Dark"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 162,
											columnNumber: 17
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 150,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										className: "h-9 w-9 rounded-md hover:bg-primary-soft/40 hover:text-primary flex items-center justify-center text-muted-foreground border border-transparent hover:border-primary/10 transition-colors",
										"aria-label": "Notifications",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Bell, { className: "h-4 w-4" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 172,
											columnNumber: 17
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 168,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "hidden lg:flex h-9 pl-2 pr-3 items-center gap-2 rounded-md border border-input bg-background shadow-soft select-none",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "h-6 w-6 rounded-full bg-primary text-primary-foreground grid place-items-center ring-1 ring-primary/10",
											children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleUser, { className: "h-4 w-4" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 178,
												columnNumber: 19
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 177,
											columnNumber: 17
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "text-left text-[10px] leading-tight",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "font-bold text-foreground",
												children: isOfficer ? "Officer Portal" : "Employee Portal"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 181,
												columnNumber: 19
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "text-muted-foreground",
												children: isOfficer ? "SCR/HQ Admin" : "SCR/HQ Employee"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 184,
												columnNumber: 19
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 180,
											columnNumber: 17
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 176,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
										to: "/",
										className: "h-9 px-3 rounded-md border border-border hover:border-destructive/20 hover:bg-destructive/5 text-muted-foreground hover:text-destructive flex items-center gap-1.5 text-xs font-semibold transition-colors",
										title: "Switch Portal Role",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LogOut, { className: "h-3.5 w-3.5" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 196,
											columnNumber: 17
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "hidden sm:inline",
											children: "Switch Portal"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 197,
											columnNumber: 17
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 191,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										onClick: () => setIsMobileMenuOpen(!isMobileMenuOpen),
										className: "h-9 w-9 rounded-md hover:bg-primary-soft/40 hover:text-primary flex items-center justify-center text-muted-foreground border border-transparent hover:border-primary/10 md:hidden transition-colors",
										"aria-label": "Toggle navigation menu",
										children: isMobileMenuOpen ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(X, { className: "h-5 w-5" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 206,
											columnNumber: 37
										}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Menu, { className: "h-5 w-5" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 206,
											columnNumber: 65
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 201,
										columnNumber: 15
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 148,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 106,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 105,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "hidden md:block border-t border-border bg-card",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("nav", {
							className: "flex space-x-1 py-1.5 overflow-x-auto scrollbar-none",
							"aria-label": "Global Navigation",
							children: items.map((item) => {
								const active = isActive(item.to, item.exact);
								return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
									to: item.to,
									className: `flex items-center gap-2 px-3 py-2 text-xs font-bold rounded-md border border-transparent transition-all select-none whitespace-nowrap ${active ? "bg-primary-soft/60 text-primary border-primary/20 shadow-soft" : "text-muted-foreground hover:text-primary hover:bg-primary-soft/20"}`,
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(item.icon, { className: `h-4 w-4 shrink-0 ${active ? "text-primary" : "text-muted-foreground"}` }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 231,
										columnNumber: 21
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: item.title }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 234,
										columnNumber: 21
									}, this)]
								}, item.to, true, {
									fileName: _jsxFileName,
									lineNumber: 222,
									columnNumber: 19
								}, this);
							})
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 215,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 214,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 213,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 104,
				columnNumber: 7
			}, this),
			isMobileMenuOpen && /* @__PURE__ */ (void 0)("div", {
				className: "fixed inset-0 top-16 z-20 flex flex-col md:hidden bg-card/95 backdrop-blur border-b border-border shadow-elevated",
				children: [
					/* @__PURE__ */ (void 0)("form", {
						onSubmit: handleSearchSubmit,
						className: "p-4 border-b",
						children: /* @__PURE__ */ (void 0)("div", {
							className: "relative w-full",
							children: [/* @__PURE__ */ (void 0)(Search, { className: "h-4 w-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 249,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("input", {
								value: searchQuery,
								onChange: (e) => setSearchQuery(e.target.value),
								placeholder: isOfficer ? "Search rules, formulas..." : "Search rules, circulars...",
								className: "h-9 w-full pl-8 pr-3 rounded-md border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-primary/20"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 250,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 248,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 247,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)("nav", {
						className: "flex-1 overflow-y-auto p-4 space-y-1",
						"aria-label": "Mobile Navigation",
						children: items.map((item) => {
							const active = isActive(item.to, item.exact);
							return /* @__PURE__ */ (void 0)(Link, {
								to: item.to,
								className: `flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-lg border border-transparent transition-all ${active ? "bg-primary-soft/80 text-primary border-primary/20" : "text-muted-foreground hover:bg-primary-soft/10 hover:text-primary"}`,
								children: [/* @__PURE__ */ (void 0)(item.icon, { className: `h-5 w-5 shrink-0 ${active ? "text-primary" : "text-muted-foreground"}` }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 272,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)("span", { children: item.title }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 275,
									columnNumber: 19
								}, this)]
							}, item.to, true, {
								fileName: _jsxFileName,
								lineNumber: 263,
								columnNumber: 17
							}, this);
						})
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 259,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)("div", {
						className: "p-4 border-t flex items-center justify-between bg-muted/20",
						children: [/* @__PURE__ */ (void 0)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (void 0)(CircleUser, { className: "h-5 w-5 text-primary" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 282,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("span", {
								className: "text-xs font-bold text-foreground",
								children: isOfficer ? "Officer Admin" : "Employee Portal"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 283,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 281,
							columnNumber: 13
						}, this), /* @__PURE__ */ (void 0)(Link, {
							to: "/",
							className: "flex items-center gap-1 text-xs font-bold text-destructive hover:underline",
							children: [/* @__PURE__ */ (void 0)(LogOut, { className: "h-4 w-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 291,
								columnNumber: 15
							}, this), "Switch Portal"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 287,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 280,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 245,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", {
				className: "flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 print:p-0 print:m-0 print:max-w-none",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Outlet, {}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 300,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 299,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("footer", {
				className: "border-t bg-muted/10 print:hidden",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 text-xs text-muted-foreground flex flex-wrap items-center justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
							src: INDIAN_RAILWAYS_LOGO,
							alt: "IR",
							className: "h-5 w-5 object-contain"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 307,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
							"© ",
							(/* @__PURE__ */ new Date()).getFullYear(),
							" South Central Railway - RailAssist HQ"
						] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 308,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 306,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Official Portal for Settlement Advisory & Benefits Administration" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 310,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 305,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 304,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 100,
		columnNumber: 5
	}, this);
}
//#endregion
export { RailShell as t };
