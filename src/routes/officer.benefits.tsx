import { createFileRoute } from "@tanstack/react-router";
import { Wallet, Search, CheckCircle, FileText, ChevronRight } from "lucide-react";
import { useState } from "react";
import { PageHeader, SectionCard, SearchBar } from "@/components/rail/common";
import { getAdminBenefits, AdminBenefit } from "@/database/adminDb";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/officer/benefits")({
  component: SettlementBenefitsPage,
});

function SettlementBenefitsPage() {
  const benefits = getAdminBenefits();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBenefits = benefits.filter((b) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      b.name.toLowerCase().includes(searchLower) ||
      b.eligibility.toLowerCase().includes(searchLower) ||
      b.formulaUsed.toLowerCase().includes(searchLower) ||
      b.ruleReference.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settlement Benefits Index"
        description="Statutory reference ledger for one-time and monthly recurring benefits admissible to South Central Railway staff."
      />

      <SectionCard>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
          <div className="w-full md:max-w-md">
            <SearchBar
              placeholder="Search by benefit name, formula, or eligibility details..."
              value={searchTerm}
              onChange={setSearchTerm}
            />
          </div>
          <div className="text-xs text-muted-foreground bg-muted/30 px-3 py-1.5 rounded border border-border shrink-0 font-medium">
            Showing <span className="font-bold text-foreground">{filteredBenefits.length}</span> of{" "}
            <span className="font-bold text-foreground">{benefits.length}</span> benefit records
          </div>
        </div>

        {/* Benefits Cards Grid */}
        <div className="grid gap-6">
          {filteredBenefits.map((b) => (
            <div
              key={b.id}
              className="card-surface p-5 border border-border/80 hover:border-primary/30 transition-all flex flex-col md:flex-row gap-5 justify-between"
            >
              {/* Left Column: Details */}
              <div className="space-y-3 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold text-base text-foreground leading-tight">
                    {b.name}
                  </h3>
                  <Badge
                    variant="secondary"
                    className="font-mono text-[9px] uppercase tracking-wider bg-muted/60 text-muted-foreground border-border/80"
                  >
                    {b.id}
                  </Badge>
                  <span className="text-xs text-muted-foreground ml-auto md:ml-0 font-medium">
                    Ref: {b.ruleReference}
                  </span>
                </div>

                <div className="text-sm text-foreground/90 leading-relaxed bg-muted/10 p-3 rounded-lg border border-border/30">
                  <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">
                    Admissibility & Eligibility Criteria
                  </div>
                  {b.eligibility}
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">
                      Computation Method
                    </div>
                    <div className="text-xs text-primary font-mono bg-primary-soft/10 border border-primary/10 rounded px-2 py-1 inline-block">
                      {b.formulaUsed}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">
                      Required Documents Checklist
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {b.requiredDocuments.map((doc) => (
                        <span
                          key={doc}
                          className="text-[10px] bg-background text-muted-foreground border border-border/60 px-2 py-0.5 rounded flex items-center gap-1"
                        >
                          <FileText className="h-3 w-3 text-muted-foreground/80" />
                          {doc}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Retirement types / Status */}
              <div className="w-full md:w-64 border-t md:border-t-0 md:border-l border-border/40 pt-4 md:pt-0 md:pl-5 flex flex-col justify-between shrink-0">
                <div className="space-y-2">
                  <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Applicable Retirement Types
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {b.applicableRetirementTypes.map((type) => (
                      <span
                        key={type}
                        className="text-[10px] bg-primary-soft/40 text-primary border border-primary/10 px-1.5 py-0.5 rounded font-medium"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/30 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground font-semibold">Status</span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    {b.status}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {filteredBenefits.length === 0 && (
            <div className="text-center py-12 text-sm text-muted-foreground">
              No benefits found matching "{searchTerm}".
            </div>
          )}
        </div>
      </SectionCard>
    </div>
  );
}
