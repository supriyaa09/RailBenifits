# CGEGIS Rates Reference Table

**Version:** 1.0.0

**Table ID:** TBL-CGEGIS-001

**Status:** Draft

---

# Purpose

This table defines the official Central Government Employees Group Insurance Scheme (CGEGIS) reference data applicable to Railway employees.

It stores government-notified subscription amounts, insurance fund values, savings fund values, and other reference information required for CGEGIS benefit calculations.

This table contains only reference data and shall not contain calculation logic.

---

# Authority

Reference data shall be maintained only from official notifications issued by:

- Government of India
- Ministry of Finance
- Ministry of Railways
- Railway Board

---

# Scope

This table applies to:

- Retirement Settlement
- Death Settlement
- CGEGIS Benefit Calculation
- Insurance Fund Calculation
- Savings Fund Calculation

---

# Dependencies

Referenced by:

- rules/cgegis/
- rules/settlement/cgegis.md

---

# Table Structure

| Field                | Type        | Description                                 |
| -------------------- | ----------- | ------------------------------------------- |
| Employee Group       | String      | Employee group (A, B, C, etc.)              |
| Monthly Subscription | Decimal     | Official monthly subscription amount        |
| Insurance Fund       | Decimal     | Insurance fund component                    |
| Savings Fund         | Decimal     | Savings fund component                      |
| Effective From       | Date        | Date from which the rates become applicable |
| Effective To         | Date / Null | End date of applicability                   |
| Notification Number  | String      | Official notification reference             |
| Issuing Authority    | String      | Authority issuing the notification          |
| Remarks              | String      | Optional notes                              |

---

# Validation Rules

- Employee Group shall be mandatory.
- Monthly Subscription shall be non-negative.
- Insurance Fund shall be non-negative.
- Savings Fund shall be non-negative.
- Effective periods shall not overlap.
- Historical records shall never be modified.
- New government notifications shall create new records.

---

# Reference Table

| Employee Group | Monthly Subscription | Insurance Fund | Savings Fund | Effective From | Effective To | Notification Number | Issuing Authority   | Remarks             |
| -------------- | -------------------: | -------------: | -----------: | -------------- | ------------ | ------------------- | ------------------- | ------------------- |
| TBD            |                  TBD |            TBD |          TBD | YYYY-MM-DD     | NULL         | GO-XXXX             | Ministry of Finance | Initial placeholder |

---

# Lookup Rules

Lookup shall be performed using:

1. Employee Group

2. Effective Date

The applicable record for the requested effective date shall be returned.

---

# Backend Interface

Expected backend operations:

```text
getCGEGISRates(employeeGroup, effectiveDate)

getMonthlySubscription(employeeGroup, effectiveDate)

getInsuranceFund(employeeGroup, effectiveDate)

getSavingsFund(employeeGroup, effectiveDate)
```

---

# Data Integrity Rules

- Only one active record may exist for a given employee group and effective date.
- Historical records shall remain immutable.
- Every record shall reference an official notification.
- This table shall contain only reference data.
- CGEGIS calculation logic shall remain in `rules/cgegis/`.

---

# References

Populate using official sources such as:

- Ministry of Finance CGEGIS Notifications
- Railway Board Circulars
- Government of India Orders

---

# Revision History

| Version | Date       | Description     |
| ------- | ---------- | --------------- |
| 1.0.0   | YYYY-MM-DD | Initial version |
