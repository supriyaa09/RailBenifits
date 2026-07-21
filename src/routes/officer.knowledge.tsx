import { createFileRoute } from "@tanstack/react-router";
import {
  Database,
  Search,
  ShieldCheck,
  FileCog,
  Wallet,
  ScrollText,
  FileText,
  HelpCircle,
  BookOpen,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import { useState, useEffect } from "react";
import { PageHeader, SectionCard } from "@/components/rail/common";
import {
  getAdminRules,
  getAdminFormulas,
  getAdminBenefits,
  getAdminDocuments,
  AdminRule,
  AdminFormula,
  AdminBenefit,
  AdminDocument,
} from "@/database/adminDb";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/officer/knowledge")({
  component: RailwayKnowledgeBasePage,
});

function RailwayKnowledgeBasePage() {
  const [searchTerm, setSearchTerm] = useState("");

  // Sync search input with URL search param "?q="
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const queryParam = params.get("q") || "";
      setSearchTerm(queryParam);
    }
  }, [typeof window !== "undefined" ? window.location.search : ""]);

  const rules = getAdminRules();
  const formulas = getAdminFormulas();
  const benefits = getAdminBenefits();
  const documents = getAdminDocuments();

  const isSearching = searchTerm.trim().length > 0;
  const searchLower = searchTerm.toLowerCase();

  // Perform search queries
  const matchedRules = rules.filter(
    (r) =>
      r.name.toLowerCase().includes(searchLower) ||
      r.description.toLowerCase().includes(searchLower) ||
      r.ruleNumber.toLowerCase().includes(searchLower) ||
      r.ruleReference.toLowerCase().includes(searchLower),
  );

  const matchedFormulas = formulas.filter(
    (f) =>
      f.name.toLowerCase().includes(searchLower) ||
      f.completeFormula.toLowerCase().includes(searchLower) ||
      f.ruleReference.toLowerCase().includes(searchLower) ||
      f.variablesUsed.some((v) => v.toLowerCase().includes(searchLower)),
  );

  const matchedBenefits = benefits.filter(
    (b) =>
      b.name.toLowerCase().includes(searchLower) ||
      b.eligibility.toLowerCase().includes(searchLower) ||
      b.formulaUsed.toLowerCase().includes(searchLower) ||
      b.ruleReference.toLowerCase().includes(searchLower),
  );

  const matchedDocuments = documents.filter(
    (d) =>
      d.name.toLowerCase().includes(searchLower) ||
      d.category.toLowerCase().includes(searchLower) ||
      d.type.toLowerCase().includes(searchLower),
  );

  const totalMatches =
    matchedRules.length + matchedFormulas.length + matchedBenefits.length + matchedDocuments.length;

  const handleQuickSearch = (term: string) => {
    if (typeof window !== "undefined") {
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set("q", term);
      window.history.pushState({}, "", newUrl.toString());
      setSearchTerm(term);
    }
  };

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchTerm(val);
    if (typeof window !== "undefined") {
      const newUrl = new URL(window.location.href);
      if (val) {
        newUrl.searchParams.set("q", val);
      } else {
        newUrl.searchParams.delete("q");
      }
      window.history.replaceState({}, "", newUrl.toString());
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Railway Knowledge Base"
        description="Search indexed policy files, mathematical calculation formulas, and benefits checklists in a single query."
      />

      {/* Main Search Panel */}
      <div className="card-surface p-6 bg-gradient-to-br from-card to-muted/20 border border-border/80 shadow-soft">
        <div className="max-w-2xl mx-auto text-center space-y-4 py-4">
          <h2 className="text-xl font-semibold text-foreground">
            SCR Rules & Formulas Query Center
          </h2>
          <p className="text-xs text-muted-foreground">
            Type any keyword (e.g. Gratuity, Pension, Leave, RELHS) to query the administration
            ledger.
          </p>

          <div className="relative max-w-xl mx-auto">
            <Search className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/80" />
            <input
              type="text"
              placeholder="Search index database..."
              value={searchTerm}
              onChange={handleSearchInput}
              className="h-11 w-full pl-10 pr-4 rounded-lg border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-primary/30 shadow-sm"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground pt-1 font-medium">
            <span>Quick Queries:</span>
            {["Gratuity", "Pension", "Leave", "RELHS", "CGEGIS"].map((term) => (
              <button
                key={term}
                onClick={() => handleQuickSearch(term)}
                className="bg-muted hover:bg-primary-soft/50 border border-border/80 px-2 py-0.5 rounded text-[11px] text-foreground hover:text-primary transition-colors cursor-pointer"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </div>

      {isSearching ? (
        // Search Results View
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <h3 className="font-semibold text-foreground text-sm flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              Query Results for "{searchTerm}"
            </h3>
            <Badge
              variant="outline"
              className="text-xs font-semibold bg-primary-soft/30 text-primary"
            >
              {totalMatches} matches found
            </Badge>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Rules Column */}
            <div className="space-y-3">
              <h4 className="font-bold text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-1.5 px-1">
                <ShieldCheck className="h-4 w-4 text-blue-500" />
                Rules Admissibility ({matchedRules.length})
              </h4>
              <div className="space-y-2">
                {matchedRules.map((rule) => (
                  <div
                    key={rule.id}
                    className="card-surface p-4 border border-border/80 bg-card hover:border-blue-500/20 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-sm text-foreground">{rule.name}</span>
                      <Badge
                        variant="outline"
                        className="text-[10px] uppercase font-mono font-bold"
                      >
                        {rule.id}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2 leading-relaxed">
                      {rule.description}
                    </p>
                    <div className="flex items-center gap-2 mt-2 pt-2 border-t border-border/30 text-[10px] text-muted-foreground font-medium">
                      <span>{rule.ruleNumber}</span>
                      <span className="h-1 w-1 rounded-full bg-border" />
                      <span>Ref: {rule.ruleReference}</span>
                    </div>
                  </div>
                ))}
                {matchedRules.length === 0 && (
                  <div className="text-center py-6 text-xs text-muted-foreground border border-dashed rounded-lg bg-muted/5">
                    No matching rules.
                  </div>
                )}
              </div>
            </div>

            {/* Formulas Column */}
            <div className="space-y-3">
              <h4 className="font-bold text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-1.5 px-1">
                <FileCog className="h-4 w-4 text-amber-500" />
                Calculation Formulas ({matchedFormulas.length})
              </h4>
              <div className="space-y-2">
                {matchedFormulas.map((formula) => (
                  <div
                    key={formula.id}
                    className="card-surface p-4 border border-border/80 bg-card hover:border-amber-500/20 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-sm text-foreground">{formula.name}</span>
                      <Badge
                        variant="outline"
                        className="text-[10px] uppercase font-mono font-bold"
                      >
                        {formula.id}
                      </Badge>
                    </div>
                    <div className="bg-muted/30 p-2 rounded border border-border/60 font-mono text-[11px] text-primary mt-2 break-all">
                      {formula.completeFormula}
                    </div>
                    <div className="flex items-center gap-2 mt-2 pt-2 border-t border-border/30 text-[10px] text-muted-foreground font-medium">
                      <span>Vars: {formula.variablesUsed.join(", ")}</span>
                    </div>
                  </div>
                ))}
                {matchedFormulas.length === 0 && (
                  <div className="text-center py-6 text-xs text-muted-foreground border border-dashed rounded-lg bg-muted/5">
                    No matching formulas.
                  </div>
                )}
              </div>
            </div>

            {/* Benefits Column */}
            <div className="space-y-3">
              <h4 className="font-bold text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-1.5 px-1">
                <Wallet className="h-4 w-4 text-emerald-500" />
                Settlement Benefits ({matchedBenefits.length})
              </h4>
              <div className="space-y-2">
                {matchedBenefits.map((benefit) => (
                  <div
                    key={benefit.id}
                    className="card-surface p-4 border border-border/80 bg-card hover:border-emerald-500/20 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-sm text-foreground">{benefit.name}</span>
                      <Badge
                        variant="outline"
                        className="text-[10px] uppercase font-mono font-bold"
                      >
                        {benefit.id}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2 leading-relaxed">
                      {benefit.eligibility}
                    </p>
                    <div className="mt-2 text-[11px] font-mono text-primary bg-primary-soft/10 px-2 py-0.5 rounded border border-primary/10 inline-block">
                      Uses: {benefit.formulaUsed}
                    </div>
                  </div>
                ))}
                {matchedBenefits.length === 0 && (
                  <div className="text-center py-6 text-xs text-muted-foreground border border-dashed rounded-lg bg-muted/5">
                    No matching benefit definitions.
                  </div>
                )}
              </div>
            </div>

            {/* Circulars & Documents Column */}
            <div className="space-y-3">
              <h4 className="font-bold text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-1.5 px-1">
                <ScrollText className="h-4 w-4 text-purple-500" />
                Reference Circulars & PDFs ({matchedDocuments.length})
              </h4>
              <div className="space-y-2">
                {matchedDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className="card-surface p-4 border border-border/80 bg-card hover:border-purple-500/20 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-sm text-foreground truncate max-w-[200px] sm:max-w-xs">
                        {doc.name}
                      </span>
                      <Badge
                        variant="outline"
                        className="text-[9px] uppercase tracking-wider bg-background px-1.5 py-0 shrink-0"
                      >
                        {doc.type}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-border/30 text-[10px] text-muted-foreground font-medium">
                      <span>Category: {doc.category}</span>
                      <span>Size: {doc.size}</span>
                    </div>
                  </div>
                ))}
                {matchedDocuments.length === 0 && (
                  <div className="text-center py-6 text-xs text-muted-foreground border border-dashed rounded-lg bg-muted/5">
                    No matching source documentation.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Knowledge Index Dashboard View
        <div className="grid gap-6 md:grid-cols-3">
          <div className="card-surface p-5 md:col-span-2 space-y-4">
            <h3 className="font-semibold text-foreground text-sm flex items-center gap-2 border-b border-border/60 pb-3">
              <BookOpen className="h-4.5 w-4.5 text-primary" />
              Indexed Administrative Guidelines
            </h3>

            <div className="space-y-3 text-xs text-muted-foreground leading-relaxed">
              <p>
                Welcome to the South Central Railway Knowledge Index. This lookup interface offers
                reading lookup capabilities mapped against the underlying pension rules calculation
                engine.
              </p>
              <div className="grid gap-3 sm:grid-cols-2 pt-2">
                <div className="p-3 bg-muted/20 border border-border/60 rounded-lg">
                  <div className="font-bold text-foreground mb-1">Qualifying Service Mapping</div>
                  Rule 49 defines qualifying service limits for full vs. partial pensions (minimum
                  10 years for pension eligibility, 5 years for gratuity).
                </div>
                <div className="p-3 bg-muted/20 border border-border/60 rounded-lg">
                  <div className="font-bold text-foreground mb-1">
                    Gratuity Formula Admissibility
                  </div>
                  Rule 50 limits maximum lump sum gratuity payouts to ₹20,00,000 using completed
                  six-month service emolument factors.
                </div>
              </div>
            </div>
          </div>

          <div className="card-surface p-5 space-y-4">
            <h3 className="font-semibold text-foreground text-sm flex items-center gap-2 border-b border-border/60 pb-3">
              <HelpCircle className="h-4.5 w-4.5 text-primary" />
              Quick Reference Index
            </h3>
            <ul className="space-y-2 text-xs font-semibold">
              {[
                { name: "How is LAP Leave Encashment calculated?", term: "Leave" },
                { name: "What is the enhanced family pension limit?", term: "Family Pension" },
                { name: "RELHS post-retirement medical eligibility", term: "RELHS" },
                { name: "CGEGIS subscription saving multipliers", term: "CGEGIS" },
              ].map((faq, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <ArrowRight className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                  <button
                    onClick={() => handleQuickSearch(faq.term)}
                    className="text-left text-muted-foreground hover:text-primary hover:underline transition-colors"
                  >
                    {faq.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
