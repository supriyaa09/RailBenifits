import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, EmptyState } from "@/components/rail/common";
import { useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { evaluateBenefits, type BenefitInput, type BenefitResult, RULES } from "@/lib/rail-data";
import { CheckCircle2, XCircle, FileText, Info, ClipboardCheck, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/employee/result")({
  component: ResultPage,
});

function ResultPage() {
  const input = useMemo<BenefitInput | null>(() => {
    if (typeof window === "undefined") return null;
    const raw = sessionStorage.getItem("railassist:input");
    if (!raw) return null;
    try { return JSON.parse(raw) as BenefitInput; } catch { return null; }
  }, []);

  if (!input) {
    return (
      <>
        <PageHeader title="Result" />
        <EmptyState
          icon={<ClipboardCheck className="h-5 w-5" />}
          title="No submission yet"
          description="Fill out the Check Benefits form to see your eligibility results."
          action={<Button asChild><Link to="/employee/benefits">Go to Check Benefits</Link></Button>}
        />
      </>
    );
  }

  const { benefits, trace } = evaluateBenefits(input);
  const eligibleCount = benefits.filter((b) => b.eligible).length;

  return (
    <>
      <PageHeader
        title="Eligibility Result"
        description={`Case: ${input.caseType.toUpperCase()} · Scheme: ${input.scheme} · Group ${input.group} · ${input.years} years of service`}
        actions={
          <Button variant="outline" asChild>
            <Link to="/employee/benefits">Edit inputs</Link>
          </Button>
        }
      />

      <div className="grid gap-4 md:grid-cols-3">
        <div className="card-surface p-4">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Benefits Evaluated</div>
          <div className="text-2xl font-semibold mt-1">{benefits.length}</div>
        </div>
        <div className="card-surface p-4">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Eligible</div>
          <div className="text-2xl font-semibold mt-1 text-success">{eligibleCount}</div>
        </div>
        <div className="card-surface p-4">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Not Eligible</div>
          <div className="text-2xl font-semibold mt-1 text-destructive">{benefits.length - eligibleCount}</div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3 mt-6">
        <div className="lg:col-span-2 space-y-4">
          {benefits.map((b) => (
            <BenefitCard key={b.name} b={b} />
          ))}
        </div>

        <aside className="lg:col-span-1">
          <div className="card-surface p-5 sticky top-20">
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Rule Trace</div>
            <ol className="space-y-2">
              {trace.map((step, i) => (
                <li key={i} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="h-6 w-6 rounded-full bg-primary-soft text-primary text-[11px] grid place-items-center font-medium">{i + 1}</div>
                    {i < trace.length - 1 && <div className="w-px flex-1 bg-border my-1" />}
                  </div>
                  <div className="pb-3 text-sm text-foreground">{step}</div>
                </li>
              ))}
            </ol>
          </div>
        </aside>
      </div>
    </>
  );
}

function BenefitCard({ b }: { b: BenefitResult }) {
  const [openRule, setOpenRule] = useState(false);
  const [openWhy, setOpenWhy] = useState(false);
  const rule = RULES.find((r) => b.rulesApplied.includes(r.id));

  return (
    <div className="card-surface p-5">
      <div className="flex items-start gap-3">
        <div className={`h-9 w-9 rounded-md grid place-items-center ${b.eligible ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}>
          {b.eligible ? <CheckCircle2 className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-medium text-foreground">{b.name}</h3>
            <Badge variant={b.eligible ? "default" : "destructive"} className={b.eligible ? "bg-success text-success-foreground hover:bg-success" : ""}>
              {b.eligible ? "Eligible" : "Not Eligible"}
            </Badge>
            {b.rulesApplied.map((r) => (
              <span key={r} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-primary-soft text-primary">{r}</span>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-1.5">{b.reason}</p>

          {b.amount && (
            <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-primary-soft text-primary text-sm font-medium">
              Estimated: {b.amount}
            </div>
          )}

          <div className="mt-3 grid sm:grid-cols-2 gap-3">
            <div>
              <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1">Required Documents</div>
              <ul className="text-sm space-y-0.5">
                {b.documents.map((d) => (
                  <li key={d} className="flex items-start gap-1.5">
                    <ChevronRight className="h-3.5 w-3.5 mt-0.5 text-muted-foreground shrink-0" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1">Relevant Circular</div>
              <div className="text-sm flex items-start gap-1.5">
                <FileText className="h-3.5 w-3.5 mt-0.5 text-primary shrink-0" />
                <span>{b.circular}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={() => setOpenRule(true)} disabled={!rule}>
              View Rule
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setOpenWhy(true)} className="gap-1.5">
              <Info className="h-3.5 w-3.5" /> Why am I {b.eligible ? "eligible" : "not eligible"}?
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={openRule} onOpenChange={setOpenRule}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{rule?.name ?? "Rule"}</DialogTitle>
            <DialogDescription>{rule?.id} · Effective {rule?.effective}</DialogDescription>
          </DialogHeader>
          {rule && (
            <div className="space-y-3 text-sm">
              <div><span className="text-muted-foreground">Case Type: </span>{rule.caseType}</div>
              <div><span className="text-muted-foreground">Conditions: </span>{rule.conditions}</div>
              <div><span className="text-muted-foreground">Documents: </span>{rule.docs}</div>
              <div><span className="text-muted-foreground">Reference Circular: </span>{rule.circular}</div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={openWhy} onOpenChange={setOpenWhy}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reasoning</DialogTitle>
            <DialogDescription>How the advisory engine reached this decision.</DialogDescription>
          </DialogHeader>
          <div className="space-y-2 text-sm">
            <p>{b.reason}</p>
            <div className="text-muted-foreground">Rules applied: {b.rulesApplied.length ? b.rulesApplied.join(", ") : "—"}</div>
            <div className="text-muted-foreground">Source: {b.circular}</div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
