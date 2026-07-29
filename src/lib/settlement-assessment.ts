import { formatIndianDate } from "./indian-date-time.ts";

export type EmployeeGroup = "A" | "B" | "C" | "D";
export type PensionScheme = "OPS" | "UPS" | "NPS";
export type EmployeeCategory = "Running" | "Non Running";
export type RetirementCategory = "normal" | "other";
export type OtherRetirementType =
  "voluntary" | "medical" | "compulsory" | "death" | "removal" | "dismissal" | "self-resignation";

export interface EmployeeDetails {
  employeeName: string;
  employeeId?: string;
  dateOfBirth: string;
  dateOfAppointment: string;
  employeeGroup: EmployeeGroup;
  payMatrixLevel: string;
  designation?: string;
  department?: string;
}

export interface ServiceDetails {
  pensionScheme: PensionScheme;
  employeeCategory: EmployeeCategory;
  retirementCategory: RetirementCategory;
  otherRetirementType?: OtherRetirementType;
  dateOfExit: string;
  qualifyingService: QualifyingService;
  otherRetirementDetails?: OtherRetirementDetails;
}

export interface OtherRetirementDetails {
  medicalRetirementApproved?: boolean;
  notionalServiceAddition?: QualifyingService;
  pensionSanctionPercentage?: number;
  spouseAvailable?: boolean;
  familyPensionEligible?: boolean;
  compassionateAllowanceSanctioned?: boolean;
  technicalResignation?: boolean;
  relhsSubscriptionOpted?: boolean;
}

export interface CommutationDetails {
  commutationOpted: boolean;
  commutationPercentage: number;
}

export interface SalaryDetails {
  currentBasicPay: number;
  dearnessAllowance: number;
  lapDays: number;
  lhapDays: number;
  providentFund: number;
  cgis: number;
}

export interface PromotionDetails {
  promotedInLastTenMonths: boolean;
  monthlyBasicPay: number[];
  averageLastTenMonthsBasicPay: number;
  calculationBasis: CalculationBasis;
  emoluments: number;
}

export interface MedicalBenefits {
  fixedMedicalAllowance: boolean;
  fmaOpted: boolean;
  fmaEligibility: FmaEligibility;
  fmaMonthlyAmount: number;
  fmaReason: string;
}

export interface QualifyingService {
  years: number;
  months: number;
  days: number;
}

export interface SettlementAssessment {
  employeeDetails: EmployeeDetails;
  serviceDetails: ServiceDetails;
  salaryDetails: SalaryDetails;
  promotionDetails: PromotionDetails;
  medicalBenefits: MedicalBenefits;
  commutationDetails: CommutationDetails;
}

export type CalculationBasis = "Current Basic Pay" | "Average Last 10 Months Basic Pay";
export type FmaEligibility = "Eligible" | "Not Opted";

export interface EmolumentsSummary {
  lastBasicPay: number;
  averageLastTenMonthsBasicPay: number;
  calculationBasis: CalculationBasis;
  emoluments: number;
}

export interface FmaSummary {
  fmaOpted: boolean;
  fmaEligibility: FmaEligibility;
  fmaMonthlyAmount: number;
  fmaReason: string;
}

export function parseDateInput(value: string): Date | null {
  if (!value) return null;
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return null;
  if (year < 1900 || year > 2100) return null;
  const date = new Date(year, month - 1, day);
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
    return null;
  }
  return date;
}

