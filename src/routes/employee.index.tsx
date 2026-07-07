import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, StatCard } from "@/components/rail/common";
import { Wallet, FileText, ShieldCheck, Bot, ClipboardCheck, ArrowRight } from "lucide-react";
import { CIRCULARS, RULES } from "@/lib/rail-data";

export const Route = createFileRoute("/employee/")({
  component: EmployeeDashboard,
});

function EmployeeDashboard() {
  return (
    <>
      <PageHeader
        title="Welcome, R. Kumar"
        description="Get instant clarity on your retirement benefits, eligibility criteria and applicable railway rules."
      />

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Total Benefits" value={8} hint="Pension, Gratuity, RELHS…" icon={<Wallet className="h-4 w-4" />} />
        <StatCard label="Active Circulars" value={CIRCULARS.length} hint="Referenced by advisory" icon={<FileText className="h-4 w-4" />} />
        <StatCard label="Active Rules" value={RULES.length} hint="Rule-based engine" icon={<ShieldCheck className="h-4 w-4" />} />
        <StatCard label="AI Assistant" value="Ready" hint="Grounded in circulars" icon={<Bot className="h-4 w-4" />} />
      </div>

      <div className="grid gap-4 md:grid-cols-3 mt-6">
        <Link to="/employee/benefits" className="card-surface p-6 hover:border-primary/40 hover:shadow-elevated transition-all group md:col-span-2">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary-soft text-primary grid place-items-center">
              <ClipboardCheck className="h-5 w-5" />
            </div>
            <div>
              <div className="font-medium">Check Benefits</div>
              <div className="text-sm text-muted-foreground">Enter your service details to see all eligible benefits with reasons and calculations.</div>
            </div>
            <ArrowRight className="h-4 w-4 ml-auto text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
          </div>
        </Link>

        <Link to="/employee/assistant" className="card-surface p-6 hover:border-primary/40 hover:shadow-elevated transition-all group">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary-soft text-primary grid place-items-center">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <div className="font-medium">Ask the Assistant</div>
              <div className="text-sm text-muted-foreground">Get plain-language answers.</div>
            </div>
          </div>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 mt-6">
        <div className="card-surface p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium">Latest Circulars</h3>
            <Link to="/employee/circulars" className="text-xs text-primary hover:underline">View all</Link>
          </div>
          <ul className="divide-y">
            {CIRCULARS.slice(0, 4).map((c) => (
              <li key={c.id} className="py-2.5 flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-medium">{c.name}</div>
                  <div className="text-xs text-muted-foreground">{c.category} · {c.date}</div>
                </div>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-muted text-muted-foreground">{c.id}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="card-surface p-5">
          <h3 className="font-medium mb-3">Recently Updated Rules</h3>
          <ul className="divide-y">
            {RULES.slice(0, 4).map((r) => (
              <li key={r.id} className="py-2.5 flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-medium">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{r.caseType} · Effective {r.effective}</div>
                </div>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-primary-soft text-primary">{r.id}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
