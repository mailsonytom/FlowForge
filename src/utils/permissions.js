import { ROLE_ACCESS } from "../routes/roleGuards";

export function canAccess(userRole, feature) {
  const allowedRoles = ROLE_ACCESS[feature];
  if (!allowedRoles) return false;
  return allowedRoles.includes(userRole);
}
