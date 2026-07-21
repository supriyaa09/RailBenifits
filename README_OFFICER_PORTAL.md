# Officer Portal

The Officer Portal is the administrative side of RailAssist for rules, formulas, knowledge, and configuration support.

## Main Routes

- `/officer` - officer portal shell
- `/officer/rules` - rule engine reference and rule management views
- `/officer/benefits` - benefit definitions and benefit references
- `/officer/formulas` - formula repository and calculation references
- `/officer/knowledge` - knowledge base and circular references
- `/officer/documents` - supporting documents and reference PDFs
- `/officer/configuration` - system configuration and admin settings

## What It Does

- Organizes the business rules behind settlement advisory calculations.
- Surfaces formulas, guidance material, and reference documents.
- Supports officer-side configuration and review workflows.

## Implementation Notes

- Portal shell: [src/routes/officer.tsx](src/routes/officer.tsx)
- Rules area: [src/routes/officer.rules.tsx](src/routes/officer.rules.tsx)
- Knowledge area: [src/routes/officer.knowledge.tsx](src/routes/officer.knowledge.tsx)

## Usage

1. Open the Officer Portal from the app landing page.
2. Review rules, benefits, formulas, and reference material.
3. Adjust configuration or inspect documents as needed.
