import type { GlobalConfig } from "payload";
import { isAdminOrEditor } from "@/collections/access";

export const Homepage: GlobalConfig = {
  slug: "homepage",
  label: "Homepage",
  access: {
    read: () => true,
    update: isAdminOrEditor,
  },
  fields: [
    {
      name: "heroMedia",
      type: "array",
      label: "Hero Carousel",
      admin: {
        description: "Images or videos for the hero section carousel. Upload via Media first, then select here.",
      },
      fields: [
        {
          name: "media",
          type: "upload",
          relationTo: "media",
          required: true,
          admin: {
            description: "Image or video from Media library",
          },
        },
        {
          name: "alt",
          type: "text",
          required: false,
          admin: {
            description: "Alt text for accessibility (images only)",
          },
        },
      ],
    },
  ],
};
