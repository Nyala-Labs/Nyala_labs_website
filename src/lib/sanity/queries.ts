import { groq } from "next-sanity";

export const allBlogPostsQuery = groq`
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    "coverImage": coverImage.asset->url,
    author,
    categories,
    publishedAt,
    readingTime,
    featured
  }
`;

export const featuredBlogPostQuery = groq`
  *[_type == "blogPost" && featured == true][0] {
    _id,
    title,
    slug,
    excerpt,
    body,
    "coverImage": coverImage.asset->url,
    author,
    categories,
    publishedAt,
    readingTime
  }
`;

export const blogPostBySlugQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    body,
    "coverImage": coverImage.asset->url,
    author,
    categories,
    publishedAt,
    readingTime
  }
`;

export const allCommitteeMembersQuery = groq`
  *[_type == "committeeMember"] | order(order asc) {
    _id,
    name,
    role,
    "image": image.asset->url,
    bio,
    linkedin,
    order
  }
`;

export const upcomingActivitiesQuery = groq`
  *[_type == "activity" && status == "upcoming"] | order(date asc) {
    _id,
    title,
    description,
    date,
    location,
    "image": image.asset->url,
    status
  }
`;

export const allNewsQuery = groq`
  *[_type == "news"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    "coverImage": coverImage.asset->url,
    publishedAt
  }
`;
