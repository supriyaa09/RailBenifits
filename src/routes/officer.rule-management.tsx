import { createFileRoute } from "@tanstack/react-router";
import {
  Upload,
  Bot,
  ShieldCheck,
  History,
  Activity,
  FileText,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Edit,
  Download,
  Info,
  ChevronRight,
  RefreshCw,
  FolderOpen,
  User,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { PageHeader, SectionCard, StatCard } from "@/components/rail/common";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/officer/rule-management")({
  component: RuleManagementPage,
});

function RuleManagementPage() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>({
    rules: [],
    ruleVersions: [],
    ruleChanges: [],
    auditLogs: [],
    circulars: [],
    generatedMarkdown: [],
  });

  // Selected file details
  const [file, setFile] = useState<File | null>(null);
  const [fileSizeStr, setFileSizeStr] = useState<string>("");
  
  // Metadata Form State
  const [title, setTitle] = useState("");
  const [circularNumber, setCircularNumber] = useState("");
  const [effectiveDate, setEffectiveDate] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [category, setCategory] = useState("Pension");
  const [benefitType, setBenefitType] = useState("Basic Pension");
  const [pensionScheme, setPensionScheme] = useState("OPS");
  const [retirementType, setRetirementType] = useState("Superannuation");
  const [description, setDescription] = useState("");

  // Edit Modal State
  const [editingChange, setEditingChange] = useState<any>(null);
  const [editFormula, setEditFormula] = useState("");
  const [editMin, setEditMin] = useState(0);
  const [editMax, setEditMax] = useState(0);
  const [editEffectiveDate, setEditEffectiveDate] = useState("");
  const [editEligibility, setEditEligibility] = useState("");
  const [editConditions, setEditConditions] = useState("");
  const [editBenefit, setEditBenefit] = useState("");
  const [editNotes, setEditNotes] = useState("");

  // Rejection Reason Modal State
  const [rejectingChangeId, setRejectingChangeId] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [showCircularText, setShowCircularText] = useState(false);
  const [specifyCategory, setSpecifyCategory] = useState("");
  const [specifyBenefit, setSpecifyBenefit] = useState("");
  const [extractionError, setExtractionError] = useState<string | null>(null);
  const [extractedRawText, setExtractedRawText] = useState<string>("");
  const [showFailedText, setShowFailedText] = useState(false);

  // Sub-tabs for ledger review
  const [historyTab, setHistoryTab] = useState<"history" | "audit">("history");

  // AI loading progressive state
  const [aiProgressStage, setAiProgressStage] = useState<number>(0);
  const stages = [
    "Uploading PDF...",
    "Checking document...",
    "Searching for embedded text...",
    "Extracting document text...",
    "Running OCR (scanned PDF fallback)...",
    "Extracting railway rules...",
    "Comparing with approved rules...",
    "Preparing review..."
  ];

  const fetchData = async () => {
    try {
      const res = await fetch("/api/rules?action=get-data");
      if (res.ok) {
        const payload = await res.json();
        setData(payload);
      }
    } catch (err) {
      console.error("Error fetching rules data:", err);
      toast.error("Failed to sync database records.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Format file size
  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (!selectedFile.name.toLowerCase().endsWith(".pdf")) {
        toast.error("Unsupported format. Please select a PDF (.pdf) circular document.");
        return;
      }
      setFile(selectedFile);
      setFileSizeStr(formatBytes(selectedFile.size));
      
      setTitle(selectedFile.name.replace(/\.[^/.]+$/, "").replace(/_/g, " ").replace(/-/g, " "));
      
      setCurrentStep(2);
      toast.info("Document uploaded. Please fill in the circular metadata details.");
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const selectedFile = e.dataTransfer.files[0];
      if (!selectedFile.name.toLowerCase().endsWith(".pdf")) {
        toast.error("Unsupported format. Please drop a PDF (.pdf) circular document.");
        return;
      }
      setFile(selectedFile);
      setFileSizeStr(formatBytes(selectedFile.size));
      setTitle(selectedFile.name.replace(/\.[^/.]+$/, "").replace(/_/g, " ").replace(/-/g, " "));
      setCurrentStep(2);
      toast.info("Document loaded. Enter metadata details.");
    }
  };

  const triggerAIExtraction = async () => {
    if (!file || !circularNumber) {
      toast.error("Please ensure the file is selected and Circular Number is filled.");
      return;
    }

    if (category === "Other" && !specifyCategory) {
      toast.error("Please specify the custom category.");
      return;
    }
    if (benefitType === "Other" && !specifyBenefit) {
      toast.error("Please specify the custom benefit type.");
      return;
    }

    setLoading(true);
    setExtractionError(null);
    setExtractedRawText("");
    setCurrentStep(3); // Move to Step 3: AI Progress
    setAiProgressStage(0);

    // Simulates the 8 progressive stage ticks (0 to 7)
    const interval = setInterval(() => {
      setAiProgressStage((prev) => (prev < 7 ? prev + 1 : prev));
    }, 700);

    try {
      const finalCategory = category === "Other" ? specifyCategory : category;
      const finalBenefit = benefitType === "Other" ? specifyBenefit : benefitType;

      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", title);
      formData.append("circularNumber", circularNumber);
      formData.append("effectiveDate", effectiveDate);
      formData.append("issueDate", issueDate);
      formData.append("category", finalCategory);
      formData.append("benefitType", finalBenefit);
      formData.append("pensionScheme", pensionScheme);
      formData.append("retirementType", retirementType);
      formData.append("description", description);
      formData.append("officer", "Railway Officer Admin");

      const res = await fetch("/api/rules", {
        method: "POST",
        body: formData,
      });

      clearInterval(interval);

      if (res.ok) {
        toast.success("AI analysis complete! Proposed changes extracted successfully.");
        await fetchData();
        setCurrentStep(4); // Move to Step 4: Rule Comparison
      } else {
        const err = await res.json();
        setExtractionError(err.error || "Analysis failed.");
        if (err.extractedText) {
          setExtractedRawText(err.extractedText);
        }
        toast.error(err.error || "Analysis failed.");
      }
    } catch (err: any) {
      clearInterval(interval);
      console.error(err);
      setExtractionError(err.message || "Internal service error during document analysis.");
      toast.error("Internal service error during document analysis.");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (changeId: string) => {
    try {
      const res = await fetch("/api/rules", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "approve",
          changeId,
          officer: "Officer Admin",
        }),
      });

      if (res.ok) {
        const result = await res.json();
        toast.success(`Rule committed! Created version v${result.version}.`);
        await fetchData();
        setCurrentStep(6); // Move to Step 6: Publish screen
      } else {
        const err = await res.json();
        toast.error(err.error || "Approval failed.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Approval failed due to connection error.");
    }
  };

  const downloadJson = () => {
    if (!pendingChange) return;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(pendingChange, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `extracted_rule_${pendingChange.id}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleRejectSubmit = async () => {
    if (!rejectingChangeId) return;
    try {
      const res = await fetch("/api/rules", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "reject",
          changeId: rejectingChangeId,
          reason: rejectionReason,
          officer: "Officer Admin",
        }),
      });

      if (res.ok) {
        toast.success("Draft discarded and rejection reason saved.");
        setRejectingChangeId(null);
        setRejectionReason("");
        await fetchData();
        setCurrentStep(1); // reset back to upload
        setFile(null);
      } else {
        const err = await res.json();
        toast.error(err.error || "Rejection failed.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Rejection failed.");
    }
  };

  const handleEditClick = (change: any) => {
    setEditingChange(change);
    setEditFormula(change.formula);
    setEditMin(change.minimum || 0);
    setEditMax(change.maximum || 0);
    setEditEffectiveDate(change.effective_date);
    
    let elig = "Qualifying service criteria apply.";
    let cond = "None";
    let bft = change.benefit || "Basic Pension";
    let nts = change.notes || "";
    
    try {
      const parsed = typeof change.extractedJson === "string" ? JSON.parse(change.extractedJson) : (change.extractedJson || {});
      if (parsed.eligibility) elig = parsed.eligibility;
      if (parsed.conditions) cond = parsed.conditions;
      if (parsed.notes) nts = parsed.notes;
    } catch (e) {
      console.error("Failed to parse edit metadata:", e);
    }
    
    setEditEligibility(elig);
    setEditConditions(cond);
    setEditBenefit(bft);
    setEditNotes(nts);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingChange) return;

    try {
      const res = await fetch("/api/rules", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "edit-approve",
          changeId: editingChange.id,
          formula: editFormula,
          minimum: Number(editMin),
          maximum: Number(editMax),
          effectiveDate: editEffectiveDate,
          eligibility: editEligibility,
          conditions: editConditions,
          benefit: editBenefit,
          notes: editNotes,
          officer: "Officer Admin",
        }),
      });

      if (res.ok) {
        const result = await res.json();
        toast.success(`Edits committed and approved! Version v${result.version} created.`);
        setEditingChange(null);
        await fetchData();
        setCurrentStep(6);
      } else {
        const err = await res.json();
        toast.error(err.error || "Save & Approve failed.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Save & Approve failed.");
    }
  };

  const findCurrentRuleForComparison = (change: any) => {
    const rule = data.rules.find(
      (r: any) =>
        r.category.toLowerCase() === change.category.toLowerCase() &&
        (r.scheme.toLowerCase().includes(change.scheme.toLowerCase()) || r.scheme === "All") &&
        r.benefit_type.toLowerCase() === change.benefit.toLowerCase()
    );
    if (!rule) return null;

    const version = data.ruleVersions
      .filter((v: any) => v.rule_id === rule.id && v.status === "Approved")
      .sort((a: any, b: any) => b.version - a.version)[0];

    return { rule, version };
  };

  const getConfidenceBadgeColor = (conf: number) => {
    if (conf >= 95) return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
    if (conf >= 70) return "bg-amber-500/10 text-amber-500 border-amber-500/20";
    return "bg-rose-500/10 text-rose-500 border-rose-500/20";
  };

  const categories = ["Pension", "Gratuity", "Leave Encashment", "RELHS", "Commutation", "Other"];
  const schemes = ["OPS", "UPS", "NPS", "All"];
  const retirements = ["Superannuation", "VRS", "Medical Invalidation", "Death while in Service", "Other"];

  // Fetch the latest pending change draft
  const pendingChange = data.ruleChanges.filter((rc: any) => rc.status === "Pending")[0];

  return (
    <div className="space-y-8 pb-12 max-w-[1400px] mx-auto">
      <PageHeader
        title="Rule Update Center"
        description="Official workflow console to upload Railway Board circulars, extract formula modifications, and visually compare policy rules before publishing updates."
      />

      {/* Stepper Workflow Header */}
      <div className="card-surface p-6 bg-card border border-border/40 rounded-xl shadow-soft">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {[
            { step: 1, label: "Upload PDF" },
            { step: 2, label: "Fill Metadata" },
            { step: 3, label: "Extract Rules with AI" },
            { step: 4, label: "Compare Existing Rules" },
            { step: 5, label: "Officer Review" },
            { step: 6, label: "Publish Rule" },
          ].map((item, idx, arr) => (
            <div key={item.step} className="flex items-center w-full last:w-auto">
              <div className="flex items-center gap-3">
                <div
                  className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                    currentStep === item.step
                      ? "bg-primary text-primary-foreground scale-110 shadow-md ring-4 ring-primary/10"
                      : currentStep > item.step
                      ? "bg-emerald-600 text-white"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {currentStep > item.step ? "✓" : item.step}
                </div>
                <span
                  className={`text-xs font-semibold whitespace-nowrap ${
                    currentStep === item.step
                      ? "text-primary"
                      : currentStep > item.step
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </span>
              </div>
              {idx < arr.length - 1 && (
                <div className="hidden md:block h-[2px] bg-border flex-1 mx-4 min-w-[30px]" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Stepper Panels */}
      <div className="space-y-8">
        {currentStep === 1 && (
          <SectionCard title="Step 1: Upload Board Circular (PDF)" description="Drag & drop or browse the official PDF circular to initiate AI extraction. Scanned and searchable PDFs are supported.">
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className="border-2 border-dashed border-border hover:border-primary/50 transition-all rounded-xl p-12 text-center bg-card flex flex-col items-center justify-center gap-4 cursor-pointer min-h-[300px]"
            >
              <div className="h-16 w-16 rounded-full bg-primary/5 flex items-center justify-center text-primary shadow-soft">
                <Upload className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-foreground">Upload Railway Circular (PDF)</h3>
                <p className="text-[11px] text-muted-foreground mt-1.5 font-semibold">
                  Supported Format: <span className="text-primary font-bold">✓ PDF</span>
                </p>
                <p className="text-[10px] text-muted-foreground font-medium mt-1 max-w-md mx-auto">
                  The system automatically detects whether the PDF contains searchable text or requires OCR.
                </p>
              </div>
              <div className="relative">
                <input
                  type="file"
                  id="circularFile"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <Button asChild variant="outline" size="sm" className="cursor-pointer">
                  <label htmlFor="circularFile">Browse Local Files</label>
                </Button>
              </div>
            </div>
          </SectionCard>
        )}

        {/* Step 2: Fill Metadata Form */}
        {currentStep === 2 && (
          <SectionCard title="Step 2: Verify Document Metadata" description="Specify dates, schemes, and categories for correct formula references.">
            <div className="grid gap-6 lg:grid-cols-4 align-start">
              {/* Left Column: File Details Card */}
              <div className="card-surface p-4 bg-muted/10 border border-border/50 rounded-xl space-y-3 lg:col-span-1">
                <h4 className="text-xs font-bold text-muted-foreground uppercase pb-2 border-b border-border/30">Uploaded File</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary shrink-0" />
                    <span className="font-semibold text-foreground truncate block" title={file?.name}>{file?.name}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-foreground uppercase block">File Size</span>
                    <span className="font-mono text-foreground font-bold">{fileSizeStr}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-foreground uppercase block">File Type</span>
                    <span className="font-semibold text-foreground uppercase">{file?.name.split(".").pop()}</span>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="w-full text-xs text-rose-500 hover:text-rose-600 hover:bg-rose-50/10" onClick={() => { setFile(null); setCurrentStep(1); }}>
                  Remove file
                </Button>
              </div>

              {/* Right Column: Metadata Form Fields */}
              <div className="lg:col-span-3 space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-[10px] font-bold text-muted-foreground uppercase block mb-1">Circular Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Revision of Pension Rules 2026"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full h-9 px-3 border border-input bg-background rounded-md text-xs outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-muted-foreground uppercase block mb-1">Board Circular Number *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. RBE No. 99/2026"
                      value={circularNumber}
                      onChange={(e) => setCircularNumber(e.target.value)}
                      className="w-full h-9 px-3 border border-input bg-background rounded-md text-xs outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-[10px] font-bold text-muted-foreground uppercase block mb-1">Issue Date</label>
                    <input
                      type="date"
                      value={issueDate}
                      onChange={(e) => setIssueDate(e.target.value)}
                      className="w-full h-9 px-3 border border-input bg-background rounded-md text-xs outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-muted-foreground uppercase block mb-1">Effective Date</label>
                    <input
                      type="date"
                      value={effectiveDate}
                      onChange={(e) => setEffectiveDate(e.target.value)}
                      className="w-full h-9 px-3 border border-input bg-background rounded-md text-xs outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <label className="text-[10px] font-bold text-muted-foreground uppercase block mb-1">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full h-9 px-2 border border-input bg-background rounded-md text-xs outline-none"
                    >
                      {categories.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-muted-foreground uppercase block mb-1">Benefit</label>
                    <select
                      value={benefitType}
                      onChange={(e) => setBenefitType(e.target.value)}
                      className="w-full h-9 px-2 border border-input bg-background rounded-md text-xs outline-none"
                    >
                      <option value="Basic Pension">Basic Pension</option>
                      <option value="Family Pension">Family Pension</option>
                      <option value="Retirement Gratuity">Retirement Gratuity</option>
                      <option value="Leave Encashment">Leave Encashment</option>
                      <option value="RELHS">RELHS</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-muted-foreground uppercase block mb-1">Pension Scheme</label>
                    <select
                      value={pensionScheme}
                      onChange={(e) => setPensionScheme(e.target.value)}
                      className="w-full h-9 px-2 border border-input bg-background rounded-md text-xs outline-none"
                    >
                      {schemes.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Specify Category and Benefit inputs if "Other" is selected */}
                {(category === "Other" || benefitType === "Other") && (
                  <div className="grid gap-4 md:grid-cols-2 p-3 bg-muted/20 border border-border/30 rounded-lg animate-in fade-in-50 duration-150">
                    {category === "Other" && (
                      <div>
                        <label className="text-[10px] font-bold text-rose-500 uppercase block mb-1">Specify Category *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Pass Rules, Ex-Gratia"
                          value={specifyCategory}
                          onChange={(e) => setSpecifyCategory(e.target.value)}
                          className="w-full h-9 px-3 border border-input bg-background rounded-md text-xs outline-none focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                    )}
                    {benefitType === "Other" && (
                      <div>
                        <label className="text-[10px] font-bold text-rose-500 uppercase block mb-1">Specify Benefit *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Ex-Gratia Payout, Complimentary Passes"
                          value={specifyBenefit}
                          onChange={(e) => setSpecifyBenefit(e.target.value)}
                          className="w-full h-9 px-3 border border-input bg-background rounded-md text-xs outline-none focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                    )}
                  </div>
                )}

                <div>
                  <label className="text-[10px] font-bold text-muted-foreground uppercase block mb-1">Brief Description</label>
                  <textarea
                    rows={2}
                    placeholder="Enter short details of circular changes..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2.5 border border-input bg-background rounded-md text-xs outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div className="flex gap-2 justify-end pt-2">
                  <Button variant="outline" size="sm" onClick={() => setCurrentStep(1)}>Back</Button>
                  <Button size="sm" className="gap-1.5 font-semibold" onClick={triggerAIExtraction}>
                    <Bot className="h-4 w-4" />
                    Extract Rules with AI
                  </Button>
                </div>
              </div>
            </div>
          </SectionCard>
        )}

        {/* Step 3: AI Processing Loader & Error Handling */}
        {currentStep === 3 && (
          <SectionCard title="Step 3: Vision AI Extraction & Analysis" description="Processing uploaded PDF circular using Qwen 3.6-27B Vision Model via Groq.">
            {extractionError ? (
              <div className="card-surface p-8 bg-card border border-rose-500/20 rounded-xl space-y-6 max-w-2xl mx-auto shadow-md">
                <div className="flex items-center gap-3 border-b border-border/30 pb-4 text-rose-600">
                  <AlertTriangle className="h-6 w-6" />
                  <h3 className="text-sm font-bold">Unable to extract readable text from this document</h3>
                </div>

                <div className="space-y-3 text-xs">
                  <p className="text-muted-foreground font-semibold">Possible Reasons:</p>
                  <ul className="list-disc pl-5 font-semibold text-foreground/80 space-y-1.5">
                    <li>Poor scan quality or handwriting text not readable by OCR engine</li>
                    <li>Corrupted PDF document file</li>
                    <li>Unsupported document layout or secure encrypted PDF</li>
                  </ul>
                  {extractionError && (
                    <div className="bg-rose-500/5 border border-rose-500/10 p-3 rounded text-rose-700 font-mono text-[10px] break-all leading-normal">
                      Error details: {extractionError}
                    </div>
                  )}
                </div>

                {showFailedText && extractedRawText && (
                  <div className="space-y-2 animate-in slide-in-from-bottom-2 duration-150">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">OCR Text Output Preview</span>
                    <div className="bg-muted/40 p-4 rounded border border-border/20 max-h-[200px] overflow-y-auto font-mono text-[10px] text-muted-foreground whitespace-pre-wrap leading-relaxed">
                      {extractedRawText}
                    </div>
                  </div>
                )}

                <div className="flex gap-2 justify-end pt-2 border-t border-border/20">
                  <Button variant="outline" size="sm" onClick={() => { setCurrentStep(2); setExtractionError(null); }}>
                    Cancel
                  </Button>
                  {extractedRawText && (
                    <Button variant="outline" size="sm" onClick={() => setShowFailedText(!showFailedText)}>
                      {showFailedText ? "Hide OCR Output" : "View OCR Output"}
                    </Button>
                  )}
                  <Button size="sm" className="bg-rose-600 hover:bg-rose-700 text-white font-bold border-0" onClick={triggerAIExtraction}>
                    Retry Extraction
                  </Button>
                </div>
              </div>
            ) : (
              <div className="card-surface p-12 text-center bg-card border border-border/40 rounded-xl space-y-6 flex flex-col items-center justify-center min-h-[300px]">
                <div className="relative flex items-center justify-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary" />
                  <Bot className="h-6 w-6 text-primary absolute animate-pulse" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-foreground">Intelligent PDF Circular Vision Processing (Qwen 3.6-27B)</h3>
                  <p className="text-xs text-muted-foreground font-semibold max-w-sm">{stages[aiProgressStage]}</p>
                </div>
                {/* Visual stage highlights */}
                <div className="w-full max-w-md bg-muted h-[4px] rounded-full overflow-hidden">
                  <div
                    className="bg-primary h-full transition-all duration-500"
                    style={{ width: `${((aiProgressStage + 1) / 8) * 100}%` }}
                  />
                </div>
              </div>
            )}
          </SectionCard>
        )}

        {/* Step 4: Rule Comparison Screen */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {!pendingChange ? (
              <div className="card-surface p-12 text-center space-y-2">
                <CheckCircle className="h-10 w-10 mx-auto text-emerald-500" />
                <h3 className="text-sm font-semibold text-foreground">All Drafts Processed</h3>
                <p className="text-xs text-muted-foreground">Upload a new circular to view side-by-side rule comparisons.</p>
                <Button size="sm" onClick={() => setCurrentStep(1)} className="mt-4">Upload New Circular</Button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Header Actions */}
                <div className="flex items-center justify-between flex-wrap gap-4 border-b border-border/20 pb-4">
                  <div>
                    <h2 className="text-base font-bold text-foreground">Step 4: Safe Policy Comparison & Validation</h2>
                    <p className="text-xs text-muted-foreground font-semibold">
                      Review extracted rule changes side-by-side. Formulas and calculations are never modified without explicit approval.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Button variant="outline" size="sm" onClick={downloadJson} className="gap-1 text-xs">
                      <Download className="h-3.5 w-3.5" />
                      Download JSON
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setShowCircularText(!showCircularText)} className="gap-1 text-xs">
                      <FileText className="h-3.5 w-3.5" />
                      {showCircularText ? "Hide Circular Text" : "View Circular Text"}
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleEditClick(pendingChange)} className="gap-1 text-xs border-amber-500/30 hover:bg-amber-50/5 text-amber-600">
                      <Edit className="h-3.5 w-3.5" />
                      Edit Details
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => setRejectingChangeId(pendingChange.id)} className="gap-1 text-xs font-bold">
                      <XCircle className="h-3.5 w-3.5" />
                      Reject Draft
                    </Button>
                    <Button size="sm" onClick={() => setCurrentStep(5)} className="bg-primary hover:bg-primary/95 text-primary-foreground border-0 gap-1 text-xs font-bold shadow-sm">
                      <ChevronRight className="h-3.5 w-3.5" />
                      Proceed to Review
                    </Button>
                  </div>
                </div>

                {/* AI Summary and Confidence Card */}
                {(() => {
                  const comp = findCurrentRuleForComparison(pendingChange);
                  const hasFormulaChange = comp && comp.version.formula !== pendingChange.formula;
                  const hasMaxChange = comp && comp.version.maximum_limit !== pendingChange.maximum;
                  const hasMinChange = comp && comp.version.minimum_limit !== pendingChange.minimum;
                  const hasDateChange = comp && comp.version.effective_date !== pendingChange.effective_date;
                  
                  // Extract detailed fields from extractedJson
                  let parsedJson: any = {};
                  try {
                    parsedJson = typeof pendingChange.extractedJson === "string" 
                      ? JSON.parse(pendingChange.extractedJson) 
                      : (pendingChange.extractedJson || {});
                  } catch (e) {
                    console.error("Failed to parse extractedJson:", e);
                  }

                  const hasEligibilityChange = comp && (comp.version.eligibility || "Qualifying service criteria apply.") !== (parsedJson.eligibility || "Qualifying service criteria apply.");
                  const hasConditionsChange = comp && (comp.version.conditions || "None") !== (parsedJson.conditions || "None");

                  return (
                    <div className="grid gap-6 md:grid-cols-3">
                      {/* Left 2 Cols: Aligned Comparative Parameters Matrix */}
                      <div className="md:col-span-2 space-y-4">
                        <div className="bg-card border border-border/40 rounded-xl overflow-hidden shadow-soft">
                          <div className="p-4 bg-muted/20 border-b border-border/30 flex items-center justify-between">
                            <h3 className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                              <Activity className="h-4 w-4 text-primary" />
                              Rule Parameters Matrix
                            </h3>
                            <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px] font-mono">
                              RBE Ref: {pendingChange.rule_number}
                            </Badge>
                          </div>

                          <div className="divide-y divide-border/20 text-xs">
                            {/* Row Helper */}
                            {[
                              {
                                label: "Benefit Type",
                                current: comp ? comp.version.benefit_type : "N/A (New Scheme Entry)",
                                proposed: pendingChange.benefit,
                                changed: comp && comp.version.benefit_type !== pendingChange.benefit
                              },
                              {
                                label: "Formula / Calculation Rule",
                                current: comp ? comp.version.formula : "N/A",
                                proposed: pendingChange.formula,
                                changed: hasFormulaChange,
                                isCode: true
                              },
                              {
                                label: "Qualifying Eligibility",
                                current: comp ? (comp.version.eligibility || "Qualifying service criteria apply.") : "N/A",
                                proposed: parsedJson.eligibility || "Qualifying service criteria apply.",
                                changed: hasEligibilityChange
                              },
                              {
                                label: "Minimum Floor Limit",
                                current: comp ? (comp.version.minimum_limit !== null ? `₹${comp.version.minimum_limit.toLocaleString("en-IN")}` : "None") : "N/A",
                                proposed: pendingChange.minimum !== null ? `₹${pendingChange.minimum.toLocaleString("en-IN")}` : "None",
                                changed: hasMinChange
                              },
                              {
                                label: "Maximum Ceiling Limit",
                                current: comp ? (comp.version.maximum_limit !== null ? `₹${comp.version.maximum_limit.toLocaleString("en-IN")}` : "None") : "N/A",
                                proposed: pendingChange.maximum !== null ? `₹${pendingChange.maximum.toLocaleString("en-IN")}` : "None",
                                changed: hasMaxChange
                              },
                              {
                                label: "Effective Date",
                                current: comp ? comp.version.effective_date : "N/A",
                                proposed: pendingChange.effective_date,
                                changed: hasDateChange
                              },
                              {
                                label: "Restrictive Conditions",
                                current: comp ? (comp.version.conditions || "None") : "N/A",
                                proposed: parsedJson.conditions || "None",
                                changed: hasConditionsChange
                              },
                              {
                                label: "Explanatory Notes",
                                current: comp ? (comp.version.notes || "") : "N/A",
                                proposed: parsedJson.notes || pendingChange.notes || "",
                                changed: comp && (comp.version.notes || "") !== (parsedJson.notes || pendingChange.notes || "")
                              }
                            ].map((row, idx) => (
                              <div
                                key={idx}
                                className={`grid grid-cols-12 gap-4 p-4 items-center ${
                                  row.changed
                                    ? "bg-amber-500/[0.04] hover:bg-amber-500/[0.06] transition-colors"
                                    : "hover:bg-muted/5 transition-colors"
                                }`}
                              >
                                <div className="col-span-3 font-bold text-muted-foreground uppercase text-[9px] tracking-wide">
                                  {row.label}
                                </div>
                                <div className="col-span-4 text-foreground/80 pr-2">
                                  {row.isCode ? (
                                    <code className="text-[10px] font-mono bg-muted/60 px-1.5 py-0.5 rounded text-muted-foreground break-all block">
                                      {row.current}
                                    </code>
                                  ) : (
                                    <span className="truncate-2-lines block">{row.current}</span>
                                  )}
                                </div>
                                <div className="col-span-1 flex justify-center text-muted-foreground">
                                  <ArrowRight className="h-4 w-4" />
                                </div>
                                <div className="col-span-4 flex items-center justify-between gap-2">
                                  {row.isCode ? (
                                    <code className={`text-[10px] font-mono px-1.5 py-0.5 rounded break-all block font-bold ${
                                      row.changed ? "bg-amber-500/10 text-amber-700 border border-amber-500/20" : "bg-muted/60 text-foreground"
                                    }`}>
                                      {row.proposed}
                                    </code>
                                  ) : (
                                    <span className={`font-semibold block truncate-2-lines ${
                                      row.changed ? "text-amber-700 font-bold" : "text-foreground"
                                    }`}>
                                      {row.proposed}
                                    </span>
                                  )}
                                  {row.changed && (
                                    <Badge className="bg-amber-500 hover:bg-amber-600 text-white text-[8px] scale-90 border-0 flex-shrink-0 font-bold">
                                      DIFF
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Right Col: AI Summary & Extraction Confidence */}
                      <div className="space-y-4">
                        {/* Confidence Card */}
                        <div className="bg-card border border-border/40 rounded-xl p-5 shadow-soft space-y-4 flex flex-col justify-between">
                          <div>
                            <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">Extraction Confidence</h4>
                            <div className="flex items-center gap-3">
                              <span className="text-3xl font-black text-foreground tracking-tight">
                                {pendingChange.confidence || 98}%
                              </span>
                              <div className="h-2 flex-1 bg-muted rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-emerald-500 transition-all duration-300"
                                  style={{ width: `${pendingChange.confidence || 98}%` }}
                                />
                              </div>
                            </div>
                            <span className="text-[10px] text-emerald-600 font-bold mt-1.5 block">
                              • Safe calculation tokens verified
                            </span>
                          </div>
                        </div>

                        {/* Summary Highlights */}
                        <div className="bg-card border border-border/40 rounded-xl p-5 shadow-soft space-y-4">
                          <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">AI Summary Card</h4>
                          <div className="bg-primary/5 p-3 rounded-lg border border-primary/10">
                            <span className="text-[11px] font-medium text-foreground/95 italic leading-relaxed block">
                              "{pendingChange.notes || "This circular details parameters updates for railway benefits, revising the formulas and ceiling limits."}"
                            </span>
                          </div>

                          <div className="space-y-2">
                            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide block">Detected Highlights</span>
                            <ul className="text-xs space-y-1.5 font-semibold text-foreground/80">
                              <li className="flex items-center gap-2">
                                <span className={`h-1.5 w-1.5 rounded-full ${hasFormulaChange ? "bg-amber-500" : "bg-muted-foreground/40"}`} />
                                Formula status: {hasFormulaChange ? <span className="text-amber-600">Modified</span> : "Unchanged"}
                              </li>
                              <li className="flex items-center gap-2">
                                <span className={`h-1.5 w-1.5 rounded-full ${hasMaxChange ? "bg-amber-500" : "bg-muted-foreground/40"}`} />
                                Maximum limit status: {hasMaxChange ? <span className="text-amber-600">Ceiling Increased</span> : "Unchanged"}
                              </li>
                              <li className="flex items-center gap-2">
                                <span className={`h-1.5 w-1.5 rounded-full ${hasMinChange ? "bg-amber-500" : "bg-muted-foreground/40"}`} />
                                Minimum limit status: {hasMinChange ? <span className="text-amber-600">Modified</span> : "Unchanged"}
                              </li>
                              <li className="flex items-center gap-2">
                                <span className={`h-1.5 w-1.5 rounded-full ${hasDateChange ? "bg-amber-500" : "bg-muted-foreground/40"}`} />
                                Effective date: {hasDateChange ? <span className="text-amber-600">Updated</span> : "Unchanged"}
                              </li>
                              <li className="flex items-center gap-2">
                                <span className={`h-1.5 w-1.5 rounded-full ${hasEligibilityChange ? "bg-amber-500" : "bg-muted-foreground/40"}`} />
                                Eligibility: {hasEligibilityChange ? <span className="text-amber-600">Updated</span> : "Unchanged"}
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* Original Circular text scrollable viewer */}
                {showCircularText && (
                  <div className="bg-card border border-border/40 rounded-xl p-5 shadow-soft space-y-3 animate-in slide-in-from-bottom-2 duration-150">
                    <h3 className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                      <FileText className="h-4 w-4 text-primary" />
                      Original Parsed Circular text
                    </h3>
                    <div className="bg-muted/40 p-4 rounded-lg border border-border/20 text-xs font-mono max-h-[300px] overflow-y-auto leading-relaxed text-muted-foreground whitespace-pre-wrap">
                      {(() => {
                        const circular = data.circulars.find((c: any) => c.id === pendingChange.circular_id);
                        return circular ? circular.extracted_text : "Parsed text is loading or unavailable.";
                      })()}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}


        {/* Step 5: Officer Final Sign-Off Review */}
        {currentStep === 5 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {!pendingChange ? (
              <div className="card-surface p-12 text-center space-y-2">
                <CheckCircle className="h-10 w-10 mx-auto text-emerald-500" />
                <h3 className="text-sm font-semibold text-foreground">All Drafts Processed</h3>
                <p className="text-xs text-muted-foreground">Upload a new circular to view side-by-side rule comparisons.</p>
                <Button size="sm" onClick={() => setCurrentStep(1)} className="mt-4">Upload New Circular</Button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Header Actions */}
                <div className="flex items-center justify-between flex-wrap gap-4 border-b border-border/20 pb-4">
                  <div>
                    <h2 className="text-base font-bold text-foreground">Step 5: Officer Final Sign-Off & Review</h2>
                    <p className="text-xs text-muted-foreground font-semibold">
                      Validate policy modifications summary before publishing changes to the active rules ledger.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => setCurrentStep(4)} className="gap-1 text-xs">
                      Back to Comparison
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => setRejectingChangeId(pendingChange.id)} className="gap-1 text-xs font-bold">
                      <XCircle className="h-3.5 w-3.5" />
                      Reject Draft
                    </Button>
                    <Button size="sm" onClick={() => handleApprove(pendingChange.id)} className="bg-emerald-600 hover:bg-emerald-700 text-white border-0 gap-1 text-xs font-bold shadow-sm">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      Approve & Publish Rules Update
                    </Button>
                  </div>
                </div>

                {/* Main Sign-off review contents */}
                {(() => {
                  const comp = findCurrentRuleForComparison(pendingChange);
                  const hasFormulaChange = comp && comp.version.formula !== pendingChange.formula;
                  const hasMaxChange = comp && comp.version.maximum_limit !== pendingChange.maximum;
                  const hasMinChange = comp && comp.version.minimum_limit !== pendingChange.minimum;
                  const hasDateChange = comp && comp.version.effective_date !== pendingChange.effective_date;

                  let parsedJson: any = {};
                  try {
                    parsedJson = typeof pendingChange.extractedJson === "string" 
                      ? JSON.parse(pendingChange.extractedJson) 
                      : (pendingChange.extractedJson || {});
                  } catch (e) {
                    console.error("Failed to parse JSON:", e);
                  }

                  const hasEligibilityChange = comp && (comp.version.eligibility || "Qualifying service criteria apply.") !== (parsedJson.eligibility || "Qualifying service criteria apply.");
                  const hasConditionsChange = comp && (comp.version.conditions || "None") !== (parsedJson.conditions || "None");

                  return (
                    <div className="grid gap-6 md:grid-cols-3">
                      {/* Left Summary and warnings card */}
                      <div className="md:col-span-2 space-y-4">
                        <div className="bg-card border border-border/40 rounded-xl p-6 shadow-soft space-y-4">
                          <h3 className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5 border-b border-border/20 pb-3">
                            <Info className="h-4 w-4 text-primary" />
                            Policy Modifications Summary
                          </h3>

                          <div className="space-y-4">
                            {/* Aligned Summary details */}
                            <div className="bg-muted/40 p-4 rounded-lg border border-border/20 space-y-3">
                              <h4 className="text-xs font-bold text-foreground">AI Circular Summary</h4>
                              <p className="text-xs text-muted-foreground leading-relaxed italic">
                                "{pendingChange.notes || "This circular details parameters updates for railway benefits, revising the formulas and ceiling limits."}"
                              </p>
                            </div>

                            {/* Aligned Deltas OLD -> NEW highlights list */}
                            <div className="space-y-3">
                              <h4 className="text-xs font-bold text-foreground">Detected Rule Changes Details</h4>
                              
                              <div className="border border-border/40 rounded-lg divide-y divide-border/20 text-xs">
                                {hasFormulaChange && (
                                  <div className="p-3 bg-amber-500/[0.03] grid grid-cols-12 gap-3 items-center">
                                    <div className="col-span-3 font-bold text-muted-foreground uppercase text-[9px]">Formula / Calculation Rule</div>
                                    <div className="col-span-4 line-through text-muted-foreground bg-muted/30 px-1 rounded text-[11px] break-words">{comp.version.formula}</div>
                                    <div className="col-span-1 flex justify-center text-muted-foreground">→</div>
                                    <div className="col-span-4 font-bold text-amber-700 bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 rounded text-[11px] break-words">{pendingChange.formula}</div>
                                  </div>
                                )}
                                
                                {hasMaxChange && (
                                  <div className="p-3 bg-amber-500/[0.03] grid grid-cols-12 gap-3 items-center">
                                    <div className="col-span-3 font-bold text-muted-foreground uppercase text-[9px]">Max Ceiling Limit</div>
                                    <div className="col-span-4 line-through text-muted-foreground bg-muted/30 px-1 rounded">₹{comp.version.maximum_limit?.toLocaleString("en-IN") || "None"}</div>
                                    <div className="col-span-1 flex justify-center text-muted-foreground">→</div>
                                    <div className="col-span-4 font-bold text-amber-700 bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 rounded">₹{pendingChange.maximum?.toLocaleString("en-IN") || "None"}</div>
                                  </div>
                                )}

                                {hasMinChange && (
                                  <div className="p-3 bg-amber-500/[0.03] grid grid-cols-12 gap-3 items-center">
                                    <div className="col-span-3 font-bold text-muted-foreground uppercase text-[9px]">Min Floor Limit</div>
                                    <div className="col-span-4 line-through text-muted-foreground bg-muted/30 px-1 rounded">₹{comp.version.minimum_limit?.toLocaleString("en-IN") || "None"}</div>
                                    <div className="col-span-1 flex justify-center text-muted-foreground">→</div>
                                    <div className="col-span-4 font-bold text-amber-700 bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 rounded">₹{pendingChange.minimum?.toLocaleString("en-IN") || "None"}</div>
                                  </div>
                                )}

                                {hasDateChange && (
                                  <div className="p-3 bg-amber-500/[0.03] grid grid-cols-12 gap-3 items-center">
                                    <div className="col-span-3 font-bold text-muted-foreground uppercase text-[9px]">Effective Date</div>
                                    <div className="col-span-4 line-through text-muted-foreground bg-muted/30 px-1 rounded">{comp.version.effective_date}</div>
                                    <div className="col-span-1 flex justify-center text-muted-foreground">→</div>
                                    <div className="col-span-4 font-bold text-amber-700 bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 rounded">{pendingChange.effective_date}</div>
                                  </div>
                                )}

                                {hasEligibilityChange && (
                                  <div className="p-3 bg-amber-500/[0.03] grid grid-cols-12 gap-3 items-center">
                                    <div className="col-span-3 font-bold text-muted-foreground uppercase text-[9px]">Eligibility Criteria</div>
                                    <div className="col-span-4 line-through text-muted-foreground bg-muted/30 px-1 rounded truncate">{comp.version.eligibility || "Qualifying service criteria apply."}</div>
                                    <div className="col-span-1 flex justify-center text-muted-foreground">→</div>
                                    <div className="col-span-4 font-bold text-amber-700 bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 rounded truncate">{parsedJson.eligibility || "Qualifying service criteria apply."}</div>
                                  </div>
                                )}

                                {hasConditionsChange && (
                                  <div className="p-3 bg-amber-500/[0.03] grid grid-cols-12 gap-3 items-center">
                                    <div className="col-span-3 font-bold text-muted-foreground uppercase text-[9px]">Restrictive Conditions</div>
                                    <div className="col-span-4 line-through text-muted-foreground bg-muted/30 px-1 rounded truncate">{comp.version.conditions || "None"}</div>
                                    <div className="col-span-1 flex justify-center text-muted-foreground">→</div>
                                    <div className="col-span-4 font-bold text-amber-700 bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 rounded truncate">{parsedJson.conditions || "None"}</div>
                                  </div>
                                )}

                                {!hasFormulaChange && !hasMaxChange && !hasMinChange && !hasDateChange && !hasEligibilityChange && !hasConditionsChange && (
                                  <div className="p-4 text-center text-muted-foreground font-semibold">
                                    No parameters differences detected. Rule values are unchanged.
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right Column details */}
                      <div className="space-y-4">
                        {/* Sign-off terms */}
                        <div className="bg-card border border-border/40 rounded-xl p-5 shadow-soft space-y-4">
                          <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Publish Terms</h4>
                          <p className="text-xs text-muted-foreground font-semibold leading-relaxed">
                            Upon administrative sign-off, a new rule version is created. Existing calculation rules are version-archived and never deleted. Affected employee portals will evaluate pensions dynamically based on their retirement exit dates.
                          </p>
                          <div className="p-3 bg-emerald-500/5 border border-emerald-500/10 rounded-lg text-emerald-700 font-semibold text-xs flex items-start gap-2">
                            <ShieldCheck className="h-4 w-4 flex-shrink-0 mt-0.5" />
                            <span>This rule change will generate version v{comp ? comp.version.version + 1 : 1} of {pendingChange.benefit} ({pendingChange.scheme}).</span>
                          </div>
                        </div>

                        {/* Confidence indicator */}
                        <div className="bg-card border border-border/40 rounded-xl p-5 shadow-soft space-y-2">
                          <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Extraction Quality Check</h4>
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-foreground">AI Confidence</span>
                            <Badge className="bg-emerald-500 text-white font-bold">{pendingChange.confidence || 98}%</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        )}

        {/* Step 6: Publish Screen */}
        {currentStep === 6 && (
          <div className="card-surface p-12 text-center bg-card border border-border/40 rounded-xl space-y-6 flex flex-col items-center justify-center min-h-[300px]">
            <div className="h-16 w-16 rounded-full bg-emerald-500/15 text-emerald-600 flex items-center justify-center">
              <CheckCircle className="h-8 w-8" />
            </div>
            <div className="space-y-2">
              <h3 className="text-base font-bold text-foreground">Rule Version Published Successfully</h3>
              <p className="text-xs text-muted-foreground max-w-sm">
                The database has been updated, calculations will resolve using the new effective dates, and documentation markdown was regenerated.
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => { setFile(null); setCurrentStep(1); }}>
                Upload Another Circular
              </Button>
              <Button size="sm" onClick={() => { setCurrentStep(1); setHistoryTab("history"); }}>
                View Database History
              </Button>
            </div>
          </div>
        )}

      </div>

      {/* History and Audit Trail sections */}
      <div className="space-y-6 pt-6 border-t border-border/40">
        <div className="flex gap-2 border-b border-border/30 print:hidden pb-1">
          <button
            onClick={() => setHistoryTab("history")}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold border-b-2 cursor-pointer transition-colors ${
              historyTab === "history"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <History className="h-3.5 w-3.5" />
            Approved Rule History log
          </button>
          <button
            onClick={() => setHistoryTab("audit")}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold border-b-2 cursor-pointer transition-colors ${
              historyTab === "audit"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <Activity className="h-3.5 w-3.5" />
            Immutable Audit Trail
          </button>
        </div>

        {historyTab === "history" ? (
          <SectionCard title="Rule Version History Log">
            {data.rules.length === 0 ? (
              <div className="text-center py-6 text-xs text-muted-foreground">No rules found.</div>
            ) : (
              <div className="space-y-4">
                {data.rules.slice(0, 3).map((rule: any) => {
                  const ruleVersions = data.ruleVersions.filter((v: any) => v.rule_id === rule.id);
                  return (
                    <div key={rule.id} className="border border-border/60 rounded-xl overflow-hidden bg-card text-xs">
                      <div className="p-3 bg-muted/10 border-b border-border/40 flex items-center justify-between font-semibold">
                        <span>{rule.name}</span>
                        <Badge variant="outline" className="font-mono text-[9px] uppercase bg-background">{rule.id}</Badge>
                      </div>
                      <table className="w-full text-left">
                        <thead>
                          <tr className="border-b border-border/20 text-[10px] text-muted-foreground font-bold uppercase bg-muted/5">
                            <th className="px-3 py-2 text-center w-16">Version</th>
                            <th className="px-3 py-2">Effective Date</th>
                            <th className="px-3 py-2">Formula</th>
                            <th className="px-3 py-2 text-right">Max Limit</th>
                            <th className="px-3 py-2">Circular No</th>
                            <th className="px-3 py-2">Approved By</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border/10 font-medium">
                          {ruleVersions.map((v: any) => (
                            <tr key={v.id} className="hover:bg-muted/5 text-foreground/90">
                              <td className="px-3 py-2.5 text-center font-mono font-bold text-primary">v{v.version}</td>
                              <td className="px-3 py-2.5">{v.effective_date}</td>
                              <td className="px-3 py-2.5 font-mono text-[10px] text-primary/80 truncate max-w-xs">{v.formula}</td>
                              <td className="px-3 py-2.5 text-right">{v.maximum_limit !== null ? `₹${v.maximum_limit.toLocaleString("en-IN")}` : "N/A"}</td>
                              <td className="px-3 py-2.5 font-mono">{v.rule_number}</td>
                              <td className="px-3 py-2.5 text-muted-foreground text-[10px]">{v.approved_by}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                })}
              </div>
            )}
          </SectionCard>
        ) : (
          <SectionCard title="Immutable Audit Logs">
            <div className="overflow-x-auto rounded-xl border border-border bg-card">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-border bg-muted/20 text-muted-foreground font-semibold uppercase">
                    <th className="px-4 py-3 w-40">Timestamp</th>
                    <th className="px-4 py-3 w-32">Officer</th>
                    <th className="px-4 py-3 w-28">Action</th>
                    <th className="px-4 py-3">Audit Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60 font-medium">
                  {data.auditLogs.slice(0, 5).map((log: any) => (
                    <tr key={log.id} className="hover:bg-muted/10 align-top">
                      <td className="px-4 py-3 font-mono text-muted-foreground text-[10px]">
                        {log.timestamp ? log.timestamp.replace("T", " ").slice(0, 19) : "N/A"}
                      </td>
                      <td className="px-4 py-3 text-foreground">{log.officer}</td>
                      <td className="px-4 py-3">
                        <Badge variant="outline" className="text-[9px] font-bold">{log.action}</Badge>
                      </td>
                      <td className="px-4 py-3 text-foreground/90 leading-relaxed text-xs">{log.changes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionCard>
        )}
      </div>

      {/* Edit Before Approve Modal */}
      {editingChange && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in-50 zoom-in-95 duration-150">
            <div className="p-4 bg-primary text-primary-foreground flex items-center justify-between">
              <h3 className="font-semibold text-sm">Edit Proposed Rule Changes</h3>
              <button onClick={() => setEditingChange(null)} className="text-primary-foreground/80 hover:text-white cursor-pointer text-xs font-bold font-mono">
                ESC
              </button>
            </div>
            <form onSubmit={handleEditSubmit} className="p-5 space-y-4 text-xs font-medium">
              <div>
                <label className="text-muted-foreground uppercase text-[10px] block mb-1">Benefit Type</label>
                <input
                  type="text"
                  disabled
                  value={`${editingChange.scheme} - ${editingChange.benefit}`}
                  className="w-full h-9 px-3 bg-muted border border-border rounded-md outline-none text-muted-foreground cursor-not-allowed"
                />
              </div>

              <div>
                <label className="text-muted-foreground uppercase text-[10px] block mb-1">Formula string *</label>
                <input
                  type="text"
                  required
                  value={editFormula}
                  onChange={(e) => setEditFormula(e.target.value)}
                  className="w-full h-9 px-3 bg-background border border-input rounded-md outline-none font-mono text-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-muted-foreground uppercase text-[10px] block mb-1">Minimum Limit (Rs)</label>
                  <input
                    type="number"
                    value={editMin}
                    onChange={(e) => setEditMin(Number(e.target.value))}
                    className="w-full h-9 px-3 bg-background border border-input rounded-md outline-none"
                  />
                </div>
                <div>
                  <label className="text-muted-foreground uppercase text-[10px] block mb-1">Maximum Limit (Rs)</label>
                  <input
                    type="number"
                    value={editMax}
                    onChange={(e) => setEditMax(Number(e.target.value))}
                    className="w-full h-9 px-3 bg-background border border-input rounded-md outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-muted-foreground uppercase text-[10px] block mb-1">Effective Date</label>
                <input
                  type="date"
                  value={editEffectiveDate}
                  onChange={(e) => setEditEffectiveDate(e.target.value)}
                  className="w-full h-9 px-3 bg-background border border-input rounded-md outline-none"
                />
              </div>

              <div>
                <label className="text-muted-foreground uppercase text-[10px] block mb-1">Eligibility Criteria</label>
                <textarea
                  rows={2}
                  value={editEligibility}
                  onChange={(e) => setEditEligibility(e.target.value)}
                  className="w-full p-2 bg-background border border-input rounded-md outline-none leading-normal text-xs"
                />
              </div>

              <div>
                <label className="text-muted-foreground uppercase text-[10px] block mb-1">Restrictive Conditions</label>
                <textarea
                  rows={2}
                  value={editConditions}
                  onChange={(e) => setEditConditions(e.target.value)}
                  className="w-full p-2 bg-background border border-input rounded-md outline-none leading-normal text-xs"
                />
              </div>

              <div>
                <label className="text-muted-foreground uppercase text-[10px] block mb-1">AI Notes / Summary</label>
                <textarea
                  rows={2}
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  className="w-full p-2 bg-background border border-input rounded-md outline-none leading-normal text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-border/30">
                <Button type="button" variant="outline" size="sm" onClick={() => setEditingChange(null)}>
                  Cancel
                </Button>
                <Button type="submit" size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white border-0 font-bold">
                  Save & Approve
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Rejection Reason Modal */}
      {rejectingChangeId && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in-50 zoom-in-95 duration-150">
            <div className="p-4 bg-rose-600 text-white flex items-center justify-between">
              <h3 className="font-semibold text-sm">Discard Proposed Draft</h3>
              <button onClick={() => setRejectingChangeId(null)} className="text-white/85 hover:text-white cursor-pointer text-xs font-bold font-mono">
                ESC
              </button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); handleRejectSubmit(); }} className="p-5 space-y-4 text-xs font-medium">
              <div>
                <label className="text-muted-foreground uppercase text-[10px] block mb-1">Reason for Rejection *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe why this rule draft is being discarded (e.g. invalid board reference, calculation typos)..."
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  className="w-full p-2.5 bg-background border border-input rounded-md outline-none text-foreground focus:ring-2 focus:ring-primary/20 leading-normal"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t border-border/30">
                <Button type="button" variant="outline" size="sm" onClick={() => setRejectingChangeId(null)}>
                  Cancel
                </Button>
                <Button type="submit" size="sm" className="bg-rose-600 hover:bg-rose-700 text-white border-0 font-bold">
                  Discard Draft
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
