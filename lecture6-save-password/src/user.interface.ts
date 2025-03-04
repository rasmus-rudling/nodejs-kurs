export interface User {
  id: string
  name: string
  age: number
  password: string
  email: string
}

export interface UserWithoutPassword extends Omit<User, 'password'> {}
export interface CreateUser extends Omit<User, 'id'> {}
export interface UserCredentials extends Pick<User, 'email' | 'password'> {}

export interface JwtPayload {
  userEmail: string
}
