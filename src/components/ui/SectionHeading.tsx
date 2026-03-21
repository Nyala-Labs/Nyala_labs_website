"use client";

import { useEffect, useState } from "react";
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
  const [isDesktop, setIsDesktop] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setIsDesktop(window.matchMedia("(min-width: 768px)").matches);
    setMounted(true);
  }, []);

  const alignCls = align === "center" ? "text-center" : "";
  const headingCls = glow ? "glow-text text-nyala-yellow" : "text-nyala-white";
  const lineStyle = {
    width: align === "center" ? "60px" : "40px",
    marginLeft: align === "center" ? "auto" : 0,
    marginRight: align === "center" ? "auto" : undefined,
  };

  if (!mounted) {
    return (
      <div className={`mb-12 ${alignCls} ${className}`} style={{ opacity: 0 }}>
        <h2 className={`font-mono text-3xl font-bold tracking-tight md:text-4xl ${headingCls}`}>{title}</h2>
      </div>
    );
  }

  if (isDesktop) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`mb-12 ${alignCls} ${className}`}
      >
        <h2 className={`font-mono text-3xl font-bold tracking-tight md:text-4xl ${headingCls}`}>{title}</h2>
        {subtitle && <p className="mt-3 font-mono text-sm text-nyala-gray-muted md:text-base">{subtitle}</p>}
        <motion.div
          className="mt-4 h-0.5 bg-nyala-red"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          style={{ ...lineStyle, originX: align === "center" ? 0.5 : 0 }}
        />
      </motion.div>
    );
  }

  return (
    <div className={`mb-12 reveal-up ${alignCls} ${className}`}>
      <h2 className={`font-mono text-3xl font-bold tracking-tight ${headingCls}`}>{title}</h2>
      {subtitle && <p className="mt-3 font-mono text-sm text-nyala-gray-muted">{subtitle}</p>}
      <div className="mt-4 h-0.5 bg-nyala-red" style={lineStyle} />
    </div>
  );
}
