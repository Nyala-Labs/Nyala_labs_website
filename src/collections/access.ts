import type { Access } from "payload";

/* eslint-disable @typescript-eslint/no-explicit-any */
const hasRole = (user: any, role: string): boolean => {
  const roles = user?.roles;
  if (!roles) return false;
  if (Array.isArray(roles)) return roles.includes(role);
  if (typeof roles === "string") return roles === role;
  return false;
};

export const isAdmin: Access = ({ req: { user } }) => hasRole(user, "admin");

export const isAdminOrEditor: Access = ({ req: { user } }) =>
  hasRole(user, "admin") || hasRole(user, "editor");
