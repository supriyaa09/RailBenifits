# UPS Pension Calculation Rules

**Version:** 1.0.0

**Rule ID:** RULE-UPS-002

**Status:** Draft

---

# Purpose

This document defines the business rules governing retirement benefit calculations under the Unified Pension Scheme (UPS).

It specifies the calculation workflow and decision process while relying on official Government notifications and reference tables for applicable values.

This document contains business rules only.

---

# Scope

These rules apply to:

- Superannuation
- Voluntary Retirement
- Death cases
- Retirement settlement

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

- rules/pension/ups/eligibility.md
- common/qualifying-service.md
- common/retirement-date.md
- common/average-emoluments.md
- common/emoluments.md

---

# Calculation Workflow

The calculation engine shall:

1. Verify UPS eligibility.
2. Validate retirement type.
3. Determine retirement date.
4. Determine qualifying service.
5. Determine applicable emoluments.
6. Apply official UPS calculation rules.
7. Generate pension summary.

---

# Business Rules

The calculation engine shall:

- Use only official UPS rules.
- Apply only applicable Government notifications.
- Record every rule used during calculation.
- Maintain a complete audit trail.
- Avoid hardcoded values.

---

# Inputs Required

- Employee ID
- Date of Retirement
- Retirement Type
- Qualifying Service
- Applicable Emoluments
- Employee Category

---

# Outputs

- Pension Amount
- Lump-sum Benefits
- Applicable Rules
- Benefit Summary

---

# Backend Interface

```text
calculateUPSPension(employee)

generateUPSPensionSummary(employee)
```

---

# Validation Rules

- Verify eligibility before calculation.
- Validate reference tables.
- Validate service history.
- Apply official notifications only.

---

# Error Conditions

- Employee not covered under UPS
- Invalid retirement type
- Missing service records
- Missing emoluments

---

# References

- Government of India Notifications
- Ministry of Finance Orders
- Railway Board Circulars

---

# Revision History

| Version | Date       | Description     |
| ------- | ---------- | --------------- |
| 1.0.0   | YYYY-MM-DD | Initial version |
