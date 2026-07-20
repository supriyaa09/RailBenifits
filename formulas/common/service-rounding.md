# Service Rounding

Version: 1.0

Module ID: COMMON-SR-001

Status: VERIFIED

Authority

- Railway Services (Pension) Rules
- Rule 69
- Rule 70

---

# Purpose

Defines how qualifying service is rounded before calculating retirement benefits.

This module SHALL be used by every calculation that depends on completed service.

---

# Used By

- Pension
- Retirement Gratuity
- Service Gratuity
- Death Gratuity
- Commutation
- Family Pension
- Qualifying Service

---

# Important Principle

Service is NOT always calculated using exact years, months and days.

Many Railway retirement benefits use:

Completed Six-Month Periods

instead of

Exact Calendar Service.

---

# Definitions

## Calendar Service

Actual difference between

Appointment Date

and

Retirement Date.

---

## Qualifying Service

Calendar Service

minus

Non-qualifying periods

plus

Admissible service

---

## Completed Six-Month Period

A block of six months used for pensionary calculations.

---

# General Rounding Rule

If the remaining fraction of a year is

Less than 3 months

↓

Ignore

---

If the remaining fraction is

3 months or more

↓

Treat it as one completed six-month period.

---

# Examples

Example 1

Service

20 Years

2 Months

Result

20 Years

(No additional six-month period)

---

Example 2

Service

20 Years

3 Months

Result

20 Years + One Completed Six-Month Period

---

Example 3

Service

20 Years

5 Months

Result

20 Years + One Completed Six-Month Period

---

Example 4

Service

20 Years

8 Months

Result

20 Years + One Completed Six-Month Period

Remaining 2 months ignored.

---

Example 5

Service

20 Years

11 Months

Result

20 Years + Two Completed Six-Month Periods

---

# Retirement Gratuity

Retirement Gratuity is calculated

per

Completed Six-Month Period.

Formula

Retirement Gratuity

=

1/4 × Emoluments × Completed Six-Month Periods

Subject to the applicable maximum.

---

# Service Gratuity

Service Gratuity also depends upon completed qualifying service.

---

# Pension

Qualifying Service shall first be rounded according to Railway Rules before pension eligibility is determined.

---

# Validation Rules

Qualifying Service cannot be negative.

Service cannot exceed retirement date.

Excluded service must already be removed.

Only qualifying service shall be rounded.

Do NOT round calendar service directly.

---

# Edge Cases

## Exactly 3 Months

Counts as one completed six-month period.

---

## Less than 3 Months

Ignored.

---

## Exactly 6 Months

One completed six-month period.

---

## Exactly 9 Months

One year (Two completed six-month periods).

---

## Leap Year

Leap day does not change the rounding principle.

---

## Death While in Service

Calculate qualifying service up to the date of death before applying rounding rules.

---

## Voluntary Retirement

Apply the same rounding principle after determining admissible qualifying service.

---

# Programming Logic

Input

↓

Calculate Calendar Service

↓

Subtract Non-Qualifying Service

↓

Determine Qualifying Service

↓

Apply Railway Rounding Rules

↓

Return

Years

Months

Completed Six-Month Periods

---

# Returned Object

```json
{
  "qualifyingYears": 20,
  "qualifyingMonths": 5,
  "completedSixMonthlyPeriods": 41
}
```

---

# Test Cases

| Calendar Service | Rounded Result |
|------------------|----------------|
| 20Y 2M | 20 Years |
| 20Y 3M | 20Y + 1 Half-Year |
| 20Y 5M | 20Y + 1 Half-Year |
| 20Y 6M | 20Y + 1 Half-Year |
| 20Y 8M | 20Y + 1 Half-Year |
| 20Y 9M | 20Y + 2 Half-Years |
| 20Y 11M | 20Y + 2 Half-Years |

---

# Common Mistakes

❌ Rounding total service before excluding non-qualifying periods.

❌ Using calendar years instead of qualifying service.

❌ Ignoring the 3-month rule.

❌ Using completed years instead of completed six-month periods for gratuity.

---

# Dependencies

common/qualifying-service.md

common/date-rules.md

common/retirement-date.md

---

# Related Modules

rules/pension.md

rules/retirement-gratuity.md

rules/service-gratuity.md

rules/death-gratuity.md

---

# Revision History

Version 1.0

Verified against Rule 69 and Rule 70 of the Railway Services (Pension) Rules.