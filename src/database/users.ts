import { allSql, getSql, runSql } from "@/database/sqliteDb";
import { hashPassword } from "@/lib/auth";

export interface DbUser {
  id: string;
  user_id: string; // Employee PF number or Officer ID
  name: string;
  password_hash: string;
  role: "employee" | "officer";
  department: string;
  created_at: string;
}

/**
 * Finds a user by their user_id (case-insensitive).
 */
export function findUserByUserId(userId: string): DbUser | null {
  if (!userId) return null;
  const sql = `SELECT * FROM users WHERE LOWER(user_id) = LOWER(?) LIMIT 1`;
  return getSql(sql, [userId.trim()]);
}

/**
 * Retrieves all registered users in the system.
 */
export function getAllUsers(): DbUser[] {
  const sql = `SELECT id, user_id, name, role, department, created_at FROM users ORDER BY created_at DESC`;
  return allSql(sql);
}

/**
 * Creates a new user record in the database.
 */
export async function createUser(data: {
  userId: string;
  name: string;
  password: string;
  role: "employee" | "officer";
  department?: string;
}): Promise<DbUser> {
  const id = `usr_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  const passwordHash = await hashPassword(data.password);
  const createdAt = new Date().toISOString();
  const department = data.department || (data.role === "officer" ? "Personnel & Settlement Dept" : "Operating Dept");

  const sql = `
    INSERT INTO users (id, user_id, name, password_hash, role, department, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  runSql(sql, [id, data.userId.trim(), data.name, passwordHash, data.role, department, createdAt]);

  return {
    id,
    user_id: data.userId.trim(),
    name: data.name,
    password_hash: passwordHash,
    role: data.role,
    department,
    created_at: createdAt,
  };
}

/**
 * Seeds initial demo accounts into SQLite database if not present.
 */
export async function seedInitialUsers() {
  const existingEmployee = findUserByUserId("SCR1001");
  if (!existingEmployee) {
    await createUser({
      userId: "SCR1001",
      name: "R. A. V. Sharma",
      password: "demo123",
      role: "employee",
      department: "Operating & Accounts",
    });
  }

  const existingOfficer = findUserByUserId("OFFICER01");
  if (!existingOfficer) {
    await createUser({
      userId: "OFFICER01",
      name: "Senior Personnel Officer (SPO/HQ)",
      password: "admin123",
      role: "officer",
      department: "Personnel & Pension Settlement",
    });
  }
}
