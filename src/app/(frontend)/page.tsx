import { getHomepageData, getServerCollection } from "@/lib/payload";
import { mapPayloadActivity } from "@/lib/cms-client";
import HomePageClient from "./HomePageClient";

export const revalidate = 60;

export default async function HomePage() {
  const [activityDocs, homepageData] = await Promise.all([
    getServerCollection("activities", { sort: "startDate", depth: 1 }),
    getHomepageData(),
  ]);

  const now = Date.now();
  const upcomingActivities = activityDocs
    .map(mapPayloadActivity)
    .filter((a) => new Date(a.startDate).getTime() > now)
    .slice(0, 3);

  return (
    <HomePageClient
      latestPosts={[]}
      upcomingActivities={upcomingActivities}
      heroMedia={homepageData.heroMedia}
    />
  );
}
