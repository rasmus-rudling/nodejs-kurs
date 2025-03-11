import {NextFunction, Response} from "express";
import {HttpStatus} from "../utils/http-status";
import {AuthUtils} from "../utils/auth-utils";

const authUtils = new AuthUtils()

export const extractUserFromToken = async (req: any, res: Response, next: NextFunction): Promise<any> => {
  const token = req.header('Authorization')?.split(' ')[1]; // Bearer <token>
  if (!token) return res.status(HttpStatus.NOT_AUTHENTICATED).send('Ingen token skickades.');
  const payload = await authUtils.isTokenValid(token)

  if (!payload) {
    return res.status(HttpStatus.NOT_AUTHENTICATED).send('Token är inte giltig');
  }

  req.jwtPayload = payload

  next()
}