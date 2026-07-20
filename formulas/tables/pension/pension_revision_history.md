# Pension Revision History Table

Version: 1.0

Table ID: TBL-PEN-REV-001

Status: VERIFIED

---

# 1. Purpose

This table maintains the historical record of all Government and Railway Board revisions affecting pension-related benefits.

The Railway Benefits Calculation Engine shall use this table to determine the applicable revision based on the effective date of calculation.

This table provides historical traceability and ensures that pension calculations are performed according to the rules in force on the relevant date.

This table contains reference data only.

It performs no calculations.

---

# 2. Authority

Primary References

- Railway Services (Pension) Rules
- Railway Board Circulars
- Department of Pension & Pensioners' Welfare (DoP&PW) Orders
- Ministry of Finance Notifications

---

# 3. Scope

Responsible for

- Recording pension revisions
- Recording effective dates
- Recording Government Order references
- Maintaining historical versions

Not Responsible For

- Pension calculation
- DR calculation
- Family Pension calculation
- Validation logic

---

# 4. Dependencies

rules/pension/pension_revision.md

rules/family_pension/revision.md

tables/pension/pension_limits.md

tables/pension/dr_rates.md

tables/pension/family_pension_rates.md

---

# 5. Table Structure

Primary Key

Revision ID

Columns

| Column | Type | Description |
|---------|------|-------------|
| Revision ID | String | Unique revision identifier |
| Effective Date | Date | Date from which the revision becomes effective |
| Revision Type | String | Pension / Family Pension / DR / DA / General |
| Government Order | String | Official order number |
| Description | String | Summary of the revision |

---

# 6. Validation Rules

Revision ID shall be unique.

Effective Date is mandatory.

Government Order is mandatory.

Historical records shall never be deleted.

Revisions shall be stored chronologically.

---

# 7. Pension Revision History

| Revision ID | Effective Date | Revision Type | Government Order | Description |
|--------------|----------------|---------------|------------------|-------------|
| REV-0001 | YYYY-MM-DD | General | GO-XXXX | Initial Revision |

> **Note:** Populate this table only with verified Government and Railway Board notifications.

---

# 8. Lookup Rules

Input

Effective Date

↓

Find Latest Revision

Where

Revision Effective Date ≤ Input Date

↓

Return Applicable Revision

↓

If No Revision Exists

Return Validation Error

---

# 9. Backend Interface

Function

```python
getApplicableRevision(effectiveDate)
```

Example

Input

```python
date(2026, 1, 1)
```

Output

```json
{
    "revisionId": "REV-0001",
    "governmentOrder": "GO-XXXX",
    "description": "Initial Revision"
}
```

---

# 10. Data Integrity Rules

No duplicate Revision IDs.

No duplicate Government Orders.

Effective Dates shall be chronological.

Historical revisions shall never be modified.

Superseded revisions shall remain available.

---

# 11. References

- Railway Services (Pension) Rules
- Railway Board Circulars
- DoP&PW Orders
- Ministry of Finance Notifications

---

# 12. Revision History

Version 1.0

Initial Pension Revision History Table specification.