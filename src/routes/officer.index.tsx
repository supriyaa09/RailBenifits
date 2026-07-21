import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ShieldCheck,
  FileCog,
  Wallet,
  ScrollText,
  Database,
  Settings,
  Clock,
  ArrowRight,
  TrendingUp,
  FileText,
} from "lucide-react";
import { PageHeader, StatCard } from "@/components/rail/common";
import {
  getAdminRules,
  getAdminFormulas,
  getAdminBenefits,
  getAdminDocuments,
  getSystemConfig,
  getRecentUpdates,
} from "@/database/adminDb";

export const Route = createFileRoute("/officer/")({
  component: OfficerDashboard,
});

function OfficerDashboard() {
  const rules = getAdminRules();
  const formulas = getAdminFormulas();
  const benefits = getAdminBenefits();
  const docs = getAdminDocuments();
  const config = getSystemConfig();
  const updates = getRecentUpdates();

  // Links list for quick access
  const quickLinks = [
    {
      title: "Pension Rules",
      to: "/officer/rules",
      count: rules.length,
      icon: ShieldCheck,
      color: "text-blue-500 bg-blue-500/10 border-blue-500/20",
    },
    {
      title: "Formula Library",
      to: "/officer/formulas",
      count: formulas.length,
      icon: FileCog,
      color: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    },
    {
      title: "Settlement Benefits",
      to: "/officer/benefits",
      count: benefits.length,
      icon: Wallet,
      color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    },
    {
      title: "Document Repository",
      to: "/officer/documents",
      count: docs.length,
      icon: ScrollText,
      color: "text-purple-500 bg-purple-500/10 border-purple-500/20",
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Railway Administration Portal"
        description="Official South Central Railway administrative console for settlement guidelines, formulas, and benefit configurations."
      />

      {/* Stats Cards Row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total Pension Rules"
          value={rules.length}
          hint="Admissible active rules"
          icon={<ShieldCheck className="h-5 w-5" />}
        />
        <StatCard
          label="Active Formulas"
          value={formulas.length}
          hint="Settlement computation models"
          icon={<FileCog className="h-5 w-5" />}
        />
        <StatCard
          label="Settlement Benefits"
          value={benefits.length}
          hint="Entitlements indexed"
          icon={<Wallet className="h-5 w-5" />}
        />
        <StatCard
          label="Railway Documents"
          value={docs.length}
          hint="Circulars, Manuals, & Orders"
          icon={<ScrollText className="h-5 w-5" />}
        />
      </div>

      {/* Sub-row for System Version info */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="card-surface p-5 flex flex-col justify-between">
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">
              Current Rule Book
            </div>
            <div className="text-lg font-semibold text-foreground mt-2">{config.ruleVersion}</div>
          </div>
          <div className="text-xs text-muted-foreground mt-3 pt-2 border-t border-border/40">
            Governing retirement schemes: OPS, NPS, UPS
          </div>
        </div>
        <div className="card-surface p-5 flex flex-col justify-between">
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">
              Formula Engine Version
            </div>
            <div className="text-lg font-semibold text-foreground mt-2">
              {config.formulaVersion}
            </div>
          </div>
          <div className="text-xs text-muted-foreground mt-3 pt-2 border-t border-border/40">
            Last calculation update: {config.lastFormulaUpdate}
          </div>
        </div>
        <div className="card-surface p-5 flex flex-col justify-between">
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">
              AI Knowledge Model
            </div>
            <div className="text-lg font-semibold text-foreground mt-2">{config.aiModel}</div>
          </div>
          <div className="text-xs text-muted-foreground mt-3 pt-2 border-t border-border/40">
            Accessibility Standard: {config.accessibilityStatus}
          </div>
        </div>
      </div>

      {/* Main split grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Quick Console Actions */}
        <div className="card-surface p-5 lg:col-span-1 space-y-4">
          <div className="border-b border-border pb-3">
            <h2 className="font-semibold text-foreground flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Administrative Modules
            </h2>
            <p className="text-xs text-muted-foreground mt-1">
              Navigate to specific policy reference databases
            </p>
          </div>
          <div className="space-y-3">
            {quickLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.title}
                  to={link.to}
                  className="flex items-center justify-between p-3 rounded-lg border border-border bg-card hover:bg-muted/30 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-md border ${link.color}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                        {link.title}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {link.count} records indexed
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Recent Updates Panel */}
        <div className="card-surface p-5 lg:col-span-2 space-y-4">
          <div className="border-b border-border pb-3 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-foreground flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Recent System Updates
              </h2>
              <p className="text-xs text-muted-foreground mt-1">
                Log of recent administrative uploads and rules database modifications
              </p>
            </div>
            <Link
              to="/officer/documents"
              className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
            >
              View Repository <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {updates.slice(0, 5).map((update) => (
              <div
                key={update.id}
                className="flex items-start gap-4 p-3 rounded-lg border border-border/60 bg-muted/10"
              >
                <div className="p-2 rounded-md bg-background border border-border/80 text-muted-foreground text-xs font-semibold tracking-wider uppercase shrink-0 mt-0.5">
                  {update.type}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm text-foreground font-medium leading-snug">
                    {update.title}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Date Logged: {update.date}
                  </div>
                </div>
              </div>
            ))}
            {updates.length === 0 && (
              <div className="text-center py-8 text-sm text-muted-foreground">
                No recent updates recorded in this cycle.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
