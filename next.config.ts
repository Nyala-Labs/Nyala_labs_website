import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  output: 'standalone',
  serverExternalPackages: [],
  images: {
    remotePatterns: [
      // Cloudflare R2 public URL (set NEXT_PUBLIC_R2_PUBLIC_URL in env)
      {
        protocol: "https",
        hostname: "**.r2.dev",
      },
      // Custom R2 domain pattern — covers any subdomain
      {
        protocol: "https",
        hostname: "**.cloudflarestorage.com",
      },
    ],
  },
};

export default withPayload(nextConfig);
