# Settlement Summary Rules

**Version:** 1.0.0

**Rule ID:** RULE-SETTLEMENT-001

**Status:** Draft

---

# Purpose

This document defines the business rules governing the generation of the final settlement package for Railway employees.

The settlement engine serves as the orchestration layer of the Railway Benefits Calculation Engine. It coordinates all benefit modules, validates the results, aggregates payable benefits, and generates the final settlement summary.

This document contains business rules only and does not perform benefit calculations.

---

# Scope

These rules apply to:

- Superannuation Retirement
- Voluntary Retirement
- Compulsory Retirement
- Invalid Retirement
- Death Settlement
- Other settlement cases permitted under Railway rules

---

# Authority

These rules shall be maintained only from official notifications issued by:

- Government of India
- Ministry of Railways
- Railway Board

---

# Dependencies

Uses:

- rules/pension/
- rules/gratuity/
- rules/leave/
- rules/family_pension/
- rules/cgegis/
- rules/relhs/
- rules/settlement/cgegis.md
- rules/settlement/gpf.md
- rules/settlement/passes.md
- rules/settlement/relhs.md

---

# Settlement Workflow

The settlement engine shall perform the following steps:

1. Validate employee information.
2. Determine the applicable pension scheme.
3. Calculate pension benefits.
4. Calculate gratuity.
5. Calculate leave encashment.
6. Process CGEGIS benefits.
7. Process GPF settlement (where applicable).
8. Process RELHS.
9. Determine post-retirement passes.
10. Aggregate all payable benefits.
11. Generate the final settlement summary.

---

# Outputs

The settlement summary shall include:

- Pension
- Gratuity
- Leave Encashment
- CGEGIS
- GPF
- RELHS
- Pass Eligibility
- Total Benefits
- Audit Summary

---

# Backend Interface

```text
generateSettlementSummary(employee)

calculateFinalSettlement(employee)

validateSettlement(employee)
```

---

# Validation Rules

- Every module shall complete successfully before settlement.
- Historical records shall remain immutable.
- Only official reference data shall be used.

---

# References

- Railway Board Circulars
- Government Notifications

---

# Revision History

| Version | Date       | Description     |
| ------- | ---------- | --------------- |
| 1.0.0   | YYYY-MM-DD | Initial version |
