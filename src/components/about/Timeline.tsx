"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { TimelineEntry } from "@/types";

interface TimelineProps {
  events: TimelineEntry[];
}

const typeColors: Record<TimelineEntry["type"], string> = {
  milestone: "border-nyala-yellow bg-nyala-yellow",
  setback:   "border-nyala-red bg-nyala-red",
  achievement: "border-green-500 bg-green-500",
};

const typeDotColors: Record<TimelineEntry["type"], string> = {
  milestone:   "bg-nyala-yellow shadow-nyala-yellow/40",
  setback:     "bg-nyala-red shadow-nyala-red/40",
  achievement: "bg-green-500 shadow-green-500/40",
};

function TimelineDesktop({ events }: TimelineProps) {
  return (
    <div className="relative mx-auto max-w-3xl">
      <motion.div
        className="absolute left-1/2 top-0 bottom-0 w-px bg-nyala-gray-light"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{ originY: 0 }}
      />
      {events.map((event, i) => {
        const isLeft = i % 2 === 0;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className={`relative mb-12 flex items-center ${isLeft ? "flex-row" : "flex-row-reverse"}`}
          >
            <div className="absolute left-1/2 -translate-x-1/2 top-2">
              <motion.div
                className={`h-3 w-3 rounded-full shadow-lg ${typeDotColors[event.type]}`}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.15 + 0.2, type: "spring" }}
              />
            </div>
            <div className={`w-[calc(50%-2rem)] ${isLeft ? "pr-0 text-right" : "pl-0 text-left"}`}>
              <div className="group relative overflow-hidden border border-nyala-gray-light bg-nyala-gray p-6 transition-all duration-500 hover:-translate-y-1 hover:border-nyala-white/20 hover:shadow-lg">
                <div
                  className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                  style={{ backgroundImage: "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.07) 1px, transparent 0)", backgroundSize: "16px 16px" }}
                />
                <div className="relative z-10">
                  <div className="mb-2 flex items-center gap-2 justify-start">
                    <span className={`inline-block h-1.5 w-1.5 rounded-full ${typeColors[event.type]}`} />
                    <span className="font-mono text-xs uppercase tracking-widest text-nyala-gray-muted">{event.year}</span>
                  </div>
                  <h3 className="font-mono text-base font-semibold text-nyala-white">{event.title}</h3>
                  <p className="mt-2 font-mono text-xs leading-relaxed text-nyala-gray-muted">{event.description}</p>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

function TimelineMobile({ events }: TimelineProps) {
  return (
    <div className="relative mx-auto max-w-2xl">
      {/* static vertical line */}
      <div className="absolute left-6 top-0 bottom-0 w-px bg-nyala-gray-light line-grow-y" />

      <div className="ml-12 space-y-8">
        {events.map((event, i) => (
          <div
            key={i}
            className="reveal-up relative"
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            {/* dot */}
            <div
              className={`absolute -left-[1.85rem] top-2 h-3 w-3 rounded-full shadow-lg scale-in ${typeDotColors[event.type]}`}
              style={{ animationDelay: `${i * 0.08 + 0.15}s` }}
            />
            <div className="border border-nyala-gray-light bg-nyala-gray p-5">
              <div className="mb-2 flex items-center gap-2">
                <span className={`inline-block h-1.5 w-1.5 rounded-full ${typeColors[event.type]}`} />
                <span className="font-mono text-xs uppercase tracking-widest text-nyala-gray-muted">{event.year}</span>
              </div>
              <h3 className="font-mono text-base font-semibold text-nyala-white">{event.title}</h3>
              <p className="mt-2 font-mono text-xs leading-relaxed text-nyala-gray-muted">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Timeline({ events }: TimelineProps) {
  const [isDesktop, setIsDesktop] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setIsDesktop(window.matchMedia("(min-width: 768px)").matches);
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return isDesktop ? <TimelineDesktop events={events} /> : <TimelineMobile events={events} />;
}
