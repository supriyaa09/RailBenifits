# Inflation Tables Schema

**Version:** 1.0.0

**Schema ID:** SCH-INF-001

**Status:** Draft

---

# Purpose

This schema defines the standard structure, metadata, validation rules, and backend interface for all inflation-related reference tables.

The Inflation module stores government-notified economic reference data used across multiple benefit calculation modules. These values are maintained independently of business rules and must never be hardcoded within the calculation engine.

---

# Scope

This schema applies to all reference tables under:

```text
tables/inflation/
```

Current tables include:

- da_rates.md
- dr_rates.md

Additional inflation-related reference tables may be added in future without changing this schema.

---

# Authority

Reference data shall be populated only from official Government of India notifications, Railway Board circulars, Ministry of Finance orders, or other competent authorities.

Unofficial sources must never be used.

---

# Dependencies

This schema is referenced by:

- Pension Rules
- Family Pension Rules
- Leave Encashment Rules (where applicable)
- Settlement Calculations
- Future benefit modules requiring DA or DR

---

# Standard Table Structure

Every inflation reference table shall contain the following fields.

| Field | Type | Description |
|--------|------|-------------|
| Effective From | Date | Date from which the rate becomes applicable |
| Effective To | Date / Null | End date of applicability. Null indicates current rate. |
| Rate | Percentage | Official notified rate |
| Notification Number | String | Government/Railway notification reference |
| Issuing Authority | String | Authority issuing the notification |
| Remarks | String | Optional explanatory notes |

---

# Validation Rules

Every inflation table must satisfy the following conditions:

- Effective From shall be mandatory.
- Effective To may be null.
- Effective periods shall not overlap.
- Rates shall be expressed as percentages.
- Notification reference shall be mandatory.
- Historical records must never be deleted.
- New notifications shall create new records instead of modifying previous ones.

---

# Backend Interface

Expected backend operations include:

```text
getDARate(effectiveDate)

getDRRate(effectiveDate)

getApplicableInflationRate(type, effectiveDate)
```

Implementations may vary depending on the backend language.

---

# Data Integrity Rules

- Only one active record may exist for a given date.
- Historical records must remain immutable.
- Effective dates shall be chronological.
- Every record shall reference an official notification.

---

# References

Examples of authoritative sources include:

- Ministry of Finance Orders
- Department of Pension & Pensioners' Welfare
- Railway Board Circulars

Populate exact references when official data is entered.

---

# Revision History

| Version | Date | Description |
|----------|------|-------------|
| 1.0.0 | YYYY-MM-DD | Initial schema |