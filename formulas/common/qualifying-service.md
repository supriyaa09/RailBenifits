# Qualifying Service

Version: 1.0

Status: Draft – Foundation

Module ID: COMMON-QS-001

---

# Purpose

This document defines how **Qualifying Service** is determined for Railway retirement benefits.

Every retirement calculation engine MUST use this file as the single source of truth for service calculation.

---

# Used By

- Pension
- Retirement Gratuity
- Service Gratuity
- Death Gratuity
- Family Pension
- Enhanced Family Pension
- Commutation
- Leave Encashment (where applicable)
- RELHS Eligibility
- Other retirement benefits

---

# Definition

Qualifying Service is the service that is counted for retirement-related benefits according to the applicable Railway Pension Rules.

It is **not always equal to total service rendered**.

Certain periods count.

Certain periods do not count.

Some periods count only if regularized.

---

# Inputs Required

Employee ID

Scheme
- OPS
- UPS
- NPS

Date of Birth

Date of Appointment

Date of Retirement

Retirement Type

Service History

Leave History

Suspension History

Military Service (if applicable)

Extraordinary Leave Records

Deputation Records

Break in Service Records

Regularization Orders

Court Orders (if applicable)

---

# Output

Qualifying Service

Expressed as

Years

Months

Days

Completed Six-Month Periods (where required)

---

# General Principles

1. Service starts from the date qualifying service begins under the applicable rules.

2. Qualifying service ends on the date of retirement, death, or other terminal event.

3. Not every day between these dates automatically qualifies.

4. Each service interruption must be evaluated.

5. Every exclusion must have supporting authority.

---

# Included Service

Examples of service that may qualify (subject to applicable rules):

- Regular service
- Confirmed service
- Temporary service where countable
- Service after regular appointment
- Service specifically declared as qualifying
- Eligible military service where admissible
- Deputation where admissible
- Foreign service where admissible

---

# Service That May Not Count

Examples (subject to rule verification):

- Unauthorized absence
- Break in service not condoned
- Extraordinary Leave where not qualifying
- Suspension treated as non-duty
- Removal
- Dismissal
- Service specifically excluded by rules

---

# Retirement Types Supported

- Superannuation
- Voluntary Retirement
- Premature Retirement
- Compulsory Retirement
- Invalid Retirement
- Death in Service
- Death after Retirement
- Resignation
- Removal
- Dismissal

---

# Scheme Applicability

OPS

Uses qualifying service extensively.

UPS

Uses qualifying service where prescribed.

NPS

Certain retirement benefits may use qualifying service while corpus-based benefits use contribution history.

---

# Calculation Flow

Step 1

Validate employee data.

↓

Step 2

Determine retirement type.

↓

Step 3

Determine pension scheme.

↓

Step 4

Identify service start date.

↓

Step 5

Identify retirement date.

↓

Step 6

Identify excluded periods.

↓

Step 7

Identify admissible additions.

↓

Step 8

Compute qualifying service.

↓

Step 9

Apply rounding rules where required.

↓

Return qualifying service.

---

# Edge Cases

## Employee born on 1st of month

Retirement date determination follows retirement-date.md.

---

## Promotion in final months

No direct impact on qualifying service.

Handled separately.

---

## Extraordinary Leave

Requires rule-based determination.

Do not automatically include.

---

## Suspension

Must first determine whether suspension counts as duty.

---

## Break in Service

Must verify whether condoned.

---

## Military Service

Verify admissibility before inclusion.

---

## Deputation

Verify qualifying status.

---

## Foreign Service

Verify qualifying status.

---

## Death in Service

Qualifying service ends on date of death.

---

## Invalid Retirement

Service ends on invalid retirement date.

---

## Resignation

Benefits depend on applicable rules.

---

## Removal

Qualifying service treatment depends on applicable rules.

---

## Dismissal

Qualifying service treatment depends on applicable rules.

---

# Validation Rules

Appointment Date must exist.

Retirement Date must exist.

Appointment Date < Retirement Date.

Date of Birth must be valid.

Retirement Age must match applicable rules.

Qualifying Service cannot be negative.

Excluded service cannot exceed total service.

Leave records must not overlap.

Suspension periods must not overlap.

No duplicate service records.

---

# Dependencies

retirement-date.md

service-rounding.md

validation-rules.md

emoluments.md

---

# Programming Model

Input

Employee Record

↓

Service History

↓

Validation

↓

Calculate Gross Service

↓

Subtract Excluded Service

↓

Add Admissible Service

↓

Apply Rounding

↓

Return Qualifying Service

---

# Returned Object

```json
{
  "years": 0,
  "months": 0,
  "days": 0,
  "completedSixMonthlyPeriods": 0,
  "scheme": "",
  "retirementType": ""
}
```

---

# Error Conditions

Missing Appointment Date

Missing Retirement Date

Invalid Retirement Type

Invalid Scheme

Negative Service

Overlapping Service Records

Missing Regularization Order

Invalid Leave Record

---

# Future Enhancements

- Scheme-specific qualifying service rules
- Rule-wise inclusion tables
- RBE-specific amendments
- Version history by effective date

---

# Related Documents

common/retirement-date.md

common/service-rounding.md

common/emoluments.md

rules/pension.md

rules/retirement-gratuity.md

rules/death-gratuity.md

---

# Revision History

Version 1.0

Initial foundation document.

Rule references and scheme-specific conditions to be added after verification against the applicable Railway Rules and Railway Board circulars.