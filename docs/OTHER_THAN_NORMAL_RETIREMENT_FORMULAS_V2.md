# RailAssist

# Other Than Normal Retirement Formula Book (Version 2)

## Purpose

This document defines the pension and settlement calculation logic for
Railway employees retiring under cases other than Normal Retirement.

## Formula Source Priority

1.  Railway Board Rules
2.  CCS (Pension) Rules
3.  PFRDA Notifications
4.  Railway Settlement Workbook
5.  Railway Settlement Certificate
6.  Railway Training PPT

Whenever there is any conflict, Railway Board Rules shall prevail.

------------------------------------------------------------------------

# Retirement Types Covered

1.  Voluntary Retirement (VRS)
2.  Medical Retirement (Invalid Pension)
3.  Compulsory Retirement
4.  Death While in Service / After Retirement
5.  Removal from Service
6.  Dismissal
7.  Self Resignation

------------------------------------------------------------------------

# Common Formula Engine

## Emoluments

Pension Emoluments = Higher of: - Current Basic Pay - Average Basic Pay
of Last 10 Months

## Leave Encashment (LAP)

(Basic Pay + Dearness Allowance) × LAP Days ÷ 30

Maximum = 300 Days

## Leave Encashment (LHAP)

(Basic Pay + Dearness Allowance) × LHAP Days ÷ 60

## Fixed Medical Allowance (FMA)

Government Notified Monthly Rate

Applicable only if RELHS is not opted.

## Dearness Relief

Applicable Pension × Current DR Rate

------------------------------------------------------------------------

# Voluntary Retirement (VRS)

Basic Pension = 50% × Pension Emoluments

Family Pension = 30% × Pension Emoluments

Enhanced Family Pension = 50% × Pension Emoluments

Retirement Gratuity = (Basic Pay + Dearness Allowance) × Completed Six
Monthly Periods ÷ 4

Commuted Pension = Basic Pension × Selected Commutation Percentage

Maximum Commutation = 40%

Commuted Value = Commuted Pension × 12 × Commutation Factor

Residual Pension = Basic Pension − Commuted Pension

CTG: Normally not admissible.

Complimentary Pass: Eligibility as per Railway Pass Rules.

------------------------------------------------------------------------

# Medical Retirement (Invalid Pension)

Qualifying Service = Actual Qualifying Service + Notional Service
Addition (where admissible)

If Qualifying Service ≥ 10 Years

Invalid Pension = 50% × Pension Emoluments

If Qualifying Service \< 10 Years

Service Gratuity = 0.5 × Pension Emoluments × Completed Six Monthly
Periods

Retirement Gratuity, Family Pension, Enhanced Family Pension and
Commutation follow normal rules.

------------------------------------------------------------------------

# Compulsory Retirement

Sanctioned Pension = Normal Pension × Sanction Percentage

Gratuity payable only if sanctioned.

Leave Encashment subject to disciplinary orders.

------------------------------------------------------------------------

# Death Case

Family Pension = 30% × Last Drawn Basic Pay

Enhanced Family Pension = 50% × Last Drawn Basic Pay

Death Gratuity:

-   QS \< 1 Year = 2 × Pension Emoluments
-   1 ≤ QS \< 5 Years = 6 × Pension Emoluments
-   5 ≤ QS \< 12 Years = 12 × Pension Emoluments
-   12 ≤ QS \< 20 Years = 20 × Pension Emoluments
-   QS ≥ 20 Years = 0.5 × Pension Emoluments × Completed Six Monthly
    Periods

PF = Employee Contribution + Government Contribution + Interest

CGEGIS = As per Government table.

------------------------------------------------------------------------

# Removal from Service

Pension = 0 (unless Compassionate Allowance is sanctioned)

Gratuity = 0

Family Pension = 0

Commutation = 0

Leave Encashment subject to disciplinary orders.

PF payable as per applicable rules.

------------------------------------------------------------------------

# Dismissal

Pension = 0

Gratuity = 0

Family Pension = 0

Commutation = 0

DR = 0

FMA = 0

PF = Employee contribution payable.

------------------------------------------------------------------------

# Self Resignation

Past qualifying service normally forfeited unless Technical Resignation
is accepted.

Pension = 0

Retirement Gratuity = 0

Service Gratuity only if admissible.

Leave Encashment follows common formula.

PF = Employee Contribution + Government Contribution + Interest (as
admissible)

CTG = Not admissible.

Complimentary Pass = Not admissible.

------------------------------------------------------------------------

# Required Inputs

-   Employee Name
-   Employee ID
-   Date of Birth
-   Date of Appointment
-   Retirement Type
-   Employee Group
-   Basic Pay
-   Dearness Allowance
-   Average Last 10 Months Basic Pay
-   LAP Days
-   LHAP Days
-   Provident Fund Amount
-   CGEGIS Amount
-   Commutation Percentage
-   RELHS Option
-   FMA Option
-   Age on Next Birthday
-   Sanction Percentage
-   Officer Approval Flags
-   Technical Resignation Flag

------------------------------------------------------------------------

# Important Notes

1.  Never hardcode Commutation Factors.
2.  Fetch factors from the official Commutation Factor Table.
3.  Respect Government maximum limits.
4.  Use official RELHS Subscription Table.
5.  FMA only if RELHS is not opted.
6.  Rule Engine should control eligibility.
