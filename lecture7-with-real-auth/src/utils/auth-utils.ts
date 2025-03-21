import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv";
import {CustomJwtPayload} from "../domain/user/user.interface";
dotenv.config();

const secret = process.env.JWT_SECRET as string

export class AuthUtils {
  async hashPassword(password: string) {
    const saltRounds = 10; // Antal "rundor" för att göra krypteringen säkrare
    return bcrypt.hash(password, saltRounds);
  }

  async validatePassword(password: string, storedHashPassword: string): Promise<boolean> {
    return bcrypt.compare(password, storedHashPassword)
  }

  async generateToken(userEmail: string): Promise<string> {
    console.log({secret})
    const payload = { "userEmail": userEmail };
    return jwt.sign(payload, secret, { expiresIn: '1h' });
  }

  async isTokenValid(token: string): Promise<CustomJwtPayload | null> {
    try {
      return jwt.verify(token, secret) as CustomJwtPayload
    } catch (e) {
      console.warn(`JWT wasn't valid.`)
      return null
    }
  }
}