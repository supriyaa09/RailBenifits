# RailAssist – Settlement Processing Engine (SPE)

## Version: 1.0

---

# 1. Overview

The Settlement Processing Engine (SPE) is the core business logic of RailAssist.

It is responsible for validating employee inputs, determining applicable Railway rules, executing official Railway settlement calculations, and generating structured settlement results.

The engine is completely independent of the user interface.

No React components, pages or UI elements should contain business calculations.

---

# 2. Objectives

The Settlement Processing Engine is designed to:

- Validate employee inputs.
- Calculate retirement date automatically.
- Calculate qualifying service.
- Execute Railway settlement calculations.
- Produce explainable outputs.
- Support multiple pension schemes.
- Use official Railway Excel workbooks as the source of truth.
- Generate structured settlement data for PDF reports.

---

# 3. Engine Architecture

```
Employee Input
        │
        ▼
Validation Engine
        │
        ▼
Rule Engine
        │
        ▼
Workbook Manager
        │
        ▼
Formula Engine
        │
        ▼
Calculation Engine
        │
        ▼
Settlement Report Generator
```

Each layer has a single responsibility.

---

# 4. Validation Engine

The Validation Engine ensures that all employee inputs are valid before calculations begin.

Validation includes:

- Required fields.
- Date validation.
- Numeric validation.
- Pension scheme validation.
- Retirement type validation.
- Salary validation.
- Promotion data validation.
- PF and CGIS validation.

If validation fails, calculations must not execute.

---

# 5. Retirement Date Calculation

The retirement date is automatically calculated.

Employees never enter it manually.

Rule 1

If Date of Birth is the 1st day of a month,

Retirement Date = Last day of previous month after completing 60 years.

Example

DOB

01-07-1966

↓

Retirement

30-06-2026

---

Rule 2

If Date of Birth is between the 2nd and last day of the month,

Retirement Date = Last day of the same month after completing 60 years.

Example

DOB

15-07-1966

↓

Retirement

31-07-2026

---

# 6. Qualifying Service

Using

Date of Appointment

and

Calculated Retirement Date

the engine calculates

- Years
- Months
- Days

This value is used by the Rule Engine and Calculation Engine.

---

# 7. Workbook Manager

The Workbook Manager controls all official Railway Excel workbooks.

Responsibilities

- Maintain workbook versions.
- Activate workbook versions.
- Load workbook.
- Validate workbook.
- Pass workbook to Formula Engine.

Only one workbook per pension scheme should be active.

---

# 8. Formula Engine

The Formula Engine reads the official Railway workbook.

Responsibilities

- Read worksheets.
- Read lookup tables.
- Read constants.
- Read named ranges.
- Read formulas.
- Supply calculation logic to the Calculation Engine.

The Formula Engine never performs calculations directly.

---

# 9. Calculation Engine

The Calculation Engine performs all financial calculations.

Modules

- OPS
- UPS
- NPS
- Pension
- Gratuity
- Leave Encashment
- Commutation
- Residual Pension
- Total Settlement

Calculations must match the official Railway workbook.

---

# 10. Supported Inputs

Employee Information

- Employee Name
- Date of Birth
- Date of Appointment
- Pension Scheme
- Retirement Type
- Employee Group
- Pay Matrix Level

Salary Information

- Basic Pay
- Dearness Allowance
- LAP
- LHAP

Promotion

- Promotion Status
- Last 10 Months Basic Pay

Manual Inputs

- PF
- CGIS

NPS

- NPS Corpus

Medical

- FMA Option

---

# 11. Supported Outputs

The engine returns

- Retirement Date
- Qualifying Service
- Pension
- Family Pension
- Retirement Gratuity
- Leave Encashment
- Commutation
- Residual Pension
- PF
- CGIS
- RELHS
- FMA
- Total Settlement

The engine does not generate UI.

---

# 12. Explainable Calculations

Every calculated amount must contain

- Input Values
- Formula Used
- Intermediate Values
- Final Output

This enables officers to verify calculations.

---

# 13. Error Handling

Possible errors include

- Missing workbook
- Invalid workbook
- Missing mandatory input
- Invalid salary values
- Unsupported pension scheme
- Workbook version mismatch

Errors should be descriptive and prevent incorrect calculations.

---

# 14. Design Principles

The Settlement Processing Engine follows these principles:

- Modular
- Independent
- Reusable
- Testable
- Configuration Driven
- Workbook Driven
- Explainable
- Scalable

---

# 15. Future Enhancements

Future versions may support:

- Automatic workbook validation.
- Formula comparison between workbook versions.
- Workbook rollback.
- Automated regression testing.
- Multi-language calculation explanations.

---

# 16. Current Status

Status

Architecture Completed

Next Phase

Rule Engine Design
