import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/rail/common";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/officer/benefits")({
  component: BenefitsAdmin,
});

const BENEFITS = [
  { name: "Pension", scope: "Retirement", cases: "OPS, UPS", status: "Active" },
  { name: "Family Pension", scope: "Death", cases: "Rule 54 heirs", status: "Active" },
  { name: "Retirement / Death Gratuity", scope: "Retirement, Death", cases: "≥5y service", status: "Active" },
  { name: "Leave Encashment", scope: "Retirement, Death", cases: "≤300 days EL", status: "Active" },
  { name: "Provident Fund (GPF / PRAN)", scope: "All", cases: "GPF / NPS", status: "Active" },
  { name: "Group Insurance (GIS / CGEGIS)", scope: "All", cases: "Group A–D", status: "Active" },
  { name: "RELHS (Medical)", scope: "Retirement", cases: "≥20y service", status: "Active" },
  { name: "Complimentary Passes", scope: "Retirement", cases: "≥20y service", status: "Active" },
];

function BenefitsAdmin() {
  return (
    <>
      <PageHeader
        title="Benefits Management"
        description="Master list of benefits administered through the advisory engine."
        actions={<Button><Plus className="h-4 w-4 mr-2" />New Benefit</Button>}
      />

      <div className="card-surface overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Benefit</TableHead>
              <TableHead>Scope</TableHead>
              <TableHead>Applicability</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {BENEFITS.map((b) => (
              <TableRow key={b.name}>
                <TableCell className="font-medium">{b.name}</TableCell>
                <TableCell className="text-muted-foreground">{b.scope}</TableCell>
                <TableCell className="text-muted-foreground">{b.cases}</TableCell>
                <TableCell>
                  <Badge className="bg-success text-success-foreground hover:bg-success">{b.status}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">Edit</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
