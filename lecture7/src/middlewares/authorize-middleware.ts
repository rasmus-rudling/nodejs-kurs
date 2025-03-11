import {Permission, ROLE_HIERARCHY, ROLES_WITH_PERMISSIONS} from "../roles";
import {NextFunction, Response} from "express";
import {Role} from "@prisma/client";
import {HttpStatus} from "../http-status";

export function authorize(requiredPermissions: Permission[]) {
  return (req: any, res: Response, next: NextFunction): void => {
    const userRole: Role | undefined = req.user?.role

    if (!userRole) {
      res.status(HttpStatus.NOT_AUTHORIZED).send('Roll saknas.');
      return;
    }

    if (userRole === Role.ADMIN) {
      console.log("Det här är en admin, skippar auktorisering")
      next()
    }

    const userPermissions = ROLES_WITH_PERMISSIONS[userRole];

    if (!userPermissions) {
      res.status(HttpStatus.NOT_AUTHORIZED).send('Roll saknar behörigheter.')
      return
    }

    const hasRequiredPermissions = requiredPermissions.every(permission =>
      userPermissions.includes(permission)
    );

    if (!hasRequiredPermissions) {
      res.status(HttpStatus.NOT_AUTHORIZED).send('Åtkomst nekad.');
      return
    }

    next()
  };
}