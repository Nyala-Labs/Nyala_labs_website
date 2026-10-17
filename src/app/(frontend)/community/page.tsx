import SectionHeading from "@/components/ui/SectionHeading";
import CommunityPageIntro from "@/components/community/CommunityPageIntro";
import LinkedInPostGrid from "@/components/community/LinkedInPostGrid";
import { getAllLinkedInPosts } from "@/lib/events-data";

export default async function CommunityPage() {
  const linkedinPosts = await getAllLinkedInPosts();

  return (
    <div className="min-h-screen bg-nyala-black pt-24">
      <div className="mx-auto max-w-7xl px-6">
        <CommunityPageIntro />

        <SectionHeading
          title="community"
          subtitle="follow the latest conversations, updates, and projects from Nyala Labs"
        />

        <LinkedInPostGrid posts={linkedinPosts} />
      </div>
      <div className="h-24" />
    </div>
  );
}
