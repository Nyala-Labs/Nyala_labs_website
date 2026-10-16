import clientPromise from "@/lib/mongodb";
import type { LinkedInPost, ScrapedEvent } from "@/types";

const DB_NAME = "luma_monitor";
const COLLECTION_NAME = "events";
const LINKEDIN_DB_NAME = "linkedin_post";
const LINKEDIN_COLLECTION_NAME = "linkedin_posts";

function safeHttpUrl(value: unknown): string {
  if (typeof value !== "string" || !value.trim()) return "";
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url.toString() : "";
  } catch {
    return "";
  }
}

export async function getLatestLinkedInPosts(limit = 5): Promise<LinkedInPost[]> {
  try {
    const client = await clientPromise;
    const docs = await client
      .db(LINKEDIN_DB_NAME)
      .collection(LINKEDIN_COLLECTION_NAME)
      .aggregate([
        {
          $addFields: {
            publishedAtDate: {
              $convert: {
                input: "$publishedAt",
                to: "date",
                onError: null,
                onNull: null,
              },
            },
          },
        },
        { $match: { publishedAtDate: { $ne: null } } },
        { $sort: { publishedAtDate: -1 } },
        { $limit: limit },
        {
          $project: {
            text: 1,
            publishedAtDate: 1,
            url: 1,
            firstImageUrl: 1,
          },
        },
      ])
      .toArray();

    return docs.flatMap((doc) => {
      const publishedAt =
        doc.publishedAtDate instanceof Date
          ? doc.publishedAtDate.toISOString()
          : "";
      if (!publishedAt) return [];

      return [
        {
          id: String(doc._id),
          text: typeof doc.text === "string" ? doc.text : "",
          publishedAt,
          url: safeHttpUrl(doc.url),
          imageUrl: safeHttpUrl(doc.firstImageUrl) || null,
        },
      ];
    });
  } catch (err) {
    console.error("getLatestLinkedInPosts failed:", err);
    return [];
  }
}

function mapDoc(doc: Record<string, any>): ScrapedEvent {
  return {
    id: doc.dedupKey,
    title: doc.name ?? "",
    coverImageUrl: doc.coverImageUrl ?? "",
    eventUrl: doc.eventUrl,
    startAt: new Date(doc.startAt).toISOString(),
    endAt: doc.endAt ? new Date(doc.endAt).toISOString() : null,
    timezone: doc.timezone,
    locationName: doc.location?.address || doc.location?.fullAddress || doc.location?.city || "",
    hosts: (doc.hosts?.length ? doc.hosts : doc.organizer ? [doc.organizer] : []).map(
      (h: any) => ({
        name: h.name,
        avatarUrl: h.avatarUrl ?? null,
      })
    ),
    source: doc.target_profile ?? "other",
  };
}

/**
 * Single integration seam for scraped (Luma/GDG) events.
 */
export async function getUpcomingScrapedEvents(): Promise<ScrapedEvent[]> {
  try {
    const client = await clientPromise;
    const docs = await client
      .db(DB_NAME)
      .collection(COLLECTION_NAME)
      .find({})
      .toArray();

    const now = Date.now();
    return docs
      .map(mapDoc)
      .filter((event) => new Date(event.startAt).getTime() >= now)
      .sort(
        (a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime()
      );
  } catch (err) {
    console.error("getUpcomingScrapedEvents failed:", err);
    return [];
  }
}

/**
 * All distinct target profiles in the collection, regardless of whether they
 * currently have any upcoming events — lets the UI keep showing a profile as
 * a filter option even when it has zero upcoming events right now.
 */
export async function getAllTargetProfiles(): Promise<string[]> {
  try {
    const client = await clientPromise;
    const profiles = await client
      .db(DB_NAME)
      .collection(COLLECTION_NAME)
      .distinct("target_profile");

    return profiles.filter((p): p is string => Boolean(p)).sort();
  } catch (err) {
    console.error("getAllTargetProfiles failed:", err);
    return [];
  }
}
