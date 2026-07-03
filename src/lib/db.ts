/**
 * Database access layer for Perkins Catering Co.
 *
 * Backed by Postgres via Drizzle ORM (see src/lib/db-postgres.ts).
 * All persistence is real database storage — there is no JSON-file fallback.
 */

import { desc, eq } from "drizzle-orm";
import { db, schema } from "./db-postgres";

export interface InquiryRecord {
  id: string;
  formType: string;
  eventType: string;
  eventDate: string;
  guestCount: string;
  location: string;
  serviceStyle: string;
  dietaryRestrictions: string;
  budget: string;
  message: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  newsletter: boolean;
  submittedAt: string;
}

export interface AnalyticsRecord {
  id: string;
  type: string;
  path: string;
  referrer: string | null;
  timestamp: string;
}

export interface BlogPostRecord {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  status: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserRecord {
  id: number;
  name: string;
  email: string;
  passwordHash: string;
  role: string;
  createdAt: string;
}

/* --------------------------------- Inquiries --------------------------------- */

export async function saveInquiry(record: InquiryRecord): Promise<void> {
  await db.insert(schema.inquiries).values({
    id: record.id,
    formType: record.formType,
    eventType: record.eventType,
    eventDate: record.eventDate,
    guestCount: record.guestCount,
    location: record.location,
    serviceStyle: record.serviceStyle,
    dietaryRestrictions: record.dietaryRestrictions,
    budget: record.budget,
    message: record.message,
    firstName: record.firstName,
    lastName: record.lastName,
    email: record.email,
    phone: record.phone,
    newsletter: record.newsletter,
    submittedAt: new Date(record.submittedAt),
  });
}

export async function getInquiries(): Promise<InquiryRecord[]> {
  const rows = await db
    .select()
    .from(schema.inquiries)
    .orderBy(desc(schema.inquiries.submittedAt));
  return rows.map(rowToInquiry);
}

/* ---------------------------------- Quotes ----------------------------------- */

export async function saveQuote(record: InquiryRecord): Promise<void> {
  await db.insert(schema.quotes).values({
    id: record.id,
    formType: record.formType,
    eventType: record.eventType,
    eventDate: record.eventDate,
    guestCount: record.guestCount,
    location: record.location,
    serviceStyle: record.serviceStyle,
    dietaryRestrictions: record.dietaryRestrictions,
    budget: record.budget,
    message: record.message,
    firstName: record.firstName,
    lastName: record.lastName,
    email: record.email,
    phone: record.phone,
    newsletter: record.newsletter,
    submittedAt: new Date(record.submittedAt),
  });
}

export async function getQuotes(): Promise<InquiryRecord[]> {
  const rows = await db
    .select()
    .from(schema.quotes)
    .orderBy(desc(schema.quotes.submittedAt));
  return rows.map(rowToInquiry);
}

/* ------------------------------ Analytics events ----------------------------- */

export async function saveAnalyticsEvent(
  record: AnalyticsRecord
): Promise<void> {
  await db.insert(schema.analyticsEvents).values({
    id: record.id,
    type: record.type,
    path: record.path,
    referrer: record.referrer,
    timestamp: new Date(record.timestamp),
  });
}

export async function getAnalyticsSummary(): Promise<{
  totalPageviews: number;
  uniquePaths: number;
  recentEvents: AnalyticsRecord[];
}> {
  const events = await db
    .select()
    .from(schema.analyticsEvents)
    .orderBy(desc(schema.analyticsEvents.timestamp))
    .limit(50);

  const allEvents = await db.select().from(schema.analyticsEvents);
  const pageviews = allEvents.filter((e) => e.type === "pageview");
  const uniquePaths = new Set(pageviews.map((e) => e.path)).size;

  return {
    totalPageviews: pageviews.length,
    uniquePaths,
    recentEvents: events.map(rowToAnalytics),
  };
}

export async function getAnalyticsEvents(): Promise<AnalyticsRecord[]> {
  const rows = await db
    .select()
    .from(schema.analyticsEvents)
    .orderBy(desc(schema.analyticsEvents.timestamp));
  return rows.map(rowToAnalytics);
}

/* --------------------------------- Blog posts -------------------------------- */

export async function getBlogPosts(): Promise<BlogPostRecord[]> {
  const rows = await db
    .select()
    .from(schema.blogPosts)
    .where(eq(schema.blogPosts.status, "published"))
    .orderBy(desc(schema.blogPosts.publishedAt));
  return rows.map(rowToBlogPost);
}

export async function getBlogPostsAdmin(): Promise<BlogPostRecord[]> {
  const rows = await db
    .select()
    .from(schema.blogPosts)
    .orderBy(desc(schema.blogPosts.publishedAt));
  return rows.map(rowToBlogPost);
}

export async function getBlogPost(slug: string): Promise<BlogPostRecord | null> {
  const rows = await db
    .select()
    .from(schema.blogPosts)
    .where(eq(schema.blogPosts.slug, slug))
    .limit(1);
  if (rows.length === 0) return null;
  return rowToBlogPost(rows[0]);
}

export async function getBlogPostById(
  id: number
): Promise<BlogPostRecord | null> {
  const rows = await db
    .select()
    .from(schema.blogPosts)
    .where(eq(schema.blogPosts.id, id))
    .limit(1);
  if (rows.length === 0) return null;
  return rowToBlogPost(rows[0]);
}

export async function createBlogPost(
  post: Omit<BlogPostRecord, "id" | "createdAt" | "updatedAt"> & {
    id?: number;
    createdAt?: string;
    updatedAt?: string;
  }
): Promise<BlogPostRecord> {
  const now = new Date();
  const inserted = await db
    .insert(schema.blogPosts)
    .values({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      coverImage: post.coverImage,
      author: post.author,
      status: post.status,
      publishedAt: new Date(post.publishedAt),
      createdAt: post.createdAt ? new Date(post.createdAt) : now,
      updatedAt: now,
    })
    .returning();
  return rowToBlogPost(inserted[0]);
}

export async function updateBlogPost(
  id: number,
  post: Partial<Omit<BlogPostRecord, "id" | "createdAt" | "updatedAt">>
): Promise<BlogPostRecord | null> {
  const updated = await db
    .update(schema.blogPosts)
    .set({
      ...(post.title !== undefined && { title: post.title }),
      ...(post.slug !== undefined && { slug: post.slug }),
      ...(post.excerpt !== undefined && { excerpt: post.excerpt }),
      ...(post.content !== undefined && { content: post.content }),
      ...(post.coverImage !== undefined && { coverImage: post.coverImage }),
      ...(post.author !== undefined && { author: post.author }),
      ...(post.status !== undefined && { status: post.status }),
      ...(post.publishedAt !== undefined && {
        publishedAt: new Date(post.publishedAt),
      }),
      updatedAt: new Date(),
    })
    .where(eq(schema.blogPosts.id, id))
    .returning();
  if (updated.length === 0) return null;
  return rowToBlogPost(updated[0]);
}

export async function deleteBlogPost(id: number): Promise<void> {
  await db.delete(schema.blogPosts).where(eq(schema.blogPosts.id, id));
}

/* ----------------------------------- Users ----------------------------------- */

export async function getUserByEmail(
  email: string
): Promise<UserRecord | null> {
  const rows = await db
    .select()
    .from(schema.users)
    .where(eq(schema.users.email, email))
    .limit(1);
  if (rows.length === 0) return null;
  return rowToUser(rows[0]);
}

export async function createUser(user: {
  name: string;
  email: string;
  passwordHash: string;
  role?: string;
}): Promise<UserRecord> {
  const inserted = await db
    .insert(schema.users)
    .values({
      name: user.name,
      email: user.email,
      passwordHash: user.passwordHash,
      role: user.role ?? "admin",
    })
    .returning();
  return rowToUser(inserted[0]);
}

/* ------------------------------ Row mappers ---------------------------------- */

function rowToInquiry(row: typeof schema.inquiries.$inferSelect): InquiryRecord {
  return {
    id: row.id,
    formType: row.formType,
    eventType: row.eventType,
    eventDate: row.eventDate,
    guestCount: row.guestCount,
    location: row.location,
    serviceStyle: row.serviceStyle,
    dietaryRestrictions: row.dietaryRestrictions,
    budget: row.budget,
    message: row.message,
    firstName: row.firstName,
    lastName: row.lastName,
    email: row.email,
    phone: row.phone,
    newsletter: row.newsletter,
    submittedAt: row.submittedAt.toISOString(),
  };
}

function rowToAnalytics(
  row: typeof schema.analyticsEvents.$inferSelect
): AnalyticsRecord {
  return {
    id: row.id,
    type: row.type,
    path: row.path,
    referrer: row.referrer,
    timestamp: row.timestamp.toISOString(),
  };
}

function rowToBlogPost(
  row: typeof schema.blogPosts.$inferSelect
): BlogPostRecord {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    content: row.content,
    coverImage: row.coverImage,
    author: row.author,
    status: row.status,
    publishedAt: row.publishedAt.toISOString(),
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

function rowToUser(row: typeof schema.users.$inferSelect): UserRecord {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    passwordHash: row.passwordHash,
    role: row.role,
    createdAt: row.createdAt.toISOString(),
  };
}
