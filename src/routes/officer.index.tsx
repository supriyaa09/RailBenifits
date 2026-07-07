import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, StatCard } from "@/components/rail/common";
import { ShieldCheck, FileText, Wallet, Activity, Upload, Plus } from "lucide-react";
import { CIRCULARS, RULES, LOGS } from "@/lib/rail-data";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/officer/")({
  component: OfficerDashboard,
});

function OfficerDashboard() {
  return (
    <>
      <PageHeader
        title="Officer Dashboard"
        description="Administer the rule base, circular library and AI knowledge sources that power the advisory engine."
        actions={
          <>
            <Button variant="outline" asChild><Link to="/officer/circulars"><Upload className="h-4 w-4 mr-2" />Upload Circular</Link></Button>
            <Button asChild><Link to="/officer/rules"><Plus className="h-4 w-4 mr-2" />New Rule</Link></Button>
          </>
        }
      />

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Total Benefits" value={8} hint="Managed schemes" icon={<Wallet className="h-4 w-4" />} />
        <StatCard label="Active Rules" value={RULES.length} hint="Decision engine" icon={<ShieldCheck className="h-4 w-4" />} />
        <StatCard label="Circulars" value={CIRCULARS.length} hint="Referenced" icon={<FileText className="h-4 w-4" />} />
        <StatCard label="System Events" value={LOGS.length} hint="Last 7 days" icon={<Activity className="h-4 w-4" />} />
      </div>

      <div className="grid gap-4 md:grid-cols-2 mt-6">
        <div className="card-surface p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium">Recently Updated Rules</h3>
            <Link to="/officer/rules" className="text-xs text-primary hover:underline">Manage</Link>
          </div>
          <div className="divide-y">
            {RULES.slice(0, 5).map((r) => (
              <div key={r.id} className="py-2.5 flex items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-medium">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{r.caseType} · {r.effective}</div>
                </div>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-primary-soft text-primary">{r.id}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card-surface p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium">Recent Activity</h3>
            <Link to="/officer/logs" className="text-xs text-primary hover:underline">All logs</Link>
          </div>
          <ul className="space-y-3">
            {LOGS.map((l, i) => (
              <li key={i} className="flex gap-3 text-sm">
                <div className={`h-2 w-2 rounded-full mt-2 ${l.level === "warn" ? "bg-warning" : "bg-primary"}`} />
                <div className="flex-1">
                  <div>{l.action}</div>
                  <div className="text-xs text-muted-foreground">{l.user} · {l.ts}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
