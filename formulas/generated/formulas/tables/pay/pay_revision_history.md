# Pay Revision History

Version: 1.0

Table ID: TBL-PAY-005

Status: VERIFIED

---

# 1. Purpose

This table maintains the historical record of all Government-approved pay revisions applicable to Railway employees.

The Railway Benefits Calculation Engine shall use this table to determine the applicable pay structure based on the effective date of a pay-related event.

This table provides historical traceability for pay revisions and supports calculations that depend on different Central Pay Commission (CPC) structures.

This table contains reference data only.

It performs no calculations.

---

# 2. Authority

Primary References

- Central Pay Commission Recommendations
- CCS (Revised Pay) Rules
- Railway Board Circulars
- Ministry of Finance Orders

---

# 3. Scope

Responsible for

- Recording Pay Commission revisions
- Recording implementation dates
- Recording Government Orders
- Maintaining historical pay structures
- Supporting retrospective calculations

Not Responsible For

- Pay fixation
- Pay calculation
- Increment calculation
- Pension calculation

---

# 4. Dependencies

tables/pay/pay_matrix.md

tables/pay/pay_levels.md

tables/pay/pay_fixation_rules.md

rules/pay/

---

# 5. Table Structure

Primary Key

Revision ID

Columns

| Column              | Type   | Description                            |
| ------------------- | ------ | -------------------------------------- |
| Revision ID         | String | Unique revision identifier             |
| Revision Name       | String | Name of the pay revision               |
| Effective Date      | Date   | Date from which revision is applicable |
| Implementation Date | Date   | Date of implementation                 |
| Pay Commission      | String | Applicable CPC                         |
| Government Order    | String | Official notification                  |
| Status              | String | Active / Superseded                    |

---

# 6. Validation Rules

Revision ID shall be unique.

Effective Date is mandatory.

Implementation Date is mandatory.

Government Order is mandatory.

Status shall be Active or Superseded.

---

# 7. Pay Revision History Table

| Revision ID | Revision Name | Effective Date | Implementation Date | Pay Commission | Government Order    | Status |
| ----------- | ------------- | -------------- | ------------------- | -------------- | ------------------- | ------ |
| PAYREV-001  | 7th CPC       | YYYY-MM-DD     | YYYY-MM-DD          | 7th CPC        | Railway Board Order | Active |

> **Note:** Populate this table only using verified Government Notifications and Railway Board Circulars.

---

# 8. Lookup Rules

Input

Effective Date

↓

Locate Applicable Revision

↓

Return

- Revision Name
- Pay Commission
- Government Order
- Status

↓

If No Revision Exists

Return Validation Error

---

# 9. Backend Interface

Function

```python
getApplicablePayRevision(effectiveDate)
```

Example

Input

```python
date(2026,7,1)
```

Output

```json
{
  "revisionName": "7th CPC",
  "payCommission": "7th CPC",
  "governmentOrder": "Railway Board Order",
  "status": "Active"
}
```

---

# 10. Data Integrity Rules

No duplicate Revision IDs.

Historical revisions shall never be deleted.

Superseded revisions shall remain available.

Effective Dates shall be chronological.

---

# 11. References

- CCS (Revised Pay) Rules
- Railway Board Circulars
- Ministry of Finance Orders
- Central Pay Commission Reports

---

# 12. Revision History

Version 1.0

Initial Pay Revision History specification.
