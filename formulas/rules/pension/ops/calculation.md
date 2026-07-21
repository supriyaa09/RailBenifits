# OPS Pension Calculation

Version: 1.0

Module ID: OPS-CAL-001

Status: VERIFIED (Structure)
Formula Status: Pending Rule Verification

---

# Authority

Primary References

- Railway Services (Pension) Rules, 1993
- Rule 49 – Emoluments
- Rule 50 – Average Emoluments
- Rule 69 – Amount of Pension
- Railway Board Circulars
- DoP&PW Orders (where adopted by Railways)

---

# Purpose

This document defines the complete calculation pipeline for Old Pension Scheme (OPS) pension.

This module performs only pension calculations.

Eligibility shall already have been verified using:

rules/pension/ops/eligibility.md

---

# Scope

Responsible for

- Determining Pensionable Emoluments
- Applying Pension Formula
- Applying Pension Limits
- Applying Rounding Rules
- Returning Basic Pension

Not Responsible For

- Eligibility
- Qualifying Service Calculation
- Emoluments Calculation
- Average Emoluments Calculation
- Dearness Relief

---

# Dependencies

common/basic_pay.md

common/emoluments.md

common/average_emoluments.md

common/pay_history.md

common/qualifying_service.md

common/service_rounding.md

common/validation_rules.md

rules/pension/ops/eligibility.md

tables/pension_rates.md

tables/pension_limits.md

---

# Inputs

Employee ID

Retirement Date

Retirement Type

Qualifying Service

Emoluments

Average Emoluments

Pension Scheme

---

# Output

```json
{
  "eligible": true,
  "basicPension": 0,
  "pensionableEmoluments": 0,
  "qualifyingService": "",
  "calculationMethod": "",
  "ruleVersion": ""
}
```

---

# Variables

| Variable | Description            |
| -------- | ---------------------- |
| QS       | Qualifying Service     |
| E        | Emoluments             |
| AE       | Average Emoluments     |
| PE       | Pensionable Emoluments |
| BP       | Basic Pension          |

---

# Calculation Pipeline

---

## OPS-CAL-001

### Validate Eligibility

Input

Employee Details

Reference

rules/pension/ops/eligibility.md

Output

Eligible / Not Eligible

---

## OPS-CAL-002

### Determine Qualifying Service

Reference

common/qualifying_service.md

Output

Verified Qualifying Service

---

## OPS-CAL-003

### Determine Emoluments

Reference

common/emoluments.md

Output

Emoluments

---

## OPS-CAL-004

### Determine Average Emoluments

Reference

common/average_emoluments.md

Output

Average Emoluments

---

## OPS-CAL-005

### Determine Pensionable Emoluments

Business Rule

Determine the admissible pensionable emoluments according to the applicable Railway Pension Rules.

Reference

Rule 49

Rule 50

Output

Pensionable Emoluments

---

## OPS-CAL-006

### Calculate Basic Pension

Business Rule

Apply the applicable OPS pension formula prescribed under the governing Railway Pension Rules.

⚠️ Formula to be inserted only after verification.

Output

Basic Pension

---

## OPS-CAL-007

### Apply Pension Limits

Business Rule

Apply

- Minimum Pension
- Maximum Pension

Reference

tables/pension_limits.md

---

## OPS-CAL-008

### Apply Rounding Rules

Business Rule

Apply the prescribed Railway rounding rules.

---

## OPS-CAL-009

### Return Pension

Return

Basic Pension

Calculation Method

Rule Version

---

# Business Rules

| Rule ID        | Description                                         |
| -------------- | --------------------------------------------------- |
| OPS-CAL-BR-001 | Eligibility must be verified before calculation.    |
| OPS-CAL-BR-002 | Use verified qualifying service only.               |
| OPS-CAL-BR-003 | Do not calculate emoluments in this module.         |
| OPS-CAL-BR-004 | Do not calculate average emoluments in this module. |
| OPS-CAL-BR-005 | Pension rates shall never be hardcoded.             |
| OPS-CAL-BR-006 | Pension limits shall come from reference tables.    |
| OPS-CAL-BR-007 | Rounding shall follow applicable Railway rules.     |

---

# Validation Rules

Employee Eligible

Qualifying Service Available

Emoluments Available

Average Emoluments Available

Retirement Date Valid

Pension Scheme = OPS

---

# Worked Examples

(To be added after formula verification.)

---

# Edge Cases

Promotion in last year

Pay Revision before retirement

Court Order

Retrospective Promotion

Suspension Regularization

Qualifying Service Revision

---

# Programming Flow

Validate Eligibility

↓

Determine Qualifying Service

↓

Determine Emoluments

↓

Determine Average Emoluments

↓

Determine Pensionable Emoluments

↓

Calculate Basic Pension

↓

Apply Pension Limits

↓

Apply Rounding

↓

Return Result

---

# JSON Response

```json
{
  "eligible": true,
  "basicPension": 0,
  "calculationMethod": "OPS",
  "ruleVersion": "",
  "remarks": ""
}
```

---

# Test Cases

| Test Case               | Expected Result      |
| ----------------------- | -------------------- |
| Normal Superannuation   | Pension Calculated   |
| Invalid Retirement Type | Validation Error     |
| Missing Emoluments      | Validation Error     |
| Promotion in Last Year  | Updated Pension      |
| Pay Revision            | Recalculated Pension |

---

# References

- Railway Services (Pension) Rules, 1993
- Rule 49
- Rule 50
- Rule 69
- Railway Board Circulars
- DoP&PW Orders (where adopted)

---

# Revision History

Version 1.0

Initial OPS Pension Calculation specification.
Formula pending detailed rule verification.
