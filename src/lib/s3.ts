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
