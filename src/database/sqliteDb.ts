import { DatabaseSync } from "node:sqlite";
import path from "node:path";

// Locate or create db file in workspace root
const DB_PATH = path.resolve(process.cwd(), "db.sqlite");

let dbInstance: DatabaseSync | null = null;
let isInitialized = false;

/**
 * Lazy initialization for SQLite database connection.
 * - In local development: attempts to open/create `db.sqlite`. Fallback to `:memory:` if disk write fails.
 * - In Vercel or production: uses `:memory:` database to prevent filesystem crashes.
 * - Top-level module execution is completely avoided so server initialization/bundling never fails.
 */
export function getDb(): DatabaseSync | null {
  if (dbInstance) {
    return dbInstance;
  }

  const isVercel = Boolean(process.env.VERCEL || process.env.VERCEL_ENV);
  const isProduction = process.env.NODE_ENV === "production";

  if (isVercel || isProduction) {
    try {
      dbInstance = new DatabaseSync(":memory:");
    } catch (err) {
      console.warn("Failed to initialize in-memory SQLite database in production/Vercel environment:", err);
      return null;
    }
  } else {
    try {
      dbInstance = new DatabaseSync(DB_PATH);
    } catch (err) {
      console.warn(`Failed to open SQLite database at ${DB_PATH}. Falling back to in-memory database:`, err);
      try {
        dbInstance = new DatabaseSync(":memory:");
      } catch (memErr) {
        console.error("Failed to initialize fallback in-memory SQLite database:", memErr);
        return null;
      }
    }
  }

  if (dbInstance && !isInitialized) {
    isInitialized = true;
    try {
      initDatabaseSchema(dbInstance);
    } catch (schemaErr) {
      console.error("Failed to initialize SQLite database schema:", schemaErr);
    }
  }

  return dbInstance;
}

// Helper to run query without returning results
export function runSql(sql: string, params: any[] = []) {
  try {
    const db = getDb();
    if (!db) return;
    const stmt = db.prepare(sql);
    stmt.run(...params);
  } catch (err) {
    console.error("Error executing runSql:", err, sql);
  }
}

// Helper to execute all rows
export function allSql(sql: string, params: any[] = []): any[] {
  try {
    const db = getDb();
    if (!db) return [];
    const stmt = db.prepare(sql);
    return stmt.all(...params);
  } catch (err) {
    console.error("Error executing allSql:", err, sql);
    return [];
  }
}

// Helper to execute single row
export function getSql(sql: string, params: any[] = []): any {
  try {
    const db = getDb();
    if (!db) return null;
    const stmt = db.prepare(sql);
    const results = stmt.all(...params);
    return results.length > 0 ? results[0] : null;
  } catch (err) {
    console.error("Error executing getSql:", err, sql);
    return null;
  }
}

// Define database schemas & seed initial dataset
export function initDatabase() {
  getDb();
}

