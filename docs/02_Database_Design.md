# RailAssist – Database Design

## Version: 1.0

---

# 1. Overview

The RailAssist database is designed using PostgreSQL (Supabase).

The database stores application configuration, Railway rules, uploaded circulars, Excel workbooks, AI knowledge, and system activity.

Employee settlement calculations are generated dynamically and are not permanently stored unless explicitly required.

---

# 2. Database Overview

The system consists of the following entities.

Users

↓

Configuration

↓

Benefit Rules

↓

Circulars

↓

Excel Workbooks

↓

Knowledge Base

↓

Activity Logs

↓

Settlement Sessions

---

# 3. Users

Stores application users.

Fields

- id (UUID)
- full_name
- email
- role (Employee / Officer)
- department
- designation
- created_at
- updated_at

---

# 4. Configuration

Only one active configuration exists.

Stores which Railway resources are currently active.

Fields

- id
- active_ops_workbook
- active_ups_workbook
- active_nps_workbook
- active_rule_version
- active_circular_version
- ai_index_status
- last_indexed_at
- updated_by
- updated_at

Purpose

Allows officers to update Railway calculations without changing source code.

---

# 5. Circulars

Stores uploaded Railway circulars.

Fields

- id
- title
- circular_number
- category
- pension_scheme
- retirement_type
- department
- issue_date
- effective_date
- expiry_date
- version
- keywords
- description
- file_url
- extracted_text
- upload_status
- indexed
- uploaded_by
- uploaded_at

---

# 6. Excel Workbooks

Stores official Railway calculation workbooks.

Fields

- id
- workbook_name
- pension_scheme
- version
- effective_date
- file_url
- workbook_status
- uploaded_by
- uploaded_at
- active

Only one workbook per pension scheme should be active.

---

# 7. Benefit Rules

Stores Railway eligibility rules.

Fields

- id
- benefit_name
- pension_scheme
- retirement_type
- rule_name
- rule_description
- rule_reference
- condition
- active
- created_at
- updated_at

Example

RELHS

Condition

Normal Retirement

↓

Eligible

---

# 8. Benefit Master

Stores all supported Railway benefits.

Fields

- id
- benefit_name
- description
- category
- requires_calculation
- requires_rule_check
- active

Example

Pension

Gratuity

RELHS

Leave Encashment

PF

CGIS

FMA

CTG

---

# 9. Settlement Sessions

Temporary employee calculations.

No permanent employee database is maintained.

Fields

- id
- session_id
- employee_name
- dob
- appointment_date
- retirement_date
- qualifying_service
- pension_scheme
- retirement_type
- employee_group
- pay_matrix_level
- basic_pay
- da
- lap_days
- lhap_days
- pf
- cgis
- created_at

These records may optionally be deleted after calculation.

---

# 10. Knowledge Base

Stores AI searchable documents.

Fields

- id
- source_type
- source_id
- title
- extracted_text
- embedding
- indexed
- created_at

Sources include

Circulars

Excel Documents

Notifications

Rules

---

# 11. Activity Logs

Stores officer activity.

Fields

- id
- user_id
- activity
- module
- timestamp
- description

Examples

Uploaded Circular

Activated Workbook

Deleted Rule

Generated AI Index

---

# 12. Future Tables

The architecture supports future expansion.

Possible future tables

- Notifications
- Email Logs
- AI Chat History
- Audit Trail
- Digital Signatures
- OCR Jobs
- Analytics

---

# 13. Relationships

Users

↓

Uploads Circulars

↓

Circulars

↓

Knowledge Base

--------------------------------------------------

Users

↓

Uploads Workbook

↓

Excel Workbook

↓

Configuration

--------------------------------------------------

Configuration

↓

Calculation Engine

--------------------------------------------------

Benefit Rules

↓

Rule Engine

--------------------------------------------------

Rule Engine

↓

Settlement Result

--------------------------------------------------

Calculation Engine

↓

Settlement Report

---

# 14. Database Principles

The database follows the following principles.

- Minimal Hardcoding
- Configuration Driven
- Version Controlled
- Modular
- Explainable
- Scalable
- Future Proof

---

# 15. Current Status

Database Design Completed

Next Phase

Calculation Engine Design