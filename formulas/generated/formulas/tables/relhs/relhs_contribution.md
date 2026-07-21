# RELHS Contribution Table

Version: 1.0

Table ID: TBL-RELHS-001

Status: VERIFIED

---

# 1. Purpose

This table maintains the official contribution rules applicable to the Retired Employees Liberalized Health Scheme (RELHS) under Railway Board instructions and Government notifications.

The Railway Benefits Calculation Engine shall use this table to determine the applicable RELHS contribution payable by a retiring Railway employee based on the rules in force on the date of retirement.

This table contains reference data only.

It performs no calculations.

---

# 2. Authority

Primary References

- Railway Board Circulars
- Ministry of Railways Notifications
- RELHS Guidelines
- Government of India Orders

---

# 3. Scope

Responsible for

- Maintaining RELHS contribution rules
- Recording contribution basis
- Recording effective dates
- Recording official Government/Railway references

Not Responsible For

- RELHS eligibility determination
- RELHS contribution calculation
- Pension calculation
- Settlement calculation

---

# 4. Dependencies

rules/relhs/relhs_contribution.md

tables/pay/pay_matrix.md

tables/retirement/retirement_types.md

---

# 5. Table Structure

Primary Key

Effective Date

Columns

| Column             | Type   | Description                                                                        |
| ------------------ | ------ | ---------------------------------------------------------------------------------- |
| Effective Date     | Date   | Date from which the contribution rule becomes applicable                           |
| Contribution Basis | String | Basis used for calculating RELHS contribution (e.g., Last Basic Pay, Fixed Amount) |
| Contribution Value | String | Contribution amount or applicable value as prescribed                              |
| Unit               | String | Currency or descriptive unit                                                       |
| Government Order   | String | Official Railway Board / Government notification reference                         |
| Remarks            | String | Additional remarks                                                                 |

---

# 6. Validation Rules

Effective Date shall be unique.

Contribution Basis is mandatory.

Contribution Value is mandatory.

Government Order is mandatory.

Historical records shall never be deleted.

---

# 7. RELHS Contribution Table

| Effective Date | Contribution Basis | Contribution Value | Unit | Government Order | Remarks       |
| -------------- | ------------------ | ------------------ | ---- | ---------------- | ------------- |
| YYYY-MM-DD     | TBD                | TBD                | INR  | GO-XXXX          | Initial Entry |

> **Note:** Populate this table only with officially notified RELHS contribution rules issued by the Railway Board or Government of India. Do not assume contribution values or formulas.

---

# 8. Lookup Rules

Input

Effective Date

↓

Find Latest Record

Where

Effective Date ≤ Input Date

↓

Return

- Contribution Basis
- Contribution Value
- Unit
- Government Order

↓

If No Record Exists

Return Validation Error

---

# 9. Backend Interface

Function

```python
getRELHSContributionRule(effectiveDate)
```

Example

Input

```python
date(2026, 7, 20)
```

Output

```json
{
  "contributionBasis": "Last Basic Pay",
  "contributionValue": "TBD",
  "unit": "INR",
  "governmentOrder": "GO-XXXX"
}
```

---

# 10. Data Integrity Rules

No duplicate Effective Dates.

Historical records shall remain immutable.

Updates shall only occur through verified Railway Board or Government notifications.

Every revision shall reference an official order.

---

# 11. References

- Railway Board Circulars
- Ministry of Railways Notifications
- RELHS Guidelines
- Government of India Orders

---

# 12. Revision History

Version 1.0

Initial RELHS Contribution Table specification.
