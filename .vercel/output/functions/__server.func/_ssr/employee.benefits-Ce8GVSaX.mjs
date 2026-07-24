import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as Slot } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { J as Circle, q as ClipboardCheck, rt as CalendarCheck } from "../_libs/lucide-react.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { f as cn, l as SectionCard, o as Input, s as PageHeader } from "./common-DvgjYd9Y.mjs";
import { a as calculateRetirementDate, c as formatCurrency, f as formatQualifyingService, i as calculateQualifyingService, l as formatDisplayDate, n as calculateAgeNextBirthday, o as determineEmoluments, p as getExitDateLabel, r as calculateCurrentAge, s as determineFma, t as addQualifyingService } from "./settlement-assessment-qVns9-hD.mjs";
import { t as Button } from "./button-B28lidbK.mjs";
import { n as RadioGroupIndicator, r as RadioGroupItem$1, t as RadioGroup$1 } from "../_libs/@radix-ui/react-radio-group+[...].mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-BTJpNtQe.mjs";
import { a as stringType, i as objectType, n as coerce, o as ZodIssueCode, r as enumType, t as arrayType } from "../_libs/zod.mjs";
import { a as useFormContext, i as useForm, n as Controller, o as useWatch, r as FormProvider, t as u } from "../_libs/@hookform/resolvers+[...].mjs";
import { t as Root } from "../_libs/radix-ui__react-label.mjs";
import { i as SliderTrack, n as SliderRange, r as SliderThumb, t as Slider$1 } from "../_libs/radix-ui__react-slider.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/employee.benefits-Ce8GVSaX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName$4 = "C:/Users/Abhishek/Downloads/RailwayBenifits/rail-benefits-navigator/src/components/ui/label.tsx";
var labelVariants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");
var Label = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Root, {
	ref,
	className: cn(labelVariants(), className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$4,
	lineNumber: 17,
	columnNumber: 3
}, void 0));
Label.displayName = Root.displayName;
var _jsxFileName$3 = "C:/Users/Abhishek/Downloads/RailwayBenifits/rail-benefits-navigator/src/components/ui/form.tsx";
var Form = FormProvider;
var FormFieldContext = import_react.createContext(null);
var FormField = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FormFieldContext.Provider, {
		value: { name: props.name },
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Controller, { ...props }, void 0, false, {
			fileName: _jsxFileName$3,
			lineNumber: 35,
			columnNumber: 7
		}, void 0)
	}, void 0, false, {
		fileName: _jsxFileName$3,
		lineNumber: 34,
		columnNumber: 5
	}, void 0);
};
var useFormField = () => {
	const fieldContext = import_react.useContext(FormFieldContext);
	const itemContext = import_react.useContext(FormItemContext);
	const { getFieldState, formState } = useFormContext();
	if (!fieldContext) throw new Error("useFormField should be used within <FormField>");
	if (!itemContext) throw new Error("useFormField should be used within <FormItem>");
	const fieldState = getFieldState(fieldContext.name, formState);
	const { id } = itemContext;
	return {
		id,
		name: fieldContext.name,
		formItemId: `${id}-form-item`,
		formDescriptionId: `${id}-form-item-description`,
		formMessageId: `${id}-form-item-message`,
		...fieldState
	};
};
var FormItemContext = import_react.createContext(null);
var FormItem = import_react.forwardRef(({ className, ...props }, ref) => {
	const id = import_react.useId();
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FormItemContext.Provider, {
		value: { id },
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			ref,
			className: cn("space-y-2", className),
			...props
		}, void 0, false, {
			fileName: _jsxFileName$3,
			lineNumber: 79,
			columnNumber: 9
		}, void 0)
	}, void 0, false, {
		fileName: _jsxFileName$3,
		lineNumber: 78,
		columnNumber: 7
	}, void 0);
});
FormItem.displayName = "FormItem";
var FormLabel = import_react.forwardRef(({ className, ...props }, ref) => {
	const { error, formItemId } = useFormField();
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
		ref,
		className: cn(error && "text-destructive", className),
		htmlFor: formItemId,
		...props
	}, void 0, false, {
		fileName: _jsxFileName$3,
		lineNumber: 93,
		columnNumber: 5
	}, void 0);
});
FormLabel.displayName = "FormLabel";
var FormControl = import_react.forwardRef(({ ...props }, ref) => {
	const { error, formItemId, formDescriptionId, formMessageId } = useFormField();
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Slot, {
		ref,
		id: formItemId,
		"aria-describedby": !error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`,
		"aria-invalid": !!error,
		...props
	}, void 0, false, {
		fileName: _jsxFileName$3,
		lineNumber: 110,
		columnNumber: 5
	}, void 0);
});
FormControl.displayName = "FormControl";
var FormDescription = import_react.forwardRef(({ className, ...props }, ref) => {
	const { formDescriptionId } = useFormField();
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
		ref,
		id: formDescriptionId,
		className: cn("text-[0.8rem] text-muted-foreground", className),
		...props
	}, void 0, false, {
		fileName: _jsxFileName$3,
		lineNumber: 128,
		columnNumber: 5
	}, void 0);
});
FormDescription.displayName = "FormDescription";
var FormMessage = import_react.forwardRef(({ className, children, ...props }, ref) => {
	const { error, formMessageId } = useFormField();
	const body = error ? String(error?.message ?? "") : children;
	if (!body) return null;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
		ref,
		id: formMessageId,
		className: cn("text-[0.8rem] font-medium text-destructive", className),
		...props,
		children: body
	}, void 0, false, {
		fileName: _jsxFileName$3,
		lineNumber: 150,
		columnNumber: 5
	}, void 0);
});
FormMessage.displayName = "FormMessage";
var _jsxFileName$2 = "C:/Users/Abhishek/Downloads/RailwayBenifits/rail-benefits-navigator/src/components/ui/radio-group.tsx";
var RadioGroup = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RadioGroup$1, {
		className: cn("grid gap-2", className),
		...props,
		ref
	}, void 0, false, {
		fileName: _jsxFileName$2,
		lineNumber: 11,
		columnNumber: 10
	}, void 0);
});
RadioGroup.displayName = RadioGroup$1.displayName;
var RadioGroupItem = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RadioGroupItem$1, {
		ref,
		className: cn("aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RadioGroupIndicator, {
			className: "flex items-center justify-center",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Circle, { className: "h-3.5 w-3.5 fill-primary" }, void 0, false, {
				fileName: _jsxFileName$2,
				lineNumber: 29,
				columnNumber: 9
			}, void 0)
		}, void 0, false, {
			fileName: _jsxFileName$2,
			lineNumber: 28,
			columnNumber: 7
		}, void 0)
	}, void 0, false, {
		fileName: _jsxFileName$2,
		lineNumber: 20,
		columnNumber: 5
	}, void 0);
});
RadioGroupItem.displayName = RadioGroupItem$1.displayName;
var _jsxFileName$1 = "C:/Users/Abhishek/Downloads/RailwayBenifits/rail-benefits-navigator/src/components/ui/slider.tsx";
var Slider = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Slider$1, {
	ref,
	className: cn("relative flex w-full touch-none select-none items-center", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SliderTrack, {
		className: "relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SliderRange, { className: "absolute h-full bg-primary" }, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 16,
			columnNumber: 7
		}, void 0)
	}, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 15,
		columnNumber: 5
	}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SliderThumb, { className: "block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" }, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 18,
		columnNumber: 5
	}, void 0)]
}, void 0, true, {
	fileName: _jsxFileName$1,
	lineNumber: 10,
	columnNumber: 3
}, void 0));
Slider.displayName = Slider$1.displayName;
var _jsxFileName = "C:/Users/Abhishek/Downloads/RailwayBenifits/rail-benefits-navigator/src/routes/employee.benefits.tsx?tsr-split=component";
var employeeGroups = [
	"A",
	"B",
	"C",
	"D"
];
var pensionSchemes = [
	"OPS",
	"UPS",
	"NPS"
];
var retirementCategories = ["normal", "other"];
var otherRetirementTypes = [
	{
		value: "voluntary",
		label: "Voluntary Retirement"
	},
	{
		value: "medical",
		label: "Medical Retirement"
	},
	{
		value: "compulsory",
		label: "Compulsory Retirement"
	},
	{
		value: "death",
		label: "Death Case"
	},
	{
		value: "removal",
		label: "Removal"
	},
	{
		value: "dismissal",
		label: "Dismissal"
	},
	{
		value: "self-resignation",
		label: "Self Resignation"
	}
];
var moneyField = coerce.number({ invalid_type_error: "Enter a valid amount" });
var dayField = coerce.number({ invalid_type_error: "Enter a valid day count" });
var assessmentSchema = objectType({
	employeeName: stringType().min(1, "Employee name is required"),
	employeeId: stringType().optional(),
	dateOfBirth: stringType().min(1, "Date of birth is required"),
	dateOfAppointment: stringType().min(1, "Date of appointment is required"),
	dateOfExit: stringType().min(1, "Exit date is required"),
	employeeGroup: enumType(employeeGroups),
	payMatrixLevel: stringType().min(1, "Pay Matrix Level is required"),
	designation: stringType().optional(),
	department: stringType().optional(),
	pensionScheme: enumType(pensionSchemes),
	employeeCategory: enumType(["Running", "Non Running"]),
	retirementCategory: enumType(retirementCategories),
	otherRetirementType: enumType([
		"voluntary",
		"medical",
		"compulsory",
		"death",
		"removal",
		"dismissal",
		"self-resignation"
	]).optional(),
	currentBasicPay: moneyField.gt(0, "Basic Pay must be greater than 0"),
	dearnessAllowance: moneyField.min(0, "DA cannot be negative"),
	lapDays: dayField.min(0, "LAP days cannot be negative"),
	lhapDays: dayField.min(0, "LHAP days cannot be negative"),
	providentFund: moneyField.min(0, "PF cannot be negative"),
	cgis: moneyField.min(0, "CGIS cannot be negative"),
	promotedInLastTenMonths: enumType(["yes", "no"]),
	monthlyBasicPay: arrayType(moneyField.min(0, "Monthly Basic Pay cannot be negative")).length(10),
	fixedMedicalAllowance: enumType(["yes", "no"]),
	commutationOpted: enumType(["yes", "no"]),
	commutationPercentage: coerce.number().min(0).max(40),
	medicalRetirementApproved: enumType(["yes", "no"]),
	notionalServiceYears: coerce.number().min(0),
	notionalServiceMonths: coerce.number().min(0).max(11),
	pensionSanctionPercentage: coerce.number().min(0).max(100),
	dateOfDeath: stringType().optional(),
	spouseAvailable: enumType(["yes", "no"]),
	familyPensionEligible: enumType(["yes", "no"]),
	compassionateAllowanceSanctioned: enumType(["yes", "no"]),
	technicalResignation: enumType(["yes", "no"])
}).superRefine((data, ctx) => {
	const today = /* @__PURE__ */ new Date();
	const dob = new Date(data.dateOfBirth);
	const appointmentDate = new Date(data.dateOfAppointment);
	const exitDate = new Date(data.dateOfExit);
	if (Number.isNaN(dob.getTime())) ctx.addIssue({
		code: ZodIssueCode.custom,
		path: ["dateOfBirth"],
		message: "Enter a valid date of birth"
	});
	else if (dob > today) ctx.addIssue({
		code: ZodIssueCode.custom,
		path: ["dateOfBirth"],
		message: "Date of birth cannot be in the future"
	});
	if (data.retirementCategory === "other" && !data.otherRetirementType) ctx.addIssue({
		code: ZodIssueCode.custom,
		path: ["otherRetirementType"],
		message: "Select the retirement type"
	});
	if (Number.isNaN(exitDate.getTime())) ctx.addIssue({
		code: ZodIssueCode.custom,
		path: ["dateOfExit"],
		message: "Enter a valid exit date"
	});
	else {
		if (!Number.isNaN(dob.getTime()) && dob >= exitDate) ctx.addIssue({
			code: ZodIssueCode.custom,
			path: ["dateOfExit"],
			message: "Exit date must be after Date of Birth"
		});
		if (Number.isNaN(appointmentDate.getTime())) ctx.addIssue({
			code: ZodIssueCode.custom,
			path: ["dateOfAppointment"],
			message: "Enter a valid appointment date"
		});
		else if (appointmentDate >= exitDate) ctx.addIssue({
			code: ZodIssueCode.custom,
			path: ["dateOfAppointment"],
			message: "Appointment date must be before exit date"
		});
	}
	if (data.promotedInLastTenMonths === "yes") data.monthlyBasicPay.forEach((value, index) => {
		if (value <= 0) ctx.addIssue({
			code: ZodIssueCode.custom,
			path: ["monthlyBasicPay", index],
			message: "Required"
		});
	});
});
var defaultValues = {
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
	otherRetirementType: void 0,
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
	technicalResignation: "no"
};
var draftStorageKey = "railassist:settlement-assessment-draft";
var submittedStorageKey = "railassist:settlement-assessment";
function getInitialValues() {
	if (typeof window === "undefined") return defaultValues;
	const raw = sessionStorage.getItem(draftStorageKey);
	if (!raw) return defaultValues;
	try {
		const parsed = JSON.parse(raw);
		return {
			...defaultValues,
			...parsed,
			monthlyBasicPay: Array.from({ length: 10 }, (_, index) => Number(parsed.monthlyBasicPay?.[index] ?? defaultValues.monthlyBasicPay[index]))
		};
	} catch {
		return defaultValues;
	}
}
function SettlementAssessmentPage() {
	const navigate = useNavigate();
	const initialValues = (0, import_react.useMemo)(() => getInitialValues(), []);
	const form = useForm({
		resolver: u(assessmentSchema),
		defaultValues: initialValues,
		mode: "onBlur",
		shouldUnregister: false
	});
	(0, import_react.useEffect)(() => {
		const subscription = form.watch((value) => {
			sessionStorage.setItem(draftStorageKey, JSON.stringify(value));
		});
		return () => subscription.unsubscribe();
	}, [form]);
	(0, import_react.useEffect)(() => {
		if (typeof window !== "undefined") sessionStorage.removeItem("railassist:active-report-snapshot");
	}, []);
	const [employeeName, dateOfBirth, dateOfAppointment, dateOfExit, pensionScheme, retirementCategory, otherRetirementType, currentBasicPay, providentFund, cgis, promotedInLastTenMonths, monthlyBasicPay, fixedMedicalAllowance, commutationOpted, commutationPercentage, medicalRetirementApproved, notionalServiceYears, notionalServiceMonths, pensionSanctionPercentage, spouseAvailable, familyPensionEligible, compassionateAllowanceSanctioned, technicalResignation] = useWatch({
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
			"technicalResignation"
		]
	});
	const retirementDate = dateOfExit;
	const currentAge = calculateCurrentAge(dateOfBirth);
	const ageNextBirthday = calculateAgeNextBirthday(dateOfBirth);
	const baseQualifyingService = calculateQualifyingService(dateOfAppointment, retirementDate);
	const qualifyingService = retirementCategory === "other" && otherRetirementType === "medical" && baseQualifyingService ? addQualifyingService(baseQualifyingService, {
		years: Number(notionalServiceYears || 0),
		months: Number(notionalServiceMonths || 0)
	}) : baseQualifyingService;
	const promoted = promotedInLastTenMonths === "yes";
	const emolumentsSummary = determineEmoluments(Number(currentBasicPay || 0), promoted, monthlyBasicPay);
	const fmaSummary = determineFma(fixedMedicalAllowance === "yes");
	(0, import_react.useEffect)(() => {
		if (retirementCategory === "normal" && dateOfBirth) {
			const computed = calculateRetirementDate(dateOfBirth);
			if (computed && form.getValues("dateOfExit") !== computed) form.setValue("dateOfExit", computed, { shouldValidate: true });
		}
	}, [
		dateOfBirth,
		retirementCategory,
		form
	]);
	const buildAssessment = (data) => {
		const computedRetirementDate = data.dateOfExit;
		const computedService = calculateQualifyingService(data.dateOfAppointment, computedRetirementDate);
		const service = data.retirementCategory === "other" && data.otherRetirementType === "medical" && computedService ? addQualifyingService(computedService, {
			years: data.notionalServiceYears,
			months: data.notionalServiceMonths
		}) : computedService ?? {
			years: 0,
			months: 0,
			days: 0
		};
		const wasPromoted = data.promotedInLastTenMonths === "yes";
		const computedEmoluments = determineEmoluments(data.currentBasicPay, wasPromoted, data.monthlyBasicPay);
		const computedFma = determineFma(data.fixedMedicalAllowance === "yes");
		const salaryDetails = {
			currentBasicPay: data.currentBasicPay,
			dearnessAllowance: data.dearnessAllowance,
			lapDays: data.lapDays,
			lhapDays: data.lhapDays,
			providentFund: data.providentFund,
			cgis: data.cgis
		};
		const promotionDetails = {
			promotedInLastTenMonths: wasPromoted,
			monthlyBasicPay: wasPromoted ? data.monthlyBasicPay : [],
			averageLastTenMonthsBasicPay: computedEmoluments.averageLastTenMonthsBasicPay,
			calculationBasis: computedEmoluments.calculationBasis,
			emoluments: computedEmoluments.emoluments
		};
		const medicalBenefits = {
			fixedMedicalAllowance: data.fixedMedicalAllowance === "yes",
			...computedFma
		};
		const otherRetirementDetails = {
			medicalRetirementApproved: data.medicalRetirementApproved === "yes",
			notionalServiceAddition: {
				years: data.notionalServiceYears,
				months: data.notionalServiceMonths,
				days: 0
			},
			pensionSanctionPercentage: data.pensionSanctionPercentage,
			spouseAvailable: data.spouseAvailable === "yes",
			familyPensionEligible: data.familyPensionEligible === "yes",
			compassionateAllowanceSanctioned: data.compassionateAllowanceSanctioned === "yes",
			technicalResignation: data.technicalResignation === "yes"
		};
		return {
			employeeDetails: {
				employeeName: data.employeeName,
				employeeId: data.employeeId || void 0,
				dateOfBirth: data.dateOfBirth,
				dateOfAppointment: data.dateOfAppointment,
				employeeGroup: data.employeeGroup,
				payMatrixLevel: data.payMatrixLevel,
				designation: data.designation || void 0,
				department: data.department || void 0
			},
			serviceDetails: {
				pensionScheme: data.pensionScheme,
				employeeCategory: data.employeeCategory,
				retirementCategory: data.retirementCategory,
				otherRetirementType: data.retirementCategory === "other" ? data.otherRetirementType : void 0,
				dateOfExit: computedRetirementDate,
				qualifyingService: service,
				otherRetirementDetails: data.retirementCategory === "other" ? otherRetirementDetails : void 0
			},
			salaryDetails,
			promotionDetails,
			medicalBenefits,
			commutationDetails: {
				commutationOpted: data.commutationOpted === "yes",
				commutationPercentage: data.commutationPercentage
			}
		};
	};
	const onSubmit = (data) => {
		const assessment = buildAssessment(data);
		console.log("SettlementAssessment", assessment);
		sessionStorage.setItem(submittedStorageKey, JSON.stringify(assessment));
		navigate({ to: "/employee/result" });
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PageHeader, {
		title: "Settlement Assessment",
		description: "Collect employee, service, salary, promotion, medical, and manual inputs for future settlement processing."
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 331,
		columnNumber: 7
	}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, {
		...form,
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
			onSubmit: form.handleSubmit(onSubmit),
			className: "space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SectionCard, {
					title: "Employee Details",
					description: "Enter the employee identity, service start dates, group, and pay matrix details.",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid gap-4 md:grid-cols-2 xl:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextField, {
								control: form.control,
								name: "employeeName",
								label: "Employee Name"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 337,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextField, {
								control: form.control,
								name: "employeeId",
								label: "Employee ID",
								placeholder: "Optional"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 338,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextField, {
								control: form.control,
								name: "dateOfBirth",
								label: "Date of Birth",
								type: "date"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 339,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextField, {
								control: form.control,
								name: "dateOfAppointment",
								label: "Date of Appointment",
								type: "date"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 340,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextField, {
								control: form.control,
								name: "dateOfExit",
								label: getExitDateLabel(retirementCategory, otherRetirementType),
								type: "date"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 341,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ReadOnlyMetric, {
								label: "Current Age",
								value: currentAge === null ? "Enter Date of Birth" : String(currentAge)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 342,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ReadOnlyMetric, {
								label: "Age Next Birthday",
								value: ageNextBirthday === null ? "Enter Date of Birth" : String(ageNextBirthday)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 343,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectField, {
								control: form.control,
								name: "employeeGroup",
								label: "Employee Group",
								options: employeeGroups.map((group) => ({
									value: group,
									label: group
								}))
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 344,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextField, {
								control: form.control,
								name: "payMatrixLevel",
								label: "Pay Matrix Level",
								placeholder: "Example: Level 7"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 348,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextField, {
								control: form.control,
								name: "designation",
								label: "Designation",
								placeholder: "Optional"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 349,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextField, {
								control: form.control,
								name: "department",
								label: "Department",
								placeholder: "Optional"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 350,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 336,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 335,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SectionCard, {
					title: "Service Details",
					description: "Retirement date and qualifying service are calculated from DOB and appointment date.",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid gap-4 lg:grid-cols-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ReadOnlyMetric, {
									label: getExitDateLabel(retirementCategory, otherRetirementType),
									value: retirementDate ? formatDisplayDate(retirementDate) : "Enter Exit Date",
									icon: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CalendarCheck, { className: "h-5 w-5" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 356,
										columnNumber: 182
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 356,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ReadOnlyMetric, {
									label: "Qualifying Service",
									value: formatQualifyingService(qualifyingService),
									icon: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ClipboardCheck, { className: "h-5 w-5" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 357,
										columnNumber: 115
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 357,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RadioField, {
									control: form.control,
									name: "pensionScheme",
									label: "Pension Scheme",
									options: pensionSchemes.map((scheme) => ({
										value: scheme,
										label: scheme
									}))
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 358,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RadioField, {
									control: form.control,
									name: "employeeCategory",
									label: "Employee Category",
									options: [{
										value: "Running",
										label: "Running"
									}, {
										value: "Non Running",
										label: "Non Running"
									}]
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 362,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 355,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid gap-4 md:grid-cols-2 mt-5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RadioField, {
								control: form.control,
								name: "retirementCategory",
								label: "Retirement Type",
								options: [{
									value: "normal",
									label: "Normal Retirement"
								}, {
									value: "other",
									label: "Other Than Normal Retirement"
								}]
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 372,
								columnNumber: 15
							}, this), retirementCategory === "other" && /* @__PURE__ */ (void 0)(SelectField, {
								control: form.control,
								name: "otherRetirementType",
								label: "Other Retirement Type",
								options: otherRetirementTypes
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 379,
								columnNumber: 50
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 371,
							columnNumber: 13
						}, this),
						retirementCategory === "other" && otherRetirementType === "medical" && /* @__PURE__ */ (void 0)("div", {
							className: "mt-5 grid gap-4 md:grid-cols-3",
							children: [
								/* @__PURE__ */ (void 0)(RadioField, {
									control: form.control,
									name: "medicalRetirementApproved",
									label: "Medical Retirement Approved?",
									options: [{
										value: "yes",
										label: "Yes"
									}, {
										value: "no",
										label: "No"
									}]
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 383,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (void 0)(TextField, {
									control: form.control,
									name: "notionalServiceYears",
									label: "Notional Service Addition (Years)",
									type: "number"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 390,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (void 0)(TextField, {
									control: form.control,
									name: "notionalServiceMonths",
									label: "Notional Service Addition (Months)",
									type: "number"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 391,
									columnNumber: 17
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 382,
							columnNumber: 85
						}, this),
						retirementCategory === "other" && otherRetirementType === "compulsory" && /* @__PURE__ */ (void 0)("div", {
							className: "mt-5 grid gap-4 md:grid-cols-2",
							children: [/* @__PURE__ */ (void 0)(TextField, {
								control: form.control,
								name: "pensionSanctionPercentage",
								label: "Pension Sanction Percentage",
								type: "number"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 395,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)(ReadOnlyMetric, {
								label: "Pension Rule",
								value: `${pensionSanctionPercentage}% of calculated pension will be admitted.`
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 396,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 394,
							columnNumber: 88
						}, this),
						retirementCategory === "other" && otherRetirementType === "death" && /* @__PURE__ */ (void 0)("div", {
							className: "mt-5 grid gap-4 md:grid-cols-2",
							children: [/* @__PURE__ */ (void 0)(RadioField, {
								control: form.control,
								name: "spouseAvailable",
								label: "Spouse Available?",
								options: [{
									value: "yes",
									label: "Yes"
								}, {
									value: "no",
									label: "No"
								}]
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 400,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)(RadioField, {
								control: form.control,
								name: "familyPensionEligible",
								label: "Family Pension Eligible?",
								options: [{
									value: "yes",
									label: "Yes"
								}, {
									value: "no",
									label: "No"
								}]
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 407,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 399,
							columnNumber: 83
						}, this),
						retirementCategory === "other" && otherRetirementType === "removal" && /* @__PURE__ */ (void 0)("div", {
							className: "mt-5 grid gap-4 md:grid-cols-2",
							children: /* @__PURE__ */ (void 0)(RadioField, {
								control: form.control,
								name: "compassionateAllowanceSanctioned",
								label: "Compassionate Allowance Sanctioned?",
								options: [{
									value: "yes",
									label: "Yes"
								}, {
									value: "no",
									label: "No"
								}]
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 417,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 416,
							columnNumber: 85
						}, this),
						retirementCategory === "other" && otherRetirementType === "self-resignation" && /* @__PURE__ */ (void 0)("div", {
							className: "mt-5 grid gap-4 md:grid-cols-2",
							children: /* @__PURE__ */ (void 0)(RadioField, {
								control: form.control,
								name: "technicalResignation",
								label: "Technical Resignation?",
								options: [{
									value: "yes",
									label: "Yes"
								}, {
									value: "no",
									label: "No"
								}]
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 427,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 426,
							columnNumber: 94
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 354,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SectionCard, {
					title: "Salary Details",
					description: "Enter salary and leave balance details for the calculation engine.",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid gap-4 md:grid-cols-2 xl:grid-cols-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextField, {
								control: form.control,
								name: "currentBasicPay",
								label: "Current Basic Pay",
								type: "number"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 439,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextField, {
								control: form.control,
								name: "dearnessAllowance",
								label: "Dearness Allowance (DA %)",
								type: "number"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 440,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextField, {
								control: form.control,
								name: "lapDays",
								label: "LAP Days",
								type: "number"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 441,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextField, {
								control: form.control,
								name: "lhapDays",
								label: "LHAP Days",
								type: "number"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 442,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 438,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 437,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SectionCard, {
					title: "Promotion Details",
					description: "Capture last 10 months Basic Pay only when the employee was promoted before retirement.",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RadioField, {
							control: form.control,
							name: "promotedInLastTenMonths",
							label: "Was the employee promoted during the last 10 months before retirement?",
							options: [{
								value: "yes",
								label: "Yes"
							}, {
								value: "no",
								label: "No"
							}]
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 447,
							columnNumber: 13
						}, this),
						promotedInLastTenMonths === "yes" && /* @__PURE__ */ (void 0)("div", {
							className: "mt-5 space-y-5",
							children: /* @__PURE__ */ (void 0)("div", {
								className: "grid gap-4 md:grid-cols-2 xl:grid-cols-5",
								children: Array.from({ length: 10 }, (_, index) => /* @__PURE__ */ (void 0)(FormField, {
									control: form.control,
									name: `monthlyBasicPay.${index}`,
									render: ({ field }) => /* @__PURE__ */ (void 0)(FormItem, { children: [
										/* @__PURE__ */ (void 0)(FormLabel, { children: `Month ${index + 1} Basic Pay` }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 462,
											columnNumber: 27
										}, this),
										/* @__PURE__ */ (void 0)(FormControl, { children: /* @__PURE__ */ (void 0)(Input, {
											type: "number",
											min: 0,
											name: field.name,
											ref: field.ref,
											onBlur: field.onBlur,
											onChange: field.onChange,
											value: field.value == null ? "" : String(field.value)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 464,
											columnNumber: 29
										}, this) }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 463,
											columnNumber: 27
										}, this),
										/* @__PURE__ */ (void 0)(FormMessage, {}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 466,
											columnNumber: 27
										}, this)
									] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 461,
										columnNumber: 21
									}, this)
								}, index, false, {
									fileName: _jsxFileName,
									lineNumber: 459,
									columnNumber: 32
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 456,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 455,
							columnNumber: 51
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid gap-4 md:grid-cols-2 xl:grid-cols-4 mt-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ReadOnlyMetric, {
									label: "Last Basic Pay",
									value: formatCurrency(emolumentsSummary.lastBasicPay)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 472,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ReadOnlyMetric, {
									label: "Average Last 10 Months Basic Pay",
									value: formatCurrency(emolumentsSummary.averageLastTenMonthsBasicPay)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 473,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ReadOnlyMetric, {
									label: "Calculation Basis",
									value: emolumentsSummary.calculationBasis
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 474,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ReadOnlyMetric, {
									label: "Pension Emoluments",
									value: formatCurrency(emolumentsSummary.emoluments)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 475,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 471,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 446,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SectionCard, {
					title: "Medical Benefits",
					description: "Capture the employee option for Fixed Medical Allowance.",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RadioField, {
						control: form.control,
						name: "fixedMedicalAllowance",
						label: "Would you like to opt for Fixed Medical Allowance (FMA)?",
						options: [{
							value: "yes",
							label: "Yes"
						}, {
							value: "no",
							label: "No"
						}]
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 480,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid gap-4 md:grid-cols-3 mt-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ReadOnlyMetric, {
								label: "FMA Status",
								value: fmaSummary.fmaEligibility
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 488,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ReadOnlyMetric, {
								label: "Monthly Amount",
								value: formatCurrency(fmaSummary.fmaMonthlyAmount)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 489,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ReadOnlyMetric, {
								label: "Reason",
								value: fmaSummary.fmaReason
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 490,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 487,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 479,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SectionCard, {
					title: "Commutation",
					description: "Capture commutation option and percentage. Factor is fetched by Age Next Birthday.",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid gap-4 md:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RadioField, {
							control: form.control,
							name: "commutationOpted",
							label: "Do you want to commute pension?",
							options: [{
								value: "yes",
								label: "Yes"
							}, {
								value: "no",
								label: "No"
							}]
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 496,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FormField, {
							control: form.control,
							name: "commutationPercentage",
							render: ({ field }) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FormItem, { children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FormLabel, { children: [
									"Percentage of Pension to Commute: ",
									commutationPercentage,
									"%"
								] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 506,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Slider, {
									min: 0,
									max: 40,
									step: 1,
									value: [Number(field.value ?? 0)],
									onValueChange: (value) => field.onChange(value[0] ?? 0),
									disabled: commutationOpted !== "yes"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 510,
									columnNumber: 23
								}, this) }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 509,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FormMessage, {}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 512,
									columnNumber: 21
								}, this)
							] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 505,
								columnNumber: 19
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 503,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 495,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 494,
					columnNumber: 11
				}, this),
				pensionScheme === "OPS" && /* @__PURE__ */ (void 0)(SectionCard, {
					title: "Additional Inputs",
					description: "Manual OPS values entered by the employee for settlement processing.",
					children: /* @__PURE__ */ (void 0)("div", {
						className: "grid gap-4 md:grid-cols-2",
						children: [/* @__PURE__ */ (void 0)(TextField, {
							control: form.control,
							name: "providentFund",
							label: "Provident Fund (PF)",
							type: "number"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 519,
							columnNumber: 17
						}, this), /* @__PURE__ */ (void 0)(TextField, {
							control: form.control,
							name: "cgis",
							label: "CGIS",
							type: "number"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 520,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 518,
						columnNumber: 15
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 517,
					columnNumber: 39
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SectionCard, {
					title: "Review",
					description: "Verify the collected inputs before preparing the SettlementAssessment object.",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid gap-3 md:grid-cols-2 xl:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ReviewItem, {
								label: "Employee Name",
								value: employeeName || "Not entered"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 526,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ReviewItem, {
								label: "Pension Scheme",
								value: pensionScheme
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 527,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ReviewItem, {
								label: "Retirement Type",
								value: retirementCategory === "normal" ? "Normal Retirement" : otherRetirementTypes.find((item) => item.value === otherRetirementType)?.label ?? "Not selected"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 528,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ReviewItem, {
								label: getExitDateLabel(retirementCategory, otherRetirementType),
								value: retirementDate ? formatDisplayDate(retirementDate) : "Not available"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 529,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ReviewItem, {
								label: "Current Age",
								value: currentAge === null ? "Not available" : String(currentAge)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 530,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ReviewItem, {
								label: "Age Next Birthday",
								value: ageNextBirthday === null ? "Not available" : String(ageNextBirthday)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 531,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ReviewItem, {
								label: "Qualifying Service",
								value: formatQualifyingService(qualifyingService)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 532,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ReviewItem, {
								label: "Basic Pay",
								value: formatCurrency(Number(currentBasicPay || 0))
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 533,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ReviewItem, {
								label: "Pension Emoluments",
								value: formatCurrency(emolumentsSummary.emoluments)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 534,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ReviewItem, {
								label: "PF",
								value: formatCurrency(Number(providentFund || 0))
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 535,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ReviewItem, {
								label: "CGIS",
								value: formatCurrency(Number(cgis || 0))
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 536,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ReviewItem, {
								label: "FMA Option",
								value: fixedMedicalAllowance === "yes" ? "Yes" : "No"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 537,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ReviewItem, {
								label: "FMA Status",
								value: fmaSummary.fmaEligibility
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 538,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ReviewItem, {
								label: "Commutation",
								value: commutationOpted === "yes" ? `${commutationPercentage}%` : "No"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 539,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ReviewItem, {
								label: "Promotion Status",
								value: promotedInLastTenMonths === "yes" ? "Promoted" : "Not promoted"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 540,
								columnNumber: 15
							}, this),
							retirementCategory === "other" && otherRetirementType === "medical" && /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (void 0)(ReviewItem, {
								label: "Medical Approval",
								value: medicalRetirementApproved === "yes" ? "Approved" : "Not approved"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 542,
								columnNumber: 19
							}, this), /* @__PURE__ */ (void 0)(ReviewItem, {
								label: "Notional Service",
								value: `${notionalServiceYears || 0} years, ${notionalServiceMonths || 0} months`
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 543,
								columnNumber: 19
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 541,
								columnNumber: 87
							}, this),
							retirementCategory === "other" && otherRetirementType === "death" && /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (void 0)(ReviewItem, {
								label: "Spouse Available",
								value: spouseAvailable === "yes" ? "Yes" : "No"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 546,
								columnNumber: 19
							}, this), /* @__PURE__ */ (void 0)(ReviewItem, {
								label: "Family Pension Eligible",
								value: familyPensionEligible === "yes" ? "Yes" : "No"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 547,
								columnNumber: 19
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 545,
								columnNumber: 85
							}, this),
							retirementCategory === "other" && otherRetirementType === "compulsory" && /* @__PURE__ */ (void 0)(ReviewItem, {
								label: "Pension Sanction",
								value: `${pensionSanctionPercentage}%`
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 549,
								columnNumber: 90
							}, this),
							retirementCategory === "other" && otherRetirementType === "removal" && /* @__PURE__ */ (void 0)(ReviewItem, {
								label: "Compassionate Allowance",
								value: compassionateAllowanceSanctioned === "yes" ? "Sanctioned" : "Not sanctioned"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 550,
								columnNumber: 87
							}, this),
							retirementCategory === "other" && otherRetirementType === "self-resignation" && /* @__PURE__ */ (void 0)(ReviewItem, {
								label: "Technical Resignation",
								value: technicalResignation === "yes" ? "Yes" : "No"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 551,
								columnNumber: 96
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 525,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 524,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex justify-end",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						type: "submit",
						size: "lg",
						className: "w-full md:w-auto text-base",
						children: "Check Settlement"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 556,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 555,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 334,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 333,
		columnNumber: 7
	}, this)] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 330,
		columnNumber: 10
	}, this);
}
function TextField({ control, name, label, type = "text", placeholder }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FormField, {
		control,
		name,
		render: ({ field }) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FormItem, { children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FormLabel, { children: label }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 581,
				columnNumber: 11
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
				type,
				placeholder,
				min: type === "number" ? 0 : void 0,
				name: field.name,
				ref: field.ref,
				onBlur: field.onBlur,
				onChange: field.onChange,
				value: field.value == null ? "" : String(field.value)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 583,
				columnNumber: 13
			}, this) }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 582,
				columnNumber: 11
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FormMessage, {}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 585,
				columnNumber: 11
			}, this)
		] }, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 580,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 578,
		columnNumber: 10
	}, this);
}
function SelectField({ control, name, label, options }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FormField, {
		control,
		name,
		render: ({ field }) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FormItem, { children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FormLabel, { children: label }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 605,
				columnNumber: 11
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, {
				onValueChange: field.onChange,
				value: typeof field.value === "string" ? field.value : void 0,
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectValue, { placeholder: "Select" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 609,
					columnNumber: 17
				}, this) }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 608,
					columnNumber: 15
				}, this) }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 607,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectContent, { children: options.map((option) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
					value: option.value,
					children: option.label
				}, option.value, false, {
					fileName: _jsxFileName,
					lineNumber: 613,
					columnNumber: 38
				}, this)) }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 612,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 606,
				columnNumber: 11
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FormMessage, {}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 618,
				columnNumber: 11
			}, this)
		] }, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 604,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 602,
		columnNumber: 10
	}, this);
}
function RadioField({ control, name, label, options }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FormField, {
		control,
		name,
		render: ({ field }) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FormItem, { children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FormLabel, { children: label }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 638,
				columnNumber: 11
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RadioGroup, {
				onValueChange: field.onChange,
				value: typeof field.value === "string" ? field.value : void 0,
				className: "grid gap-2 sm:grid-cols-2",
				children: options.map((option) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
					className: "flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm cursor-pointer hover:bg-accent",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RadioGroupItem, { value: option.value }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 642,
						columnNumber: 19
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: option.label }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 643,
						columnNumber: 19
					}, this)]
				}, option.value, true, {
					fileName: _jsxFileName,
					lineNumber: 641,
					columnNumber: 38
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 640,
				columnNumber: 13
			}, this) }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 639,
				columnNumber: 11
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FormMessage, {}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 647,
				columnNumber: 11
			}, this)
		] }, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 637,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 635,
		columnNumber: 10
	}, this);
}
function ReadOnlyMetric({ label, value, icon }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "rounded-md border border-border bg-muted/30 p-4",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground",
			children: [icon, label]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 660,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mt-2 text-lg font-semibold text-foreground",
			children: value
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 664,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 659,
		columnNumber: 10
	}, this);
}
function ReviewItem({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "rounded-md border border-border bg-background p-3",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "text-xs font-medium uppercase tracking-wide text-muted-foreground",
			children: label
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 675,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mt-1 text-sm font-medium text-foreground",
			children: value
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 678,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 674,
		columnNumber: 10
	}, this);
}
//#endregion
export { SettlementAssessmentPage as component };
