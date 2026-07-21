# Family Pension Rates Table

Version: 1.0

Table ID: TBL-FP-001

Status: VERIFIED

---

# 1. Purpose

This table contains the official Family Pension rates applicable under the Railway Services (Pension) Rules.

The Family Pension Calculation Engine shall use this table to determine the applicable rate for calculating Normal Family Pension and Enhanced Family Pension.

This table contains reference data only.

It performs no calculations.

---

# 2. Authority

Primary References

- Railway Services (Pension) Rules
- Railway Board Circulars
- Department of Pension & Pensioners' Welfare (DoP&PW) Orders
- Government Notifications relating to Family Pension

---

# 3. Scope

Responsible for

- Providing Normal Family Pension rates
- Providing Enhanced Family Pension rates
- Maintaining effective dates
- Maintaining authority references

Not Responsible For

- Eligibility determination
- Beneficiary determination
- Family Pension calculation
- Pension revision

---

# 4. Dependencies

rules/family_pension/family_pension.md

rules/family_pension/enhanced_family_pension.md

rules/family_pension/revision.md

---

# 5. Table Structure

Primary Key

Effective Date

Columns

| Column         | Type    | Description                                 |
| -------------- | ------- | ------------------------------------------- |
| Effective Date | Date    | Date from which the rate becomes applicable |
| Pension Type   | String  | Normal / Enhanced                           |
| Rate           | Decimal | Official Family Pension rate                |
| Unit           | String  | Percentage / Fixed Amount                   |
| Authority      | String  | Government/Railway Order Reference          |

---

# 6. Validation Rules

Effective Date shall be unique for each Pension Type.

Rate shall be positive.

Authority reference is mandatory.

Historical records shall never be modified.

---

# 7. Family Pension Rates Table

| Effective Date | Pension Type            | Rate | Unit       | Authority                  |
| -------------- | ----------------------- | ---: | ---------- | -------------------------- |
| YYYY-MM-DD     | Normal Family Pension   |  TBD | Percentage | Government Order Reference |
| YYYY-MM-DD     | Enhanced Family Pension |  TBD | Percentage | Government Order Reference |

> **Note:** Populate this table only with verified values from the applicable Government/Railway orders. Do not enter assumed percentages or amounts.

---

# 8. Lookup Rules

Input

Effective Date

-

Pension Type

↓

Locate Matching Record

↓

Return

- Rate
- Unit
- Authority

↓

If No Matching Record

Return Validation Error

---

# 9. Backend Interface

Function

```python
getFamilyPensionRate(effectiveDate, pensionType)
```

Example

Input

```python
getFamilyPensionRate(
    effectiveDate="2026-01-01",
    pensionType="Normal Family Pension"
)
```

Output

```json
{
  "rate": 0,
  "unit": "Percentage",
  "authority": "Government Order"
}
```

---

# 10. Data Integrity Rules

No duplicate records for the same Effective Date and Pension Type.

Historical records shall remain unchanged.

New Government orders shall create new records instead of modifying existing ones.

---

# 11. References

- Railway Services (Pension) Rules
- Railway Board Circulars
- Department of Pension & Pensioners' Welfare (DoP&PW) Orders
- Government Notifications relating to Family Pension

---

# 12. Revision History

Version 1.0

Initial Family Pension Rates Table specification.
