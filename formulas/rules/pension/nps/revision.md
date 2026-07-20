# NPS Pension Revision Rules

**Version:** 1.0.0

**Rule ID:** RULE-NPS-003

**Status:** Draft

---

# Purpose

This document defines the business rules governing revisions applicable to retirement benefits under the National Pension System (NPS).

Unlike the Old Pension Scheme (OPS), NPS does not provide periodic pension revisions based on Pay Commission recommendations. Any revisions shall be governed only by applicable Government of India, Ministry of Finance, PFRDA, or Railway Board notifications.

This document defines business rules only and contains no reference data.

---

# Scope

These rules apply to:

- NPS retirement benefits
- NPS exit benefits
- NPS annuity-related revisions
- Government-notified policy changes
- Railway Board implementation orders

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

- rules/pension/nps/calculation.md
- rules/pension/nps/eligibility.md
- rules/pension/scheme_selection.md

May also reference:

- PFRDA Regulations
- Government Notifications
- Railway Board Circulars

---

# Revision Rules

The revision engine shall:

- Determine whether a Government or PFRDA notification affects NPS retirement benefits.
- Apply only officially notified revisions.
- Preserve historical calculations.
- Record the notification used during revision.
- Recalculate benefits only where permitted by applicable regulations.

No revision shall be applied without an official notification.

---

# Inputs Required

The revision engine may require:

- Employee ID
- Pension Scheme
- Date of Retirement
- Applicable Notification Date
- Existing Benefit Details

---

# Outputs

The revision process shall produce:

- Revision Status
- Notification Applied
- Previous Benefit Details
- Revised Benefit Details
- Effective Date
- Revision Summary

---

# Backend Interface

Expected backend operations:

```text
isNPSRevisionApplicable(employee)

applyNPSRevision(employee)

generateNPSRevisionSummary(employee)
```

---

# Validation Rules

- Applicable notification shall be verified.
- Historical benefit records shall remain immutable.
- Only officially approved revisions shall be applied.
- Every revision shall maintain an audit trail.

---

# Error Conditions

Revision shall fail when:

- No applicable notification exists.
- Employee is not covered under NPS.
- Required records are unavailable.
- Revision cannot be determined automatically.

---

# References

Populate using:

- PFRDA Regulations
- Government of India Notifications
- Ministry of Finance Orders
- Railway Board Circulars

---

# Revision History

| Version | Date | Description |
|----------|------|-------------|
| 1.0.0 | YYYY-MM-DD | Initial version |