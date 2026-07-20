# Validation Rules

Version: 1.0

Module ID: COMMON-VR-001

Status: VERIFIED (Framework)

---

# Purpose

This document defines the standard validation rules that must be applied before any retirement benefit calculation is performed.

Every calculation module shall validate its inputs using this document before processing.

Validation failures must stop the calculation and return meaningful error messages.

---

# Used By

- common/basic-pay.md
- common/emoluments.md
- common/average-emoluments.md
- common/pay-history.md
- common/qualifying-service.md
- common/retirement-date.md
- common/service-rounding.md
- rules/pension/*
- rules/gratuity/*
- rules/family-pension/*
- rules/commutation/*
- rules/leave/*
- rules/settlement/*

---

# Validation Categories

- Employee Information
- Service Information
- Date Validation
- Pay Validation
- Scheme Validation
- Benefit Validation
- Document Validation
- Calculation Validation

---

# Employee Information

## VR-001

Employee ID is mandatory.

---

## VR-002

Employee Name is mandatory.

---

## VR-003

Date of Birth is mandatory.

---

## VR-004

Retirement Type is mandatory.

---

## VR-005

Pension Scheme is mandatory.

Allowed values

- OPS
- UPS
- NPS

---

# Date Validation

## VR-006

Date of Birth must be a valid calendar date.

---

## VR-007

Appointment Date must be valid.

---

## VR-008

Retirement Date must be valid.

---

## VR-009

Death Date (if applicable) must be valid.

---

## VR-010

Appointment Date must be after Date of Birth.

---

## VR-011

Retirement Date must not be earlier than Appointment Date.

---

## VR-012

Death Date cannot occur before Appointment Date.

---

## VR-013

Dates must follow ISO-8601 format.

Example

2026-07-31

---

# Service Validation

## VR-014

Qualifying Service cannot be negative.

---

## VR-015

Calendar Service cannot be negative.

---

## VR-016

Non-Qualifying Service cannot exceed Calendar Service.

---

## VR-017

Completed Service shall be calculated before rounding.

---

# Pay Validation

## VR-018

Basic Pay must be greater than zero.

---

## VR-019

Pay Level is mandatory.

---

## VR-020

Pay Matrix Cell is mandatory.

---

## VR-021

Negative pay values are not allowed.

---

## VR-022

Pay history shall not contain duplicate monthly records.

---

## VR-023

Promotion records must have a valid effective date.

---

## VR-024

MACP records must have a valid effective date.

---

## VR-025

Annual Increment shall not be applied twice in the same period.

---

# Scheme Validation

## VR-026

Employee must belong to exactly one pension scheme.

Valid

OPS

UPS

NPS

---

## VR-027

Scheme-specific calculations shall only use applicable rules.

---

# Benefit Validation

## VR-028

Benefits shall only be calculated when eligibility conditions are satisfied.

---

## VR-029

A rejected calculation shall not produce monetary output.

---

## VR-030

Benefit values shall never be negative.

---

# Document Validation

## VR-031

Retirement Orders must exist when required.

---

## VR-032

Voluntary Retirement requires an approved acceptance order.

---

## VR-033

Medical Invalidation requires a medical board order.

---

## VR-034

Court Orders shall override normal calculations where applicable.

---

# Calculation Validation

## VR-035

Mandatory inputs must be available before calculation.

---

## VR-036

All formulas shall use validated inputs only.

---

## VR-037

Missing values shall stop calculation.

---

## VR-038

Invalid records shall generate descriptive error messages.

---

# Standard Error Codes

| Code | Description |
|------|-------------|
| VR001 | Missing Employee ID |
| VR002 | Missing Employee Name |
| VR003 | Missing Date of Birth |
| VR004 | Missing Appointment Date |
| VR005 | Missing Retirement Date |
| VR006 | Invalid Date Format |
| VR007 | Invalid Retirement Type |
| VR008 | Invalid Pension Scheme |
| VR009 | Invalid Basic Pay |
| VR010 | Invalid Pay Level |
| VR011 | Invalid Qualifying Service |
| VR012 | Duplicate Pay Record |
| VR013 | Missing Promotion Order |
| VR014 | Missing Retirement Order |
| VR015 | Calculation Not Allowed |

---

# Validation Flow

Employee Details

↓

Validate Dates

↓

Validate Service

↓

Validate Pay

↓

Validate Pension Scheme

↓

Validate Eligibility

↓

Validate Documents

↓

Proceed to Calculation

---

# Returned Object

```json
{
  "isValid": true,
  "errors": [],
  "warnings": [],
  "validatedAt": ""
}
```

---

# Test Cases

## Test Case 1

Employee ID missing

Result

Validation Failed

---

## Test Case 2

Negative Basic Pay

Result

Validation Failed

---

## Test Case 3

Retirement Date before Appointment Date

Result

Validation Failed

---

## Test Case 4

Duplicate Pay Record

Result

Validation Failed

---

## Test Case 5

Valid Employee Data

Result

Validation Passed

---

# Common Mistakes

❌ Skipping mandatory validations.

❌ Performing calculations before validation.

❌ Accepting invalid dates.

❌ Allowing duplicate monthly records.

❌ Using incomplete employee information.

---

# Dependencies

common/date-rules.md

common/pay-history.md

common/basic-pay.md

---

# Related Modules

All calculation modules.

---

# Revision History

Version 1.0

Initial centralized validation framework for the Railway Benefits Calculation Engine.