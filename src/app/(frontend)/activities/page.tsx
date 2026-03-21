import { getServerCollection } from "@/lib/payload";
import { mapPayloadActivity } from "@/lib/cms-client";
import ActivitiesPageClient from "./ActivitiesPageClient";

export const revalidate = 60;

export default async function ActivitiesPage() {
  const docs = await getServerCollection("activities", {
    sort: "-date",
    depth: 1,
  });

  const activities = docs.map(mapPayloadActivity);

  return <ActivitiesPageClient activities={activities} />;
}
