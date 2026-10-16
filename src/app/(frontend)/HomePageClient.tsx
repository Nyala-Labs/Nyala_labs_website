  "use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import HeroVideoSection from "@/components/hero/HeroVideoSection";
import LinkedInPostSlider from "@/components/community/LinkedInPostSlider";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedDivider from "@/components/ui/AnimatedDivider";
import ScrollReveal from "@/components/ui/ScrollReveal";
import PartnershipsSection from "@/components/partnerships/PartnershipsSection";
import { formatDate } from "@/lib/utils";
import { getEventStatus } from "@/lib/event-utils";
import { staggerContainer, fadeUp } from "@/lib/animations";
import type { Activity, HeroMediaItem, LinkedInPost } from "@/types";

interface HomePageClientProps {
  linkedinPosts: LinkedInPost[];
  upcomingActivities: Activity[];
  heroMedia: HeroMediaItem[];
}

export default function HomePageClient({
  linkedinPosts,
  upcomingActivities,
  heroMedia,
}: HomePageClientProps) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsDesktop(window.matchMedia("(min-width: 768px)").matches);
  }, []);

  return (
    <>
      <HeroVideoSection initialHeroMedia={heroMedia} />

      {/* ─── sunfest spotlight ───────────── */}
      <section className="relative bg-nyala-black py-14 md:py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="group relative overflow-hidden border border-nyala-gray-light bg-nyala-gray p-6 transition-all duration-500 hover:border-nyala-red/50 hover:shadow-[0_0_30px_rgba(198,40,40,0.15)] md:p-8">
            <div className="pointer-events-none absolute -left-20 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-nyala-red/10 blur-3xl" />
            <div className="pointer-events-none absolute -right-20 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-nyala-yellow/10 blur-3xl" />
            <div className="relative z-10 flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-nyala-red">
                  latest spotlight
                </p>
                <h2 className="mt-2 font-mono text-2xl font-bold tracking-tight text-nyala-yellow md:text-3xl">
                  SunFest 2026: Harvest of Wonders
                </h2>
                <p className="mt-2 font-mono text-xs text-nyala-gray-muted md:text-sm">
                  July 7 - 10, 2026 | Sunway College | Booths, games, and community celebration
                </p>
              </div>
              <a
                href="/sunfest"
                className="w-fit rounded-none border border-nyala-red bg-nyala-red px-6 py-2.5 font-mono text-xs uppercase tracking-[0.2em] text-nyala-white transition-all duration-300 hover:bg-nyala-red-dark hover:shadow-lg hover:shadow-nyala-red/20"
              >
                View SunFest Details
              </a>
            </div>
          </div>

          <div className="mt-4 rounded-none border border-nyala-gray-light/80 bg-nyala-gray/70 p-5 md:p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-nyala-gray-muted">
              history record
            </p>
            <div className="mt-2 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="font-mono text-lg font-semibold text-nyala-white">
                  Chutes Hack Malaysia 2026
                </h3>
                <p className="mt-1 font-mono text-xs leading-relaxed text-nyala-gray-muted">
                  Our earlier hybrid AI hackathon remains part of Nyala Labs&apos; story and is now presented as a past milestone.
                </p>
              </div>
              <a
                href="/chutes-hackathon"
                className="w-fit border border-nyala-gray-light px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-nyala-gray-muted transition-all duration-300 hover:border-nyala-yellow hover:text-nyala-yellow"
              >
                View Past Event
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── upcoming activities ─────────────────── */}
      <section className="relative bg-nyala-black py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            title="Upcoming Activities"
            subtitle="What's next on the trail"
            glow
          />

          {isDesktop ? (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid gap-6 md:grid-cols-3"
            >
              {upcomingActivities.map((activity, i) => (
                <motion.div key={activity._id} variants={fadeUp} custom={i}>
                  <ActivityCard activity={activity} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="grid gap-6">
              {upcomingActivities.map((activity, i) => (
                <div key={activity._id} className="reveal-up" style={{ animationDelay: `${i * 0.1}s` }}>
                  <ActivityCard activity={activity} />
                </div>
              ))}
            </div>
          )}
          {upcomingActivities.length === 0 && (
            <p className="mt-4 font-mono text-xs text-nyala-gray-muted">
              No upcoming activities published yet.
            </p>
          )}
        </div>
      </section>

      <AnimatedDivider />

      {/* ─── latest from the trail ───────────────── */}
      <section className="bg-nyala-black pb-12 pt-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 flex items-end justify-between">
            <SectionHeading
              title="latest from the trail"
              subtitle="updates, ideas, and moments shared by our community"
              className="mb-0"
            />
            <ScrollReveal delay={0.3}>
              <a
                href="/community"
                className="hidden font-mono text-xs uppercase tracking-widest text-nyala-gray-muted transition-colors hover:text-nyala-red md:block"
              >
                View All →
              </a>
            </ScrollReveal>
          </div>

          <LinkedInPostSlider posts={linkedinPosts} />

          <div className="mt-8 text-center md:hidden">
            <a
              href="/community"
              className="font-mono text-xs uppercase tracking-widest text-nyala-gray-muted transition-colors hover:text-nyala-red"
            >
              Visit community →
            </a>
          </div>
        </div>
      </section>

      <AnimatedDivider />

      {/* ─── partnerships ────────────────────────────── */}
      <PartnershipsSection />

      <AnimatedDivider />

      {/* ─── cta ─────────────────────────────────── */}
      <section className="relative overflow-hidden bg-nyala-gray py-24">
        {/* background glow — only on desktop (blur is expensive on mobile GPU) */}
        {isDesktop && (
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/4 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-nyala-red/5 blur-[100px]" />
            <div className="absolute right-1/4 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-nyala-yellow/5 blur-[100px]" />
          </div>
        )}

        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <ScrollReveal>
            <h2 className="glow-text font-mono text-3xl font-bold tracking-tight text-nyala-yellow md:text-4xl">
              Ready to blaze the trail?
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="mx-auto mt-4 max-w-md font-mono text-sm text-nyala-gray-muted">
              Join a community of builders who ship real projects, not just
              tutorials. Your journey starts here.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.4}>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="https://forms.gle/f3g69MxUrquDFWQZ9"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-nyala-red bg-nyala-red px-8 py-3 font-mono text-xs uppercase tracking-[0.2em] text-nyala-white transition-all duration-300 hover:bg-nyala-red-dark hover:shadow-lg hover:shadow-nyala-red/20"
              >
                Join Nyala Labs →
              </a>
              <a
                href="/about"
                className="border border-nyala-gray-light px-8 py-3 font-mono text-xs uppercase tracking-[0.2em] text-nyala-gray-muted transition-all duration-300 hover:border-nyala-yellow hover:text-nyala-yellow"
              >
                Our Story
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}

function ActivityCard({ activity }: { activity: Activity }) {
  return (
    <div className="group relative overflow-hidden border border-nyala-gray-light bg-nyala-gray p-6 transition-all duration-500 hover:-translate-y-2 hover:border-nyala-red/50 hover:shadow-[0_0_30px_rgba(198,40,40,0.1)]">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 w-[200%] bg-gradient-to-r from-nyala-red via-nyala-yellow to-nyala-red opacity-0 transition-opacity duration-500 group-hover:animate-shimmer group-hover:opacity-100" />
      <div className="relative z-10 mb-4 flex items-center gap-3">
        <span className="inline-block h-2 w-2 rounded-full bg-nyala-red" />
        <span className="font-mono text-[10px] uppercase tracking-widest text-nyala-red">
          {getEventStatus(activity.startDate, activity.endDate)}
        </span>
      </div>
      <h3 className="font-mono text-lg font-semibold text-nyala-white">{activity.title}</h3>
      <p className="mt-2 font-mono text-xs leading-relaxed text-nyala-gray-muted">{activity.description}</p>
      <div className="mt-4 space-y-1 font-mono text-[10px] text-nyala-gray-muted">
        <div className="flex items-center gap-2">
          <span className="text-nyala-yellow">📅</span>
          <span>{formatDate(activity.startDate)}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-nyala-yellow">📍</span>
          <span>{activity.location}</span>
        </div>
      </div>
    </div>
  );
}
