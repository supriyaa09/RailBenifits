import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { CalendarCheck, ClipboardCheck, RotateCcw } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useForm, useWatch, type Control, type FieldPath } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { PageHeader, SectionCard } from "@/components/rail/common";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  addQualifyingService,
  calculateAgeNextBirthday,
  calculateCurrentAge,
  calculateQualifyingService,
  calculateRetirementDate,
  determineEmoluments,
  determineFma,
  formatDateInput,
  formatDisplayDate,
  formatCurrency,
  formatQualifyingService,
  getExitDateLabel,
  parseDateInput,
  type EmployeeGroup,
  type MedicalBenefits,
  type OtherRetirementDetails,
  type PensionScheme,
  type PromotionDetails,
  type QualifyingService,
  type RetirementCategory,
  type SalaryDetails,
  type SettlementAssessment,
} from "@/lib/settlement-assessment";

export const Route = createFileRoute("/employee/benefits")({
  component: SettlementAssessmentPage,
});

const employeeGroups = ["A", "B", "C", "D"] as const;
const pensionSchemes = ["OPS", "UPS", "NPS"] as const;
const retirementCategories = ["normal", "other"] as const;
const otherRetirementTypes = [
  { value: "voluntary", label: "Voluntary Retirement" },
  { value: "medical", label: "Medical Retirement" },
  { value: "compulsory", label: "Compulsory Retirement" },
  { value: "death", label: "Death Case" },
  { value: "removal", label: "Removal" },
  { value: "dismissal", label: "Dismissal" },
  { value: "self-resignation", label: "Self Resignation" },
] as const;

const moneyField = z.coerce.number({ invalid_type_error: "Enter a valid amount" });
const dayField = z.coerce.number({ invalid_type_error: "Enter a valid day count" });

const assessmentSchema = z
  .object({
    employeeName: z.string().min(1, "Employee name is required"),
    employeeId: z.string().optional(),
    dateOfBirth: z.string().min(1, "Date of birth is required"),
    dateOfAppointment: z.string().min(1, "Date of appointment is required"),
    dateOfExit: z.string().optional(),
    employeeGroup: z.enum(employeeGroups),
    payMatrixLevel: z.string().min(1, "Pay Matrix Level is required"),
    designation: z.string().optional(),
    department: z.string().optional(),
    pensionScheme: z.enum(pensionSchemes),
    employeeCategory: z.enum(["Running", "Non Running"]),
    retirementCategory: z.enum(retirementCategories),
    otherRetirementType: z
      .enum([
        "voluntary",
        "medical",
        "compulsory",
        "death",
        "removal",
        "dismissal",
        "self-resignation",
      ])
      .optional(),
    currentBasicPay: moneyField.gt(0, "Basic Pay must be greater than 0"),
    dearnessAllowance: moneyField.min(0, "DA cannot be negative"),
    lapDays: dayField.min(0, "LAP days cannot be negative"),
    lhapDays: dayField.min(0, "LHAP days cannot be negative"),
    providentFund: moneyField.min(0, "PF cannot be negative"),
    cgis: moneyField.min(0, "CGIS cannot be negative"),
    promotedInLastTenMonths: z.enum(["yes", "no"]),
    monthlyBasicPay: z.array(moneyField.min(0, "Monthly Basic Pay cannot be negative")).length(10),
    fixedMedicalAllowance: z.enum(["yes", "no"]),
    commutationOpted: z.enum(["yes", "no"]),
    commutationPercentage: z.coerce.number().min(0).max(40),
    medicalRetirementApproved: z.enum(["yes", "no"]),
    notionalServiceYears: z.coerce.number().min(0),
    notionalServiceMonths: z.coerce.number().min(0).max(11),
    pensionSanctionPercentage: z.coerce.number().min(0).max(100),
    dateOfDeath: z.string().optional(),
    spouseAvailable: z.enum(["yes", "no"]),
    familyPensionEligible: z.enum(["yes", "no"]),
    compassionateAllowanceSanctioned: z.enum(["yes", "no"]),
    technicalResignation: z.enum(["yes", "no"]),
  })
  .superRefine((data, ctx) => {
    const todayStr = formatDateInput(new Date());
    const dob = parseDateInput(data.dateOfBirth);
    const appointmentDate = parseDateInput(data.dateOfAppointment);

    if (!data.dateOfBirth) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["dateOfBirth"],
        message: "Date of birth is required",
      });
    } else if (!dob) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["dateOfBirth"],
        message: "Enter a valid date of birth",
      });
    } else if (data.dateOfBirth > todayStr) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["dateOfBirth"],
        message: "Date of birth cannot be in the future",
      });
    }

    if (data.retirementCategory === "other") {
      if (!data.otherRetirementType) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["otherRetirementType"],
          message: "Select the retirement type",
        });
      }

      if (!data.dateOfExit || data.dateOfExit.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["dateOfExit"],
          message: "Date of Exit is required",
        });
      } else {
        const exitDate = parseDateInput(data.dateOfExit);
        if (!exitDate) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["dateOfExit"],
            message: "Enter a valid exit date",
          });
        } else {
          if (dob && exitDate < dob) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              path: ["dateOfExit"],
              message: "Date of Exit cannot be before Date of Birth",
            });
          }
          if (appointmentDate && exitDate < appointmentDate) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              path: ["dateOfExit"],
              message: "Date of Exit cannot be before Date of Appointment",
            });
          }
          const computedNormal = dob ? calculateRetirementDate(data.dateOfBirth) : null;
          const normalRetirementDate = computedNormal ? parseDateInput(computedNormal) : null;
          if (normalRetirementDate && exitDate > normalRetirementDate) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              path: ["dateOfExit"],
              message: "Date of Exit cannot be after normal retirement date",
            });
          }
        }
      }
    }

    if (data.promotedInLastTenMonths === "yes") {
      data.monthlyBasicPay.forEach((value, index) => {
        if (value <= 0) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["monthlyBasicPay", index],
            message: "Required",
          });
        }
      });
    }
  });

