# CGEGIS Calculation Rules

**Version:** 1.0.0

**Rule ID:** RULE-CGEGIS-002

**Status:** Draft

---

# Purpose

This document defines the business rules governing the calculation of benefits under the Central Government Employees Group Insurance Scheme (CGEGIS) applicable to Railway employees.

The calculation engine determines the payable benefits by using official CGEGIS reference data together with employee service information and applicable Government notifications.

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

- rules/cgegis/eligibility.md
- tables/cgegis/cgegis_rates.md
- tables/service/service_categories.md
- common/qualifying-service.md
- common/date_rules.md

---

# Calculation Workflow

The CGEGIS calculation engine shall perform the following steps:

1. Verify employee eligibility.
2. Validate employee group.
3. Determine applicable CGEGIS rates.
4. Identify the effective Government notification.
5. Determine subscription period.
6. Calculate the Savings Fund benefit.
7. Calculate the Insurance Fund benefit.
8. Compute the total CGEGIS benefit payable.
9. Generate the calculation summary.

---

# Business Rules

The calculation engine shall:

- Verify eligibility before calculation.
- Use only official CGEGIS rates.
- Apply rates effective on the applicable date.
- Determine the employee group from official service records.
- Preserve historical calculations.
- Maintain a complete audit trail.

No subscription amount, insurance value, savings value, or monetary limit shall be hardcoded.

---

# Inputs Required

The calculation engine may require:

- Employee ID
- Employee Group
- Employee Category
- Date of Joining
- Date of Retirement
- Date of Death (where applicable)
- Subscription History
- Applicable Notification Date

---

# Outputs

The calculation shall produce:

- Employee Group
- Subscription Period
- Savings Fund Amount
- Insurance Fund Amount
- Total CGEGIS Benefit
- Applicable Notification
- Calculation Summary

---

# Backend Interface

Expected backend operations:

```text
calculateCGEGISBenefit(employee)

calculateSavingsFund(employee)

calculateInsuranceFund(employee)

generateCGEGISSummary(employee)
```

---

# Validation Rules

- Eligibility shall be verified before calculation.
- Employee group shall be validated.
- Applicable rates shall be obtained from the reference tables.
- Historical calculations shall remain immutable.
- Only officially notified CGEGIS rates shall be used.

---

# Error Conditions

Calculation shall fail when:

- Employee is not eligible.
- Employee group is unavailable.
- CGEGIS rate information is unavailable.
- Subscription history is incomplete.
- Required reference data is unavailable.

---

# References

Populate using:

- Ministry of Finance CGEGIS Notifications
- Railway Board Circulars
- Government of India Orders

---

# Revision History

| Version | Date       | Description     |
| ------- | ---------- | --------------- |
| 1.0.0   | YYYY-MM-DD | Initial version |
