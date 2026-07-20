# Commutation of Pension Eligibility

Version: 1.0

Module ID: COM-ELG-001

Status: VERIFIED (Structure)

---

# 1. Purpose

This module determines whether a Railway employee or pensioner is eligible to commute a portion of their pension in accordance with the applicable Railway Services (Pension) Rules.

This module performs only eligibility validation.

It does NOT calculate the commuted value of pension.

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

- Verifying eligibility for pension commutation
- Determining whether pension type is commutable
- Determining whether medical examination is required
- Validating application timing
- Routing eligible cases to Commutation Calculation

Not Responsible For

- Commutation calculation
- Restoration of pension
- Medical examination procedure
- Pension calculation

---

# 4. Dependencies

common/validation_rules.md

common/date_rules.md

rules/commutation/medical_examination.md

rules/pension/

---

# 5. Inputs

Employee ID

Pensioner ID

Retirement Type

Pension Type

Date of Retirement

Date of Pension Commencement

Date of Application

Age

Medical Status

Court Orders (if any)

---

# 6. Outputs

```json
{
  "eligible": true,
  "requiresMedicalExamination": false,
  "reason": "",
  "ruleId": ""
}
```

---

# 7. Definitions

## Commutation of Pension

Commutation is the conversion of a permissible portion of monthly pension into a lump-sum payment in accordance with the applicable Railway Pension Rules.

---

## Applicant

The Railway employee or pensioner applying for commutation of pension.

---

## Medical Examination

A medical assessment required in certain cases before commutation can be sanctioned.

---

# 8. Business Rules

---

## COM-ELG-001

The applicant shall be entitled to commute pension only if eligible under the applicable Railway Pension Rules.

---

## COM-ELG-002

Only admissible pension types shall be eligible for commutation.

---

## COM-ELG-003

The timing of the application shall determine whether a medical examination is required.

Reference

rules/commutation/medical_examination.md

---

## COM-ELG-004

The applicable pension sanction shall exist before commutation is processed.

---

## COM-ELG-005

Applications containing incomplete or invalid information shall be rejected.

---

## COM-ELG-006

Court orders shall override standard eligibility wherever legally applicable.

---

# 9. Decision Table

| Condition | Result |
|-----------|--------|
| Eligible Pension | Continue |
| Valid Application | Continue |
| Medical Examination Required | Route to Medical Examination |
| Medical Examination Not Required | Continue |
| Invalid Pension Type | Reject |
| Court Order | Apply Court Order |

---

# 10. Decision Flow

Start

↓

Validate Pension Sanction

↓

Validate Pension Type

↓

Validate Application

↓

Determine Medical Examination Requirement

↓

Eligible

↓

Route to Commutation Calculation

---

# 11. Validation Rules

Employee ID mandatory.

Pension Type mandatory.

Date of Retirement mandatory.

Application Date mandatory.

Pension Sanction mandatory.

---

# 12. Edge Cases

Late application.

↓

Determine medical examination requirement.

---

Revision of pension before commutation.

↓

Recompute admissible pension before processing.

---

Court-directed commutation.

↓

Apply court order.

---

Invalid pension sanction.

↓

Reject application.

---

# 13. Rule Traceability Matrix

| Rule ID | Requirement | Backend Function |
|----------|-------------|------------------|
| COM-ELG-001 | Validate Eligibility | validateEligibility() |
| COM-ELG-002 | Validate Pension Type | validatePensionType() |
| COM-ELG-003 | Determine Medical Requirement | determineMedicalRequirement() |
| COM-ELG-004 | Validate Pension Sanction | validatePensionSanction() |
| COM-ELG-005 | Validate Application | validateApplication() |

---

# 14. Programming Flow

Validate Pension

↓

Validate Pension Type

↓

Determine Medical Examination Requirement

↓

Return Eligibility

---

# 15. JSON Response

```json
{
  "eligible": true,
  "requiresMedicalExamination": false,
  "status": "Eligible"
}
```

---

# 16. Test Cases

| Test Case | Expected Result |
|-----------|-----------------|
| Eligible Superannuation Pension | Eligible |
| Invalid Pension Type | Rejected |
| Medical Examination Required | Route to Medical Examination |
| Court Order | Court Order Applied |
| Missing Pension Sanction | Validation Error |

---

# 17. References

- Railway Services (Pension) Rules
- Railway Board Circulars
- Department of Pension & Pensioners' Welfare (DoP&PW) Orders
- Government Notifications relating to Commutation of Pension

---

# 18. Revision History

Version 1.0

Initial Commutation Eligibility specification.