/**
 * Postgres database client via Drizzle ORM + postgres.js.
 * Uses the DATABASE_URL environment variable.
 *
 * The connection is created lazily — postgres.js does not connect until the
 * first query is issued, so importing this module during a build (when no
 * database is available) is safe.
 */

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@/db/schema";

const connectionString =
  process.env.DATABASE_URL ?? "postgres://localhost:5432/perkins";

// `prepare: false` is required when using postgres.js behind connection
// poolers (e.g. PgBouncer / Neon's pooler) and is harmless otherwise.
const client = postgres(connectionString, { prepare: false, max: 5 });

export const db = drizzle(client, { schema });
export { schema };
