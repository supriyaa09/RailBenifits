# Annual Increment Rules

Version: 1.0

Table ID: TBL-PAY-003

Status: VERIFIED

---

# 1. Purpose

This table defines the official rules governing annual increments under the applicable Central Civil Services (Revised Pay) Rules and Railway Board instructions.

The Railway Benefits Calculation Engine shall use this table to determine employee eligibility for annual increments and apply the appropriate increment rule during pay progression.

This table contains reference data only.

It performs no calculations.

---

# 2. Authority

Primary References

- CCS (Revised Pay) Rules, 2016
- Railway Board Circulars
- Ministry of Finance Orders
- 7th Central Pay Commission

---

# 3. Scope

Responsible for

- Annual increment eligibility
- Increment effective dates
- Increment frequency
- Applicable employee categories

Not Responsible For

- Increment calculation
- Promotion fixation
- Pension calculation
- Gratuity calculation

---

# 4. Dependencies

tables/pay/pay_matrix.md

tables/pay/pay_levels.md

common/pay_history.md

---

# 5. Table Structure

Primary Key

Rule ID

Columns

| Column               | Type   | Description                      |
| -------------------- | ------ | -------------------------------- |
| Rule ID              | String | Unique increment rule identifier |
| Employee Category    | String | Applicable employee category     |
| Increment Type       | String | Annual / Special                 |
| Effective Date       | Date   | Rule effective date              |
| Eligibility Criteria | String | Summary of eligibility           |
| Rule Reference       | String | Official order or rule           |

---

# 6. Validation Rules

Rule ID shall be unique.

Effective Date is mandatory.

Rule Reference is mandatory.

Historical rules shall never be deleted.

---

# 7. Increment Rules Table

| Rule ID | Employee Category      | Increment Type | Effective Date | Eligibility Criteria | Rule Reference      |
| ------- | ---------------------- | -------------- | -------------- | -------------------- | ------------------- |
| INC-001 | All Eligible Employees | Annual         | YYYY-MM-DD     | TBD                  | Railway Board Order |

> **Note:** Populate this table only with verified increment rules and effective dates from the applicable CCS (Revised Pay) Rules and Railway Board instructions.

---

# 8. Lookup Rules

Input

Employee Category

-

Effective Date

↓

Locate Applicable Rule

↓

Return

- Increment Type
- Eligibility Criteria
- Rule Reference

↓

If No Rule Exists

Return Validation Error

---

# 9. Backend Interface

Function

```python
getIncrementRule(employeeCategory, effectiveDate)
```

Example

Input

```python
getIncrementRule(
    employeeCategory="Regular",
    effectiveDate="2026-07-01"
)
```

Output

```json
{
  "incrementType": "Annual",
  "eligibility": "TBD",
  "ruleReference": "Railway Board Order"
}
```

---

# 10. Data Integrity Rules

No duplicate Rule IDs.

Rules shall be maintained chronologically.

Superseded rules shall remain available.

---

# 11. References

- CCS (Revised Pay) Rules, 2016
- Railway Board Circulars
- Ministry of Finance Orders

---

# 12. Revision History

Version 1.0

Initial Annual Increment Rules specification.
