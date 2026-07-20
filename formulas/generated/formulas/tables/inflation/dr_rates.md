# Dearness Relief (DR) Rates Table

Version: 1.0

Table ID: TBL-DR-001

Status: VERIFIED

---

# 1. Purpose

This table contains the official Dearness Relief (DR) rates applicable to Railway pensioners and family pensioners.

The Pension Calculation Engine shall use this table to determine the applicable DR rate based on the effective date of pension payment.

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

- Providing applicable DR rates
- Maintaining effective dates
- Recording Government order references

Not Responsible For

- Pension calculation
- Family Pension calculation
- DR amount calculation
- Pension revision

---

# 4. Dependencies

rules/pension/dearness_relief.md

rules/family_pension/revision.md

rules/pension/pension_revision.md

---

# 5. Table Structure

Primary Key

Effective Date

Columns

| Column | Type | Description |
|---------|------|-------------|
| Effective Date | Date | Date from which DR becomes effective |
| DR Rate | Decimal | Official Dearness Relief percentage |
| Order Reference | String | Government/Railway Order ID |
| Remarks | String | Optional remarks |

---

# 6. Validation Rules

Effective Date shall be unique.

DR Rate shall be zero or positive.

Every record shall reference an official Government or Railway order.

Historical records shall never be modified.

---

# 7. DR Rates Table

| Effective Date | DR Rate (%) | Order Reference | Remarks |
|----------------|------------:|-----------------|---------|
| YYYY-MM-DD | TBD | GO-XXXX | Initial entry |

> **Note:** Enter only officially notified DR rates. Do not populate this table using assumed percentages.

---

# 8. Lookup Rules

Input

Effective Date

↓

Find Latest Record Where

Record Effective Date ≤ Input Date

↓

Return

- DR Rate
- Order Reference

↓

If No Record Found

Return Validation Error

---

# 9. Backend Interface

Function

```python
getDearnessReliefRate(effectiveDate)
```

Example

Input

```python
date(2026, 7, 1)
```

Output

```json
{
    "drRate": 0,
    "orderReference": "GO-XXXX"
}
```

---

# 10. Data Integrity Rules

No duplicate Effective Dates.

Effective Dates shall be chronological.

Historical records shall never be deleted.

Superseded rates shall remain available for historical calculations.

---

# 11. References

- Railway Services (Pension) Rules
- Railway Board Circulars
- DoP&PW Orders
- Ministry of Finance Notifications

---

# 12. Revision History

Version 1.0

Initial DR Rates Table specification.