import { createFileRoute } from "@tanstack/react-router";
import { ScrollText, Search, Upload, FileText, Download, Check, Plus, AlertCircle } from "lucide-react";
import { useState, useTransition } from "react";
import { PageHeader, SectionCard, SearchBar } from "@/components/rail/common";
import { getAdminDocuments, saveAdminDocument, AdminDocument } from "@/database/adminDb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/officer/documents")({
  component: DocumentRepositoryPage,
});

type DocTypeFilter = "All" | "Circular" | "Memorandum" | "Government Order" | "Manual" | "Book" | "Reference PDF";

function DocumentRepositoryPage() {
  const [docs, setDocs] = useState<AdminDocument[]>(() => getAdminDocuments());
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<DocTypeFilter>("All");
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Upload form state
  const [newDocName, setNewDocName] = useState("");
  const [newDocType, setNewDocType] = useState<Exclude<DocTypeFilter, "All">>("Circular");
  const [newDocCategory, setNewDocCategory] = useState("General");
  const [newDocSize, setNewDocSize] = useState("1.5 MB");
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocName.trim()) return;

    const payload = {
      name: newDocName.endsWith(".pdf") ? newDocName : `${newDocName}.pdf`,
      type: newDocType,
      date: new Date().toISOString().split("T")[0],
      size: newDocSize || "1.0 MB",
      status: "Indexed" as const,
      url: `/reports/${newDocName.replace(/\s+/g, "_")}.pdf`,
      category: newDocCategory
    };

    saveAdminDocument(payload);
    
    // Refresh docs list
    setDocs(getAdminDocuments());
    setNewDocName("");
    setUploadSuccess(true);
    setTimeout(() => {
      setUploadSuccess(false);
      setShowUploadForm(false);
    }, 2000);
  };

  // Filtering
  const filteredDocs = docs.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTab = activeTab === "All" || doc.type === activeTab;
    return matchesSearch && matchesTab;
  });

  const categories: { label: string; value: DocTypeFilter }[] = [
    { label: "All Documents", value: "All" },
    { label: "Board Circulars", value: "Circular" },
    { label: "Office Memorandums", value: "Memorandum" },
    { label: "Government Orders", value: "Government Order" },
    { label: "Settlement Manuals", value: "Manual" },
    { label: "Rule Books", value: "Book" },
    { label: "Reference PDFs", value: "Reference PDF" },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Document Repository"
        description="Official library of circulars, orders, and guides indexed by the South Central Railway administration."
        actions={
          <Button onClick={() => setShowUploadForm(!showUploadForm)} className="gap-2">
            {showUploadForm ? "Close Console" : "Upload Document"}
            <Upload className="h-4 w-4" />
          </Button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Upload form block (visible if toggled) */}
        {showUploadForm && (
          <div className="lg:col-span-4 bg-card border border-primary/20 rounded-lg p-5 shadow-soft relative overflow-hidden animate-fade-in">
            <div className="absolute right-0 top-0 h-1 w-full bg-gradient-to-r from-primary to-primary-soft" />
            <h3 className="font-semibold text-foreground text-sm flex items-center gap-2 mb-4">
              <Upload className="h-4 w-4 text-primary" />
              Administrative Document Upload Center
            </h3>
            
            {uploadSuccess ? (
              <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-lg p-4 flex items-center gap-3">
                <Check className="h-5 w-5 shrink-0" />
                <div>
                  <div className="font-medium text-sm">Document Uploaded Successfully</div>
                  <div className="text-xs text-emerald-600/90 mt-0.5">Metadata has been indexed into the rules engine database.</div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleUploadSubmit} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 items-end">
                <div className="space-y-1">
                  <label htmlFor="docName" className="text-xs font-bold text-muted-foreground uppercase">Document Filename</label>
                  <input
                    id="docName"
                    required
                    placeholder="e.g. RBE-105-2025-VRS-Updates"
                    value={newDocName}
                    onChange={(e) => setNewDocName(e.target.value)}
                    className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                  />
                </div>
                
                <div className="space-y-1">
                  <label htmlFor="docType" className="text-xs font-bold text-muted-foreground uppercase">Document Type</label>
                  <select
                    id="docType"
                    value={newDocType}
                    onChange={(e) => setNewDocType(e.target.value as any)}
                    className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
                  >
                    <option value="Circular">Railway Board Circular</option>
                    <option value="Memorandum">Office Memorandum</option>
                    <option value="Government Order">Government Order</option>
                    <option value="Manual">Settlement Manual</option>
                    <option value="Book">Rule Book</option>
                    <option value="Reference PDF">Reference PDF</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label htmlFor="docCat" className="text-xs font-bold text-muted-foreground uppercase">Category</label>
                  <input
                    id="docCat"
                    placeholder="e.g. Pension, Gratuity, Medical"
                    value={newDocCategory}
                    onChange={(e) => setNewDocCategory(e.target.value)}
                    className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                  />
                </div>

                <div className="flex gap-2">
                  <div className="space-y-1 flex-1">
                    <label htmlFor="docSize" className="text-xs font-bold text-muted-foreground uppercase">Est. Size</label>
                    <input
                      id="docSize"
                      placeholder="e.g. 1.2 MB"
                      value={newDocSize}
                      onChange={(e) => setNewDocSize(e.target.value)}
                      className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                    />
                  </div>
                  <Button type="submit" className="h-9 shrink-0">
                    Submit Upload
                  </Button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Sidebar Tabs */}
        <div className="lg:col-span-1 space-y-2">
          <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-2 mb-2">
            Filter by Document Type
          </div>
          <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible gap-1 pb-2 lg:pb-0 scrollbar-none">
            {categories.map((c) => (
              <button
                key={c.value}
                onClick={() => setActiveTab(c.value)}
                className={`w-full text-left px-3 py-2 text-xs font-bold rounded-lg border transition-all whitespace-nowrap ${
                  activeTab === c.value
                    ? "bg-primary-soft/75 text-primary border-primary/20 shadow-soft"
                    : "bg-card border-transparent text-muted-foreground hover:bg-muted/40 hover:text-foreground"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Document Ledger List */}
        <div className="lg:col-span-3 space-y-4">
          <SectionCard>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
              <div className="w-full sm:max-w-xs">
                <SearchBar
                  placeholder="Search repository..."
                  value={searchTerm}
                  onChange={setSearchTerm}
                />
              </div>
              <div className="text-xs text-muted-foreground font-semibold">
                Showing {filteredDocs.length} documents
              </div>
            </div>

            <div className="space-y-3">
              {filteredDocs.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-3.5 rounded-lg border border-border bg-card hover:bg-muted/15 transition-colors group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-10 w-10 rounded-md bg-muted/40 text-muted-foreground border border-border flex items-center justify-center shrink-0">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-sm text-foreground truncate max-w-sm sm:max-w-md">
                          {doc.name}
                        </span>
                        <Badge variant="outline" className="text-[9px] uppercase tracking-wider bg-background px-1.5 py-0">
                          {doc.type}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1 flex-wrap font-medium">
                        <span>Category: {doc.category}</span>
                        <span className="h-1 w-1 rounded-full bg-border" />
                        <span>Date Uploaded: {doc.date}</span>
                        <span className="h-1 w-1 rounded-full bg-border" />
                        <span>Size: {doc.size}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Badge variant="secondary" className="text-[10px] text-emerald-500 bg-emerald-500/10 border-emerald-500/20 font-bold hidden sm:inline-flex">
                      {doc.status}
                    </Badge>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        alert(`Simulated download of ${doc.name}`);
                      }}
                      className="h-8 w-8 rounded-md hover:bg-primary-soft/40 hover:text-primary flex items-center justify-center text-muted-foreground border border-transparent hover:border-primary/10 transition-colors"
                      title="Download source document"
                    >
                      <Download className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              ))}

              {filteredDocs.length === 0 && (
                <div className="text-center py-12 border border-dashed border-border rounded-lg bg-muted/5">
                  <AlertCircle className="h-8 w-8 text-muted-foreground mx-auto mb-2 opacity-60" />
                  <div className="text-sm font-medium text-muted-foreground">No documents found matching the criteria</div>
                </div>
              )}
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
