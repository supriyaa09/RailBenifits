# Superannuation Pension

Version: 1.0

Module ID: RULE-PEN-001

Status: VERIFIED

Authority

- Railway Services (Pension) Rules, 1993
- Rule 49 – Emoluments
- Rule 69 – Pension
- Rule 70 – Retirement Benefits
- Applicable Railway Board Circulars
- Government Orders revising pension provisions

---

# Purpose

This document defines the eligibility, calculation methodology,
business rules, validation rules, and implementation logic for
Superannuation Pension payable to Railway employees retiring on
attaining the prescribed age of retirement.

This document is the primary specification for implementing the
Superannuation Pension calculation engine.

---

# Applicability

Applicable

- Superannuation Retirement

Not Applicable

- Voluntary Retirement
- Compulsory Retirement
- Invalid Retirement
- Death while in Service
- Death after Retirement
- Resignation
- Removal
- Dismissal

---

# Dependencies

common/basic_pay.md

common/emoluments.md

common/average_emoluments.md

common/pay_history.md

common/qualifying_service.md

common/retirement_date.md

common/service_rounding.md

common/validation_rules.md

tables/pension_rates.md

tables/da_dr_rates.md

---

# Eligibility

A Railway employee shall be eligible for Superannuation Pension if

- Retirement occurs on attaining the prescribed age.
- Retirement is under applicable pension rules.
- Minimum qualifying service prescribed under the applicable rules is completed.
- Pension is not withheld by disciplinary or judicial proceedings.

---

# Inputs

Employee ID

Employee Name

Date of Birth

Date of Appointment

Retirement Date

Retirement Age

Pension Scheme

Qualifying Service

Basic Pay

Emoluments

Average Emoluments

Pay History

Applicable Pension Rate

Applicable Dearness Relief

---

# Output

```json
{
  "eligible": true,
  "qualifyingService": "",
  "emoluments": 0,
  "averageEmoluments": 0,
  "basicPension": 0,
  "dearnessRelief": 0,
  "grossPension": 0,
  "netPension": 0
}
```

---

# Definitions

## Superannuation

Retirement on attaining the prescribed retirement age.

---

## Emoluments

Determined according to

common/emoluments.md

---

## Average Emoluments

Determined according to

common/average_emoluments.md

---

## Qualifying Service

Determined according to

common/qualifying_service.md

---

# Formula

Basic Pension shall be calculated strictly according to the applicable
Railway Pension Rules.

The calculation shall use the admissible emoluments/average emoluments
and qualifying service as prescribed under the governing rules.

The applicable pension percentage shall be obtained from

tables/pension_rates.md

The pension calculation must **not** hardcode percentages or monetary
limits.

---

# Variables

| Variable | Description        |
| -------- | ------------------ |
| E        | Emoluments         |
| AE       | Average Emoluments |
| QS       | Qualifying Service |
| BP       | Basic Pension      |
| DR       | Dearness Relief    |

---

# Calculation Steps

Step 1

Validate Employee Information

↓

Step 2

Validate Retirement Type

↓

Step 3

Determine Qualifying Service

↓

Step 4

Determine Emoluments

↓

Step 5

Determine Average Emoluments

↓

Step 6

Fetch Pension Rules

↓

Step 7

Calculate Basic Pension

↓

Step 8

Fetch Dearness Relief Rate

↓

Step 9

Calculate Gross Pension

↓

Step 10

Apply Statutory Deductions (if any)

↓

Return Final Pension

---

# Business Rules

## BR-001

Only Superannuation Retirement shall use this module.

---

## BR-002

Qualifying Service shall be determined before pension calculation.

---

## BR-003

Emoluments and Average Emoluments shall be determined using the common modules.

---

## BR-004

Pension rates shall always be fetched from

tables/pension_rates.md

---

## BR-005

Dearness Relief shall always be fetched from

tables/da_dr_rates.md

---

## BR-006

No pension percentage or monetary ceiling shall be hardcoded.

---

# Special Cases

## Promotion in Final Year

Recalculate admissible emoluments according to applicable rules.

---

## Pay Revision Before Retirement

Recalculate pension using revised admissible pay.

---

## Court Orders

Apply judicial directions where applicable.

---

## Pension Withheld

Calculate entitlement but release only as permitted by the applicable orders.

---

# Validation Rules

Retirement Type = Superannuation

Retirement Date valid

Qualifying Service valid

Emoluments > 0

Average Emoluments available

Pension Scheme valid

---

# Worked Example

Employee

Retirement Type

Superannuation

Qualifying Service

33 Years

Average Emoluments

₹80,000

Applicable Pension Percentage

Fetched from

tables/pension_rates.md

Basic Pension

Calculated according to the applicable Railway Pension Rules.

Dearness Relief

Fetched from

tables/da_dr_rates.md

Gross Pension

Basic Pension + Dearness Relief

---

# Edge Cases

Employee retires exactly on retirement age.

Employee promoted during last ten months.

Retirement after suspension regularization.

Revision of pay after retirement.

Retrospective pension revision.

---

# Programming Logic

Validate Inputs

↓

Determine Eligibility

↓

Calculate Qualifying Service

↓

Determine Emoluments

↓

Determine Average Emoluments

↓

Fetch Pension Rate

↓

Calculate Basic Pension

↓

Fetch Dearness Relief

↓

Calculate Gross Pension

↓

Return Result

---

# Test Cases

| Case                    | Expected Result      |
| ----------------------- | -------------------- |
| Normal Superannuation   | Pension Calculated   |
| Invalid Retirement Type | Validation Error     |
| Zero Qualifying Service | Not Eligible         |
| Promotion in Last Year  | Updated Pension      |
| Revised Pay Order       | Recalculated Pension |

---

# Common Mistakes

❌ Using Gross Salary instead of Emoluments.

❌ Ignoring Average Emoluments.

❌ Hardcoding pension percentage.

❌ Ignoring qualifying service.

❌ Applying incorrect Dearness Relief.

---

# References

- Railway Services (Pension) Rules, 1993
- Rule 49
- Rule 69
- Relevant Railway Board Circulars

---

# Revision History

Version 1.0

Initial verified specification for Superannuation Pension.
