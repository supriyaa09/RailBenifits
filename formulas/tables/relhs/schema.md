# RELHS Module Schema

Version: 1.0

Schema ID: SCH-RELHS-001

Status: VERIFIED

---

# 1. Purpose

This schema defines the standard structure, validation rules, naming conventions, and relationships for all reference tables contained within the RELHS (Retired Employees Liberalized Health Scheme) module.

It establishes a consistent data model for RELHS-related reference data used by the Railway Benefits Calculation Engine.

This schema contains metadata only.

It does NOT contain RELHS eligibility logic or contribution calculation rules.

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

- Standardizing RELHS tables
- Defining relationships
- Defining primary keys
- Defining validation rules
- Defining lookup standards

Not Responsible For

- RELHS eligibility determination
- RELHS contribution calculation
- Pension calculation
- Settlement calculation

---

# 4. Module Overview

Module

RELHS

Directory

tables/relhs/

Purpose

Maintain all reference data related to RELHS contribution rules.

---

# 5. Tables Covered

| Table | Table ID | Primary Key |
|---------|----------|-------------|
| relhs_contribution.md | TBL-RELHS-001 | Effective Date |

---

# 6. Naming Convention

Files

snake_case

Example

relhs_contribution.md

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

Every record shall reference an official Railway Board or Government notification.

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
getRELHSContributionRule()
```

Return Type

JSON Object

---

# 10. Relationships

```text
Pay Rules
     │
     ▼
RELHS Contribution Table
     │
     ▼
RELHS Contribution Rule
     │
     ▼
Settlement Calculation
```

---

# 11. Error Handling

| Error | Action |
|---------|--------|
| Missing Primary Key | Reject |
| Duplicate Primary Key | Reject |
| Invalid Data Type | Reject |
| Missing Government Reference | Reject |
| Lookup Failure | Return Validation Error |

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

- Railway Board Circulars
- Ministry of Railways Notifications
- RELHS Guidelines
- Government of India Orders

---

# 14. Revision History

Version 1.0

Initial RELHS Module Schema.