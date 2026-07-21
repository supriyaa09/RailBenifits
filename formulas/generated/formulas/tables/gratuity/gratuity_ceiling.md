# Gratuity Ceiling Table

Version: 1.0

Table ID: TBL-GRT-001

Status: VERIFIED

---

# 1. Purpose

This table maintains the maximum admissible gratuity ceiling applicable under the Railway Services (Pension) Rules and related Government notifications.

The Railway Benefits Calculation Engine shall use this table to determine the applicable gratuity ceiling based on the effective date of retirement or settlement.

This table contains reference data only.

It performs no calculations.

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

- Maintaining gratuity ceiling amounts
- Recording effective dates
- Recording Government/Railway order references
- Supporting gratuity validation

Not Responsible For

- Retirement Gratuity calculation
- Death Gratuity calculation
- Service Gratuity calculation
- Qualifying Service calculation

---

# 4. Dependencies

rules/gratuity/retirement_gratuity.md

rules/gratuity/death_gratuity.md

rules/gratuity/service_gratuity.md

---

# 5. Table Structure

Primary Key

Effective Date

Columns

| Column           | Type    | Description                                         |
| ---------------- | ------- | --------------------------------------------------- |
| Effective Date   | Date    | Date from which the ceiling becomes applicable      |
| Maximum Gratuity | Decimal | Maximum admissible gratuity amount                  |
| Currency         | String  | Currency (INR)                                      |
| Government Order | String  | Official Railway Board / Government Order reference |
| Remarks          | String  | Additional remarks                                  |

---

# 6. Validation Rules

Effective Date shall be unique.

Maximum Gratuity shall be greater than zero.

Currency shall be "INR".

Government Order is mandatory.

Historical records shall never be deleted.

---

# 7. Gratuity Ceiling Table

| Effective Date | Maximum Gratuity | Currency | Government Order | Remarks       |
| -------------- | ---------------: | -------- | ---------------- | ------------- |
| YYYY-MM-DD     |              TBD | INR      | GO-XXXX          | Initial Entry |

> **Note:** Populate this table only with officially notified gratuity ceiling values issued by the Government of India or Railway Board. Do not use assumed values.

---

# 8. Lookup Rules

Input

Effective Date

↓

Find Latest Record

Where

Effective Date ≤ Input Date

↓

Return

- Maximum Gratuity
- Currency
- Government Order

↓

If No Record Exists

Return Validation Error

---

# 9. Backend Interface

Function

```python
getGratuityCeiling(effectiveDate)
```

Example

Input

```python
date(2026, 7, 1)
```

Output

```json
{
  "maximumGratuity": 0,
  "currency": "INR",
  "governmentOrder": "GO-XXXX"
}
```

---

# 10. Data Integrity Rules

No duplicate Effective Dates.

Historical ceiling values shall never be modified.

Superseded ceiling values shall remain available for historical calculations.

Every revision shall reference an official Government or Railway notification.

---

# 11. References

- Railway Services (Pension) Rules
- Railway Board Circulars
- Department of Pension & Pensioners' Welfare (DoP&PW) Orders
- Ministry of Finance Notifications

---

# 12. Revision History

Version 1.0

Initial Gratuity Ceiling Table specification.
