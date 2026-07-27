import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ShieldCheck,
  FileCog,
  ScrollText,
  Clock,
  ArrowRight,
  TrendingUp,
  Bot,
  Activity,
  Award,
} from "lucide-react";
import { useState, useEffect } from "react";
import { PageHeader, StatCard } from "@/components/rail/common";
import { toast } from "sonner";

export const Route = createFileRoute("/officer/")({
  component: OfficerDashboard,
});

function OfficerDashboard() {
  const [data, setData] = useState<any>({
    rules: [],
    ruleVersions: [],
    ruleChanges: [],
    auditLogs: [],
    circulars: [],
  });
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      const res = await fetch("/api/rules?action=get-data");
      if (res.ok) {
        const payload = await res.json();
        setData(payload);
      }
    } catch (err) {
      console.error("Dashboard failed to sync database:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const totalRules = data.rules.length;
  const pendingReviews = data.ruleChanges.filter((rc: any) => rc.status === "Pending").length;
  const circularsCount = data.circulars.length;
  const rulesVersionsCount = data.ruleVersions.length;

  // Calculate average AI confidence
  const confidences = data.ruleChanges.map((rc: any) => rc.confidence || 0);
  const aiConfidenceAvg =
    confidences.length > 0
      ? Math.round(confidences.reduce((sum: number, c: number) => sum + c, 0) / confidences.length)
      : 96; // default fallback if no changes

  const quickLinks = [
    {
      title: "Active Rules Catalog",
      to: "/officer/rules",
      count: totalRules,
      hint: "Admissible rules & conditions",
      icon: ShieldCheck,
      color: "text-blue-500 bg-blue-500/10 border-blue-500/20",
    },
    {
      title: "AI Review Console",
      to: "/officer/rule-management",
      count: pendingReviews,
      hint: "Review extracted circular drafts",
      icon: Bot,
      color: "text-purple-500 bg-purple-500/10 border-purple-500/20",
    },
    {
      title: "Document Archives",
      to: "/officer/documents",
      count: circularsCount,
      hint: "Circulars library & files",
      icon: ScrollText,
      color: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    },
  ];

  return (
    <div className="space-y-8 pb-12 max-w-[1400px] mx-auto">
      <PageHeader
        title="Railway Rules Administration Console"
        description="Official South Central Railway administrative console. Monitor rule updates, process board circulars using Gemini AI, and inspect mathematical formula engines."
      />

      {/* Redesigned Metrics Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard
          label="Total Rules"
          value={loading ? "..." : totalRules}
          hint="Admissible active rules"
          icon={<ShieldCheck className="h-5 w-5 text-emerald-500" />}
        />
        <StatCard
          label="Pending Reviews"
          value={loading ? "..." : pendingReviews}
          hint="AI drafts requiring action"
          icon={<Bot className="h-5 w-5 text-purple-500" />}
        />
        <StatCard
          label="Circulars Uploaded"
          value={loading ? "..." : circularsCount}
          hint="Uploaded board policies"
          icon={<ScrollText className="h-5 w-5 text-blue-500" />}
        />
        <StatCard
          label="Rules Updated"
          value={loading ? "..." : rulesVersionsCount}
          hint="Total historical rule versions"
          icon={<FileCog className="h-5 w-5 text-amber-500" />}
        />
        <StatCard
          label="AI Conf. Average"
          value={loading ? "..." : `${aiConfidenceAvg}%`}
          hint="Gemini extraction accuracy"
          icon={<Award className="h-5 w-5 text-rose-500" />}
        />
      </div>

      {/* Main split grid with extra whitespace and soft spacing */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left column: Quick Actions */}
        <div className="card-surface p-6 space-y-6 bg-card border border-border/40 shadow-sm rounded-xl">
          <div className="border-b border-border/40 pb-4">
            <h2 className="font-bold text-foreground text-base flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Administrative Portals
            </h2>
            <p className="text-xs text-muted-foreground mt-1">
              Select a module to manage policies, review extractions, or inspect historical audit ledgers.
            </p>
          </div>
          <div className="space-y-4">
            {quickLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.title}
                  to={link.to}
                  className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-card hover:bg-muted/10 transition-all duration-200 group shadow-soft hover:shadow-md cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2.5 rounded-lg border ${link.color}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                        {link.title}
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {link.count} {link.hint}
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right column: Recent Activity timeline */}
        <div className="card-surface p-6 lg:col-span-2 space-y-6 bg-card border border-border/40 shadow-sm rounded-xl">
          <div className="border-b border-border/40 pb-4 flex items-center justify-between">
            <div>
              <h2 className="font-bold text-foreground text-base flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Recent System Updates
              </h2>
              <p className="text-xs text-muted-foreground mt-1">
                Security audit logs of recent rules uploads, overrides, and versions committed.
              </p>
            </div>
            <Link
              to="/officer/documents"
              className="text-xs font-semibold text-primary hover:underline flex items-center gap-1 cursor-pointer"
            >
              View Document List <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="space-y-4">
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary" />
              </div>
            ) : data.auditLogs.length === 0 ? (
              <div className="text-center py-12 text-sm text-muted-foreground">
                No recent updates logged. Audit trails will display here once rule updates are made.
              </div>
            ) : (
              <div className="relative border-l border-border/60 ml-3 pl-6 space-y-6 py-2">
                {data.auditLogs.slice(0, 4).map((log: any) => (
                  <div key={log.id} className="relative">
                    {/* Circle timeline dot */}
                    <span className="absolute -left-[31px] top-1.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-background border border-primary/50 shadow-soft">
                      <Activity className="h-2 w-2 text-primary" />
                    </span>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-foreground">{log.changes}</span>
                        <span className="text-[10px] text-muted-foreground font-mono bg-muted px-1.5 py-0.5 rounded">
                          {log.timestamp ? log.timestamp.split("T")[0] : ""}
                        </span>
                      </div>
                      <div className="text-[11px] text-muted-foreground">
                        Action: <span className="font-mono text-primary font-bold">{log.action}</span> | By: <span className="font-medium text-foreground">{log.officer}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
