"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import type { CommitteeMember } from "@/types";

interface CommitteeCardProps {
  member: CommitteeMember;
  index?: number;
}

export default function CommitteeCard({ member, index = 0 }: CommitteeCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(800px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
        transition: "transform 0.2s ease-out",
      }}
      className={`group relative cursor-pointer overflow-hidden border bg-nyala-gray transition-all duration-500 ${
        isHovered
          ? "-translate-y-2 border-nyala-red/40 shadow-lg shadow-nyala-red/10"
          : "border-nyala-gray-light"
      }`}
    >
      {/* glow border effect */}
      <div
        className={`pointer-events-none absolute inset-0 z-10 rounded-sm transition-opacity duration-500 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background: `radial-gradient(circle at ${tilt.x * 30 + 50}% ${
            tilt.y * -30 + 50
          }%, rgba(251,192,45,0.15) 0%, transparent 60%)`,
        }}
      />

      {/* image */}
      <div className="relative h-72 overflow-hidden">
        <div
          className={`h-full w-full bg-cover bg-center transition-all duration-700 ${
            isHovered ? "animate-[glitch_0.3s_cubic-bezier(.25,.46,.45,.94)_both]" : ""
          }`}
          style={{
            backgroundImage: `url(${member.image})`,
            filter: isHovered ? "grayscale(0) contrast(1.1)" : "grayscale(1)",
            transform: isHovered ? "scale(1.05)" : "scale(1)",
          }}
        />
        {/* dark overlay that lightens on hover */}
        <div
          className="absolute inset-0 transition-all duration-500"
          style={{
            background: isHovered
              ? "linear-gradient(to top, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0.2) 60%)"
              : "linear-gradient(to top, rgba(10,10,10,0.8) 0%, rgba(10,10,10,0.3) 100%)",
          }}
        />

        {/* hover bio */}
        <motion.div
          className="absolute inset-x-0 bottom-0 p-5"
          initial={false}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
          transition={{ duration: 0.3 }}
        >
          <p className="font-mono text-xs leading-relaxed text-nyala-gray-muted">
            {member.bio}
          </p>
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block font-mono text-[10px] uppercase tracking-widest text-nyala-yellow transition-colors hover:text-nyala-white"
              onClick={(e) => e.stopPropagation()}
            >
              linkedin →
            </a>
          )}
        </motion.div>
      </div>

      {/* info */}
      <div className="p-5">
        <h3 className="font-mono text-base font-semibold tracking-tight text-nyala-white">
          {member.name}
        </h3>
        <p className="mt-1 font-mono text-xs uppercase tracking-widest text-nyala-red">
          {member.role}
        </p>
      </div>
    </motion.div>
  );
}
