# Commutation of Pension

Version: 1.0

Module ID: COM-CAL-001

Status: VERIFIED (Structure)

---

# 1. Purpose

This module calculates the commuted value of pension payable to an eligible Railway pensioner under the applicable Railway Services (Pension) Rules.

The module determines the admissible portion of pension available for commutation, calculates the lump-sum commuted value using the prescribed commutation factor, determines the reduced monthly pension, and returns the complete commutation details.

---

# 2. Authority

Primary References

- Railway Services (Pension) Rules
- Railway Board Circulars
- Department of Pension & Pensioners' Welfare (DoP&PW) Orders
- Government Notifications relating to Commutation of Pension

---

# 3. Scope

Responsible for

- Validating commutation eligibility
- Determining admissible commutable pension
- Looking up commutation factor
- Calculating commuted value
- Calculating reduced monthly pension
- Determining effective date
- Returning commutation details

Not Responsible For

- Pension calculation
- Medical examination
- Pension restoration
- Pension revision

---

# 4. Dependencies

rules/commutation/eligibility.md

rules/commutation/medical_examination.md

rules/commutation/factor_lookup.md

common/emoluments.md

common/validation_rules.md

tables/commutation_factor.md

tables/pension_limits.md

---

# 5. Inputs

Employee ID

Pensioner ID

Basic Pension

Pension Scheme

Age on Next Birthday (or applicable age as prescribed)

Date of Retirement

Date of Pension Commencement

Date of Commutation

Medical Examination Status

Applicable Government Order

---

# 6. Outputs

```json
{
    "commutedPortion": 0,
    "commutationFactor": 0,
    "commutedValue": 0,
    "reducedPension": 0,
    "effectiveDate": "",
    "status": "Success"
}
```

---

# 7. Variables

| Variable | Description |
|----------|-------------|
| BP | Basic Pension |
| CP | Commuted Portion of Pension |
| CF | Commutation Factor |
| CV | Commuted Value |
| RP | Reduced Pension |

---

# 8. Calculation Pipeline

---

## COM-CAL-001

Validate Eligibility.

Reference

rules/commutation/eligibility.md

---

## COM-CAL-002

Validate Medical Examination Status.

Reference

rules/commutation/medical_examination.md

---

## COM-CAL-003

Determine Admissible Commutable Portion.

Business Rule

Determine the maximum portion of pension that may be commuted under the applicable Railway Pension Rules.

---

## COM-CAL-004

Determine Applicable Age.

Business Rule

Determine the age to be used for commutation factor selection as prescribed under the applicable rules.

---

## COM-CAL-005

Fetch Commutation Factor.

Reference

tables/commutation_factor.md

---

## COM-CAL-006

Calculate Commuted Value.

Business Rule

Apply the official commutation formula using:

- Commuted Portion
- Commutation Factor
- Applicable pension rules

(Formula to be inserted after verification.)

---

## COM-CAL-007

Calculate Reduced Monthly Pension.

Business Rule

Determine the pension payable after deducting the commuted portion.

---

## COM-CAL-008

Determine Effective Date.

Business Rule

Determine the commencement date of reduced pension according to the applicable rules.

---

## COM-CAL-009

Return Commutation Details.

---

# 9. Business Rules

| Rule ID | Description |
|----------|-------------|
| COM-CAL-BR-001 | Eligibility shall be verified before calculation. |
| COM-CAL-BR-002 | Medical examination requirements shall be satisfied before calculation where applicable. |
| COM-CAL-BR-003 | Commutable portion shall be determined only as permitted under the applicable Railway Pension Rules. |
| COM-CAL-BR-004 | Commutation factors shall always be obtained from the reference table. |
| COM-CAL-BR-005 | Commutation factors shall never be hardcoded. |
| COM-CAL-BR-006 | Reduced pension shall take effect from the date prescribed under the applicable rules. |

---

# 10. Decision Table

| Condition | Action |
|-----------|--------|
| Eligible | Continue |
| Medical Clearance Required | Await Clearance |
| Factor Available | Calculate |
| Factor Missing | Validation Error |

---

# 11. Validation Rules

Employee ID mandatory.

Basic Pension mandatory.

Age mandatory.

Commutation Date mandatory.

Applicable Factor mandatory.

---

# 12. Edge Cases

Revision of pension before commutation.

↓

Recalculate commutable amount.

---

Correction in age.

↓

Retrieve revised factor.

---

Court-directed commutation.

↓

Apply court order.

---

Missing commutation factor.

↓

Reject calculation.

---

# 13. Rule Traceability Matrix

| Rule ID | Requirement | Backend Function |
|----------|-------------|------------------|
| COM-CAL-001 | Validate Eligibility | validateEligibility() |
| COM-CAL-002 | Validate Medical Status | validateMedicalStatus() |
| COM-CAL-003 | Determine Commutable Portion | calculateCommutablePortion() |
| COM-CAL-004 | Fetch Factor | getCommutationFactor() |
| COM-CAL-005 | Calculate Value | calculateCommutedValue() |
| COM-CAL-006 | Calculate Reduced Pension | calculateReducedPension() |
| COM-CAL-007 | Determine Effective Date | calculateEffectiveDate() |

---

# 14. Programming Flow

Validate Eligibility

↓

Validate Medical Status

↓

Determine Commutable Portion

↓

Determine Applicable Age

↓

Fetch Commutation Factor

↓

Calculate Commuted Value

↓

Calculate Reduced Pension

↓

Determine Effective Date

↓

Return Result

---

# 15. JSON Response

```json
{
    "commutedPortion": 12000,
    "commutationFactor": 8.194,
    "commutedValue": 1179936,
    "reducedPension": 28000,
    "effectiveDate": "2026-08-01",
    "status": "Success"
}
```

---

# 16. Test Cases

| Test Case | Expected Result |
|-----------|-----------------|
| Eligible Superannuation Pension | Commutation Calculated |
| Medical Examination Pending | Await Medical Clearance |
| Invalid Factor | Validation Error |
| Court Order | Court Order Applied |
| Pension Revision Before Commutation | Recalculated |

---

# 17. References

- Railway Services (Pension) Rules
- Railway Board Circulars
- Department of Pension & Pensioners' Welfare (DoP&PW) Orders
- Government Notifications relating to Commutation of Pension

---

# 18. Revision History

Version 1.0

Initial Commutation Calculation specification.