"use client";

import { motion } from "framer-motion";

export default function CommunityPageIntro() {
  return (
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
  );
}
