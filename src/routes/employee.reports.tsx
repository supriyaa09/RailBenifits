import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Download, Eye, FileText, Printer, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { PageHeader, SectionCard } from "@/components/rail/common";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/lib/settlement-assessment";
import {
  listSettlementReports,
  restoreReportToSession,
  type SettlementReportRecord,
} from "@/services/ReportManagementService";
import { printStructuredCertificate } from "@/services/SettlementPdfService";

export const Route = createFileRoute("/employee/reports")({
  component: ReportsPage,
});

const reportTypeFilters = ["All", "Retirement", "Death", "VRS"] as const;
const schemeFilters = ["All", "OPS", "UPS", "NPS"] as const;

function ReportsPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<(typeof reportTypeFilters)[number]>("All");
  const [schemeFilter, setSchemeFilter] = useState<(typeof schemeFilters)[number]>("All");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [selectedReports, setSelectedReports] = useState<string[]>([]);
  const reports = useMemo(() => listSettlementReports(), []);

  const filteredReports = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return reports
      .filter((report) => {
        const matchesQuery =
          !normalizedQuery ||
          report.employee_name.toLowerCase().includes(normalizedQuery) ||
          report.employee_id.toLowerCase().includes(normalizedQuery) ||
          report.report_id.toLowerCase().includes(normalizedQuery);
        const matchesType = typeFilter === "All" || report.report_type === typeFilter;
        const matchesScheme = schemeFilter === "All" || report.pension_scheme === schemeFilter;
        return matchesQuery && matchesType && matchesScheme;
      })
      .sort((a, b) => {
        const left = new Date(a.generated_date).getTime();
        const right = new Date(b.generated_date).getTime();
        return sortOrder === "newest" ? right - left : left - right;
      });
  }, [query, reports, schemeFilter, sortOrder, typeFilter]);

  const comparisonReports = selectedReports
    .map((reportId) => reports.find((report) => report.report_id === reportId))
    .filter((report): report is SettlementReportRecord => Boolean(report));

  const openReport = (report: SettlementReportRecord) => {
    restoreReportToSession(report);
    navigate({ to: "/employee/result" });
  };

  const toggleComparison = (reportId: string) => {
    setSelectedReports((current) => {
      if (current.includes(reportId)) return current.filter((id) => id !== reportId);
      return [...current.slice(-1), reportId];
    });
  };

  return (
    <>
      <PageHeader
        title="My Settlement Reports"
        description="View, search, print, download, and compare generated settlement report versions."
        actions={
          <Button asChild>
            <Link to="/employee/benefits">New Assessment</Link>
          </Button>
        }
      />

      <SectionCard title="Report Filters" description="Find reports by employee, report number, case type, scheme, or date order.">
        <div className="grid gap-3 md:grid-cols-[1fr_150px_150px_150px]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search reports"
              className="pl-9"
            />
          </div>
          <Select value={typeFilter} onValueChange={(value) => setTypeFilter(value as typeof typeFilter)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {reportTypeFilters.map((value) => (
                <SelectItem key={value} value={value}>{value}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={schemeFilter} onValueChange={(value) => setSchemeFilter(value as typeof schemeFilter)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {schemeFilters.map((value) => (
                <SelectItem key={value} value={value}>{value}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sortOrder} onValueChange={(value) => setSortOrder(value as "newest" | "oldest")}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest first</SelectItem>
              <SelectItem value="oldest">Oldest first</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </SectionCard>

      <SectionCard title="Previous Reports" description="Each generated report creates a versioned record.">
        {filteredReports.length === 0 ? (
          <div className="rounded-md border border-dashed border-border p-8 text-center">
            <FileText className="mx-auto h-8 w-8 text-muted-foreground" />
            <div className="mt-3 font-medium">No reports found</div>
            <div className="mt-1 text-sm text-muted-foreground">Save a draft or generate a new version from the Official Report tab.</div>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report</TableHead>
                <TableHead>Employee</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Scheme</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">One-Time</TableHead>
                <TableHead className="text-right">Monthly</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.map((report) => (
                <TableRow key={report.report_id}>
                  <TableCell>
                    <label className="flex items-start gap-2">
                      <input
                        type="checkbox"
                        checked={selectedReports.includes(report.report_id)}
                        onChange={() => toggleComparison(report.report_id)}
                        className="mt-1"
                      />
                      <span>
                        <span className="block font-medium">Version {report.report_version}</span>
                        <span className="block text-xs text-muted-foreground">{report.report_id}</span>
                      </span>
                    </label>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{report.employee_name || "Not available"}</div>
                    <div className="text-xs text-muted-foreground">{report.employee_id}</div>
                  </TableCell>
                  <TableCell>{report.report_type}</TableCell>
                  <TableCell>{report.pension_scheme}</TableCell>
                  <TableCell><Badge variant="secondary">{report.status}</Badge></TableCell>
                  <TableCell className="text-right">{formatCurrency(report.total_one_time_settlement)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(report.monthly_benefits)}</TableCell>
                  <TableCell>{formatReportDate(report.generated_date)}</TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openReport(report)} title="View report">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={printStructuredCertificate} title="Print report">
                        <Printer className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={printStructuredCertificate} title="Download PDF">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </SectionCard>

      {comparisonReports.length > 0 && (
        <SectionCard title="Version Comparison" description="Select up to two saved report versions to compare totals and status.">
          <div className="grid gap-4 lg:grid-cols-2">
            {comparisonReports.map((report) => (
              <div key={report.report_id} className="rounded-md border border-border p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="font-semibold">Version {report.report_version}</div>
                    <div className="text-xs text-muted-foreground">{report.report_id}</div>
                  </div>
                  <Badge variant="secondary">{report.status}</Badge>
                </div>
                <div className="mt-4 grid gap-2 text-sm">
                  <CompareLine label="Generated" value={formatReportDate(report.generated_date)} />
                  <CompareLine label="Report Type" value={report.report_type} />
                  <CompareLine label="Pension Scheme" value={report.pension_scheme} />
                  <CompareLine label="One-Time Settlement" value={formatCurrency(report.total_one_time_settlement)} />
                  <CompareLine label="Monthly Benefits" value={formatCurrency(report.monthly_benefits)} />
                  <CompareLine label="PDF Path" value={report.pdf_path} />
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      )}
    </>
  );
}

function CompareLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3 border-b border-border pb-1 last:border-b-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-right font-medium">{value}</span>
    </div>
  );
}

function formatReportDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Not available";
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
