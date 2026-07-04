import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  turbopack: {
    root: __dirname,
  },
  images: {
    localPatterns: [
      {
        pathname: "/api/images",
        // Omitting `search` allows the `?path=...` query string used by
        // the S3 image proxy. The route handler validates the path param.
      },
    ],
  },
};

export default nextConfig;
