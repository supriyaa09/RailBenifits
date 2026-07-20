# Leave Encashment Eligibility Rules

**Version:** 1.0.0

**Rule ID:** RULE-LEAVE-001

**Status:** Draft

---

# Purpose

This document defines the business rules governing eligibility for leave encashment applicable to Railway employees.

It specifies the conditions that determine whether an employee is eligible to receive leave encashment benefits during retirement, resignation, death, or other eligible service events.

This document contains business rules only and does not store reference data.

---

# Scope

These rules apply to:

- Superannuation Retirement
- Voluntary Retirement
- Compulsory Retirement
- Invalid Retirement
- Death Cases
- Other leave encashment cases permitted under applicable Railway rules

---

# Authority

These rules shall be maintained only from official notifications issued by:

- Government of India
- Ministry of Railways
- Railway Board

---

# Dependencies

Uses:

- tables/leave/leave_encashment_limits.md
- tables/leave/leave_types.md
- tables/leave/leave_salary_components.md
- tables/service/service_categories.md
- tables/retirement/retirement_types.md
- common/qualifying-service.md

---

# Eligibility Conditions

The eligibility engine shall determine leave encashment eligibility based on:

- Employee category
- Retirement type
- Leave account
- Leave type
- Applicable Government notifications
- Service status

The exact eligibility conditions shall be populated only from official Railway rules.

---

# Inputs Required

The eligibility engine may require:

- Employee ID
- Employee Category
- Retirement Type
- Leave Balance
- Leave Type
- Date of Retirement
- Service History

---

# Decision Outcomes

The rule engine shall return one of the following:

- Eligible
- Not Eligible
- Requires Manual Verification

---

# Backend Interface

Expected backend operations:

```text
isEligibleForLeaveEncashment(employee)

evaluateLeaveEligibility(employee)

getLeaveEligibilityReason(employee)
```

---

# Validation Rules

- Validate employee category.
- Validate retirement type.
- Verify leave account.
- Verify applicable leave type.
- Apply only official Railway notifications.
- No hardcoded eligibility rules shall be used.

---

# Error Conditions

- Missing employee information.
- Invalid leave type.
- Invalid retirement type.
- Leave balance unavailable.
- Required reference data unavailable.

---

# References

Populate using:

- Railway Leave Rules
- Railway Board Circulars
- Government Notifications

---

# Revision History

| Version | Date | Description |
|----------|------|-------------|
| 1.0.0 | YYYY-MM-DD | Initial version |