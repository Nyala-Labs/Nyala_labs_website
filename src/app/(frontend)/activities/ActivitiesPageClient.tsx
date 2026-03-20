"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { formatDate } from "@/lib/utils";
import { staggerContainer, fadeUp } from "@/lib/animations";
import type { Activity } from "@/types";

interface ActivitiesPageClientProps {
  activities: Activity[];
}

export default function ActivitiesPageClient({ activities }: ActivitiesPageClientProps) {
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
            ~/nyala/activities &gt;
          </span>
        </motion.div>

        <SectionHeading
          title="activities"
          subtitle="events, workshops, and everything in between"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {activities.map((activity, i) => (
            <motion.div
              key={activity._id}
              variants={fadeUp}
              custom={i}
              className="group relative overflow-hidden border border-nyala-gray-light bg-nyala-gray transition-all duration-500 hover:-translate-y-2 hover:border-nyala-red/50 hover:shadow-[0_0_40px_rgba(198,40,40,0.15)]"
            >
              <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-br from-nyala-red/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative z-10 h-48 overflow-hidden">
                <div
                  className="h-full w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${activity.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-nyala-gray via-transparent to-transparent" />
                <div className="absolute left-4 top-4 flex items-center gap-2">
                  <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-nyala-red" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-nyala-red">
                    {activity.status}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-mono text-lg font-semibold text-nyala-white">
                  {activity.title}
                </h3>
                <p className="mt-2 font-mono text-xs leading-relaxed text-nyala-gray-muted">
                  {activity.description}
                </p>
                <div className="mt-4 space-y-1 font-mono text-[10px] text-nyala-gray-muted">
                  <div className="flex items-center gap-2">
                    <span className="text-nyala-yellow">📅</span>
                    <span>{formatDate(activity.date)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-nyala-yellow">📍</span>
                    <span>{activity.location}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <ScrollReveal delay={0.3} className="mt-16 text-center">
          <p className="font-mono text-xs text-nyala-gray-muted">
            More activities coming soon. Stay tuned.
          </p>
        </ScrollReveal>
      </div>
      <div className="h-24" />
    </div>
  );
}
