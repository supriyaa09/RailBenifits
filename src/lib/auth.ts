import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify, type JWTPayload } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "railassist_secret_key_7th_cpc_2026_dev_key",
);

export interface UserAuthPayload extends JWTPayload {
  id: string;
  userId: string;
  name: string;
  role: "employee" | "officer";
  department?: string;
}

/**
 * Hashes a plain-text password securely using bcryptjs.
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

/**
 * Compares a plain-text password against a stored bcrypt hash.
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  try {
    return await bcrypt.compare(password, hash);
  } catch (err) {
    console.error("Error verifying password:", err);
    return false;
  }
}

/**
 * Signs a JWT token containing user identity and role.
 */
export async function signJwtToken(payload: {
  id: string;
  userId: string;
  name: string;
  role: "employee" | "officer";
  department?: string;
}): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(JWT_SECRET);
}

/**
 * Verifies and decodes a JWT token string.
 */
export async function verifyJwtToken(token: string): Promise<UserAuthPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as UserAuthPayload;
  } catch (err) {
    return null;
  }
}
