# Leave Encashment Limits Table

Version: 1.0

Table ID: TBL-LVE-001

Status: VERIFIED

---

# 1. Purpose

This table maintains the officially prescribed limits applicable to Leave Encashment under the Railway Services (Leave) Rules, Railway Board Circulars, and Government of India notifications.

The Railway Benefits Calculation Engine shall use this table to determine the maximum leave that may be encashed based on the applicable rules in force on the employee's retirement or settlement date.

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

- Maintaining maximum encashable leave limits
- Recording effective dates
- Recording official Government/Railway references
- Supporting leave encashment validation

Not Responsible For

- Leave Encashment calculation
- Leave balance calculation
- Leave eligibility determination
- Salary computation

---

# 4. Dependencies

rules/leave/leave_encashment.md

---

# 5. Table Structure

Primary Key

Effective Date

Columns

| Column                   | Type    | Description                                                |
| ------------------------ | ------- | ---------------------------------------------------------- |
| Effective Date           | Date    | Date from which the limit becomes applicable               |
| Maximum Encashable Leave | Integer | Maximum number of leave days that may be encashed          |
| Unit                     | String  | Unit of measurement (Days)                                 |
| Government Order         | String  | Official Railway Board / Government notification reference |
| Remarks                  | String  | Additional remarks                                         |

---

# 6. Validation Rules

Effective Date shall be unique.

Maximum Encashable Leave shall be greater than zero.

Unit shall always be "Days".

Government Order is mandatory.

Historical records shall never be deleted.

---

# 7. Leave Encashment Limits Table

| Effective Date | Maximum Encashable Leave | Unit | Government Order | Remarks       |
| -------------- | -----------------------: | ---- | ---------------- | ------------- |
| YYYY-MM-DD     |                      TBD | Days | GO-XXXX          | Initial Entry |

> **Note:** Populate this table only with officially notified Leave Encashment limits. Do not use assumed values.

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

- Maximum Encashable Leave
- Unit
- Government Order

↓

If No Record Exists

Return Validation Error

---

# 9. Backend Interface

Function

```python
getLeaveEncashmentLimit(effectiveDate)
```

Example

Input

```python
date(2026, 7, 20)
```

Output

```json
{
  "maximumEncashableLeave": 300,
  "unit": "Days",
  "governmentOrder": "GO-XXXX"
}
```

---

# 10. Data Integrity Rules

No duplicate Effective Dates.

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

Initial Leave Encashment Limits Table specification.
