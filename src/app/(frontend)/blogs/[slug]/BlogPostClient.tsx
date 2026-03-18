"use client";

import Link from "next/link";
import { useLivePreview } from "@payloadcms/live-preview-react";
import { RichText } from "@payloadcms/richtext-lexical/react";
import type { BlogPost as BlogPostType } from "@/payload-types";
import { formatDate } from "@/lib/utils";

type PayloadMedia = { url?: string | null };

const resolveImageUrl = (media: unknown): string => {
  if (!media) return "";
  if (typeof media === "object" && media !== null && "url" in media) {
    return (media as PayloadMedia).url || "";
  }
  return "";
};

export default function BlogPostClient({
  initialPost,
  serverURL,
}: {
  initialPost: BlogPostType;
  serverURL: string;
}) {
  const { data: post } = useLivePreview({
    initialData: initialPost,
    serverURL,
    depth: 1,
  });

  const coverImageUrl = resolveImageUrl(post.coverImage);
  const categories = Array.isArray(post.categories) ? post.categories : [];

  return (
    <div className="min-h-screen bg-nyala-black pt-24">
      <article className="mx-auto max-w-3xl px-6 pb-24">
        <Link
          href="/blogs"
          className="mb-8 inline-block font-mono text-xs uppercase tracking-[0.3em] text-nyala-gray-muted transition-colors hover:text-nyala-red"
        >
          ← back to blogs
        </Link>

        <header className="mb-12">
          <div className="mb-4 flex flex-wrap gap-2">
            {categories.slice(0, 3).map((cat) => (
              <span
                key={cat}
                className="font-mono text-[10px] uppercase tracking-widest text-nyala-yellow"
              >
                #{cat}
              </span>
            ))}
          </div>
          <h1 className="font-mono text-3xl font-bold leading-tight text-nyala-white md:text-4xl">
            {post.title}
          </h1>
          <div className="mt-4 flex items-center gap-4 font-mono text-sm text-nyala-gray-muted">
            <span>{post.author}</span>
            <span className="text-nyala-gray-light">·</span>
            <span>{formatDate(post.publishedAt)}</span>
            <span className="text-nyala-gray-light">·</span>
            <span>{post.readingTime} min read</span>
          </div>
        </header>

        {coverImageUrl && (
          <div className="mb-12 aspect-video overflow-hidden border border-nyala-gray-light">
            <div
              className="h-full w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${coverImageUrl})` }}
            />
          </div>
        )}

        {post.excerpt && (
          <p className="mb-12 font-mono text-lg leading-relaxed text-nyala-gray-muted">
            {post.excerpt}
          </p>
        )}

        {post.body && (
          <div className="blog-content font-mono text-sm leading-relaxed text-nyala-gray-muted [&_p]:mb-4 [&_h2]:mb-4 [&_h2]:mt-8 [&_h2]:font-bold [&_h2]:text-nyala-white [&_h3]:mb-3 [&_h3]:mt-6 [&_h3]:font-semibold [&_h3]:text-nyala-white [&_a]:text-nyala-red [&_a]:underline [&_a]:hover:text-nyala-red-light [&_ul]:list-inside [&_ul]:list-disc [&_ol]:list-inside [&_ol]:list-decimal [&_li]:mb-1">
            <RichText data={post.body} />
          </div>
        )}
      </article>
    </div>
  );
}
