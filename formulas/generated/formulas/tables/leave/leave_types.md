# Leave Types Table

Version: 1.0

Table ID: TBL-LVE-002

Status: VERIFIED

---

# 1. Purpose

This table maintains the official leave types recognized by the Railway Benefits Calculation Engine for retirement and settlement benefit processing.

The Railway Benefits Calculation Engine shall use this table to identify whether a leave type is eligible for encashment and how it should be treated during settlement calculations.

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

- Maintaining leave type definitions
- Identifying encashment eligibility
- Recording official references
- Supporting leave validation

Not Responsible For

- Leave balance calculation
- Leave Encashment calculation
- Leave accrual calculation
- Salary calculation

---

# 4. Dependencies

rules/leave/leave_encashment.md

rules/leave/leave_validation.md

---

# 5. Table Structure

Primary Key

Leave Type ID

Columns

| Column | Type | Description |
|---------|------|-------------|
| Leave Type ID | String | Unique leave type identifier |
| Leave Type | String | Official leave name |
| Encashable | Boolean | Indicates whether the leave type is eligible for encashment |
| Effective Date | Date | Date from which the definition is applicable |
| Government Order | String | Official Railway Board / Government notification reference |
| Status | String | Active / Superseded |

---

# 6. Validation Rules

Leave Type ID shall be unique.

Leave Type shall be unique.

Encashable shall contain only:

- Yes
- No

Government Order is mandatory.

Historical records shall never be deleted.

---

# 7. Leave Types Table

| Leave Type ID | Leave Type | Encashable | Effective Date | Government Order | Status |
|----------------|------------|------------|----------------|------------------|--------|
| LVT-001 | Earned Leave | Yes | YYYY-MM-DD | GO-XXXX | Active |

> **Note:** Populate this table only with officially recognized leave types relevant to settlement and leave encashment under Railway rules.

---

# 8. Lookup Rules

Input

Leave Type

↓

Locate Matching Record

↓

Return

- Leave Type ID
- Encashable
- Government Order

↓

If No Matching Record Exists

Return Validation Error

---

# 9. Backend Interface

Function

```python
getLeaveType(leaveType)
```

Example

Input

```python
getLeaveType("Earned Leave")
```

Output

```json
{
    "leaveTypeId": "LVT-001",
    "encashable": true,
    "status": "Active"
}
```

---

# 10. Data Integrity Rules

No duplicate Leave Type IDs.

No duplicate Leave Type names.

Historical records shall remain immutable.

Updates shall only occur through verified Government or Railway notifications.

---

# 11. References

- Railway Services (Leave) Rules
- Railway Board Circulars
- Ministry of Railways Notifications
- Government of India Orders

---

# 12. Revision History

Version 1.0

Initial Leave Types Table specification.