# Retirement Date

Version: 1.0

Module ID: COMMON-RD-001

Status: VERIFIED (Core Rules)

---

# Purpose

This document defines how the official retirement date of a Railway employee is determined.

The retirement date is one of the most important inputs because it affects:

- Qualifying Service
- Pension
- Retirement Gratuity
- Leave Encashment
- Family Pension
- Commutation
- Settlement Benefits
- RELHS Eligibility
- Pass Eligibility

---

# Used By

- common/qualifying-service.md
- common/service-rounding.md
- rules/pension.md
- rules/retirement-gratuity.md
- rules/death-gratuity.md
- rules/leave-encashment.md

---

# Definition

Retirement Date is the official date on which an employee ceases to be in Railway service under the applicable rules.

This date is NOT always the employee's birthday.

---

# Inputs Required

Employee ID

Date of Birth

Date of Appointment

Retirement Type

Retirement Age

Extension Order (if any)

Court Order (if any)

Voluntary Retirement Order (if applicable)

Medical Invalidation Order (if applicable)

Death Date (if applicable)

---

# Retirement Types

- Superannuation
- Voluntary Retirement
- Premature Retirement
- Compulsory Retirement
- Medical Invalidation
- Death while in Service
- Resignation
- Removal
- Dismissal

Each retirement type has its own retirement date determination.

---

# Superannuation Retirement

## Rule 1

If Date of Birth is on the **1st day of a month**:

Retirement Date = Last day of the PREVIOUS month.

Example

Date of Birth

01-07-1966

Retirement Age

60 Years

Retirement Date

30-06-2026

---

## Rule 2

If Date of Birth is on any day OTHER THAN the 1st:

Retirement Date = Last day of the month in which the employee attains the retirement age.

Example

Date of Birth

15-07-1966

Retirement Age

60 Years

Retirement Date

31-07-2026

---

# Voluntary Retirement

Retirement Date is determined by the competent authority's acceptance order and the applicable notice requirements.

Do not calculate automatically without the approval order.

---

# Medical Invalidation

Retirement Date is the effective date mentioned in the Medical Invalidation Order.

---

# Compulsory Retirement

Retirement Date is the effective date specified in the competent authority's order.

---

# Death while in Service

Retirement Date is not applicable.

Use:

Date of Death

as the service termination date.

---

# Resignation

Use the effective resignation acceptance date.

---

# Removal

Use the effective removal order date.

---

# Dismissal

Use the effective dismissal order date.

---

# Extension of Service

If an extension of service is legally approved,

Retirement Date shall be modified according to the extension order.

Never extend automatically.

---

# Leap Year

Example

Date of Birth

29-02-1968

Retirement Age

60

The retirement date shall be determined according to the applicable rules governing leap-year birthdays.

---

# Validation Rules

Date of Birth is mandatory.

Appointment Date is mandatory.

Retirement Type is mandatory.

Retirement Age is mandatory.

Retirement Date cannot be before Appointment Date.

Retirement Date cannot be before Date of Birth.

Retirement Age must be valid.

Extension Orders must be validated.

Court Orders must be validated.

---

# Edge Cases

## Employee born on 1st

Retires on previous month's last day.

---

## Employee born on last day of month

Retires on the last day of the retirement month.

---

## Leap Year Birth

Requires special handling.

---

## Death before Retirement

Use Date of Death.

Ignore superannuation calculation.

---

## Voluntary Retirement Withdrawn

If withdrawal is accepted,

ignore VRS calculation.

---

## Court Stay

Retirement Date must follow the final legal order.

---

## Service Extension

Replace calculated date with approved extension date.

---

# Programming Logic

Input

↓

Validate Date of Birth

↓

Determine Retirement Type

↓

Determine Applicable Retirement Age

↓

Apply Retirement Rules

↓

Check Extension

↓

Check Court Orders

↓

Return Retirement Date

---

# Returned Object

```json
{
  "retirementType": "",
  "retirementDate": "",
  "calculationMethod": "",
  "retirementAge": 60
}
```

---

# Examples

## Example 1

DOB

01-08-1966

Age

60

Result

31-07-2026

---

## Example 2

DOB

20-08-1966

Age

60

Result

31-08-2026

---

## Example 3

Voluntary Retirement

Notice Accepted

Effective Date

15-03-2027

Result

15-03-2027

---

## Example 4

Death while in Service

Date of Death

10-04-2026

Service Termination Date

10-04-2026

---

# Error Conditions

Missing Date of Birth

Missing Retirement Type

Invalid Retirement Age

Invalid Extension Order

Retirement Date before Appointment Date

Future Date of Birth

Negative Age

---

# Common Mistakes

❌ Using Birthday as Retirement Date.

❌ Ignoring the "born on the 1st" rule.

❌ Ignoring approved service extensions.

❌ Ignoring retirement type.

❌ Calculating VRS automatically without the approval order.

---

# Dependencies

common/date-rules.md

common/validation-rules.md

common/retirement-age.md

---

# Related Modules

common/qualifying-service.md

rules/pension.md

rules/retirement-gratuity.md

rules/leave-encashment.md

rules/family-pension.md

---

# Future Enhancements

- Category-wise retirement ages
- Historical rule changes
- Automatic retirement calendar generation
- Rule versioning
- Court-order overrides

---

# Revision History

Version 1.0

Initial production-ready structure.
