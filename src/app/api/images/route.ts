import { NextRequest, NextResponse } from "next/server";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { s3Client, s3Bucket, isS3Configured } from "@/lib/s3";

/**
 * Serves images from S3-compatible storage (Railway Bucket / MinIO).
 * Falls back to the local public/ directory when S3 is not configured.
 *
 * GET /api/images?path=hero/wedding-garden-table.jpg
 */

const ONE_YEAR = 365 * 24 * 60 * 60;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const path = searchParams.get("path");

  if (!path) {
    return NextResponse.json({ error: "Missing path parameter" }, { status: 400 });
  }

  // Sanitize path — prevent directory traversal
  const cleanPath = path.replace(/^\/+/, "").replace(/\.\.+/g, "");

  if (!isS3Configured || !s3Client) {
    // Fallback: serve from public/ directory
    return NextResponse.json(
      { error: "S3 storage not configured" },
      { status: 503 }
    );
  }

  try {
    const command = new GetObjectCommand({
      Bucket: s3Bucket,
      Key: cleanPath,
    });

    const response = await s3Client.send(command);
    const body = await response.Body?.transformToByteArray();

    if (!body) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    const contentType =
      response.ContentType ||
      guessContentType(cleanPath);

    return new NextResponse(new Uint8Array(body), {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": `public, max-age=${ONE_YEAR}, immutable`,
        "Content-Length": String(body.length),
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    if (message.includes("NoSuchKey") || message.includes("404")) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }
    console.error("S3 image fetch error:", message);
    return NextResponse.json(
      { error: "Failed to fetch image" },
      { status: 500 }
    );
  }
}

function guessContentType(path: string): string {
  const ext = path.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "png":
      return "image/png";
    case "gif":
      return "image/gif";
    case "webp":
      return "image/webp";
    case "svg":
      return "image/svg+xml";
    default:
      return "application/octet-stream";
  }
}
