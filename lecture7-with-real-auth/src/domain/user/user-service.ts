import {CreateUser, UserCredentials} from "./user.interface";
import {AuthUtils} from "../../utils/auth-utils";
import {UserRepository} from "./user-repository";

const authUtils = new AuthUtils()
const userRepository = new UserRepository()

export class UserService {
  async save(user: CreateUser) {
    const hashedPassword = await authUtils.hashPassword(user.password)

    return userRepository.save({
      ...user,
      password: hashedPassword
    })
  }

  async login(credentials: UserCredentials): Promise<string | null> {
    const storedHashedPassword = await userRepository.getPassword(credentials.email)

    if (!storedHashedPassword) {
      console.warn(`Couldn't find password for user with email ${credentials.email}`)
      return null
    }

    const credentialsAreCorrect = await authUtils.validatePassword(credentials.password, storedHashedPassword)

    if (!credentialsAreCorrect) {
      console.log(`Wrong password for user with email ${credentials.email}`)
      return null
    }

    return authUtils.generateToken(credentials.email)
  }

  async findOneByEmail(email: string) {
    return userRepository.findOneByEmail(email)
  }
}