import {PrismaClient} from "@prisma/client"
import {CreateUser, User, UserWithoutPassword} from "./user.interface";

const prisma = new PrismaClient()

export class UserRepository {
  async save(user: CreateUser): Promise<User> {
    return prisma.user.create({
      data: user
    })
  }

  async getPassword(email: string): Promise<string | null> {
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) return null

    return user.password
  }

  async findOneByEmail(email: string): Promise<UserWithoutPassword | null> {
    let user: Partial<User> | null = await prisma.user.findUnique({
      where: {email}
    })

    if (!user) return null
    delete user.password
    return user as UserWithoutPassword
  }
}