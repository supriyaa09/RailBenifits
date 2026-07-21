# RailAssist – UI Workflow

## Version: 1.1

---

# 1. Overview

The user interface is designed around simplicity, clarity and a government enterprise workflow.

The application consists of two independent portals.

- Employee Portal
- Officer/Admin Portal

Authentication will be implemented in a future phase.

For the current version, users can switch between portals using a Portal Switcher.

---

# 2. Portal Switcher

+--------------------------------------------------------+

| RailAssist                                                 |
| ---------------------------------------------------------- |
|                                                            |
| Select Your Portal                                         |
|                                                            |
| [ Employee Portal ] [ Officer Portal ]                     |
|                                                            |
| +--------------------------------------------------------+ |

---

# 3. Employee Workflow

Employee

↓

Dashboard

↓

Settlement Assessment

↓

Validation Engine

↓

Rule Engine

↓

Settlement Processing Engine

↓

Settlement Results

↓

Generate Official Report

↓

Save Report

↓

Download PDF

---

# 4. Officer Workflow

Officer

↓

Dashboard

↓

Upload Circular

↓

Upload Workbook

↓

Index Documents

↓

Activate Workbook

↓

System Updated

---

# 5. Employee Navigation

- Dashboard
- Settlement Assessment
- Settlement Results
- My Settlement Reports
- Railway Pension Assistant
- Railway Schemes
- Circular Library
- FAQs

---

# 6. Officer Navigation

- Dashboard
- Rule Management
- Benefit Management
- Circular Management
- Workbook Management
- Knowledge Base
- Configuration
- AI Management
- Activity Logs

---

# 7. Employee Dashboard

Purpose

Provide a simple entry point for employees.

Cards

- New Settlement Assessment
- Continue Last Assessment
- My Settlement Reports
- Railway Schemes
- Circular Library
- AI Pension Assistant
- FAQs

---

# 8. Settlement Assessment

Sections

Employee Details

↓

Service Details

↓

Salary Details

↓

Promotion Details

↓

Medical Benefits

↓

Additional Inputs

↓

Check Settlement

---

Layout

+--------------------------------------------------------------+
| Header |
+--------------+-----------------------------------------------+
| Sidebar | Settlement Assessment |
| |-----------------------------------------------|
| Dashboard | Employee Details |
| Assessment | Service Details |
| Results | Salary Details |
| Reports | Promotion Details |
| AI | Medical Benefits |
| Schemes | Additional Inputs |
| Circulars | |
| FAQ | [ Check Settlement ] |
+--------------+-----------------------------------------------+

---

# 9. Settlement Results

The results page should resemble an official Railway settlement sheet.

Sections

- Employee Summary
- Calculation Summary
- Benefit Eligibility
- Required Documents
- Rule References
- Total Settlement

Actions

- Generate Official Report
- Download PDF
- Save Report
- Simulate Another Scenario

---

# 10. My Settlement Reports

Purpose

Allow employees to view previously generated settlement reports.

Features

- View Previous Reports
- Download PDF
- Compare Reports
- Search Reports
- Filter Reports
- Delete Report (Optional)
- Recalculate Using Latest Rules (Future)

Each report displays

- Report Number
- Employee Name
- Pension Scheme
- Retirement Type
- Generated Date
- Total Settlement

Actions

- View
- Download PDF
- Compare

---

# 11. Eligibility Simulator

Purpose

Allow employees to explore different retirement scenarios without creating an official report.

Examples

- Change Basic Pay
- Change Promotion Details
- Toggle FMA
- Compare OPS / UPS / NPS
- Compare Retirement Types

Simulation results are temporary.

No report is stored until the employee clicks

"Generate Official Settlement Report"

---

# 12. Railway Pension Assistant

Features

- Chat Interface
- Suggested Questions
- Railway Circular References
- Rule References
- Benefit Explanations

The AI must never calculate benefits.

---

# 13. Railway Schemes

Tabs

- OPS
- UPS
- NPS

Each tab displays

- Overview
- Eligibility
- Benefits
- Important Notes

---

# 14. Circular Library

Features

- Search
- Filters
- Categories
- View PDF
- Download PDF

Employees have read-only access.

---

# 15. Officer Dashboard

Widgets

- Active Workbook
- Circulars Uploaded
- Pending Indexing
- Active Rules
- AI Status
- Recent Activity

---

# 16. Circular Management

Features

- Upload Circular
- Edit Metadata
- Preview PDF
- Version History
- Publish
- Archive

---

# 17. Workbook Management

Features

- Upload Official Workbook
- Validate Workbook
- Test Workbook
- Activate Workbook
- Rollback Workbook

Only one workbook per pension scheme can be active.

---

# 18. Rule Management

Features

- Create Rule
- Edit Rule
- Activate Rule
- Deactivate Rule
- Search Rules

---

# 19. Benefit Management

Features

- Add Benefit
- Edit Benefit
- Enable/Disable Benefit
- Required Documents
- Rule References

---

# 20. Configuration

Officer can configure

- Active OPS Workbook
- Active UPS Workbook
- Active NPS Workbook
- Active Circular Version
- Active Rule Version
- AI Index Status

---

# 21. Activity Logs

Store

- User
- Action
- Module
- Timestamp
- Description

---

# 22. Responsive Design

Desktop

- Full Sidebar

Tablet

- Collapsed Sidebar

Mobile

- Drawer Navigation

---

# 23. Design Principles

The UI should be

- Clean
- Government Enterprise Style
- Explainable
- Accessible
- Responsive
- Modular
- Minimal User Effort

---

# 24. Current Status

Status

UI Workflow Completed

Next Phase

API Design
