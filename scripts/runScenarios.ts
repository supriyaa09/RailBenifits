// scripts/runScenarios.ts
import { runCalculationEngine } from "../src/calculations/CalculationEngine.ts";
import { writeFileSync } from "fs";
import type { SettlementAssessment } from "../src/lib/settlement-assessment.ts";
import type { SettlementResult } from "../src/rules/RuleTypes.ts";

interface Scenario {
  name: string;
  assessment: SettlementAssessment;
  ruleResult: SettlementResult;
}

const scenarios: Scenario[] = [
  // 1. Normal Retirement - 20 years service
  {
    name: "Normal Retirement - 20 years service",
    assessment: {
      employeeDetails: {
        employeeName: "John Doe",
        dateOfBirth: "1965-01-01",
        dateOfAppointment: "1995-01-01",
        employeeGroup: "A",
        payMatrixLevel: "Level1",
      },
      serviceDetails: {
        pensionScheme: "OPS",
        employeeCategory: "Running",
        retirementCategory: "normal",
        qualifyingService: { years: 20, months: 0, days: 0 },
        retirementDate: "2025-01-01",
      },
      promotionDetails: {
        promotedInLastTenMonths: false,
        monthlyBasicPay: [],
        averageLastTenMonthsBasicPay: 0,
        calculationBasis: "Current Basic Pay",
        emoluments: 50000,
      },
      salaryDetails: {
        currentBasicPay: 35000,
        dearnessAllowance: 12000,
        lapDays: 30,
        lhapDays: 15,
        providentFund: 0,
        cgis: 0,
      },
      medicalBenefits: {
        fixedMedicalAllowance: false,
        fmaOpted: false,
        fmaEligibility: "Not Opted",
        fmaMonthlyAmount: 0,
        fmaReason: "",
      },
      commutationDetails: { commutationOpted: false, commutationPercentage: 0 },
    } as any,
    ruleResult: {
      benefits: {
        pension: true,
        familyPension: true,
        retirementGratuity: true,
        deathGratuity: false,
        leaveEncashment: true,
        commutation: true,
        relhs: true,
        cgis: true,
        ctg: true,
      },
    } as any,
  },
  // 2. Voluntary Retirement - 5 years exactly
  {
    name: "Voluntary Retirement - 5 years exactly",
    assessment: {
      employeeDetails: {
        employeeName: "Jane Smith",
        dateOfBirth: "1969-01-01",
        dateOfAppointment: "1999-01-01",
        employeeGroup: "A",
        payMatrixLevel: "Level1",
      },
      serviceDetails: {
        pensionScheme: "OPS",
        employeeCategory: "Running",
        retirementCategory: "other",
        otherRetirementType: "voluntary",
        qualifyingService: { years: 5, months: 0, days: 0 },
        retirementDate: "2024-01-01",
      },
      promotionDetails: {
        promotedInLastTenMonths: false,
        monthlyBasicPay: [],
        averageLastTenMonthsBasicPay: 0,
        calculationBasis: "Current Basic Pay",
        emoluments: 42000,
      },
      salaryDetails: {
        currentBasicPay: 30000,
        dearnessAllowance: 9000,
        lapDays: 20,
        lhapDays: 10,
        providentFund: 0,
        cgis: 0,
      },
      medicalBenefits: {
        fixedMedicalAllowance: false,
        fmaOpted: false,
        fmaEligibility: "Not Opted",
        fmaMonthlyAmount: 0,
        fmaReason: "",
      },
      commutationDetails: { commutationOpted: false, commutationPercentage: 0 },
    } as any,
    ruleResult: {
      benefits: {
        pension: true,
        familyPension: true,
        retirementGratuity: true,
        leaveEncashment: true,
        commutation: true,
      },
    } as any,
  },
  // 3. Medical Invalidation - 4y11m service
  {
    name: "Medical Invalidation - 4y11m service",
    assessment: {
      employeeDetails: {
        employeeName: "Mike Lee",
        dateOfBirth: "1968-01-01",
        dateOfAppointment: "1998-01-01",
        employeeGroup: "A",
        payMatrixLevel: "Level1",
      },
      serviceDetails: {
        pensionScheme: "OPS",
        employeeCategory: "Running",
        retirementCategory: "other",
        otherRetirementType: "medical",
        qualifyingService: { years: 4.92, months: 0, days: 0 },
        retirementDate: "2022-01-01",
      },
      promotionDetails: {
        promotedInLastTenMonths: false,
        monthlyBasicPay: [],
        averageLastTenMonthsBasicPay: 0,
        calculationBasis: "Current Basic Pay",
        emoluments: 38000,
      },
      salaryDetails: {
        currentBasicPay: 26000,
        dearnessAllowance: 8000,
        lapDays: 15,
        lhapDays: 5,
        providentFund: 0,
        cgis: 0,
      },
      medicalBenefits: {
        fixedMedicalAllowance: false,
        fmaOpted: false,
        fmaEligibility: "Not Opted",
        fmaMonthlyAmount: 0,
        fmaReason: "",
      },
      commutationDetails: { commutationOpted: false, commutationPercentage: 0 },
    } as any,
    ruleResult: {
      benefits: {
        pension: true,
        familyPension: true,
        retirementGratuity: false,
        leaveEncashment: true,
      },
    } as any,
  },
  // 4. Death in Service - 12 years
  {
    name: "Death in Service - 12 years",
    assessment: {
      employeeDetails: {
        employeeName: "Anna Brown",
        dateOfBirth: "1970-01-01",
        dateOfAppointment: "2000-01-01",
        employeeGroup: "A",
        payMatrixLevel: "Level1",
      },
      serviceDetails: {
        pensionScheme: "OPS",
        employeeCategory: "Running",
        retirementCategory: "other",
        otherRetirementType: "death",
        qualifyingService: { years: 12, months: 0, days: 0 },
        retirementDate: "2020-01-01",
      },
      promotionDetails: {
        promotedInLastTenMonths: false,
        monthlyBasicPay: [],
        averageLastTenMonthsBasicPay: 0,
        calculationBasis: "Current Basic Pay",
        emoluments: 60000,
      },
      salaryDetails: {
        currentBasicPay: 40000,
        dearnessAllowance: 15000,
        lapDays: 30,
        lhapDays: 20,
        providentFund: 0,
        cgis: 0,
      },
      medicalBenefits: {
        fixedMedicalAllowance: false,
        fmaOpted: false,
        fmaEligibility: "Not Opted",
        fmaMonthlyAmount: 0,
        fmaReason: "",
      },
      commutationDetails: { commutationOpted: false, commutationPercentage: 0 },
    } as any,
    ruleResult: {
      benefits: { deathGratuity: true, leaveEncashment: true, commutation: true },
    } as any,
  },
  // 5. Death after Retirement - 20 years service
  {
    name: "Death after Retirement - 20 years service",
    assessment: {
      employeeDetails: {
        employeeName: "Peter White",
        dateOfBirth: "1955-01-01",
        dateOfAppointment: "1985-01-01",
        employeeGroup: "A",
        payMatrixLevel: "Level1",
      },
      serviceDetails: {
        pensionScheme: "OPS",
        employeeCategory: "Running",
        retirementCategory: "other",
        otherRetirementType: "death",
        qualifyingService: { years: 20, months: 0, days: 0 },
        retirementDate: "2025-01-01",
      },
      promotionDetails: {
        promotedInLastTenMonths: false,
        monthlyBasicPay: [],
        averageLastTenMonthsBasicPay: 0,
        calculationBasis: "Current Basic Pay",
        emoluments: 65000,
      },
      salaryDetails: {
        currentBasicPay: 42000,
        dearnessAllowance: 18000,
        lapDays: 30,
        lhapDays: 20,
        providentFund: 0,
        cgis: 0,
      },
      medicalBenefits: {
        fixedMedicalAllowance: false,
        fmaOpted: false,
        fmaEligibility: "Not Opted",
        fmaMonthlyAmount: 0,
        fmaReason: "",
      },
      commutationDetails: { commutationOpted: false, commutationPercentage: 0 },
    } as any,
    ruleResult: { benefits: { deathGratuity: true, leaveEncashment: true } } as any,
  },
  // 6. Maximum Gratuity – Service > 30 years, high emoluments
  {
    name: "Maximum Gratuity – Service > 30 years, high emoluments",
    assessment: {
      employeeDetails: {
        employeeName: "Senior Executive",
        dateOfBirth: "1960-01-01",
        dateOfAppointment: "1990-01-01",
        employeeGroup: "A",
        payMatrixLevel: "Level1",
      },
      serviceDetails: {
        pensionScheme: "OPS",
        employeeCategory: "Running",
        retirementCategory: "normal",
        qualifyingService: { years: 35, months: 0, days: 0 },
        retirementDate: "2025-01-01",
      },
      promotionDetails: {
        promotedInLastTenMonths: false,
        monthlyBasicPay: [],
        averageLastTenMonthsBasicPay: 0,
        calculationBasis: "Current Basic Pay",
        emoluments: 200000,
      },
      salaryDetails: {
        currentBasicPay: 130000,
        dearnessAllowance: 50000,
        lapDays: 30,
        lhapDays: 15,
        providentFund: 0,
        cgis: 0,
      },
      medicalBenefits: {
        fixedMedicalAllowance: false,
        fmaOpted: false,
        fmaEligibility: "Not Opted",
        fmaMonthlyAmount: 0,
        fmaReason: "",
      },
      commutationDetails: { commutationOpted: false, commutationPercentage: 0 },
    } as any,
    ruleResult: { benefits: { retirementGratuity: true, leaveEncashment: true } } as any,
  },
  // 7. Maximum Leave Encashment – high leave balance
  {
    name: "Maximum Leave Encashment – high leave balance",
    assessment: {
      employeeDetails: {
        employeeName: "Long Service",
        dateOfBirth: "1965-01-01",
        dateOfAppointment: "1990-01-01",
        employeeGroup: "A",
        payMatrixLevel: "Level1",
      },
      serviceDetails: {
        pensionScheme: "OPS",
        employeeCategory: "Running",
        retirementCategory: "normal",
        qualifyingService: { years: 25, months: 0, days: 0 },
        retirementDate: "2025-01-01",
      },
      promotionDetails: {
        promotedInLastTenMonths: false,
        monthlyBasicPay: [],
        averageLastTenMonthsBasicPay: 0,
        calculationBasis: "Current Basic Pay",
        emoluments: 70000,
      },
      salaryDetails: {
        currentBasicPay: 45000,
        dearnessAllowance: 15000,
        lapDays: 60,
        lhapDays: 40,
        providentFund: 0,
        cgis: 0,
      },
      medicalBenefits: {
        fixedMedicalAllowance: false,
        fmaOpted: false,
        fmaEligibility: "Not Opted",
        fmaMonthlyAmount: 0,
        fmaReason: "",
      },
      commutationDetails: { commutationOpted: false, commutationPercentage: 0 },
    } as any,
    ruleResult: { benefits: { leaveEncashment: true } } as any,
  },
  // 8. Commutation – Age 45
  {
    name: "Commutation – Age 45",
    assessment: {
      employeeDetails: {
        employeeName: "Young Retiree",
        dateOfBirth: "1975-01-01",
        dateOfAppointment: "1995-01-01",
        employeeGroup: "A",
        payMatrixLevel: "Level1",
      },
      serviceDetails: {
        pensionScheme: "OPS",
        employeeCategory: "Running",
        retirementCategory: "normal",
        qualifyingService: { years: 22, months: 0, days: 0 },
        retirementDate: "2027-01-01",
      },
      promotionDetails: {
        promotedInLastTenMonths: false,
        monthlyBasicPay: [],
        averageLastTenMonthsBasicPay: 0,
        calculationBasis: "Current Basic Pay",
        emoluments: 55000,
      },
      salaryDetails: {
        currentBasicPay: 35000,
        dearnessAllowance: 13000,
        lapDays: 30,
        lhapDays: 15,
        providentFund: 0,
        cgis: 0,
      },
      medicalBenefits: {
        fixedMedicalAllowance: false,
        fmaOpted: false,
        fmaEligibility: "Not Opted",
        fmaMonthlyAmount: 0,
        fmaReason: "",
      },
      commutationDetails: { commutationOpted: true, commutationPercentage: 40 },
    } as any,
    ruleResult: { benefits: { commutation: true } } as any,
  },
  // 9. Commutation – Age 60
  {
    name: "Commutation – Age 60",
    assessment: {
      employeeDetails: {
        employeeName: "Senior Retiree",
        dateOfBirth: "1960-01-01",
        dateOfAppointment: "1980-01-01",
        employeeGroup: "A",
        payMatrixLevel: "Level1",
      },
      serviceDetails: {
        pensionScheme: "OPS",
        employeeCategory: "Running",
        retirementCategory: "normal",
        qualifyingService: { years: 28, months: 0, days: 0 },
        retirementDate: "2028-01-01",
      },
      promotionDetails: {
        promotedInLastTenMonths: false,
        monthlyBasicPay: [],
        averageLastTenMonthsBasicPay: 0,
        calculationBasis: "Current Basic Pay",
        emoluments: 80000,
      },
      salaryDetails: {
        currentBasicPay: 50000,
        dearnessAllowance: 20000,
        lapDays: 30,
        lhapDays: 15,
        providentFund: 0,
        cgis: 0,
      },
      medicalBenefits: {
        fixedMedicalAllowance: false,
        fmaOpted: false,
        fmaEligibility: "Not Opted",
        fmaMonthlyAmount: 0,
        fmaReason: "",
      },
      commutationDetails: { commutationOpted: true, commutationPercentage: 30 },
    } as any,
    ruleResult: { benefits: { commutation: true } } as any,
  },
  // 10. RELHS test (should be true for death)
  {
    name: "RELHS – Death case",
    assessment: {
      employeeDetails: {
        employeeName: "RELHS Test",
        dateOfBirth: "1960-01-01",
        dateOfAppointment: "1990-01-01",
        employeeGroup: "A",
        payMatrixLevel: "Level1",
      },
      serviceDetails: {
        pensionScheme: "OPS",
        employeeCategory: "Running",
        retirementCategory: "other",
        otherRetirementType: "death",
        qualifyingService: { years: 3, months: 0, days: 0 },
        retirementDate: "2023-01-01",
      },
      promotionDetails: {
        promotedInLastTenMonths: false,
        monthlyBasicPay: [],
        averageLastTenMonthsBasicPay: 0,
        calculationBasis: "Current Basic Pay",
        emoluments: 30000,
      },
      salaryDetails: {
        currentBasicPay: 20000,
        dearnessAllowance: 5000,
        lapDays: 10,
        lhapDays: 5,
        providentFund: 0,
        cgis: 0,
      },
      medicalBenefits: {
        fixedMedicalAllowance: false,
        fmaOpted: false,
        fmaEligibility: "Not Opted",
        fmaMonthlyAmount: 0,
        fmaReason: "",
      },
      commutationDetails: { commutationOpted: false, commutationPercentage: 0 },
    } as any,
    ruleResult: { benefits: { relhs: true } } as any,
  },
];

function main() {
  console.log("Running functional validation scenarios...\n");
  let logs = "";
  scenarios.forEach((sc) => {
    const scenarioHeader = `Scenario: ${sc.name}`;
    console.log(scenarioHeader);
    logs += scenarioHeader + "\n";
    const inputs = JSON.stringify(sc.assessment, null, 2);
    console.log("Inputs:\n", inputs);
    logs += "Inputs:\n" + inputs + "\n";
    const result = runCalculationEngine(sc.assessment, sc.ruleResult);
    const resultStr = JSON.stringify(result, null, 2);
    console.log("Engine Output:\n", resultStr);
    logs += "Engine Output:\n" + resultStr + "\n";
    console.log("---\n");
    logs += "---\n";
  });
  writeFileSync("output.txt", logs, "utf8");
}

main();