type AssessmentFormValues = z.infer<typeof assessmentSchema>;

const defaultValues: AssessmentFormValues = {
  employeeName: "",
  employeeId: "",
  dateOfBirth: "",
  dateOfAppointment: "",
  dateOfExit: "",
  employeeGroup: "C",
  payMatrixLevel: "",
  designation: "",
  department: "",
  pensionScheme: "OPS",
  employeeCategory: "Non Running",
  retirementCategory: "normal",
  otherRetirementType: undefined,
  currentBasicPay: 0,
  dearnessAllowance: 0,
  lapDays: 0,
  lhapDays: 0,
  providentFund: 0,
  cgis: 0,
  promotedInLastTenMonths: "no",
  monthlyBasicPay: Array.from({ length: 10 }, () => 0),
  fixedMedicalAllowance: "no",
  commutationOpted: "yes",
  commutationPercentage: 40,
  medicalRetirementApproved: "no",
  notionalServiceYears: 0,
  notionalServiceMonths: 0,
  pensionSanctionPercentage: 100,
  dateOfDeath: "",
  spouseAvailable: "yes",
  familyPensionEligible: "yes",
  compassionateAllowanceSanctioned: "no",
  technicalResignation: "no",
};

const draftStorageKey = "railassist:settlement-assessment-draft";
const submittedStorageKey = "railassist:settlement-assessment";

function getInitialValues(): AssessmentFormValues {
  // Always return clean default values to prevent data leakage across page reloads/sessions
  return defaultValues;
}