export function formatDateInput(date: Date | null): string {
  if (!date) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function formatDisplayDate(value: string): string {
  const date = parseDateInput(value);
  if (!date) return "Not available";
  return formatIndianDate(date);
}

export function calculateRetirementDate(dateOfBirth: string): string {
  const dob = parseDateInput(dateOfBirth);
  if (!dob) return "";

  const retirement =
    dob.getDate() === 1
      ? new Date(dob.getFullYear() + 60, dob.getMonth(), 0)
      : new Date(dob.getFullYear() + 60, dob.getMonth() + 1, 0);

  return formatDateInput(retirement);
}

export function calculateCurrentAge(dateOfBirth: string, asOf: Date = new Date()): number | null {
  const dob = parseDateInput(dateOfBirth);
  if (!dob || dob > asOf) return null;

  let age = asOf.getFullYear() - dob.getFullYear();
  const birthdayThisYear = new Date(asOf.getFullYear(), dob.getMonth(), dob.getDate());

  if (asOf < birthdayThisYear) {
    age -= 1;
  }

  return age;
}

export function calculateAgeNextBirthday(
  dateOfBirth: string,
  asOf: Date = new Date(),
): number | null {
  const currentAge = calculateCurrentAge(dateOfBirth, asOf);
  return currentAge === null ? null : currentAge + 1;
}

export function calculateQualifyingService(
  appointmentDateValue: string,
  retirementDateValue: string,
): QualifyingService | null {
  const appointmentDate = parseDateInput(appointmentDateValue);
  const retirementDate = parseDateInput(retirementDateValue);
  if (!appointmentDate || !retirementDate || appointmentDate > retirementDate) return null;

  const end = new Date(
    retirementDate.getFullYear(),
    retirementDate.getMonth(),
    retirementDate.getDate() + 1,
  );
  let years = end.getFullYear() - appointmentDate.getFullYear();
  let months = end.getMonth() - appointmentDate.getMonth();
  let days = end.getDate() - appointmentDate.getDate();

  if (days < 0) {
    months -= 1;
    days += new Date(end.getFullYear(), end.getMonth(), 0).getDate();
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return { years, months, days };
}

export function formatQualifyingService(service: QualifyingService | null): string {
  if (!service) return "Enter valid service dates";
  return `${service.years} years, ${service.months} months, ${service.days} days`;
}

export function addQualifyingService(
  service: QualifyingService,
  addition: Partial<QualifyingService> = {},
): QualifyingService {
  const totalMonths = service.months + Number(addition.months ?? 0);
  return {
    years: service.years + Number(addition.years ?? 0) + Math.floor(totalMonths / 12),
    months: totalMonths % 12,
    days: service.days + Number(addition.days ?? 0),
  };
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(value) ? value : 0);
}

export function calculateAverageLastTenMonths(monthlyBasicPay: number[]): number {
  const values = Array.from({ length: 10 }, (_, index) => Number(monthlyBasicPay[index]) || 0);
  const total = values.reduce((sum, value) => sum + value, 0);
  return Math.round(total / 10);
}

export function determineEmoluments(
  currentBasicPay: number,
  promotedInLastTenMonths: boolean,
  monthlyBasicPay: number[],
): EmolumentsSummary {
  const lastBasicPay = Number(currentBasicPay) || 0;
  const averageLastTenMonthsBasicPay = promotedInLastTenMonths
    ? calculateAverageLastTenMonths(monthlyBasicPay)
    : lastBasicPay;
  const useAverage = promotedInLastTenMonths && averageLastTenMonthsBasicPay > lastBasicPay;

  return {
    lastBasicPay,
    averageLastTenMonthsBasicPay,
    calculationBasis: useAverage ? "Average Last 10 Months Basic Pay" : "Current Basic Pay",
    emoluments: useAverage ? averageLastTenMonthsBasicPay : lastBasicPay,
  };
}

export function determineFma(fmaOpted: boolean): FmaSummary {
  return {
    fmaOpted,
    fmaEligibility: fmaOpted ? "Eligible" : "Not Opted",
    fmaMonthlyAmount: fmaOpted ? 1000 : 0,
    fmaReason: fmaOpted
      ? "Employee opted for Fixed Medical Allowance."
      : "Employee did not opt for Fixed Medical Allowance.",
  };
}

export function getExitDateLabel(retirementCategory: string, otherRetirementType?: string): string {
  if (retirementCategory === "normal") {
    return "Retirement Date";
  }
  switch (otherRetirementType) {
    case "voluntary":
      return "Voluntary Retirement Date";
    case "premature":
      return "Premature Retirement Date";
    case "medical":
      return "Medical Invalidation Date";
    case "compulsory":
      return "Compulsory Retirement Date";
    case "self-resignation":
    case "resignation":
      return "Resignation Date";
    case "removal":
      return "Removal Date";
    case "dismissal":
      return "Dismissal Date";
    case "death":
    case "death-after-retirement":
      return "Date of Death";
    case "invalid":
    case "disability":
      return "Invalid Retirement Date";
    default:
      return "Exit Date";
  }
}
