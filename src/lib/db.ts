/**
 * Database layer for Perkins Catering Co.
 * Uses SQLite for persistence of inquiries, quotes, and analytics events.
 * In production, the DB file is stored in the system temp directory.
 */

import { promises as fs } from "fs";
import path from "path";
import os from "os";

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

const DATA_DIR = path.join(os.tmpdir(), "perkins-catering-data");
const INQUIRIES_FILE = path.join(DATA_DIR, "inquiries.json");
const ANALYTICS_FILE = path.join(DATA_DIR, "analytics.json");

async function ensureDataDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch {
    // Directory may already exist
  }
}

async function readJson<T>(filePath: string): Promise<T[]> {
  try {
    const content = await fs.readFile(filePath, "utf-8");
    return JSON.parse(content) as T[];
  } catch {
    return [];
  }
}

async function writeJson<T>(filePath: string, data: T[]): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}

export async function saveInquiry(record: InquiryRecord): Promise<void> {
  const inquiries = await readJson<InquiryRecord>(INQUIRIES_FILE);
  inquiries.push(record);
  await writeJson(INQUIRIES_FILE, inquiries);
}

export async function saveAnalyticsEvent(record: AnalyticsRecord): Promise<void> {
  const events = await readJson<AnalyticsRecord>(ANALYTICS_FILE);
  // Keep last 10000 events to prevent unbounded growth
  const trimmed = [...events, record].slice(-10000);
  await writeJson(ANALYTICS_FILE, trimmed);
}

export async function getAnalyticsSummary(): Promise<{
  totalPageviews: number;
  uniquePaths: number;
  recentEvents: AnalyticsRecord[];
}> {
  const events = await readJson<AnalyticsRecord>(ANALYTICS_FILE);
  const pageviews = events.filter((e) => e.type === "pageview");
  const uniquePaths = new Set(pageviews.map((e) => e.path)).size;
  return {
    totalPageviews: pageviews.length,
    uniquePaths,
    recentEvents: events.slice(-50).reverse(),
  };
}

export async function getInquiries(): Promise<InquiryRecord[]> {
  return readJson<InquiryRecord>(INQUIRIES_FILE);
}
