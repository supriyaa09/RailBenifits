# Commutation Factor Table Schema

Version: 1.0

Schema ID: SCH-COM-001

Status: VERIFIED

---

# 1. Purpose

This schema defines the structure, validation rules, and usage requirements for the Commutation Factor Table used by the Railway Benefits Calculation Engine.

The schema ensures that all applications access and interpret commutation factors consistently.

This schema contains metadata only.

It does NOT contain factor values.

---

# 2. Authority

Primary References

- Railway Services (Pension) Rules
- Railway Board Circulars
- Official Commutation Factor Table

---

# 3. Scope

Responsible for

- Defining table structure
- Defining validation rules
- Defining lookup behavior
- Defining backend interface
- Maintaining data consistency

Not Responsible For

- Pension calculation
- Commutation calculation
- Eligibility determination
- Data storage

---

# 4. Table Information

Table Name

commutation_factor

Module

Commutation

Primary Key

Age

Lookup Key

Age

---

# 5. Column Definitions

| Column | Data Type | Required | Description |
|----------|-----------|----------|-------------|
| age | Integer | Yes | Applicable age for factor lookup |
| factor | Decimal(5,3) | Yes | Official commutation factor |

---

# 6. Constraints

Age shall be unique.

Age shall be positive.

Factor shall be greater than zero.

No duplicate records.

One age shall return exactly one factor.

---

# 7. Validation Rules

Age is mandatory.

Factor is mandatory.

Factor must be numeric.

Age must fall within the supported range.

Lookup shall return one record only.

---

# 8. Backend Interface

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

# 9. Lookup Process

Receive Age

↓

Validate Input

↓

Search commutation_factor

↓

Record Found?

↓

Yes

↓

Return Factor

↓

No

↓

Return Validation Error

---

# 10. JSON Representation

```json
{
    "age": 61,
    "factor": 8.194
}
```

---

# 11. CSV Representation

```csv
age,factor
20,9.188
21,9.187
22,9.186
...
61,8.194
...
81,4.611
```

---

# 12. Error Handling

| Error | Action |
|---------|--------|
| Missing Age | Reject |
| Duplicate Age | Data Integrity Error |
| Missing Factor | Reject |
| Invalid Data Type | Reject |
| Age Outside Supported Range | Reject |

---

# 13. References

- Railway Services (Pension) Rules
- Railway Board Circulars
- Official Commutation Factor Table

---

# 14. Revision History

Version 1.0

Initial schema specification.