import { getPayload } from "payload";
import config from "@payload-config";

export const getPayloadClient = async () => getPayload({ config });

export const getBlogPostBySlug = async (
  slug: string,
  options?: { draft?: boolean }
) => {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "blog-posts",
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
    draft: options?.draft ?? false,
    overrideAccess: options?.draft ?? false,
  });
  return result.docs[0] ?? null;
};
