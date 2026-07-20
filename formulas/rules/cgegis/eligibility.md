# CGEGIS Eligibility Rules

**Version:** 1.0.0

**Rule ID:** RULE-CGEGIS-001

**Status:** Draft

---

# Purpose

This document defines the business rules governing eligibility for benefits under the Central Government Employees Group Insurance Scheme (CGEGIS) applicable to Railway employees.

It specifies the conditions that determine whether an employee or beneficiary is eligible to receive CGEGIS benefits during retirement, resignation, death, or other eligible service events.

This document contains business rules only and does not store reference data.

---

# Scope

These rules apply to:

- Superannuation Retirement
- Voluntary Retirement
- Compulsory Retirement
- Invalid Retirement
- Death While in Service
- Other cases permitted under applicable Government rules

---

# Authority

These rules shall be maintained only from official notifications issued by:

- Government of India
- Ministry of Finance
- Ministry of Railways
- Railway Board

---

# Dependencies

Uses:

- tables/cgegis/cgegis_rates.md
- tables/service/service_categories.md
- tables/retirement/retirement_types.md
- common/qualifying-service.md

---

# Eligibility Conditions

The eligibility engine shall determine eligibility based on:

- Employee category
- CGEGIS membership
- Retirement type
- Service status
- Death or retirement event
- Applicable Government notifications

The exact eligibility conditions shall be populated only from official Government and Railway rules.

---

# Inputs Required

The eligibility engine may require:

- Employee ID
- Employee Category
- Employee Group
- Retirement Type
- Service Status
- Date of Retirement
- Date of Death (where applicable)
- CGEGIS Membership Details

---

# Decision Outcomes

The rule engine shall return one of the following:

- Eligible
- Not Eligible
- Requires Manual Verification

Where automatic determination is not possible, the reason shall be provided.

---

# Backend Interface

Expected backend operations:

```text
isEligibleForCGEGIS(employee)

evaluateCGEGISEligibility(employee)

getCGEGISEligibilityReason(employee)
```

---

# Validation Rules

- Validate employee category.
- Verify CGEGIS membership.
- Verify retirement or death event.
- Apply only official Government notifications.
- No hardcoded eligibility conditions shall be used.

---

# Error Conditions

The eligibility engine shall return validation errors when:

- Employee information is incomplete.
- Employee group is unavailable.
- Membership information is unavailable.
- Retirement type is invalid.
- Reference data is unavailable.

---

# References

Populate using:

- Ministry of Finance CGEGIS Notifications
- Railway Board Circulars
- Government of India Orders

---

# Revision History

| Version | Date | Description |
|----------|------|-------------|
| 1.0.0 | YYYY-MM-DD | Initial version |