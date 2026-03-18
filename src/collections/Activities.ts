import type { CollectionConfig } from "payload";

export const Activities: CollectionConfig = {
  slug: "activities",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "status", "date", "location"],
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
      name: "description",
      type: "textarea",
      required: true,
    },
    {
      name: "date",
      type: "date",
      required: true,
    },
    {
      name: "location",
      type: "text",
      required: false,
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: false,
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "upcoming",
      options: [
        { label: "Upcoming", value: "upcoming" },
        { label: "Ongoing", value: "ongoing" },
        { label: "Completed", value: "completed" },
      ],
    },
  ],
  defaultSort: "-date",
  timestamps: true,
};
