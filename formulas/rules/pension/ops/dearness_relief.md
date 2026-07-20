# Dearness Relief (OPS)

Version: 1.0

Module ID: OPS-DR-001

Status: VERIFIED (Structure)

---

# Authority

Primary References

- Railway Services (Pension) Rules
- Railway Board Circulars
- Department of Pension & Pensioners' Welfare (DoP&PW) Orders regarding Dearness Relief

---

# Purpose

This module determines the Dearness Relief (DR) payable to an Old Pension Scheme (OPS) pensioner.

This module does NOT calculate the Basic Pension.

---

# Scope

Responsible for

- Identifying the applicable DR rate
- Calculating Dearness Relief
- Returning the DR amount
- Returning Total Pension Payable

Not Responsible For

- Eligibility
- Pension Calculation
- Pension Revision
- Commutation Calculation

---

# Dependencies

rules/pension/ops/calculation.md

tables/da_dr_rates.md

common/validation_rules.md

---

# Inputs

Employee ID

Retirement Date

Pension Effective Date

Basic Pension

Applicable DR Rate

Pension Status

---

# Output

```json
{
    "basicPension": 0,
    "drRate": 0,
    "drAmount": 0,
    "totalPension": 0
}
```

---

# Variables

| Variable | Description |
|----------|-------------|
| BP | Basic Pension |
| DR | Dearness Relief Rate (%) |
| DRA | Dearness Relief Amount |
| TP | Total Pension Payable |

---

# Calculation Pipeline

---

## OPS-DR-001

### Validate Pension

Reference

rules/pension/ops/calculation.md

Output

Valid Pension

---

## OPS-DR-002

### Determine Applicable DR Rate

Business Rule

Determine the applicable Dearness Relief rate based on the pension effective date.

Reference

tables/da_dr_rates.md

Output

Applicable DR Rate

---

## OPS-DR-003

### Calculate Dearness Relief

Business Rule

Apply the notified Dearness Relief percentage on the admissible Basic Pension.

Formula

(To be inserted after rule verification.)

Output

Dearness Relief Amount

---

## OPS-DR-004

### Calculate Total Pension

Business Rule

Total Pension = Basic Pension + Dearness Relief

Output

Total Pension Payable

---

# Business Rules

| Rule ID | Description |
|----------|-------------|
| OPS-DR-BR-001 | DR shall be calculated only on sanctioned Basic Pension. |
| OPS-DR-BR-002 | DR rates shall never be hardcoded. |
| OPS-DR-BR-003 | DR rates shall always be fetched from reference tables. |
| OPS-DR-BR-004 | Historical calculations shall use the DR rate applicable on that date. |
| OPS-DR-BR-005 | Future DR revisions shall not require code changes. |

---

# Validation Rules

Basic Pension must exist.

Applicable DR rate must exist.

Effective Date must be valid.

Pension Status must be Active.

---

# Worked Examples

(To be added after formula verification.)

---

# Edge Cases

- Mid-year DR revision
- Arrear calculations
- Pension revision with retrospective effect
- Multiple DR notifications
- Court-directed revisions

---

# Programming Flow

Validate Pension

↓

Fetch Applicable DR Rate

↓

Calculate DR Amount

↓

Calculate Total Pension

↓

Return Result

---

# JSON Response

```json
{
    "basicPension": 50000,
    "drRate": 55,
    "drAmount": 27500,
    "totalPension": 77500
}
```

---

# Test Cases

| Test Case | Expected Result |
|------------|-----------------|
| Current DR Rate | Correct DR Amount |
| Historical DR Rate | Historical Rate Applied |
| Missing DR Rate | Validation Error |
| Zero Pension | Zero DR |
| Revised Pension | DR Recalculated |

---

# References

- Railway Board Circulars on Dearness Relief
- DoP&PW Dearness Relief Orders
- Applicable Government Notifications

---

# Revision History

Version 1.0

Initial Dearness Relief specification.