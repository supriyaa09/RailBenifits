# Retirement Tables Schema

**Version:** 1.0.0

**Schema ID:** SCH-RET-001

**Status:** Draft

---

# Purpose

This schema defines the standard structure, metadata, validation rules, and backend interface for all retirement-related reference tables.

The Retirement module stores official reference data governing retirement eligibility, retirement categories, and other retirement-related information. These values are maintained independently of calculation logic and must never be hardcoded within the calculation engine.

---

# Scope

This schema applies to all reference tables under:

```text
tables/retirement/
```

Current tables include:

- retirement_age.md
- retirement_types.md

Additional retirement-related reference tables may be added in the future without changing this schema.

---

# Authority

Reference data shall be maintained only from official notifications issued by:

- Government of India
- Railway Board
- Department of Pension & Pensioners' Welfare (DoPPW)
- Ministry of Personnel, Public Grievances & Pensions
- Other competent authorities

Unofficial sources must never be used.

---

# Dependencies

This schema is referenced by:

- Pension Rules
- Gratuity Rules
- Leave Encashment Rules
- RELHS Rules
- CGEGIS Rules
- Settlement Rules
- Retirement Date Calculation (common/retirement-date.md)

---

# Standard Table Structure

Every retirement reference table shall contain the following fields where applicable.

| Field | Type | Description |
|--------|------|-------------|
| Effective From | Date | Date from which the rule becomes applicable |
| Effective To | Date / Null | End date of applicability. Null indicates the current record |
| Category | String | Retirement category or employee classification |
| Value | String / Number | Retirement age, retirement type, or applicable value |
| Notification Number | String | Official notification reference |
| Issuing Authority | String | Authority issuing the notification |
| Remarks | String | Optional explanatory notes |

---

# Validation Rules

Every retirement table must satisfy the following conditions:

- Effective From shall be mandatory.
- Effective To may be null.
- Effective periods shall not overlap.
- Historical records shall never be modified.
- New government notifications shall create new records.
- Notification reference shall be mandatory.
- Every record shall have an issuing authority.

---

# Backend Interface

Expected backend operations include:

```text
getRetirementAge(employeeCategory, effectiveDate)

getRetirementType(retirementCode)

getApplicableRetirementPolicy(effectiveDate)
```

Implementations may vary depending on the backend language.

---

# Data Integrity Rules

- Only one active record may exist for a given employee category and date.
- Historical records must remain immutable.
- Effective dates shall be chronological.
- Every record shall reference an official notification.
- Retirement tables shall contain only reference data and no calculation logic.

---

# References

Examples of authoritative sources include:

- Railway Services (Pension) Rules
- Railway Board Circulars
- DoPPW Orders
- Government of India Notifications

Populate exact references when official data is entered.

---

# Revision History

| Version | Date | Description |
|----------|------|-------------|
| 1.0.0 | YYYY-MM-DD | Initial schema |