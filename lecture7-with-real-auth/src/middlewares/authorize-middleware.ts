import {Permission, ROLE_HIERARCHY, ROLES_WITH_PERMISSIONS} from "../domain/user/roles";
import {NextFunction, Response} from "express";
import {Role} from "@prisma/client";
import {HttpStatus} from "../utils/http-status";
import {CustomJwtPayload} from "../domain/user/user.interface";

export function authorize(requiredPermissions: Permission[]) {
  return (req: any, res: Response, next: NextFunction): void => {
    const {role} = req.jwtPayload as CustomJwtPayload

    if (role === Role.ADMIN) {
      console.log("Det här är en admin, skippar auktorisering")
      next()
    }

    const userPermissions = ROLES_WITH_PERMISSIONS[role];

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