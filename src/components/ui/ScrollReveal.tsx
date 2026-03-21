"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

const directionMap = {
  up:    { y: 50, x: 0 },
  down:  { y: -50, x: 0 },
  left:  { x: -50, y: 0 },
  right: { x: 50, y: 0 },
};

const cssClassMap: Record<string, string> = {
  up:    "reveal-up",
  down:  "reveal-up",
  left:  "reveal-left",
  right: "reveal-right",
};

export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  className = "",
  once = true,
}: ScrollRevealProps) {
  const [isDesktop, setIsDesktop] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setIsDesktop(window.matchMedia("(min-width: 768px)").matches);
    setMounted(true);
  }, []);

  if (!mounted) {
    // SSR/pre-mount: render invisible placeholder to avoid layout shift
    return <div className={className} style={{ opacity: 0 }}>{children}</div>;
  }

  if (isDesktop) {
    const offset = directionMap[direction];
    return (
      <motion.div
        initial={{ opacity: 0, ...offset }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once, margin: "-50px" }}
        transition={{ duration, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div
      className={`${cssClassMap[direction]} ${className}`}
      style={{ animationDelay: delay ? `${delay}s` : undefined, animationDuration: `${duration}s` }}
    >
      {children}
    </div>
  );
}
