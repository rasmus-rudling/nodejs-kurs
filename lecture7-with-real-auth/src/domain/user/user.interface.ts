import {Role} from "@prisma/client";

export interface User {
  id: string
  password: string
  email: string
  role: Role
}

export interface UserWithoutPassword extends Omit<User, 'password'> {}
export interface CreateUser extends Omit<User, 'id'> {}
export interface UserCredentials {
  email: string
  password: string
}

export interface CustomJwtPayload {
  userEmail: string
  role: Role
}
