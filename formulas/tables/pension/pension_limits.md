# Pension Limits Table

Version: 1.0

Table ID: TBL-PEN-001

Status: VERIFIED

---

# 1. Purpose

This table contains the minimum and maximum pension limits prescribed under the applicable Railway Services (Pension) Rules and Government notifications.

The Pension Calculation Engine shall use this table to validate and apply pension limits during pension computation.

This table contains reference data only.

It performs no calculations.

---

# 2. Authority

Primary References

- Railway Services (Pension) Rules
- Railway Board Circulars
- Department of Pension & Pensioners' Welfare (DoP&PW) Orders
- Government Notifications
- Pay Commission Recommendations (where applicable)

---

# 3. Scope

Responsible for

- Providing minimum pension limits
- Providing maximum pension limits
- Maintaining effective dates
- Supporting pension validation

Not Responsible For

- Pension calculation
- Family pension calculation
- Commutation calculation
- Pension revision

---

# 4. Dependencies

rules/pension/

rules/family_pension/

rules/commutation/

---

# 5. Table Structure

Primary Key

Effective Date

Columns

| Column | Type | Description |
|---------|------|-------------|
| Effective Date | Date | Date from which the limits become applicable |
| Minimum Pension | Decimal | Minimum admissible pension |
| Maximum Pension | Decimal | Maximum admissible pension |
| Authority | String | Government/Railway order reference |

---

# 6. Validation Rules

Effective Date shall be unique.

Minimum Pension shall be positive.

Maximum Pension shall be greater than or equal to Minimum Pension.

Every revision shall include an authority reference.

---

# 7. Pension Limits Table

| Effective Date | Minimum Pension | Maximum Pension | Authority |
|----------------|----------------:|----------------:|-----------|
| YYYY-MM-DD | TBD | TBD | Government Order Reference |

> **Note:** Populate this table only with verified values from the applicable Government/Railway orders. Do not hardcode assumed amounts.

---

# 8. Lookup Rules

Input

Effective Date

↓

Find Applicable Record

↓

Return

- Minimum Pension
- Maximum Pension
- Authority

↓

If No Matching Record

Return Validation Error

---

# 9. Backend Interface

Function

```python
getPensionLimits(effectiveDate)
```

Example

Input

```python
date(2026, 1, 1)
```

Output

```python
{
    "minimumPension": 0,
    "maximumPension": 0,
    "authority": "Government Order"
}
```

---

# 10. Data Integrity Rules

No duplicate effective dates.

No overlapping effective periods.

Limits shall only be modified through authorized Government/Railway orders.

Historical records shall never be deleted.

---

# 11. References

- Railway Services (Pension) Rules
- Railway Board Circulars
- DoP&PW Orders
- Applicable Government Notifications

---

# 12. Revision History

Version 1.0

Initial Pension Limits Table specification.