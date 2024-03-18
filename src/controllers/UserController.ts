import { UserRepository } from "../Repositories/UserRepositorie"
import { User } from "../models/User"
import { Authentication } from "../middleware/Authentication"

export class UserController {
  private userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  public createUser = async (userInfo: any) => {
    try {
      //verify if the user already exists
      const userExists = await this.userRepository.findByEmail(userInfo.email)
      if (userExists) {
        return {
          code: 409,
          status: "error",
          message: "El usuario ya existe",
        }
      }
      const newUser = new User(userInfo)
      await newUser.save()
      const payload = {
        userId: newUser._id,
        email: newUser.email,
        role: newUser.roles[0],
      }
      const token = await Authentication.generateToken(payload)
      return {
        code: 201,
        message: "Usuario creado exitosamente",
        status: "success",
        data: {
          user: newUser,
          token: token,
        },
      }
    } catch (error: any) {
      return {
        code: 500,
        status: "error",
        message: error.message,
      }
    }
  }
}
