import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Bot, ClipboardCheck, FileSpreadsheet } from "lucide-react";
import { PageHeader } from "@/components/rail/common";

export const Route = createFileRoute("/employee/")({
  component: EmployeeDashboard,
});

export function EmployeeDashboard() {
  return (
    <div className="space-y-6 pb-6">
      <PageHeader
        title="Employee Dashboard"
        description="A readable portal shell for railway employees to access settlement and pension advisory modules."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {/* Box 1: Settlement Assessment (Big Box) */}
        <Link
          to="/employee/benefits"
          className="group card-surface p-8 md:p-10 min-h-[340px] flex flex-col justify-between border border-border/80 hover:border-primary/50 hover:shadow-elevated transition-all rounded-xl"
        >
          <div>
            <div className="h-14 w-14 rounded-xl bg-primary-soft text-primary grid place-items-center mb-6 group-hover:scale-105 transition-transform ring-1 ring-primary/20">
              <ClipboardCheck className="h-7 w-7" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
              Settlement Assessment
            </h2>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed">
              Begin the guided settlement assessment workflow to calculate qualifying service, pay matrix details, pension, gratuity, and leave encashment entitlement.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-border/60 flex items-center text-sm font-semibold text-primary">
            <span>Open module</span>
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* Box 2: Settlement Results (Big Box) */}
        <Link
          to="/employee/result"
          className="group card-surface p-8 md:p-10 min-h-[340px] flex flex-col justify-between border border-border/80 hover:border-primary/50 hover:shadow-elevated transition-all rounded-xl"
        >
          <div>
            <div className="h-14 w-14 rounded-xl bg-primary-soft text-primary grid place-items-center mb-6 group-hover:scale-105 transition-transform ring-1 ring-primary/20">
              <FileSpreadsheet className="h-7 w-7" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
              Settlement Results
            </h2>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed">
              View generated settlement certificates, pension computation breakdowns, one-time benefit entitlements, and official South Central Railway calculation reports.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-border/60 flex items-center text-sm font-semibold text-primary">
            <span>Open module</span>
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>

      {/* Floating Action Button for Railway Knowledge Assistant (bot) */}
      <div className="fixed right-6 top-36 z-40 print:hidden">
        <Link
          to="/employee/assistant"
          title="Railway Knowledge Assistant"
          className="h-12 w-12 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:scale-105 transition-transform ring-2 ring-background"
        >
          <Bot className="h-6 w-6" />
        </Link>
      </div>
    </div>
  );
}
