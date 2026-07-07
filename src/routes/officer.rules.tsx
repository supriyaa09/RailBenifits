import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/rail/common";
import { RULES as SEED } from "@/lib/rail-data";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Pencil, Power, Trash2, Search } from "lucide-react";

export const Route = createFileRoute("/officer/rules")({
  component: RulesAdmin,
});

type Rule = (typeof SEED)[number];

function RulesAdmin() {
  const [rules, setRules] = useState<Rule[]>(SEED);
  const [q, setQ] = useState("");
  const [editing, setEditing] = useState<Rule | null>(null);
  const [openNew, setOpenNew] = useState(false);

  const filtered = rules.filter((r) => (r.name + r.id + r.caseType).toLowerCase().includes(q.toLowerCase()));

  const toggleStatus = (id: string) =>
    setRules((rs) => rs.map((r) => (r.id === id ? { ...r, status: r.status === "Active" ? "Inactive" : "Active" } : r)));
  const remove = (id: string) => setRules((rs) => rs.filter((r) => r.id !== id));

  const saveRule = (r: Rule) => {
    setRules((rs) => {
      const exists = rs.some((x) => x.id === r.id);
      return exists ? rs.map((x) => (x.id === r.id ? r : x)) : [r, ...rs];
    });
    setEditing(null);
    setOpenNew(false);
  };

  return (
    <>
      <PageHeader
        title="Rules Management"
        description="Add, edit, deactivate or delete rules used by the eligibility engine."
        actions={
          <Dialog open={openNew} onOpenChange={setOpenNew}>
            <DialogTrigger asChild>
              <Button><Plus className="h-4 w-4 mr-2" />Add Rule</Button>
            </DialogTrigger>
            <RuleFormDialog title="Add Rule" onSave={saveRule} />
          </Dialog>
        }
      />

      <div className="card-surface p-3 mb-4">
        <div className="relative max-w-sm">
          <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search rules…" className="pl-9" />
        </div>
      </div>

      <div className="card-surface overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Rule Name</TableHead>
              <TableHead>Case Type</TableHead>
              <TableHead>Conditions</TableHead>
              <TableHead>Circular</TableHead>
              <TableHead>Effective</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((r) => (
              <TableRow key={r.id}>
                <TableCell className="font-mono text-xs">{r.id}</TableCell>
                <TableCell className="font-medium">{r.name}</TableCell>
                <TableCell className="text-muted-foreground">{r.caseType}</TableCell>
                <TableCell className="text-muted-foreground max-w-xs truncate">{r.conditions}</TableCell>
                <TableCell className="text-muted-foreground">{r.circular}</TableCell>
                <TableCell className="text-muted-foreground">{r.effective}</TableCell>
                <TableCell>
                  <Badge className={r.status === "Active" ? "bg-success text-success-foreground hover:bg-success" : "bg-muted text-muted-foreground hover:bg-muted"}>
                    {r.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="inline-flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => setEditing(r)} aria-label="Edit"><Pencil className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => toggleStatus(r.id)} aria-label="Toggle"><Power className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => remove(r.id)} aria-label="Delete"><Trash2 className="h-4 w-4 text-destructive" /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        {editing && <RuleFormDialog title="Edit Rule" initial={editing} onSave={saveRule} />}
      </Dialog>
    </>
  );
}

function RuleFormDialog({ title, initial, onSave }: { title: string; initial?: Rule; onSave: (r: Rule) => void }) {
  const [form, setForm] = useState<Rule>(
    initial ?? { id: `R${Math.floor(Math.random() * 900 + 100)}`, name: "", caseType: "Retirement", conditions: "", docs: "", circular: "", effective: new Date().toISOString().slice(0, 10), status: "Active" },
  );

  return (
    <DialogContent className="max-w-lg">
      <DialogHeader><DialogTitle>{title}</DialogTitle></DialogHeader>
      <div className="grid gap-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="mb-1.5 block">Rule ID</Label>
            <Input value={form.id} onChange={(e) => setForm({ ...form, id: e.target.value })} />
          </div>
          <div>
            <Label className="mb-1.5 block">Case Type</Label>
            <Input value={form.caseType} onChange={(e) => setForm({ ...form, caseType: e.target.value })} />
          </div>
        </div>
        <div>
          <Label className="mb-1.5 block">Rule Name</Label>
          <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </div>
        <div>
          <Label className="mb-1.5 block">Eligibility Conditions</Label>
          <Input value={form.conditions} onChange={(e) => setForm({ ...form, conditions: e.target.value })} />
        </div>
        <div>
          <Label className="mb-1.5 block">Required Documents</Label>
          <Input value={form.docs} onChange={(e) => setForm({ ...form, docs: e.target.value })} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="mb-1.5 block">Reference Circular</Label>
            <Input value={form.circular} onChange={(e) => setForm({ ...form, circular: e.target.value })} />
          </div>
          <div>
            <Label className="mb-1.5 block">Effective Date</Label>
            <Input type="date" value={form.effective} onChange={(e) => setForm({ ...form, effective: e.target.value })} />
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button onClick={() => onSave(form)}>Save Rule</Button>
      </DialogFooter>
    </DialogContent>
  );
}
