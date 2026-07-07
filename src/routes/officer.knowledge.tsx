import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, StatCard } from "@/components/rail/common";
import { CIRCULARS } from "@/lib/rail-data";
import { Brain, FileSearch, RefreshCw, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/officer/knowledge")({
  component: KnowledgePage,
});

function KnowledgePage() {
  return (
    <>
      <PageHeader
        title="AI Knowledge Base"
        description="The corpus of railway circulars, manuals and rulebooks that grounds the AI Assistant's answers."
        actions={<Button variant="outline"><RefreshCw className="h-4 w-4 mr-2" />Reindex</Button>}
      />

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Indexed Documents" value={CIRCULARS.length} icon={<Database className="h-4 w-4" />} />
        <StatCard label="Chunks" value="1,284" icon={<FileSearch className="h-4 w-4" />} />
        <StatCard label="Embeddings" value="1,284" hint="text-embedding-3-small" icon={<Brain className="h-4 w-4" />} />
        <StatCard label="Last Refresh" value="2h ago" icon={<RefreshCw className="h-4 w-4" />} />
      </div>

      <div className="grid gap-4 md:grid-cols-2 mt-6">
        <div className="card-surface p-5">
          <h3 className="font-medium">Indexing Health</h3>
          <div className="mt-4 space-y-4">
            {[
              { label: "Circulars indexed", value: 100 },
              { label: "Manuals indexed", value: 82 },
              { label: "FAQ knowledge", value: 66 },
              { label: "Vector store sync", value: 94 },
            ].map((r) => (
              <div key={r.label}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-muted-foreground">{r.label}</span>
                  <span className="font-medium">{r.value}%</span>
                </div>
                <Progress value={r.value} />
              </div>
            ))}
          </div>
        </div>

        <div className="card-surface p-5">
          <h3 className="font-medium">Sources</h3>
          <ul className="mt-3 divide-y">
            {CIRCULARS.map((c) => (
              <li key={c.id} className="py-2.5 flex items-center justify-between text-sm">
                <div>
                  <div className="font-medium">{c.name}</div>
                  <div className="text-xs text-muted-foreground">{c.id} · {c.category}</div>
                </div>
                <span className="text-xs text-success">Indexed</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
