# Service Tables Schema

**Version:** 1.0.0

**Schema ID:** SCH-SRV-001

**Status:** Draft

---

# Purpose

This schema defines the standard structure, metadata, validation rules, and backend interface for all service-related reference tables.

The Service module stores official reference data related to employee service, qualifying service, service classifications, and other service attributes used across multiple benefit calculation modules. These values are maintained independently of business rules and must never be hardcoded within the calculation engine.

---

# Scope

This schema applies to all reference tables under:

```text
tables/service/
```

Current tables include:

- qualifying_service.md
- service_categories.md

Additional service-related reference tables may be introduced in future without modifying this schema.

---

# Authority

Reference data shall be maintained only from official notifications issued by:

- Railway Board
- Government of India
- Department of Pension & Pensioners' Welfare (DoPPW)
- Ministry of Railways
- Other competent authorities

Unofficial sources must never be used.

---

# Dependencies

This schema is referenced by:

- Pension Rules
- Gratuity Rules
- Leave Rules
- RELHS Rules
- Settlement Rules
- Common Qualifying Service Calculation

---

# Standard Table Structure

Every service reference table shall contain the following fields where applicable.

| Field               | Type            | Description                                              |
| ------------------- | --------------- | -------------------------------------------------------- |
| Effective From      | Date            | Date from which the record becomes applicable            |
| Effective To        | Date / Null     | End date of applicability. Null indicates current record |
| Category            | String          | Service category or classification                       |
| Value               | String / Number | Applicable value                                         |
| Notification Number | String          | Official notification reference                          |
| Issuing Authority   | String          | Authority issuing the notification                       |
| Remarks             | String          | Optional explanatory notes                               |

---

# Validation Rules

Every service table must satisfy the following conditions:

- Effective From shall be mandatory.
- Effective To may be null.
- Effective periods shall not overlap.
- Historical records shall never be modified.
- New notifications shall create new records.
- Notification reference shall be mandatory.
- Every record shall have an issuing authority.

---

# Backend Interface

Expected backend operations include:

```text
getQualifyingServiceReference()

getServiceCategory(categoryCode)

getApplicableServicePolicy(effectiveDate)
```

Implementations may vary depending on the backend language.

---

# Data Integrity Rules

- Only one active record may exist for a given category and date.
- Historical records must remain immutable.
- Effective dates shall be chronological.
- Every record shall reference an official notification.
- Service tables shall contain only reference data and no business logic.

---

# References

Examples of authoritative sources include:

- Railway Services (Pension) Rules
- Railway Establishment Code
- Railway Board Circulars
- Government of India Notifications

Populate exact references when official data is entered.

---

# Revision History

| Version | Date       | Description    |
| ------- | ---------- | -------------- |
| 1.0.0   | YYYY-MM-DD | Initial schema |
