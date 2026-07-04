/**
 * Session management — stateless JWT sessions stored in an HttpOnly cookie.
 * Uses `jose` for signing/verification and `bcryptjs` for password hashing.
 */

import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

export interface SessionPayload {
  userId: number;
  email: string;
  role: string;
  expiresAt: number;
}

const SECRET = process.env.AUTH_SECRET;
if (!SECRET && process.env.NODE_ENV !== "production") {
  console.warn("[session] AUTH_SECRET not set — using insecure dev fallback.");
}

function getEncodedKey(): Uint8Array {
  if (!SECRET) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("[session] AUTH_SECRET must be set in production.");
    }
    return new TextEncoder().encode("dev-insecure-secret-change-me");
  }
  return new TextEncoder().encode(SECRET);
}

const SESSION_COOKIE = "perkins_session";
const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days

/* ------------------------------ JWT encrypt/decrypt ------------------------------ */

export async function encrypt(payload: SessionPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getEncodedKey());
}

export async function decrypt(
  token: string | undefined = ""
): Promise<SessionPayload | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getEncodedKey(), {
      algorithms: ["HS256"],
    });
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

/* ------------------------------ Cookie management ------------------------------ */

export async function createSession(payload: Omit<SessionPayload, "expiresAt">) {
  const expiresAt = Date.now() + SESSION_DURATION;
  const session = await encrypt({ ...payload, expiresAt });
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE, session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(expiresAt),
    sameSite: "lax",
    path: "/",
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function getSessionToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE)?.value;
}
