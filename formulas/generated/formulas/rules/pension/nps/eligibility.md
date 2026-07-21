# NPS Pension Eligibility Rules

**Version:** 1.0.0

**Rule ID:** RULE-NPS-001

**Status:** Draft

---

# Purpose

This document defines the eligibility rules for pension benefits under the National Pension System (NPS) applicable to Railway employees.

It specifies the conditions that must be satisfied before any NPS-related pension or retirement benefit calculation is performed.

This document contains business rules only and does not store reference data.

---

# Scope

These rules apply to:

- Superannuation under NPS
- Voluntary Retirement under NPS (where applicable)
- Exit from NPS
- Retirement settlement involving NPS
- Death cases under NPS
- Any other retirement benefits governed by the National Pension System

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

Uses data from:

- tables/service/qualifying_service.md
- tables/service/service_categories.md
- tables/retirement/retirement_types.md
- common/qualifying-service.md
- common/retirement-date.md

May also reference:

- PFRDA notifications
- Railway Board NPS circulars

---

# Eligibility Conditions

A Railway employee shall be considered eligible for retirement benefits under the National Pension System only if all applicable statutory and regulatory requirements are satisfied.

The eligibility assessment shall consider factors including:

- Applicable pension scheme
- Date of appointment
- Date of joining Government service
- Retirement type
- Employee category
- Service status
- Applicable Government and PFRDA notifications

The exact eligibility criteria shall be populated only from official Government of India, PFRDA, and Railway Board notifications.

---

# Inputs Required

The eligibility engine may require:

- Employee ID
- Pension Scheme
- Date of Birth
- Date of Appointment
- Date of Joining
- Date of Retirement
- Retirement Type
- Employee Category
- Service History
- Applicable Notification Date

---

# Decision Outcomes

The rule engine shall return one of the following outcomes:

- Eligible
- Not Eligible
- Requires Manual Verification

Where eligibility cannot be determined automatically, the system shall provide the reason for the decision.

---

# Backend Interface

Expected backend operations:

```text
isEligibleForNPS(employee)

evaluateNPSEligibility(employee)

getNPSEligibilityReason(employee)
```

---

# Validation Rules

- Eligibility shall be evaluated using official reference tables.
- Retirement type shall be validated using the retirement reference tables.
- Service category shall be validated before eligibility determination.
- Date of appointment and applicable scheme shall be verified.
- No hardcoded eligibility conditions shall be used.

---

# Error Conditions

The eligibility engine shall return appropriate validation errors when:

- Required employee information is missing.
- Date of appointment is unavailable.
- Retirement type is invalid.
- Pension scheme is unsupported.
- Reference data is unavailable.

---

# References

Populate using official sources such as:

- National Pension System (NPS) Regulations
- PFRDA Notifications
- Railway Board Circulars
- Government of India Notifications
- Ministry of Finance Orders

---

# Revision History

| Version | Date       | Description     |
| ------- | ---------- | --------------- |
| 1.0.0   | YYYY-MM-DD | Initial version |
