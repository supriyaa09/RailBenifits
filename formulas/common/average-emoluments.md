# Average Emoluments

Version: 1.0

Module ID: COMMON-AE-001

Status: VERIFIED

Authority:
- Railway Services (Pension) Rules
- Rule 50
- Related Railway Board Circulars (where applicable)

---

# Purpose

This module defines how **Average Emoluments** are calculated for Railway retirement benefits.

Average Emoluments are used in benefits where the Pension Rules prescribe the average of the emoluments drawn during the last ten months instead of using only the last Basic Pay.

This module SHALL NOT be used where the applicable rule specifically requires Last Basic Pay.

---

# Used By

- Pension (where applicable)
- Family Pension (reference where applicable)
- Commutation (indirectly through pension)
- Other benefits prescribed by Railway Pension Rules

---

# Definition

Average Emoluments mean the average of the emoluments drawn during the last ten completed months immediately preceding retirement.

The calculation must always use the emoluments defined in:

common/emoluments.md

This module never calculates emoluments itself.

---

# Dependencies

common/emoluments.md

common/qualifying-service.md

common/validation-rules.md

---

# Inputs Required

Employee ID

Retirement Date

Scheme

Monthly Pay History

Promotion Orders

Pay Revision Orders

Leave Records

Suspension Records

Running Staff Status

---

# Formula

Average Emoluments

=

Sum of admissible emoluments drawn during the last 10 completed months

÷

10

---

# Mathematical Formula

AE = (M1 + M2 + M3 + M4 + M5 + M6 + M7 + M8 + M9 + M10) / 10

Where

M1 ... M10

represent admissible monthly emoluments.

---

# Calculation Process

Step 1

Determine Retirement Date.

↓

Step 2

Identify the last ten completed months.

↓

Step 3

Fetch emoluments for each month.

↓

Step 4

Validate every month's pay.

↓

Step 5

Replace inadmissible values using applicable rules.

↓

Step 6

Calculate total.

↓

Step 7

Divide by 10.

↓

Return Average Emoluments.

---

# Monthly Data Required

For every month:

Month

Basic Pay

Running Pay Element (if applicable)

Stagnation Increment

Admissible Pay

Leave Status

Suspension Status

Remarks

---

# Validation Rules

Exactly ten months must be evaluated.

Monthly pay cannot be negative.

Missing records must be investigated.

Duplicate records are not permitted.

Promotion orders must be validated.

Pay revisions must be validated.

---

# Special Cases

## Promotion During Last 10 Months

If pay changes because of promotion, use the admissible emoluments for each respective month.

Do NOT overwrite previous months with the promoted pay.

---

## Annual Increment

If an increment becomes effective during the ten-month period, calculate each month using the admissible pay for that month.

---

## Leave

Use the admissible emoluments according to the applicable leave rules.

---

## Suspension

Determine admissible pay under the Pension Rules before calculating the average.

---

## Running Staff

Include Running Pay Element where applicable.

---

## Stagnation Increment

Include if admissible under the applicable rules.

---

## Retrospective Pay Revision

If the employee becomes entitled to revised pay for any of the ten months, recompute Average Emoluments according to the applicable order.

---

# Edge Cases

Employee retires immediately after promotion.

Employee receives increment in the final month.

Employee remains on leave for several months.

Employee has missing salary records.

Employee has revised pay after retirement.

Employee has suspension later regularized.

Running Staff during part of the period.

---

# Scheme Applicability

OPS

Average Emoluments are used where prescribed under the Pension Rules.

UPS

Benefit-specific.

See UPS modules.

NPS

Generally contribution-based.

Average Emoluments apply only where explicitly required by Railway rules.

---

# Programming Logic

Input

↓

Identify Last 10 Months

↓

Fetch Monthly Emoluments

↓

Validate Records

↓

Apply Rule Corrections

↓

Calculate Average

↓

Return Result

---

# Returned Object

```json
{
  "monthsEvaluated": 10,
  "monthlyEmoluments": [],
  "totalEmoluments": 0,
  "averageEmoluments": 0
}
```

---

# Example 1

Monthly Emoluments

₹78,800 for all ten months

Average

₹78,800

---

# Example 2

Months 1–5

₹78,800

Months 6–10

₹81,200

Average

((78,800 × 5) + (81,200 × 5)) ÷ 10

=

₹80,000

---

# Error Conditions

Missing Pay History

Less Than Ten Months Available

Negative Monthly Pay

Duplicate Monthly Records

Missing Promotion Order

Missing Pay Revision Order

---

# Common Mistakes

Using Last Basic Pay instead of Average Emoluments.

Ignoring promotions during the ten-month period.

Ignoring revised pay.

Using gross salary instead of emoluments.

Including inadmissible allowances.

---

# Related Modules

common/emoluments.md

common/qualifying-service.md

rules/pension.md

rules/family-pension.md

rules/commutation.md

---

# Revision History

Version 1.0

Initial verified document based on Rule 50 of the Railway Services (Pension) Rules.

Future revisions will include rule-specific exceptions, historical amendments, and implementation examples.