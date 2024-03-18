import { Request, Response } from "express"
import { Authentication } from "../middleware/Authentication"
import jwt from "jsonwebtoken"
import { User } from "../models/User"

export class AuthController {
  public async login(userInfo: any) {
    try {
      const { email, password } = userInfo
      //verify if the user exists
      const user = await User.findOne({ email })
      if (!user) {
        return {
          code: 401,
          status: "error",
          message: "El usuario no existe",
        }
      }
      //verify if the password is correct
      const isPasswordCorrect = user.password === password ? true : false
      if (!isPasswordCorrect) {
        return {
          code: 401,
          status: "error",
          message: "Contraseña incorrecta",
        }
      }
      const payload = {
        userId: user._id,
        email: user.email,
        role: user.roles.map((role) => role),
      }
      const token = await Authentication.generateToken(payload)
      return {
        code: 200,
        status: "success",
        message: "Usuario autenticado",
        data: {
          user,
          token,
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
  static async verifyToken(req: any, res: any) {
    const tokenAuthorization = req.headers.authorization
    if (!tokenAuthorization) return res.status(403).json({ message: "Unauthorized" })
    try {
      const token = tokenAuthorization.split(" ")[1]
      const payload = jwt.verify(token, process.env.JWT_SECRET as string)
      req.payload = payload
      return res.status(200).json({ message: "Authorized" })
    } catch (error) {
      return res.status(403).json({ message: "Unauthorized" })
    }
  }
}
