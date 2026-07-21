# Commutation Factor Lookup

Version: 1.0

Module ID: COM-LKP-001

Status: VERIFIED (Structure)

---

# 1. Purpose

This module defines the process for retrieving the appropriate commutation factor required for calculating the commuted value of pension.

The commutation factor shall be obtained from the official Commutation Factor Table based on the applicable age determined under the Railway Services (Pension) Rules.

This module performs only factor retrieval.

It does NOT perform any pension calculations.

---

# 2. Authority

Primary References

- Railway Services (Pension) Rules
- Railway Board Circulars
- Department of Pension & Pensioners' Welfare (DoP&PW) Orders
- Official Commutation Factor Table

---

# 3. Scope

Responsible for

- Validating lookup input
- Determining lookup age
- Retrieving commutation factor
- Returning the applicable factor
- Reporting lookup failures

Not Responsible For

- Pension calculation
- Commutation calculation
- Medical examination
- Pension restoration

---

# 4. Dependencies

tables/commutation_factor.md

common/validation_rules.md

common/date_rules.md

rules/commutation/commutation.md

---

# 5. Inputs

Employee ID

Applicable Age

Applicable Government Order

Commutation Date

---

# 6. Outputs

```json
{
  "age": 61,
  "factor": 8.194,
  "status": "Success"
}
```

---

# 7. Definitions

## Commutation Factor

A numerical factor prescribed under the applicable Railway Services (Pension) Rules for calculating the lump-sum commuted value of pension.

---

## Applicable Age

The age determined under the applicable Railway Pension Rules for selecting the corresponding commutation factor.

---

## Lookup Table

The official reference table containing age-wise commutation factors.

---

# 8. Lookup Pipeline

---

## COM-LKP-001

Validate Input.

Verify that the required input data is complete.

---

## COM-LKP-002

Determine Applicable Age.

Determine the age to be used for lookup according to the applicable Railway Pension Rules.

---

## COM-LKP-003

Open Reference Table.

Reference

tables/commutation_factor.md

---

## COM-LKP-004

Locate Matching Age.

Search the reference table for the applicable age.

---

## COM-LKP-005

Retrieve Commutation Factor.

Return the corresponding factor.

---

## COM-LKP-006

Handle Missing Record.

If no matching age exists,

Return Validation Error.

---

## COM-LKP-007

Return Lookup Result.

Return

- Age
- Factor
- Status

---

# 9. Business Rules

| Rule ID        | Description                                                                            |
| -------------- | -------------------------------------------------------------------------------------- |
| COM-LKP-BR-001 | Lookup shall always use the applicable age determined under the Railway Pension Rules. |
| COM-LKP-BR-002 | Commutation factors shall always be retrieved from the official reference table.       |
| COM-LKP-BR-003 | Commutation factors shall never be hardcoded in business logic.                        |
| COM-LKP-BR-004 | Exactly one factor shall be returned for one valid age.                                |
| COM-LKP-BR-005 | If the requested age is unavailable, the lookup shall fail with a validation error.    |

---

# 10. Decision Table

| Condition     | Action           |
| ------------- | ---------------- |
| Age Found     | Return Factor    |
| Age Not Found | Validation Error |
| Invalid Age   | Reject           |
| Missing Input | Validation Error |

---

# 11. Validation Rules

Applicable Age mandatory.

Age shall be within the supported range of the official factor table.

Only one matching record shall exist.

Factor shall be a positive decimal value.

---

# 12. Edge Cases

Age outside supported range.

↓

Reject lookup.

---

Duplicate age entries.

↓

Raise data integrity error.

---

Corrupted factor table.

↓

Abort lookup.

---

Government issues revised factor table.

↓

Replace reference table without modifying business logic.

---

# 13. Rule Traceability Matrix

| Rule ID     | Requirement              | Backend Function         |
| ----------- | ------------------------ | ------------------------ |
| COM-LKP-001 | Validate Input           | validateLookupInput()    |
| COM-LKP-002 | Determine Applicable Age | determineApplicableAge() |
| COM-LKP-003 | Load Table               | loadFactorTable()        |
| COM-LKP-004 | Lookup Factor            | getCommutationFactor()   |
| COM-LKP-005 | Validate Result          | validateLookupResult()   |

---

# 14. Programming Flow

Validate Input

↓

Determine Applicable Age

↓

Load Commutation Factor Table

↓

Locate Age

↓

Factor Found?

↓

Yes

↓

Return Factor

↓

No

↓

Return Validation Error

---

# 15. JSON Response

```json
{
  "age": 61,
  "factor": 8.194,
  "status": "Success"
}
```

---

# 16. Backend Interface

Function

```python
getCommutationFactor(age)
```

Input

```python
61
```

Output

```python
8.194
```

---

# 17. Test Cases

| Test Case       | Expected Result      |
| --------------- | -------------------- |
| Age Exists      | Factor Returned      |
| Age Missing     | Validation Error     |
| Invalid Age     | Rejected             |
| Duplicate Age   | Data Integrity Error |
| Corrupted Table | Lookup Failed        |

---

# 18. References

- Railway Services (Pension) Rules
- Railway Board Circulars
- Department of Pension & Pensioners' Welfare (DoP&PW) Orders
- Official Commutation Factor Table

---

# 19. Revision History

Version 1.0

Initial Commutation Factor Lookup specification.
