"use client";

import { useEffect, useMemo, useState } from "react";
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
import {
  fetchPayloadCollection,
  mapPayloadCommitteeMember,
} from "@/lib/cms-client";

export default function AboutPage() {
  const [committee, setCommittee] = useState<CommitteeMember[]>([]);

  useEffect(() => {
    const loadCommittee = async () => {
      const docs = await fetchPayloadCollection(
        "committee-members",
        "sort=order&depth=1&limit=4"
      );
      setCommittee(docs.map(mapPayloadCommitteeMember));
    };

    loadCommittee();
  }, []);

  const previewCommittee = useMemo(() => committee.slice(0, 4), [committee]);

  return (
    <div className="min-h-screen bg-nyala-black pt-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* page header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4"
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-nyala-red">
            ~/nyala/about &gt;
          </span>
        </motion.div>

        <SectionHeading
          title="our story"
          subtitle="how a group of rejected club applicants built something real"
        />

        {/* intro */}
        <ScrollReveal className="mx-auto mb-16 max-w-3xl">
          <div className="border-l-2 border-nyala-red pl-6">
            <p className="font-mono text-sm leading-relaxed text-nyala-gray-muted">
              Nyala wasn&apos;t born in a boardroom. It was born from rejection —
              twice. When the university said &quot;no,&quot; we didn&apos;t stop
              building. We just built louder. This is the story of how persistence
              turned a rejected proposal into a thriving community of builders.
            </p>
          </div>
        </ScrollReveal>

        {/* ─── timeline ──────────────────────────── */}
        <section className="py-12">
          <SectionHeading
            title="the journey"
            subtitle="milestones, setbacks, and breakthroughs"
            align="center"
          />
          <Timeline events={timelineEvents} />
        </section>

        <AnimatedDivider />

        {/* ─── aims / trail path ─────────────────── */}
        <section className="py-24">
          <SectionHeading
            title="our aims"
            subtitle="the trail we're blazing — one milestone at a time"
            align="center"
            glow
          />
          <TrailPath aims={aims} />
        </section>

        <AnimatedDivider />

        {/* ─── committee preview ─────────────────── */}
        <section className="py-24">
          <div className="mb-12 flex items-end justify-between">
            <SectionHeading
              title="meet the team"
              subtitle="the people behind the trail"
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

      {/* bottom spacing */}
      <div className="h-24" />
    </div>
  );
}
