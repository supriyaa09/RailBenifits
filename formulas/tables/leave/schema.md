# Leave Module Schema

Version: 1.0

Schema ID: SCH-LVE-001

Status: VERIFIED

---

# 1. Purpose

This schema defines the standard structure, validation rules, naming conventions, and relationships for all reference tables contained within the Leave module.

It establishes a consistent data model for leave-related reference data used by the Railway Benefits Calculation Engine.

This schema contains metadata only.

It does NOT contain leave calculation logic or business rules.

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

- Standardizing Leave tables
- Defining relationships
- Defining primary keys
- Defining validation rules
- Defining lookup standards

Not Responsible For

- Leave Encashment calculation
- Leave balance calculation
- Leave accrual calculation
- Salary calculation

---

# 4. Module Overview

Module

Leave

Directory

tables/leave/

Purpose

Maintain all reference data related to Leave Encashment and leave definitions used by the Railway Benefits Calculation Engine.

---

# 5. Tables Covered

| Table                      | Table ID    | Primary Key    |
| -------------------------- | ----------- | -------------- |
| leave_encashment_limits.md | TBL-LVE-001 | Effective Date |
| leave_types.md             | TBL-LVE-002 | Leave Type ID  |
| leave_salary_components.md | TBL-LVE-003 | Component ID   |

---

# 6. Naming Convention

Files

snake_case

Examples

leave_encashment_limits.md

leave_types.md

leave_salary_components.md

Columns

camelCase for JSON

snake_case for SQL

Title Case for Documentation

---

# 7. Common Validation Rules

Every table shall define a Primary Key.

Primary Keys shall be unique.

Historical records shall never be deleted.

Superseded records shall remain available.

Every record shall reference an official Government or Railway notification.

---

# 8. Lookup Standard

All lookup functions shall

Receive validated input

↓

Locate matching record

↓

Return structured data

↓

Return validation error if no matching record exists

---

# 9. Backend Naming Convention

Functions

```python
getLeaveEncashmentLimit()

getLeaveType()

getLeaveSalaryComponent()
```

Return Type

JSON Object

---

# 10. Relationships

```text
Leave Types
      │
      ▼
Leave Salary Components
      │
      ▼
Leave Encashment Limits
      │
      ▼
Leave Encashment Rule
```

---

# 11. Error Handling

| Error                        | Action                  |
| ---------------------------- | ----------------------- |
| Missing Primary Key          | Reject                  |
| Duplicate Primary Key        | Reject                  |
| Invalid Data Type            | Reject                  |
| Missing Government Reference | Reject                  |
| Lookup Failure               | Return Validation Error |

---

# 12. Versioning Rules

Every table shall maintain

- Version
- Status
- Revision History
- Government Reference
- Effective Date

Historical records shall remain immutable.

---

# 13. References

- Railway Services (Leave) Rules
- Railway Board Circulars
- Ministry of Railways Notifications
- Government of India Orders

---

# 14. Revision History

Version 1.0

Initial Leave Module Schema.
