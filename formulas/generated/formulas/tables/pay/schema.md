# Pay Module Schema

Version: 1.0

Schema ID: SCH-PAY-001

Status: VERIFIED

---

# 1. Purpose

This schema defines the standard structure, validation rules, naming conventions, and relationships for all reference tables contained within the Pay module.

It establishes a consistent data model to ensure interoperability across the Railway Benefits Calculation Engine.

This schema contains metadata only.

It does NOT contain business rules or reference values.

---

# 2. Authority

Primary References

- 7th Central Pay Commission (7th CPC)
- CCS (Revised Pay) Rules, 2016
- Railway Board Circulars
- Ministry of Finance Orders

---

# 3. Scope

Responsible for

- Standardizing Pay tables
- Defining relationships
- Defining primary keys
- Defining validation rules
- Defining lookup standards

Not Responsible For

- Pay calculations
- Increment calculations
- Pension calculations
- Gratuity calculations

---

# 4. Module Overview

Module

Pay

Directory

tables/pay/

Purpose

Maintain all reference data related to employee pay structures.

---

# 5. Tables Covered

| Table | Table ID | Primary Key |
|---------|----------|-------------|
| pay_matrix.md | TBL-PAY-001 | Pay Level + Cell |
| pay_levels.md | TBL-PAY-002 | Pay Level |
| increment_rules.md | TBL-PAY-003 | Rule ID |
| pay_fixation_rules.md | TBL-PAY-004 | Rule ID |
| pay_revision_history.md | TBL-PAY-005 | Revision ID |
| pay_bands_6cpc_mapping.md | TBL-PAY-006 | Pay Band + Grade Pay |

---

# 6. Naming Convention

Files

snake_case

Examples

pay_matrix.md

increment_rules.md

pay_fixation_rules.md

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

Every record shall reference an official Government or Railway notification where applicable.

---

# 8. Lookup Standard

All lookup functions shall

Receive validated input

↓

Locate matching record

↓

Return structured data

↓

Throw validation error if record is unavailable

---

# 9. Backend Naming Convention

Functions

```python
getBasicPay()

getPayLevel()

getIncrementRule()

getPayFixationRule()

getApplicablePayRevision()

getPayLevelFromLegacy()
```

Return Type

JSON Object

---

# 10. Relationships

```text
Pay Levels
      │
      ▼
Pay Matrix
      │
      ▼
Increment Rules
      │
      ▼
Pay Fixation Rules
      │
      ▼
Pay Revision History
      │
      ▼
Legacy Mapping
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

Version

Status

Revision History

Government Reference

Effective Date

Historical records shall remain immutable.

---

# 13. References

- 7th Central Pay Commission Report
- CCS (Revised Pay) Rules, 2016
- Railway Board Circulars
- Ministry of Finance Orders

---

# 14. Revision History

Version 1.0

Initial Pay Module Schema.