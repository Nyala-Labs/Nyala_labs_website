"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { LinkedInPost } from "@/types";

interface LinkedInPostGridProps {
  posts: LinkedInPost[];
}

const PAGE_SIZE = 6;

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
  }).join("").replace(/\s+/g, " ").trim();

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

export default function LinkedInPostGrid({ posts }: LinkedInPostGridProps) {
  const [page, setPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState<LinkedInPost | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const totalPages = Math.ceil(posts.length / PAGE_SIZE);
  const pagePosts = posts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const closePost = useCallback(() => setSelectedPost(null), []);

  useEffect(() => {
    if (!selectedPost) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePost();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [closePost, selectedPost]);

  if (posts.length === 0) {
    return (
      <div className="border border-nyala-gray-light bg-nyala-gray p-10 text-center">
        <p className="font-mono text-sm text-nyala-gray-muted">No community posts published yet.</p>
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {pagePosts.map((post) => (
          <article
            key={post.id}
            className="group relative cursor-pointer overflow-hidden rounded-2xl border border-nyala-gray-light bg-nyala-gray p-4 font-sans transition-[border-color,box-shadow] hover:border-nyala-yellow/70 hover:shadow-[0_0_25px_rgba(251,192,45,0.1)]"
          >
            {post.imageUrl && (
              <div className="relative aspect-[1.45/1] overflow-hidden rounded-xl bg-nyala-gray">
                <img src={post.imageUrl} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <img src="/images/icons/linkedin-48.png" alt="LinkedIn" className="absolute left-3 top-4 h-8 w-8 object-contain" />
              </div>
            )}
            <div className={post.imageUrl ? "pt-4" : "pt-1"}>
              <p className={`${post.imageUrl ? "line-clamp-3 min-h-[4rem]" : "line-clamp-8"} break-words text-sm font-bold leading-relaxed text-nyala-white transition-colors group-hover:text-nyala-yellow`}>
                {normalizePostText(post.text || "View this update from Nyala Labs on LinkedIn.")}
              </p>
              <p className="mt-4 text-xs font-bold text-nyala-white/70">{relativeTime(post.publishedAt)}</p>
            </div>
            <button
              type="button"
              onClick={() => { setSelectedPost(post); setSelectedImageIndex(0); }}
              aria-label="Read full LinkedIn post"
              className="absolute inset-0 z-10 cursor-pointer rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-nyala-yellow"
            />
          </article>
        ))}
      </div>

      {totalPages > 1 && (
        <nav className="mt-10 flex items-center justify-center gap-4" aria-label="Community post pages">
          <button type="button" onClick={() => setPage((current) => Math.max(1, current - 1))} disabled={page === 1} aria-label="Previous page" className="grid h-10 w-10 place-items-center border border-nyala-gray-light text-nyala-yellow transition-colors hover:border-nyala-yellow disabled:cursor-not-allowed disabled:opacity-30">
            <ChevronLeft aria-hidden="true" className="h-5 w-5" />
          </button>
          <span className="font-mono text-xs text-nyala-gray-muted">Page {page} of {totalPages}</span>
          <button type="button" onClick={() => setPage((current) => Math.min(totalPages, current + 1))} disabled={page === totalPages} aria-label="Next page" className="grid h-10 w-10 place-items-center border border-nyala-gray-light text-nyala-yellow transition-colors hover:border-nyala-yellow disabled:cursor-not-allowed disabled:opacity-30">
            <ChevronRight aria-hidden="true" className="h-5 w-5" />
          </button>
        </nav>
      )}

      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-nyala-black/85 p-4 pt-20 backdrop-blur-md sm:p-8 sm:pt-24" onClick={closePost} role="presentation">
          <div role="dialog" aria-modal="true" aria-labelledby="community-post-detail-title" className="relative max-h-[calc(100vh-6rem)] w-full max-w-5xl overflow-y-auto rounded-2xl border border-nyala-gray-light bg-nyala-gray shadow-2xl sm:max-h-[calc(100vh-7rem)]" onClick={(event) => event.stopPropagation()}>
            <button type="button" onClick={closePost} aria-label="Close LinkedIn post details" className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full border border-nyala-gray-light bg-nyala-black/80 text-nyala-white transition-colors hover:border-nyala-yellow hover:text-nyala-yellow">
              <X aria-hidden="true" className="h-5 w-5" />
            </button>
            <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
              <div className="relative flex min-h-64 items-center justify-center bg-nyala-black md:min-h-[32rem]">
                {selectedPost.imageUrls.length > 0 ? (
                  <>
                    <img src={selectedPost.imageUrls[selectedImageIndex]} alt={`Image ${selectedImageIndex + 1} from Nyala Labs LinkedIn post`} className="max-h-[70vh] w-full object-contain" />
                    {selectedImageIndex > 0 && <button type="button" onClick={() => setSelectedImageIndex((index) => index - 1)} aria-label="Show previous post image" className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-nyala-gray-light bg-nyala-black/80 text-nyala-white hover:border-nyala-yellow hover:text-nyala-yellow"><ChevronLeft className="h-5 w-5" /></button>}
                    {selectedImageIndex < selectedPost.imageUrls.length - 1 && <button type="button" onClick={() => setSelectedImageIndex((index) => index + 1)} aria-label="Show next post image" className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-nyala-gray-light bg-nyala-black/80 text-nyala-white hover:border-nyala-yellow hover:text-nyala-yellow"><ChevronRight className="h-5 w-5" /></button>}
                  </>
                ) : <span className="text-5xl text-nyala-yellow/70">N</span>}
              </div>
              <div className="flex flex-col p-6 sm:p-8">
                <div className="flex items-center gap-3"><img src="/images/icons/linkedin-48.png" alt="" className="h-9 w-9 object-contain" /><div><h2 id="community-post-detail-title" className="font-mono text-sm font-bold tracking-wide text-nyala-white">Nyala Labs</h2><p className="mt-1 font-mono text-xs text-nyala-gray-muted">{relativeTime(selectedPost.publishedAt)}</p></div></div>
                <p className="mb-2 mt-6 whitespace-pre-wrap break-words font-sans text-sm leading-relaxed text-nyala-white/80">{selectedPost.text}</p>
                {selectedPost.url && <div className="mt-auto flex justify-end border-t border-nyala-gray-light pt-6"><a href={selectedPost.url} target="_blank" rel="noopener noreferrer" className="font-sans text-sm text-nyala-white/80 transition-colors hover:text-nyala-yellow">View on LinkedIn</a></div>}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
