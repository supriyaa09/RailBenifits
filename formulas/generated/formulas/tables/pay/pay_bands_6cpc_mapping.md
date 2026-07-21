# 6th CPC to 7th CPC Pay Band Mapping

Version: 1.0

Table ID: TBL-PAY-006

Status: VERIFIED

---

# 1. Purpose

This table provides the official mapping between the 6th Central Pay Commission (CPC) Pay Bands and Grade Pays to the corresponding 7th CPC Pay Levels adopted by the Indian Railways.

The Railway Benefits Calculation Engine shall use this table for migrating legacy employee records, validating historical pay information, and supporting calculations involving employees whose service spans multiple Pay Commission periods.

This table contains reference data only.

It performs no calculations.

---

# 2. Authority

Primary References

- 7th Central Pay Commission (CPC) Report
- CCS (Revised Pay) Rules, 2016
- Railway Board Circulars
- Ministry of Finance Orders

---

# 3. Scope

Responsible for

- Mapping 6th CPC Pay Bands
- Mapping Grade Pays
- Identifying corresponding 7th CPC Pay Levels
- Supporting migration of legacy records
- Supporting historical pay validation

Not Responsible For

- Pay fixation
- Increment calculation
- Pension calculation
- Promotion calculation

---

# 4. Dependencies

tables/pay/pay_levels.md

tables/pay/pay_matrix.md

tables/pay/pay_revision_history.md

rules/pay/

---

# 5. Table Structure

Primary Key

Pay Band + Grade Pay

Columns

| Column            | Type    | Description                  |
| ----------------- | ------- | ---------------------------- |
| Pay Band          | String  | 6th CPC Pay Band             |
| Grade Pay         | Integer | 6th CPC Grade Pay            |
| 7th CPC Pay Level | Integer | Corresponding Pay Level      |
| Description       | String  | Employee category or remarks |
| Status            | String  | Active / Historical          |

---

# 6. Validation Rules

Pay Band is mandatory.

Grade Pay is mandatory.

Each Pay Band + Grade Pay combination shall be unique.

Every mapping shall reference exactly one 7th CPC Pay Level.

Historical mappings shall never be modified.

---

# 7. Pay Band Mapping Table

| Pay Band          | Grade Pay | 7th CPC Pay Level | Description                      | Status     |
| ----------------- | --------: | ----------------: | -------------------------------- | ---------- |
| PB-1              |      1800 |                 1 | Entry Level                      | Historical |
| PB-1              |      1900 |                 2 | Skilled Staff                    | Historical |
| PB-1              |      2000 |                 3 | Technical Staff                  | Historical |
| PB-1              |      2400 |                 4 | Senior Technical Staff           | Historical |
| PB-1              |      2800 |                 5 | Supervisor                       | Historical |
| PB-2              |      4200 |                 6 | Group C                          | Historical |
| PB-2              |      4600 |                 7 | Group B (Non-Gazetted)           | Historical |
| PB-2              |      4800 |                 8 | Senior Supervisor                | Historical |
| PB-2              |      5400 |                 9 | Group B (Gazetted)               | Historical |
| PB-3              |      5400 |                10 | Junior Administrative            | Historical |
| PB-3              |      6600 |                11 | Senior Administrative            | Historical |
| PB-3              |      7600 |                12 | Senior Administrative            | Historical |
| PB-4              |      8700 |                13 | Higher Administrative            | Historical |
| PB-4              |      8900 |               13A | Higher Administrative            | Historical |
| HAG               |         — |                14 | Higher Administrative Grade      | Historical |
| HAG+              |         — |                15 | Higher Administrative Grade Plus | Historical |
| Apex              |         — |                17 | Apex Scale                       | Historical |
| Cabinet Secretary |         — |                18 | Cabinet Secretary Scale          | Historical |

> **Note:** Verify all mappings with the latest CCS (Revised Pay) Rules, 2016 and Railway Board notifications before production deployment. Update this table if any official revisions are issued.

---

# 8. Lookup Rules

Input

6th CPC Pay Band

-

Grade Pay

↓

Locate Matching Record

↓

Return

- 7th CPC Pay Level
- Description
- Status

↓

If No Matching Record Exists

Return Validation Error

---

# 9. Backend Interface

Function

```python
getPayLevelFromLegacy(payBand, gradePay)
```

Example

Input

```python
getPayLevelFromLegacy(
    payBand="PB-2",
    gradePay=4200
)
```

Output

```json
{
  "payLevel": 6,
  "description": "Group C",
  "status": "Historical"
}
```

---

# 10. Data Integrity Rules

No duplicate Pay Band + Grade Pay combinations.

Each mapping shall correspond to exactly one Pay Level.

Historical mappings shall remain available for legacy calculations.

Updates shall only occur through verified Government Notifications or Railway Board Circulars.

---

# 11. References

- 7th Central Pay Commission Report
- CCS (Revised Pay) Rules, 2016
- Railway Board Circulars
- Ministry of Finance Orders

---

# 12. Revision History

Version 1.0

Initial 6th CPC to 7th CPC Pay Band Mapping specification.
