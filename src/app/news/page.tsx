"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function NewsPage() {
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
            ~/nyala/news &gt;
          </span>
        </motion.div>

        <SectionHeading
          title="news"
          subtitle="updates, announcements, and everything happening at nyala"
        />

        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <div className="border border-nyala-gray-light bg-nyala-gray p-12">
            <div className="mb-4 font-mono text-4xl">📡</div>
            <h3 className="font-mono text-lg font-semibold text-nyala-white">
              news feed coming soon
            </h3>
            <p className="mt-3 font-mono text-xs text-nyala-gray-muted">
              we&apos;re setting up our news pipeline. in the meantime, follow us on
              social media for the latest updates.
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <a
                href="https://twitter.com"
                className="border border-nyala-gray-light px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-nyala-gray-muted transition-all hover:border-nyala-red hover:text-nyala-white"
              >
                twitter
              </a>
              <a
                href="https://instagram.com"
                className="border border-nyala-gray-light px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-nyala-gray-muted transition-all hover:border-nyala-red hover:text-nyala-white"
              >
                instagram
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
      <div className="h-24" />
    </div>
  );
}
