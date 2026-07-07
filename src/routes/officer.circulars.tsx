import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/rail/common";
import { CIRCULARS as SEED } from "@/lib/rail-data";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Upload, FileText } from "lucide-react";

export const Route = createFileRoute("/officer/circulars")({
  component: CircularAdmin,
});

function CircularAdmin() {
  const [items, setItems] = useState(SEED);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ id: "", name: "", category: "Pension", summary: "" });

  const upload = () => {
    if (!form.id || !form.name) return;
    setItems((xs) => [
      { ...form, date: new Date().toISOString().slice(0, 10), status: "Active" as const },
      ...xs,
    ]);
    setForm({ id: "", name: "", category: "Pension", summary: "" });
    setOpen(false);
  };

  return (
    <>
      <PageHeader
        title="Circular Management"
        description="Upload and maintain railway circular PDFs indexed by the AI knowledge base."
        actions={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild><Button><Upload className="h-4 w-4 mr-2" />Upload Circular</Button></DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader><DialogTitle>Upload Circular</DialogTitle></DialogHeader>
              <div className="grid gap-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="mb-1.5 block">Circular ID</Label>
                    <Input value={form.id} onChange={(e) => setForm({ ...form, id: e.target.value })} placeholder="e.g. RBE-11-2025" />
                  </div>
                  <div>
                    <Label className="mb-1.5 block">Category</Label>
                    <Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
                  </div>
                </div>
                <div>
                  <Label className="mb-1.5 block">Name</Label>
                  <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div>
                  <Label className="mb-1.5 block">Summary</Label>
                  <Textarea rows={3} value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })} />
                </div>
                <div className="border border-dashed rounded-lg p-6 text-center bg-muted/30">
                  <FileText className="h-6 w-6 mx-auto text-muted-foreground" />
                  <div className="mt-2 text-sm">Drop the PDF here or <span className="text-primary underline underline-offset-2 cursor-pointer">browse</span></div>
                  <div className="text-xs text-muted-foreground">Max 20 MB · PDF only</div>
                </div>
              </div>
              <DialogFooter><Button onClick={upload}>Save & Index</Button></DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="card-surface overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>PDF Name</TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Upload Date</TableHead>
              <TableHead>Summary</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((c) => (
              <TableRow key={c.id}>
                <TableCell className="font-medium">{c.name}</TableCell>
                <TableCell className="font-mono text-xs">{c.id}</TableCell>
                <TableCell><Badge variant="secondary">{c.category}</Badge></TableCell>
                <TableCell className="text-muted-foreground">{c.date}</TableCell>
                <TableCell className="text-muted-foreground max-w-md truncate">{c.summary}</TableCell>
                <TableCell><Badge className="bg-success text-success-foreground hover:bg-success">{c.status}</Badge></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
