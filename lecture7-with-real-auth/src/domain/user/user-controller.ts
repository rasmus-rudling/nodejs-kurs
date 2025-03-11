import {Request, Response} from "express";
import {CreateUser, UserCredentials} from "./user.interface";
import {UserService} from "./user-service";
import {HttpStatus} from "../../utils/http-status";

const userService = new UserService()

export const createUser = async (req: Request, res: Response) => {
  const user = req.body as CreateUser
  const savedUser = await userService.save(user)
  res.status(HttpStatus.CREATED).json({id: savedUser.id})
};

export const login = async (req: Request, res: Response) => {
  const credentials = req.body as UserCredentials
  const jwt = await userService.login(credentials)

  if (!jwt) {
    const msg = `Could not log in user with email ${credentials.email}`
    console.log(msg)
    res.status(HttpStatus.NOT_AUTHENTICATED).json({msg})
    return
  }

  res.status(HttpStatus.OK).json({jwt})
};
