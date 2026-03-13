const news = {
  name: "news",
  title: "News",
  type: "document" as const,
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule: { required: () => unknown }) => rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule: { required: () => unknown }) => rule.required(),
    },
    {
      name: "body",
      title: "Body",
      type: "array",
      of: [{ type: "block" }, { type: "image", options: { hotspot: true } }],
    },
    {
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      validation: (rule: { required: () => unknown }) => rule.required(),
    },
  ],
  preview: {
    select: { title: "title", media: "coverImage" },
  },
};

export default news;
