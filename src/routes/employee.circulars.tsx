import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/rail/common";
import { CIRCULARS } from "@/lib/rail-data";
import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Search, FileText, Download } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/employee/circulars")({
  component: CircularLibrary,
});

function CircularLibrary() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const categories = useMemo(() => ["all", ...Array.from(new Set(CIRCULARS.map((c) => c.category)))], []);
  const filtered = CIRCULARS.filter((c) =>
    (cat === "all" || c.category === cat) &&
    (q === "" || (c.name + c.id + c.summary).toLowerCase().includes(q.toLowerCase())),
  );

  return (
    <>
      <PageHeader title="Circular Library" description="Browse and search all railway circulars referenced by the advisory engine." />

      <div className="card-surface p-4 flex flex-col md:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name, ID or summary…" className="pl-9" />
        </div>
        <Select value={cat} onValueChange={setCat}>
          <SelectTrigger className="w-full md:w-56"><SelectValue /></SelectTrigger>
          <SelectContent>
            {categories.map((c) => <SelectItem key={c} value={c}>{c === "all" ? "All categories" : c}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {filtered.map((c) => (
          <div key={c.id} className="card-surface p-5 flex gap-4">
            <div className="h-10 w-10 rounded-md bg-primary-soft text-primary grid place-items-center shrink-0">
              <FileText className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-muted text-muted-foreground">{c.id}</span>
                <Badge variant="secondary">{c.category}</Badge>
                <span className="text-xs text-muted-foreground ml-auto">{c.date}</span>
              </div>
              <div className="font-medium mt-1.5">{c.name}</div>
              <p className="text-sm text-muted-foreground mt-1">{c.summary}</p>
              <Button variant="ghost" size="sm" className="mt-2 gap-1.5 px-0 hover:bg-transparent text-primary">
                <Download className="h-3.5 w-3.5" /> Download PDF
              </Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
