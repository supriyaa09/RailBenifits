# Pay Levels Reference Table

Version: 1.0

Table ID: TBL-PAY-002

Status: VERIFIED

---

# 1. Purpose

This table defines the official Pay Levels under the 7th Central Pay Commission (CPC) adopted by the Indian Railways.

The table provides metadata for each Pay Level and serves as a reference for pay validation, pay matrix lookup, promotion rules, and retirement benefit calculations.

This table contains reference data only.

It performs no calculations.

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

- Defining Pay Levels
- Mapping legacy Grade Pay (where applicable)
- Providing Pay Level descriptions
- Supporting Pay Matrix validation

Not Responsible For

- Basic Pay lookup
- Increment calculation
- Promotion calculation
- Pension calculation

---

# 4. Dependencies

tables/pay/pay_matrix.md

common/basic_pay.md

rules/pension/

rules/gratuity/

---

# 5. Table Structure

Primary Key

Pay Level

Columns

| Column | Type | Description |
|---------|------|-------------|
| Pay Level | Integer | Official 7th CPC Pay Level |
| Legacy Grade Pay | Integer | Corresponding 6th CPC Grade Pay (if applicable) |
| Description | String | Name or description of the Pay Level |
| Status | String | Active / Obsolete |

---

# 6. Validation Rules

Pay Level shall be unique.

Description is mandatory.

Status shall be either Active or Obsolete.

---

# 7. Pay Levels Table

| Pay Level | Legacy Grade Pay | Description | Status |
|-----------:|-----------------:|-------------|--------|
| 1 | 1800 | Entry Level | Active |
| 2 | 1900 | Skilled Staff | Active |
| 3 | 2000 | Technical Staff | Active |
| ... | ... | ... | ... |
| 18 | — | Apex Administrative Level | Active |

> **Note:** Populate the complete table using the officially notified 7th CPC Pay Level mapping.

---

# 8. Lookup Rules

Input

Pay Level

↓

Locate Matching Record

↓

Return

- Description
- Legacy Grade Pay
- Status

↓

If No Record Exists

Return Validation Error

---

# 9. Backend Interface

Function

```python
getPayLevel(level)
```

Example

Input

```python
6
```

Output

```json
{
    "payLevel": 6,
    "legacyGradePay": 4200,
    "description": "Level 6",
    "status": "Active"
}
```

---

# 10. Data Integrity Rules

No duplicate Pay Levels.

Descriptions shall not be empty.

Historical mappings shall remain unchanged.

---

# 11. References

- 7th CPC
- CCS (Revised Pay) Rules
- Railway Board Circulars

---

# 12. Revision History

Version 1.0

Initial Pay Levels Reference Table.