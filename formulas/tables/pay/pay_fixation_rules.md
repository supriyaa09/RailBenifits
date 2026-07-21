# Pay Fixation Rules

Version: 1.0

Table ID: TBL-PAY-004

Status: VERIFIED

---

# 1. Purpose

This table defines the official pay fixation rules applicable to Railway employees under various service events such as appointment, promotion, MACP, pay revision, and re-employment.

The Railway Benefits Calculation Engine shall use this table to identify the applicable pay fixation rule based on the employee's service event and effective date.

This table contains reference data only.

It performs no calculations.

---

# 2. Authority

Primary References

- CCS (Revised Pay) Rules, 2016
- Railway Services Rules
- Railway Board Circulars
- Ministry of Finance Orders
- 7th Central Pay Commission

---

# 3. Scope

Responsible for

- Identifying pay fixation rules
- Mapping service events
- Maintaining effective dates
- Recording authority references

Not Responsible For

- Pay fixation calculation
- Increment calculation
- Pension calculation
- Gratuity calculation

---

# 4. Dependencies

tables/pay/pay_levels.md

tables/pay/pay_matrix.md

tables/pay/increment_rules.md

rules/pay/

---

# 5. Table Structure

Primary Key

Rule ID

Columns

| Column         | Type   | Description                                                     |
| -------------- | ------ | --------------------------------------------------------------- |
| Rule ID        | String | Unique rule identifier                                          |
| Service Event  | String | Appointment, Promotion, MACP, Pay Revision, Re-employment, etc. |
| Effective Date | Date   | Date from which the rule is applicable                          |
| Rule Reference | String | Government/Railway Order                                        |
| Description    | String | Brief summary of the rule                                       |
| Status         | String | Active / Superseded                                             |

---

# 6. Validation Rules

Rule ID shall be unique.

Service Event is mandatory.

Effective Date is mandatory.

Rule Reference is mandatory.

Status shall be Active or Superseded.

---

# 7. Pay Fixation Rules Table

| Rule ID | Service Event       | Effective Date | Rule Reference      | Status |
| ------- | ------------------- | -------------- | ------------------- | ------ |
| PFR-001 | Initial Appointment | YYYY-MM-DD     | Railway Board Order | Active |
| PFR-002 | Promotion           | YYYY-MM-DD     | Railway Board Order | Active |
| PFR-003 | MACP                | YYYY-MM-DD     | Railway Board Order | Active |
| PFR-004 | Pay Revision        | YYYY-MM-DD     | Railway Board Order | Active |
| PFR-005 | Re-employment       | YYYY-MM-DD     | Railway Board Order | Active |

> **Note:** Populate this table only with verified Railway Board Circulars and Government Orders.

---

# 8. Lookup Rules

Input

Service Event

-

Effective Date

↓

Locate Applicable Rule

↓

Return

- Rule ID
- Rule Reference
- Description
- Status

↓

If No Rule Exists

Return Validation Error

---

# 9. Backend Interface

Function

```python
getPayFixationRule(serviceEvent, effectiveDate)
```

Example

Input

```python
getPayFixationRule(
    serviceEvent="Promotion",
    effectiveDate="2026-07-01"
)
```

Output

```json
{
  "ruleId": "PFR-002",
  "ruleReference": "Railway Board Order",
  "status": "Active"
}
```

---

# 10. Data Integrity Rules

No duplicate Rule IDs.

No duplicate Service Event + Effective Date combinations.

Historical rules shall never be deleted.

Superseded rules shall remain available.

---

# 11. References

- CCS (Revised Pay) Rules, 2016
- Railway Board Circulars
- Ministry of Finance Orders
- Railway Services Rules

---

# 12. Revision History

Version 1.0

Initial Pay Fixation Rules specification.
