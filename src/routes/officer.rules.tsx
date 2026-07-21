import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, Search, Info } from "lucide-react";
import { useState } from "react";
import { PageHeader, SectionCard, SearchBar } from "@/components/rail/common";
import { getAdminRules, AdminRule } from "@/database/adminDb";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/officer/rules")({
  component: PensionRulesPage,
});

function PensionRulesPage() {
  const allRules = getAdminRules();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRules = allRules.filter((rule) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      rule.name.toLowerCase().includes(searchLower) ||
      rule.ruleNumber.toLowerCase().includes(searchLower) ||
      rule.id.toLowerCase().includes(searchLower) ||
      rule.description.toLowerCase().includes(searchLower) ||
      rule.ruleReference.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Pension Rules Database"
        description="Comprehensive read-only repository of statutory pension rules governing Indian Railways retirement benefits."
      />

      <SectionCard>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div className="w-full md:max-w-md">
            <SearchBar
              placeholder="Search by rule name, rule number, or reference..."
              value={searchTerm}
              onChange={setSearchTerm}
            />
          </div>
          <div className="text-xs text-muted-foreground bg-muted/30 px-3 py-1.5 rounded border border-border shrink-0">
            Showing <span className="font-semibold text-foreground">{filteredRules.length}</span> of{" "}
            <span className="font-semibold text-foreground">{allRules.length}</span> rules
          </div>
        </div>

        {/* Rules Table */}
        <div className="overflow-x-auto rounded-lg border border-border bg-card">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-border bg-muted/20 text-xs font-semibold text-muted-foreground uppercase">
                <th className="px-4 py-3 font-semibold w-24">Rule ID</th>
                <th className="px-4 py-3 font-semibold">Rule details</th>
                <th className="px-4 py-3 font-semibold">Applicable Retirement Types</th>
                <th className="px-4 py-3 font-semibold w-32">Scheme</th>
                <th className="px-4 py-3 font-semibold w-28 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredRules.map((rule) => (
                <tr key={rule.id} className="hover:bg-muted/10 transition-colors align-top">
                  <td className="px-4 py-4 font-mono text-xs font-bold text-primary">{rule.id}</td>
                  <td className="px-4 py-4 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">{rule.name}</span>
                      <span className="text-[10px] bg-muted text-muted-foreground border border-border px-1.5 py-0.5 rounded font-mono">
                        {rule.ruleNumber}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2 max-w-xl">
                      {rule.description}
                    </p>
                    <div className="text-[11px] text-primary/80 font-medium pt-1">
                      Reference: {rule.ruleReference}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {rule.applicableRetirementTypes.map((type) => (
                        <span
                          key={type}
                          className="text-[10px] bg-primary-soft/40 text-primary border border-primary/10 px-1.5 py-0.5 rounded"
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <Badge
                      variant={rule.applicableScheme.includes("OPS") ? "default" : "secondary"}
                      className="text-[10px] px-2 py-0.5 font-bold"
                    >
                      {rule.applicableScheme}
                    </Badge>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      {rule.status}
                    </span>
                  </td>
                </tr>
              ))}
              {filteredRules.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                    No rules found matching "{searchTerm}".
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}
