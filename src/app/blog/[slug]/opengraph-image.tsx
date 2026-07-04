import { ImageResponse } from "next/og";
import { getBlogPost } from "@/lib/db";

export const alt = "Perkins Catering Co. Blog";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let title = "Perkins Catering Co.";
  let excerpt = "Farm-to-table catering in wine country";
  try {
    const post = await getBlogPost(slug);
    if (post) {
      title = post.title;
      excerpt = post.excerpt;
    }
  } catch {
    // Use defaults
  }

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#1a1a1a",
        padding: "80px",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            background: "#000000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#faf8f5",
            fontSize: "28px",
            fontWeight: 700,
          }}
        >
          P
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ color: "#faf8f5", fontSize: "24px", fontWeight: 600 }}>
            Perkins Catering Co.
          </div>
          <div
            style={{
              color: "#ffffff",
              fontSize: "14px",
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            Blog
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div
          style={{
            color: "#faf8f5",
            fontSize: "52px",
            fontWeight: 700,
            lineHeight: 1.15,
            maxWidth: "1000px",
          }}
        >
          {title}
        </div>
        <div
          style={{
            color: "#b5b0aa",
            fontSize: "24px",
            lineHeight: 1.4,
            maxWidth: "900px",
            display: "flex",
          }}
        >
          {excerpt.length > 120 ? excerpt.slice(0, 117) + "..." : excerpt}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          color: "#ffffff",
          fontSize: "18px",
          letterSpacing: "1px",
          textTransform: "uppercase",
        }}
      >
        Napa · Sonoma · Marin
      </div>
    </div>,
    { ...size }
  );
}
