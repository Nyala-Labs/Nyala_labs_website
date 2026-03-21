import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "email",
    defaultColumns: ["email", "roles", "updatedAt"],
  },
  access: {
    // Anyone can read their own profile; admins can read all
    read: ({ req: { user } }) => {
      if (!user) return false;
      if (user.roles?.includes("admin")) return true;
      return { id: { equals: user.id } };
    },
    // Only admins can create new users (no public self-registration)
    create: ({ req: { user } }) => Boolean(user?.roles?.includes("admin")),
    // Users can update their own profile; admins can update any
    update: ({ req: { user } }) => {
      if (!user) return false;
      if (user.roles?.includes("admin")) return true;
      return { id: { equals: user.id } };
    },
    // Only admins can delete users
    delete: ({ req: { user } }) => Boolean(user?.roles?.includes("admin")),
    // Both admin and editor roles can access the admin panel
    admin: ({ req: { user } }) =>
      Boolean(user?.roles?.includes("admin") || user?.roles?.includes("editor")),
  },
  fields: [
    {
      name: "roles",
      type: "select",
      hasMany: true,
      required: true,
      defaultValue: ["editor"],
      saveToJWT: true,
      options: [
        { label: "Admin", value: "admin" },
        { label: "Editor", value: "editor" },
      ],
    },
  ],
};
