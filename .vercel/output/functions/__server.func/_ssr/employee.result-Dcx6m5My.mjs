import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { F as Info, H as Download, I as FileText, N as LayoutGrid, Q as CircleCheck, Y as CircleX, b as Scale, c as TriangleAlert, ct as BadgeIndianRupee, q as ClipboardCheck, w as Printer, x as Save, z as FileCheckCorner } from "../_libs/lucide-react.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { a as INDIAN_RAILWAYS_LOGO, f as cn, i as EmptyState, l as SectionCard, s as PageHeader, t as Badge } from "./common-DvgjYd9Y.mjs";
import { c as formatCurrency, d as formatIndianDateTime, f as formatQualifyingService, l as formatDisplayDate, m as getIndianTimestamp, n as calculateAgeNextBirthday, p as getExitDateLabel, t as addQualifyingService, u as formatIndianDate } from "./settlement-assessment-qVns9-hD.mjs";
import { t as Button } from "./button-B28lidbK.mjs";
import { r as saveSettlementReport } from "./ReportManagementService-BhVnMNuw.mjs";
import { t as require_jspdf_node_min } from "../_libs/jspdf.mjs";
import { t as html2canvas } from "../_libs/html2canvas-pro.mjs";
import { i as Trigger, n as List, r as Root2, t as Content } from "../_libs/radix-ui__react-tabs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/employee.result-Dcx6m5My.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var import_jspdf_node_min = require_jspdf_node_min();
var _jsxFileName$1 = "C:/Users/Abhishek/Downloads/RailwayBenifits/rail-benefits-navigator/src/components/ui/tabs.tsx";
var Tabs = Root2;
var TabsList = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(List, {
	ref,
	className: cn("inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$1,
	lineNumber: 12,
	columnNumber: 3
}, void 0));
TabsList.displayName = List.displayName;
var TabsTrigger = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trigger, {
	ref,
	className: cn("inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$1,
	lineNumber: 27,
	columnNumber: 3
}, void 0));
TabsTrigger.displayName = Trigger.displayName;
var TabsContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Content, {
	ref,
	className: cn("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$1,
	lineNumber: 42,
	columnNumber: 3
}, void 0));
TabsContent.displayName = Content.displayName;
var RAILWAY_RULE_REFERENCE = "Railway Pension Rules 2026";
var PENSION_RATES = {
	basicPension: .5,
	familyPension: {
		ordinary: .3,
		enhanced: .5
	}
};
var GRATUITY_RULES = {
	maximumLimit: 2e6,
	deathSlabs: [
		{
			minYears: 0,
			maxYearsExclusive: 1,
			multiplier: 2
		},
		{
			minYears: 1,
			maxYearsExclusive: 5,
			multiplier: 6
		},
		{
			minYears: 5,
			maxYearsExclusive: 12,
			multiplier: 12
		},
		{
			minYears: 12,
			maxYearsExclusive: 20,
			multiplier: 20
		}
	],
	longServiceDeathMultiplier: .5
};
var LEAVE_RULES = {
	maxLapDays: 300,
	maxTotalEncashableDays: 300,
	lhapConversionDivisor: 2,
	maxEncashableLhapDays: 100,
	monthDivisor: 30
};
var RELHS_RULES = {
	ruleReference: RAILWAY_RULE_REFERENCE,
	fmaMonthlyAmount: 1e3,
	minimumOtherThanNormalServiceYears: 20,
	requiredDocuments: [
		"Retirement Order",
		"PPO",
		"Service Register",
		"Identity Proof",
		"Pay Matrix Details"
	],
	subscriptionBands: [
		{
			label: "Level 1 - Level 5",
			minLevel: 1,
			maxLevel: 5,
			amount: 3e4
		},
		{
			label: "Level 6",
			minLevel: 6,
			maxLevel: 6,
			amount: 54e3
		},
		{
			label: "Level 7 - Level 11",
			minLevel: 7,
			maxLevel: 11,
			amount: 78e3
		},
		{
			label: "Level 12 and Above",
			minLevel: 12,
			maxLevel: null,
			amount: 12e4
		}
	]
};
var SETTLEMENT_RULES = { ctgRate: .8 };
var COMMUTATION_FACTORS = [
	{
		id: 1,
		age_next_birthday: 20,
		factor: 9.188,
		effective_from: "2026-01-01",
		circular_number: "OFFICIAL-RAILWAY-COMMUTATION-TABLE",
		active: true
	},
	{
		id: 2,
		age_next_birthday: 21,
		factor: 9.187,
		effective_from: "2026-01-01",
		circular_number: "OFFICIAL-RAILWAY-COMMUTATION-TABLE",
		active: true
	},
	{
		id: 3,
		age_next_birthday: 22,
		factor: 9.186,
		effective_from: "2026-01-01",
		circular_number: "OFFICIAL-RAILWAY-COMMUTATION-TABLE",
		active: true
	},
	{
		id: 4,
		age_next_birthday: 23,
		factor: 9.185,
		effective_from: "2026-01-01",
		circular_number: "OFFICIAL-RAILWAY-COMMUTATION-TABLE",
		active: true
	},
	{
		id: 5,
		age_next_birthday: 24,
		factor: 9.184,
		effective_from: "2026-01-01",
		circular_number: "OFFICIAL-RAILWAY-COMMUTATION-TABLE",
		active: true
	},
	{
		id: 6,
		age_next_birthday: 25,
		factor: 9.183,
		effective_from: "2026-01-01",
		circular_number: "OFFICIAL-RAILWAY-COMMUTATION-TABLE",
		active: true
	},
	{
		id: 7,
		age_next_birthday: 26,
		factor: 9.182,
		effective_from: "2026-01-01",
		circular_number: "OFFICIAL-RAILWAY-COMMUTATION-TABLE",
		active: true
	},
	{
		id: 8,
		age_next_birthday: 27,
		factor: 9.18,
		effective_from: "2026-01-01",
		circular_number: "OFFICIAL-RAILWAY-COMMUTATION-TABLE",
		active: true
	},
	{
		id: 9,
		age_next_birthday: 28,
		factor: 9.178,
		effective_from: "2026-01-01",
		circular_number: "OFFICIAL-RAILWAY-COMMUTATION-TABLE",
		active: true
	},
	{
		id: 10,
		age_next_birthday: 29,
		factor: 9.176,
		effective_from: "2026-01-01",
		circular_number: "OFFICIAL-RAILWAY-COMMUTATION-TABLE",
		active: true
	},
	{
		id: 11,
		age_next_birthday: 30,
		factor: 9.173,
		effective_from: "2026-01-01",
		circular_number: "OFFICIAL-RAILWAY-COMMUTATION-TABLE",
		active: true
	},
	{
		id: 12,
		age_next_birthday: 31,
		factor: 9.169,
		effective_from: "2026-01-01",
		circular_number: "OFFICIAL-RAILWAY-COMMUTATION-TABLE",
		active: true
	},
	{
		id: 13,
		age_next_birthday: 32,
		factor: 9.164,
		effective_from: "2026-01-01",
		circular_number: "OFFICIAL-RAILWAY-COMMUTATION-TABLE",
		active: true
	},
	{
		id: 14,
		age_next_birthday: 33,
		factor: 9.159,
		effective_from: "2026-01-01",
		circular_number: "OFFICIAL-RAILWAY-COMMUTATION-TABLE",
		active: true
	},
	{
		id: 15,
		age_next_birthday: 34,
		factor: 9.152,
		effective_from: "2026-01-01",
		circular_number: "OFFICIAL-RAILWAY-COMMUTATION-TABLE",
		active: true
	},
	{
		id: 16,
		age_next_birthday: 35,
		factor: 9.145,
		effective_from: "2026-01-01",
		circular_number: "OFFICIAL-RAILWAY-COMMUTATION-TABLE",
		active: true
	},
	{
		id: 17,
		age_next_birthday: 36,
		factor: 9.136,
		effective_from: "2026-01-01",
		circular_number: "OFFICIAL-RAILWAY-COMMUTATION-TABLE",
		active: true
	},
	{
		id: 18,
		age_next_birthday: 37,
		factor: 9.126,
		effective_from: "2026-01-01",
		circular_number: "OFFICIAL-RAILWAY-COMMUTATION-TABLE",
		active: true
	},
	{
		id: 19,
		age_next_birthday: 38,
		factor: 9.116,
		effective_from: "2026-01-01",
		circular_number: "OFFICIAL-RAILWAY-COMMUTATION-TABLE",
		active: true
	},
	{
		id: 20,
		age_next_birthday: 39,
		factor: 9.103,
		effective_from: "2026-01-01",
		circular_number: "OFFICIAL-RAILWAY-COMMUTATION-TABLE",
		active: true
	},
	{
		id: 21,
		age_next_birthday: 40,
		factor: 9.09,
		effective_from: "2026-01-01",
		circular_number: "OFFICIAL-RAILWAY-COMMUTATION-TABLE",
		active: true
	},
	{
		id: 22,
		age_next_birthday: 41,
		factor: 9.075,
		effective_from: "2026-01-01",
		circular_number: "OFFICIAL-RAILWAY-COMMUTATION-TABLE",
		active: true
	},
	{
		id: 23,
		age_next_birthday: 42,
		factor: 9.059,
		effective_from: "2026-01-01",
		circular_number: "OFFICIAL-RAILWAY-COMMUTATION-TABLE",
		active: true
	},
	{
		id: 24,
		age_next_birthday: 43,
		factor: 9.04,
		effective_from: "2026-01-01",
		circular_number: "OFFICIAL-RAILWAY-COMMUTATION-TABLE",
		active: true
	},
	{
		id: 25,
		age_next_birthday: 44,
		factor: 9.019,
		effective_from: "2026-01-01",
		circular_number: "OFFICIAL-RAILWAY-COMMUTATION-TABLE",
		active: true
	},
	{
		id: 26,
		age_next_birthday: 45,
		factor: 8.996,
		effective_from: "2026-01-01",
		circular_number: "OFFICIAL-RAILWAY-COMMUTATION-TABLE",
		active: true
	},
	{
		id: 27,
		age_next_birthday: 46,
		factor: 8.971,
		effective_from: "2026-01-01",
		circular_number: "OFFICIAL-RAILWAY-COMMUTATION-TABLE",
		active: true
	},
	{
		id: 28,
		age_next_birthday: 47,
		factor: 8.943,
		effective_from: "2026-01-01",
		circular_number: "OFFICIAL-RAILWAY-COMMUTATION-TABLE",
		active: true
	},
	{
		id: 29,
		age_next_birthday: 48,
		factor: 8.913,
		effective_from: "2026-01-01",
		circular_number: "OFFICIAL-RAILWAY-COMMUTATION-TABLE",
		active: true
	},
	{
		id: 30,
		age_next_birthday: 49,
		factor: 8.881,
		effective_from: "2026-01-01",
		circular_number: "OFFICIAL-RAILWAY-COMMUTATION-TABLE",
		active: true
	},
	{
		id: 31,
		age_next_birthday: 50,
		factor: 8.846,
		effective_from: "2026-01-01",
		circular_number: "OFFICIAL-RAILWAY-COMMUTATION-TABLE",
		active: true
	},
	{
		id: 32,
		age_next_birthday: 51,
		factor: 8.808,
		effective_from: "2026-01-01",
		circular_number: "OFFICIAL-RAILWAY-COMMUTATION-TABLE",
		active: true
	},
	{
		id: 33,
		age_next_birthday: 52,
		factor: 8.768,
		effective_from: "2026-01-01",
		circular_number: "OFFICIAL-RAILWAY-COMMUTATION-TABLE",
		active: true
	},
	{
		id: 34,
		age_next_birthday: 53,
		factor: 8.724,
		effective_from: "2026-01-01",
		circular_number: "OFFICIAL-RAILWAY-COMMUTATION-TABLE",
		active: true
	},
	{
		id: 35,
		age_next_birthday: 54,
		factor: 8.678,
		effective_from: "2026-01-01",
		circular_number: "OFFICIAL-RAILWAY-COMMUTATION-TABLE",
		active: true
	},
	{
		id: 36,
		age_next_birthday: 55,
		factor: 8.627,
		effective_from: "2026-01-01",
		circular_number: "OFFICIAL-RAILWAY-COMMUTATION-TABLE",
		active: true
	},
	{
		id: 37,
		age_next_birthday: 56,
		factor: 8.572,
		effective_from: "2026-01-01",
		circular_number: "OFFICIAL-RAILWAY-COMMUTATION-TABLE",
		active: true
	},
	{
		id: 38,
		age_next_birthday: 57,
		factor: 8.512,
		effective_from: "2026-01-01",
		circular_number: "OFFICIAL-RAILWAY-COMMUTATION-TABLE",
		active: true
	},
	{
		id: 39,
		age_next_birthday: 58,
		factor: 8.446,
		effective_from: "2026-01-01",
		circular_number: "OFFICIAL-RAILWAY-COMMUTATION-TABLE",
		active: true
	},
	{
		id: 40,
		age_next_birthday: 59,
		factor: 8.371,
		effective_from: "2026-01-01",
		circular_number: "OFFICIAL-RAILWAY-COMMUTATION-TABLE",
		active: true
	},
	{
		id: 41,
		age_next_birthday: 60,
		factor: 8.287,
		effective_from: "2026-01-01",
		circular_number: "OFFICIAL-RAILWAY-COMMUTATION-TABLE",
		active: true
	},
	{
		id: 42,
		age_next_birthday: 61,
		factor: 8.194,
		effective_from: "2026-01-01",
		circular_number: "OFFICIAL-RAILWAY-COMMUTATION-TABLE",
		active: true
	},
	{
		id: 43,
		age_next_birthday: 62,
		factor: 8.093,
		effective_from: "2026-01-01",
		circular_number: "OFFICIAL-RAILWAY-COMMUTATION-TABLE",
		active: true
	},
	{
		id: 44,
		age_next_birthday: 63,
		factor: 7.982,
		effective_from: "2026-01-01",
		circular_number: "OFFICIAL-RAILWAY-COMMUTATION-TABLE",
		active: true
	},
	{
		id: 45,
		age_next_birthday: 64,
		factor: 7.862,
		effective_from: "2026-01-01",
		circular_number: "OFFICIAL-RAILWAY-COMMUTATION-TABLE",
		active: true
	},
	{
		id: 46,
		age_next_birthday: 65,
		factor: 7.731,
		effective_from: "2026-01-01",
		circular_number: "OFFICIAL-RAILWAY-COMMUTATION-TABLE",
		active: true
	},
	{
		id: 47,
		age_next_birthday: 66,
		factor: 7.591,
		effective_from: "2026-01-01",
		circular_number: "OFFICIAL-RAILWAY-COMMUTATION-TABLE",
		active: true
	},
	{
		id: 48,
		age_next_birthday: 67,
		factor: 7.431,
		effective_from: "2026-01-01",
		circular_number: "OFFICIAL-RAILWAY-COMMUTATION-TABLE",
		active: true
	},
	{
		id: 49,
		age_next_birthday: 68,
		factor: 7.262,
		effective_from: "2026-01-01",
		circular_number: "OFFICIAL-RAILWAY-COMMUTATION-TABLE",
		active: true
	},
	{
		id: 50,
		age_next_birthday: 69,
		factor: 7.083,
		effective_from: "2026-01-01",
		circular_number: "OFFICIAL-RAILWAY-COMMUTATION-TABLE",
		active: true
	},
	{
		id: 51,
		age_next_birthday: 70,
		factor: 6.897,
		effective_from: "2026-01-01",
		circular_number: "OFFICIAL-RAILWAY-COMMUTATION-TABLE",
		active: true
	},
	{
		id: 52,
		age_next_birthday: 71,
		factor: 6.703,
		effective_from: "2026-01-01",
		circular_number: "OFFICIAL-RAILWAY-COMMUTATION-TABLE",
		active: true
	},
	{
		id: 53,
		age_next_birthday: 72,
		factor: 6.502,
		effective_from: "2026-01-01",
		circular_number: "OFFICIAL-RAILWAY-COMMUTATION-TABLE",
		active: true
	},
	{
		id: 54,
		age_next_birthday: 73,
		factor: 6.296,
		effective_from: "2026-01-01",
		circular_number: "OFFICIAL-RAILWAY-COMMUTATION-TABLE",
		active: true
	},
	{
		id: 55,
		age_next_birthday: 74,
		factor: 6.085,
		effective_from: "2026-01-01",
		circular_number: "OFFICIAL-RAILWAY-COMMUTATION-TABLE",
		active: true
	},
	{
		id: 56,
		age_next_birthday: 75,
		factor: 5.872,
		effective_from: "2026-01-01",
		circular_number: "OFFICIAL-RAILWAY-COMMUTATION-TABLE",
		active: true
	},
	{
		id: 57,
		age_next_birthday: 76,
		factor: 5.657,
		effective_from: "2026-01-01",
		circular_number: "OFFICIAL-RAILWAY-COMMUTATION-TABLE",
		active: true
	},
	{
		id: 58,
		age_next_birthday: 77,
		factor: 5.443,
		effective_from: "2026-01-01",
		circular_number: "OFFICIAL-RAILWAY-COMMUTATION-TABLE",
		active: true
	},
	{
		id: 59,
		age_next_birthday: 78,
		factor: 5.229,
		effective_from: "2026-01-01",
		circular_number: "OFFICIAL-RAILWAY-COMMUTATION-TABLE",
		active: true
	},
	{
		id: 60,
		age_next_birthday: 79,
		factor: 5.018,
		effective_from: "2026-01-01",
		circular_number: "OFFICIAL-RAILWAY-COMMUTATION-TABLE",
		active: true
	},
	{
		id: 61,
		age_next_birthday: 80,
		factor: 4.812,
		effective_from: "2026-01-01",
		circular_number: "OFFICIAL-RAILWAY-COMMUTATION-TABLE",
		active: true
	},
	{
		id: 62,
		age_next_birthday: 81,
		factor: 4.611,
		effective_from: "2026-01-01",
		circular_number: "OFFICIAL-RAILWAY-COMMUTATION-TABLE",
		active: true
	}
];
function findRELHSSubscriptionBand(level) {
	return RELHS_RULES.subscriptionBands.find((band) => {
		const withinLowerBound = level >= band.minLevel;
		const withinUpperBound = band.maxLevel === null || level <= band.maxLevel;
		return withinLowerBound && withinUpperBound;
	}) ?? null;
}
function findDeathGratuitySlab(serviceYears) {
	return GRATUITY_RULES.deathSlabs.find((slab) => serviceYears >= slab.minYears && serviceYears < slab.maxYearsExclusive) ?? null;
}
function parsePayMatrixLevel(payMatrixLevel) {
	const match = payMatrixLevel.match(/\d+/);
	if (!match) return null;
	const level = Number(match[0]);
	return Number.isFinite(level) ? level : null;
}
function getRELHSRetirementLabel(assessment) {
	if (assessment.serviceDetails.retirementCategory === "normal") return "Superannuation";
	return assessment.serviceDetails.otherRetirementType ? {
		voluntary: "Voluntary Retirement",
		medical: "Medical Retirement",
		compulsory: "Compulsory Retirement",
		death: "Death Case",
		removal: "Removal",
		dismissal: "Dismissal",
		"self-resignation": "Self Resignation"
	}[assessment.serviceDetails.otherRetirementType] ?? "Other Than Normal Retirement" : "Other Than Normal Retirement";
}
function baseRELHSEvaluation(assessment, eligible, reason) {
	return {
		eligible,
		subscriptionAmount: 0,
		reason,
		ruleReference: RELHS_RULES.ruleReference,
		requiredDocuments: [...RELHS_RULES.requiredDocuments],
		remarks: eligible ? "RELHS eligibility determined automatically from retirement type, service, pension scheme, and pay matrix details." : "RELHS is not admissible for this case under the current Railway rules.",
		medicalCard: eligible ? "Eligible" : "Not Eligible",
		familyEligible: eligible,
		verificationStatus: "Automatic",
		pensionScheme: assessment.serviceDetails.pensionScheme,
		payMatrixLevel: parsePayMatrixLevel(assessment.employeeDetails.payMatrixLevel),
		subscriptionBand: null
	};
}
function evaluateRELHSEligibility(assessment) {
	const details = assessment.serviceDetails.otherRetirementDetails;
	if (details && details.relhsSubscriptionOpted === false) return baseRELHSEvaluation(assessment, false, "Employee explicitly opted out of RELHS subscription.");
	const retirementType = assessment.serviceDetails.otherRetirementType;
	const qualifyingYears = assessment.serviceDetails.qualifyingService.years;
	if (assessment.serviceDetails.retirementCategory === "normal") return baseRELHSEvaluation(assessment, true, "Employee retired under Superannuation. No minimum qualifying service is required.");
	if (retirementType === "death") return baseRELHSEvaluation(assessment, true, "Death Case. Family / nominee becomes eligible for RELHS.");
	if (retirementType === "removal") return baseRELHSEvaluation(assessment, false, "Removal cases are not eligible for RELHS.");
	if (retirementType === "dismissal") return baseRELHSEvaluation(assessment, false, "Dismissal cases are not eligible for RELHS.");
	if (retirementType === "self-resignation") return baseRELHSEvaluation(assessment, false, "Self resignation cases are not eligible for RELHS.");
	const eligible = qualifyingYears >= RELHS_RULES.minimumOtherThanNormalServiceYears;
	return baseRELHSEvaluation(assessment, eligible, eligible ? `${getRELHSRetirementLabel(assessment)} with qualifying service of ${qualifyingYears} years meets the 20 year RELHS requirement.` : `${getRELHSRetirementLabel(assessment)} has qualifying service below 20 years. RELHS requires at least 20 years for other than normal retirement.`);
}
function calculateRELHSSubscription(assessment, evaluation) {
	if (!evaluation.eligible) return evaluation;
	const level = parsePayMatrixLevel(assessment.employeeDetails.payMatrixLevel);
	const band = level === null ? null : findRELHSSubscriptionBand(level);
	return {
		...evaluation,
		subscriptionAmount: band?.amount ?? 0,
		payMatrixLevel: level,
		subscriptionBand: band?.label ?? null,
		verificationStatus: band ? "Automatic" : "Requires Pay Matrix Verification",
		remarks: band ? `RELHS subscription selected from lookup table: ${band.label}.` : "Pay Matrix Level could not be matched to the RELHS subscription lookup table."
	};
}
function evaluateRELHS(assessment) {
	return calculateRELHSSubscription(assessment, evaluateRELHSEligibility(assessment));
}
function evaluateFMAWithRELHS(assessment, relhsEvaluation) {
	if (!relhsEvaluation.eligible) return {
		eligible: false,
		status: "Not Eligible",
		monthlyAmount: 0,
		reason: "RELHS eligibility is mandatory before FMA can be granted.",
		reference: RELHS_RULES.ruleReference
	};
	if (!assessment.medicalBenefits.fmaOpted) return {
		eligible: false,
		status: "Not Opted",
		monthlyAmount: 0,
		reason: "Employee chose not to receive Fixed Medical Allowance.",
		reference: RELHS_RULES.ruleReference
	};
	return {
		eligible: true,
		status: "Eligible",
		monthlyAmount: RELHS_RULES.fmaMonthlyAmount,
		reason: "Employee opted for FMA.",
		reference: RELHS_RULES.ruleReference
	};
}
var commonBenefits = {
	pension: true,
	familyPension: false,
	retirementGratuity: true,
	leaveEncashment: true,
	commutation: true,
	fma: true,
	relhs: true,
	providentFund: true,
	cgis: true,
	ctg: true,
	complimentaryPass: true,
	medicalFacilities: true
};
var labels = {
	normal: "Normal Retirement",
	voluntary: "Voluntary Retirement",
	medical: "Medical Retirement (Invalid Pension)",
	compulsory: "Compulsory Retirement",
	death: "Death While in Service",
	removal: "Removal from Service",
	dismissal: "Dismissal",
	"self-resignation": "Self Resignation"
};
function decision(assessment, overrides) {
	const retirementType = assessment.serviceDetails.otherRetirementType ?? "normal";
	const { benefits, ...rest } = overrides;
	return {
		retirementType,
		label: labels[retirementType],
		reportMode: "retirement",
		visibleInputs: [],
		benefits: {
			...commonBenefits,
			...benefits
		},
		pensionSanctionPercentage: 100,
		reason: "Common retirement formulas apply.",
		...rest
	};
}
function evaluateRetirementRules(assessment) {
	if (assessment.serviceDetails.retirementCategory === "normal") return decision(assessment, {
		retirementType: "normal",
		label: labels.normal,
		reason: "Normal retirement selected. Common retirement benefits are admissible subject to service verification."
	});
	const type = assessment.serviceDetails.otherRetirementType;
	const details = assessment.serviceDetails.otherRetirementDetails;
	switch (type) {
		case "voluntary": return decision(assessment, {
			visibleInputs: [],
			reason: "Voluntary retirement selected. Common retirement formulas apply where qualifying service permits."
		});
		case "medical": {
			const approved = details?.medicalRetirementApproved === true;
			return decision(assessment, {
				visibleInputs: ["medicalRetirementApproved", "notionalServiceAddition"],
				benefits: approved ? {} : {
					pension: false,
					retirementGratuity: false,
					commutation: false
				},
				reason: approved ? "Medical retirement approved. Invalid pension case uses common formulas with entered notional service addition." : "Medical retirement approval is required before pension, gratuity, and commutation can be admitted."
			});
		}
		case "compulsory": return decision(assessment, {
			visibleInputs: ["pensionSanctionPercentage"],
			pensionSanctionPercentage: Math.min(100, Math.max(0, Number(details?.pensionSanctionPercentage ?? 100))),
			reason: "Compulsory retirement selected. Pension is restricted by the sanctioned percentage entered by the officer."
		});
		case "death": return decision(assessment, {
			reportMode: "death",
			visibleInputs: ["spouseAvailable", "familyPensionEligible"],
			benefits: {
				pension: false,
				familyPension: details?.familyPensionEligible !== false,
				commutation: false,
				fma: false,
				relhs: details?.familyPensionEligible !== false,
				ctg: false,
				complimentaryPass: false,
				medicalFacilities: false
			},
			enhancedFamilyPension: details?.familyPensionEligible !== false,
			reason: "Death while in service selected. Death benefits and family pension rules apply."
		});
		case "removal": {
			const compassionate = details?.compassionateAllowanceSanctioned === true;
			return decision(assessment, {
				reportMode: compassionate ? "retirement" : "not-admissible",
				visibleInputs: ["compassionateAllowanceSanctioned"],
				benefits: {
					pension: compassionate,
					retirementGratuity: false,
					commutation: false,
					fma: false,
					relhs: false,
					ctg: false,
					complimentaryPass: false,
					medicalFacilities: false
				},
				pensionSanctionPercentage: compassionate ? 66.67 : 0,
				reason: compassionate ? "Removal case with compassionate allowance sanctioned. Pension is treated as compassionate allowance only." : "Removal from service selected. Pensionary benefits are not admissible unless compassionate allowance is sanctioned."
			});
		}
		case "dismissal": return decision(assessment, {
			reportMode: "not-admissible",
			visibleInputs: [],
			benefits: {
				pension: false,
				retirementGratuity: false,
				commutation: false,
				fma: false,
				relhs: false,
				ctg: false,
				complimentaryPass: false,
				medicalFacilities: false
			},
			pensionSanctionPercentage: 0,
			reason: "Dismissal selected. Pensionary benefits are not admissible under the current rule set."
		});
		case "self-resignation": {
			const technical = details?.technicalResignation === true;
			return decision(assessment, {
				reportMode: technical ? "retirement" : "not-admissible",
				visibleInputs: ["technicalResignation"],
				benefits: technical ? {
					commutation: false,
					fma: false,
					relhs: false,
					ctg: false,
					complimentaryPass: false,
					medicalFacilities: false
				} : {
					pension: false,
					retirementGratuity: false,
					commutation: false,
					fma: false,
					relhs: false,
					ctg: false,
					complimentaryPass: false,
					medicalFacilities: false
				},
				reason: technical ? "Technical resignation selected. Common payable accumulations continue where rules permit." : "Self resignation selected. Pensionary benefits are not admissible unless treated as technical resignation."
			});
		}
		default: return decision(assessment, {
			benefits: {
				pension: false,
				retirementGratuity: false,
				commutation: false
			},
			reason: "Other than normal retirement type is not selected."
		});
	}
}
function isBenefitAdmissible(assessment, key) {
	return evaluateRetirementRules(assessment).benefits[key];
}
var ENGINE = "Formula Engine";
function formulaEngineFormula(formulaKey, explanation) {
	return {
		formulaName: ENGINE,
		formulaKey,
		workbookSheet: ENGINE,
		cellReference: `formulas/generated/referenceData.ts`,
		ruleReference: "Railway Pension Rules 2026",
		explanation
	};
}
function benefit$1(key, benefitName, amount, eligible, reason, formulaKey, explanation, details = {}, warnings = [], monthlyAmount) {
	return {
		key,
		benefitName,
		amount: Math.round(amount),
		monthlyAmount,
		eligible,
		status: eligible ? "Calculated" : "Not Eligible",
		formula: formulaEngineFormula(formulaKey, explanation),
		reason,
		warnings,
		details
	};
}
function notEligible(key, benefitName, reason, formulaKey) {
	return benefit$1(key, benefitName, 0, false, reason, formulaKey, reason);
}
function manualInput(key, benefitName, amount, reason) {
	return {
		key,
		benefitName,
		amount: Math.round(amount),
		eligible: amount > 0,
		status: "Manual Input",
		formula: formulaEngineFormula(`${key.toUpperCase()}_MANUAL_INPUT`, reason),
		reason,
		warnings: [],
		details: {}
	};
}
function calcBasicPension(context, decision) {
	const { assessment } = context;
	const scheme = assessment.serviceDetails.pensionScheme;
	if (!decision.benefits["pension"]) return notEligible("basicPension", "Basic Pension", decision.reason, `${scheme}_BASIC_PENSION`);
	const emoluments = assessment.promotionDetails.emoluments;
	const sanctionPct = decision.pensionSanctionPercentage / 100;
	const amount = emoluments * PENSION_RATES.basicPension * sanctionPct;
	return benefit$1("basicPension", "Basic Pension", amount, true, `Basic Pension = ${PENSION_RATES.basicPension * 100}% of emoluments × ${decision.pensionSanctionPercentage}% sanction.`, `${scheme}_BASIC_PENSION`, "Basic Pension = Emoluments × 50% × Sanction Percentage", {
		emoluments,
		pensionRate: PENSION_RATES.basicPension,
		pensionSanctionPercentage: decision.pensionSanctionPercentage,
		pensionScheme: scheme
	}, void 0, amount);
}
function calcFamilyPension(context, decision) {
	const { assessment } = context;
	if (!decision.benefits["familyPension"]) return notEligible("familyPension", "Family Pension", decision.reason, "FAMILY_PENSION");
	const emoluments = assessment.promotionDetails.emoluments;
	const isEnhanced = decision.enhancedFamilyPension === true;
	const rate = isEnhanced ? PENSION_RATES.familyPension.enhanced : PENSION_RATES.familyPension.ordinary;
	const amount = emoluments * rate;
	const enhancedFamilyPension = emoluments * PENSION_RATES.familyPension.enhanced;
	return benefit$1("familyPension", "Family Pension", amount, true, isEnhanced ? `Family Pension = ${rate * 100}% of emoluments (enhanced rate).` : `Family Pension = ${rate * 100}% of emoluments (ordinary rate).`, "FAMILY_PENSION", "Family Pension = Emoluments × 30% (ordinary) or 50% (enhanced, first 7 years)", {
		emoluments,
		rate,
		enhancedFamilyPension
	}, void 0, amount);
}
function calcRetirementGratuity(context, decision) {
	const { assessment } = context;
	const admissible = decision.benefits["retirementGratuity"];
	const isDeath = assessment.serviceDetails.otherRetirementType === "death";
	if (!admissible) return notEligible("retirementGratuity", "Retirement Gratuity", decision.reason, "RETIREMENT_GRATUITY");
	const emoluments = assessment.promotionDetails.emoluments;
	const da = assessment.salaryDetails.dearnessAllowance;
	const qs = assessment.serviceDetails.qualifyingService;
	const details = assessment.serviceDetails.otherRetirementDetails;
	const effectiveQS = assessment.serviceDetails.otherRetirementType === "medical" && details?.notionalServiceAddition ? addQualifyingService(qs, details.notionalServiceAddition) : qs;
	const serviceYears = effectiveQS.years + effectiveQS.months / 12;
	if (!isDeath && serviceYears < 5) return notEligible("retirementGratuity", "Retirement Gratuity", `Qualifying service of ${serviceYears.toFixed(2)} years is less than the required minimum of 5 years for retirement gratuity.`, "RETIREMENT_GRATUITY");
	let amount;
	let formula;
	if (isDeath) {
		const slab = findDeathGratuitySlab(effectiveQS.years);
		if (slab) {
			const rawAmount = (emoluments + da) * slab.multiplier;
			amount = Math.min(rawAmount, GRATUITY_RULES.maximumLimit);
			formula = `Death Gratuity = (Emoluments + DA) × ${slab.multiplier} (slab for ${slab.minYears}–${slab.maxYearsExclusive ?? "+"} yrs), capped at ₹${GRATUITY_RULES.maximumLimit.toLocaleString("en-IN")}`;
		} else {
			const periods = Math.floor(serviceYears * 2);
			const rawAmount = (emoluments + da) * GRATUITY_RULES.longServiceDeathMultiplier * periods;
			const thirtyThreeLimit = (emoluments + da) * 33;
			amount = Math.min(rawAmount, thirtyThreeLimit, GRATUITY_RULES.maximumLimit);
			formula = `Death Gratuity (long service) = (Emoluments + DA) × 0.5 × completed 6-month periods, capped at 33×Emoluments and ₹${GRATUITY_RULES.maximumLimit.toLocaleString("en-IN")}`;
		}
	} else {
		const completedHalfYears = Math.floor(serviceYears * 2);
		const rawAmount = (emoluments + da) * .25 * completedHalfYears;
		const sixteenPointFiveLimit = (emoluments + da) * 16.5;
		amount = Math.min(rawAmount, sixteenPointFiveLimit, GRATUITY_RULES.maximumLimit);
		formula = `Retirement Gratuity = (Emoluments + DA) × ¼ × completed 6-month periods, capped at 16.5×(Emoluments + DA) and ₹${GRATUITY_RULES.maximumLimit.toLocaleString("en-IN")}`;
	}
	return benefit$1("retirementGratuity", isDeath ? "Death Gratuity" : "Retirement Gratuity", amount, true, formula, isDeath ? "DEATH_GRATUITY" : "RETIREMENT_GRATUITY", formula, {
		emoluments,
		dearnessAllowance: da,
		qualifyingServiceYears: effectiveQS.years,
		qualifyingServiceMonths: effectiveQS.months,
		maximumLimit: GRATUITY_RULES.maximumLimit,
		isDeath
	}, amount >= GRATUITY_RULES.maximumLimit ? [`Gratuity capped at the maximum limit of ₹${GRATUITY_RULES.maximumLimit.toLocaleString("en-IN")}.`] : []);
}
function calcLeaveEncashment(context, decision) {
	const { assessment } = context;
	if (!decision.benefits["leaveEncashment"]) return notEligible("leaveEncashment", "Leave Encashment", decision.reason, "OPS_LEAVE_ENCASHMENT");
	const basic = assessment.salaryDetails.currentBasicPay;
	const daAmount = basic * assessment.salaryDetails.dearnessAllowance / 100;
	const lapDays = assessment.salaryDetails.lapDays;
	const lhapDays = assessment.salaryDetails.lhapDays;
	assessment.serviceDetails.retirementCategory;
	const otherRetirementType = assessment.serviceDetails.otherRetirementType;
	const isVoluntary = otherRetirementType === "voluntary";
	const isCompulsory = otherRetirementType === "compulsory";
	const isMedical = otherRetirementType === "medical";
	const isDeath = otherRetirementType === "death";
	const isResignation = otherRetirementType === "self-resignation" && assessment.serviceDetails.otherRetirementDetails?.technicalResignation !== true;
	const isTechnicalResignation = otherRetirementType === "self-resignation" && assessment.serviceDetails.otherRetirementDetails?.technicalResignation === true;
	const warnings = [];
	if (isTechnicalResignation) return {
		key: "leaveEncashment",
		benefitName: "Leave Encashment",
		amount: 0,
		eligible: true,
		status: "Leave Transferred",
		formula: formulaEngineFormula("OPS_LEAVE_ENCASHMENT", "Technical Resignation: Leave Encashment is not payable. Leave balance is transferred to the new Government organization."),
		reason: "Technical resignation. Leave balance transferred.",
		warnings: [],
		details: {
			basicPay: basic,
			dearnessAllowanceAmount: daAmount,
			lapDays,
			lhapDays,
			status: "Leave Transferred"
		}
	};
	let totalEncashableDays = 0;
	let effectiveLapDays = 0;
	let effectiveLhapDays = 0;
	if (isResignation) {
		totalEncashableDays = Math.min(Math.floor(lapDays * .5), 150);
		effectiveLapDays = totalEncashableDays;
		effectiveLhapDays = 0;
		if (lapDays * .5 > 150) warnings.push(`Resignation Leave Encashment (50% of LAP) is capped at the maximum limit of 150 days.`);
	} else {
		effectiveLapDays = Math.min(lapDays, LEAVE_RULES.maxLapDays);
		const remainingDays = Math.max(0, LEAVE_RULES.maxTotalEncashableDays - effectiveLapDays);
		const convertedLhapDays = Math.floor(lhapDays / LEAVE_RULES.lhapConversionDivisor);
		effectiveLhapDays = Math.min(convertedLhapDays, remainingDays, LEAVE_RULES.maxEncashableLhapDays);
		totalEncashableDays = effectiveLapDays + effectiveLhapDays;
		if (lapDays > LEAVE_RULES.maxLapDays) warnings.push(`LAP days exceed the maximum limit of ${LEAVE_RULES.maxLapDays} days.`);
		if (lapDays + lhapDays / LEAVE_RULES.lhapConversionDivisor > LEAVE_RULES.maxTotalEncashableDays) warnings.push(`Combined LAP and converted LHAP days exceed the maximum limit of ${LEAVE_RULES.maxTotalEncashableDays} encashable days.`);
		if (convertedLhapDays > LEAVE_RULES.maxEncashableLhapDays && effectiveLhapDays === LEAVE_RULES.maxEncashableLhapDays) warnings.push(`Encashable LHAP days are capped at the maximum limit of ${LEAVE_RULES.maxEncashableLhapDays} days.`);
	}
	const leaveSalaryPerDay = (basic + 0 + 0 + daAmount) / 30;
	const amount = totalEncashableDays * leaveSalaryPerDay;
	let exitLabel = "Superannuation";
	if (isVoluntary) exitLabel = "Voluntary Retirement";
	else if (isCompulsory) exitLabel = "Compulsory Retirement";
	else if (isMedical) exitLabel = "Medical Retirement";
	else if (isDeath) exitLabel = "Death Case";
	else if (isResignation) exitLabel = "Resignation Case";
	const formulaExplanation = isResignation ? `Leave Encashment = MIN(50% × LAP, 150) × (Basic Pay + DA) / 30` : `Leave Encashment = (Basic Pay + DA) × Total Encashable Days / 30`;
	return benefit$1("leaveEncashment", "Leave Encashment", amount, true, `Leave Encashment calculated for ${exitLabel} with ${totalEncashableDays} eligible days.`, "OPS_LEAVE_ENCASHMENT", formulaExplanation, {
		basicPay: basic,
		dearnessAllowanceAmount: daAmount,
		lapDays,
		effectiveLapDays,
		lhapDays,
		effectiveLhapDays,
		totalEncashableDays,
		exitLabel
	}, warnings);
}
function calcHalfLeaveEncashment(context) {
	return {
		key: "halfLeaveEncashment",
		benefitName: "Half Leave Encashment",
		amount: 0,
		eligible: false,
		status: "Not Eligible",
		reason: "LHAP is converted and included in the main Leave Encashment calculation.",
		formula: formulaEngineFormula("OPS_LHAP_ENCASHMENT", "LHAP days are converted at 2:1 and combined with LAP days."),
		warnings: [],
		details: {
			lhapDays: context.assessment.salaryDetails.lhapDays,
			conversionRatio: "2 LHAP Days = 1 Encashable Day"
		}
	};
}
function calcProvidentFund(context) {
	return manualInput("providentFund", "Provident Fund", context.assessment.salaryDetails.providentFund, "PF amount is taken from the manually entered assessment value.");
}
function calcCGIS(context) {
	return manualInput("cgis", "CGIS", context.assessment.salaryDetails.cgis, "CGIS amount is taken from the manually entered assessment value.");
}
function calcRELHS(context, decision) {
	const { assessment } = context;
	if (!decision.benefits["relhs"]) return notEligible("relhs", "RELHS", decision.reason, "RELHS_SUBSCRIPTION");
	const relhs = evaluateRELHS(assessment);
	return benefit$1("relhs", "RELHS", relhs.subscriptionAmount, relhs.eligible, relhs.reason, "RELHS_SUBSCRIPTION", "RELHS subscription is calculated from Pay Matrix Level using the RELHS subscription lookup table.", {
		medicalCard: relhs.medicalCard,
		familyEligible: relhs.familyEligible,
		verificationStatus: relhs.verificationStatus,
		subscriptionBand: relhs.subscriptionBand,
		payMatrixLevel: relhs.payMatrixLevel,
		requiredDocuments: relhs.requiredDocuments,
		ruleReference: relhs.ruleReference,
		remarks: relhs.remarks
	}, relhs.verificationStatus === "Automatic" ? [] : [relhs.remarks]);
}
function calcFMA(context, decision) {
	const { assessment } = context;
	if (!decision.benefits["fma"]) return notEligible("fma", "Fixed Medical Allowance", decision.reason, "FMA_MONTHLY_AMOUNT");
	const relhs = evaluateRELHS(assessment);
	const fma = evaluateFMAWithRELHS(assessment, relhs);
	return benefit$1("fma", "Fixed Medical Allowance", 0, fma.eligible, fma.reason, "FMA_MONTHLY_AMOUNT", "FMA monthly amount is driven by RELHS eligibility and the employee's FMA option.", {
		relhsEligible: relhs.eligible,
		fmaStatus: fma.status,
		reference: fma.reference
	}, [], fma.eligible ? fma.monthlyAmount : 0);
}
function calcCTG(context, decision) {
	const { assessment } = context;
	if (!decision.benefits["ctg"]) return notEligible("ctg", "Composite Transfer Grant", decision.reason, "CTG");
	const emoluments = assessment.promotionDetails.emoluments;
	return benefit$1("ctg", "Composite Transfer Grant", emoluments * SETTLEMENT_RULES.ctgRate, true, `CTG = ${SETTLEMENT_RULES.ctgRate * 100}% of Emoluments`, "CTG", `Composite Transfer Grant = Emoluments × ${SETTLEMENT_RULES.ctgRate}`, {
		emoluments,
		ctgRate: SETTLEMENT_RULES.ctgRate
	});
}
function calcCommutation(context, decision, basicPensionAmount) {
	const { assessment } = context;
	if (!decision.benefits["commutation"]) return notEligible("commutation", "Commutation", decision.reason, "COMMUTATION_FACTOR_BY_AGE_NEXT_BIRTHDAY");
	const opted = assessment.commutationDetails.commutationOpted;
	if (!opted) return notEligible("commutation", "Commutation", "Employee did not opt for commutation.", "COMMUTATION_FACTOR_BY_AGE_NEXT_BIRTHDAY");
	if (assessment.serviceDetails.pensionScheme !== "OPS") return notEligible("commutation", "Commutation", "Commutation is only applicable under OPS.", "COMMUTATION_FACTOR_BY_AGE_NEXT_BIRTHDAY");
	const ageNextBirthday = calculateAgeNextBirthday(assessment.employeeDetails.dateOfBirth, new Date(assessment.serviceDetails.dateOfExit));
	if (ageNextBirthday === null || ageNextBirthday === void 0) return notEligible("commutation", "Commutation", "Invalid date of birth provided, cannot calculate age next birthday.", "COMMUTATION_FACTOR_BY_AGE_NEXT_BIRTHDAY");
	const row = COMMUTATION_FACTORS.find((r) => r.age_next_birthday === ageNextBirthday && r.active);
	if (!row) return {
		key: "commutation",
		benefitName: "Commutation",
		amount: 0,
		eligible: false,
		status: "Not Eligible",
		formula: formulaEngineFormula("COMMUTATION_FACTOR_BY_AGE_NEXT_BIRTHDAY", "Commutation factor is fetched from COMMUTATION_FACTORS table by Age Next Birthday."),
		reason: `No active commutation factor found for Age Next Birthday ${ageNextBirthday}. Upload the official table to enable calculation.`,
		warnings: ["Commutation factor table is empty or missing this age."],
		details: { ageNextBirthday }
	};
	const percentage = assessment.commutationDetails.commutationPercentage;
	const commutedPension = basicPensionAmount * percentage / 100;
	return benefit$1("commutation", "Commutation", commutedPension * row.factor * 12, true, `Commuted Value = Commuted Pension (${percentage}% of ₹${Math.round(basicPensionAmount)}) × 12 × Factor ${row.factor}`, "COMMUTATION_FACTOR_BY_AGE_NEXT_BIRTHDAY", "Commuted Value = Commuted Pension × 12 × Commutation Factor (by Age Next Birthday)", {
		ageNextBirthday: row.age_next_birthday,
		commutationFactor: row.factor,
		factorSource: "formulas/generated/referenceData.ts",
		effectiveFrom: row.effective_from,
		circularNumber: row.circular_number,
		commutationOpted: opted,
		commutationPercentage: percentage,
		basicPension: Math.round(basicPensionAmount),
		commutedPension: Math.round(commutedPension),
		residualPension: Math.round(basicPensionAmount - commutedPension),
		formula: "Commuted Pension = Pension × Commutation%; Commuted Value = Commuted Pension × 12 × Factor"
	});
}
function calcResidualPension(context, decision, basicPensionAmount, commutationAmount) {
	const { assessment } = context;
	if (!decision.benefits["pension"]) return notEligible("residualPension", "Residual Pension", decision.reason, "RESIDUAL_PENSION");
	const percentage = assessment.commutationDetails.commutationOpted ? assessment.commutationDetails.commutationPercentage : 0;
	const commutedPension = basicPensionAmount * percentage / 100;
	const residual = basicPensionAmount - commutedPension;
	return benefit$1("residualPension", "Residual Pension", 0, true, `Residual Pension = Basic Pension − Commuted Pension (${percentage}%)`, "RESIDUAL_PENSION", "Residual Pension = Basic Pension − Commuted Pension", {
		basicPension: Math.round(basicPensionAmount),
		commutationPercentage: percentage,
		commutedPension: Math.round(commutedPension),
		residualPension: Math.round(residual)
	}, [], Math.round(residual));
}
function calcComplimentaryPass(context, decision) {
	const { assessment } = context;
	const admissible = decision.benefits["complimentaryPass"];
	const qs = assessment.serviceDetails.qualifyingService;
	const actualYears = qs.years + qs.months / 12 + qs.days / 365.25;
	const retirementType = assessment.serviceDetails.otherRetirementType ?? "normal";
	let effectiveServiceYears = actualYears;
	let hasMedicalCredit = false;
	if (retirementType === "medical") {
		effectiveServiceYears += 5;
		hasMedicalCredit = true;
	}
	const isEligible = admissible && effectiveServiceYears >= 19.75;
	let passSetsPerYear = 0;
	let passClass = "Not Applicable";
	let familyEligibility = "Not Applicable";
	let conditions = "";
	const restrictions = "Admissibility is subject to non-retention of unauthorized railway quarters (one set of passes is forfeited for every month of unauthorized retention). Passes are not admissible in case of dismissal or removal from service (unless compassionate allowance is sanctioned).";
	if (isEligible) {
		const group = assessment.employeeDetails.employeeGroup;
		if (group === "A" || group === "B") passSetsPerYear = effectiveServiceYears >= 25 ? 3 : 2;
		else if (group === "C") passSetsPerYear = effectiveServiceYears >= 25 ? 2 : 1;
		else if (group === "D") passSetsPerYear = 1;
		const match = assessment.employeeDetails.payMatrixLevel.match(/\d+/);
		const parsedLevel = match ? Number(match[0]) : null;
		if (group === "A" || group === "B") passClass = "First Class 'A'";
		else if (group === "C") if (parsedLevel !== null && parsedLevel >= 6) passClass = "First Class";
		else if (parsedLevel === 5) passClass = "Second Class 'A'";
		else passClass = "Second Class";
		else passClass = "Second Class";
		familyEligibility = "Admissible for self, spouse, children, and dependent widowed mother, subject to dependency criteria.";
		conditions = `Minimum 20 years of qualifying service (or 19 years 9 months and above rounded off to 20 years).${hasMedicalCredit ? " Includes 5 years additional service credit for medical invalidation retirement." : ""}`;
	} else conditions = "Qualifying service is less than the minimum required 20 years (including medical invalidation addition if applicable).";
	return {
		key: "complimentaryPass",
		benefitName: "Complimentary Pass",
		amount: 0,
		eligible: isEligible,
		status: isEligible ? "Calculated" : "Not Eligible",
		formula: {
			formulaName: "Rule-Based Entitlement",
			formulaKey: "COMPLIMENTARY_PASS_ENTITLEMENT",
			workbookSheet: "Pass Rules",
			cellReference: "Schedule IV Rule 8(2)",
			ruleReference: "Railway Servants (Pass) Rules, 1986",
			explanation: "Post-Retirement Complimentary Pass entitlement is based on Group, Qualifying Service, and Pay Level."
		},
		reason: isEligible ? `Eligible for ${passSetsPerYear} set(s) of ${passClass} passes per year.` : `Not eligible for Post-Retirement Complimentary Passes: ${conditions}`,
		warnings: [],
		details: {
			passSetsPerYear,
			passClass,
			familyEligibility,
			ruleReference: "Schedule IV, Rule 8(2) of Railway Servants (Pass) Rules, 1986",
			conditions,
			restrictions,
			requiredDocuments: [
				"Service Register",
				"Pass Account Declaration",
				"No Dues Certificate (for quarters)"
			]
		}
	};
}
function calculateWithFormulaEngine(assessment, ruleResult, workbookData) {
	const context = {
		assessment,
		ruleResult,
		workbookData
	};
	const decision = evaluateRetirementRules(assessment);
	const basicPension = calcBasicPension(context, decision);
	const familyPension = calcFamilyPension(context, decision);
	const retirementGratuity = calcRetirementGratuity(context, decision);
	const leaveEncashment = calcLeaveEncashment(context, decision);
	const halfLeaveEncashment = calcHalfLeaveEncashment(context);
	const providentFund = calcProvidentFund(context);
	const cgis = calcCGIS(context);
	const relhs = calcRELHS(context, decision);
	const fma = calcFMA(context, decision);
	const ctg = calcCTG(context, decision);
	const commutation = calcCommutation(context, decision, basicPension.monthlyAmount ?? 0);
	const residualPension = calcResidualPension(context, decision, basicPension.monthlyAmount ?? 0, commutation.amount);
	const complimentaryPass = calcComplimentaryPass(context, decision);
	const totalOneTimeBenefits = retirementGratuity.amount + leaveEncashment.amount + providentFund.amount + cgis.amount + relhs.amount + ctg.amount + commutation.amount;
	const monthlyPension = residualPension.monthlyAmount ?? 0;
	const monthlyFma = fma.monthlyAmount ?? 0;
	return {
		basicPension,
		familyPension,
		retirementGratuity,
		leaveEncashment,
		halfLeaveEncashment,
		providentFund,
		cgis,
		relhs,
		fma,
		ctg,
		commutation,
		residualPension,
		complimentaryPass,
		totalOneTimeBenefits,
		monthlyPension,
		monthlyFma,
		totalEstimatedSettlement: totalOneTimeBenefits + monthlyPension * 12 * 10 + monthlyFma * 12 * 10
	};
}
var CalculationEngine = class {
	calculate(assessment, ruleResult, workbookData) {
		return calculateWithFormulaEngine(assessment, ruleResult, workbookData);
	}
};
function runCalculationEngine(assessment, ruleResult, workbookData) {
	return new CalculationEngine().calculate(assessment, ruleResult, workbookData);
}
function getRetirementTypeLabel(assessment) {
	return evaluateRetirementRules(assessment).label;
}
function hasMinimumService(assessment, years) {
	return assessment.serviceDetails.qualifyingService.years >= years;
}
function pensionSchemeIsSupported(scheme) {
	return scheme === "OPS" || scheme === "UPS" || scheme === "NPS";
}
var calculationPending = "Formula Repository Calculation";
var railwayRules = "Railway Pension Rules 2026";
function benefit(benefitName, eligibility, reason, requiredDocuments, remarks = "Financial calculation processed by RailAssist Rule Engine.") {
	return {
		benefitName,
		eligibility,
		reason,
		ruleReference: railwayRules,
		requiredDocuments,
		estimatedAmount: calculationPending,
		status: eligibility === "Eligible" ? "Approved by Rule" : eligibility === "Not Eligible" || eligibility === "Not Opted" ? "Not Applicable" : "Needs Verification",
		remarks,
		calculationMethod: "",
		formulaReference: "",
		excelFormulaKey: ""
	};
}
var benefitRules = [
	{
		benefitName: "Pension",
		evaluate: (assessment) => {
			const retirementRules = evaluateRetirementRules(assessment);
			const eligible = pensionSchemeIsSupported(assessment.serviceDetails.pensionScheme) && retirementRules.benefits.pension;
			return benefit("Pension", eligible ? "Eligible" : "Not Eligible", eligible ? `${assessment.serviceDetails.pensionScheme} pension scheme is supported for ${retirementRules.label}.` : retirementRules.reason, [
				"Service Register",
				"Retirement Order",
				"PPO"
			]);
		}
	},
	{
		benefitName: "Family Pension",
		evaluate: (assessment) => benefit("Family Pension", isBenefitAdmissible(assessment, "familyPension") ? "Eligible" : "Conditional", isBenefitAdmissible(assessment, "familyPension") ? "Employee case is marked as Death Case." : "Family Pension applies only on death cases and requires family/nominee verification.", [
			"Death Certificate",
			"Nominee Details",
			"Family Composition Certificate"
		], "Conditional unless the case is a verified death case.")
	},
	{
		benefitName: "Retirement Gratuity",
		evaluate: (assessment) => {
			const retirementRules = evaluateRetirementRules(assessment);
			const blocked = !retirementRules.benefits.retirementGratuity;
			return benefit("Retirement Gratuity", blocked ? "Not Eligible" : "Eligible", blocked ? retirementRules.reason : "Employee separation type is eligible for gratuity rule evaluation.", [
				"Service Register",
				"Retirement Order",
				"PPO"
			]);
		}
	},
	{
		benefitName: "Leave Encashment",
		evaluate: (assessment) => {
			const hasLeave = assessment.salaryDetails.lapDays > 0 || assessment.salaryDetails.lhapDays > 0;
			const admissible = isBenefitAdmissible(assessment, "leaveEncashment");
			return benefit("Leave Encashment", hasLeave && admissible ? "Eligible" : "Not Eligible", admissible ? hasLeave ? "LAP or LHAP balance is greater than zero." : "No LAP or LHAP balance entered." : evaluateRetirementRules(assessment).reason, ["Leave Account", "Service Register"]);
		}
	},
	{
		benefitName: "Provident Fund",
		evaluate: (assessment) => benefit("Provident Fund", isBenefitAdmissible(assessment, "providentFund") ? "Eligible" : "Not Eligible", isBenefitAdmissible(assessment, "providentFund") ? "Provident Fund value is manually entered for future settlement processing." : evaluateRetirementRules(assessment).reason, ["PF Statement", "Bank Details"], "Manual PF input captured. Amount validation and settlement calculation remain pending.")
	},
	{
		benefitName: "CGIS",
		evaluate: (assessment) => benefit("CGIS", isBenefitAdmissible(assessment, "cgis") ? "Eligible" : "Not Eligible", isBenefitAdmissible(assessment, "cgis") ? "CGIS value is manually entered for future settlement processing." : evaluateRetirementRules(assessment).reason, ["CGIS Statement", "Service Register"], "Manual CGIS input captured. Amount validation and settlement calculation remain pending.")
	},
	{
		benefitName: "RELHS",
		evaluate: (assessment) => {
			const relhs = evaluateRELHS(assessment);
			const admissible = isBenefitAdmissible(assessment, "relhs");
			return benefit("RELHS", relhs.eligible && admissible ? "Eligible" : "Not Eligible", admissible ? relhs.reason : evaluateRetirementRules(assessment).reason, relhs.requiredDocuments, relhs.remarks);
		}
	},
	{
		benefitName: "Fixed Medical Allowance",
		evaluate: (assessment) => {
			const fma = evaluateFMAWithRELHS(assessment, evaluateRELHS(assessment));
			const admissible = isBenefitAdmissible(assessment, "fma");
			return benefit("Fixed Medical Allowance", admissible ? fma.status : "Not Eligible", admissible ? fma.reason : evaluateRetirementRules(assessment).reason, ["FMA Option Form"], "Recurring monthly benefit. Not included in total settlement.");
		}
	},
	{
		benefitName: "Complimentary Pass",
		evaluate: (assessment) => {
			const qs = assessment.serviceDetails.qualifyingService;
			const actualYears = qs.years + qs.months / 12 + qs.days / 365.25;
			const retirementType = assessment.serviceDetails.otherRetirementType ?? "normal";
			let effectiveServiceYears = actualYears;
			let hasMedicalCredit = false;
			if (retirementType === "medical") {
				effectiveServiceYears += 5;
				hasMedicalCredit = true;
			}
			const eligible = isBenefitAdmissible(assessment, "complimentaryPass") && effectiveServiceYears >= 19.75;
			return benefit("Complimentary Pass", eligible ? "Eligible" : "Not Eligible", eligible ? `Eligible: completed ${Math.round(actualYears)} years of qualifying service (effective ${Math.round(effectiveServiceYears)} years with ${hasMedicalCredit ? "5-year medical credit" : "no overrides"}).` : `Not Eligible: qualifying service of ${Math.round(actualYears)} years (effective ${Math.round(effectiveServiceYears)} years) is below the minimum 20-year threshold.`, ["Service Register", "Pass Account Details"]);
		}
	},
	{
		benefitName: "Composite Transfer Grant",
		evaluate: (assessment) => {
			const retirementRules = evaluateRetirementRules(assessment);
			return benefit("Composite Transfer Grant", retirementRules.benefits.ctg ? "Conditional" : "Not Eligible", retirementRules.benefits.ctg ? "Eligibility depends on movement/settlement conditions and officer verification." : retirementRules.reason, ["Transfer Details", "Settlement Order"]);
		}
	},
	{
		benefitName: "Medical Facilities",
		evaluate: (assessment) => {
			const retirementRules = evaluateRetirementRules(assessment);
			return benefit("Medical Facilities", retirementRules.benefits.medicalFacilities ? "Eligible" : "Not Eligible", retirementRules.benefits.medicalFacilities ? "Employee separation type is eligible for medical facility evaluation." : retirementRules.reason, ["Medical Option Form", "Service Register"]);
		}
	}
];
function unique(values) {
	return Array.from(new Set(values.filter(Boolean)));
}
function createEmployeeSummary(assessment) {
	return {
		employeeName: assessment.employeeDetails.employeeName,
		scheme: assessment.serviceDetails.pensionScheme,
		retirementType: getRetirementTypeLabel(assessment),
		qualifyingService: formatQualifyingService(assessment.serviceDetails.qualifyingService),
		retirementDate: formatDisplayDate(assessment.serviceDetails.dateOfExit),
		employeeGroup: assessment.employeeDetails.employeeGroup,
		pensionEmoluments: formatCurrency(assessment.promotionDetails.emoluments)
	};
}
function createRuleTrace(assessment) {
	const retirementRules = evaluateRetirementRules(assessment);
	return [
		{
			title: "Retirement Type",
			description: `${retirementRules.label}. ${retirementRules.reason}`
		},
		{
			title: "Employee",
			description: assessment.employeeDetails.employeeName
		},
		{
			title: "Qualifying Service",
			description: formatQualifyingService(assessment.serviceDetails.qualifyingService)
		},
		{
			title: "Pension Scheme",
			description: assessment.serviceDetails.pensionScheme
		},
		{
			title: "Pay Matrix Level",
			description: assessment.employeeDetails.payMatrixLevel || "Not provided"
		},
		{
			title: "RELHS Eligibility Engine",
			description: "Retirement type and qualifying service evaluated as per RELHS rules."
		},
		{
			title: "Subscription Calculation",
			description: "Subscription amount selected from Pay Matrix Level lookup table."
		},
		{
			title: "Result Generated",
			description: "Rule Engine output prepared for settlement result display."
		}
	];
}
function createWarnings(assessment, benefits) {
	const warnings = [];
	if (!hasMinimumService(assessment, 20)) warnings.push("Employee has less than 20 years of qualifying service.");
	if (benefits.some((benefit) => benefit.benefitName === "RELHS" && benefit.eligibility === "Not Eligible")) warnings.push("Employee not eligible for RELHS under the current eligibility rules.");
	warnings.push("CGIS value entered manually.");
	warnings.push("PF value entered manually.");
	if (benefits.some((benefit) => benefit.eligibility === "Conditional" || benefit.eligibility === "Pending Verification")) warnings.push("Some benefits require officer verification before settlement processing.");
	return unique(warnings);
}
function evaluateSettlementRules(assessment) {
	const benefitResults = benefitRules.map((rule) => rule.evaluate(assessment));
	const missingDocuments = unique(benefitResults.flatMap((benefit) => benefit.requiredDocuments));
	const totalEligibleBenefits = benefitResults.filter((benefit) => benefit.eligibility === "Eligible").length;
	const notEligibleBenefits = benefitResults.filter((benefit) => benefit.eligibility === "Not Eligible" || benefit.eligibility === "Not Opted").length;
	const pendingVerification = benefitResults.filter((benefit) => benefit.eligibility === "Conditional" || benefit.eligibility === "Pending Verification").length;
	return {
		employeeSummary: createEmployeeSummary(assessment),
		benefitResults,
		ruleTrace: createRuleTrace(assessment),
		warnings: createWarnings(assessment, benefitResults),
		remarks: [
			"This is a rule-based eligibility advisory.",
			"Financial calculations are processed according to Railway Pension Rules 2026.",
			"Final settlement remains subject to officer verification and official records."
		],
		missingDocuments,
		totalEligibleBenefits,
		notEligibleBenefits,
		pendingVerification,
		estimatedSettlement: "Calculation Pending",
		generatedBy: "RailAssist Rule Engine",
		generatedOn: getIndianTimestamp()
	};
}
var RuleEngine = class {
	evaluate(assessment) {
		return evaluateSettlementRules(assessment);
	}
};
function runRuleEngine(assessment) {
	return new RuleEngine().evaluate(assessment);
}
function processSettlement(assessment, workbookData) {
	const ruleResult = runRuleEngine(assessment);
	return {
		ruleResult,
		calculation: runCalculationEngine(assessment, ruleResult, workbookData)
	};
}
var _jsxFileName = "C:/Users/Abhishek/Downloads/RailwayBenifits/rail-benefits-navigator/src/routes/employee.result.tsx?tsr-split=component";
function SettlementResultsPage() {
	const [assessment, setAssessment] = (0, import_react.useState)(null);
	const [savedSnapshot, setSavedSnapshot] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const rawSnapshot = sessionStorage.getItem("railassist:active-report-snapshot");
		if (rawSnapshot) try {
			const parsed = JSON.parse(rawSnapshot);
			setSavedSnapshot(parsed);
			setAssessment(parsed.report_snapshot?.assessment || parsed.assessment);
			return;
		} catch (e) {
			console.error("Failed to parse active report snapshot", e);
		}
		const raw = sessionStorage.getItem("railassist:settlement-assessment");
		if (!raw) return;
		try {
			setAssessment(JSON.parse(raw));
		} catch {
			setAssessment(null);
		}
	}, []);
	const processed = (0, import_react.useMemo)(() => {
		if (savedSnapshot && savedSnapshot.report_snapshot) return {
			ruleResult: savedSnapshot.report_snapshot.result || savedSnapshot.result,
			calculation: savedSnapshot.report_snapshot.calculation || savedSnapshot.calculation
		};
		return assessment ? processSettlement(assessment) : null;
	}, [assessment, savedSnapshot]);
	if (!assessment || !processed) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PageHeader, {
		title: "Settlement Results",
		description: "Review submitted settlement assessment outputs."
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 52,
		columnNumber: 9
	}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(EmptyState, {
		icon: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ClipboardCheck, { className: "h-5 w-5" }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 53,
			columnNumber: 27
		}, this),
		title: "No assessment submitted",
		description: "Complete the Settlement Assessment form to view the rule-based settlement advisory report.",
		action: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
				to: "/employee/benefits",
				children: "Open Settlement Assessment"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 54,
				columnNumber: 15
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 53,
			columnNumber: 212
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 53,
		columnNumber: 9
	}, this)] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 51,
		columnNumber: 12
	}, this);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PageHeader, {
		title: "Settlement Results",
		description: "Rule-based eligibility advisory with core settlement calculations.",
		actions: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
			variant: "outline",
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
				to: "/employee/benefits",
				children: "Edit Assessment"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 60,
				columnNumber: 13
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 59,
			columnNumber: 136
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 59,
		columnNumber: 7
	}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SettlementTabs, { children: (activeTab) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsContent, {
			value: "overview",
			className: "space-y-5",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(OverviewTab, {
				assessment,
				result: processed.ruleResult,
				calculation: processed.calculation
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 66,
				columnNumber: 15
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 65,
			columnNumber: 13
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsContent, {
			value: "benefits",
			className: "space-y-4",
			children: processed.ruleResult.benefitResults.map((benefit) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BenefitCard, {
				benefit,
				calculation: findCalculation(benefit.benefitName, processed.calculation)
			}, benefit.benefitName, false, {
				fileName: _jsxFileName,
				lineNumber: 70,
				columnNumber: 67
			}, this))
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 69,
			columnNumber: 13
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsContent, {
			value: "trace",
			className: "space-y-5",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RuleTrace, { result: processed.ruleResult }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 74,
				columnNumber: 15
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 73,
			columnNumber: 13
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsContent, {
			value: "report",
			className: "space-y-5",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(OfficialReport, {
				assessment,
				result: processed.ruleResult,
				calculation: processed.calculation,
				savedSnapshot
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 78,
				columnNumber: 15
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 77,
			columnNumber: 13
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 64,
		columnNumber: 23
	}, this) }, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 63,
		columnNumber: 7
	}, this)] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 58,
		columnNumber: 10
	}, this);
}
var SETTLEMENT_TABS = [
	{
		value: "overview",
		label: "Overview",
		icon: LayoutGrid
	},
	{
		value: "benefits",
		label: "Benefits",
		icon: BadgeIndianRupee
	},
	{
		value: "trace",
		label: "Rule Trace",
		icon: Scale
	},
	{
		value: "report",
		label: "Official Report",
		icon: FileText
	}
];
function SettlementTabs({ children }) {
	const [activeTab, setActiveTab] = (0, import_react.useState)(() => {
		if (typeof window !== "undefined") {
			const params = new URLSearchParams(window.location.search);
			if (params.get("print") === "true" || params.get("download") === "true") return "report";
		}
		return "overview";
	});
	const tabsListRef = (0, import_react.useRef)(null);
	const indicatorRef = (0, import_react.useRef)(null);
	const updateIndicator = (0, import_react.useCallback)(() => {
		if (!tabsListRef.current || !indicatorRef.current) return;
		const activeEl = tabsListRef.current.querySelector("[data-state=\"active\"]");
		if (!activeEl) return;
		const listRect = tabsListRef.current.getBoundingClientRect();
		const elRect = activeEl.getBoundingClientRect();
		indicatorRef.current.style.width = `${elRect.width}px`;
		indicatorRef.current.style.transform = `translateX(${elRect.left - listRect.left + tabsListRef.current.scrollLeft}px)`;
	}, []);
	(0, import_react.useEffect)(() => {
		updateIndicator();
		window.addEventListener("resize", updateIndicator);
		return () => window.removeEventListener("resize", updateIndicator);
	}, [activeTab, updateIndicator]);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Tabs, {
		defaultValue: "overview",
		value: activeTab,
		onValueChange: setActiveTab,
		className: "space-y-5",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "settlement-tabs-nav print:hidden",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(List, {
				ref: tabsListRef,
				className: "settlement-tabs-list",
				children: [SETTLEMENT_TABS.map((tab) => {
					const Icon = tab.icon;
					return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trigger, {
						value: tab.value,
						className: "settlement-tab-trigger",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, { className: "settlement-tab-icon" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 144,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: tab.label }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 145,
							columnNumber: 17
						}, this)]
					}, tab.value, true, {
						fileName: _jsxFileName,
						lineNumber: 143,
						columnNumber: 18
					}, this);
				}), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					ref: indicatorRef,
					className: "settlement-tab-indicator"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 149,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 140,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 139,
			columnNumber: 7
		}, this), children(activeTab)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 137,
		columnNumber: 10
	}, this);
}
function OverviewTab({ assessment, result, calculation }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SectionCard, {
			title: "Employee Summary",
			description: "Submitted employee details used by the Rule Engine.",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid gap-3 md:grid-cols-2 xl:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ResultMetric, {
						label: "Employee Name",
						value: result.employeeSummary.employeeName
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 169,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ResultMetric, {
						label: "Scheme",
						value: result.employeeSummary.scheme
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 170,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ResultMetric, {
						label: "Retirement Type",
						value: result.employeeSummary.retirementType
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 171,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ResultMetric, {
						label: "Qualifying Service",
						value: result.employeeSummary.qualifyingService
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 172,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ResultMetric, {
						label: getExitDateLabel(assessment.serviceDetails.retirementCategory, assessment.serviceDetails.otherRetirementType),
						value: result.employeeSummary.retirementDate
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 173,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ResultMetric, {
						label: "Employee Group",
						value: result.employeeSummary.employeeGroup
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 174,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ResultMetric, {
						label: "Pension Emoluments",
						value: result.employeeSummary.pensionEmoluments
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 175,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 168,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 167,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SectionCard, {
			title: "Settlement Summary",
			description: "One-time settlement and recurring monthly benefits are shown separately.",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid gap-3 md:grid-cols-2 xl:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ResultMetric, {
						label: "Eligible Benefits",
						value: String(result.totalEligibleBenefits)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 181,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ResultMetric, {
						label: "Not Eligible Benefits",
						value: String(result.notEligibleBenefits)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 182,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ResultMetric, {
						label: "Pending Verification",
						value: String(result.pendingVerification)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 183,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ResultMetric, {
						label: "Total One-Time Benefits",
						value: formatCurrency(calculation.totalOneTimeBenefits)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 184,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ResultMetric, {
						label: "Residual Monthly Pension",
						value: formatCurrency(calculation.monthlyPension)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 185,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ResultMetric, {
						label: "Monthly FMA",
						value: formatCurrency(calculation.monthlyFma)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 186,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ResultMetric, {
						label: "Total Monthly Benefits",
						value: formatCurrency(calculation.monthlyPension + calculation.monthlyFma)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 187,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ResultMetric, {
						label: "Total Estimated Settlement",
						value: formatCurrency(calculation.totalEstimatedSettlement)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 188,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 180,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 179,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SectionCard, {
			title: "Core Formula Outputs",
			description: "Calculated by the central Settlement Calculation Engine.",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid gap-3 md:grid-cols-2 xl:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ResultMetric, {
						label: "Basic Pension",
						value: formatCurrency(calculation.basicPension.amount)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 194,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ResultMetric, {
						label: "Commuted Pension",
						value: formatCurrency(Number(calculation.commutation.details?.commutedPension ?? 0))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 195,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ResultMetric, {
						label: "Commutation Lump Sum",
						value: formatCurrency(calculation.commutation.amount)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 196,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ResultMetric, {
						label: "Residual Pension",
						value: formatCurrency(calculation.residualPension.amount)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 197,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ResultMetric, {
						label: "Retirement Gratuity",
						value: formatCurrency(calculation.retirementGratuity.amount)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 198,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ResultMetric, {
						label: "Leave Encashment",
						value: formatCurrency(calculation.leaveEncashment.amount)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 199,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ResultMetric, {
						label: "PF + CGIS",
						value: formatCurrency(calculation.providentFund.amount + calculation.cgis.amount)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 200,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 193,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 192,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "grid gap-5 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ListSection, {
				title: "Missing Documents",
				description: "Documents indicated by evaluated benefit rules.",
				items: result.missingDocuments,
				icon: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FileCheckCorner, { className: "h-4 w-4" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 205,
					columnNumber: 148
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 205,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ListSection, {
				title: "Warnings",
				description: "Items requiring attention before settlement processing.",
				items: result.warnings,
				icon: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TriangleAlert, { className: "h-4 w-4" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 206,
					columnNumber: 139
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 206,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 204,
			columnNumber: 7
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 166,
		columnNumber: 10
	}, this);
}
function BenefitCard({ benefit, calculation }) {
	const amount = calculation ? formatCurrency(calculation.monthlyAmount ?? calculation.amount) : "Not available";
	const formula = calculation?.formula;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		className: "card-surface p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-start gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "h-10 w-10 rounded-md bg-primary-soft text-primary grid place-items-center ring-1 ring-primary/10",
						children: benefit.eligibility === "Eligible" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleCheck, { className: "h-5 w-5" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 223,
							columnNumber: 51
						}, this) : benefit.eligibility === "Not Eligible" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleX, { className: "h-5 w-5" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 223,
							columnNumber: 131
						}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Info, { className: "h-5 w-5" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 223,
							columnNumber: 165
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 222,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "text-lg font-semibold text-foreground",
						children: benefit.benefitName
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 226,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-2 flex flex-wrap items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(EligibilityBadge, { status: benefit.eligibility }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 228,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
							variant: "secondary",
							children: benefit.status
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 229,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 227,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 225,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 221,
					columnNumber: 9
				}, this), benefit.benefitName !== "Complimentary Pass" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "rounded-md border border-border bg-muted/30 p-3 min-w-56",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "text-xs font-medium uppercase tracking-wide text-muted-foreground",
							children: "Amount"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 234,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-1 text-sm font-semibold text-foreground",
							children: amount
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 237,
							columnNumber: 13
						}, this),
						calculation?.status && /* @__PURE__ */ (void 0)("div", {
							className: "text-xs text-muted-foreground mt-1",
							children: calculation.status
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 238,
							columnNumber: 37
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 233,
					columnNumber: 57
				}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "rounded-md border border-border bg-muted/30 p-3 min-w-56",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "text-xs font-medium uppercase tracking-wide text-muted-foreground",
							children: "Benefit Type"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 240,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-1 text-sm font-semibold text-foreground",
							children: "Non-Monetary (Entitlement)"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 243,
							columnNumber: 13
						}, this),
						calculation?.status && /* @__PURE__ */ (void 0)("div", {
							className: "text-xs text-muted-foreground mt-1",
							children: calculation.status
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 246,
							columnNumber: 37
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 239,
					columnNumber: 20
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 220,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid gap-4 md:grid-cols-2 xl:grid-cols-4 mt-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ResultMetric, {
						label: "Reason",
						value: benefit.reason
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 251,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ResultMetric, {
						label: "Rule",
						value: formula?.ruleReference ?? benefit.ruleReference
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 252,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ResultMetric, {
						label: "Remarks",
						value: benefit.remarks
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 253,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ResultMetric, {
						label: "Formula Used",
						value: formula?.formulaName ?? "RailAssist Formula Repository"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 254,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ResultMetric, {
						label: "Formula Key",
						value: formula?.formulaKey ?? (benefit.excelFormulaKey || "Formula Reference Key")
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 255,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ResultMetric, {
						label: "Rule Source",
						value: formula?.workbookSheet ?? "Rule Engine"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 256,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ResultMetric, {
						label: "Reference Details",
						value: formula?.cellReference ?? "Calculated dynamically"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 257,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ResultMetric, {
						label: "Explanation",
						value: formula?.explanation ?? "Calculated according to Railway Pension Rules 2026."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 258,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 250,
				columnNumber: 7
			}, this),
			benefit.benefitName === "RELHS" && calculation?.details && /* @__PURE__ */ (void 0)("div", {
				className: "grid gap-4 md:grid-cols-2 xl:grid-cols-4 mt-5 rounded-md border border-primary/20 bg-primary-soft/30 p-4",
				children: [
					/* @__PURE__ */ (void 0)(ResultMetric, {
						label: "RELHS Status",
						value: benefit.eligibility
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 262,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)(ResultMetric, {
						label: "Subscription Amount",
						value: formatCurrency(calculation.amount)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 263,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)(ResultMetric, {
						label: "Medical Card",
						value: String(calculation.details.medicalCard ?? "Not Eligible")
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 264,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)(ResultMetric, {
						label: "Family Coverage",
						value: calculation.details.familyEligible ? "Yes" : "No"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 265,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)(ResultMetric, {
						label: "Verification",
						value: String(calculation.details.verificationStatus ?? "Automatic")
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 266,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)(ResultMetric, {
						label: "Reference",
						value: String(calculation.details.ruleReference ?? benefit.ruleReference)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 267,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)(ResultMetric, {
						label: "Pay Matrix Level",
						value: String(calculation.details.payMatrixLevel ?? "Not available")
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 268,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)(ResultMetric, {
						label: "Subscription Band",
						value: String(calculation.details.subscriptionBand ?? "Requires verification")
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 269,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 261,
				columnNumber: 67
			}, this),
			benefit.benefitName === "Commutation" && calculation?.details && /* @__PURE__ */ (void 0)("div", {
				className: "grid gap-4 md:grid-cols-2 xl:grid-cols-4 mt-5 rounded-md border border-primary/20 bg-primary-soft/30 p-4",
				children: [
					/* @__PURE__ */ (void 0)(ResultMetric, {
						label: "Age Next Birthday",
						value: String(calculation.details.ageNextBirthday ?? "Not available")
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 273,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)(ResultMetric, {
						label: "Commutation Factor",
						value: String(calculation.details.commutationFactor ?? "Not available")
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 274,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)(ResultMetric, {
						label: "Factor Source",
						value: String(calculation.details.factorSource ?? "not-found")
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 275,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)(ResultMetric, {
						label: "Circular Number",
						value: String(calculation.details.circularNumber ?? "Not available")
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 276,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)(ResultMetric, {
						label: "Commutation %",
						value: `${String(calculation.details.commutationPercentage ?? 0)}%`
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 277,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)(ResultMetric, {
						label: "Commuted Pension",
						value: formatCurrency(Number(calculation.details.commutedPension ?? 0))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 278,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)(ResultMetric, {
						label: "Residual Pension",
						value: formatCurrency(Number(calculation.details.residualPension ?? 0))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 279,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 272,
				columnNumber: 73
			}, this),
			benefit.benefitName === "Complimentary Pass" && calculation?.details && /* @__PURE__ */ (void 0)("div", {
				className: "grid gap-4 md:grid-cols-2 xl:grid-cols-4 mt-5 rounded-md border border-primary/20 bg-primary-soft/30 p-4",
				children: [
					/* @__PURE__ */ (void 0)(ResultMetric, {
						label: "Eligibility",
						value: calculation.eligible ? "Eligible" : "Not Eligible"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 283,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)(ResultMetric, {
						label: "Pass Sets per Year",
						value: String(calculation.details.passSetsPerYear ?? "0")
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 284,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)(ResultMetric, {
						label: "Pass Class",
						value: String(calculation.details.passClass ?? "Not Applicable")
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 285,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)(ResultMetric, {
						label: "Family Eligibility",
						value: String(calculation.details.familyEligibility ?? "Not Applicable")
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 286,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)(ResultMetric, {
						label: "Rule Reference",
						value: String(calculation.details.ruleReference ?? "Not Applicable")
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 287,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)(ResultMetric, {
						label: "Conditions",
						value: String(calculation.details.conditions ?? "Not Applicable")
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 288,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)(ResultMetric, {
						label: "Restrictions",
						value: String(calculation.details.restrictions ?? "Not Applicable")
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 289,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)(ResultMetric, {
						label: "Required Documents",
						value: Array.isArray(calculation.details.requiredDocuments) ? calculation.details.requiredDocuments.join(", ") : "Not Applicable"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 290,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 282,
				columnNumber: 80
			}, this),
			benefit.benefitName === "Fixed Medical Allowance" && calculation?.details && /* @__PURE__ */ (void 0)("div", {
				className: "grid gap-4 md:grid-cols-2 xl:grid-cols-4 mt-5 rounded-md border border-primary/20 bg-primary-soft/30 p-4",
				children: [
					/* @__PURE__ */ (void 0)(ResultMetric, {
						label: "Benefit",
						value: "Fixed Medical Allowance (FMA)"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 294,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)(ResultMetric, {
						label: "Eligibility",
						value: calculation.eligible ? "Eligible" : "Not Opted"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 295,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)(ResultMetric, {
						label: "Monthly Amount",
						value: formatCurrency(calculation.monthlyAmount ?? 0)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 296,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)(ResultMetric, {
						label: "Reason",
						value: "Employee selected FMA option."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 297,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)(ResultMetric, {
						label: "Reference",
						value: "Railway Pension Rules 2026"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 298,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 293,
				columnNumber: 85
			}, this),
			benefit.benefitName === "Leave Encashment" && calculation?.details && /* @__PURE__ */ (void 0)("div", {
				className: "grid gap-4 md:grid-cols-2 xl:grid-cols-4 mt-5 rounded-md border border-primary/20 bg-primary-soft/30 p-4",
				children: [
					/* @__PURE__ */ (void 0)(ResultMetric, {
						label: "LAP Entered",
						value: `${calculation.details.lapDays ?? 0} Days`
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 302,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)(ResultMetric, {
						label: "Encashable LAP",
						value: `${calculation.details.effectiveLapDays ?? 0} Days`
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 303,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)(ResultMetric, {
						label: "LHAP Entered",
						value: `${calculation.details.lhapDays ?? 0} Days`
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 304,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)(ResultMetric, {
						label: "Converted LHAP",
						value: `${calculation.details.effectiveLhapDays ?? 0} Days`
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 305,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)(ResultMetric, {
						label: "Total Encashable Days",
						value: `${calculation.details.totalEncashableDays ?? 0} Days`
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 306,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)(ResultMetric, {
						label: "Leave Encashment Amount",
						value: formatCurrency(calculation.amount)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 307,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 301,
				columnNumber: 78
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-5",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "text-xs font-medium uppercase tracking-wide text-muted-foreground mb-2",
					children: "Required Documents"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 311,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex flex-wrap gap-2",
					children: benefit.requiredDocuments.map((document) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
						variant: "outline",
						children: document
					}, document, false, {
						fileName: _jsxFileName,
						lineNumber: 315,
						columnNumber: 54
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 314,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 310,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 219,
		columnNumber: 10
	}, this);
}
function RuleTrace({ result }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SectionCard, {
		title: "Rule Trace",
		description: "Visual path followed by the Rule Engine for this assessment.",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ol", {
			className: "space-y-3",
			children: result.ruleTrace.map((step, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
				className: "flex gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex flex-col items-center",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "h-8 w-8 rounded-full bg-primary text-primary-foreground grid place-items-center text-sm font-semibold",
						children: index + 1
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 331,
						columnNumber: 15
					}, this), index < result.ruleTrace.length - 1 && /* @__PURE__ */ (void 0)("div", { className: "w-px flex-1 bg-border my-1" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 334,
						columnNumber: 55
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 330,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "pb-4",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "font-medium text-foreground",
						children: step.title
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 337,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "text-sm text-muted-foreground mt-1",
						children: step.description
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 338,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 336,
					columnNumber: 13
				}, this)]
			}, step.title, true, {
				fileName: _jsxFileName,
				lineNumber: 329,
				columnNumber: 48
			}, this))
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 328,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 327,
		columnNumber: 10
	}, this);
}
function OfficialReport({ assessment, result, calculation, savedSnapshot }) {
	const certificateRef = (0, import_react.useRef)(null);
	const reportGeneratedAt = (0, import_react.useMemo)(() => /* @__PURE__ */ new Date(), []);
	const generatedTimestamp = (0, import_react.useMemo)(() => {
		if (result.generatedOn.includes("IST") && /\d{1,2}:\d{2}:\d{2}/.test(result.generatedOn)) return result.generatedOn;
		const parsedGeneratedOn = new Date(result.generatedOn);
		const hasTimeComponent = /\d{1,2}:\d{2}/.test(result.generatedOn);
		return formatIndianDateTime(Number.isNaN(parsedGeneratedOn.getTime()) || !hasTimeComponent ? reportGeneratedAt : parsedGeneratedOn);
	}, [reportGeneratedAt, result.generatedOn]);
	generatedTimestamp.split(" ")[0] || formatIndianDate(reportGeneratedAt);
	const reportNumber = `SCR-STL-${reportGeneratedAt.getFullYear()}-${String(assessment.employeeDetails.employeeId || assessment.employeeDetails.employeeName || "DRAFT").replace(/[^a-zA-Z0-9]/g, "").slice(0, 12).toUpperCase()}`;
	const isDeathCase = evaluateRetirementRules(assessment).reportMode === "death";
	const netQualifyingService = result.employeeSummary.qualifyingService;
	const lastDrawnSalary = assessment.salaryDetails.currentBasicPay;
	const totalMonthlyBenefits = isDeathCase ? (calculation.familyPension.monthlyAmount ?? calculation.familyPension.amount) + calculation.monthlyFma : calculation.monthlyPension + calculation.monthlyFma;
	const [lastSavedReport, setLastSavedReport] = (0, import_react.useState)(null);
	const saveReport = (status = "Draft") => {
		const saved = saveSettlementReport(assessment, result, calculation, {
			status,
			remarks: status === "Submitted" ? "Submitted for officer verification." : "Saved as draft."
		});
		setLastSavedReport(`Version ${saved.version || saved.report_version} saved as ${saved.status}.`);
	};
	const triggerPrint = () => {
		if (typeof window === "undefined") return;
		document.body.classList.add("printing");
		const onAfterPrint = () => {
			document.body.classList.remove("printing");
			window.removeEventListener("afterprint", onAfterPrint);
		};
		window.addEventListener("afterprint", onAfterPrint);
		window.print();
	};
	const handlePrint = () => {
		triggerPrint();
	};
	const handleDownloadPdf = async () => {
		if (typeof window === "undefined" || !assessment) return;
		const page1El = document.getElementById("certificate-page-1");
		if (!page1El) {
			console.error("Page element not found for PDF download");
			return;
		}
		try {
			const canvas1 = await html2canvas(page1El, {
				scale: 2,
				useCORS: true,
				logging: false,
				backgroundColor: "#ffffff"
			});
			const pdf = new import_jspdf_node_min.jsPDF("p", "mm", "a4");
			const pdfWidth = 210;
			const imgHeight1 = canvas1.height * pdfWidth / canvas1.width;
			const imgData1 = canvas1.toDataURL("image/png");
			pdf.addImage(imgData1, "PNG", 0, 0, pdfWidth, imgHeight1);
			const fileName = `Settlement_Report_${assessment.employeeDetails.employeeId?.replace(/[^a-zA-Z0-9]/g, "") || "Employee"}_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0].replace(/-/g, "")}.pdf`;
			pdf.save(fileName);
		} catch (error) {
			console.error("Failed to generate PDF:", error);
		}
	};
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined") return;
		const params = new URLSearchParams(window.location.search);
		const action = params.get("print") === "true" ? "print" : params.get("download") === "true" ? "download" : null;
		if (!action) return;
		const newUrl = new URL(window.location.href);
		newUrl.searchParams.delete("print");
		newUrl.searchParams.delete("download");
		window.history.replaceState({}, "", newUrl.toString());
		if (action === "print") {
			const t = setTimeout(() => {
				triggerPrint();
			}, 1200);
			return () => clearTimeout(t);
		}
		if (action === "download") {
			const t = setTimeout(() => {
				handleDownloadPdf();
			}, 1200);
			return () => clearTimeout(t);
		}
	}, [assessment]);
	const getBenefitRowData = (rowName) => {
		switch (rowName) {
			case "Basic Pension": {
				const isEligible = calculation.basicPension.eligible && !isDeathCase;
				return {
					status: isEligible ? "Eligible" : isDeathCase ? "Not Applicable" : "Not Eligible",
					amount: isEligible ? formatCurrency(calculation.basicPension.amount) + " / month" : "-"
				};
			}
			case "Family Pension": {
				const isEligible = calculation.familyPension.eligible;
				return {
					status: isEligible ? "Eligible" : !isDeathCase ? "Not Applicable" : "Not Eligible",
					amount: isEligible ? formatCurrency(calculation.familyPension.monthlyAmount ?? calculation.familyPension.amount) + " / month" : "-"
				};
			}
			case "Retirement Gratuity": {
				const isEligible = calculation.retirementGratuity.eligible && !isDeathCase;
				return {
					status: isEligible ? "Eligible" : isDeathCase ? "Not Applicable" : "Not Eligible",
					amount: isEligible ? formatCurrency(calculation.retirementGratuity.amount) : "-"
				};
			}
			case "Death Gratuity": {
				const isEligible = calculation.retirementGratuity.eligible && isDeathCase;
				return {
					status: isEligible ? "Eligible" : !isDeathCase ? "Not Applicable" : "Not Eligible",
					amount: isEligible ? formatCurrency(calculation.retirementGratuity.amount) : "-"
				};
			}
			case "Leave Encashment": {
				const isEligible = calculation.leaveEncashment.eligible;
				return {
					status: isEligible ? "Eligible" : "Not Eligible",
					amount: isEligible ? formatCurrency(calculation.leaveEncashment.amount) : "-"
				};
			}
			case "Commutation": {
				const isEligible = calculation.commutation.eligible && !isDeathCase;
				return {
					status: isEligible ? "Eligible" : isDeathCase ? "Not Applicable" : "Not Eligible",
					amount: isEligible ? formatCurrency(calculation.commutation.amount) : "-"
				};
			}
			case "Provident Fund": {
				const isEligible = calculation.providentFund.eligible;
				return {
					status: isEligible ? "Eligible" : "Not Eligible",
					amount: isEligible ? formatCurrency(calculation.providentFund.amount) : "-"
				};
			}
			case "CGEGIS": {
				const isEligible = calculation.cgis.eligible;
				return {
					status: isEligible ? "Eligible" : "Not Eligible",
					amount: isEligible ? formatCurrency(calculation.cgis.amount) : "-"
				};
			}
			case "RELHS": {
				const isEligible = calculation.relhs.eligible;
				return {
					status: isEligible ? "Eligible" : "Not Eligible",
					amount: isEligible ? formatCurrency(calculation.relhs.amount) : "-"
				};
			}
			case "Complimentary Pass": {
				const isEligible = calculation.complimentaryPass.eligible && !isDeathCase;
				const isNotApplicable = isDeathCase;
				const sets = calculation.complimentaryPass.details?.passSetsPerYear;
				const cls = calculation.complimentaryPass.details?.passClass;
				return {
					status: isEligible ? "Eligible" : isNotApplicable ? "Not Applicable" : "Not Eligible",
					amount: isEligible ? `${sets} set(s), ${cls} Class` : "-"
				};
			}
			case "FMA": {
				const isEligible = calculation.fma.eligible;
				return {
					status: isEligible ? "Eligible" : isDeathCase ? "Not Applicable" : "Not Eligible",
					amount: isEligible ? formatCurrency(calculation.fma.monthlyAmount ?? calculation.fma.amount) + " / month" : "-"
				};
			}
			default: return {
				status: "Not Applicable",
				amount: "-"
			};
		}
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "report-controls rounded-md border border-border bg-card p-4 shadow-sm print:hidden",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "text-sm font-semibold text-foreground",
						children: "Official Railway Settlement Certificate"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 560,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "text-xs text-muted-foreground",
						children: "Preview, print, and save the South Central Railway settlement certificate."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 563,
						columnNumber: 13
					}, this),
					lastSavedReport && /* @__PURE__ */ (void 0)("div", {
						className: "mt-1 text-xs font-medium text-primary",
						children: lastSavedReport
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 566,
						columnNumber: 33
					}, this)
				] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 559,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							type: "button",
							variant: "outline",
							size: "sm",
							onClick: handleDownloadPdf,
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Download, { className: "mr-2 h-4 w-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 570,
								columnNumber: 15
							}, this), "Download PDF"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 569,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							type: "button",
							variant: "outline",
							size: "sm",
							onClick: handlePrint,
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Printer, { className: "mr-2 h-4 w-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 574,
								columnNumber: 15
							}, this), "Print Report"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 573,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							type: "button",
							variant: "outline",
							size: "sm",
							onClick: () => saveReport("Draft"),
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Save, { className: "mr-2 h-4 w-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 578,
								columnNumber: 15
							}, this), "Save as Draft"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 577,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							type: "button",
							size: "sm",
							onClick: () => saveReport("Submitted"),
							children: "Generate New Version"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 581,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 568,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 558,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 557,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
			ref: certificateRef,
			className: "settlement-certificate mx-auto max-w-[210mm] bg-white text-slate-950 shadow-sm ring-1 ring-slate-300 print:max-w-none print:shadow-none print:ring-0",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "px-5 py-5 text-[12px] leading-snug sm:px-8 print:px-8 print:py-6",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					id: "certificate-page-1",
					className: "bg-white px-8 py-6 print:p-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("header", {
							className: "border-b-2 border-slate-900 pb-3",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "grid grid-cols-[72px_1fr_72px] items-center gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
										src: INDIAN_RAILWAYS_LOGO,
										alt: "Indian Railways",
										className: "h-14 w-14 object-contain print:h-12 print:w-12"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 593,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "text-center",
										children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "text-2xl font-black uppercase tracking-wide",
												children: "South Central Railway"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 595,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "mt-1 text-lg font-bold uppercase tracking-wide",
												children: "Settlement Certificate"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 598,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "text-sm font-semibold uppercase tracking-wide",
												children: "Details of Settlement Benefits"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 601,
												columnNumber: 19
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 594,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 605,
										columnNumber: 17
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 592,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 591,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-4 text-center text-sm font-semibold",
							children: [assessment.employeeDetails.employeeName || "Employee Name", assessment.employeeDetails.employeeId ? ` (${assessment.employeeDetails.employeeId})` : ""]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 609,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CertificateSection, {
							title: "SECTION A – Employee Details",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "grid grid-cols-1 border border-slate-500 sm:grid-cols-2 print:grid-cols-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CertificateMeta, {
										label: "Employee Name",
										value: assessment.employeeDetails.employeeName || "Not available"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 616,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CertificateMeta, {
										label: "Employee ID / PF Number",
										value: assessment.employeeDetails.employeeId || "Not provided"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 617,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CertificateMeta, {
										label: "Department",
										value: assessment.employeeDetails.department || "Not provided"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 618,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CertificateMeta, {
										label: "Designation",
										value: assessment.employeeDetails.designation || "Not provided"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 619,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CertificateMeta, {
										label: "Employee Group",
										value: assessment.employeeDetails.employeeGroup
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 620,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CertificateMeta, {
										label: "Railway Zone / Division",
										value: "South Central Railway"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 621,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CertificateMeta, {
										label: "Retirement Type",
										value: result.employeeSummary.retirementType
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 622,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CertificateMeta, {
										label: "Pension Scheme",
										value: assessment.serviceDetails.pensionScheme
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 623,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CertificateMeta, {
										label: "Date of Birth",
										value: formatIndianDate(assessment.employeeDetails.dateOfBirth)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 624,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CertificateMeta, {
										label: "Date of Appointment",
										value: formatIndianDate(assessment.employeeDetails.dateOfAppointment)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 625,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CertificateMeta, {
										label: getExitDateLabel(assessment.serviceDetails.retirementCategory, assessment.serviceDetails.otherRetirementType),
										value: formatIndianDate(assessment.serviceDetails.dateOfExit)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 626,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CertificateMeta, {
										label: "Qualifying Service",
										value: netQualifyingService
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 627,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CertificateMeta, {
										label: "Basic Pay",
										value: formatCurrency(assessment.salaryDetails.currentBasicPay)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 628,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CertificateMeta, {
										label: "Dearness Allowance",
										value: formatCurrency(assessment.salaryDetails.dearnessAllowance)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 629,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CertificateMeta, {
										label: "Last Pay Drawn",
										value: formatCurrency(lastDrawnSalary)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 630,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "grid grid-cols-[130px_1fr] border-b border-slate-300 last:border-b-0 sm:border-b-0 print:border-b-0 sm:[&:nth-child(odd)]:border-r print:[&:nth-child(odd)]:border-r",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "bg-slate-100 px-2 py-1.5 text-[10px] font-bold uppercase tracking-wide",
											children: "\xA0"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 633,
											columnNumber: 19
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "px-2 py-1.5 font-medium",
											children: "\xA0"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 636,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 632,
										columnNumber: 17
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 615,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 614,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CertificateSection, {
							title: "SECTION B – Benefits Summary",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "border border-slate-500",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("table", {
									className: "w-full border-collapse text-[12px]",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("thead", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", {
										className: "bg-slate-100 font-bold border-b border-slate-500",
										children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
												className: "border-r border-slate-300 px-3 py-2 text-left w-[40%]",
												children: "Benefit"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 646,
												columnNumber: 23
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
												className: "border-r border-slate-300 px-3 py-2 text-center w-[25%]",
												children: "Status"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 649,
												columnNumber: 23
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
												className: "px-3 py-2 text-right w-[35%]",
												children: "Amount / Entitlement"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 652,
												columnNumber: 23
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 645,
										columnNumber: 21
									}, this) }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 644,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tbody", { children: [
										"Basic Pension",
										"Family Pension",
										"Retirement Gratuity",
										"Death Gratuity",
										"Leave Encashment",
										"Commutation",
										"Provident Fund",
										"CGEGIS",
										"RELHS",
										"Complimentary Pass",
										"FMA"
									].map((rowName) => {
										const { status, amount } = getBenefitRowData(rowName);
										return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", {
											className: "border-b border-slate-300 last:border-b-0",
											children: [
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
													className: "border-r border-slate-300 px-3 py-1.5 align-top font-medium",
													children: rowName
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 662,
													columnNumber: 27
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
													className: "border-r border-slate-300 px-3 py-1.5 align-top text-center",
													children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
														className: `inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${status === "Eligible" ? "bg-green-100 text-green-800" : status === "Not Applicable" ? "bg-slate-100 text-slate-600" : "bg-red-100 text-red-800"}`,
														children: status
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 666,
														columnNumber: 29
													}, this)
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 665,
													columnNumber: 27
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
													className: "px-3 py-1.5 text-right align-top font-bold text-slate-900",
													children: amount
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 670,
													columnNumber: 27
												}, this)
											]
										}, rowName, true, {
											fileName: _jsxFileName,
											lineNumber: 661,
											columnNumber: 28
										}, this);
									}) }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 655,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 643,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 642,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mt-4 border border-slate-500 bg-slate-50 p-4 select-none print:bg-slate-50",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("table", {
									className: "w-full text-xs font-bold",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tbody", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", {
										className: "border-b border-slate-300",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
											className: "py-2 text-left uppercase tracking-wide text-slate-700",
											children: "Total One-Time Benefits"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 684,
											columnNumber: 23
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
											className: "py-2 text-right text-slate-900 text-sm font-black",
											children: formatCurrency(calculation.totalOneTimeBenefits)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 687,
											columnNumber: 23
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 683,
										columnNumber: 21
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
										className: "py-2 text-left uppercase tracking-wide text-slate-700",
										children: "Total Monthly Benefits"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 692,
										columnNumber: 23
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
										className: "py-2 text-right text-slate-900 text-sm font-black",
										children: [
											formatCurrency(totalMonthlyBenefits),
											" ",
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "text-[10px] font-normal lowercase",
												children: "per month"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 697,
												columnNumber: 25
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 695,
										columnNumber: 23
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 691,
										columnNumber: 21
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 682,
										columnNumber: 19
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 681,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 680,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 641,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("footer", {
							className: "mt-8 border-t border-slate-500 pt-3 text-[10px] text-slate-600",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "grid gap-1 sm:grid-cols-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: "Prepared by: RailAssist Settlement Engine" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 707,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
										"Report Number: ",
										savedSnapshot?.report_number || reportNumber,
										" (Ver:",
										" ",
										savedSnapshot?.version || "Draft",
										")"
									] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 708,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
										"Generated:",
										" ",
										savedSnapshot?.generated_time ? `${savedSnapshot.generated_date.split("T")[0]} ${savedSnapshot.generated_time}` : generatedTimestamp
									] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 712,
										columnNumber: 17
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 706,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-2 leading-relaxed",
								children: "Disclaimer: This report is generated based on Railway pension and settlement rules. Final settlement is subject to verification and approval by the competent Railway authority."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 717,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 705,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 590,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 589,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 588,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 556,
		columnNumber: 10
	}, this);
}
function CertificateSection({ title, children }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		className: "mt-5 break-inside-avoid",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
			className: "mb-2 text-sm font-bold",
			children: title
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 761,
			columnNumber: 7
		}, this), children]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 760,
		columnNumber: 10
	}, this);
}
function CertificateMeta({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "grid grid-cols-[130px_1fr] border-b border-slate-300 last:border-b-0 sm:[&:nth-last-child(-n+2)]:border-b-0 sm:[&:nth-child(odd)]:border-r print:[&:nth-last-child(-n+2)]:border-b-0 print:[&:nth-child(odd)]:border-r",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "bg-slate-100 px-2 py-1.5 text-[10px] font-bold uppercase tracking-wide",
			children: label
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 773,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "px-2 py-1.5 font-medium",
			children: value
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 776,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 772,
		columnNumber: 10
	}, this);
}
function findCalculation(benefitName, calculation) {
	return {
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
		"Complimentary Pass": calculation.complimentaryPass,
		"Composite Transfer Grant": calculation.ctg,
		"Medical Facilities": calculation.relhs
	}[benefitName] ?? null;
}
function EligibilityBadge({ status }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
		variant: status === "Not Eligible" ? "destructive" : status === "Eligible" ? "default" : "secondary",
		children: status
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 903,
		columnNumber: 10
	}, this);
}
function ResultMetric({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "rounded-md border border-border bg-background p-3",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "text-xs font-medium uppercase tracking-wide text-muted-foreground",
			children: label
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 913,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mt-1 text-sm font-medium text-foreground",
			children: value
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 916,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 912,
		columnNumber: 10
	}, this);
}
function ListSection({ title, description, items, icon }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SectionCard, {
		title,
		description,
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
			className: "space-y-2",
			children: items.map((item) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
				className: "flex items-start gap-2 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
					className: "text-primary mt-0.5",
					children: icon
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 933,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: item }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 934,
					columnNumber: 13
				}, this)]
			}, item, true, {
				fileName: _jsxFileName,
				lineNumber: 932,
				columnNumber: 28
			}, this))
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 931,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 930,
		columnNumber: 10
	}, this);
}
//#endregion
export { SettlementResultsPage as component };
