# Retirement Gratuity

Version: 1.0

Module ID: RULE-GRA-001

Status: VERIFIED

Authority

- Railway Services (Pension) Rules, 1993
- Rule 49 – Emoluments
- Rule 69 – Amount of Pension
- Rule 70 – Retirement Gratuity
- Relevant Railway Board circulars revising gratuity ceilings

---

# Purpose

This document defines the eligibility, calculation methodology, business rules, validation rules, and implementation logic for Retirement Gratuity payable to Railway employees on retirement.

This specification is intended to serve as the authoritative reference for implementing the Retirement Gratuity calculation engine.

---

# Applicability

Applicable To

- Superannuation Retirement
- Voluntary Retirement
- Premature Retirement
- Compulsory Retirement
- Invalid Retirement

Not Applicable

- Death while in Service
- Resignation where pensionary benefits are not admissible
- Removal or dismissal where gratuity is forfeited under applicable rules

---

# Dependencies

common/basic-pay.md

common/emoluments.md

common/average-emoluments.md

common/qualifying-service.md

common/service-rounding.md

common/validation-rules.md

tables/gratuity-ceiling.md

---

# Eligibility

A Railway employee shall be eligible for Retirement Gratuity only if:

- Retirement takes place under admissible pension rules.
- Minimum qualifying service of 5 years is completed.
- Pension or service gratuity is admissible under the rules.

If qualifying service is less than 5 years,

Retirement Gratuity = Not Admissible

---

# Inputs

Employee ID

Retirement Type

Retirement Date

Qualifying Service

Completed Six-Month Periods

Emoluments

Applicable Dearness Allowance (if admissible under the governing rules)

Gratuity Ceiling

---

# Output

```json
{
  "eligible": true,
  "qualifyingService": "",
  "completedSixMonthlyPeriods": 0,
  "emoluments": 0,
  "grossGratuity": 0,
  "gratuityCeiling": 0,
  "payableGratuity": 0
}
```

---

# Definitions

## Emoluments

Emoluments shall be determined strictly according to Rule 49.

This module shall never calculate emoluments independently.

Reference

common/emoluments.md

---

## Qualifying Service

Qualifying Service shall be determined using

common/qualifying-service.md

---

## Completed Six-Month Period

Completed six-month periods shall be determined using

common/service-rounding.md

---

# Formula

Retirement Gratuity

=

1/4 × Emoluments × Completed Six-Month Periods

Subject to:

- Maximum 16½ times emoluments.
- Overall gratuity ceiling applicable on the retirement date.

The gratuity amount shall be rounded as prescribed by the applicable rules. :contentReference[oaicite:1]{index=1}

---

# Variables

| Variable | Description                 |
| -------- | --------------------------- |
| E        | Emoluments                  |
| CSP      | Completed Six-Month Periods |
| RG       | Retirement Gratuity         |

Formula

RG = (E × CSP) ÷ 4

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

Calculate Completed Six-Month Periods

↓

Step 5

Determine Emoluments

↓

Step 6

Calculate Gross Retirement Gratuity

↓

Step 7

Apply 16½ Times Emoluments Limit

↓

Step 8

Apply Applicable Gratuity Ceiling

↓

Step 9

Round Amount

↓

Return Final Payable Amount

---

# Business Rules

## BR-001

Minimum qualifying service shall be five years.

---

## BR-002

Only qualifying service shall be used.

Calendar service shall never be used directly.

---

## BR-003

Completed six-month periods shall be calculated according to the service rounding rules.

---

## BR-004

Emoluments shall be determined only according to Rule 49.

---

## BR-005

Retirement Gratuity shall never exceed:

- 16½ times admissible emoluments.
- The gratuity ceiling applicable on the retirement date.

The actual ceiling value shall be obtained from:

tables/gratuity-ceiling.md

---

## BR-006

Final gratuity shall be rounded according to the applicable Railway rules.

---

# Special Cases

## Voluntary Retirement

Calculate gratuity using admissible qualifying service after applying applicable rules.

---

## Invalid Retirement

Eligible if qualifying conditions are satisfied.

---

## Compulsory Retirement

Subject to applicable pension rules and disciplinary provisions.

---

## Court Orders

Court directions shall override standard calculations wherever applicable.

---

# Exceptions

Retirement Gratuity shall not be paid when:

- Minimum qualifying service is not completed.
- Employee is not entitled under the governing rules.
- Gratuity is wholly or partly forfeited under applicable disciplinary provisions.

---

# Validation Rules

Qualifying Service ≥ 5 Years

Completed Six-Month Periods ≥ 0

Emoluments > 0

Retirement Date Valid

Retirement Type Valid

Employee Eligible

---

# Worked Example

Employee

Basic Pay + Admissible Emoluments

₹80,000

Completed Six-Month Periods

60

Calculation

Retirement Gratuity

=

80,000 × 60 ÷ 4

=

₹12,00,000

Now verify

- 16½ Times Limit

16.5 × 80,000

=

₹13,20,000

If applicable ceiling

=

₹25,00,000

Final Payable

₹12,00,000

(Actual ceiling depends on the retirement date and applicable Railway Board orders.)

---

# Edge Cases

Employee retires exactly after five years.

Employee retires after promotion.

Employee has stagnation increment.

Running Staff Pay Element applicable.

Retirement during pay revision.

Retirement after disciplinary proceedings.

Court-ordered reinstatement.

---

# Programming Logic

Validate Input

↓

Determine Eligibility

↓

Calculate Qualifying Service

↓

Calculate Completed Six-Month Periods

↓

Fetch Emoluments

↓

Compute Gross Gratuity

↓

Apply Multiplication Limit

↓

Fetch Ceiling from tables/gratuity-ceiling.md

↓

Apply Ceiling

↓

Round Final Amount

↓

Return Result

---

# Test Cases

| Case                          | Expected Result                   |
| ----------------------------- | --------------------------------- |
| 4 Years Service               | Not Eligible                      |
| 5 Years Service               | Eligible                          |
| High Salary exceeding ceiling | Ceiling Applied                   |
| Promotion in last year        | Updated emoluments considered     |
| Invalid Retirement            | Rule-specific eligibility checked |
| Compulsory Retirement         | Rule-specific eligibility checked |

---

# Common Mistakes

❌ Using Gross Salary instead of Emoluments.

❌ Using Calendar Service instead of Qualifying Service.

❌ Ignoring completed six-month periods.

❌ Ignoring 16½ times emoluments limit.

❌ Hardcoding gratuity ceiling in code.

---

# References

- Railway Services (Pension) Rules, 1993 – Rule 49
- Railway Services (Pension) Rules, 1993 – Rule 69
- Railway Services (Pension) Rules, 1993 – Rule 70
- Railway Board circulars revising gratuity ceilings

---

# Revision History

Version 1.0

Initial verified specification based on Railway Services (Pension) Rules.
