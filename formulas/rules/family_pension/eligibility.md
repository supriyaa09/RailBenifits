# Family Pension Eligibility

Version: 1.0

Module ID: FP-ELG-001

Status: VERIFIED

---

# 1. Purpose

This module determines whether the family of a deceased Railway employee or pensioner is eligible to receive Family Pension under the applicable Railway Pension Rules.

This module performs only eligibility validation.

It does NOT calculate Family Pension.

---

# 2. Authority

Primary References

- Railway Services (Pension) Rules
- Railway Board Circulars
- Department of Pension & Pensioners' Welfare (DoP&PW) Orders
- Government Notifications relating to Family Pension

---

# 3. Scope

This module is responsible for

- Verifying occurrence of a valid death event
- Identifying eligible claimants
- Validating supporting documents
- Determining the applicable pension scheme
- Routing eligible claims to Family Pension processing

This module is NOT responsible for

- Family Pension calculation
- Enhanced Family Pension calculation
- Dearness Relief
- Pension revision
- Arrear calculation

---

# 4. Dependencies

common/validation_rules.md

common/date_rules.md

common/retirement_date.md

rules/family_pension/beneficiary_priority.md

---

# 5. Inputs

Employee ID

Pensioner ID (if applicable)

Employee Status

Date of Death

Date of Retirement (if applicable)

Pension Scheme

Claimant Name

Relationship with Employee

Age

Marital Status

Disability Status

Dependency Status

Required Documents

Court Orders (if any)

---

# 6. Outputs

```json
{
    "eligible": true,
    "beneficiaryCategory": "",
    "scheme": "",
    "reason": "",
    "ruleId": ""
}
```

---

# 7. Definitions

## Family Pension

A recurring pension payable to eligible family members after the death of a Railway employee or pensioner in accordance with the applicable Railway Pension Rules.

---

## Claimant

The individual submitting the Family Pension claim.

---

## Beneficiary

The person legally entitled to receive Family Pension after applying all eligibility and priority rules.

---

# 8. Business Rules

---

## FP-ELG-001

A valid death event shall exist before Family Pension processing begins.

---

## FP-ELG-002

The claimant shall belong to an eligible family category recognized under the applicable Railway Pension Rules.

---

## FP-ELG-003

Beneficiary priority shall be determined using

rules/family_pension/beneficiary_priority.md

---

## FP-ELG-004

The relationship between the claimant and the employee/pensioner shall be verified.

---

## FP-ELG-005

Mandatory supporting documents shall be verified before approval.

---

## FP-ELG-006

The applicable pension scheme shall be identified before routing the claim.

Possible schemes

- OPS
- UPS
- NPS

---

## FP-ELG-007

Only one beneficiary shall receive Family Pension at a time unless otherwise permitted under the applicable Railway Pension Rules.

---

## FP-ELG-008

Court orders shall override standard eligibility wherever legally applicable.

---

## FP-ELG-009

Incomplete or inconsistent claimant information shall result in validation failure.

---

# 9. Decision Table

| Condition | Result |
|------------|--------|
| Valid Death Event | Continue |
| Eligible Family Member | Continue |
| Valid Relationship | Continue |
| Required Documents Available | Continue |
| Unknown Relationship | Reject |
| Missing Documents | Reject |
| Court Order Exists | Apply Court Order |

---

# 10. Decision Flow

Start

↓

Validate Death Event

↓

Validate Claimant

↓

Verify Relationship

↓

Determine Beneficiary Priority

↓

Validate Documents

↓

Identify Pension Scheme

↓

Eligible

↓

Route to Family Pension Calculation

---

# 11. Validation Rules

Employee ID mandatory

Date of Death mandatory

Claimant Name mandatory

Relationship mandatory

Identity Proof mandatory

Supporting Documents mandatory

Pension Scheme mandatory

---

# 12. Required Documents

- Death Certificate
- Identity Proof of Claimant
- Relationship Proof
- Bank Account Details
- Aadhaar/PAN (where applicable)
- Passport Size Photograph
- Additional documents prescribed by Railway Administration

---

# 13. Edge Cases

## Multiple Eligible Claimants

Determine beneficiary using

beneficiary_priority.md

---

## Court Dispute

Follow the final court order.

---

## Missing Death Certificate

Suspend processing until document submission.

---

## Adoption / Guardianship

Validate according to applicable Railway Pension Rules.

---

## Missing Employee Case

Process according to Railway rules applicable to missing employees.

---

# 14. Rule Traceability Matrix

| Rule ID | Requirement | Backend Function |
|----------|-------------|------------------|
| FP-ELG-001 | Validate Death Event | validateDeathEvent() |
| FP-ELG-002 | Validate Claimant | validateClaimant() |
| FP-ELG-003 | Determine Beneficiary | determineBeneficiaryPriority() |
| FP-ELG-004 | Verify Relationship | validateRelationship() |
| FP-ELG-005 | Validate Documents | validateDocuments() |
| FP-ELG-006 | Determine Scheme | determineScheme() |

---

# 15. Programming Flow

Validate Death Event

↓

Validate Claimant

↓

Verify Relationship

↓

Determine Beneficiary

↓

Validate Documents

↓

Determine Pension Scheme

↓

Return Eligibility

---

# 16. JSON Response

```json
{
    "eligible": true,
    "beneficiaryCategory": "Spouse",
    "scheme": "OPS",
    "reason": "",
    "status": "Eligible"
}
```

---

# 17. Test Cases

| Test Case | Expected Result |
|------------|-----------------|
| Eligible Spouse | Eligible |
| Eligible Minor Child | Eligible |
| Eligible Disabled Child | Eligible |
| Invalid Relationship | Rejected |
| Missing Documents | Validation Error |
| Court Order | Court Order Applied |
| Missing Employee Case | Processed under applicable rules |

---

# 18. References

- Railway Services (Pension) Rules
- Railway Board Circulars
- Department of Pension & Pensioners' Welfare (DoP&PW) Orders
- Government Notifications relating to Family Pension

---

# 19. Revision History

Version 1.0

Initial Family Pension Eligibility Specification.