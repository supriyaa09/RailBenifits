# Medical Examination for Commutation of Pension

Version: 1.0

Module ID: COM-MED-001

Status: VERIFIED (Structure)

---

# 1. Purpose

This module determines whether a Railway pensioner is required to undergo a medical examination before commutation of pension can be sanctioned.

The module applies the applicable Railway Services (Pension) Rules, Government notifications, and Railway Board instructions governing medical examination for commutation.

This module does NOT calculate commutation.

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

- Determining whether medical examination is required
- Determining exemptions
- Identifying the competent medical authority
- Returning medical examination status

Not Responsible For

- Commutation calculation
- Pension calculation
- Medical examination procedure
- Restoration of pension

---

# 4. Dependencies

rules/commutation/eligibility.md

common/date_rules.md

common/validation_rules.md

---

# 5. Inputs

Employee ID

Pensioner ID

Date of Retirement

Date of Pension Commencement

Date of Application

Age

Medical History (where applicable)

Applicable Government Order

Court Order (if any)

---

# 6. Output

```json
{
  "medicalExaminationRequired": false,
  "reason": "",
  "medicalAuthority": "",
  "status": "Eligible"
}
```

---

# 7. Definitions

## Medical Examination

Medical assessment conducted by the competent authority to determine fitness for commutation wherever prescribed.

---

## Medical Authority

Authority designated under the applicable Railway/Government rules to conduct the examination.

---

## Exemption

A condition under which medical examination is not required.

---

# 8. Business Rules

---

## COM-MED-001

Determine whether the applicant falls under a category requiring medical examination according to the applicable Railway Pension Rules.

---

## COM-MED-002

Where exempted by rule, medical examination shall not be required.

---

## COM-MED-003

If medical examination is required, the applicant shall be referred to the competent medical authority.

---

## COM-MED-004

Court orders shall override standard medical examination requirements wherever legally applicable.

---

## COM-MED-005

Incomplete application details shall result in validation failure.

---

# 9. Decision Table

| Condition                        | Action                              |
| -------------------------------- | ----------------------------------- |
| Medical Examination Required     | Refer to Medical Authority          |
| Medical Examination Not Required | Continue to Commutation Calculation |
| Court Order Exists               | Apply Court Order                   |
| Missing Information              | Validation Error                    |

---

# 10. Decision Flow

Start

↓

Validate Application

↓

Determine Medical Examination Requirement

↓

Medical Examination Required?

↓

Yes

↓

Refer to Medical Authority

↓

Receive Medical Decision

↓

Continue

↓

No

↓

Route to Commutation Calculation

---

# 11. Validation Rules

Employee ID mandatory.

Application Date mandatory.

Pension Sanction mandatory.

Applicable Government Order mandatory.

---

# 12. Edge Cases

Late application.

↓

Re-evaluate medical examination requirement.

---

Court-directed exemption.

↓

Apply court order.

---

Change in applicable rules.

↓

Apply revised provisions.

---

Incomplete medical records.

↓

Suspend processing until records are complete.

---

# 13. Rule Traceability Matrix

| Rule ID     | Requirement             | Backend Function              |
| ----------- | ----------------------- | ----------------------------- |
| COM-MED-001 | Determine Requirement   | determineMedicalRequirement() |
| COM-MED-002 | Check Exemption         | checkMedicalExemption()       |
| COM-MED-003 | Refer Medical Authority | assignMedicalAuthority()      |
| COM-MED-004 | Apply Court Order       | applyCourtOrder()             |
| COM-MED-005 | Validate Application    | validateMedicalApplication()  |

---

# 14. Programming Flow

Validate Application

↓

Determine Medical Requirement

↓

Medical Required?

↓

Yes

↓

Assign Medical Authority

↓

Await Medical Result

↓

Return Decision

↓

No

↓

Proceed to Commutation Calculation

---

# 15. JSON Response

```json
{
  "medicalExaminationRequired": true,
  "medicalAuthority": "Competent Railway Medical Authority",
  "status": "Pending Medical Examination"
}
```

---

# 16. Test Cases

| Test Case                        | Expected Result               |
| -------------------------------- | ----------------------------- |
| Medical Examination Required     | Referred to Medical Authority |
| Medical Examination Not Required | Continue                      |
| Court Order Exemption            | Exempted                      |
| Missing Application Details      | Validation Error              |

---

# 17. References

- Railway Services (Pension) Rules
- Railway Board Circulars
- Department of Pension & Pensioners' Welfare (DoP&PW) Orders
- Government Notifications relating to Commutation of Pension

---

# 18. Revision History

Version 1.0

Initial Medical Examination specification.
