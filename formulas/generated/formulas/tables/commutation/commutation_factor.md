# Commutation Factor Table

Version: 1.0

Table ID: TBL-COM-001

Status: VERIFIED

---

# 1. Purpose

This table contains the official age-wise commutation factors used for calculating the lump-sum commuted value of pension under the applicable Railway Services (Pension) Rules.

The commutation calculation engine shall retrieve the appropriate factor from this table based on the applicable age.

This table contains reference data only.

It performs no calculations.

---

# 2. Authority

Primary References

- Railway Services (Pension) Rules
- Railway Board Circulars
- Department of Pension & Pensioners' Welfare (DoP&PW) Orders
- Official Commutation Value Table

---

# 3. Scope

Responsible for

- Providing age-wise commutation factors
- Supporting commutation calculations
- Serving as the single source of truth for factor lookup

Not Responsible For

- Pension calculation
- Commutation calculation
- Eligibility determination
- Restoration

---

# 4. Dependencies

rules/commutation/factor_lookup.md

rules/commutation/commutation.md

---

# 5. Table Structure

Primary Key

Age

Columns

| Column | Type         | Description                         |
| ------ | ------------ | ----------------------------------- |
| Age    | Integer      | Applicable age for factor selection |
| Factor | Decimal(5,3) | Official commutation factor         |

---

# 6. Validation Rules

Age shall be unique.

Factor shall be positive.

Every age shall have exactly one factor.

No duplicate records shall exist.

Factors shall only be updated through authorized Government/Railway revisions.

---

# 7. Commutation Factor Table

| Age | Factor |
| --: | -----: |
|  20 |  9.188 |
|  21 |  9.187 |
|  22 |  9.186 |
|  23 |  9.185 |
|  24 |  9.184 |
|  25 |  9.183 |
|  26 |  9.182 |
|  27 |  9.180 |
|  28 |  9.178 |
|  29 |  9.176 |
|  30 |  9.173 |
|  31 |  9.169 |
|  32 |  9.164 |
|  33 |  9.159 |
|  34 |  9.152 |
|  35 |  9.145 |
|  36 |  9.136 |
|  37 |  9.126 |
|  38 |  9.116 |
|  39 |  9.103 |
|  40 |  9.090 |
|  41 |  9.075 |
|  42 |  9.059 |
|  43 |  9.040 |
|  44 |  9.019 |
|  45 |  8.996 |
|  46 |  8.971 |
|  47 |  8.943 |
|  48 |  8.913 |
|  49 |  8.881 |
|  50 |  8.846 |
|  51 |  8.808 |
|  52 |  8.768 |
|  53 |  8.724 |
|  54 |  8.678 |
|  55 |  8.627 |
|  56 |  8.572 |
|  57 |  8.512 |
|  58 |  8.446 |
|  59 |  8.371 |
|  60 |  8.287 |
|  61 |  8.194 |
|  62 |  8.093 |
|  63 |  7.982 |
|  64 |  7.862 |
|  65 |  7.731 |
|  66 |  7.591 |
|  67 |  7.431 |
|  68 |  7.262 |
|  69 |  7.083 |
|  70 |  6.897 |
|  71 |  6.703 |
|  72 |  6.502 |
|  73 |  6.296 |
|  74 |  6.085 |
|  75 |  5.872 |
|  76 |  5.657 |
|  77 |  5.443 |
|  78 |  5.229 |
|  79 |  5.018 |
|  80 |  4.812 |
|  81 |  4.611 |

---

# 8. Lookup Rules

Input

Applicable Age

↓

Search Table

↓

Matching Age Found

↓

Return Factor

↓

If Age Not Found

Return Validation Error

---

# 9. Backend Interface

Function

```python
getCommutationFactor(age)
```

Example

Input

```python
61
```

Output

```python
8.194
```

---

# 10. Example Lookups

| Age | Returned Factor |
| --: | --------------: |
|  40 |           9.090 |
|  50 |           8.846 |
|  60 |           8.287 |
|  61 |           8.194 |
|  70 |           6.897 |
|  80 |           4.812 |

---

# 11. Data Integrity Rules

No duplicate ages.

No negative factors.

Age values shall be sequential.

Only one factor per age.

Missing records shall trigger validation errors.

---

# 12. References

- Railway Services (Pension) Rules
- Railway Board Circulars
- Official Commutation Factor Table

---

# 13. Revision History

Version 1.0

Initial Commutation Factor Table.
