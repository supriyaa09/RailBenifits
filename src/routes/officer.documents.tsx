import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ScrollText,
  Search,
  FileText,
  Download,
  AlertCircle,
  Eye,
  History,
  FileCode,
  Calendar,
  Layers,
  ChevronRight,
  BookOpen,
  ArrowLeftRight,
  X,
  Bot,
} from "lucide-react";
import { useState, useEffect } from "react";
import { PageHeader, SectionCard, SearchBar } from "@/components/rail/common";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/officer/documents")({
  component: UnifiedRepositoryPage,
});

type FilterType =
  | "All"
  | "Circulars"
  | "Orders"
  | "Manuals"
  | "Rule Books"
  | "Reference"
  | "Recently Uploaded"
  | "Pending Review"
  | "Drafts";

function UnifiedRepositoryPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDoc, setSelectedDoc] = useState<any>(null);
  
  const [dbData, setDbData] = useState<any>({
    rules: [],
    ruleVersions: [],
    ruleChanges: [],
    circulars: [],
    auditLogs: [],
  });
  const [loading, setLoading] = useState(true);

  const fetchDbData = async () => {
    try {
      const res = await fetch("/api/rules?action=get-data");
      if (res.ok) {
        const payload = await res.json();
        setDbData(payload);
      }
    } catch (err) {
      console.error("Repository sync failed:", err);
      toast.error("Failed to load repository files.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDbData();
  }, []);

  const filterChips: FilterType[] = [
    "All",
    "Circulars",
    "Orders",
    "Manuals",
    "Rule Books",
    "Reference",
    "Recently Uploaded",
    "Pending Review",
    "Drafts",
  ];

  // Map filters to DB elements
  const filteredCirculars = dbData.circulars.filter((c: any) => {
    // Search matching
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      c.title.toLowerCase().includes(searchLower) ||
      c.circular_number.toLowerCase().includes(searchLower) ||
      (c.category && c.category.toLowerCase().includes(searchLower)) ||
      (c.pension_scheme && c.pension_scheme.toLowerCase().includes(searchLower));

    if (!matchesSearch) return false;

    // Filter matching
    if (activeFilter === "All") return true;
    if (activeFilter === "Circulars") return c.category === "Pension" || c.category === "Circular" || c.category === "General";
    if (activeFilter === "Orders") return c.category === "Government Order" || c.title.toLowerCase().includes("order");
    if (activeFilter === "Manuals") return c.category === "Manual" || c.title.toLowerCase().includes("manual");
    if (activeFilter === "Rule Books") return c.category === "Book" || c.title.toLowerCase().includes("rule");
    if (activeFilter === "Reference") return c.category === "Reference" || c.category === "Reference PDF";
    if (activeFilter === "Recently Uploaded") {
      const uploadDate = new Date(c.uploaded_at || Date.now());
      const diffDays = (Date.now() - uploadDate.getTime()) / (1000 * 3600 * 24);
      return diffDays <= 7;
    }
    if (activeFilter === "Pending Review") {
      // Find matches in rule_changes where status is pending
      return dbData.ruleChanges.some((rc: any) => rc.rule_number === c.circular_number && rc.status === "Pending");
    }
    if (activeFilter === "Drafts") {
      return dbData.ruleChanges.some((rc: any) => rc.rule_number === c.circular_number && rc.status === "Pending");
    }
    return true;
  });

  // Calculate rules related to a circular
  const getRulesForCircular = (circularNumber: string) => {
    return dbData.ruleVersions.filter((rv: any) => rv.rule_number === circularNumber);
  };

  // Calculate version string for table row
  const getVersionForCircular = (circularNumber: string) => {
    const versions = getRulesForCircular(circularNumber);
    if (versions.length === 0) return "N/A";
    const sorted = versions.sort((a: any, b: any) => b.version - a.version);
    return `v${sorted[0].version}`;
  };

  return (
    <div className="space-y-8 pb-12 max-w-[1400px] mx-auto relative">
      <PageHeader
        title="Document Repository & Knowledge Hub"
        description="Unified library of official Railway Board circulars, corresponding AI-extracted rule formulas, and chronological version history logs."
      />

      {/* Filter Chips row - modern whitespace style */}
      <div className="flex flex-wrap gap-2 pb-2 overflow-x-auto print:hidden scrollbar-none border-b border-border/30">
        {filterChips.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 text-xs font-semibold rounded-full border transition-all cursor-pointer whitespace-nowrap ${
              activeFilter === filter
                ? "bg-primary text-primary-foreground border-primary shadow-soft"
                : "bg-card border-border/50 text-muted-foreground hover:bg-muted/15 hover:text-foreground"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Main repository Section */}
      <SectionCard>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div className="w-full sm:max-w-md">
            <SearchBar
              placeholder="Search circulars by title, circular number, category, or benefit..."
              value={searchTerm}
              onChange={setSearchTerm}
            />
          </div>
          <div className="text-xs text-muted-foreground bg-muted/40 px-3 py-1.5 rounded-lg border border-border/40 shrink-0 font-medium">
            Showing <span className="font-bold text-foreground">{filteredCirculars.length}</span> of{" "}
            <span className="font-bold text-foreground">{dbData.circulars.length}</span> records
          </div>
        </div>

        {loading ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary mx-auto" />
          </div>
        ) : filteredCirculars.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-border/60 rounded-xl bg-muted/5 space-y-3">
            <AlertCircle className="h-8 w-8 text-muted-foreground mx-auto opacity-60" />
            <h3 className="text-sm font-semibold text-foreground">No Circulars Found</h3>
            <p className="text-xs text-muted-foreground max-w-xs mx-auto">Try clearing search inputs or toggling filter chips.</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-border/40 bg-card">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-border/40 bg-muted/20 text-muted-foreground font-bold uppercase tracking-wider">
                  <th className="px-4 py-3.5">Circular Document</th>
                  <th className="px-4 py-3.5">Category</th>
                  <th className="px-4 py-3.5">Uploaded Date</th>
                  <th className="px-4 py-3.5 text-center">AI Extraction</th>
                  <th className="px-4 py-3.5 text-center">Rules Affected</th>
                  <th className="px-4 py-3.5 text-center">Active Version</th>
                  <th className="px-4 py-3.5 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/20 font-medium">
                {filteredCirculars.map((c: any) => {
                  const rulesAffected = getRulesForCircular(c.circular_number);
                  const verStr = getVersionForCircular(c.circular_number);
                  const hasDraft = dbData.ruleChanges.some(
                    (rc: any) => rc.rule_number === c.circular_number && rc.status === "Pending"
                  );
                  
                  return (
                    <tr key={c.id} className="hover:bg-muted/5 transition-colors align-middle">
                      <td className="px-4 py-4 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm text-foreground leading-snug">{c.title}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-mono">
                          <span className="text-primary font-bold">{c.circular_number}</span>
                          <span className="h-1 w-1 rounded-full bg-border" />
                          <span>Scheme: {c.pension_scheme || "All"}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <Badge variant="outline" className="text-[10px] font-medium uppercase tracking-wider bg-background">
                          {c.category || "General"}
                        </Badge>
                      </td>
                      <td className="px-4 py-4 text-muted-foreground text-[10px] font-mono">
                        {c.uploaded_at ? c.uploaded_at.split("T")[0] : "N/A"}
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          Completed
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center font-bold text-foreground">
                        {rulesAffected.length}
                      </td>
                      <td className="px-4 py-4 text-center font-mono font-bold text-primary">
                        {verStr}
                      </td>
                      <td className="px-4 py-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedDoc(c)}
                            className="h-8 px-2.5 gap-1 text-[10px] cursor-pointer"
                          >
                            <Eye className="h-3 w-3" />
                            View
                          </Button>
                          {hasDraft && (
                            <Link
                              to="/officer/rule-management"
                              className="h-8 px-2.5 inline-flex items-center justify-center gap-1 border border-primary/20 hover:border-primary/40 bg-primary/5 hover:bg-primary/10 text-primary text-[10px] rounded-md font-bold cursor-pointer"
                            >
                              <ArrowLeftRight className="h-3 w-3" />
                              Compare
                            </Link>
                          )}
                          {c.file_url ? (
                            <a
                              href={c.file_url}
                              download
                              className="h-8 px-2.5 inline-flex items-center justify-center gap-1 border border-border hover:bg-muted text-muted-foreground hover:text-foreground text-[10px] rounded-md cursor-pointer"
                              title="Download original file"
                            >
                              <Download className="h-3 w-3" />
                              Get File
                            </a>
                          ) : (
                            <button
                              disabled
                              className="h-8 px-2.5 inline-flex items-center justify-center gap-1 border border-transparent text-muted-foreground opacity-40 text-[10px] rounded-md"
                            >
                              <Download className="h-3 w-3" />
                              N/A
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </SectionCard>

      {/* Merged Drawer details workspace */}
      {selectedDoc && (
        <div className="fixed inset-y-0 right-0 w-full max-w-2xl bg-card border-l border-border shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-200">
          {/* Header */}
          <div className="p-4 bg-muted/10 border-b border-border/40 flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <ScrollText className="h-4 w-4 text-primary" />
                <span className="font-bold text-sm text-foreground">{selectedDoc.circular_number}</span>
                <Badge variant="outline" className="text-[9px] uppercase tracking-wider font-mono bg-background">
                  {selectedDoc.category}
                </Badge>
              </div>
              <h2 className="text-sm font-semibold text-muted-foreground line-clamp-1 max-w-[500px]">
                {selectedDoc.title}
              </h2>
            </div>
            <button
              onClick={() => setSelectedDoc(null)}
              className="h-8 w-8 hover:bg-muted flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Details Scroll Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs leading-relaxed font-medium">
            {/* AI Summary Card */}
            <div className="bg-primary/5 border border-primary/20 p-4 rounded-xl space-y-2">
              <h3 className="font-bold text-primary flex items-center gap-1.5 uppercase text-[10px]">
                <Bot className="h-4 w-4" />
                AI Brief Summary
              </h3>
              <p className="text-foreground/95">
                {selectedDoc.description || "This Board circular governs revisions in statutory retirement pay matrices. AI processed the circular content and extracted mathematical modifications to corresponding pension and gratuity formulas."}
              </p>
            </div>

            {/* Extracted Rules list */}
            <div className="space-y-3">
              <h3 className="font-bold text-foreground flex items-center gap-1.5 uppercase text-[10px] border-b border-border/40 pb-1.5">
                <FileCode className="h-4 w-4 text-muted-foreground" />
                AI-Extracted Rules & Formulas
              </h3>
              {(() => {
                const affected = getRulesForCircular(selectedDoc.circular_number);
                return affected.length === 0 ? (
                  <p className="text-muted-foreground py-2 italic text-center">No rule formulas were active or generated directly by this circular number in this revision phase.</p>
                ) : (
                  <div className="space-y-3">
                    {affected.map((rv: any) => (
                      <div key={rv.id} className="border border-border/40 rounded-xl p-3 bg-muted/10 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-foreground">Rule Code: {rv.rule_id}</span>
                          <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 text-[9px] font-bold">
                            v{rv.version} Active
                          </Badge>
                        </div>
                        <div>
                          <span className="text-[10px] text-muted-foreground uppercase block mb-0.5">Formula Expression</span>
                          <code className="bg-background border border-border p-2 rounded block font-mono text-[10px] text-primary">{rv.formula}</code>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                          <div>
                            <span className="text-muted-foreground">Min limit:</span>{" "}
                            <span className="font-bold text-foreground">
                              {rv.minimum_limit !== null ? `₹${rv.minimum_limit.toLocaleString("en-IN")}` : "N/A"}
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Max limit:</span>{" "}
                            <span className="font-bold text-foreground">
                              {rv.maximum_limit !== null ? `₹${rv.maximum_limit.toLocaleString("en-IN")}` : "N/A"}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>

            {/* Original Extracted Text */}
            <div className="space-y-2">
              <h3 className="font-bold text-foreground flex items-center gap-1.5 uppercase text-[10px] border-b border-border/40 pb-1.5">
                <BookOpen className="h-4 w-4 text-muted-foreground" />
                Original Parsed Text Content
              </h3>
              <div className="bg-muted/40 p-4 rounded-xl border border-border/50 max-h-40 overflow-y-auto font-mono text-[10px] text-muted-foreground whitespace-pre-wrap leading-normal">
                {selectedDoc.text_content || "Plain text extraction of the Circular PDF document:\n\nGOVERNMENT OF INDIA\nMINISTRY OF RAILWAYS\nRAILWAY BOARD\n\nNo. 2026/F(E)III/1(1)/1\nNew Delhi, Dated: 20-07-2026\n\nSubject: Implementation of Revised Retirement Payouts and Pension Limits.\n\nThe President is pleased to decide that the limits of Retirement Gratuity and Death Gratuity shall stand increased as per instructions."}
              </div>
            </div>

            {/* Rule history timeline */}
            <div className="space-y-3">
              <h3 className="font-bold text-foreground flex items-center gap-1.5 uppercase text-[10px] border-b border-border/40 pb-1.5">
                <History className="h-4 w-4 text-muted-foreground" />
                Rules Timeline & Previous Versions
              </h3>
              {(() => {
                const affected = getRulesForCircular(selectedDoc.circular_number);
                if (affected.length === 0) return <p className="text-muted-foreground italic text-center py-2">No versions recorded.</p>;
                return (
                  <div className="relative border-l border-border ml-3 pl-4 space-y-4 py-2">
                    {affected.map((v: any) => (
                      <div key={v.id} className="relative">
                        <span className="absolute -left-[23px] top-1 h-3 w-3 rounded-full bg-primary" />
                        <div>
                          <div className="flex items-center justify-between font-bold text-foreground">
                            <span>Committed Version v{v.version}</span>
                            <span className="text-[10px] text-muted-foreground font-mono">{v.effective_date}</span>
                          </div>
                          <p className="text-[10px] text-muted-foreground mt-0.5">Approved by: {v.approved_by} | Ref: {v.rule_number}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-4 bg-muted/10 border-t border-border/40 flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => setSelectedDoc(null)}>
              Close Drawer
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
