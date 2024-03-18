import { Request, Response, Router } from "express"
import { UserRouter } from "./UserRouter"
import { AuthRouter } from "./AuthRouter"
import { Authentication } from "../middleware/Authentication"
import { ProductRouter } from "./ProductRouter"

export class RootRouter {
  private static instance: RootRouter
  private router: Router
  private constructor() {
    this.router = Router()
    this.router.get("/v1", (req: Request, res: Response) => {
      res.send("Welcome to the API")
    })
    this.router.use("/v1/user/", UserRouter.getRouter())
    this.router.use("/v1/auth/", AuthRouter.getRouter())

    this.router.use("/v1/products/", ProductRouter.getRouter())
  }
  static getRouter(): Router {
    if (!RootRouter.instance) {
      RootRouter.instance = new RootRouter()
    }
    return RootRouter.instance.router
  }
}
