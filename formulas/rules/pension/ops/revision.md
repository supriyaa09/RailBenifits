# Pension Revision (OPS)

Version: 1.0

Module ID: OPS-REV-001

Status: VERIFIED (Structure)

---

# Authority

Primary References

- Railway Services (Pension) Rules
- Railway Board Circulars
- Department of Pension & Pensioners' Welfare (DoP&PW) Orders
- Government Notifications applicable to Railway Pensioners

---

# Purpose

This module defines the rules governing revision of pension under the Old Pension Scheme (OPS).

It determines when an existing pension must be revised and how the revised pension should be processed.

This module does NOT calculate the original pension.

---

# Scope

Responsible for

- Identifying pension revision events
- Determining the applicable revision rules
- Recomputing pension where required
- Calculating arrears arising from revision
- Returning revised pension details

Not Responsible For

- Initial Pension Eligibility
- Initial Pension Calculation
- Dearness Relief Calculation
- Commutation Calculation

---

# Dependencies

rules/pension/ops/calculation.md

rules/pension/ops/dearness_relief.md

common/emoluments.md

common/average_emoluments.md

common/validation_rules.md

tables/pension_revision_orders.md

tables/da_dr_rates.md

---

# Inputs

Employee ID

Pensioner ID

Original Pension

Revision Effective Date

Revision Order

Pension Scheme

Revision Reason

Pay Revision Details (if applicable)

Court Order (if applicable)

---

# Output

```json
{
    "originalPension": 0,
    "revisedPension": 0,
    "arrears": 0,
    "effectiveDate": "",
    "revisionOrder": "",
    "status": ""
}
```

---

# Variables

| Variable | Description |
|-----------|-------------|
| OP | Original Pension |
| RP | Revised Pension |
| AR | Pension Arrears |
| ED | Effective Date |

---

# Revision Pipeline

---

## OPS-REV-001

### Validate Existing Pension

Reference

rules/pension/ops/calculation.md

Output

Verified Pension Record

---

## OPS-REV-002

### Identify Revision Trigger

Possible Triggers

- Government Revision Order
- Pay Commission Revision
- Court Order
- Pay Fixation Correction
- Service Correction
- Pension Calculation Error
- Administrative Revision

Output

Revision Type

---

## OPS-REV-003

### Determine Applicable Revision Rules

Business Rule

Identify the Government/Railway order applicable on the revision effective date.

Reference

tables/pension_revision_orders.md

---

## OPS-REV-004

### Recalculate Pension

Business Rule

Recompute pension according to the applicable revision order.

Reference

rules/pension/ops/calculation.md

---

## OPS-REV-005

### Calculate Arrears

Business Rule

Determine pension arrears from the effective revision date to the implementation date.

Business rules for arrear computation shall follow the applicable Government/Railway order.

---

## OPS-REV-006

### Recalculate Dearness Relief

Business Rule

Recompute Dearness Relief based on the revised pension.

Reference

rules/pension/ops/dearness_relief.md

---

## OPS-REV-007

### Return Revised Pension

Return

- Revised Pension
- Revised DR
- Arrears
- Effective Date
- Revision Order

---

# Business Rules

| Rule ID | Description |
|----------|-------------|
| OPS-REV-BR-001 | Pension revision shall be performed only for authorized revision events. |
| OPS-REV-BR-002 | Revision orders shall never be hardcoded. |
| OPS-REV-BR-003 | Historical revisions shall use the rules effective on the applicable date. |
| OPS-REV-BR-004 | Arrears shall be calculated only from the notified effective date. |
| OPS-REV-BR-005 | Every revision shall preserve an audit trail. |
| OPS-REV-BR-006 | Court orders shall override normal revision rules wherever legally applicable. |

---

# Validation Rules

Original Pension mandatory.

Revision Order mandatory.

Effective Date mandatory.

Pension Scheme shall be OPS.

Revision Reason mandatory.

---

# Edge Cases

Retrospective revision.

↓

Calculate arrears.

---

Court-directed revision.

↓

Override standard revision process.

---

Correction in qualifying service.

↓

Recompute pension from the effective date.

---

Correction in pay history.

↓

Recalculate pension and arrears.

---

# Programming Flow

Validate Pension

↓

Identify Revision Trigger

↓

Determine Applicable Rules

↓

Recalculate Pension

↓

Calculate Arrears

↓

Recalculate DR

↓

Return Result

---

# JSON Response

```json
{
    "originalPension": 45000,
    "revisedPension": 47500,
    "arrears": 125000,
    "effectiveDate": "2026-01-01",
    "revisionOrder": "RB-2026-XX",
    "status": "Revision Applied"
}
```

---

# Test Cases

| Test Case | Expected Result |
|------------|-----------------|
| Government Revision Order | Pension Revised |
| Court Order | Pension Revised per Court Direction |
| Pay Correction | Pension Recalculated |
| Service Correction | Revised Pension Generated |
| Invalid Revision Order | Validation Error |

---

# References

- Railway Services (Pension) Rules
- Railway Board Circulars
- DoP&PW Orders
- Government Notifications applicable to Pension Revision

---

# Revision History

Version 1.0

Initial Pension Revision specification.