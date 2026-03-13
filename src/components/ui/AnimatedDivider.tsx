"use client";

import { motion } from "framer-motion";

interface AnimatedDividerProps {
  className?: string;
  color?: string;
}

export default function AnimatedDivider({
  className = "",
  color = "bg-nyala-red",
}: AnimatedDividerProps) {
  return (
    <div className={`flex items-center justify-center py-12 ${className}`}>
      <motion.div
        className={`h-px ${color} origin-left`}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ width: "80%" }}
      />
    </div>
  );
}
