"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { LinkedInPost } from "@/types";

interface LinkedInPostSliderProps {
  posts: LinkedInPost[];
}

const normalizePostText = (text: string): string =>
  Array.from(text, (character) => {
    const codePoint = character.codePointAt(0);
    if (codePoint === undefined) return character;

    if (codePoint >= 0x1d400 && codePoint <= 0x1d419) {
      return String.fromCharCode(codePoint - 0x1d400 + 65);
    }
    if (codePoint >= 0x1d41a && codePoint <= 0x1d433) {
      return String.fromCharCode(codePoint - 0x1d41a + 97);
    }
    if (codePoint >= 0x1d7ce && codePoint <= 0x1d7d7) {
      return String.fromCharCode(codePoint - 0x1d7ce + 48);
    }

    return character;
  })
    .join("")
    .replace(/\s+/g, " ")
    .trim();

const relativeTime = (dateString: string): string => {
  const timestamp = new Date(dateString).getTime();
  if (Number.isNaN(timestamp)) return "Recently";

  const elapsedSeconds = Math.round((timestamp - Date.now()) / 1000);
  const units = [
    { name: "year", seconds: 31_536_000 },
    { name: "month", seconds: 2_592_000 },
    { name: "week", seconds: 604_800 },
    { name: "day", seconds: 86_400 },
    { name: "hour", seconds: 3_600 },
    { name: "minute", seconds: 60 },
  ] as const;
  const unit = units.find(({ seconds }) => Math.abs(elapsedSeconds) >= seconds);
  if (!unit) return "just now";

  return new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(
    Math.round(elapsedSeconds / unit.seconds),
    unit.name,
  );
};

export default function LinkedInPostSlider({ posts }: LinkedInPostSliderProps) {
  const activeIndex = useRef(0);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);

  if (posts.length === 0) {
    return (
      <div className="mx-auto max-w-md border border-nyala-gray-light bg-nyala-gray p-8 text-center">
        <p className="font-mono text-xs text-nyala-gray-muted">
          No community posts published yet.
        </p>
      </div>
    );
  }

  const move = (direction: -1 | 1) => {
    const nextIndex = (activeIndex.current + direction + posts.length) % posts.length;
    activeIndex.current = nextIndex;

    const slider = sliderRef.current;
    const card = cardRefs.current[nextIndex];
    if (!slider || !card) return;

    if (nextIndex === 0) {
      slider.scrollTo({ left: 0, behavior: "smooth" });
      return;
    }

    if (nextIndex === posts.length - 1) {
      slider.scrollTo({
        left: slider.scrollWidth - slider.clientWidth,
        behavior: "smooth",
      });
      return;
    }

    const sliderRect = slider.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    slider.scrollTo({
      left: slider.scrollLeft + cardRect.left - sliderRect.left - slider.clientLeft,
      behavior: "smooth",
    });
  };

  return (
    <div className="mx-auto max-w-6xl">
      <div className="relative">
        {posts.length > 1 && (
          <button
            type="button"
            onClick={() => move(-1)}
            aria-label="Show previous LinkedIn post"
            className="absolute -left-3 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-nyala-gray-light bg-nyala-black text-nyala-yellow shadow-lg transition-colors hover:border-nyala-yellow sm:grid lg:-left-5"
          >
            <ChevronLeft aria-hidden="true" className="block h-6 w-6" strokeWidth={2.5} />
          </button>
        )}

        <div
          ref={sliderRef}
          className="flex snap-x snap-mandatory gap-8 overflow-x-hidden pb-2 pl-7 pr-1"
          onTouchStart={(event) => {
            event.currentTarget.dataset.touchStart = String(event.touches[0]?.clientX ?? "");
          }}
          onTouchEnd={(event) => {
            const startX = Number(event.currentTarget.dataset.touchStart);
            const endX = event.changedTouches[0]?.clientX;
            if (!Number.isFinite(startX) || endX === undefined) return;
            if (startX - endX > 50) move(1);
            if (endX - startX > 50) move(-1);
          }}
        >
          {posts.map((post, index) => (
            <article
              key={post.id}
              ref={(element) => {
                cardRefs.current[index] = element;
              }}
              className={`group relative w-[calc(100%_-_0.5rem)] shrink-0 snap-start overflow-hidden rounded-2xl border border-nyala-gray-light bg-nyala-gray p-6 font-sans transition-[border-color,box-shadow] hover:border-nyala-yellow/70 hover:shadow-[0_0_25px_rgba(251,192,45,0.1)] sm:w-[calc(50%_-_1rem)] lg:w-[calc(28.571%_-_2rem)] ${post.url ? "cursor-pointer" : ""}`}
            >
              <div className="relative aspect-[1.35/1] overflow-hidden rounded-2xl bg-nyala-gray">
                {post.imageUrl ? (
                  <img
                    src={post.imageUrl}
                    alt=""
                    loading={index < 3 ? "eager" : "lazy"}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-nyala-gray">
                    <span className="text-4xl text-nyala-yellow/70">N</span>
                  </div>
                )}
                <img
                  src="/images/icons/linkedin-48.png"
                  alt="LinkedIn"
                  className="absolute left-3 top-4 h-8 w-8 object-contain"
                />
              </div>

              <div className="pt-6">
                <p className="line-clamp-3 min-h-[4rem] break-words text-sm font-bold leading-relaxed text-nyala-white transition-colors group-hover:text-nyala-yellow">
                  {normalizePostText(post.text || "View this update from Nyala Labs on LinkedIn.")}
                </p>
                <div className="mt-4 flex items-center justify-between gap-3">
                  <span className="text-xs font-bold text-nyala-white/70">
                    {relativeTime(post.publishedAt)}
                  </span>
                </div>
              </div>
              {post.url && (
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open LinkedIn post in a new tab"
                  className="absolute inset-0 z-10 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-nyala-yellow"
                />
              )}
            </article>
          ))}
        </div>

        {posts.length > 1 && (
          <button
            type="button"
            onClick={() => move(1)}
            aria-label="Show next LinkedIn post"
            className="absolute -right-3 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-nyala-gray-light bg-nyala-black text-nyala-yellow shadow-lg transition-colors hover:border-nyala-yellow sm:grid lg:-right-5"
          >
            <ChevronRight aria-hidden="true" className="block h-6 w-6" strokeWidth={2.5} />
          </button>
        )}
      </div>

    </div>
  );
}
