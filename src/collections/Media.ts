import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
  },
  upload: {
    imageSizes: [
      {
        name: "card",
        width: 800,
        height: 450,
        fit: "cover",
      },
    ],
    adminThumbnail: "card",
    mimeTypes: ["image/*", "video/*"],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: false,
    },
  ],
};
