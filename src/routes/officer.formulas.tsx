import { createFileRoute } from "@tanstack/react-router";
import { FileCog, Variable, Search, Scale } from "lucide-react";
import { useState } from "react";
import { PageHeader, SectionCard, SearchBar } from "@/components/rail/common";
import { getAdminFormulas, AdminFormula } from "@/database/adminDb";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/officer/formulas")({
  component: FormulaLibraryPage,
});

function FormulaLibraryPage() {
  const formulas = getAdminFormulas();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFormulas = formulas.filter((f) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      f.name.toLowerCase().includes(searchLower) ||
      f.completeFormula.toLowerCase().includes(searchLower) ||
      f.ruleReference.toLowerCase().includes(searchLower) ||
      f.variablesUsed.some((v) => v.toLowerCase().includes(searchLower))
    );
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Formula Library"
        description="Statutory mathematical models used by the RailAssist core calculation engine to compute retirement payouts."
      />

      <SectionCard>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
          <div className="w-full md:max-w-md">
            <SearchBar
              placeholder="Search by formula name, variable, or rule reference..."
              value={searchTerm}
              onChange={setSearchTerm}
            />
          </div>
          <div className="text-xs text-muted-foreground bg-muted/30 px-3 py-1.5 rounded border border-border shrink-0 font-medium">
            Showing <span className="font-bold text-foreground">{filteredFormulas.length}</span> of{" "}
            <span className="font-bold text-foreground">{formulas.length}</span> formula models
          </div>
        </div>

        {/* Formulas Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {filteredFormulas.map((f) => (
            <div
              key={f.id}
              className="card-surface p-5 border border-border/80 hover:border-primary/45 transition-colors flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between gap-2 border-b border-border/40 pb-3">
                  <div className="min-w-0">
                    <h3 className="font-semibold text-base text-foreground leading-tight">{f.name}</h3>
                    <p className="text-[11px] text-muted-foreground mt-1 flex items-center gap-1">
                      <Scale className="h-3 w-3 shrink-0" />
                      Rule Ref: {f.ruleReference}
                    </p>
                  </div>
                  <Badge variant="outline" className="font-mono text-[10px] uppercase tracking-wider shrink-0 bg-background">
                    {f.id}
                  </Badge>
                </div>

                {/* Math Formula Display Box */}
                <div className="bg-muted/40 p-4 rounded-lg border border-border/60 font-mono text-xs text-foreground font-semibold leading-relaxed break-all relative group overflow-x-auto">
                  <div className="absolute right-2 top-2 text-[9px] bg-background border border-border px-1 py-0.5 rounded text-muted-foreground uppercase font-bold tracking-wider opacity-60">
                    Formula Expression
                  </div>
                  <div className="pt-2 text-primary">{f.completeFormula}</div>
                </div>

                {/* Variables List */}
                <div className="space-y-1.5">
                  <div className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                    <Variable className="h-3.5 w-3.5" />
                    Variables Map:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {f.variablesUsed.map((v) => (
                      <span
                        key={v}
                        className="font-mono text-[10px] bg-background text-muted-foreground border border-border px-2 py-0.5 rounded hover:text-primary transition-colors"
                      >
                        {v}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-5 pt-3 border-t border-border/30 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1">
                  <span className="text-muted-foreground">Scheme:</span>
                  <span className="font-semibold text-foreground">{f.applicableScheme}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wider">
                    {f.status}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {filteredFormulas.length === 0 && (
            <div className="md:col-span-2 text-center py-12 text-sm text-muted-foreground">
              No formulas found matching "{searchTerm}".
            </div>
          )}
        </div>
      </SectionCard>
    </div>
  );
}
