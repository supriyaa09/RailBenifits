# RailAssist – Coding Standards

## Version: 1.0

---

# 1. Purpose

This document defines the coding standards, naming conventions, project structure and development practices followed throughout the RailAssist project.

The objective is to ensure that all contributors and AI-assisted development tools generate consistent, maintainable and production-quality code.

---

# 2. General Principles

The project should always follow these principles:

- Clean Architecture
- Modular Design
- Separation of Concerns
- Reusable Components
- Explainable Business Logic
- Type Safety
- Minimal Code Duplication
- Readability over Cleverness

---

# 3. Technology Standards

Frontend

- React 19
- TypeScript
- Vite
- Tailwind CSS
- TanStack Router
- React Hook Form
- Zod
- shadcn/ui

Backend

- Supabase
- PostgreSQL
- Storage

AI

- Google Gemini

---

# 4. Folder Structure

src/

components/

features/

services/

rules/

hooks/

contexts/

types/

utils/

lib/

routes/

assets/

Every folder should have a single responsibility.

---

# 5. Naming Conventions

Components

PascalCase

Example

SettlementAssessment.tsx

SettlementResults.tsx

OfficerDashboard.tsx

---

Hooks

camelCase starting with use

Example

useSettlement.ts

useEmployee.ts

---

Services

camelCase

Example

settlementService.ts

workbookService.ts

ruleService.ts

---

Types

PascalCase

Example

Employee.ts

Settlement.ts

Benefit.ts

---

Constants

UPPER_SNAKE_CASE

Example

MAX_RETIREMENT_AGE

DEFAULT_DA_PERCENTAGE

---

Files

Use descriptive names.

Avoid generic names like

data.ts

utils2.ts

final.ts

---

# 6. Component Design

Each component should have one responsibility.

Avoid creating components larger than approximately 300 lines.

If a component becomes too large, split it into smaller reusable components.

---

# 7. State Management

Use local state whenever possible.

Shared state should be managed through Context or future global state management if required.

Avoid unnecessary prop drilling.

---

# 8. Business Logic

Business calculations must never exist inside React components.

Calculations belong only inside the Settlement Processing Engine.

Rule evaluation belongs only inside the Rule Engine.

---

# 9. API Layer

UI

↓

Service Layer

↓

API Layer

↓

Supabase

Never call Supabase directly from UI components.

---

# 10. Database Access

All database operations should pass through service modules.

Example

employeeService

ruleService

workbookService

circularService

---

# 11. Error Handling

Every operation should provide meaningful feedback.

Display

- Success messages
- Warning messages
- Error messages

Never expose internal errors to users.

---

# 12. Form Validation

Use

React Hook Form

+

Zod

Validation must occur before calculations.

---

# 13. Styling

Use Tailwind CSS.

Avoid inline styles.

Prefer reusable UI components.

Maintain consistent spacing and typography.

---

# 14. Accessibility

Support

- Keyboard Navigation
- Screen Readers
- Proper Labels
- Sufficient Color Contrast

---

# 15. Git Workflow

Main

↓

rebuild-v2

↓

feature branch

↓

Pull Request

↓

Merge

Commit after every completed feature.

Commit Messages

feat:

fix:

refactor:

docs:

style:

test:

Example

feat: add settlement assessment form

fix: correct retirement date calculation

docs: update rule engine documentation

---

# 16. Testing Guidelines

Test

- Validation
- Retirement Date Logic
- Settlement Calculations
- Rule Engine
- Workbook Upload
- Circular Upload

Every critical calculation should have test cases.

---

# 17. Documentation

Every major module should include documentation.

Comments should explain "why" rather than "what".

Keep the /docs folder updated whenever architecture changes.

---

# 18. Performance

Use lazy loading where appropriate.

Avoid unnecessary re-renders.

Optimize large tables and document lists.

---

# 19. Security

Validate all user input.

Protect officer-only features.

Restrict file uploads to supported formats.

Never expose sensitive configuration in the frontend.

---

# 20. AI Development Rules

AI should never:

- Calculate pension
- Modify business rules
- Change workbook formulas
- Determine eligibility

AI should only:

- Explain rules
- Search uploaded documents
- Answer employee questions
- Reference official Railway circulars

---

# 21. Code Review Checklist

Before every commit, verify:

- Code builds successfully
- No TypeScript errors
- No lint errors
- No duplicated logic
- Documentation updated if required
- UI tested
- Business logic separated from UI

---

# 22. Development Philosophy

RailAssist should always be developed as an enterprise application.

The application must prioritize:

- Accuracy
- Maintainability
- Scalability
- Transparency
- Explainability

Every new feature should integrate into the existing architecture without breaking modularity or requiring major refactoring.

---

# 23. Current Status

Coding Standards Completed

Architecture Documentation Completed

Project Ready for Implementation