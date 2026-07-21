# Death Gratuity

Version: 1.0

Module ID: RULE-GRA-002

Status: VERIFIED

Authority

- Railway Services (Pension) Rules, 1993
- Rule 49 – Emoluments
- Rule 70 – Death Gratuity
- Relevant Railway Board circulars revising gratuity ceilings

---

# Purpose

This document defines the eligibility, calculation methodology, business rules,
validation rules, and implementation logic for Death Gratuity payable when a
Railway employee dies while in service.

Death Gratuity is payable to the eligible family or nominee in accordance with
the Railway Services (Pension) Rules.

---

# Applicability

Applicable

- Death while in Service

Not Applicable

- Retirement
- Voluntary Retirement
- Superannuation
- Death after Retirement
- Resignation
- Removal
- Dismissal

---

# Dependencies

common/emoluments.md

common/qualifying_service.md

common/validation_rules.md

tables/gratuity_ceiling.md

---

# Eligibility

Death Gratuity is admissible only when

- Employee dies while in Railway service.
- Employee is governed by applicable pension rules.
- Eligible nominee/family exists under the applicable rules.

---

# Inputs

Employee ID

Date of Death

Qualifying Service

Emoluments

Applicable Dearness Allowance (if admissible under current rules)

Nominee Details

Family Details

Applicable Gratuity Ceiling

---

# Output

```json
{
  "eligible": true,
  "qualifyingService": "",
  "emoluments": 0,
  "multiplier": "",
  "grossDeathGratuity": 0,
  "gratuityCeiling": 0,
  "payableDeathGratuity": 0,
  "beneficiary": ""
}
```

---

# Definitions

## Emoluments

Shall be determined according to Rule 49.

Reference

common/emoluments.md

---

## Qualifying Service

Shall be determined according to

common/qualifying_service.md

---

# Death Gratuity Slabs

## Slab 1

Qualifying Service

Less than 1 year

Death Gratuity

2 × Emoluments

---

## Slab 2

Qualifying Service

1 year or more but less than 5 years

Death Gratuity

6 × Emoluments

---

## Slab 3

Qualifying Service

5 years or more but less than 20 years

Death Gratuity

12 × Emoluments

---

## Slab 4

Qualifying Service

20 years or more

Death Gratuity

½ × Emoluments × Completed Six-Month Periods

Subject to

Maximum 33 × Emoluments

and

Applicable Gratuity Ceiling.

---

# Formula

## Case 1

If Service < 1 Year

DG = 2 × Emoluments

---

## Case 2

If 1 ≤ Service < 5 Years

DG = 6 × Emoluments

---

## Case 3

If 5 ≤ Service < 20 Years

DG = 12 × Emoluments

---

## Case 4

If Service ≥ 20 Years

DG = (Emoluments × Completed Six-Month Periods) / 2

Apply

- Maximum 33 × Emoluments
- Applicable Gratuity Ceiling

---

# Variables

| Variable | Description                 |
| -------- | --------------------------- |
| E        | Emoluments                  |
| CSP      | Completed Six-Month Periods |
| DG       | Death Gratuity              |

---

# Business Rules

## BR-001

Qualifying Service shall be determined before selecting the gratuity slab.

---

## BR-002

Emoluments shall be determined according to Rule 49.

---

## BR-003

For employees with 20 years or more of qualifying service,
completed six-month periods shall be used.

---

## BR-004

Death Gratuity shall not exceed

- 33 × Emoluments

or

- Applicable Gratuity Ceiling

whichever is lower.

---

## BR-005

The gratuity ceiling shall NOT be hardcoded.

It shall always be obtained from

tables/gratuity_ceiling.md

---

# Nomination

Payment shall be made

- To the valid nominee, if one exists.

Otherwise

- To eligible family members according to the applicable Railway rules.

---

# Special Cases

## Death During Leave

Eligible if employee continues to be in service under applicable rules.

---

## Death During Suspension

Benefit shall be determined according to applicable service and pension rules.

---

## Missing Employee Declared Dead

Follow the applicable Railway and Government instructions before authorizing payment.

---

## Court Order

Court directions shall override normal payment flow wherever applicable.

---

# Validation Rules

Employee Status = In Service

Date of Death is mandatory.

Emoluments > 0

Qualifying Service ≥ 0

Beneficiary details available.

Applicable gratuity ceiling available.

---

# Worked Examples

## Example 1

Qualifying Service

8 Months

Emoluments

₹60,000

Death Gratuity

2 × 60,000

=

₹1,20,000

---

## Example 2

Qualifying Service

3 Years

Emoluments

₹75,000

Death Gratuity

6 × 75,000

=

₹4,50,000

---

## Example 3

Qualifying Service

15 Years

Emoluments

₹82,000

Death Gratuity

12 × 82,000

=

₹9,84,000

---

## Example 4

Qualifying Service

25 Years

Completed Six-Month Periods

50

Emoluments

₹80,000

Gross Death Gratuity

(80,000 × 50) ÷ 2

=

₹20,00,000

Then

Apply

- 33 × Emoluments limit
- Applicable gratuity ceiling

Return lower admissible amount.

---

# Programming Logic

Validate Inputs

↓

Validate Employee Status

↓

Determine Qualifying Service

↓

Determine Applicable Slab

↓

Calculate Gross Death Gratuity

↓

Apply 33× Limit

↓

Fetch Ceiling from

tables/gratuity_ceiling.md

↓

Apply Ceiling

↓

Determine Beneficiary

↓

Return Final Amount

---

# Test Cases

| Case                          | Expected Result                               |
| ----------------------------- | --------------------------------------------- |
| 8 months service              | 2 × Emoluments                                |
| 2 years service               | 6 × Emoluments                                |
| 10 years service              | 12 × Emoluments                               |
| 22 years service              | Half emoluments × completed six-month periods |
| High amount exceeding ceiling | Ceiling applied                               |
| No nominee                    | Family rules invoked                          |

---

# Common Mistakes

❌ Using Retirement Gratuity formula.

❌ Ignoring service slabs.

❌ Ignoring 33× emoluments limit.

❌ Hardcoding gratuity ceiling.

❌ Ignoring nominee validation.

---

# References

- Railway Services (Pension) Rules, 1993 – Rule 49
- Railway Services (Pension) Rules, 1993 – Rule 70
- Railway Board circulars revising gratuity ceilings

---

# Revision History

Version 1.0

Initial verified specification based on Railway Services (Pension) Rules.
