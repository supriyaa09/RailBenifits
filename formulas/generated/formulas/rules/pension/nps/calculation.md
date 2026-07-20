# NPS Pension Calculation Rules

**Version:** 1.0.0

**Rule ID:** RULE-NPS-002

**Status:** Draft

---

# Purpose

This document defines the business rules governing retirement benefit calculations under the National Pension System (NPS) applicable to Railway employees.

Unlike the Old Pension Scheme (OPS), NPS benefits are based on the employee's accumulated pension corpus and the applicable withdrawal and annuity regulations in force at the time of retirement.

This document defines the calculation workflow and business rules only. Reference values shall be obtained from the appropriate reference tables and official Government or PFRDA notifications.

---

# Scope

These rules apply to:

- Superannuation under NPS
- Voluntary Retirement (where applicable)
- Exit from NPS
- Death cases under NPS
- Retirement settlement involving NPS

---

# Authority

These rules shall be maintained only from official notifications issued by:

- Government of India
- Ministry of Finance
- Pension Fund Regulatory and Development Authority (PFRDA)
- Ministry of Railways
- Railway Board

---

# Dependencies

Uses:

- rules/pension/nps/eligibility.md
- common/qualifying-service.md
- common/retirement-date.md
- tables/service/service_categories.md
- tables/retirement/retirement_types.md

May also use:

- Official PFRDA notifications
- Railway Board NPS circulars

---

# Calculation Workflow

The NPS retirement benefit calculation shall generally follow the sequence below:

1. Verify employee eligibility under NPS.
2. Validate retirement type.
3. Determine the applicable retirement date.
4. Determine the accumulated NPS corpus.
5. Apply the withdrawal rules applicable on the retirement date.
6. Determine the amount available for lump-sum withdrawal.
7. Determine the amount required for annuity purchase.
8. Generate the retirement benefit summary.

---

# Business Rules

The calculation engine shall:

- Validate that the employee belongs to the National Pension System.
- Use the retirement type to determine applicable exit rules.
- Apply only the Government and PFRDA regulations effective on the retirement date.
- Use official corpus values provided by the authorized data source.
- Apply withdrawal and annuity provisions as notified by the competent authority.
- Produce a transparent calculation trail for audit purposes.

No mathematical constants or percentages shall be hardcoded unless officially notified.

---

# Inputs Required

The calculation engine may require:

- Employee ID
- Pension Scheme
- Date of Appointment
- Date of Retirement
- Retirement Type
- Employee Category
- Total NPS Corpus
- Applicable Notification Date

---

# Outputs

The calculation shall produce:

- Retirement Scheme
- Total NPS Corpus
- Lump-sum Withdrawal Amount
- Amount Utilized for Annuity
- Applicable Rules
- Calculation Summary

---

# Backend Interface

Expected backend operations:

```text
calculateNPSBenefits(employee)

calculateLumpSumWithdrawal(employee)

calculateAnnuityAmount(employee)

generateNPSBenefitSummary(employee)
```

---

# Validation Rules

- Eligibility shall be verified before calculation.
- Retirement type shall be validated.
- Corpus value shall be available before calculation.
- Official notifications applicable on the retirement date shall be used.
- Hardcoded regulatory values shall not be used.

---

# Error Conditions

Calculation shall fail when:

- Employee is not covered under NPS.
- Corpus information is unavailable.
- Retirement type is invalid.
- Required employee information is incomplete.
- Applicable regulations cannot be determined.

---

# References

Populate using:

- PFRDA Regulations
- Government of India Notifications
- Railway Board Circulars
- Ministry of Finance Orders

---

# Revision History

| Version | Date | Description |
|----------|------|-------------|
| 1.0.0 | YYYY-MM-DD | Initial version |