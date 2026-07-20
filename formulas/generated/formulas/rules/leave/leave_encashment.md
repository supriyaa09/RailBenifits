# Leave Encashment Calculation Rules

**Version:** 1.0.0

**Rule ID:** RULE-LEAVE-002

**Status:** Draft

---

# Purpose

This document defines the business rules governing leave encashment calculations applicable to Railway employees.

It specifies the workflow used to determine the amount payable towards leave encashment based on the employee's eligible leave balance, applicable salary components, retirement event, and Government notifications.

This document contains business rules only and does not store reference data.

---

# Scope

These rules apply to:

- Superannuation Retirement
- Voluntary Retirement
- Compulsory Retirement
- Invalid Retirement
- Death Cases
- Other leave encashment cases permitted under Railway rules

---

# Authority

These rules shall be maintained only from official notifications issued by:

- Government of India
- Ministry of Railways
- Railway Board

---

# Dependencies

Uses:

- rules/leave/eligibility.md
- tables/leave/leave_encashment_limits.md
- tables/leave/leave_salary_components.md
- tables/leave/leave_types.md
- common/basic_pay.md
- common/emoluments.md

---

# Calculation Workflow

The leave encashment engine shall perform the following steps:

1. Verify employee eligibility.
2. Validate retirement type.
3. Determine eligible leave balance.
4. Apply maximum encashment limits.
5. Determine applicable salary components.
6. Calculate leave salary.
7. Compute leave encashment amount.
8. Generate calculation summary.

---

# Business Rules

The calculation engine shall:

- Verify eligibility before calculation.
- Consider only eligible leave types.
- Apply official leave encashment limits.
- Include only officially prescribed salary components.
- Ignore ineligible leave balances.
- Maintain a complete audit trail.
- Apply only Government notifications effective on the calculation date.

No monetary limits or formula constants shall be hardcoded.

---

# Inputs Required

The calculation engine may require:

- Employee ID
- Employee Category
- Retirement Type
- Date of Retirement
- Eligible Leave Balance
- Leave Type
- Applicable Salary Components
- Basic Pay
- Dearness Allowance
- Applicable Notification Date

---

# Outputs

The calculation shall produce:

- Eligible Leave Balance
- Leave Salary
- Leave Encashment Amount
- Applicable Rules
- Calculation Summary

---

# Backend Interface

Expected backend operations:

```text
calculateLeaveEncashment(employee)

calculateLeaveSalary(employee)

getEligibleLeaveBalance(employee)

generateLeaveEncashmentSummary(employee)
```

---

# Validation Rules

- Eligibility shall be verified before calculation.
- Leave balance shall be validated.
- Leave type shall be verified.
- Salary components shall be obtained from reference tables.
- Official encashment limits shall be applied.
- Historical calculations shall remain immutable.

---

# Error Conditions

Calculation shall fail when:

- Employee is not eligible.
- Leave balance is unavailable.
- Leave type is invalid.
- Salary information is incomplete.
- Required reference data is unavailable.

---

# References

Populate using:

- Railway Leave Rules
- Railway Board Circulars
- Government of India Notifications

---

# Revision History

| Version | Date | Description |
|----------|------|-------------|
| 1.0.0 | YYYY-MM-DD | Initial version |