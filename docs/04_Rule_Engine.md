# RailAssist – Rule Engine

## Version: 1.0

---

# 1. Overview

The Rule Engine is responsible for determining an employee's eligibility for Railway retirement benefits.

Unlike the Calculation Engine, the Rule Engine never performs financial calculations.

Instead, it evaluates Railway policies, pension schemes, retirement cases, service conditions and uploaded Railway rules to determine which benefits are applicable.

The Rule Engine returns structured eligibility information which is then used by the Calculation Engine and Settlement Report.

---

# 2. Responsibilities

The Rule Engine is responsible for:

- Determining benefit eligibility.
- Applying Railway retirement rules.
- Identifying required documents.
- Returning rule references.
- Supporting multiple pension schemes.
- Supporting configurable Railway rules.

---

# 3. Rule Engine Workflow

```
Employee Input
        │
        ▼
Input Validation
        │
        ▼
Identify Pension Scheme
        │
        ▼
Identify Retirement Case
        │
        ▼
Evaluate Railway Rules
        │
        ▼
Determine Eligible Benefits
        │
        ▼
Send Results to Calculation Engine
```

---

# 4. Supported Pension Schemes

The Rule Engine supports:

- OPS
- UPS
- NPS

Each scheme has independent rule sets.

---

# 5. Supported Retirement Cases

## Normal Retirement

- Superannuation

---

## Other Than Normal Retirement

- Voluntary Retirement
- Medical Retirement
- Death Case
- Removal
- Dismissal
- Self Resignation

---

# 6. Supported Benefits

The Rule Engine evaluates eligibility for:

- Pension
- Family Pension
- Retirement Gratuity
- Death Gratuity
- Leave Encashment
- Provident Fund
- CGIS
- RELHS
- Fixed Medical Allowance (FMA)
- Complimentary Pass
- Composite Transfer Grant (CTG)

Future benefits can be added without changing the application architecture.

---

# 7. Rule Structure

Each Railway rule should contain:

- Rule ID
- Rule Name
- Pension Scheme
- Retirement Type
- Benefit
- Condition
- Result
- Rule Reference
- Effective Date
- Version

Example

Rule

RELHS

Condition

Normal Retirement

↓

Eligible

Reference

Railway Circular XXXX

---

# 8. Rule Output

Each evaluated rule returns:

- Eligible / Not Eligible
- Reason
- Rule Reference
- Required Documents
- Additional Remarks

Example

RELHS

Status

Eligible

Reason

Employee retired under Superannuation.

Reference

SCR Circular XXXX

Required Documents

- RELHS Application
- Identity Proof

---

# 9. Rule Priority

When multiple rules exist, apply them in the following order:

1. Pension Scheme
2. Retirement Case
3. Railway Circular Version
4. Benefit Rules
5. Effective Date

Latest active rule should always take precedence.

---

# 10. Rule Configuration

Rules should never be hardcoded inside React components.

All rules should be stored in the database and loaded dynamically.

This allows officers to update rules without modifying source code.

---

# 11. Explainable Rules

Every benefit shown in the application should include:

- Why it is applicable.
- Which rule was used.
- Which circular was referenced.
- Required supporting documents.

This improves transparency for employees and officers.

---

# 12. Future Enhancements

The Rule Engine architecture supports:

- New benefit categories.
- New retirement cases.
- New pension schemes.
- Version-controlled rule updates.
- AI-assisted rule explanations.

---

# 13. Current Status

Status

Architecture Completed

Next Phase

UI Workflow Design