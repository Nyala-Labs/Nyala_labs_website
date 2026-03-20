import { getServerCollection } from "@/lib/payload";
import { mapPayloadCommitteeMember } from "@/lib/cms-client";
import AboutPageClient from "./AboutPageClient";

export default async function AboutPage() {
  const docs = await getServerCollection("committee-members", {
    sort: "order",
    depth: 1,
    limit: 4,
  });

  const committee = docs.map(mapPayloadCommitteeMember);

  return <AboutPageClient committee={committee} />;
}
