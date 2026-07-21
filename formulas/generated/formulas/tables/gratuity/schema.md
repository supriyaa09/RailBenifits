# Gratuity Module Schema

Version: 1.0

Schema ID: SCH-GRT-001

Status: VERIFIED

---

# 1. Purpose

This schema defines the standard structure, validation rules, naming conventions, and relationships for all reference tables contained within the Gratuity module.

It establishes a consistent data model for gratuity-related reference data used by the Railway Benefits Calculation Engine.

This schema contains metadata only.

It does NOT contain gratuity calculation logic or business rules.

---

# 2. Authority

Primary References

- Railway Services (Pension) Rules
- Railway Board Circulars
- Department of Pension & Pensioners' Welfare (DoP&PW) Orders
- Ministry of Finance Notifications

---

# 3. Scope

Responsible for

- Standardizing Gratuity tables
- Defining relationships
- Defining primary keys
- Defining validation rules
- Defining lookup standards

Not Responsible For

- Retirement Gratuity calculation
- Death Gratuity calculation
- Service Gratuity calculation
- Pension calculation

---

# 4. Module Overview

Module

Gratuity

Directory

tables/gratuity/

Purpose

Maintain all reference data related to gratuity benefits.

---

# 5. Tables Covered

| Table                   | Table ID    | Primary Key    |
| ----------------------- | ----------- | -------------- |
| gratuity_ceiling.md     | TBL-GRT-001 | Effective Date |
| death_gratuity_slabs.md | TBL-GRT-002 | Slab ID        |

---

# 6. Naming Convention

Files

snake_case

Examples

gratuity_ceiling.md

death_gratuity_slabs.md

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
getGratuityCeiling()

getDeathGratuitySlab()
```

Return Type

JSON Object

---

# 10. Relationships

```text
Qualifying Service
        │
        ▼
Death Gratuity Slabs
        │
        ▼
Gratuity Ceiling
        │
        ▼
Retirement Gratuity Rule

Service Gratuity Rule
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

- Railway Services (Pension) Rules
- Railway Board Circulars
- DoP&PW Orders
- Ministry of Finance Notifications

---

# 14. Revision History

Version 1.0

Initial Gratuity Module Schema.
