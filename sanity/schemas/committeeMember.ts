const committeeMember = {
  name: "committeeMember",
  title: "Committee Member",
  type: "document" as const,
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule: { required: () => unknown }) => rule.required(),
    },
    {
      name: "role",
      title: "Role / Position",
      type: "string",
      validation: (rule: { required: () => unknown }) => rule.required(),
    },
    {
      name: "image",
      title: "Profile Image",
      type: "image",
      options: { hotspot: true },
      validation: (rule: { required: () => unknown }) => rule.required(),
    },
    {
      name: "bio",
      title: "Short Bio",
      type: "text",
      rows: 3,
      validation: (rule: { required: () => { max: (n: number) => unknown } }) =>
        rule.required().max(200),
    },
    {
      name: "linkedin",
      title: "LinkedIn URL",
      type: "url",
    },
    {
      name: "order",
      title: "Display Order",
      type: "number",
      validation: (rule: { required: () => { min: (n: number) => unknown } }) =>
        rule.required().min(1),
    },
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "image" },
  },
};

export default committeeMember;
