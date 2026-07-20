# Leave Salary Components Table

Version: 1.0

Table ID: TBL-LVE-003

Status: VERIFIED

---

# 1. Purpose

This table maintains the salary components that are admissible for Leave Encashment calculations under the applicable Railway rules and Government notifications.

The Railway Benefits Calculation Engine shall use this table to determine which pay components are included or excluded while computing Leave Encashment.

This table contains reference data only.

It performs no calculations.

---

# 2. Authority

Primary References

- Railway Services (Leave) Rules
- Railway Board Circulars
- Ministry of Railways Notifications
- Government of India Orders

---

# 3. Scope

Responsible for

- Maintaining admissible salary components
- Recording inclusion or exclusion of components
- Recording effective dates
- Recording official Government/Railway references

Not Responsible For

- Salary calculation
- Leave Encashment calculation
- Pay fixation
- Pension calculation

---

# 4. Dependencies

rules/leave/leave_encashment.md

tables/pay/pay_matrix.md

---

# 5. Table Structure

Primary Key

Component ID

Columns

| Column | Type | Description |
|---------|------|-------------|
| Component ID | String | Unique salary component identifier |
| Salary Component | String | Official name of the salary component |
| Included for Leave Encashment | Boolean | Indicates whether the component is included in Leave Encashment calculation |
| Effective Date | Date | Date from which the rule becomes applicable |
| Government Order | String | Official Railway Board / Government notification reference |
| Status | String | Active / Superseded |

---

# 6. Validation Rules

Component ID shall be unique.

Salary Component shall be unique.

Included for Leave Encashment shall contain only:

- Yes
- No

Government Order is mandatory.

Historical records shall never be deleted.

---

# 7. Leave Salary Components Table

| Component ID | Salary Component | Included for Leave Encashment | Effective Date | Government Order | Status |
|--------------|------------------|-------------------------------|----------------|------------------|--------|
| CMP-001 | Basic Pay | Yes | YYYY-MM-DD | GO-XXXX | Active |

> **Note:** Populate this table only with officially prescribed salary components applicable for Leave Encashment calculations. Do not assume component eligibility.

---

# 8. Lookup Rules

Input

Salary Component

↓

Locate Matching Record

↓

Return

- Included for Leave Encashment
- Government Order
- Status

↓

If No Matching Record Exists

Return Validation Error

---

# 9. Backend Interface

Function

```python
getLeaveSalaryComponent(componentName)
```

Example

Input

```python
getLeaveSalaryComponent("Basic Pay")
```

Output

```json
{
    "componentId": "CMP-001",
    "included": true,
    "status": "Active"
}
```

---

# 10. Data Integrity Rules

No duplicate Component IDs.

No duplicate Salary Component names.

Historical records shall remain immutable.

Updates shall only occur through verified Government or Railway notifications.

Every revision shall reference an official order.

---

# 11. References

- Railway Services (Leave) Rules
- Railway Board Circulars
- Ministry of Railways Notifications
- Government of India Orders

---

# 12. Revision History

Version 1.0

Initial Leave Salary Components Table specification.