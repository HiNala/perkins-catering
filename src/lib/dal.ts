/**
 * Data Access Layer — centralizes session verification and authorization.
 */

import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { getSessionToken, decrypt, type SessionPayload } from "./session";

/**
 * Verifies the current user's session.
 * Memoized per-request via React `cache`.
 * Redirects to /login if there is no valid session.
 */
export const verifySession = cache(async (): Promise<SessionPayload> => {
  const token = await getSessionToken();
  const payload = await decrypt(token);

  if (!payload || !payload.userId) {
    redirect("/login");
  }

  return payload;
});

/**
 * Returns the current session payload or null (no redirect).
 */
export const getSession = cache(async (): Promise<SessionPayload | null> => {
  const token = await getSessionToken();
  return decrypt(token);
});
