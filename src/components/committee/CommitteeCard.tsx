"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import type { CommitteeMember } from "@/types";

interface CommitteeCardProps {
  member: CommitteeMember;
  index?: number;
}

export default function CommitteeCard({ member, index = 0 }: CommitteeCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number>(0);

  useEffect(() => {
    setIsDesktop(window.matchMedia("(min-width: 768px)").matches);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => {
      const rect = cardRef.current!.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
      cardRef.current!.style.transform = `perspective(800px) rotateX(${y}deg) rotateY(${x}deg)`;
      if (glowRef.current) {
        glowRef.current.style.background = `radial-gradient(circle at ${x * 30 + 50}% ${y * -30 + 50}%, rgba(251,192,45,0.15) 0%, transparent 60%)`;
        glowRef.current.style.opacity = "1";
      }
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    cancelAnimationFrame(rafId.current);
    if (cardRef.current) cardRef.current.style.transform = "";
    if (glowRef.current) glowRef.current.style.opacity = "0";
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={isDesktop ? () => setIsHovered(true) : undefined}
      onMouseMove={isDesktop ? handleMouseMove : undefined}
      onMouseLeave={isDesktop ? handleMouseLeave : undefined}
      style={{ transition: "transform 0.2s ease-out, box-shadow 0.3s ease" }}
      className={`group relative cursor-pointer overflow-hidden border bg-nyala-gray transition-all duration-500 ${
        isHovered
          ? "-translate-y-2 border-nyala-red/40 shadow-lg shadow-nyala-red/10"
          : "border-nyala-gray-light"
      }`}
    >
      {/* glow border — desktop only, driven by ref */}
      {isDesktop && (
        <div
          ref={glowRef}
          className="pointer-events-none absolute inset-0 z-10 rounded-sm opacity-0 transition-opacity duration-500"
        />
      )}

      {/* image */}
      <div className="relative h-72 overflow-hidden">
        <Image
          src={member.image}
          alt={member.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className={`object-cover transition-all duration-700 ${
            isHovered ? "scale-105 contrast-110" : "scale-100"
          }`}
        />

        {/* dark overlay on hover (desktop) / always slightly visible on mobile for readability */}
        <div
          className="absolute inset-0 transition-all duration-500"
          style={{
            background: isHovered
              ? "linear-gradient(to top, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0.2) 60%)"
              : "linear-gradient(to top, rgba(10,10,10,0.5) 0%, transparent 50%)",
          }}
        />

        {/* bio — slides up on hover (desktop), always visible on mobile */}
        <div
          className={`absolute inset-x-0 bottom-0 p-5 transition-all duration-300 ${
            isDesktop
              ? isHovered
                ? "translate-y-0 opacity-100"
                : "translate-y-3 opacity-0"
              : "translate-y-0 opacity-100"
          }`}
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
        </div>
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
