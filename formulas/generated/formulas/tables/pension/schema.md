# Pension Tables Schema

**Version:** 1.0.0

**Schema ID:** SCH-PEN-001

**Status:** Draft

---

# Purpose

This schema defines the standard structure, metadata, validation rules, and backend interface for all pension-related reference tables.

The Pension module stores government-notified reference data required for pension calculations. These values are maintained independently of business rules and must never be hardcoded within the calculation engine.

---

# Scope

This schema applies to all reference tables under:

```text
tables/pension/
```

Current tables include:

- pension_limits.md
- family_pension_rates.md
- pension_revision_history.md

Additional pension-related reference tables may be added in future without changing this schema.

---

# Authority

Reference data shall be populated only from official Government of India notifications, Department of Pension & Pensioners' Welfare (DoPPW), Railway Board circulars, Ministry of Finance orders, or other competent authorities.

Unofficial sources must never be used.

---

# Dependencies

This schema is referenced by:

- OPS Pension Rules
- NPS Rules (where applicable)
- UPS Rules
- Family Pension Rules
- Settlement Rules
- Commutation Rules

---

# Standard Table Structure

Every pension reference table shall contain the following fields where applicable.

| Field | Type | Description |
|--------|------|-------------|
| Effective From | Date | Date from which the record becomes applicable |
| Effective To | Date / Null | End date of applicability. Null indicates current record |
| Category | String | Pension category or classification |
| Value | Number / Percentage | Applicable pension value or rate |
| Notification Number | String | Government/Railway notification reference |
| Issuing Authority | String | Authority issuing the notification |
| Remarks | String | Optional explanatory notes |

---

# Validation Rules

Every pension table must satisfy the following conditions:

- Effective From shall be mandatory.
- Effective To may be null.
- Effective periods shall not overlap.
- Historical records shall never be modified.
- New notifications shall create new records.
- Notification reference shall be mandatory.
- Every record shall have an issuing authority.

---

# Backend Interface

Expected backend operations include:

```text
getPensionLimits(effectiveDate)

getFamilyPensionRate(category, effectiveDate)

getApplicablePensionRevision(effectiveDate)
```

Implementations may vary depending on the backend language.

---

# Data Integrity Rules

- Only one active record may exist for a given category and date.
- Historical records must remain immutable.
- Effective dates shall be chronological.
- Every record shall reference an official notification.
- Pension tables shall not duplicate data maintained by other modules (e.g., Inflation).

---

# References

Examples of authoritative sources include:

- Department of Pension & Pensioners' Welfare (DoPPW)
- Ministry of Finance
- Railway Board Circulars
- Central Civil Services (Pension) Rules

Populate exact references when official data is entered.

---

# Revision History

| Version | Date | Description |
|----------|------|-------------|
| 1.0.0 | YYYY-MM-DD | Initial schema |