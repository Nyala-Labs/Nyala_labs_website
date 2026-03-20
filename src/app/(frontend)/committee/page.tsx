import { getServerCollection } from "@/lib/payload";
import { mapPayloadCommitteeMember } from "@/lib/cms-client";
import CommitteePageClient from "./CommitteePageClient";

export default async function CommitteePage() {
  const docs = await getServerCollection("committee-members", {
    sort: "order",
    depth: 1,
  });

  const members = docs.map(mapPayloadCommitteeMember);

  return <CommitteePageClient members={members} />;
}
