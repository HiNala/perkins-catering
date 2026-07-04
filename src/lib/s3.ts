import { S3Client } from "@aws-sdk/client-s3";

/**
 * S3-compatible storage client.
 *
 * Works with:
 * - Railway Buckets (production) — S3-compatible object storage
 * - Local MinIO (development) — via docker-compose.yml
 *
 * Environment variables:
 * - S3_ENDPOINT:     S3 API endpoint URL
 * - S3_REGION:       Region (use "auto" for Railway / MinIO)
 * - S3_BUCKET:       Bucket name
 * - S3_ACCESS_KEY_ID:     Access key
 * - S3_SECRET_ACCESS_KEY: Secret key
 * - S3_URL_STYLE:    "virtual-host" or "path" (default: "path" for MinIO)
 */

const endpoint = process.env.S3_ENDPOINT;
const region = process.env.S3_REGION || "auto";
const bucket = process.env.S3_BUCKET;
const accessKeyId = process.env.S3_ACCESS_KEY_ID;
const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY;
const urlStyle = process.env.S3_URL_STYLE || "path";

export const s3Bucket = bucket;

export const isS3Configured = Boolean(
  endpoint && bucket && accessKeyId && secretAccessKey
);

export const s3Client = isS3Configured
  ? new S3Client({
      region,
      endpoint,
      credentials: {
        accessKeyId: accessKeyId!,
        secretAccessKey: secretAccessKey!,
      },
      forcePathStyle: urlStyle === "path",
    })
  : null;

/**
 * Returns the URL for an image stored in S3-compatible storage.
 *
 * When S3 is configured (prod or local MinIO), images are served via
 * the /api/images proxy route which fetches from the bucket.
 *
 * When S3 is NOT configured, falls back to serving from the public/
 * directory so the site still works without a bucket.
 *
 * @param key - S3 object key (e.g., "hero/wedding-garden-table.jpg")
 * @returns URL string for use in <Image src=...> or <img src=...>
 */
export function imageUrl(key: string): string {
  const cleanKey = key.replace(/^\/+/, "");
  if (isS3Configured) {
    return `/api/images?path=${encodeURIComponent(cleanKey)}`;
  }
  // Fallback: serve from public/images/
  return `/images/${cleanKey}`;
}
