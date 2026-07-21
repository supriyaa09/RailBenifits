import { createFileRoute } from "@tanstack/react-router";
import { Settings, Shield, Cpu, Database, Eye, RefreshCw, Layers, Award } from "lucide-react";
import { PageHeader, SectionCard } from "@/components/rail/common";
import { getSystemConfig } from "@/database/adminDb";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/officer/configuration")({
  component: SystemConfigurationPage,
});

function SystemConfigurationPage() {
  const config = getSystemConfig();

  const configs = [
    {
      group: "Policy Governance",
      icon: Shield,
      items: [
        {
          label: "Railway Rule Version",
          value: config.ruleVersion,
          hint: "Statutory rules engine baseline",
        },
        {
          label: "Last Rules Ref Update",
          value: config.lastFormulaUpdate,
          hint: "Revision synchronization date",
        },
      ],
    },
    {
      group: "Calculation Core",
      icon: Cpu,
      items: [
        {
          label: "Formula Version",
          value: config.formulaVersion,
          hint: "Mathematical calculation model code version",
        },
        {
          label: "Current Pay Matrix",
          value: config.currentPayMatrix,
          hint: "Admissible salary matrix tiers",
        },
      ],
    },
    {
      group: "Services & Databases",
      icon: Database,
      items: [
        {
          label: "Database Status",
          value: config.databaseStatus,
          badge: "Active",
          hint: "Storage engine status",
        },
        {
          label: "AI Assistance Engine",
          value: config.aiModel,
          hint: "Large Language Model backing query indexer",
        },
      ],
    },
    {
      group: "Application Compliance",
      icon: Eye,
      items: [
        {
          label: "Accessibility Standard",
          value: config.accessibilityStatus,
          badge: "Compliant",
          hint: "UI inclusion parameters",
        },
        {
          label: "Application Version",
          value: config.applicationVersion,
          hint: "Build version for demo verification",
        },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="System Configuration"
        description="Core policy rules parameters, database service statuses, and compliance levels for RailAssist."
      />

      <div className="grid gap-6 md:grid-cols-2">
        {configs.map((grp) => {
          const GroupIcon = grp.icon;
          return (
            <SectionCard key={grp.group}>
              <div className="flex items-center gap-2 border-b border-border/55 pb-3 mb-4">
                <GroupIcon className="h-5 w-5 text-primary shrink-0" />
                <h3 className="font-semibold text-foreground text-sm leading-none">{grp.group}</h3>
              </div>
              <div className="space-y-4">
                {grp.items.map((item) => (
                  <div
                    key={item.label}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-lg border border-border/40 bg-muted/5 hover:bg-muted/10 transition-colors"
                  >
                    <div>
                      <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                        {item.label}
                      </div>
                      <div className="text-sm font-semibold text-foreground mt-0.5">
                        {item.value}
                      </div>
                      <div className="text-[10px] text-muted-foreground mt-0.5">{item.hint}</div>
                    </div>
                    {item.badge && (
                      <Badge
                        variant="outline"
                        className="h-6 text-[10px] font-bold bg-emerald-500/10 text-emerald-500 border-emerald-500/20 shrink-0 self-start sm:self-center"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </SectionCard>
          );
        })}
      </div>

      {/* Database Reset Action placeholder */}
      <SectionCard>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-lg bg-red-500/5 border border-red-500/10">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-semibold text-foreground text-sm">Reset Local Database Tables</h4>
            <p className="text-xs text-muted-foreground">
              Re-seeding will clear document uploads and restore default rules parameters.
            </p>
          </div>
          <button
            onClick={() => {
              if (confirm("Reset local rules database to initial values?")) {
                if (typeof window !== "undefined") {
                  window.localStorage.removeItem("railassist:admin:rules");
                  window.localStorage.removeItem("railassist:admin:formulas");
                  window.localStorage.removeItem("railassist:admin:benefits");
                  window.localStorage.removeItem("railassist:admin:documents");
                  window.localStorage.removeItem("railassist:admin:config");
                  window.localStorage.removeItem("railassist:admin:updates");
                  alert("Local Storage Tables Re-seeded. Reloading...");
                  window.location.reload();
                }
              }
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-red-500/20 hover:border-red-500/40 bg-red-500/10 hover:bg-red-500/20 text-red-500 text-xs font-bold transition-all cursor-pointer shrink-0"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Reset & Re-Seed
          </button>
        </div>
      </SectionCard>
    </div>
  );
}
