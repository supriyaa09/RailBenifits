# Pension Revision

Version: 1.0

Module ID: PEN-REV-001

Status: VERIFIED (Structure)

---

# Authority

Primary References

- Railway Services (Pension) Rules
- Railway Board Circulars
- Department of Pension & Pensioners' Welfare (DoP&PW) Orders
- Government Notifications applicable to Pension Revision

---

# Purpose

This module serves as the central orchestration layer for pension revisions.

It identifies the employee's pension scheme and routes the revision request to the appropriate scheme-specific revision engine.

This module does NOT perform pension revision calculations.

---

# Scope

Responsible for

- Validating revision requests
- Determining pension scheme
- Routing revision requests
- Returning revised pension results

Not Responsible For

- OPS Revision
- UPS Revision
- NPS Revision
- Dearness Relief Revision
- Arrear Calculation

---

# Dependencies

common/validation_rules.md

rules/pension/ops/revision.md

rules/pension/ups/revision.md

rules/pension/nps/revision.md

---

# Inputs

Employee ID

Pensioner ID

Pension Scheme

Revision Request Date

Revision Effective Date

Revision Reason

Revision Order

Current Pension Details

---

# Output

```json
{
    "scheme": "OPS",
    "revisionModule": "rules/pension/ops/revision.md",
    "status": "Success"
}
```

---

# Supported Revision Engines

| Pension Scheme | Revision Module |
|----------------|-----------------|
| OPS | rules/pension/ops/revision.md |
| UPS | rules/pension/ups/revision.md |
| NPS | rules/pension/nps/revision.md |

---

# Revision Pipeline

---

## PEN-REV-001

### Validate Revision Request

Reference

common/validation_rules.md

Output

Validated Request

---

## PEN-REV-002

### Determine Pension Scheme

Business Rule

Identify the pension scheme applicable to the employee.

Possible Values

- OPS
- UPS
- NPS

---

## PEN-REV-003

### Route to Revision Engine

If Scheme = OPS

↓

Invoke

rules/pension/ops/revision.md

---

If Scheme = UPS

↓

Invoke

rules/pension/ups/revision.md

---

If Scheme = NPS

↓

Invoke

rules/pension/nps/revision.md

---

## PEN-REV-004

### Execute Scheme Revision

Business Rule

Execute the scheme-specific revision module.

Output

Revised Pension Details

---

## PEN-REV-005

### Return Result

Return

- Revised Pension
- Arrears
- Effective Date
- Revision Order
- Processing Status

---

# Business Rules

| Rule ID | Description |
|----------|-------------|
| PEN-REV-BR-001 | Pension Scheme shall be identified before revision. |
| PEN-REV-BR-002 | Only one revision engine shall execute per request. |
| PEN-REV-BR-003 | This module shall never perform pension calculations. |
| PEN-REV-BR-004 | This module shall never perform arrear calculations. |
| PEN-REV-BR-005 | Invalid pension schemes shall return an error. |

---

# Validation Rules

Employee ID mandatory.

Pension Scheme mandatory.

Revision Request Date mandatory.

Revision Effective Date mandatory.

Revision Reason mandatory.

Revision Order mandatory.

---

# Edge Cases

Unknown Pension Scheme.

↓

Reject Request.

---

Duplicate Revision Request.

↓

Return existing processed revision or reject duplicate according to implementation policy.

---

Retrospective Revision.

↓

Route to scheme-specific revision engine.

---

Court-directed Revision.

↓

Process according to the applicable scheme-specific revision rules.

---

# Programming Flow

Validate Request

↓

Determine Pension Scheme

↓

Invoke Appropriate Revision Engine

↓

Receive Revised Pension

↓

Return Result

---

# JSON Response

```json
{
    "employeeId": "EMP001",
    "scheme": "OPS",
    "revisionModule": "rules/pension/ops/revision.md",
    "status": "Completed",
    "effectiveDate": "2026-01-01"
}
```

---

# Test Cases

| Test Case | Expected Result |
|------------|-----------------|
| OPS Revision | OPS Revision Module Invoked |
| UPS Revision | UPS Revision Module Invoked |
| NPS Revision | NPS Revision Module Invoked |
| Unknown Scheme | Validation Error |
| Duplicate Request | Duplicate Handling Applied |

---

# References

- Railway Services (Pension) Rules
- Railway Board Circulars
- DoP&PW Orders
- Government Notifications relating to Pension Revision

---

# Revision History

Version 1.0

Initial Pension Revision orchestration specification.