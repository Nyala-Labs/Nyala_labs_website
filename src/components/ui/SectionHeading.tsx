"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  glow?: boolean;
  className?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  align = "left",
  glow = false,
  className = "",
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`mb-12 ${align === "center" ? "text-center" : ""} ${className}`}
    >
      <h2
        className={`font-mono text-3xl font-bold tracking-tight md:text-4xl ${
          glow ? "glow-text text-nyala-yellow" : "text-nyala-white"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 font-mono text-sm text-nyala-gray-muted md:text-base">
          {subtitle}
        </p>
      )}
      <motion.div
        className="mt-4 h-0.5 bg-nyala-red"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        style={{
          width: align === "center" ? "60px" : "40px",
          originX: align === "center" ? 0.5 : 0,
          marginLeft: align === "center" ? "auto" : 0,
          marginRight: align === "center" ? "auto" : undefined,
        }}
      />
    </motion.div>
  );
}
