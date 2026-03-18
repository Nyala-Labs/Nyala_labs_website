"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { BlogPost } from "@/types";
import { formatDate } from "@/lib/utils";

interface BlogCardProps {
  post: BlogPost;
  index?: number;
  featured?: boolean;
}

export default function BlogCard({ post, index = 0, featured = false }: BlogCardProps) {
  if (featured) {
    return (
      <Link href={`/blogs/${post.slug}`}>
      <motion.article
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="group relative cursor-pointer overflow-hidden border border-nyala-gray-light bg-nyala-gray transition-all duration-500 hover:border-nyala-red/50 hover:shadow-[0_0_40px_rgba(198,40,40,0.15)] hover:-translate-y-2"
      >
        {/* Shimmer sweep */}
        <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="h-full w-full -translate-x-[100%] bg-gradient-to-r from-transparent via-nyala-white/10 to-transparent group-hover:animate-shimmer group-hover:[animation-duration:1.5s]" />
        </div>
        <div className="grid md:grid-cols-2">
          {/* image */}
          <div className="relative h-64 overflow-hidden md:h-auto">
            <div
              className="h-full w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url(${post.coverImage})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-nyala-gray md:bg-gradient-to-r" />
            <div className="absolute left-4 top-4 border border-nyala-red bg-nyala-red/90 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-nyala-white">
              featured
            </div>
          </div>
          {/* content */}
          <div className="flex flex-col justify-center p-8 md:p-12">
            <div className="mb-3 flex items-center gap-3">
              {post.categories.slice(0, 2).map((cat) => (
                <span
                  key={cat}
                  className="font-mono text-[10px] uppercase tracking-widest text-nyala-yellow"
                >
                  #{cat}
                </span>
              ))}
            </div>
            <h2 className="font-mono text-2xl font-bold leading-tight text-nyala-white transition-colors group-hover:text-nyala-red md:text-3xl">
              {post.title}
            </h2>
            <p className="mt-4 font-mono text-sm leading-relaxed text-nyala-gray-muted">
              {post.excerpt}
            </p>
            <div className="mt-6 flex items-center gap-4 font-mono text-xs text-nyala-gray-muted">
              <span>{post.author}</span>
              <span className="text-nyala-gray-light">·</span>
              <span>{formatDate(post.publishedAt)}</span>
              <span className="text-nyala-gray-light">·</span>
              <span>{post.readingTime} min read</span>
            </div>
          </div>
        </div>
      </motion.article>
      </Link>
    );
  }

  return (
    <Link href={`/blogs/${post.slug}`}>
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative cursor-pointer overflow-hidden border border-nyala-gray-light bg-nyala-gray transition-all duration-500 hover:-translate-y-2 hover:border-nyala-yellow/40 hover:shadow-[0_0_30px_rgba(251,192,45,0.1)]"
    >
      {/* Shimmer sweep */}
      <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="h-full w-full -translate-x-[100%] bg-gradient-to-r from-transparent via-nyala-white/5 to-transparent group-hover:animate-shimmer group-hover:[animation-duration:2s]" />
      </div>

      {/* image */}
      <div className="relative h-48 overflow-hidden">
        <div
          className="h-full w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url(${post.coverImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-nyala-gray via-transparent to-transparent" />
      </div>

      {/* content */}
      <div className="p-6">
        <div className="mb-3 flex items-center gap-2">
          {post.categories.slice(0, 2).map((cat) => (
            <span
              key={cat}
              className="font-mono text-[10px] uppercase tracking-widest text-nyala-yellow"
            >
              #{cat}
            </span>
          ))}
        </div>
        <h3 className="font-mono text-base font-semibold leading-tight text-nyala-white transition-colors group-hover:text-nyala-red">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-2 font-mono text-xs leading-relaxed text-nyala-gray-muted">
          {post.excerpt}
        </p>
        <div className="mt-4 flex items-center justify-between font-mono text-[10px] text-nyala-gray-muted">
          <span>{formatDate(post.publishedAt)}</span>
          <span>{post.readingTime} min read</span>
        </div>
      </div>
    </motion.article>
    </Link>
  );
}
