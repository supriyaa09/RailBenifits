# RailAssist – Intelligent Railway Pension & Settlement Advisory System

## Project Requirements Document (PRD)

**Version:** 1.0

**Prepared By:** Supriya

**Organization:** South Central Railway Headquarters

**Status:** Draft

---

# 1. Project Overview

RailAssist is an intelligent web-based decision support system designed to simplify the Railway pension and retirement settlement process.

The system enables railway employees to determine their retirement settlement benefits by entering service-related details while allowing Railway officers to manage pension rules, circulars, benefit schemes and official calculation workbooks.

Unlike traditional calculators, RailAssist separates business rules, calculation logic, and user interface into independent modules, making the application scalable, maintainable and easy to update when Railway policies change.

---

# 2. Problem Statement

Currently, railway employees rely on multiple circulars, manual calculations and different departments to understand their retirement benefits.

Problems include:

- Complex pension calculations.
- Difficulty understanding Railway circulars.
- Frequent policy updates.
- Manual verification process.
- Lack of centralized information.
- Time-consuming settlement calculations.
- Dependency on experienced officers.

---

# 3. Proposed Solution

Develop a centralized Railway Pension & Settlement Advisory System that allows employees to:

- Calculate retirement settlement.
- View eligible benefits.
- Understand applicable Railway rules.
- Access official Railway circulars.
- Download a professional settlement report.
- Ask an AI assistant questions based only on official Railway documents.

The system will also provide officers with administrative tools to manage rules, circulars, workbooks and future policy updates without requiring software modifications.

---

# 4. Objectives

The primary objectives are:

- Simplify retirement settlement calculations.
- Reduce manual effort.
- Improve transparency.
- Provide explainable calculations.
- Support multiple pension schemes.
- Centralize Railway rules and circulars.
- Build a maintainable system that can continue operating after deployment without developer intervention.

---

# 5. User Roles

## Employee

Employees can:

- Calculate retirement settlement.
- View benefit eligibility.
- Download settlement reports.
- View Railway schemes.
- Read official circulars.
- Ask AI-related questions.

---

## Officer / Administrator

Officers can:

- Upload Railway circulars.
- Upload official Excel workbooks.
- Manage pension rules.
- Manage benefits.
- Activate new workbook versions.
- Manage AI knowledge base.
- View logs.
- Configure system settings.

---

# 6. Supported Pension Schemes

The system will support:

- Old Pension Scheme (OPS)
- Unified Pension Scheme (UPS)
- National Pension System (NPS)

Each scheme will have an independent calculation engine.

---

# 7. Retirement Cases

The system will support:

## Normal Retirement

Superannuation Retirement

---

## Other Than Normal Retirement

- Voluntary Retirement
- Medical Retirement
- Death Case
- Removal
- Dismissal
- Self Resignation

Each case will trigger different Railway rules and benefit eligibility.

---

# 8. Major Modules

## Employee Portal

- Dashboard
- Settlement Assessment
- Settlement Results
- Railway Pension Assistant
- Railway Schemes
- Circular Library
- FAQs

---

## Officer Portal

- Dashboard
- Rule Management
- Benefit Management
- Circular Management
- Workbook Management
- Knowledge Base
- AI Management
- Configuration
- Activity Logs

---

## Rule Engine

Responsible for determining eligibility for:

- RELHS
- FMA
- Family Pension
- Complimentary Pass
- Other Railway benefits

---

## Calculation Engine

Responsible for performing all financial calculations using official Railway Excel workbooks.

The calculation engine will remain independent from the user interface.

---

## AI Assistant

The Railway Pension Assistant will answer employee questions using only:

- Official Railway Circulars
- Uploaded Documents
- Active Rules
- Knowledge Base

The AI will never independently determine pension calculations.

---

# 9. Technology Stack

## Frontend

- React 19
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- TanStack Router
- React Hook Form
- Zod

---

## Backend

- Supabase
- PostgreSQL
- Supabase Storage

---

## AI

- Gemini API
- Retrieval-Augmented Generation (Future)

---

## Deployment

Frontend:

- Vercel

Backend:

- Supabase

All services should remain deployable using free tiers.

---

# 10. Future Vision

The long-term vision is to create a centralized Railway Pension Advisory System capable of adapting to future Railway policy changes through configurable workbooks and uploaded circulars.

Instead of modifying source code whenever Railway rules change, officers will update the system by uploading new official documents and activating updated calculation workbooks.

This ensures long-term maintainability and minimizes dependence on software developers after deployment.

---

# 11. Current Development Status

Current Phase:

Project Planning & System Architecture

Upcoming Phases:

- Database Design
- Calculation Engine Design
- Rule Engine Design
- Employee Portal Development
- Officer Portal Development
- AI Integration
- Testing
- Deployment

---

# 12. Document History

| Version | Date | Author | Description |
|----------|------|--------|-------------|
| 1.0 | Initial Draft | Rakesh Kumar | Project Requirements Document |

---