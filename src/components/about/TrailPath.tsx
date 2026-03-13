"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { Aim } from "@/types";

interface TrailPathProps {
  aims: Aim[];
}

export default function TrailPath({ aims }: TrailPathProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const pathLength = useTransform(scrollYProgress, [0.1, 0.8], [0, 1]);

  // SVG winding path coordinates
  const pathD = `
    M 50 0
    C 50 60, 350 60, 350 120
    C 350 180, 50 180, 50 240
    C 50 300, 350 300, 350 360
    C 350 420, 50 420, 50 480
    C 50 540, 350 540, 350 600
  `;

  // Milestone positions along the path
  const milestonePositions = [
    { x: 50, y: 0 },
    { x: 350, y: 120 },
    { x: 50, y: 240 },
    { x: 350, y: 360 },
    { x: 50, y: 480 },
  ];

  return (
    <div ref={containerRef} className="relative py-12">
      <div className="relative mx-auto max-w-lg">
        {/* SVG path */}
        <svg
          viewBox="0 0 400 620"
          fill="none"
          className="h-auto w-full"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* background path */}
          <path
            d={pathD}
            stroke="rgba(42,42,42,0.5)"
            strokeWidth="2"
            fill="none"
            strokeDasharray="8 4"
          />
          {/* animated path */}
          <motion.path
            d={pathD}
            stroke="url(#trailGradient)"
            strokeWidth="2.5"
            fill="none"
            style={{ pathLength }}
          />
          <defs>
            <linearGradient id="trailGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#c62828" />
              <stop offset="50%" stopColor="#fbc02d" />
              <stop offset="100%" stopColor="#c62828" />
            </linearGradient>
          </defs>
        </svg>

        {/* milestone cards */}
        {aims.map((aim, i) => {
          const pos = milestonePositions[i];
          if (!pos) return null;
          const isRight = pos.x > 200;

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="absolute flex items-center gap-3"
              style={{
                top: `${(pos.y / 620) * 100}%`,
                left: isRight ? "auto" : "0",
                right: isRight ? "0" : "auto",
                maxWidth: "45%",
              }}
            >
              {/* dot */}
              <motion.div
                className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-nyala-gray-light bg-nyala-black p-1.5"
                whileHover={{ scale: 1.2, borderColor: "rgba(198,40,40,0.5)" }}
              >
                <img
                  src={aim.icon || ""}
                  alt={aim.title}
                  className="h-full w-full object-contain"
                />
              </motion.div>

              {/* content */}
              <div
                className={`border border-nyala-gray-light bg-nyala-black/90 p-3 backdrop-blur-sm ${isRight ? "order-first text-right" : ""
                  }`}
              >
                <h4 className="font-mono text-sm font-semibold text-nyala-yellow">
                  {aim.title}
                </h4>
                <p className="mt-1 font-mono text-[15px] leading-relaxed text-nyala-gray-muted">
                  {aim.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
