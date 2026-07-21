# RELHS Eligibility Rules

**Version:** 1.0.0

**Rule ID:** RULE-RELHS-001

**Status:** Draft

---

# Purpose

This document defines the business rules governing eligibility for the Retired Employees Liberalized Health Scheme (RELHS) applicable to Railway employees.

It specifies the conditions that determine whether a retired employee or eligible beneficiary may enroll in or continue to receive benefits under RELHS.

This document contains business rules only and does not store reference data.

---

# Scope

These rules apply to:

- Superannuation Retirement
- Voluntary Retirement
- Compulsory Retirement
- Invalid Retirement
- Family cases where applicable under Railway rules

---

# Authority

These rules shall be maintained only from official notifications issued by:

- Ministry of Railways
- Railway Board
- Government of India

---

# Dependencies

Uses:

- tables/relhs/relhs_contribution.md
- tables/service/service_categories.md
- tables/retirement/retirement_types.md
- common/qualifying-service.md

---

# Eligibility Conditions

The eligibility engine shall determine RELHS eligibility based on:

- Employee category
- Retirement type
- Qualifying service
- Retirement status
- Applicable Railway Board notifications
- Fulfillment of prescribed RELHS contribution requirements

The exact eligibility criteria shall be populated only from official Railway rules.

---

# Inputs Required

The eligibility engine may require:

- Employee ID
- Employee Category
- Retirement Type
- Date of Retirement
- Qualifying Service
- RELHS Contribution Details
- Service History

---

# Decision Outcomes

The rule engine shall return one of the following:

- Eligible
- Not Eligible
- Requires Manual Verification

Where eligibility cannot be determined automatically, the reason shall be provided.

---

# Backend Interface

Expected backend operations:

```text
isEligibleForRELHS(employee)

evaluateRELHSEligibility(employee)

getRELHSEligibilityReason(employee)
```

---

# Validation Rules

- Validate employee category.
- Validate retirement type.
- Verify qualifying service.
- Verify RELHS contribution requirements.
- Apply only official Railway Board notifications.
- No hardcoded eligibility rules shall be used.

---

# Error Conditions

The eligibility engine shall return validation errors when:

- Employee information is incomplete.
- Retirement type is invalid.
- Contribution information is unavailable.
- Reference data is unavailable.

---

# References

Populate using:

- Railway Board Circulars
- RELHS Guidelines
- Government of India Orders

---

# Revision History

| Version | Date       | Description     |
| ------- | ---------- | --------------- |
| 1.0.0   | YYYY-MM-DD | Initial version |
