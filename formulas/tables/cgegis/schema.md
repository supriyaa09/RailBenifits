# CGEGIS Tables Schema

**Version:** 1.0.0

**Schema ID:** SCH-CGEGIS-001

**Status:** Draft

---

# Purpose

This schema defines the standard structure, metadata, validation rules, and backend interface for all Central Government Employees Group Insurance Scheme (CGEGIS) reference tables.

The CGEGIS module stores official government-notified reference data required for calculating insurance benefits and savings fund benefits payable to Railway employees. It serves as the authoritative source for CGEGIS reference information and contains no business logic.

---

# Scope

This schema applies to all reference tables under:

```text
tables/cgegis/
```

Current tables include:

- cgegis_rates.md

Additional CGEGIS-related reference tables may be added in future without modifying this schema.

---

# Authority

Reference data shall be maintained only from official notifications issued by:

- Government of India
- Ministry of Finance
- Ministry of Railways
- Railway Board

Unofficial sources shall never be used.

---

# Dependencies

This schema is referenced by:

- rules/cgegis/
- rules/settlement/cgegis.md

The CGEGIS rule engine shall use this module as the sole source of reference data.

---

# Standard Table Structure

Every CGEGIS reference table shall contain the following fields where applicable.

| Field               | Type            | Description                                                  |
| ------------------- | --------------- | ------------------------------------------------------------ |
| Effective From      | Date            | Date from which the record becomes applicable                |
| Effective To        | Date / Null     | End date of applicability. Null indicates the current record |
| Category            | String          | Employee group or applicable classification                  |
| Value               | Number / String | Official notified value                                      |
| Notification Number | String          | Government notification reference                            |
| Issuing Authority   | String          | Authority issuing the notification                           |
| Remarks             | String          | Optional explanatory notes                                   |

---

# Validation Rules

Every CGEGIS table shall satisfy the following conditions:

- Effective From shall be mandatory.
- Effective To may be null.
- Effective periods shall not overlap.
- Historical records shall never be modified.
- New government notifications shall create new records.
- Notification reference shall be mandatory.
- Every record shall have an issuing authority.

---

# Backend Interface

Expected backend operations include:

```text
getCGEGISRates(employeeGroup, effectiveDate)

getMonthlySubscription(employeeGroup, effectiveDate)

getInsuranceFund(employeeGroup, effectiveDate)

getSavingsFund(employeeGroup, effectiveDate)
```

Implementations may vary depending on the backend language.

---

# Data Integrity Rules

- Only one active record may exist for a given employee group and effective date.
- Historical records shall remain immutable.
- Effective dates shall be chronological.
- Every record shall reference an official notification.
- CGEGIS tables shall contain only reference data.
- Business logic shall remain within the rules layer.

---

# References

Examples of authoritative sources include:

- Ministry of Finance CGEGIS Notifications
- Railway Board Circulars
- Government of India Orders

Populate exact references when official data is entered.

---

# Revision History

| Version | Date       | Description    |
| ------- | ---------- | -------------- |
| 1.0.0   | YYYY-MM-DD | Initial schema |
