"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Timeline from "@/components/about/Timeline";
import TrailPath from "@/components/about/TrailPath";
import CommitteeCard from "@/components/committee/CommitteeCard";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedDivider from "@/components/ui/AnimatedDivider";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { timelineEvents, aims } from "@/data/mock";
import type { CommitteeMember } from "@/types";

interface AboutPageClientProps {
  committee: CommitteeMember[];
}

export default function AboutPageClient({ committee }: AboutPageClientProps) {
  const previewCommittee = useMemo(() => committee.slice(0, 4), [committee]);

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
            ~/nyala-labs/about &gt;
          </span>
        </motion.div>

        <SectionHeading
          title="our story"
          subtitle="A youth-led builder community that grows together through consistency and proof"
        />

        <ScrollReveal className="mx-auto mb-12 max-w-2xl">
          <div className="border-l-2 border-nyala-red pl-6">
            <p className="font-mono text-sm leading-relaxed text-nyala-gray-muted">
              Nyala Labs started with young people who wanted a hands-on tech community—learn
              by shipping, welcome newcomers, and grow together instead of building in
              isolation. Early bids for official recognition did not succeed; we treated
              that as feedback, tightened how we work, and kept running open workshops and
              meetups until participation told the story for us. Today we are a{" "}
              <span className="rounded-sm bg-nyala-yellow/15 px-1.5 py-0.5 font-semibold text-nyala-yellow">
                recognised youth society under the Ministry of Youth and Sports
              </span>
              : a home for youth who care about craft, collaboration, and lifting the
              next person up.
            </p>
          </div>
        </ScrollReveal>

        <section className="py-12">
          <SectionHeading
            title="the journey"
            subtitle="milestones, learning moments, and breakthroughs"
            align="center"
          />
          <Timeline events={timelineEvents} />
        </section>

        <AnimatedDivider />

        <section className="py-24">
          <SectionHeading
            title="our aims"
            subtitle="what we stand for—and what we invite youth, partners, and mentors to build with us"
            align="center"
            glow
          />
          <TrailPath aims={aims} />
        </section>

        <AnimatedDivider />

        <section className="py-24">
          <div className="mb-12 flex items-end justify-between">
            <SectionHeading
              title="meet the team"
              subtitle="youth leaders stewarding programs, partnerships, and community culture"
              className="mb-0"
            />
            <ScrollReveal delay={0.3}>
              <Link
                href="/committee"
                className="hidden font-mono text-xs uppercase tracking-widest text-nyala-gray-muted transition-colors hover:text-nyala-red md:block"
              >
                View All →
              </Link>
            </ScrollReveal>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {previewCommittee.map((member, i) => (
              <CommitteeCard key={member._id} member={member} index={i} />
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link
              href="/committee"
              className="font-mono text-xs uppercase tracking-widest text-nyala-gray-muted transition-colors hover:text-nyala-red"
            >
              view full team →
            </Link>
          </div>
        </section>
      </div>

      <div className="h-24" />
    </div>
  );
}
