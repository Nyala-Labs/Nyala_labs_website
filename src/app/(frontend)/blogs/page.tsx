import { getServerCollection } from "@/lib/payload";
import { mapPayloadBlogPost } from "@/lib/cms-client";
import BlogsPageClient from "./BlogsPageClient";

export default async function BlogsPage() {
  const docs = await getServerCollection("blog-posts", {
    sort: "-publishedAt",
    depth: 1,
  });

  const posts = docs.map(mapPayloadBlogPost);

  return <BlogsPageClient initialPosts={posts} />;
}
