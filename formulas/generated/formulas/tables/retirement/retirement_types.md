# Retirement Types Reference Table

**Version:** 1.0.0

**Table ID:** TBL-RET-002

**Status:** Draft

---

# Purpose

This table defines the officially recognized retirement types applicable to Railway employees.

It provides a standardized reference for retirement classifications used by pension, gratuity, leave encashment, CGEGIS, RELHS, and settlement calculations.

This table contains only reference data and does not define eligibility criteria or calculation logic.

---

# Authority

Reference data shall be maintained only from official notifications issued by:

- Government of India
- Ministry of Railways
- Railway Board
- Department of Pension & Pensioners' Welfare (DoPPW)

---

# Scope

This table applies to all retirement-related benefit calculations, including:

- Pension
- Gratuity
- Leave Encashment
- CGEGIS
- RELHS
- Settlement Benefits

---

# Dependencies

Referenced by:

- rules/pension/
- rules/gratuity/
- rules/leave/
- rules/relhs/
- rules/settlement/

---

# Table Structure

| Field | Type | Description |
|--------|------|-------------|
| Retirement Code | String | Unique code identifying the retirement type |
| Retirement Type | String | Official retirement classification |
| Description | String | Brief description of the retirement type |
| Pension Eligible | Boolean | Indicates whether pension may be applicable |
| Effective From | Date | Date from which the retirement type is applicable |
| Effective To | Date / Null | End date of applicability |
| Notification Number | String | Official notification reference |
| Issuing Authority | String | Authority issuing the notification |
| Remarks | String | Optional notes |

---

# Validation Rules

- Retirement Code shall be unique.
- Retirement Type shall be unique.
- Effective periods shall not overlap.
- Historical records shall never be modified.
- New government notifications shall create new records.
- Notification reference shall be mandatory.

---

# Reference Table

| Retirement Code | Retirement Type | Description | Pension Eligible | Effective From | Effective To | Notification Number | Issuing Authority | Remarks |
|-----------------|-----------------|-------------|------------------|----------------|--------------|---------------------|------------------|---------|
| TBD | TBD | TBD | TBD | YYYY-MM-DD | NULL | GO-XXXX | Railway Board | Initial placeholder |

---

# Lookup Rules

Lookup shall be performed using:

1. Retirement Code

or

2. Retirement Type

The matching record shall be returned.

---

# Backend Interface

Expected backend operations:

```text
getRetirementType(retirementCode)

getRetirementTypeByName(retirementType)

isPensionEligible(retirementCode)
```

---

# Data Integrity Rules

- Retirement codes shall remain unique.
- Historical records shall never be deleted.
- Every record shall reference an official notification.
- This table shall not contain business logic.

---

# References

Populate using official sources such as:

- Railway Services (Pension) Rules
- Railway Board Circulars
- Government of India Notifications

---

# Revision History

| Version | Date | Description |
|----------|------|-------------|
| 1.0.0 | YYYY-MM-DD | Initial version |