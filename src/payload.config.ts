import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";

import { BlogPosts } from "./collections/BlogPosts";
import { CommitteeMembers } from "./collections/CommitteeMembers";
import { Activities } from "./collections/Activities";
import { News } from "./collections/News";
import { Media } from "./collections/Media";
import { Users } from "./collections/Users";
import { Homepage } from "./globals/Homepage";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || "dev-payload-secret-change-me",
  editor: lexicalEditor(),
  collections: [Users, BlogPosts, CommitteeMembers, Activities, News, Media],
  globals: [Homepage],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
  }),
  admin: {
    user: "users",
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      url: ({ data }) => {
        const base = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";
        if (data?.slug) {
          return `${base}/blogs/${data.slug}`;
        }
        return base;
      },
      collections: ["blog-posts"],
      breakpoints: [
        { label: "Mobile", name: "mobile", width: 375, height: 667 },
        { label: "Tablet", name: "tablet", width: 768, height: 1024 },
        { label: "Desktop", name: "desktop", width: 1440, height: 900 },
      ],
    },
  },
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
});
