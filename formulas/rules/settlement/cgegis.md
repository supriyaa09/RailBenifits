# CGEGIS Settlement Integration Rules

**Version:** 1.0.0

**Rule ID:** RULE-SETTLEMENT-002

**Status:** Draft

---

# Purpose

This document defines how the calculated CGEGIS benefits are incorporated into the employee's final settlement package.

This document does not calculate CGEGIS benefits.

---

# Dependencies

Uses:

- rules/cgegis/eligibility.md
- rules/cgegis/calculation.md
- rules/cgegis/settlement.md

---

# Workflow

The settlement engine shall:

1. Verify CGEGIS eligibility.
2. Retrieve calculated CGEGIS benefits.
3. Validate beneficiary details.
4. Include CGEGIS benefits in the settlement summary.

---

# Backend Interface

```text
includeCGEGIS(employee)
```

---

# Validation Rules

- CGEGIS calculation shall be completed before settlement.
- Benefit values shall not be modified.

---

# References

- Ministry of Finance CGEGIS Notifications
- Railway Board Circulars

---

# Revision History

| Version | Date       | Description     |
| ------- | ---------- | --------------- |
| 1.0.0   | YYYY-MM-DD | Initial version |
