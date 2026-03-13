const activity = {
  name: "activity",
  title: "Activity",
  type: "document" as const,
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule: { required: () => unknown }) => rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      validation: (rule: { required: () => unknown }) => rule.required(),
    },
    {
      name: "date",
      title: "Date",
      type: "datetime",
      validation: (rule: { required: () => unknown }) => rule.required(),
    },
    {
      name: "location",
      title: "Location",
      type: "string",
    },
    {
      name: "image",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Upcoming", value: "upcoming" },
          { title: "Ongoing", value: "ongoing" },
          { title: "Completed", value: "completed" },
        ],
      },
      initialValue: "upcoming",
      validation: (rule: { required: () => unknown }) => rule.required(),
    },
  ],
  preview: {
    select: { title: "title", subtitle: "status", media: "image" },
  },
};

export default activity;
