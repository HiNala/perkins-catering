/**
 * Authentication helpers — password hashing and credential verification.
 */

import "server-only";
import bcrypt from "bcryptjs";
import { getUserByEmail, createUser } from "./db";

const SALT_ROUNDS = 10;

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function authenticateUser(
  email: string,
  password: string
): Promise<{ id: number; email: string; role: string } | null> {
  const user = await getUserByEmail(email.toLowerCase().trim());
  if (!user) return null;

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) return null;

  return { id: user.id, email: user.email, role: user.role };
}

export async function registerUser(
  name: string,
  email: string,
  password: string
): Promise<{ id: number; email: string; role: string }> {
  const existing = await getUserByEmail(email.toLowerCase().trim());
  if (existing) {
    throw new Error("An account with this email already exists.");
  }

  const passwordHash = await hashPassword(password);
  const user = await createUser({
    name,
    email: email.toLowerCase().trim(),
    passwordHash,
    role: "admin",
  });

  return { id: user.id, email: user.email, role: user.role };
}
