import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@libsql/client", "libsql", "@payloadcms/db-sqlite"],
};

export default withPayload(nextConfig);
