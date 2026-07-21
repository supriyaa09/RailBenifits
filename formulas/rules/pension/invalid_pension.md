# Invalid Pension

Version: 1.0

Module ID: PEN-INV-001

Status: VERIFIED (Structure)

---

# Authority

Primary References

- Railway Services (Pension) Rules
- Railway Board Circulars
- Medical Board Guidelines
- Government Orders applicable to Invalid Pension

---

# Purpose

This module determines whether an employee retiring on invalidation from service is eligible for Invalid Pension and routes the case to the appropriate pension calculation engine.

This module does NOT calculate pension.

---

# Scope

Responsible for

- Validating Invalid Retirement
- Verifying Medical Board Certification
- Verifying qualifying service (where applicable)
- Determining Pension Scheme
- Routing to the appropriate pension engine

Not Responsible For

- Pension Calculation
- Dearness Relief
- Pension Revision
- Commutation

---

# Dependencies

common/qualifying_service.md

common/validation_rules.md

common/retirement_date.md

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

Invalid Retirement Date

Retirement Type

Medical Board Certificate

Medical Board Decision

Qualifying Service

Pension Scheme

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

## Invalid Pension

Pension granted to an employee who is declared permanently incapacitated for further service by the competent Medical Authority under the applicable Railway Pension Rules.

---

# Validation Pipeline

---

## PEN-INV-001

### Validate Employee Information

Reference

common/validation_rules.md

---

## PEN-INV-002

### Verify Retirement Type

Business Rule

Retirement Type shall be

Invalid Retirement

Else

Reject Request

---

## PEN-INV-003

### Verify Medical Board Decision

Business Rule

Employee shall possess a valid Medical Board Certificate declaring permanent incapacity for Railway service.

---

## PEN-INV-004

### Verify Qualifying Service

Business Rule

Apply the qualifying service provisions applicable to Invalid Pension under the governing Railway Pension Rules.

Reference

common/qualifying_service.md

---

## PEN-INV-005

### Determine Pension Scheme

Possible Values

OPS

UPS

NPS

---

## PEN-INV-006

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

## PEN-INV-007

### Return Result

Return

- Eligibility Status
- Pension Scheme
- Calculation Module

---

# Business Rules

| Rule ID        | Description                                                           |
| -------------- | --------------------------------------------------------------------- |
| PEN-INV-BR-001 | Retirement Type shall be Invalid Retirement.                          |
| PEN-INV-BR-002 | Medical Board certification is mandatory.                             |
| PEN-INV-BR-003 | Qualifying Service shall be verified as per applicable Railway rules. |
| PEN-INV-BR-004 | Pension Scheme shall be identified before calculation.                |
| PEN-INV-BR-005 | This module shall never calculate pension directly.                   |

---

# Validation Rules

Employee ID mandatory.

Medical Board Certificate mandatory.

Retirement Date mandatory.

Retirement Type mandatory.

Pension Scheme mandatory.

Employee Status mandatory.

---

# Edge Cases

Medical Board decision under appeal.

↓

Process according to the final approved decision.

---

Medical Board certificate withdrawn.

↓

Suspend processing until a valid decision is available.

---

Court-directed invalid retirement.

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

Validate Invalid Retirement

↓

Verify Medical Board Certificate

↓

Verify Qualifying Service

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

| Test Case                   | Expected Result    |
| --------------------------- | ------------------ |
| OPS + Valid Medical Board   | OPS Engine Invoked |
| UPS + Valid Medical Board   | UPS Engine Invoked |
| NPS + Valid Medical Board   | NPS Engine Invoked |
| Missing Medical Certificate | Validation Error   |
| Invalid Retirement Type     | Rejected           |

---

# References

- Railway Services (Pension) Rules
- Railway Board Circulars
- Medical Board Guidelines
- Government Orders relating to Invalid Pension

---

# Revision History

Version 1.0

Initial Invalid Pension specification.
