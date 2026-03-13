const blogPost = {
  name: "blogPost",
  title: "Blog Post",
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
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      validation: (rule: { required: () => { max: (n: number) => unknown } }) =>
        rule.required().max(200),
    },
    {
      name: "body",
      title: "Body",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            { name: "alt", type: "string", title: "Alt Text" },
            { name: "caption", type: "string", title: "Caption" },
          ],
        },
        {
          type: "code",
          options: {
            withFilename: true,
          },
        },
      ],
    },
    {
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      validation: (rule: { required: () => unknown }) => rule.required(),
    },
    {
      name: "author",
      title: "Author",
      type: "string",
      validation: (rule: { required: () => unknown }) => rule.required(),
    },
    {
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Hackathon", value: "hackathon" },
          { title: "Development", value: "development" },
          { title: "Education", value: "education" },
          { title: "Web3", value: "web3" },
          { title: "Design", value: "design" },
          { title: "UX", value: "ux" },
          { title: "Skills", value: "skills" },
          { title: "Community", value: "community" },
          { title: "Open Source", value: "open-source" },
          { title: "Events", value: "events" },
          { title: "Recap", value: "recap" },
        ],
      },
    },
    {
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      validation: (rule: { required: () => unknown }) => rule.required(),
    },
    {
      name: "readingTime",
      title: "Reading Time (minutes)",
      type: "number",
      validation: (rule: { required: () => { min: (n: number) => unknown } }) =>
        rule.required().min(1),
    },
    {
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    },
  ],
  preview: {
    select: { title: "title", media: "coverImage" },
  },
};

export default blogPost;
