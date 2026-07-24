import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, m as createFileRoute, p as lazyRouteComponent, s as Scripts, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { B as Eye, D as MousePointer, E as Pause, G as Contrast, M as Link$1, S as RotateCcw, T as Play, V as EyeOff, Z as CircleQuestionMark, d as TextAlignStart, f as Sun, p as Square, s as Type, t as X } from "../_libs/lucide-react.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { a as stringType, i as objectType, n as coerce, o as ZodIssueCode, r as enumType, t as arrayType } from "../_libs/zod.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-3hGe0D8N.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var styles_default = "/assets/styles-T4W7qDoU.css";
function reportAppError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__appEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
var _jsxFileName$1 = "C:/Users/Abhishek/Downloads/RailwayBenifits/rail-benefits-navigator/src/components/rail/AccessibilityWidget.tsx";
/** Universal Accessibility stick-person icon (ISO 7001) */
function UniversalAccessibilityIcon({ className }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		className,
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("circle", {
				cx: "12",
				cy: "4",
				r: "2"
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 35,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { d: "M7 8h10" }, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 37,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { d: "M12 8v6" }, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 39,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { d: "M12 14l-4 6" }, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 41,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { d: "M12 14l4 6" }, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 42,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 23,
		columnNumber: 5
	}, this);
}
var defaultPrefs = {
	textSize: 100,
	textSpacing: "normal",
	lineHeight: "normal",
	highContrast: false,
	lowSaturation: 100,
	invertColors: false,
	highlightLinks: false,
	cursorSize: "normal",
	pauseAnimations: false,
	dyslexiaFriendly: false,
	adhdMode: false,
	hideImages: false,
	adhdBandHeight: "medium",
	adhdHighlightParagraph: false,
	adhdReadingLine: false
};
var ACC_PREFS_KEY = "railassist:accessibility-preferences";
function AccessibilityWidget() {
	const [isOpen, setIsOpen] = (0, import_react.useState)(false);
	const [prefs, setPrefs] = (0, import_react.useState)(defaultPrefs);
	const [isPlaying, setIsPlaying] = (0, import_react.useState)(false);
	const [isPaused, setIsPaused] = (0, import_react.useState)(false);
	const [utterance, setUtterance] = (0, import_react.useState)(null);
	const [mouseY, setMouseY] = (0, import_react.useState)(0);
	const panelRef = (0, import_react.useRef)(null);
	const buttonRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		try {
			const stored = localStorage.getItem(ACC_PREFS_KEY);
			if (stored) setPrefs(JSON.parse(stored));
		} catch (e) {
			console.error("Failed to load accessibility preferences:", e);
		}
	}, []);
	const savePrefs = (newPrefs) => {
		setPrefs(newPrefs);
		try {
			localStorage.setItem(ACC_PREFS_KEY, JSON.stringify(newPrefs));
		} catch (e) {
			console.error("Failed to save accessibility preferences:", e);
		}
	};
	(0, import_react.useEffect)(() => {
		const handleKeyDown = (e) => {
			if (e.ctrlKey && e.key === "F2") {
				e.preventDefault();
				setIsOpen((prev) => !prev);
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, []);
	(0, import_react.useEffect)(() => {
		const handleOutsideClick = (e) => {
			if (isOpen && panelRef.current && !panelRef.current.contains(e.target) && buttonRef.current && !buttonRef.current.contains(e.target)) setIsOpen(false);
		};
		document.addEventListener("mousedown", handleOutsideClick);
		return () => document.removeEventListener("mousedown", handleOutsideClick);
	}, [isOpen]);
	(0, import_react.useEffect)(() => {
		if (!prefs.adhdMode) return;
		const handleMouseMove = (e) => {
			setMouseY(e.clientY);
		};
		window.addEventListener("mousemove", handleMouseMove);
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, [prefs.adhdMode]);
	(0, import_react.useEffect)(() => {
		const root = document.documentElement;
		root.style.fontSize = `${prefs.textSize}%`;
		root.classList.toggle("accessibility-spacing-medium", prefs.textSpacing === "medium");
		root.classList.toggle("accessibility-spacing-large", prefs.textSpacing === "large");
		root.classList.toggle("accessibility-line-height-medium", prefs.lineHeight === "medium");
		root.classList.toggle("accessibility-line-height-large", prefs.lineHeight === "large");
		root.classList.toggle("accessibility-high-contrast", prefs.highContrast);
		root.classList.toggle("accessibility-invert", prefs.invertColors);
		const filters = [];
		if (prefs.lowSaturation !== 100) filters.push(`saturate(${prefs.lowSaturation}%)`);
		if (prefs.invertColors) filters.push("invert(1) hue-rotate(180deg)");
		root.style.filter = filters.length > 0 ? filters.join(" ") : "";
		root.classList.toggle("accessibility-highlight-links", prefs.highlightLinks);
		root.classList.toggle("accessibility-cursor-medium", prefs.cursorSize === "medium");
		root.classList.toggle("accessibility-cursor-large", prefs.cursorSize === "large");
		root.classList.toggle("accessibility-cursor-xl", prefs.cursorSize === "xl");
		root.classList.toggle("accessibility-pause-animations", prefs.pauseAnimations);
		root.classList.toggle("accessibility-dyslexia", prefs.dyslexiaFriendly);
		root.classList.toggle("accessibility-hide-images", prefs.hideImages);
		root.classList.toggle("accessibility-adhd-active", prefs.adhdMode);
		root.classList.toggle("accessibility-adhd-highlight-p", prefs.adhdMode && prefs.adhdHighlightParagraph);
	}, [prefs]);
	const getSpeakText = () => {
		const selection = window.getSelection()?.toString().trim();
		if (selection) return selection;
		const tempEl = (document.querySelector("main") || document.body).cloneNode(true);
		tempEl.querySelectorAll("script, style, button, nav, footer, header, .accessibility-widget-panel").forEach((el) => el.remove());
		return tempEl.textContent?.trim() || "";
	};
	const playSpeech = () => {
		if (typeof window === "undefined" || !window.speechSynthesis) return;
		if (isPaused) {
			window.speechSynthesis.resume();
			setIsPaused(false);
			setIsPlaying(true);
			return;
		}
		window.speechSynthesis.cancel();
		const text = getSpeakText();
		if (!text) return;
		const ut = new SpeechSynthesisUtterance(text);
		ut.onend = () => {
			setIsPlaying(false);
			setIsPaused(false);
		};
		ut.onerror = () => {
			setIsPlaying(false);
			setIsPaused(false);
		};
		setUtterance(ut);
		window.speechSynthesis.speak(ut);
		setIsPlaying(true);
		setIsPaused(false);
	};
	const pauseSpeech = () => {
		if (typeof window === "undefined" || !window.speechSynthesis) return;
		if (isPlaying && !isPaused) {
			window.speechSynthesis.pause();
			setIsPaused(true);
			setIsPlaying(false);
		}
	};
	const stopSpeech = () => {
		if (typeof window === "undefined" || !window.speechSynthesis) return;
		window.speechSynthesis.cancel();
		setIsPlaying(false);
		setIsPaused(false);
	};
	(0, import_react.useEffect)(() => {
		return () => {
			if (typeof window !== "undefined" && window.speechSynthesis) window.speechSynthesis.cancel();
		};
	}, []);
	const resetAll = () => {
		savePrefs(defaultPrefs);
		stopSpeech();
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
			ref: buttonRef,
			onClick: () => setIsOpen((prev) => !prev),
			className: "fixed bottom-6 right-6 z-40 flex h-16 w-16 flex-col items-center justify-center rounded-full bg-primary text-primary-foreground shadow-elevated transition-transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-primary/40 print:hidden",
			title: "Open Accessibility Menu (Ctrl + F2)",
			"aria-label": "Open Accessibility Menu",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(UniversalAccessibilityIcon, { className: "h-6 w-6" }, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 300,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
				className: "mt-1 text-[8px] font-bold tracking-wider uppercase",
				children: "Ctrl+F2"
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 301,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 293,
			columnNumber: 7
		}, this),
		isOpen && /* @__PURE__ */ (void 0)("div", {
			ref: panelRef,
			className: "fixed right-0 top-0 bottom-0 z-50 max-w-md w-full bg-card shadow-elevated flex flex-col h-full border-l border-border transition-transform duration-300 print:hidden",
			role: "dialog",
			"aria-modal": "true",
			"aria-labelledby": "accessibility-panel-title",
			children: [
				/* @__PURE__ */ (void 0)("div", {
					className: "p-4 bg-primary text-primary-foreground flex items-center justify-between shadow-soft",
					children: [/* @__PURE__ */ (void 0)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (void 0)(UniversalAccessibilityIcon, { className: "h-5 w-5" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 316,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("h2", {
							id: "accessibility-panel-title",
							className: "text-md font-semibold",
							children: "Accessibility options"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 317,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 315,
						columnNumber: 13
					}, this), /* @__PURE__ */ (void 0)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (void 0)("span", {
							className: "text-[10px] bg-primary-soft/20 text-primary-foreground px-2 py-0.5 rounded-md font-mono border border-primary-soft/10",
							children: "Ctrl+F2"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 322,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("button", {
							onClick: () => setIsOpen(false),
							className: "rounded-md p-1 text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10",
							"aria-label": "Close panel",
							children: /* @__PURE__ */ (void 0)(X, { className: "h-5 w-5" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 330,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 325,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 321,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 314,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (void 0)("div", {
					className: "flex-1 overflow-y-auto p-5 space-y-6",
					children: [
						/* @__PURE__ */ (void 0)("div", {
							className: "space-y-3 bg-muted/30 p-4 rounded-xl border",
							children: [/* @__PURE__ */ (void 0)("div", {
								className: "flex justify-between items-center",
								children: [/* @__PURE__ */ (void 0)("div", {
									className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5",
									children: [/* @__PURE__ */ (void 0)(Type, { className: "h-4 w-4 text-primary" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 341,
										columnNumber: 19
									}, this), "Text Size"]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 340,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("span", {
									className: "text-xs font-bold text-primary",
									children: [prefs.textSize, "%"]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 344,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 339,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "flex gap-2",
								children: [
									100,
									110,
									120,
									130,
									140,
									150
								].map((size) => /* @__PURE__ */ (void 0)("button", {
									onClick: () => savePrefs({
										...prefs,
										textSize: size
									}),
									className: `flex-1 text-xs py-2 font-bold rounded-lg border transition-all ${prefs.textSize === size ? "bg-primary border-primary text-primary-foreground" : "bg-background border-border text-foreground hover:bg-primary-soft/10"}`,
									children: [size, "%"]
								}, size, true, {
									fileName: _jsxFileName$1,
									lineNumber: 348,
									columnNumber: 19
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 346,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 338,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "grid grid-cols-2 gap-4",
							children: [/* @__PURE__ */ (void 0)("div", {
								className: "space-y-3 bg-muted/30 p-4 rounded-xl border",
								children: [/* @__PURE__ */ (void 0)("div", {
									className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5",
									children: [/* @__PURE__ */ (void 0)(TextAlignStart, { className: "h-4 w-4 text-primary" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 367,
										columnNumber: 19
									}, this), "Text Spacing"]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 366,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("div", {
									className: "flex flex-col gap-2",
									children: [
										"normal",
										"medium",
										"large"
									].map((space) => /* @__PURE__ */ (void 0)("button", {
										onClick: () => savePrefs({
											...prefs,
											textSpacing: space
										}),
										className: `text-xs py-1.5 font-bold rounded-lg border capitalize transition-all ${prefs.textSpacing === space ? "bg-primary border-primary text-primary-foreground" : "bg-background border-border text-foreground hover:bg-primary-soft/10"}`,
										children: space
									}, space, false, {
										fileName: _jsxFileName$1,
										lineNumber: 372,
										columnNumber: 21
									}, this))
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 370,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 365,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "space-y-3 bg-muted/30 p-4 rounded-xl border",
								children: [/* @__PURE__ */ (void 0)("div", {
									className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5",
									children: [/* @__PURE__ */ (void 0)(TextAlignStart, { className: "h-4 w-4 text-primary" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 389,
										columnNumber: 19
									}, this), "Line Height"]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 388,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("div", {
									className: "flex flex-col gap-2",
									children: [
										"normal",
										"medium",
										"large"
									].map((lh) => /* @__PURE__ */ (void 0)("button", {
										onClick: () => savePrefs({
											...prefs,
											lineHeight: lh
										}),
										className: `text-xs py-1.5 font-bold rounded-lg border capitalize transition-all ${prefs.lineHeight === lh ? "bg-primary border-primary text-primary-foreground" : "bg-background border-border text-foreground hover:bg-primary-soft/10"}`,
										children: lh
									}, lh, false, {
										fileName: _jsxFileName$1,
										lineNumber: 394,
										columnNumber: 21
									}, this))
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 392,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 387,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 364,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "space-y-3 bg-muted/30 p-4 rounded-xl border",
							children: [/* @__PURE__ */ (void 0)("div", {
								className: "flex justify-between items-center",
								children: [/* @__PURE__ */ (void 0)("div", {
									className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5",
									children: [/* @__PURE__ */ (void 0)(Sun, { className: "h-4 w-4 text-primary" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 414,
										columnNumber: 19
									}, this), "Color Saturation"]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 413,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("span", {
									className: "text-xs font-bold text-primary",
									children: prefs.lowSaturation === 0 ? "Grayscale" : prefs.lowSaturation === 50 ? "Low" : "Normal"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 417,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 412,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "flex gap-2",
								children: [
									0,
									50,
									100
								].map((val) => /* @__PURE__ */ (void 0)("button", {
									onClick: () => savePrefs({
										...prefs,
										lowSaturation: val
									}),
									className: `flex-1 text-xs py-2 font-bold rounded-lg border transition-all ${prefs.lowSaturation === val ? "bg-primary border-primary text-primary-foreground" : "bg-background border-border text-foreground hover:bg-primary-soft/10"}`,
									children: val === 0 ? "Grayscale" : val === 50 ? "Low" : "Normal"
								}, val, false, {
									fileName: _jsxFileName$1,
									lineNumber: 427,
									columnNumber: 19
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 425,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 411,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "space-y-3 bg-muted/30 p-4 rounded-xl border",
							children: [/* @__PURE__ */ (void 0)("div", {
								className: "flex justify-between items-center",
								children: [/* @__PURE__ */ (void 0)("div", {
									className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5",
									children: [/* @__PURE__ */ (void 0)(MousePointer, { className: "h-4 w-4 text-primary" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 446,
										columnNumber: 19
									}, this), "Cursor Size"]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 445,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("span", {
									className: "text-xs font-bold text-primary uppercase",
									children: prefs.cursorSize
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 449,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 444,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "flex gap-2",
								children: [
									"normal",
									"medium",
									"large",
									"xl"
								].map((cursor) => /* @__PURE__ */ (void 0)("button", {
									onClick: () => savePrefs({
										...prefs,
										cursorSize: cursor
									}),
									className: `flex-1 text-xs py-2 font-bold rounded-lg border transition-all uppercase ${prefs.cursorSize === cursor ? "bg-primary border-primary text-primary-foreground" : "bg-background border-border text-foreground hover:bg-primary-soft/10"}`,
									children: cursor
								}, cursor, false, {
									fileName: _jsxFileName$1,
									lineNumber: 453,
									columnNumber: 19
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 451,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 443,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [
								/* @__PURE__ */ (void 0)(ToggleButton, {
									label: "High Contrast",
									description: "High contrast colors",
									isActive: prefs.highContrast,
									onClick: () => savePrefs({
										...prefs,
										highContrast: !prefs.highContrast
									}),
									icon: /* @__PURE__ */ (void 0)(Contrast, { className: "h-4 w-4" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 475,
										columnNumber: 23
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 470,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)(ToggleButton, {
									label: "Invert Colors",
									description: "Invert color palette",
									isActive: prefs.invertColors,
									onClick: () => savePrefs({
										...prefs,
										invertColors: !prefs.invertColors
									}),
									icon: /* @__PURE__ */ (void 0)(Contrast, { className: "h-4 w-4 rotate-180" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 483,
										columnNumber: 23
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 478,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)(ToggleButton, {
									label: "Highlight Links",
									description: "Highlight page links",
									isActive: prefs.highlightLinks,
									onClick: () => savePrefs({
										...prefs,
										highlightLinks: !prefs.highlightLinks
									}),
									icon: /* @__PURE__ */ (void 0)(Link$1, { className: "h-4 w-4" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 491,
										columnNumber: 23
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 486,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)(ToggleButton, {
									label: "Dyslexia Friendly",
									description: "Dyslexia accessible font",
									isActive: prefs.dyslexiaFriendly,
									onClick: () => savePrefs({
										...prefs,
										dyslexiaFriendly: !prefs.dyslexiaFriendly
									}),
									icon: /* @__PURE__ */ (void 0)(CircleQuestionMark, { className: "h-4 w-4" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 499,
										columnNumber: 23
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 494,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)(ToggleButton, {
									label: "ADHD Mode",
									description: "Reading focus guide",
									isActive: prefs.adhdMode,
									onClick: () => savePrefs({
										...prefs,
										adhdMode: !prefs.adhdMode
									}),
									icon: /* @__PURE__ */ (void 0)(Eye, { className: "h-4 w-4" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 507,
										columnNumber: 23
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 502,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)(ToggleButton, {
									label: "Hide Images",
									description: "Mask non-essential images",
									isActive: prefs.hideImages,
									onClick: () => savePrefs({
										...prefs,
										hideImages: !prefs.hideImages
									}),
									icon: /* @__PURE__ */ (void 0)(EyeOff, { className: "h-4 w-4" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 515,
										columnNumber: 23
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 510,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)(ToggleButton, {
									label: "Pause Animations",
									description: "Suppress app transitions",
									isActive: prefs.pauseAnimations,
									onClick: () => savePrefs({
										...prefs,
										pauseAnimations: !prefs.pauseAnimations
									}),
									icon: /* @__PURE__ */ (void 0)(Square, { className: "h-4 w-4" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 523,
										columnNumber: 23
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 518,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 469,
							columnNumber: 13
						}, this),
						prefs.adhdMode && /* @__PURE__ */ (void 0)("div", {
							className: "mt-4 p-4 bg-muted/40 rounded-xl border border-primary/20 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200",
							children: [
								/* @__PURE__ */ (void 0)("div", {
									className: "text-xs font-semibold uppercase tracking-wider text-primary flex items-center gap-1.5 border-b pb-1.5",
									children: [/* @__PURE__ */ (void 0)(Eye, { className: "h-4 w-4" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 531,
										columnNumber: 19
									}, this), "ADHD Focus Mode Settings"]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 530,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (void 0)("div", {
										className: "text-[11px] font-bold text-muted-foreground uppercase",
										children: "Reading Band Height"
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 537,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)("div", {
										className: "flex gap-2",
										children: [
											"small",
											"medium",
											"large"
										].map((size) => /* @__PURE__ */ (void 0)("button", {
											onClick: () => savePrefs({
												...prefs,
												adhdBandHeight: size
											}),
											className: `flex-1 text-xs py-2 font-bold rounded-lg border capitalize transition-all ${prefs.adhdBandHeight === size ? "bg-primary border-primary text-primary-foreground" : "bg-background border-border text-foreground hover:bg-primary-soft/10"}`,
											children: size === "small" ? "Small (80px)" : size === "large" ? "Large (220px)" : "Medium (150px)"
										}, size, false, {
											fileName: _jsxFileName$1,
											lineNumber: 542,
											columnNumber: 23
										}, this))
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 540,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 536,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "grid grid-cols-2 gap-3",
									children: [/* @__PURE__ */ (void 0)("button", {
										onClick: () => savePrefs({
											...prefs,
											adhdHighlightParagraph: !prefs.adhdHighlightParagraph
										}),
										className: `text-xs py-2 px-3 font-bold rounded-lg border text-center transition-all ${prefs.adhdHighlightParagraph ? "bg-primary border-primary text-primary-foreground shadow-soft" : "bg-background border-border text-muted-foreground hover:bg-primary-soft/10"}`,
										children: "Highlight Paragraph"
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 563,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)("button", {
										onClick: () => savePrefs({
											...prefs,
											adhdReadingLine: !prefs.adhdReadingLine
										}),
										className: `text-xs py-2 px-3 font-bold rounded-lg border text-center transition-all ${prefs.adhdReadingLine ? "bg-primary border-primary text-primary-foreground shadow-soft" : "bg-background border-border text-muted-foreground hover:bg-primary-soft/10"}`,
										children: "Reading Guide Line"
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 576,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 562,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (void 0)("button", {
									onClick: () => savePrefs({
										...prefs,
										adhdBandHeight: "medium",
										adhdHighlightParagraph: false,
										adhdReadingLine: false
									}),
									className: "w-full text-center text-xs font-bold text-destructive hover:underline pt-1 flex items-center justify-center gap-1 bg-transparent border-0 cursor-pointer",
									children: [/* @__PURE__ */ (void 0)(RotateCcw, { className: "h-3 w-3" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 600,
										columnNumber: 19
									}, this), "Reset ADHD Settings"]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 589,
									columnNumber: 17
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 529,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "space-y-3 bg-muted/30 p-4 rounded-xl border",
							children: [
								/* @__PURE__ */ (void 0)("div", {
									className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
									children: "Text To Speech"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 608,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "flex gap-2",
									children: [
										/* @__PURE__ */ (void 0)("button", {
											onClick: playSpeech,
											className: "flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-bold bg-green-600 text-white rounded-lg hover:bg-green-700 active:scale-95 transition-all",
											children: [/* @__PURE__ */ (void 0)(Play, { className: "h-3.5 w-3.5" }, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 616,
												columnNumber: 19
											}, this), "Play"]
										}, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 612,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (void 0)("button", {
											onClick: pauseSpeech,
											disabled: !isPlaying,
											className: "flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-bold bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:opacity-50 disabled:pointer-events-none active:scale-95 transition-all",
											children: [/* @__PURE__ */ (void 0)(Pause, { className: "h-3.5 w-3.5" }, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 624,
												columnNumber: 19
											}, this), "Pause"]
										}, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 619,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (void 0)("button", {
											onClick: stopSpeech,
											disabled: !isPlaying && !isPaused,
											className: "flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-bold bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 disabled:opacity-50 disabled:pointer-events-none active:scale-95 transition-all",
											children: [/* @__PURE__ */ (void 0)(Square, { className: "h-3.5 w-3.5" }, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 632,
												columnNumber: 19
											}, this), "Stop"]
										}, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 627,
											columnNumber: 17
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 611,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("p", {
									className: "text-[10px] text-muted-foreground text-center",
									children: "Reads highlighted selection or parses document content aloud using SpeechSynthesis."
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 636,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 607,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 336,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (void 0)("div", {
					className: "p-4 border-t border-border flex items-center justify-between bg-muted/20",
					children: [/* @__PURE__ */ (void 0)("button", {
						onClick: resetAll,
						className: "flex items-center gap-2 border border-border bg-background text-foreground text-xs font-semibold px-3 py-2 rounded-lg hover:bg-primary-soft/10 hover:border-primary transition-colors active:scale-95",
						children: [/* @__PURE__ */ (void 0)(RotateCcw, { className: "h-4 w-4" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 648,
							columnNumber: 15
						}, this), "Reset Accessibility Settings"]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 644,
						columnNumber: 13
					}, this), /* @__PURE__ */ (void 0)("span", {
						className: "text-[10px] font-semibold text-muted-foreground",
						children: "RailAssist HQ"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 651,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 643,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 306,
			columnNumber: 9
		}, this),
		prefs.adhdMode && /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (void 0)("div", {
			className: "pointer-events-none fixed inset-0 z-[9998] overflow-hidden print:hidden",
			children: [
				/* @__PURE__ */ (void 0)("div", {
					className: "absolute inset-x-0 top-0 bg-black/35 transition-all duration-75",
					style: { height: `${mouseY - (prefs.adhdBandHeight === "small" ? 40 : prefs.adhdBandHeight === "large" ? 110 : 75)}px` }
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 661,
					columnNumber: 13
				}, this),
				/* @__PURE__ */ (void 0)("div", {
					className: "absolute inset-x-0 border-y border-yellow-400/40 bg-transparent transition-all duration-75",
					style: {
						top: `${mouseY - (prefs.adhdBandHeight === "small" ? 40 : prefs.adhdBandHeight === "large" ? 110 : 75)}px`,
						height: `${prefs.adhdBandHeight === "small" ? 80 : prefs.adhdBandHeight === "large" ? 220 : 150}px`
					}
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 668,
					columnNumber: 13
				}, this),
				/* @__PURE__ */ (void 0)("div", {
					className: "absolute inset-x-0 bottom-0 bg-black/35 transition-all duration-75",
					style: { top: `${mouseY + (prefs.adhdBandHeight === "small" ? 40 : prefs.adhdBandHeight === "large" ? 110 : 75)}px` }
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 676,
					columnNumber: 13
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 659,
			columnNumber: 11
		}, this), prefs.adhdReadingLine && /* @__PURE__ */ (void 0)("div", {
			className: "pointer-events-none fixed left-0 right-0 z-[9999] border-t-2 border-yellow-400/80 shadow-[0_0_6px_rgba(250,204,21,0.5)] transition-all duration-75 print:hidden",
			style: { top: `${mouseY}px` }
		}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 686,
			columnNumber: 13
		}, this)] }, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 658,
			columnNumber: 9
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 291,
		columnNumber: 5
	}, this);
}
function ToggleButton({ label, description, isActive, onClick, icon }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
		onClick,
		className: `flex flex-col items-center justify-center p-3 text-center rounded-xl border transition-all active:scale-95 ${isActive ? "bg-primary/10 border-primary text-primary shadow-soft" : "bg-background border-border text-foreground hover:bg-primary-soft/10 hover:border-primary/30"}`,
		"aria-pressed": isActive,
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: `p-1.5 rounded-lg mb-1.5 ${isActive ? "bg-primary text-primary-foreground" : "bg-muted/40"}`,
				children: icon
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 720,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
				className: "text-xs font-bold",
				children: label
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 725,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
				className: "text-[9px] text-muted-foreground mt-0.5 leading-tight",
				children: description
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 726,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 711,
		columnNumber: 5
	}, this);
}
var _jsxFileName = "C:/Users/Abhishek/Downloads/RailwayBenifits/rail-benefits-navigator/src/routes/__root.tsx";
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 20,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 21,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 22,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 26,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 25,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 19,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 18,
		columnNumber: 5
	}, this);
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportAppError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 48,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 51,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 55,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 64,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 54,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 47,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 46,
		columnNumber: 5
	}, this);
}
var Route$19 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ name: "darkreader-lock" },
			{ title: "RailAssist — Retirement & Benefits Advisory" },
			{
				name: "description",
				content: "Intelligent Railway Retirement & Benefits Advisory System for South Central Railway employees and officers."
			},
			{
				property: "og:title",
				content: "RailAssist — Retirement & Benefits Advisory"
			},
			{
				property: "og:description",
				content: "Rule-based decision support for railway retirement, family pension, gratuity and more."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: ""
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.svg",
				type: "image/svg+xml"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("head", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(HeadContent, {}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 128,
			columnNumber: 9
		}, this) }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 127,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Scripts, {}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 132,
			columnNumber: 9
		}, this)] }, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 130,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 126,
		columnNumber: 5
	}, this);
}
function RootComponent() {
	const { queryClient } = Route$19.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(QueryClientProvider, {
		client: queryClient,
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Outlet, {}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 144,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AccessibilityWidget, {}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 145,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 142,
		columnNumber: 5
	}, this);
}
var $$splitComponentImporter$17 = () => import("./officer-DBTQ0lW7.mjs");
var Route$18 = createFileRoute("/officer")({ component: lazyRouteComponent($$splitComponentImporter$17, "component") });
var $$splitComponentImporter$16 = () => import("./employee-DBY-lZTk.mjs");
var Route$17 = createFileRoute("/employee")({ component: lazyRouteComponent($$splitComponentImporter$16, "component") });
var $$splitComponentImporter$15 = () => import("./routes-BlC7Tc6w.mjs");
var Route$16 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$15, "component") });
var $$splitComponentImporter$14 = () => import("./officer.index-CXHoAO2M.mjs");
var Route$15 = createFileRoute("/officer/")({ component: lazyRouteComponent($$splitComponentImporter$14, "component") });
var $$splitComponentImporter$13 = () => import("./employee.index-9MtdRNqG.mjs");
var Route$14 = createFileRoute("/employee/")({ component: lazyRouteComponent($$splitComponentImporter$13, "component") });
var $$splitComponentImporter$12 = () => import("./officer.rules-nF8OLBw0.mjs");
var Route$13 = createFileRoute("/officer/rules")({ component: lazyRouteComponent($$splitComponentImporter$12, "component") });
var $$splitComponentImporter$11 = () => import("./officer.knowledge-CtB5W_iM.mjs");
var Route$12 = createFileRoute("/officer/knowledge")({ component: lazyRouteComponent($$splitComponentImporter$11, "component") });
var $$splitComponentImporter$10 = () => import("./officer.formulas-8a34t8Ei.mjs");
var Route$11 = createFileRoute("/officer/formulas")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./officer.documents-Brp1ntNL.mjs");
var Route$10 = createFileRoute("/officer/documents")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./officer.configuration-jYtwX8VM.mjs");
var Route$9 = createFileRoute("/officer/configuration")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./officer.benefits-4NDNXxRC.mjs");
var Route$8 = createFileRoute("/officer/benefits")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./employee.schemes-Bytu17u7.mjs");
var Route$7 = createFileRoute("/employee/schemes")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./employee.result-Dcx6m5My.mjs");
var Route$6 = createFileRoute("/employee/result")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./employee.reports-Bystpy-B.mjs");
var Route$5 = createFileRoute("/employee/reports")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./employee.faqs-CzzaskRS.mjs");
var Route$4 = createFileRoute("/employee/faqs")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./employee.circulars-CPHvE7v7.mjs");
var Route$3 = createFileRoute("/employee/circulars")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./employee.benefits-Ce8GVSaX.mjs");
var Route$2 = createFileRoute("/employee/benefits")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var employeeGroups = [
	"A",
	"B",
	"C",
	"D"
];
var pensionSchemes = [
	"OPS",
	"UPS",
	"NPS"
];
var retirementCategories = ["normal", "other"];
var moneyField = coerce.number({ invalid_type_error: "Enter a valid amount" });
var dayField = coerce.number({ invalid_type_error: "Enter a valid day count" });
objectType({
	employeeName: stringType().min(1, "Employee name is required"),
	employeeId: stringType().optional(),
	dateOfBirth: stringType().min(1, "Date of birth is required"),
	dateOfAppointment: stringType().min(1, "Date of appointment is required"),
	dateOfExit: stringType().min(1, "Exit date is required"),
	employeeGroup: enumType(employeeGroups),
	payMatrixLevel: stringType().min(1, "Pay Matrix Level is required"),
	designation: stringType().optional(),
	department: stringType().optional(),
	pensionScheme: enumType(pensionSchemes),
	employeeCategory: enumType(["Running", "Non Running"]),
	retirementCategory: enumType(retirementCategories),
	otherRetirementType: enumType([
		"voluntary",
		"medical",
		"compulsory",
		"death",
		"removal",
		"dismissal",
		"self-resignation"
	]).optional(),
	currentBasicPay: moneyField.gt(0, "Basic Pay must be greater than 0"),
	dearnessAllowance: moneyField.min(0, "DA cannot be negative"),
	lapDays: dayField.min(0, "LAP days cannot be negative"),
	lhapDays: dayField.min(0, "LHAP days cannot be negative"),
	providentFund: moneyField.min(0, "PF cannot be negative"),
	cgis: moneyField.min(0, "CGIS cannot be negative"),
	promotedInLastTenMonths: enumType(["yes", "no"]),
	monthlyBasicPay: arrayType(moneyField.min(0, "Monthly Basic Pay cannot be negative")).length(10),
	fixedMedicalAllowance: enumType(["yes", "no"]),
	commutationOpted: enumType(["yes", "no"]),
	commutationPercentage: coerce.number().min(0).max(40),
	medicalRetirementApproved: enumType(["yes", "no"]),
	notionalServiceYears: coerce.number().min(0),
	notionalServiceMonths: coerce.number().min(0).max(11),
	pensionSanctionPercentage: coerce.number().min(0).max(100),
	dateOfDeath: stringType().optional(),
	spouseAvailable: enumType(["yes", "no"]),
	familyPensionEligible: enumType(["yes", "no"]),
	compassionateAllowanceSanctioned: enumType(["yes", "no"]),
	technicalResignation: enumType(["yes", "no"])
}).superRefine((data, ctx) => {
	const today = /* @__PURE__ */ new Date();
	const dob = new Date(data.dateOfBirth);
	const appointmentDate = new Date(data.dateOfAppointment);
	const exitDate = new Date(data.dateOfExit);
	if (Number.isNaN(dob.getTime())) ctx.addIssue({
		code: ZodIssueCode.custom,
		path: ["dateOfBirth"],
		message: "Enter a valid date of birth"
	});
	else if (dob > today) ctx.addIssue({
		code: ZodIssueCode.custom,
		path: ["dateOfBirth"],
		message: "Date of birth cannot be in the future"
	});
	if (data.retirementCategory === "other" && !data.otherRetirementType) ctx.addIssue({
		code: ZodIssueCode.custom,
		path: ["otherRetirementType"],
		message: "Select the retirement type"
	});
	if (Number.isNaN(exitDate.getTime())) ctx.addIssue({
		code: ZodIssueCode.custom,
		path: ["dateOfExit"],
		message: "Enter a valid exit date"
	});
	else {
		if (!Number.isNaN(dob.getTime()) && dob >= exitDate) ctx.addIssue({
			code: ZodIssueCode.custom,
			path: ["dateOfExit"],
			message: "Exit date must be after Date of Birth"
		});
		if (Number.isNaN(appointmentDate.getTime())) ctx.addIssue({
			code: ZodIssueCode.custom,
			path: ["dateOfAppointment"],
			message: "Enter a valid appointment date"
		});
		else if (appointmentDate >= exitDate) ctx.addIssue({
			code: ZodIssueCode.custom,
			path: ["dateOfAppointment"],
			message: "Appointment date must be before exit date"
		});
	}
	if (data.promotedInLastTenMonths === "yes") data.monthlyBasicPay.forEach((value, index) => {
		if (value <= 0) ctx.addIssue({
			code: ZodIssueCode.custom,
			path: ["monthlyBasicPay", index],
			message: "Required"
		});
	});
});
var $$splitComponentImporter = () => import("./employee.assistant-BXDDUrpB.mjs");
var Route$1 = createFileRoute("/employee/assistant")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var Route = createFileRoute("/api/assistant")({ server: { handlers: { POST: async ({ request }) => {
	try {
		const { messages } = await request.json();
		const apiKey = process.env.GROQ_API_KEY;
		if (!apiKey) return new Response(JSON.stringify({ error: "GROQ_API_KEY is not set in the server environment." }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		const primaryModel = process.env.GROQ_PRIMARY_MODEL || "llama-3.3-70b-versatile";
		const fallbackModel = process.env.GROQ_FALLBACK_MODEL || "qwen-2.5-coder-32b";
		const fullMessages = [{
			role: "system",
			content: "You are the RailAssist AI Knowledge Assistant for South Central Railway. Answer employee queries regarding retirement benefits, pension calculations, circulars, gratuity rules, and family pension options. Answer professionally and cite official rules where possible (e.g. Railway Pension Rules 2026). Keep formatting clean and readable using lists or bullet points."
		}, ...messages];
		try {
			const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${apiKey}`
				},
				body: JSON.stringify({
					model: primaryModel,
					messages: fullMessages,
					temperature: .7,
					max_tokens: 1024
				})
			});
			if (response.ok) {
				const data = await response.json();
				return new Response(JSON.stringify(data), {
					status: 200,
					headers: { "Content-Type": "application/json" }
				});
			}
			console.warn(`Primary model ${primaryModel} failed with status ${response.status}. Trying fallback...`);
		} catch (err) {
			console.error("Primary model call error:", err);
		}
		const fallbackResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${apiKey}`
			},
			body: JSON.stringify({
				model: fallbackModel,
				messages: fullMessages,
				temperature: .7,
				max_tokens: 1024
			})
		});
		if (fallbackResponse.ok) {
			const data = await fallbackResponse.json();
			return new Response(JSON.stringify(data), {
				status: 200,
				headers: { "Content-Type": "application/json" }
			});
		}
		const errText = await fallbackResponse.text();
		return new Response(JSON.stringify({ error: `Groq API returned an error: ${errText}` }), {
			status: fallbackResponse.status,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message || "Server Error" }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
} } } });
var OfficerRoute = Route$18.update({
	id: "/officer",
	path: "/officer",
	getParentRoute: () => Route$19
});
var EmployeeRoute = Route$17.update({
	id: "/employee",
	path: "/employee",
	getParentRoute: () => Route$19
});
var IndexRoute = Route$16.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$19
});
var OfficerIndexRoute = Route$15.update({
	id: "/",
	path: "/",
	getParentRoute: () => OfficerRoute
});
var EmployeeIndexRoute = Route$14.update({
	id: "/",
	path: "/",
	getParentRoute: () => EmployeeRoute
});
var OfficerRulesRoute = Route$13.update({
	id: "/rules",
	path: "/rules",
	getParentRoute: () => OfficerRoute
});
var OfficerKnowledgeRoute = Route$12.update({
	id: "/knowledge",
	path: "/knowledge",
	getParentRoute: () => OfficerRoute
});
var OfficerFormulasRoute = Route$11.update({
	id: "/formulas",
	path: "/formulas",
	getParentRoute: () => OfficerRoute
});
var OfficerDocumentsRoute = Route$10.update({
	id: "/documents",
	path: "/documents",
	getParentRoute: () => OfficerRoute
});
var OfficerConfigurationRoute = Route$9.update({
	id: "/configuration",
	path: "/configuration",
	getParentRoute: () => OfficerRoute
});
var OfficerBenefitsRoute = Route$8.update({
	id: "/benefits",
	path: "/benefits",
	getParentRoute: () => OfficerRoute
});
var EmployeeSchemesRoute = Route$7.update({
	id: "/schemes",
	path: "/schemes",
	getParentRoute: () => EmployeeRoute
});
var EmployeeResultRoute = Route$6.update({
	id: "/result",
	path: "/result",
	getParentRoute: () => EmployeeRoute
});
var EmployeeReportsRoute = Route$5.update({
	id: "/reports",
	path: "/reports",
	getParentRoute: () => EmployeeRoute
});
var EmployeeFaqsRoute = Route$4.update({
	id: "/faqs",
	path: "/faqs",
	getParentRoute: () => EmployeeRoute
});
var EmployeeCircularsRoute = Route$3.update({
	id: "/circulars",
	path: "/circulars",
	getParentRoute: () => EmployeeRoute
});
var EmployeeBenefitsRoute = Route$2.update({
	id: "/benefits",
	path: "/benefits",
	getParentRoute: () => EmployeeRoute
});
var EmployeeAssistantRoute = Route$1.update({
	id: "/assistant",
	path: "/assistant",
	getParentRoute: () => EmployeeRoute
});
var ApiAssistantRoute = Route.update({
	id: "/api/assistant",
	path: "/api/assistant",
	getParentRoute: () => Route$19
});
var EmployeeRouteChildren = {
	EmployeeAssistantRoute,
	EmployeeBenefitsRoute,
	EmployeeCircularsRoute,
	EmployeeFaqsRoute,
	EmployeeReportsRoute,
	EmployeeResultRoute,
	EmployeeSchemesRoute,
	EmployeeIndexRoute
};
var EmployeeRouteWithChildren = EmployeeRoute._addFileChildren(EmployeeRouteChildren);
var OfficerRouteChildren = {
	OfficerBenefitsRoute,
	OfficerConfigurationRoute,
	OfficerDocumentsRoute,
	OfficerFormulasRoute,
	OfficerKnowledgeRoute,
	OfficerRulesRoute,
	OfficerIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	EmployeeRoute: EmployeeRouteWithChildren,
	OfficerRoute: OfficerRoute._addFileChildren(OfficerRouteChildren),
	ApiAssistantRoute
};
var routeTree = Route$19._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
