# Restoration of Commuted Pension

Version: 1.0

Module ID: COM-RES-001

Status: VERIFIED (Structure)

---

# 1. Purpose

This module determines whether a Railway pensioner is eligible for restoration of the commuted portion of pension after completion of the prescribed restoration period under the applicable Railway Services (Pension) Rules.

This module restores the deducted pension amount and updates the monthly pension payable.

---

# 2. Authority

Primary References

- Railway Services (Pension) Rules
- Railway Board Circulars
- Department of Pension & Pensioners' Welfare (DoP&PW) Orders
- Government Notifications relating to Restoration of Commuted Pension

---

# 3. Scope

Responsible for

- Determining restoration eligibility
- Determining restoration date
- Restoring commuted pension
- Updating monthly pension
- Maintaining restoration history

Not Responsible For

- Initial pension calculation
- Initial commutation calculation
- Medical examination
- Pension revision

---

# 4. Dependencies

rules/commutation/commutation.md

common/date_rules.md

common/validation_rules.md

---

# 5. Inputs

Employee ID

Pensioner ID

Original Basic Pension

Reduced Pension

Commuted Portion

Date of Commutation

Restoration Rule

Applicable Government Order

Court Order (if any)

---

# 6. Outputs

```json
{
  "eligible": true,
  "restorationDate": "",
  "restoredPension": 0,
  "status": "Success"
}
```

---

# 7. Definitions

## Restoration

Restoration is the reinstatement of the commuted portion of pension after completion of the period prescribed under the applicable Railway Pension Rules.

---

## Restoration Date

The effective date from which the commuted portion of pension becomes payable again.

---

# 8. Restoration Pipeline

---

## COM-RES-001

Validate Commutation Record.

Reference

rules/commutation/commutation.md

---

## COM-RES-002

Determine Restoration Eligibility.

Business Rule

Verify that the prescribed restoration conditions have been satisfied.

---

## COM-RES-003

Determine Restoration Date.

Business Rule

Calculate the restoration date according to the applicable Railway Pension Rules.

(Exact restoration period to be inserted after verification.)

---

## COM-RES-004

Restore Commuted Portion.

Business Rule

Restore the deducted pension amount from the restoration date.

---

## COM-RES-005

Update Monthly Pension.

Business Rule

Monthly pension shall be restored to the admissible amount after restoration.

---

## COM-RES-006

Record Restoration History.

---

## COM-RES-007

Return Restoration Details.

---

# 9. Business Rules

| Rule ID        | Description                                                                    |
| -------------- | ------------------------------------------------------------------------------ |
| COM-RES-BR-001 | Restoration shall occur only after the prescribed period.                      |
| COM-RES-BR-002 | Restoration period shall never be hardcoded.                                   |
| COM-RES-BR-003 | Restoration shall be automatic once eligibility is established.                |
| COM-RES-BR-004 | Court orders shall override normal restoration rules where legally applicable. |
| COM-RES-BR-005 | Every restoration shall be recorded in the audit history.                      |

---

# 10. Decision Table

| Condition                  | Action                   |
| -------------------------- | ------------------------ |
| Restoration Due            | Restore Pension          |
| Restoration Not Yet Due    | Continue Reduced Pension |
| Court Order                | Apply Court Order        |
| Invalid Commutation Record | Reject                   |

---

# 11. Validation Rules

Employee ID mandatory.

Commutation Record mandatory.

Commutation Date mandatory.

Original Pension mandatory.

Reduced Pension mandatory.

---

# 12. Edge Cases

Correction of commutation date.

↓

Recalculate restoration date.

---

Court-directed restoration.

↓

Apply court order.

---

Correction in pension records.

↓

Update restored pension.

---

Missing commutation record.

↓

Reject restoration.

---

# 13. Rule Traceability Matrix

| Rule ID     | Requirement       | Backend Function                  |
| ----------- | ----------------- | --------------------------------- |
| COM-RES-001 | Validate Record   | validateCommutationRecord()       |
| COM-RES-002 | Check Eligibility | determineRestorationEligibility() |
| COM-RES-003 | Calculate Date    | calculateRestorationDate()        |
| COM-RES-004 | Restore Pension   | restorePension()                  |
| COM-RES-005 | Save History      | saveRestorationHistory()          |

---

# 14. Programming Flow

Validate Commutation Record

↓

Determine Restoration Eligibility

↓

Calculate Restoration Date

↓

Restore Commuted Portion

↓

Update Monthly Pension

↓

Save Restoration Record

↓

Return Result

---

# 15. JSON Response

```json
{
  "eligible": true,
  "restorationDate": "2041-08-01",
  "restoredPension": 40000,
  "status": "Restored"
}
```

---

# 16. Test Cases

| Test Case                    | Expected Result          |
| ---------------------------- | ------------------------ |
| Restoration Period Completed | Pension Restored         |
| Restoration Not Yet Due      | Continue Reduced Pension |
| Court Order                  | Court Order Applied      |
| Missing Commutation Record   | Validation Error         |
| Corrected Commutation Date   | Restoration Recalculated |

---

# 17. References

- Railway Services (Pension) Rules
- Railway Board Circulars
- Department of Pension & Pensioners' Welfare (DoP&PW) Orders
- Government Notifications relating to Restoration of Commuted Pension

---

# 18. Revision History

Version 1.0

Initial Restoration of Commuted Pension specification.
