# Family Pension Revision

Version: 1.0

Module ID: FP-REV-001

Status: VERIFIED (Structure)

---

# 1. Purpose

This module manages the revision of Family Pension whenever there is a change in Government or Railway policy, pension rates, Dearness Relief (DR), pay revisions, court orders, or correction of service records.

This module recalculates Family Pension while preserving the original sanction history and maintaining a complete audit trail.

This module does NOT determine eligibility or beneficiary priority.

---

# 2. Authority

Primary References

- Railway Services (Pension) Rules
- Railway Board Circulars
- Department of Pension & Pensioners' Welfare (DoP&PW) Orders
- Government Notifications relating to Pension Revision

---

# 3. Scope

Responsible for

- Identifying revision events
- Recalculating Family Pension
- Applying revised Government orders
- Calculating arrears (where applicable)
- Maintaining revision history
- Returning revised pension details

Not Responsible For

- Family Pension Eligibility
- Beneficiary Selection
- Normal Family Pension Calculation
- Enhanced Family Pension Calculation

---

# 4. Dependencies

rules/family_pension/family_pension.md

rules/family_pension/enhanced_family_pension.md

tables/family_pension_rates.md

tables/dr_rates.md

common/validation_rules.md

---

# 5. Inputs

Employee ID

Beneficiary ID

Current Family Pension

Revision Order

Effective Date

Revision Reason

Dearness Relief Rate

Court Order (if any)

---

# 6. Output

```json
{
    "revisedFamilyPension": 0,
    "arrears": 0,
    "effectiveDate": "",
    "revisionReason": "",
    "status": "Success"
}
```

---

# 7. Definitions

## Pension Revision

Recalculation of Family Pension due to changes in applicable rules, rates, or judicial decisions.

---

## Effective Date

The date from which the revised Family Pension becomes applicable.

---

## Arrears

The difference between the amount already paid and the revised amount payable from the effective date.

---

# 8. Revision Triggers

Family Pension may be revised due to:

- Government Pension Revision
- Railway Board Orders
- Dearness Relief Revision
- Correction of Service Records
- Court Orders
- Administrative Errors
- Pay Commission Recommendations
- Other legally approved revisions

---

# 9. Revision Pipeline

---

## FP-REV-001

Validate Revision Request.

---

## FP-REV-002

Identify Revision Trigger.

---

## FP-REV-003

Determine Applicable Government/Railway Order.

---

## FP-REV-004

Fetch Revised Pension Parameters.

Reference

tables/family_pension_rates.md

tables/dr_rates.md

---

## FP-REV-005

Recalculate Family Pension.

Reference

rules/family_pension/family_pension.md

---

## FP-REV-006

Calculate Arrears.

Business Rule

Calculate the difference between pension already paid and revised pension payable from the effective date.

---

## FP-REV-007

Update Revision History.

---

## FP-REV-008

Return Revised Pension Details.

---

# 10. Business Rules

| Rule ID | Description |
|----------|-------------|
| FP-REV-BR-001 | Revision shall only be applied when supported by an applicable Government/Railway order or court decision. |
| FP-REV-BR-002 | Revised rates shall never be hardcoded. |
| FP-REV-BR-003 | Arrears shall be calculated from the effective date of revision. |
| FP-REV-BR-004 | Every revision shall be recorded in the audit history. |
| FP-REV-BR-005 | Previous revision records shall never be deleted. |

---

# 11. Decision Table

| Condition | Action |
|-----------|--------|
| Government Order Issued | Recalculate Pension |
| DR Revision | Update DR Component |
| Court Order | Apply Court Decision |
| Invalid Revision Request | Reject |

---

# 12. Validation Rules

Revision Order mandatory where applicable.

Effective Date mandatory.

Revision Reason mandatory.

Beneficiary must exist.

Current Family Pension must be available.

---

# 13. Edge Cases

Multiple revision orders.

↓

Apply in chronological order.

---

Retrospective revision.

↓

Calculate arrears from effective date.

---

Court-directed revision.

↓

Override standard calculation where legally required.

---

Incorrect historical records.

↓

Correct records and recompute pension.

---

# 14. Rule Traceability Matrix

| Rule ID | Requirement | Backend Function |
|----------|-------------|------------------|
| FP-REV-001 | Validate Request | validateRevisionRequest() |
| FP-REV-002 | Identify Trigger | identifyRevisionTrigger() |
| FP-REV-003 | Load Rules | loadRevisionRules() |
| FP-REV-004 | Recalculate Pension | recalculateFamilyPension() |
| FP-REV-005 | Calculate Arrears | calculateArrears() |
| FP-REV-006 | Save History | saveRevisionHistory() |

---

# 15. Programming Flow

Validate Revision Request

↓

Identify Revision Trigger

↓

Load Applicable Rules

↓

Recalculate Family Pension

↓

Calculate Arrears

↓

Update Revision History

↓

Return Revised Pension

---

# 16. JSON Response

```json
{
    "revisedFamilyPension": 34500,
    "arrears": 18500,
    "effectiveDate": "2026-01-01",
    "revisionReason": "Government Pension Revision",
    "status": "Success"
}
```

---

# 17. Test Cases

| Test Case | Expected Result |
|-----------|-----------------|
| Government Pension Revision | Pension Recalculated |
| DR Revision | DR Updated |
| Court Order | Court Order Applied |
| Retrospective Revision | Arrears Calculated |
| Invalid Revision Request | Validation Error |

---

# 18. References

- Railway Services (Pension) Rules
- Railway Board Circulars
- Department of Pension & Pensioners' Welfare (DoP&PW) Orders
- Government Notifications relating to Pension Revision

---

# 19. Revision History

Version 1.0

Initial Family Pension Revision specification.