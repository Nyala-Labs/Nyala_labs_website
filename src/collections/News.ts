import type { CollectionConfig } from "payload";

export const News: CollectionConfig = {
  slug: "news",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "publishedAt"],
  },
  access: {
    read: () => true,
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
      name: "body",
      type: "richText",
    },
    {
      name: "coverImage",
      type: "upload",
      relationTo: "media",
      required: false,
    },
    {
      name: "publishedAt",
      type: "date",
      required: true,
    },
  ],
  defaultSort: "-publishedAt",
  timestamps: true,
};
