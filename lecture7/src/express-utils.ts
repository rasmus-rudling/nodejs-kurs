import {UserWithoutPassword} from "./user";

export interface RequestWithUser extends Request {
  user?: UserWithoutPassword
}