# Qualifying Service Reference Table

**Version:** 1.0.0

**Table ID:** TBL-SRV-001

**Status:** Draft

---

# Purpose

This table defines the official reference data related to qualifying service for Railway employees.

It specifies the service categories and conditions that determine whether a period of service counts towards qualifying service for retirement benefits.

This table serves as a reference for the common qualifying service calculation engine and does not contain calculation algorithms.

---

# Authority

Reference data shall be maintained only from official notifications issued by:

- Government of India
- Ministry of Railways
- Railway Board
- Department of Pension & Pensioners' Welfare (DoPPW)

---

# Scope

This table is applicable to:

- Pension
- Gratuity
- Leave Encashment
- RELHS
- Settlement Benefits
- Other retirement-related benefits that depend on qualifying service

---

# Dependencies

Referenced by:

- common/qualifying-service.md
- rules/pension/
- rules/gratuity/
- rules/leave/
- rules/relhs/
- rules/settlement/

---

# Table Structure

| Field                             | Type        | Description                                 |
| --------------------------------- | ----------- | ------------------------------------------- |
| Service Code                      | String      | Unique identifier for the service category  |
| Service Category                  | String      | Official service classification             |
| Counts Towards Qualifying Service | Boolean     | Indicates whether the service counts        |
| Conditions                        | String      | Applicable conditions or exceptions         |
| Effective From                    | Date        | Date from which the rule becomes applicable |
| Effective To                      | Date / Null | End date of applicability                   |
| Notification Number               | String      | Official notification reference             |
| Issuing Authority                 | String      | Authority issuing the notification          |
| Remarks                           | String      | Optional notes                              |

---

# Validation Rules

- Service Code shall be unique.
- Service Category shall be unique.
- Effective periods shall not overlap.
- Historical records shall never be modified.
- New notifications shall create new records.
- Notification reference shall be mandatory.

---

# Reference Table

| Service Code | Service Category | Counts Towards Qualifying Service | Conditions | Effective From | Effective To | Notification Number | Issuing Authority | Remarks             |
| ------------ | ---------------- | --------------------------------- | ---------- | -------------- | ------------ | ------------------- | ----------------- | ------------------- |
| TBD          | TBD              | TBD                               | TBD        | YYYY-MM-DD     | NULL         | GO-XXXX             | Railway Board     | Initial placeholder |

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

isQualifyingService(serviceCode, effectiveDate)

getQualifyingServiceConditions(serviceCode)
```

---

# Data Integrity Rules

- Service codes shall remain unique.
- Historical records shall never be deleted.
- Every record shall reference an official notification.
- This table shall contain only reference data.
- Service calculation logic shall remain in `common/qualifying-service.md`.

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
