import type { CollectionConfig } from "payload";
import { isAdminOrEditor } from "./access";

export const BlogPosts: CollectionConfig = {
  slug: "blog-posts",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "author", "publishedAt", "featured"],
    preview: (doc) => {
      const slug = typeof doc?.slug === "string" ? doc.slug : "";
      if (!slug) return null;
      const params = new URLSearchParams({
        slug,
        collection: "blog-posts",
        path: `/blogs/${slug}`,
        previewSecret: process.env.PREVIEW_SECRET || "",
      });
      return `/preview?${params.toString()}`;
    },
  },
  access: {
    read: () => true,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
    },
    {
      name: "excerpt",
      type: "textarea",
      required: true,
      maxLength: 200,
    },
    {
      name: "body",
      type: "richText",
    },
    {
      name: "coverImage",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "author",
      type: "text",
      required: true,
      defaultValue: "Nyala Labs",
      admin: {
        description: 'Byline shown on posts (use "Nyala Labs" for official updates unless crediting a named author).',
      },
    },
    {
      name: "categories",
      type: "select",
      hasMany: true,
      options: [
        { label: "Hackathon", value: "hackathon" },
        { label: "Development", value: "development" },
        { label: "Education", value: "education" },
        { label: "Web3", value: "web3" },
        { label: "Design", value: "design" },
        { label: "UX", value: "ux" },
        { label: "Skills", value: "skills" },
        { label: "Community", value: "community" },
        { label: "Open Source", value: "open-source" },
        { label: "Events", value: "events" },
        { label: "Recap", value: "recap" },
      ],
    },
    {
      name: "publishedAt",
      type: "date",
      required: true,
    },
    {
      name: "readingTime",
      type: "number",
      required: true,
      min: 1,
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
    },
  ],
  timestamps: true,
};
