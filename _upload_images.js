#!/usr/bin/env node
/**
 * Upload hero images to S3-compatible storage (Railway Bucket or MinIO).
 *
 * Usage:
 *   node _upload_images.js                    # Upload all images in public/images/hero/
 *   node _upload_images.js --dir public/images # Upload all images in a directory
 *
 * Requires S3 environment variables:
 *   S3_ENDPOINT, S3_REGION, S3_BUCKET, S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY, S3_URL_STYLE
 */

const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3"); // eslint-disable-line @typescript-eslint/no-require-imports
const fs = require("fs"); // eslint-disable-line @typescript-eslint/no-require-imports
const path = require("path"); // eslint-disable-line @typescript-eslint/no-require-imports

const endpoint = process.env.S3_ENDPOINT;
const region = process.env.S3_REGION || "auto";
const bucket = process.env.S3_BUCKET;
const accessKeyId = process.env.S3_ACCESS_KEY_ID;
const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY;
const urlStyle = process.env.S3_URL_STYLE || "path";

if (!endpoint || !bucket || !accessKeyId || !secretAccessKey) {
  console.error("ERROR: S3 environment variables not set.");
  console.error("Required: S3_ENDPOINT, S3_BUCKET, S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY");
  process.exit(1);
}

const client = new S3Client({
  region,
  endpoint,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
  forcePathStyle: urlStyle === "path",
});

const CONTENT_TYPES = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
};

async function uploadFile(filePath, key) {
  const body = fs.readFileSync(filePath);
  const ext = path.extname(filePath).toLowerCase();
  const contentType = CONTENT_TYPES[ext] || "application/octet-stream";

  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    Body: body,
    ContentType: contentType,
    CacheControl: "public, max-age=31536000, immutable",
  });

  await client.send(command);
  const sizeKB = (body.length / 1024).toFixed(0);
  console.log(`  Uploaded: ${key} (${sizeKB} KB)`);
}

async function main() {
  const args = process.argv.slice(2);
  let dirIdx = args.indexOf("--dir");
  const dir = dirIdx >= 0 ? args[dirIdx + 1] : "public/images/hero";

  const absDir = path.resolve(dir);
  if (!fs.existsSync(absDir)) {
    console.error(`ERROR: Directory not found: ${absDir}`);
    process.exit(1);
  }

  console.log(`Uploading images from ${absDir} to bucket "${bucket}"...`);
  console.log(`Endpoint: ${endpoint}`);
  console.log();

  // Recursively find all image files
  const imageRoot = path.resolve("public/images");
  function findImages(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    const files = [];
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        files.push(...findImages(fullPath));
      } else {
        const ext = path.extname(entry.name).toLowerCase();
        if (ext in CONTENT_TYPES) {
          files.push(fullPath);
        }
      }
    }
    return files;
  }

  const files = findImages(absDir);

  if (files.length === 0) {
    console.log("No image files found.");
    return;
  }

  for (const fullPath of files) {
    // Key = relative path from public/images/ (e.g., "hero/wedding-garden-table.jpg")
    const key = path.relative(imageRoot, fullPath).replace(/\\/g, "/");
    try {
      await uploadFile(fullPath, key);
    } catch (err) {
      console.error(`  FAILED: ${key} — ${err.message}`);
    }
  }

  console.log();
  console.log("Done! Images are served via /api/images?path=<key>");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
