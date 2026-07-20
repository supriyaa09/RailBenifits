# Service Gratuity

Version: 1.0

Module ID: RULE-GRA-003

Status: VERIFIED

Authority

- Railway Services (Pension) Rules, 1993
- Rule 69 – Pension and Service Gratuity
- Rule 49 – Emoluments
- Relevant Railway Board Circulars

---

# Purpose

This document defines the eligibility, calculation methodology,
business rules, validation rules, and implementation logic for
Service Gratuity payable to Railway employees who retire without
earning pension but satisfy the conditions prescribed under the
Railway Services (Pension) Rules.

---

# Applicability

Applicable

- Superannuation Retirement
- Voluntary Retirement
- Invalid Retirement
- Compulsory Retirement

Only when pension is NOT admissible.

---

# Not Applicable

- Death while in Service
- Death after Retirement
- Retirement Gratuity Cases
- Family Pension Cases

---

# Dependencies

common/emoluments.md

common/qualifying_service.md

common/validation_rules.md

---

# Eligibility

Service Gratuity is admissible when

- Employee retires under admissible retirement rules.
- Pension is NOT admissible because the employee has not completed the minimum qualifying service required for pension.
- Employee has completed qualifying service for which service gratuity is admissible under the applicable rules.

---

# Inputs

Employee ID

Retirement Type

Retirement Date

Qualifying Service

Emoluments

Pension Eligibility

---

# Output

```json
{
    "eligible": true,
    "qualifyingService": "",
    "emoluments": 0,
    "completedHalfYears": 0,
    "grossServiceGratuity": 0,
    "payableServiceGratuity": 0
}
```

---

# Definitions

## Emoluments

Shall be determined according to

common/emoluments.md

---

## Qualifying Service

Shall be determined according to

common/qualifying_service.md

---

## Pension Eligibility

Must be determined before calculating Service Gratuity.

If Pension Eligible = TRUE

↓

Service Gratuity = NOT PAYABLE

---

# Formula

Service Gratuity

=

½ × Emoluments × Completed Six-Month Periods

---

# Variables

| Variable | Description |
|-----------|-------------|
| E | Emoluments |
| CSP | Completed Six-Month Periods |
| SG | Service Gratuity |

Formula

SG = (E × CSP) / 2

---

# Calculation Steps

Step 1

Validate Employee Information

↓

Step 2

Determine Qualifying Service

↓

Step 3

Check Pension Eligibility

↓

If Pension Eligible

↓

Stop

Return

Not Eligible

↓

Else

Calculate Completed Six-Month Periods

↓

Fetch Emoluments

↓

Calculate Service Gratuity

↓

Return Final Amount

---

# Business Rules

## BR-001

Pension eligibility shall always be checked before calculating Service Gratuity.

---

## BR-002

Only qualifying service shall be considered.

---

## BR-003

Completed six-month periods shall be calculated using

common/service_rounding.md

---

## BR-004

Emoluments shall be determined according to Rule 49.

---

## BR-005

Service Gratuity and Pension shall not both be paid for the same retirement.

---

# Special Cases

## Invalid Retirement

Eligible if pension is not admissible and applicable rules permit payment.

---

## Voluntary Retirement

Apply only if pension is not admissible.

---

## Court Orders

Court directions shall prevail wherever applicable.

---

# Validation Rules

Retirement Type must be valid.

Qualifying Service must be valid.

Emoluments > 0

Pension Eligibility determined.

---

# Worked Example

Employee

Qualifying Service

8 Years

Completed Six-Month Periods

16

Emoluments

₹60,000

Calculation

Service Gratuity

=

60,000 × 16 ÷ 2

=

₹4,80,000

---

# Edge Cases

Employee completes exactly the minimum qualifying service for pension.

↓

No Service Gratuity.

---

Employee has insufficient qualifying service.

↓

Service Gratuity payable if admissible.

---

Retrospective qualifying service revision.

↓

Recalculate eligibility and amount.

---

# Programming Logic

Validate Inputs

↓

Determine Qualifying Service

↓

Check Pension Eligibility

↓

If Eligible for Pension

↓

Return

Not Applicable

↓

Else

Calculate Completed Six-Month Periods

↓

Calculate Service Gratuity

↓

Return Result

---

# Test Cases

| Case | Expected Result |
|------|-----------------|
| Pension Eligible | Service Gratuity Not Payable |
| Not Pension Eligible | Service Gratuity Calculated |
| Invalid Retirement | Rule-specific eligibility checked |
| Zero Emoluments | Validation Error |

---

# Common Mistakes

❌ Calculating Service Gratuity without checking pension eligibility.

❌ Using calendar service instead of qualifying service.

❌ Using retirement gratuity formula.

❌ Ignoring completed six-month periods.

---

# References

- Railway Services (Pension) Rules, 1993 – Rule 49
- Railway Services (Pension) Rules, 1993 – Rule 69

---

# Revision History

Version 1.0

Initial verified specification based on Railway Services (Pension) Rules.