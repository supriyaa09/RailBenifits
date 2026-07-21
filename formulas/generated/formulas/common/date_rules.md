# Date Rules

Version: 1.0

Module ID: COMMON-DR-001

Status: VERIFIED (Core Date Logic)

---

# Purpose

This document defines all common date-related rules used throughout the Railway Benefits Calculation Engine.

Every module that performs date calculations must use these rules instead of implementing its own date logic.

This ensures consistency across pension, gratuity, leave encashment, family pension, commutation, and other benefit calculations.

---

# Used By

- common/qualifying-service.md
- common/retirement-date.md
- common/service-rounding.md
- common/pay-history.md
- rules/pension/*
- rules/gratuity/*
- rules/family-pension/*
- rules/commutation/*
- rules/leave/*
- rules/settlement/*

---

# Purpose of this Module

Provides standardized methods for:

- Age Calculation
- Date Difference
- Completed Years
- Completed Months
- Completed Days
- Leap Year Handling
- End of Month Calculation
- First Day of Month Rules
- Month Length Determination

---

# Standard Date Format

All dates shall use the ISO-8601 format.

Example

```
YYYY-MM-DD
```

Example

```
2026-07-31
```

---

# Supported Date Types

Date of Birth

Date of Appointment

Date of Retirement

Date of Death

Date of Promotion

Date of Increment

Date of Suspension

Date of Leave

Date of Rejoining

Effective Date of Orders

---

# Rule DR-001

Age Calculation

Age shall be calculated from

Date of Birth

to

Reference Date

Result

Completed Years

Only completed years shall be considered unless a specific rule requires months or days.

---

# Rule DR-002

Completed Years

A year is completed only when the anniversary date has passed.

Example

DOB

15-08-1966

Reference

14-08-2026

Completed Years

59

Reference

15-08-2026

Completed Years

60

---

# Rule DR-003

Completed Months

Months shall be counted only after full completion.

Partial months shall not be treated as completed months.

---

# Rule DR-004

Completed Days

Actual calendar days shall be used.

Do not assume every month contains 30 days.

---

# Rule DR-005

Date Difference

Date Difference shall be calculated using actual calendar dates.

Result

Years

Months

Days

Example

Appointment

01-07-1995

Retirement

31-07-2026

Result

31 Years

0 Months

30 Days

---

# Rule DR-006

Leap Year

Leap years shall follow the Gregorian Calendar.

A year is a leap year if:

- Divisible by 4
- Except divisible by 100
- Unless divisible by 400

Examples

2024

Leap Year

2025

Not Leap Year

2100

Not Leap Year

2000

Leap Year

---

# Rule DR-007

Month Length

January

31

February

28 or 29

March

31

April

30

May

31

June

30

July

31

August

31

September

30

October

31

November

30

December

31

---

# Rule DR-008

Last Day of Month

Determine the actual last calendar day.

Examples

February 2025

28

February 2024

29

April

30

July

31

---

# Rule DR-009

First Day of Month Rule

For superannuation retirement,

if Date of Birth falls on the first day of a month,

the retirement date shall be determined according to the applicable Railway retirement rules.

Refer:

common/retirement-date.md

---

# Rule DR-010

Future Dates

Date of Birth

shall never be in the future.

Appointment Date

shall never be after Retirement Date.

Death Date

shall never be before Appointment Date.

---

# Rule DR-011

Chronological Order

The following sequence shall always be maintained.

Date of Birth

↓

Appointment Date

↓

Promotions

↓

Retirement / Death / Resignation

Any violation shall generate an error.

---

# Validation Rules

Date format must be valid.

Invalid dates are not allowed.

Examples

2026-02-30 ❌

2026-13-10 ❌

2026-00-15 ❌

---

# Edge Cases

## Leap Day Birth

Date of Birth

29-02

Requires leap-year handling according to applicable rules.

---

## Retirement on Month End

Use the actual last calendar day.

---

## Multiple Orders on Same Date

Apply according to effective order priority.

---

## Missing Date

Mandatory dates shall generate validation errors.

---

# Programming Functions

Recommended reusable functions.

calculateAge()

calculateService()

daysBetween()

monthsBetween()

yearsBetween()

isLeapYear()

lastDayOfMonth()

firstDayOfMonth()

isValidDate()

compareDates()

---

# Returned Object

```json
{
  "years": 0,
  "months": 0,
  "days": 0,
  "isLeapYear": false,
  "lastDayOfMonth": 31
}
```

---

# Test Cases

| Input      | Expected Result |
| ---------- | --------------- |
| 2024       | Leap Year       |
| 2025       | Not Leap Year   |
| Feb 2024   | 29 Days         |
| Feb 2025   | 28 Days         |
| 2026-02-30 | Invalid Date    |
| 2026-07-31 | Valid Date      |

---

# Common Mistakes

❌ Assuming every month has 30 days.

❌ Ignoring leap years.

❌ Calculating age using fractional years.

❌ Using approximate date differences.

❌ Accepting invalid calendar dates.

---

# Dependencies

None

This is a foundational utility module.

---

# Related Modules

common/retirement-date.md

common/qualifying-service.md

common/service-rounding.md

common/pay-history.md

---

# Revision History

Version 1.0

Initial standardized date calculation rules for the Railway Benefits Calculation Engine.
