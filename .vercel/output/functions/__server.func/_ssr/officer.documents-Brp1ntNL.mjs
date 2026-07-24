import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { $ as CircleAlert, H as Download, I as FileText, nt as Check, o as Upload } from "../_libs/lucide-react.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { c as SearchBar, l as SectionCard, s as PageHeader, t as Badge } from "./common-DvgjYd9Y.mjs";
import { t as Button } from "./button-B28lidbK.mjs";
import { n as getAdminDocuments, s as saveAdminDocument } from "./adminDb-Cwlxs_RN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/officer.documents-Brp1ntNL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "C:/Users/Abhishek/Downloads/RailwayBenifits/rail-benefits-navigator/src/routes/officer.documents.tsx?tsr-split=component";
function DocumentRepositoryPage() {
	const [docs, setDocs] = (0, import_react.useState)(() => getAdminDocuments());
	const [searchTerm, setSearchTerm] = (0, import_react.useState)("");
	const [activeTab, setActiveTab] = (0, import_react.useState)("All");
	const [showUploadForm, setShowUploadForm] = (0, import_react.useState)(false);
	const [isPending, startTransition] = (0, import_react.useTransition)();
	const [newDocName, setNewDocName] = (0, import_react.useState)("");
	const [newDocType, setNewDocType] = (0, import_react.useState)("Circular");
	const [newDocCategory, setNewDocCategory] = (0, import_react.useState)("General");
	const [newDocSize, setNewDocSize] = (0, import_react.useState)("1.5 MB");
	const [uploadSuccess, setUploadSuccess] = (0, import_react.useState)(false);
	const handleUploadSubmit = (e) => {
		e.preventDefault();
		if (!newDocName.trim()) return;
		saveAdminDocument({
			name: newDocName.endsWith(".pdf") ? newDocName : `${newDocName}.pdf`,
			type: newDocType,
			date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
			size: newDocSize || "1.0 MB",
			status: "Indexed",
			url: `/reports/${newDocName.replace(/\s+/g, "_")}.pdf`,
			category: newDocCategory
		});
		setDocs(getAdminDocuments());
		setNewDocName("");
		setUploadSuccess(true);
		setTimeout(() => {
			setUploadSuccess(false);
			setShowUploadForm(false);
		}, 2e3);
	};
	const filteredDocs = docs.filter((doc) => {
		const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || doc.category.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesTab = activeTab === "All" || doc.type === activeTab;
		return matchesSearch && matchesTab;
	});
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PageHeader, {
			title: "Document Repository",
			description: "Official library of circulars, orders, and guides indexed by the South Central Railway administration.",
			actions: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
				onClick: () => setShowUploadForm(!showUploadForm),
				className: "gap-2",
				children: [showUploadForm ? "Close Console" : "Upload Document", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Upload, { className: "h-4 w-4" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 79,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 77,
				columnNumber: 173
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 77,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "grid gap-6 lg:grid-cols-4",
			children: [
				showUploadForm && /* @__PURE__ */ (void 0)("div", {
					className: "lg:col-span-4 bg-card border border-primary/20 rounded-lg p-5 shadow-soft relative overflow-hidden animate-fade-in",
					children: [
						/* @__PURE__ */ (void 0)("div", { className: "absolute right-0 top-0 h-1 w-full bg-gradient-to-r from-primary to-primary-soft" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 85,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("h3", {
							className: "font-semibold text-foreground text-sm flex items-center gap-2 mb-4",
							children: [/* @__PURE__ */ (void 0)(Upload, { className: "h-4 w-4 text-primary" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 87,
								columnNumber: 15
							}, this), "Administrative Document Upload Center"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 86,
							columnNumber: 13
						}, this),
						uploadSuccess ? /* @__PURE__ */ (void 0)("div", {
							className: "bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-lg p-4 flex items-center gap-3",
							children: [/* @__PURE__ */ (void 0)(Check, { className: "h-5 w-5 shrink-0" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 92,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("div", {
								className: "font-medium text-sm",
								children: "Document Uploaded Successfully"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 94,
								columnNumber: 19
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "text-xs text-emerald-600/90 mt-0.5",
								children: "Metadata has been indexed into the rules engine database."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 95,
								columnNumber: 19
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 93,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 91,
							columnNumber: 30
						}, this) : /* @__PURE__ */ (void 0)("form", {
							onSubmit: handleUploadSubmit,
							className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4 items-end",
							children: [
								/* @__PURE__ */ (void 0)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (void 0)("label", {
										htmlFor: "docName",
										className: "text-xs font-bold text-muted-foreground uppercase",
										children: "Document Filename"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 101,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)("input", {
										id: "docName",
										required: true,
										placeholder: "e.g. RBE-105-2025-VRS-Updates",
										value: newDocName,
										onChange: (e) => setNewDocName(e.target.value),
										className: "w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 104,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 100,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (void 0)("label", {
										htmlFor: "docType",
										className: "text-xs font-bold text-muted-foreground uppercase",
										children: "Document Type"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 108,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)("select", {
										id: "docType",
										value: newDocType,
										onChange: (e) => setNewDocType(e.target.value),
										className: "w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring",
										children: [
											/* @__PURE__ */ (void 0)("option", {
												value: "Circular",
												children: "Railway Board Circular"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 112,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ (void 0)("option", {
												value: "Memorandum",
												children: "Office Memorandum"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 113,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ (void 0)("option", {
												value: "Government Order",
												children: "Government Order"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 114,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ (void 0)("option", {
												value: "Manual",
												children: "Settlement Manual"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 115,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ (void 0)("option", {
												value: "Book",
												children: "Rule Book"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 116,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ (void 0)("option", {
												value: "Reference PDF",
												children: "Reference PDF"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 117,
												columnNumber: 21
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 111,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 107,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (void 0)("label", {
										htmlFor: "docCat",
										className: "text-xs font-bold text-muted-foreground uppercase",
										children: "Category"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 122,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)("input", {
										id: "docCat",
										placeholder: "e.g. Pension, Gratuity, Medical",
										value: newDocCategory,
										onChange: (e) => setNewDocCategory(e.target.value),
										className: "w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 125,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 121,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "flex gap-2",
									children: [/* @__PURE__ */ (void 0)("div", {
										className: "space-y-1 flex-1",
										children: [/* @__PURE__ */ (void 0)("label", {
											htmlFor: "docSize",
											className: "text-xs font-bold text-muted-foreground uppercase",
											children: "Est. Size"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 130,
											columnNumber: 21
										}, this), /* @__PURE__ */ (void 0)("input", {
											id: "docSize",
											placeholder: "e.g. 1.2 MB",
											value: newDocSize,
											onChange: (e) => setNewDocSize(e.target.value),
											className: "w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 133,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 129,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)(Button, {
										type: "submit",
										className: "h-9 shrink-0",
										children: "Submit Upload"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 135,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 128,
									columnNumber: 17
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 99,
							columnNumber: 24
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 84,
					columnNumber: 28
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "lg:col-span-1 space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "text-xs font-bold text-muted-foreground uppercase tracking-wider px-2 mb-2",
						children: "Filter by Document Type"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 144,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible gap-1 pb-2 lg:pb-0 scrollbar-none",
						children: [
							{
								label: "All Documents",
								value: "All"
							},
							{
								label: "Board Circulars",
								value: "Circular"
							},
							{
								label: "Office Memorandums",
								value: "Memorandum"
							},
							{
								label: "Government Orders",
								value: "Government Order"
							},
							{
								label: "Settlement Manuals",
								value: "Manual"
							},
							{
								label: "Rule Books",
								value: "Book"
							},
							{
								label: "Reference PDFs",
								value: "Reference PDF"
							}
						].map((c) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							onClick: () => setActiveTab(c.value),
							className: `w-full text-left px-3 py-2 text-xs font-bold rounded-lg border transition-all whitespace-nowrap ${activeTab === c.value ? "bg-primary-soft/75 text-primary border-primary/20 shadow-soft" : "bg-card border-transparent text-muted-foreground hover:bg-muted/40 hover:text-foreground"}`,
							children: c.label
						}, c.value, false, {
							fileName: _jsxFileName,
							lineNumber: 148,
							columnNumber: 34
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 147,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 143,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "lg:col-span-3 space-y-4",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SectionCard, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-col sm:flex-row items-center justify-between gap-4 mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "w-full sm:max-w-xs",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SearchBar, {
								placeholder: "Search repository...",
								value: searchTerm,
								onChange: setSearchTerm
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 159,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 158,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "text-xs text-muted-foreground font-semibold",
							children: [
								"Showing ",
								filteredDocs.length,
								" documents"
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 161,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 157,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-3",
						children: [filteredDocs.map((doc) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center justify-between p-3.5 rounded-lg border border-border bg-card hover:bg-muted/15 transition-colors group",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-3 min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "h-10 w-10 rounded-md bg-muted/40 text-muted-foreground border border-border flex items-center justify-center shrink-0",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FileText, { className: "h-5 w-5" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 170,
										columnNumber: 23
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 169,
									columnNumber: 21
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex items-center gap-2 flex-wrap",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "font-semibold text-sm text-foreground truncate max-w-sm sm:max-w-md",
											children: doc.name
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 174,
											columnNumber: 25
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
											variant: "outline",
											className: "text-[9px] uppercase tracking-wider bg-background px-1.5 py-0",
											children: doc.type
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 177,
											columnNumber: 25
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 173,
										columnNumber: 23
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex items-center gap-3 text-xs text-muted-foreground mt-1 flex-wrap font-medium",
										children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: ["Category: ", doc.category] }, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 182,
												columnNumber: 25
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "h-1 w-1 rounded-full bg-border" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 183,
												columnNumber: 25
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: ["Date Uploaded: ", doc.date] }, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 184,
												columnNumber: 25
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "h-1 w-1 rounded-full bg-border" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 185,
												columnNumber: 25
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: ["Size: ", doc.size] }, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 186,
												columnNumber: 25
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 181,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 172,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 168,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-2 shrink-0",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
									variant: "secondary",
									className: "text-[10px] text-emerald-500 bg-emerald-500/10 border-emerald-500/20 font-bold hidden sm:inline-flex",
									children: doc.status
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 192,
									columnNumber: 21
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
									href: "#",
									onClick: (e) => {
										e.preventDefault();
										alert(`Simulated download of ${doc.name}`);
									},
									className: "h-8 w-8 rounded-md hover:bg-primary-soft/40 hover:text-primary flex items-center justify-center text-muted-foreground border border-transparent hover:border-primary/10 transition-colors",
									title: "Download source document",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Download, { className: "h-4 w-4" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 199,
										columnNumber: 23
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 195,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 191,
								columnNumber: 19
							}, this)]
						}, doc.id, true, {
							fileName: _jsxFileName,
							lineNumber: 167,
							columnNumber: 40
						}, this)), filteredDocs.length === 0 && /* @__PURE__ */ (void 0)("div", {
							className: "text-center py-12 border border-dashed border-border rounded-lg bg-muted/5",
							children: [/* @__PURE__ */ (void 0)(CircleAlert, { className: "h-8 w-8 text-muted-foreground mx-auto mb-2 opacity-60" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 205,
								columnNumber: 19
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "text-sm font-medium text-muted-foreground",
								children: "No documents found matching the criteria"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 206,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 204,
							columnNumber: 45
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 166,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 156,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 155,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 82,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 76,
		columnNumber: 10
	}, this);
}
//#endregion
export { DocumentRepositoryPage as component };
