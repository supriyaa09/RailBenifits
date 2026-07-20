# Basic Pay

Version: 1.0

Module ID: COMMON-BP-001

Status: VERIFIED (Structure)
Verification Level: Rule references to be cross-checked against applicable Railway Pay Rules and Pension Rules.

---

# Purpose

This document defines **Basic Pay** for the Railway Benefits Calculation Engine.

Basic Pay is one of the primary inputs used in retirement benefit calculations.

It serves as the foundation for:

- Emoluments
- Average Emoluments
- Pension
- Retirement Gratuity
- Death Gratuity
- Family Pension
- Commutation
- Leave Encashment (where applicable)
- CGEGIS (where applicable)

---

# Used By

- common/emoluments.md
- common/average-emoluments.md
- rules/pension.md
- rules/retirement-gratuity.md
- rules/death-gratuity.md
- rules/family-pension.md
- rules/commutation.md

---

# Definition

Basic Pay is the pay drawn by a Railway employee in the applicable Pay Level / Pay Matrix immediately before retirement, death, or other terminal event, as determined under the applicable Railway pay rules.

Basic Pay does NOT automatically include allowances.

---

# Formula

Basic Pay

=

Current Pay in Pay Matrix

+

Admissible Increment(s)

where applicable.

---

# NOT Included

The following are NOT Basic Pay unless specifically provided by rules:

- Dearness Allowance (DA)
- House Rent Allowance (HRA)
- Transport Allowance (TA)
- Night Duty Allowance
- Overtime Allowance
- Bonus
- Incentives
- Honorarium
- Daily Allowance
- Travelling Allowance

---

# Inputs Required

Employee ID

Employee Name

Employee Category

Pension Scheme

Pay Level

Pay Matrix Cell

Current Basic Pay

Date of Appointment

Date of Retirement

Promotion History

Increment History

Pay Revision Orders

Running Staff Status

---

# Output

```json
{
    "basicPay": 0,
    "payLevel": "",
    "payMatrixCell": "",
    "effectiveDate": ""
}
```

---

# Validation Rules

Basic Pay is mandatory.

Basic Pay must be numeric.

Basic Pay cannot be negative.

Basic Pay cannot be zero for a serving employee.

Pay Level must exist.

Pay Matrix Cell must exist.

Promotion history must be validated.

Increment history must be validated.

Pay revision orders must be applied before calculation.

---

# Calculation Flow

Validate Employee

↓

Validate Pay Records

↓

Determine Applicable Pay Matrix

↓

Apply Promotion Orders

↓

Apply Annual Increment

↓

Apply Pay Revision (if applicable)

↓

Determine Final Basic Pay

↓

Return Basic Pay

---

# Edge Cases

## Promotion Before Retirement

If promotion takes effect before retirement and revised pay is admissible, use the revised Basic Pay.

---

## Annual Increment

If an annual increment becomes effective before retirement, update the Basic Pay according to the applicable rules.

---

## Pay Revision

If a pay revision becomes effective before retirement, Basic Pay must be recalculated.

---

## Retrospective Pay Revision

Recalculate only when the employee becomes legally entitled under the applicable order.

---

## Employee on Leave

Determine Basic Pay according to the applicable leave rules.

Do not assume leave changes Basic Pay.

---

## Employee Under Suspension

Determine admissible pay according to the applicable order before calculating retirement benefits.

---

## Running Staff

Basic Pay remains Basic Pay.

Additional Running Pay Element is handled separately in:

common/emoluments.md

---

## Stagnation Increment

If admissible, include according to the applicable Railway pay rules.

---

## Death While in Service

Use the admissible Basic Pay on the date of death.

---

# Dependencies

common/pay-history.md

common/validation-rules.md

common/date-rules.md

---

# Programming Logic

Input

↓

Fetch Employee Pay History

↓

Validate Records

↓

Apply Promotions

↓

Apply Increments

↓

Apply Pay Revisions

↓

Determine Basic Pay

↓

Return Result

---

# Returned Object

```json
{
    "basicPay": 78800,
    "currency": "INR",
    "payLevel": "Level-11",
    "effectiveDate": "YYYY-MM-DD"
}
```

---

# Example 1

Employee

Level-11

Current Basic Pay

₹78,800

Result

Basic Pay = ₹78,800

---

# Example 2

Employee promoted one month before retirement.

Old Basic Pay

₹78,800

New Basic Pay

₹81,200

Promotion effective before retirement.

Result

Basic Pay = ₹81,200

---

# Error Conditions

Missing Pay Record

Missing Pay Level

Invalid Pay Matrix Cell

Negative Basic Pay

Missing Promotion Order

Invalid Increment Date

Duplicate Pay Records

---

# Common Mistakes

❌ Using Gross Salary instead of Basic Pay.

❌ Adding Dearness Allowance to Basic Pay.

❌ Using HRA as part of Basic Pay.

❌ Ignoring a valid promotion order.

❌ Ignoring an admissible increment.

❌ Ignoring a valid pay revision.

---

# Related Modules

common/emoluments.md

common/average-emoluments.md

common/pay-history.md

rules/pension.md

rules/retirement-gratuity.md

rules/death-gratuity.md

---

# Future Enhancements

- 6th CPC compatibility
- 7th CPC compatibility
- Future CPC revisions
- Automated Pay Matrix lookup
- Historical pay reconstruction

---

# Revision History

Version 1.0

Initial production structure.

Future versions will include exact Railway Pay Matrix references, CPC-specific examples, and rule-by-rule validation against official Railway Board orders.