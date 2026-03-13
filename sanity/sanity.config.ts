import blogPost from "./schemas/blogPost";
import committeeMember from "./schemas/committeeMember";
import activity from "./schemas/activity";
import news from "./schemas/news";

export default {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "your-project-id",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  schema: {
    types: [blogPost, committeeMember, activity, news],
  },
};
