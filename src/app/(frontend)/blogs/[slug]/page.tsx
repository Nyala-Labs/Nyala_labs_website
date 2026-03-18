import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { getBlogPostBySlug } from "@/lib/payload";
import BlogPostClient from "./BlogPostClient";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const { isEnabled: isDraftMode } = await draftMode();

  const post = await getBlogPostBySlug(slug, {
    draft: isDraftMode,
  });

  if (!post) {
    notFound();
  }

  return (
    <BlogPostClient
      initialPost={post}
      serverURL={process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000"}
    />
  );
}
