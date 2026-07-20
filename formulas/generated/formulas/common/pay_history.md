# Pay History

Version: 1.0

Module ID: COMMON-PH-001

Status: VERIFIED (Architecture)

Purpose

Standardize employee monthly pay records used in retirement benefit calculations.

This module does NOT calculate benefits.

It only provides validated monthly pay information to other calculation modules.

---

# Used By

- common/basic-pay.md
- common/emoluments.md
- common/average-emoluments.md
- rules/pension.md
- rules/retirement-gratuity.md
- rules/death-gratuity.md
- rules/family-pension.md
- rules/commutation.md

---

# Description

Pay History represents the chronological salary record of an employee from the date of appointment until retirement, death, resignation, or any other terminal event.

Every monetary calculation must use this module instead of maintaining separate salary records.

---

# Inputs

Employee ID

Date of Appointment

Date of Retirement

Pay Level

Pay Matrix Cell

Monthly Basic Pay

Annual Increment

Promotion Orders

MACP Orders

Pay Revision Orders

Running Staff Status

Stagnation Increment

Leave Records

Suspension Records

Remarks

---

# Monthly Record Structure

Each month shall contain:

Month

Year

Basic Pay

Pay Level

Pay Matrix Cell

Annual Increment

Promotion Applied

MACP Applied

Pay Revision Applied

Running Staff Flag

Stagnation Increment

Leave Status

Suspension Status

Remarks

---

# Example Record

```json
{
  "month": "2026-03",
  "basicPay": 78800,
  "payLevel": "11",
  "payMatrixCell": "8",
  "annualIncrement": false,
  "promotionApplied": false,
  "macpApplied": false,
  "payRevisionApplied": false,
  "runningStaff": false,
  "stagnationIncrement": 0,
  "leaveStatus": "DUTY",
  "suspensionStatus": "NONE"
}
```

---

# Validation Rules

Every month must have only one active record.

No duplicate month entries.

No negative Basic Pay.

Pay Level is mandatory.

Pay Matrix Cell is mandatory.

Promotion order must exist before promoted pay is accepted.

MACP order must exist before MACP benefit is accepted.

Pay revision must reference an applicable order.

Leave status must be valid.

Suspension status must be valid.

---

# Supported Events

Annual Increment

Promotion

MACP

Pay Revision

Transfer

Leave

Suspension

Running Staff Status Change

Retirement

Death

---

# Event Priority

If multiple events occur in the same month:

1. Pay Revision
2. Promotion
3. MACP
4. Annual Increment
5. Running Staff Adjustment

Only admissible changes shall be reflected.

---

# Edge Cases

## Promotion during month

Apply according to the effective date.

---

## Increment withheld

Do not increase Basic Pay until restored.

---

## Retrospective Promotion

Reconstruct affected monthly records according to the order.

---

## Retrospective Pay Revision

Update all eligible months.

---

## Leave Without Pay

Determine admissible pay under applicable rules.

---

## Suspension

Determine admissible pay after regularization.

---

## Death in Service

Last record ends on date of death.

---

## Retirement

Last record ends on retirement date.

---

# Dependencies

common/basic-pay.md

common/date-rules.md

common/validation-rules.md

---

# Programming Flow

Employee

↓

Fetch Monthly Records

↓

Sort Chronologically

↓

Validate Records

↓

Apply Orders

↓

Generate Final Monthly Timeline

↓

Return Pay History

---

# Returned Object

```json
{
  "employeeId": "",
  "records": [],
  "lastBasicPay": 0,
  "averageEmolumentsEligible": true,
  "lastUpdated": ""
}
```

---

# Test Cases

Case 1

No promotion during service.

Expected:
Stable pay history.

---

Case 2

Promotion in final year.

Expected:
Pay updated from effective date only.

---

Case 3

Retrospective pay revision.

Expected:
Historical months recalculated.

---

Case 4

Running Staff becomes non-running.

Expected:
Running Staff flag changes from effective date.

---

Case 5

Increment withheld.

Expected:
No increase until restoration.

---

# Common Mistakes

❌ Using Gross Salary instead of Basic Pay.

❌ Applying promotion before its effective date.

❌ Ignoring retrospective pay revisions.

❌ Maintaining duplicate monthly records.

❌ Ignoring MACP orders.

---

# Related Modules

common/basic-pay.md

common/emoluments.md

common/average-emoluments.md

rules/pension.md

rules/retirement-gratuity.md

---

# Revision History

Version 1.0

Initial standardized pay history model for the Railway Benefits Calculation Engine.
