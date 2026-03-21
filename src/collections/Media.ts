import type { CollectionConfig } from "payload";
import { isAdminOrEditor } from "./access";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
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