function SettlementAssessmentPage() {
  const navigate = useNavigate();
  const initialValues = useMemo(() => getInitialValues(), []);
  const form = useForm<AssessmentFormValues>({
    resolver: zodResolver(assessmentSchema),
    defaultValues: initialValues,
    mode: "onBlur",
    shouldUnregister: false,
  });

  const handleClearForm = () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem(draftStorageKey);
      sessionStorage.removeItem(submittedStorageKey);
      sessionStorage.removeItem("railassist:active-report-snapshot");
      localStorage.removeItem(draftStorageKey);
      localStorage.removeItem(submittedStorageKey);
    }
    form.reset(defaultValues);
    toast.success("Assessment form cleared. You can start a fresh assessment.");
  };

  useEffect(() => {
    // Clear storage on initial mount/reload to keep employee data completely ephemeral & secure
    if (typeof window !== "undefined") {
      sessionStorage.removeItem(draftStorageKey);
      sessionStorage.removeItem("railassist:active-report-snapshot");
      localStorage.removeItem(draftStorageKey);
      localStorage.removeItem(submittedStorageKey);
    }
  }, []);

  const [
    employeeName,
    dateOfBirth,
    dateOfAppointment,
    dateOfExit,
    pensionScheme,
    retirementCategory,
    otherRetirementType,
    currentBasicPay,
    providentFund,
    cgis,
    promotedInLastTenMonths,
    monthlyBasicPay,
    fixedMedicalAllowance,
    commutationOpted,
    commutationPercentage,
    medicalRetirementApproved,
    notionalServiceYears,
    notionalServiceMonths,
    pensionSanctionPercentage,
    spouseAvailable,
    familyPensionEligible,
    compassionateAllowanceSanctioned,
    technicalResignation,
  ] = useWatch({
    control: form.control,
    name: [
      "employeeName",
      "dateOfBirth",
      "dateOfAppointment",
      "dateOfExit",
      "pensionScheme",
      "retirementCategory",
      "otherRetirementType",
      "currentBasicPay",
      "providentFund",
      "cgis",
      "promotedInLastTenMonths",
      "monthlyBasicPay",
      "fixedMedicalAllowance",
      "commutationOpted",
      "commutationPercentage",
      "medicalRetirementApproved",
      "notionalServiceYears",
      "notionalServiceMonths",
      "pensionSanctionPercentage",
      "spouseAvailable",
      "familyPensionEligible",
      "compassionateAllowanceSanctioned",
      "technicalResignation",
    ],
  });

  const retirementDate =
    retirementCategory === "normal"
      ? dateOfBirth
        ? calculateRetirementDate(dateOfBirth)
        : ""
      : dateOfExit || "";
  const currentAge = calculateCurrentAge(dateOfBirth);
  const ageNextBirthday = calculateAgeNextBirthday(dateOfBirth);
  const baseQualifyingService = calculateQualifyingService(dateOfAppointment, retirementDate);
  const qualifyingService =
    retirementCategory === "other" && otherRetirementType === "medical" && baseQualifyingService
      ? addQualifyingService(baseQualifyingService, {
          years: Number(notionalServiceYears || 0),
          months: Number(notionalServiceMonths || 0),
        })
      : baseQualifyingService;
  const promoted = promotedInLastTenMonths === "yes";
  const emolumentsSummary = determineEmoluments(
    Number(currentBasicPay || 0),
    promoted,
    monthlyBasicPay,
  );
  const fmaSummary = determineFma(fixedMedicalAllowance === "yes");

  useEffect(() => {
    if (retirementCategory === "normal" && dateOfBirth) {
      const computed = calculateRetirementDate(dateOfBirth);
      if (computed && form.getValues("dateOfExit") !== computed) {
        form.setValue("dateOfExit", computed, { shouldValidate: true });
      }
    } else if (retirementCategory === "other") {
      const computedNormal = dateOfBirth ? calculateRetirementDate(dateOfBirth) : "";
      if (computedNormal && form.getValues("dateOfExit") === computedNormal) {
        form.setValue("dateOfExit", "", { shouldValidate: true });
      }
    }
  }, [dateOfBirth, retirementCategory, form]);

  const buildAssessment = (data: AssessmentFormValues): SettlementAssessment => {
    const computedRetirementDate =
      data.retirementCategory === "normal"
        ? calculateRetirementDate(data.dateOfBirth)
        : data.dateOfExit || "";
    const computedService = calculateQualifyingService(
      data.dateOfAppointment,
      computedRetirementDate,
    );
    const service: QualifyingService =
      data.retirementCategory === "other" &&
      data.otherRetirementType === "medical" &&
      computedService
        ? addQualifyingService(computedService, {
            years: data.notionalServiceYears,
            months: data.notionalServiceMonths,
          })
        : (computedService ?? { years: 0, months: 0, days: 0 });
    const wasPromoted = data.promotedInLastTenMonths === "yes";
    const computedEmoluments = determineEmoluments(
      data.currentBasicPay,
      wasPromoted,
      data.monthlyBasicPay,
    );
    const computedFma = determineFma(data.fixedMedicalAllowance === "yes");

    const salaryDetails: SalaryDetails = {
      currentBasicPay: data.currentBasicPay,
      dearnessAllowance: data.dearnessAllowance,
      lapDays: data.lapDays,
      lhapDays: data.lhapDays,
      providentFund: data.providentFund,
      cgis: data.cgis,
    };
    const promotionDetails: PromotionDetails = {
      promotedInLastTenMonths: wasPromoted,
      monthlyBasicPay: wasPromoted ? data.monthlyBasicPay : [],
      averageLastTenMonthsBasicPay: computedEmoluments.averageLastTenMonthsBasicPay,
      calculationBasis: computedEmoluments.calculationBasis,
      emoluments: computedEmoluments.emoluments,
    };
    const medicalBenefits: MedicalBenefits = {
      fixedMedicalAllowance: data.fixedMedicalAllowance === "yes",
      ...computedFma,
    };
    const otherRetirementDetails: OtherRetirementDetails = {
      medicalRetirementApproved: data.medicalRetirementApproved === "yes",
      notionalServiceAddition: {
        years: data.notionalServiceYears,
        months: data.notionalServiceMonths,
        days: 0,
      },
      pensionSanctionPercentage: data.pensionSanctionPercentage,
      spouseAvailable: data.spouseAvailable === "yes",
      familyPensionEligible: data.familyPensionEligible === "yes",
      compassionateAllowanceSanctioned: data.compassionateAllowanceSanctioned === "yes",
      technicalResignation: data.technicalResignation === "yes",
    };

    return {
      employeeDetails: {
        employeeName: data.employeeName,
        employeeId: data.employeeId || undefined,
        dateOfBirth: data.dateOfBirth,
        dateOfAppointment: data.dateOfAppointment,
        employeeGroup: data.employeeGroup as EmployeeGroup,
        payMatrixLevel: data.payMatrixLevel,
        designation: data.designation || undefined,
        department: data.department || undefined,
      },
      serviceDetails: {
        pensionScheme: data.pensionScheme as PensionScheme,
        employeeCategory: data.employeeCategory,
        retirementCategory: data.retirementCategory as RetirementCategory,
        otherRetirementType:
          data.retirementCategory === "other" ? data.otherRetirementType : undefined,
        dateOfExit: computedRetirementDate,
        qualifyingService: service,
        otherRetirementDetails:
          data.retirementCategory === "other" ? otherRetirementDetails : undefined,
      },
      salaryDetails,
      promotionDetails,
      medicalBenefits,
      commutationDetails: {
        commutationOpted: data.commutationOpted === "yes",
        commutationPercentage: data.commutationPercentage,
      },
    };
  };

  const onSubmit = (data: AssessmentFormValues) => {
    const assessment = buildAssessment(data);
    console.log("SettlementAssessment", assessment);
    sessionStorage.setItem(submittedStorageKey, JSON.stringify(assessment));
    navigate({ to: "/employee/result" });
  };

  const onError = (errors: any) => {
    console.log("Form validation errors:", errors);
    const errorKeys = Object.keys(errors);
    if (errorKeys.length > 0) {
      const firstKey = errorKeys[0];
      const element =
        document.querySelector(`[name="${firstKey}"]`) ||
        document.querySelector(`[name^="${firstKey}"]`) ||
        document.querySelector(".text-destructive");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  return (
    <>
      <PageHeader
        title="Settlement Assessment"
        description="Collect employee, service, salary, promotion, medical, and manual inputs for future settlement processing."
        actions={
          <Button
            type="button"
            variant="outline"
            onClick={handleClearForm}
            className="flex items-center gap-1.5 text-xs font-semibold text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/30"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Clear Form
          </Button>
        }
      />

      <Form {...form}>
        <form noValidate onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-6">
          <SectionCard
            title="Employee Details"
            description="Enter the employee identity, service start dates, group, and pay matrix details."
          >
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <TextField control={form.control} name="employeeName" label="Employee Name" required />
              <TextField
                control={form.control}
                name="employeeId"
                label="Employee ID"
                placeholder="Optional"
              />
              <TextField
                control={form.control}
                name="dateOfBirth"
                label="Date of Birth"
                type="date"
                required
              />
              <TextField
                control={form.control}
                name="dateOfAppointment"
                label="Date of Appointment"
                type="date"
                required
              />
              <ReadOnlyMetric
                label="Current Age"
                value={currentAge === null ? "Enter Date of Birth" : String(currentAge)}
              />
              <ReadOnlyMetric
                label="Age Next Birthday"
                value={ageNextBirthday === null ? "Enter Date of Birth" : String(ageNextBirthday)}
              />
              <SelectField
                control={form.control}
                name="employeeGroup"
                label="Employee Group"
                options={employeeGroups.map((group) => ({ value: group, label: group }))}
                required
              />
              <TextField
                control={form.control}
                name="payMatrixLevel"
                label="Pay Matrix Level"
                placeholder="Example: Level 7"
                required
              />
              <TextField
                control={form.control}
                name="designation"
                label="Designation"
                placeholder="Optional"
              />
              <TextField
                control={form.control}
                name="department"
                label="Department"
                placeholder="Optional"
              />
            </div>
          </SectionCard>

          <SectionCard
            title="Service Details"
            description="Retirement date and qualifying service details for settlement processing."
          >
            <div className="grid gap-4 lg:grid-cols-3">
              <ReadOnlyMetric
                label={getExitDateLabel(retirementCategory, otherRetirementType)}
                value={
                  retirementCategory === "normal"
                    ? retirementDate
                      ? formatDisplayDate(retirementDate)
                      : "Enter Date of Birth"
                    : dateOfExit
                      ? formatDisplayDate(dateOfExit)
                      : "Enter Date of Exit"
                }
                icon={<CalendarCheck className="h-5 w-5" />}
              />
              <ReadOnlyMetric
                label="Qualifying Service"
                value={formatQualifyingService(qualifyingService)}
                icon={<ClipboardCheck className="h-5 w-5" />}
              />
              <RadioField
                control={form.control}
                name="pensionScheme"
                label="Pension Scheme"
                options={pensionSchemes.map((scheme) => ({ value: scheme, label: scheme }))}
                required
              />
              <RadioField
                control={form.control}
                name="employeeCategory"
                label="Employee Category"
                options={[
                  { value: "Running", label: "Running" },
                  { value: "Non Running", label: "Non Running" },
                ]}
                required
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2 mt-5">
              <RadioField
                control={form.control}
                name="retirementCategory"
                label="Retirement Type"
                options={[
                  { value: "normal", label: "Normal Retirement" },
                  { value: "other", label: "Other Than Normal Retirement" },
                ]}
                required
              />
              {retirementCategory === "other" && (
                <SelectField
                  control={form.control}
                  name="otherRetirementType"
                  label="Other Retirement Type"
                  options={otherRetirementTypes}
                  required
                />
              )}
              {retirementCategory === "other" && (
                <TextField
                  control={form.control}
                  name="dateOfExit"
                  label={getExitDateLabel(retirementCategory, otherRetirementType)}
                  type="date"
                  required
                />
              )}
            </div>

            {retirementCategory === "other" && otherRetirementType === "medical" && (
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                <RadioField
                  control={form.control}
                  name="medicalRetirementApproved"
                  label="Medical Retirement Approved?"
                  options={[
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                  ]}
                />
                <TextField
                  control={form.control}
                  name="notionalServiceYears"
                  label="Notional Service Addition (Years)"
                  type="number"
                />
                <TextField
                  control={form.control}
                  name="notionalServiceMonths"
                  label="Notional Service Addition (Months)"
                  type="number"
                />
              </div>
            )}

            {retirementCategory === "other" && otherRetirementType === "compulsory" && (
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <TextField
                  control={form.control}
                  name="pensionSanctionPercentage"
                  label="Pension Sanction Percentage"
                  type="number"
                />
                <ReadOnlyMetric
                  label="Pension Rule"
                  value={`${pensionSanctionPercentage}% of calculated pension will be admitted.`}
                />
              </div>
            )}

            {retirementCategory === "other" && otherRetirementType === "death" && (
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <RadioField
                  control={form.control}
                  name="spouseAvailable"
                  label="Spouse Available?"
                  options={[
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                  ]}
                />
                <RadioField
                  control={form.control}
                  name="familyPensionEligible"
                  label="Family Pension Eligible?"
                  options={[
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                  ]}
                />
              </div>
            )}

            {retirementCategory === "other" && otherRetirementType === "removal" && (
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <RadioField
                  control={form.control}
                  name="compassionateAllowanceSanctioned"
                  label="Compassionate Allowance Sanctioned?"
                  options={[
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                  ]}
                />
              </div>
            )}

            {retirementCategory === "other" && otherRetirementType === "self-resignation" && (
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <RadioField
                  control={form.control}
                  name="technicalResignation"
                  label="Technical Resignation?"
                  options={[
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                  ]}
                />
              </div>
            )}
          </SectionCard>

          <SectionCard
            title="Salary Details"
            description="Enter salary and leave balance details for the calculation engine."
          >
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <TextField
                control={form.control}
                name="currentBasicPay"
                label="Current Basic Pay"
                type="number"
                required
              />
              <TextField
                control={form.control}
                name="dearnessAllowance"
                label="Dearness Allowance (DA %)"
                type="number"
                required
              />
              <TextField control={form.control} name="lapDays" label="LAP Days" type="number" required />
              <TextField control={form.control} name="lhapDays" label="LHAP Days" type="number" required />
            </div>
          </SectionCard>

          <SectionCard
            title="Promotion Details"
            description="Capture last 10 months Basic Pay only when the employee was promoted before retirement."
          >
            <RadioField
              control={form.control}
              name="promotedInLastTenMonths"
              label="Was the employee promoted during the last 10 months before retirement?"
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ]}
              required
            />

            {promotedInLastTenMonths === "yes" && (
              <div className="mt-5 space-y-5">
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                  {Array.from({ length: 10 }, (_, index) => (
                    <FormField
                      key={index}
                      control={form.control}
                      name={`monthlyBasicPay.${index}`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{`Month ${index + 1} Basic Pay *`}</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min={0}
                              name={field.name}
                              ref={field.ref}
                              onBlur={field.onBlur}
                              onChange={field.onChange}
                              value={field.value == null ? "" : String(field.value)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 mt-5">
              <ReadOnlyMetric
                label="Last Basic Pay"
                value={formatCurrency(emolumentsSummary.lastBasicPay)}
              />
              <ReadOnlyMetric
                label="Average Last 10 Months Basic Pay"
                value={formatCurrency(emolumentsSummary.averageLastTenMonthsBasicPay)}
              />
              <ReadOnlyMetric
                label="Calculation Basis"
                value={emolumentsSummary.calculationBasis}
              />
              <ReadOnlyMetric
                label="Pension Emoluments"
                value={formatCurrency(emolumentsSummary.emoluments)}
              />
            </div>
          </SectionCard>

          <SectionCard
            title="Medical Benefits"
            description="Capture the employee option for Fixed Medical Allowance."
          >
            <RadioField
              control={form.control}
              name="fixedMedicalAllowance"
              label="Would you like to opt for Fixed Medical Allowance (FMA)?"
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ]}
              required
            />
            <div className="grid gap-4 md:grid-cols-3 mt-5">
              <ReadOnlyMetric label="FMA Status" value={fmaSummary.fmaEligibility} />
              <ReadOnlyMetric
                label="Monthly Amount"
                value={formatCurrency(fmaSummary.fmaMonthlyAmount)}
              />
              <ReadOnlyMetric label="Reason" value={fmaSummary.fmaReason} />
            </div>
          </SectionCard>

          <SectionCard
            title="Commutation"
            description="Capture commutation option and percentage. Factor is fetched by Age Next Birthday."
          >
            <div className="grid gap-4 md:grid-cols-2">
              <RadioField
                control={form.control}
                name="commutationOpted"
                label="Do you want to commute pension?"
                options={[
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" },
                ]}
                required
              />
              <FormField
                control={form.control}
                name="commutationPercentage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Percentage of Pension to Commute: {commutationPercentage}%
                    </FormLabel>
                    <FormControl>
                      <Slider
                        min={0}
                        max={40}
                        step={1}
                        value={[Number(field.value ?? 0)]}
                        onValueChange={(value) => field.onChange(value[0] ?? 0)}
                        disabled={commutationOpted !== "yes"}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </SectionCard>

          {pensionScheme === "OPS" && (
            <SectionCard
              title="Additional Inputs"
              description="Manual OPS values entered by the employee for settlement processing."
            >
              <div className="grid gap-4 md:grid-cols-2">
                <TextField
                  control={form.control}
                  name="providentFund"
                  label="Provident Fund (PF)"
                  type="number"
                />
                <TextField control={form.control} name="cgis" label="CGIS" type="number" />
              </div>
            </SectionCard>
          )}

          <SectionCard
            title="Review"
            description="Verify the collected inputs before preparing the SettlementAssessment object."
          >
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              <ReviewItem label="Employee Name" value={employeeName || "Not entered"} />
              <ReviewItem label="Pension Scheme" value={pensionScheme} />
              <ReviewItem
                label="Retirement Type"
                value={
                  retirementCategory === "normal"
                    ? "Normal Retirement"
                    : (otherRetirementTypes.find((item) => item.value === otherRetirementType)
                        ?.label ?? "Not selected")
                }
              />
              <ReviewItem
                label={getExitDateLabel(retirementCategory, otherRetirementType)}
                value={retirementDate ? formatDisplayDate(retirementDate) : "Not available"}
              />
              <ReviewItem
                label="Current Age"
                value={currentAge === null ? "Not available" : String(currentAge)}
              />
              <ReviewItem
                label="Age Next Birthday"
                value={ageNextBirthday === null ? "Not available" : String(ageNextBirthday)}
              />
              <ReviewItem
                label="Qualifying Service"
                value={formatQualifyingService(qualifyingService)}
              />
              <ReviewItem label="Basic Pay" value={formatCurrency(Number(currentBasicPay || 0))} />
              <ReviewItem
                label="Pension Emoluments"
                value={formatCurrency(emolumentsSummary.emoluments)}
              />
              <ReviewItem label="PF" value={formatCurrency(Number(providentFund || 0))} />
              <ReviewItem label="CGIS" value={formatCurrency(Number(cgis || 0))} />
              <ReviewItem
                label="FMA Option"
                value={fixedMedicalAllowance === "yes" ? "Yes" : "No"}
              />
              <ReviewItem label="FMA Status" value={fmaSummary.fmaEligibility} />
              <ReviewItem
                label="Commutation"
                value={commutationOpted === "yes" ? `${commutationPercentage}%` : "No"}
              />
              <ReviewItem
                label="Promotion Status"
                value={promotedInLastTenMonths === "yes" ? "Promoted" : "Not promoted"}
              />
              {retirementCategory === "other" && otherRetirementType === "medical" && (
                <>
                  <ReviewItem
                    label="Medical Approval"
                    value={medicalRetirementApproved === "yes" ? "Approved" : "Not approved"}
                  />
                  <ReviewItem
                    label="Notional Service"
                    value={`${notionalServiceYears || 0} years, ${notionalServiceMonths || 0} months`}
                  />
                </>
              )}
              {retirementCategory === "other" && otherRetirementType === "death" && (
                <>
                  <ReviewItem
                    label="Spouse Available"
                    value={spouseAvailable === "yes" ? "Yes" : "No"}
                  />
                  <ReviewItem
                    label="Family Pension Eligible"
                    value={familyPensionEligible === "yes" ? "Yes" : "No"}
                  />
                </>
              )}
              {retirementCategory === "other" && otherRetirementType === "compulsory" && (
                <ReviewItem label="Pension Sanction" value={`${pensionSanctionPercentage}%`} />
              )}
              {retirementCategory === "other" && otherRetirementType === "removal" && (
                <ReviewItem
                  label="Compassionate Allowance"
                  value={
                    compassionateAllowanceSanctioned === "yes" ? "Sanctioned" : "Not sanctioned"
                  }
                />
              )}
              {retirementCategory === "other" && otherRetirementType === "self-resignation" && (
                <ReviewItem
                  label="Technical Resignation"
                  value={technicalResignation === "yes" ? "Yes" : "No"}
                />
              )}
            </div>
          </SectionCard>

          <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={handleClearForm}
              className="w-full sm:w-auto text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/30 text-base"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Clear Assessment Form
            </Button>
            <Button type="submit" size="lg" className="w-full sm:w-auto text-base font-semibold">
              Check Settlement
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}

type FieldControl = Control<AssessmentFormValues>;

function TextField({
  control,
  name,
  label,
  type = "text",
  placeholder,
  required,
}: {
  control: FieldControl;
  name: FieldPath<AssessmentFormValues>;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label}
            {required && <span className="text-destructive"> *</span>}
          </FormLabel>
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder}
              min={type === "number" ? 0 : undefined}
              name={field.name}
              ref={field.ref}
              onBlur={field.onBlur}
              onChange={field.onChange}
              value={field.value == null ? "" : String(field.value)}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function SelectField({
  control,
  name,
  label,
  options,
  required,
}: {
  control: FieldControl;
  name: FieldPath<AssessmentFormValues>;
  label: string;
  options: readonly { value: string; label: string }[];
  required?: boolean;
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label}
            {required && <span className="text-destructive"> *</span>}
          </FormLabel>
          <Select
            onValueChange={field.onChange}
            value={typeof field.value === "string" ? field.value : undefined}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function RadioField({
  control,
  name,
  label,
  options,
  required,
}: {
  control: FieldControl;
  name: FieldPath<AssessmentFormValues>;
  label: string;
  options: readonly { value: string; label: string }[];
  required?: boolean;
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label}
            {required && <span className="text-destructive"> *</span>}
          </FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              value={typeof field.value === "string" ? field.value : undefined}
              className="grid gap-2 sm:grid-cols-2"
            >
              {options.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm cursor-pointer hover:bg-accent"
                >
                  <RadioGroupItem value={option.value} />
                  <span>{option.label}</span>
                </label>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function ReadOnlyMetric({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="rounded-md border border-border bg-muted/30 p-4">
      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {icon}
        {label}
      </div>
      <div className="mt-2 text-lg font-semibold text-foreground">{value}</div>
    </div>
  );
}

function ReviewItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-border bg-background p-3">
      <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </div>
      <div className="mt-1 text-sm font-medium text-foreground">{value}</div>
    </div>
  );
}
