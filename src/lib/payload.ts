import { getPayload } from "payload";
import config from "@payload-config";
import type { CollectionSlug, GlobalSlug } from "payload";
import type { HomepageData } from "@/lib/cms-client";
import type { HeroMediaItem } from "@/types";

export const getPayloadClient = async () => getPayload({ config });

type PayloadMediaDoc = { url?: string; mimeType?: string };

const resolveMediaUrl = (media: unknown): string => {
  if (!media || typeof media !== "object") return "";
  return (media as PayloadMediaDoc).url || "";
};

const isVideoMedia = (media: unknown): boolean => {
  if (!media || typeof media !== "object") return false;
  const mime = (media as PayloadMediaDoc).mimeType || "";
  return mime.startsWith("video/");
};

export const getHomepageData = async (): Promise<HomepageData> => {
  try {
    const payload = await getPayloadClient();
    const data = (await payload.findGlobal({
      slug: "homepage" as GlobalSlug,
      depth: 1,
    })) as {
      heroMedia?: Array<{ media?: unknown; alt?: string }>;
    };

    const heroMedia: HeroMediaItem[] = (data.heroMedia || [])
      .filter((item) => item.media)
      .map((item) => ({
        type: isVideoMedia(item.media) ? ("video" as const) : ("image" as const),
        src: resolveMediaUrl(item.media),
        alt: item.alt,
      }))
      .filter((item) => Boolean(item.src));

    return { heroMedia };
  } catch {
    return { heroMedia: [] };
  }
};

export const getServerCollection = async (
  collection: string,
  options: { sort?: string; limit?: number; depth?: number } = {}
): Promise<Record<string, unknown>[]> => {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: collection as CollectionSlug,
      sort: options.sort,
      limit: options.limit,
      depth: options.depth ?? 1,
    });
    return result.docs as unknown as Record<string, unknown>[];
  } catch {
    return [];
  }
};
