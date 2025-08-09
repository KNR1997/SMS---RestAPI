import { ERole } from "@types";

export const adminOnly = [ERole.ROLE_ADMIN];
export const adminAndReceptionistOnly = [ERole.ROLE_ADMIN, ERole.ROLE_RECEPTIONIST];

export function hasAccess(
  _allowedRoles: string[],
  _userPermissions: string[] | undefined | null
) {
  if (_userPermissions) {
    return Boolean(
      _allowedRoles?.find((aRole) => _userPermissions.includes(aRole))
    );
  }
  return false;
}