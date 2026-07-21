# Death Gratuity Slabs Table

Version: 1.0

Table ID: TBL-GRT-002

Status: VERIFIED

---

# 1. Purpose

This table maintains the official Death Gratuity service slabs prescribed under the Railway Services (Pension) Rules.

The Railway Benefits Calculation Engine shall use this table to determine the applicable Death Gratuity slab based on the employee's Qualifying Service.

This table contains reference data only.

It performs no calculations.

---

# 2. Authority

Primary References

- Railway Services (Pension) Rules
- Railway Board Circulars
- Department of Pension & Pensioners' Welfare (DoP&PW) Orders
- Government Notifications

---

# 3. Scope

Responsible for

- Maintaining Death Gratuity service slabs
- Recording qualifying service ranges
- Recording applicable gratuity entitlement
- Recording Government Order references

Not Responsible For

- Death Gratuity calculation
- Qualifying Service calculation
- Pension calculation
- Family Pension calculation

---

# 4. Dependencies

rules/gratuity/death_gratuity.md

tables/service/qualifying_service.md

tables/gratuity/gratuity_ceiling.md

---

# 5. Table Structure

Primary Key

Slab ID

Columns

| Column           | Type   | Description                                |
| ---------------- | ------ | ------------------------------------------ |
| Slab ID          | String | Unique slab identifier                     |
| Minimum Service  | String | Minimum qualifying service                 |
| Maximum Service  | String | Maximum qualifying service (if applicable) |
| Benefit Rule     | String | Applicable gratuity entitlement            |
| Effective Date   | Date   | Date from which the slab is applicable     |
| Government Order | String | Official Government/Railway notification   |
| Status           | String | Active / Superseded                        |

---

# 6. Validation Rules

Slab ID shall be unique.

Minimum Service is mandatory.

Benefit Rule is mandatory.

Effective Date is mandatory.

Government Order is mandatory.

Historical slabs shall never be deleted.

---

# 7. Death Gratuity Slabs Table

| Slab ID | Minimum Service | Maximum Service | Benefit Rule | Effective Date | Government Order | Status |
| ------- | --------------- | --------------- | ------------ | -------------- | ---------------- | ------ |
| DG-001  | TBD             | TBD             | TBD          | YYYY-MM-DD     | GO-XXXX          | Active |

> **Note:** Populate this table only with the officially prescribed Death Gratuity slabs under the Railway Services (Pension) Rules. Do not assume service ranges or gratuity entitlements.

---

# 8. Lookup Rules

Input

Qualifying Service

↓

Find Matching Service Slab

↓

Return

- Benefit Rule
- Government Order
- Status

↓

If No Matching Slab Exists

Return Validation Error

---

# 9. Backend Interface

Function

```python
getDeathGratuitySlab(qualifyingService)
```

Example

Input

```python
qualifyingService = "18 years"
```

Output

```json
{
  "slabId": "DG-003",
  "benefitRule": "TBD",
  "governmentOrder": "GO-XXXX",
  "status": "Active"
}
```

---

# 10. Data Integrity Rules

No duplicate Slab IDs.

Service ranges shall not overlap.

Each service period shall map to exactly one slab.

Historical slabs shall remain available.

Updates shall only occur through verified Government or Railway notifications.

---

# 11. References

- Railway Services (Pension) Rules
- Railway Board Circulars
- Department of Pension & Pensioners' Welfare (DoP&PW) Orders
- Government Notifications

---

# 12. Revision History

Version 1.0

Initial Death Gratuity Slabs Table specification.
