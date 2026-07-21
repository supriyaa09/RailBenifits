# 7th Central Pay Commission (CPC) Pay Matrix

Version: 1.0

Table ID: TBL-PAY-001

Status: VERIFIED

---

# 1. Purpose

This table contains the official 7th Central Pay Commission (CPC) Pay Matrix adopted by the Indian Railways.

The Pay Matrix is the authoritative reference for determining an employee's Basic Pay based on their Pay Level and Cell.

This table contains reference data only.

It performs no calculations.

---

# 2. Authority

Primary References

- 7th Central Pay Commission (7th CPC)
- CCS (Revised Pay) Rules, 2016
- Ministry of Finance Orders
- Railway Board Circulars

---

# 3. Scope

Responsible for

- Maintaining Pay Levels
- Maintaining Cells within each Pay Level
- Providing corresponding Basic Pay values
- Supporting pay validation and lookup

Not Responsible For

- Pay Fixation
- Annual Increment Calculation
- Promotion Pay Fixation
- Pension Calculation
- Gratuity Calculation

---

# 4. Dependencies

common/basic_pay.md

common/pay_history.md

common/emoluments.md

rules/pension/

rules/gratuity/

rules/leave_encashment/

---

# 5. Table Structure

Primary Key

Pay Level + Cell

Columns

| Column    | Type    | Description                      |
| --------- | ------- | -------------------------------- |
| Pay Level | Integer | CPC Pay Level                    |
| Cell      | Integer | Cell Number within the Pay Level |
| Basic Pay | Decimal | Official Basic Pay               |

---

# 6. Validation Rules

Pay Level is mandatory.

Cell is mandatory.

Basic Pay is mandatory.

Each Pay Level + Cell combination shall be unique.

Basic Pay shall increase sequentially within a Pay Level.

---

# 7. Pay Matrix

> **Note:** The complete official 7th CPC Pay Matrix contains several hundred entries and shall be maintained in machine-readable formats (`pay_matrix.csv` and `pay_matrix.json`).

Example:

| Pay Level | Cell | Basic Pay |
| --------: | ---: | --------: |
|         1 |    1 |     18000 |
|         1 |    2 |     18500 |
|         1 |    3 |     19100 |
|       ... |  ... |       ... |
|         6 |    1 |     35400 |
|         6 |    2 |     36500 |
|       ... |  ... |       ... |

---

# 8. Lookup Rules

Input

Pay Level

-

Cell

↓

Validate Inputs

↓

Search Pay Matrix

↓

Return Basic Pay

↓

If No Record Exists

Return Validation Error

---

# 9. Backend Interface

Function

```python
getBasicPay(payLevel, cell)
```

Example

Input

```python
getBasicPay(6, 5)
```

Output

```python
39900
```

---

# 10. Data Integrity Rules

No duplicate Pay Level + Cell combinations.

Cells shall be sequential.

Basic Pay shall always increase within a Pay Level.

Historical Pay Matrices shall be maintained separately when revised.

---

# 11. References

- 7th Central Pay Commission
- CCS (Revised Pay) Rules, 2016
- Railway Board Circulars

---

# 12. Revision History

Version 1.0

Initial Pay Matrix specification.
