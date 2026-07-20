# Family Pension Beneficiary Priority

Version: 1.0

Module ID: FP-BEN-001

Status: VERIFIED (Structure)

---

# 1. Purpose

This module determines the eligible beneficiary who shall receive Family Pension after the death of a Railway employee or pensioner.

This module establishes the order of preference among eligible family members in accordance with the applicable Railway Pension Rules.

This module does NOT calculate Family Pension.

---

# 2. Authority

Primary References

- Railway Services (Pension) Rules
- Railway Board Circulars
- Department of Pension & Pensioners' Welfare (DoP&PW) Orders
- Government Notifications relating to Family Pension

---

# 3. Scope

Responsible for

- Identifying eligible beneficiaries
- Applying beneficiary priority
- Resolving multiple claimant scenarios
- Handling succession of beneficiaries
- Returning the selected beneficiary

Not Responsible For

- Family Pension Calculation
- Enhanced Family Pension
- Dearness Relief
- Pension Revision

---

# 4. Dependencies

rules/family_pension/eligibility.md

common/validation_rules.md

---

# 5. Inputs

Employee ID

Date of Death

Pension Scheme

Claimant Details

Relationship

Age

Marital Status

Disability Status

Dependency Status

Court Orders

---

# 6. Output

```json
{
    "beneficiary": "",
    "relationship": "",
    "priority": 0,
    "eligible": true,
    "reason": ""
}
```

---

# 7. Definitions

## Primary Beneficiary

The first eligible person entitled to receive Family Pension.

---

## Secondary Beneficiary

The next eligible person when the previous beneficiary becomes ineligible.

---

## Beneficiary Succession

Transfer of Family Pension to the next eligible beneficiary according to applicable rules.

---

# 8. Priority Order

Priority shall be determined according to the applicable Railway Pension Rules.

General sequence:

Priority 1

Eligible Spouse

↓

Priority 2

Eligible Child / Children

↓

Priority 3

Eligible Disabled Child

↓

Priority 4

Other eligible family members, where admissible under the applicable rules.

---

# 9. Business Rules

---

## FP-BEN-001

Determine all eligible claimants.

---

## FP-BEN-002

Remove ineligible claimants.

---

## FP-BEN-003

Sort eligible claimants according to Railway beneficiary priority.

---

## FP-BEN-004

Select the highest priority eligible beneficiary.

---

## FP-BEN-005

Only one beneficiary shall receive Family Pension at a time unless otherwise permitted by applicable rules.

---

## FP-BEN-006

When the current beneficiary becomes ineligible, determine the next eligible beneficiary.

---

## FP-BEN-007

Court Orders shall override standard priority wherever legally applicable.

---

# 10. Decision Table

| Condition | Action |
|-----------|--------|
| Eligible Spouse Exists | Select Spouse |
| No Eligible Spouse | Evaluate Children |
| No Eligible Children | Evaluate Other Eligible Family Members |
| Court Order Exists | Apply Court Order |

---

# 11. Decision Flow

Start

↓

Find Eligible Claimants

↓

Apply Priority Rules

↓

Highest Priority Available?

↓

Yes

↓

Select Beneficiary

↓

Return Result

↓

No

↓

Reject Claim

---

# 12. Validation Rules

Relationship mandatory

Identity Proof mandatory

Eligibility confirmed

Required documents verified

---

# 13. Edge Cases

Multiple eligible claimants

↓

Apply priority rules.

---

Beneficiary dies

↓

Select next eligible beneficiary.

---

Court dispute

↓

Follow court decision.

---

Claim withdrawn

↓

Evaluate remaining eligible claimants.

---

# 14. Rule Traceability Matrix

| Rule ID | Requirement | Backend Function |
|----------|-------------|------------------|
| FP-BEN-001 | Identify claimants | identifyClaimants() |
| FP-BEN-002 | Validate eligibility | validateClaimants() |
| FP-BEN-003 | Apply priority | applyPriorityRules() |
| FP-BEN-004 | Select beneficiary | selectBeneficiary() |
| FP-BEN-005 | Handle succession | determineNextBeneficiary() |

---

# 15. Programming Flow

Identify Claimants

↓

Validate Claimants

↓

Apply Priority

↓

Select Beneficiary

↓

Return Beneficiary

---

# 16. JSON Response

```json
{
    "beneficiary": "Spouse",
    "relationship": "Wife",
    "priority": 1,
    "eligible": true,
    "status": "Selected"
}
```

---

# 17. Test Cases

| Test Case | Expected Result |
|-----------|-----------------|
| Eligible Spouse | Spouse Selected |
| No Spouse + Eligible Child | Child Selected |
| Multiple Eligible Children | Apply Applicable Rules |
| Court Order | Court Order Applied |
| No Eligible Beneficiary | Claim Rejected |

---

# 18. References

- Railway Services (Pension) Rules
- Railway Board Circulars
- DoP&PW Orders
- Government Notifications relating to Family Pension

---

# 19. Revision History

Version 1.0

Initial Beneficiary Priority specification.