CREATE TABLE IF NOT EXISTS settlement_reports (
  report_id VARCHAR(64) PRIMARY KEY,
  employee_id VARCHAR(64),
  assessment_id VARCHAR(64),
  generated_date TIMESTAMP NOT NULL,
  report_version INTEGER NOT NULL,
  pdf_path VARCHAR(500),
  status VARCHAR(32) NOT NULL,
  remarks TEXT,
  generated_by VARCHAR(150),
  verified_by VARCHAR(150),
  approved_by VARCHAR(150)
);

CREATE INDEX IF NOT EXISTS idx_settlement_reports_employee
  ON settlement_reports (employee_id, generated_date);

CREATE INDEX IF NOT EXISTS idx_settlement_reports_status
  ON settlement_reports (status);
