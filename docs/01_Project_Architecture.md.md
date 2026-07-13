# RailAssist – System Architecture

## Version: 1.0

---

# 1. Overview

RailAssist is a modular web application designed for South Central Railway Headquarters to automate retirement settlement calculations, manage Railway rules and circulars, and provide an AI-powered advisory system.

The architecture follows a modular approach where each responsibility is isolated into independent layers. This ensures maintainability, scalability, and ease of future updates without requiring significant code changes.

---

# 2. High-Level Architecture

```
                          RailAssist
                               │
          ┌────────────────────┴────────────────────┐
          │                                         │
 Employee Portal                           Officer Portal
          │                                         │
          ▼                                         ▼
 Settlement Assessment                 Circular & Rule Management
          │                                         │
          ▼                                         ▼
      Rule Engine                         Knowledge Base
          │                                         │
          └───────────────┬─────────────────────────┘
                          ▼
                  Calculation Engine
                          │
                          ▼
                 Settlement Report Generator
                          │
                          ▼
                   PDF Export / Print
```

---

# 3. Core Modules

The application is divided into six independent modules.

## Employee Portal

Responsible for employee interaction.

Features

- Dashboard
- Settlement Assessment
- Settlement Results
- Railway Pension Assistant
- Railway Schemes
- Circular Library
- Frequently Asked Questions

---

## Officer Portal

Responsible for administration.

Features

- Dashboard
- Rule Management
- Benefit Management
- Circular Management
- Workbook Management
- Knowledge Base
- Configuration
- Activity Logs
- AI Management

---

## Rule Engine

The Rule Engine determines employee eligibility.

Responsibilities

- RELHS
- FMA
- Family Pension
- Complimentary Pass
- Other Railway Benefits

Outputs

- Eligible
- Not Eligible
- Reason
- Rule Reference
- Required Documents

The Rule Engine performs no financial calculations.

---

## Calculation Engine

Responsible for all financial calculations.

Supported Modules

- OPS
- UPS
- NPS
- Gratuity
- Leave Encashment
- Commutation
- Residual Pension
- Total Settlement

The Calculation Engine never contains UI logic.

---

## AI Assistant

The Railway Pension Assistant provides explanations only.

Responsibilities

- Explain calculations
- Explain Railway Rules
- Search Circulars
- Search Knowledge Base
- Explain benefit eligibility

The AI never determines calculations independently.

---

## Knowledge Base

Stores

- Railway Circulars
- Official Notifications
- Excel Workbooks
- Benefit Rules
- AI Embeddings (Future)

---

# 4. Data Flow

## Employee Workflow

```
Employee

↓

Settlement Assessment Form

↓

Rule Engine

↓

Calculation Engine

↓

Settlement Report

↓

Download PDF
```

---

## Officer Workflow

```
Officer

↓

Upload Circular

↓

Upload Excel Workbook

↓

Generate Index

↓

Activate Version

↓

System Updated
```

---

## AI Workflow

```
Employee Question

↓

Search Circular Database

↓

Search Knowledge Base

↓

Retrieve Relevant Information

↓

Generate Response
```

---

# 5. System Layers

The application consists of five independent layers.

## Presentation Layer

Responsible for

- React Components
- UI
- Forms
- Tables
- Reports

---

## Business Layer

Responsible for

- Rule Engine
- Calculation Engine

---

## Data Layer

Responsible for

- PostgreSQL
- Supabase Storage

---

## Knowledge Layer

Responsible for

- Circulars
- Workbooks
- AI Documents

---

## AI Layer

Responsible for

- Retrieval
- Explanation
- Search

---

# 6. Design Principles

The project follows the following principles.

- Modular Architecture
- Separation of Concerns
- Reusable Components
- Configuration Driven
- Explainable Calculations
- Minimal Hardcoding
- Future Scalability

---

# 7. Future Enhancements

The architecture supports future integration of

- OCR
- Digital Signatures
- QR Verification
- Email Notifications
- SMS Alerts
- AI Chatbot
- Excel Formula Parser
- Automatic Workbook Activation
- Analytics Dashboard

---

# 8. Architecture Goals

The architecture should ensure

- Easy maintenance
- Independent modules
- Minimal code duplication
- Easy Railway policy updates
- Long-term sustainability
- Enterprise-grade reliability

---

# 9. Current Status

Current Phase

Architecture Design

Next Phase

Database Design
