# Enhanced Family Pension

Version: 1.0

Module ID: FP-ENH-001

Status: VERIFIED (Structure)

---

# 1. Purpose

This module determines whether an eligible beneficiary qualifies for Enhanced Family Pension and calculates the admissible Enhanced Family Pension in accordance with the applicable Railway Pension Rules.

This module automatically transitions to Normal Family Pension once the enhanced pension period expires.

---

# 2. Authority

Primary References

- Railway Services (Pension) Rules
- Railway Board Circulars
- Department of Pension & Pensioners' Welfare (DoP&PW) Orders
- Government Notifications relating to Enhanced Family Pension

---

# 3. Scope

Responsible for

- Determining Enhanced Family Pension eligibility
- Determining enhanced pension period
- Calculating Enhanced Family Pension
- Monitoring transition to Normal Family Pension
- Returning Enhanced Family Pension details

Not Responsible For

- Family Pension Eligibility
- Beneficiary Selection
- Normal Family Pension Calculation
- Dearness Relief
- Pension Revision

---

# 4. Dependencies

rules/family_pension/eligibility.md

rules/family_pension/beneficiary_priority.md

rules/family_pension/family_pension.md

common/emoluments.md

common/validation_rules.md

tables/family_pension_rates.md

tables/pension_limits.md

---

# 5. Inputs

Employee ID

Beneficiary

Relationship

Date of Death

Date of Commencement of Family Pension

Pension Scheme

Qualifying Service

Pensionable Emoluments

Applicable Government Order

---

# 6. Output

```json
{
  "eligible": true,
  "enhancedFamilyPension": 0,
  "effectiveFrom": "",
  "effectiveTo": "",
  "nextModule": "family_pension.md"
}
```

---

# 7. Variables

| Variable | Description             |
| -------- | ----------------------- |
| PE       | Pensionable Emoluments  |
| EFP      | Enhanced Family Pension |
| SDATE    | Start Date              |
| EDATE    | End Date                |

---

# 8. Calculation Pipeline

---

## FP-ENH-001

Validate Family Pension Eligibility

Reference

rules/family_pension/eligibility.md

---

## FP-ENH-002

Validate Beneficiary

Reference

rules/family_pension/beneficiary_priority.md

---

## FP-ENH-003

Determine Eligibility for Enhanced Family Pension

Business Rule

Determine whether the claimant satisfies the conditions prescribed under the applicable Railway Pension Rules.

---

## FP-ENH-004

Determine Enhanced Pension Period

Business Rule

Determine the admissible enhanced pension period according to the applicable Railway Pension Rules.

---

## FP-ENH-005

Calculate Enhanced Family Pension

Business Rule

Apply the Enhanced Family Pension formula prescribed under the applicable Railway Pension Rules.

(Formula to be inserted after verification.)

---

## FP-ENH-006

Monitor Expiry of Enhanced Period

Business Rule

Determine whether the enhanced pension period has expired.

---

## FP-ENH-007

Transition to Normal Family Pension

Business Rule

After expiry of the enhanced period, route processing to

rules/family_pension/family_pension.md

---

## FP-ENH-008

Return Result

Return

- Enhanced Family Pension
- Effective Period
- Transition Information

---

# 9. Business Rules

| Rule ID       | Description                                                                                                                      |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| FP-ENH-BR-001 | Eligibility shall be verified before calculation.                                                                                |
| FP-ENH-BR-002 | Beneficiary shall be determined before calculation.                                                                              |
| FP-ENH-BR-003 | Enhanced Family Pension shall be granted only if conditions prescribed under the applicable Railway Pension Rules are satisfied. |
| FP-ENH-BR-004 | Enhanced pension period shall be determined from the applicable Government/Railway rules.                                        |
| FP-ENH-BR-005 | After expiry of the enhanced period, the system shall automatically switch to Normal Family Pension.                             |
| FP-ENH-BR-006 | Rates and duration shall never be hardcoded.                                                                                     |

---

# 10. Decision Table

| Condition                     | Action                          |
| ----------------------------- | ------------------------------- |
| Eligible for Enhanced Pension | Continue                        |
| Enhanced Period Active        | Pay Enhanced Family Pension     |
| Enhanced Period Expired       | Switch to Normal Family Pension |
| Not Eligible                  | Route to Normal Family Pension  |

---

# 11. Validation Rules

Eligibility mandatory.

Beneficiary mandatory.

Date of Death mandatory.

Pension Scheme mandatory.

Applicable Government Order mandatory.

---

# 12. Edge Cases

Revision in pensionable emoluments.

↓

Recalculate Enhanced Family Pension.

---

Court-directed enhanced pension.

↓

Apply Court Order.

---

Beneficiary changes during enhanced period.

↓

Re-evaluate beneficiary.

---

Government revision of enhanced pension rules.

↓

Apply revised rules from effective date.

---

# 13. Rule Traceability Matrix

| Rule ID    | Requirement                    | Backend Function                  |
| ---------- | ------------------------------ | --------------------------------- |
| FP-ENH-001 | Validate Eligibility           | validateEligibility()             |
| FP-ENH-002 | Validate Beneficiary           | validateBeneficiary()             |
| FP-ENH-003 | Determine Enhanced Eligibility | determineEnhancedEligibility()    |
| FP-ENH-004 | Determine Enhanced Period      | calculateEnhancedPeriod()         |
| FP-ENH-005 | Calculate Enhanced Pension     | calculateEnhancedFamilyPension()  |
| FP-ENH-006 | Monitor Expiry                 | checkEnhancedPeriodExpiry()       |
| FP-ENH-007 | Switch to Normal Pension       | transitionToNormalFamilyPension() |

---

# 14. Programming Flow

Validate Eligibility

↓

Validate Beneficiary

↓

Determine Enhanced Eligibility

↓

Determine Enhanced Period

↓

Calculate Enhanced Family Pension

↓

Enhanced Period Expired?

↓

No

↓

Continue Enhanced Pension

↓

Yes

↓

Invoke

rules/family_pension/family_pension.md

↓

Return Result

---

# 15. JSON Response

```json
{
  "eligible": true,
  "enhancedFamilyPension": 42000,
  "effectiveFrom": "2026-01-01",
  "effectiveTo": "2033-12-31",
  "nextModule": "rules/family_pension/family_pension.md"
}
```

---

# 16. Test Cases

| Test Case                 | Expected Result                   |
| ------------------------- | --------------------------------- |
| Eligible Enhanced Pension | Enhanced Pension Calculated       |
| Enhanced Period Expired   | Switched to Normal Family Pension |
| Invalid Beneficiary       | Rejected                          |
| Government Rule Revision  | Recalculated                      |
| Court Order               | Court Order Applied               |

---

# 17. References

- Railway Services (Pension) Rules
- Railway Board Circulars
- DoP&PW Orders
- Government Notifications relating to Enhanced Family Pension

---

# 18. Revision History

Version 1.0

Initial Enhanced Family Pension specification.
