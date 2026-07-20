# UPS Pension Eligibility Rules

**Version:** 1.0.0

**Rule ID:** RULE-UPS-001

**Status:** Draft

---

# Purpose

This document defines the eligibility rules for pension benefits under the Unified Pension Scheme (UPS) applicable to Railway employees.

It specifies the conditions that must be satisfied before any UPS pension calculation is performed.

This document contains business rules only and stores no reference data.

---

# Scope

These rules apply to:

- Superannuation under UPS
- Voluntary Retirement (where applicable)
- Death cases under UPS
- Retirement settlement
- Other retirement benefits governed by UPS

---

# Authority

These rules shall be maintained only from official notifications issued by:

- Government of India
- Ministry of Finance
- Ministry of Railways
- Railway Board

---

# Dependencies

Uses:

- rules/pension/scheme_selection.md
- common/qualifying-service.md
- common/retirement-date.md
- tables/service/qualifying_service.md
- tables/service/service_categories.md
- tables/retirement/retirement_types.md

---

# Eligibility Conditions

The eligibility engine shall determine eligibility based on:

- Applicable pension scheme
- Date of appointment
- UPS enrollment status
- Retirement type
- Employee category
- Service history
- Applicable Government notifications

The exact eligibility criteria shall be populated only from official Government notifications.

---

# Inputs Required

- Employee ID
- Date of Birth
- Date of Appointment
- Date of Retirement
- Retirement Type
- Employee Category
- Service History
- UPS Enrollment Details

---

# Decision Outcomes

- Eligible
- Not Eligible
- Requires Manual Verification

---

# Backend Interface

```text
isEligibleForUPS(employee)

evaluateUPSEligibility(employee)

getUPSEligibilityReason(employee)
```

---

# Validation Rules

- Verify scheme selection.
- Validate retirement type.
- Validate service category.
- Validate UPS enrollment.
- No hardcoded eligibility rules.

---

# Error Conditions

- Missing employee details
- Invalid retirement type
- Missing UPS enrollment
- Unsupported pension scheme

---

# References

- Government of India Notifications
- Ministry of Finance Orders
- Railway Board Circulars

---

# Revision History

| Version | Date | Description |
|----------|------|-------------|
| 1.0.0 | YYYY-MM-DD | Initial version |