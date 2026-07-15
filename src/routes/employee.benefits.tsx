import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { CalendarCheck, ClipboardCheck } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useForm, useWatch, type Control, type FieldPath } from "react-hook-form";
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
  formatDisplayDate,
  formatCurrency,
  formatQualifyingService,
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
    const today = new Date();
    const dob = new Date(data.dateOfBirth);
    const retirementDate = calculateRetirementDate(data.dateOfBirth);

    if (Number.isNaN(dob.getTime())) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["dateOfBirth"],
        message: "Enter a valid date of birth",
      });
    } else if (dob > today) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["dateOfBirth"],
        message: "Date of birth cannot be in the future",
      });
    }

    if (data.retirementCategory === "other" && !data.otherRetirementType) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["otherRetirementType"],
        message: "Select the retirement type",
      });
    }

    if (
      data.retirementCategory === "other" &&
      data.otherRetirementType === "death" &&
      !data.dateOfDeath
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["dateOfDeath"],
        message: "Date of death is required for death cases",
      });
    }

    if (retirementDate) {
      const appointmentDate = new Date(data.dateOfAppointment);
      const calculatedRetirementDate = new Date(retirementDate);
      if (Number.isNaN(appointmentDate.getTime())) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["dateOfAppointment"],
          message: "Enter a valid appointment date",
        });
      } else if (appointmentDate >= calculatedRetirementDate) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["dateOfAppointment"],
          message: "Appointment date must be before retirement date",
        });
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
  if (typeof window === "undefined") return defaultValues;

  const raw = sessionStorage.getItem(draftStorageKey);
  if (!raw) return defaultValues;

  try {
    const parsed = JSON.parse(raw) as Partial<AssessmentFormValues>;
    return {
      ...defaultValues,
      ...parsed,
      monthlyBasicPay: Array.from({ length: 10 }, (_, index) =>
        Number(parsed.monthlyBasicPay?.[index] ?? defaultValues.monthlyBasicPay[index]),
      ),
    };
  } catch {
    return defaultValues;
  }
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

  useEffect(() => {
    const subscription = form.watch((value) => {
      sessionStorage.setItem(draftStorageKey, JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const [
    employeeName,
    dateOfBirth,
    dateOfAppointment,
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
    dateOfDeath,
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
      "dateOfDeath",
      "spouseAvailable",
      "familyPensionEligible",
      "compassionateAllowanceSanctioned",
      "technicalResignation",
    ],
  });

  const computedNormalRetirementDate = calculateRetirementDate(dateOfBirth);
  const retirementDate =
    retirementCategory === "other" && otherRetirementType === "death" && dateOfDeath
      ? dateOfDeath
      : computedNormalRetirementDate;
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

  const buildAssessment = (data: AssessmentFormValues): SettlementAssessment => {
    const computedNormalDate = calculateRetirementDate(data.dateOfBirth);
    const computedRetirementDate =
      data.retirementCategory === "other" &&
      data.otherRetirementType === "death" &&
      data.dateOfDeath
        ? data.dateOfDeath
        : computedNormalDate;
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
      dateOfDeath: data.dateOfDeath || undefined,
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
        retirementDate: computedRetirementDate,
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

  return (
    <>
      <PageHeader
        title="Settlement Assessment"
        description="Collect employee, service, salary, promotion, medical, and manual inputs for future settlement processing."
      />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <SectionCard
            title="Employee Details"
            description="Enter the employee identity, service start dates, group, and pay matrix details."
          >
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <TextField control={form.control} name="employeeName" label="Employee Name" />
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
              />
              <TextField
                control={form.control}
                name="dateOfAppointment"
                label="Date of Appointment"
                type="date"
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
              />
              <TextField
                control={form.control}
                name="payMatrixLevel"
                label="Pay Matrix Level"
                placeholder="Example: Level 7"
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
            description="Retirement date and qualifying service are calculated from DOB and appointment date."
          >
            <div className="grid gap-4 lg:grid-cols-3">
              <ReadOnlyMetric
                label="Retirement Date"
                value={retirementDate ? formatDisplayDate(retirementDate) : "Enter Date of Birth"}
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
              />
              <RadioField
                control={form.control}
                name="employeeCategory"
                label="Employee Category"
                options={[
                  { value: "Running", label: "Running" },
                  { value: "Non Running", label: "Non Running" },
                ]}
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
              />
              {retirementCategory === "other" && (
                <SelectField
                  control={form.control}
                  name="otherRetirementType"
                  label="Other Retirement Type"
                  options={otherRetirementTypes}
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
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                <TextField
                  control={form.control}
                  name="dateOfDeath"
                  label="Date of Death"
                  type="date"
                />
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
              />
              <TextField
                control={form.control}
                name="dearnessAllowance"
                label="Dearness Allowance (DA %)"
                type="number"
              />
              <TextField control={form.control} name="lapDays" label="LAP Days" type="number" />
              <TextField control={form.control} name="lhapDays" label="LHAP Days" type="number" />
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
                          <FormLabel>{`Month ${index + 1} Basic Pay`}</FormLabel>
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
                label="Retirement Date"
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
                    label="Date of Death"
                    value={dateOfDeath ? formatDisplayDate(dateOfDeath) : "Not entered"}
                  />
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

          <div className="flex justify-end">
            <Button type="submit" size="lg" className="w-full md:w-auto text-base">
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
}: {
  control: FieldControl;
  name: FieldPath<AssessmentFormValues>;
  label: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
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
}: {
  control: FieldControl;
  name: FieldPath<AssessmentFormValues>;
  label: string;
  options: readonly { value: string; label: string }[];
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
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
}: {
  control: FieldControl;
  name: FieldPath<AssessmentFormValues>;
  label: string;
  options: readonly { value: string; label: string }[];
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
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
