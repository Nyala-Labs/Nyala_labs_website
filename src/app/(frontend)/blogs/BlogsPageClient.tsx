"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import BlogCard from "@/components/blog/BlogCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { allCategories } from "@/data/mock";
import { staggerContainer } from "@/lib/animations";
import type { BlogPost } from "@/types";

interface BlogsPageClientProps {
  initialPosts: BlogPost[];
}

export default function BlogsPageClient({ initialPosts }: BlogsPageClientProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const featuredPost = initialPosts.find((p) => p.featured);
  const filteredPosts = initialPosts.filter((p) => {
    if (activeCategory === "all") return !p.featured;
    return (
      p.categories.map((c) => c.toLowerCase()).includes(activeCategory) &&
      !p.featured
    );
  });

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  return (
    <div className="min-h-screen bg-nyala-black pt-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4"
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-nyala-red">
            ~/nyala-labs/blogs &gt;
          </span>
        </motion.div>

        <SectionHeading
          title="from the trail"
          subtitle="stories, guides, and insights from the Nyala Labs community"
        />

        {featuredPost && (
          <div className="mb-16">
            <BlogCard post={featuredPost} featured />
          </div>
        )}

        <div className="mb-8 flex flex-wrap gap-2">
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setCurrentPage(1);
              }}
              className={`border px-4 py-1.5 font-mono text-[10px] uppercase tracking-widest transition-all duration-300 ${
                activeCategory === cat
                  ? "border-nyala-red bg-nyala-red text-nyala-white"
                  : "border-nyala-gray-light text-nyala-gray-muted hover:border-nyala-red/30 hover:text-nyala-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div
          key={activeCategory + currentPage}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {paginatedPosts.map((post, i) => (
            <BlogCard key={post._id} post={post} index={i} />
          ))}
        </motion.div>

        {paginatedPosts.length === 0 && (
          <div className="flex h-48 items-center justify-center">
            <p className="font-mono text-sm text-nyala-gray-muted">
              no posts found in this category yet.
            </p>
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`flex h-8 w-8 items-center justify-center font-mono text-xs transition-all duration-300 ${
                  currentPage === page
                    ? "bg-nyala-red text-nyala-white"
                    : "border border-nyala-gray-light text-nyala-gray-muted hover:border-nyala-red/30 hover:text-nyala-white"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="h-24" />
    </div>
  );
}
