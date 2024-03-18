import { Request, Response, Router } from "express"
import { UserController } from "../controllers/UserController"
import { MongoDBUserRepository } from "../Repositories/UserRepositorie"
import { Authentication } from "../middleware/Authentication"

export class UserRouter {
  private static instance: UserRouter
  private userController: UserController
  private router: Router

  private constructor(userController: UserController) {
    this.router = Router()
    this.userController = userController
    this.router.post("/create", this.createNewUserAndReturnToken)
    this.router.get("/verifyToken", Authentication.veirifyToken)
  }

  static getRouter(): Router {
    if (!UserRouter.instance) {
      const userRepository = new MongoDBUserRepository()
      const userController = new UserController(userRepository)
      UserRouter.instance = new UserRouter(userController)
    }
    return UserRouter.instance.router
  }

  private createNewUserAndReturnToken = async (req: Request, res: Response) => {
    try {
      const userInfo = req.body
      const response = await this.userController.createUser(userInfo)
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
