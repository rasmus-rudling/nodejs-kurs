import {Role} from "@prisma/client";

export type RolesWithPermissions = {
  [role in Role]: Permission[];
};

export type Permission = 'create' | 'read' | 'update' | 'delete'
// export const USER_PERMISSIONS: Permission[] = ['read']
// export const EDITOR_PERMISSIONS: Permission[] = [...USER_PERMISSIONS, 'update']
// export const ADMIN_PERMISSIONS: Permission[] = [...EDITOR_PERMISSIONS, 'create', 'delete']

export const ROLES_WITH_PERMISSIONS: RolesWithPermissions = {
  [Role.ADMIN]: ['create', 'read', 'update', 'delete'],
  [Role.EDITOR]: ['read', 'update'],
  [Role.USER]: ['read'],
};

export type Roles = {
  [role in Role]: Role[]
}

// export const USER_ROLES: Role[] = [Role.USER]
// export const EDITOR_ROLES: Role[] = [...USER_ROLES, Role.EDITOR]
// export const ADMIN_ROLES: Role[] = [...EDITOR_ROLES, Role.ADMIN]

export const ROLE_HIERARCHY: Roles = {
  [Role.ADMIN]: [Role.ADMIN, Role.EDITOR, Role.USER],
  [Role.EDITOR]: [Role.EDITOR, Role.USER],
  [Role.USER]: [Role.USER]
}
