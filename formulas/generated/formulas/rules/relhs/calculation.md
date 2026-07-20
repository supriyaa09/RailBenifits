# RELHS Calculation Rules

**Version:** 1.0.0

**Rule ID:** RULE-RELHS-002

**Status:** Draft

---

# Purpose

This document defines the business rules governing the calculation and processing of benefits under the Retired Employees Liberalized Health Scheme (RELHS) applicable to Railway employees.

The calculation engine determines the applicable RELHS contribution, enrollment status, and entitlement based on official Railway rules and notifications.

This document contains business rules only and does not store reference data.

---

# Scope

These rules apply to:

- Superannuation Retirement
- Voluntary Retirement
- Compulsory Retirement
- Invalid Retirement
- Eligible Family Cases

---

# Authority

These rules shall be maintained only from official notifications issued by:

- Ministry of Railways
- Railway Board
- Government of India

---

# Dependencies

Uses:

- rules/relhs/eligibility.md
- tables/relhs/relhs_contribution.md
- common/basic_pay.md
- common/emoluments.md
- common/qualifying-service.md

---

# Calculation Workflow

The RELHS calculation engine shall perform the following steps:

1. Verify employee eligibility.
2. Validate retirement type.
3. Determine the applicable RELHS contribution.
4. Verify contribution payment requirements.
5. Determine enrollment eligibility.
6. Generate RELHS enrollment summary.

---

# Business Rules

The calculation engine shall:

- Verify eligibility before calculation.
- Use only officially notified RELHS contribution values.
- Apply the contribution rules effective on the retirement date.
- Determine employee entitlement according to Railway Board guidelines.
- Maintain a complete audit trail.
- Preserve historical calculation records.

No contribution amount or monetary value shall be hardcoded.

---

# Inputs Required

The calculation engine may require:

- Employee ID
- Employee Category
- Retirement Type
- Date of Retirement
- Qualifying Service
- Last Basic Pay
- Applicable Notification Date

---

# Outputs

The calculation shall produce:

- RELHS Contribution Amount
- Contribution Status
- Enrollment Status
- Benefit Eligibility
- Applicable Notification
- Calculation Summary

---

# Backend Interface

Expected backend operations:

```text
calculateRELHSContribution(employee)

determineRELHSEnrollment(employee)

generateRELHSSummary(employee)
```

---

# Validation Rules

- Eligibility shall be verified before calculation.
- Contribution values shall be obtained from the reference tables.
- Historical calculations shall remain immutable.
- Only officially notified RELHS contribution values shall be used.

---

# Error Conditions

Calculation shall fail when:

- Employee is not eligible.
- Contribution information is unavailable.
- Employee information is incomplete.
- Required reference data is unavailable.

---

# References

Populate using:

- Railway Board Circulars
- RELHS Guidelines
- Government of India Orders

---

# Revision History

| Version | Date | Description |
|----------|------|-------------|
| 1.0.0 | YYYY-MM-DD | Initial version |