function initDatabaseSchema(db: DatabaseSync) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS circulars (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      circular_number TEXT NOT NULL,
      effective_date TEXT,
      issue_date TEXT,
      category TEXT,
      pension_scheme TEXT,
      retirement_type TEXT,
      description TEXT,
      file_url TEXT,
      extracted_text TEXT,
      uploaded_by TEXT,
      uploaded_at TEXT
    );

    CREATE TABLE IF NOT EXISTS rules (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      category TEXT,
      scheme TEXT,
      benefit_type TEXT,
      description TEXT,
      status TEXT DEFAULT 'Active',
      applicable_retirement_types TEXT
    );

    CREATE TABLE IF NOT EXISTS rule_versions (
      id TEXT PRIMARY KEY,
      rule_id TEXT,
      version INTEGER,
      formula TEXT,
      minimum_limit REAL,
      maximum_limit REAL,
      effective_date TEXT,
      rule_number TEXT,
      approved_by TEXT,
      approved_at TEXT,
      status TEXT DEFAULT 'Approved',
      conditions TEXT,
      notes TEXT,
      source_circular_id TEXT,
      FOREIGN KEY (rule_id) REFERENCES rules(id),
      FOREIGN KEY (source_circular_id) REFERENCES circulars(id)
    );

    CREATE TABLE IF NOT EXISTS rule_changes (
      id TEXT PRIMARY KEY,
      circular_id TEXT,
      category TEXT,
      scheme TEXT,
      benefit TEXT,
      formula TEXT,
      minimum REAL,
      maximum REAL,
      effective_date TEXT,
      rule_number TEXT,
      confidence REAL,
      change_type TEXT,
      status TEXT DEFAULT 'Pending',
      extracted_json TEXT,
      FOREIGN KEY (circular_id) REFERENCES circulars(id)
    );

    CREATE TABLE IF NOT EXISTS audit_logs (
      id TEXT PRIMARY KEY,
      timestamp TEXT NOT NULL,
      officer TEXT NOT NULL,
      action TEXT NOT NULL,
      circular_number TEXT,
      rule_name TEXT,
      version INTEGER,
      changes TEXT
    );

    CREATE TABLE IF NOT EXISTS generated_markdown (
      id TEXT PRIMARY KEY,
      file_path TEXT NOT NULL,
      content TEXT NOT NULL,
      regenerated_at TEXT NOT NULL,
      rule_version_id TEXT,
      FOREIGN KEY (rule_version_id) REFERENCES rule_versions(id)
    );

    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      user_id TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL CHECK (role IN ('employee', 'officer')),
      department TEXT,
      created_at TEXT NOT NULL
    );
  `);

  // Seed default data if rules table is empty
  const countStmt = db.prepare("SELECT COUNT(*) as count FROM rules");
  const countRes = countStmt.all() as { count: number }[];
  if (countRes[0] && countRes[0].count === 0) {
    seedDatabase(db);
  }
}

function seedDatabase(db: DatabaseSync) {
  console.log("Seeding baseline database rules and versions...");

  // Seed rules
  const seedRules = [
    {
      id: "R101",
      name: "Qualifying Service for Pension",
      category: "Pension",
      scheme: "OPS & UPS",
      benefit_type: "Qualifying Service",
      description: "Requires minimum 10 years of qualifying service under defined pension schemes (OPS/UPS).",
      applicable_retirement_types: JSON.stringify(["Normal Retirement", "Voluntary Retirement", "Compulsory Retirement", "Medical Invalidation"]),
    },
    {
      id: "R203",
      name: "Pension Computation (OPS)",
      category: "Pension",
      scheme: "OPS",
      benefit_type: "Basic Pension",
      description: "Admissible pension is computed at 50% of the last basic pay or average of the last 10 months, whichever is more beneficial.",
      applicable_retirement_types: JSON.stringify(["Normal Retirement", "Voluntary Retirement", "Compulsory Retirement", "Medical Invalidation"]),
    },
    {
      id: "R310",
      name: "Family Pension Eligibility",
      category: "Pension",
      scheme: "OPS & UPS",
      benefit_type: "Family Pension",
      description: "Family pension admissible to eligible legal heirs (spouse, children, dependent parents) on employee demise.",
      applicable_retirement_types: JSON.stringify(["Death"]),
    },
    {
      id: "R312",
      name: "Enhanced Family Pension",
      category: "Pension",
      scheme: "OPS & UPS",
      benefit_type: "Enhanced Family Pension",
      description: "Enhanced family pension payable at 50% of basic pay (instead of 30%) for 10 years or until age 67, whichever is earlier.",
      applicable_retirement_types: JSON.stringify(["Death"]),
    },
    {
      id: "R405",
      name: "Retirement / Death Gratuity Computation",
      category: "Gratuity",
      scheme: "All",
      benefit_type: "Retirement Gratuity",
      description: "Computed at 1/4 of monthly emoluments (Basic + DA) per completed six-month service, subject to a statutory cap of ₹20,00,000.",
      applicable_retirement_types: JSON.stringify(["Normal Retirement", "Voluntary Retirement", "Compulsory Retirement", "Medical Invalidation", "Death"]),
    },
    {
      id: "R502",
      name: "Leave Encashment Cap",
      category: "Leave Encashment",
      scheme: "All",
      benefit_type: "Leave Encashment",
      description: "Admissible cash equivalent of leave salary for accumulated Earned Leave (LAP) and Half Pay Leave (LHAP) up to 300 days.",
      applicable_retirement_types: JSON.stringify(["Normal Retirement", "Voluntary Retirement", "Compulsory Retirement", "Medical Invalidation", "Death"]),
    },
    {
      id: "R810",
      name: "RELHS Medical Enrolment",
      category: "RELHS",
      scheme: "All",
      benefit_type: "RELHS",
      description: "Retiring railway employees with 20+ years of service are eligible for life-long free medical facilities under RELHS-97.",
      applicable_retirement_types: JSON.stringify(["Normal Retirement", "Voluntary Retirement", "Compulsory Retirement", "Medical Invalidation"]),
    },
    {
      id: "R905",
      name: "Complimentary Passes entitlement",
      category: "Pass Rules",
      scheme: "All",
      benefit_type: "Complimentary Pass",
      description: "Admissible Post-Retirement Complimentary Passes (PRCP) based on employee's group and length of service.",
      applicable_retirement_types: JSON.stringify(["Normal Retirement", "Voluntary Retirement", "Medical Invalidation"]),
    }
  ];

  const ruleStmt = db.prepare(
    "INSERT INTO rules (id, name, category, scheme, benefit_type, description, applicable_retirement_types) VALUES (?, ?, ?, ?, ?, ?, ?)"
  );
  for (const r of seedRules) {
    ruleStmt.run(r.id, r.name, r.category, r.scheme, r.benefit_type, r.description, r.applicable_retirement_types);
  }

  // Seed default versions (Version 1)
  const seedVersions = [
    {
      id: "RV-R101-V1",
      rule_id: "R101",
      version: 1,
      formula: "QualifyingServiceYears >= 10",
      minimum_limit: 10,
      maximum_limit: 40,
      effective_date: "1993-01-01",
      rule_number: "Rule 49",
      conditions: "Minimum qualifying service of 10 years",
      notes: "Baseline statutory rule from Railway Services (Pension) Rules 1993."
    },
    {
      id: "RV-R203-V1",
      rule_id: "R203",
      version: 1,
      formula: "0.50 * Max(BasicPay, AverageEmoluments)",
      minimum_limit: 9000,
      maximum_limit: 125000,
      effective_date: "2016-01-01",
      rule_number: "RBE No. 45/2022",
      conditions: "Capped between minimum of Rs. 9,000 and maximum of Rs. 1,25,000.",
      notes: "Computed at 50% of the last basic pay or average of the last 10 months."
    },
    {
      id: "RV-R310-V1",
      rule_id: "R310",
      version: 1,
      formula: "0.30 * BasicPay",
      minimum_limit: 9000,
      maximum_limit: 75000,
      effective_date: "2016-01-01",
      rule_number: "RBE No. 12/2021",
      conditions: "Admissible family pension is 30% of Basic Pay.",
      notes: "Ordinary family pension rate."
    },
    {
      id: "RV-R312-V1",
      rule_id: "R312",
      version: 1,
      formula: "0.50 * BasicPay",
      minimum_limit: 9000,
      maximum_limit: 125000,
      effective_date: "2016-01-01",
      rule_number: "RBE No. 12/2021",
      conditions: "50% of Basic Pay payable for 10 years or until age 67.",
      notes: "Enhanced family pension rate."
    },
    {
      id: "RV-R405-V1",
      rule_id: "R405",
      version: 1,
      formula: "Min(2000000, 0.25 * (BasicPay + (BasicPay * DA / 100)) * QualifyingServiceYears * 2)",
      minimum_limit: 0,
      maximum_limit: 2000000,
      effective_date: "2016-01-01",
      rule_number: "RBE No. 78/2020",
      conditions: "Capped at ₹20,00,000 maximum.",
      notes: "Retirement and death gratuity formula based on completed six-month service periods."
    },
    {
      id: "RV-R502-V1",
      rule_id: "R502",
      version: 1,
      formula: "((BasicPay + (BasicPay * DA / 100)) / 30) * Min(300, LAPDays + (LHAPDays / 2))",
      minimum_limit: 0,
      maximum_limit: 300,
      effective_date: "2019-01-01",
      rule_number: "RBE No. 22/2019",
      conditions: "Maximum encashment limit of 300 days total.",
      notes: "Combined accumulated LAP and converted LHAP encashment cap."
    },
    {
      id: "RV-R810-V1",
      rule_id: "R810",
      version: 1,
      formula: "Subscription rates of RELHS shall be equal to the last month's Basic Pay drawn or the subscription rate indicated at different levels as per 7th CPC, whichever is lower.",
      minimum_limit: 20,
      maximum_limit: 0,
      effective_date: "2017-01-01",
      rule_number: "RBE No. 55/2017",
      conditions: "Requires minimum 20 years of qualifying service.",
      notes: "Subscription bands apply: Level 1-5 = 30k, Level 6 = 54k, Level 7-11 = 78k, Level 12+ = 120k."
    },
    {
      id: "RV-R905-V1",
      rule_id: "R905",
      version: 1,
      formula: "Post-Retirement Complimentary Passes (PRCP) sets per year: Group A/B: 3 sets (25+ yrs service) or 2 sets (20-24 yrs); Group C: 2 sets (25+ yrs) or 1 set (20-24 yrs).",
      minimum_limit: 20,
      maximum_limit: 0,
      effective_date: "2022-01-01",
      rule_number: "RBE No. 33/2022",
      conditions: "Requires minimum 20 years of service (or 19y 9m rounded to 20y).",
      notes: "Pass sets per year: Group A/B: 3 sets (25+ yrs) or 2 sets (<25 yrs); Group C: 2 sets (25+ yrs) or 1 set."
    }
  ];

  const versionStmt = db.prepare(
    "INSERT INTO rule_versions (id, rule_id, version, formula, minimum_limit, maximum_limit, effective_date, rule_number, approved_by, approved_at, status, conditions, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
  );
  const now = new Date().toISOString();
  for (const v of seedVersions) {
    versionStmt.run(
      v.id,
      v.rule_id,
      v.version,
      v.formula,
      v.minimum_limit,
      v.maximum_limit,
      v.effective_date,
      v.rule_number,
      "System Initializer",
      now,
      "Approved",
      v.conditions,
      v.notes
    );
  }

  // Add initial Audit Log
  logAudit({
    officer: "System Initializer",
    action: "System Initial Database Seeding",
    circular_number: "N/A",
    rule_name: "All System Rules",
    version: 1,
    changes: "Seeded initial rules and versions for basic pension, family pension, gratuity, leave encashment, RELHS, and complimentary passes."
  });
}

export function logAudit(params: {
  officer: string;
  action: string;
  circular_number?: string;
  rule_name?: string;
  version?: number;
  changes: string;
}) {
  const id = `AUD-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
  const timestamp = new Date().toISOString();
  runSql(
    "INSERT INTO audit_logs (id, timestamp, officer, action, circular_number, rule_name, version, changes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [id, timestamp, params.officer, params.action, params.circular_number ?? null, params.rule_name ?? null, params.version ?? null, params.changes]
  );
}
