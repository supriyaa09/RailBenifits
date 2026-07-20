# GPF Settlement Rules

**Version:** 1.0.0

**Rule ID:** RULE-SETTLEMENT-004

**Status:** Draft

---

# Purpose

This document defines the business rules governing the inclusion of General Provident Fund (GPF) benefits in the employee's final settlement.

This document does not calculate GPF balances.

---

# Dependencies

Uses:

- Official GPF records
- Settlement Summary

---

# Workflow

The settlement engine shall:

1. Verify GPF applicability.
2. Retrieve the final GPF balance.
3. Include the GPF amount in the settlement package.

---

# Backend Interface

```text
includeGPF(employee)
```

---

# Validation Rules

- GPF records shall be verified.
- Final balance shall originate from the official source.

---

# References

- General Provident Fund Rules
- Railway Board Circulars

---

# Revision History

| Version | Date | Description |
|----------|------|-------------|
|1.0.0|YYYY-MM-DD|Initial version|