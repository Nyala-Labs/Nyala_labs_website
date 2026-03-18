import type { CollectionConfig } from "payload";

export const CommitteeMembers: CollectionConfig = {
  slug: "committee-members",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "role", "order"],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "role",
      type: "text",
      required: true,
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "bio",
      type: "textarea",
      required: true,
      maxLength: 200,
    },
    {
      name: "linkedin",
      type: "text",
      required: false,
    },
    {
      name: "order",
      type: "number",
      required: true,
      min: 1,
      index: true,
    },
  ],
  defaultSort: "order",
  timestamps: true,
};
