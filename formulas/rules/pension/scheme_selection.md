# Pension Scheme Selection Rules

**Version:** 1.0.0

**Rule ID:** RULE-PENSION-001

**Status:** Draft

---

# Purpose

This document defines the business rules for determining the applicable pension scheme for a Railway employee.

The scheme selection process serves as the entry point for all pension-related calculations. It determines whether an employee is governed by the Old Pension Scheme (OPS), National Pension System (NPS), or Unified Pension Scheme (UPS) before invoking the corresponding rule engine.

This document contains business rules only and does not contain reference data.

---

# Scope

These rules apply to:

- Superannuation Retirement
- Voluntary Retirement
- Compulsory Retirement
- Invalid Retirement
- Death Cases
- Pension Settlement
- Pension Revision
- Family Pension

---

# Authority

These rules shall be maintained only from official notifications issued by:

- Government of India
- Ministry of Finance
- Ministry of Railways
- Railway Board
- Pension Fund Regulatory and Development Authority (PFRDA)

---

# Dependencies

Uses:

- tables/service/service_categories.md
- tables/retirement/retirement_types.md
- common/service-rounding.md
- common/validation_rules.md

Invokes:

- rules/pension/ops/
- rules/pension/nps/
- rules/pension/ups/

---

# Scheme Selection Workflow

The pension engine shall determine the applicable pension scheme before performing any eligibility or calculation.

The selection workflow shall generally consist of the following steps:

1. Validate employee information.
2. Verify appointment details.
3. Verify applicable Government notifications.
4. Determine the applicable pension scheme.
5. Invoke the corresponding pension rule engine.
6. Generate the pension calculation response.

---

# Scheme Selection Rules

The scheme selection engine shall determine the applicable pension scheme based on:

- Date of Appointment
- Date of Joining Government Service
- Applicable Government Notifications
- Railway Board Circulars
- Ministry of Finance Orders
- Employee Category
- Migration or Option exercised by the employee (where applicable)

The exact selection criteria shall be populated only from official Government notifications.

No scheme selection shall be hardcoded.

---

# Inputs Required

The scheme selection engine may require:

- Employee ID
- Employee Category
- Date of Birth
- Date of Appointment
- Date of Joining
- Date of Retirement
- Retirement Type
- Service History
- Applicable Notification Date
- Migration / Option Details (if applicable)

---

# Decision Outcomes

The scheme selector shall return one of the following:

- Old Pension Scheme (OPS)
- National Pension System (NPS)
- Unified Pension Scheme (UPS)
- Requires Manual Verification

Where automatic determination is not possible, the engine shall provide the reason.

---

# Backend Interface

Expected backend operations:

```text
determinePensionScheme(employee)

getApplicablePensionScheme(employee)

validateSchemeSelection(employee)

getSchemeSelectionReason(employee)
```

---

# Validation Rules

- Employee information shall be validated before scheme selection.
- Appointment date shall be verified.
- Applicable Government notifications shall be identified.
- Employee category shall be validated.
- No hardcoded scheme selection rules shall be used.

---

# Error Conditions

The scheme selector shall return appropriate validation errors when:

- Employee information is incomplete.
- Appointment details are unavailable.
- Pension scheme cannot be determined.
- Required reference data is unavailable.
- Applicable Government notification cannot be identified.

---

# Processing Flow

```text
Employee Details
        │
        ▼
Validate Employee Information
        │
        ▼
Verify Appointment Details
        │
        ▼
Identify Applicable Government Notification
        │
        ▼
Determine Pension Scheme
        │
        ├────────► OPS Rule Engine
        │
        ├────────► NPS Rule Engine
        │
        └────────► UPS Rule Engine
```

---

# References

Populate using:

- Railway Services (Pension) Rules
- Government of India Notifications
- Ministry of Finance Orders
- Railway Board Circulars
- PFRDA Regulations

---

# Revision History

| Version | Date       | Description     |
| ------- | ---------- | --------------- |
| 1.0.0   | YYYY-MM-DD | Initial version |
