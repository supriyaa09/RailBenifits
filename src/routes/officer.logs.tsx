import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/rail/common";
import { LOGS } from "@/lib/rail-data";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/officer/logs")({
  component: LogsPage,
});

function LogsPage() {
  return (
    <>
      <PageHeader title="System Logs" description="Audit trail of officer and system actions across the advisory platform." />
      <div className="card-surface divide-y">
        {LOGS.map((l, i) => (
          <div key={i} className="p-4 flex items-start gap-4">
            <div className="text-xs text-muted-foreground font-mono w-40 shrink-0">{l.ts}</div>
            <Badge variant={l.level === "warn" ? "outline" : "secondary"} className={l.level === "warn" ? "border-warning text-warning-foreground" : ""}>
              {l.level.toUpperCase()}
            </Badge>
            <div className="flex-1">
              <div className="text-sm">{l.action}</div>
              <div className="text-xs text-muted-foreground mt-0.5">by {l.user}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
