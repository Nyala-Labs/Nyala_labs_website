"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";

const socialLinks = [
  { href: "https://discord.gg/zxHk5u85wN", label: "Discord" },
  { href: "https://www.instagram.com/nyalalabs/", label: "Instagram" },
  { href: "https://www.linkedin.com/company/nyalalabs", label: "LinkedIn" },
  { href: "https://github.com/Nyala-Labs", label: "GitHub" },
];

export default function CommunityPage() {
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
            ~/nyala-labs/community &gt;
          </span>
        </motion.div>

        <SectionHeading
          title="community"
          subtitle="follow the latest conversations, updates, and projects from Nyala Labs"
        />

        <div className="mx-auto max-w-2xl border border-nyala-gray-light bg-nyala-gray p-10 text-center">
          <p className="font-mono text-sm text-nyala-gray-muted">
            community posts are coming soon.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-nyala-gray-light px-4 py-2 font-mono text-xs uppercase tracking-widest text-nyala-gray-muted transition-colors hover:border-nyala-red hover:text-nyala-white"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="h-24" />
    </div>
  );
}
