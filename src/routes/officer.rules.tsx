import { createFileRoute } from "@tanstack/react-router";
import {
  ShieldCheck,
  Search,
  Info,
  FileCog,
  Variable,
  Scale,
  History,
  Calendar,
  Layers,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import { useState, useEffect } from "react";
import { PageHeader, SectionCard, SearchBar } from "@/components/rail/common";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/officer/rules")({
  component: UnifiedRulesPage,
});

function UnifiedRulesPage() {
  const [activeTab, setActiveTab] = useState<"rules" | "formulas" | "versions">("rules");
  const [searchTerm, setSearchTerm] = useState("");
  const [dbData, setDbData] = useState<any>({
    rules: [],
    ruleVersions: [],
    circulars: [],
  });
  const [loading, setLoading] = useState(true);

  // Load live DB data for dynamic history and versions
  const fetchDbData = async () => {
    try {
      const res = await fetch("/api/rules?action=get-data");
      if (res.ok) {
        const payload = await res.json();
        setDbData(payload);
      }
    } catch (err) {
      console.error("Rules failed to sync DB:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDbData();
  }, []);

  // Rules static catalog from seeded admin values as fallback or extension
  const baselineRules = [
    {
      id: "R203",
      name: "Basic Pension entitlement",
      ruleNumber: "Rule 54 (1993)",
      description: "Basic pension is payable to retiring employees who have completed at least 10 years of qualifying service. Calculated at 50% of the last emoluments or average last 10 months pay (whichever is higher). Minimum limit is 9,000 INR, maximum limit 125,000 INR.",
      applicableRetirementTypes: ["Superannuation", "VRS", "Medical Invalidation"],
      applicableScheme: "OPS / UPS",
      ruleReference: "Chapter V, Rule 54(1) of Railway Pension Rules",
    },
    {
      id: "R310",
      name: "Ordinary Family Pension",
      ruleNumber: "Rule 55 (1993)",
      description: "Paid to the spouse or nominee of a deceased employee. Calculated at 30% of the last basic pay, subject to a minimum of 9,000 INR and a maximum of 75,000 INR.",
      applicableRetirementTypes: ["Death while in Service", "Post-retirement Death"],
      applicableScheme: "OPS / UPS / NPS",
      ruleReference: "Rule 55(2) of Railway Services (Pension) Rules",
    },
    {
      id: "R312",
      name: "Enhanced Family Pension",
      ruleNumber: "Rule 55-A (1993)",
      description: "Paid at 50% of the last basic pay for a maximum of 7 years from the date of death or until the date the employee would have reached 67 years of age, whichever is earlier.",
      applicableRetirementTypes: ["Death while in Service"],
      applicableScheme: "OPS / UPS",
      ruleReference: "Rule 55(3)(a) of Railway Services (Pension) Rules",
    },
    {
      id: "R405",
      name: "Retirement & Death Gratuity limit",
      ruleNumber: "Rule 70 (1993)",
      description: "Gratuity is calculated at 1/4th of emoluments + DA for each completed 6-month period of service. Capped at 16.5 times emoluments + DA. Overall ceiling limits are subject to board circular revisions (currently 2,000,000 INR but revised to 2,500,000 INR in recent circulars).",
      applicableRetirementTypes: ["Superannuation", "VRS", "Medical Invalidation", "Death while in Service"],
      applicableScheme: "OPS / UPS / NPS",
      ruleReference: "Rule 70(1)(b) of Railway Services (Pension) Rules",
    },
    {
      id: "R502",
      name: "LAP & LHAP Encashment limits",
      ruleNumber: "Rule 39 (1993)",
      description: "Encashment of accumulated Leave on Average Pay (LAP) and Least Half Average Pay (LHAP) up to a combined maximum of 300 days upon retirement. Formula: (Basic Pay + DA)/30 * total encashable days.",
      applicableRetirementTypes: ["Superannuation", "VRS", "Medical Invalidation", "Death while in Service"],
      applicableScheme: "OPS / UPS / NPS / NA",
      ruleReference: "Rule 39 of Railway Leave Rules, 1993",
    },
  ];

  // Formulas static catalog
  const formulasCatalog = [
    {
      id: "OPS_BASIC_PENSION",
      name: "Basic Pension Calculation",
      applicableScheme: "OPS",
      ruleReference: "Rule 54 of Railway Services (Pension) Rules, 1993",
      completeFormula: "0.50 * Max(Emoluments, AverageEmoluments) * (SanctionPercentage / 100)",
      variablesUsed: ["Emoluments", "AverageEmoluments", "SanctionPercentage"],
      status: "Active",
    },
    {
      id: "FAMILY_PENSION",
      name: "Family Pension Calculation",
      applicableScheme: "OPS / UPS",
      ruleReference: "Rule 55 of Railway Services (Pension) Rules, 1993",
      completeFormula: "0.30 * Emoluments",
      variablesUsed: ["Emoluments"],
      status: "Active",
    },
    {
      id: "RETIREMENT_GRATUITY",
      name: "Retirement Gratuity Calculation",
      applicableScheme: "OPS / UPS",
      ruleReference: "Rule 70 of Railway Services (Pension) Rules, 1993",
      completeFormula: "Min(MaximumLimit, 0.25 * (Emoluments + DA) * QualifyingServiceYears * 2)",
      variablesUsed: ["Emoluments", "DA", "QualifyingServiceYears", "MaximumLimit"],
      status: "Active",
    },
    {
      id: "OPS_LEAVE_ENCASHMENT",
      name: "Leave Encashment (LAP + LHAP)",
      applicableScheme: "OPS / UPS / NPS",
      ruleReference: "Rule 39 of Railway Services (Leave) Rules, 1993",
      completeFormula: "((BasicPay + (BasicPay * DA / 100)) / 30) * Min(300, LAPDays + (LHAPDays / 2))",
      variablesUsed: ["BasicPay", "DA", "LAPDays", "LHAPDays"],
      status: "Active",
    },
  ];

  // Search filter logic
  const filteredRules = baselineRules.filter((rule) => {
    const term = searchTerm.toLowerCase();
    return (
      rule.name.toLowerCase().includes(term) ||
      rule.id.toLowerCase().includes(term) ||
      rule.description.toLowerCase().includes(term) ||
      rule.ruleNumber.toLowerCase().includes(term)
    );
  });

  const filteredFormulas = formulasCatalog.filter((f) => {
    const term = searchTerm.toLowerCase();
    return (
      f.name.toLowerCase().includes(term) ||
      f.completeFormula.toLowerCase().includes(term) ||
      f.variablesUsed.some((v) => v.toLowerCase().includes(term))
    );
  });

  const filteredVersions = dbData.ruleVersions.filter((v: any) => {
    const term = searchTerm.toLowerCase();
    return (
      v.rule_id.toLowerCase().includes(term) ||
      v.rule_number.toLowerCase().includes(term) ||
      v.formula.toLowerCase().includes(term)
    );
  });

  return (
    <div className="space-y-8 pb-12 max-w-[1400px] mx-auto">
      <PageHeader
        title="Railway Rules & Formulas Directory"
        description="Consolidated portal of statutory railway retirement rules, active mathematical calculation formulas, and version database."
      />

      {/* Tabs */}
      <div className="flex border-b border-border gap-2 overflow-x-auto print:hidden">
        <button
          onClick={() => {
            setActiveTab("rules");
            setSearchTerm("");
          }}
          className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 transition-all cursor-pointer shrink-0 ${
            activeTab === "rules"
              ? "border-primary text-primary bg-primary/5"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <ShieldCheck className="h-4 w-4" />
          Active Rules Table
        </button>
        <button
          onClick={() => {
            setActiveTab("formulas");
            setSearchTerm("");
          }}
          className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 transition-all cursor-pointer shrink-0 ${
            activeTab === "formulas"
              ? "border-primary text-primary bg-primary/5"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <FileCog className="h-4 w-4" />
          Formula Library
        </button>
        <button
          onClick={() => {
            setActiveTab("versions");
            setSearchTerm("");
          }}
          className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 transition-all cursor-pointer shrink-0 ${
            activeTab === "versions"
              ? "border-primary text-primary bg-primary/5"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <History className="h-4 w-4" />
          Rule Versions Database
        </button>
      </div>

      {/* Tab Contents */}
      <div className="space-y-6">
        {/* TAB 1: Rules Table */}
        {activeTab === "rules" && (
          <SectionCard title="Statutory Pension & Gratuity Rules">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div className="w-full md:max-w-md">
                <SearchBar
                  placeholder="Search rules catalog..."
                  value={searchTerm}
                  onChange={setSearchTerm}
                />
              </div>
              <div className="text-xs text-muted-foreground bg-muted/40 px-3 py-1.5 rounded border border-border shrink-0">
                Showing <span className="font-semibold text-foreground">{filteredRules.length}</span> of{" "}
                <span className="font-semibold text-foreground">{baselineRules.length}</span> rules
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-border/50 bg-card">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border bg-muted/20 text-xs font-bold text-muted-foreground uppercase">
                    <th className="px-4 py-3 w-28">Rule Code</th>
                    <th className="px-4 py-3">Rule Description</th>
                    <th className="px-4 py-3">Applicable Retirement Modes</th>
                    <th className="px-4 py-3 w-32">Pension Scheme</th>
                    <th className="px-4 py-3 w-28 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {filteredRules.map((rule) => (
                    <tr key={rule.id} className="hover:bg-muted/5 transition-colors align-top">
                      <td className="px-4 py-4 font-mono text-xs font-bold text-primary">{rule.id}</td>
                      <td className="px-4 py-4 space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-foreground text-sm">{rule.name}</span>
                          <Badge variant="outline" className="text-[10px] font-mono text-muted-foreground bg-background">
                            {rule.ruleNumber}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed max-w-2xl">
                          {rule.description}
                        </p>
                        <div className="text-[10px] text-primary font-bold flex items-center gap-1">
                          <Scale className="h-3 w-3" />
                          Reference: {rule.ruleReference}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex flex-wrap gap-1.5 max-w-[280px]">
                          {rule.applicableRetirementTypes.map((type) => (
                            <Badge
                              key={type}
                              variant="secondary"
                              className="text-[9px] font-medium bg-muted text-muted-foreground hover:bg-muted"
                            >
                              {type}
                            </Badge>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <Badge
                          variant="outline"
                          className="text-[10px] font-mono border-primary/20 bg-primary/5 text-primary"
                        >
                          {rule.applicableScheme}
                        </Badge>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          Active
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionCard>
        )}

        {/* TAB 2: Formula Library */}
        {activeTab === "formulas" && (
          <SectionCard title="Advisory Calculator Formulas">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div className="w-full md:max-w-md">
                <SearchBar
                  placeholder="Search formulas database..."
                  value={searchTerm}
                  onChange={setSearchTerm}
                />
              </div>
              <div className="text-xs text-muted-foreground bg-muted/40 px-3 py-1.5 rounded border border-border shrink-0 font-medium">
                Showing <span className="font-bold text-foreground">{filteredFormulas.length}</span> of{" "}
                <span className="font-bold text-foreground">{formulasCatalog.length}</span> models
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {filteredFormulas.map((f) => (
                <div
                  key={f.id}
                  className="card-surface p-5 border border-border/50 bg-card rounded-xl hover:border-primary/30 transition-all flex flex-col justify-between shadow-soft"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-2 border-b border-border/40 pb-3">
                      <div>
                        <h3 className="font-semibold text-sm text-foreground">{f.name}</h3>
                        <p className="text-[10px] text-muted-foreground mt-0.5 flex items-center gap-1">
                          <Scale className="h-3 w-3 shrink-0" />
                          Ref: {f.ruleReference}
                        </p>
                      </div>
                      <Badge variant="outline" className="font-mono text-[9px] shrink-0 bg-background">
                        {f.id}
                      </Badge>
                    </div>

                    <div className="bg-muted/40 p-4 rounded-lg border border-border/40 font-mono text-[11px] text-foreground font-semibold leading-relaxed relative overflow-x-auto">
                      <div className="pt-2 text-primary">{f.completeFormula}</div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="text-xs font-bold text-muted-foreground flex items-center gap-1">
                        <Variable className="h-3 w-3" />
                        Variables Map:
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {f.variablesUsed.map((v) => (
                          <span
                            key={v}
                            className="font-mono text-[10px] bg-background text-muted-foreground border border-border/60 px-2 py-0.5 rounded"
                          >
                            {v}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-border/30 flex items-center justify-between text-xs font-medium">
                    <div className="flex items-center gap-1">
                      <span className="text-muted-foreground text-[10px] uppercase">Scheme:</span>
                      <Badge variant="outline" className="text-[10px] font-mono bg-background">
                        {f.applicableScheme}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                        {f.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        )}

        {/* TAB 3: Rule Versions log */}
        {activeTab === "versions" && (
          <SectionCard title="Chronological Version Database">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div className="w-full md:max-w-md">
                <SearchBar
                  placeholder="Search versions history by Rule ID..."
                  value={searchTerm}
                  onChange={setSearchTerm}
                />
              </div>
              <div className="text-xs text-muted-foreground bg-muted/40 px-3 py-1.5 rounded border border-border shrink-0">
                Showing <span className="font-semibold text-foreground">{filteredVersions.length}</span> of{" "}
                <span className="font-semibold text-foreground">{dbData.ruleVersions.length}</span> approved versions
              </div>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary mx-auto" />
              </div>
            ) : filteredVersions.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground text-sm">
                No rule versions match the filter query.
              </div>
            ) : (
              <div className="overflow-x-auto rounded-xl border border-border/50 bg-card">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-border bg-muted/20 text-xs font-bold text-muted-foreground uppercase">
                      <th className="px-4 py-3">Rule ID</th>
                      <th className="px-4 py-3 text-center">Version</th>
                      <th className="px-4 py-3">Formula</th>
                      <th className="px-4 py-3 text-right">Min Limit</th>
                      <th className="px-4 py-3 text-right">Max Limit</th>
                      <th className="px-4 py-3">Effective Date</th>
                      <th className="px-4 py-3">Circular Reference</th>
                      <th className="px-4 py-3">Approver</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/30">
                    {filteredVersions.map((v: any) => (
                      <tr key={v.id} className="hover:bg-muted/5 transition-colors font-medium">
                        <td className="px-4 py-3.5 font-mono text-xs text-primary font-bold">{v.rule_id}</td>
                        <td className="px-4 py-3.5 text-center font-mono font-bold text-emerald-500">v{v.version}</td>
                        <td className="px-4 py-3.5 font-mono text-[11px] text-foreground max-w-xs truncate" title={v.formula}>{v.formula}</td>
                        <td className="px-4 py-3.5 text-right text-foreground">{v.minimum_limit !== null ? `₹${v.minimum_limit.toLocaleString("en-IN")}` : "N/A"}</td>
                        <td className="px-4 py-3.5 text-right text-foreground">{v.maximum_limit !== null ? `₹${v.maximum_limit.toLocaleString("en-IN")}` : "N/A"}</td>
                        <td className="px-4 py-3.5">
                          <span className="inline-flex items-center gap-1 text-[11px]">
                            <Calendar className="h-3 w-3 text-muted-foreground" />
                            {v.effective_date}
                          </span>
                        </td>
                        <td className="px-4 py-3.5 text-foreground">{v.rule_number}</td>
                        <td className="px-4 py-3.5 text-muted-foreground text-xs">{v.approved_by}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </SectionCard>
        )}
      </div>
    </div>
  );
}
