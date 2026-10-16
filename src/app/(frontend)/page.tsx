import { getHomepageData, getServerCollection } from "@/lib/payload";
import { mapPayloadActivity } from "@/lib/cms-client";
import { getLatestLinkedInPosts } from "@/lib/events-data";
import HomePageClient from "./HomePageClient";

export const revalidate = 60;

export default async function HomePage() {
  const [activityDocs, homepageData, linkedinPosts] = await Promise.all([
    getServerCollection("activities", { sort: "startDate", depth: 1 }),
    getHomepageData(),
    getLatestLinkedInPosts(5),
  ]);

  const now = Date.now();
  const upcomingActivities = activityDocs
    .map(mapPayloadActivity)
    .filter((a) => new Date(a.startDate).getTime() > now)
    .slice(0, 3);

  return (
    <HomePageClient
      linkedinPosts={linkedinPosts}
      upcomingActivities={upcomingActivities}
      heroMedia={homepageData.heroMedia}
    />
  );
}
