import { Request, Response, Router } from "express"
import { AuthController } from "../controllers/AuthController"
import { Authentication } from "../middleware/Authentication"

export class AuthRouter {
  private static instance: AuthRouter
  private authController: AuthController
  private router: Router

  private constructor() {
    this.router = Router()
    this.authController = new AuthController()
    this.router.get("/verifyTokenApi", Authentication.verifyTokenApi)
    this.router.post("/login", this.handleLogin)
  }

  static getRouter(): Router {
    if (!AuthRouter.instance) {
      AuthRouter.instance = new AuthRouter()
    }
    return AuthRouter.instance.router
  }

  private handleLogin = async (req: Request, res: Response) => {
    try {
      const userInfo = req.body
      if (!userInfo.email || !userInfo.password) {
        return res.status(400).json({
          status: "error",
          message: "Email and password are required",
        })
      }
      const response = await this.authController.login(userInfo)
      if (response.status === "success") {
        return res.status(response.code).json({
          status: response.status,
          message: response.message,
          data: response.data,
        })
      } else {
        return res.status(response.code).json({
          status: response.status,
          message: response.message,
        })
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" })
    }
  }
}
