import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PageHeader } from "@/components/rail/common";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type {
  BenefitInput,
  CaseType,
  EmployeeGroup,
  PensionScheme,
  Relationship,
} from "@/lib/rail-data";
import { Skull, LogOut, CalendarCheck, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/employee/benefits")({
  component: BenefitsForm,
});

const cases: { value: CaseType; title: string; desc: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { value: "retirement", title: "Retirement", desc: "Superannuation / VRS", icon: CalendarCheck },
  { value: "death", title: "Death Case", desc: "Death in service or after retirement", icon: Skull },
  { value: "removal", title: "Removal / Self Resignation", desc: "Separation before superannuation", icon: LogOut },
];

function BenefitsForm() {
  const navigate = useNavigate();
  const [caseType, setCaseType] = useState<CaseType>("retirement");
  const [scheme, setScheme] = useState<PensionScheme>("UPS");
  const [group, setGroup] = useState<EmployeeGroup>("B");
  const [years, setYears] = useState("32");
  const [basicPay, setBasicPay] = useState("78800");
  const [da, setDa] = useState("46");
  const [relationship, setRelationship] = useState<Relationship>("Wife");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: BenefitInput = {
      caseType,
      scheme,
      group,
      years: Number(years) || 0,
      basicPay: Number(basicPay) || 0,
      da: Number(da) || 0,
      relationship: caseType === "death" ? relationship : undefined,
    };
    sessionStorage.setItem("railassist:input", JSON.stringify(payload));
    navigate({ to: "/employee/result" });
  };

  return (
    <>
      <PageHeader
        title="Check Benefits"
        description="Select the case type and enter your service details. The advisory engine will evaluate each benefit against the applicable railway rules."
      />

      <form onSubmit={submit} className="space-y-6">
        <div className="card-surface p-5">
          <div className="text-sm font-medium mb-3">1 · Case Type</div>
          <div className="grid gap-3 md:grid-cols-3">
            {cases.map((c) => {
              const active = caseType === c.value;
              return (
                <button
                  type="button"
                  key={c.value}
                  onClick={() => setCaseType(c.value)}
                  className={`text-left p-4 rounded-lg border transition-all ${
                    active ? "border-primary ring-2 ring-ring/30 bg-primary-soft/50" : "hover:border-primary/40 hover:bg-muted/40"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`h-9 w-9 rounded-md grid place-items-center ${active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                      <c.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">{c.title}</div>
                      <div className="text-xs text-muted-foreground">{c.desc}</div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="card-surface p-5">
          <div className="text-sm font-medium mb-4">2 · Service Details</div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label className="mb-1.5 block">Pension Scheme</Label>
              <Select value={scheme} onValueChange={(v) => setScheme(v as PensionScheme)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="OPS">OPS — Old Pension Scheme</SelectItem>
                  <SelectItem value="NPS">NPS — National Pension System</SelectItem>
                  <SelectItem value="UPS">UPS — Unified Pension Scheme</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="mb-1.5 block">Employee Group</Label>
              <Select value={group} onValueChange={(v) => setGroup(v as EmployeeGroup)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="A">Group A</SelectItem>
                  <SelectItem value="B">Group B</SelectItem>
                  <SelectItem value="C">Group C</SelectItem>
                  <SelectItem value="D">Group D</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="mb-1.5 block">Years of Qualifying Service</Label>
              <Input type="number" min={0} max={45} value={years} onChange={(e) => setYears(e.target.value)} />
            </div>

            <div>
              <Label className="mb-1.5 block">Last Basic Pay (₹)</Label>
              <Input type="number" min={0} value={basicPay} onChange={(e) => setBasicPay(e.target.value)} />
            </div>

            <div>
              <Label className="mb-1.5 block">Dearness Allowance (%)</Label>
              <Input type="number" min={0} max={200} value={da} onChange={(e) => setDa(e.target.value)} />
            </div>

            {caseType === "death" && (
              <div>
                <Label className="mb-2 block">Relationship to Deceased</Label>
                <RadioGroup
                  value={relationship}
                  onValueChange={(v) => setRelationship(v as Relationship)}
                  className="grid grid-cols-3 gap-2"
                >
                  {(["Wife", "Husband", "Son", "Daughter", "Parent"] as Relationship[]).map((r) => (
                    <label
                      key={r}
                      className="flex items-center gap-2 border rounded-md px-3 py-2 cursor-pointer hover:bg-muted/40"
                    >
                      <RadioGroupItem value={r} />
                      <span className="text-sm">{r}</span>
                    </label>
                  ))}
                </RadioGroup>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <Button size="lg" type="submit" className="gap-2">
            Check Eligibility <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </>
  );
}
