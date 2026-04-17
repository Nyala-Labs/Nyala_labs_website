"use client";

import { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import MomentumBar from "@/components/activities/MomentumBar";
import Timeline from "@/components/activities/Timeline";
import SmartCalendar from "@/components/activities/SmartCalendar";
import EventFocusModal from "@/components/activities/EventFocusModal";
import { useTimeAwareness } from "@/components/activities/useTimeAwareness";
import {
  sortEventsByTime,
  filterEventsByDate,
  filterEventsByStatus,
} from "@/lib/event-utils";
import type { Activity } from "@/types";

interface ActivitiesPageClientProps {
  activities: Activity[];
}

export default function ActivitiesPageClient({
  activities,
}: ActivitiesPageClientProps) {
  // ─── State ──────────────────────────────────────
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [filterMode, setFilterMode] = useState<"all" | "upcoming" | "past">("all");
  const [focusedEvent, setFocusedEvent] = useState<Activity | null>(null);
  const [calendarOpen, setCalendarOpen] = useState(false);

  // Time awareness: forces re-render every 60s for live status updates
  const tick = useTimeAwareness(60_000);

  // ─── Derived data ───────────────────────────────
  const sorted = useMemo(() => sortEventsByTime(activities), [activities]);

  const filtered = useMemo(() => {
    let result = sorted;

    // Date filter from calendar
    if (selectedDate) {
      result = filterEventsByDate(result, selectedDate);
    }

    // Status filter
    if (filterMode === "upcoming") {
      result = filterEventsByStatus(result, "upcoming");
    } else if (filterMode === "past") {
      result = filterEventsByStatus(result, "past");
    }

    return result;
  }, [sorted, selectedDate, filterMode]);

  // ─── Handlers ───────────────────────────────────
  const handleEventClick = useCallback((event: Activity) => {
    setFocusedEvent(event);
  }, []);

  const handleCloseModal = useCallback(() => {
    setFocusedEvent(null);
  }, []);

  const handleSelectDate = useCallback((dateStr: string | null) => {
    setSelectedDate(dateStr);
  }, []);

  const handleFilterMode = useCallback((mode: "all" | "upcoming" | "past") => {
    setFilterMode(mode);
    setSelectedDate(null); // clear date filter when switching mode
  }, []);

  return (
    <div className="min-h-screen bg-nyala-black pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Breadcrumb */}
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

        {/* Section Heading */}
        <SectionHeading
          title="activities"
          subtitle="a living timeline of everything we build, learn, and ignite"
        />

        {/* Momentum Bar */}
        <MomentumBar events={activities} tick={tick} />

        {/* Mobile calendar toggle */}
        <div className="mb-4 lg:hidden">
          <button
            onClick={() => setCalendarOpen(!calendarOpen)}
            className="flex w-full items-center justify-between rounded-lg border
                       border-nyala-gray-light bg-nyala-gray/60 px-4 py-3
                       font-mono text-xs text-nyala-gray-muted transition-colors
                       hover:border-nyala-red"
          >
            <span>📅 Calendar {selectedDate ? `· ${selectedDate}` : ""}</span>
            <motion.span
              animate={{ rotate: calendarOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              ▾
            </motion.span>
          </button>

          {calendarOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-2 overflow-hidden"
            >
              <SmartCalendar
                events={activities}
                selectedDate={selectedDate}
                onSelectDate={handleSelectDate}
                filterMode={filterMode}
                onFilterMode={handleFilterMode}
              />
            </motion.div>
          )}
        </div>

        {/* Main Layout: Timeline + Calendar sidebar */}
        <div className="flex gap-8">
          {/* LEFT: Timeline */}
          <div className="min-w-0 flex-1">
            <Timeline
              events={filtered}
              tick={tick}
              onEventClick={handleEventClick}
            />
          </div>

          {/* RIGHT: Calendar (desktop only) */}
          <div className="hidden w-72 flex-shrink-0 lg:block xl:w-80">
            <div className="sticky top-28">
              <SmartCalendar
                events={activities}
                selectedDate={selectedDate}
                onSelectDate={handleSelectDate}
                filterMode={filterMode}
                onFilterMode={handleFilterMode}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Focus Mode Modal */}
      <EventFocusModal event={focusedEvent} onClose={handleCloseModal} />
    </div>
  );
}
