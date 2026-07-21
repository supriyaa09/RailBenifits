# Service Categories Reference Table

**Version:** 1.0.0

**Table ID:** TBL-SRV-002

**Status:** Draft

---

# Purpose

This table defines the official service categories applicable to Railway employees.

It serves as the authoritative reference for employee service classification across the Railway Benefits Calculation Engine. The values in this table are used by multiple rule engines but do not contain any business logic.

---

# Authority

Reference data shall be maintained only from official notifications issued by:

- Government of India
- Ministry of Railways
- Railway Board
- Department of Pension & Pensioners' Welfare (DoPPW)

---

# Scope

This table applies to:

- Pension
- Family Pension
- Gratuity
- Leave Encashment
- RELHS
- CGEGIS
- Settlement Benefits
- Service Validation

---

# Dependencies

Referenced by:

- common/qualifying-service.md
- rules/pension/
- rules/gratuity/
- rules/leave/
- rules/relhs/
- rules/settlement/
- rules/cgegis/

---

# Table Structure

| Field                | Type        | Description                                                                                          |
| -------------------- | ----------- | ---------------------------------------------------------------------------------------------------- |
| Service Code         | String      | Unique identifier for the service category                                                           |
| Service Category     | String      | Official service category                                                                            |
| Description          | String      | Brief explanation of the category                                                                    |
| Eligible for Pension | Boolean     | Indicates whether employees in this category may be eligible for pension subject to applicable rules |
| Effective From       | Date        | Date from which the category becomes applicable                                                      |
| Effective To         | Date / Null | End date of applicability                                                                            |
| Notification Number  | String      | Official notification reference                                                                      |
| Issuing Authority    | String      | Authority issuing the notification                                                                   |
| Remarks              | String      | Optional notes                                                                                       |

---

# Validation Rules

- Service Code shall be unique.
- Service Category shall be unique.
- Effective periods shall not overlap.
- Historical records shall never be modified.
- New government notifications shall create new records.
- Notification reference shall be mandatory.

---

# Reference Table

| Service Code | Service Category | Description | Eligible for Pension | Effective From | Effective To | Notification Number | Issuing Authority | Remarks             |
| ------------ | ---------------- | ----------- | -------------------- | -------------- | ------------ | ------------------- | ----------------- | ------------------- |
| TBD          | TBD              | TBD         | TBD                  | YYYY-MM-DD     | NULL         | GO-XXXX             | Railway Board     | Initial placeholder |

---

# Lookup Rules

Lookup shall be performed using:

1. Service Code

or

2. Service Category

The applicable record for the requested effective date shall be returned.

---

# Backend Interface

Expected backend operations:

```text
getServiceCategory(serviceCode)

getServiceCategoryByName(serviceCategory)

isPensionEligibleCategory(serviceCode)
```

---

# Data Integrity Rules

- Service codes shall remain unique.
- Historical records shall never be deleted.
- Every record shall reference an official notification.
- This table shall contain only reference data.
- Employee eligibility calculations shall be handled by the rule engine.

---

# References

Populate using official sources such as:

- Railway Services (Pension) Rules
- Railway Establishment Code
- Railway Board Circulars
- Government of India Notifications

---

# Revision History

| Version | Date       | Description     |
| ------- | ---------- | --------------- |
| 1.0.0   | YYYY-MM-DD | Initial version |
