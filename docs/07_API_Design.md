# RailAssist – API Design

## Version: 1.0

---

# 1. Overview

The RailAssist API layer acts as the communication bridge between the frontend, business logic, database and AI modules.

The frontend never communicates directly with the database.

Instead, every operation is performed through well-defined service endpoints or backend functions.

The API is organized around business domains rather than application pages.

---

# 2. API Architecture

```
React Frontend
        │
        ▼
Application Services
        │
        ▼
Backend API
        │
        ▼
Business Logic
│
├── Validation Engine
├── Rule Engine
├── Settlement Processing Engine
├── Workbook Manager
├── Circular Manager
└── AI Service
        │
        ▼
Supabase
│
├── PostgreSQL
├── Storage
└── Authentication
```

---

# 3. Employee APIs

## Calculate Settlement

POST

```
/employee/calculate
```

Purpose

Calculate employee retirement settlement.

Input

- Employee Details
- Salary Details
- Retirement Details

Output

- Settlement Summary
- Benefit Eligibility
- Rule References

---

## Generate Settlement Report

POST

```
/employee/report
```

Purpose

Generate official settlement report.

Returns

- Report Number
- PDF
- Settlement Summary

---

## Get Settlement Report

GET

```
/employee/report/{id}
```

Returns

Saved report details.

---

## Get All Reports

GET

```
/employee/reports
```

Returns

Employee report history.

---

## Delete Report

DELETE

```
/employee/report/{id}
```

Optional feature.

Allows employee to delete locally saved reports.

---

# 4. Workbook APIs

## Upload Workbook

POST

```
/workbooks/upload
```

Uploads official Railway workbook.

---

## Validate Workbook

POST

```
/workbooks/validate
```

Checks workbook format.

---

## Activate Workbook

POST

```
/workbooks/activate
```

Only one workbook per pension scheme remains active.

---

## List Workbooks

GET

```
/workbooks
```

Returns

Uploaded workbook versions.

---

## Delete Workbook

DELETE

```
/workbooks/{id}
```

---

# 5. Circular APIs

## Upload Circular

POST

```
/circulars/upload
```

---

## Get Circulars

GET

```
/circulars
```

---

## View Circular

GET

```
/circulars/{id}
```

---

## Update Circular

PUT

```
/circulars/{id}
```

---

## Archive Circular

PATCH

```
/circulars/archive/{id}
```

---

## Delete Circular

DELETE

```
/circulars/{id}
```

---

# 6. Rule APIs

## Create Rule

POST

```
/rules
```

---

## Update Rule

PUT

```
/rules/{id}
```

---

## Delete Rule

DELETE

```
/rules/{id}
```

---

## Get Rules

GET

```
/rules
```

---

## Search Rules

GET

```
/rules/search
```

---

# 7. Benefit APIs

## Get Benefits

GET

```
/benefits
```

---

## Create Benefit

POST

```
/benefits
```

---

## Update Benefit

PUT

```
/benefits/{id}
```

---

## Delete Benefit

DELETE

```
/benefits/{id}
```

---

# 8. AI APIs

## Chat

POST

```
/ai/chat
```

Purpose

Answer employee questions using Railway knowledge.

---

## Index Documents

POST

```
/ai/index
```

Used after circular uploads.

---

## AI Status

GET

```
/ai/status
```

Returns

Index status.

Knowledge base size.

Last indexed date.

---

# 9. Configuration APIs

## Get Configuration

GET

```
/configuration
```

Returns

- Active OPS Workbook
- Active UPS Workbook
- Active NPS Workbook
- Active Circular Version
- Active Rule Version

---

## Update Configuration

PUT

```
/configuration
```

Only Officers can update.

---

# 10. Activity APIs

## Activity Logs

GET

```
/logs
```

---

## Log Details

GET

```
/logs/{id}
```

---

# 11. Authentication APIs (Future)

POST

```
/auth/login
```

POST

```
/auth/logout
```

GET

```
/auth/profile
```

Authentication will be implemented using Supabase Authentication.

---

# 12. Error Response Format

Every API should return a consistent response format.

Success

```json
{
  "success": true,
  "message": "Settlement calculated successfully.",
  "data": {}
}
```

Error

```json
{
  "success": false,
  "message": "Invalid employee details.",
  "errors": []
}
```

---

# 13. Security

The API should ensure:

- Authentication
- Authorization
- Input Validation
- Rate Limiting
- Secure File Uploads
- Audit Logging

---

# 14. Future Enhancements

Future versions may support:

- OCR APIs
- Digital Signature APIs
- Notification APIs
- Email APIs
- SMS APIs
- Analytics APIs
- Mobile APIs

---

# 15. Current Status

Status

API Design Completed

Next Phase

Deployment Architecture
