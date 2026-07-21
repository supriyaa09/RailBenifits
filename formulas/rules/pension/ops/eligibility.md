# OPS Pension Eligibility

Version: 1.0

Module ID: OPS-ELG-001

Status: VERIFIED

---

# Authority

Primary References

- Railway Services (Pension) Rules, 1993
- Railway Board Circulars
- Department of Pension & Pensioners' Welfare (DoP&PW) Orders (where adopted by Railways)

---

# Purpose

This document defines the eligibility rules for pension under the Old Pension Scheme (OPS).

Its purpose is to determine whether an employee qualifies for OPS pension before any pension calculation is performed.

This module does NOT calculate pension.

---

# Scope

This module is responsible for

- Identifying whether the employee belongs to OPS.
- Verifying retirement eligibility.
- Validating qualifying service.
- Identifying disqualifying conditions.
- Returning an eligibility decision.

This module shall always execute before

ops/calculation.md

---

# Dependencies

common/qualifying_service.md

common/retirement_date.md

common/validation_rules.md

common/date_rules.md

---

# Inputs

Employee ID

Employee Name

Date of Birth

Date of Appointment

Retirement Date

Retirement Type

Pension Scheme

Qualifying Service

Employee Status

Disciplinary Status

Court Orders (if any)

---

# Output

```json
{
  "eligible": true,
  "scheme": "OPS",
  "reason": "",
  "ruleId": ""
}
```

---

# Definitions

## Old Pension Scheme (OPS)

The defined-benefit pension scheme applicable to eligible Railway employees covered under the relevant Railway pension provisions.

---

## Qualifying Service

Service counted for pension as determined by

common/qualifying_service.md

---

## Retirement Types

Supported retirement events

- Superannuation
- Voluntary Retirement
- Compulsory Retirement
- Invalid Retirement

---

# Business Rules

---

## OPS-ELG-001

Employee shall belong to the

Old Pension Scheme (OPS).

If

Scheme ≠ OPS

↓

Result

Not Eligible

---

## OPS-ELG-002

Employee shall retire under an admissible retirement category.

Allowed

- Superannuation
- Voluntary Retirement
- Compulsory Retirement
- Invalid Retirement

Else

Not Eligible

---

## OPS-ELG-003

Employee shall satisfy the qualifying service requirement applicable under the governing Railway pension rules.

The exact qualifying service threshold shall be determined according to the applicable rule version.

---

## OPS-ELG-004

Qualifying Service shall be determined only using

common/qualifying_service.md

---

## OPS-ELG-005

Employee shall have a valid Retirement Date.

Reference

common/retirement_date.md

---

## OPS-ELG-006

Employee shall not be dismissed from service where pension has been forfeited under applicable rules.

---

## OPS-ELG-007

Employee shall not be removed from service where pension is not admissible under applicable rules.

---

## OPS-ELG-008

Court Orders shall override normal eligibility whenever legally applicable.

---

## OPS-ELG-009

Employee information shall pass all validation rules before eligibility is determined.

---

# Eligibility Matrix

| Condition                        | Result             |
| -------------------------------- | ------------------ |
| Scheme = OPS                     | Continue           |
| Scheme ≠ OPS                     | Not Eligible       |
| Valid Retirement Type            | Continue           |
| Invalid Retirement Type          | Not Eligible       |
| Qualifying Service Satisfied     | Continue           |
| Qualifying Service Not Satisfied | Not Eligible       |
| Dismissal with forfeiture        | Not Eligible       |
| Valid Court Override             | Follow Court Order |

---

# Decision Tree

Start

↓

Validate Employee

↓

Is Scheme = OPS?

↓

No

↓

Reject

↓

Yes

↓

Validate Retirement Type

↓

Validate Qualifying Service

↓

Check Disciplinary Status

↓

Check Court Orders

↓

Eligible

---

# Validation Rules

Employee ID mandatory

Retirement Type mandatory

Pension Scheme mandatory

Retirement Date mandatory

Qualifying Service mandatory

Employee Status mandatory

---

# Examples

## Example 1

Scheme

OPS

Retirement

Superannuation

Qualifying Service

Satisfied

Result

Eligible

---

## Example 2

Scheme

NPS

Result

Not Eligible

Rule

OPS-ELG-001

---

## Example 3

Scheme

OPS

Retirement

Dismissal with pension forfeiture

Result

Not Eligible

Rule

OPS-ELG-006

---

# Edge Cases

Employee reinstated after court order.

↓

Follow final court order.

---

Retrospective service regularization.

↓

Recalculate qualifying service.

---

Correction in Date of Birth.

↓

Recalculate retirement eligibility.

---

Retrospective appointment regularization.

↓

Recompute qualifying service.

---

# Programming Logic

Validate Inputs

↓

Validate Scheme

↓

Validate Retirement Type

↓

Validate Qualifying Service

↓

Validate Disciplinary Status

↓

Apply Court Orders

↓

Return Eligibility Result

---

# JSON Response

```json
{
  "eligible": true,
  "ruleId": "OPS-ELG-003",
  "reason": "Employee satisfies OPS eligibility conditions."
}
```

---

# Test Cases

| Test Case                | Expected Result             |
| ------------------------ | --------------------------- |
| OPS + Superannuation     | Eligible                    |
| OPS + Invalid Retirement | Eligible (subject to rules) |
| NPS Employee             | Not Eligible                |
| UPS Employee             | Not Eligible                |
| Invalid Retirement Type  | Not Eligible                |
| Pension Forfeited        | Not Eligible                |
| Court Override           | Court Decision Applied      |

---

# References

- Railway Services (Pension) Rules, 1993
- Railway Board Circulars
- DoP&PW Orders (where adopted by Railways)

---

# Revision History

Version 1.0

Initial OPS Pension Eligibility specification.
