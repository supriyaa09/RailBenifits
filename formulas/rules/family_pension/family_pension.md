# Family Pension

Version: 1.0

Module ID: FP-CAL-001

Status: VERIFIED (Structure)

---

# 1. Purpose

This module calculates the admissible Normal Family Pension payable to the eligible beneficiary.

This module assumes that:

- Eligibility has already been verified.
- Beneficiary has already been determined.

This module does NOT determine eligibility.

---

# 2. Authority

Primary References

- Railway Services (Pension) Rules
- Railway Board Circulars
- DoP&PW Orders
- Government Notifications relating to Family Pension

---

# 3. Scope

Responsible for

- Determining Pensionable Emoluments
- Applying Family Pension Formula
- Applying Minimum Pension Rules
- Applying Maximum Pension Rules
- Applying Rounding Rules
- Returning Family Pension

Not Responsible For

- Eligibility
- Beneficiary Selection
- Enhanced Family Pension
- Dearness Relief
- Pension Revision

---

# 4. Dependencies

rules/family_pension/eligibility.md

rules/family_pension/beneficiary_priority.md

common/emoluments.md

common/average_emoluments.md

common/validation_rules.md

tables/family_pension_rates.md

tables/pension_limits.md

---

# 5. Inputs

Employee ID

Pension Scheme

Beneficiary

Relationship

Date of Death

Qualifying Service

Emoluments

Average Emoluments

---

# 6. Output

```json
{
  "familyPension": 0,
  "beneficiary": "",
  "calculationMethod": "",
  "effectiveDate": ""
}
```

---

# 7. Variables

| Variable | Description            |
| -------- | ---------------------- |
| PE       | Pensionable Emoluments |
| FP       | Family Pension         |
| MIN      | Minimum Family Pension |
| MAX      | Maximum Family Pension |

---

# 8. Calculation Pipeline

---

## FP-CAL-001

Validate Eligibility

Reference

rules/family_pension/eligibility.md

---

## FP-CAL-002

Validate Beneficiary

Reference

rules/family_pension/beneficiary_priority.md

---

## FP-CAL-003

Determine Pensionable Emoluments

Reference

common/emoluments.md

common/average_emoluments.md

---

## FP-CAL-004

Determine Applicable Family Pension Rate

Reference

tables/family_pension_rates.md

---

## FP-CAL-005

Calculate Normal Family Pension

Business Rule

Apply the Family Pension formula prescribed under the applicable Railway Pension Rules.

(Formula to be inserted after verification.)

---

## FP-CAL-006

Apply Minimum Pension

Reference

tables/pension_limits.md

---

## FP-CAL-007

Apply Maximum Pension

Reference

tables/pension_limits.md

---

## FP-CAL-008

Apply Rounding Rules

Reference

common/service_rounding.md

---

## FP-CAL-009

Return Family Pension

Return

- Family Pension
- Beneficiary
- Effective Date
- Calculation Method

---

# 9. Business Rules

| Rule ID       | Description                                                  |
| ------------- | ------------------------------------------------------------ |
| FP-CAL-BR-001 | Eligibility shall be verified before calculation.            |
| FP-CAL-BR-002 | Beneficiary shall be determined before calculation.          |
| FP-CAL-BR-003 | Pension rates shall never be hardcoded.                      |
| FP-CAL-BR-004 | Family Pension shall follow the applicable Railway rules.    |
| FP-CAL-BR-005 | Minimum and maximum limits shall come from reference tables. |
| FP-CAL-BR-006 | Rounding shall follow applicable Railway rules.              |

---

# 10. Decision Table

| Condition            | Action            |
| -------------------- | ----------------- |
| Eligible Claim       | Continue          |
| Beneficiary Selected | Continue          |
| Rate Available       | Calculate Pension |
| Invalid Rate         | Validation Error  |

---

# 11. Validation Rules

Eligibility mandatory.

Beneficiary mandatory.

Emoluments mandatory.

Pension Scheme mandatory.

Applicable Rate mandatory.

---

# 12. Edge Cases

Revision of pensionable emoluments.

↓

Recalculate Family Pension.

---

Court-directed payment.

↓

Follow court order.

---

Correction in service records.

↓

Recompute pension.

---

# 13. Rule Traceability Matrix

| Rule ID    | Requirement          | Backend Function         |
| ---------- | -------------------- | ------------------------ |
| FP-CAL-001 | Validate Eligibility | validateEligibility()    |
| FP-CAL-002 | Validate Beneficiary | validateBeneficiary()    |
| FP-CAL-003 | Determine Emoluments | determineEmoluments()    |
| FP-CAL-004 | Fetch Pension Rate   | getFamilyPensionRate()   |
| FP-CAL-005 | Calculate Pension    | calculateFamilyPension() |

---

# 14. Programming Flow

Validate Eligibility

↓

Validate Beneficiary

↓

Determine Pensionable Emoluments

↓

Fetch Family Pension Rate

↓

Calculate Family Pension

↓

Apply Limits

↓

Apply Rounding

↓

Return Result

---

# 15. JSON Response

```json
{
  "familyPension": 32000,
  "beneficiary": "Spouse",
  "calculationMethod": "Normal Family Pension",
  "effectiveDate": "2026-01-01"
}
```

---

# 16. Test Cases

| Test Case           | Expected Result           |
| ------------------- | ------------------------- |
| Eligible Spouse     | Family Pension Calculated |
| Eligible Child      | Family Pension Calculated |
| Missing Rate        | Validation Error          |
| Invalid Beneficiary | Rejected                  |
| Court Order         | Court Order Applied       |

---

# 17. References

- Railway Services (Pension) Rules
- Railway Board Circulars
- DoP&PW Orders
- Government Notifications relating to Family Pension

---

# 18. Revision History

Version 1.0

Initial Family Pension Calculation specification.
