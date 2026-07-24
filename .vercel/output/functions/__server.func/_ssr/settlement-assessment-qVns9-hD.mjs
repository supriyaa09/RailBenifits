//#region node_modules/.nitro/vite/services/ssr/assets/settlement-assessment-qVns9-hD.js
var indianTimeZone = "Asia/Kolkata";
var indianDateFormatter = new Intl.DateTimeFormat("en-IN", {
	timeZone: indianTimeZone,
	day: "2-digit",
	month: "2-digit",
	year: "numeric"
});
var indianDateTimeFormatter = new Intl.DateTimeFormat("en-IN", {
	timeZone: indianTimeZone,
	day: "2-digit",
	month: "2-digit",
	year: "numeric",
	hour: "2-digit",
	minute: "2-digit",
	second: "2-digit",
	hour12: false
});
function getDateParts(value) {
	const date = value instanceof Date ? value : new Date(value);
	if (Number.isNaN(date.getTime())) return null;
	return Object.fromEntries(indianDateFormatter.formatToParts(date).map((part) => [part.type, part.value]));
}
function formatIndianDate(value) {
	const parts = getDateParts(value);
	if (!parts) return String(value);
	return `${parts.day}/${parts.month}/${parts.year}`;
}
function formatIndianDateTime(value = /* @__PURE__ */ new Date()) {
	const date = value instanceof Date ? value : new Date(value);
	if (Number.isNaN(date.getTime())) return String(value);
	const parts = Object.fromEntries(indianDateTimeFormatter.formatToParts(date).map((part) => [part.type, part.value]));
	return `${parts.day}/${parts.month}/${parts.year} ${parts.hour}:${parts.minute}:${parts.second} IST`;
}
function getIndianTimestamp() {
	return formatIndianDateTime(/* @__PURE__ */ new Date());
}
function parseDateInput(value) {
	if (!value) return null;
	const [year, month, day] = value.split("-").map(Number);
	if (!year || !month || !day) return null;
	const date = new Date(year, month - 1, day);
	if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) return null;
	return date;
}
function formatDateInput(date) {
	if (!date) return "";
	return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
function formatDisplayDate(value) {
	const date = parseDateInput(value);
	if (!date) return "Not available";
	return formatIndianDate(date);
}
function calculateRetirementDate(dateOfBirth) {
	const dob = parseDateInput(dateOfBirth);
	if (!dob) return "";
	return formatDateInput(dob.getDate() === 1 ? new Date(dob.getFullYear() + 60, dob.getMonth(), 0) : new Date(dob.getFullYear() + 60, dob.getMonth() + 1, 0));
}
function calculateCurrentAge(dateOfBirth, asOf = /* @__PURE__ */ new Date()) {
	const dob = parseDateInput(dateOfBirth);
	if (!dob || dob > asOf) return null;
	let age = asOf.getFullYear() - dob.getFullYear();
	if (asOf < new Date(asOf.getFullYear(), dob.getMonth(), dob.getDate())) age -= 1;
	return age;
}
function calculateAgeNextBirthday(dateOfBirth, asOf = /* @__PURE__ */ new Date()) {
	const currentAge = calculateCurrentAge(dateOfBirth, asOf);
	return currentAge === null ? null : currentAge + 1;
}
function calculateQualifyingService(appointmentDateValue, retirementDateValue) {
	const appointmentDate = parseDateInput(appointmentDateValue);
	const retirementDate = parseDateInput(retirementDateValue);
	if (!appointmentDate || !retirementDate || appointmentDate > retirementDate) return null;
	const end = new Date(retirementDate.getFullYear(), retirementDate.getMonth(), retirementDate.getDate() + 1);
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
	return {
		years,
		months,
		days
	};
}
function formatQualifyingService(service) {
	if (!service) return "Not available";
	return `${service.years} years, ${service.months} months, ${service.days} days`;
}
function addQualifyingService(service, addition = {}) {
	const totalMonths = service.months + Number(addition.months ?? 0);
	return {
		years: service.years + Number(addition.years ?? 0) + Math.floor(totalMonths / 12),
		months: totalMonths % 12,
		days: service.days + Number(addition.days ?? 0)
	};
}
function formatCurrency(value) {
	return new Intl.NumberFormat("en-IN", {
		style: "currency",
		currency: "INR",
		maximumFractionDigits: 0
	}).format(Number.isFinite(value) ? value : 0);
}
function calculateAverageLastTenMonths(monthlyBasicPay) {
	const total = Array.from({ length: 10 }, (_, index) => Number(monthlyBasicPay[index]) || 0).reduce((sum, value) => sum + value, 0);
	return Math.round(total / 10);
}
function determineEmoluments(currentBasicPay, promotedInLastTenMonths, monthlyBasicPay) {
	const lastBasicPay = Number(currentBasicPay) || 0;
	const averageLastTenMonthsBasicPay = promotedInLastTenMonths ? calculateAverageLastTenMonths(monthlyBasicPay) : lastBasicPay;
	const useAverage = promotedInLastTenMonths && averageLastTenMonthsBasicPay > lastBasicPay;
	return {
		lastBasicPay,
		averageLastTenMonthsBasicPay,
		calculationBasis: useAverage ? "Average Last 10 Months Basic Pay" : "Current Basic Pay",
		emoluments: useAverage ? averageLastTenMonthsBasicPay : lastBasicPay
	};
}
function determineFma(fmaOpted) {
	return {
		fmaOpted,
		fmaEligibility: fmaOpted ? "Eligible" : "Not Opted",
		fmaMonthlyAmount: fmaOpted ? 1e3 : 0,
		fmaReason: fmaOpted ? "Employee opted for Fixed Medical Allowance." : "Employee did not opt for Fixed Medical Allowance."
	};
}
function getExitDateLabel(retirementCategory, otherRetirementType) {
	if (retirementCategory === "normal") return "Retirement Date";
	switch (otherRetirementType) {
		case "voluntary": return "Voluntary Retirement Date";
		case "premature": return "Premature Retirement Date";
		case "medical": return "Medical Invalidation Date";
		case "compulsory": return "Compulsory Retirement Date";
		case "self-resignation":
		case "resignation": return "Resignation Date";
		case "removal": return "Removal Date";
		case "dismissal": return "Dismissal Date";
		case "death":
		case "death-after-retirement": return "Date of Death";
		case "invalid":
		case "disability": return "Invalid Retirement Date";
		default: return "Exit Date";
	}
}
//#endregion
export { calculateRetirementDate as a, formatCurrency as c, formatIndianDateTime as d, formatQualifyingService as f, calculateQualifyingService as i, formatDisplayDate as l, getIndianTimestamp as m, calculateAgeNextBirthday as n, determineEmoluments as o, getExitDateLabel as p, calculateCurrentAge as r, determineFma as s, addQualifyingService as t, formatIndianDate as u };
