import type { Access } from "payload";

/** Admins and editors can create, update, delete. Public can read. */
export const isAdminOrEditor: Access = ({ req: { user } }) =>
  Boolean(user?.roles?.includes("admin") || user?.roles?.includes("editor"));
