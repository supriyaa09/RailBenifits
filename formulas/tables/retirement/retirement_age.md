# Retirement Age Reference Table

**Version:** 1.0.0

**Table ID:** TBL-RET-001

**Status:** Draft

---

# Purpose

This table defines the officially prescribed retirement ages for various categories of Railway employees.

It serves as the authoritative reference for retirement age lookup and is used by the retirement date calculation engine and all retirement-related benefit calculations.

This table stores only reference data and contains no business logic.

---

# Authority

Values in this table shall be maintained only from official notifications issued by:

- Government of India
- Ministry of Railways
- Railway Board
- Department of Pension & Pensioners' Welfare (DoPPW)

---

# Scope

This table applies to:

- Superannuation retirement
- Pension calculations
- Gratuity calculations
- Leave encashment calculations
- Settlement calculations
- RELHS eligibility
- CGEGIS settlement

---

# Dependencies

Referenced by:

- common/retirement-date.md
- rules/pension/
- rules/gratuity/
- rules/leave/
- rules/relhs/
- rules/settlement/

---

# Table Structure

| Field               | Type        | Description                                 |
| ------------------- | ----------- | ------------------------------------------- |
| Employee Category   | String      | Employee classification                     |
| Retirement Age      | Integer     | Retirement age in completed years           |
| Effective From      | Date        | Date from which the rule becomes applicable |
| Effective To        | Date / Null | End date of applicability                   |
| Notification Number | String      | Official notification reference             |
| Issuing Authority   | String      | Authority issuing the notification          |
| Remarks             | String      | Optional notes                              |

---

# Validation Rules

- Retirement age shall be expressed in completed years.
- Effective periods shall not overlap.
- Only one active retirement age shall exist for a given employee category.
- Historical records shall never be modified.
- New government notifications shall create new records.

---

# Reference Table

| Employee Category | Retirement Age | Effective From | Effective To | Notification Number | Issuing Authority | Remarks             |
| ----------------- | -------------: | -------------- | ------------ | ------------------- | ----------------- | ------------------- |
| TBD               |            TBD | YYYY-MM-DD     | NULL         | GO-XXXX             | Railway Board     | Initial placeholder |

---

# Lookup Rules

Lookup shall be performed using:

1. Employee Category
2. Effective Date

The record whose effective period contains the requested date shall be returned.

---

# Backend Interface

Expected backend operations:

```text
getRetirementAge(employeeCategory, effectiveDate)

isRetirementAgeApplicable(employeeCategory, effectiveDate)
```

---

# Data Integrity Rules

- Historical records must remain immutable.
- Notification references shall be mandatory.
- Effective dates shall be chronological.
- This table shall never contain retirement date calculation logic.

---

# References

Populate using official sources such as:

- Railway Board Circulars
- Government of India Notifications
- Railway Services (Pension) Rules

---

# Revision History

| Version | Date       | Description     |
| ------- | ---------- | --------------- |
| 1.0.0   | YYYY-MM-DD | Initial version |
