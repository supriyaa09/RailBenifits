import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as Send, a as User, at as Bot, j as LoaderCircle, u as Trash2 } from "../_libs/lucide-react.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/employee.assistant-BXDDUrpB.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "C:/Users/Abhishek/Downloads/RailwayBenifits/rail-benefits-navigator/src/routes/employee.assistant.tsx?tsr-split=component";
function PensionAssistantPage() {
	const [messages, setMessages] = (0, import_react.useState)([{
		role: "assistant",
		content: "Hello! I am your RailAssist Knowledge Assistant. You can ask me any questions about Railway Pension Rules 2026, leave encashment calculations, retirement gratuity, or circular details."
	}]);
	const [input, setInput] = (0, import_react.useState)("");
	const [isLoading, setIsLoading] = (0, import_react.useState)(false);
	const messagesEndRef = (0, import_react.useRef)(null);
	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};
	(0, import_react.useEffect)(() => {
		scrollToBottom();
	}, [messages, isLoading]);
	const handleSend = async (e) => {
		e.preventDefault();
		if (!input.trim() || isLoading) return;
		const userMessage = {
			role: "user",
			content: input
		};
		setMessages((prev) => [...prev, userMessage]);
		setInput("");
		setIsLoading(true);
		try {
			const response = await fetch("/api/assistant", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ messages: [...messages, userMessage].map((m) => ({
					role: m.role,
					content: m.content
				})) })
			});
			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || "Failed to fetch response");
			}
			const botReply = (await response.json()).choices?.[0]?.message?.content || "No reply received.";
			setMessages((prev) => [...prev, {
				role: "assistant",
				content: botReply
			}]);
		} catch (err) {
			setMessages((prev) => [...prev, {
				role: "assistant",
				content: `⚠️ Error: ${err.message}. Please verify that GROQ_API_KEY is configured in your .env file at the root and the dev server has restarted.`
			}]);
		} finally {
			setIsLoading(false);
		}
	};
	const clearChat = () => {
		setMessages([{
			role: "assistant",
			content: "Hello! I am your RailAssist Knowledge Assistant. You can ask me any questions about Railway Pension Rules 2026, leave encashment calculations, retirement gratuity, or circular details."
		}]);
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex flex-col h-[calc(100vh-12rem)] max-w-4xl mx-auto rounded-xl border border-border bg-card shadow-soft overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "p-4 bg-primary text-primary-foreground flex items-center justify-between shadow-soft border-b border-border",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Bot, { className: "h-5 w-5 animate-pulse" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 75,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
						className: "text-sm font-semibold leading-none",
						children: "Railway Knowledge Assistant"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 77,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "text-[10px] text-primary-foreground/75 mt-1 block",
						children: "South Central Railway HQ"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 78,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 76,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 74,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					onClick: clearChat,
					className: "p-1.5 rounded-lg text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/15 transition-colors cursor-pointer",
					title: "Clear Conversation",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { className: "h-4 w-4" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 84,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 83,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 73,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex-1 overflow-y-auto p-4 space-y-4 bg-muted/10",
				children: [
					messages.map((m, idx) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: `flex gap-3 max-w-[85%] ${m.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`,
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: `h-8 w-8 rounded-full grid place-items-center shrink-0 ${m.role === "user" ? "bg-primary text-primary-foreground" : "bg-primary-soft text-primary border"}`,
							children: m.role === "user" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(User, { className: "h-4 w-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 92,
								columnNumber: 36
							}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Bot, { className: "h-4 w-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 92,
								columnNumber: 67
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 91,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: `p-3 rounded-xl text-sm leading-relaxed border shadow-soft bg-card text-foreground border-border`,
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "whitespace-pre-wrap",
								children: m.content
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 95,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 94,
							columnNumber: 13
						}, this)]
					}, idx, true, {
						fileName: _jsxFileName,
						lineNumber: 90,
						columnNumber: 35
					}, this)),
					isLoading && /* @__PURE__ */ (void 0)("div", {
						className: "flex gap-3 mr-auto max-w-[80%] items-center",
						children: [/* @__PURE__ */ (void 0)("div", {
							className: "h-8 w-8 rounded-full bg-primary-soft text-primary border grid place-items-center shrink-0 animate-pulse",
							children: /* @__PURE__ */ (void 0)(Bot, { className: "h-4 w-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 100,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 99,
							columnNumber: 13
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "p-3 rounded-xl text-sm border bg-card text-foreground border-border flex items-center gap-2 shadow-soft",
							children: [/* @__PURE__ */ (void 0)(LoaderCircle, { className: "h-4 w-4 animate-spin text-primary" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 103,
								columnNumber: 15
							}, this), "Thinking..."]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 102,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 98,
						columnNumber: 23
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { ref: messagesEndRef }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 107,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 89,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
				onSubmit: handleSend,
				className: "p-3 border-t border-border bg-card flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
					value: input,
					onChange: (e) => setInput(e.target.value),
					disabled: isLoading,
					placeholder: "Ask about pension rules, leave encashment calculations...",
					className: "flex-1 px-4 py-2 text-sm rounded-lg border border-input bg-background text-foreground outline-none focus:ring-2 focus:ring-primary/20 transition-shadow disabled:opacity-60"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 112,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					type: "submit",
					disabled: !input.trim() || isLoading,
					className: "px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/95 transition-colors disabled:opacity-50 disabled:pointer-events-none flex items-center gap-1.5 text-sm cursor-pointer",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Send, { className: "h-4 w-4" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 114,
						columnNumber: 11
					}, this), "Send"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 113,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 111,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 71,
		columnNumber: 10
	}, this);
}
//#endregion
export { PensionAssistantPage as component };
