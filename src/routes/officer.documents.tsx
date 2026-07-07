import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/rail/common";
import { DOCS } from "@/lib/rail-data";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Upload, FileText } from "lucide-react";

export const Route = createFileRoute("/officer/documents")({
  component: DocsPage,
});

function DocsPage() {
  return (
    <>
      <PageHeader
        title="Uploaded Documents"
        description="All uploaded source documents that feed the advisory engine and AI knowledge base."
        actions={<Button><Upload className="h-4 w-4 mr-2" />Upload</Button>}
      />

      <div className="card-surface overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Document</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Uploaded</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {DOCS.map((d) => (
              <TableRow key={d.name}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    <span className="font-medium">{d.name}</span>
                  </div>
                </TableCell>
                <TableCell><Badge variant="secondary">{d.category}</Badge></TableCell>
                <TableCell className="text-muted-foreground">{d.uploaded}</TableCell>
                <TableCell className="text-muted-foreground">{d.size}</TableCell>
                <TableCell><Badge className="bg-success text-success-foreground hover:bg-success">{d.status}</Badge></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
