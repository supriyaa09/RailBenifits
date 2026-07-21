# Dearness Allowance (DA) Rates Table

Version: 1.0

Table ID: TBL-DA-001

Status: VERIFIED

---

# 1. Purpose

This table contains the official Dearness Allowance (DA) rates applicable to serving Railway employees.

The Railway Benefits Calculation Engine shall use this table wherever Dearness Allowance forms part of a calculation, validation, or historical reference.

This table contains reference data only.

It performs no calculations.

---

# 2. Authority

Primary References

- Central Civil Services (Revised Pay) Rules
- Ministry of Finance Orders
- Railway Board Circulars
- Department of Expenditure Notifications

---

# 3. Scope

Responsible for

- Providing official DA rates
- Maintaining effective dates
- Recording Government Order references
- Supporting historical calculations

Not Responsible For

- DA calculation
- Pension calculation
- DR calculation
- Salary calculation

---

# 4. Dependencies

common/emoluments.md

common/basic_pay.md

common/pay_history.md

rules/pension/

rules/gratuity/

---

# 5. Table Structure

Primary Key

Effective Date

Columns

| Column          | Type    | Description                                    |
| --------------- | ------- | ---------------------------------------------- |
| Effective Date  | Date    | Date from which the DA rate becomes applicable |
| DA Rate         | Decimal | Official Dearness Allowance percentage         |
| Order Reference | String  | Government/Railway Order ID                    |
| Remarks         | String  | Optional remarks                               |

---

# 6. Validation Rules

Effective Date shall be unique.

DA Rate shall be zero or positive.

Every record shall reference an official Government or Railway order.

Historical records shall never be modified.

---

# 7. DA Rates Table

| Effective Date | DA Rate (%) | Order Reference | Remarks       |
| -------------- | ----------: | --------------- | ------------- |
| YYYY-MM-DD     |         TBD | GO-XXXX         | Initial entry |

> **Note:** Populate this table only with officially notified DA rates. Do not enter assumed percentages.

---

# 8. Lookup Rules

Input

Effective Date

↓

Find Latest Record Where

Record Effective Date ≤ Input Date

↓

Return

- DA Rate
- Order Reference

↓

If No Record Found

Return Validation Error

---

# 9. Backend Interface

Function

```python
getDearnessAllowanceRate(effectiveDate)
```

Example

Input

```python
date(2026, 7, 1)
```

Output

```json
{
  "daRate": 0,
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

- Central Civil Services (Revised Pay) Rules
- Ministry of Finance Orders
- Railway Board Circulars
- Department of Expenditure Notifications

---

# 12. Revision History

Version 1.0

Initial DA Rates Table specification.
