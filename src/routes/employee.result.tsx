import { createFileRoute, Link } from "@tanstack/react-router";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import {
  AlertTriangle,
  BadgeIndianRupee,
  CheckCircle2,
  ClipboardCheck,
  Download,
  FileCheck2,
  FileText,
  Info,
  LayoutGrid,
  Printer,
  Save,
  Scale,
  XCircle,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import {
  EmptyState,
  INDIAN_RAILWAYS_LOGO,
  PageHeader,
  SectionCard,
} from "@/components/rail/common";
import { formatIndianDate, formatIndianDateTime } from "@/lib/indian-date-time";
import { formatCurrency, type SettlementAssessment } from "@/lib/settlement-assessment";
import { saveSettlementReport, type SettlementReportRecord } from "@/services/ReportManagementService";
import { processSettlement } from "@/services/SettlementService";
import {
  prepareSettlementPdfRequest,
  printStructuredCertificate,
} from "@/services/SettlementPdfService";
import { evaluateRetirementRules } from "@/rules/RetirementRuleEngine";
import type { BenefitCalculation, SettlementCalculation } from "@/calculations/CalculationTypes";
import type { BenefitResult, EligibilityStatus, SettlementResult } from "@/rules/RuleTypes";

export const Route = createFileRoute("/employee/result")({
  component: SettlementResultsPage,
});

function SettlementResultsPage() {
  const [assessment, setAssessment] = useState<SettlementAssessment | null>(null);
  const [savedSnapshot, setSavedSnapshot] = useState<SettlementReportRecord | null>(null);

  useEffect(() => {
    // Check if there is an active historic report snapshot we should view instead of current calculations
    const rawSnapshot = sessionStorage.getItem("railassist:active-report-snapshot");
    if (rawSnapshot) {
      try {
        const parsed = JSON.parse(rawSnapshot) as SettlementReportRecord;
        setSavedSnapshot(parsed);
        setAssessment(parsed.report_snapshot?.assessment || parsed.assessment);
        return;
      } catch (e) {
        console.error("Failed to parse active report snapshot", e);
      }
    }

    const raw = sessionStorage.getItem("railassist:settlement-assessment");
    if (!raw) return;
    try {
      setAssessment(JSON.parse(raw) as SettlementAssessment);
    } catch {
      setAssessment(null);
    }
  }, []);

  const processed = useMemo(() => {
    if (savedSnapshot && savedSnapshot.report_snapshot) {
      return {
        ruleResult: savedSnapshot.report_snapshot.result || savedSnapshot.result,
        calculation: savedSnapshot.report_snapshot.calculation || savedSnapshot.calculation,
      };
    }
    return assessment ? processSettlement(assessment) : null;
  }, [assessment, savedSnapshot]);

  if (!assessment || !processed) {
    return (
      <>
        <PageHeader
          title="Settlement Results"
          description="Review submitted settlement assessment outputs."
        />
        <EmptyState
          icon={<ClipboardCheck className="h-5 w-5" />}
          title="No assessment submitted"
          description="Complete the Settlement Assessment form to view the rule-based settlement advisory report."
          action={
            <Button asChild>
              <Link to="/employee/benefits">Open Settlement Assessment</Link>
            </Button>
          }
        />
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="Settlement Results"
        description="Rule-based eligibility advisory with core settlement calculations."
        actions={
          <Button variant="outline" asChild>
            <Link to="/employee/benefits">Edit Assessment</Link>
          </Button>
        }
      />

      <SettlementTabs>
        {(activeTab) => (
          <>
            <TabsContent value="overview" className="space-y-5">
              <OverviewTab result={processed.ruleResult} calculation={processed.calculation} />
            </TabsContent>

            <TabsContent value="benefits" className="space-y-4">
              {processed.ruleResult.benefitResults.map((benefit) => (
                <BenefitCard
                  key={benefit.benefitName}
                  benefit={benefit}
                  calculation={findCalculation(benefit.benefitName, processed.calculation)}
                />
              ))}
            </TabsContent>

            <TabsContent value="trace" className="space-y-5">
              <RuleTrace result={processed.ruleResult} />
            </TabsContent>

            <TabsContent value="report" className="space-y-5">
              <OfficialReport
                assessment={assessment}
                result={processed.ruleResult}
                calculation={processed.calculation}
                savedSnapshot={savedSnapshot}
              />
            </TabsContent>
          </>
        )}
      </SettlementTabs>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   Settlement Tabs — Enterprise Tab Navigation
   Professional underline-style tabs with animated indicator
   ═══════════════════════════════════════════════════════════════════════ */

const SETTLEMENT_TABS = [
  { value: "overview", label: "Overview", icon: LayoutGrid },
  { value: "benefits", label: "Benefits", icon: BadgeIndianRupee },
  { value: "trace", label: "Rule Trace", icon: Scale },
  { value: "report", label: "Official Report", icon: FileText },
] as const;

function SettlementTabs({
  children,
}: {
  children: (activeTab: string) => React.ReactNode;
}) {
  const [activeTab, setActiveTab] = useState(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("print") === "true" || params.get("download") === "true") {
        return "report";
      }
    }
    return "overview";
  });
  const tabsListRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  const updateIndicator = useCallback(() => {
    if (!tabsListRef.current || !indicatorRef.current) return;
    const activeEl = tabsListRef.current.querySelector<HTMLButtonElement>(
      '[data-state="active"]',
    );
    if (!activeEl) return;
    const listRect = tabsListRef.current.getBoundingClientRect();
    const elRect = activeEl.getBoundingClientRect();
    indicatorRef.current.style.width = `${elRect.width}px`;
    indicatorRef.current.style.transform = `translateX(${elRect.left - listRect.left + tabsListRef.current.scrollLeft}px)`;
  }, []);

  useEffect(() => {
    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [activeTab, updateIndicator]);

  return (
    <Tabs
      defaultValue="overview"
      value={activeTab}
      onValueChange={setActiveTab}
      className="space-y-5"
    >
      {/* Tab Navigation Bar */}
      <div className="settlement-tabs-nav">
        <TabsPrimitive.List
          ref={tabsListRef}
          className="settlement-tabs-list"
        >
          {SETTLEMENT_TABS.map((tab) => {
            const Icon = tab.icon;
            return (
              <TabsPrimitive.Trigger
                key={tab.value}
                value={tab.value}
                className="settlement-tab-trigger"
              >
                <Icon className="settlement-tab-icon" />
                <span>{tab.label}</span>
              </TabsPrimitive.Trigger>
            );
          })}
          {/* Animated Active Underline Indicator */}
          <div ref={indicatorRef} className="settlement-tab-indicator" />
        </TabsPrimitive.List>
      </div>

      {/* Tab Content */}
      {children(activeTab)}
    </Tabs>
  );
}

function OverviewTab({
  result,
  calculation,
}: {
  result: SettlementResult;
  calculation: SettlementCalculation;
}) {
  return (
    <>
      <SectionCard
        title="Employee Summary"
        description="Submitted employee details used by the Rule Engine."
      >
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <ResultMetric label="Employee Name" value={result.employeeSummary.employeeName} />
          <ResultMetric label="Scheme" value={result.employeeSummary.scheme} />
          <ResultMetric label="Retirement Type" value={result.employeeSummary.retirementType} />
          <ResultMetric
            label="Qualifying Service"
            value={result.employeeSummary.qualifyingService}
          />
          <ResultMetric label="Retirement Date" value={result.employeeSummary.retirementDate} />
          <ResultMetric label="Employee Group" value={result.employeeSummary.employeeGroup} />
          <ResultMetric
            label="Pension Emoluments"
            value={result.employeeSummary.pensionEmoluments}
          />
        </div>
      </SectionCard>

      <SectionCard
        title="Settlement Summary"
        description="One-time settlement and recurring monthly benefits are shown separately."
      >
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <ResultMetric label="Eligible Benefits" value={String(result.totalEligibleBenefits)} />
          <ResultMetric label="Not Eligible Benefits" value={String(result.notEligibleBenefits)} />
          <ResultMetric label="Pending Verification" value={String(result.pendingVerification)} />
          <ResultMetric
            label="Total One-Time Benefits"
            value={formatCurrency(calculation.totalOneTimeBenefits)}
          />
          <ResultMetric
            label="Residual Monthly Pension"
            value={formatCurrency(calculation.monthlyPension)}
          />
          <ResultMetric label="Monthly FMA" value={formatCurrency(calculation.monthlyFma)} />
          <ResultMetric
            label="Total Monthly Benefits"
            value={formatCurrency(calculation.monthlyPension + calculation.monthlyFma)}
          />
          <ResultMetric
            label="Total Estimated Settlement"
            value={formatCurrency(calculation.totalEstimatedSettlement)}
          />
        </div>
      </SectionCard>

      <SectionCard
        title="Core Formula Outputs"
        description="Calculated by the central Settlement Calculation Engine."
      >
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <ResultMetric
            label="Basic Pension"
            value={formatCurrency(calculation.basicPension.amount)}
          />
          <ResultMetric
            label="Commuted Pension"
            value={formatCurrency(Number(calculation.commutation.details?.commutedPension ?? 0))}
          />
          <ResultMetric
            label="Commutation Lump Sum"
            value={formatCurrency(calculation.commutation.amount)}
          />
          <ResultMetric
            label="Residual Pension"
            value={formatCurrency(calculation.residualPension.amount)}
          />
          <ResultMetric
            label="Retirement Gratuity"
            value={formatCurrency(calculation.retirementGratuity.amount)}
          />
          <ResultMetric
            label="Leave Encashment"
            value={formatCurrency(calculation.leaveEncashment.amount)}
          />
          <ResultMetric
            label="PF + CGIS"
            value={formatCurrency(calculation.providentFund.amount + calculation.cgis.amount)}
          />
        </div>
      </SectionCard>

      <div className="grid gap-5 lg:grid-cols-2">
        <ListSection
          title="Missing Documents"
          description="Documents indicated by evaluated benefit rules."
          items={result.missingDocuments}
          icon={<FileCheck2 className="h-4 w-4" />}
        />
        <ListSection
          title="Warnings"
          description="Items requiring attention before settlement processing."
          items={result.warnings}
          icon={<AlertTriangle className="h-4 w-4" />}
        />
      </div>
    </>
  );
}

function BenefitCard({
  benefit,
  calculation,
}: {
  benefit: BenefitResult;
  calculation: BenefitCalculation | null;
}) {
  const amount = calculation
    ? formatCurrency(calculation.monthlyAmount ?? calculation.amount)
    : "Not available";
  const formula = calculation?.formula;

  return (
    <section className="card-surface p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-md bg-primary-soft text-primary grid place-items-center ring-1 ring-primary/10">
            {benefit.eligibility === "Eligible" ? (
              <CheckCircle2 className="h-5 w-5" />
            ) : benefit.eligibility === "Not Eligible" ? (
              <XCircle className="h-5 w-5" />
            ) : (
              <Info className="h-5 w-5" />
            )}
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">{benefit.benefitName}</h2>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <EligibilityBadge status={benefit.eligibility} />
              <Badge variant="secondary">{benefit.status}</Badge>
            </div>
          </div>
        </div>
        <div className="rounded-md border border-border bg-muted/30 p-3 min-w-56">
          <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Amount
          </div>
          <div className="mt-1 text-sm font-semibold text-foreground">{amount}</div>
          {calculation?.status && (
            <div className="text-xs text-muted-foreground mt-1">{calculation.status}</div>
          )}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 mt-5">
        <ResultMetric label="Reason" value={benefit.reason} />
        <ResultMetric label="Rule" value={formula?.ruleReference ?? benefit.ruleReference} />
        <ResultMetric label="Remarks" value={benefit.remarks} />
        <ResultMetric
          label="Formula Used"
          value={formula?.formulaName ?? "RailAssist Formula Repository"}
        />
        <ResultMetric
          label="Formula Key"
          value={formula?.formulaKey ?? (benefit.excelFormulaKey || "Formula Reference Key")}
        />
        <ResultMetric
          label="Rule Source"
          value={formula?.workbookSheet ?? "Rule Engine"}
        />
        <ResultMetric
          label="Reference Details"
          value={formula?.cellReference ?? "Calculated dynamically"}
        />
        <ResultMetric
          label="Explanation"
          value={
            formula?.explanation ?? "Calculated according to Railway Pension Rules 2026."
          }
        />
      </div>

      {benefit.benefitName === "RELHS" && calculation?.details && (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 mt-5 rounded-md border border-primary/20 bg-primary-soft/30 p-4">
          <ResultMetric label="RELHS Status" value={benefit.eligibility} />
          <ResultMetric label="Subscription Amount" value={formatCurrency(calculation.amount)} />
          <ResultMetric
            label="Medical Card"
            value={String(calculation.details.medicalCard ?? "Not Eligible")}
          />
          <ResultMetric
            label="Family Coverage"
            value={calculation.details.familyEligible ? "Yes" : "No"}
          />
          <ResultMetric
            label="Verification"
            value={String(calculation.details.verificationStatus ?? "Automatic")}
          />
          <ResultMetric
            label="Reference"
            value={String(calculation.details.ruleReference ?? benefit.ruleReference)}
          />
          <ResultMetric
            label="Pay Matrix Level"
            value={String(calculation.details.payMatrixLevel ?? "Not available")}
          />
          <ResultMetric
            label="Subscription Band"
            value={String(calculation.details.subscriptionBand ?? "Requires verification")}
          />
        </div>
      )}

      {benefit.benefitName === "Commutation" && calculation?.details && (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 mt-5 rounded-md border border-primary/20 bg-primary-soft/30 p-4">
          <ResultMetric
            label="Age Next Birthday"
            value={String(calculation.details.ageNextBirthday ?? "Not available")}
          />
          <ResultMetric
            label="Commutation Factor"
            value={String(calculation.details.commutationFactor ?? "Not available")}
          />
          <ResultMetric
            label="Factor Source"
            value={String(calculation.details.factorSource ?? "not-found")}
          />
          <ResultMetric
            label="Circular Number"
            value={String(calculation.details.circularNumber ?? "Not available")}
          />
          <ResultMetric
            label="Commutation %"
            value={`${String(calculation.details.commutationPercentage ?? 0)}%`}
          />
          <ResultMetric
            label="Commuted Pension"
            value={formatCurrency(Number(calculation.details.commutedPension ?? 0))}
          />
          <ResultMetric
            label="Residual Pension"
            value={formatCurrency(Number(calculation.details.residualPension ?? 0))}
          />
        </div>
      )}

      {benefit.benefitName === "Fixed Medical Allowance" && calculation?.details && (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 mt-5 rounded-md border border-primary/20 bg-primary-soft/30 p-4">
          <ResultMetric label="Benefit" value="Fixed Medical Allowance (FMA)" />
          <ResultMetric
            label="Eligibility"
            value={calculation.eligible ? "Eligible" : "Not Opted"}
          />
          <ResultMetric
            label="Monthly Amount"
            value={formatCurrency(calculation.monthlyAmount ?? 0)}
          />
          <ResultMetric label="Reason" value="Employee selected FMA option." />
          <ResultMetric label="Reference" value="Railway Pension Rules 2026" />
        </div>
      )}

      {benefit.benefitName === "Leave Encashment" && calculation?.details && (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 mt-5 rounded-md border border-primary/20 bg-primary-soft/30 p-4">
          <ResultMetric
            label="LAP Entered"
            value={`${calculation.details.lapDays ?? 0} Days`}
          />
          <ResultMetric
            label="Encashable LAP"
            value={`${calculation.details.effectiveLapDays ?? 0} Days`}
          />
          <ResultMetric
            label="LHAP Entered"
            value={`${calculation.details.lhapDays ?? 0} Days`}
          />
          <ResultMetric
            label="Converted LHAP"
            value={`${calculation.details.effectiveLhapDays ?? 0} Days`}
          />
          <ResultMetric
            label="Total Encashable Days"
            value={`${calculation.details.totalEncashableDays ?? 0} Days`}
          />
          <ResultMetric
            label="Leave Encashment Amount"
            value={formatCurrency(calculation.amount)}
          />
        </div>
      )}

      <div className="mt-5">
        <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-2">
          Required Documents
        </div>
        <div className="flex flex-wrap gap-2">
          {benefit.requiredDocuments.map((document) => (
            <Badge key={document} variant="outline">
              {document}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  );
}

function RuleTrace({ result }: { result: SettlementResult }) {
  return (
    <SectionCard
      title="Rule Trace"
      description="Visual path followed by the Rule Engine for this assessment."
    >
      <ol className="space-y-3">
        {result.ruleTrace.map((step, index) => (
          <li key={step.title} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground grid place-items-center text-sm font-semibold">
                {index + 1}
              </div>
              {index < result.ruleTrace.length - 1 && (
                <div className="w-px flex-1 bg-border my-1" />
              )}
            </div>
            <div className="pb-4">
              <div className="font-medium text-foreground">{step.title}</div>
              <div className="text-sm text-muted-foreground mt-1">{step.description}</div>
            </div>
          </li>
        ))}
      </ol>
    </SectionCard>
  );
}

function OfficialReport({
  assessment,
  result,
  calculation,
  savedSnapshot,
}: {
  assessment: SettlementAssessment;
  result: SettlementResult;
  calculation: SettlementCalculation;
  savedSnapshot?: SettlementReportRecord | null;
}) {
  const certificateRef = useRef<HTMLElement>(null);
  const reportGeneratedAt = useMemo(() => new Date(), []);
  const generatedTimestamp = useMemo(() => {
    if (result.generatedOn.includes("IST") && /\d{1,2}:\d{2}:\d{2}/.test(result.generatedOn)) {
      return result.generatedOn;
    }

    const parsedGeneratedOn = new Date(result.generatedOn);
    const hasTimeComponent = /\d{1,2}:\d{2}/.test(result.generatedOn);
    const timestampSource =
      Number.isNaN(parsedGeneratedOn.getTime()) || !hasTimeComponent
        ? reportGeneratedAt
        : parsedGeneratedOn;

    return formatIndianDateTime(timestampSource);
  }, [reportGeneratedAt, result.generatedOn]);
  const generatedDate = generatedTimestamp.split(" ")[0] || formatIndianDate(reportGeneratedAt);
  
  const reportNumber = `SCR-STL-${reportGeneratedAt.getFullYear()}-${String(
    assessment.employeeDetails.employeeId || assessment.employeeDetails.employeeName || "DRAFT",
  )
    .replace(/[^a-zA-Z0-9]/g, "")
    .slice(0, 12).toUpperCase()}`;
    
  const retirementRules = evaluateRetirementRules(assessment);
  const isDeathCase = retirementRules.reportMode === "death";
  const netQualifyingService = result.employeeSummary.qualifyingService;
  const commutedPension = Number(calculation.commutation.details?.commutedPension ?? 0);
  const commutationFactor = calculation.commutation.details?.commutationFactor ?? "Not available";
  const commutationPercent = Number(calculation.commutation.details?.commutationPercentage ?? 0);
  const lastDrawnSalary = assessment.salaryDetails.currentBasicPay;
  const totalMonthlyBenefits = isDeathCase
    ? (calculation.familyPension.monthlyAmount ?? calculation.familyPension.amount) + calculation.monthlyFma
    : calculation.monthlyPension + calculation.monthlyFma;
  const pensionEmoluments = assessment.promotionDetails.emoluments;
  const deathRows: CertificateRow[] = [
    certificateRow(
      "1.",
      "Family Pension",
      calculation.familyPension.monthlyAmount ?? calculation.familyPension.amount,
      calculation.familyPension,
    ),
    certificateRow(
      "2.",
      "Enhanced Family Pension",
      isDeathCase ? Number(calculation.familyPension.details?.enhancedFamilyPension ?? 0) : 0,
      calculation.familyPension,
    ),
    certificateRow(
      "3.",
      "Death Gratuity",
      isDeathCase ? calculation.retirementGratuity.amount : 0,
      calculation.retirementGratuity,
    ),
    certificateRow("4(i).", "Amount under Insurance Fund of CGEGIS", 0, calculation.cgis),
    certificateRow(
      "4(ii).",
      "Amount under Savings Fund of CGEGIS",
      calculation.cgis.amount,
      calculation.cgis,
    ),
    certificateRow(
      "5.",
      `PF Accumulation${assessment.employeeDetails.employeeId ? ` (AC No. ${assessment.employeeDetails.employeeId})` : ""}`,
      calculation.providentFund.amount,
      calculation.providentFund,
    ),
    certificateTextRow(
      "6(a).",
      "LAP Leave Days",
      `${assessment.salaryDetails.lapDays} Days`,
      calculation.leaveEncashment,
    ),
    certificateTextRow(
      "6(b).",
      "LHAP Leave Days",
      `${assessment.salaryDetails.lhapDays} Days`,
      calculation.leaveEncashment,
    ),
    certificateTextRow(
      "6(c).",
      "Total Encashable Leave Days",
      `${calculation.leaveEncashment.details?.totalEncashableDays ?? 0} Days`,
      calculation.leaveEncashment,
    ),
    certificateTextRow(
      "6(d).",
      "Leave Encashment Amount",
      formatCurrency(calculation.leaveEncashment.amount),
      calculation.leaveEncashment,
      true,
    ),
    certificateTextRow("7.", "PPO Number", "Pending officer verification"),
  ];
  const [lastSavedReport, setLastSavedReport] = useState<string | null>(null);

  const saveReport = (status: "Draft" | "Submitted" = "Draft") => {
    const saved = saveSettlementReport(assessment, result, calculation, {
      status,
      remarks: status === "Submitted" ? "Submitted for officer verification." : "Saved as draft.",
    });
    setLastSavedReport(`Version ${saved.version || saved.report_version} saved as ${saved.status}.`);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = async () => {
    if (!certificateRef.current) return;
    
    try {
      const element = certificateRef.current;
      
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
      });
      
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });
      
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;
      
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      const employeeId = assessment.employeeDetails.employeeId || "Employee";
      const dateObj = new Date(savedSnapshot?.generated_date || new Date());
      const dateStamp = Number.isNaN(dateObj.getTime())
        ? "undated"
        : `${dateObj.getFullYear()}${String(dateObj.getMonth() + 1).padStart(2, "0")}${String(dateObj.getDate()).padStart(2, "0")}`;
      const fileName = `Settlement_Report_${employeeId}_${dateStamp}.pdf`;
      
      pdf.save(fileName);
    } catch (error) {
      console.error("PDF generation failed:", error);
      alert("Failed to generate PDF. Please try again or use Print Report.");
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("print") === "true") {
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.delete("print");
        window.history.replaceState({}, "", newUrl.toString());
        
        setTimeout(() => {
          window.print();
        }, 800);
      } else if (params.get("download") === "true") {
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.delete("download");
        window.history.replaceState({}, "", newUrl.toString());
        
        setTimeout(() => {
          handleDownloadPdf();
        }, 800);
      }
    }
  }, []);

  return (
    <div className="space-y-4">
      <div className="report-controls rounded-md border border-border bg-card p-4 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="text-sm font-semibold text-foreground">
              Official Railway Settlement Certificate
            </div>
            <div className="text-xs text-muted-foreground">
              Preview, print, and save the South Central Railway settlement certificate.
            </div>
            {lastSavedReport && (
              <div className="mt-1 text-xs font-medium text-primary">{lastSavedReport}</div>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="outline" size="sm" onClick={handleDownloadPdf}>
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="mr-2 h-4 w-4" />
              Print Report
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={() => saveReport("Draft")}>
              <Save className="mr-2 h-4 w-4" />
              Save as Draft
            </Button>
            <Button type="button" size="sm" onClick={() => saveReport("Submitted")}>
              Generate New Version
            </Button>
          </div>
        </div>
      </div>

      <section ref={certificateRef} className="settlement-certificate mx-auto max-w-[210mm] bg-white text-slate-950 shadow-sm ring-1 ring-slate-300 print:max-w-none print:shadow-none print:ring-0">
        <div className="min-h-[297mm] px-5 py-5 text-[12px] leading-snug sm:px-8 print:px-8 print:py-6">
          <header className="border-b-2 border-slate-900 pb-3">
            <div className="grid grid-cols-[72px_1fr_72px] items-center gap-3">
              <img
                src={INDIAN_RAILWAYS_LOGO}
                alt="Indian Railways"
                className="h-14 w-14 object-contain print:h-12 print:w-12"
              />
              <div className="text-center">
                <div className="text-2xl font-black uppercase tracking-wide">
                  South Central Railway
                </div>
                <div className="mt-1 text-lg font-bold uppercase tracking-wide">
                  Settlement Certificate
                </div>
                <div className="text-sm font-semibold uppercase tracking-wide">
                  Details of Settlement Benefits
                </div>
              </div>
              {/* Empty spacer to keep title centered */}
              <div />
            </div>
          </header>

          <div className="mt-4 text-center text-sm font-semibold">
            {assessment.employeeDetails.employeeName || "Employee Name"}
            {assessment.employeeDetails.employeeId
              ? ` (${assessment.employeeDetails.employeeId})`
              : ""}
          </div>

          <div className="mt-4 grid grid-cols-1 border border-slate-500 sm:grid-cols-2">
            <CertificateMeta
              label="Employee Name"
              value={assessment.employeeDetails.employeeName || "Not available"}
            />
            <CertificateMeta
              label="Employee ID"
              value={assessment.employeeDetails.employeeId || "Not provided"}
            />
            <CertificateMeta
              label="Department"
              value={assessment.employeeDetails.department || "Not provided"}
            />
            <CertificateMeta label="Division" value="South Central Railway" />
            <CertificateMeta label="Generated Date" value={generatedDate} />
            <CertificateMeta
              label="Retirement Type"
              value={result.employeeSummary.retirementType}
            />
          </div>

          <CertificateSection title="Section A - Employee Details">
            <div className="grid border border-slate-500 sm:grid-cols-2">
              <CertificateMeta
                label="Designation"
                value={assessment.employeeDetails.designation || "Not provided"}
              />
              <CertificateMeta
                label="Employee Group"
                value={assessment.employeeDetails.employeeGroup}
              />
              <CertificateMeta
                label="Pay Matrix Level"
                value={assessment.employeeDetails.payMatrixLevel}
              />
              <CertificateMeta
                label="Pension Scheme"
                value={assessment.serviceDetails.pensionScheme}
              />
              <CertificateMeta
                label="DOB"
                value={formatIndianDate(assessment.employeeDetails.dateOfBirth)}
              />
              <CertificateMeta
                label="Appointment Date"
                value={formatIndianDate(assessment.employeeDetails.dateOfAppointment)}
              />
              <CertificateMeta
                label="Retirement Date"
                value={formatIndianDate(assessment.serviceDetails.retirementDate)}
              />
              {assessment.serviceDetails.otherRetirementDetails?.dateOfDeath && (
                <CertificateMeta
                  label="Date of Death"
                  value={formatIndianDate(
                    assessment.serviceDetails.otherRetirementDetails.dateOfDeath,
                  )}
                />
              )}
              <CertificateMeta
                label="Qualifying Service"
                value={result.employeeSummary.qualifyingService}
              />
            </div>
          </CertificateSection>

          {!isDeathCase && (
            <CertificateSection title="Section B - Financial Calculations">
              <div className="border border-slate-500">
                <div className="grid grid-cols-[42px_1fr] border-b border-slate-300">
                  <div className="border-r border-slate-300 px-2 py-2 font-medium">1.</div>
                  <div className="px-2 py-2">
                    <div className="font-semibold">Total Qualifying Service (TQS)</div>
                    <div className="mt-2 grid gap-2 sm:grid-cols-3">
                      <ServiceBox label="Total Service" value={netQualifyingService} />
                      <ServiceBox label="Other Service" value="0 years, 0 months, 0 days" />
                      <ServiceBox
                        label="Non Qualifying Service"
                        value="0 years, 0 months, 0 days"
                      />
                      <ServiceBox label="Substitute Service" value="0 years, 0 months, 0 days" />
                      <ServiceBox label="Weightage" value="0 years, 0 months, 0 days" />
                      <ServiceBox label="Net Qualifying Service" value={netQualifyingService} />
                    </div>
                  </div>
                </div>

                <CertificateTable
                  rows={[
                    certificateRow(
                      "2.",
                      "Pension Emoluments",
                      pensionEmoluments,
                      calculation.basicPension,
                    ),
                    certificateRow(
                      "3.",
                      "Basic Pension",
                      calculation.basicPension.amount,
                      calculation.basicPension,
                    ),
                    certificateTextRow(
                      "4.",
                      `Amount offered for commutation (maximum 40% of Basic Pension)`,
                      formatCurrency(commutedPension),
                      calculation.commutation,
                    ),
                    certificateTextRow(
                      "5.",
                      `Lump Sum Commuted Value (${formatCurrency(commutedPension)} x 12 x ${commutationFactor})`,
                      formatCurrency(calculation.commutation.amount),
                      calculation.commutation,
                    ),
                    certificateRow(
                      "6.",
                      "Residual Pension (Col 3 minus Col 4)",
                      calculation.residualPension.amount,
                      calculation.residualPension,
                    ),
                    certificateRow(
                      "7.",
                      "Retirement Gratuity",
                      calculation.retirementGratuity.amount,
                      calculation.retirementGratuity,
                    ),
                    certificateRow(
                      "8.",
                      `PF Accumulation${assessment.employeeDetails.employeeId ? ` (AC No. ${assessment.employeeDetails.employeeId})` : ""}`,
                      calculation.providentFund.amount,
                      calculation.providentFund,
                    ),
                    certificateRow(
                      "9.",
                      "Last Drawn Salary",
                      lastDrawnSalary,
                      calculation.basicPension,
                    ),
                    certificateTextRow(
                      "10(a).",
                      "LAP Leave Days",
                      `${assessment.salaryDetails.lapDays} Days`,
                      calculation.leaveEncashment,
                    ),
                    certificateTextRow(
                      "10(b).",
                      "LHAP Leave Days",
                      `${assessment.salaryDetails.lhapDays} Days`,
                      calculation.leaveEncashment,
                    ),
                    certificateTextRow(
                      "10(c).",
                      "Total Encashable Leave Days",
                      `${calculation.leaveEncashment.details?.totalEncashableDays ?? 0} Days`,
                      calculation.leaveEncashment,
                    ),
                    certificateTextRow(
                      "10(d).",
                      "Leave Encashment Amount",
                      formatCurrency(calculation.leaveEncashment.amount),
                      calculation.leaveEncashment,
                      true,
                    ),
                    certificateRow("11.", "CGIS", calculation.cgis.amount, calculation.cgis),
                    certificateRow("11(a).", "RELHS", calculation.relhs.amount, calculation.relhs),
                    certificateTextRow(
                      "11(b).",
                      "FMA",
                      `${formatCurrency(calculation.monthlyFma)} monthly`,
                      calculation.fma,
                    ),
                    certificateRow(
                      "12.",
                      "Total One-Time Settlement",
                      calculation.totalOneTimeBenefits,
                      undefined,
                      true,
                    ),
                    certificateTextRow(
                      "13.",
                      "Monthly Benefits",
                      formatCurrency(totalMonthlyBenefits),
                      undefined,
                      true,
                    ),
                  ]}
                />
              </div>
              <div className="mt-2 text-[11px] text-slate-700">
                {retirementRules.reason} Commutation portion selected: {commutationPercent}% of
                Basic Pension. Recurring benefits are shown separately in the settlement summary.
              </div>
            </CertificateSection>
          )}

          {isDeathCase && (
            <CertificateSection title="Section B - Death Benefits">
              <div className="border border-slate-500">
                <CertificateTable rows={deathRows} />
              </div>
            </CertificateSection>
          )}

          {/* Section C — In Case of Death (informational entitlements) */}
          <CertificateSection title="Section C - In Case of Death">
            {!isDeathCase && (
              <div className="mb-2 border border-slate-400 bg-slate-50 px-3 py-2 text-[11px] text-slate-700">
                The following entitlements would be applicable to the family / nominee in
                case of death of the employee, based on the current service record and
                applicable Railway Pension Rules. This section is for information only and
                does not affect the settlement calculations above.
              </div>
            )}
            <div className="border border-slate-500">
              <CertificateTable
                rows={[
                  certificateTextRow(
                    "1.",
                    `Family Pension (${calculation.familyPension.formula.formulaName})`,
                    formatCurrency(
                      calculation.familyPension.monthlyAmount ??
                        calculation.familyPension.amount,
                    ),
                    calculation.familyPension,
                  ),
                  certificateTextRow(
                    "2.",
                    `Enhanced Family Pension (${calculation.familyPension.formula.ruleReference})`,
                    formatCurrency(
                      Number(
                        calculation.familyPension.details?.enhancedFamilyPension ?? 0,
                      ),
                    ),
                    calculation.familyPension,
                  ),
                  certificateTextRow(
                    "3.",
                    `Death Gratuity (${calculation.retirementGratuity.formula.formulaName})`,
                    formatCurrency(
                      isDeathCase ? calculation.retirementGratuity.amount : calculation.retirementGratuity.amount,
                    ),
                    calculation.retirementGratuity,
                  ),
                  certificateTextRow(
                    "4(i).",
                    "Amount under Insurance Fund of CGEGIS",
                    formatCurrency(0),
                    calculation.cgis,
                  ),
                  certificateTextRow(
                    "4(ii).",
                    `Amount under Savings Fund of CGEGIS (${calculation.cgis.formula.formulaName})`,
                    formatCurrency(calculation.cgis.amount),
                    calculation.cgis,
                  ),
                  certificateTextRow(
                    "5.",
                    `PF Accumulation (${calculation.providentFund.formula.formulaName})${assessment.employeeDetails.employeeId ? ` — AC No. ${assessment.employeeDetails.employeeId}` : ""}`,
                    formatCurrency(calculation.providentFund.amount),
                    calculation.providentFund,
                  ),
                  certificateTextRow(
                    "6.",
                    `Leave Encashment (${calculation.leaveEncashment.formula.formulaName})`,
                    formatCurrency(calculation.leaveEncashment.amount),
                    calculation.leaveEncashment,
                  ),
                  certificateTextRow(
                    "7.",
                    "PPO Number",
                    "To be generated",
                  ),
                ]}
              />
            </div>
          </CertificateSection>

          <CertificateSection title="Section D - Document Checklist">
            <div className="grid grid-cols-1 border border-slate-500 sm:grid-cols-2">
              {[
                "Service Register",
                "Retirement Order",
                "PPO",
                "Leave Account",
                "PF Statement",
                "CGIS Statement",
                "Nominee Details",
                "Identity Proof",
                "Bank Details",
                "Medical Option Form",
                "Settlement Order",
              ].map((document) => (
                <div
                  key={document}
                  className="flex items-center gap-2 border-b border-slate-300 px-3 py-2 text-[12px] sm:odd:border-r"
                >
                  <span aria-hidden="true" className="text-[14px] leading-none">
                    ☐
                  </span>
                  <span>{document}</span>
                </div>
              ))}
            </div>
          </CertificateSection>

          {(() => {
            const oneTimeRows: { label: string; value: string }[] = [];
            
            if (isDeathCase) {
              if (calculation.retirementGratuity.amount > 0) {
                oneTimeRows.push({ label: "Death Gratuity", value: formatCurrency(calculation.retirementGratuity.amount) });
              }
            } else {
              if (calculation.retirementGratuity.amount > 0) {
                oneTimeRows.push({ label: "Retirement Gratuity", value: formatCurrency(calculation.retirementGratuity.amount) });
              }
            }

            if (calculation.leaveEncashment.amount > 0) {
              oneTimeRows.push({ label: "Leave Encashment", value: formatCurrency(calculation.leaveEncashment.amount) });
            }

            if (calculation.providentFund.amount > 0) {
              oneTimeRows.push({
                label: `Provident Fund${assessment.employeeDetails.employeeId ? ` (AC No. ${assessment.employeeDetails.employeeId})` : ""}`,
                value: formatCurrency(calculation.providentFund.amount),
              });
            }

            if (calculation.cgis.amount > 0) {
              oneTimeRows.push({ label: "CGEGIS Savings Fund", value: formatCurrency(calculation.cgis.amount) });
            }

            if (isDeathCase) {
              const insFund = Number(calculation.cgis.details?.insuranceFundAmount ?? 0);
              if (insFund > 0) {
                oneTimeRows.push({ label: "CGEGIS Insurance Fund", value: formatCurrency(insFund) });
              }
            }

            if (calculation.relhs.amount > 0) {
              oneTimeRows.push({ label: "RELHS Medical Contribution", value: formatCurrency(calculation.relhs.amount) });
            }

            if (!isDeathCase && calculation.commutation.amount > 0) {
              oneTimeRows.push({ label: "Commutation Lump Sum", value: formatCurrency(calculation.commutation.amount) });
            }

            if (calculation.ctg.amount > 0) {
              oneTimeRows.push({ label: "Composite Transfer Grant (CTG)", value: formatCurrency(calculation.ctg.amount) });
            }

            const monthlyRows: { label: string; value: string }[] = [];

            if (isDeathCase) {
              const fpAmt = calculation.familyPension.monthlyAmount ?? calculation.familyPension.amount;
              if (fpAmt > 0) {
                monthlyRows.push({ label: "Family Pension", value: formatCurrency(fpAmt) });
              }
              const efpAmt = Number(calculation.familyPension.details?.enhancedFamilyPension ?? 0);
              if (efpAmt > 0) {
                monthlyRows.push({ label: "Enhanced Family Pension", value: formatCurrency(efpAmt) });
              }
              if (calculation.monthlyFma > 0) {
                monthlyRows.push({ label: "Fixed Medical Allowance (FMA)", value: formatCurrency(calculation.monthlyFma) });
              }
            } else {
              if (calculation.basicPension.amount > 0) {
                monthlyRows.push({ label: "Basic Pension", value: formatCurrency(calculation.basicPension.amount) });
              }
              if (calculation.commutation.amount > 0 && calculation.residualPension.amount > 0) {
                monthlyRows.push({ label: "Residual Pension (After Commutation)", value: formatCurrency(calculation.residualPension.amount) });
              }
              if (calculation.monthlyFma > 0) {
                monthlyRows.push({ label: "Fixed Medical Allowance (FMA)", value: formatCurrency(calculation.monthlyFma) });
              }
            }

            return (
              <CertificateSection title="Settlement Summary">
                <div className="border border-slate-400 bg-slate-50/50 p-4 select-none print:border-slate-500 print:bg-slate-50">
                  {/* One-Time Benefits Section */}
                  <div className="mb-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-400 pb-1 mb-2">
                      One-Time Settlement Benefits
                    </h4>
                    <table className="w-full text-xs">
                      <tbody>
                        {oneTimeRows.map((row) => (
                          <tr key={row.label} className="border-b border-slate-200/60 last:border-b-0">
                            <td className="py-1.5 text-left text-slate-700 font-medium">{row.label}</td>
                            <td className="py-1.5 text-right font-bold text-slate-900">{row.value}</td>
                          </tr>
                        ))}
                        {oneTimeRows.length === 0 && (
                          <tr>
                            <td colSpan={2} className="py-1.5 text-left text-slate-500 italic">No one-time benefits applicable</td>
                          </tr>
                        )}
                        <tr className="border-t-2 border-slate-400 font-bold text-slate-950">
                          <td className="py-2 text-left uppercase tracking-wide">Total One-Time Settlement</td>
                          <td className="py-2 text-right">{formatCurrency(calculation.totalOneTimeBenefits)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Monthly Benefits Section */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-400 pb-1 mb-2">
                      Monthly Benefits
                    </h4>
                    <table className="w-full text-xs">
                      <tbody>
                        {monthlyRows.map((row) => (
                          <tr key={row.label} className="border-b border-slate-200/60 last:border-b-0">
                            <td className="py-1.5 text-left text-slate-700 font-medium">{row.label}</td>
                            <td className="py-1.5 text-right font-bold text-slate-900">{row.value}</td>
                          </tr>
                        ))}
                        {monthlyRows.length === 0 && (
                          <tr>
                            <td colSpan={2} className="py-1.5 text-left text-slate-500 italic font-medium">Not Applicable</td>
                          </tr>
                        )}
                        <tr className="border-t-2 border-slate-400 font-bold text-slate-950">
                          <td className="py-2 text-left uppercase tracking-wide">Total Monthly Benefits</td>
                          <td className="py-2 text-right">{formatCurrency(totalMonthlyBenefits)} <span className="text-[10px] font-normal lowercase">per month</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </CertificateSection>
            );
          })()}

          <CertificateSection title="Section E - Officer Remarks">
            <div className="border border-slate-500">
              <div className="grid sm:grid-cols-3">
                <OfficerBlock title="Personnel Officer" />
                <OfficerBlock title="Accounts Officer" />
                <OfficerBlock title="Principal Financial Advisor" />
              </div>
              <div className="grid border-t border-slate-500 sm:grid-cols-[1fr_180px]">
                <div className="min-h-20 border-b border-slate-300 px-3 py-2 sm:border-b-0 sm:border-r">
                  <div className="text-[10px] font-bold uppercase tracking-wide">Remarks</div>
                  <div className="mt-10 border-t border-slate-300" aria-hidden="true" />
                </div>
                <div className="px-3 py-2">
                  <div className="text-[10px] font-bold uppercase tracking-wide">Approval Date</div>
                  <div className="mt-8 border-t border-slate-500 pt-1 text-center text-[11px]">
                    Date
                  </div>
                </div>
              </div>
            </div>
          </CertificateSection>

          <footer className="mt-8 border-t border-slate-500 pt-3 text-[11px] text-slate-700">
            <div className="grid gap-1 sm:grid-cols-2">
              <div>Prepared by: RailAssist Settlement Engine</div>
              <div>Rule Version: {savedSnapshot?.rule_version || "Railway Pension Rules 2026"}</div>
              <div>Formula Version: {savedSnapshot?.formula_version || "v2.4.1"}</div>
              <div>Report Number: {savedSnapshot?.report_number || reportNumber} (Ver: {savedSnapshot?.version || "Draft"})</div>
              <div>Generated: {savedSnapshot?.generated_time ? `${savedSnapshot.generated_date.split("T")[0]} ${savedSnapshot.generated_time}` : generatedTimestamp}</div>
            </div>
            <p className="mt-3">
              Disclaimer: This report is generated based on Railway pension and settlement rules.
              Final settlement is subject to verification and approval by the competent Railway
              authority.
            </p>
          </footer>
        </div>
      </section>
    </div>
  );
}

interface CertificateRow {
  serial: string;
  description: string;
  amount: string;
  calculation?: BenefitCalculation;
  strong?: boolean;
}

function certificateRow(
  serial: string,
  description: string,
  amount: number,
  calculation?: BenefitCalculation,
  strong = false,
): CertificateRow {
  return {
    serial,
    description,
    amount: formatCurrency(amount),
    calculation,
    strong,
  };
}

function certificateTextRow(
  serial: string,
  description: string,
  amount: string,
  calculation?: BenefitCalculation,
  strong = false,
): CertificateRow {
  return {
    serial,
    description,
    amount,
    calculation,
    strong,
  };
}

function CertificateSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-5 break-inside-avoid">
      <h3 className="mb-2 text-sm font-bold">{title}</h3>
      {children}
    </section>
  );
}

function CertificateMeta({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[130px_1fr] border-b border-slate-300 last:border-b-0 sm:[&:nth-last-child(-n+2)]:border-b-0 sm:[&:nth-child(odd)]:border-r">
      <div className="bg-slate-100 px-2 py-1.5 text-[10px] font-bold uppercase tracking-wide">
        {label}
      </div>
      <div className="px-2 py-1.5 font-medium">{value}</div>
    </div>
  );
}

function ServiceBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[88px_1fr] gap-2">
      <div className="text-slate-700">{label}:</div>
      <div className="font-medium">{value}</div>
    </div>
  );
}

