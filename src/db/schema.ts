/**
 * Drizzle ORM schema for Perkins Catering Co.
 * Tables: inquiries, quotes, analytics_events, blog_posts, users
 */

import {
  pgTable,
  text,
  timestamp,
  boolean,
  serial,
  index,
} from "drizzle-orm/pg-core";

/* ---------------------------------- Inquiries --------------------------------- */

export const inquiries = pgTable("inquiries", {
  id: text("id").primaryKey(),
  formType: text("form_type").notNull(),
  eventType: text("event_type").notNull(),
  eventDate: text("event_date").notNull(),
  guestCount: text("guest_count").notNull(),
  location: text("location").default("").notNull(),
  serviceStyle: text("service_style").default("").notNull(),
  dietaryRestrictions: text("dietary_restrictions").default("").notNull(),
  budget: text("budget").default("").notNull(),
  message: text("message").default("").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").default("").notNull(),
  newsletter: boolean("newsletter").default(true).notNull(),
  submittedAt: timestamp("submitted_at", { withTimezone: true }).notNull(),
}, (table) => [
  index("inquiries_submitted_at_idx").on(table.submittedAt),
]);

/* ----------------------------------- Quotes ----------------------------------- */

export const quotes = pgTable("quotes", {
  id: text("id").primaryKey(),
  formType: text("form_type").notNull(),
  eventType: text("event_type").notNull(),
  eventDate: text("event_date").notNull(),
  guestCount: text("guest_count").notNull(),
  location: text("location").default("").notNull(),
  serviceStyle: text("service_style").default("").notNull(),
  dietaryRestrictions: text("dietary_restrictions").default("").notNull(),
  budget: text("budget").default("").notNull(),
  message: text("message").default("").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").default("").notNull(),
  newsletter: boolean("newsletter").default(true).notNull(),
  submittedAt: timestamp("submitted_at", { withTimezone: true }).notNull(),
}, (table) => [
  index("quotes_submitted_at_idx").on(table.submittedAt),
]);

/* ------------------------------ Analytics events ------------------------------ */

export const analyticsEvents = pgTable("analytics_events", {
  id: text("id").primaryKey(),
  type: text("type").notNull(),
  path: text("path").notNull(),
  referrer: text("referrer"),
  timestamp: timestamp("timestamp", { withTimezone: true }).notNull(),
}, (table) => [
  index("analytics_timestamp_idx").on(table.timestamp),
  index("analytics_type_idx").on(table.type),
]);

/* --------------------------------- Blog posts --------------------------------- */

export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  coverImage: text("cover_image").default("").notNull(),
  author: text("author").default("Austin Perkins").notNull(),
  status: text("status").default("published").notNull(),
  publishedAt: timestamp("published_at", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
}, (table) => [
  index("blog_posts_status_idx").on(table.status),
  index("blog_posts_published_at_idx").on(table.publishedAt),
]);

/* ----------------------------------- Users ------------------------------------ */

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: text("role").default("admin").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export type BlogPost = typeof blogPosts.$inferSelect;
export type BlogPostInsert = typeof blogPosts.$inferInsert;
export type User = typeof users.$inferSelect;
export type UserInsert = typeof users.$inferInsert;
