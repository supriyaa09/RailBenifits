# Employee Portal

The Employee Portal is the user-facing side of RailAssist for settlement guidance and retirement-related self-service.

## Main Routes

- `/employee` - employee portal shell
- `/employee/benefits` - settlement assessment form
- `/employee/result` - settlement results and official report
- `/employee/reports` - saved settlement reports
- `/employee/schemes` - scheme guidance
- `/employee/faqs` - frequently asked questions
- `/employee/circulars` - circulars and notices
- `/employee/assistant` - railway knowledge assistant

## What It Does

- Collects employee, service, salary, promotion, medical, and commutation inputs.
- Calculates settlement-related outputs using the existing rule and calculation engines.
- Shows the official report preview, print workflow, and PDF download workflow.
- Lets employees review saved report versions and supporting references.

## Implementation Notes

- Portal shell: [src/routes/employee.tsx](src/routes/employee.tsx)
- Results view: [src/routes/employee.result.tsx](src/routes/employee.result.tsx)
- Reports list: [src/routes/employee.reports.tsx](src/routes/employee.reports.tsx)

## Usage

1. Open the Employee Portal from the app landing page.
2. Complete the settlement assessment.
3. Review the generated result and official report.
4. Use Print Report for browser printing and Download PDF for file export.
