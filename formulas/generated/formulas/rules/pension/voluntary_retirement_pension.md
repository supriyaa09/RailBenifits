# Voluntary Retirement Pension

Version: 1.0

Module ID: PEN-VRS-001

Status: VERIFIED (Structure)

---

# Authority

Primary References

- Railway Services (Pension) Rules
- Railway Board Circulars
- Government Orders applicable to Voluntary Retirement

---

# Purpose

This module determines whether an employee retiring voluntarily is eligible for pension and routes the request to the appropriate pension scheme engine.

This module does NOT calculate pension.

---

# Scope

Responsible for

- Validating Voluntary Retirement
- Verifying eligibility conditions
- Determining Pension Scheme
- Invoking the appropriate pension engine

Not Responsible For

- Pension Calculation
- Dearness Relief
- Pension Revision
- Commutation

---

# Dependencies

common/qualifying_service.md

common/retirement_date.md

common/validation_rules.md

rules/pension/ops/eligibility.md

rules/pension/ops/calculation.md

rules/pension/ups/eligibility.md

rules/pension/ups/calculation.md

rules/pension/nps/eligibility.md

rules/pension/nps/calculation.md

---

# Inputs

Employee ID

Employee Name

Date of Birth

Date of Appointment

Date of Voluntary Retirement

Qualifying Service

Pension Scheme

Department Approval

Voluntary Retirement Notice Details

Employee Status

---

# Output

```json
{
    "eligible": true,
    "scheme": "OPS",
    "module": "rules/pension/ops/calculation.md",
    "status": "Approved"
}
```

---

# Definitions

## Voluntary Retirement

Retirement initiated by the employee after satisfying the conditions prescribed under the applicable Railway Pension Rules.

---

# Validation Pipeline

---

## PEN-VRS-001

### Validate Employee Information

Reference

common/validation_rules.md

---

## PEN-VRS-002

### Verify Voluntary Retirement

Business Rule

Retirement Type must be

Voluntary Retirement

---

## PEN-VRS-003

### Verify Qualifying Service

Reference

common/qualifying_service.md

Business Rule

The employee shall satisfy the qualifying service requirement applicable under the governing Railway Pension Rules.

---

## PEN-VRS-004

### Verify Department Approval

Business Rule

Where required under the applicable rules, voluntary retirement shall be accepted by the competent authority before pension processing.

---

## PEN-VRS-005

### Determine Pension Scheme

Possible Values

OPS

UPS

NPS

---

## PEN-VRS-006

### Route to Pension Engine

If Scheme = OPS

↓

Invoke

rules/pension/ops/calculation.md

---

If Scheme = UPS

↓

Invoke

rules/pension/ups/calculation.md

---

If Scheme = NPS

↓

Invoke

rules/pension/nps/calculation.md

---

## PEN-VRS-007

### Return Result

Return

- Eligibility Status
- Pension Scheme
- Calculation Module

---

# Business Rules

| Rule ID | Description |
|----------|-------------|
| PEN-VRS-BR-001 | Retirement Type shall be Voluntary Retirement. |
| PEN-VRS-BR-002 | Qualifying Service shall satisfy the applicable Railway rules. |
| PEN-VRS-BR-003 | Department approval shall be verified where required. |
| PEN-VRS-BR-004 | Pension Scheme shall be identified before calculation. |
| PEN-VRS-BR-005 | This module shall never calculate pension directly. |

---

# Validation Rules

Employee ID mandatory.

Retirement Date mandatory.

Retirement Type mandatory.

Pension Scheme mandatory.

Qualifying Service mandatory.

---

# Edge Cases

Withdrawal of voluntary retirement notice before acceptance.

↓

Follow applicable Railway rules.

---

Court-directed voluntary retirement.

↓

Apply Court Order.

---

Correction in qualifying service.

↓

Re-evaluate eligibility.

---

# Programming Flow

Validate Employee

↓

Validate Voluntary Retirement

↓

Verify Qualifying Service

↓

Verify Department Approval

↓

Determine Pension Scheme

↓

Invoke Pension Engine

↓

Return Result

---

# JSON Response

```json
{
    "employeeId": "EMP001",
    "eligible": true,
    "scheme": "OPS",
    "module": "rules/pension/ops/calculation.md",
    "status": "Approved"
}
```

---

# Test Cases

| Test Case | Expected Result |
|------------|-----------------|
| OPS + Valid VRS | OPS Engine Invoked |
| UPS + Valid VRS | UPS Engine Invoked |
| NPS + Valid VRS | NPS Engine Invoked |
| Insufficient Qualifying Service | Not Eligible |
| Missing Approval (where required) | Validation Error |

---

# References

- Railway Services (Pension) Rules
- Railway Board Circulars
- Government Orders relating to Voluntary Retirement

---

# Revision History

Version 1.0

Initial Voluntary Retirement Pension specification.