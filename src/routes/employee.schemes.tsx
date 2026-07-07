import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/rail/common";
import { SCHEMES } from "@/lib/rail-data";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/employee/schemes")({
  component: SchemesPage,
});

function SchemesPage() {
  return (
    <>
      <PageHeader title="Railway Schemes" description="Overview of pension schemes applicable to railway employees." />
      <div className="grid gap-4 md:grid-cols-3">
        {SCHEMES.map((s) => (
          <div key={s.code} className="card-surface p-6">
            <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded bg-primary-soft text-primary text-xs font-mono">{s.code}</div>
            <h3 className="mt-3 font-medium text-lg">{s.name}</h3>
            <p className="text-sm text-muted-foreground mt-1">{s.desc}</p>
            <ul className="mt-4 space-y-1.5">
              {s.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
