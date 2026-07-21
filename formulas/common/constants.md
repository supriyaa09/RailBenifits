# Constants

Version: 1.0

Module ID: COMMON-CON-001

Status: VERIFIED (Architecture)

---

# Purpose

This document defines the common constants, enumerations, naming conventions, units, and configuration values used throughout the Railway Benefits Calculation Engine.

This file SHALL NOT contain values that are periodically revised by the Railway Board (such as pension amounts, gratuity ceilings, or DA/DR rates). Those values must be stored in the `tables/` directory.

---

# Used By

- All common modules
- All calculation modules
- All validation modules
- API Layer
- Database Layer
- Reporting Engine

---

# Currency

Currency Code

```
INR
```

Currency Symbol

```
₹
```

Decimal Precision

```
2
```

Example

```
₹125000.50
```

---

# Date Format

Standard Format

```
YYYY-MM-DD
```

Example

```
2026-07-31
```

---

# Time Zone

Default

```
Asia/Kolkata
```

---

# Pension Schemes

Allowed Values

```
OPS
UPS
NPS
```

---

# Retirement Types

```
SUPERANNUATION

VOLUNTARY_RETIREMENT

PREMATURE_RETIREMENT

COMPULSORY_RETIREMENT

INVALID_RETIREMENT

DEATH_IN_SERVICE

DEATH_AFTER_RETIREMENT

RESIGNATION

REMOVAL

DISMISSAL
```

---

# Employee Status

```
ACTIVE

RETIRED

DECEASED

RESIGNED

REMOVED

DISMISSED
```

---

# Leave Status

```
DUTY

EARNED_LEAVE

HALF_PAY_LEAVE

COMMUTED_LEAVE

MATERNITY_LEAVE

PATERNITY_LEAVE

EXTRAORDINARY_LEAVE

SUSPENSION

LEAVE_WITHOUT_PAY
```

---

# Calculation Status

```
NOT_STARTED

VALIDATING

CALCULATING

COMPLETED

FAILED
```

---

# Validation Result

```
VALID

INVALID

WARNING
```

---

# Document Types

```
RETIREMENT_ORDER

APPOINTMENT_ORDER

PROMOTION_ORDER

MACP_ORDER

PAY_REVISION_ORDER

MEDICAL_BOARD_ORDER

COURT_ORDER

DEATH_CERTIFICATE
```

---

# Service Events

```
APPOINTMENT

PROMOTION

MACP

ANNUAL_INCREMENT

TRANSFER

PAY_REVISION

LEAVE

SUSPENSION

REINSTATEMENT

RETIREMENT

DEATH
```

---

# Module Prefixes

```
COMMON

RULE

TABLE

TEST

EXAMPLE

DOC
```

---

# File Naming Convention

All filenames shall use:

- lowercase
- hyphen-separated words
- `.md` extension

Example

```
retirement-date.md

family-pension.md

service-gratuity.md
```

---

# Module ID Convention

Examples

```
COMMON-001

RULE-PEN-001

RULE-GRA-001

TABLE-001

TEST-001
```

---

# JSON Standards

Property Names

Use

```
camelCase
```

Example

```json
{
  "employeeId": "",
  "retirementDate": "",
  "basicPay": 0,
  "qualifyingService": 0
}
```

---

# Boolean Values

Allowed

```
true

false
```

---

# Null Handling

Unknown values

```
null
```

Do not use

```
0

""

false
```

unless they represent actual values.

---

# Measurement Units

| Field     | Unit                  |
| --------- | --------------------- |
| Basic Pay | INR                   |
| Pension   | INR                   |
| Gratuity  | INR                   |
| Service   | Years / Months / Days |
| Age       | Completed Years       |
| Date      | YYYY-MM-DD            |

---

# Logging Levels

```
INFO

WARNING

ERROR

DEBUG
```

---

# Error Prefix

Examples

```
VAL-

CAL-

DOC-

SYS-
```

Examples

```
VAL-001

CAL-004

DOC-003

SYS-001
```

---

# Shared Principles

- Never duplicate constants across modules.
- All calculations must reference a single source of truth.
- Frequently changing values shall be stored in the `tables/` directory.
- Every module shall reference this document for common enumerations and formatting rules.

---

# Dependencies

None

---

# Related Modules

All modules in the Railway Benefits Calculation Engine.

---

# Revision History

Version 1.0

Initial centralized constants and configuration document.
