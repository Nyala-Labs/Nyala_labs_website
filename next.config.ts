import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  // Postgres + Payload — omit SQLite/libsql (was left over from SQLite); withPayload adds the right externals.
  serverExternalPackages: [],
};

export default withPayload(nextConfig);
