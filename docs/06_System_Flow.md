# RailAssist – System Flow

## Version: 1.0

---

# 1. Overview

This document describes how data moves through the RailAssist application.

Rather than allowing the UI to directly perform calculations, every request flows through independent system components.

This architecture improves maintainability, scalability and transparency.

---

# 2. High Level System Flow

```
                Employee Portal
                      │
                      ▼
          Settlement Assessment Form
                      │
                      ▼
             Validation Engine
                      │
                      ▼
                Rule Engine
                      │
                      ▼
          Settlement Processing Engine
                      │
         ┌────────────┴────────────┐
         │                         │
         ▼                         ▼
 Calculation Result        Benefit Eligibility
         │                         │
         └────────────┬────────────┘
                      ▼
             Settlement Report
                      │
        ┌─────────────┴─────────────┐
        ▼                           ▼
 Download PDF              Save Settlement Report
```

---

# 3. Employee Workflow

```
Open Portal

↓

Select Employee Portal

↓

Dashboard

↓

Settlement Assessment

↓

Enter Employee Details

↓

Enter Salary Details

↓

Check Settlement

↓

Validation Engine

↓

Rule Engine

↓

Settlement Processing Engine

↓

Settlement Result

↓

Generate Official Report

↓

Download PDF
```

---

# 4. Officer Workflow

```
Open Portal

↓

Select Officer Portal

↓

Dashboard

↓

Upload Circular

↓

Upload Workbook

↓

Validate Workbook

↓

Generate Search Index

↓

Activate Workbook

↓

System Ready
```

---

# 5. Rule Evaluation Flow

```
Employee Details

↓

Pension Scheme

↓

Retirement Type

↓

Years of Service

↓

Benefit Rules

↓

Eligible Benefits

↓

Calculation Engine
```

---

# 6. Calculation Flow

```
Employee Inputs

↓

Validation

↓

Load Active Workbook

↓

Formula Engine

↓

Settlement Calculation

↓

Calculation Summary

↓

Total Settlement
```

---

# 7. AI Workflow

```
Employee Question

↓

Knowledge Search

↓

Circular Search

↓

Rule Search

↓

Context Retrieval

↓

AI Response
```

The AI never performs calculations.

---

# 8. Circular Upload Flow

```
Officer Uploads PDF

↓

Extract Text

↓

Store File

↓

Store Metadata

↓

Generate Search Index

↓

Knowledge Base Updated
```

---

# 9. Workbook Upload Flow

```
Officer Uploads Workbook

↓

Validate Workbook

↓

Extract Workbook Metadata

↓

Store Workbook

↓

Activate Workbook

↓

Calculation Engine Updated
```

---

# 10. Settlement Report Flow

```
Settlement Result

↓

Generate Report Number

↓

Generate PDF

↓

Save Report

↓

Download Report
```

---

# 11. Future Auth Flow

```
Login

↓

Supabase Authentication

↓

Role Detection

↓

Employee

OR

Officer

↓

Dashboard
```

---

# 12. Error Handling Flow

```
Invalid Input

↓

Validation Error

↓

User Correction

↓

Continue
```

```
Workbook Missing

↓

System Error

↓

Officer Notification

↓

Upload Required
```

---

# 13. Future AI Flow

```
Question

↓

Retrieve Documents

↓

Retrieve Circulars

↓

Retrieve Rules

↓

Build Context

↓

Gemini

↓

Verified Response
```

---

# 14. System Principles

- Modular
- Independent Components
- Explainable Decisions
- Configuration Driven
- Workbook Driven
- Scalable
- Future Ready

---

# 15. Current Status

System Flow Completed

Next Phase

API Design