function CertificateTable({ rows }: { rows: CertificateRow[] }) {
  return (
    <table className="certificate-table w-full border-collapse text-[12px]">
      <tbody>
        {rows.map((row) => (
          <tr
            key={`${row.serial}-${row.description}`}
            className={row.strong ? "bg-slate-100 font-bold" : ""}
          >
            <td className="w-14 border-b border-slate-300 px-2 py-2 align-top font-medium">
              {row.serial}
            </td>
            <td className="border-b border-slate-300 px-2 py-2 align-top">
              <div>{row.description}</div>
              {row.calculation && (
                <div className="print-formula-line hidden">
                  <span>Formula: {row.calculation.formula.formulaName}</span>
                  <span>Rule: {row.calculation.formula.ruleReference}</span>
                </div>
              )}
              {row.calculation && <CalculationDisclosure calculation={row.calculation} />}
            </td>
            <td className="w-40 border-b border-slate-300 px-2 py-2 text-right align-top font-medium">
              {row.amount}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function CalculationDisclosure({ calculation }: { calculation: BenefitCalculation }) {
  return (
    <details className="calculation-disclosure mt-1 text-[11px] text-slate-700">
      <summary className="cursor-pointer font-medium text-slate-900 print:list-none">
        Formula Reference
      </summary>
      <div className="mt-2 grid gap-2 border border-slate-300 bg-slate-50 p-2 sm:grid-cols-2">
        <CalculationItem label="Formula" value={calculation.formula.formulaName} />
        <CalculationItem
          label="Final Amount"
          value={formatCurrency(calculation.monthlyAmount ?? calculation.amount)}
        />
        <CalculationItem label="Rule Reference" value={calculation.formula.ruleReference} />
        <CalculationItem label="Status" value={calculation.status} />
        <CalculationItem
          label="Input Values"
          value={formatCalculationDetails(calculation.details)}
          wide
        />
        <CalculationItem
          label="Calculation"
          value={calculation.formula.explanation || calculation.reason}
          wide
        />
      </div>
    </details>
  );
}

function CalculationItem({
  label,
  value,
  wide = false,
}: {
  label: string;
  value: string;
  wide?: boolean;
}) {
  return (
    <div className={wide ? "sm:col-span-2" : ""}>
      <div className="text-[10px] font-bold uppercase tracking-wide text-slate-600">{label}</div>
      <div>{value}</div>
    </div>
  );
}

function formatCalculationDetails(details: BenefitCalculation["details"]): string {
  if (!details) return "No additional input details available.";
  return Object.entries(details)
    .map(
      ([key, value]) =>
        `${toTitle(key)}: ${Array.isArray(value) ? value.join(", ") : String(value ?? "Not available")}`,
    )
    .join("; ");
}

function toTitle(value: string): string {
  return value
    .replace(/([A-Z])/g, " $1")
    .replace(/[_-]/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function SummaryLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[1fr_150px] border-b border-slate-300 sm:[&:nth-last-child(-n+2)]:border-b-0">
      <div className="px-3 py-2 font-medium">{label}</div>
      <div className="border-l border-slate-300 px-3 py-2 text-right font-semibold">{value}</div>
    </div>
  );
}

function OfficerBlock({ title }: { title: string }) {
  return (
    <div className="min-h-28 border-b border-slate-300 px-3 py-3 sm:border-b-0 sm:border-r sm:last:border-r-0">
      <div className="text-[10px] font-bold uppercase tracking-wide">{title}</div>
      <div className="mt-14 border-t border-slate-500 pt-1 text-center text-[11px]">Signature</div>
    </div>
  );
}

function findCalculation(
  benefitName: string,
  calculation: SettlementCalculation,
): BenefitCalculation | null {
  const map: Record<string, BenefitCalculation> = {
    Pension: calculation.basicPension,
    "Family Pension": calculation.familyPension,
    "Retirement Gratuity": calculation.retirementGratuity,
    "Leave Encashment": calculation.leaveEncashment,
    "Provident Fund": calculation.providentFund,
    CGIS: calculation.cgis,
    RELHS: calculation.relhs,
    "Fixed Medical Allowance": calculation.fma,
    Commutation: calculation.commutation,
    "Residual Pension": calculation.residualPension,
    "Complimentary Pass": calculation.ctg,
    "Composite Transfer Grant": calculation.ctg,
    "Medical Facilities": calculation.relhs,
  };

  return map[benefitName] ?? null;
}

function EligibilityBadge({ status }: { status: EligibilityStatus }) {
  const variant =
    status === "Not Eligible" ? "destructive" : status === "Eligible" ? "default" : "secondary";
  return <Badge variant={variant}>{status}</Badge>;
}

function ResultMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-border bg-background p-3">
      <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </div>
      <div className="mt-1 text-sm font-medium text-foreground">{value}</div>
    </div>
  );
}

function ListSection({
  title,
  description,
  items,
  icon,
}: {
  title: string;
  description: string;
  items: string[];
  icon: React.ReactNode;
}) {
  return (
    <SectionCard title={title} description={description}>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm">
            <span className="text-primary mt-0.5">{icon}</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}

function ReportSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">
        {title}
      </h3>
      {children}
    </div>
  );
}

function ReportGrid({ rows }: { rows: [string, string][] }) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {rows.map(([label, value]) => (
        <ResultMetric key={label} label={label} value={value} />
      ))}
    </div>
  );
}
