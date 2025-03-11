import {Permission, ROLE_HIERARCHY, ROLES_WITH_PERMISSIONS} from "../roles";
import {NextFunction, Response} from "express";
import {Role} from "@prisma/client";
import {HttpStatus} from "../http-status";

export function authorizeWithHierarchy(requiredPermissions: Permission[]) {
  return (req: any, res: Response, next: NextFunction): void => {
    const userRole: Role | undefined = req.user?.role;

    if (!userRole) {
      res.status(HttpStatus.NOT_AUTHORIZED).send('Roll saknas.');
      return;
    }

    const allRolesForUser = ROLE_HIERARCHY[userRole] || [];

    let hasPermission = false;
    for (const role of allRolesForUser) {
      const rolePermissions = ROLES_WITH_PERMISSIONS[role];

      if (requiredPermissions.every(p => rolePermissions.includes(p))) {
        hasPermission = true;
        break;
      }
    }

    if (!hasPermission) {
      res.status(HttpStatus.NOT_AUTHORIZED).send('Åtkomst nekad.');
      return
    }

    next();
  };
}