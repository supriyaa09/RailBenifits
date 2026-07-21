# Compulsory Retirement Pension

Version: 1.0

Module ID: PEN-CRT-001

Status: VERIFIED (Structure)

---

# Authority

Primary References

- Railway Services (Pension) Rules
- Railway Servants (Discipline & Appeal) Rules
- Railway Board Circulars
- Government Orders applicable to Compulsory Retirement

---

# Purpose

This module determines whether an employee who has been compulsorily retired is eligible for pension and routes the case to the appropriate pension calculation engine.

This module does NOT calculate pension.

---

# Scope

Responsible for

- Validating Compulsory Retirement
- Verifying Competent Authority Order
- Verifying Pension Sanction
- Determining Pension Scheme
- Routing to the appropriate pension engine

Not Responsible For

- Pension Calculation
- Dearness Relief
- Pension Revision
- Commutation

---

# Dependencies

common/validation_rules.md

common/qualifying_service.md

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

Compulsory Retirement Date

Retirement Type

Competent Authority Order

Pension Sanction Order

Qualifying Service

Pension Scheme

Employee Status

Disciplinary Proceedings Details

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

## Compulsory Retirement

Retirement imposed by the competent authority under the applicable Railway rules. Pension entitlement shall be determined according to the relevant disciplinary order and Railway Pension Rules.

---

# Validation Pipeline

---

## PEN-CRT-001

### Validate Employee Information

Reference

common/validation_rules.md

---

## PEN-CRT-002

### Verify Retirement Type

Business Rule

Retirement Type shall be

Compulsory Retirement

Else

Reject Request

---

## PEN-CRT-003

### Verify Competent Authority Order

Business Rule

A valid compulsory retirement order issued by the competent authority shall be available.

---

## PEN-CRT-004

### Verify Pension Sanction

Business Rule

Verify whether pension has been sanctioned and whether any reduction or withholding has been ordered under the applicable rules.

---

## PEN-CRT-005

### Verify Qualifying Service

Reference

common/qualifying_service.md

Business Rule

Qualifying Service shall be verified according to the applicable Railway Pension Rules.

---

## PEN-CRT-006

### Determine Pension Scheme

Possible Values

OPS

UPS

NPS

---

## PEN-CRT-007

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

## PEN-CRT-008

### Return Result

Return

- Eligibility Status
- Pension Scheme
- Calculation Module

---

# Business Rules

| Rule ID        | Description                                                                                                |
| -------------- | ---------------------------------------------------------------------------------------------------------- |
| PEN-CRT-BR-001 | Retirement Type shall be Compulsory Retirement.                                                            |
| PEN-CRT-BR-002 | Competent Authority Order is mandatory.                                                                    |
| PEN-CRT-BR-003 | Pension sanction shall be verified before calculation.                                                     |
| PEN-CRT-BR-004 | Pension Scheme shall be identified before routing.                                                         |
| PEN-CRT-BR-005 | This module shall never calculate pension directly.                                                        |
| PEN-CRT-BR-006 | Pension reduction or withholding shall follow the applicable disciplinary order and Railway Pension Rules. |

---

# Validation Rules

Employee ID mandatory.

Retirement Type mandatory.

Compulsory Retirement Order mandatory.

Pension Sanction Order mandatory.

Pension Scheme mandatory.

Employee Status mandatory.

---

# Edge Cases

Compulsory retirement order modified on appeal.

↓

Apply the latest valid order.

---

Court sets aside compulsory retirement.

↓

Re-evaluate pension eligibility.

---

Partial pension sanctioned.

↓

Route with sanctioned pension details.

---

Pension withheld.

↓

Follow sanction order and applicable Railway rules.

---

# Programming Flow

Validate Employee

↓

Validate Compulsory Retirement

↓

Verify Competent Authority Order

↓

Verify Pension Sanction

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

| Test Case                         | Expected Result                     |
| --------------------------------- | ----------------------------------- |
| OPS + Valid Compulsory Retirement | OPS Engine Invoked                  |
| UPS + Valid Compulsory Retirement | UPS Engine Invoked                  |
| NPS + Valid Compulsory Retirement | NPS Engine Invoked                  |
| Missing Authority Order           | Validation Error                    |
| Pension Withheld                  | Process According to Sanction Order |
| Invalid Retirement Type           | Rejected                            |

---

# References

- Railway Services (Pension) Rules
- Railway Servants (Discipline & Appeal) Rules
- Railway Board Circulars
- Government Orders relating to Compulsory Retirement

---

# Revision History

Version 1.0

Initial Compulsory Retirement Pension specification.
