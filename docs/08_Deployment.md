# RailAssist – Deployment Architecture

## Version: 1.0

---

# 1. Deployment Overview

RailAssist is designed as a cloud-hosted enterprise application using only free deployment services during development.

The deployment architecture separates the frontend, backend services, storage and AI while keeping the application scalable and easy to maintain.

---

# 2. Deployment Architecture

```
                    Users
                       │
                       ▼
                 Vercel Frontend
                       │
                       ▼
              Application Services
                       │
          ┌────────────┴────────────┐
          ▼                         ▼
      Supabase                 Gemini AI
          │
 ┌────────┼─────────┐
 ▼        ▼         ▼
Database Storage Authentication
```

---

# 3. Frontend

Technology

- React
- TypeScript
- Vite
- Tailwind CSS

Deployment

Vercel

Responsibilities

- Employee Portal
- Officer Portal
- Routing
- Forms
- Reports
- Dashboard

---

# 4. Backend

Technology

Supabase

Responsibilities

- PostgreSQL
- Authentication
- Storage
- Row Level Security
- Future Edge Functions

---

# 5. Storage

Supabase Storage Buckets

- circulars
- workbooks
- reports
- avatars
- documents

---

# 6. Database

PostgreSQL

Stores

- Users
- Rules
- Circulars
- Workbooks
- Reports
- Knowledge Base
- Configuration
- Activity Logs

---

# 7. AI

Provider

Google Gemini

Responsibilities

- Railway Question Answering
- Circular Search
- Rule Explanation

The AI never performs pension calculations.

---

# 8. Security

The system should support

- HTTPS
- JWT Authentication
- Row Level Security
- Secure Storage
- Audit Logging

---

# 9. CI/CD

GitHub

↓

GitHub Actions (Future)

↓

Vercel

↓

Automatic Deployment

---

# 10. Future Enterprise Deployment

The architecture should support migration to Railway servers without changing the frontend.

Possible deployment targets

- Railway Internal Servers
- Azure
- AWS
- Government Cloud

---

# 11. Backup Strategy

- Database Backup
- Storage Backup
- Workbook Backup
- Circular Backup
- Configuration Backup

---

# 12. Monitoring

Future Support

- Error Monitoring
- Usage Analytics
- AI Logs
- System Health

---

# 13. Current Status

Deployment Architecture Completed

Next Phase

Future Enhancements